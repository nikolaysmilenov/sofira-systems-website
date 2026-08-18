import assert from "node:assert/strict";
import { test } from "node:test";
import { AI_LIMITS } from "@/lib/ai/chat";
import { AiProviderError, getAiProviderId, isQuotaError, readGoogleErrorCode } from "@/lib/ai/provider";
import {
  DEFAULT_GEMINI_MODEL,
  GEMINI_INCOMPLETE_RETRIES,
  GEMINI_MAX_RETRIES,
  createGeminiProvider,
  extractGeminiVisibleText,
  geminiRetryDelayMs,
  isGeminiConfigured,
  isTransientGeminiHttpStatus,
  toGeminiContents,
} from "@/lib/ai/providers/gemini";
import { INCOMPLETE_FALLBACK } from "@/lib/ai/reply";

test("Gemini maps conversation roles and keeps system instructions out of contents", () => {
  const contents = toGeminiContents([
    { role: "user", content: "Какво представлява HR HUB 360?" },
    { role: "assistant", content: "HR HUB 360 е собствен продукт." },
    { role: "user", content: "Кои модули са готови?" },
  ]);

  assert.deepEqual(
    contents.map((item) => item.role),
    ["user", "model", "user"],
  );
  assert.equal(contents[0]?.parts[0]?.text, "Какво представлява HR HUB 360?");
  assert.equal(contents.at(-1)?.role, "user");
  assert.equal(DEFAULT_GEMINI_MODEL, "gemini-2.5-flash");
});

test("Gemini contents never end with a model turn", () => {
  const contents = toGeminiContents([
    { role: "user", content: "Здравейте" },
    { role: "assistant", content: "Здравейте, как мога да помогна?" },
  ]);

  assert.equal(contents.at(-1)?.role, "user");
  assert.equal(contents.length, 1);
});

test("Gemini provider reports a missing API key", () => {
  const provider = createGeminiProvider({ apiKey: "" });
  assert.equal(provider.id, "gemini");
  assert.equal(provider.isConfigured(), false);
  assert.equal(isGeminiConfigured(""), false);
});

test("Gemini complete throws not_configured without a key", async () => {
  const provider = createGeminiProvider({ apiKey: "   " });
  await assert.rejects(
    () =>
      provider.complete({
        instructions: "SOFIRA",
        messages: [{ role: "user", content: "Здравейте" }],
        maxOutputTokens: AI_LIMITS.maxOutputTokens,
      }),
    (error: unknown) => error instanceof AiProviderError && error.code === "not_configured",
  );
});

test("Gemini complete returns text from a mocked generateContent call", async () => {
  let capturedInstructions = "";
  const provider = createGeminiProvider({
    apiKey: "test-key",
    model: "gemini-2.5-flash",
    generateContent: async (params) => {
      capturedInstructions = params.config.systemInstruction;
      assert.equal(params.model, "gemini-2.5-flash");
      assert.equal(params.config.maxOutputTokens, AI_LIMITS.maxOutputTokens);
      assert.equal("thinkingConfig" in params.config, false);
      assert.equal("temperature" in params.config, false);
      assert.equal("topP" in params.config, false);
      assert.equal("topK" in params.config, false);
      assert.equal(params.contents.at(-1)?.role, "user");
      return { text: "HR HUB 360 е собствен HR продукт на SOFIRA SYSTEMS." };
    },
  });

  const result = await provider.complete({
    instructions: "You are SOFIRA AI",
    messages: [{ role: "user", content: "Какво представлява HR HUB 360?" }],
    maxOutputTokens: AI_LIMITS.maxOutputTokens,
  });

  assert.equal(result.text, "HR HUB 360 е собствен HR продукт на SOFIRA SYSTEMS.");
  assert.match(capturedInstructions, /You are SOFIRA AI/);
});

function httpError(status: number, message = "provider error") {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

test("Gemini maps quota errors without exposing internals", async () => {
  let attempts = 0;
  const provider = createGeminiProvider({
    apiKey: "test-key",
    sleep: async () => {},
    generateContent: async () => {
      attempts += 1;
      throw httpError(429, "RESOURCE_EXHAUSTED");
    },
  });

  await assert.rejects(
    () =>
      provider.complete({
        instructions: "SOFIRA",
        messages: [{ role: "user", content: "Здравейте" }],
        maxOutputTokens: 16,
      }),
    (error: unknown) =>
      error instanceof AiProviderError &&
      error.code === "quota" &&
      error.httpStatus === 429,
  );
  assert.equal(attempts, GEMINI_MAX_RETRIES + 1);
});

test("Gemini retries transient 503 then returns text", async () => {
  let attempts = 0;
  const provider = createGeminiProvider({
    apiKey: "test-key",
    sleep: async () => {},
    generateContent: async () => {
      attempts += 1;
      if (attempts === 1) {
        throw httpError(503, "UNAVAILABLE");
      }

      return { text: "HR HUB 360 покрива отпуски и присъствие." };
    },
  });

  const result = await provider.complete({
    instructions: "SOFIRA",
    messages: [{ role: "user", content: "Имаме Excel за отпуски." }],
    maxOutputTokens: 16,
  });

  assert.equal(result.text, "HR HUB 360 покрива отпуски и присъствие.");
  assert.equal(attempts, 2);
});

test("Gemini stops after two retries on persistent 503", async () => {
  let attempts = 0;
  const provider = createGeminiProvider({
    apiKey: "test-key",
    sleep: async () => {},
    generateContent: async () => {
      attempts += 1;
      throw httpError(503, "UNAVAILABLE");
    },
  });

  await assert.rejects(
    () =>
      provider.complete({
        instructions: "SOFIRA",
        messages: [{ role: "user", content: "Здравейте" }],
        maxOutputTokens: 16,
      }),
    (error: unknown) =>
      error instanceof AiProviderError &&
      error.code === "unavailable" &&
      error.httpStatus === 503,
  );
  assert.equal(attempts, GEMINI_MAX_RETRIES + 1);
});

test("Gemini retries truncated output once then returns a complete fallback", async () => {
  let attempts = 0;
  const provider = createGeminiProvider({
    apiKey: "test-key",
    sleep: async () => {},
    generateContent: async () => {
      attempts += 1;
      return { text: "Възможен подход", finishReason: "MAX_TOKENS" };
    },
  });

  const result = await provider.complete({
    instructions: "SOFIRA",
    messages: [{ role: "user", content: "Здравейте" }],
    maxOutputTokens: 16,
  });

  assert.equal(result.text, INCOMPLETE_FALLBACK);
  assert.equal(attempts, GEMINI_INCOMPLETE_RETRIES + 1);
});

test("Gemini regenerates truncated output and keeps the complete retry", async () => {
  let attempts = 0;
  const provider = createGeminiProvider({
    apiKey: "test-key",
    sleep: async () => {},
    generateContent: async () => {
      attempts += 1;
      if (attempts === 1) {
        return { text: "и присъствия:** заявления", finishReason: "MAX_TOKENS" };
      }

      return {
        text: "HR HUB 360 е собствен HR продукт в разработка. Текущите модули включват служители и отпуски.",
      };
    },
  });

  const result = await provider.complete({
    instructions: "SOFIRA",
    messages: [{ role: "user", content: "Какво може да прави HR HUB 360?" }],
    maxOutputTokens: 16,
  });

  assert.match(result.text, /собствен HR продукт/);
  assert.equal(attempts, 2);
});

test("Gemini visible text ignores thought parts", () => {
  const extracted = extractGeminiVisibleText({
    text: "thought leak",
    candidates: [
      {
        finishReason: "STOP",
        content: {
          parts: [
            { text: "hidden reasoning", thought: true },
            { text: "HR HUB 360 е собствен продукт." },
          ],
        },
      },
    ],
  });

  assert.equal(extracted.text, "HR HUB 360 е собствен продукт.");
  assert.equal(extracted.finishReason, "STOP");
});

test("Gemini does not retry client or auth failures", async () => {
  for (const status of [400, 401, 403, 404]) {
    let attempts = 0;
    const provider = createGeminiProvider({
      apiKey: "test-key",
      sleep: async () => {
        throw new Error("sleep should not run");
      },
      generateContent: async () => {
        attempts += 1;
        throw httpError(status, "INVALID_ARGUMENT");
      },
    });

    await assert.rejects(
      () =>
        provider.complete({
          instructions: "SOFIRA",
          messages: [{ role: "user", content: "Здравейте" }],
          maxOutputTokens: 16,
        }),
      (error: unknown) =>
        error instanceof AiProviderError &&
        error.code === "unavailable" &&
        error.httpStatus === status,
    );
    assert.equal(attempts, 1);
  }
});

test("Gemini retry policy is bounded and jittered", () => {
  assert.equal(GEMINI_MAX_RETRIES, 2);
  assert.equal(isTransientGeminiHttpStatus(503), true);
  assert.equal(isTransientGeminiHttpStatus(429), true);
  assert.equal(isTransientGeminiHttpStatus(500), true);
  assert.equal(isTransientGeminiHttpStatus(408), true);
  assert.equal(isTransientGeminiHttpStatus(400), false);
  assert.equal(isTransientGeminiHttpStatus(401), false);
  assert.equal(isTransientGeminiHttpStatus(404), false);

  const first = geminiRetryDelayMs(0, () => 0.5);
  const second = geminiRetryDelayMs(1, () => 0.5);
  assert.equal(first, 300);
  assert.equal(second, 500);
  assert.ok(second > first);
});

test("quota detection does not treat generic failures as quota", () => {
  assert.equal(isQuotaError(new Error("network down")), false);
  assert.equal(isQuotaError({ status: 429, message: "quota" }), true);
  assert.equal(
    readGoogleErrorCode(new Error("401 UNAUTHENTICATED ACCESS_TOKEN_TYPE_UNSUPPORTED")),
    "ACCESS_TOKEN_TYPE_UNSUPPORTED",
  );
});

test("default provider id is Gemini", () => {
  const previous = process.env.AI_PROVIDER;
  delete process.env.AI_PROVIDER;
  assert.equal(getAiProviderId(), "gemini");
  if (previous === undefined) {
    delete process.env.AI_PROVIDER;
  } else {
    process.env.AI_PROVIDER = previous;
  }
});

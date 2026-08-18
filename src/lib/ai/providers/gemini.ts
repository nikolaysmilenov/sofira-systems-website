import { GoogleGenAI } from "@google/genai";
import { AI_LIMITS, type AiChatMessage } from "@/lib/ai/chat";
import {
  AiProviderError,
  isQuotaError,
  readErrorStatus,
  readGoogleErrorCode,
  type AiCompletionRequest,
  type AiCompletionResult,
  type AiProvider,
} from "@/lib/ai/provider";
import { INCOMPLETE_FALLBACK, isIncompleteReply } from "@/lib/ai/reply";

export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
export const GEMINI_MAX_RETRIES = 2;
export const GEMINI_INCOMPLETE_RETRIES = 1;
const GEMINI_RETRY_BASE_MS = 200;
const TRANSIENT_GEMINI_HTTP = new Set([408, 429, 500, 503]);
const INCOMPLETE_OUTPUT_TOKENS = 1600;

export type GeminiContentPart = {
  text?: string | null;
  thought?: boolean;
};

export type GeminiGenerateContent = (params: {
  model: string;
  contents: ReturnType<typeof toGeminiContents>;
  config: {
    systemInstruction: string;
    maxOutputTokens: number;
  };
}) => Promise<{
  text?: string | null;
  finishReason?: string | null;
  candidates?: Array<{
    finishReason?: string | null;
    content?: { parts?: GeminiContentPart[] };
  }>;
}>;

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

export function isGeminiConfigured(apiKey = process.env.GEMINI_API_KEY): boolean {
  return Boolean(apiKey?.trim());
}

export function isTransientGeminiHttpStatus(status: number | undefined): boolean {
  return status != null && TRANSIENT_GEMINI_HTTP.has(status);
}

export function geminiRetryDelayMs(retryIndex: number, random = Math.random): number {
  const exponential = GEMINI_RETRY_BASE_MS * 2 ** retryIndex;
  const jitter = Math.round(random() * GEMINI_RETRY_BASE_MS);
  return exponential + jitter;
}

export function extractGeminiVisibleText(response: {
  text?: string | null;
  finishReason?: string | null;
  candidates?: Array<{
    finishReason?: string | null;
    content?: { parts?: GeminiContentPart[] };
  }>;
}): { text: string; finishReason?: string } {
  const candidate = response.candidates?.[0];
  const finishReason = candidate?.finishReason ?? response.finishReason ?? undefined;
  const fromParts = (candidate?.content?.parts ?? [])
    .filter((part) => Boolean(part.text?.trim()) && part.thought !== true)
    .map((part) => part.text?.trim() ?? "")
    .join("\n")
    .trim();

  return {
    text: fromParts || response.text?.trim() || "",
    finishReason: finishReason || undefined,
  };
}

export function toGeminiContents(messages: AiChatMessage[]) {
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  while (contents.at(-1)?.role === "model") {
    contents.pop();
  }

  return contents;
}

export function createGeminiProvider(options?: {
  apiKey?: string;
  model?: string;
  generateContent?: GeminiGenerateContent;
  sleep?: (ms: number) => Promise<void>;
}): AiProvider {
  return {
    id: "gemini",
    isConfigured() {
      return isGeminiConfigured(options?.apiKey ?? process.env.GEMINI_API_KEY);
    },
    async complete(request: AiCompletionRequest): Promise<AiCompletionResult> {
      const apiKey = options?.apiKey ?? process.env.GEMINI_API_KEY;
      if (!apiKey?.trim()) {
        throw new AiProviderError("not_configured");
      }

      const generateContent =
        options?.generateContent ??
        createDefaultGenerateContent(apiKey);
      const sleep = options?.sleep ?? defaultSleep;
      const baseParams = {
        model: options?.model || getGeminiModel(),
        contents: toGeminiContents(request.messages),
        config: {
          systemInstruction: request.instructions,
          maxOutputTokens: request.maxOutputTokens || AI_LIMITS.maxOutputTokens,
        },
      };

      const first = await generateWithTransientRetries(generateContent, baseParams, sleep);
      if (!isIncompleteReply(first.text, first.finishReason)) {
        return first;
      }

      console.error(
        `SOFIRA_AI_PROVIDER incomplete finish=${first.finishReason ?? "none"} retrying=${GEMINI_INCOMPLETE_RETRIES}`,
      );

      const retryParams = {
        ...baseParams,
        config: {
          ...baseParams.config,
          maxOutputTokens: Math.max(baseParams.config.maxOutputTokens, INCOMPLETE_OUTPUT_TOKENS),
          systemInstruction: `${baseParams.config.systemInstruction}\n\nWrite a complete answer in Bulgarian. Do not truncate. Do not start mid-sentence. End with a complete sentence or one question. Do not output URLs or markdown links. If a contact next step is appropriate, put CTA_CONTACT on its own last line.`,
        },
      };

      const second = await generateWithTransientRetries(generateContent, retryParams, sleep);
      if (!isIncompleteReply(second.text, second.finishReason)) {
        console.error("SOFIRA_AI_PROVIDER recovered incomplete");
        return second;
      }

      console.error(
        `SOFIRA_AI_PROVIDER incomplete fallback finish=${second.finishReason ?? "none"}`,
      );
      return { text: INCOMPLETE_FALLBACK, finishReason: "FALLBACK" };
    },
  };
}

async function generateWithTransientRetries(
  generateContent: GeminiGenerateContent,
  params: Parameters<GeminiGenerateContent>[0],
  sleep: (ms: number) => Promise<void>,
): Promise<AiCompletionResult> {
  const maxAttempts = GEMINI_MAX_RETRIES + 1;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const extracted = extractGeminiVisibleText(await generateContent(params));
      if (attempt > 1 && extracted.text) {
        console.error(`SOFIRA_AI_PROVIDER recovered attempts=${attempt}`);
      }

      return {
        text: extracted.text,
        finishReason: extracted.finishReason ?? (extracted.text ? undefined : "EMPTY"),
      };
    } catch (error) {
      if (error instanceof AiProviderError) {
        throw error;
      }

      lastError = error;
      const httpStatus = readErrorStatus(error);
      const googleCode = readGoogleErrorCode(error);
      const canRetry = attempt < maxAttempts && isTransientGeminiHttpStatus(httpStatus);

      if (canRetry) {
        console.error(
          `SOFIRA_AI_PROVIDER retry status=${httpStatus ?? "none"} code=${googleCode ?? "none"} attempt=${attempt}/${maxAttempts}`,
        );
        await sleep(geminiRetryDelayMs(attempt - 1));
        continue;
      }

      console.error(
        `SOFIRA_AI_PROVIDER status=${httpStatus ?? "none"} code=${googleCode ?? "none"} attempts=${attempt}`,
      );
      throw new AiProviderError(isQuotaError(error) ? "quota" : "unavailable", {
        httpStatus,
        googleCode,
      });
    }
  }

  const httpStatus = readErrorStatus(lastError);
  throw new AiProviderError(isQuotaError(lastError) ? "quota" : "unavailable", {
    httpStatus,
    googleCode: readGoogleErrorCode(lastError),
  });
}

function createDefaultGenerateContent(apiKey: string): GeminiGenerateContent {
  const client = new GoogleGenAI({ apiKey });
  return async (params) => {
    const response = await client.models.generateContent(params);
    return {
      text: response.text,
      finishReason: response.candidates?.[0]?.finishReason,
      candidates: response.candidates,
    };
  };
}

function defaultSleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

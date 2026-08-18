import type { AiChatMessage } from "@/lib/ai/chat";
import { createGeminiProvider } from "@/lib/ai/providers/gemini";
import { createOpenAiProvider } from "@/lib/ai/providers/openai";

export type AiProviderId = "gemini" | "openai";

export type AiCompletionRequest = {
  instructions: string;
  messages: AiChatMessage[];
  maxOutputTokens: number;
};

export type AiCompletionResult = {
  text: string;
  finishReason?: string;
};

export type AiProviderErrorCode = "not_configured" | "quota" | "unavailable";

export class AiProviderError extends Error {
  readonly code: AiProviderErrorCode;
  readonly httpStatus?: number;
  readonly googleCode?: string;

  constructor(
    code: AiProviderErrorCode,
    details?: { httpStatus?: number; googleCode?: string },
  ) {
    super(code);
    this.name = "AiProviderError";
    this.code = code;
    this.httpStatus = details?.httpStatus;
    this.googleCode = details?.googleCode;
  }
}

export type AiProvider = {
  id: AiProviderId;
  isConfigured(): boolean;
  complete(request: AiCompletionRequest): Promise<AiCompletionResult>;
};

export function getAiProviderId(): AiProviderId {
  const value = process.env.AI_PROVIDER?.trim().toLowerCase();
  return value === "openai" ? "openai" : "gemini";
}

export function getAiProvider(): AiProvider {
  return getAiProviderId() === "openai" ? createOpenAiProvider() : createGeminiProvider();
}

export function isQuotaError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const status = readErrorStatus(error);
  const code = "code" in error ? String((error as { code?: unknown }).code) : "";
  const message = error instanceof Error ? error.message : String(error);

  return (
    status === 429 ||
    /resource.?exhausted|insufficient.?quota|quota|rate.?limit|too many requests/i.test(
      `${code} ${message}`,
    )
  );
}

export function readErrorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return undefined;
  }

  const status = Number((error as { status?: unknown }).status);
  return Number.isFinite(status) && status > 0 ? status : undefined;
}

export function readGoogleErrorCode(error: unknown): string | undefined {
  const message = error instanceof Error ? error.message : String(error);
  const codes = [
    "ACCESS_TOKEN_TYPE_UNSUPPORTED",
    "API_KEY_INVALID",
    "MODEL_NOT_FOUND",
    "RESOURCE_EXHAUSTED",
    "FAILED_PRECONDITION",
    "PERMISSION_DENIED",
    "UNAUTHENTICATED",
    "INVALID_ARGUMENT",
    "NOT_FOUND",
  ] as const;

  return codes.find((code) => new RegExp(`\\b${code}\\b`, "i").test(message));
}

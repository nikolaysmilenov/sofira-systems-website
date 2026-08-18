import OpenAI from "openai";
import { getOpenAiModel, isOpenAiConfigured } from "@/lib/ai/openai-config";
import {
  AiProviderError,
  isQuotaError,
  type AiCompletionRequest,
  type AiCompletionResult,
  type AiProvider,
} from "@/lib/ai/provider";

export function createOpenAiProvider(options?: {
  apiKey?: string;
  model?: string;
  createResponse?: (params: {
    model: string;
    instructions: string;
    maxOutputTokens: number;
    input: Array<{ role: "user" | "assistant"; content: string }>;
  }) => Promise<{ output_text?: string | null }>;
}): AiProvider {
  return {
    id: "openai",
    isConfigured() {
      return Boolean(options?.apiKey?.trim()) || isOpenAiConfigured();
    },
    async complete(request: AiCompletionRequest): Promise<AiCompletionResult> {
      const apiKey = options?.apiKey ?? process.env.OPENAI_API_KEY;
      if (!apiKey?.trim()) {
        throw new AiProviderError("not_configured");
      }

      const createResponse =
        options?.createResponse ??
        (async (params) => {
          const openai = new OpenAI({ apiKey });
          return openai.responses.create({
            model: params.model,
            instructions: params.instructions,
            max_output_tokens: params.maxOutputTokens,
            input: params.input,
          });
        });

      try {
        const response = await createResponse({
          model: options?.model || getOpenAiModel(),
          instructions: request.instructions,
          maxOutputTokens: request.maxOutputTokens,
          input: request.messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        });

        const text = response.output_text?.trim() ?? "";
        if (!text) {
          throw new AiProviderError("unavailable");
        }

        return { text };
      } catch (error) {
        if (error instanceof AiProviderError) {
          throw error;
        }

        throw new AiProviderError(isQuotaError(error) ? "quota" : "unavailable");
      }
    },
  };
}

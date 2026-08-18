import { classifyIntent, inquiryTopicFromIntent } from "@/lib/ai/intent";
import { formatUntrustedUserContent } from "@/lib/ai/guardrails";

export const AI_LIMITS = {
  maxBodyBytes: 20_000,
  maxMessageLength: 1_500,
  maxMessages: 12,
  maxOutputTokens: 1200,
  rateLimit: 8,
  rateWindowMs: 60_000,
} as const;

export type AiChatRole = "user" | "assistant";

export type AiChatMessage = {
  role: AiChatRole;
  content: string;
  cta?: "contact" | "hr-hub" | "product";
};

export function inferInquiryTopic(text: string): string | undefined {
  return inquiryTopicFromIntent(classifyIntent(text));
}

export function toModelInput(messages: AiChatMessage[]): AiChatMessage[] {
  return messages.map((message) =>
    message.role === "user"
      ? { role: "user", content: formatUntrustedUserContent(message.content) }
      : message,
  );
}

export function readAiChatMessages(value: unknown): AiChatMessage[] | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const messages = (value as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > AI_LIMITS.maxMessages) {
    return null;
  }

  const parsed: AiChatMessage[] = [];

  for (const item of messages) {
    if (typeof item !== "object" || item === null) {
      return null;
    }

    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") {
      return null;
    }

    if (typeof content !== "string") {
      return null;
    }

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > AI_LIMITS.maxMessageLength) {
      return null;
    }

    parsed.push({ role, content: trimmed });
  }

  if (parsed[parsed.length - 1]?.role !== "user") {
    return null;
  }

  return parsed;
}

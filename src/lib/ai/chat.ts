import { classifyIntent, inquiryTopicFromIntent } from "@/lib/ai/intent";
import { formatUntrustedUserContent } from "@/lib/ai/guardrails";

export const AI_LIMITS = {
  maxBodyBytes: 20_000,
  maxMessageLength: 1_500,
  maxMessages: 24,
  maxAcceptedMessages: 48,
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

export type AiChatParseResult =
  | { ok: true; messages: AiChatMessage[] }
  | { ok: false; reason: "invalid" | "conversation_limit" | "message_limit"; lastUser: string };

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
  const parsed = parseAiChatPayload(value);
  return parsed.ok ? parsed.messages : null;
}

export function parseAiChatPayload(value: unknown): AiChatParseResult {
  if (typeof value !== "object" || value === null) {
    return { ok: false, reason: "invalid", lastUser: "" };
  }

  const messages = (value as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, reason: "invalid", lastUser: "" };
  }

  const parsed: AiChatMessage[] = [];

  for (const item of messages) {
    if (typeof item !== "object" || item === null) {
      return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
    }

    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") {
      return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
    }

    if (typeof content !== "string") {
      return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
    }

    if (trimmed.length > AI_LIMITS.maxMessageLength) {
      return { ok: false, reason: "message_limit", lastUser: role === "user" ? trimmed : lastUserFrom(parsed) };
    }

    parsed.push({ role, content: trimmed });
  }

  if (parsed[parsed.length - 1]?.role !== "user") {
    return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
  }

  if (parsed.length > AI_LIMITS.maxAcceptedMessages) {
    const bounded = parsed.slice(-AI_LIMITS.maxAcceptedMessages);
    while (bounded.length > 0 && bounded[bounded.length - 1]?.role !== "user") {
      bounded.pop();
    }
    if (bounded.length === 0 || bounded[bounded.length - 1]?.role !== "user") {
      return { ok: false, reason: "invalid", lastUser: lastUserFrom(parsed) };
    }
    return { ok: true, messages: bounded };
  }

  return { ok: true, messages: parsed };
}

function lastUserFrom(messages: AiChatMessage[]): string {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

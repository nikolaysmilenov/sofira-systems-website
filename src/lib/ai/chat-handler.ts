import { NextResponse } from "next/server";
import { AI_LIMITS, CONVERSATION_LIMIT_REPLY, parseAiChatPayload, toModelInput } from "@/lib/ai/chat";
import { isPromptInjection, isSecretProbe, resolveConsultantGuard, CONSULTANT_REPLIES } from "@/lib/ai/guardrails";
import { buildInternalTurnHint, classifyIntent } from "@/lib/ai/intent";
import { classifyLeadStage, userConversationText } from "@/lib/ai/qualification";
import {
  AiProviderError,
  getAiProvider,
  type AiProvider,
} from "@/lib/ai/provider";
import { INCOMPLETE_FALLBACK, isIncompleteReply, sanitizeConsultantReply, type ConsultantCta } from "@/lib/ai/reply";
import { buildSofiraAiInstructions } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

const jsonHeaders = {
  "Cache-Control": "no-store",
};

const CONFIG_ERROR =
  "Консултантът все още не е конфигуриран. Можете да заявите проект през формата за контакт.";
const QUOTA_ERROR =
  "Достигнат е лимитът за заявки към консултанта. Моля, опитайте отново след малко.";
const GENERIC_ERROR = "Възникна проблем при отговора. Моля, опитайте отново.";

export function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: { ...jsonHeaders, ...extraHeaders },
  });
}

export async function handleAiChatPost(
  request: Request,
  provider: AiProvider = getAiProvider(),
) {
  try {
    const clientKey = `ai:${getClientKey(request)}`;
    const limit = rateLimit(clientKey, AI_LIMITS.rateLimit, AI_LIMITS.rateWindowMs);

    if (limit.limited) {
      return json(
        {
          status: "error",
          message: "Твърде много опити. Моля, изчакайте малко и опитайте отново.",
        },
        429,
        { "Retry-After": String(limit.retryAfterSeconds) },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return json(
        { status: "invalid", message: "Невалидно съдържание на заявката." },
        415,
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > AI_LIMITS.maxBodyBytes) {
      return json({ status: "invalid", message: "Заявката е твърде голяма." }, 413);
    }

    const rawBody = await request.text();
    if (rawBody.length > AI_LIMITS.maxBodyBytes) {
      return json({ status: "invalid", message: "Заявката е твърде голяма." }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      return json(
        { status: "invalid", message: "Невалидно съдържание на заявката." },
        400,
      );
    }

    const parsed = parseAiChatPayload(payload);
    if (!parsed.ok) {
      if (parsed.reason === "conversation_limit") {
        if (isPromptInjection(parsed.lastUser) || isSecretProbe(parsed.lastUser)) {
          return json(
            okReply(
              isPromptInjection(parsed.lastUser)
                ? CONSULTANT_REPLIES.injection
                : CONSULTANT_REPLIES.secret,
            ),
            200,
          );
        }

        return json(okReply(CONVERSATION_LIMIT_REPLY, "contact"), 200);
      }

      if (parsed.reason === "message_limit") {
        return json(
          { status: "invalid", message: "Съобщението е твърде дълго. Моля, съкратете го." },
          413,
        );
      }

      return json(
        { status: "invalid", message: "Невалидно съдържание на заявката." },
        400,
      );
    }

    const messages = parsed.messages;

    const lastUser = messages[messages.length - 1]?.content ?? "";
    const guard = resolveConsultantGuard(lastUser, messages);
    if (guard.action === "block") {
      return json(okReply(guard.reply, guard.cta), 200);
    }

    if (!provider.isConfigured()) {
      return json({ status: "error", message: CONFIG_ERROR }, 503);
    }

    const intent = classifyIntent(userConversationText(messages) || lastUser);
    const stage = classifyLeadStage(messages);
    const result = await provider.complete({
      instructions: `${buildSofiraAiInstructions()}\n\n${buildInternalTurnHint(intent, stage)}`,
      messages: toModelInput(messages),
      maxOutputTokens: AI_LIMITS.maxOutputTokens,
    });

    const sanitized = sanitizeConsultantReply(result.text);
    if (!sanitized.reply || isIncompleteReply(sanitized.reply, result.finishReason)) {
      return json(okReply(INCOMPLETE_FALLBACK, "contact"), 200);
    }

    return json(okReply(sanitized.reply, sanitized.cta), 200);
  } catch (error) {
    if (error instanceof AiProviderError && error.code === "not_configured") {
      return json({ status: "error", message: CONFIG_ERROR }, 503);
    }

    if (error instanceof AiProviderError && error.code === "quota") {
      return json({ status: "error", message: QUOTA_ERROR }, 429);
    }

    return json({ status: "error", message: GENERIC_ERROR }, 500);
  }
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

function okReply(reply: string, cta?: ConsultantCta) {
  const sanitized = sanitizeConsultantReply(reply, cta);
  return sanitized.cta
    ? { status: "ok" as const, reply: sanitized.reply, cta: sanitized.cta }
    : { status: "ok" as const, reply: sanitized.reply };
}

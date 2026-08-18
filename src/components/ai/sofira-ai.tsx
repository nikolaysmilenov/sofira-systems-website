"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AiMessageContent } from "@/components/ai/ai-message-content";
import { contactPath, routes } from "@/data/navigation";
import { inferInquiryTopic, type AiChatMessage } from "@/lib/ai/chat";
import { GRACEFUL_FALLBACK, CTA_LINKS, type ConsultantCta } from "@/lib/ai/reply";
import { INTERNAL_LEAK_PATTERN } from "@/lib/ai/conversation";
import { cn } from "@/lib/cn";

const WELCOME =
  "Здравейте. Аз съм SOFIRA AI.\n\nМога да ви помогна да разберете какво можем да изградим за вашия бизнес, да ви насоча към подходяща услуга или да ви помогна да формулирате проект.";

const QUICK_ACTIONS = [
  { label: "Какво може да изгради SOFIRA?", prompt: "Какво може да изгради SOFIRA?" },
  { label: "Имам идея за софтуер", prompt: "Имам идея за софтуер" },
  { label: "Искам да автоматизирам процес", prompt: "Искам да автоматизирам процес" },
  { label: "Интересува ме AI", prompt: "Интересува ме AI" },
  { label: "Разкажи ми за HR HUB 360", prompt: "Разкажи ми за HR HUB 360" },
  { label: "Искам да заявя проект", prompt: "Искам да заявя проект" },
] as const;

export function SofiraAi() {
  const pathname = usePathname();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const onContact = pathname === routes.contact;

  const closePanel = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closePanel]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) {
      return;
    }

    const nextMessages: AiChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload: unknown = await response.json();
      const reply = getReply(payload);
      const cta = getCta(payload);

      if (!response.ok || !reply) {
        setError(getErrorMessage(payload));
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: reply, cta }]);
    } catch {
      setError(GRACEFUL_FALLBACK);
    } finally {
      setPending(false);
    }
  }

  const topic = inferInquiryTopic(
    [...messages].reverse().find((item) => item.role === "user")?.content || "",
  );

  return (
    <div className="pointer-events-none">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="sofira-ai-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "pointer-events-auto fixed z-40 inline-flex min-h-12 items-center gap-3 rounded-md border border-border bg-deep px-3 text-left text-on-deep shadow-[0_16px_40px_rgb(12_23_48_/_0.28)] transition-transform",
          "right-4",
          onContact
            ? "bottom-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] lg:bottom-6"
            : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
          open && "hidden",
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-cyan-bright/40 bg-white/6 font-display text-[11px] tracking-[0.16em] text-cyan-bright">
          AI
        </span>
        <span>
          <span className="block text-sm font-medium">SOFIRA AI</span>
          <span className="block text-[11px] text-deep-muted">Вашият дигитален консултант</span>
        </span>
      </button>

      {open ? (
        <div
          ref={dialogRef}
          id="sofira-ai-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto fixed z-50 flex w-[calc(100vw-1.5rem)] max-w-[26rem] flex-col overflow-hidden rounded-[1.2rem] border border-border bg-white shadow-[0_24px_70px_rgb(12_23_48_/_0.22)] right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[min(36rem,calc(100dvh-1.5rem))] sm:right-4"
        >
          <div className="relative overflow-hidden border-b border-white/10 bg-deep px-4 py-4 text-on-deep">
            <div className="blueprint-grid-deep pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="coord">CONSULTANT</p>
                <h2 id={titleId} className="mt-2 text-lg text-on-deep">
                  SOFIRA AI
                </h2>
                <p className="mt-1 text-xs text-deep-muted">Вашият дигитален консултант</p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-on-deep"
                aria-label="Затвори SOFIRA AI"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <div className="rounded-xl border border-border bg-navy-950 px-4 py-3">
              <AiMessageContent text={WELCOME} />
            </div>
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => void send(action.prompt)}
                    className="rounded-full border border-border bg-white px-3 py-2 text-left text-xs text-foreground hover:border-electric/40"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "rounded-xl px-4 py-3",
                  message.role === "user"
                    ? "ml-6 bg-deep text-on-deep"
                    : "mr-2 border border-border bg-navy-950",
                )}
              >
                {message.role === "assistant" ? (
                  <div className="space-y-2">
                    <AiMessageContent text={message.content} />
                    {message.cta ? (
                      <a
                        href={CTA_LINKS[message.cta].href}
                        className="inline-flex text-sm font-medium text-electric underline-offset-2 hover:underline"
                      >
                        {CTA_LINKS[message.cta].label}
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
              </div>
            ))}
            {pending ? (
              <p className="text-xs tracking-[0.18em] text-subtle uppercase" role="status">
                SOFIRA AI мисли…
              </p>
            ) : null}
            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <form
            className="border-t border-border bg-white p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label htmlFor="sofira-ai-input" className="sr-only">
              Съобщение към SOFIRA AI
            </label>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                id="sofira-ai-input"
                rows={2}
                value={draft}
                disabled={pending}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(draft);
                  }
                }}
                placeholder="Опишете задачата накратко…"
                className="w-full resize-none rounded-md border border-border bg-navy-950 px-3 py-2 text-sm text-foreground"
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-electric px-4 text-sm font-medium text-white disabled:opacity-60"
              >
                Изпрати
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <a href={contactPath(topic)} className="font-medium text-electric">
                Заявете проект
              </a>
              <a href={routes.hrHub360} className="text-subtle hover:text-foreground">
                Разгледайте HR HUB 360
              </a>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function getReply(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const status = (payload as { status?: unknown }).status;
  const reply = (payload as { reply?: unknown }).reply;
  return status === "ok" && typeof reply === "string" ? reply : undefined;
}

function getCta(payload: unknown): ConsultantCta | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const cta = (payload as { cta?: unknown }).cta;
  return cta === "contact" || cta === "hr-hub" || cta === "product" ? cta : undefined;
}

function getErrorMessage(payload: unknown): string {
  if (typeof payload === "object" && payload !== null) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      if (INTERNAL_LEAK_PATTERN.test(message) || /не е конфигуриран|твърде дълъг за този прозорец/i.test(message)) {
        return GRACEFUL_FALLBACK;
      }
      return message;
    }
  }

  return GRACEFUL_FALLBACK;
}

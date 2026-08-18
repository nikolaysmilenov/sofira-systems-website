import type { AiChatMessage } from "@/lib/ai/chat";

export type LeadStage = "INFORMATIONAL" | "EXPLORING" | "QUALIFIED" | "HIGH_INTENT";

const SIGNAL_PATTERNS = {
  company: /фирма|компания|организация|\bbusiness\b|\bcompany\b/i,
  size: /\d+\s*(служител|потребител|души|хора|user|employee|people)/i,
  process:
    /процес|отпуск|присъств|оферт|продажб|фактур|invoice|склад|клиент|договор|задача|документ/i,
  tools: /excel|sap|erp|\bcrm\b/i,
  desired: /искам|нуждая|управлявам|система|автомат|изградете|направите|need|want/i,
  problem: /проблем|грешк|губи|ръчн|разпил|бав|хаос/i,
  project: /конкретен проект|заявя проект|как да започнем|готов съм|ready to (start|inquire)/i,
} as const;

export function userConversationText(messages: AiChatMessage[]): string {
  return messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n");
}

export function classifyLeadStage(messages: AiChatMessage[]): LeadStage {
  const text = userConversationText(messages);
  if (!text.trim()) {
    return "INFORMATIONAL";
  }

  const matched = Object.entries(SIGNAL_PATTERNS).filter(([, pattern]) => pattern.test(text));
  const names = new Set(matched.map(([name]) => name));
  const detailCount = ["size", "process", "tools", "desired", "problem", "company"].filter((name) =>
    names.has(name),
  ).length;

  if (names.has("project") && (names.has("size") || names.has("process") || names.has("tools"))) {
    return "HIGH_INTENT";
  }

  if (detailCount >= 4) {
    return "HIGH_INTENT";
  }

  if (detailCount >= 3) {
    return "QUALIFIED";
  }

  if (detailCount >= 1) {
    return "EXPLORING";
  }

  return "INFORMATIONAL";
}

export function isMostlyEnglish(text: string): boolean {
  const letters = text.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
  if (!letters) {
    return false;
  }

  const latin = (text.match(/[A-Za-z]/g) ?? []).length;
  return latin / letters.length >= 0.6;
}

export function isHrProcessNeed(text: string): boolean {
  return /hr\s*hub|\bhr\b|човешки ресурс|персонал|отпуск|присъств|трудов|подбор|възнагражден|обучение|оценк/i.test(
    text,
  ) || (/договор/i.test(text) && /служител|hr\b|персонал/i.test(text));
}

export function isHrPeopleManagementNeed(text: string): boolean {
  return /управление на служител|система за служител|hr\s*система/i.test(text);
}

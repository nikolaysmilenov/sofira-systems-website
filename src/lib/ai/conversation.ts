import { AI_LIMITS, type AiChatMessage } from "@/lib/ai/chat";
import { isHrProcessNeed, userConversationText } from "@/lib/ai/qualification";

export const INTERNAL_LEAK_PATTERN =
  /консултантът все още не е конфигуриран|твърде дълъг за този прозорец|невалидно съдържание на заявката|GEMINI_API_KEY|OPENAI_API_KEY|not_configured|maxOutputTokens|maxMessages|token limit|conversation limit/i;

const RECENT_KEEP = 10;

export function compactConversation(messages: AiChatMessage[]): AiChatMessage[] {
  if (messages.length <= AI_LIMITS.maxMessages) {
    return messages;
  }

  const bounded =
    messages.length > AI_LIMITS.maxAcceptedMessages
      ? keepLastUserTurn(messages.slice(-AI_LIMITS.maxAcceptedMessages))
      : messages;

  if (bounded.length <= AI_LIMITS.maxMessages) {
    return bounded;
  }

  const recent = bounded.slice(-RECENT_KEEP);
  const older = bounded.slice(0, -RECENT_KEEP);
  const summary = summarizeConversation(older.concat(recent.slice(0, -1)));

  const compacted: AiChatMessage[] = [
    {
      role: "user",
      content: `Контекст от досегашния разговор: ${summary}`,
    },
    {
      role: "assistant",
      content: "Разбрах контекста дотук. Продължаваме от следващата практическа стъпка.",
    },
    ...recent,
  ];

  return compacted.length > AI_LIMITS.maxMessages
    ? compacted.slice(-AI_LIMITS.maxMessages)
    : compacted;
}

export function summarizeConversation(messages: AiChatMessage[]): string {
  const text = userConversationText(messages);
  const facts: string[] = [];

  const size = text.match(/(\d+)\s*(служител|потребител)/i);
  if (size) {
    facts.push(`${size[1]} ${size[2]}`);
  }

  if (isHrProcessNeed(text)) {
    const hr: string[] = [];
    if (/отпуск/i.test(text)) hr.push("отпуски");
    if (/присъств/i.test(text)) hr.push("присъствия");
    if (/документ/i.test(text)) hr.push("документи");
    if (/договор/i.test(text)) hr.push("договори");
    facts.push(hr.length ? `HR процеси: ${hr.join(", ")}` : "HR процеси");
  }

  if (/excel/i.test(text)) {
    facts.push("работа в Excel");
  }

  if (/клиент/i.test(text) && /оферт|задач|документ/i.test(text)) {
    facts.push("вътрешна система за клиенти и процеси");
  }

  if (/sap/i.test(text)) {
    facts.push("въпрос за SAP");
  }

  if (/фактур|invoice/i.test(text)) {
    facts.push("обработка на фактури");
  }

  if (/конкретен проект|искам да започнем/i.test(text)) {
    facts.push("конкретен проект");
  }

  return facts.length > 0
    ? facts.join("; ")
    : "посетителката описва бизнес нужда и търси подходящ тип софтуер";
}

function keepLastUserTurn(messages: AiChatMessage[]): AiChatMessage[] {
  const copy = [...messages];
  while (copy.length > 0 && copy[copy.length - 1]?.role !== "user") {
    copy.pop();
  }
  return copy;
}

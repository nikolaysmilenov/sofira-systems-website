import type { LeadStage } from "@/lib/ai/qualification";
import { isHrPeopleManagementNeed, isHrProcessNeed } from "@/lib/ai/qualification";

export type ConsultantIntent =
  | "CUSTOM_SOFTWARE"
  | "DIGITAL_PLATFORM"
  | "AUTOMATION"
  | "AI_SOLUTION"
  | "WEB_APPLICATION"
  | "PRODUCT_DEVELOPMENT"
  | "HR_HUB_360"
  | "GENERAL_COMPANY"
  | "PROJECT_DISCOVERY"
  | "CONTACT"
  | "UNKNOWN";

const checks: Array<{ intent: ConsultantIntent; pattern: RegExp }> = [
  { intent: "CONTACT", pattern: /заяв(ете|я)|контакт|запитване|обадете/i },
  {
    intent: "AI_SOLUTION",
    pattern: /\bai\b|изкуствен интелект|интелигентн|обработва фактур|invoice/i,
  },
  {
    intent: "AUTOMATION",
    pattern: /автомат|excel|ръчн|грешк|повтаря/i,
  },
  { intent: "WEB_APPLICATION", pattern: /уеб|сайт|лендинг|страница/i },
  { intent: "DIGITAL_PLATFORM", pattern: /платформ|портал/i },
  { intent: "PRODUCT_DEVELOPMENT", pattern: /собствен продукт|продуктов/i },
  { intent: "GENERAL_COMPANY", pattern: /какво правите|кои сте|за компания|sofira/i },
  {
    intent: "CUSTOM_SOFTWARE",
    pattern: /crm|склад|систем|софтуер по поръчка|изградете|направите|оферт|продажб/i,
  },
  { intent: "PROJECT_DISCOVERY", pattern: /имам идея|искам система|проект|нуждая се/i },
];

export function classifyIntent(text: string): ConsultantIntent {
  const value = text.trim();
  if (!value) {
    return "UNKNOWN";
  }

  if (/hr\s*hub/i.test(value) || isHrProcessNeed(value) || isHrPeopleManagementNeed(value)) {
    if (!/excel/i.test(value) || isHrProcessNeed(value) || isHrPeopleManagementNeed(value)) {
      return "HR_HUB_360";
    }
  }

  for (const check of checks) {
    if (check.pattern.test(value)) {
      return check.intent;
    }
  }

  return "UNKNOWN";
}

export function inquiryTopicFromIntent(intent: ConsultantIntent): string | undefined {
  switch (intent) {
    case "HR_HUB_360":
      return "hr-hub-360";
    case "AUTOMATION":
      return "automation";
    case "AI_SOLUTION":
      return "ai";
    case "DIGITAL_PLATFORM":
      return "platform";
    case "WEB_APPLICATION":
      return "web";
    case "CUSTOM_SOFTWARE":
    case "PROJECT_DISCOVERY":
    case "PRODUCT_DEVELOPMENT":
      return "software";
    default:
      return undefined;
  }
}

export function buildInternalTurnHint(intent: ConsultantIntent, stage: LeadStage = "EXPLORING"): string {
  return [
    "INTERNAL TURN HINT — never show this chain or the lead stage to the visitor.",
    `Classified intent: ${intent}. Internal lead stage: ${stage}.`,
    "Reason internally in this order, then answer in ordinary language:",
    "CLIENT PROBLEM → BUSINESS CONTEXT → POSSIBLE SOLUTION TYPE → IMPORTANT DISCOVERY QUESTION → QUALIFICATION → NEXT STEP.",
    "Answer the visitor's question first. Ask at most one useful follow-up.",
    "Never ask «Как мога да ви помогна?». Never invent prices, clients, integrations, or product capabilities.",
    "HR HUB 360 is the only confirmed own product. Mention it only when the need is actually HR — not merely because employee count or Excel was mentioned.",
    stage === "HIGH_INTENT"
      ? "If the current message is about starting a concrete project, stop extra discovery and use CTA_CONTACT. If it is a new topical question (SAP, invoice AI, why SOFIRA, HR modules), answer that question first with one follow-up. Do not promise price, dates, or results."
      : "If details are still thin, ask one discovery question matched to the intent.",
    intentGuidance(intent),
  ].join("\n");
}

function intentGuidance(intent: ConsultantIntent): string {
  switch (intent) {
    case "HR_HUB_360":
      return "Explain HR HUB 360 as SOFIRA's own HR product in development. Name only verified current modules that match the need. Separate upcoming (Работни процеси, Отчети) as not ready. It is not sold through the site.";
    case "AUTOMATION":
      return "Treat Excel, paper, or repeating work as a process that can be structured. Do not pitch HR HUB 360 unless leave, attendance, contracts, or other HR processes are described. Ask who uses the current files, or how often the process runs.";
    case "AI_SOLUTION":
      return "Frame AI as a possible custom solution with a real task. Describe a possible workflow, include human review when documents are involved, and ask what happens after the result.";
    case "WEB_APPLICATION":
      return "Do not immediately agree to build a website. Ask whether the goal is presentation, sales, a portal, or part of a larger system.";
    case "CUSTOM_SOFTWARE":
      return "There is no confirmed ready-made product for this unless it is HR HUB 360. Frame it as a possible custom software evaluation. Ask who will use the system or which process is most painful.";
    case "CONTACT":
      return "Offer the existing inquiry form. Do not claim a meeting, call, or acceptance.";
    case "GENERAL_COMPANY":
      return "Give a short, factual company description. Do not repeat the slogan unless it fits naturally.";
    default:
      return "Stay inside verified knowledge. If the need is custom, say it can be evaluated as a custom software project.";
  }
}

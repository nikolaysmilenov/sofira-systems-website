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
    intent: "HR_HUB_360",
    pattern: /hr\s*hub|служител|отпуск|hr\b|човешки ресурс|персонал/i,
  },
  {
    intent: "AI_SOLUTION",
    pattern: /\bai\b|изкуствен интелект|интелигентн|обработва фактур/i,
  },
  {
    intent: "AUTOMATION",
    pattern: /автомат|excel|ръчн|грешк|повтаря/i,
  },
  { intent: "WEB_APPLICATION", pattern: /уеб|сайт|лендинг|страница/i },
  { intent: "DIGITAL_PLATFORM", pattern: /платформ|портал|модул/i },
  { intent: "PRODUCT_DEVELOPMENT", pattern: /собствен продукт|продуктов/i },
  { intent: "GENERAL_COMPANY", pattern: /какво правите|кои сте|за компания|sofira/i },
  {
    intent: "CUSTOM_SOFTWARE",
    pattern: /crm|склад|систем|софтуер по поръчка|изградете|направите/i,
  },
  { intent: "PROJECT_DISCOVERY", pattern: /имам идея|искам система|проект|нуждая се/i },
];

export function classifyIntent(text: string): ConsultantIntent {
  const value = text.trim();
  if (!value) {
    return "UNKNOWN";
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

export function buildInternalTurnHint(intent: ConsultantIntent): string {
  return [
    "INTERNAL TURN HINT — never show this chain to the visitor.",
    `Classified intent: ${intent}.`,
    "Reason internally in this order, then answer in ordinary language:",
    "PROBLEM → CURRENT PROCESS → USERS → DATA → REQUIREMENTS → AUTOMATION / AI / SOFTWARE OPPORTUNITY → POSSIBLE SOLUTION → NEXT STEP.",
    "Answer the visitor's question first. Ask at most one useful follow-up.",
    intentGuidance(intent),
  ].join("\n");
}

function intentGuidance(intent: ConsultantIntent): string {
  switch (intent) {
    case "HR_HUB_360":
      return "Explain HR HUB 360 as SOFIRA's own HR product in development. Briefly name current modules. Separate upcoming (Работни процеси, Отчети) as not ready. It is not sold through the site. If Excel is also mentioned, ask who uses the current files.";
    case "AUTOMATION":
      return "Treat this as a process that can be structured and possibly automated. Ask whether the current file or process is used by one person or several before recommending a system.";
    case "AI_SOLUTION":
      return "AI is appropriate only with a clear task. Ask what document or process should be handled and what happens after the result.";
    case "WEB_APPLICATION":
      return "Do not immediately agree to build a website. Ask whether the goal is presentation, sales, a portal, or part of a larger system.";
    case "CUSTOM_SOFTWARE":
      return "There is no confirmed ready-made product for this unless it is HR HUB 360. Frame it as a possible custom software evaluation.";
    case "CONTACT":
      return "Offer the existing inquiry form. Do not claim a meeting, call, or acceptance.";
    case "GENERAL_COMPANY":
      return "Give a short, factual company description. Do not repeat the slogan unless it fits naturally.";
    default:
      return "Stay inside verified knowledge. If the need is custom, say it can be evaluated as a custom software project.";
  }
}

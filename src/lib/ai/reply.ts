export type ConsultantCta = "contact" | "hr-hub" | "product";

export const GRACEFUL_FALLBACK =
  "В момента не мога да дам надежден отговор на този въпрос. Мога обаче да помогна с конкретна информация за услугите, HR HUB 360 или възможен софтуерен проект.\n\nКакво искате да подобрите в работата на компанията?";

export const COMPACT_CONTINUE =
  "Разбрах контекста дотук. Нека го сведем до следващата практическа стъпка.\n\nКой процес искате да подобрите първо?";

export const INCOMPLETE_FALLBACK = GRACEFUL_FALLBACK;

export function isGenericFallbackReply(text: string): boolean {
  return /в момента не мога да дам надежден отговор/i.test(text);
}

export const CTA_LINKS: Record<ConsultantCta, { href: string; label: string }> = {
  contact: { href: "/kontakt", label: "Заявете проект" },
  "hr-hub": { href: "/kontakt?tema=hr-hub-360", label: "Заявете проект" },
  product: { href: "/produkti/hr-hub-360", label: "Разгледайте HR HUB 360" },
};

const ALLOWED_PATHS = new Set([
  "/kontakt",
  "/kontakt?tema=hr-hub-360",
  "/produkti",
  "/produkti/hr-hub-360",
  "/uslugi",
  "/za-nas",
  "/proekti",
]);

const BLOCKED_URL =
  /(?:vscode-file:|vscode:|file:\/\/|https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?[^\s)>\]]*|https?:\/\/[^\s)>\]]+)/gi;

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const CTA_TOKEN = /\bCTA_(CONTACT|HR_HUB|PRODUCT)\b/g;

export function isIncompleteReply(text: string, finishReason?: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) {
    return true;
  }

  if (/MAX_TOKENS|LENGTH|MALFORMED/i.test(finishReason ?? "")) {
    return true;
  }

  if (/^([a-zа-яё]|и |а |но |\*\*[a-zа-яё])/u.test(trimmed)) {
    return true;
  }

  const boldMarks = trimmed.match(/\*\*/g);
  if (boldMarks && boldMarks.length % 2 !== 0) {
    return true;
  }

  const lastLine = trimmed.split("\n").filter((line) => line.trim()).at(-1)?.trim() ?? "";
  if (/[,;:]$/.test(lastLine)) {
    return true;
  }

  if (/[.!?…]$/.test(lastLine)) {
    return false;
  }

  if (/^[-*]\s+\S.{11,}/.test(lastLine) && lastLine.length >= 24) {
    return false;
  }

  return /[A-Za-zА-Яа-яЁё0-9)]$/.test(lastLine);
}

export function ctaFromToken(value: string): ConsultantCta | undefined {
  switch (value.toUpperCase()) {
    case "CONTACT":
      return "contact";
    case "HR_HUB":
      return "hr-hub";
    case "PRODUCT":
      return "product";
    default:
      return undefined;
  }
}

export function ctaFromPath(path: string): ConsultantCta | undefined {
  const normalized = path.trim();
  if (normalized === "/kontakt?tema=hr-hub-360") {
    return "hr-hub";
  }
  if (normalized === "/produkti/hr-hub-360" || normalized === "/produkti") {
    return "product";
  }
  if (normalized === "/kontakt") {
    return "contact";
  }
  return undefined;
}

export function sanitizeConsultantReply(
  text: string,
  preferredCta?: ConsultantCta,
): { reply: string; cta?: ConsultantCta } {
  let cta = preferredCta;
  let reply = text.replace(/\r\n/g, "\n");

  reply = reply.replace(CTA_TOKEN, (_, token: string) => {
    cta = cta ?? ctaFromToken(token);
    return "";
  });

  reply = reply.replace(MARKDOWN_LINK, (_, _label: string, href: string) => {
    const path = toAllowedPath(href);
    if (path) {
      cta = cta ?? ctaFromPath(path);
    }
    return "";
  });

  reply = reply.replace(BLOCKED_URL, (url) => {
    const path = toAllowedPath(url);
    if (path) {
      cta = cta ?? ctaFromPath(path);
    }
    return "";
  });

  reply = reply
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cta ? { reply, cta } : { reply };
}

function toAllowedPath(value: string): string | undefined {
  const trimmed = value.trim();
  if (ALLOWED_PATHS.has(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed, "https://sofirasystems.com");
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      const path = `${parsed.pathname}${parsed.search}`;
      if (ALLOWED_PATHS.has(path)) {
        return path;
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export const defaultLocale = "bg";

export const locales = ["bg"] as const;

export type Locale = (typeof locales)[number];

export const localeMeta = {
  bg: {
    htmlLang: "bg",
    openGraph: "bg_BG",
  },
} as const;

/**
 * The public site currently ships Bulgarian only.
 * Future locales can be added here without changing product or service data shapes.
 * Route prefixes such as /bg and /en are intentionally not implemented yet.
 */

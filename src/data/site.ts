import { defaultLocale, localeMeta } from "@/config/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const site = {
  name: "SOFIRA SYSTEMS",
  shortName: "SOFIRA",
  domain: "sofirasystems.com",
  get url() {
    return getSiteUrl();
  },
  locale: localeMeta[defaultLocale].openGraph,
  language: defaultLocale,
  title: "SOFIRA SYSTEMS — Софтуерни системи за бизнеса",
  description:
    "SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, софтуерни системи, автоматизация, AI решения и собствени продукти. Водещ продукт: HR HUB 360.",
  logo: {
    mark: "/brand/sofira-logo.png",
    wordmark: "/brand/sofira-wordmark.png",
    alt: "SOFIRA SYSTEMS",
    markWidth: 362,
    markHeight: 390,
  },
} as const;

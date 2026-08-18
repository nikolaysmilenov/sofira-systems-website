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
  title: "SOFIRA SYSTEMS — Софтуерни системи за реалния бизнес",
  description:
    "SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, автоматизация, AI решения и собствени дигитални продукти.",
  logo: {
    mark: "/brand/sofira-logo.png",
    wordmark: "/brand/sofira-wordmark.png",
    alt: "SOFIRA SYSTEMS",
    markWidth: 362,
    markHeight: 390,
  },
} as const;

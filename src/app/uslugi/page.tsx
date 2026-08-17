import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { DualTrack } from "@/components/sections/dual-track";
import { PageHero } from "@/components/sections/page-hero";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Услуги",
  description:
    "SOFIRA SYSTEMS разработва софтуер по поръчка, дигитални платформи, автоматизация, AI решения, уеб приложения и собствени софтуерни продукти.",
  path: "/uslugi",
  ogTitle: "Услуги за софтуер и автоматизация | SOFIRA SYSTEMS",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Услуги"
        title="Клиентски системи и собствени продукти"
        description="Разделяме работата ясно: софтуер за конкретна организация и продукти, които SOFIRA SYSTEMS развива самостоятелно."
      />
      <WhatWeBuild />
      <DualTrack />
      <ContactCta />
    </>
  );
}

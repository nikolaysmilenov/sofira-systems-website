import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { TechnologyView } from "@/components/technology/technology-view";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Технологии",
  description:
    "Как SOFIRA SYSTEMS изгражда системи: проверени технологии, инженерни слоеве и връзка към реални проекти.",
  path: "/tehnologii",
  ogTitle: "Технологии и инженеринг | SOFIRA SYSTEMS",
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Технологии"
        title="Как изграждаме цифрови системи."
        description="Не списък от логота. Слоеве, които реално използваме в публичния сайт, HR HUB 360 и STINGER — и къде се свързват."
      />
      <TechnologyView />
      <ContactCta />
    </>
  );
}

import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { OwnProducts } from "@/components/sections/own-products";
import { ProjectsTeaser } from "@/components/sections/projects-teaser";
import { SofiraAiTeaser } from "@/components/sections/sofira-ai-teaser";
import { TechnologyPreview } from "@/components/sections/technology-preview";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { howWeBuildSteps } from "@/data/process";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Софтуерни системи за реалния бизнес",
  description:
    "SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, автоматизация, AI решения и собствени дигитални продукти. Собствени продукти в разработка: HR HUB 360 и STINGER.",
  path: "/",
  ogTitle: "SOFIRA SYSTEMS — софтуерни системи за реалния бизнес",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhatWeBuild />
      <OwnProducts />
      <HowWeWork
        eyebrow="HOW WE BUILD"
        title="Как изграждаме."
        description="Не започваме от шаблон. Започваме от бизнес процеса — стъпки, роли и данни — и стигаме до работеща система."
        steps={howWeBuildSteps}
      />
      <ProjectsTeaser />
      <TechnologyPreview />
      <SofiraAiTeaser />
      <ContactCta
        title="Имате процес, който трябва да стане система?"
        description="Опишете как работите днес. Ще уточним какво има смисъл да бъде изградено."
      />
    </>
  );
}

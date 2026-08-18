import type { Metadata } from "next";
import { BeyondWebsites } from "@/components/sections/beyond-websites";
import { ContactCta } from "@/components/sections/contact-cta";
import { DualTrack } from "@/components/sections/dual-track";
import { HomeHero } from "@/components/sections/home-hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { NeedSelector } from "@/components/sections/need-selector";
import { ProblemToSystem } from "@/components/sections/problem-to-system";
import { ProductFeature } from "@/components/sections/product-feature";
import { ProjectsTeaser } from "@/components/sections/projects-teaser";
import { SystemStack } from "@/components/sections/system-stack";
import { WhatYouGet } from "@/components/sections/what-you-get";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Софтуерни системи за бизнеса",
  description:
    "SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, дигитални платформи, автоматизация и AI решения. Собствен продукт: HR HUB 360.",
  path: "/",
  ogTitle: "SOFIRA SYSTEMS — софтуерни системи за бизнеса",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <NeedSelector />
      <ProblemToSystem />
      <BeyondWebsites />
      <SystemStack />
      <HowWeWork />
      <DualTrack />
      <ProductFeature />
      <WhatYouGet />
      <ProjectsTeaser />
      <ContactCta />
    </>
  );
}

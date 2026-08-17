import type { Metadata } from "next";
import { AutomationSection } from "@/components/sections/automation-section";
import { BeyondWebsites } from "@/components/sections/beyond-websites";
import { BuiltWithPurpose } from "@/components/sections/built-with-purpose";
import { ContactCta } from "@/components/sections/contact-cta";
import { DualTrack } from "@/components/sections/dual-track";
import { HomeHero } from "@/components/sections/home-hero";
import { PracticalAi } from "@/components/sections/practical-ai";
import { ProductFeature } from "@/components/sections/product-feature";
import { TechnologyShowcase } from "@/components/sections/technology-showcase";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { WhySofira } from "@/components/sections/why-sofira";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Софтуерни системи за бизнеса",
  description:
    "SOFIRA SYSTEMS създава софтуер по поръчка, дигитални платформи, автоматизация и AI решения. Собствен продукт: HR HUB 360.",
  path: "/",
  ogTitle: "SOFIRA SYSTEMS — софтуерни системи за бизнеса",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TechnologyShowcase />
      <WhatWeBuild />
      <DualTrack />
      <ProductFeature />
      <BuiltWithPurpose />
      <PracticalAi />
      <AutomationSection />
      <BeyondWebsites />
      <WhySofira />
      <ContactCta />
    </>
  );
}

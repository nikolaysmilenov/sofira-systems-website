import type { Metadata } from "next";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { ContactCta } from "@/components/sections/contact-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ProductFeature } from "@/components/sections/product-feature";
import { ProductsSection } from "@/components/sections/products-section";
import { ServicesSection } from "@/components/sections/services-section";
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
      <WhatWeDo />
      <ServicesSection />
      <ProductsSection />
      <ProductFeature />
      <HowWeWork />
      <WhySofira />
      <ContactCta />
    </>
  );
}

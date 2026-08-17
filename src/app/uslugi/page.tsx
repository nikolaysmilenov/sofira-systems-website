import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { DualTrack } from "@/components/sections/dual-track";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceArchitecture } from "@/components/sections/service-architecture";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Услуги",
  description:
    "Какво изграждаме: софтуер по поръчка, дигитални платформи, автоматизация, AI решения, уеб приложения и продуктова разработка.",
  path: "/uslugi",
  ogTitle: "Какво изграждаме | SOFIRA SYSTEMS",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Услуги"
        title="Какво изграждаме"
        description="Софтуер по поръчка, дигитални платформи, автоматизация, AI решения и уеб приложения. Отделно развиваме собствени продукти."
      />
      <ServiceArchitecture />
      <DualTrack />
      <ContactCta />
    </>
  );
}

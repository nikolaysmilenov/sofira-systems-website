import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { DualTrack } from "@/components/sections/dual-track";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceArchitecture } from "@/components/sections/service-architecture";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/data/navigation";
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
      <section className="border-b border-border bg-white">
        <Container className="flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div className="max-w-2xl">
            <p className="coord">START FROM THE PROBLEM</p>
            <h2 className="mt-3 text-2xl text-foreground sm:text-3xl">
              Не сте сигурни откъде да започнете?
            </h2>
          </div>
          <Button href={routes.useCases} variant="ghost" className="w-fit">
            Вижте случаи
          </Button>
        </Container>
      </section>
      <ContactCta />
    </>
  );
}

import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { clientServices, productServices } from "@/data/services";
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
        eyebrow="Услуги"
        title="Клиентски системи и собствени продукти"
        description="Разделяме работата ясно: софтуер за конкретна организация и продукти, които SOFIRA SYSTEMS развива самостоятелно."
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <section>
          <h2 className="text-2xl text-foreground sm:text-3xl">
            Работим с бизнеса
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Софтуер, платформи, автоматизация и уеб решения според реалните
            процеси на компанията.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {clientServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index + 1}
                variant="detail"
              />
            ))}
          </div>
        </section>
        <section className="mt-16">
          <h2 className="text-2xl text-foreground sm:text-3xl">
            Създаваме собствени продукти
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Отделна линия от клиентските проекти. HR HUB 360 е първият публичен
            продукт.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {productServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index + 1}
                variant="detail"
              />
            ))}
          </div>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}

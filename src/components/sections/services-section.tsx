import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <Section className="bg-navy-950">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Услуги"
          title="Клиентски системи и собствени продукти"
          description="Разработваме софтуер за конкретни бизнес процеси и отделно изграждаме собствена продуктова линия."
        />
        <Button href={routes.services} variant="secondary" className="w-fit">
          {ctaCopy.viewServices}
        </Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index + 1}
            href={
              service.group === "product" ? routes.products : undefined
            }
          />
        ))}
      </div>
    </Section>
  );
}

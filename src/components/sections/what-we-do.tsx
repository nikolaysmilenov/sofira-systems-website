import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

const pillars = [
  {
    title: "Работим с бизнеса",
    text: "Възлагате ни софтуер по поръчка, дигитални платформи, автоматизация, AI решения и уеб разработки според реалните процеси на организацията.",
    href: routes.services,
    cta: ctaCopy.viewServices,
  },
  {
    title: "Създаваме собствени продукти",
    text: "SOFIRA SYSTEMS развива собствени софтуерни системи, отделно от клиентските проекти. HR HUB 360 е първият публичен продукт.",
    href: routes.products,
    cta: ctaCopy.viewProducts,
  },
];

export function WhatWeDo() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Компанията"
        title="Две посоки. Една инженерна практика."
        description="Можете да ни възложите система за вашия бизнес или да разгледате продуктите, които развиваме самостоятелно."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {pillars.map((item) => (
          <Surface key={item.title} className="flex h-full flex-col p-6 sm:p-8">
            <h3 className="text-xl text-foreground">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
              {item.text}
            </p>
            <div className="mt-6">
              <Button href={item.href} variant="secondary">
                {item.cta}
              </Button>
            </div>
          </Surface>
        ))}
      </div>
    </Section>
  );
}

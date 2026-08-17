import { Briefcase, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

const pillars = [
  {
    title: "Работим с бизнеса",
    text: "Създаваме софтуер по поръчка и дигитални системи около реалните процеси на организацията — с ясен обхват, роли и възможност за дългосрочна поддръжка.",
    href: routes.services,
    cta: ctaCopy.viewServices,
    icon: Briefcase,
  },
  {
    title: "Създаваме собствени продукти",
    text: "Паралелно развиваме собствени софтуерни продукти. HR HUB 360 е първата публична система в тази линия — отделно от клиентските проекти.",
    href: routes.products,
    cta: ctaCopy.viewProducts,
    icon: Boxes,
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
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-electric/8 text-electric">
              <item.icon aria-hidden="true" size={20} />
            </span>
            <h3 className="mt-5 text-xl text-foreground">{item.title}</h3>
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

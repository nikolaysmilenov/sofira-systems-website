import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { getServiceHref, services } from "@/data/services";

const homepageOrder = [
  "softuerni-sistemi",
  "avtomatizatsiya",
  "ai-resheniya",
  "digitalni-platformi",
  "ueb-razrabotki",
  "produktova-razrabotka",
] as const;

const items = homepageOrder.map((slug, index) => {
  const service = services.find((entry) => entry.slug === slug);
  if (!service) {
    throw new Error(`Missing service: ${slug}`);
  }

  return {
    index: String(index + 1).padStart(2, "0"),
    title:
      service.slug === "produktova-razrabotka"
        ? "Собствени продукти"
        : service.title,
    explanation: service.shortDescription,
    problem: service.problem,
    href:
      service.group === "product" ? routes.products : getServiceHref(service.slug),
    cta:
      service.group === "product" ? ctaCopy.viewProducts : ctaCopy.learnMore,
  };
});

export function WhatWeBuild() {
  return (
    <Section id="kakvo-izgrazhdame">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="coord">WHAT WE BUILD</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">
            Какво изграждаме
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Софтуерни системи около реалния процес — не шаблонни сайтове и не
            общи обещания.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={routes.services} variant="secondary" className="w-fit">
            {ctaCopy.viewServices}
          </Button>
          <Button href={routes.useCases} variant="ghost" className="w-fit">
            Вижте случаи
          </Button>
        </div>
      </div>

      <ol className="mt-12 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li
            key={item.index}
            className="grid min-w-0 gap-4 py-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[5rem_minmax(0,1fr)_auto] lg:items-end"
          >
            <p className="font-display text-2xl text-electric sm:text-3xl">
              {item.index}
            </p>
            <div className="min-w-0 max-w-2xl">
              <h3 className="text-2xl text-foreground sm:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {item.explanation}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-subtle">
                {item.problem}
              </p>
            </div>
            <Button
              href={item.href}
              variant="ghost"
              className="w-fit lg:justify-self-end"
            >
              {item.cta}
            </Button>
          </li>
        ))}
      </ol>
    </Section>
  );
}

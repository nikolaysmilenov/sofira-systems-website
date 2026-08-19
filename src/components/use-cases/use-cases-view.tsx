"use client";

import { useState } from "react";
import { SOFIRA_AI_OPEN_EVENT } from "@/components/ai/sofira-ai";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  hrHubCurrentModules,
  hrHubUpcomingModules,
  useCases,
} from "@/data/use-cases";
import { routes } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function UseCasesView() {
  const [selectedId, setSelectedId] = useState(useCases[0].id);
  const selected = useCases.find((item) => item.id === selectedId) ?? useCases[0];
  const isHr = selected.id === "hr";

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">USE CASES</p>
          <h1 className="mt-5 max-w-4xl text-4xl text-on-deep sm:text-6xl">
            Къде има смисъл от собствена система?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
            Започваме от бизнес процеса, не от технологична дума. Изберете
            ситуация, за да видите какво има смисъл да се разгледа първо.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <p className="coord">PROBLEM MAP</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
            Разпознайте процеса
          </h2>
          <div
            className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8"
            role="group"
            aria-label="Изберете бизнес проблем"
          >
            {useCases.map((item) => {
              const active = item.id === selected.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  aria-controls="use-case-details"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "min-h-12 rounded-md border px-3 py-3 text-left text-xs font-medium tracking-label transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric",
                    active
                      ? "border-electric bg-electric text-white"
                      : "border-border bg-white text-foreground hover:border-electric/50",
                  )}
                >
                  {item.selector}
                </button>
              );
            })}
          </div>

          <article
            id="use-case-details"
            aria-live="polite"
            className="mt-8 min-w-0 border border-border bg-navy-950"
          >
            <div className="border-b border-border px-5 py-5 sm:px-8 sm:py-6">
              <p className="coord">USE CASE / {selected.index}</p>
              <h3 className="mt-4 text-3xl text-foreground sm:text-4xl">
                {selected.title}
              </h3>
            </div>
            <div className="grid min-w-0 gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-kicker text-subtle">
                  Проблем
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  {selected.problem}
                </p>
                <p className="mt-8 text-xs font-medium tracking-kicker text-subtle">
                  Възможна посока
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground sm:text-lg">
                  {selected.direction}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-kicker text-subtle">
                  Какво проверяваме първо
                </p>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {selected.examine.map((item) => (
                    <li key={item} className="py-3 text-sm leading-relaxed text-muted sm:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xs font-medium tracking-kicker text-subtle">
                  Релевантна посока
                </p>
                <Button href={selected.relevant.href} variant="ghost" className="mt-3">
                  {selected.relevant.label}
                </Button>
              </div>
            </div>

            {isHr ? (
              <div className="border-t border-border bg-white px-5 py-8 sm:px-8">
                <p className="coord">HR HUB 360 / OWN PRODUCT / В РАЗРАБОТКА</p>
                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium tracking-kicker text-subtle">
                      Текущи модули
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {hrHubCurrentModules.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border bg-navy-950 px-3 py-2 text-sm text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-kicker text-subtle">
                      Предстои — още не е готово
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {hrHubUpcomingModules.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border px-3 py-2 text-sm text-subtle"
                        >
                          {item} — Скоро
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-border px-5 py-5 sm:flex-row sm:px-8 sm:py-6">
              <Button href={selected.cta.href}>{selected.cta.label}</Button>
              {selected.secondaryCta ? (
                <Button href={selected.secondaryCta.href} variant="ghost">
                  {selected.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </article>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:py-20">
          <div className="max-w-2xl">
            <p className="coord">NEXT STEP</p>
            <h2 className="mt-4 text-3xl text-on-deep sm:text-4xl">
              Не сте сигурни кой случай е вашият?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-deep-muted sm:text-lg">
              SOFIRA AI може да помогне да опишете текущия процес и да намерите
              вероятната посока. Той е консултант за ориентация, не замества
              оценката на реалния обхват.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              window.dispatchEvent(new Event(SOFIRA_AI_OPEN_EVENT));
            }}
            className="w-fit"
          >
            Попитайте SOFIRA AI
          </Button>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container className="flex flex-col gap-5 py-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:py-16">
          <div>
            <p className="coord">RELATED</p>
            <p className="mt-3 text-base text-muted">
              Вижте услугите, проектите и инженерния подход на SOFIRA SYSTEMS.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={routes.services} variant="ghost">Услуги</Button>
            <Button href={routes.projects} variant="ghost">Проекти</Button>
            <Button href={routes.technology} variant="ghost">Технологии</Button>
            <Button href={routes.resources} variant="ghost">Ресурси</Button>
            <Button href={routes.contact} variant="ghost">Контакт</Button>
          </div>
        </Container>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

const items = [
  {
    id: "softuerni-sistemi",
    index: "01",
    title: "Софтуерни системи",
    text: "Работещ софтуер по реалния процес на организацията — с роли, данни и възможност за поддръжка.",
    detail: "INTERFACE → LOGIC → DATABASE → USER",
  },
  {
    id: "digitalni-platformi",
    index: "02",
    title: "Дигитални платформи",
    text: "Свързани модули, права и работни потоци в една среда, която екипът използва всеки ден.",
    detail: "MODULES → ROLES → WORKFLOWS → OPERATIONS",
  },
  {
    id: "avtomatizatsiya",
    index: "03",
    title: "Автоматизация",
    text: "По-малко ръчна работа при повтарящи се операции — от задействане до резултат в системата.",
    detail: "TRIGGER → WORKFLOW → SYSTEM → RESULT",
  },
  {
    id: "ai-resheniya",
    index: "04",
    title: "AI решения",
    text: "AI там, където има ясна задача: обработка на информация, анализ и следващо действие.",
    detail: "DATA → AI → ANALYSIS → DECISION",
  },
  {
    id: "ueb-razrabotki",
    index: "05",
    title: "Уеб приложения",
    text: "Уебсайт или уеб приложение като вход към система, а не като край на проекта.",
    detail: "WEB → APPLICATION → DATA → BUSINESS",
  },
  {
    id: "produktova-razrabotka",
    index: "06",
    title: "Собствени продукти",
    text: "Отделна линия от клиентските проекти. HR HUB 360 е първата публична система.",
    detail: "PRODUCT → ARCHITECTURE → USERS → EVOLUTION",
  },
] as const;

export function WhatWeBuild() {
  const [openId, setOpenId] = useState<string>(items[0].id);

  return (
    <Section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="coord">BUILD LAYER</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-4xl lg:text-[2.7rem]">
            Какво създаваме
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted lg:text-right">
          Не сглобяваме страници. Проектираме системи около конкретна бизнес
          работа.
        </p>
      </div>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} id={item.id} className="scroll-mt-28">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${item.id}-layer`}
                onClick={() => setOpenId(open ? "" : item.id)}
                className="grid w-full grid-cols-[auto_minmax(0,1fr)] gap-4 py-6 text-left sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8 sm:py-8"
              >
                <span className="font-display text-2xl tracking-[0.08em] text-electric sm:text-3xl">
                  {item.index}
                </span>
                <span>
                  <span className="block font-display text-2xl text-foreground sm:text-[2rem]">
                    {item.title}
                  </span>
                  <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {item.text}
                  </span>
                  <span
                    id={`${item.id}-layer`}
                    aria-hidden={!open}
                    className={cn(
                      "mt-4 block overflow-hidden text-xs tracking-[0.18em] text-electric transition-[max-height,opacity] duration-300",
                      open ? "max-h-16 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {item.detail}
                  </span>
                </span>
                <span className="hidden text-xs tracking-[0.2em] text-subtle sm:block">
                  {open ? "ОТВОРЕНО" : "ВИЖ СЛОЯ"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

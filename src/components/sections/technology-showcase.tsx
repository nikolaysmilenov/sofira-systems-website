"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

const capabilities = [
  {
    id: "software",
    label: "SOFTWARE",
    title: "Софтуер",
    copy: "Интерфейс, логика и данни се събират в система, която хората използват.",
    nodes: ["INTERFACE", "LOGIC", "DATABASE", "USER"],
  },
  {
    id: "ai",
    label: "AI",
    title: "AI",
    copy: "Изкуствен интелект там, където има данни, задача и следващо действие.",
    nodes: ["AI", "DATA", "AUTOMATION", "BUSINESS"],
  },
  {
    id: "automation",
    label: "AUTOMATION",
    title: "Автоматизация",
    copy: "Повтарящият се процес става поток: задействане, система, резултат.",
    nodes: ["PROCESS", "WORKFLOW", "SYSTEM", "RESULT"],
  },
  {
    id: "platforms",
    label: "PLATFORMS",
    title: "Платформи",
    copy: "Свързани модули, роли и работни потоци в една експлоатируема среда.",
    nodes: ["MODULES", "ROLES", "WORKFLOWS", "OPERATIONS"],
  },
  {
    id: "data",
    label: "DATA",
    title: "Данни",
    copy: "Информацията се структурира, за да подкрепи решение, а не отчет за самия отчет.",
    nodes: ["CAPTURE", "STRUCTURE", "INSIGHT", "DECISION"],
  },
  {
    id: "business",
    label: "BUSINESS SYSTEMS",
    title: "Бизнес системи",
    copy: "Нужната на организацията работа се превръща в цифров процес.",
    nodes: ["NEED", "PROCESS", "SYSTEM", "VALUE"],
  },
] as const;

export function TechnologyShowcase() {
  const [activeId, setActiveId] = useState<(typeof capabilities)[number]["id"]>(
    "software",
  );
  const active =
    capabilities.find((item) => item.id === activeId) ?? capabilities[0];

  return (
    <Section tone="mist">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="coord">CAPABILITY MAP</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-4xl lg:text-[2.7rem]">
            Технология, създадена около бизнеса.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Изберете слой от системата. Диаграмата показва как SOFIRA SYSTEMS
            свързва софтуер, данни, автоматизация и реална бизнес работа.
          </p>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-muted lg:text-right">
          {active.copy}
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Технологични възможности"
        className="mt-10 flex gap-2 overflow-x-auto pb-2"
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
            return;
          }
          event.preventDefault();
          const index = capabilities.findIndex((item) => item.id === active.id);
          const offset = event.key === "ArrowRight" ? 1 : -1;
          const next =
            capabilities[(index + offset + capabilities.length) % capabilities.length];
          setActiveId(next.id);
          document.getElementById(`capability-${next.id}`)?.focus();
        }}
      >
        {capabilities.map((item) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`capability-${item.id}`}
              aria-controls="capability-diagram"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-xs font-semibold tracking-[0.16em] transition-colors",
                selected
                  ? "border-electric bg-electric text-white"
                  : "border-border bg-white text-muted hover:border-electric/40 hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="capability-diagram"
        role="tabpanel"
        aria-labelledby={`capability-${active.id}`}
        className="mt-8 overflow-hidden rounded-[1.4rem] border border-border bg-white p-5 shadow-[0_20px_50px_rgb(12_23_48_/_0.06)] sm:p-8"
      >
        <p className="coord">{active.title}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {active.nodes.map((node, index) => (
            <div key={node} className="relative">
              <div className="rounded-xl border border-electric/15 bg-navy-950 px-4 py-5">
                <p className="text-[10px] tracking-[0.22em] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-lg tracking-[0.08em] text-ink">
                  {node}
                </p>
              </div>
              {index < active.nodes.length - 1 ? (
                <div
                  className="pointer-events-none absolute top-1/2 right-[-0.55rem] hidden h-px w-3 bg-electric sm:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

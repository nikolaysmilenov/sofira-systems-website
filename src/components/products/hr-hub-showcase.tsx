"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const modules = [
  { id: "overview", label: "Общо", nav: "Табло" },
  { id: "employees", label: "Служители", nav: "Служители" },
  { id: "documents", label: "Документи", nav: "Документи" },
  { id: "leave", label: "Отпуски", nav: "Отпуски" },
] as const;

type ModuleId = (typeof modules)[number]["id"];

const sidebar = [
  "Табло",
  "Служители",
  "Договори",
  "Документи",
  "Отпуски",
  "Присъствия",
  "Възнаграждения",
  "Подбор",
  "Обучения",
  "Оценки",
  "Активи",
];

export function HrHubShowcase({ className }: { className?: string }) {
  const [active, setActive] = useState<ModuleId>("overview");
  const current = modules.find((item) => item.id === active) ?? modules[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Модули на HR HUB 360"
        className="flex gap-2 overflow-x-auto pb-3"
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
            return;
          }
          event.preventDefault();
          const index = modules.findIndex((item) => item.id === active);
          const offset = event.key === "ArrowRight" ? 1 : -1;
          const next = modules[(index + offset + modules.length) % modules.length];
          setActive(next.id);
          document.getElementById(`hrhub-${next.id}`)?.focus();
        }}
      >
        {modules.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`hrhub-${item.id}`}
              aria-controls="hrhub-panel"
              onClick={() => setActive(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors",
                selected
                  ? "border-electric bg-electric text-white"
                  : "border-border bg-white text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <figure
        id="hrhub-panel"
        role="tabpanel"
        aria-labelledby={`hrhub-${active}`}
        className="hr-frame"
      >
        <div className="flex items-center justify-between border-b border-[#1a2a3d] bg-hr-sidebar px-4 py-2.5">
          <p className="text-xs font-medium text-white/80">HR HUB 360</p>
          <p className="rounded-full border border-cyan-bright/30 bg-white/8 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-cyan-bright">
            Визуална концепция
          </p>
        </div>
        <div className="grid min-h-[320px] bg-hr-canvas sm:min-h-[380px] sm:grid-cols-[11.5rem_minmax(0,1fr)]">
          <aside className="hidden bg-hr-sidebar p-3 text-white sm:block">
            <div className="mb-4 flex items-center gap-2 px-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-hr-primary text-[10px] font-bold">
                360
              </span>
              <span className="text-xs font-semibold">HR Hub 360</span>
            </div>
            <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
              Модули
            </p>
            <ul className="space-y-0.5">
              {sidebar.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs",
                    item === current.nav
                      ? "bg-white/10 font-medium text-white"
                      : "text-white/55",
                  )}
                >
                  {item}
                </li>
              ))}
              <li className="px-2 py-1.5 text-xs text-white/35">Работни процеси · Скоро</li>
              <li className="px-2 py-1.5 text-xs text-white/35">Отчети · Скоро</li>
            </ul>
          </aside>
          <div className="p-4 sm:p-5">{panel(active)}</div>
        </div>
        <figcaption className="border-t border-hr-border bg-white px-4 py-3 text-xs leading-relaxed text-subtle">
          Визуална концепция върху реалните модули на десктоп приложението HR HUB
          360. Не е екранна снимка и не показва данни от клиентска организация.
        </figcaption>
      </figure>
    </div>
  );
}

function panel(id: ModuleId): ReactNode {
  if (id === "employees") {
    return (
      <ConceptPanel
        title="Служители и организация"
        note="Колони от реалния модул. Без имена на хора."
      >
        <div className="overflow-hidden rounded-md border border-hr-border bg-white">
          <div className="grid grid-cols-4 bg-[#eef2f5] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6b7c]">
            <span>Профил</span>
            <span>Отдел</span>
            <span>Длъжност</span>
            <span>Статус</span>
          </div>
          {[
            ["Employee 360", "HR", "Специалист", "Активен"],
            ["Профил", "Операции", "Мениджър", "Активен"],
            ["Досие", "Финанси", "Счетоводител", "Активен"],
            ["Организация", "Производство", "Ръководител", "Неактивен"],
          ].map((row) => (
            <div
              key={row.join("-")}
              className="grid grid-cols-4 border-t border-hr-border px-3 py-3 text-xs text-[#1c2834]"
            >
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </ConceptPanel>
    );
  }

  if (id === "documents") {
    return (
      <ConceptPanel
        title="Електронно трудово досие"
        note="Групи документи от реалния Document domain."
      >
        <div className="space-y-2">
          {[
            ["Договори", "Версии и история"],
            ["Анекси", "Към трудово правоотношение"],
            ["Лични документи", "Контрол на достъпа"],
            ["Архив", "Неизменяеми версии"],
          ].map(([title, meta]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded-md border border-hr-border bg-white px-3 py-3"
            >
              <div>
                <p className="text-sm text-[#1c2834]">{title}</p>
                <p className="text-xs text-[#5b6b7c]">{meta}</p>
              </div>
              <span className="rounded-full bg-[#e8f3f6] px-2 py-0.5 text-[10px] font-medium text-hr-primary">
                Документ
              </span>
            </div>
          ))}
        </div>
      </ConceptPanel>
    );
  }

  if (id === "leave") {
    return (
      <ConceptPanel
        title="Отпуски и отсъствия"
        note="Заявления, квоти и календар — структура на модула."
      >
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, index) => (
            <div
              key={index}
              className={cn(
                "h-9 rounded-md border border-hr-border bg-white",
                index === 8 || index === 9 ? "border-hr-primary/40 bg-[#e8f3f6]" : null,
              )}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-[#e8f3f6] px-2.5 py-1 text-hr-primary">
            Чака одобрение
          </span>
          <span className="rounded-full bg-[#eef2f5] px-2.5 py-1 text-[#5b6b7c]">
            Квота
          </span>
          <span className="rounded-full bg-[#eef2f5] px-2.5 py-1 text-[#5b6b7c]">
            Календар
          </span>
        </div>
      </ConceptPanel>
    );
  }

  return (
    <ConceptPanel
      title="Табло"
      note="Общ преглед на организацията. Без измислени показатели."
    >
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Служители", "Организация и профили"],
          ["Отпуски", "Заявления и баланс"],
          ["Документи", "Електронно досие"],
          ["Подбор", "Позиции и кандидати"],
        ].map(([title, meta]) => (
          <div
            key={title}
            className="rounded-md border border-hr-border bg-white px-3 py-3"
          >
            <p className="text-sm text-[#1c2834]">{title}</p>
            <p className="mt-1 text-xs text-[#5b6b7c]">{meta}</p>
          </div>
        ))}
      </div>
    </ConceptPanel>
  );
}

function ConceptPanel({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#1c2834]">{title}</p>
      <p className="mt-1 text-xs text-[#5b6b7c]">{note}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

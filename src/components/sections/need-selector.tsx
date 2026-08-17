"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { needOptions } from "@/data/needs";
import { cn } from "@/lib/cn";

export function NeedSelector() {
  const [activeId, setActiveId] = useState<(typeof needOptions)[number]["id"]>(
    "software",
  );
  const active = needOptions.find((item) => item.id === activeId) ?? needOptions[0];

  return (
    <Section tone="mist">
      <div className="max-w-3xl">
        <p className="coord">INTAKE</p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-5xl lg:text-[3.2rem]">
          Какво искате да подобрим?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Изберете посоката. Ще покажем как SOFIRA SYSTEMS подхожда към нея —
          без общи обещания.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Какво искате да подобрим"
        className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3"
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
            return;
          }
          event.preventDefault();
          const index = needOptions.findIndex((item) => item.id === active.id);
          const offset = event.key === "ArrowRight" ? 1 : -1;
          const next =
            needOptions[(index + offset + needOptions.length) % needOptions.length];
          setActiveId(next.id);
          document.getElementById(`need-${next.id}`)?.focus();
        }}
      >
        {needOptions.map((item) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`need-${item.id}`}
              aria-selected={selected}
              aria-controls="need-panel"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "min-h-12 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors sm:px-4",
                selected
                  ? "border-electric bg-electric text-white"
                  : "border-border bg-white text-foreground hover:border-electric/40",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="need-panel"
        role="tabpanel"
        aria-labelledby={`need-${active.id}`}
        className="mt-6 rounded-[1.4rem] border border-border bg-white p-6 shadow-[0_20px_50px_rgb(12_23_48_/_0.06)] sm:p-8"
      >
        <p className="coord">{active.label}</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {active.text}
        </p>
        <div className="mt-6">
          <Button href={active.href}>
            {active.cta ?? ctaCopy.requestProject}
          </Button>
        </div>
      </div>
    </Section>
  );
}

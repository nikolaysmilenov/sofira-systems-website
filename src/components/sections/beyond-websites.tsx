"use client";

import { useId, useState } from "react";
import { Section } from "@/components/ui/section";
import { systemEquation } from "@/data/system-flow";
import { cn } from "@/lib/cn";

export function BeyondWebsites() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section className="overflow-hidden">
      <div className="max-w-3xl">
        <p className="coord">SYSTEMS NOT SITES</p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-5xl lg:text-[3.4rem]">
          Не просто изграждаме сайтове.
          <span className="mt-3 block text-ink">Изграждаме системи.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Уеб интерфейсът е вход. Стойността е в приложението, данните,
          логиката и автоматизацията зад него.
        </p>
      </div>

      <ol className="mt-12 space-y-3">
        {systemEquation.map((layer) => {
          const open = openId === layer.id;
          const panelId = `${baseId}-${layer.id}-panel`;
          const buttonId = `${baseId}-${layer.id}-button`;

          return (
            <li key={layer.id}>
              <div
                className={cn(
                  "rounded-2xl border bg-navy-950 transition-colors",
                  open ? "border-electric/40" : "border-border",
                )}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : layer.id)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-xl tracking-[0.04em] text-ink sm:text-2xl">
                    {layer.title}
                  </span>
                  <span
                    className="font-display text-lg text-electric"
                    aria-hidden="true"
                  >
                    {open ? "−" : "+"}
                  </span>
                  <span className="sr-only">{open ? "Свий слоя" : "Отвори слоя"}</span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="border-t border-border px-5 py-4"
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {layer.text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 rounded-[1.4rem] bg-deep px-6 py-8 text-on-deep sm:px-10">
        <p className="coord">OUTPUT</p>
        <p className="mt-4 font-display text-3xl tracking-[0.04em] sm:text-4xl">
          = Дигитална система
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-deep-muted sm:text-base">
          Уебсайт, приложение, база данни, бизнес логика, автоматизация и AI —
          когато задачата го изисква — в една работеща система.
        </p>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { processSteps } from "@/data/process";
import type { ProcessStep } from "@/types/content";

type HowWeWorkProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: ProcessStep[];
};

export function HowWeWork({
  eyebrow = "APPROACH",
  title = "Как работим",
  description = "Инженерна последователност, не агенционен шаблон. Всяка стъпка има конкретна работа.",
  steps = processSteps,
}: HowWeWorkProps) {
  return (
    <Section id="kak-izgrazhdame">
      <p className="coord">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {description}
      </p>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {steps.map((step) => (
          <li
            key={step.index}
            className="grid min-w-0 gap-3 py-7 sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]"
          >
            <span className="font-display text-xl text-electric">{step.index}</span>
            <h3 className="text-xl text-foreground sm:text-2xl">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

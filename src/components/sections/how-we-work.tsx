import { Section } from "@/components/ui/section";
import { processSteps } from "@/data/process";

export function HowWeWork() {
  return (
    <Section>
      <p className="coord">APPROACH</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        Как работим
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Инженерна последователност, не агенционен шаблон. Всяка стъпка има
        конкретна работа.
      </p>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {processSteps.map((step) => (
          <li
            key={step.index}
            className="grid gap-3 py-7 transition-colors hover:bg-navy-950/70 sm:grid-cols-[4.5rem_minmax(0,0.8fr)_minmax(0,1.3fr)]"
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

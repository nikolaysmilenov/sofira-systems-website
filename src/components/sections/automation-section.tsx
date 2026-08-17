import { Section } from "@/components/ui/section";

const steps = [
  { label: "MANUAL PROCESS", note: "Повтаряща се ръчна работа" },
  { label: "TRIGGER", note: "Събитие или правило" },
  { label: "AUTOMATION", note: "Изпълнение без преписване" },
  { label: "SYSTEM", note: "Запис в работещата среда" },
  { label: "RESULT", note: "По-малко грешки, повече контрол" },
] as const;

export function AutomationSection() {
  return (
    <Section tone="mist">
      <p className="coord">WORKFLOW</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl lg:text-[2.7rem]">
        Автоматизация върху реален процес.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Започваме от това, което хората правят днес. После определяме кое може
        да се задейства, изпълни и запише в системата.
      </p>
      <ol className="mt-12 grid gap-4 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.label} className="relative rounded-2xl border border-border bg-white p-5">
            <p className="text-[11px] tracking-[0.2em] text-electric">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-4 font-display text-lg tracking-[0.08em] text-ink">
              {step.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.note}</p>
            {index < steps.length - 1 ? (
              <span
                className="pointer-events-none absolute top-1/2 right-[-0.6rem] hidden h-px w-4 bg-electric lg:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}

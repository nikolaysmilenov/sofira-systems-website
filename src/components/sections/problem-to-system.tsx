import { Section } from "@/components/ui/section";
import { problemToSystemSteps } from "@/data/system-flow";

export function ProblemToSystem() {
  return (
    <Section className="relative overflow-hidden">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)]" />
      <div className="relative max-w-3xl">
        <p className="coord">DELIVERY MAP</p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-5xl lg:text-[3.2rem]">
          От проблем до система.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Не започваме от екран. Започваме от задачата и стигаме до работещ
          софтуер.
        </p>
      </div>

      <ol className="relative mt-12 max-w-3xl">
        {problemToSystemSteps.map((step, index) => (
          <li key={step.code} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:pb-10">
            <div className="relative flex flex-col items-center">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-electric bg-white font-display text-sm text-electric sm:h-12 sm:w-12">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < problemToSystemSteps.length - 1 ? (
                <span
                  className="absolute top-10 bottom-[-0.5rem] w-px bg-electric/40 sm:top-12"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <div className="rounded-2xl border border-border bg-white px-5 py-5 transition-colors hover:border-electric/35 focus-within:border-electric/50 sm:px-6">
              <p className="coord">{step.code}</p>
              <h3 className="mt-3 text-2xl text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

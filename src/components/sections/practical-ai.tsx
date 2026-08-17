import { Section } from "@/components/ui/section";

const steps = ["BUSINESS DATA", "AI", "ANALYSIS", "DECISION", "AUTOMATION"] as const;

export function PracticalAi() {
  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="coord">APPLIED AI</p>
          <h2 className="mt-4 text-3xl text-on-deep sm:text-4xl lg:text-[2.7rem]">
            AI, когато има реална задача.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-deep-muted sm:text-lg">
            Прилагаме изкуствен интелект там, където има данни, ясен проблем и
            следващо действие в системата. Не предлагаме AI заради самото понятие.
          </p>
        </div>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-4">
              <span className="w-10 font-display text-sm text-cyan-bright">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-display tracking-[0.14em] text-on-deep">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { processSteps } from "@/data/process";

const flow = ["BUSINESS", "PROCESS", "SYSTEM", "PRODUCT", "RESULT"] as const;

export function BuiltWithPurpose() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="coord">ENGINEERING</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-4xl lg:text-[2.7rem]">
            Технология с причина.
          </h2>
          <ol className="mt-10 space-y-8">
            {processSteps.map((step) => (
              <li key={step.index} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4">
                <span className="font-display text-2xl text-electric">{step.index}</span>
                <div>
                  <h3 className="text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative overflow-hidden rounded-[1.4rem] border border-border bg-navy-950 p-6 sm:p-10">
          <div className="blueprint-grid absolute inset-0 opacity-70" />
          <p className="coord relative">FLOW</p>
          <ol className="relative mt-8 space-y-0">
            {flow.map((node, index) => (
              <li key={node} className="relative pl-8">
                <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-electric bg-white" />
                {index < flow.length - 1 ? (
                  <span className="absolute left-[5px] top-6 h-[calc(100%-0.5rem)] w-px bg-electric/40" />
                ) : null}
                <div className="mb-5 rounded-xl border border-border bg-white px-5 py-4">
                  <p className="font-display text-lg tracking-[0.14em] text-ink">
                    {node}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

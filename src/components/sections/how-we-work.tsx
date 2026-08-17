import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { processSteps } from "@/data/process";

export function HowWeWork() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Подход"
        title="Как работим"
        description="SOFIRA SYSTEMS е технологичен партньор. Започваме от реалния проблем и стигаме до система, която може да се поддържа и развива."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step) => (
          <Surface key={step.index} className="p-6">
            <p className="font-display text-xs tracking-[0.22em] text-subtle">
              {step.index}
            </p>
            <h3 className="mt-4 text-lg text-foreground">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </Surface>
        ))}
      </div>
    </Section>
  );
}

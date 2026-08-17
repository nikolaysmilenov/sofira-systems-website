import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { principles } from "@/data/principles";

export function WhySofira() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Защо SOFIRA SYSTEMS"
        title="Принципи, по които работим"
        description="Не обещаваме най-ниска цена или универсални резултати. Работим по ясни инженерни принципи."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {principles.map((item) => (
          <Surface key={item.title} className="p-6">
            <h3 className="text-lg text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </Surface>
        ))}
      </div>
    </Section>
  );
}

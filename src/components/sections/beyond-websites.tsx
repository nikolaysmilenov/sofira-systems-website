import { Section } from "@/components/ui/section";

const layers = [
  "Website",
  "Application",
  "Database",
  "Automation",
  "AI",
  "Business Logic",
] as const;

export function BeyondWebsites() {
  return (
    <Section className="overflow-hidden">
      <div className="max-w-3xl">
        <p className="coord">SYSTEMS NOT SITES</p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-5xl lg:text-[3.4rem]">
          Ние не просто изграждаме сайтове.
          <span className="mt-3 block text-ink">Ние изграждаме системи.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, index) => (
          <div
            key={layer}
            className="flex items-center justify-between rounded-2xl border border-border bg-navy-950 px-5 py-6"
          >
            <span className="font-display text-xl tracking-[0.06em] text-ink">
              {layer}
            </span>
            <span className="text-sm text-electric">
              {index < layers.length - 1 ? "+" : "="}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[1.4rem] bg-deep px-6 py-8 text-on-deep sm:px-10">
        <p className="coord">OUTPUT</p>
        <p className="mt-4 font-display text-3xl tracking-[0.04em] sm:text-4xl">
          Digital Business System
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-deep-muted sm:text-base">
          Уеб присъствието е вход. Стойността е в приложението, данните,
          автоматизацията и бизнес логиката, които стоят зад него.
        </p>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { systemEquation } from "@/data/system-flow";

export function BeyondWebsites() {
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
        {systemEquation.map((layer, index) => (
          <li key={layer}>
            <div className="flex min-h-16 items-center justify-between rounded-2xl border border-border bg-navy-950 px-5 py-4 transition-colors hover:border-electric/35">
              <span className="font-display text-xl tracking-[0.04em] text-ink sm:text-2xl">
                {layer}
              </span>
              <span className="font-display text-lg text-electric" aria-hidden="true">
                {index < systemEquation.length - 1 ? "+" : ""}
              </span>
            </div>
          </li>
        ))}
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

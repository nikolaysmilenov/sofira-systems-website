import { Section } from "@/components/ui/section";
import { systemLayers } from "@/data/system-flow";

export function SystemStack() {
  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="coord">SYSTEM LAYERS</p>
        <h2 className="mt-4 max-w-4xl text-3xl text-on-deep sm:text-5xl lg:text-[3.2rem]">
          Изграждаме от интерфейса до системата.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
          Не изброяваме инструменти, за да изглеждаме технически. Показваме
          слоевете, които реално свързваме.
        </p>

        <ol className="mt-12 space-y-3">
          {systemLayers.map((layer, index) => (
            <li key={layer.code} className="group">
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-cyan-bright/40 sm:grid-cols-[7.5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] sm:items-center sm:px-6">
                <span className="font-display text-sm tracking-[0.16em] text-cyan-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg tracking-[0.08em] text-on-deep sm:text-xl">
                  {layer.code}
                </span>
                <span className="text-sm leading-relaxed text-deep-muted">
                  {layer.text}
                </span>
              </div>
              {index < systemLayers.length - 1 ? (
                <div className="flex justify-center py-1" aria-hidden="true">
                  <span className="h-4 w-px bg-cyan-bright/50" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

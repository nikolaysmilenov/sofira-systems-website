import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

export function ContactCta() {
  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end">
        <div>
          <p className="coord">NEXT</p>
          <h2 className="mt-4 max-w-2xl text-3xl text-on-deep sm:text-5xl">
            Заявете проект.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-deep-muted sm:text-lg">
            Опишете какво искате да изградим — софтуерна система, автоматизация,
            AI решение или информация за HR HUB 360. Ще уточним обхвата.
          </p>
        </div>
        <Button href={routes.contact}>{ctaCopy.requestProject}</Button>
      </div>
    </Section>
  );
}

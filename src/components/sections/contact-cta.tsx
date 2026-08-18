import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

type ContactCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function ContactCta({
  eyebrow = "NEXT",
  title = "Заявете проект.",
  description = "Опишете какво искате да изградим — софтуерна система, автоматизация, AI решение или информация за HR HUB 360. Ще уточним обхвата.",
  ctaLabel = ctaCopy.requestProject,
  ctaHref = routes.contact,
  secondaryLabel,
  secondaryHref,
}: ContactCtaProps) {
  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end">
        <div>
          <p className="coord">{eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-on-deep sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-deep-muted sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href={ctaHref} className="w-full sm:w-auto">
            {ctaLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button href={secondaryHref} variant="inverse" className="w-full sm:w-auto">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

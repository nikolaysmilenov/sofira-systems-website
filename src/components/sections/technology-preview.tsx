import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

const layers = [
  { label: "INTERFACE", href: `${routes.technology}#experience` },
  { label: "APPLICATION", href: `${routes.technology}#application` },
  { label: "API", href: `${routes.technology}#api` },
  { label: "DATA", href: `${routes.technology}#data` },
  { label: "AUTOMATION", href: `${routes.technology}#automation` },
  { label: "AI", href: `${routes.technology}#ai` },
  { label: "INFRASTRUCTURE", href: `${routes.technology}#infrastructure` },
  { label: "DESKTOP", href: `${routes.technology}#desktop` },
] as const;

export function TechnologyPreview() {
  return (
    <Section id="tehnologii" tone="mist">
      <p className="coord">SYS / STACK</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        Как се свързват слоевете.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Не списък от логота. Слоеве, които реално използваме — от интерфейса до
        десктоп системата.
      </p>

      <ol className="mt-12 flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
        {layers.map((layer, index) => (
          <li key={layer.label} className="flex min-w-0 items-center gap-2">
            <Link
              href={layer.href}
              className="inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 text-sm font-medium tracking-label text-foreground transition-colors hover:border-electric/40"
            >
              {layer.label}
            </Link>
            {index < layers.length - 1 ? (
              <span className="text-electric" aria-hidden="true">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Button href={routes.technology}>{ctaCopy.viewTechnology}</Button>
      </div>
    </Section>
  );
}

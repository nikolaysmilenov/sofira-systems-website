import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: ReactNode;
  tone?: "mist" | "deep";
};

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  tone = "mist",
}: PageHeroProps) {
  const deep = tone === "deep";

  return (
    <section
      className={
        deep
          ? "relative overflow-hidden border-b border-white/10 bg-deep"
          : "relative overflow-hidden border-b border-border bg-navy-950"
      }
    >
      {deep ? (
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      ) : (
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
      )}
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <p className="coord">{eyebrow}</p>
        {badge ? <div className="mt-4">{badge}</div> : null}
        <h1
          className={
            deep
              ? "mt-5 max-w-4xl text-4xl text-on-deep sm:text-6xl"
              : "mt-5 max-w-4xl text-4xl text-foreground sm:text-6xl"
          }
        >
          {title}
        </h1>
        <p
          className={
            deep
              ? "mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg"
              : "mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          }
        >
          {description}
        </p>
      </Container>
    </section>
  );
}

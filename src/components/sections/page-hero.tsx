import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
}: PageHeroProps) {
  return (
    <section className="border-b border-border bg-black">
      <Container className="py-14 sm:py-16 lg:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        {badge ? <div className="mt-4">{badge}</div> : null}
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-foreground sm:text-5xl sm:leading-[1.08]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}

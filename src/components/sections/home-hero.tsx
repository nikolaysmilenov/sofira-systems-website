import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroArchitecture } from "@/components/visuals/hero-architecture";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { site } from "@/data/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-24">
        <div className="reveal max-w-2xl">
          <Eyebrow>{site.name}</Eyebrow>
          <h1 className="mt-5 text-[2.15rem] text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
            Софтуерни системи за реалния бизнес.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            SOFIRA SYSTEMS разработва софтуер по поръчка, дигитални платформи,
            автоматизация, AI решения и собствени софтуерни продукти.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={routes.contact} className="w-full sm:w-auto">
              {ctaCopy.contact}
            </Button>
            <Button
              href={routes.products}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {ctaCopy.viewProducts}
            </Button>
          </div>
        </div>
        <div className="reveal hidden lg:block">
          <HeroArchitecture />
        </div>
      </Container>
    </section>
  );
}


import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroArchitecture } from "@/components/visuals/hero-architecture";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { site } from "@/data/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_80%_at_80%_40%,black,transparent)]" />
      <Container className="relative grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-24">
        <div className="reveal max-w-2xl">
          <p className="coord">SOFIRA SYSTEMS</p>
          <h1 className="mt-5 text-[2.35rem] leading-[1.05] text-foreground sm:text-5xl lg:text-[4.15rem]">
            Софтуерни системи
            <span className="block text-ink">за реалния бизнес.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Създаваме софтуер по поръчка, дигитални платформи, автоматизация, AI
            решения и собствени технологични продукти.
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
          <p className="mt-8 max-w-md text-xs tracking-[0.18em] text-subtle uppercase">
            {site.name} · системи · продукти · инженеринг
          </p>
        </div>
        <div className="reveal">
          <HeroArchitecture />
        </div>
      </Container>
    </section>
  );
}

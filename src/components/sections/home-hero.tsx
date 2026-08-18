import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroArchitecture } from "@/components/visuals/hero-architecture";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

export function HomeHero() {
  return (
    <section className="deep-section relative overflow-hidden border-b border-white/10">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 lg:py-24">
        <div className="reveal min-w-0 max-w-2xl">
          <p className="coord">SYS / 01 · BUILD</p>
          <h1 className="mt-5 text-[2.15rem] text-on-deep sm:text-5xl lg:text-[4.15rem]">
            Изграждаме софтуерни системи
            <span className="block">за реалния бизнес.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-muted sm:text-lg">
            SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, автоматизация,
            AI решения и собствени дигитални продукти.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={routes.contact} className="w-full sm:w-auto">
              {ctaCopy.requestProject}
            </Button>
            <Button
              href={routes.projects}
              variant="inverse"
              className="w-full sm:w-auto"
            >
              {ctaCopy.viewProjects}
            </Button>
          </div>
          <p className="mt-8 text-xs font-medium tracking-label text-deep-muted">
            PROCESS → ARCHITECTURE → SYSTEM
          </p>
        </div>
        <div className="reveal">
          <HeroArchitecture />
        </div>
      </Container>
    </section>
  );
}

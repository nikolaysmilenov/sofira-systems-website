import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import {
  engineeringPrinciples,
  hrHubProductLink,
  technologyCategories,
  technologyProjectLinks,
} from "@/data/technology";
import { cn } from "@/lib/cn";
import { TechnologyMap } from "@/components/technology/technology-map";

export function TechnologyView() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <p className="coord">SYS / MAP</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
            Как се свързват слоевете.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Изберете слой, за да видите какво прави, кои технологии са проверени
            там и към кой проект се отнасят.
          </p>
          <div className="mt-12">
            <TechnologyMap />
          </div>
        </Container>
      </section>

      {technologyCategories.map((category, index) => {
        const mist = index % 2 === 1;
        return (
          <section
            key={category.id}
            id={category.id}
            className={cn(
              "scroll-mt-28 border-b border-border",
              mist ? "bg-navy-950" : "bg-white",
            )}
          >
            <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12">
              <p className="font-display text-3xl tracking-[0.08em] text-electric">
                {category.index}
              </p>
              <div className="max-w-3xl">
                <p className="coord">{category.coord}</p>
                <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
                  {category.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {category.meaning}
                </p>
                <ul className="mt-10 space-y-8">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <h3 className="font-display text-sm tracking-[0.16em] text-electric">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-muted">
                        {item.role}
                      </p>
                      <p className="mt-3 text-sm text-subtle">
                        {item.projects.map((project) => project.label).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">HOW WE BUILD</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-on-deep sm:text-5xl">
            Как изграждаме.
          </h2>
          <ol className="mt-12 space-y-10">
            {engineeringPrinciples.map((item) => (
              <li
                key={item.index}
                className="grid gap-3 lg:grid-cols-[5rem_minmax(0,1fr)] lg:gap-10"
              >
                <p className="font-display text-2xl tracking-[0.08em] text-cyan-bright">
                  {item.index}
                </p>
                <div>
                  <h3 className="text-2xl text-on-deep sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-deep-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <p className="coord">PROJECTS</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
            Връзка към реални системи.
          </h2>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {technologyProjectLinks.map((item) => (
              <li key={item.title} className="grid gap-3 py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] lg:items-end">
                <h3 className="text-xl text-foreground sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-muted">
                  {item.text}
                </p>
                <Button href={item.href} variant="secondary" className="w-fit">
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hrHubProductLink} variant="secondary">
              {ctaCopy.viewHrHub}
            </Button>
            <Button href={routes.projects}>Към проектите</Button>
          </div>
        </Container>
      </section>
    </>
  );
}

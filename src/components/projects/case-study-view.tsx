import { CaseStudyArchitecture } from "@/components/projects/case-study-architecture";
import { ContactCta } from "@/components/sections/contact-cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ctaCopy, projectKindLabel, projectStatusLabel } from "@/data/labels";
import { routes } from "@/data/navigation";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type CaseStudyViewProps = {
  project: Project;
};

const sections = [
  { id: "context", index: "01", title: "Контекст", field: "context" },
  { id: "problem", index: "02", title: "Проблемът", field: "problem" },
  { id: "approach", index: "03", title: "Подход", field: "approach" },
  { id: "system", index: "04", title: "Системата", field: "system" },
] as const;

export function CaseStudyView({ project }: CaseStudyViewProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">
            PROJECT / {project.index}
          </p>
          <p className="mt-5 font-display text-sm tracking-label text-cyan-bright">
            {projectKindLabel[project.kind]}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl text-on-deep sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
            {project.summary}
          </p>
        </Container>
      </section>

      {sections.map((section, index) => {
        const mist = index % 2 === 1;
        return (
          <section
            key={section.id}
            className={cn(
              "border-b border-border",
              mist ? "bg-navy-950" : "bg-white",
            )}
          >
            <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12">
              <p className="font-display text-3xl text-electric">
                {section.index}
              </p>
              <div className="max-w-3xl">
                <h2 className="text-3xl text-foreground sm:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {project[section.field]}
                </p>
                {section.field === "system" && project.modules ? (
                  <div className="mt-10">
                    <p className="text-xs font-medium tracking-kicker text-subtle">
                      Текущи модули
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.modules.current.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {project.modules.upcoming && project.modules.upcoming.length > 0 ? (
                      <div className="mt-8">
                        <p className="text-xs font-medium tracking-kicker text-subtle">
                          Предстоящи — още не са готови
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.modules.upcoming.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-border px-4 py-2 text-sm text-subtle"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-6 py-16 sm:py-20 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12">
          <p className="font-display text-3xl text-cyan-bright">
            05
          </p>
          <div>
            <h2 className="text-3xl text-on-deep sm:text-4xl">Архитектура</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
              Показани са само слоевете, които реално участват в този проект.
            </p>
            <CaseStudyArchitecture layers={project.architecture} />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-navy-950">
        <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12">
          <p className="font-display text-3xl text-electric">
            06
          </p>
          <div className="max-w-3xl">
            <h2 className="text-3xl text-foreground sm:text-4xl">
              Статус
            </h2>
            <p className="mt-3 text-sm font-medium tracking-normal text-electric">
              {projectStatusLabel[project.status]}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {project.result}
            </p>
            <div className="mt-8">
              <Button href={routes.projects} variant="ghost">
                Всички проекти
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta
        title="Имате подобен процес?"
        description="Опишете как работите днес. Ще разгледаме как може да бъде превърнат в реална софтуерна система."
        ctaLabel={ctaCopy.discussSimilar}
        ctaHref={routes.contact}
        secondaryLabel={
          project.slug === "hr-hub-360" ? ctaCopy.viewHrHub : undefined
        }
        secondaryHref={
          project.slug === "hr-hub-360" ? routes.hrHub360 : undefined
        }
      />
    </>
  );
}

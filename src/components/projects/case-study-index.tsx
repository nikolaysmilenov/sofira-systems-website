import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ctaCopy, projectKindLabel, projectStatusLabel } from "@/data/labels";
import { routes } from "@/data/navigation";
import {
  projectIndexGroups,
  projectsInGroup,
} from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

export function CaseStudyIndex() {
  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Инженерни истории"
        title="Как изграждаме системи."
        description="Тук показваме реални проекти на SOFIRA SYSTEMS — със структура, подход и статус. Без измислени клиенти, метрики или резултати."
      />

      {projectIndexGroups.map((group) => {
        const items = projectsInGroup(group.id);
        if (items.length === 0) {
          return null;
        }

        return (
          <section key={group.id}>
            <div className="border-b border-border bg-white">
              <Container className="py-12 sm:py-16">
                <p className="coord">{group.coord}</p>
                <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
                  {group.title}
                </h2>
              </Container>
            </div>
            {items.map((project) => (
              <ProjectIndexRow key={project.slug} project={project} />
            ))}
            {group.id === "public-systems" ? <ClientWorkNote /> : null}
          </section>
        );
      })}

      <ContactCta />
    </>
  );
}

function ProjectIndexRow({ project }: { project: Project }) {
  const mist = Number.parseInt(project.index, 10) % 2 === 0;

  return (
    <article
      className={cn(
        "border-b border-border",
        mist ? "bg-navy-950" : "bg-white",
      )}
    >
      <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-[7rem_minmax(0,1fr)_auto] lg:items-end lg:gap-12">
        <p className="font-display text-3xl text-electric">
          {project.index}
        </p>
        <div className="max-w-3xl">
          <p className="coord">PROJECT / {project.index}</p>
          <p className="mt-4 font-display text-sm tracking-label text-electric">
            {projectKindLabel[project.kind]}
          </p>
          <h3 className="mt-3 text-3xl text-foreground sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>
          <p className="mt-4 text-xs font-medium tracking-normal text-subtle">
            {projectStatusLabel[project.status]}
          </p>
        </div>
        <Button href={project.href} className="w-fit">
          {project.indexCta ?? "Към историята"}
        </Button>
      </Container>
    </article>
  );
}

function ClientWorkNote() {
  return (
    <div className="border-b border-border bg-navy-950">
      <Container className="py-16 sm:py-20">
        <p className="coord">CLIENT WORK</p>
        <h3 className="mt-4 text-3xl text-foreground sm:text-4xl">
          Клиентски проекти
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Изграждаме софтуер по поръчка според конкретна задача. Не
          публикуваме имена, логота, отзиви или метрики без съгласие. Когато
          има публично представим клиентски проект, той ще се появи тук с
          ясна класификация CLIENT PROJECT.
        </p>
        <div className="mt-8">
          <Button href={routes.contact} variant="secondary">
            {ctaCopy.discussSimilar}
          </Button>
        </div>
      </Container>
    </div>
  );
}

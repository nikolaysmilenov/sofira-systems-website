import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy, projectKindLabel, projectStatusLabel } from "@/data/labels";
import { routes } from "@/data/navigation";
import { projects } from "@/data/projects";

export function ProjectsTeaser() {
  return (
    <Section id="proekti" className="border-t border-border bg-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="coord">SELECTED WORK</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">
            Проекти
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Публикуваме системи, които реално изграждаме — със статус и
            класификация. Без измислени клиенти, метрики или резултати.
          </p>
        </div>
        <Button href={routes.projects} variant="secondary" className="w-fit">
          {ctaCopy.allProjects}
        </Button>
      </div>

      <ol className="mt-12 divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="grid min-w-0 gap-4 py-10 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[5rem_minmax(0,1fr)_auto] lg:items-end"
          >
            <p className="font-display text-2xl text-electric sm:text-3xl">
              {project.index}
            </p>
            <div className="min-w-0 max-w-2xl">
              <p className="coord">PROJECT / {project.index}</p>
              <p className="mt-4 font-display text-sm tracking-label text-electric">
                {projectKindLabel[project.kind]} / {projectStatusLabel[project.status]}
              </p>
              <h3 className="mt-3 text-2xl text-foreground sm:text-4xl">
                {project.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {project.summary}
              </p>
            </div>
            <Button href={project.href} variant="secondary" className="w-fit">
              {project.indexCta ?? "Към историята"}
            </Button>
          </li>
        ))}
      </ol>
    </Section>
  );
}

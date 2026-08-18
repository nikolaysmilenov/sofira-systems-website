import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { routes } from "@/data/navigation";
import { projects } from "@/data/projects";

export function ProjectsTeaser() {
  return (
    <Section className="border-t border-border bg-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="coord">PROJECTS</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">
            Как изграждаме системи.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Публикуваме инженерни истории за системи, които реално изграждаме —
            без измислени клиенти или резултати.
          </p>
        </div>
        <Button href={routes.projects} variant="secondary" className="w-fit">
          Към проектите
        </Button>
      </div>
      <div className="mt-10 max-w-3xl border-y border-border">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

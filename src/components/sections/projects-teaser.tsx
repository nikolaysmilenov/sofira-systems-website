import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { routes } from "@/data/navigation";
import { projects } from "@/data/projects";

export function ProjectsTeaser() {
  return (
    <Section className="bg-navy-950">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Избрани решения"
          title="Работа, която можем да покажем"
          description="SOFIRA SYSTEMS изгражда собствена продуктова линия. Тук са решенията, които реално развиваме — без измислени клиенти."
        />
        <Button href={routes.projects} variant="secondary" className="w-fit">
          Към проектите
        </Button>
      </div>
      <div
        className={
          projects.length > 1
            ? "mt-10 grid gap-4 lg:grid-cols-2"
            : "mt-10 max-w-3xl"
        }
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

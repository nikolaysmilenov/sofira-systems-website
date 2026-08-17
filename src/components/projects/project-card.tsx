import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Surface } from "@/components/ui/surface";
import { ctaCopy, projectStatusLabel } from "@/data/labels";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Surface className={cn("p-6 sm:p-8", className)}>
      <Eyebrow>{projectStatusLabel[project.status]}</Eyebrow>
      <h3 className="mt-4 text-2xl text-foreground">
        <Link href={project.href} className="transition-colors hover:text-electric-hover">
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>
      <Link
        href={project.href}
        className="mt-6 inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground"
      >
        {ctaCopy.learnMore}
      </Link>
    </Surface>
  );
}

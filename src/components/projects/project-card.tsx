import Link from "next/link";
import { projectKindLabel, projectStatusLabel } from "@/data/labels";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article className={cn("border-t border-border py-8 first:border-t-0 first:pt-0", className)}>
      <p className="coord">PROJECT / {project.index}</p>
      <p className="mt-3 font-display text-xs tracking-label text-electric">
        {projectKindLabel[project.kind]}
      </p>
      <h3 className="mt-3 text-2xl text-foreground sm:text-3xl">
        <Link href={project.href} className="transition-colors hover:text-electric-hover">
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        {project.summary}
      </p>
      <p className="mt-4 text-[11px] font-medium tracking-normal text-subtle">
        {projectStatusLabel[project.status]}
      </p>
      <Link
        href={project.href}
        className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-electric transition-colors hover:text-electric-hover"
      >
        {project.indexCta ?? "Към историята"}
      </Link>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/projects/case-study-view";
import { getProjectBySlug, projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: "Проект",
      description: "Инженерна история на SOFIRA SYSTEMS.",
      path: `/proekti/${slug}`,
    });
  }

  return createPageMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: project.href,
    ogTitle: `${project.name} | SOFIRA SYSTEMS`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyView project={project} />;
}

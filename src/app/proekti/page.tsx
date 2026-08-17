import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Проекти",
  description:
    "Избрани решения на SOFIRA SYSTEMS. Публикуваме собствени системи, които реално развиваме. Първото публично решение е HR HUB 360.",
  path: "/proekti",
  ogTitle: "Избрани решения | SOFIRA SYSTEMS",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Избрани решения"
        title="Показваме системи, които реално изграждаме"
        description="SOFIRA SYSTEMS развива собствена продуктова линия. HR HUB 360 е първото публично решение. Клиентска работа се публикува само със съгласие."
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <div
          className={
            projects.length > 1 ? "grid gap-4 lg:grid-cols-2" : "max-w-3xl"
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
      <ContactCta />
    </>
  );
}

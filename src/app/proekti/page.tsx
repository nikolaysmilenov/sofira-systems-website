import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { routes } from "@/data/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Проекти",
  description:
    "SOFIRA SYSTEMS развива решения за клиенти и собствени продукти. Първото публично решение е HR HUB 360. Клиентска работа се публикува само със съгласие.",
  path: "/proekti",
  ogTitle: "Избрани решения | SOFIRA SYSTEMS",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Избрани решения"
        title="Решения за клиенти и собствени продукти"
        description="SOFIRA SYSTEMS работи в две посоки. Клиентските системи се изграждат по конкретна задача. Собствените продукти се развиват независимо. Публикуваме само това, което реално изграждаме."
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <Surface className="p-6 sm:p-8">
            <h2 className="text-2xl text-foreground">Решения за клиенти</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Разработваме софтуер по поръчка, платформи и автоматизация според
              реалните процеси на организацията. Клиентски проекти се показват
              публично само със съгласие. Не публикуваме измислени казуси.
            </p>
            <div className="mt-6">
              <Button href={routes.services} variant="secondary">
                Към услугите
              </Button>
            </div>
          </Surface>
          <Surface className="p-6 sm:p-8">
            <h2 className="text-2xl text-foreground">Собствени продукти</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Паралелно изграждаме собствени системи. HR HUB 360 е първият
              публичен продукт — десктоп HR система за българския пазар, в
              активна разработка.
            </p>
            <div className="mt-6">
              <Button href={routes.products} variant="secondary">
                Към продуктите
              </Button>
            </div>
          </Surface>
        </div>
        <div className="mt-12 max-w-3xl">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
      <ContactCta />
    </>
  );
}

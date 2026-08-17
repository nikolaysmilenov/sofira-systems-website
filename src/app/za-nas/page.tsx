import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { HowWeWork } from "@/components/sections/how-we-work";
import { PageHero } from "@/components/sections/page-hero";
import { WhySofira } from "@/components/sections/why-sofira";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { about } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "За нас",
  description:
    "SOFIRA SYSTEMS е технологична компания за софтуер по поръчка, бизнес системи, автоматизация, AI решения и собствени продукти като HR HUB 360.",
  path: "/za-nas",
  ogTitle: "За SOFIRA SYSTEMS",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          {about.sections.map((section, index) => (
            <Surface
              key={section.title}
              className={index === 0 ? "p-6 sm:p-8 lg:col-span-2" : "p-6 sm:p-8"}
            >
              <h2 className="text-xl text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </Surface>
          ))}
        </div>
      </Container>
      <HowWeWork />
      <WhySofira />
      <ContactCta />
    </>
  );
}

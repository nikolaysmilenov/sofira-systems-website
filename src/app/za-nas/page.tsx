import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { HowWeWork } from "@/components/sections/how-we-work";
import { PageHero } from "@/components/sections/page-hero";
import { WhySofira } from "@/components/sections/why-sofira";
import { Container } from "@/components/ui/container";
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
        tone="deep"
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <ol className="space-y-16">
          {about.statements.map((item, index) => (
            <li key={item.title} className="grid gap-4 lg:grid-cols-[6rem_minmax(0,1fr)]">
              <span className="font-display text-2xl text-electric">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="max-w-3xl text-3xl text-foreground sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-20 grid gap-10 border-t border-border pt-12 lg:grid-cols-2">
          {about.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl text-foreground">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
      <HowWeWork />
      <WhySofira />
      <ContactCta />
    </>
  );
}

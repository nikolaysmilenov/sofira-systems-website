import type { Metadata } from "next";
import { AskSofiraAi } from "@/components/contact/ask-sofira-ai";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { isInquiryId } from "@/data/labels";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Заявете проект",
  description:
    "Опишете как работите днес, какво искате да подобрите и какъв резултат търсите. SOFIRA SYSTEMS разглежда запитването и уточнява обхвата.",
  path: "/kontakt",
  ogTitle: "Заявете проект | SOFIRA SYSTEMS",
});

const nextSteps = [
  { index: "01", title: "Разглеждаме нуждата" },
  { index: "02", title: "Уточняваме процеса и обхвата" },
  { index: "03", title: "Предлагаме подходяща архитектура" },
  { index: "04", title: "Обсъждаме следващата стъпка" },
] as const;

export default async function ContactPage({
  searchParams,
}: PageProps<"/kontakt">) {
  const params = await searchParams;
  const raw = params.tema;
  const tema = Array.isArray(raw) ? raw[0] : raw;
  const defaultInquiry = tema && isInquiryId(tema) ? tema : "";

  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="INTAKE"
        title="Нека превърнем процеса ви в система."
        description="Опишете как работите днес, какво искате да подобрите и какъв резултат търсите."
      />
      <Container className="grid min-w-0 gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-20">
        <ContactForm
          key={defaultInquiry || "general"}
          defaultInquiry={defaultInquiry}
        />
        <aside className="min-w-0 lg:pt-2">
          <p className="coord">NEXT</p>
          <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
            Какво следва?
          </h2>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {nextSteps.map((step) => (
              <li
                key={step.index}
                className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-3 py-5"
              >
                <span className="font-display text-xl text-electric">
                  {step.index}
                </span>
                <span className="text-base text-foreground">{step.title}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <AskSofiraAi />
          </div>
        </aside>
      </Container>
    </>
  );
}

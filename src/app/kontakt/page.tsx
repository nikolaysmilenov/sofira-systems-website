import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { isInquiryId } from "@/data/labels";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Заявете проект",
  description:
    "Заявете проект към SOFIRA SYSTEMS — софтуерна система, автоматизация, AI решение, дигитална платформа или информация за HR HUB 360.",
  path: "/kontakt",
  ogTitle: "Заявете проект | SOFIRA SYSTEMS",
});

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
        eyebrow="Заявете проект"
        title="Какво искате да изградим?"
        description="Кратко запитване е достатъчно. Изберете типа проект, ако вече знаете посоката. Ще уточним обхвата след това."
      />
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:py-20">
        <ContactForm
          key={defaultInquiry || "general"}
          defaultInquiry={defaultInquiry}
        />
        <aside className="lg:pt-2">
          <p className="coord">INTAKE</p>
          <h2 className="mt-4 text-2xl text-foreground">Какво следва</h2>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
            <li>01 — Изберете тип проект, ако вече имате посока.</li>
            <li>02 — Опишете задачата с име, имейл и кратко съобщение.</li>
            <li>03 — SOFIRA SYSTEMS преглежда запитването и уточнява обхвата.</li>
            <li>04 — Не обещаваме срок за отговор, защото той зависи от задачата.</li>
          </ol>
          <p className="mt-8 text-sm leading-relaxed text-subtle">
            Ако предпочитате общ разговор, можете просто да се свържете с нас
            през същата форма.
          </p>
        </aside>
      </Container>
    </>
  );
}

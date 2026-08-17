import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { isInquiryId } from "@/data/labels";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Контакт",
  description:
    "Разкажете на SOFIRA SYSTEMS от какво се нуждаете — софтуер по поръчка, автоматизация, AI решение, бизнес система или информация за HR HUB 360.",
  path: "/kontakt",
  ogTitle: "Контакт със SOFIRA SYSTEMS",
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
        eyebrow="Контакт"
        title="Разкажете ни от какво се нуждаете."
        description="Опишете задачата или продукта, който ви интересува. SOFIRA SYSTEMS преглежда всяко запитване и се свързва, когато то пристигне при нас."
      />
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-20">
        <ContactForm
          key={defaultInquiry || "general"}
          defaultInquiry={defaultInquiry}
        />
        <aside>
          <Surface className="h-fit p-6 sm:p-8">
            <h2 className="text-xl text-foreground">Какво следва</h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <li>Попълнете име, имейл и съобщение.</li>
              <li>Компания, телефон и тема са по желание.</li>
              <li>
                Ако идвате от страница на продукт, темата може да е вече избрана.
                Можете да я промените.
              </li>
              <li>
                SOFIRA SYSTEMS преглежда запитването. Не обещаваме срок за отговор,
                защото той зависи от обхвата.
              </li>
            </ul>
          </Surface>
        </aside>
      </Container>
    </>
  );
}

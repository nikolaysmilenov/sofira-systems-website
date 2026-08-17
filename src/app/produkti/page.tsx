import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProductFeature } from "@/components/sections/product-feature";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Продукти",
  description:
    "Собствени софтуерни продукти на SOFIRA SYSTEMS. HR HUB 360 е водещата система в разработка. Нови продукти ще бъдат добавяни тук.",
  path: "/produkti",
  ogTitle: "Собствени продукти | SOFIRA SYSTEMS",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Продукти"
        title="Собствени продукти"
        description="SOFIRA SYSTEMS развива собствен бизнес софтуер, отделно от клиентските проекти. HR HUB 360 е първата публична система. Следващите ще се появят тук, когато са готови."
      />
      <ProductFeature />
      <Container className="py-16 sm:py-20">
        <p className="coord">NEXT SYSTEMS</p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
          Следващите продукти
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Нови системи ще се появят тук, когато са готови за представяне. Не
          показваме празни продуктови карти.
        </p>
      </Container>
      <ContactCta />
    </>
  );
}

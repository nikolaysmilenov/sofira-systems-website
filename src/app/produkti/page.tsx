import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { products } from "@/data/products";
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
        eyebrow="Портфолио"
        title="Собствени продукти"
        description="SOFIRA SYSTEMS развива собствен бизнес софтуер, отделно от клиентските проекти. HR HUB 360 е първата публична система. Следващите ще се появят тук, когато са готови."
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <ProductGrid products={products} showFutureSlot />
      </Container>
      <ContactCta />
    </>
  );
}

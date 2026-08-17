import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProductScreenshot } from "@/components/products/product-screenshot";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hrHubDashboard } from "@/data/hr-hub-screens";
import { ctaCopy } from "@/data/labels";
import { featuredProduct } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Продукти",
  description:
    "Собствени софтуерни продукти на SOFIRA SYSTEMS. HR HUB 360 е водещата система в разработка. Нови продукти ще бъдат добавяни тук.",
  path: "/produkti",
  ogTitle: "Собствени продукти | SOFIRA SYSTEMS",
});

export default function ProductsPage() {
  const product = featuredProduct;

  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Продукти"
        title="Собствени продукти"
        description="SOFIRA SYSTEMS развива собствен бизнес софтуер, отделно от клиентските проекти. HR HUB 360 е първата публична система. Следващите ще се появят тук, когато са готови."
      />
      {product ? (
        <section className="border-b border-border bg-navy-950">
          <Container className="py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <p className="coord">OWN PRODUCT</p>
                <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-subtle">
                  Наш собствен продукт.
                </p>
                <div className="mt-4">
                  <ProductStatusBadge status={product.status} />
                </div>
                <h2 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-lg text-muted">{product.tagline}</p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                  {product.summary} Все още не се продава през сайта.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={product.href}>{ctaCopy.viewProduct}</Button>
                </div>
              </div>
              <ProductScreenshot
                src={hrHubDashboard.src}
                alt={hrHubDashboard.alt}
                caption={hrHubDashboard.caption}
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
          </Container>
        </section>
      ) : null}
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

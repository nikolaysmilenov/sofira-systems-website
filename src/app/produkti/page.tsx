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
import { routes } from "@/data/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Продукти",
  description:
    "SOFIRA SYSTEMS е технологичен партньор и продуктова компания. Собствен продукт: HR HUB 360. Нови системи ще се появят тук, когато са готови.",
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
        title="Създаваме собствени продукти."
        description="SOFIRA SYSTEMS е технологичен партньор и продуктова компания. Клиентските системи се изграждат по поръчка. Собствените продукти се развиват отделно. HR HUB 360 е първата публична система."
      />
      <section className="border-b border-border bg-white">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-2">
          <div>
            <p className="coord">TECHNOLOGY PARTNER</p>
            <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
              Технологичен партньор
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              Изграждаме софтуер по поръчка за конкретна организация. Това е
              отделна линия от собствените продукти.
            </p>
            <div className="mt-6">
              <Button href={routes.services} variant="secondary">
                {ctaCopy.viewServices}
              </Button>
            </div>
          </div>
          <div>
            <p className="coord">PRODUCT COMPANY</p>
            <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
              Продуктова компания
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              Създаваме собствени продукти. HR HUB 360 е първата публична
              система. Следващите ще се появят тук, когато са готови.
            </p>
          </div>
        </Container>
      </section>
      {product ? (
        <section className="border-b border-border bg-navy-950">
          <Container className="py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <p className="coord">OWN PRODUCT</p>
                <p className="mt-4 text-sm font-medium tracking-normal text-subtle">
                  Наш собствен продукт.
                </p>
                <div className="mt-4">
                  <ProductStatusBadge status={product.status} />
                </div>
                <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">
                  {product.name}
                </h2>
                <p className="mt-4 text-lg text-muted">{product.tagline}</p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                  {product.summary} Все още не се продава през сайта.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={product.href}>{ctaCopy.viewHrHub}</Button>
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

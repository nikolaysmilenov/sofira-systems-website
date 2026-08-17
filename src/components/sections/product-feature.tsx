import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { ProductConceptVisual } from "@/components/products/product-concept-visual";
import { ctaCopy } from "@/data/labels";
import { featuredProduct, getProductInquireHref } from "@/data/products";

export function ProductFeature() {
  const product = featuredProduct;

  if (!product) {
    return null;
  }

  return (
    <section className="border-y border-border bg-navy-950">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:py-24">
        <div>
          <Eyebrow>Водещ продукт</Eyebrow>
          <div className="mt-4">
            <ProductStatusBadge status={product.status} />
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-[2.35rem]">
            {product.name}
          </h2>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            HR HUB 360 е собствен бизнес софтуер на SOFIRA SYSTEMS за управление
            на HR процеси. Събира служители, договори, отпуски, работно време,
            подбор и обучения в една среда.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-subtle">
            {product.platform} Продуктът е в активна разработка и все още не се
            продава през сайта.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={getProductInquireHref(product)}>
              {ctaCopy.inquire}
            </Button>
            <Button href={product.href} variant="secondary">
              {ctaCopy.viewProduct}
            </Button>
          </div>
        </div>
        <ProductConceptVisual title="HR HUB 360" variant="hero" />
      </Container>
    </section>
  );
}

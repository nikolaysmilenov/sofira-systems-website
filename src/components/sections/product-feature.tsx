import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { HrHubShowcase } from "@/components/products/hr-hub-showcase";
import { ctaCopy } from "@/data/labels";
import { featuredProduct, getProductInquireHref } from "@/data/products";

export function ProductFeature() {
  const product = featuredProduct;

  if (!product) {
    return null;
  }

  return (
    <section className="border-y border-border bg-navy-950">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <div>
            <p className="coord">FLAGSHIP PRODUCT</p>
            <div className="mt-4">
              <ProductStatusBadge status={product.status} />
            </div>
            <h2 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
              {product.name}
            </h2>
            <p className="mt-4 text-lg text-muted">
              Централизирана система за управление на човешките ресурси и бизнес
              процесите.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Десктоп приложение за Windows с български интерфейс. Събира
              служители, договори, документи, отпуски, работно време, подбор и
              обучения в една среда. Все още не се продава през сайта.
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
          <p className="max-w-md text-sm leading-relaxed text-subtle lg:text-right">
            Изгледите по-долу следват реалната навигация на HR HUB 360. Не са
            снимки от инсталираното приложение.
          </p>
        </div>
        <div className="mt-10">
          <HrHubShowcase />
        </div>
      </Container>
    </section>
  );
}

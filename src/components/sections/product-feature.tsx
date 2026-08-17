import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Surface } from "@/components/ui/surface";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { ctaCopy } from "@/data/labels";
import { featuredProduct, getProductInquireHref } from "@/data/products";

export function ProductFeature() {
  const product = featuredProduct;

  if (!product) {
    return null;
  }

  return (
    <section className="border-y border-border bg-navy-950">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:py-28">
        <div>
          <Eyebrow>Водещ продукт</Eyebrow>
          <div className="mt-4">
            <ProductStatusBadge status={product.status} />
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-[2.15rem]">
            {product.name}
          </h2>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {product.summary}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-subtle">
            За организации, които искат служители, договори, отпуски, работно
            време и подбор да се управляват на едно място.{" "}
            {product.platform}
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
        <Surface className="p-6 sm:p-8">
          <p className="text-sm font-medium text-foreground">Основни области</p>
          <ul className="mt-2">
            {product.capabilities.map((item) => (
              <li
                key={item.title}
                className="border-b border-border py-3 text-sm text-muted last:border-b-0"
              >
                {item.title}
                {item.state === "upcoming" ? " — предстои" : ""}
              </li>
            ))}
          </ul>
        </Surface>
      </Container>
    </section>
  );
}

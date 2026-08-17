import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/products/product-grid";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { products } from "@/data/products";

export function ProductsSection() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Портфолио"
          title="Собствени продукти"
          description="Собствен бизнес софтуер на SOFIRA SYSTEMS, отделно от клиентските проекти. HR HUB 360 е първата публична система."
        />
        <Button href={routes.products} variant="secondary" className="w-fit">
          {ctaCopy.viewProducts}
        </Button>
      </div>
      <ProductGrid products={products} showFutureSlot className="mt-10" />
    </Section>
  );
}

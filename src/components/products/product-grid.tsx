import { FutureProductSlot } from "@/components/products/future-product-slot";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/content";

type ProductGridProps = {
  products: Product[];
  showFutureSlot?: boolean;
  className?: string;
};

export function ProductGrid({
  products,
  showFutureSlot = false,
  className,
}: ProductGridProps) {
  const showGrid = showFutureSlot || products.length > 1;

  return (
    <div
      className={cn(
        showGrid ? "grid gap-4 lg:grid-cols-2" : "max-w-3xl",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
      {showFutureSlot ? <FutureProductSlot /> : null}
    </div>
  );
}

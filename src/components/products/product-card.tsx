import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { Surface } from "@/components/ui/surface";
import { productCategoryLabel } from "@/data/labels";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/content";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Surface hover className={cn("flex h-full flex-col p-6 sm:p-8", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <ProductStatusBadge status={product.status} />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
          {productCategoryLabel[product.category]}
        </span>
      </div>
      <h3 className="mt-5 text-2xl text-foreground">
        <Link
          href={product.href}
          className="transition-colors hover:text-electric-hover"
        >
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm font-medium text-muted">{product.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {product.summary}
      </p>
      <div className="mt-6">
        <Button href={product.href} variant="secondary">
          {product.cta.details}
        </Button>
      </div>
    </Surface>
  );
}

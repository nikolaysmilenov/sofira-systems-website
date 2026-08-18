import { productStatusLabel } from "@/data/labels";
import { cn } from "@/lib/cn";
import type { ProductStatus } from "@/types/content";

type ProductStatusBadgeProps = {
  status: ProductStatus;
  className?: string;
};

export function ProductStatusBadge({
  status,
  className,
}: ProductStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-normal",
        status === "available" &&
          "border-cyan/30 bg-cyan/10 text-cyan",
        status === "in-development" &&
          "border-electric/25 bg-electric/8 text-electric",
        status === "coming-soon" &&
          "border-border bg-navy-800 text-subtle",
        className,
      )}
    >
      {productStatusLabel[status]}
    </span>
  );
}

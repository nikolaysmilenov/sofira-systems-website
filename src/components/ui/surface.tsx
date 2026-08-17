import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Surface({ children, className, hover = false }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white shadow-[0_10px_30px_rgb(15_40_80_/_0.04)]",
        hover &&
          "transition-[border-color,box-shadow] duration-200 hover:border-electric/25 hover:shadow-[0_14px_36px_rgb(15_40_80_/_0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

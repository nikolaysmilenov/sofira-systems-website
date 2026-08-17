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
        "rounded-xl border border-border bg-navy-900",
        hover &&
          "transition-colors duration-200 hover:border-electric/30 hover:bg-navy-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

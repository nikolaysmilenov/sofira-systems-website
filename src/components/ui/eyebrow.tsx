import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em] text-subtle",
        className,
      )}
    >
      <span className="h-px w-6 shrink-0 bg-electric" aria-hidden="true" />
      {children}
    </p>
  );
}

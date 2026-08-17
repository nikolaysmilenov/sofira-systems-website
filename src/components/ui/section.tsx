import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  contained?: boolean;
};

export function Section({
  children,
  className,
  id,
  contained = true,
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-28", className)}
    >
      {content}
    </section>
  );
}

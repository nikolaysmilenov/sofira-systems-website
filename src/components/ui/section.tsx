import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  contained?: boolean;
  tone?: "light" | "mist" | "deep";
};

const tones = {
  light: "bg-white text-foreground",
  mist: "bg-navy-950 text-foreground",
  deep: "deep-section",
} as const;

export function Section({
  children,
  className,
  id,
  contained = true,
  tone = "light",
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-28", tones[tone], className)}
    >
      {content}
    </section>
  );
}

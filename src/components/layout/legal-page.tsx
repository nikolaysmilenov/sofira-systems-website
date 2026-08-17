import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

type LegalPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Правна информация" title={title} description={description} />
      <Container className="max-w-3xl py-12 sm:py-16">
        <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          {children}
        </div>
      </Container>
    </>
  );
}

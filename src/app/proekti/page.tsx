import type { Metadata } from "next";
import { CaseStudyIndex } from "@/components/projects/case-study-index";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Проекти",
  description:
    "Инженерни истории на SOFIRA SYSTEMS: публична платформа, HR HUB 360 и STINGER. Клиентска работа се публикува само със съгласие.",
  path: "/proekti",
  ogTitle: "Инженерни истории | SOFIRA SYSTEMS",
});

export default function ProjectsPage() {
  return <CaseStudyIndex />;
}

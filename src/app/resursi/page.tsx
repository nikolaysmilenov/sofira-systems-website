import type { Metadata } from "next";
import { ResourceIndex } from "@/components/resources/resource-index";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Практически ресурси за софтуер, автоматизация и AI",
  description:
    "Практически ресурси от SOFIRA SYSTEMS за софтуер по поръчка, автоматизация на бизнес процеси, AI решения и дигитални платформи.",
  path: "/resursi",
  ogTitle: "Ресурси за софтуер, автоматизация и AI | SOFIRA SYSTEMS",
});

export default function ResourcesPage() {
  return <ResourceIndex />;
}

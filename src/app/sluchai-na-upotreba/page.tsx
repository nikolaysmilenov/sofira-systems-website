import type { Metadata } from "next";
import { UseCasesView } from "@/components/use-cases/use-cases-view";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Бизнес проблеми, които могат да станат системи",
  description:
    "Разгледайте бизнес проблеми, за които може да има смисъл от автоматизация, софтуер по поръчка, вътрешна бизнес система, AI решение, HR софтуер или дигитална платформа.",
  path: "/sluchai-na-upotreba",
  ogTitle: "Бизнес проблеми и възможни системи | SOFIRA SYSTEMS",
});

export default function UseCasesPage() {
  return <UseCasesView />;
}

import type { Metadata } from "next";
import { AboutView } from "@/components/about/about-view";
import { aboutPageHero } from "@/data/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "За нас",
  description: aboutPageHero.description,
  path: "/za-nas",
  ogTitle: "За SOFIRA SYSTEMS",
});

export default function AboutPage() {
  return <AboutView />;
}

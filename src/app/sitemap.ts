import type { MetadataRoute } from "next";
import { legalNav, mainNav } from "@/data/navigation";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const paths = new Set<string>([
    ...mainNav.map((item) => item.href),
    ...legalNav.map((item) => item.href),
    ...products.map((product) => product.href),
    ...projects.map((project) => project.href),
  ]);

  return [...paths].map((path) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from "next";
import { legalNav, mainNav, routes } from "@/data/navigation";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { resourcePath, resources } from "@/data/resources";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const paths = new Set<string>([
    ...mainNav.map((item) => item.href),
    ...legalNav.map((item) => item.href),
    routes.useCases,
    ...products.map((product) => product.href),
    ...projects.map((project) => project.href),
    ...resources.map((article) => resourcePath(article.slug)),
    routes.resources,
  ]);

  return [...paths].map((path) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticleView } from "@/components/resources/resource-article";
import { site } from "@/data/site";
import { getResourceBySlug, resourcePath, resources } from "@/data/resources";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const dynamicParams = false;

type ResourceArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resources.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: ResourceArticlePageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getResourceBySlug(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: resourcePath(article.slug),
    ogTitle: `${article.title} | ${site.name}`,
  });
}

export default async function ResourceArticlePage(
  props: ResourceArticlePageProps,
) {
  const { slug } = await props.params;
  const article = getResourceBySlug(slug);

  if (!article) {
    notFound();
  }

  const url = absoluteUrl(resourcePath(article.slug));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    url,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ResourceArticleView article={article} />
    </>
  );
}

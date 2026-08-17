import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/products/product-page-view";
import { getProductBySlug, products } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Продукт",
      description: "Собствен софтуерен продукт на SOFIRA SYSTEMS.",
      path: `/produkti/${slug}`,
    });
  }

  return createPageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: product.href,
    ogTitle: `${product.name} — ${product.tagline}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
}

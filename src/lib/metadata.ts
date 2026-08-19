import type { Metadata } from "next";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";

const defaultSocialImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.name} — софтуерни решения за бизнеса`,
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle ?? `${title} | ${site.name}`;
  const socialDescription = ogDescription ?? description;

  return {
    title: path === "/" ? { absolute: `${site.name} — ${title}` } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      images: [defaultSocialImage],
      locale: site.locale,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [defaultSocialImage],
    },
  };
}

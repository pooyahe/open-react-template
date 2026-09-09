import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const canonicalUrl = siteConfig.url;
export const isIndexableDeployment =
  process.env.DEPLOYMENT_ENV === "production" &&
  process.env.SEO_INDEXING_ENABLED === "true";

const socialImage = {
  url: `${canonicalUrl}/images/heroimage.png`,
  width: 1672,
  height: 941,
  alt: "Digitale Dokumentenverwaltung am Arbeitsplatz",
};

export function routeMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: isIndexableDeployment ? { canonical: path } : undefined,
    openGraph: isIndexableDeployment
      ? {
          title,
          description,
          url: `${canonicalUrl}${path}`,
          siteName: siteConfig.name,
          locale: "de_DE",
          type: "website",
          images: [socialImage],
        }
      : undefined,
    twitter: isIndexableDeployment
      ? {
          card: "summary_large_image",
          title,
          description,
          images: [socialImage.url],
        }
      : undefined,
  };
}

export { socialImage };

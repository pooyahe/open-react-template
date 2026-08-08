import type { MetadataRoute } from "next";
import { canonicalUrl, isIndexableDeployment } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment) return [];

  return ["/", "/impressum", "/datenschutz"].map((path) => ({
    url: `${canonicalUrl}${path === "/" ? "" : path}`,
  }));
}

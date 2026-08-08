import type { MetadataRoute } from "next";
import { canonicalUrl, isIndexableDeployment } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${canonicalUrl}/sitemap.xml`,
    host: canonicalUrl,
  };
}

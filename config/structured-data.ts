import { siteConfig } from "@/config/site";

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
} as const;

export const serializedWebsiteStructuredData = JSON.stringify(websiteStructuredData).replace(
  /</g,
  "\\u003c",
);

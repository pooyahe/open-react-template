import "./css/style.css";

import localFont from "next/font/local";
import type { Metadata } from "next";
import Header from "@/components/ui/header";
import { isIndexableDeployment } from "@/config/seo";
import { serializedWebsiteStructuredData } from "@/config/structured-data";

const siteFont = localFont({
  src: [
    { path: "../public/fonts/nacelle-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/nacelle-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-site",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: isIndexableDeployment ? new URL("https://aktenkompass.de") : undefined,
  title: {
    default: "AktenKompass | Dokumentenmanagement für kleine Unternehmen",
    template: "%s | AktenKompass",
  },
  description: "AktenKompass unterstützt kleine Unternehmen bei strukturierter digitaler Dokumentenverwaltung, pragmatischer Automatisierung und verständlicher Datennutzung.",
  robots: {
    index: isIndexableDeployment,
    follow: isIndexableDeployment,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedWebsiteStructuredData }}
        />
      </head>
      <body className={`${siteFont.variable} bg-[var(--page-bg)] font-site text-base text-[var(--ink)] antialiased`}>
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

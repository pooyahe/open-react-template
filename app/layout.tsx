import "./css/style.css";

import localFont from "next/font/local";
import Header from "@/components/ui/header";

const siteFont = localFont({
  src: [
    { path: "../public/fonts/nacelle-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/nacelle-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-site",
  display: "swap",
});

export const metadata = {
  title: "[COMPANY_NAME] – Digitalisierung für kleine Unternehmen",
  description: "Dokumente digitalisieren, Abläufe automatisieren und Daten verständlich nutzen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
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

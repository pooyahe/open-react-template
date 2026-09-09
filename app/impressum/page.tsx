import type { Metadata } from "next";
import { routeMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = routeMetadata(
  "Impressum",
  "Impressum und Angaben zum Betreiber von AktenKompass.",
  "/impressum",
);

export default function ImpressumPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Impressum</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">Angaben gemäß § 5 DDG</h2>
        <p>Diensteanbieter und verantwortlich für den Inhalt:<br />{siteConfig.operatorName}<br />{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}<br />{siteConfig.address.country}</p>
        <p>Kontakt:<br /><a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br /><a className="underline" href="tel:+4917657739809">{siteConfig.phone}</a></p>
        <p>AktenKompass befindet sich in der Vorbereitungs- und Pre-Launch-Phase. Diensteanbieter ist die oben genannte natürliche Person; ein Eintrag im Handelsregister besteht nicht.</p>
        <p>Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB.</p>
        <p>AktenKompass erbringt keine Rechts- oder Steuerberatung. Rechtliche, steuerliche und aufbewahrungsbezogene Anforderungen müssen für den konkreten Anwendungsfall gesondert bewertet werden.</p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { routeMetadata } from "@/config/seo";

export const metadata: Metadata = routeMetadata(
  "Datenschutz",
  "Vorläufige Datenschutzhinweise für die aktuelle statische Website von AktenKompass.",
  "/datenschutz",
);

export default function DatenschutzPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Datenschutz</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <p>Diese vorläufigen Datenschutzhinweise gelten für die derzeitige statische Website von AktenKompass.</p>
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten ist:<br />Pouya Hedayati<br />Gärtnerstr. 29<br />80992 München<br />Deutschland<br /><a className="underline" href="mailto:info@aktenkompass.de">info@aktenkompass.de</a></p>
        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">Kontaktformular</h2>
        <p>Wenn Sie das Kontaktformular nutzen, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Nachricht sowie die freiwillig angegebenen Informationen zu Unternehmen und Telefonnummer, um Ihre Anfrage zu beantworten.</p>
        <p>Die Formulardaten werden durch Netlify Forms entgegengenommen und im geschützten Netlify-Administrationsbereich gespeichert. Wenn eine E-Mail-Benachrichtigung eingerichtet ist, werden die Angaben zusätzlich an unser IONOS-Postfach übermittelt. Technisch erforderliche Metadaten können in den Protokollen der beteiligten Hosting- und E-Mail-Dienstleister verarbeitet werden.</p>
        <p>Bitte übermitteln Sie über das Formular keine vertraulichen Dokumente, besonderen Kategorien personenbezogener Daten oder Zugangsdaten. Dateiuploads sind nicht möglich. Alternativ können Sie uns direkt per E-Mail kontaktieren.</p>
        <p>Diese Datenschutzhinweise müssen vor der öffentlichen Veröffentlichung anhand der finalen Verträge, Auftragsverarbeitungsvereinbarungen, Speicherfristen und eingesetzten Anbieter rechtlich geprüft werden. AktenKompass erteilt keine Rechts- oder Steuerberatung.</p>
      </div>
    </main>
  );
}

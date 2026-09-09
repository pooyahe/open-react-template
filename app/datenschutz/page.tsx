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
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten ist:<br />Dr. Pouya Hedayati<br />Gärtnerstr. 29<br />80992 München<br />Deutschland<br /><a className="underline" href="mailto:info@aktenkompass.de">info@aktenkompass.de</a></p>
        <p>Auf der aktuellen Website werden keine Analyse- oder Marketingdienste, keine externen Schriftarten und kein Kontaktformular eingesetzt. Es werden keine Kontaktanfragen in einer Anwendungsdatenbank gespeichert.</p>
        <p>Die Website wird vor einer öffentlichen Veröffentlichung um die dann tatsächlich eingesetzten Dienste und Datenverarbeitungen ergänzt und rechtlich geprüft. AktenKompass erteilt keine Rechts- oder Steuerberatung.</p>
      </div>
    </main>
  );
}

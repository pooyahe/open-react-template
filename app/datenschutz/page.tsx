import type { Metadata } from "next";
import { routeMetadata } from "@/config/seo";

export const metadata: Metadata = routeMetadata(
  "Datenschutz",
  "Datenschutzhinweise für die statische Website von AktenKompass.",
  "/datenschutz",
);

export default function DatenschutzPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Datenschutz</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <p>Diese Datenschutzhinweise gelten für die statische Website von AktenKompass. Die Website dient der Information über Dienstleistungen und der Kontaktaufnahme für unverbindliche Erstgespräche.</p>
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten ist:<br />Dr. Pouya Hedayati<br />Gärtnerstr. 29<br />80992 München<br />Deutschland<br /><a className="underline" href="mailto:info@aktenkompass.de">info@aktenkompass.de</a></p>
        <p>Auf der Website werden keine Analyse- oder Marketingdienste, keine externen Schriftarten und keine nicht notwendigen Cookies eingesetzt. Das Kontaktformular übermittelt die von Ihnen eingegebenen Angaben zur Bearbeitung Ihrer Anfrage an den Betreiber. Wenn der Versanddienst Brevo aktiviert ist, werden die Angaben über die Brevo Transactional Email API an das Betreiberpostfach übermittelt. Die Kontaktbuttons öffnen außerdem Ihr eigenes E-Mail-Programm oder die Telefonfunktion Ihres Geräts.</p>
        <p>Beim Aufruf der Website verarbeitet der Hostinganbieter technisch erforderliche Verbindungsdaten, um die Seiten auszuliefern und abzusichern. Die Website selbst speichert keine Kontaktanfragen in einer Anwendungsdatenbank und verwendet keinen nicht notwendigen Browser-Speicher.</p>
        <p>Sie können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und weitere gesetzliche Betroffenenrechte geltend machen. Bitte richten Sie Ihre Anfrage an <a className="underline" href="mailto:info@aktenkompass.de">info@aktenkompass.de</a>. Die konkrete Datenschutzerklärung und die Angaben zu den eingesetzten Hosting- und E-Mail-Diensten müssen vor der öffentlichen Veröffentlichung rechtlich geprüft werden.</p>
        <p>AktenKompass erteilt keine Rechts- oder Steuerberatung.</p>
      </div>
    </main>
  );
}

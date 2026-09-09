import type { Metadata } from "next";
import { routeMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = routeMetadata(
  "Datenschutz",
  "Datenschutzhinweise für die Website und Kontaktmöglichkeiten von AktenKompass.",
  "/datenschutz",
);

export default function DatenschutzPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Datenschutz</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">1. Verantwortlicher</h2>
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten ist:<br />{siteConfig.operatorName}<br />{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}<br />{siteConfig.address.country}<br /><a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">2. Bereitstellung und Hosting der Website</h2>
        <p>Beim Aufruf dieser Website werden technisch erforderliche Daten verarbeitet. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite oder Datei, übertragene Datenmenge, Referrer-URL, Browsertyp, Betriebssystem und Zugriffsstatus gehören. Die Verarbeitung ist erforderlich, um die Website bereitzustellen, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren.</p>
        <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, zuverlässigen und technisch funktionsfähigen Bereitstellung dieser Website.</p>
        <p>Die Website wird über Netlify, Inc., USA, bereitgestellt. Netlify verarbeitet die hierfür erforderlichen Daten als Dienstleister. Eine Verarbeitung in den USA oder anderen Staaten außerhalb des Europäischen Wirtschaftsraums kann dabei nicht ausgeschlossen werden. Soweit erforderlich, erfolgt die Übermittlung auf Grundlage der anwendbaren datenschutzrechtlichen Garantien, insbesondere der vertraglichen Regelungen und Standardvertragsklauseln des Anbieters.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">3. Kontaktformular</h2>
        <p>Wenn Sie das Kontaktformular nutzen, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht. Diese Angaben sind erforderlich, um Ihre Anfrage zu bearbeiten. Angaben zu Unternehmen und Telefonnummer sind freiwillig.</p>
        <p>Die Verarbeitung erfolgt zur Bearbeitung vorvertraglicher Anfragen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Bei sonstigen geschäftlichen Anfragen erfolgt sie auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in der sachgerechten Bearbeitung und Beantwortung Ihrer Anfrage.</p>
        <p>Die Formulardaten werden durch Netlify Forms entgegengenommen und im geschützten Netlify-Administrationsbereich gespeichert. E-Mail-Benachrichtigungen und Antworten werden über unser bei IONOS SE geführtes Postfach verarbeitet. Dabei können technisch erforderliche Metadaten in den Protokollen der beteiligten Dienstleister verarbeitet werden.</p>
        <p>Bitte übermitteln Sie über das Formular keine vertraulichen Dokumente, besonderen Kategorien personenbezogener Daten oder Zugangsdaten. Dateiuploads sind nicht möglich. Alternativ können Sie uns direkt per E-Mail kontaktieren.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">4. Kontakt per E-Mail oder Telefon</h2>
        <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen übermittelten Kontaktdaten und den Inhalt Ihrer Anfrage, um diese zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen und Art. 6 Abs. 1 lit. f DSGVO bei sonstiger geschäftlicher Kommunikation.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">5. Speicherdauer</h2>
        <p>Kontaktanfragen werden spätestens sechs Monate nach ihrer abschließenden Bearbeitung aus Netlify Forms und dem E-Mail-Postfach gelöscht, sofern daraus kein Vertragsverhältnis entsteht und keine gesetzlichen Aufbewahrungspflichten oder die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen eine längere Speicherung erfordern.</p>
        <p>Kommt ein Vertragsverhältnis zustande, werden die hierfür erforderlichen Unterlagen entsprechend den anwendbaren gesetzlichen Aufbewahrungsfristen gespeichert. Technische Protokolldaten werden nach den für den jeweiligen Hosting- oder E-Mail-Dienst geltenden beziehungsweise konfigurierten Fristen gelöscht.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">6. Cookies, Analyse und Marketing</h2>
        <p>Wir setzen derzeit keine Analyse- oder Marketingdienste und keine nicht erforderlichen Cookies ein. Es findet keine verhaltensbezogene Werbung oder Reichweitenmessung statt.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">7. Empfänger und Auftragsverarbeitung</h2>
        <p>Personenbezogene Daten erhalten nur die Stellen, die sie zur Bereitstellung der Website und zur Bearbeitung Ihrer Anfrage benötigen. Hierzu zählen insbesondere Netlify als Hosting- und Formulardienstleister sowie IONOS als E-Mail-Dienstleister. Mit Dienstleistern werden, soweit erforderlich, Vereinbarungen zur Auftragsverarbeitung geschlossen oder deren entsprechende Vertragsregelungen genutzt.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">8. Ihre Rechte</h2>
        <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft über Ihre personenbezogenen Daten, auf Berichtigung unrichtiger Daten, auf Löschung, auf Einschränkung der Verarbeitung sowie auf Datenübertragbarkeit. Sie können einer Verarbeitung, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen widersprechen, die sich aus Ihrer besonderen Situation ergeben.</p>
        <p>Zur Ausübung Ihrer Rechte können Sie sich unter <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> an uns wenden. Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für nichtöffentliche Stellen in Bayern ist grundsätzlich das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, zuständig.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">9. Automatisierte Entscheidungen</h2>
        <p>Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des Art. 22 DSGVO statt.</p>

        <h2 className="pt-4 text-2xl font-bold text-[var(--ink)]">10. Sicherheit und Aktualisierung</h2>
        <p>Die Übertragung dieser Website erfolgt verschlüsselt über HTTPS. Wir passen diese Datenschutzhinweise an, wenn sich die eingesetzten Dienste oder die rechtlichen Anforderungen ändern.</p>
        <p>Stand: September 2026</p>
      </div>
    </main>
  );
}

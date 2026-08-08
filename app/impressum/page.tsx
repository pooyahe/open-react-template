export default function ImpressumPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Impressum</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <p>AktenKompass ist ein Pre-Launch-Digitalisierungsprojekt, betrieben von Pouya Hedayati. Es besteht derzeit kein eingetragener Gewerbebetrieb oder Unternehmen in der Rechtsform einer GmbH oder UG.</p>
        <p>Verantwortlich für den Inhalt:<br />Pouya Hedayati<br />Gärtnerstr. 29<br />80992 München<br />Deutschland</p>
        <p>Kontakt:<br /><a className="underline" href="mailto:info@aktenkompass.de">info@aktenkompass.de</a><br /><a className="underline" href="tel:+4917657739809">+49 176 57739809</a></p>
        <p>AktenKompass erbringt keine Rechts- oder Steuerberatung. Rechtliche, steuerliche und aufbewahrungsbezogene Anforderungen müssen für den konkreten Anwendungsfall gesondert bewertet werden.</p>
      </div>
    </main>
  );
}

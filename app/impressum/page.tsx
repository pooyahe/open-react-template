export default function ImpressumPage() {
  return (
    <main className="site-container section-space">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Rechtlicher Hinweis</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">Impressum</h1>
      <div className="mt-8 max-w-2xl space-y-5 leading-8 text-[var(--muted)]">
        <p>Diese Seite enthält derzeit einen Platzhalter. Die vollständigen Anbieterangaben werden vor der Veröffentlichung ergänzt und rechtlich geprüft.</p>
        <p>[COMPANY_NAME]<br />[CONTACT_PERSON]<br />[ADDRESS]<br />[CITY]</p>
      </div>
    </main>
  );
}

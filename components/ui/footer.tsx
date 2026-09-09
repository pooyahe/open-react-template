import Link from "next/link";
import Logo from "./logo";
import { navigation } from "@/config/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="site-container grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
        <div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-[var(--muted)]">Dokumente digitalisieren. Abläufe automatisieren. Daten verstehen.</p></div>
        <nav aria-label="Footer-Navigation"><p className="footer-label">Auf dieser Seite</p><ul className="mt-4 space-y-3">{navigation.map((item) => <li key={item.href}><Link className="footer-link" href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <nav aria-label="Rechtliche Hinweise"><p className="footer-label">Rechtliches</p><ul className="mt-4 space-y-3"><li><Link className="footer-link" href="/impressum">Impressum</Link></li><li><Link className="footer-link" href="/datenschutz">Datenschutz</Link></li></ul></nav>
      </div>
      <div className="site-container border-t border-[var(--border)] py-5 text-xs text-[var(--muted)]">© AktenKompass · Betreiber: Dr. Pouya Hedayati</div>
    </footer>
  );
}

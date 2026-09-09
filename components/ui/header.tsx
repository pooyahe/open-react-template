"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Logo from "./logo";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur">
      <div className="site-container flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => <Link key={item.href} className="nav-link" href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="hidden lg:block"><Link className="button-small" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.consultationSubject)}`}>Kostenloses Erstgespräch</Link></div>
        <button ref={menuButtonRef} type="button" className="menu-button lg:hidden" aria-label={`Menü ${open ? "schließen" : "öffnen"}`} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === "Escape" && open) closeMenu(); }}>
          <span aria-hidden="true" className="text-2xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile Hauptnavigation" className="border-t border-[var(--border)] bg-white px-5 py-5 lg:hidden" onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeMenu(); } }}>
          <div className="site-container flex flex-col gap-1">
            {navigation.map((item) => <Link key={item.href} className="mobile-nav-link" href={item.href} onClick={closeMenu}>{item.label}</Link>)}
            <Link className="button-small mt-3 text-center" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.consultationSubject)}`} onClick={closeMenu}>Kostenloses Erstgespräch</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

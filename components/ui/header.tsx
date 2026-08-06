"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { navigation } from "@/config/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur">
      <div className="site-container flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => <Link key={item.href} className="nav-link" href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="hidden lg:block"><Link className="button-small" href="#kontakt">Kostenloses Erstgespräch</Link></div>
        <button type="button" className="menu-button lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menü {open ? "schließen" : "öffnen"}</span>
          <span aria-hidden="true" className="text-2xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile Hauptnavigation" className="border-t border-[var(--border)] bg-white px-5 py-5 lg:hidden">
          <div className="site-container flex flex-col gap-1">
            {navigation.map((item) => <Link key={item.href} className="mobile-nav-link" href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
            <Link className="button-small mt-3 text-center" href="#kontakt" onClick={() => setOpen(false)}>Kostenloses Erstgespräch</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

import Link from "next/link";
import { homepageContent } from "@/content/homepage";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section id="kontakt" className="section-space bg-[var(--deep-navy)] text-white">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">{homepageContent.contact.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{homepageContent.contact.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{homepageContent.contact.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link className="button-primary" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.emailSubject)}`}>Problem beschreiben</Link>
          <Link className="button-secondary button-secondary-dark" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.consultationSubject)}`}>Erstgespräch vereinbaren</Link>
          <Link className="button-secondary button-secondary-dark" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Direkt anrufen</Link>
        </div>
      </div>
      <div id="kontakt-start" className="site-container mt-12 grid gap-4 border-t border-white/20 pt-8 text-sm text-slate-300 sm:grid-cols-3">
        <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">E-Mail</span><a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
        <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">Telefon</span><a className="underline underline-offset-4" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a></p>
        <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">Standort</span>{siteConfig.city}</p>
      </div>
    </section>
  );
}

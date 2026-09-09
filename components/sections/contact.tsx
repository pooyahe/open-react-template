import ContactForm from "@/components/sections/contact-form";
import { homepageContent } from "@/content/homepage";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section id="kontakt" className="section-space bg-[var(--deep-navy)] text-white">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">{homepageContent.contact.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{homepageContent.contact.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{homepageContent.contact.text}</p>
          <div id="kontakt-start" className="mt-10 space-y-4 border-t border-white/20 pt-8 text-sm text-slate-200">
            <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">E-Mail</span><a className="mt-1 inline-block underline decoration-blue-300/60 underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
            <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">Telefon</span><a className="mt-1 inline-block underline decoration-blue-300/60 underline-offset-4" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a></p>
            <p><span className="block text-xs uppercase tracking-[0.14em] text-blue-200">Standort</span>{siteConfig.city}</p>
            <p className="pt-2 text-xs leading-5 text-slate-400">Falls das Formular nicht funktioniert, erreichen Sie uns jederzeit direkt per E-Mail.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

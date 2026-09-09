import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import Problems from "@/components/sections/problems";
import Services from "@/components/sections/services";
import Transformation from "@/components/sections/transformation";
import Process from "@/components/sections/process";
import UseCases from "@/components/sections/use-cases";
import Contact from "@/components/sections/contact";
import { homepageContent } from "@/content/homepage";
import { routeMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = routeMetadata(
  "Dokumentenmanagement für kleine Unternehmen",
  "Strukturierte digitale Dokumentenverwaltung, pragmatische Automatisierung und verständliche Datennutzung für kleine Unternehmen.",
  "/",
);

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--deep-navy)] py-6 sm:py-10 lg:py-14">
        <div className="site-container">
          <div className="relative min-h-[620px] overflow-hidden rounded-[1.75rem] bg-slate-900 sm:min-h-[640px] lg:min-h-[680px]">
            <Image src="/images/heroimage.png" alt="Digitale Dokumentenverwaltung am Arbeitsplatz" fill priority sizes="(max-width: 640px) calc(100vw - 2.5rem), 1200px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,31,51,0.94)] via-[rgba(11,31,51,0.78)] to-[rgba(11,31,51,0.12)]" aria-hidden="true" />
            <div className="relative flex min-h-[620px] items-center px-6 py-16 sm:min-h-[640px] sm:px-12 lg:min-h-[680px] lg:px-20">
              <div className="min-w-0 w-full max-w-full text-white lg:max-w-2xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">{homepageContent.hero.eyebrow}</p>
                <h1 className="min-w-0 max-w-full text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:max-w-xl lg:text-7xl">{homepageContent.hero.title}</h1>
                <p className="mt-7 min-w-0 max-w-full text-lg leading-8 text-slate-100 sm:text-xl lg:max-w-xl">{homepageContent.hero.text}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a className="button-primary" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.consultationSubject)}`}>{homepageContent.hero.primaryCta}</a>
                  <a className="button-secondary button-secondary-dark" href="#probleme">{homepageContent.hero.secondaryCta}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Problems />
      <Services />
      <Transformation />
      <Process />
      <UseCases />
      <section className="section-space bg-[var(--soft-blue)]">
        <div className="site-container">
          <SectionHeading eyebrow="Der nächste Schritt" title="Digitalisierung darf verständlich beginnen" text="Sie müssen nicht alles auf einmal verändern. Gemeinsam klären wir, welcher Prozess zuerst betrachtet werden sollte." align="center" />
          <div className="mt-8 text-center"><a className="button-primary" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.contact.consultationSubject)}`}>Kostenloses Erstgespräch</a></div>
        </div>
      </section>
      <Contact />
    </>
  );
}

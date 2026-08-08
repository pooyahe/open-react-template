import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import Problems from "@/components/sections/problems";
import Services from "@/components/sections/services";
import Transformation from "@/components/sections/transformation";
import Process from "@/components/sections/process";
import UseCases from "@/components/sections/use-cases";
import Contact from "@/components/sections/contact";
import { homepageContent } from "@/content/homepage";

export const metadata = {
  title: "Digitalisierung für kleine Unternehmen",
  description: "Weniger Papier, klarere Abläufe und verständliche Geschäftsdaten.",
};

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--deep-navy)] py-6 sm:py-10 lg:py-14">
        <div className="site-container">
          <div className="relative min-h-[620px] overflow-hidden rounded-[1.75rem] bg-slate-900 sm:min-h-[640px] lg:min-h-[680px]">
            <Image src="/media/hero/hero-poster.webp" alt="Arbeitsplatz mit Laptop und digitalen Unterlagen" fill priority sizes="(max-width: 640px) calc(100vw - 2.5rem), 1200px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,31,51,0.94)] via-[rgba(11,31,51,0.78)] to-[rgba(11,31,51,0.12)]" aria-hidden="true" />
            <div className="relative flex min-h-[620px] items-center px-6 py-16 sm:min-h-[640px] sm:px-12 lg:min-h-[680px] lg:px-20">
              <div className="max-w-2xl text-white">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">{homepageContent.hero.eyebrow}</p>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">{homepageContent.hero.title}</h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-100 sm:text-xl">{homepageContent.hero.text}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a className="button-primary" href="#kontakt">{homepageContent.hero.primaryCta}</a>
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
          <div className="mt-8 text-center"><a className="button-primary" href="#kontakt">Kostenloses Erstgespräch</a></div>
        </div>
      </section>
      <Contact />
    </>
  );
}

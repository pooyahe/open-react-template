import SectionHeading from "@/components/section-heading";
import { homepageContent } from "@/content/homepage";

export default function UseCases() {
  return (
    <section id="vorteile" className="section-space bg-white">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow="Praktischer Nutzen" title="Digitalisierung ohne unnötige Komplexität" text="Wir schaffen Klarheit im Arbeitsalltag und entwickeln den nächsten sinnvollen Schritt gemeinsam mit Ihnen." />
        <div className="grid gap-4 sm:grid-cols-3">
          {homepageContent.useCases.map((useCase, index) => (
            <article key={useCase.title} className="border border-[var(--border)] bg-[var(--page-bg)] p-6">
              <span className="text-sm font-bold text-blue-700">0{index + 1}</span>
              <h3 className="mt-8 text-xl font-bold leading-7 text-[var(--ink)]">{useCase.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{useCase.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="site-container mt-14">
        <ul className="grid gap-3 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {homepageContent.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm leading-6 text-[var(--ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

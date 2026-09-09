import SectionHeading from "@/components/section-heading";
import { homepageContent } from "@/content/homepage";

export default function Services() {
  return (
    <section id="leistungen" className="section-space bg-[var(--blue-mist)]">
      <div className="site-container">
        <SectionHeading
          eyebrow="Leistungen"
          title="Digitale Lösungen, die zu Ihrem Unternehmen passen"
          text="Wir verbinden Beratung und Umsetzung und beginnen dort, wo Ihr Arbeitsalltag den größten Nutzen erwarten lässt."
          align="center"
        />
        <div className="mt-14 grid gap-5 overflow-x-clip lg:grid-cols-3">
          {homepageContent.services.map((service) => (
          <article key={service.title} className="flex min-w-0 flex-col border border-[var(--border)] bg-white p-7 sm:p-8">
              <div className="flex min-w-0 items-center justify-between border-b border-[var(--border)] pb-6">
                <span className="text-sm font-bold tracking-[0.16em] text-blue-700">{service.number}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
              </div>
              <h3 className="mt-7 text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">{service.title}</h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">{service.text}</p>
              <ul className="mt-7 min-w-0 space-y-3 border-t border-[var(--border)] pt-6">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex min-w-0 gap-3 text-sm leading-6 text-[var(--ink)]">
                    <span className="text-blue-700" aria-hidden="true">✓</span>
                    <span className="min-w-0">{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

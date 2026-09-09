import SectionHeading from "@/components/section-heading";
import { homepageContent } from "@/content/homepage";

export default function Process() {
  return (
    <section id="vorgehen" className="section-space bg-[var(--blue-wash)]">
      <div className="site-container">
        <SectionHeading eyebrow="Vorgehen" title="Pragmatisch von der Idee zur nutzbaren Lösung" align="center" />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {homepageContent.process.map((step) => (
            <article key={step.title} className="relative border-t-2 border-blue-600 bg-white p-7 sm:p-8">
              <p className="text-sm font-bold tracking-[0.16em] text-blue-700">{step.number}</p>
              <h3 className="mt-5 text-2xl font-bold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">{step.text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-8 text-[var(--muted)]">
          Sie erhalten keine theoretische Strategie, die anschließend in einer Schublade verschwindet. Der Fokus liegt auf einer tatsächlich nutzbaren Lösung.
        </p>
      </div>
    </section>
  );
}

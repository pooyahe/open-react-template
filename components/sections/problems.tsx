import SectionHeading from "@/components/section-heading";
import { homepageContent } from "@/content/homepage";

export default function Problems() {
  const { problems } = homepageContent;
  return (
    <section id="probleme" className="section-space bg-[var(--blue-mist)]">
      <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading eyebrow={problems.eyebrow} title={problems.title} text={problems.intro} />
        <div className="rounded-[2rem] border border-blue-200/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(24,66,112,0.08)] sm:p-10">
          <ul className="grid gap-5 sm:grid-cols-2">
            {problems.items.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-[var(--ink)]">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 border-t border-[var(--border)] pt-7 text-lg font-semibold leading-8 text-[var(--deep-navy)]">
            {problems.closing}
          </p>
        </div>
      </div>
    </section>
  );
}

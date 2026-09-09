import SectionHeading from "@/components/section-heading";
import { homepageContent } from "@/content/homepage";

function Comparison({ title, items, tone }: { title: string; items: readonly string[]; tone: "paper" | "blue" }) {
  return (
    <div className={`border border-blue-200/70 p-7 sm:p-9 ${tone === "paper" ? "bg-white/90" : "bg-[var(--blue-cloud)]"}`}>
      <h3 className="text-2xl font-bold text-[var(--ink)]">{title}</h3>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-[var(--ink)]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Transformation() {
  return (
    <section className="section-space bg-[#f8fbff]">
      <div className="site-container">
        <SectionHeading eyebrow={homepageContent.transformation.eyebrow} title={homepageContent.transformation.title} align="center" />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Comparison title="Vorher" items={homepageContent.transformation.before} tone="paper" />
          <Comparison title="Nachher" items={homepageContent.transformation.after} tone="blue" />
        </div>
      </div>
    </section>
  );
}

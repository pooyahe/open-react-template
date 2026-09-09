type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{text}</p> : null}
    </div>
  );
}

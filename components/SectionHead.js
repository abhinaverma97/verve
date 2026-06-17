import Reveal from "./Reveal";

export default function SectionHead({ index, kicker, title, children, align = "left" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="index-num text-sm">{index}</span>
        <span className="h-px w-8 bg-[var(--color-line)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.05]">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
          {children}
        </p>
      )}
    </Reveal>
  );
}

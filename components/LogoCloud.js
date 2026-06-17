const industries = [
  "Higher Education",
  "Home Services",
  "Healthcare",
  "Financial Services",
  "Insurance",
  "Legal",
  "HVAC & Plumbing",
  "Enrollment Teams",
];

export default function LogoCloud() {
  const items = [...industries, ...industries];
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">
        Trusted by high-volume teams across
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {items.map((name, i) => (
            <span
              key={i}
              className="text-lg font-medium text-[var(--color-faint)] transition-colors hover:text-[var(--color-muted)]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

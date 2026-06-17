import Reveal from "./Reveal";

const industries = [
  {
    name: "Higher Education",
    use: "Enrollment conversion",
    icon: "M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5",
  },
  {
    name: "Home Services",
    use: "HVAC & plumbing quotes",
    icon: "M3 11l9-8 9 8M5 10v10h14V10",
  },
  {
    name: "Healthcare",
    use: "Patient scheduling",
    icon: "M12 5v14M5 12h14",
  },
  {
    name: "Financial Services",
    use: "Lead qualification",
    icon: "M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6",
  },
  {
    name: "Insurance",
    use: "Policy follow-ups",
    icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z",
  },
  {
    name: "Law",
    use: "Intake automation",
    icon: "M12 3v18M5 7l7-4 7 4M5 7l-2 6h4l-2-6zm14 0l-2 6h4l-2-6z",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-brand)]">
          Who it&apos;s for
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for high-volume consumer service teams
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
          Mid-market to large enterprises generating 5,000+ leads per month rely
          on Verve to convert at scale.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 70}>
            <article className="card group flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] transition-colors group-hover:border-[rgba(124,92,255,0.5)]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9b8ff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ind.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">{ind.name}</h3>
                <p className="text-sm text-[var(--color-muted)]">{ind.use}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

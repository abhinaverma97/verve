import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { to: 30, suffix: "s", label: "Speed-to-lead, day or night" },
  { to: 24, suffix: "/7", label: "Always-on AI coverage" },
  { to: 4, suffix: "x", label: "More conversations per lead" },
  { to: 5000, prefix: "", suffix: "+", label: "Leads/month, handled with ease" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            The ROI pitch
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Win the speed-to-lead race you keep losing
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            A human team can&apos;t call a lead within 30 seconds at 2:00 AM on a
            Sunday. Verve does — slashing the acquisition cost wasted when leads
            slip through the cracks.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="card flex h-full flex-col items-center justify-center p-7 text-center">
                <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

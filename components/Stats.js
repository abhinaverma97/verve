import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { to: 30, suffix: "s", label: "to first touch — any hour, any day" },
  { to: 4, suffix: "×", label: "more conversations per inbound lead" },
  { to: 5000, suffix: "+", label: "leads a month handled per workspace" },
];

export default function Stats() {
  return (
    <section className="border-t border-[var(--color-line)] py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="index-num text-sm">06</span>
              <span className="h-px w-8 bg-[var(--color-line)]" />
              <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                The math
              </span>
            </div>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.05]">
              You keep losing the speed-to-lead race
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              No human team calls a lead within 30 seconds at 2 AM on a Sunday.
              Verve does — recovering the acquisition spend you waste when leads
              go cold.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="px-2 py-7 sm:px-6">
                  <div className="font-display text-5xl font-semibold text-[var(--color-accent)]">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm text-[var(--color-muted)]">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

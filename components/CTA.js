import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <span
            className="glow-orb left-1/2 top-0 h-72 w-72 -translate-x-1/2"
            style={{ background: "#7c5cff" }}
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Stop letting leads slip through the cracks
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
            See how Verve turns every inbound lead into a conversation that
            converts — across all four channels, on one memory.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="btn-primary rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Book a demo
            </a>
            <a
              href="#channels"
              className="btn-ghost rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Explore the platform
            </a>
          </div>
          <p className="mt-6 text-xs text-[var(--color-faint)]">
            No credit card required · Live in days, not months
          </p>
        </div>
      </Reveal>
    </section>
  );
}

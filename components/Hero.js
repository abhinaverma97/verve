import Reveal from "./Reveal";
import ChannelOrbit from "./ChannelOrbit";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0 -z-10" />
      <span
        className="glow-orb -top-32 left-1/4 h-96 w-96"
        style={{ background: "#7c5cff" }}
      />
      <span
        className="glow-orb -top-20 right-1/4 h-80 w-80"
        style={{ background: "#4f8bff" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1.5 text-xs text-[var(--color-muted)]"
            >
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--color-accent)]" />
              Autonomous AI SDRs, live 24/7
              <span className="text-white">→</span>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Four channels.
              <br />
              <span className="text-gradient">One memory.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
              Verve unifies SMS, Voice, Email, and Webchat under a single
              persistent memory. When a lead goes quiet on one channel, Verve
              picks up the exact same conversation on another, minutes later.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
              >
                Book a demo
              </a>
              <a
                href="#how"
                className="btn-ghost rounded-full px-6 py-3 text-sm font-medium"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[var(--color-faint)]">
              <span>TCPA &amp; FCC compliant</span>
              <span className="hidden h-3 w-px bg-[var(--color-border)] sm:block" />
              <span>Native Salesforce &amp; HubSpot sync</span>
              <span className="hidden h-3 w-px bg-[var(--color-border)] sm:block" />
              <span>Built for 5,000+ leads/mo</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <ChannelOrbit />
        </Reveal>
      </div>
    </section>
  );
}

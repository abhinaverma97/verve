import Reveal from "./Reveal";
import MemoryCore from "./MemoryCore";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="dotrow pointer-events-none absolute inset-0 -z-10 opacity-[0.35]" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* meta row */}
        <Reveal className="flex items-center justify-between border-b border-[var(--color-line)] pb-4 pt-6 text-[12px] text-[var(--color-faint)]">
          <span className="font-display tracking-[0.18em]">VERVE / SALES OS</span>
          <span className="hidden sm:block">Built for 5,000+ leads a month</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--color-accent)]" />
            agents live
          </span>
        </Reveal>

        <div className="grid items-center gap-6 pb-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
          {/* headline column */}
          <div>
            <Reveal>
              <p className="mb-5 text-sm text-[var(--color-muted)]">
                The follow-up engine for high-volume sales teams
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.95]">
                One memory
                <br />
                across every
                <br />
                <span className="relative inline-block">
                  channel
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C60 3 220 2 298 7"
                      stroke="#c6f24e"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
                Verve works SMS, voice, email and webchat from a single brain.
                A lead ghosts your chat widget? It texts them four minutes later
                and keeps the same thread going — no re-introductions, no lost
                context.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#cta"
                  className="btn-accent rounded-full px-6 py-3 text-sm"
                >
                  Get a walkthrough
                </a>
                <a
                  href="#method"
                  className="btn-line rounded-full px-6 py-3 text-sm"
                >
                  See the method
                </a>
              </div>
            </Reveal>
          </div>

          {/* 3D column (off-center, asymmetric) */}
          <Reveal delay={120} className="relative lg:translate-x-6">
            <div className="relative">
              <MemoryCore />
              <div className="pointer-events-none absolute bottom-2 left-2 font-display text-[11px] tracking-[0.2em] text-[var(--color-faint)]">
                PERSISTENT MEMORY · LIVE
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

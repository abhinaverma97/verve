import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-accent)] px-6 py-16 text-[#0b0b0f] sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(#0b0b0f 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative max-w-2xl">
            <span className="font-display text-[12px] tracking-[0.2em]">
              VERVE / GET STARTED
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[0.98]">
              Stop letting leads slip through the cracks.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#0b0b0f]/75">
              We&apos;ll wire Verve to one of your real lead sources and show you a
              live conversation across all four channels.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="rounded-full bg-[#0b0b0f] px-7 py-3.5 text-sm font-semibold text-[var(--color-accent)] transition-transform hover:-translate-y-0.5"
              >
                Get a walkthrough
              </a>
              <a
                href="#channels"
                className="rounded-full border border-[#0b0b0f]/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-[#0b0b0f]"
              >
                Explore the platform
              </a>
            </div>
            <p className="mt-6 text-xs text-[#0b0b0f]/60">
              No credit card · live in days, not months
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

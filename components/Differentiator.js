import Reveal from "./Reveal";

export default function Differentiator() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] py-24">
      <span
        className="glow-orb left-1/2 top-0 h-72 w-72 -translate-x-1/2"
        style={{ background: "#16e0a3", opacity: 0.18 }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            The differentiator
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A lead never falls through the cracks
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            If a lead abandons a webchat halfway through, Verve doesn&apos;t
            lose them. It intelligently switches channels, proactively reaching
            out by SMS or voice minutes later, seamlessly picking up the exact
            same conversation.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Context carries across every channel, automatically.",
              "No re-introductions, no repeated questions.",
              "The lead feels like one continuous conversation.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(22,224,163,0.15)]">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16e0a3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--color-ink)]">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="card relative overflow-hidden p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-faint)]">
                Live conversation
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--color-accent)]" />
                memory synced
              </span>
            </div>

            <div className="space-y-3">
              <Bubble channel="Webchat" side="left">
                Hi! I&apos;m interested in a quote for AC installation.
              </Bubble>
              <Bubble channel="Webchat" side="right" brand>
                Great — what&apos;s the square footage of the home?
              </Bubble>
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <span className="rounded-full border border-[rgba(124,92,255,0.4)] bg-[var(--color-bg)] px-3 py-1 text-[11px] text-[var(--color-muted)]">
                  lead left the page → switching to SMS
                </span>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <Bubble channel="SMS" side="right" brand>
                Hey, it&apos;s Verve from CoolAir — picking up where we left
                off. Roughly how many sq ft is the home?
              </Bubble>
              <Bubble channel="SMS" side="left">
                ~2,400 sq ft. Can you call me at 3?
              </Bubble>
              <Bubble channel="Voice" side="right" brand>
                📞 Scheduled call confirmed for 3:00 PM. Calendar invite sent.
              </Bubble>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bubble({ children, channel, side, brand }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        <span
          className={`mb-1 block text-[10px] uppercase tracking-wide text-[var(--color-faint)] ${
            isRight ? "text-right" : ""
          }`}
        >
          {channel}
        </span>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
            brand
              ? "bg-gradient-to-br from-[#7c5cff] to-[#4f8bff] text-white"
              : "border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-ink)]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

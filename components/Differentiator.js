import Reveal from "./Reveal";

export default function Differentiator() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-bg-soft)] py-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* chat first on desktop for asymmetry */}
        <Reveal className="order-2 lg:order-1">
          <div className="panel rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-[12px] tracking-[0.16em] text-[var(--color-faint)]">
                ONE THREAD
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--color-accent)]" />
                memory synced
              </span>
            </div>

            <div className="space-y-3">
              <Bubble channel="Webchat" side="left">
                Hi! Looking for a quote on AC installation.
              </Bubble>
              <Bubble channel="Webchat" side="right" brand>
                Happy to help — roughly what&apos;s the square footage?
              </Bubble>
              <Switch label="left the page → switching to SMS" />
              <Bubble channel="SMS" side="right" brand>
                It&apos;s Verve from CoolAir, picking up where we left off. How
                many sq ft is the home?
              </Bubble>
              <Bubble channel="SMS" side="left">
                ~2,400. Can you call me at 3?
              </Bubble>
              <Bubble channel="Voice" side="right" brand>
                Call booked for 3:00 PM. Invite&apos;s in your inbox.
              </Bubble>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="flex items-center gap-3">
            <span className="index-num text-sm">02</span>
            <span className="h-px w-8 bg-[var(--color-line)]" />
            <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Why it&apos;s different
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.05]">
            A dropped lead is just a channel away
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
            Abandon a webchat halfway through and most tools forget you ever
            existed. Verve reaches out on SMS or voice minutes later and picks up
            the exact same conversation.
          </p>

          <ul className="mt-7 space-y-3.5">
            {[
              "Context follows the lead, not the channel.",
              "No repeated questions, no cold restarts.",
              "Feels like one continuous conversation.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Switch({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-[var(--color-line)]" />
      <span className="rounded-full border border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] bg-[var(--color-bg)] px-3 py-1 text-[11px] text-[var(--color-muted)]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[var(--color-line)]" />
    </div>
  );
}

function Bubble({ children, channel, side, brand }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[82%]">
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
              ? "bg-[var(--color-accent)] text-[#0b0b0f]"
              : "border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

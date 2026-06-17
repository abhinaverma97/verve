import Reveal from "./Reveal";

const capabilities = [
  {
    title: "Dynamic timing",
    desc: "Learns from response patterns to nudge or follow up at the exact moment a reply is most likely.",
    icon: "M12 6v6l4 2M12 22a10 10 0 110-20 10 10 0 010 20z",
  },
  {
    title: "Local presence dialing",
    desc: "Automatically matches the outbound number to the lead’s local area code to lift answer rates.",
    icon: "M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11zm0-8a3 3 0 100-6 3 3 0 000 6z",
  },
  {
    title: "Action-taking",
    desc: "Calls external APIs to schedule appointments, generate quotes, and process payments in-chat or on the call.",
    icon: "M13 2L3 14h7l-1 8 10-12h-7l1-8z",
  },
  {
    title: "Smart handoffs",
    desc: "Cold, warm, and scheduled transfers — briefing a human rep with full context before connecting.",
    icon: "M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-brand)]">
          How the AI works
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Autonomous SDRs, not LLM wrappers
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
          Verve agents act like real sales development reps with concrete
          functional capabilities — they don&apos;t just chat, they close the
          loop.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <article className="card group flex h-full gap-5 p-6">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] transition-colors group-hover:border-[rgba(124,92,255,0.5)]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9b8ff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={c.icon} />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {c.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

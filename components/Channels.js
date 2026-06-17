import Reveal from "./Reveal";

const channels = [
  {
    name: "SMS",
    tag: "Conversational",
    desc: "High-converting, two-way text outreach that feels human and replies in seconds.",
    icon: "M4 5h16v11H7l-3 3V5z",
  },
  {
    name: "Voice",
    tag: "Real-time AI calls",
    desc: "Inbound and outbound phone calls, including personalized voicemails on answering machines.",
    icon: "M6.6 3h3l1.5 4-2 1.5a12 12 0 005.4 5.4L16 11.9l4 1.5v3a2 2 0 01-2 2A14 14 0 014 5a2 2 0 012-2z",
  },
  {
    name: "Email",
    tag: "Timely follow-ups",
    desc: "Perfectly-timed emails with attachments like calendar invites and quotes.",
    icon: "M3 5h18v14H3V5zm0 2l9 6 9-6",
  },
  {
    name: "Webchat",
    tag: "Instant on-site",
    desc: "Removes friction the moment a visitor lands, capturing intent before it cools.",
    icon: "M4 4h16v11H8l-4 4V4z",
  },
];

export default function Channels() {
  return (
    <section id="channels" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-brand)]">
          The platform
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          One AI agent, working every channel at once
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
          Verve isn&apos;t a chatbot or a static drip campaign. It&apos;s a
          unified system where every interaction feeds the same brain.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <article className="card group h-full p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] transition-colors group-hover:border-[rgba(124,92,255,0.5)]">
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
              <span className="mt-5 inline-block text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                {c.tag}
              </span>
              <h3 className="mt-1 text-xl font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {c.desc}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

const features = [
  {
    title: "Custom guardrails",
    desc: "Set strict rules like “never promise financial aid.” Verve checks every generated message in real time, blocking and rewriting before it sends.",
  },
  {
    title: "Native CRM syncing",
    desc: "Integrates directly with Salesforce and HubSpot, analyzing transcripts to extract structured data and update tags — no manual entry.",
  },
  {
    title: "Built for compliance",
    desc: "Engineered to navigate TCPA and FCC regulations so automated SMS and voice outreach never crosses anti-spam or robocall lines.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] py-24"
    >
      <span
        className="glow-orb right-0 top-10 h-80 w-80"
        style={{ background: "#4f8bff", opacity: 0.2 }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-brand-2)]">
            Enterprise-grade
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Reliability and compliance that bypasses AI hallucination
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
            Built for large enterprises where every message has to be safe,
            on-brand, and auditable.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <article className="card h-full p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(79,139,255,0.14)]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4f8bff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const features = [
  {
    title: "Custom guardrails",
    desc: "Set hard rules like “never promise financial aid.” Every generated message is checked in real time, then blocked and rewritten before it sends.",
    tag: "Real-time",
  },
  {
    title: "Native CRM sync",
    desc: "Reads transcripts, pulls structured signals like high-intent or schedule-conflict, and updates Salesforce and HubSpot tags. No manual data entry.",
    tag: "Salesforce · HubSpot",
  },
  {
    title: "Compliant by design",
    desc: "Built around TCPA and FCC rules so automated SMS and voice outreach stays on the right side of anti-spam and robocall law.",
    tag: "TCPA · FCC",
  },
];

export default function Security() {
  return (
    <section
      id="guardrails"
      className="border-y border-[var(--color-line)] bg-[var(--color-bg-soft)] py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          index="04"
          kicker="Enterprise-grade"
          title="The part that makes it safe to automate"
        >
          Large teams can&apos;t ship AI that hallucinates. Verve treats every
          message as something that has to be on-brand, auditable and legal.
        </SectionHead>

        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <article className="panel flex h-full flex-col rounded-2xl p-7">
                <span className="w-fit rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] text-[var(--color-faint)]">
                  {f.tag}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {f.title}
                </h3>
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

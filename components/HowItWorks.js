import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const steps = [
  {
    n: "01",
    title: "Reads the timing",
    desc: "Learns from response patterns to nudge exactly when a reply is most likely, not on a fixed schedule.",
  },
  {
    n: "02",
    title: "Dials local",
    desc: "Matches the outbound number to the lead's area code so calls actually get answered.",
  },
  {
    n: "03",
    title: "Takes the action",
    desc: "Hits your APIs to book appointments, generate quotes and take payment, mid-chat or on the call.",
  },
  {
    n: "04",
    title: "Hands off clean",
    desc: "Cold, warm or scheduled transfers — briefing a human rep with the full context before connecting.",
  },
];

export default function HowItWorks() {
  return (
    <section id="method" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
      <SectionHead
        index="03"
        kicker="How it works"
        title="Reps that act, not chatbots that reply"
      >
        Verve agents behave like real SDRs with concrete capabilities. They close
        the loop instead of leaving you a transcript.
      </SectionHead>

      <div className="mt-14 border-t border-[var(--color-line)]">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 70}>
            <div className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[var(--color-line)] py-7 transition-colors hover:bg-[var(--color-bg-soft)] sm:grid-cols-[80px_1fr_1.4fr] sm:gap-8">
              <span className="index-num text-xl transition-colors group-hover:text-[var(--color-accent)]">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {s.title}
              </h3>
              <p className="col-span-2 text-[15px] text-[var(--color-muted)] sm:col-span-1">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

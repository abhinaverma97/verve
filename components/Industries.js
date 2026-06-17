import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const industries = [
  { name: "Higher Education", use: "Enrollment conversion" },
  { name: "Home Services", use: "HVAC & plumbing quotes" },
  { name: "Healthcare", use: "Patient scheduling" },
  { name: "Financial Services", use: "Lead qualification" },
  { name: "Insurance", use: "Policy follow-ups" },
  { name: "Law", use: "Intake automation" },
];

export default function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
      <SectionHead
        index="05"
        kicker="Who runs it"
        title="Made for teams drowning in inbound"
      >
        Mid-market to enterprise consumer-service teams doing 5,000+ leads a month
        lean on Verve to convert at volume.
      </SectionHead>

      <div className="mt-12 border-t border-[var(--color-line)]">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 60}>
            <a
              href="#cta"
              className="group flex items-center justify-between gap-4 border-b border-[var(--color-line)] py-6 transition-colors hover:bg-[var(--color-bg-soft)]"
            >
              <div className="flex items-baseline gap-5">
                <span className="index-num text-sm">0{i + 1}</span>
                <span className="font-display text-xl font-semibold sm:text-2xl">
                  {ind.name}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span className="hidden text-sm text-[var(--color-muted)] sm:block">
                  {ind.use}
                </span>
                <span className="text-[var(--color-faint)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
                  →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

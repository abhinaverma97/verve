import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const channels = [
  {
    name: "SMS",
    desc: "Two-way texts that read like a person wrote them, and reply in seconds.",
    icon: "M4 5h16v11H7l-3 3V5z",
    span: "lg:col-span-3 lg:row-span-2",
    big: true,
  },
  {
    name: "Voice",
    desc: "Inbound and outbound AI calls, including voicemails on answering machines.",
    icon: "M6.6 3h3l1.5 4-2 1.5a12 12 0 005.4 5.4L16 11.9l4 1.5v3a2 2 0 01-2 2A14 14 0 014 5a2 2 0 012-2z",
    span: "lg:col-span-3",
  },
  {
    name: "Email",
    desc: "Timed follow-ups with calendar invites and quotes attached.",
    icon: "M3 5h18v14H3V5zm0 2l9 6 9-6",
    span: "lg:col-span-3",
  },
  {
    name: "Webchat",
    desc: "Catches intent the second a visitor lands, before it cools off.",
    icon: "M4 4h16v11H8l-4 4V4z",
    span: "lg:col-span-6",
  },
];

export default function Channels() {
  return (
    <section id="channels" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
      <SectionHead index="01" kicker="The surface area" title="Four channels, run as one">
        Not a chatbot. Not a drip sequence. Every interaction, on every channel,
        writes to the same memory.
      </SectionHead>

      <div className="mt-12 grid auto-rows-[minmax(0,1fr)] gap-3 lg:grid-cols-6">
        {channels.map((c, i) => (
          <Reveal key={c.name} delay={i * 80} className={c.span}>
            <article
              className={`panel group flex h-full flex-col justify-between rounded-2xl p-6 ${
                c.big ? "lg:p-8" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={c.icon} />
                  </svg>
                </div>
                <span className="index-num text-xs">0{i + 1}</span>
              </div>
              <div className={c.big ? "mt-16" : "mt-8"}>
                <h3
                  className={`font-display font-semibold ${
                    c.big ? "text-3xl" : "text-xl"
                  }`}
                >
                  {c.name}
                </h3>
                <p
                  className={`mt-2 text-[var(--color-muted)] ${
                    c.big ? "max-w-sm text-[15px]" : "text-sm"
                  }`}
                >
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

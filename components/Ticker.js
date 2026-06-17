const items = [
  "Webchat dropped → SMS sent in 4 min",
  "Voicemail left, callback booked",
  "Quote generated mid-conversation",
  "Warm transfer with full context",
  "Local area code matched automatically",
  "Calendar invite attached to email",
  "CRM tag updated from transcript",
  "Guardrail blocked an off-brand reply",
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-soft)] py-3.5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-ticker flex w-max items-center gap-8 whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-[13px] text-[var(--color-muted)]"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

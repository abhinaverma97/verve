import Logo from "./Logo";

const cols = [
  { title: "Product", links: ["Channels", "Method", "Guardrails", "Industries"] },
  { title: "Company", links: ["About", "Careers", "Customers", "Contact"] },
  { title: "Resources", links: ["Docs", "Blog", "Compliance", "Status"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* oversized wordmark for editorial feel */}
        <div className="border-b border-[var(--color-line)] py-12">
          <p className="font-display text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-tight text-[var(--color-surface)]">
            Verve
          </p>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-6 w-6" />
              <span className="font-display text-[17px] font-semibold tracking-tight">
                Verve
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">
              One memory across every channel. The follow-up engine that never
              lets a lead go cold.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold text-[var(--color-ink)]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="link-wipe text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-line)] py-6 text-xs text-[var(--color-faint)] sm:flex-row">
          <p>© {new Date().getFullYear()} Verve. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-ink)]">Privacy</a>
            <a href="#" className="hover:text-[var(--color-ink)]">Terms</a>
            <a href="#" className="hover:text-[var(--color-ink)]">TCPA &amp; FCC</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Logo from "./Logo";

const cols = [
  {
    title: "Product",
    links: ["Channels", "How it works", "Security", "Industries"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Customers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Blog", "Compliance", "Status"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="text-lg font-semibold tracking-tight">Verve</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">
            Four channels, one memory. The autonomous AI sales platform that
            never lets a lead go cold.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-[var(--color-faint)] sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Verve. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              TCPA &amp; FCC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

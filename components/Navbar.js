"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Channels", href: "#channels" },
  { label: "Method", href: "#method" },
  { label: "Guardrails", href: "#guardrails" },
  { label: "Industries", href: "#industries" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-[rgba(11,11,15,0.78)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-6 w-6" />
          <span className="font-display text-[17px] font-semibold tracking-tight">
            Verve
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-wipe text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            className="link-wipe px-3 text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            Sign in
          </a>
          <a href="#cta" className="btn-accent rounded-full px-4 py-2 text-[13px]">
            Get a walkthrough
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-[var(--color-ink)] transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[var(--color-ink)] transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[var(--color-ink)] transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[rgba(11,11,15,0.97)] px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="btn-accent mt-1 rounded-full px-5 py-2.5 text-center text-sm"
            >
              Get a walkthrough
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

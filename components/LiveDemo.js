"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ChatWidget from "./ChatWidget";

export default function LiveDemo() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section id="livedemo" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
      <SectionHead index="LIVE" kicker="Sandbox" title="Test it yourself">
        Experience the "One memory" moat firsthand. Call the number, then text it,
        then open the webchat. Verve will remember exactly what you said across
        all three.
      </SectionHead>

      <div className="mt-12 grid gap-3 lg:grid-cols-4">
        {/* Voice Card */}
        <Reveal delay={0}>
          <article className="panel group flex h-full flex-col justify-between rounded-2xl p-6 relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-faint)] font-display uppercase">
                <span className="h-2 w-2 animate-blink rounded-full bg-[var(--color-accent)]" />
                Live Voice Channel
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                +1 (587) 206-7434
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Call this number right now to speak with the AI.
              </p>
            </div>
          </article>
        </Reveal>

        {/* SMS Card */}
        <Reveal delay={80}>
          <article className="panel group flex h-full flex-col justify-between rounded-2xl p-6">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-faint)] font-display uppercase">
                <span className="h-2 w-2 animate-blink rounded-full bg-[var(--color-accent)]" />
                Live SMS Channel
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                +1 (587) 206-7434
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Text this number to see how it handles follow-ups.
              </p>
            </div>
            <div className="mt-6">
              <a href="sms:+15872067434" className="btn-accent inline-block rounded-full px-5 py-2 text-xs">
                Text Us
              </a>
            </div>
          </article>
        </Reveal>

        {/* Email Card */}
        <Reveal delay={160}>
          <article className="panel group flex h-full flex-col justify-between rounded-2xl p-6">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-faint)] font-display uppercase">
                Email Channel
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold break-all">
                demo@verve.com
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                (Simulated for this demo). Email parsing is built into the backend.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Webchat Card */}
        <Reveal delay={240}>
          <article className="panel group flex h-full flex-col justify-between rounded-2xl p-6">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-faint)] font-display uppercase">
                <span className="h-2 w-2 animate-blink rounded-full bg-[var(--color-accent)]" />
                Live Webchat
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                Widget
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Opens a direct WebSocket connection to the LLM.
              </p>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="btn-line rounded-full px-5 py-2 text-xs"
              >
                Start Chat
              </button>
            </div>
          </article>
        </Reveal>
      </div>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}

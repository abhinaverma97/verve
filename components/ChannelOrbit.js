const channels = [
  { label: "SMS", icon: "M4 5h16v11H7l-3 3V5z", angle: 0 },
  {
    label: "Voice",
    icon: "M6.6 3h3l1.5 4-2 1.5a12 12 0 005.4 5.4L16 11.9l4 1.5v3a2 2 0 01-2 2A14 14 0 014 5a2 2 0 012-2z",
    angle: 90,
  },
  { label: "Email", icon: "M3 5h18v14H3V5zm0 2l9 6 9-6", angle: 180 },
  {
    label: "Webchat",
    icon: "M4 4h16v11H8l-4 4V4z",
    angle: 270,
  },
];

export default function ChannelOrbit() {
  const radius = 132;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* rotating rings */}
      <div className="animate-spin-slow absolute inset-6 rounded-full border border-[var(--color-border)]" />
      <div className="animate-spin-rev absolute inset-16 rounded-full border border-[rgba(124,92,255,0.2)] border-dashed" />

      {/* central memory core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span className="glow-orb h-28 w-28" style={{ background: "#7c5cff" }} />
          <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[rgba(124,92,255,0.5)] bg-[var(--color-surface)] text-center">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              One
            </span>
            <span className="text-sm font-semibold text-white">Memory</span>
            <span className="text-gradient-accent text-[10px] font-medium">
              persistent
            </span>
          </div>
        </div>
      </div>

      {/* channel nodes */}
      {channels.map((c, i) => {
        const rad = (c.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={c.label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div
              className="animate-float -translate-x-1/2 -translate-y-1/2"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="relative flex flex-col items-center gap-1">
                <span
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    animation: "pulse-ring 3s ease-out infinite",
                    animationDelay: `${i * 0.7}s`,
                    boxShadow: "0 0 0 2px rgba(124,92,255,0.5)",
                  }}
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-glow)]">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#og)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient id="og" x1="0" y1="0" x2="24" y2="24">
                        <stop offset="0" stopColor="#c9b8ff" />
                        <stop offset="1" stopColor="#4f8bff" />
                      </linearGradient>
                    </defs>
                    <path d={c.icon} />
                  </svg>
                </div>
                <span className="rounded-full bg-[var(--color-bg-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
                  {c.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* connecting lines (static svg) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        {channels.map((c) => {
          const rad = (c.angle * Math.PI) / 180;
          const cx = 210 + Math.cos(rad) * radius;
          const cy = 210 + Math.sin(rad) * radius;
          return (
            <line
              key={c.label}
              x1="210"
              y1="210"
              x2={cx}
              y2={cy}
              stroke="rgba(124,92,255,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          );
        })}
      </svg>
    </div>
  );
}

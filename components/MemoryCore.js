"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./three/MemoryCoreScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

function Fallback() {
  // Lightweight CSS stand-in so layout never shifts and reduced-motion users
  // still get a meaningful visual.
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="animate-float relative h-44 w-44">
        <div className="absolute inset-0 rounded-full border border-[var(--color-line)]" />
        <div className="absolute inset-6 rounded-full border border-dashed border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)]" />
        <div className="absolute inset-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-surface)] shadow-[0_0_60px_-10px_var(--color-accent)]" />
      </div>
    </div>
  );
}

export default function MemoryCore() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[420px] w-full sm:h-[520px]">
      {show && !reduced ? <Scene /> : <Fallback />}
    </div>
  );
}

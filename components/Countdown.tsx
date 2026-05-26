"use client";

import { useEffect, useState } from "react";

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const cells = [
    { v: d, l: "Jours" },
    { v: h, l: "Heures" },
    { v: m, l: "Min." },
    { v: s, l: "Sec." }
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((c, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center bg-cream/95 text-ink rounded-md p-3 border border-ink/10"
        >
          <span className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] leading-none tabular-nums">
            {String(c.v).padStart(2, "0")}
          </span>
          <span className="mt-2 font-mono text-[9px] tracking-[0.2em] uppercase opacity-60">
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}

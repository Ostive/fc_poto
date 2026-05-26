"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fcpoto.cookie-consent";

type Consent = "accepted" | "refused" | null;

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent;
      if (!saved) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const decide = (choice: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* private mode etc. */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Préférences cookies"
      className="fixed inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md z-50"
    >
      <div className="bg-ink text-cream rounded-[20px] p-6 lg:p-7 shadow-2xl border border-cream/10">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-cream/65">
          <span className="w-1.5 h-1.5 rounded-full bg-ocre animate-pulseDot" />
          Cookies · Saison 25/26
        </div>
        <h2 className="mt-4 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-tighter2 leading-[1.1]">
          Pas de pub, juste un peu d'audience.
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-cream/80">
          On utilise des cookies de mesure d'audience anonymes pour comprendre
          ce qui est lu sur le site. Aucune donnée personnelle, aucune revente.
          Détails sur la{" "}
          <Link href="/cookies" className="underline underline-offset-2">
            politique cookies
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => decide("accepted")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream text-ink text-[13px] hover:bg-ocre hover:text-cream transition-colors"
          >
            Accepter
          </button>
          <button
            onClick={() => decide("refused")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-cream/30 text-[13px] hover:bg-cream hover:text-ink transition-colors"
          >
            Refuser
          </button>
          <Link
            href="/cookies"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] text-cream/70 hover:text-cream transition-colors"
          >
            Personnaliser →
          </Link>
        </div>
      </div>
    </div>
  );
}

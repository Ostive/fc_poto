"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-[1480px] px-6 lg:px-10 py-24 lg:py-32 min-h-[70vh] flex items-center">
      <div className="grid grid-cols-12 gap-6 w-full items-end">
        <div className="col-span-12 lg:col-span-8">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ocre">
            Faute technique
          </span>
          <h1 className="mt-6 font-display leading-[0.86] tracking-tighter2 text-[clamp(3rem,10vw,9rem)]">
            <span className="block">Un grain</span>
            <span className="block italic text-navy">de sable.</span>
          </h1>
          <p className="mt-10 max-w-xl text-[17px] md:text-[19px] leading-relaxed">
            Quelque chose s'est mal passé pendant le chargement de cette page.
            Pas grave, on remet la balle au centre · appuyez sur le bouton
            ci-dessous, ou revenez à l'accueil.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-ink/40">
              Réf. incident : {error.digest}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream hover:bg-ocre transition-colors text-[14px]"
            >
              Réessayer →
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/30 hover:bg-ink hover:text-cream transition-colors text-[14px]"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

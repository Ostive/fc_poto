import Link from "next/link";

export const metadata = {
  title: "Hors-jeu · FC Poto",
  description: "La page que vous cherchez n'existe pas (ou plus)."
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1480px] px-6 lg:px-10 py-24 lg:py-32 min-h-[70vh] flex items-center">
      <div className="grid grid-cols-12 gap-6 w-full items-end">
        <div className="col-span-12 lg:col-span-7">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
            Erreur 404 · Hors-jeu
          </span>
          <h1 className="mt-6 font-display leading-[0.86] tracking-tighter2 text-[clamp(4rem,14vw,12rem)]">
            <span className="block">Page</span>
            <span className="block italic text-navy">introuvable.</span>
          </h1>
          <p className="mt-10 max-w-xl text-[17px] md:text-[19px] leading-relaxed">
            On a cherché dans les vestiaires, sous le banc, derrière le panneau
            de la pizzeria. Rien. La page que vous cherchez n'existe pas · ou a
            été déplacée pendant la mi-temps.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream hover:bg-navy transition-colors text-[14px]"
            >
              Retour à l'accueil →
            </Link>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/30 hover:bg-ink hover:text-cream transition-colors text-[14px]"
            >
              Lire les dernières actualités
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 flex justify-end">
          <span className="font-display text-[clamp(8rem,28vw,24rem)] leading-[0.8] text-navy/15 select-none">
            404
          </span>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { news } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Actualités · FC Poto",
  description: "Toute la vie du club, écrite par les bénévoles."
};

export default function ActualitesPage() {
  const hasNews = news.length > 0;
  const [hero, ...rest] = news;
  const categories = ["Tous", "Match", "Tournoi", "Club", "Carnet", "Édito", "Coulisses"];

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">§ Actualités</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              {hasNews ? (
                <>Le journal <span className="italic text-navy">du</span><br /> club.</>
              ) : (
                <>Le journal <span className="italic text-navy">arrive</span>.</>
              )}
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              {hasNews
                ? "Récits de matchs, portraits, éditos, carnet du club · écrits par les bénévoles et les joueurs."
                : "Aucun article publié pour le moment. La rédaction du club démarre · récits de matchs, portraits et coulisses arriveront ici."}
            </p>
          </div>
        </div>
      </section>

      {hasNews ? (
        <>
          {/* Categories */}
          <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-12">
            <div className="flex flex-wrap items-center gap-3 border-b border-ink/15 pb-6">
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`px-4 py-2 rounded-full text-[12px] font-mono tracking-[0.12em] uppercase border transition-colors ${
                    i === 0
                      ? "bg-ink text-cream border-ink"
                      : "border-ink/25 hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          {/* HERO ARTICLE */}
          <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
            <Reveal>
              <Link href={`/actualites/${hero.slug}`} className="block group">
                <article className="grid grid-cols-12 gap-6 lg:gap-10">
                  <div className="col-span-12 lg:col-span-6 relative overflow-hidden rounded-[24px] aspect-[5/4] bg-navy text-cream">
                    {hero.cover ? (
                      <Image
                        src={hero.cover}
                        alt={hero.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 hatch opacity-25" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy to-ocre/60 mix-blend-multiply" />
                        <div className="absolute inset-0 flex items-end p-8">
                          <span className="font-display italic text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tighter2 opacity-90 max-w-full break-words">
                            {hero.title.split(/[:.]/, 1)[0].trim()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/55">
                      <span className="bg-ink text-cream px-2.5 py-1 rounded-full">{hero.category}</span>
                      <span>{formatDateShort(hero.date)}</span>
                      <span>·</span>
                      <span>{hero.read}</span>
                    </div>
                    <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-tighter2 group-hover:text-navy transition-colors">
                      {hero.title}
                    </h2>
                    <p className="mt-6 text-[17px] leading-relaxed max-w-xl text-ink/80">
                      {hero.excerpt}
                    </p>
                    <p className="mt-8 font-mono text-[10px] tracking-[0.22em] uppercase text-ink/50">
                      Par {hero.author}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          </section>

          {/* GRID */}
          {rest.length > 0 && (
            <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-24">
              <SectionLabel index="02" title="Plus récent" kicker={`${rest.length} billet${rest.length > 1 ? "s" : ""} de plus`} />
              <div className="mt-10 grid grid-cols-12 gap-6">
                {rest.map((n, i) => (
                  <Reveal
                    key={n.slug}
                    delay={i * 0.06}
                    className="col-span-12 md:col-span-6 lg:col-span-4"
                  >
                    <Link
                      href={`/actualites/${n.slug}`}
                      className="group block h-full"
                    >
                      <article className="h-full p-7 rounded-[24px] border border-ink/15 group-hover:border-ink group-hover:-translate-y-1 transition-all bg-cream flex flex-col">
                        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                          <span className="bg-paper px-2.5 py-1 rounded-full">{n.category}</span>
                          <span>{formatDateShort(n.date)}</span>
                        </div>
                        <h3 className="mt-6 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.05] tracking-tighter2 group-hover:text-navy transition-colors">
                          {n.title}
                        </h3>
                        <p className="mt-4 text-[14px] leading-relaxed text-ink/75 flex-1">
                          {n.excerpt}
                        </p>
                        <p className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                          <span>{n.author}</span>
                          <span>{n.read}</span>
                        </p>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        // EMPTY STATE
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
          <div className="rounded-[28px] bg-paper p-10 lg:p-16 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
                Rubrique en cours d'ouverture
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
                Pas encore d'articles<br />
                <span className="italic text-navy">· mais ça arrive.</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] text-ink/75 leading-relaxed">
                Le club lance progressivement sa rédaction : récits de match,
                portraits, éditos. En attendant, suis l'évolution de la saison
                directement sur le calendrier.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
              <Link
                href="/calendrier"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors"
              >
                Voir le calendrier →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SUBSCRIBE · toujours affiché */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
        <div className="rounded-[28px] bg-ink text-cream p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-10 w-[360px] h-[360px] rounded-full bg-ocre/30 blur-3xl" />
          <div className="grid grid-cols-12 gap-6 relative">
            <div className="col-span-12 lg:col-span-7">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/60">
                Le bulletin du club
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter2">
                Une <span className="italic text-ocre">lettre</span> mensuelle.<br />
                Cinq minutes, pas plus.
              </h2>
              <p className="mt-6 max-w-md text-cream/75 text-[15px] leading-relaxed">
                Chaque premier lundi du mois, on raconte le mois écoulé et on
                annonce le suivant. Pas de pub. Pas de spam. Désinscription en
                un clic.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex items-end">
              <form className="w-full flex items-center gap-3">
                <input
                  type="email"
                  placeholder="prenom@mail.com"
                  className="flex-1 bg-transparent border-b border-cream/30 focus:border-ocre focus:outline-none py-3 placeholder:text-cream/40"
                />
                <button className="font-mono text-[11px] tracking-[0.18em] uppercase border border-cream/30 rounded-full px-4 py-3 hover:bg-cream hover:text-ink transition-colors">
                  S'abonner →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "2-digit"
  });
}

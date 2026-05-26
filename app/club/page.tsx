import { club, palmares, values } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata = {
  title: "Le club · FC Poto",
  description:
    "Histoire, valeurs et palmarès du FC Poto, club de football amateur de Toulouse depuis 2010."
};

// Chronologie du club · uniquement les jalons confirmés.
// (2015 ouverture foot à 7 / 2019 Lardenne / 2022 walking foot ont été retirés
//  faute d'année exacte vérifiée. À rajouter quand on a la date précise.)
const chapters = [
  {
    n: "I",
    year: "2010",
    title: "Une bande de potes, un projet",
    body: "Le club naît à Toulouse autour d'un groupe d'amis qui veulent jouer au foot autrement : pour le plaisir d'abord, le résultat ensuite. Première équipe inscrite en championnat FSGT 31."
  },
  {
    n: "II",
    year: "2024",
    title: "10 ans · Tournoi des Sélections",
    body: "Pour fêter les dix ans, le FC POTO organise le 1er Tournoi des Sélections en Occitanie. Quatre jours d'exception, environ 1 000 participants, 8 sélections départementales en foot à 11, 18 équipes en foot à 7, 6 équipes mixtes en walking foot. Forte couverture médiatique."
  },
  {
    n: "III",
    year: "2025",
    title: "Quatre équipes, un seul club",
    body: "Saison 25/26 · engagement de quatre équipes : foot à 11 en Excellence Poule A, deux équipes de foot à 7 (Poule 3 et Poule 7), et le walking foot mixte 45+. Quinze ans après les débuts, le club continue d'inventer des façons de jouer ensemble."
  }
];

export default function ClubPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-16 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">§ Chapitre 01</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Le club <span className="italic text-navy">en six</span><br /> chapitres.
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              Toute l'histoire du FC Poto, racontée comme on la raconte au comptoir
              du club-house : un peu trop précis sur les détails, jamais sur les
              dates. Lisez à voix haute, c'est encore mieux.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE / CHAPTERS */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
        <SectionLabel index="01" title="La grande chronique" kicker="2010 · aujourd'hui" />
        <div className="mt-12 grid gap-px bg-ink/15">
          {chapters.map((c, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <article className="grid grid-cols-12 gap-x-6 gap-y-4 bg-cream p-6 sm:p-8 lg:p-12 items-baseline">
                <div className="col-span-4 lg:col-span-2 flex items-baseline gap-3 lg:block">
                  <span className="font-display text-[clamp(3rem,7vw,4.5rem)] text-navy leading-none">
                    {c.n}.
                  </span>
                </div>
                <div className="col-span-8 lg:col-span-2 flex flex-col gap-1">
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-ink/50">
                    Année
                  </span>
                  <span className="font-display text-[clamp(1.5rem,3.5vw,2rem)] leading-none">
                    {c.year}
                  </span>
                </div>
                <div className="col-span-12 lg:col-span-8">
                  <h3 className="font-display text-[clamp(1.4rem,3vw,2.4rem)] tracking-tighter2 leading-[1.08]">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[15px] md:text-[16px] leading-relaxed text-ink/80">
                    {c.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="mt-32 bg-ink text-cream py-24">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 border-b border-cream/15 pb-6">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/50">§02</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.02] tracking-tighter2">
                Ce qu'on défend
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-cream/50 max-w-[260px] text-right">
              Trois valeurs, depuis quinze ans
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/15">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-ink p-10 lg:p-14">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ocre">
                  /0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.2rem)] tracking-tighter2">
                  {v.title}
                </h3>
                <p className="mt-4 text-cream/75 text-[15px] leading-relaxed max-w-md">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PALMARES */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel index="03" title="Palmarès" kicker="Cinq lignes dorées sur le mur" />
        <ol className="mt-10 col-rule">
          {palmares.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-6">
                <span className="col-span-4 md:col-span-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] text-navy leading-none">
                  {p.year}
                </span>
                <h3 className="col-span-8 md:col-span-6 font-display text-[clamp(1.25rem,2.6vw,1.875rem)] tracking-tighter2 leading-[1.1]">
                  {p.title}
                </h3>
                <p className="col-span-12 md:col-span-4 text-[13px] md:text-[14px] text-ink/70 font-mono tracking-[0.04em]">
                  {p.note}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Section Encadrement retirée · les noms réels (président·e, entraîneurs)
          ne sont pas confirmés. À recréer quand ces infos seront disponibles. */}
    </>
  );
}

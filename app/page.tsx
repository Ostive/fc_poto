import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { championship, club, disciplines, featuredEvent, news, practices, stats, values } from "@/lib/data";
import { getChampionshipData } from "@/lib/fsgt";
import { NamesMarquee } from "@/components/Ticker";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "FC Poto · Football Club de Toulouse",
  description:
    "Club de foot amateur basé à Toulouse. FSGT 31 · Excellence Poule A, saison 25/26. Pratiques, calendrier, classement, actualités.",
  alternates: { canonical: "/" }
};

// Revalidate the home every hour (matches FSGT scrape window)
export const revalidate = 3600;

export default async function HomePage() {
  const { matches, standings } = await getChampionshipData();
  const upcoming = matches
    .filter((m) => !m.result)
    .sort((a, b) => a.date.localeCompare(b.date));
  const recent = matches
    .filter((m) => m.result)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  const nextMatch = upcoming[0];
  const latestNews = news.slice(0, 3);
  // Marquee : disciplines + valeurs + identité du club
  const heroMarqueeWords = [
    ...disciplines.map((d) => d.title),
    ...values.map((v) => v.title),
    "Stade de Lardenne",
    "Toulouse · Est. 2010"
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-12 lg:pt-20 pb-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            {/* Left meta */}
            <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1">
              <div className="flex lg:flex-col gap-6 lg:gap-10 lg:sticky lg:top-28">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-ocre animate-pulseDot" />
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                    En direct du club
                  </span>
                </div>
                <p className="max-w-[260px] text-[15px] leading-relaxed text-ink/75">
                  {club.description}
                </p>
                <div className="hidden lg:block">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/40">
                    Sommaire
                  </span>
                  <ol className="mt-3 grid gap-1.5 text-[13px]">
                    <li><a href="#match" className="link-underline">01 · Le prochain match</a></li>
                    <li><a href="#pratiques" className="link-underline">02 · Nos pratiques</a></li>
                    <li><a href="#evenement" className="link-underline">03 · Événement à la une</a></li>
                    <li><a href="#resultats" className="link-underline">04 · Derniers résultats</a></li>
                    <li><a href="#chiffres" className="link-underline">05 · Le club en chiffres</a></li>
                    <li><a href="#actu" className="link-underline">06 · Actualités</a></li>
                    <li><a href="#galerie" className="link-underline">07 · En image</a></li>
                  </ol>
                </div>
              </div>
            </aside>

            {/* Headline */}
            <div className="col-span-12 lg:col-span-9 order-1 lg:order-2 relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="hatch w-12 h-3" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/60">
                  Football Club de Toulouse · depuis {club.founded}
                </span>
              </div>
              <h1 className="font-display leading-[0.86] tracking-tighter2 text-[clamp(3rem,11vw,11rem)]">
                <span className="block">FOOTBALL</span>
                <span className="block italic text-navy">Club</span>
                <span className="flex items-end gap-3 md:gap-5 flex-wrap">
                  <span>POTO</span>
                  <span className="font-mono font-normal not-italic text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-ink/50 mb-2 md:mb-6 leading-tight">
                    /pɔ.to/<br />
                    n.m. coéquipier
                  </span>
                </span>
              </h1>

              <div className="mt-10 grid grid-cols-12 gap-6 items-end">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-display italic text-[clamp(1.25rem,2.4vw,1.875rem)] tracking-tighter2 text-navy-deep leading-[1.2]">
                    {club.tagline}
                  </p>
                  <p className="mt-5 text-[16px] md:text-[18px] leading-relaxed text-ink/80">
                    {club.description}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${club.email}?subject=Rejoindre%20le%20FC%20POTO`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream hover:bg-navy transition-colors text-[14px]"
                  >
                    Nous écrire →
                  </a>
                  <a
                    href="#pratiques"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/30 hover:bg-ink hover:text-cream transition-colors text-[14px]"
                  >
                    Découvrir nos équipes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NamesMarquee words={heroMarqueeWords} />
      </section>

      {/* NEXT MATCH PANEL */}
      <section id="match" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-24">
        <SectionLabel
          index="01"
          title="Le prochain match"
          kicker="Stade de Lardenne · coup d'envoi 15h00"
        />

        <div className="mt-10 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-8">
            <div className="relative overflow-hidden rounded-[28px] bg-navy text-cream p-8 lg:p-12 min-h-[440px]">
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-ocre/40 blur-3xl" />
                <div className="absolute -bottom-40 -left-10 w-[420px] h-[420px] rounded-full bg-navy-electric/60 blur-3xl" />
              </div>
              {nextMatch ? (
                <div className="relative grid grid-cols-12 gap-6 h-full">
                  <div className="col-span-12 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                      {nextMatch.competition}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-80">
                      {formatDate(nextMatch.date)}
                    </span>
                  </div>

                  <div className="col-span-12 md:col-span-7 flex flex-col justify-center mt-6">
                    <div className="flex items-center gap-3 md:gap-5 flex-wrap">
                      <Badge label="FC Poto" home />
                      <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] italic opacity-60 leading-none">
                        vs
                      </span>
                      <Badge label={nextMatch.opponent} />
                    </div>
                    <p className="mt-8 text-[15px] text-cream/85 max-w-md">
                      Prochain rendez-vous de la saison. Coup d'envoi à
                      Stade de Lardenne · ouvert à tous, entrée libre.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href="/calendrier" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream text-ink text-[13px]">
                        Tout le calendrier
                      </Link>
                      <Link href="/nous-rejoindre" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-cream/40 text-[13px]">
                        Venir au stade
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l md:border-cream/20 flex flex-col justify-end">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70 mb-3">
                      Coup d'envoi dans
                    </span>
                    <Countdown target={nextMatch.date} />
                    <div className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase opacity-80">
                      Stade de Lardenne · Toulouse
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-full flex flex-col justify-center">
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-80">
                    Saison en pause
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter2">
                    Pas de match programmé<br />
                    <span className="italic text-ocre">pour le moment.</span>
                  </h3>
                  <p className="mt-6 max-w-md text-cream/85 text-[15px] leading-relaxed">
                    Le prochain calendrier sera publié par la FSGT 31. Reviens
                    bientôt · ou abonne-toi à la lettre du club.
                  </p>
                  <div className="mt-8">
                    <Link href="/calendrier" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream text-ink text-[13px]">
                      Voir le calendrier complet
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="col-span-12 lg:col-span-4">
            <div className="h-full grid gap-4">
              <div className="rounded-[24px] bg-ink text-cream p-6">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/60">
                  Forme du moment
                </p>
                {recent.length > 0 ? (
                  <>
                    <div className="mt-4 flex items-center gap-2">
                      {recent.map((m, i) => (
                        <FormChip key={i} status={m.result!.status} />
                      ))}
                    </div>
                    <p className="mt-4 text-[13px] text-cream/70 leading-relaxed">
                      {formSummary(recent)}
                    </p>
                  </>
                ) : (
                  <p className="mt-4 text-[13px] text-cream/70 leading-relaxed">
                    La saison n'a pas encore commencé. Premiers résultats à
                    venir.
                  </p>
                )}
              </div>
              <div className="rounded-[24px] bg-paper p-6">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/60">
                  {championship.shortName}
                </p>
                {(() => {
                  const poto = standings.find((s) => s.isPoto);
                  if (!poto) {
                    return (
                      <p className="mt-3 text-[13px] text-ink/60">
                        Classement non disponible pour le moment.
                      </p>
                    );
                  }
                  return (
                    <>
                      <div className="mt-3 flex items-end gap-3">
                        <span className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-none">
                          {poto.rank}
                          <sup className="text-[clamp(1rem,2vw,1.5rem)] ml-0.5">e</sup>
                        </span>
                        <span className="font-mono text-[11px] text-ink/60 mb-2">
                          sur {standings.length || championship.totalTeams}
                        </span>
                      </div>
                      <ul className="mt-4 text-[13px] grid gap-2 font-mono">
                        <li className="flex justify-between">
                          <span>Matchs joués</span><span>{poto.played} / {championship.totalJournees}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Différence de buts</span>
                          <span>{poto.goalDiff > 0 ? `+${poto.goalDiff}` : poto.goalDiff}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Points</span>
                          <span className="text-ocre">{poto.points}</span>
                        </li>
                      </ul>
                    </>
                  );
                })()}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NOS PRATIQUES */}
      <section id="pratiques" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel
          index="02"
          title="Nos pratiques"
          kicker="Quatre équipes · trois disciplines"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
          {practices.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <article className="group h-full bg-cream p-7 flex flex-col gap-5 hover:bg-paper transition-colors">
                <div className="relative aspect-[5/4] -mx-2 -mt-2 rounded-xl overflow-hidden bg-paper/70 flex items-center justify-center">
                  <Image
                    src={p.image}
                    alt={`Illustration ${p.title}`}
                    width={240}
                    height={240}
                    className="object-contain w-2/3 h-2/3 group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] tracking-tighter2 leading-[1.15] text-navy-deep">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
                    {p.subtitle}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-ink/75 flex-1">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={p.ctaHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-navy-deep text-cream text-[13px] font-medium hover:bg-navy-electric transition-colors"
                  >
                    <ExternalArrow /> {p.ctaLabel}
                  </a>
                  <Link
                    href={`/pratiques#${p.disciplineId}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-ink/20 text-ink/75 text-[12px] font-medium hover:bg-ink hover:text-cream hover:border-ink transition-colors"
                  >
                    En savoir plus →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/pratiques"
            className="font-mono text-[11px] tracking-[0.2em] uppercase link-underline"
          >
            Tout sur nos trois disciplines →
          </Link>
        </div>
      </section>

      {/* ÉVÉNEMENT À LA UNE */}
      <section id="evenement" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel
          index="03"
          title="Événement à la une"
          kicker={`${featuredEvent.year} · ${featuredEvent.duration}`}
        />
        <Reveal>
          <div className="mt-10 rounded-[28px] bg-gradient-to-br from-navy-deep via-navy to-navy-electric text-cream overflow-hidden">
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-12 lg:col-span-8 p-8 lg:p-12 relative">
                <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-ocre/20 blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-cream/75">
                    <CalendarIcon />
                    <span>{featuredEvent.year} · {featuredEvent.duration}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
                    {featuredEvent.title}
                  </h3>
                  <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-cream/85 max-w-2xl">
                    Un événement historique organisé par le FC POTO :{" "}
                    <strong className="text-cream">~1 000 participants</strong>{" "}
                    (joueurs, familles, public, élus) réunis pour célébrer le
                    football sous toutes ses formes.
                  </p>

                  <div className="mt-10 grid grid-cols-3 gap-4">
                    {featuredEvent.numbers.map((n) => (
                      <div key={n.label} className="border-l-2 border-cream/30 pl-4">
                        <p className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">
                          {n.value}
                        </p>
                        <p className="mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-cream/70 leading-snug">
                          {n.label}<br />
                          <span className="text-cream/55">{n.sublabel}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-cream/65">
                    <TrophyIcon className="w-4 h-4" />
                    {featuredEvent.press}
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative min-h-[280px] lg:min-h-0 bg-navy-electric flex items-center justify-center p-10 lg:p-12">
                <div className="absolute inset-0 hatch opacity-20" />
                <span className="relative font-display italic text-[clamp(5rem,11vw,9rem)] leading-[0.85] tracking-tighter2 text-cream/95 text-center">
                  10<br />
                  <span className="not-italic text-[0.35em] tracking-[0.2em] font-mono text-cream/65">
                    ANS DU CLUB
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* RECENT RESULTS */}
      <section id="resultats" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel
          index="04"
          title="Derniers résultats"
          kicker={recent.length > 0 ? `${recent.length} match${recent.length > 1 ? "s" : ""} joué${recent.length > 1 ? "s" : ""}` : "Saison en attente"}
        />
        {recent.length === 0 ? (
          <p className="mt-10 text-ink/60 text-[15px] max-w-md">
            Aucun résultat publié pour le moment. Les scores apparaîtront ici
            dès que la FSGT mettra à jour son calendrier.
          </p>
        ) : (
        <ul className="mt-8 col-rule">
          {recent.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="grid grid-cols-12 items-baseline py-5 gap-x-4 gap-y-2">
                <span className="col-span-4 md:col-span-1 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/50">
                  {formatDateShort(m.date)}
                </span>
                <span className="col-span-8 md:col-span-5 font-display text-[clamp(1.15rem,3vw,1.75rem)] leading-tight">
                  FC Poto <span className="text-ink/30">·</span> {m.opponent}
                </span>
                <span className="col-span-7 md:col-span-3 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/60">
                  {m.competition}
                </span>
                <span className="col-span-5 md:col-span-3 flex items-center justify-end gap-2 md:gap-3">
                  <span className="font-display text-[clamp(1.5rem,4vw,1.875rem)] tabular-nums leading-none">
                    {m.result!.fcpoto}<span className="text-ink/30">·</span>{m.result!.opponent}
                  </span>
                  <FormChip status={m.result!.status} large />
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
        )}
        <div className="mt-8 flex justify-end">
          <Link href="/calendrier" className="font-mono text-[11px] tracking-[0.2em] uppercase link-underline">
            Toute la saison →
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section id="chiffres" className="mt-32 bg-ink text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-navy blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 border-b border-cream/15 pb-6">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/50">§05</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.02] tracking-tighter2">
                Le club en quatre chiffres
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-cream/50 max-w-[260px] text-right">
              Mis à jour à la rentrée 2025
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/15">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-ink p-8 lg:p-12">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/50">
                  /0{i + 1}
                </span>
                <p className="mt-6 font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter2">
                  {s.value}
                </p>
                <p className="mt-3 text-[14px] text-cream/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS PREVIEW · masqué tant qu'il n'y a pas d'articles réels */}
      {latestNews.length > 0 && (
      <section id="actu" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel
          index="06"
          title="À lire avant samedi"
          kicker="La rédaction du club, par les bénévoles"
        />
        <div className="mt-10 grid grid-cols-12 gap-6">
          {latestNews.map((n, i) => (
            <Reveal
              key={n.slug}
              delay={i * 0.08}
              className={`col-span-12 ${i === 0 ? "lg:col-span-6" : "lg:col-span-3"}`}
            >
              <Link href={`/actualites/${n.slug}`} className="group block h-full">
                <article
                  className={`h-full flex flex-col overflow-hidden rounded-[24px] border border-ink/15 transition-all hover:-translate-y-1 hover:border-ink ${
                    i === 0 ? "bg-paper" : "bg-cream"
                  }`}
                >
                  {n.cover && (
                    <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[5/4]"} overflow-hidden`}>
                      <Image
                        src={n.cover}
                        alt={n.title}
                        fill
                        sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 lg:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink/60">
                      <span className="bg-ink text-cream px-2.5 py-1 rounded-full">{n.category}</span>
                      <span>{formatDateShort(n.date)}</span>
                    </div>
                    <h3 className={`mt-6 font-display tracking-tighter2 leading-[1.05] ${
                      i === 0 ? "text-[clamp(1.75rem,3vw,2.75rem)]" : "text-[clamp(1.25rem,2.4vw,1.625rem)]"
                    }`}>
                      {n.title}
                    </h3>
                    <p className={`mt-4 text-ink/70 text-[14px] leading-relaxed flex-1 ${i !== 0 ? "line-clamp-3" : ""}`}>
                      {n.excerpt}
                    </p>
                    <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-ink/50">
                      {n.author} · {n.read}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/actualites" className="font-mono text-[11px] tracking-[0.2em] uppercase link-underline">
            Toutes les actualités →
          </Link>
        </div>
      </section>
      )}

      {/* GALERIE · APERÇU */}
      <section id="galerie" className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
        <SectionLabel
          index="07"
          title="En image"
          kicker="Aperçu de la galerie · matchs, soins, communauté"
        />
        <div className="mt-10 grid grid-cols-12 gap-4 lg:gap-6">
          {/* Row 1 · une grande + deux empilées */}
          <Reveal className="col-span-12 md:col-span-7">
            <Link href="/actualites/tournoi-walking-foot-2025-04-19" className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                <Image
                  src="/gallery/tournoi-walking-foot-2025-04-19/coupe-fcpoto.jpg"
                  alt="Trophée du tournoi"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </Link>
          </Reveal>
          <div className="col-span-12 md:col-span-5 grid gap-4 lg:gap-6">
            <Reveal delay={0.05}>
              <Link href="/galerie/equipes-fsgt" className="group block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                  <Image
                    src="/gallery/equipes-fsgt/05.webp"
                    alt="Une équipe de la communauté FSGT"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/galerie/cote-soins" className="group block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                  <Image
                    src="/gallery/cote-soins/02.webp"
                    alt="Côté soins · vie du club"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Row 2 · trois identiques */}
          <Reveal delay={0.15} className="col-span-6 md:col-span-4">
            <Link href="/actualites/tournoi-walking-foot-2025-04-19" className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                <Image
                  src="/gallery/tournoi-walking-foot-2025-04-19/06.webp"
                  alt="Au cœur de l'action"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.2} className="col-span-6 md:col-span-4">
            <Link href="/galerie/equipes-fsgt" className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                <Image
                  src="/gallery/equipes-fsgt/18.webp"
                  alt="Une équipe FSGT 31"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.25} className="col-span-12 md:col-span-4">
            <Link href="/actualites/tournoi-walking-foot-2025-04-19" className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-ink/10">
                <Image
                  src="/gallery/tournoi-walking-foot-2025-04-19/11.webp"
                  alt="Dernier souffle de la journée"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/galerie" className="font-mono text-[11px] tracking-[0.2em] uppercase link-underline">
            Toute la galerie →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 mb-24 mx-auto max-w-[1480px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-paper p-10 lg:p-20">
          <div className="absolute -bottom-16 -right-16 w-[360px] h-[360px] rounded-full hatch opacity-30 rotate-12" />
          <div className="grid grid-cols-12 gap-6 relative">
            <div className="col-span-12 lg:col-span-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
                Nous rejoindre · saison 25/26
              </span>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter2">
                <span className="italic">Toi</span>, tu pourrais<br />
                jouer ici aussi.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] text-ink/75 leading-relaxed">
                Recrutement ouvert toute l'année. Séniors, vétérans, mixte 45+,
                gardiens, arbitres bénévoles, parents qui aiment la buvette du
                samedi.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
              <Link
                href="/nous-rejoindre"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-ink text-cream text-[15px] hover:bg-ocre transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulseDot" />
                Postuler / Visiter le club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Badge({ label, home }: { label: string; home?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-20 ${home ? "bg-cream" : "bg-navy-deep"} rounded-md flex items-center justify-center font-display italic text-2xl ${home ? "text-ink" : "text-cream"} border ${home ? "border-ink/10" : "border-cream/20"}`}>
        {label[0]}
      </div>
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/90 max-w-[120px] text-center">
        {label}
      </span>
    </div>
  );
}

function FormChip({ status, large }: { status: "V" | "N" | "D"; large?: boolean }) {
  const cls =
    status === "V"
      ? "bg-moss text-cream"
      : status === "N"
      ? "bg-bone text-ink"
      : "bg-ocre text-cream";
  return (
    <span
      className={`inline-flex items-center justify-center font-mono ${
        large ? "w-9 h-9 text-sm" : "w-7 h-7 text-xs"
      } rounded-full ${cls}`}
    >
      {status}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatDateShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "2-digit"
  });
}

function PracticeIcon({ name }: { name: "trophy" | "users" | "heart" }) {
  const common = "w-6 h-6";
  if (name === "trophy") return <TrophyIcon className={common} />;
  if (name === "users") return <UsersIcon className={common} />;
  return <HeartIcon className={common} />;
}

function TrophyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function UsersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HeartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ExternalArrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function formSummary(recent: { result?: { status: "V" | "N" | "D" } }[]) {
  const w = recent.filter((m) => m.result?.status === "V").length;
  const n = recent.filter((m) => m.result?.status === "N").length;
  const d = recent.filter((m) => m.result?.status === "D").length;
  const parts: string[] = [];
  if (w) parts.push(`${w === 1 ? "Une" : w} victoire${w > 1 ? "s" : ""}`);
  if (n) parts.push(`${n === 1 ? "un" : n} nul${n > 1 ? "s" : ""}`);
  if (d) parts.push(`${d === 1 ? "une" : d} défaite${d > 1 ? "s" : ""}`);
  return `${parts.join(", ")} sur les ${recent.length} derniers matchs.`;
}

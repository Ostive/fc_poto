import Link from "next/link";
import type { Metadata } from "next";
import { club, disciplines, type Discipline } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Nos pratiques · FC Poto",
  description:
    "Trois disciplines au FC POTO : football à 11 (Excellence FSGT 31), football à 7 (auto-arbitré) et walking foot (mixte 45+). Histoire, règles, calendrier.",
  alternates: { canonical: "/pratiques" }
};

export default function PratiquesPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              § Pratiques
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Trois façons<br />
              de jouer <span className="italic text-navy">au foot</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-[17px] md:text-[19px] leading-relaxed">
              {club.tagline} Au FC POTO, on défend l'idée qu'il n'y a pas un seul
              football. Il y en a au moins trois · et chacun a sa philosophie,
              son rythme, son public.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {disciplines.map((d) => (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/30 text-[13px] hover:bg-ink hover:text-cream transition-colors"
                >
                  {d.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {disciplines.map((d, i) => (
        <DisciplineSection key={d.id} d={d} index={i + 1} />
      ))}

      {/* CTA */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
        <div className="rounded-[28px] bg-paper p-10 lg:p-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Trois pratiques · une seule famille
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              Une discipline qui te parle ?<br />
              <span className="italic text-navy">Viens essayer.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-ink/70 leading-relaxed">
              Séance d'essai gratuite, sans engagement. On te trouve l'équipe et
              le créneau qui te conviennent · au stade de Lardenne, à Toulouse.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <a
              href={`mailto:${club.email}?subject=Rejoindre%20le%20FC%20POTO`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors break-all"
            >
              Nous écrire →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function DisciplineSection({ d, index }: { d: Discipline; index: number }) {
  const isDark = index === 2; // foot-7 (au milieu) en panneau ink pour rythme

  return (
    <section
      id={d.id}
      className={`scroll-mt-24 mt-24 lg:mt-32 py-20 lg:py-28 ${
        isDark ? "bg-ink text-cream" : ""
      }`}
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-4">
              <span
                className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-cream text-navy-deep"
                    : "bg-navy-deep text-cream"
                }`}
              >
                <PracticeIcon name={d.icon} />
              </span>
              <span
                className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
                  isDark ? "text-cream/55" : "text-ink/55"
                }`}
              >
                Discipline 0{index} · {d.subtitle}
              </span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-tighter2">
              {d.title}
            </h2>
            <p
              className={`mt-6 font-display italic text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.2] tracking-tighter2 ${
                isDark ? "text-cream/80" : "text-navy-deep"
              }`}
            >
              {d.tagline}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 grid grid-cols-3 gap-3 lg:gap-6">
            {d.numbers.map((n) => (
              <div
                key={n.label}
                className={`border-l-2 pl-3 lg:pl-4 ${
                  isDark ? "border-cream/30" : "border-ink/20"
                }`}
              >
                <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tabular-nums">
                  {n.value}
                </p>
                <p
                  className={`mt-2 font-mono text-[10px] tracking-[0.18em] uppercase leading-snug ${
                    isDark ? "text-cream/65" : "text-ink/55"
                  }`}
                >
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* INTRO */}
        <Reveal>
          <p
            className={`mt-12 max-w-3xl text-[16px] md:text-[18px] leading-[1.65] ${
              isDark ? "text-cream/85" : "text-ink/85"
            }`}
          >
            {d.intro}
          </p>
        </Reveal>

        {/* CORPUS : Origine + Règles + Format/Public */}
        <div className="mt-16 grid grid-cols-12 gap-6 lg:gap-10">
          {/* ORIGINE */}
          <Reveal className="col-span-12 lg:col-span-5">
            <span
              className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                isDark ? "text-cream/55" : "text-ink/55"
              }`}
            >
              ↳ Origine
            </span>
            <p
              className={`mt-4 text-[15px] md:text-[16px] leading-[1.7] ${
                isDark ? "text-cream/80" : "text-ink/80"
              }`}
            >
              {d.origin}
            </p>
          </Reveal>

          {/* REGLES */}
          <Reveal delay={0.08} className="col-span-12 lg:col-span-7">
            <span
              className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                isDark ? "text-cream/55" : "text-ink/55"
              }`}
            >
              ↳ Règles du jeu
            </span>
            <ul className="mt-4 grid gap-3">
              {d.rules.map((r, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-[14px] md:text-[15px] leading-[1.55] ${
                    isDark ? "text-cream/85" : "text-ink/85"
                  }`}
                >
                  <span
                    className={`mt-2 w-1 h-1 rounded-full shrink-0 ${
                      isDark ? "bg-ocre" : "bg-ocre"
                    }`}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* PHILOSOPHIE pull-quote */}
        <Reveal delay={0.1}>
          <blockquote
            className={`mt-20 max-w-4xl mx-auto text-center font-display italic text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.2] tracking-tighter2 ${
              isDark ? "text-cream" : "text-ink"
            }`}
          >
            <span
              aria-hidden
              className={`font-display text-[clamp(4rem,8vw,7rem)] leading-none block ${
                isDark ? "text-ocre/40" : "text-navy/30"
              }`}
            >
              «
            </span>
            <span className="block -mt-6 md:-mt-10">{d.philosophyQuote}</span>
            {d.philosophyAuthor && (
              <span
                className={`block mt-6 font-mono text-[11px] not-italic tracking-[0.22em] uppercase ${
                  isDark ? "text-cream/55" : "text-ink/55"
                }`}
              >
                · {d.philosophyAuthor}
              </span>
            )}
          </blockquote>
        </Reveal>

        {/* FORMAT + AUDIENCE */}
        <div className="mt-20 grid grid-cols-12 gap-6 lg:gap-10">
          <Reveal className="col-span-12 lg:col-span-6">
            <div
              className={`rounded-[20px] p-7 lg:p-8 h-full ${
                isDark
                  ? "bg-cream/5 border border-cream/15"
                  : "bg-paper border border-ink/10"
              }`}
            >
              <span
                className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                  isDark ? "text-cream/55" : "text-ink/55"
                }`}
              >
                Format de la pratique
              </span>
              <p
                className={`mt-4 text-[15px] md:text-[16px] leading-[1.65] ${
                  isDark ? "text-cream/85" : "text-ink/85"
                }`}
              >
                {d.format}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="col-span-12 lg:col-span-6">
            <div
              className={`rounded-[20px] p-7 lg:p-8 h-full ${
                isDark
                  ? "bg-cream/5 border border-cream/15"
                  : "bg-paper border border-ink/10"
              }`}
            >
              <span
                className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                  isDark ? "text-cream/55" : "text-ink/55"
                }`}
              >
                Pour qui ?
              </span>
              <p
                className={`mt-4 text-[15px] md:text-[16px] leading-[1.65] ${
                  isDark ? "text-cream/85" : "text-ink/85"
                }`}
              >
                {d.audience}
              </p>
            </div>
          </Reveal>
        </div>

        {/* EQUIPES FC POTO */}
        <Reveal>
          <div className="mt-16">
            <span
              className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                isDark ? "text-cream/55" : "text-ink/55"
              }`}
            >
              ↳ L'équipe FC POTO
            </span>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.fcpotoTeams.map((t) => (
                <a
                  key={t.name}
                  href={t.ctaHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`group rounded-[20px] p-6 lg:p-7 flex items-center justify-between gap-4 transition-colors ${
                    isDark
                      ? "bg-navy-electric text-cream hover:bg-navy"
                      : "bg-navy-deep text-cream hover:bg-navy-electric"
                  }`}
                >
                  <div>
                    <p className="font-display text-[clamp(1.1rem,2vw,1.5rem)] tracking-tighter2 leading-tight">
                      {t.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-cream/65">
                      {t.poule}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/75 group-hover:text-cream transition-colors flex items-center gap-2 shrink-0">
                    {t.ctaLabel}
                    <ExternalArrow className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* SCHEDULE (walking foot uniquement pour l'instant) */}
        {d.schedule && (
          <Reveal>
            <div className="mt-16">
              <span
                className={`font-mono text-[10px] tracking-[0.22em] uppercase ${
                  isDark ? "text-cream/55" : "text-ink/55"
                }`}
              >
                ↳ Créneaux en Haute-Garonne · saison 25/26
              </span>
              <ul className="mt-6 grid gap-px bg-ink/10">
                {d.schedule.map((s, i) => (
                  <li
                    key={i}
                    className={`grid grid-cols-12 gap-3 items-baseline py-4 px-4 ${
                      s.isFcPoto
                        ? "bg-ocre/15 border-l-4 border-ocre"
                        : isDark
                        ? "bg-ink"
                        : "bg-cream"
                    }`}
                  >
                    <span
                      className={`col-span-3 md:col-span-2 font-display text-[clamp(1.1rem,2vw,1.375rem)] tracking-tighter2 ${
                        isDark && !s.isFcPoto ? "text-cream" : "text-ink"
                      }`}
                    >
                      {s.day}
                    </span>
                    <span
                      className={`col-span-9 md:col-span-3 font-mono text-[11px] md:text-[12px] tracking-[0.12em] uppercase tabular-nums ${
                        isDark && !s.isFcPoto ? "text-cream/75" : "text-ink/70"
                      }`}
                    >
                      {s.time}
                    </span>
                    <span
                      className={`col-span-12 md:col-span-6 text-[14px] ${
                        isDark && !s.isFcPoto ? "text-cream/85" : "text-ink/85"
                      }`}
                    >
                      {s.location}
                    </span>
                    <span className="col-span-12 md:col-span-1 md:text-right">
                      {s.isFcPoto && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ocre text-cream font-mono text-[9px] tracking-[0.18em] uppercase">
                          FC POTO
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* SOURCE LINK */}
        <div className="mt-12 flex justify-end">
          <a
            href={d.fsgtLink}
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase link-underline ${
              isDark ? "text-cream/70" : "text-ink/60"
            }`}
          >
            Source · FSGT 31 <ExternalArrow className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

function PracticeIcon({ name }: { name: "trophy" | "users" | "heart" }) {
  const common = "w-7 h-7";
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

function ExternalArrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

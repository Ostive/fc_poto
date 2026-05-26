import { championship } from "@/lib/data";
import { getChampionshipData } from "@/lib/fsgt";
import { getFoot7Calendar } from "@/lib/foot7";
import { SubHeader } from "@/components/SubHeader";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import { StandingsTable } from "@/components/StandingsTable";
import { Foot7TeamSection } from "@/components/Foot7Calendar";
import { Tabs, Tab } from "@/components/Tabs";

export const metadata = {
  title: "Calendrier · FC Poto",
  description: "Matchs à venir et résultats récents du FC Poto, saison 2025-2026."
};

// Revalidate the calendar every hour (matches FSGT scrape window)
export const revalidate = 3600;

export default async function CalendrierPage() {
  const [{ matches, standings, scrapedAt }, foot7] = await Promise.all([
    getChampionshipData(),
    getFoot7Calendar()
  ]);
  const upcoming = [...matches]
    .filter((m) => !m.result)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = [...matches]
    .filter((m) => m.result)
    .sort((a, b) => b.date.localeCompare(a.date));
  const wins = past.filter((m) => m.result?.status === "V").length;
  const draws = past.filter((m) => m.result?.status === "N").length;
  const losses = past.filter((m) => m.result?.status === "D").length;

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              § Calendrier
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Calendrier <span className="italic text-navy">&</span>
              <br />
              résultats.
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              Saison 2025 / 2026 · championnat FSGT 31. Choisis ta discipline
              pour voir les rencontres correspondantes.
            </p>
          </div>
        </div>
      </section>

      {/* TABS - Foot 11 / Foot 7 */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16 mb-24">
        <Tabs defaultId="foot11">
          {/* ───────────── FOOT À 11 ───────────── */}
          <Tab id="foot11" label="Football à 11" kicker="Excellence Poule A">
            <div className="space-y-20">
              {/* Stats strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/15">
                <StripCell label="Matchs joués" value={String(past.length)} />
                <StripCell label="Victoires" value={String(wins)} accent="moss" />
                <StripCell label="Matchs nuls" value={String(draws)} />
                <StripCell label="Défaites" value={String(losses)} accent="ocre" />
              </div>

              {/* À venir */}
              <div>
                <SubHeader
                  label="À venir"
                  kicker={
                    upcoming.length > 0
                      ? `${upcoming.length} rendez-vous`
                      : "Calendrier en attente"
                  }
                />

                {upcoming.length === 0 && (
                  <p className="mt-10 text-ink/60 text-[15px] max-w-md">
                    Aucun match programmé pour le moment. Le calendrier sera
                    publié par la FSGT 31 · rendez-vous ici dès qu'il est en
                    ligne.
                  </p>
                )}

                {upcoming[0] && (
                  <Reveal>
                    <div className="mt-10 rounded-[28px] bg-ink text-cream p-8 lg:p-12 relative overflow-hidden">
                      <div className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full bg-navy/40 blur-3xl" />
                      <div className="relative grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-7">
                          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/70">
                            Prochain match · {upcoming[0].competition}
                          </span>
                          <h3 className="mt-4 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tighter2 break-words">
                            FC Poto <span className="italic text-ocre">contre</span>
                            <br />
                            {upcoming[0].opponent}
                          </h3>
                          <p className="mt-6 text-cream/80 max-w-md text-[15px] leading-relaxed">
                            {upcoming[0].home ? "À domicile, " : "À l'extérieur, "}
                            le {formatDate(upcoming[0].date)}.
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l md:border-cream/15 flex flex-col justify-end">
                          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-3">
                            Compte à rebours
                          </span>
                          <Countdown target={upcoming[0].date} />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}

                <ul className="mt-10 col-rule">
                  {upcoming.slice(1).map((m, i) => (
                    <Reveal key={i} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-6">
                        <span className="col-span-3 md:col-span-1 font-display text-[clamp(1.75rem,3.5vw,2rem)] tabular-nums text-navy leading-none">
                          {formatDay(m.date)}
                        </span>
                        <span className="col-span-9 md:col-span-2 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
                          {formatMonth(m.date)} · {m.home ? "Domicile" : "Extérieur"}
                        </span>
                        <span className="col-span-12 md:col-span-6 font-display text-[clamp(1.15rem,2.6vw,1.875rem)] tracking-tighter2 leading-[1.1]">
                          FC Poto <span className="text-ink/30">·</span> {m.opponent}
                        </span>
                        <span className="col-span-12 md:col-span-3 md:text-right font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
                          {m.competition}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Classement */}
              <div>
                <SubHeader
                  label="Classement"
                  kicker={`Excellence Poule A · ${standings.length || championship.totalTeams} équipes`}
                />
                <Reveal>
                  <div className="mt-10 rounded-[24px] border border-ink/15 bg-cream p-6 lg:p-8">
                    <StandingsTable standings={standings} />
                    <p className="mt-6 pt-4 border-t border-ink/10 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
                      Mis à jour le{" "}
                      {new Date(scrapedAt).toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short"
                      })}
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Résultats récents */}
              <div>
                <SubHeader
                  label="Résultats récents"
                  kicker={
                    past.length > 0
                      ? `${past.length} match${past.length > 1 ? "s" : ""} joué${past.length > 1 ? "s" : ""}`
                      : "Premiers résultats à venir"
                  }
                />
                {past.length === 0 && (
                  <p className="mt-10 text-ink/60 text-[15px] max-w-md">
                    Pas encore de match joué cette saison.
                  </p>
                )}
                <ul className="mt-10 col-rule">
                  {past.map((m, i) => (
                    <Reveal key={i} delay={i * 0.03}>
                      <li className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-6">
                        <span className="col-span-3 md:col-span-1 font-display text-[clamp(1.75rem,3.5vw,2rem)] tabular-nums text-ink/60 leading-none">
                          {formatDay(m.date)}
                        </span>
                        <span className="col-span-9 md:col-span-2 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
                          {formatMonth(m.date)} · {m.home ? "Lardenne" : "Extérieur"}
                        </span>
                        <span className="col-span-12 md:col-span-5 font-display text-[clamp(1.15rem,2.6vw,1.875rem)] tracking-tighter2 leading-[1.1]">
                          FC Poto <span className="text-ink/30">·</span> {m.opponent}
                        </span>
                        <span className="col-span-7 md:col-span-3 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
                          {m.competition}
                        </span>
                        <span className="col-span-5 md:col-span-1 text-right flex items-center justify-end gap-2 md:gap-3">
                          <span className="font-display text-[clamp(1.25rem,3vw,1.625rem)] tabular-nums leading-none">
                            {m.result!.fcpoto}-{m.result!.opponent}
                          </span>
                          <FormChip status={m.result!.status} />
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Tab>

          {/* ───────────── FOOT À 7 ───────────── */}
          <Tab id="foot7" label="Football à 7" kicker="2 équipes engagées">
            <div className="space-y-10">
              <Tabs variant="secondary" defaultId="poule3">
                <Tab id="poule3" label="Équipe A" kicker="Poule 3">
                  <Foot7TeamSection snapshot={foot7.poule3} />
                </Tab>
                <Tab id="poule7" label="Équipe B" kicker="Poule 7">
                  <Foot7TeamSection snapshot={foot7.poule7} />
                </Tab>
              </Tabs>

              <p className="pt-6 border-t border-ink/10 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
                Mis à jour le{" "}
                {new Date(foot7.poule3.scrapedAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short"
                })}
              </p>
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

function StripCell({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent?: "moss" | "ocre";
}) {
  return (
    <div className="bg-cream p-6 md:p-8">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
        {label}
      </span>
      <p
        className={`mt-3 font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9] tracking-tighter2 ${
          accent === "moss"
            ? "text-moss"
            : accent === "ocre"
            ? "text-ocre"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FormChip({ status }: { status: "V" | "N" | "D" }) {
  const cls =
    status === "V"
      ? "bg-moss text-cream"
      : status === "N"
      ? "bg-bone text-ink"
      : "bg-ocre text-cream";
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-mono text-xs ${cls}`}
    >
      {status}
    </span>
  );
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit" });
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });
}

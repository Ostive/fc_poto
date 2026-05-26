import type { Foot7Match, Foot7PouleSnapshot } from "@/lib/foot7";
import { SubHeader } from "@/components/SubHeader";

const MONTHS = [
  "JAN", "FÉV", "MAR", "AVR", "MAI", "JUI",
  "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"
];

function shortDate(iso: string | null) {
  if (!iso) return "À déf.";
  const [, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]}`;
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

function MatchRow({ m, played }: { m: Foot7Match; played: boolean }) {
  const dateStr = shortDate(m.date);
  const homeBadge = m.home ? "Lardenne" : "Extérieur";
  return (
    <li className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-6">
      <span
        className={`col-span-3 md:col-span-1 font-display text-[clamp(1.75rem,3.5vw,2rem)] tabular-nums leading-none ${
          played ? "text-ink/60" : "text-navy"
        }`}
      >
        {dateStr.split(" ")[0]}
      </span>
      <span className="col-span-9 md:col-span-2 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
        {dateStr.split(" ")[1]} · {homeBadge}
      </span>
      <span className="col-span-12 md:col-span-5 font-display text-[clamp(1.15rem,2.6vw,1.875rem)] tracking-tighter2 leading-[1.1]">
        FC Poto <span className="text-ink/30">·</span> {m.opponent}
      </span>
      <span className="col-span-7 md:col-span-3 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55">
        {m.poule} · J{m.journee || "?"}
        {m.time ? ` · ${m.time}` : ""}
      </span>
      <span className="col-span-5 md:col-span-1 text-right flex items-center justify-end gap-2 md:gap-3">
        {m.result ? (
          <>
            <span className="font-display text-[clamp(1.25rem,3vw,1.625rem)] tabular-nums leading-none">
              {m.result.fcpoto}-{m.result.opponent}
            </span>
            <FormChip status={m.result.status} />
          </>
        ) : m.forfait ? (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ocre">
            {m.forfait === "for" ? "Forfait POTO" : "Forfait adv."}
          </span>
        ) : null}
      </span>
    </li>
  );
}

export function Foot7TeamSection({
  snapshot
}: {
  snapshot: Foot7PouleSnapshot;
}) {
  const played = snapshot.matches.filter((m) => m.result || m.forfait);
  const upcoming = snapshot.matches.filter((m) => !m.result && !m.forfait);
  const externalUrl = snapshot.url.replace(
    "/export?format=csv&gid=1",
    "/edit?gid=1#gid=1"
  );

  return (
    <div>
      {/* Lien feuille officielle, aligné à droite, discret */}
      <div className="flex justify-end mb-6">
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[10px] tracking-[0.18em] uppercase link-underline text-ink/55"
        >
          Calendrier officiel ↗
        </a>
      </div>

      {snapshot.matches.length === 0 ? (
        <p className="text-[14px] text-ink/60">
          Aucun match programmé pour le moment. Reviens bientôt · les
          rencontres sont mises à jour automatiquement.
        </p>
      ) : (
        <>
          {/* À VENIR */}
          <SubHeader
            label="À venir"
            kicker={
              upcoming.length > 0
                ? `${upcoming.length} rendez-vous`
                : "Calendrier en attente"
            }
          />
          {upcoming.length === 0 ? (
            <p className="mt-6 text-[14px] text-ink/60">
              Aucun match programmé pour le moment.
            </p>
          ) : (
            <ul className="mt-4 col-rule">
              {upcoming.map((m, i) => (
                <MatchRow key={`u-${i}`} m={m} played={false} />
              ))}
            </ul>
          )}

          {/* RÉSULTATS RÉCENTS */}
          <div className="mt-16">
            <SubHeader
              label="Résultats récents"
              kicker={
                played.length > 0
                  ? `${played.length} match${played.length > 1 ? "s" : ""} joué${played.length > 1 ? "s" : ""}`
                  : "Premiers résultats à venir"
              }
            />
            {played.length === 0 ? (
              <p className="mt-6 text-[14px] text-ink/60">
                Pas encore de match joué cette saison.
              </p>
            ) : (
              <ul className="mt-4 col-rule">
                {[...played]
                  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
                  .map((m, i) => (
                    <MatchRow key={`p-${i}`} m={m} played />
                  ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

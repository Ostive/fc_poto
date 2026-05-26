import type { Foot7Match, Foot7PouleSnapshot } from "@/lib/foot7";

const MONTHS = [
  "JAN", "FÉV", "MAR", "AVR", "MAI", "JUI",
  "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"
];

function shortDate(iso: string | null) {
  if (!iso) return "À déf.";
  const [y, m, d] = iso.split("-").map(Number);
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
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-[11px] ${cls}`}
    >
      {status}
    </span>
  );
}

function MatchRow({ m }: { m: Foot7Match }) {
  const dateStr = shortDate(m.date);
  const homeBadge = m.home ? "Domicile" : "Extérieur";
  return (
    <li className="grid grid-cols-12 gap-x-4 gap-y-2 items-center py-5">
      <span className="col-span-2 md:col-span-1 font-display text-[clamp(1.25rem,2.4vw,1.5rem)] tabular-nums text-navy leading-none">
        J{m.journee || "?"}
      </span>
      <span className="col-span-4 md:col-span-2 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/60 leading-snug">
        {dateStr}
        {m.time ? ` · ${m.time}` : ""}
      </span>
      <span className="col-span-6 md:col-span-4 font-display text-[clamp(1.05rem,2.4vw,1.625rem)] tracking-tighter2 leading-[1.15]">
        FC POTO <span className="text-ink/30">·</span> {m.opponent}
      </span>
      <span className="col-span-7 md:col-span-3 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-ink/55 leading-snug">
        {m.location}
        <span className="text-ink/30"> · </span>
        {homeBadge}
      </span>
      <span className="col-span-5 md:col-span-2 text-right flex items-center justify-end gap-2 md:gap-3">
        {m.result ? (
          <>
            <span className="font-display text-[clamp(1.15rem,2.6vw,1.5rem)] tabular-nums leading-none">
              {m.result.fcpoto}<span className="text-ink/40 mx-1">-</span>{m.result.opponent}
            </span>
            <FormChip status={m.result.status} />
          </>
        ) : m.forfait ? (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ocre">
            {m.forfait === "for" ? "Forfait POTO" : "Forfait adv."}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
            à venir
          </span>
        )}
      </span>
    </li>
  );
}

export function Foot7PouleBlock({ snapshot }: { snapshot: Foot7PouleSnapshot }) {
  const played = snapshot.matches.filter((m) => m.result || m.forfait);
  const upcoming = snapshot.matches.filter((m) => !m.result && !m.forfait);

  return (
    <div className="rounded-[24px] border border-ink/15 bg-cream p-6 lg:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-ink/10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
            FC POTO · Équipe {snapshot.poule === "Poule 3" ? "A" : "B"}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-tighter2">
            {snapshot.poule}
          </h3>
        </div>
        <a
          href={snapshot.url.replace("/export?format=csv&gid=1", "/edit?gid=1#gid=1")}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[10px] tracking-[0.18em] uppercase link-underline text-ink/55"
        >
          Calendrier officiel ↗
        </a>
      </div>

      {snapshot.matches.length === 0 ? (
        <p className="mt-6 text-[14px] text-ink/60">
          Aucun match programmé pour le moment. Reviens bientôt · les
          rencontres sont mises à jour automatiquement.
        </p>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="mt-6">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                ↳ À venir · {upcoming.length}
              </span>
              <ul className="mt-2 divide-y divide-ink/10">
                {upcoming.map((m, i) => (
                  <MatchRow key={`u-${i}`} m={m} />
                ))}
              </ul>
            </div>
          )}

          {played.length > 0 && (
            <div className="mt-8">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                ↳ Résultats · {played.length}
              </span>
              <ul className="mt-2 divide-y divide-ink/10">
                {[...played]
                  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
                  .map((m, i) => (
                    <MatchRow key={`p-${i}`} m={m} />
                  ))}
              </ul>
            </div>
          )}
        </>
      )}

      <p className="mt-6 pt-4 border-t border-ink/10 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
        Mis à jour le{" "}
        {new Date(snapshot.scrapedAt).toLocaleString("fr-FR", {
          dateStyle: "short",
          timeStyle: "short"
        })}
      </p>
    </div>
  );
}

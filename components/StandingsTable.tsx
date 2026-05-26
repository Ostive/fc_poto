import { championship, type Standing } from "@/lib/data";

export function StandingsTable({
  standings,
  compact = false
}: {
  standings: Standing[];
  compact?: boolean;
}) {
  if (standings.length === 0) {
    return (
      <p className="text-ink/60 text-[14px]">
        Le classement sera disponible dès la première journée jouée.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto -mx-6 lg:mx-0">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
            <th className="text-left px-3 py-4">Rang</th>
            <th className="text-left px-3 py-4">Équipe</th>
            <th className="text-center px-2 py-4 tabular-nums">J</th>
            <th className="text-center px-2 py-4 tabular-nums">V</th>
            <th className="text-center px-2 py-4 tabular-nums">N</th>
            <th className="text-center px-2 py-4 tabular-nums">D</th>
            {!compact && <th className="text-center px-2 py-4 tabular-nums">BP</th>}
            {!compact && <th className="text-center px-2 py-4 tabular-nums">BC</th>}
            <th className="text-center px-2 py-4 tabular-nums">+/-</th>
            <th className="text-right px-3 py-4 tabular-nums">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr
              key={s.team}
              className={`border-t border-ink/10 transition-colors ${
                s.isPoto ? "bg-navy/8 text-ink" : "hover:bg-ink/3"
              }`}
            >
              <td className="px-3 py-4 align-middle">
                <span
                  className={`font-display text-[clamp(1.1rem,2vw,1.4rem)] tabular-nums leading-none ${
                    s.isPoto ? "text-navy" : "text-ink/70"
                  }`}
                >
                  {String(s.rank).padStart(2, "0")}
                </span>
              </td>
              <td className="px-3 py-4 align-middle">
                <span
                  className={`font-display text-[clamp(0.95rem,1.6vw,1.125rem)] tracking-tighter2 ${
                    s.isPoto ? "text-navy font-extrabold" : "text-ink"
                  }`}
                >
                  {s.team}
                </span>
              </td>
              <td className="text-center px-2 py-4 tabular-nums text-[13px] text-ink/75">{s.played}</td>
              <td className="text-center px-2 py-4 tabular-nums text-[13px] text-moss">{s.wins}</td>
              <td className="text-center px-2 py-4 tabular-nums text-[13px] text-ink/60">{s.draws}</td>
              <td className="text-center px-2 py-4 tabular-nums text-[13px] text-ocre">{s.losses}</td>
              {!compact && <td className="text-center px-2 py-4 tabular-nums text-[13px] text-ink/75">{s.goalsFor}</td>}
              {!compact && <td className="text-center px-2 py-4 tabular-nums text-[13px] text-ink/75">{s.goalsAgainst}</td>}
              <td className={`text-center px-2 py-4 tabular-nums text-[13px] ${s.goalDiff > 0 ? "text-moss" : s.goalDiff < 0 ? "text-ocre" : "text-ink/60"}`}>
                {s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}
              </td>
              <td className="text-right px-3 py-4">
                <span
                  className={`font-display text-[clamp(1.1rem,2vw,1.4rem)] tabular-nums leading-none ${
                    s.isPoto ? "text-navy" : "text-ink"
                  }`}
                >
                  {s.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 px-3 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
        Source · <a className="link-underline" target="_blank" rel="noreferrer" href={championship.source}>{championship.shortName}</a>
      </p>
    </div>
  );
}

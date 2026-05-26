#!/usr/bin/env node
/**
 * Scrape FSGT 31 — Excellence Poule A
 *
 * Pas d'API officielle, donc on parse le HTML public.
 * Source : https://fsgt31.fr/gestion-de-championnat/calendar/21-football-11-excellence-poule-a.html
 *
 * Usage :
 *   node scripts/scrape-fsgt.mjs           # affiche les matchs POTO + classement
 *   node scripts/scrape-fsgt.mjs --all     # tous les matchs de la poule
 *   node scripts/scrape-fsgt.mjs --json    # sortie JSON brute
 *
 * Copier-coller le résultat dans `lib/data.ts` après vérification.
 * Le scrape est volontairement minimal : si la FSGT change son HTML, ce script
 * tombe en panne, à corriger à la main.
 */

const BASE = "https://fsgt31.fr/gestion-de-championnat/calendar/21-football-11-excellence-poule-a.html";
const TARGET_TEAM = "POTO";
const MAX_PAGES = 5;

const args = new Set(process.argv.slice(2));
const wantAll = args.has("--all");
const wantJson = args.has("--json");

async function fetchPage(page) {
  const url = `${BASE}?page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": "fcpoto-site-scraper/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseHtml(html) {
  const out = [];
  const blocks = html.split('<div class="jstable-row js-mdname">');
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const j = block.match(/JOURNEE (\d+)/);
    if (!j) continue;
    const journee = parseInt(j[1], 10);
    const rows = block.split('<div class="jstable-row">').slice(1);
    for (const raw of rows) {
      const row = raw.split('<div class="jstable-row js-mdname">')[0];
      const dm = row.match(/<div class="jsDivLineEmbl">(\d{2}-\d{2}-\d{4})/);
      const teams = [...row.matchAll(/<div class="js_div_particName"><a[^>]*>([^<]+)<\/a><\/div>/g)];
      const sm = row.match(/<div class="jsScoreDiv[^"]*"[^>]*><a[^>]*>(\d+)-(\d+)<\/a>/);
      if (!dm || teams.length < 2) continue;
      const [d, m, y] = dm[1].split("-");
      out.push({
        journee,
        date: `${y}-${m}-${d}`,
        home: teams[0][1].trim(),
        away: teams[1][1].trim(),
        score: sm ? { home: +sm[1], away: +sm[2] } : null
      });
    }
  }
  return out;
}

function dedupe(matches) {
  const seen = new Set();
  return matches.filter((m) => {
    const k = `${m.journee}-${m.home}-${m.away}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function status(score, isHome) {
  const us = isHome ? score.home : score.away;
  const them = isHome ? score.away : score.home;
  return us > them ? "V" : us < them ? "D" : "N";
}

function toMatchEntry(m) {
  const isHome = m.home.toUpperCase().includes(TARGET_TEAM);
  const opponent = isHome ? m.away : m.home;
  const venue = isHome ? "Lardenne" : "Extérieur";
  const r = m.score
    ? `, result: { fcpoto: ${isHome ? m.score.home : m.score.away}, opponent: ${isHome ? m.score.away : m.score.home}, status: "${status(m.score, isHome)}" }`
    : "";
  return `  { date: "${m.date}", journée: ${m.journee}, competition: "FSGT 31 — Excellence Poule A · J${m.journee}", opponent: "${opponent}", venue: "${venue}", home: ${isHome}${r} },`;
}

function computeStandings(matches) {
  const teams = {};
  for (const m of matches) {
    if (!m.score) continue;
    for (const t of [m.home, m.away]) {
      teams[t] ||= { team: t, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
    }
    const h = teams[m.home];
    const a = teams[m.away];
    h.played++; a.played++;
    h.goalsFor += m.score.home; h.goalsAgainst += m.score.away;
    a.goalsFor += m.score.away; a.goalsAgainst += m.score.home;
    if (m.score.home > m.score.away) { h.wins++; h.points += 3; a.losses++; }
    else if (m.score.home < m.score.away) { a.wins++; a.points += 3; h.losses++; }
    else { h.draws++; a.draws++; h.points++; a.points++; }
  }
  return Object.values(teams)
    .map((t) => ({ ...t, goalDiff: t.goalsFor - t.goalsAgainst }))
    .sort((x, y) => y.points - x.points || y.goalDiff - x.goalDiff || y.goalsFor - x.goalsFor)
    .map((t, i) => ({ rank: i + 1, ...t, isPoto: t.team.toUpperCase().includes(TARGET_TEAM) }));
}

async function main() {
  const all = [];
  for (let p = 1; p <= MAX_PAGES; p++) {
    try {
      const html = await fetchPage(p);
      const parsed = parseHtml(html);
      if (parsed.length === 0 && p > 1) break;
      all.push(...parsed);
      console.error(`✔ page ${p} · ${parsed.length} matchs`);
    } catch (e) {
      console.error(`✘ page ${p} : ${e.message}`);
      break;
    }
  }
  const unique = dedupe(all);
  const poto = unique.filter(
    (m) => m.home.toUpperCase().includes(TARGET_TEAM) || m.away.toUpperCase().includes(TARGET_TEAM)
  );
  const standings = computeStandings(unique);

  if (wantJson) {
    console.log(JSON.stringify({ matches: wantAll ? unique : poto, standings }, null, 2));
    return;
  }

  const list = wantAll ? unique : poto;
  console.log(`\n// ${list.length}${wantAll ? "" : " matchs POTO"} sur ${unique.length} matchs scrapés\n`);
  console.log("export const matches: Match[] = [");
  list.forEach((m) => console.log(toMatchEntry(m)));
  console.log("];\n");

  console.log("export const standings: Standing[] = [");
  standings.forEach((s) => {
    console.log(`  { rank: ${s.rank}, team: "${s.team}", played: ${s.played}, wins: ${s.wins}, draws: ${s.draws}, losses: ${s.losses}, goalsFor: ${s.goalsFor}, goalsAgainst: ${s.goalsAgainst}, goalDiff: ${s.goalDiff}, points: ${s.points}${s.isPoto ? ", isPoto: true" : ""} },`);
  });
  console.log("];\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

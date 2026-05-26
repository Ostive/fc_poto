/**
 * lib/fsgt.ts — Scraper server-side FSGT 31 (Excellence Poule A).
 *
 * Appelé depuis les pages serveur via `getChampionshipData()`. Cache Next.js (1 h)
 * + fallback automatique sur les données statiques de `lib/data.ts` si la FSGT
 * est indisponible ou si son HTML change.
 *
 * Pour invalider manuellement : appeler `/api/revalidate-fsgt` avec le token,
 * ou utiliser `updateTag("fsgt")` côté serveur.
 */

import { unstable_cache } from "next/cache";
import type { Match, Standing } from "./data";
import { fallbackMatches, fallbackStandings } from "./data";

const URL_BASE =
  "https://fsgt31.fr/gestion-de-championnat/calendar/21-football-11-excellence-poule-a.html";
const TARGET_TEAM = "POTO";
const REVALIDATE_SECONDS = 60 * 60; // 1h
const HARD_PAGE_LIMIT = 10; // garde-fou même si la pagination déconne
const FETCH_TIMEOUT_MS = 8000;

export type ScrapedMatch = {
  journee: number;
  date: string; // YYYY-MM-DD
  home: string;
  away: string;
  score: { home: number; away: number } | null;
};

export type ChampionshipSnapshot = {
  matches: Match[];
  standings: Standing[];
  scrapedAt: string;
  source: "live" | "fallback";
};

/* -------------------------------- fetching ------------------------------- */

async function fetchCalendarPage(page: number): Promise<string> {
  const url = `${URL_BASE}?page=${page}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "fcpoto-site/1.0 (+https://fcpoto.com)" },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["fsgt"] },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/* -------------------------------- parsing -------------------------------- */

function parseHtml(html: string): ScrapedMatch[] {
  const out: ScrapedMatch[] = [];
  const blocks = html.split('<div class="jstable-row js-mdname">');
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const jm = block.match(/JOURNEE (\d+)/);
    if (!jm) continue;
    const journee = parseInt(jm[1], 10);
    const rows = block.split('<div class="jstable-row">').slice(1);
    for (const raw of rows) {
      const row = raw.split('<div class="jstable-row js-mdname">')[0];
      const dm = row.match(/<div class="jsDivLineEmbl">(\d{2}-\d{2}-\d{4})/);
      const teams = [
        ...row.matchAll(
          /<div class="js_div_particName"><a[^>]*>([^<]+)<\/a><\/div>/g
        )
      ];
      const sm = row.match(
        /<div class="jsScoreDiv[^"]*"[^>]*><a[^>]*>(\d+)-(\d+)<\/a>/
      );
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

/**
 * Lit le bloc de pagination Joomla et renvoie le numéro de la dernière page.
 *   <ul class="pagination">
 *     <li><a href="...?page=2">2</a></li>
 *     <li><a href="...?page=3">3</a></li>     ← max = 3
 *     <li><a href="...?page=3" aria-label="Next">»</a></li>
 *   </ul>
 * Renvoie 1 si on ne trouve pas (= une seule page de résultats).
 */
function getTotalPages(html: string): number {
  const block = html.match(/<ul class="pagination">([\s\S]*?)<\/ul>/);
  if (!block) return 1;
  const pages = [...block[1].matchAll(/\?page=(\d+)/g)].map((m) => parseInt(m[1], 10));
  return pages.length > 0 ? Math.max(...pages) : 1;
}

function dedupe(matches: ScrapedMatch[]): ScrapedMatch[] {
  const seen = new Set<string>();
  return matches.filter((m) => {
    const k = `${m.journee}-${m.home}-${m.away}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* -------------------------- transform & standings ------------------------ */

function statusFor(
  score: { home: number; away: number },
  isHome: boolean
): "V" | "N" | "D" {
  const us = isHome ? score.home : score.away;
  const them = isHome ? score.away : score.home;
  return us > them ? "V" : us < them ? "D" : "N";
}

function toMatch(s: ScrapedMatch): Match {
  const isHome = s.home.toUpperCase().includes(TARGET_TEAM);
  const opponent = isHome ? s.away : s.home;
  const venue: "Lardenne" | "Extérieur" = isHome ? "Lardenne" : "Extérieur";
  const date = s.score ? s.date : `${s.date}T15:00:00`;
  return {
    date,
    journée: s.journee,
    competition: `FSGT 31 · Excellence Poule A · J${s.journee}`,
    opponent,
    venue,
    home: isHome,
    result: s.score
      ? {
          fcpoto: isHome ? s.score.home : s.score.away,
          opponent: isHome ? s.score.away : s.score.home,
          status: statusFor(s.score, isHome)
        }
      : undefined
  };
}

function computeStandings(matches: ScrapedMatch[]): Standing[] {
  const teams = new Map<string, Omit<Standing, "rank" | "goalDiff" | "isPoto">>();
  for (const m of matches) {
    if (!m.score) continue;
    for (const t of [m.home, m.away]) {
      if (!teams.has(t)) {
        teams.set(t, {
          team: t,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0
        });
      }
    }
    const h = teams.get(m.home)!;
    const a = teams.get(m.away)!;
    h.played++; a.played++;
    h.goalsFor += m.score.home; h.goalsAgainst += m.score.away;
    a.goalsFor += m.score.away; a.goalsAgainst += m.score.home;
    if (m.score.home > m.score.away) { h.wins++; h.points += 3; a.losses++; }
    else if (m.score.home < m.score.away) { a.wins++; a.points += 3; h.losses++; }
    else { h.draws++; a.draws++; h.points++; a.points++; }
  }
  return [...teams.values()]
    .map((t) => ({ ...t, goalDiff: t.goalsFor - t.goalsAgainst }))
    .sort(
      (x, y) =>
        y.points - x.points ||
        y.goalDiff - x.goalDiff ||
        y.goalsFor - x.goalsFor
    )
    .map((t, i) => ({
      rank: i + 1,
      ...t,
      isPoto: t.team.toUpperCase().includes(TARGET_TEAM)
    }));
}

/* ------------------------------- top-level ------------------------------- */

async function scrape(): Promise<ChampionshipSnapshot> {
  // 1. Page 1 d'abord — elle contient les matchs ET le bloc pagination
  const firstHtml = await fetchCalendarPage(1);
  const all: ScrapedMatch[] = parseHtml(firstHtml);

  // 2. Combien de pages au total ?
  const detected = getTotalPages(firstHtml);
  const totalPages = Math.min(detected, HARD_PAGE_LIMIT);

  // 3. Fetch des pages 2..N en parallèle (3 requêtes simultanées max)
  if (totalPages > 1) {
    const rest = await Promise.allSettled(
      Array.from({ length: totalPages - 1 }, (_, i) => fetchCalendarPage(i + 2))
    );
    for (const [i, r] of rest.entries()) {
      if (r.status === "fulfilled") {
        all.push(...parseHtml(r.value));
      } else {
        console.warn(`[fsgt] page ${i + 2} failed:`, r.reason?.message ?? r.reason);
      }
    }
  }

  if (all.length === 0) {
    throw new Error("Scrape produced no data");
  }

  const unique = dedupe(all);
  const potoMatches = unique
    .filter(
      (m) =>
        m.home.toUpperCase().includes(TARGET_TEAM) ||
        m.away.toUpperCase().includes(TARGET_TEAM)
    )
    .map(toMatch)
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    matches: potoMatches,
    standings: computeStandings(unique),
    scrapedAt: new Date().toISOString(),
    source: "live"
  };
}

/**
 * Cached scrape — Next.js Data Cache, revalidate toutes les heures.
 * Fallback automatique sur les données statiques de `lib/data.ts` en cas d'échec.
 */
export const getChampionshipData = unstable_cache(
  async (): Promise<ChampionshipSnapshot> => {
    try {
      return await scrape();
    } catch (e) {
      console.error("[fsgt] scrape failed, using fallback:", (e as Error).message);
      return {
        matches: fallbackMatches,
        standings: fallbackStandings,
        scrapedAt: new Date().toISOString(),
        source: "fallback"
      };
    }
  },
  ["fsgt-championship"],
  { revalidate: REVALIDATE_SECONDS, tags: ["fsgt"] }
);

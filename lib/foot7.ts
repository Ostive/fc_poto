/**
 * lib/foot7.ts - Scraper Google Sheets pour le calendrier foot à 7 FSGT 31.
 *
 * La FSGT ne publie pas de page HTML pour le foot à 7 : seulement deux Google
 * Sheets (un par poule). On exporte chaque doc en CSV via l'URL `/export?format=csv`,
 * on parse le CSV et on filtre les matchs où FC POTO est impliqué.
 *
 * Avantage : aucune clé d'API, aucune authentification, juste un fetch HTTP.
 * Limite : si la FSGT change la structure des feuilles (colonnes, ordre,
 * libellés "Journée X"), il faut adapter `parseSheet()`.
 */

import { unstable_cache } from "next/cache";

// URLs des feuilles Google Sheets foot à 7. Configurables via .env pour pouvoir
// changer de poule (montée / descente / nouvelle saison) sans toucher au code.
const POULE_3_URL =
  process.env.FOOT7_POULE_A_CSV ||
  "https://docs.google.com/spreadsheets/d/1mIRqjiDJevMeSNMaWnXX-t7fXEqBlALtiMPKXz-b_kM/export?format=csv&gid=1";
const POULE_7_URL =
  process.env.FOOT7_POULE_B_CSV ||
  "https://docs.google.com/spreadsheets/d/1PHkc2D-sWH2eGmggtO-RW9GUw2xFxWkyjYu9qpdjvg0/export?format=csv&gid=1";

const TARGET = "POTO";
const REVALIDATE_SECONDS = 60 * 60; // 1 h
const FETCH_TIMEOUT_MS = 10_000;

export type Foot7Match = {
  date: string | null; // ISO YYYY-MM-DD, ou null si "À DÉFINIR"
  time: string | null; // ex. "20H30"
  journee: number;
  poule: string; // "Poule 3" ou "Poule 7"
  home: boolean; // POTO joue à domicile ?
  opponent: string;
  location: string; // venue brut depuis la feuille (ex. "LARDENNE", "GIRONIS")
  forfait?: "for" | "against"; // POTO forfait OU adversaire forfait
  result?: { fcpoto: number; opponent: number; status: "V" | "N" | "D" };
};

export type Foot7PouleSnapshot = {
  poule: string;
  url: string;
  matches: Foot7Match[];
  scrapedAt: string;
  source: "live" | "empty";
};

export type Foot7Snapshot = {
  poule3: Foot7PouleSnapshot;
  poule7: Foot7PouleSnapshot;
};

/* -------------------------------- fetching ------------------------------- */

async function fetchCsv(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "fcpoto-site/1.0 (+https://fcpoto.com)" },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["fsgt-foot7"] },
      signal: controller.signal,
      redirect: "follow"
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/* --------------------------------- parsing -------------------------------- */

// Parse une ligne CSV en gérant les guillemets (Google Sheets en ajoute parfois).
function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseDate(raw: string): string | null {
  const m = raw.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function parseSheet(csv: string, poule: string): Foot7Match[] {
  const lines = csv.split(/\r?\n/);
  const matches: Foot7Match[] = [];
  let currentJournee = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = parseCsvLine(line);
    if (cols.length < 9) continue;

    // Détection du marqueur "Journée N"
    const journeeCell = cols.find((c) => /^Journée\s*\d+/i.test(c));
    if (journeeCell) {
      const m = journeeCell.match(/Journée\s*(\d+)/i);
      if (m) currentJournee = parseInt(m[1], 10);
      continue;
    }

    const day = cols[0];
    const time = cols[1];
    const location = cols[2];
    const homeTeam = cols[5];
    const homeScore = cols[6];
    const awayScore = cols[7];
    const awayTeam = cols[8];

    if (!homeTeam || !awayTeam) continue;
    if (/^Équipe|^Equipe/i.test(homeTeam)) continue; // ligne d'en-tête
    if (/^<?exempt>?$/i.test(awayTeam) || /^<?exempt>?$/i.test(homeTeam)) continue;

    const homeIsPoto = homeTeam.toUpperCase().includes(TARGET);
    const awayIsPoto = awayTeam.toUpperCase().includes(TARGET);
    if (!homeIsPoto && !awayIsPoto) continue;

    const isHome = homeIsPoto;
    const opponent = (isHome ? awayTeam : homeTeam).trim();
    const date = parseDate(day);

    const match: Foot7Match = {
      date,
      time: time || null,
      journee: currentJournee,
      poule,
      home: isHome,
      opponent,
      location: location?.trim() || "À définir"
    };

    // Scores chiffrés
    const hNum = parseInt(homeScore, 10);
    const aNum = parseInt(awayScore, 10);
    if (!isNaN(hNum) && !isNaN(aNum)) {
      const us = isHome ? hNum : aNum;
      const them = isHome ? aNum : hNum;
      const status = us > them ? "V" : us < them ? "D" : "N";
      match.result = { fcpoto: us, opponent: them, status };
    } else if (/forfait/i.test(homeScore) || /forfait/i.test(awayScore)) {
      // Forfait : qui a déclaré forfait ?
      const homeForfait = /forfait/i.test(homeScore);
      if ((homeForfait && isHome) || (!homeForfait && !isHome)) {
        match.forfait = "for"; // POTO forfait
      } else {
        match.forfait = "against"; // adversaire forfait
      }
    }

    matches.push(match);
  }

  return matches;
}

/* ------------------------------- top-level ------------------------------- */

async function scrapePoule(
  url: string,
  poule: string
): Promise<Foot7PouleSnapshot> {
  try {
    const csv = await fetchCsv(url);
    const matches = parseSheet(csv, poule).sort((a, b) => {
      // Tri : journée asc, puis date asc (null en dernier)
      if (a.journee !== b.journee) return a.journee - b.journee;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    });
    return {
      poule,
      url,
      matches,
      scrapedAt: new Date().toISOString(),
      source: "live"
    };
  } catch (e) {
    console.warn(`[foot7] ${poule} scrape failed:`, (e as Error).message);
    return {
      poule,
      url,
      matches: [],
      scrapedAt: new Date().toISOString(),
      source: "empty"
    };
  }
}

/**
 * Récupère les deux poules en parallèle. Cache Next.js 1 h, tag `fsgt-foot7`
 * pour pouvoir invalider depuis /api/revalidate-fsgt (à étendre).
 */
export const getFoot7Calendar = unstable_cache(
  async (): Promise<Foot7Snapshot> => {
    const [poule3, poule7] = await Promise.all([
      scrapePoule(POULE_3_URL, "Poule 3"),
      scrapePoule(POULE_7_URL, "Poule 7")
    ]);
    return { poule3, poule7 };
  },
  ["foot7-calendar"],
  { revalidate: REVALIDATE_SECONDS, tags: ["fsgt-foot7"] }
);

export type Match = {
  date: string; // ISO
  journée?: number;
  competition: string;
  opponent: string;
  venue: "Lardenne" | "Extérieur";
  home: boolean;
  result?: { fcpoto: number; opponent: number; status: "V" | "N" | "D" };
};

// FALLBACK · données statiques au cas où la FSGT serait indisponible.
// Le vrai calendrier est récupéré dynamiquement via `lib/fsgt.ts > getChampionshipData()`.
// À mettre à jour ponctuellement pour que le fallback reste utile.
// Source : https://fsgt31.fr/gestion-de-championnat/calendar/21-football-11-excellence-poule-a.html
export const fallbackMatches: Match[] = [
  // ===== Matchs joués =====
  {
    date: "2025-09-24",
    journée: 1,
    competition: "FSGT 31 · Excellence Poule A · J1",
    opponent: "MECAP FC",
    venue: "Lardenne",
    home: true,
    result: { fcpoto: 5, opponent: 1, status: "V" }
  },
  {
    date: "2025-10-08",
    journée: 2,
    competition: "FSGT 31 · Excellence Poule A · J2",
    opponent: "MATRA 1 (AS)",
    venue: "Lardenne",
    home: true,
    result: { fcpoto: 6, opponent: 4, status: "V" }
  },
  {
    date: "2025-10-29",
    journée: 3,
    competition: "FSGT 31 · Excellence Poule A · J3",
    opponent: "CARTOUCHERIE SC",
    venue: "Extérieur",
    home: false,
    result: { fcpoto: 1, opponent: 5, status: "D" }
  },
  {
    date: "2025-11-19",
    journée: 4,
    competition: "FSGT 31 · Excellence Poule A · J4",
    opponent: "MUNICIPAUX TOULOUSE",
    venue: "Lardenne",
    home: true,
    result: { fcpoto: 6, opponent: 3, status: "V" }
  },
  {
    date: "2025-11-26",
    journée: 5,
    competition: "FSGT 31 · Excellence Poule A · J5",
    opponent: "COLOMIERS (USEMA)",
    venue: "Extérieur",
    home: false,
    result: { fcpoto: 3, opponent: 3, status: "N" }
  }
  // Matchs à venir : pas de placeholder. Le scraper FSGT live (lib/fsgt.ts)
  // remontera les vraies dates dès qu'elles seront publiées par la FSGT 31.
];

// Classement FSGT 31 · Excellence Poule A après J5 (au 26-11-2025)
// Recalculer à chaque match. Tri par points, puis différence de buts.
export type Standing = {
  rank: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  isPoto?: boolean;
};

// FALLBACK · voir commentaire sur fallbackMatches ci-dessus.
export const fallbackStandings: Standing[] = [
  { rank: 1, team: "UNION COURTAGE (FC)", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 17, goalsAgainst: 7, goalDiff: 10, points: 12 },
  { rank: 2, team: "CARTOUCHERIE SC", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 15, goalsAgainst: 7, goalDiff: 8, points: 12 },
  { rank: 3, team: "MUNICIPAUX TOULOUSE", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 12, goalsAgainst: 10, goalDiff: 2, points: 12 },
  { rank: 4, team: "POTO (FC)", played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 21, goalsAgainst: 16, goalDiff: 5, points: 10, isPoto: true },
  { rank: 5, team: "COLOMIERS (USEMA)", played: 5, wins: 2, draws: 1, losses: 2, goalsFor: 12, goalsAgainst: 8, goalDiff: 4, points: 7 },
  { rank: 6, team: "MATRA 1 (AS)", played: 5, wins: 1, draws: 0, losses: 4, goalsFor: 10, goalsAgainst: 17, goalDiff: -7, points: 3 },
  { rank: 7, team: "MECAP FC", played: 5, wins: 1, draws: 0, losses: 4, goalsFor: 10, goalsAgainst: 15, goalDiff: -5, points: 3 },
  { rank: 8, team: "BALEC (FC)", played: 5, wins: 0, draws: 0, losses: 5, goalsFor: 2, goalsAgainst: 18, goalDiff: -16, points: -1 }
];

export const championship = {
  name: "FSGT 31 · Excellence Poule A",
  shortName: "FSGT 31 · Excellence A",
  season: "2025 / 2026",
  totalTeams: 8,
  totalJournees: 14,
  source: "https://fsgt31.fr/gestion-de-championnat/table/21-football-11-excellence-poule-a.html"
};

export type News = {
  slug: string;
  title: string;
  date: string;
  category: "Match" | "Club" | "Carnet" | "Édito" | "Coulisses";
  excerpt: string;
  read: string;
  author: string;
  body: string[];
};

// Articles à venir, écrits par le club. Aucune donnée inventée · rester vide tant
// qu'aucun article réel n'est rédigé. La page /actualites affichera un état "à venir".
export const news: News[] = [];

export const stats = [
  { label: "Tournois organisés", value: "7" },
  { label: "Années d'existence", value: "15" },
  { label: "Équipes actives", value: "4" },
  { label: "Participants événements", value: "1000+" }
];

export const club = {
  founded: 2010,
  city: "Toulouse",
  tagline: "Le foot qui rassemble : à 11, à 7 et au walking foot !",
  description:
    "Depuis 2010, une bande de potes devenue une vraie famille foot à Toulouse. Plaisir, fair-play, respect : notre règle d'or.",
  email: "footballclub.poto@gmail.com",
  stadium: {
    name: "Stade de Lardenne",
    street: "153 avenue de Lardenne",
    postcode: "31000",
    city: "Toulouse"
  }
};

// Les 4 cartes "pratiques" affichées sur la home (foot à 7 a deux équipes).
// La page /pratiques utilise `disciplines` (3 entrées détaillées) ci-dessous.
export type Practice = {
  id: string;
  disciplineId: "foot-11" | "foot-7" | "walking-foot";
  title: string;
  subtitle: string;
  icon: "trophy" | "users" | "heart";
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const practices: Practice[] = [
  {
    id: "foot-11",
    disciplineId: "foot-11",
    title: "Foot à 11",
    subtitle: "Excellence · Poule A",
    icon: "trophy",
    description:
      "Du jeu, des valeurs, du sérieux sur le terrain et le sourire en dehors.",
    ctaLabel: "Voir le classement",
    ctaHref:
      "https://fsgt31.fr/gestion-de-championnat/table/21-football-11-excellence-poule-a.html"
  },
  {
    id: "foot-7-a",
    disciplineId: "foot-7",
    title: "Foot à 7 · Équipe A",
    subtitle: "Poule 3",
    icon: "users",
    description:
      "Petite taille, grandes actions. L'intensité du foot à 7 avec l'esprit POTO.",
    ctaLabel: "Voir le calendrier",
    ctaHref:
      "https://docs.google.com/spreadsheets/d/1mIRqjiDJevMeSNMaWnXX-t7fXEqBlALtiMPKXz-b_kM/edit?gid=1#gid=1"
  },
  {
    id: "foot-7-b",
    disciplineId: "foot-7",
    title: "Foot à 7 · Équipe B",
    subtitle: "Poule 7",
    icon: "users",
    description:
      "Même envie, autre poule. La progression et le plaisir avant tout.",
    ctaLabel: "Voir le calendrier",
    ctaHref:
      "https://docs.google.com/spreadsheets/d/1PHkc2D-sWH2eGmggtO-RW9GUw2xFxWkyjYu9qpdjvg0/edit?gid=1#gid=1"
  },
  {
    id: "walking-foot",
    disciplineId: "walking-foot",
    title: "Walking Foot",
    subtitle: "Mixte 45+",
    icon: "heart",
    description:
      "On marche, on combine, on transpire… et on rigole beaucoup ! Sport inclusif et convivial.",
    ctaLabel: "Découvrir les règles",
    ctaHref: "https://fsgt31.fr/les-commissions/135-walking-foot.html"
  }
];

// Trois disciplines détaillées (pour la page /pratiques)
export type Discipline = {
  id: "foot-11" | "foot-7" | "walking-foot";
  title: string;
  subtitle: string;
  tagline: string;
  icon: "trophy" | "users" | "heart";
  intro: string;
  origin: string;
  rules: string[];
  format: string;
  audience: string;
  philosophyQuote: string;
  philosophyAuthor?: string;
  numbers: { value: string; label: string }[];
  fsgtLink: string;
  fcpotoTeams: { name: string; poule: string; ctaLabel: string; ctaHref: string }[];
  schedule?: { day: string; time: string; location: string; isFcPoto?: boolean }[];
};

export const disciplines: Discipline[] = [
  {
    id: "foot-11",
    title: "Football à 11",
    subtitle: "Excellence · Poule A",
    tagline:
      "Le format historique du club. Onze joueurs, grand terrain, championnat hebdomadaire.",
    icon: "trophy",
    intro:
      "Le foot à 11 FSGT 31 se joue en semaine, du lundi au vendredi, depuis 1986 (le championnat du dimanche a disparu cette année-là, jugé incompatible avec la vie de famille). Le FC POTO y engage son équipe phare en Excellence Poule A.",
    origin:
      "Le football à 11 en Haute-Garonne remonte à la libération (1944-1945). Dès les années 70, le championnat dépassait les 20 équipes. En 1966, 85 % des équipes représentaient des entreprises ; aujourd'hui c'est tombé à 40 %, signe d'une ouverture à toute la société.",
    rules: [
      "11 contre 11 sur grand terrain · règles FFF, hors-jeu compris",
      "Matchs en semaine (lundi → vendredi), pas le dimanche",
      "Championnat structuré : Excellence Poule A & B, Promotion Excellence, Honneur, Promotion",
      "Coupes en plus : Coupe de France Auguste Delaune, Coupe Occitane, Coupe de la Haute-Garonne, Coupe Printemps",
      "Corps arbitral de 20 à 30 arbitres FSGT selon les saisons"
    ],
    format:
      "Championnat à journées sur la saison + coupes facultatives. L'équipe POTO joue le mercredi soir au stade de Lardenne, coups d'envoi en fonction du calendrier FSGT.",
    audience:
      "Joueurs adultes qui veulent un engagement régulier, un terrain plein format, et le rythme d'un championnat. Le niveau d'Excellence Poule A demande un minimum de pratique.",
    philosophyQuote:
      "L'adversaire et l'arbitre sont les partenaires qui nous font progresser.",
    philosophyAuthor: "Devise du foot à 11 FSGT 31",
    numbers: [
      { value: "~40", label: "équipes engagées en H.-G." },
      { value: "1944", label: "origine de la pratique" },
      { value: "44,20 €", label: "licence adulte saison 25/26" }
    ],
    fsgtLink: "https://fsgt31.fr/les-commissions/11-football-a-11.html",
    fcpotoTeams: [
      {
        name: "FC POTO",
        poule: "Excellence · Poule A",
        ctaLabel: "Voir le classement FSGT",
        ctaHref:
          "https://fsgt31.fr/gestion-de-championnat/table/21-football-11-excellence-poule-a.html"
      }
    ]
  },
  {
    id: "foot-7",
    title: "Football à 7",
    subtitle: "Poule 3 & Poule 7 · auto-arbitré",
    tagline:
      "Petit terrain, plus de touches de balle, plus de buts. L'auto-arbitrage comme règle d'or.",
    icon: "users",
    intro:
      "Né en 2006 au comité FSGT 31, le foot à 7 répond à un besoin de pratique plus conviviale, plus accessible et moins contraignante. L'auto-arbitrage met les joueurs au centre : ce sont eux qui font tourner la discipline. Le FC POTO y aligne deux équipes, en Poule 3 et Poule 7.",
    origin:
      "Mars 2006 : 6 équipes lancent l'aventure avec 2 tournois et un mini-championnat. Dix-neuf ans plus tard, ce sont plus de 120 équipes qui s'engagent chaque saison sur la Haute-Garonne · la plus grosse discipline du comité.",
    rules: [
      "7 contre 7 sur petit terrain · jeu rapide, plus de contacts avec le ballon",
      "Pas de tacle, pas de hors-jeu → plus de buts, moins de conflits",
      "Auto-arbitrage : pas d'arbitre officiel, les joueurs s'engagent à la loyauté",
      "Effectif minimum : 14-15 joueurs pour tenir une saison",
      "Documents requis : attestation + questionnaire médical"
    ],
    format:
      "Saison 25/26 : 7 poules régulières + 1 poule mixte. Coupe du Comité FSGT, Coupe consolante, et Défi Fair-Play récompensant les équipes les plus correctes.",
    audience:
      "Tous niveaux, tous profils · collègues de boulot, voisins de quartier, groupes d'amis. Pas besoin d'avoir joué en club, pas besoin de courir 90 minutes. L'esprit fait le reste.",
    philosophyQuote:
      "Les joueurs sont au centre de leur pratique. La responsabilisation qui en découle fait qu'ils sont acteurs de leur championnat.",
    philosophyAuthor: "Charte foot à 7 FSGT 31",
    numbers: [
      { value: "120+", label: "équipes engagées" },
      { value: "2006", label: "année de création" },
      { value: "8", label: "poules cette saison" }
    ],
    fsgtLink: "https://fsgt31.fr/les-commissions/10-football-a-7.html",
    fcpotoTeams: [
      {
        name: "FC POTO · Équipe A",
        poule: "Poule 3",
        ctaLabel: "Voir le calendrier",
        ctaHref:
          "https://docs.google.com/spreadsheets/d/1mIRqjiDJevMeSNMaWnXX-t7fXEqBlALtiMPKXz-b_kM/edit?gid=1#gid=1"
      },
      {
        name: "FC POTO · Équipe B",
        poule: "Poule 7",
        ctaLabel: "Voir le calendrier",
        ctaHref:
          "https://docs.google.com/spreadsheets/d/1PHkc2D-sWH2eGmggtO-RW9GUw2xFxWkyjYu9qpdjvg0/edit?gid=1#gid=1"
      }
    ]
  },
  {
    id: "walking-foot",
    title: "Walking Football",
    subtitle: "Mixte 45+ · sans course, sans contact",
    tagline:
      "On marche, on combine, on transpire · et on rigole beaucoup. Le foot pour ceux qui ne veulent plus s'arrêter de jouer.",
    icon: "heart",
    intro:
      "Discipline inclusive et conviviale, le walking foot s'adresse autant aux anciens footballeurs qu'aux débutants. La FSGT est une fédération pionnière en France : elle a organisé les premiers rassemblements régionaux et nationaux. Le groupe toulousain s'est constitué en 2021.",
    origin:
      "Création toulousaine en 2021, autour de pratiquants venus du foot à 11 FSGT et d'anciens footballeurs. Tournois nationaux à Villeneuve-Tolosane en 2023 (100 participants), tournoi des Sélections à Lardenne pour Pâques 2024, et tournoi national à Lardenne en 2025.",
    rules: [
      "Interdiction de courir · un pied au sol en permanence",
      "Ballon obligatoirement à hauteur de hanche maximum",
      "Pas de contact entre joueurs",
      "Parfois : 4 touches de balle maximum",
      "5 contre 5 sur petit terrain, petits buts, pas de gardien",
      "Séance type : 1h30, ~5 km parcourus, 100 à 120 touches de balle par joueur"
    ],
    format:
      "Quatre créneaux hebdomadaires sur l'agglomération toulousaine. Le créneau FC POTO est le mercredi soir au stade de Lardenne. Compétitions nationales et internationales (Coupe du Monde IWFF, championnats d'Europe).",
    audience:
      "Mixte. Plutôt 45+ mais sans restriction d'âge. Idéal pour anciens joueurs, seniors, et tous ceux qui veulent reprendre le foot sans agresser leurs genoux. « Toutes les équipes, même débutantes, peuvent participer et progresser dans une bonne ambiance. »",
    philosophyQuote: "Le jeu dépasse l'enjeu.",
    philosophyAuthor: "Devise du walking foot FSGT",
    numbers: [
      { value: "5×5", label: "petit terrain, pas de gardien" },
      { value: "~5 km", label: "parcourus par séance d'1h30" },
      { value: "2021", label: "création du groupe toulousain" }
    ],
    fsgtLink: "https://fsgt31.fr/les-commissions/135-walking-foot.html",
    fcpotoTeams: [
      {
        name: "FC POTO Walking Foot",
        poule: "Mercredi · 20h-21h30 · Stade de Lardenne",
        ctaLabel: "Découvrir les règles",
        ctaHref: "https://fsgt31.fr/les-commissions/135-walking-foot.html"
      }
    ],
    schedule: [
      { day: "Lundi", time: "11h00", location: "Classico Foot, Plaisance du Touch" },
      { day: "Mardi", time: "10h00-12h00", location: "Stade Capitany, Colomiers" },
      { day: "Mercredi", time: "20h00-21h30", location: "Stade de Lardenne, Toulouse", isFcPoto: true },
      { day: "Jeudi", time: "14h00", location: "Chemin de Montrabé, Saint-Jean" }
    ]
  }
];

// Événement à la une · 2024
export const featuredEvent = {
  year: "2024",
  duration: "4 jours d'exception",
  title: "1er Tournoi des Sélections en Occitanie",
  description:
    "Un événement historique organisé par le FC POTO : ~1 000 participants (joueurs, familles, public, élus) réunis pour célébrer le football sous toutes ses formes.",
  numbers: [
    { value: "8", label: "Sélections départementales", sublabel: "Football à 11" },
    { value: "18", label: "Équipes totales", sublabel: "Football à 7" },
    { value: "6", label: "Équipes mixtes", sublabel: "Walking Foot" }
  ],
  press: "Forte couverture médiatique : presse, réseaux, médias spécialisés"
};

// Les 3 valeurs du club (vraies, pas inventées)
export const values = [
  {
    title: "Plaisir du jeu",
    icon: "heart",
    body: "Le football avant tout pour le plaisir, la passion et le bonheur de jouer ensemble."
  },
  {
    title: "Fair-play",
    icon: "users",
    body: "Respect de l'adversaire, de l'arbitrage et des règles. Le sport dans son plus bel esprit."
  },
  {
    title: "Respect",
    icon: "trophy",
    body: "Ouverture à tous les âges et niveaux, à condition d'avoir un bon état d'esprit."
  }
];

export type Partner = {
  name: string;
  tier: "Maillot" | "Tribune" | "Terrain" | "Ami";
  city: string;
  since: number;
  blurb: string;
};

// Partenaires réels · à remplir avec les vrais noms des sponsors du club.
// Tant que la liste est vide, la page /partenaires montre uniquement les 4 formules
// d'engagement et un état "Premiers partenaires en cours de signature".
export const partners: Partner[] = [];

// Palmarès / jalons · uniquement les faits confirmés.
// À enrichir au fur et à mesure (titres, montées, coupes) quand on aura les vrais résultats.
export const palmares = [
  { year: "2025", title: "Engagement en Excellence Poule A", note: "Championnat FSGT 31 · saison 25/26" },
  { year: "2024", title: "1er Tournoi des Sélections en Occitanie", note: "4 jours, ~1 000 participants, à Lardenne" },
  { year: "2010", title: "Création du club", note: "FC POTO · Toulouse, FSGT 31" }
];

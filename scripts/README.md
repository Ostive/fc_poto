# Scripts

> ℹ️ Depuis la v2, **le calendrier et le classement sont scrapés dynamiquement** côté
> serveur via [`lib/fsgt.ts`](../lib/fsgt.ts), avec un cache Next.js d'une heure
> et un fallback automatique. **Tu n'as plus besoin de lancer ce script
> manuellement** pour que le site se mette à jour.
>
> Garde-le sous la main pour : (a) tester rapidement le parsing en local,
> (b) re-générer le fallback de [`lib/data.ts`](../lib/data.ts) une fois par
> saison, (c) déboguer si le scrape live tombe en panne.

## `scrape-fsgt.mjs` — outil de test / refresh manuel

La FSGT 31 n'a pas d'API officielle. Ce script parse la page HTML publique du championnat **Football à 11 EXCELLENCE POULE A** et reformate les données pour `lib/data.ts`.

### Utilisation

```powershell
# Matchs POTO + classement (par défaut)
node scripts/scrape-fsgt.mjs

# Tous les matchs de la poule (8 équipes × 14 journées = 56 matchs max)
node scripts/scrape-fsgt.mjs --all

# Sortie JSON brute (pour piper / parser)
node scripts/scrape-fsgt.mjs --json
```

Le script affiche du TypeScript prêt à copier-coller dans [`../lib/data.ts`](../lib/data.ts) :

```ts
export const matches: Match[] = [
  { date: "2025-09-24", journée: 1, competition: "...", opponent: "MECAP FC", ... },
  ...
];

export const standings: Standing[] = [
  { rank: 1, team: "UNION COURTAGE (FC)", played: 5, wins: 4, ..., points: 12 },
  ...
];
```

### Workflow type (à faire après chaque journée)

1. `node scripts/scrape-fsgt.mjs > tmp.txt`
2. Ouvrir `tmp.txt`, vérifier que les matchs sont bien parsés
3. Remplacer les blocs `matches` et `standings` dans `lib/data.ts`
4. Vérifier visuellement la home et `/calendrier`
5. Supprimer `tmp.txt`

### Limites

- **Fragile** : si la FSGT change leur HTML, le script casse. Il faut alors corriger les regex dans `parseHtml()`.
- **Pas de bonus point** : le script ignore le `-1:0` ajouté en bonus point dans certains matchs (à intégrer si besoin).
- **Pas d'heure** : la FSGT ne publie que la date, pas l'heure. Les coups d'envoi par défaut sont à 15h00.

### Automatiser ?

Pour automatiser totalement (mise à jour quotidienne sans intervention) :

- **GitHub Actions** : workflow cron qui lance le script, met à jour `data.ts`, et ouvre une PR.
- **Vercel Cron** : route `/api/cron/update-matches` appelée chaque nuit.
- **Build hook** : lancement à chaque rebuild.

Voir [`../TODO.md`](../TODO.md) section « Intégrations techniques ».

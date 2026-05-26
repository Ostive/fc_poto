# TODO — FC Poto

État du chantier au **21 mai 2026**. Coche au fur et à mesure.

---

## ✅ Déjà livré

### Structure & pages

- [x] Next.js 16 + React 19.2 + Tailwind 3 + TypeScript 5.7
- [x] **Accueil** — hero éditorial, prochain match avec compte à rebours, manifeste, résultats récents, club en chiffres, actu, CTA recrutement
- [x] **Le club** — histoire en 6 chapitres, 4 valeurs, palmarès, encadrement
- [x] ~~Effectif~~ — page retirée (pas de liste de joueurs disponible). Les 4 équipes sont présentées sur `/pratiques`.
- [x] **Calendrier** — stats saison, prochain match en grande carte, matchs à venir + résultats
- [x] **Actualités** — liste avec article vedette + grille
- [x] **Article individuel** (`/actualites/[slug]`) — corps long, partage, articles liés
- [x] **Galerie** — mosaïque masonry photos / scores / citations
- [x] **Partenaires** — sponsors actuels + 4 formules d'engagement
- [x] **Nous rejoindre** — formulaire multi-profils + 4 cartes infos + FAQ
- [x] **Légal** — mentions légales, politique de confidentialité, cookies (avec placeholders « à compléter »)
- [x] **UX globale** — 404 (`not-found.tsx`), erreur (`error.tsx`), loading (`loading.tsx`)

### SEO, PWA & performance

- [x] `sitemap.ts` — génération automatique du sitemap.xml
- [x] `robots.ts` — politique d'indexation
- [x] `manifest.ts` — Web App Manifest (installable en PWA basique)
- [x] Métadonnées par page (`title`, `description`, `canonical`)
- [x] Favicon, icon, apple-icon, og-image en SVG dans `public/`

### Design system

- [x] Typo **Archivo** (variable, italique) + **JetBrains Mono**
- [x] Palette : navy Toulouse, crème, ocre, encre, mousse
- [x] Composants partagés : Nav, Footer, Ticker, Countdown, Reveal, SectionLabel, LegalLayout, CookieBanner
- [x] Responsive `clamp()` sur tous les grands chiffres et titres
- [x] Bannière cookies dismissible (localStorage)

### Données réelles présentes (tout ce qui s'affiche aujourd'hui)

- [x] **Club** — fondation 2010, tagline, description, email `footballclub.poto@gmail.com`, Stade de Lardenne (153 av. de Lardenne, 31000 Toulouse)
- [x] **Stats** — 7 tournois / 15 ans / 4 équipes / 1000+ participants
- [x] **3 disciplines** détaillées (foot 11, foot 7, walking foot) — origine, règles, format, public, citation philo, chiffres — sourcées sur fsgt31.fr
- [x] **4 cartes pratiques** sur la home pointant vers FSGT / Google Sheets réels
- [x] **3 valeurs** — Plaisir du jeu, Fair-play, Respect (les 3 du site original)
- [x] **Événement 2024** — 1er Tournoi des Sélections en Occitanie (chiffres réels)
- [x] **Palmarès** — 3 jalons confirmés (création 2010, tournoi 2024, engagement 25/26)
- [x] **5 matchs joués** J1→J5 — extraits du HTML FSGT 31 (résultats réels)
- [x] **Classement 8 équipes après J5** — calculé depuis les résultats FSGT
- [x] **Scrape dynamique FSGT 31** côté serveur — calendrier + classement live via [`lib/fsgt.ts`](lib/fsgt.ts), cache 1 h, fallback sur les 5 matchs réels
- [x] **Scrape Google Sheets foot à 7** (Poule 3 + Poule 7) via [`lib/foot7.ts`](lib/foot7.ts) — export CSV public, parsing automatique, filtrage sur POTO, cache 1 h, affichage sur `/calendrier`
- [x] Route API protégée [`/api/revalidate-fsgt`](app/api/revalidate-fsgt/route.ts) pour vider le cache à la demande
- [x] Indicateur visuel sur `/calendrier` : pastille verte « live » / orange « fallback » + horodatage de scrape
- [x] **Script CLI** pour tester le scrape en local ([`scripts/scrape-fsgt.mjs`](scripts/scrape-fsgt.mjs))

### Données inventées RETIRÉES (le site n'affiche plus que du réel)

- [x] ~~6 articles fictifs~~ — `news` est vide, `/actualites` affiche un état "Pas encore d'articles"
- [x] ~~8 partenaires fictifs~~ — `partners` est vide, `/partenaires` montre uniquement les 4 formules d'engagement
- [x] ~~3 matchs "à venir" placeholder~~ — retirés du fallback ; les vrais matchs viendront du scrape FSGT live
- [x] ~~Chapitres histoire 2015 / 2019 / 2022~~ — retirés faute d'années confirmées (reste 2010 / 2024 / 2025)
- [x] ~~Encadrement (président·e, entraîneurs)~~ — section retirée de `/club`

---

## 🔥 Avant la mise en ligne (critique)

### Contenu

- [ ] Remplacer les **placeholders SVG** dans `public/` par les vraies photos (voir [`public/README.md`](public/README.md))
- [ ] Photo réelle du **stade Lardenne** (`public/photos/stade.svg` → `.jpg`)
- [ ] **Open Graph image** définitive — 1200 × 630 (`public/og-image.svg` → `.png`)
- [ ] Vérifier toutes les données dans [`lib/data.ts`](lib/data.ts) — tout ce qui reste doit être réel
- [ ] Compléter quand disponibles : **articles d'actualités**, **partenaires signés**, **encadrement** (président·e, entraîneurs), **jalons historiques manquants** (création foot à 7, arrivée Lardenne, lancement walking foot)
- [ ] Remplir les **mentions légales** : numéro de préfecture, numéro FFF, téléphone, hébergeur exact
- [ ] Remplir la **politique de confidentialité** : durée conservation, outil analytics choisi
- [ ] Remplir la **politique cookies** : outil analytics choisi (Plausible, Umami, Matomo…)

### Données FSGT 31 (calendrier réel)

- [x] ~~Mettre à jour les journées à la main~~ → **maintenant automatique** via [`lib/fsgt.ts`](lib/fsgt.ts)
- [ ] **Configurer `FSGT_REVALIDATE_TOKEN`** dans les variables d'environnement (voir [`.env.example`](.env.example))
- [ ] Vérifier le **palmarès historique** du FC Poto — actuellement « à compléter »
- [ ] **Vraies stats club** : nombre exact de licenciés, équipes engagées, bénévoles (actuellement `184 / 5 / 37` en mock)
- [x] ~~Date de création~~ — 2010 confirmé via la page d'origine
- [ ] **Logos des équipes adverses** : les télécharger de fsgt31.fr et les déposer dans `public/teams/`
- [ ] Mettre à jour le **fallback** dans [`lib/data.ts`](lib/data.ts) une fois par saison (au cas où la FSGT est durablement down)

### Technique

- [ ] **Brancher le formulaire de contact** — créer `app/api/contact/route.ts` ou utiliser Formspree / Resend / Mailjet
- [ ] **Brancher la newsletter** (footer + page actualités) — Brevo, Mailjet, Resend Audience
- [ ] Connecter un **outil d'analytics** (Plausible / Umami / GA4) en respectant le consentement de la bannière cookies
- [ ] Configurer le **domaine** : DNS, certificat SSL, redirection www → apex
- [ ] **Déployer** : Vercel (recommandé pour Next.js) ou Netlify ou OVH Cloud
- [ ] Tester le site sur **mobile réel** (iPhone SE / Pixel petit format) avant ouverture publique

---

## 🎨 Contenu à enrichir

- [ ] Photos pour les **6 articles existants** (chacun a son visuel hero, actuellement en CSS art)
- [ ] **5 à 10 articles supplémentaires** pour pré-remplir la rubrique au lancement
- [ ] **Vidéos** : but de la saison, ambiance buvette, interview entraîneur → intégrer un lecteur (YouTube embed ou Mux)
- [ ] Ajouter une **section féminine** quand elle ouvrira (saison 26/27)
- [ ] Ajouter les **catégories jeunes** (U13, U15, U17) — pour l'instant uniquement séniors visibles
- [ ] **Page équipes** distinguant Séniors A, Séniors B, Vétérans, U17, Féminines
- [ ] Page **archives** : saisons précédentes, anciens résultats

---

## 🔌 Intégrations techniques à ajouter

### Backend / formulaires

- [ ] Route API contact `app/api/contact/route.ts` (envoi e-mail via Resend)
- [ ] Route API newsletter `app/api/newsletter/route.ts`
- [ ] **reCAPTCHA v3** ou Cloudflare Turnstile sur les formulaires (anti-spam)
- [ ] Envoi automatique d'un **e-mail de confirmation** au demandeur

### Données dynamiques

- [ ] Migrer `lib/data.ts` vers un **CMS** :
  - Option recommandée : **Sanity** (free tier, schémas TypeScript)
  - Alternatives : Hygraph, Strapi auto-hébergé, Directus
- [x] ~~Scrape FSGT 31~~ → fait, dynamique et caché côté serveur ([`lib/fsgt.ts`](lib/fsgt.ts))
- [ ] **Vercel Cron** pour appeler `/api/revalidate-fsgt` chaque dimanche soir après les matchs :
  ```json
  // vercel.json
  { "crons": [{ "path": "/api/revalidate-fsgt?token=$FSGT_REVALIDATE_TOKEN", "schedule": "0 22 * * 0" }] }
  ```
- [ ] **Live score** le jour de match (saisie manuelle bénévole + WebSocket ou polling)

### Boutique (optionnel)

- [ ] **E-commerce** : maillots, écharpes, mugs club — Stripe Checkout + Sanity inventory ou Shopify Hydrogen
- [ ] **Cotisations en ligne** : paiement licence via Stripe / HelloAsso

### Espace adhérent (optionnel)

- [ ] Authentification (Clerk / Auth.js)
- [ ] Convocations match envoyées aux licenciés connectés
- [ ] Plannings entraînement personnalisés par catégorie

---

## ♿ Accessibilité & performance

- [ ] Audit **Lighthouse** ≥ 95 sur les 4 catégories
- [ ] Audit **axe DevTools** sur chaque page
- [ ] Vérifier le **contraste** sur les overlays navy/ocre
- [ ] Ajouter `aria-label` sur tous les boutons icône (le X du drawer, le hamburger nav…)
- [ ] **Focus visible** sur tous les éléments interactifs (Tailwind `focus-visible:`)
- [ ] **Réduction de mouvement** : `prefers-reduced-motion` honoré (déjà côté `motion/react`, à vérifier ailleurs)
- [ ] Convertir les SVG inline lourds en composants `<Image>` quand vraies photos disponibles
- [ ] **Lazy loading** des images en dessous du fold
- [ ] Tester sur **connexion 3G simulée** (DevTools)

---

## 📈 SEO

- [ ] Ajouter **JSON-LD `SportsTeam`** dans le `<head>` global pour rich results Google
- [ ] Ajouter **JSON-LD `NewsArticle`** sur chaque article
- [ ] Vérifier l'**Open Graph image** s'affiche correctement (debugger.facebook.com, twitter card validator)
- [ ] Inscrire le site dans **Google Search Console** et **Bing Webmaster Tools**
- [ ] Soumettre le sitemap

---

## 🧪 Tests & qualité

- [ ] Configurer **ESLint** + **Prettier**
- [ ] Tests unitaires (**Vitest**) sur les composants logiques (Countdown, CookieBanner)
- [ ] Tests E2E (**Playwright**) sur les parcours critiques :
  - [ ] Navigation entre pages
  - [ ] Soumission formulaire contact
  - [ ] Page /pratiques (ancres + scroll)
  - [ ] Bannière cookies (accepter / refuser)
- [ ] **CI** : GitHub Actions — lint + build + tests sur chaque PR
- [ ] **Pre-commit** : Husky + lint-staged

---

## 🚀 Améliorations futures (nice to have)

- [ ] **Recherche** dans les actualités (Algolia DocSearch ou implémentation maison)
- [ ] **Tags** sur les articles + filtres
- [ ] **RSS feed** pour les actualités
- [ ] **Mode sombre** (optionnel — le crème actuel est déjà chaleureux)
- [ ] **Animations d'écusson** au survol du logo nav
- [ ] **Page anniversaire club** (12 ans en 2026, 15 ans en 2029)
- [ ] **Galerie multimedia** avec vidéos et lightbox
- [ ] **Carte interactive** Lardenne (Mapbox / Leaflet) sur la page contact
- [ ] **Stats avancées par équipe** : graphique points/saisons, heatmap résultats par poule
- [ ] **Compte à rebours** ouverture nouvelle tribune sur la home (saison 26/27)
- [ ] **Multilingue** FR / EN / ES — si demande d'audience internationale

---

## 📁 Fichiers à connaître

| Fichier | Rôle |
| --- | --- |
| [`lib/data.ts`](lib/data.ts) | Toutes les données (club, disciplines, événement, valeurs, news, partenaires, palmarès, fallback FSGT) |
| [`app/layout.tsx`](app/layout.tsx) | Fonts, nav, footer, cookie banner |
| [`tailwind.config.ts`](tailwind.config.ts) | Palette, animations, fontFamilies |
| [`app/globals.css`](app/globals.css) | Reset, font-display weight, grain, utilities |
| [`public/README.md`](public/README.md) | Guide remplacement assets |
| [`app/sitemap.ts`](app/sitemap.ts) | Génération sitemap.xml |
| [`app/robots.ts`](app/robots.ts) | robots.txt |
| [`app/manifest.ts`](app/manifest.ts) | PWA manifest |

---

## 🆘 Si quelque chose casse

```powershell
# Tout nettoyer et reconstruire
Remove-Item -Recurse -Force .next
npm install
npm run dev
```

Si Tailwind ne picke pas de nouveaux fichiers : redémarrer le dev server. Si une typo ne se charge pas : vider le cache navigateur (Ctrl + Shift + Suppr).

---

_Dernière mise à jour : 21 mai 2026 — Claude_

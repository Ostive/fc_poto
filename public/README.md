# Dossier `public/`

Les assets servis tels quels par Next.js. Quand tu remplaces un fichier, garde le même nom (ou mets à jour la référence dans le code si tu changes l'extension).

---

## Arborescence

```
public/
├── favicon.ico               ← favicon classique
├── favicon.svg               ← favicon vectoriel (navigateurs modernes)
├── icon.svg                  ← icône Next.js (64 × 64)
├── apple-touch-icon.png      ← icône iOS (180 × 180)
├── android-chrome-512x512.png ← icône Android / PWA (512 × 512)
├── og-image.svg              ← carte sociale (1200 × 630)
│
├── logo/
│   ├── fcpoto.png            ← logo principal utilisé dans la nav
│   ├── crest.svg             ← écusson SVG (placeholder couleur)
│   ├── crest-mono.svg        ← écusson SVG (placeholder monochrome)
│   └── wordmark.svg          ← logotype texte (placeholder)
│
├── photos/                   ← placeholders SVG pour visuels du site
│   ├── hero.svg              ← visuel hero accueil (1600 × 900, 16:9)
│   ├── stade.svg             ← photo stade / terrain (1200 × 800, 3:2)
│   ├── entrainement.svg      ← photo action / séance (1600 × 900, 16:9)
│   ├── club-house.svg        ← portrait club-house (1200 × 1500, 4:5)
│   ├── landscape.svg         ← template usage général 16:9
│   └── square.svg            ← template carré 1:1
│
├── gallery/                  ← templates SVG à dupliquer pour la galerie
│   ├── portrait.svg          ← visuel vertical (800 × 1200, 2:3)
│   ├── landscape.svg         ← visuel horizontal (1200 × 800, 3:2)
│   └── square.svg            ← visuel carré (1000 × 1000, 1:1)
│
└── sponsors/                 ← templates logos sponsors
    ├── sponsor.svg           ← fond clair (400 × 200)
    └── sponsor-dark.svg      ← fond sombre (400 × 200)
```

---

## Dimensions recommandées

| Slot | Format | Ratio |
| --- | --- | --- |
| `og-image.svg` | 1200 × 630 (Open Graph standard) | 1.91:1 |
| `photos/hero.*` | 1600 × 900 minimum | 16:9 |
| `gallery/portrait` | 800 × 1200 | 2:3 |
| `gallery/landscape` | 1200 × 800 | 3:2 |
| `gallery/square` | 1000 × 1000 | 1:1 |
| `sponsors/*` | 400 × 200 (PNG transparent idéal) | 2:1 |

Les images seront servies via `next/image` quand tu auras câblé les composants ; tu peux donc fournir des JPG/PNG/WebP — Next.js gère l'optimisation.

---

## Câbler les images dans le code

À ce stade, seul `logo/fcpoto.png` est consommé (dans le composant `Crest` de [`components/Nav.tsx`](../components/Nav.tsx)). Le reste des images est CSS / dégradé.

Pour brancher une image hero ou un visuel galerie :

```tsx
import Image from "next/image";

<Image
  src="/photos/hero.jpg"
  alt="Match FC POTO vs UNION COURTAGE"
  width={1600}
  height={900}
  priority                         // pour le hero uniquement
  className="object-cover"
/>
```

---

## Favicon & Open Graph

`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `android-chrome-512x512.png` et `og-image.svg` sont déclarés dans [`app/layout.tsx`](../app/layout.tsx) (bloc `metadata.icons` + `openGraph.images`) et dans [`app/manifest.ts`](../app/manifest.ts) pour la PWA.

Pour remplacer l'image OG par un vrai PNG :
1. Dépose `public/og-image.png` (1200 × 630)
2. Dans `app/layout.tsx`, change `url: "/og-image.svg"` → `url: "/og-image.png"`

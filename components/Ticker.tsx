const items = [
  "⚽ Prochain match · FC Poto vs UNION COURTAGE · Lardenne",
  "★ Saison 25/26 · FSGT 31 · Excellence Poule A",
  "↳ POTO 4e après 5 journées · 3 V, 1 N, 1 D",
  "⌁ Stade de Lardenne · 153 av. de Lardenne · 31000 Toulouse",
  "✺ Recrutement ouvert : séniors, vétérans, bénévoles"
];

export function TopTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-ink text-cream border-b border-ink/40">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-ticker">
          {doubled.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 py-2 font-mono text-[11px] tracking-[0.18em] uppercase whitespace-nowrap"
            >
              <span className="text-ocre">●</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NamesMarquee({ words }: { words: string[] }) {
  const doubled = [...words, ...words];
  return (
    <div className="marquee-mask overflow-hidden border-y border-ink/15 bg-paper">
      <div className="flex w-max animate-ticker">
        {doubled.map((w, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 py-5 font-display italic text-[clamp(1.5rem,3vw,2.5rem)] whitespace-nowrap text-ink/70"
          >
            {w}
            <span className="text-ocre">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

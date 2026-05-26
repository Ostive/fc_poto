import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Galerie · FC Poto",
  description: "Les images du club, par les bénévoles et les photographes du dimanche."
};

const seasons = [
  { id: "25-26", label: "Saison 25/26", count: 142 },
  { id: "24-25", label: "Saison 24/25", count: 287 },
  { id: "23-24", label: "Saison 23/24", count: 211 }
];

type Tile = { kind: "photo" | "quote" | "score"; aspect?: string; caption?: string; tone?: "navy" | "cream" | "ink" | "ocre" | "paper" | "moss"; content?: string };

const tiles: Tile[] = [
  { kind: "photo", aspect: "aspect-[5/6]", tone: "navy", caption: "Demi-finale coupe district · 2 mai 2026" },
  { kind: "score", aspect: "aspect-[5/4]", tone: "ink", content: "Plaisance FC · 0\nFC Poto · 3" },
  { kind: "quote", aspect: "aspect-[5/6]", tone: "paper", content: "« Pour gagner, faut courir. Pour courir, faut s'entraîner. C'est tout, en fait. »", caption: "Romain Téchené, entraîneur" },
  { kind: "photo", aspect: "aspect-[5/4]", tone: "ocre", caption: "Échauffement, Lardenne" },
  { kind: "photo", aspect: "aspect-[5/7]", tone: "moss", caption: "Vestiaires, mi-temps" },
  { kind: "score", aspect: "aspect-[5/5]", tone: "cream", content: "Muret · 1\nFC Poto · 2" },
  { kind: "photo", aspect: "aspect-[5/5]", tone: "navy", caption: "Tribune Lardenne, vue depuis le rond central" },
  { kind: "quote", aspect: "aspect-[5/4]", tone: "ink", content: "« Le club, c'est mon dimanche, mon mardi et mon jeudi. Le reste, je m'en occupe entre. »", caption: "Hugo Sentenac" },
  { kind: "photo", aspect: "aspect-[5/6]", tone: "ocre", caption: "Buvette du samedi" },
  { kind: "photo", aspect: "aspect-[5/4]", tone: "paper", caption: "Premier ballon, tournoi U13" },
  { kind: "score", aspect: "aspect-[5/4]", tone: "moss", content: "FC Poto · 4\nBalma B · 2" },
  { kind: "photo", aspect: "aspect-[5/6]", tone: "ink", caption: "Coup d'envoi · J22" }
];

export default function GaleriePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">§ Chapitre 05</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Images, scores, <span className="italic text-navy">phrases</span> <br />
              entendues au stade.
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              Une galerie mêlée · photos prises par les bénévoles, scores
              importants, et bouts de phrases dits dans les vestiaires.
              Mosaïque vivante, mise à jour chaque mois.
            </p>
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-ink/15 pb-6">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              className={`px-4 py-2 rounded-full text-[12px] font-mono tracking-[0.12em] uppercase border transition-colors ${
                i === 0 ? "bg-ink text-cream border-ink" : "border-ink/25 hover:border-ink"
              }`}
            >
              {s.label} <span className={`ml-1 ${i === 0 ? "text-cream/60" : "text-ink/40"}`}>{s.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
        <SectionLabel index="01" title="Saison en cours" kicker="142 visuels · mai 2026" />

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {tiles.map((t, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className="mb-6 break-inside-avoid">
              <Tile tile={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
        <div className="rounded-[28px] bg-paper p-10 lg:p-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Vous prenez des photos ?
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              Envoyez-nous vos meilleures images.<br />
              <span className="italic text-navy">On crédite, on archive, on remercie.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <a
              href="mailto:footballclub.poto@gmail.com?subject=Photos%20pour%20le%20FC%20Poto"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors break-all"
            >
              footballclub.poto@gmail.com →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({ tile }: { tile: Tile }) {
  const toneMap: Record<NonNullable<Tile["tone"]>, string> = {
    navy: "bg-navy text-cream",
    cream: "bg-cream text-ink",
    ink: "bg-ink text-cream",
    ocre: "bg-ocre text-cream",
    paper: "bg-paper text-ink",
    moss: "bg-moss text-cream"
  };
  const tone = tile.tone ? toneMap[tile.tone] : "bg-paper text-ink";

  if (tile.kind === "score") {
    const [a, b] = (tile.content || "").split("\n");
    return (
      <figure className={`relative ${tile.aspect} ${tone} rounded-[18px] p-6 overflow-hidden flex flex-col justify-between`}>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
          Résultat marquant
        </span>
        <div className="font-display text-[clamp(1.5rem,3vw,2.4rem)] tracking-tighter2 leading-[1.1]">
          <div>{a}</div>
          <div className="italic opacity-80">{b}</div>
        </div>
      </figure>
    );
  }

  if (tile.kind === "quote") {
    return (
      <figure className={`relative ${tile.aspect} ${tone} rounded-[18px] p-6 overflow-hidden flex flex-col justify-between`}>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
          Surpris au vol
        </span>
        <blockquote className="font-display italic text-[clamp(1.2rem,1.8vw,1.8rem)] leading-[1.2] tracking-tighter2">
          {tile.content}
        </blockquote>
        {tile.caption && (
          <figcaption className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
            · {tile.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // photo placeholder · abstract layered art
  return (
    <figure className={`relative ${tile.aspect} ${tone} rounded-[18px] overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 hatch opacity-20" />
        <div className="absolute -top-12 -right-12 w-[180px] h-[180px] rounded-full bg-ocre/30 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 w-[200px] h-[200px] rounded-full bg-cream/20 blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display italic text-[clamp(6rem,12vw,11rem)] opacity-20 leading-none">
            P
          </span>
        </div>
      </div>
      {tile.caption && (
        <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase opacity-90">
          {tile.caption}
        </figcaption>
      )}
    </figure>
  );
}

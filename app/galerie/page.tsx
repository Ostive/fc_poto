import Link from "next/link";
import Image from "next/image";
import { news, series } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Galerie · FC Poto",
  description: "Albums d'événements et séries thématiques · les images du club."
};

// Les albums sont dérivés des articles qui ont une galerie photo associée.
const albums = news
  .filter((n) => n.gallery && n.gallery.length > 0 && n.cover)
  .map((n) => ({
    slug: n.slug,
    title: n.title,
    date: n.date,
    cover: n.cover!,
    count: (n.gallery!.length) + 1, // +1 pour la cover
    excerpt: n.excerpt,
    href: `/actualites/${n.slug}`,
    category: n.category
  }));

export default function GaleriePage() {
  const hasAlbums = albums.length > 0;
  const hasSeries = series.length > 0;

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
              Les <span className="italic text-navy">albums</span> du club,<br />
              événement par événement.
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              Albums d'événements datés · séries thématiques qui grossissent
              au fil des saisons · photos prises par les bénévoles et les
              photographes du dimanche.
            </p>
          </div>
        </div>
      </section>

      {/* ALBUMS · ÉVÉNEMENTS */}
      {hasAlbums && (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
          <SectionLabel
            index="01"
            title="Albums · événements"
            kicker={`${albums.length} album${albums.length > 1 ? "s" : ""} publié${albums.length > 1 ? "s" : ""}`}
          />

          <div className="mt-10 grid grid-cols-12 gap-6">
            {albums.map((a, i) => (
              <Reveal
                key={a.slug}
                delay={i * 0.06}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Link href={a.href} className="group block h-full">
                  <article className="h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[20px] aspect-[5/4] bg-ink/10">
                      <Image
                        src={a.cover}
                        alt={a.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase bg-ink text-cream rounded-full px-3 py-1.5">
                        {a.category}
                      </span>
                      <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase bg-cream/90 text-ink rounded-full px-3 py-1.5">
                        {a.count} photos
                      </span>
                    </div>
                    <div className="mt-5">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                        {formatDate(a.date)}
                      </span>
                      <h3 className="mt-2 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.05] tracking-tighter2 group-hover:text-navy transition-colors">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink/70 line-clamp-2">
                        {a.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* SÉRIES · SUJETS THÉMATIQUES */}
      {hasSeries && (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32">
          <SectionLabel
            index="02"
            title="Séries · sujets"
            kicker={`${series.length} sujet${series.length > 1 ? "s" : ""} en cours · alimenté${series.length > 1 ? "s" : ""} au fil du temps`}
          />

          <div className="mt-10 grid grid-cols-12 gap-6">
            {series.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={i * 0.06}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Link href={`/galerie/${s.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-[20px] aspect-[5/4] bg-ink/10">
                      <Image
                        src={s.cover}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase bg-ocre text-cream rounded-full px-3 py-1.5">
                        Série
                      </span>
                      <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase bg-cream/90 text-ink rounded-full px-3 py-1.5">
                        {s.photos.length} photos
                      </span>
                    </div>
                    <div className="mt-5">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                        {s.subtitle}
                      </span>
                      <h3 className="mt-2 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.05] tracking-tighter2 group-hover:text-navy transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink/70 line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {!hasAlbums && !hasSeries && (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
          <div className="rounded-[28px] bg-paper p-10 lg:p-16">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Galerie en cours de construction
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              Premiers albums<br />
              <span className="italic text-navy">à venir.</span>
            </h2>
          </div>
        </section>
      )}

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

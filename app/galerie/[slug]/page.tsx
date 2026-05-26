import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { series } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export async function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serie = series.find((s) => s.slug === slug);
  if (!serie) return { title: "Série introuvable · FC Poto" };
  return {
    title: `${serie.title} · Galerie · FC Poto`,
    description: serie.description
  };
}

export default async function SeriePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serie = series.find((s) => s.slug === slug);
  if (!serie) notFound();

  const otherSeries = series.filter((s) => s.slug !== slug);

  return (
    <>
      {/* HEADER */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-12 lg:pt-20 pb-12 border-b border-ink/15">
        <Link
          href="/galerie"
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/60 link-underline"
        >
          ← Toute la galerie
        </Link>

        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              Série · {serie.subtitle}
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.92] tracking-tighter2 text-[clamp(2.5rem,7vw,6rem)]">
              {serie.title}
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink/80">
              {serie.description}
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              {serie.photos.length} photo{serie.photos.length > 1 ? "s" : ""} · série alimentée au fil du temps
            </p>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      {serie.photos.length > 0 ? (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {serie.photos.map((photo, i) => (
              <Reveal key={photo.src} delay={(i % 4) * 0.05} className="mb-6 break-inside-avoid">
                <figure className="relative rounded-[18px] overflow-hidden bg-paper">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: i % 3 === 1 ? "4/5" : i % 3 === 2 ? "5/4" : "1/1" }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption || `${serie.title} · photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase text-cream bg-ink/55 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
          <div className="rounded-[28px] bg-paper p-10 lg:p-16">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Série en cours
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              Premières photos<br />
              <span className="italic text-navy">à venir.</span>
            </h2>
          </div>
        </section>
      )}

      {/* OTHER SERIES */}
      {otherSeries.length > 0 && (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
          <div className="flex items-end justify-between gap-6 border-b border-ink/20 pb-6">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">↳</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.02] tracking-tighter2">
                Autres séries
              </h2>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-12 gap-6">
            {otherSeries.map((s, i) => (
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
                    </div>
                    <div className="mt-5">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                        {s.subtitle}
                      </span>
                      <h3 className="mt-2 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.05] tracking-tighter2 group-hover:text-navy transition-colors">
                        {s.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

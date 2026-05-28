import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { news } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { PhotoGallery } from "@/components/PhotoGallery";

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) return { title: "Article introuvable · FC Poto" };
  return {
    title: `${article.title} · FC Poto`,
    description: article.excerpt
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <>
      {/* HEADER */}
      <article className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-12 lg:pt-20 pb-16">
        <Link
          href="/actualites"
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/60 link-underline"
        >
          ← Toutes les actualités
        </Link>

        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              {article.category}
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.92] tracking-tighter2 text-[clamp(2.25rem,6vw,5.5rem)]">
              {article.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/60">
              <span>Par {article.author}</span>
              <span>·</span>
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{article.read} de lecture</span>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="mt-12 lg:mt-16 relative overflow-hidden rounded-[24px] aspect-[16/9] bg-navy text-cream">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1480px) 100vw, 1480px"
              className="object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 hatch opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy to-ocre/60 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <span className="font-display italic text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-tighter2 opacity-90 text-center">
                  {article.title.split(/[:.]/, 1)[0].trim()}
                </span>
              </div>
            </>
          )}
        </div>
      </article>

      {/* BODY */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28 grid gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                  À retenir
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80 italic">
                  « {article.excerpt} »
                </p>
              </div>
              <div className="pt-6 border-t border-ink/15">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                  Partager
                </span>
                <div className="mt-4 grid gap-2 text-[13px]">
                  <a
                    className="link-underline"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://fcpoto.com/actualites/${article.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sur X (Twitter) ↗
                  </a>
                  <a
                    className="link-underline"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://fcpoto.com/actualites/${article.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sur Facebook ↗
                  </a>
                  <a className="link-underline" href={`mailto:?subject=${encodeURIComponent(article.title)}`}>
                    Par e-mail ↗
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4 order-1 lg:order-2 -mt-4 lg:mt-0">
            <Reveal>
              <div className="grid gap-6">
                {article.body.map((p, i) => (
                  <p
                    key={i}
                    className={`text-[17px] md:text-[19px] leading-[1.6] text-ink/90 ${
                      i === 0 ? "font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.45] tracking-tighter2 text-ink" : ""
                    }`}
                  >
                    {p.split("**").map((chunk, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="font-semibold text-ink">
                          {chunk}
                        </strong>
                      ) : (
                        <span key={j}>{chunk}</span>
                      )
                    )}
                  </p>
                ))}
              </div>
            </Reveal>

            <div className="mt-16 pt-8 border-t border-ink/15">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
                Écrit par
              </p>
              <p className="mt-3 font-display text-2xl tracking-tighter2">
                {article.author}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO ESSAY */}
      {article.gallery && article.gallery.length > 0 && (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-24">
          <div className="flex items-end justify-between gap-6 border-b border-ink/20 pb-6">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
                ↳ Photos
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.02] tracking-tighter2">
                La journée en images
              </h2>
            </div>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55 hidden md:block">
              {article.gallery.length} clichés
            </span>
          </div>

          <div className="mt-10">
            <PhotoGallery photos={article.gallery} alt={article.title} />
          </div>
        </section>
      )}

      <div className="mb-24" />
    </>
  );
}

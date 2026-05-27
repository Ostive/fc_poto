"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";

type Photo = { src: string; caption?: string };

export function PhotoGallery({
  photos,
  alt
}: {
  photos: Photo[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Bloque le scroll en arrière-plan quand la lightbox est ouverte
  useEffect(() => {
    if (activeIndex === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [activeIndex]);

  // Raccourcis clavier : Esc ferme, flèches naviguent
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i === null ? null : Math.max(0, i - 1)));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((i) =>
          i === null ? null : Math.min(photos.length - 1, i + 1)
        );
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, photos.length]);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : Math.max(0, i - 1)));
  const next = () =>
    setActiveIndex((i) =>
      i === null ? null : Math.min(photos.length - 1, i + 1)
    );

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      {/* Mosaïque cliquable */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <Reveal
            key={photo.src}
            delay={(i % 4) * 0.05}
            className="mb-6 break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="block w-full text-left group"
              aria-label={`Agrandir · ${alt} ${i + 1}`}
            >
              <figure className="relative rounded-[18px] overflow-hidden bg-paper cursor-zoom-in">
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio:
                      i % 3 === 1 ? "4/5" : i % 3 === 2 ? "5/4" : "1/1"
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption || `${alt} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {photo.caption && (
                  <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase text-cream bg-ink/55 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox plein écran */}
      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
        >
          {/* Compteur · en haut à gauche */}
          <span className="absolute top-5 left-5 md:top-6 md:left-6 z-10 font-mono text-[11px] tracking-[0.22em] uppercase text-cream/70 select-none">
            {activeIndex + 1} / {photos.length}
          </span>

          {/* Fermer · en haut à droite */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/25 text-cream flex items-center justify-center transition-colors"
            aria-label="Fermer (Échap)"
          >
            <CloseIcon />
          </button>

          {/* Flèche précédente */}
          {activeIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/25 text-cream items-center justify-center transition-colors"
              aria-label="Photo précédente"
            >
              <ArrowIcon dir="left" />
            </button>
          )}

          {/* Flèche suivante */}
          {activeIndex < photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/25 text-cream items-center justify-center transition-colors"
              aria-label="Photo suivante"
            >
              <ArrowIcon dir="right" />
            </button>
          )}

          {/* Image · contained dans viewport */}
          <div
            className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.caption || `${alt} ${activeIndex + 1}`}
              className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>

          {/* Légende · en bas */}
          {active.caption && (
            <div className="absolute bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-ink/80 backdrop-blur-sm rounded-full font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-cream max-w-[90vw] text-center">
              {active.caption}
            </div>
          )}

          {/* Aide raccourcis · en bas droite, discret, desktop seulement */}
          <span className="hidden md:block absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.18em] uppercase text-cream/40 select-none">
            ← → naviguer · Échap fermer
          </span>
        </div>
      )}
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ transform: dir === "right" ? "rotate(180deg)" : undefined }}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

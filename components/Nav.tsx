"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Accueil", n: "00" },
  { href: "/club", label: "Le club", n: "01" },
  { href: "/pratiques", label: "Pratiques", n: "02" },
  { href: "/calendrier", label: "Calendrier", n: "03" },
  { href: "/actualites", label: "Actualités", n: "04" },
  { href: "/galerie", label: "Galerie", n: "05" }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-ink/10" : "bg-cream"
      }`}
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Crest />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-[22px] font-medium tracking-tighter2">
                FC <span className="italic">Poto</span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/60 mt-0.5">
                Toulouse · Est. 2010
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 rounded-full text-[14px] flex items-baseline gap-1.5 transition-colors ${
                    active ? "bg-ink text-cream" : "hover:bg-ink/5"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{l.n}</span>
                  <span className="font-sans">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/nous-rejoindre"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ocre text-cream text-[14px] font-medium hover:bg-ink transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulseDot"></span>
              Nous rejoindre
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden bg-ink text-cream transition-[max-height] duration-500 ease-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 grid gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-baseline justify-between border-b border-cream/15 py-4"
            >
              <span className="font-display text-3xl">{l.label}</span>
              <span className="font-mono text-[10px] opacity-60">{l.n}</span>
            </Link>
          ))}
          <Link
            href="/nous-rejoindre"
            className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ocre text-cream text-[14px]"
          >
            Nous rejoindre →
          </Link>
        </div>
      </div>
    </header>
  );
}

function Crest() {
  return (
    <Image
      src="/logo/fcpoto.png"
      alt="FC Poto"
      width={40}
      height={40}
      priority
      className="h-10 w-auto object-contain"
    />
  );
}

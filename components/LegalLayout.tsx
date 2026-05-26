import Link from "next/link";
import type { ReactNode } from "react";

export function LegalLayout({
  index,
  title,
  updated,
  children
}: {
  index: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/60 link-underline"
        >
          ← Retour à l'accueil
        </Link>
        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 lg:col-span-3">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              § Légal {index}
            </span>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h1 className="font-display leading-[0.9] tracking-tighter2 text-[clamp(2.5rem,7vw,5.5rem)]">
              {title}
            </h1>
            <p className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Mis à jour le {updated}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16 mb-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <aside className="hidden lg:block col-span-3">
            <div className="sticky top-28 grid gap-3">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                Pages légales
              </p>
              <ul className="grid gap-2 text-[13px]">
                <li><Link href="/mentions-legales" className="link-underline">Mentions légales</Link></li>
                <li><Link href="/politique-confidentialite" className="link-underline">Politique de confidentialité</Link></li>
                <li><Link href="/cookies" className="link-underline">Cookies</Link></li>
              </ul>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-9">
            <div className="prose-fcpoto grid gap-8 text-[16px] leading-[1.65] text-ink/85">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-4">
      <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] tracking-tighter2 leading-[1.1]">
        {title}
      </h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

export function ToFill() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-ocre/15 text-ocre font-mono text-[11px] tracking-[0.1em] uppercase align-baseline">
      à compléter
    </span>
  );
}

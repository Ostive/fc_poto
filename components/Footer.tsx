import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-navy/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full bg-ocre/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/60">
              ↳ Le mot de la fin
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter2">
              On joue <span className="italic">au foot</span>,<br />
              on vit <span className="outline-text-cream">ensemble</span>.
            </h2>
            <p className="mt-8 max-w-md text-cream/70 text-[15px] leading-relaxed">
              Le FC Poto est une association sportive sans but lucratif basée à
              Toulouse. Le club est ouvert à toutes et tous, du débutant au
              compétiteur, sur et autour du terrain.
            </p>

            <form className="mt-10 flex items-center gap-3 max-w-md">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 bg-transparent border-b border-cream/30 focus:border-ocre focus:outline-none py-3 placeholder:text-cream/40"
              />
              <button
                type="submit"
                className="font-mono text-[11px] tracking-[0.18em] uppercase border border-cream/30 rounded-full px-4 py-3 hover:bg-cream hover:text-ink transition-colors"
              >
                S'abonner →
              </button>
            </form>
            <p className="mt-3 font-mono text-[10px] text-cream/40 tracking-[0.16em]">
              UNE NEWSLETTER MENSUELLE. SANS PUB. SANS BLAH.
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn
              title="Naviguer"
              items={[
                { href: "/", label: "Accueil" },
                { href: "/club", label: "Le club" },
                { href: "/pratiques", label: "Pratiques" },
                { href: "/calendrier", label: "Calendrier" },
                { href: "/actualites", label: "Actualités" },
                { href: "/galerie", label: "Galerie" },
                { href: "/partenaires", label: "Partenaires" }
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn
              title="Rejoindre"
              items={[
                { href: "/nous-rejoindre", label: "Joueur·se" },
                { href: "/nous-rejoindre", label: "Bénévole" },
                { href: "/partenaires", label: "Sponsor" },
                { href: "/partenaires", label: "Partenaire" }
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50">
              Au stade
            </h3>
            <p className="mt-5 text-[14px] leading-relaxed text-cream/80">
              Stade de Lardenne<br />
              153 avenue de Lardenne<br />
              31000 Toulouse
            </p>
            <p className="mt-4 text-[14px] text-cream/80">
              <a
                href="mailto:footballclub.poto@gmail.com?subject=Contact%20FC%20POTO"
                className="link-underline break-all"
              >
                footballclub.poto@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream/15 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between text-[12px] font-mono text-cream/50">
          <span>© {new Date().getFullYear()} FC POTO · TOUS DROITS RÉSERVÉS</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="link-underline">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="link-underline">Politique de confidentialité</Link>
            <Link href="/cookies" className="link-underline">Cookies</Link>
          </div>
          <span className="tracking-[0.18em]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-ocre mr-2 align-middle animate-pulseDot" />
            Saison 25 / 26 en cours
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50">
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((it, i) => (
          <li key={i}>
            <Link href={it.href} className="text-[14px] link-underline">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

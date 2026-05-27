import Link from "next/link";
import Image from "next/image";
import { partners, type Partner } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Partenaires · FC Poto",
  description:
    "Les partenaires du FC Poto et les trois niveaux d'engagement (Bronze, Argent, Or) pour soutenir le club."
};

type Tier = {
  name: Partner["tier"];
  subtitle: string;
  bullets: string[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Bronze",
    subtitle: "Soutenir le club, simplement.",
    bullets: ["Logo sur le site web du club"]
  },
  {
    name: "Argent",
    subtitle: "Présent sur le terrain et autour.",
    bullets: [
      "Logo sur le site web du club",
      "Logo sur les affiches des événements"
    ]
  },
  {
    name: "Or",
    subtitle: "Le partenariat le plus visible.",
    bullets: [
      "Logo sur le site web du club",
      "Logo sur les affiches des événements",
      "Logo sur les maillots de l'équipe"
    ],
    highlight: true
  }
];

export default function PartenairesPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
              § Partenaires
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Nos <span className="italic text-navy">partenaires</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-[17px] md:text-[18px] leading-relaxed">
              Ils nous soutiennent dans notre aventure sportive et conviviale.
              Merci à eux de croire en nos valeurs.
            </p>
          </div>
        </div>
      </section>

      {/* CURRENT PARTNERS · logos en grille */}
      {partners.length > 0 ? (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
          <SectionLabel
            index="01"
            title="Ils nous accompagnent"
            kicker={`${partners.length} partenaire${partners.length > 1 ? "s" : ""} actif${partners.length > 1 ? "s" : ""}`}
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-ink/15">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 5) * 0.05}>
                <article className="bg-cream aspect-square flex flex-col items-center justify-center p-6 hover:bg-paper transition-colors">
                  <div className="relative w-full flex-1 max-h-[120px] flex items-center justify-center">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={200}
                      height={120}
                      className="object-contain max-h-[120px] w-auto"
                    />
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-1">
                    <p className="font-display text-[14px] tracking-tighter2 text-center leading-tight">
                      {p.name}
                    </p>
                    <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink/50">
                      Partenaire {p.tier}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
          <div className="rounded-[28px] border border-dashed border-ink/25 p-10 lg:p-16 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
                Premiers partenaires en cours de signature
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
                Cette page est{" "}
                <span className="italic text-navy">prête à les accueillir</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[15px] text-ink/75 leading-relaxed">
                Le club ouvre sa saison de partenariats. Ta marque, ton commerce
                ou ton entreprise peut figurer ici dès la prochaine convention
                signée · trois niveaux sont détaillés juste en dessous.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors"
              >
                Voir les niveaux ↓
              </a>
            </div>
          </div>
        </section>
      )}

      {/* INTRO TIERS · pitch du club */}
      <section id="tiers" className="mt-32 bg-ink text-cream py-24">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 border-b border-cream/15 pb-6">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/50">§02</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.02] tracking-tighter2">
                Devenir partenaire
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-cream/50 max-w-[260px] text-right">
              Trois niveaux d'engagement
            </p>
          </div>

          <p className="mt-12 max-w-3xl text-[16px] md:text-[18px] leading-relaxed text-cream/85">
            Soutenez un club toulousain convivial, visible lors de 7 tournois
            organisés et d'événements médiatisés. Votre logo sur notre site,
            nos affiches et nos maillots selon le niveau choisi.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/15">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <div
                  className={`h-full p-8 lg:p-10 flex flex-col gap-6 ${
                    t.highlight ? "bg-navy text-cream" : "bg-ink text-cream"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">
                      Partenaire {t.name}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-tighter2 leading-[1.05]">
                      {t.subtitle}
                    </h3>
                  </div>
                  <ul className="grid gap-2.5 flex-1">
                    {t.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-[14px] opacity-90">
                        <span className={`mt-1.5 w-1 h-1 rounded-full ${t.highlight ? "bg-cream" : "bg-ocre"}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/nous-rejoindre"
                    className={`mt-auto inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] transition-colors ${
                      t.highlight
                        ? "bg-cream text-ink hover:bg-ocre hover:text-cream"
                        : "border border-cream/30 hover:bg-cream hover:text-ink"
                    }`}
                  >
                    Nous contacter →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
        <div className="rounded-[28px] bg-paper p-10 lg:p-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
              Un projet sur mesure ?
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              On construit aussi des partenariats hors-cadre.<br />
              <span className="italic text-navy">Parlons-en autour d'un café.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <a
              href="mailto:footballclub.poto@gmail.com?subject=Partenariat%20FC%20Poto"
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

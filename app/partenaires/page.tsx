import Link from "next/link";
import { partners, type Partner } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Partenaires · FC Poto",
  description:
    "Les partenaires du FC Poto et les formules d'engagement disponibles pour les entreprises."
};

const tiers: { name: Partner["tier"]; subtitle: string; price: string; bullets: string[]; highlight?: boolean }[] = [
  {
    name: "Maillot",
    subtitle: "L'engagement le plus visible.",
    price: "2 400 € / saison",
    bullets: [
      "Logo sur la face avant du maillot (75 cm² max)",
      "Mention dans toutes nos communications presse",
      "Espace dédié sur fcpoto.com et notre newsletter",
      "Quatre invitations VIP par match à domicile"
    ],
    highlight: true
  },
  {
    name: "Tribune",
    subtitle: "Pour soutenir la saison.",
    price: "900 € / saison",
    bullets: [
      "Panneau publicitaire bord de terrain (3 m × 0,8 m)",
      "Logo dans la newsletter mensuelle",
      "Citation sur la page partenaires du site",
      "Deux invitations VIP par match à domicile"
    ]
  },
  {
    name: "Terrain",
    subtitle: "Pour les commerces de quartier.",
    price: "300 € / saison",
    bullets: [
      "Logo dans la newsletter mensuelle",
      "Citation sur la page partenaires du site",
      "Tarif réduit pour louer la salle club-house",
      "Une invitation VIP au match d'ouverture"
    ]
  },
  {
    name: "Ami",
    subtitle: "Pour tous ceux qui veulent simplement aider.",
    price: "Don libre",
    bullets: [
      "Mention dans la rubrique « Les amis du club »",
      "Reçu fiscal (66 % déductibles)",
      "Newsletter et invitation à l'Assemblée Générale annuelle"
    ]
  }
];

export default function PartenairesPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">§ Partenaires</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              Ceux qui sont <span className="italic text-navy">avec nous</span>,<br />
              sur et hors du terrain.
            </h1>
            <p className="mt-10 max-w-2xl text-[17px] md:text-[18px] leading-relaxed">
              Le FC Poto vit grâce à des commerçants, des artisans, des
              entreprises et des particuliers du quartier. Aucune de leurs aides
              n'est anonyme · toutes sont citées, à hauteur de leur engagement.
            </p>
          </div>
        </div>
      </section>

      {/* CURRENT PARTNERS */}
      {partners.length > 0 ? (
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
        <SectionLabel
          index="01"
          title="Saison 25 / 26"
          kicker={`${partners.length} partenaire${partners.length > 1 ? "s" : ""} actif${partners.length > 1 ? "s" : ""}`}
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-ink/15">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.05}>
              <article className="bg-cream p-6 aspect-[5/4] flex flex-col justify-between hover:bg-paper transition-colors">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                  <span>{p.tier}</span>
                  <span>Depuis {p.since}</span>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.25rem,2vw,1.625rem)] tracking-tighter2 leading-[1.1]">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
                    {p.city}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink/75">{p.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      ) : (
        // EMPTY STATE · pas encore de partenaires signés
        <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
          <div className="rounded-[28px] border border-dashed border-ink/25 p-10 lg:p-16 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55">
                Premiers partenaires en cours de signature
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
                Cette page est <span className="italic text-navy">prête à les accueillir</span>.
              </h2>
              <p className="mt-6 max-w-xl text-[15px] text-ink/75 leading-relaxed">
                Le club ouvre sa saison de partenariats. Ta marque, ton commerce
                ou ton entreprise peut figurer ici dès la prochaine convention
                signée · quatre formules sont détaillées juste en dessous.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors"
              >
                Voir les formules ↓
              </a>
            </div>
          </div>
        </section>
      )}

      {/* TIERS */}
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
              Quatre formules · saison 25/26
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-cream/15">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <div
                  className={`h-full p-8 lg:p-10 flex flex-col gap-6 ${
                    t.highlight ? "bg-navy text-cream" : "bg-ink text-cream"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">
                      Formule {t.name}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] tracking-tighter2 leading-[1.05]">
                      {t.subtitle}
                    </h3>
                    <p className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-none">
                      {t.price}
                    </p>
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
              Vous portez un projet plus grand ?
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-tighter2">
              On crée des partenariats sur mesure.<br />
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

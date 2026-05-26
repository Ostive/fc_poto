"use client";

import { useState } from "react";
import { club } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

type Profile = "joueur" | "benevole" | "sponsor" | "autre";

const profiles: { id: Profile; title: string; body: string; chip: string }[] = [
  {
    id: "joueur",
    chip: "01",
    title: "Joueur ou joueuse",
    body: "Tous niveaux. Une séance d'essai au mardi soir, sans engagement. Catégories séniors et vétérans · section féminine en construction."
  },
  {
    id: "benevole",
    chip: "02",
    title: "Bénévole",
    body: "Buvette, communication, arbitrage, photo, transports. On a toujours besoin de mains, et on rend ce qu'on reçoit."
  },
  {
    id: "sponsor",
    chip: "03",
    title: "Sponsor / Partenaire",
    body: "Trois formules d'engagement annuel. Le club propose une vraie contrepartie : visibilité maillot, tribune, événements, contenus."
  },
  {
    id: "autre",
    chip: "04",
    title: "Autre",
    body: "Un projet ? Un stage ? Un événement à co-organiser ? Écrivez, on lit tout."
  }
];

export default function ContactPage() {
  const [profile, setProfile] = useState<Profile>("joueur");
  const [sent, setSent] = useState(false);


  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 lg:pt-24 pb-12 border-b border-ink/15">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">§ Contact</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h1 className="font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,9rem)]">
              On vous <span className="italic text-navy">attend</span>.<br />
              Vraiment.
            </h1>
            <p className="mt-10 max-w-2xl text-[18px] leading-relaxed">
              Remplis le formulaire ci-dessous. En cliquant sur « Envoyer ma
              demande », ton client mail s'ouvre avec un message déjà
              pré-rempli · il ne te reste qu'à cliquer sur « Envoyer ».
              Réponse sous 48 h ouvrées.
            </p>
          </div>
        </div>
      </section>

      {/* PROFILES */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-16">
        <SectionLabel index="01" title="Comment nous rejoindre ?" kicker="Choisir un profil change le formulaire" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
          {profiles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <button
                onClick={() => setProfile(p.id)}
                className={`w-full h-full text-left p-7 transition-colors ${
                  profile === p.id ? "bg-ink text-cream" : "bg-cream hover:bg-paper"
                }`}
              >
                <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${profile === p.id ? "text-ocre" : "text-ink/55"}`}>
                  /{p.chip}
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.5rem,2.2vw,1.9rem)] tracking-tighter2">
                  {p.title}
                </h3>
                <p className={`mt-3 text-[14px] leading-relaxed ${profile === p.id ? "text-cream/80" : "text-ink/70"}`}>
                  {p.body}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-20">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <Reveal className="col-span-12 lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const profileTitle = profiles.find((p) => p.id === profile)?.title ?? "Contact";

                const v = (key: string) => (data.get(key) as string | null)?.trim() ?? "";
                const firstName = v("firstName");
                const lastName = v("lastName");
                const email = v("email");
                const message = v("message");

                const lines: string[] = [
                  "Bonjour le FC POTO,",
                  "",
                  `Je vous écris au sujet d'une demande « ${profileTitle} ».`,
                  "",
                  "· Coordonnées ·",
                  `Prénom : ${firstName}`,
                  `Nom : ${lastName}`,
                  `E-mail : ${email}`
                ];

                if (profile === "joueur") {
                  const dob = v("dob");
                  const position = v("position");
                  const lastClub = v("lastClub");
                  if (dob) lines.push(`Date de naissance : ${dob}`);
                  if (position) lines.push(`Poste préféré : ${position}`);
                  if (lastClub) lines.push(`Club précédent : ${lastClub}`);
                } else if (profile === "benevole") {
                  const role = v("role");
                  if (role) lines.push(`Volet souhaité : ${role}`);
                } else if (profile === "sponsor") {
                  const company = v("company");
                  const website = v("website");
                  if (company) lines.push(`Entreprise : ${company}`);
                  if (website) lines.push(`Site web : ${website}`);
                }

                lines.push("", "· Message ·", message, "", `${firstName} ${lastName}`);

                const subject = `[FC POTO] Demande ${profileTitle}${firstName ? ` · ${firstName} ${lastName}` : ""}`;
                const body = lines.join("\n");
                const mailto = `mailto:${club.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailto;
                setSent(true);
                setTimeout(() => setSent(false), 6000);
              }}
              className="rounded-[28px] bg-paper p-8 lg:p-12 grid gap-6 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-16 w-[260px] h-[260px] rounded-full bg-navy/15 blur-3xl pointer-events-none" />

              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/55 relative">
                Formulaire · profil {profiles.find((p) => p.id === profile)?.title}
              </span>

              <div className="grid md:grid-cols-2 gap-6 relative">
                <Field label="Prénom" name="firstName" required />
                <Field label="Nom" name="lastName" required />
              </div>

              <Field label="Adresse e-mail" name="email" type="email" required />

              {profile === "joueur" && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Date de naissance" name="dob" type="date" required />
                    <Field label="Poste préféré" name="position" placeholder="Gardien, milieu, attaquant…" />
                  </div>
                  <Field label="Club précédent (s'il y en a un)" name="lastClub" placeholder="Aucun, ou nom du club" />
                </>
              )}

              {profile === "benevole" && (
                <Field
                  label="Sur quel volet souhaitez-vous aider ?"
                  name="role"
                  placeholder="Buvette, photo, communication, arbitrage…"
                />
              )}

              {profile === "sponsor" && (
                <>
                  <Field label="Entreprise" name="company" required />
                  <Field label="Site web (facultatif)" name="website" placeholder="https://…" />
                </>
              )}

              <div>
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 block">
                  Votre message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full bg-cream/70 border border-ink/15 rounded-2xl p-4 focus:outline-none focus:border-ink resize-none"
                  placeholder="Racontez-nous en quelques mots. Pas besoin d'être formel · on n'est pas l'administration."
                />
              </div>

              <label className="flex items-start gap-3 text-[13px] text-ink/70">
                <input type="checkbox" required className="mt-1 accent-ocre" />
                J'autorise le FC Poto à me recontacter par e-mail au sujet de cette demande.
              </label>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-cream text-[14px] hover:bg-navy transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulseDot" />
                  Envoyer ma demande
                </button>
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-opacity ${
                    sent ? "text-moss opacity-100" : "opacity-0"
                  }`}
                >
                  ✓ ouverture de votre messagerie…
                </span>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5">
            <div className="grid gap-6">
              <div className="rounded-[24px] bg-navy text-cream p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-[260px] h-[260px] rounded-full bg-ocre/30 blur-3xl" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/70 relative">
                  Au stade
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-tighter2 leading-[1.05] relative">
                  Stade <span className="italic">de Lardenne</span>
                </h3>
                <p className="mt-5 text-cream/85 text-[15px] leading-relaxed relative">
                  153 avenue de Lardenne<br />
                  31000 Toulouse
                </p>
                <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-cream/70 relative">
                  Permanence inscription · mardi & jeudi · 18h-20h
                </p>
              </div>

              <div className="rounded-[24px] bg-ink text-cream p-8">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/60">
                  Par e-mail
                </span>
                <p className="mt-5 font-display text-[clamp(1.25rem,2.4vw,1.625rem)] tracking-tighter2 leading-[1.15]">
                  <a
                    className="link-underline break-all"
                    href="mailto:footballclub.poto@gmail.com?subject=Rejoindre%20le%20FC%20POTO"
                  >
                    footballclub.poto@gmail.com
                  </a>
                </p>
                <p className="mt-4 text-[14px] text-cream/70 leading-relaxed">
                  Une seule adresse pour les joueurs, bénévoles, sponsors, presse
                  et toute autre demande. Réponse sous 48 h ouvrées.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-32 mb-24">
        <SectionLabel index="02" title="Questions fréquentes" kicker="Trois réponses, vite" />
        <div className="mt-10 col-rule">
          {[
            {
              q: "À quoi ressemble un essai ?",
              a: "Vous venez le mardi à 19h, en tenue, avec une bouteille d'eau. L'entraîneur fait sa séance habituelle, et on vous oriente vers le groupe qui vous correspond. Aucun engagement avant la troisième séance."
            }
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <details className="group py-6">
                <summary className="cursor-pointer flex items-start justify-between gap-6 list-none">
                  <h3 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] tracking-tighter2 leading-[1.1]">
                    {f.q}
                  </h3>
                  <span className="font-mono text-2xl text-ocre transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-5 max-w-2xl text-[15px] text-ink/75 leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 block">
        {label}
        {required && <span className="text-ocre"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-cream/70 border border-ink/15 rounded-full px-5 py-3 focus:outline-none focus:border-ink placeholder:text-ink/40"
      />
    </div>
  );
}

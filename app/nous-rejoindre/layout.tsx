import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous rejoindre · FC Poto",
  description:
    "Joueur, bénévole, sponsor ou simple curieux : toutes les portes du FC Poto sont ouvertes. Formulaire, infos pratiques et adresse du stade de Lardenne.",
  alternates: { canonical: "/nous-rejoindre" }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

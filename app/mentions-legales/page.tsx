import { LegalLayout, LegalSection, ToFill } from "@/components/LegalLayout";

export const metadata = {
  title: "Mentions légales · FC Poto",
  description: "Informations légales du site fcpoto.com et de l'association FC Poto."
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout index="01" title="Mentions légales" updated="21 mai 2026">
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>fcpoto.com</strong> est édité par l'association
          <strong> FC Poto</strong>, association loi 1901 déclarée à la
          Préfecture de la Haute-Garonne sous le numéro <ToFill /> et enregistrée
          à la Fédération Française de Football sous le numéro <ToFill />.
        </p>
        <p>
          Siège social : Stade de Lardenne, 153 avenue de Lardenne, 31000
          Toulouse.
        </p>
        <p>
          Présidente, directrice de la publication : <ToFill />.<br />
          E-mail :{" "}
          <a className="link-underline break-all" href="mailto:footballclub.poto@gmail.com">
            footballclub.poto@gmail.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <ToFill /> (à compléter : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA · ou OVHCloud, Roubaix, France · selon votre choix).
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L'ensemble des éléments graphiques, textes, photographies et vidéos
          présents sur ce site sont la propriété exclusive du FC Poto, sauf
          mention contraire. Toute reproduction, même partielle, est soumise à
          l'autorisation écrite préalable de l'association.
        </p>
        <p>
          Les marques et logos des partenaires affichés sur le site restent la
          propriété de leurs détenteurs respectifs et sont reproduits avec leur
          accord.
        </p>
      </LegalSection>

      <LegalSection title="Crédits">
        <p>
          Conception et développement : <ToFill /> · Design éditorial et
          direction artistique en interne · Typographies : Archivo (Google Fonts)
          et JetBrains Mono.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Le FC Poto met à jour ce site régulièrement mais ne peut garantir
          l'exactitude, l'exhaustivité ou l'actualité des informations diffusées.
          La responsabilité de l'association ne saurait être engagée en cas
          d'erreur, d'omission ou d'indisponibilité du site.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Cookies · FC Poto",
  description: "Politique de gestion des cookies sur fcpoto.com."
};

export default function CookiesPage() {
  return (
    <LegalLayout index="03" title="Politique cookies" updated="avril 2026">
      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal
          (ordinateur, tablette, téléphone) lors de votre visite sur un site
          web. Il permet de mémoriser certaines informations entre vos visites.
        </p>
      </LegalSection>

      <LegalSection title="Cookies utilisés sur fcpoto.com">
        <p>
          Le site <strong>fcpoto.com</strong> utilise les catégories suivantes :
        </p>
        <ul className="grid gap-3 list-none">
          <li>
            <strong>Strictement nécessaires</strong> · Nécessaires au
            fonctionnement du site (mémorisation de votre choix sur cette
            bannière, accessibilité). Pas de consentement requis.
          </li>
          <li>
            <strong>Mesure d'audience</strong> · Statistiques anonymes (pages
            vues, durée). Aucun cookie publicitaire intrusif n'est utilisé
            sans consentement.
          </li>
          <li>
            <strong>Réseaux sociaux</strong> · Cookies déposés par les boutons
            de partage (X, Facebook). Posés uniquement après votre clic.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Vos choix">
        <p>
          Vous pouvez à tout moment accepter ou refuser les cookies non
          essentiels via la bannière affichée lors de votre première visite,
          ou modifier vos préférences en effaçant les cookies dans les
          paramètres de votre navigateur.
        </p>
        <p>Liens utiles pour configurer votre navigateur :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>
            <a
              className="link-underline"
              target="_blank"
              rel="noreferrer"
              href="https://support.google.com/chrome/answer/95647"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              className="link-underline"
              target="_blank"
              rel="noreferrer"
              href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              className="link-underline"
              target="_blank"
              rel="noreferrer"
              href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
            >
              Safari
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Le consentement est conservé 13 mois maximum. Au-delà, la bannière
          réapparaît pour que vous puissiez confirmer vos préférences.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

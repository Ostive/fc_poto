import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Mentions légales · FC Poto",
  description:
    "Mentions légales du site fcpoto.com · édité par PROPULSION IA, SASU basée à Campsas (Tarn-et-Garonne)."
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout index="01" title="Mentions légales" updated="avril 2026">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
        Conformité et transparence légale
      </p>
      <p>
        Conformément aux articles 6-III et 19 de la loi n°2004-575 du 21 juin
        2004 pour la Confiance dans l'Économie Numérique (LCEN).
      </p>

      <LegalSection title="1. Éditeur du site">
        <p>
          <strong>Dénomination sociale :</strong> PROPULSION IA<br />
          <strong>Forme juridique :</strong> SASU
        </p>
        <p>
          <strong>Siège social :</strong><br />
          13 impasse Le Domaine de Margaux<br />
          82370 Campsas · France
        </p>
        <p>
          <strong>SIREN :</strong> 950 908 558<br />
          <strong>SIRET :</strong> 950 908 558 00014<br />
          <strong>RCS :</strong> Montauban
        </p>
        <p>
          <strong>Adresse e-mail :</strong>{" "}
          <a
            className="link-underline break-all"
            href="mailto:contact@propulsion-ia.services"
          >
            contact@propulsion-ia.services
          </a>
        </p>
        <p>
          <strong>Directeur de la publication :</strong> Le Président de
          PROPULSION IA
        </p>
        <p>
          <strong>Lien capitalistique :</strong> PROPULSION IA est une filiale
          de la société PROPULSION DIGITALE.
        </p>
      </LegalSection>

      <LegalSection title="2. Hébergement">
        <p>Le site est hébergé en Europe par la société :</p>
        <p>
          <strong>Hostinger International Ltd.</strong><br />
          Numéro d'entreprise : HE 301365<br />
          Adresse : 61 Lordou Vironos Street Lumiel Building, 4th floor, 6023
          Larnaca, Chypre
        </p>
      </LegalSection>

      <LegalSection title="3. Accès au site">
        <p>
          Le site est accessible 24h/24 et 7j/7, sauf interruption pour
          maintenance, mise à jour ou en cas de force majeure.
        </p>
        <p>
          PROPULSION IA ne saurait être tenue responsable des interruptions
          temporaires du service.
        </p>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur le site (textes, images, logos,
          marques, graphismes, vidéos, icônes, structure, code) est protégé par
          le droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, diffusion ou exploitation, totale
          ou partielle, sans autorisation écrite préalable de PROPULSION IA est
          strictement interdite.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilité">
        <p>
          PROPULSION IA s'efforce de fournir des informations exactes et à
          jour.
        </p>
        <p>
          Toutefois, aucune garantie n'est donnée quant à l'exactitude,
          l'exhaustivité ou l'actualité des informations diffusées.
        </p>
        <p>
          L'utilisation du site se fait sous la seule responsabilité de
          l'utilisateur.
        </p>
        <p>
          PROPULSION IA ne pourra être tenue responsable de dommages directs ou
          indirects résultant de l'utilisation du site.
        </p>
      </LegalSection>

      <LegalSection title="6. Liens hypertextes">
        <p>Le site peut contenir des liens vers des sites tiers.</p>
        <p>
          PROPULSION IA n'exerce aucun contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu ou leur disponibilité.
        </p>
      </LegalSection>

      <LegalSection title="7. Données personnelles · RGPD">
        <p>
          Les données personnelles collectées via le site (formulaire de
          contact, échanges commerciaux) sont traitées par PROPULSION IA aux
          fins suivantes :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Gestion des demandes de contact</li>
          <li>Relation commerciale</li>
          <li>Fourniture des prestations proposées</li>
        </ul>
        <p>
          <strong>Base légale du traitement :</strong> intérêt légitime et
          exécution de mesures précontractuelles.
        </p>
        <p><strong>Durée de conservation :</strong></p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Données de contact : 3 ans après le dernier échange</li>
          <li>Données contractuelles : durée légale de conservation applicable</li>
        </ul>
        <p>Les données ne sont ni vendues ni cédées à des tiers non autorisés.</p>
        <p>
          Conformément au Règlement (UE) 2016/679 (RGPD), toute personne
          dispose des droits suivants : accès, rectification, effacement,
          limitation, opposition, portabilité.
        </p>
        <p>
          Ces droits peuvent être exercés à l'adresse suivante :{" "}
          <a
            className="link-underline break-all"
            href="mailto:contact@propulsion-ia.services"
          >
            contact@propulsion-ia.services
          </a>
        </p>
        <p>
          En cas de réclamation, l'utilisateur peut saisir la CNIL (
          <a
            className="link-underline"
            href="https://www.cnil.fr"
            target="_blank"
            rel="noreferrer"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Le site peut utiliser des cookies strictement nécessaires à son
          fonctionnement et, le cas échéant, des cookies de mesure d'audience.
        </p>
        <p>
          L'utilisateur peut configurer son navigateur pour refuser tout ou
          partie des cookies.
        </p>
      </LegalSection>

      <LegalSection title="9. Sécurité">
        <p>
          PROPULSION IA met en œuvre des mesures techniques et
          organisationnelles appropriées afin de garantir la sécurité et la
          confidentialité des données traitées.
        </p>
      </LegalSection>

      <LegalSection title="10. Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français.
        </p>
        <p>
          Tout litige relatif à leur interprétation ou à l'utilisation du site
          relève de la compétence exclusive des tribunaux du ressort du siège
          social de PROPULSION IA.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

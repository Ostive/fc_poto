import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Politique de confidentialité · FC Poto",
  description:
    "Politique de confidentialité du site fcpoto.com · gestion des données personnelles par PROPULSION IA, conforme au RGPD."
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout
      index="02"
      title="Politique de confidentialité"
      updated="09 avril 2026"
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
        Protection et gestion de vos données
      </p>
      <p>
        La présente politique de confidentialité a pour objet d'informer les
        utilisateurs du site des modalités de collecte, d'utilisation et de
        protection de leurs données personnelles, conformément au Règlement
        (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés modifiée.
      </p>

      <LegalSection title="1. Responsable du traitement">
        <p>Le responsable du traitement est :</p>
        <p>
          <strong>PROPULSION IA · SASU</strong><br />
          13 impasse Le Domaine de Margaux<br />
          82370 Campsas · France
        </p>
        <p>
          <a
            className="link-underline break-all"
            href="mailto:contact@propulsion-ia.services"
          >
            contact@propulsion-ia.services
          </a>
        </p>
        <p>
          PROPULSION IA est une filiale de la société PROPULSION DIGITALE.
        </p>
        <p>
          Les traitements de données sont réalisés sous la responsabilité
          exclusive de PROPULSION IA, sauf mention contraire contractuelle.
        </p>
      </LegalSection>

      <LegalSection title="2. Données personnelles collectées">
        <p>
          PROPULSION IA collecte uniquement les données strictement nécessaires
          à ses activités professionnelles, notamment :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Identité (nom, prénom)</li>
          <li>Coordonnées professionnelles</li>
          <li>Société, fonction</li>
          <li>Contenus transmis</li>
          <li>Données techniques minimales</li>
        </ul>
        <p>
          Aucune donnée sensible au sens du RGPD n'est collectée
          volontairement.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalités des traitements">
        <p>Les données sont traitées exclusivement pour les finalités suivantes :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Gestion des demandes de contact et d'information</li>
          <li>Relation commerciale B2B</li>
          <li>Exécution des prestations (IA, automatisation, conseil, formation)</li>
          <li>Suivi contractuel et facturation</li>
          <li>Sécurité et bon fonctionnement du site</li>
        </ul>
        <p>
          Les données ne sont jamais utilisées à des fins publicitaires non
          sollicitées.
        </p>
      </LegalSection>

      <LegalSection title="4. Base légale des traitements">
        <p>Les traitements reposent sur :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Intérêt légitime de PROPULSION IA (réponse aux demandes, prospection B2B)</li>
          <li>Exécution de mesures précontractuelles ou contractuelles</li>
          <li>Respect d'obligations légales (comptables, fiscales)</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Confidentialité des clients et des projets">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ocre">
          Point clé · confidentialité totale
        </p>
        <p>
          Les noms des entreprises clientes, partenaires, projets, données
          métiers, documents, processus internes ou informations stratégiques
          ne sont en aucun cas divulgués, publiquement ou à des tiers, sauf
          dans les cas suivants :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Obligation légale ou réglementaire</li>
          <li>Demande expresse et écrite du client concerné</li>
          <li>Nécessité technique encadrée par contrat (sous-traitant, hébergeur)</li>
        </ul>
        <p>
          Les références commerciales ne sont utilisées qu'avec accord écrit
          préalable du client.
        </p>
      </LegalSection>

      <LegalSection title="6. Destinataires des données">
        <p>Les données sont accessibles uniquement :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Aux dirigeants et intervenants habilités de PROPULSION IA</li>
          <li>
            Le cas échéant, à des sous-traitants techniques strictement
            nécessaires (hébergement, outils SaaS, plateformes IA)
          </li>
        </ul>
        <p>
          Les sous-traitants sont contractuellement tenus à une obligation de
          confidentialité et de conformité RGPD.
        </p>
      </LegalSection>

      <LegalSection title="7. Transferts hors Union Européenne">
        <p>
          Certains outils techniques utilisés (hébergement, IA, automatisation)
          peuvent impliquer des transferts de données hors UE.
        </p>
        <p>
          Dans ce cas, PROPULSION IA s'assure que ces transferts sont encadrés
          par :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Clauses contractuelles types</li>
          <li>Niveau de protection adéquat reconnu par la Commission européenne</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Durée de conservation">
        <p>Les données sont conservées pour une durée limitée :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>
            <strong>Données de contact :</strong> 3 ans après le dernier
            échange
          </li>
          <li>
            <strong>Données contractuelles :</strong> durée légale applicable
            (comptabilité, obligations légales)
          </li>
          <li>
            <strong>Données techniques :</strong> durée strictement nécessaire
            à la sécurité
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Sécurité des données">
        <p>
          PROPULSION IA met en œuvre des mesures techniques et
          organisationnelles adaptées afin de garantir :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Confidentialité</li>
          <li>Intégrité</li>
          <li>Disponibilité</li>
        </ul>
        <p>
          Accès restreint, gestion des droits, outils sécurisés, bonnes
          pratiques internes.
        </p>
      </LegalSection>

      <LegalSection title="10. Droits des personnes concernées">
        <p>Conformément au RGPD, toute personne dispose des droits suivants :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Droit d'accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la limitation</li>
          <li>Droit d'opposition</li>
          <li>Droit à la portabilité</li>
        </ul>
        <p>
          Toute demande peut être adressée à :{" "}
          <a
            className="link-underline break-all"
            href="mailto:contact@propulsion-ia.services"
          >
            contact@propulsion-ia.services
          </a>
        </p>
        <p>Une réponse sera apportée dans un délai maximal d'un mois.</p>
        <p>
          En cas de litige, vous pouvez introduire une réclamation auprès de
          la CNIL (
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

      <LegalSection title="11. Cookies">
        <p>Le site peut utiliser :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Des cookies strictement nécessaires au fonctionnement</li>
          <li>Des cookies de mesure d'audience (le cas échéant)</li>
        </ul>
        <p>
          Aucun cookie publicitaire intrusif n'est utilisé sans consentement.
        </p>
        <p>
          L'utilisateur peut configurer son navigateur pour refuser les
          cookies.
        </p>
      </LegalSection>

      <LegalSection title="12. Modification de la politique">
        <p>
          La présente politique peut être modifiée à tout moment pour tenir
          compte des évolutions légales, réglementaires ou techniques.
        </p>
        <p>
          La version applicable est celle publiée sur le site au moment de la
          consultation.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Politique de confidentialité · FC Poto",
  description:
    "Comment le FC Poto collecte, utilise et protège tes données personnelles. Conforme au RGPD."
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
          Le site collecte uniquement les données que tu fournis volontairement,
          notamment via le formulaire de contact ou l'inscription à la lettre
          du club :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Nom, prénom et adresse e-mail</li>
          <li>
            Selon le profil choisi : date de naissance, poste, club précédent
            (candidature joueur) ; volet bénévolat (bénévole) ; entreprise et
            site web (sponsor)
          </li>
          <li>Contenu du message envoyé</li>
          <li>Adresse e-mail pour la lettre mensuelle du club</li>
          <li>
            Données techniques minimales (logs serveur, statistiques d'audience
            anonymes)
          </li>
        </ul>
        <p>
          Aucune donnée sensible au sens du RGPD n'est collectée volontairement.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalités des traitements">
        <p>Les données sont traitées exclusivement pour les finalités suivantes :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Répondre aux demandes envoyées via le formulaire de contact (joueurs, bénévoles, sponsors, presse)</li>
          <li>Gérer la vie associative du FC Poto : licences, événements, communication interne</li>
          <li>Envoyer la lettre du club aux personnes qui s'y sont abonnées</li>
          <li>Tenir des statistiques anonymes sur la fréquentation du site</li>
          <li>Garantir la sécurité et le bon fonctionnement du site</li>
        </ul>
        <p>
          Les données ne sont jamais vendues, louées ou utilisées à des fins
          publicitaires.
        </p>
      </LegalSection>

      <LegalSection title="4. Base légale des traitements">
        <p>Les traitements reposent sur :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Intérêt légitime de l'association (répondre aux demandes, gérer la vie du club)</li>
          <li>Consentement de la personne (inscription à la lettre du club, cookies non essentiels)</li>
          <li>Exécution d'un contrat (engagement de licence, partenariats avec sponsors)</li>
          <li>Respect d'obligations légales (comptables, fiscales, fédérales)</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Confidentialité des membres et licenciés">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ocre">
          Point clé · les coordonnées ne sortent pas du club
        </p>
        <p>
          Les coordonnées des joueurs, joueuses, bénévoles et licenciés ne
          sont jamais transmises à des tiers (autres clubs, sponsors,
          plateformes commerciales) sauf dans les cas suivants :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Obligation légale ou réglementaire</li>
          <li>Accord exprès et écrit de la personne concernée</li>
          <li>Nécessité technique encadrée par contrat (hébergeur du site, outil de fédération sportive)</li>
        </ul>
        <p>
          Les photos publiées sur le site et la lettre du club ne le sont
          qu'avec accord (explicite ou implicite quand la prise de vue se fait
          dans un cadre public, comme un match ou un tournoi).
        </p>
      </LegalSection>

      <LegalSection title="6. Destinataires des données">
        <p>Les données sont accessibles uniquement :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Aux membres habilités du bureau et de l'encadrement du FC Poto</li>
          <li>À PROPULSION IA, éditeur technique du site, pour la maintenance</li>
          <li>Le cas échéant, à l'hébergeur du site et aux outils de fédération sportive (FSGT)</li>
        </ul>
        <p>
          Tous les destinataires sont tenus à une obligation de confidentialité
          et de conformité RGPD.
        </p>
      </LegalSection>

      <LegalSection title="7. Transferts hors Union Européenne">
        <p>
          Certains outils techniques utilisés (hébergement, statistiques
          d'audience) peuvent impliquer des transferts de données hors UE.
        </p>
        <p>
          Dans ce cas, des garanties sont mises en place :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Clauses contractuelles types validées par la Commission européenne</li>
          <li>Pays bénéficiant d'une décision d'adéquation</li>
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
          Pour exercer ces droits, tu peux écrire :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>
            Au club :{" "}
            <a
              className="link-underline break-all"
              href="mailto:footballclub.poto@gmail.com"
            >
              footballclub.poto@gmail.com
            </a>
          </li>
          <li>
            À l'éditeur technique du site (PROPULSION IA) :{" "}
            <a
              className="link-underline break-all"
              href="mailto:contact@propulsion-ia.services"
            >
              contact@propulsion-ia.services
            </a>
          </li>
        </ul>
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

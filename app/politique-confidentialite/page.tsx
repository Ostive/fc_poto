import { LegalLayout, LegalSection, ToFill } from "@/components/LegalLayout";

export const metadata = {
  title: "Politique de confidentialité · FC Poto",
  description: "Comment le FC Poto collecte et traite vos données personnelles."
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout index="02" title="Politique de confidentialité" updated="21 mai 2026">
      <LegalSection title="Préambule">
        <p>
          Le FC Poto attache une grande importance au respect de la vie privée
          de ses visiteurs, licenciés, bénévoles et partenaires. La présente
          politique décrit comment nous collectons, utilisons et protégeons vos
          données personnelles, dans le respect du Règlement Général sur la
          Protection des Données (RGPD) et de la loi française Informatique et
          Libertés.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Nous collectons des données personnelles uniquement lorsque vous les
          fournissez volontairement, notamment :
        </p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Via le formulaire de contact (« Nous rejoindre ») : nom, prénom, e-mail, profil, message, et éventuellement date de naissance et poste préféré pour les candidatures joueurs.</li>
          <li>Via l'inscription à la newsletter : adresse e-mail.</li>
          <li>Lors de la prise de licence FFF : conformément au formulaire fédéral en vigueur.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalité des traitements">
        <p>Vos données sont utilisées pour :</p>
        <ul className="grid gap-2 list-disc pl-6">
          <li>Répondre à vos demandes de contact.</li>
          <li>Vous envoyer la newsletter du club si vous y avez consenti.</li>
          <li>Gérer les licences et la vie de l'association.</li>
          <li>Tenir des statistiques anonymes sur l'audience du site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Les données issues du formulaire de contact sont conservées <ToFill />
          {" "}(à compléter · typiquement 3 ans pour les demandes générales,
          5 ans pour les candidatures licence).
        </p>
        <p>
          Les adresses e-mail de la newsletter sont conservées tant que vous y
          êtes abonné. Vous pouvez vous désinscrire à tout moment via le lien
          présent dans chaque envoi.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation, de portabilité et
          d'opposition au traitement de vos données. Pour exercer ces droits,
          écrivez à{" "}
          <a className="link-underline break-all" href="mailto:footballclub.poto@gmail.com">
            footballclub.poto@gmail.com
          </a>{" "}
          ou par courrier à l'adresse du siège social.
        </p>
        <p>
          Vous avez également le droit d'introduire une réclamation auprès de
          la <strong>CNIL</strong> (Commission Nationale de l'Informatique et
          des Libertés · <a className="link-underline" href="https://www.cnil.fr" target="_blank" rel="noreferrer">cnil.fr</a>).
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Nous mettons en œuvre les mesures techniques et organisationnelles
          nécessaires pour assurer la sécurité de vos données et empêcher tout
          accès non autorisé. Le site est servi en HTTPS et les formulaires
          sont protégés.
        </p>
      </LegalSection>

      <LegalSection title="Transferts hors UE">
        <p>
          Nos prestataires techniques (hébergement, newsletter, analytics) sont
          situés dans l'Union européenne, à l'exception de <ToFill />{" "}
          (à compléter selon vos choix techniques).
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

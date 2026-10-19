import { useReglages } from '../context/Reglages'

// Conditions d'utilisation : à relire et compléter (nom, contact) avant la mise en ligne.
const SECTIONS: { titre: string; texte: string[] }[] = [
  {
    titre: '1. Le service',
    texte: [
      "IDAcademy est une plateforme de cours en ligne destinée aux étudiants préparant le BTS Informatique Développeur d'Application en Côte d'Ivoire.",
      "Les deux premiers chapitres de chaque matière sont gratuits. L'accès complet (« Premium ») est payant, pour une durée fixée par la formule choisie.",
    ],
  },
  {
    titre: '2. Le compte',
    texte: [
      'Le compte est personnel. Le partage des identifiants entre plusieurs personnes est interdit et peut entraîner la suspension du compte.',
      "L'étudiant est responsable de la confidentialité de son mot de passe.",
    ],
  },
  {
    titre: '3. Paiement et durée',
    texte: [
      "Le paiement se fait par mobile money (Wave, Orange Money, MTN MoMo, Moov Money) ou par Djamo. Après vérification du paiement, l'accès Premium est activé pour la durée de la formule (31 jours pour la formule mensuelle, 93 jours pour le Pass 3 mois).",
      "L'abonnement ne se renouvelle pas automatiquement : aucun prélèvement n'est fait sans action de l'étudiant.",
      "Une référence de transaction fausse ou déjà utilisée entraîne le refus du paiement déclaré.",
    ],
  },
  {
    titre: '4. Remboursement',
    texte: [
      "Un paiement envoyé par erreur (mauvais montant, double paiement) est remboursé sur demande au support dans les 7 jours. Une fois l'accès Premium activé et utilisé, la période payée n'est pas remboursable.",
    ],
  },
  {
    titre: '5. Contenu',
    texte: [
      "Les cours, exercices, sujets et vidéos sont la propriété d'IDAcademy. Leur copie ou leur diffusion en dehors de la plateforme est interdite.",
      'Les sujets types BTS sont des sujets d\'entraînement : ils ne sont pas les sujets officiels de l\'examen.',
    ],
  },
  {
    titre: '6. Données personnelles',
    texte: [
      "IDAcademy conserve seulement les données nécessaires au service : prénom, adresse e-mail, numéro de téléphone (facultatif), progression et historique des paiements. Ces données ne sont ni vendues ni partagées.",
      "L'étudiant peut demander la suppression de son compte et de ses données en écrivant au support.",
    ],
  },
]

export default function Conditions() {
  const { valeurs, lienWhatsapp } = useReglages()
  return (
    <article className="mx-auto mt-4 flex max-w-3xl flex-col gap-5 rounded-[32px] border border-ligne bg-white p-7 sm:p-10">
      <h1 className="m-0 font-display text-3xl font-bold">Conditions d'utilisation</h1>
      {SECTIONS.map((s) => (
        <section key={s.titre} className="flex flex-col gap-2">
          <h2 className="m-0 font-display text-lg font-bold">{s.titre}</h2>
          {s.texte.map((t) => (
            <p key={t} className="m-0 font-semibold leading-relaxed text-gris">
              {t}
            </p>
          ))}
        </section>
      ))}
      <p className="m-0 text-sm font-bold">
        Contact : {valeurs.whatsapp ? <a href={lienWhatsapp('Bonjour IDAcademy, ')}>WhatsApp +{valeurs.whatsapp}</a> : 'support IDAcademy'}
      </p>
    </article>
  )
}

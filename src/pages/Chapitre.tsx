import { Link, Navigate, useParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { trouverMatiere } from '../data/matieres'
import { AccesPremium } from '../components/AccesPremium'
import Introuvable from './Introuvable'

// Chapitre sans leçon : le contenu sera ajouté depuis le back-office.
export default function Chapitre() {
  const { matiere: mSlug, chapitre: cSlug } = useParams()
  const { aAccesComplet } = useSession()
  const matiere = trouverMatiere(mSlug)
  const chapitre = matiere?.chapitres.find((c) => c.slug === cSlug)

  if (!matiere || !chapitre) return <Introuvable />
  if (!chapitre.gratuit && !aAccesComplet) return <AccesPremium titre={chapitre.titre} />
  if (chapitre.lecons[0]) return <Navigate to={`/matieres/${matiere.slug}/${chapitre.slug}/${chapitre.lecons[0].slug}`} replace />

  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 rounded-[32px] border border-ligne bg-white p-10 text-center">
      <span className="rounded-full bg-bleu-clair px-3 py-1.5 text-[13px] font-extrabold text-bleu">{matiere.nom}</span>
      <h1 className="m-0 font-display text-2xl font-bold">{chapitre.titre}</h1>
      <p className="m-0 max-w-md font-semibold text-gris">
        Ce chapitre est en cours de rédaction. En attendant, commence par l'algorithmique, dont les premiers chapitres sont prêts.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Link to="/matieres/algorithmique/variables-et-types/qu-est-ce-qu-un-algorithme" className="flex h-12 items-center rounded-full bg-bleu px-6 font-extrabold text-white no-underline">
          Commencer l'algorithmique
        </Link>
        <Link to={`/matieres/${matiere.slug}`} className="flex h-12 items-center rounded-full border border-ligne px-6 font-bold text-encre no-underline">
          Retour à la matière
        </Link>
      </div>
    </div>
  )
}

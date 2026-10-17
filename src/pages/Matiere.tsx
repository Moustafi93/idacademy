import { Link, useParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { libellesFormation, trouverMatiere } from '../data/matieres'
import { BadgeCode, BadgePremium, BarreProgression } from '../components/ui'
import { progressionMatiere } from '../lib/affichage'
import { IconeCoche, IconeRetour } from '../components/Icones'
import Introuvable from './Introuvable'

export default function Matiere() {
  const { matiere: slug } = useParams()
  const { leconsTerminees, aAccesComplet } = useSession()
  const matiere = trouverMatiere(slug)
  if (!matiere) return <Introuvable />

  return (
    <div className="flex flex-col gap-6">
      <Link to={`/matieres?formation=${matiere.formation}`} className="flex items-center gap-1.5 self-start text-sm font-bold text-bleu no-underline">
        <IconeRetour taille={16} /> {libellesFormation[matiere.formation]}
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-5 rounded-[32px] bg-white p-7 sm:p-9 border border-ligne">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
          <BadgeCode texte={matiere.badge} couleur={matiere.couleur} />
          <h1 className="m-0 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px]">{matiere.nom}</h1>
          <p className="m-0 font-semibold text-gris">
            {matiere.chapitres.length} chapitres · les 2 premiers sont gratuits
          </p>
        </div>
        <div className="min-w-[220px] flex-[0_1_280px]">
          <BarreProgression valeur={progressionMatiere(matiere, leconsTerminees)} />
        </div>
      </header>

      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {matiere.chapitres.map((c, i) => {
          const verrouille = !c.gratuit && !aAccesComplet
          const faites = c.lecons.filter((l) => leconsTerminees.includes(`${matiere.slug}/${c.slug}/${l.slug}`)).length
          const complet = c.lecons.length > 0 && faites === c.lecons.length
          const premiere = c.lecons[0]
          const cible = verrouille
            ? '/abonnement'
            : premiere
              ? `/matieres/${matiere.slug}/${c.slug}/${premiere.slug}`
              : `/matieres/${matiere.slug}/${c.slug}`
          return (
            <li key={c.slug}>
              <Link
                to={cible}
                className={`flex flex-wrap items-center gap-4 rounded-3xl p-5 no-underline transition-colors ${
                  verrouille ? 'border border-dashed border-ligne-forte bg-creme text-gris' : 'border border-ligne bg-white text-encre hover:border-bleu'
                }`}
              >
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${
                    complet ? 'bg-menthe text-menthe-fonce' : 'bg-bleu-clair text-bleu'
                  }`}
                >
                  {complet ? <IconeCoche taille={18} strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold">{c.titre}</span>
                  <span className="block text-[13px] font-semibold text-gris">
                    {c.lecons.length > 0 ? `${faites} / ${c.lecons.length} leçons` : 'Contenu en préparation'}
                  </span>
                </span>
                {c.gratuit ? (
                  <span className="rounded-full bg-menthe px-2.5 py-1.5 text-xs font-extrabold text-menthe-fonce">Gratuit</span>
                ) : (
                  !aAccesComplet && <BadgePremium />
                )}
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

import { Link, useSearchParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { CHAPITRES_GRATUITS, libellesFormation, matieres, slugify } from '../data/matieres'
import type { Formation } from '../data/types'
import { BadgeCode, BarreProgression } from '../components/ui'
import { progressionMatiere } from '../lib/affichage'
import { IconeRecherche } from '../components/Icones'

const ONGLETS: Formation[] = ['professionnelle', 'generale', 'plus-loin']

export default function Catalogue() {
  const [params, setParams] = useSearchParams()
  const { leconsTerminees } = useSession()
  const formation = (params.get('formation') as Formation) ?? 'professionnelle'
  const recherche = params.get('q') ?? ''

  const terme = slugify(recherche)
  const resultats = matieres.filter((m) =>
    terme
      ? slugify(m.nom).includes(terme) || m.chapitres.some((c) => c.slug.includes(terme))
      : m.formation === formation,
  )

  const changer = (cle: string, valeur: string) => {
    const p = new URLSearchParams(params)
    if (valeur) p.set(cle, valeur)
    else p.delete(cle)
    setParams(p, { replace: true })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="m-0 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            21 matières.
            <br />
            <span className="text-bleu">Un seul objectif.</span>
          </h1>
          <p className="m-0 mt-3 text-base font-semibold text-gris">
            Tout le programme du BTS IDA, plus des modules pour aller plus loin.
          </p>
        </div>
        <label className="flex h-[52px] flex-[0_1_360px] items-center gap-2.5 rounded-full border border-ligne bg-white px-4">
          <IconeRecherche className="text-gris" />
          <span className="sr-only">Rechercher une matière ou un chapitre</span>
          <input
            type="search"
            value={recherche}
            onChange={(e) => changer('q', e.target.value)}
            placeholder="Rechercher une matière, un chapitre…"
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-encre outline-none"
          />
        </label>
      </div>

      {!terme && (
        <div role="tablist" aria-label="Type de formation" className="flex flex-wrap gap-2">
          {ONGLETS.map((f) => {
            const actif = f === formation
            const nb = matieres.filter((m) => m.formation === f).length
            return (
              <button
                key={f}
                role="tab"
                aria-selected={actif}
                onClick={() => changer('formation', f)}
                className={`h-11 cursor-pointer rounded-full px-4 text-sm ${
                  actif ? 'border-0 bg-bleu font-extrabold text-white' : 'border border-ligne bg-white font-bold text-encre hover:bg-creme'
                }`}
              >
                {libellesFormation[f]} <span className={actif ? '' : 'text-gris'}>· {nb}</span>
              </button>
            )
          })}
        </div>
      )}

      {terme && (
        <p className="m-0 text-sm font-semibold text-gris">
          {resultats.length} résultat{resultats.length > 1 ? 's' : ''} pour « {recherche} »
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
        {resultats.map((m, i) => {
          const progression = progressionMatiere(m, leconsTerminees)
          const enAvant = i === 0 && !terme && formation === 'professionnelle'
          return (
            <Link
              key={m.slug}
              to={`/matieres/${m.slug}`}
              className={`flex min-h-[200px] flex-col gap-3.5 rounded-[28px] p-6 no-underline transition-transform hover:-translate-y-0.5 ${
                enAvant ? 'bg-bleu text-white' : 'border border-ligne bg-white text-encre'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <BadgeCode texte={m.badge} couleur={enAvant ? 'jaune' : m.couleur} />
                <span className={`text-[13px] font-extrabold ${enAvant ? 'text-bleu-doux' : 'text-gris'}`}>
                  {m.chapitres.length} chapitres
                </span>
              </div>
              <span className="mt-auto font-display text-xl font-semibold leading-snug">{m.nom}</span>
              {progression > 0 ? (
                <BarreProgression valeur={progression} clair={enAvant} />
              ) : (
                <span className={`text-[13px] font-bold ${enAvant ? 'text-bleu-doux' : 'text-gris'}`}>
                  {CHAPITRES_GRATUITS} chapitres gratuits
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

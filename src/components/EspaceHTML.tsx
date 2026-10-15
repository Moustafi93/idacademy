import { useCallback, useRef, useState } from 'react'
import type { ExerciceHTML } from '../data/types'
import { EditeurCode } from './EditeurCode'
import { ApercuHTML } from './ApercuHTML'
import { verifierPage, type ResultatVerification } from '../lib/verifierHTML'
import { IconeCoche } from './Icones'

/*
 * Espace de travail HTML/CSS : éditeur + aperçu en direct + vérification de l'exercice.
 * Utilisé dans la page « Coder » et dans le panneau d'exercice des leçons.
 */
interface Props {
  code: string
  setCode: (c: string) => void
  exercice?: ExerciceHTML
  compact?: boolean
}

export function EspaceHTML({ code, setCode, exercice, compact = false }: Props) {
  const doc = useRef<Document | null>(null)
  const [resultats, setResultats] = useState<ResultatVerification[] | null>(null)

  const verifier = useCallback(() => {
    if (doc.current && exercice) setResultats(verifierPage(doc.current, exercice.verifications))
  }, [exercice])

  const reussi = resultats ? resultats.every((r) => r.ok) : null

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className={`grid grid-cols-1 gap-3 ${compact ? '' : 'lg:grid-cols-2'}`}>
        <EditeurCode
          valeur={code}
          onChange={(c) => {
            setCode(c)
            setResultats(null)
          }}
          hauteurMin={compact ? 200 : 380}
          nomFichier="index.html"
          onExecuter={verifier}
        />
        <ApercuHTML code={code} hauteur={compact ? 220 : 380} onCharge={(d) => (doc.current = d)} titre="Ta page" />
      </div>
      {exercice && (
        <section aria-live="polite" className={`flex flex-col gap-2 rounded-[22px] border border-ligne bg-white ${compact ? 'p-4' : 'px-5 py-4'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-sm font-bold text-encre">Vérification</span>
            {reussi === true && (
              <span className="flex items-center gap-1.5 rounded-full bg-menthe px-3 py-1.5 text-[13px] font-extrabold text-menthe-fonce">
                <IconeCoche taille={12} strokeWidth={3} /> Exercice réussi
              </span>
            )}
            {reussi === false && <span className="rounded-full bg-corail px-3 py-1.5 text-[13px] font-extrabold text-encre">Pas encore le bon résultat</span>}
          </div>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {exercice.verifications.map((v, i) => {
              const r = resultats?.[i]
              return (
                <li key={v.description} className="flex items-start gap-2 text-sm font-semibold text-encre">
                  <span
                    aria-label={r ? (r.ok ? 'Validé' : 'Pas encore') : 'À vérifier'}
                    role="img"
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                      !r ? 'border-2 border-ligne-forte' : r.ok ? 'bg-menthe text-menthe-fonce' : 'bg-corail text-encre'
                    }`}
                  >
                    {r ? (r.ok ? '✓' : '✗') : ''}
                  </span>
                  {v.description}
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={verifier}
            className="mt-1 h-11 cursor-pointer self-start rounded-full border-0 bg-jaune px-5 text-sm font-extrabold text-encre"
          >
            Vérifier ma page
          </button>
        </section>
      )}
    </div>
  )
}

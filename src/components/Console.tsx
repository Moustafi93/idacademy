import type { Resultat } from '../lib/useExecution'
import { IconeCoche } from './Icones'
import { TableSQL } from './TableSQL'

interface Props {
  resultat: Resultat | null
  enCours: boolean
  reussi?: boolean | null
  compact?: boolean
  titre?: string
}

export function Console({ resultat, enCours, reussi = null, compact = false, titre = 'Console' }: Props) {
  const avecTable = !enCours && resultat?.table
  return (
    <section aria-label={titre} aria-live="polite" className={`flex min-w-0 flex-col gap-2 rounded-[28px] border border-ligne bg-white ${compact ? 'p-4' : 'px-6 py-5'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-display text-sm font-bold">{titre}</span>
        {reussi === true && (
          <span className="flex items-center gap-1.5 rounded-full bg-menthe px-3 py-1.5 text-[13px] font-extrabold text-menthe-fonce">
            <IconeCoche taille={12} strokeWidth={3} /> Exercice réussi
          </span>
        )}
        {reussi === false && (
          <span className="rounded-full bg-corail px-3 py-1.5 text-[13px] font-extrabold text-encre">Pas encore le bon résultat</span>
        )}
      </div>
      {avecTable ? (
        <TableSQL table={resultat.table!} />
      ) : (
        <pre className="m-0 min-h-12 whitespace-pre-wrap font-mono text-sm leading-[1.7] text-encre">
          {enCours && <span className="text-gris">Exécution…</span>}
          {!enCours && !resultat && <span className="text-gris">Clique sur « Exécuter » pour voir le résultat ici.</span>}
          {!enCours && resultat && (
            <>
              {resultat.sortie.join('\n')}
              {resultat.message && <span className="text-gris">{resultat.message}</span>}
              {resultat.sortie.length === 0 && !resultat.erreur && !resultat.message && (
                <span className="text-gris">{resultat.table === null ? '(aucun résultat)' : '(aucun affichage)'}</span>
              )}
              {resultat.erreur && (
                <span className="mt-1 block font-bold text-[#C2370B]">
                  {resultat.sortie.length > 0 && '\n'}
                  {resultat.erreur}
                </span>
              )}
            </>
          )}
        </pre>
      )}
    </section>
  )
}

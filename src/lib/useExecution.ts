import { useCallback, useState } from 'react'
import type { Exercice } from '../data/types'
import { executerJavaScript, sortieCorrecte } from './executerCode'
import { executerSQL, memesResultats, type TableResultat } from './executerSQL'

export type Langage = 'javascript' | 'sql' | 'html'

export interface Resultat {
  sortie: string[]
  erreur: string | null
  dureeMs: number
  table?: TableResultat | null
  message?: string | null
}

/*
 * Exécute le code de l'étudiant (JavaScript ou SQL) et indique si l'exercice est réussi.
 *  - JavaScript : on compare l'affichage avec la sortie attendue.
 *  - SQL : on exécute aussi la solution sur la même base, et on compare les deux résultats.
 */
export function useExecution(exercice?: Exercice, langageLibre: Langage = 'javascript', baseLibre = 'scolarite') {
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [reussi, setReussi] = useState<boolean | null>(null)
  const [enCours, setEnCours] = useState(false)
  const langage: Langage = exercice?.langage ?? langageLibre

  const executer = useCallback(
    async (code: string) => {
      if (langage === 'html') return // le HTML est vérifié par EspaceHTML
      setEnCours(true)
      const debut = performance.now()
      if (langage === 'sql') {
        const base = exercice?.langage === 'sql' ? exercice.base : baseLibre
        const r = await executerSQL(code, base)
        const res: Resultat = { sortie: [], erreur: r.erreur, table: r.table, message: r.message, dureeMs: Math.round(performance.now() - debut) }
        setResultat(res)
        if (exercice?.langage === 'sql' && !r.erreur) {
          const attendu = await executerSQL(exercice.solution, base)
          setReussi(memesResultats(r.table, attendu.table, /order\s+by/i.test(exercice.solution)))
        } else setReussi(exercice ? false : null)
      } else {
        const r = await executerJavaScript(code)
        setResultat(r)
        setReussi(exercice?.langage === 'javascript' ? !r.erreur && sortieCorrecte(r.sortie, exercice.sortieAttendue) : null)
      }
      setEnCours(false)
    },
    [langage, exercice, baseLibre],
  )

  const reinitialiser = useCallback(() => {
    setResultat(null)
    setReussi(null)
  }, [])

  return { resultat, enCours, executer, reinitialiser, reussi: resultat ? reussi : null, langage }
}

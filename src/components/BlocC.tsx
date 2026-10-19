import { useState } from 'react'
import { EditeurCode } from './EditeurCode'
import { EntreeClavier } from './EntreeClavier'
import { TexteRiche } from './TexteRiche'
import { executerC, type ResultatC } from '../lib/executerC'
import { IconeLecture } from './Icones'

// Programme C exécutable placé dans une leçon : l'étudiant le lance, le modifie, le relance.
export function BlocC({ code: depart, titre, legende, entree: entreeDepart }: { code: string; titre?: string; legende?: string; entree?: string }) {
  const [code, setCode] = useState(depart)
  const [entree, setEntree] = useState(entreeDepart ?? '')
  const [resultat, setResultat] = useState<ResultatC | null>(null)
  const [enCours, setEnCours] = useState(false)
  const avecClavier = entreeDepart !== undefined || /\bscanf\s*\(/.test(code)

  const executer = async () => {
    setEnCours(true)
    setResultat(await executerC(code, entree))
    setEnCours(false)
  }

  return (
    <figure className="m-0 flex flex-col gap-2.5 rounded-[26px] border-2 border-bleu-clair p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="text-[15px] font-extrabold">{titre ?? 'Essaie ce programme'}</span>
        <span className="rounded-full bg-bleu-clair px-2.5 py-1 text-xs font-extrabold text-bleu">Programme C · tu peux le modifier</span>
      </div>
      <EditeurCode valeur={code} onChange={setCode} hauteurMin={Math.max(70, code.split('\n').length * 27 + 28)} nomFichier="programme.c" onExecuter={executer} />
      {avecClavier && <EntreeClavier valeur={entree} onChange={setEntree} />}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={executer} disabled={enCours} className="flex h-11 cursor-pointer items-center gap-2 rounded-full border-0 bg-jaune px-5 text-sm font-extrabold text-encre disabled:opacity-60">
          <IconeLecture /> Exécuter
        </button>
        {(code !== depart || entree !== (entreeDepart ?? '')) && (
          <button
            type="button"
            onClick={() => {
              setCode(depart)
              setEntree(entreeDepart ?? '')
              setResultat(null)
            }}
            className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-5 text-sm font-bold text-encre"
          >
            Revenir à l'exemple
          </button>
        )}
      </div>
      <div aria-live="polite">
        {enCours && <p className="m-0 px-1 text-sm font-semibold text-gris">Compilation et exécution…</p>}
        {!enCours && resultat && (
          <div className="flex flex-col gap-2">
            {(resultat.sortie.length > 0 || !resultat.erreur) && (
              <pre className="m-0 overflow-x-auto rounded-2xl bg-encre px-4 py-3 font-mono text-sm leading-[1.7] text-[#E6E8F5]">
                {resultat.sortie.length ? resultat.sortie.join('\n') : <span className="text-[#9EA3C2]">(le programme n'a rien affiché)</span>}
              </pre>
            )}
            {resultat.erreur && <p className="m-0 rounded-2xl bg-[#FFE3D6] px-4 py-3 text-sm font-bold text-[#B33A10]">{resultat.erreur}</p>}
          </div>
        )}
      </div>
      {legende && (
        <figcaption className="px-1 text-[15px] font-semibold leading-relaxed text-gris">
          <TexteRiche texte={legende} />
        </figcaption>
      )}
    </figure>
  )
}

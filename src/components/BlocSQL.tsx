import { useState } from 'react'
import { EditeurCode } from './EditeurCode'
import { TableSQL } from './TableSQL'
import { TexteRiche } from './TexteRiche'
import { executerSQL, type ResultatSQL } from '../lib/executerSQL'
import { IconeLecture } from './Icones'

// Petit terminal SQL placé dans une leçon : l'étudiant exécute l'exemple, puis peut le modifier.
export function BlocSQL({ base, requete, titre, legende }: { base: string; requete: string; titre?: string; legende?: string }) {
  const [code, setCode] = useState(requete)
  const [resultat, setResultat] = useState<ResultatSQL | null>(null)
  const [enCours, setEnCours] = useState(false)

  const executer = async () => {
    setEnCours(true)
    setResultat(await executerSQL(code, base))
    setEnCours(false)
  }

  return (
    <figure className="m-0 flex flex-col gap-2.5 rounded-[26px] border-2 border-bleu-clair p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="text-[15px] font-extrabold">{titre ?? 'Essaie cette requête'}</span>
        <span className="rounded-full bg-bleu-clair px-2.5 py-1 text-xs font-extrabold text-bleu">Terminal SQL · tu peux modifier la requête</span>
      </div>
      <EditeurCode valeur={code} onChange={setCode} hauteurMin={Math.max(70, code.split('\n').length * 27 + 28)} nomFichier="requete.sql" onExecuter={executer} />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={executer}
          disabled={enCours}
          className="flex h-11 cursor-pointer items-center gap-2 rounded-full border-0 bg-jaune px-5 text-sm font-extrabold text-encre disabled:opacity-60"
        >
          <IconeLecture /> Exécuter
        </button>
        {code !== requete && (
          <button
            type="button"
            onClick={() => {
              setCode(requete)
              setResultat(null)
            }}
            className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-5 text-sm font-bold text-encre"
          >
            Revenir à l'exemple
          </button>
        )}
      </div>
      <div aria-live="polite">
        {enCours && <p className="m-0 px-1 text-sm font-semibold text-gris">Exécution…</p>}
        {!enCours && resultat?.erreur && <p className="m-0 rounded-2xl bg-[#FFE3D6] px-4 py-3 font-mono text-sm font-bold text-[#B33A10]">{resultat.erreur}</p>}
        {!enCours && resultat?.message && <p className="m-0 px-1 text-sm font-semibold text-gris">{resultat.message}</p>}
        {!enCours && resultat?.table && <TableSQL table={resultat.table} />}
        {!enCours && resultat && !resultat.erreur && !resultat.message && !resultat.table && (
          <p className="m-0 px-1 text-sm font-semibold text-gris">La requête ne renvoie aucune ligne.</p>
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

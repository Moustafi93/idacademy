import { useState } from 'react'
import { EditeurCode } from './EditeurCode'
import { ApercuHTML } from './ApercuHTML'
import { TexteRiche } from './TexteRiche'

// Exemple HTML/CSS dans une leçon : le code à gauche (modifiable), la page à droite.
export function BlocHTML({ code, titre, legende, hauteur = 220 }: { code: string; titre?: string; legende?: string; hauteur?: number }) {
  const [valeur, setValeur] = useState(code)
  const lignes = valeur.split('\n').length
  return (
    <figure className="m-0 flex flex-col gap-2.5 rounded-[26px] border-2 border-bleu-clair p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="text-[15px] font-extrabold">{titre ?? 'Essaie ce code'}</span>
        <span className="flex items-center gap-2">
          {valeur !== code && (
            <button type="button" onClick={() => setValeur(code)} className="cursor-pointer rounded-full border border-ligne bg-white px-3 py-1 text-xs font-bold text-encre">
              Revenir à l'exemple
            </button>
          )}
          <span className="rounded-full bg-bleu-clair px-2.5 py-1 text-xs font-extrabold text-bleu">Modifie le code : la page se met à jour</span>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <EditeurCode valeur={valeur} onChange={setValeur} hauteurMin={Math.max(hauteur, lignes * 27 + 28)} nomFichier="index.html" />
        <ApercuHTML code={valeur} hauteur={Math.max(hauteur, 180)} />
      </div>
      {legende && (
        <figcaption className="px-1 text-[15px] font-semibold leading-relaxed text-gris">
          <TexteRiche texte={legende} />
        </figcaption>
      )}
    </figure>
  )
}

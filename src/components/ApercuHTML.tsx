import { useEffect, useRef, useState } from 'react'

/*
 * Aperçu d'une page HTML/CSS écrite par l'étudiant.
 * L'iframe est « sandboxée » SANS scripts : le JavaScript éventuel ne s'exécute pas,
 * la page ne peut ni ouvrir de fenêtre ni changer la page IDAcademy.
 * allow-same-origin permet seulement à IDAcademy de lire la page pour la vérifier.
 */

interface Props {
  code: string
  hauteur?: number
  delai?: number // attente avant mise à jour pendant la frappe (ms)
  onCharge?: (doc: Document) => void
  titre?: string
}

// Les liens s'ouvriraient dans l'aperçu : on les neutralise avec <base target="_blank">
// (les fenêtres sont bloquées par le sandbox).
function preparer(code: string) {
  const base = '<base target="_blank">'
  return /<head[^>]*>/i.test(code) ? code.replace(/<head([^>]*)>/i, `<head$1>${base}`) : base + code
}

export function ApercuHTML({ code, hauteur = 260, delai = 300, onCharge, titre = 'Aperçu' }: Props) {
  const [source, setSource] = useState(() => preparer(code))
  const cadre = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setSource(preparer(code)), delai)
    return () => clearTimeout(t)
  }, [code, delai])

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-ligne bg-white">
      <div className="flex items-center gap-2 border-b border-ligne bg-creme px-4 py-2">
        <span aria-hidden className="size-2.5 rounded-full bg-corail" />
        <span aria-hidden className="size-2.5 rounded-full bg-jaune" />
        <span aria-hidden className="size-2.5 rounded-full bg-menthe" />
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-xs font-bold text-gris">{titre}</span>
      </div>
      <iframe
        ref={cadre}
        title={titre}
        sandbox="allow-same-origin"
        srcDoc={source}
        onLoad={() => {
          const doc = cadre.current?.contentDocument
          if (doc && onCharge) onCharge(doc)
        }}
        className="w-full border-0 bg-white"
        style={{ height: hauteur }}
      />
    </div>
  )
}

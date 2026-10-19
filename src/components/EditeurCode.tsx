import { useId, useRef, type KeyboardEvent } from 'react'

interface Props {
  valeur: string
  onChange: (v: string) => void
  nomFichier?: string
  hauteurMin?: number
  onExecuter?: () => void
}

/*
 * Éditeur de code léger (zone de texte + numéros de ligne).
 * Volontairement simple pour la version 1 : il sera remplacé par Monaco Editor
 * (le moteur de VS Code) quand on ajoutera la coloration syntaxique.
 */
export function EditeurCode({ valeur, onChange, nomFichier = 'programme.js', hauteurMin = 260, onExecuter }: Props) {
  const zone = useRef<HTMLTextAreaElement>(null)
  const idZone = useId()
  const nbLignes = Math.max(valeur.split('\n').length, 1)

  const gererTouches = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Entrée : exécuter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && onExecuter) {
      e.preventDefault()
      onExecuter()
      return
    }
    // Tabulation : insérer deux espaces au lieu de quitter la zone
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      const el = e.currentTarget
      const debut = el.selectionStart
      const fin = el.selectionEnd
      onChange(valeur.slice(0, debut) + '  ' + valeur.slice(fin))
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = debut + 2
      })
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] bg-encre">
      <div className="flex items-center gap-2 border-b border-[#262A42] px-5 py-3">
        <span className="size-3 rounded-full bg-corail" aria-hidden />
        <span className="size-3 rounded-full bg-jaune" aria-hidden />
        <span className="size-3 rounded-full bg-menthe" aria-hidden />
        <span className="ml-2 font-mono text-[13px] text-[#A9ADC6]">{nomFichier}</span>
        <span className="ml-auto hidden text-xs font-semibold text-[#A9ADC6] sm:inline">Ctrl + Entrée pour exécuter</span>
      </div>
      <div className="flex overflow-auto font-mono text-[15px] leading-[1.8]" style={{ minHeight: hauteurMin }}>
        <div aria-hidden className="select-none py-3.5 pl-3 pr-4 text-right text-[#575C7C]">
          {Array.from({ length: nbLignes }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <label htmlFor={idZone} className="sr-only">
          Ton code
        </label>
        <textarea
          id={idZone}
          data-zone-code
          ref={zone}
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={gererTouches}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          className="flex-1 resize-none border-0 bg-transparent py-3.5 pr-4 font-mono text-[15px] leading-[1.8] text-[#E6E8F5] caret-jaune outline-none"
          style={{ minHeight: hauteurMin }}
        />
      </div>
    </div>
  )
}

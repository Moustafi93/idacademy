import { Fragment } from 'react'

// Affiche un texte en gérant **gras** et `code`.
export function TexteRiche({ texte }: { texte: string }) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {morceaux.map((m, i) => {
        if (m.startsWith('**') && m.endsWith('**')) return <strong key={i}>{m.slice(2, -2)}</strong>
        if (m.startsWith('`') && m.endsWith('`'))
          return (
            <code key={i} className="rounded-md bg-creme px-1.5 py-0.5 font-mono text-[0.9em] text-encre">
              {m.slice(1, -1)}
            </code>
          )
        return <Fragment key={i}>{m}</Fragment>
      })}
    </>
  )
}

import { useState } from 'react'

interface Props {
  question: string
  options: string[]
  bonneReponse: number
  explication: string
}

export function Quiz({ question, options, bonneReponse, explication }: Props) {
  const [choix, setChoix] = useState<number | null>(null)
  const repondu = choix !== null
  const juste = choix === bonneReponse

  return (
    <fieldset className="m-0 mt-1.5 flex flex-col gap-3 rounded-3xl border-0 bg-menthe p-6 text-menthe-fonce">
      <legend className="float-left p-0 font-display text-[15px] font-bold">Mini-quiz</legend>
      <p className="clear-both m-0 text-[17px] font-extrabold">{question}</p>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option, i) => {
          const estBonne = repondu && i === bonneReponse
          const estFausse = repondu && i === choix && !juste
          return (
            <button
              key={option}
              type="button"
              disabled={repondu}
              onClick={() => setChoix(i)}
              aria-pressed={choix === i}
              className={`h-12 min-w-24 cursor-pointer rounded-full border-0 px-5 text-[15px] font-extrabold transition-colors disabled:cursor-default ${
                estBonne ? 'bg-menthe-fonce text-white' : estFausse ? 'bg-orange text-encre' : 'bg-white text-encre hover:bg-fond'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
      {repondu && (
        <div role="status" className="flex flex-wrap items-start gap-3 rounded-2xl bg-white/70 p-4 text-[15px] font-semibold leading-relaxed">
          <span>
            <strong>{juste ? 'Bravo, c\'est juste !' : 'Pas tout à fait.'}</strong> {explication}
          </span>
          {!juste && (
            <button type="button" onClick={() => setChoix(null)} className="ml-auto cursor-pointer rounded-full border-0 bg-menthe-fonce px-4 py-2 text-sm font-extrabold text-white">
              Réessayer
            </button>
          )}
        </div>
      )}
    </fieldset>
  )
}

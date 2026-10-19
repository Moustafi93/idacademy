import { useState } from 'react'
import type { BlocLecon } from '../data/types'
import { Quiz } from './Quiz'
import { TexteRiche } from './TexteRiche'
import { BlocSQL } from './BlocSQL'
import { BlocHTML } from './BlocHTML'
import { BlocC } from './BlocC'
import { DiagrammeFlux } from './DiagrammeFlux'

type Bloc<T extends BlocLecon['type']> = Extract<BlocLecon, { type: T }>

const nomsLangages = { algo: 'Algorithme', javascript: 'JavaScript', c: 'Langage C', pascal: 'Pascal', sql: 'SQL', html: 'HTML', css: 'CSS', console: 'Terminal' }

function BlocCode({ bloc }: { bloc: Bloc<'code'> }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <div className="overflow-hidden rounded-[22px] bg-encre">
        <div className="flex items-center justify-between gap-3 border-b border-[#262A42] px-5 py-2.5">
          <span className="text-[13px] font-bold text-[#E6E8F5]">{bloc.titre ?? nomsLangages[bloc.langage]}</span>
          <span className="rounded-full bg-[#262A42] px-2.5 py-0.5 font-mono text-[11px] font-bold text-jaune">{nomsLangages[bloc.langage]}</span>
        </div>
        <pre className="m-0 overflow-x-auto px-6 py-4 font-mono text-[15px] leading-[1.8] text-[#E6E8F5]">{bloc.code}</pre>
      </div>
      {bloc.legende && (
        <figcaption className="px-1 text-[15px] font-semibold leading-relaxed text-gris">
          <TexteRiche texte={bloc.legende} />
        </figcaption>
      )}
    </figure>
  )
}

function BlocTableau({ bloc }: { bloc: Bloc<'tableau'> }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      {bloc.titre && <figcaption className="text-[15px] font-extrabold">{bloc.titre}</figcaption>}
      <div className="overflow-x-auto rounded-[20px] border border-ligne">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-bleu-clair">
              {bloc.entetes.map((e) => (
                <th key={e} scope="col" className="whitespace-nowrap px-4 py-3 text-[13px] font-extrabold text-bleu">
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloc.lignes.map((ligne, i) => (
              <tr key={i} className="border-t border-ligne odd:bg-white even:bg-fond">
                {ligne.map((cellule, j) => (
                  <td key={j} className={`whitespace-pre-line px-4 py-2.5 align-top ${j === 0 ? 'font-bold' : 'font-medium'} ${/[←=(]/.test(cellule) ? 'font-mono text-[14px]' : ''}`}>
                    <TexteRiche texte={cellule} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bloc.legende && (
        <p className="m-0 px-1 text-[15px] font-semibold leading-relaxed text-gris">
          <TexteRiche texte={bloc.legende} />
        </p>
      )}
    </figure>
  )
}

const stylesEncadre = {
  retenir: { fond: 'bg-bleu text-white', titre: 'text-jaune', puce: 'bg-jaune' },
  attention: { fond: 'bg-[#FFE3D6] text-encre', titre: 'text-[#B33A10]', puce: 'bg-orange' },
  astuce: { fond: 'bg-jaune text-encre', titre: 'text-encre', puce: 'bg-encre' },
  exemple: { fond: 'bg-creme text-encre', titre: 'text-bleu', puce: 'bg-bleu' },
}
const iconesEncadre = { retenir: 'À retenir', attention: 'Attention', astuce: 'Astuce', exemple: 'Exemple' }

function BlocEncadre({ bloc }: { bloc: Bloc<'encadre'> }) {
  const s = stylesEncadre[bloc.variante]
  return (
    <aside className={`flex flex-col gap-2.5 rounded-3xl px-6 py-5 ${s.fond}`} aria-label={iconesEncadre[bloc.variante]}>
      <p className={`m-0 font-display text-base font-bold ${s.titre}`}>{bloc.titre}</p>
      {bloc.contenu && (
        <p className="m-0 text-[16px] font-medium leading-relaxed">
          <TexteRiche texte={bloc.contenu} />
        </p>
      )}
      {bloc.elements && (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {bloc.elements.map((el) => (
            <li key={el} className="flex gap-2.5 text-[16px] font-medium leading-relaxed">
              <span aria-hidden className={`mt-2.5 size-1.5 shrink-0 rounded-full ${s.puce}`} />
              <span>
                <TexteRiche texte={el} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

// Un énoncé peut contenir un algorithme : les paragraphes sur plusieurs lignes sont affichés comme du code.
function Enonce({ texte }: { texte: string }) {
  return (
    <>
      {texte.split('\n\n').map((p, i) =>
        p.includes('\n') ? (
          <pre key={i} className="m-0 overflow-x-auto rounded-2xl bg-encre px-5 py-4 font-mono text-[14px] leading-[1.7] text-[#E6E8F5]">
            {p}
          </pre>
        ) : (
          <p key={i} className="m-0 text-[16px] font-medium leading-relaxed">
            <TexteRiche texte={p} />
          </p>
        ),
      )}
    </>
  )
}

function BlocExercice({ bloc }: { bloc: Bloc<'exercice-corrige'> }) {
  const [ouvert, setOuvert] = useState(false)
  const bts = bloc.niveau === 'bts'
  return (
    <section className={`flex flex-col gap-3.5 rounded-3xl border-2 p-6 ${bts ? 'border-jaune bg-[#FFFBEA]' : 'border-bleu-clair bg-white'}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${bts ? 'bg-jaune text-encre' : 'bg-bleu-clair text-bleu'}`}>
          {bts ? 'Type BTS' : 'Application'}
        </span>
        <h3 className="m-0 font-display text-[17px] font-bold">{bloc.titre}</h3>
      </div>
      <Enonce texte={bloc.enonce} />
      {bloc.questions && (
        <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-6 text-[16px] font-semibold leading-relaxed marker:font-extrabold marker:text-bleu">
          {bloc.questions.map((q) => (
            <li key={q}>
              <TexteRiche texte={q} />
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        className={`h-12 cursor-pointer self-start rounded-full border-0 px-6 text-[15px] font-extrabold ${ouvert ? 'bg-creme text-encre' : 'bg-encre text-white'}`}
      >
        {ouvert ? 'Masquer la correction' : 'Voir la correction'}
      </button>
      {ouvert && (
        <div className="flex flex-col gap-3">
          <pre
            className={`m-0 overflow-x-auto rounded-2xl px-5 py-4 text-[14px] leading-[1.75] ${
              bloc.langage === 'texte' ? 'whitespace-pre-wrap bg-menthe/30 font-sans text-[15px] font-semibold text-encre' : 'bg-encre font-mono text-[#E6E8F5]'
            }`}
          >
            {bloc.solution}
          </pre>
          <div className="rounded-2xl bg-menthe px-5 py-4 text-menthe-fonce">
            <p className="m-0 mb-1 font-display text-sm font-bold">Explication</p>
            <p className="m-0 text-[15px] font-semibold leading-relaxed">
              <TexteRiche texte={bloc.explication} />
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export function BlocLeconVue({ bloc }: { bloc: BlocLecon }) {
  switch (bloc.type) {
    case 'titre':
      return <h2 className="m-0 mt-4 font-display text-[22px] font-bold leading-snug tracking-tight sm:text-2xl">{bloc.contenu}</h2>
    case 'texte':
      return (
        <p className="m-0 text-[17px] leading-[1.75]">
          <TexteRiche texte={bloc.contenu} />
        </p>
      )
    case 'liste': {
      const Balise = bloc.numerotee ? 'ol' : 'ul'
      return (
        <Balise className={`m-0 flex flex-col gap-2 pl-6 text-[17px] leading-[1.7] ${bloc.numerotee ? 'list-decimal' : 'list-disc'}`}>
          {bloc.elements.map((el) => (
            <li key={el} className="pl-1 marker:font-bold marker:text-bleu">
              <TexteRiche texte={el} />
            </li>
          ))}
        </Balise>
      )
    }
    case 'code':
      return <BlocCode bloc={bloc} />
    case 'tableau':
      return <BlocTableau bloc={bloc} />
    case 'encadre':
      return <BlocEncadre bloc={bloc} />
    case 'definition':
      return (
        <aside className="flex flex-col gap-1 rounded-3xl border-2 border-dashed border-jaune px-6 py-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gris">Dictionnaire</span>
          <span className="font-display text-lg font-bold">{bloc.mot}</span>
          <span className="text-[16px] font-medium leading-relaxed">
            Anglais : <em>{bloc.anglais}</em>. {bloc.definition}
          </span>
        </aside>
      )
    case 'quiz':
      return <Quiz {...bloc} />
    case 'exercice-corrige':
      return <BlocExercice bloc={bloc} />
    case 'sql':
      return <BlocSQL {...bloc} />
    case 'flux':
      return <DiagrammeFlux {...bloc} />
    case 'html':
      return <BlocHTML {...bloc} />
    case 'c':
      return <BlocC {...bloc} />
  }
}

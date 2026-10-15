import { Link } from 'react-router-dom'
import type { Couleur } from '../data/types'
import { classesCouleur } from '../lib/affichage'
import { IconeCadenas } from './Icones'


export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline text-encre" aria-label="IDAcademy, accueil">
      <span className="grid size-10 -rotate-6 place-items-center rounded-xl bg-bleu font-mono text-[15px] font-bold text-white">
        &lt;/&gt;
      </span>
      <span className="font-display text-xl font-bold tracking-tight">IDAcademy</span>
    </Link>
  )
}

export function BadgeCode({ texte, couleur }: { texte: string; couleur: Couleur }) {
  return (
    <span className={`inline-flex self-start rounded-full px-3 py-1.5 font-mono text-[13px] font-bold ${classesCouleur[couleur]}`}>
      {texte}
    </span>
  )
}

export function BarreProgression({ valeur, clair = false }: { valeur: number; clair?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`h-2 flex-1 overflow-hidden rounded ${clair ? 'bg-[#4A5BFF]' : 'bg-creme'}`}
        role="progressbar"
        aria-valuenow={valeur}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`h-2 rounded ${clair ? 'bg-jaune' : 'bg-bleu'}`} style={{ width: `${valeur}%` }} />
      </div>
      <span className={`text-[13px] font-extrabold ${clair ? 'text-white' : 'text-gris'}`}>{valeur}%</span>
    </div>
  )
}

export function BadgePremium() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-encre px-2.5 py-1.5 text-xs font-extrabold text-jaune">
      <IconeCadenas taille={12} />
      Premium
    </span>
  )
}

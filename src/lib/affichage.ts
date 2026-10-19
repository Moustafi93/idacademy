import type { Couleur, Matiere } from '../data/types'

export const classesCouleur: Record<Couleur, string> = {
  bleu: 'bg-bleu text-white',
  jaune: 'bg-jaune text-encre',
  menthe: 'bg-menthe text-menthe-fonce',
  corail: 'bg-corail text-encre',
}

export function progressionMatiere(matiere: Matiere, terminees: string[]): number {
  const ids = matiere.chapitres.flatMap((c) => c.lecons.map((l) => `${matiere.slug}/${c.slug}/${l.slug}`))
  if (ids.length === 0) return 0
  return Math.round((ids.filter((id) => terminees.includes(id)).length / ids.length) * 100)
}

// 3000 → « 3 000 F »
export function formaterPrix(prix: number) {
  return `${String(prix).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} F`
}

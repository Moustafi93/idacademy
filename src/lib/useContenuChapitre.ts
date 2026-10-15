import { useEffect, useState } from 'react'
import type { Chapitre, Lecon } from '../data/types'
import { AccesRefuse, chargerChapitrePremium } from './contenuPremium'

type Etat = { cle: string; lecons: Lecon[] | null; erreur: 'acces' | 'reseau' | null }

/*
 * Renvoie les leçons complètes d'un chapitre.
 * Chapitre gratuit : immédiat. Chapitre premium : téléchargé quand `actif` est vrai.
 */
export function useContenuChapitre(matiereSlug: string | undefined, chapitre: Chapitre | undefined, actif: boolean) {
  const cle = `${matiereSlug}/${chapitre?.slug}`
  const distant = !!chapitre?.lecons.some((l) => l.distante)
  const [etat, setEtat] = useState<Etat>({ cle: '', lecons: null, erreur: null })
  const [essai, setEssai] = useState(0)

  useEffect(() => {
    if (!distant || !actif) return
    let annule = false
    chargerChapitrePremium(cle)
      .then((lecons) => !annule && setEtat({ cle, lecons, erreur: null }))
      .catch((e) => !annule && setEtat({ cle, lecons: null, erreur: e instanceof AccesRefuse ? 'acces' : 'reseau' }))
    return () => {
      annule = true
    }
  }, [cle, distant, actif, essai])

  if (!chapitre) return { lecons: null, chargement: false, erreur: null, reessayer: () => {} }
  if (!distant) return { lecons: chapitre.lecons, chargement: false, erreur: null, reessayer: () => {} }
  const courant = etat.cle === cle ? etat : { lecons: null, erreur: null }
  return {
    lecons: courant.lecons,
    chargement: actif && !courant.lecons && !courant.erreur,
    erreur: courant.erreur,
    reessayer: () => {
      setEtat({ cle: '', lecons: null, erreur: null })
      setEssai((n) => n + 1)
    },
  }
}

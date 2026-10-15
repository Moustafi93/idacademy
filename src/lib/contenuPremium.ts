import type { Lecon } from '../data/types'
import { MODE_SERVEUR, supabase } from './supabase'

/*
 * Téléchargement du contenu d'un chapitre premium (« matiere/chapitre »).
 *  - Production : depuis la table contenu_premium. Les règles du serveur refusent
 *    le contenu si l'étudiant n'a pas d'accès complet en cours.
 *  - Mode démo : depuis les fichiers du projet (ce code disparaît du site en production).
 */
const cache = new Map<string, Promise<Lecon[]>>()

export class AccesRefuse extends Error {}

async function telecharger(cle: string): Promise<Lecon[]> {
  if (MODE_SERVEUR) {
    if (!supabase) throw new Error('Supabase mal configuré')
    const { data, error } = await supabase.from('contenu_premium').select('lecons').eq('cle', cle).maybeSingle()
    if (error) throw new Error(error.message)
    if (!data) throw new AccesRefuse('Contenu réservé aux abonnés')
    return data.lecons as Lecon[]
  }
  const { CHAPITRES_PREMIUM } = await import('../data/premium/chapitres')
  const charger = CHAPITRES_PREMIUM[cle]
  if (!charger) throw new Error(`Chapitre premium inconnu : ${cle}`)
  return charger()
}

export function chargerChapitrePremium(cle: string): Promise<Lecon[]> {
  let promesse = cache.get(cle)
  if (!promesse) {
    promesse = telecharger(cle)
    cache.set(cle, promesse)
    promesse.catch(() => cache.delete(cle)) // on pourra réessayer (ex. après paiement)
  }
  return promesse
}

// À appeler à la déconnexion : le contenu téléchargé n'est plus accessible
export function viderCachePremium() {
  cache.clear()
}

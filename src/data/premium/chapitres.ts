import type { Lecon } from '../types'
import { preparerLecons } from '../preparer'

/*
 * Chapitres PREMIUM rédigés, indexés par « matiere/chapitre ».
 *
 * En production (Supabase configuré), ce fichier n'est PAS inclus dans le site :
 * le script `npm run premium` l'exporte vers supabase/contenu_premium.sql, et le site
 * télécharge chaque chapitre depuis la base, seulement si l'étudiant a un accès complet.
 * En mode démo (sans Supabase), le site le charge directement.
 *
 * Pour ajouter un chapitre premium : l'ajouter ici, puis lancer `npm run premium`.
 */
export const CHAPITRES_PREMIUM: Record<string, () => Promise<Lecon[]>> = {
  'base-de-donnees/requetes-select': async () => {
    const [{ leconsSelect }, { exemplesBDPremium }] = await Promise.all([import('../bd/chapitre5-requetes-select'), import('../exemples/bd-premium')])
    return preparerLecons(leconsSelect, exemplesBDPremium)
  },
  'base-de-donnees/jointures-et-regroupements': async () => {
    const [{ leconsJointures }, { exemplesBDPremium }] = await Promise.all([import('../bd/chapitre6-jointures'), import('../exemples/bd-premium')])
    return preparerLecons(leconsJointures, exemplesBDPremium)
  },
  'langages-pascal-et-c/conditions-et-boucles': async () => {
    const [{ leconsConditionsBouclesC }, { exemplesCPremium }] = await Promise.all([import('../c/chapitre3-conditions-boucles'), import('../exemples/c-premium')])
    return preparerLecons(leconsConditionsBouclesC, exemplesCPremium)
  },
}

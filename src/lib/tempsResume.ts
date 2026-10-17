import type { SceneResume } from '../data/types'

/*
 * Rythme du résumé vidéo : durée de chaque étape d'animation, en millisecondes.
 */

const DUREE_ETAPE: Record<SceneResume['type'], number> = { titre: 2600, points: 1800, code: 1500, comparaison: 1700, exemple: 3200, defi: 4500 }
export const PAUSE_FIN_SCENE = 1400
// Temps de réflexion laissé à l'étudiant avant d'afficher la réponse d'un défi
export const REFLEXION_DEFI = 8000

export function dureeEtape(s: SceneResume, etape: number) {
  return s.type === 'defi' && etape === 0 ? REFLEXION_DEFI : DUREE_ETAPE[s.type]
}

export function nbEtapes(s: SceneResume) {
  switch (s.type) {
    case 'titre':
      return 1
    case 'points':
      return s.points.length
    case 'code':
      return s.etapes.length
    case 'comparaison':
      return s.colonnes.length
    case 'exemple':
      return 3
    case 'defi':
      return 2
  }
}

// Durée approximative d'un résumé (animations + voix), arrondie à 30 secondes
export function estimerDuree(scenes: SceneResume[]) {
  const mots = (t?: string) => (t ? t.split(/\s+/).length : 0)
  const ms = scenes.reduce((total, s) => {
    let animation = PAUSE_FIN_SCENE
    for (let e = 0; e < nbEtapes(s); e++) animation += dureeEtape(s, e)
    const voix = ((mots(s.narration) + (s.type === 'defi' ? mots(s.narrationReponse ?? s.explication ?? s.reponse) : 0)) / 2.4) * 1000
    return total + Math.max(animation, voix + PAUSE_FIN_SCENE)
  }, 0)
  const demiMinutes = Math.max(1, Math.round(ms / 30000))
  const minutes = Math.floor(demiMinutes / 2)
  return demiMinutes % 2 ? (minutes ? `${minutes} min 30` : '30 s') : `${minutes} min`
}

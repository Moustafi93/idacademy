import type { Lecon, SceneResume } from './types'
import { estimerDuree } from '../lib/tempsResume'

/*
 * Prépare les leçons d'un chapitre : ajoute à la fin de chaque résumé vidéo
 * les exemples concrets et le défi, puis recalcule la durée du résumé.
 * Utilisé pour les chapitres gratuits (au chargement du site) et premium (à l'export).
 */
export function preparerLecons(lecons: Lecon[], exemples: Record<string, SceneResume[]>): Lecon[] {
  return lecons.map((l) => {
    if (!l.resume) return l
    const scenes = [...l.resume.scenes, ...(exemples[l.slug] ?? [])]
    return { ...l, resume: { ...l.resume, scenes, duree: estimerDuree(scenes) } }
  })
}

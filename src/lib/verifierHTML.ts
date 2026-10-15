import type { VerificationHTML } from '../data/types'

/*
 * Vérifie une page HTML affichée dans l'aperçu.
 * Chaque vérification cherche des éléments avec un sélecteur CSS, puis filtre
 * selon le texte, un attribut ou un style calculé par le navigateur.
 */

export interface ResultatVerification {
  description: string
  ok: boolean
}

const normaliserTexte = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

// Convertit une valeur CSS attendue (« blue », « #2438F0 », « 20px »…) dans le format
// que le navigateur renvoie pour les styles calculés (« rgb(36, 56, 240) »…)
function valeurCalculee(doc: Document, propriete: string, valeur: string): string {
  const temoin = doc.createElement('div')
  // Sans style de bordure, le navigateur calcule une épaisseur de 0 : on en met un
  if (/^border.*width$/.test(propriete)) temoin.style.borderStyle = 'solid'
  temoin.style.setProperty(propriete, valeur)
  temoin.style.display = 'none'
  doc.body.appendChild(temoin)
  const resultat = doc.defaultView?.getComputedStyle(temoin).getPropertyValue(propriete) ?? valeur
  temoin.remove()
  return resultat.trim()
}

export function verifierPage(doc: Document, verifications: VerificationHTML[]): ResultatVerification[] {
  return verifications.map((v) => {
    let elements: Element[] = []
    try {
      elements = Array.from(doc.querySelectorAll(v.selecteur))
    } catch {
      return { description: v.description, ok: false }
    }
    if (v.texte) elements = elements.filter((e) => normaliserTexte(e.textContent ?? '').includes(normaliserTexte(v.texte!)))
    if (v.attribut) {
      const [nom, valeur] = v.attribut
      elements = elements.filter((e) => e.hasAttribute(nom) && (valeur === undefined || e.getAttribute(nom)?.trim() === valeur))
    }
    if (v.style) {
      const [propriete, attendue] = v.style
      const cible = valeurCalculee(doc, propriete, attendue)
      elements = elements.filter((e) => doc.defaultView?.getComputedStyle(e).getPropertyValue(propriete).trim() === cible)
    }
    return { description: v.description, ok: elements.length >= (v.min ?? 1) }
  })
}

// Lecture/écriture prudente du localStorage (peut être bloqué en navigation privée).
export function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle)
    return brut ? (JSON.parse(brut) as T) : defaut
  } catch {
    return defaut
  }
}

export function ecrire<T>(cle: string, valeur: T): void {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur))
  } catch {
    /* stockage indisponible : on continue sans sauvegarder */
  }
}

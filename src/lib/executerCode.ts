/*
 * Exécute du JavaScript écrit par l'étudiant, directement dans son navigateur.
 * Le code tourne dans un Web Worker : il n'a pas accès à la page,
 * et on l'arrête au bout de quelques secondes (protection contre les boucles infinies).
 * Rien n'est envoyé au serveur : cela ne coûte rien en hébergement.
 */

export interface ResultatExecution {
  sortie: string[]
  erreur: string | null
  dureeMs: number
}

const CODE_WORKER = `
  const sortie = [];
  const formater = (v) => {
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v); } catch { return String(v); }
  };
  const ecrireLigne = (...args) => sortie.push(args.map(formater).join(' '));
  self.console = { log: ecrireLigne, info: ecrireLigne, warn: ecrireLigne, error: ecrireLigne };
  self.onmessage = (e) => {
    try {
      (0, eval)(e.data);
      self.postMessage({ sortie, erreur: null });
    } catch (err) {
      self.postMessage({ sortie, erreur: (err && err.name ? err.name + ' : ' : '') + (err && err.message ? err.message : String(err)) });
    }
  };
`

export function executerJavaScript(code: string, delaiMs = 3000): Promise<ResultatExecution> {
  return new Promise((resolve) => {
    const debut = performance.now()
    const url = URL.createObjectURL(new Blob([CODE_WORKER], { type: 'text/javascript' }))
    const worker = new Worker(url)

    const terminer = (resultat: Omit<ResultatExecution, 'dureeMs'>) => {
      clearTimeout(minuteur)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve({ ...resultat, dureeMs: Math.round(performance.now() - debut) })
    }

    const minuteur = setTimeout(
      () =>
        terminer({
          sortie: [],
          erreur: `Le programme a dépassé ${delaiMs / 1000} secondes. Vérifie qu'il n'y a pas de boucle infinie.`,
        }),
      delaiMs,
    )

    worker.onmessage = (e: MessageEvent<{ sortie: string[]; erreur: string | null }>) => terminer(e.data)
    worker.onerror = (e) => {
      e.preventDefault()
      terminer({ sortie: [], erreur: e.message || 'Erreur de syntaxe' })
    }
    worker.postMessage(code)
  })
}

export function sortieCorrecte(sortie: string[], attendu: string[]): boolean {
  const propre = (l: string[]) => l.map((s) => s.trim()).filter((s) => s.length > 0)
  const a = propre(sortie)
  const b = propre(attendu)
  return a.length === b.length && a.every((ligne, i) => ligne === b[i])
}

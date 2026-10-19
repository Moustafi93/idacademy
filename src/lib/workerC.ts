/*
 * Travailleur (Web Worker) qui exécute un programme C avec PicoC (interpréteur C
 * compilé en WebAssembly). Il tourne à part de la page : si le programme boucle
 * à l'infini, la page arrête simplement le travailleur.
 */
import { RunWithInput } from 'picoc-web'

self.onmessage = async (e: MessageEvent<{ code: string; entree: string }>) => {
  self.postMessage({ type: 'demarre' })
  try {
    const r = await RunWithInput(e.data.code, e.data.entree)
    self.postMessage({ type: 'fini', sortie: r.stdout + r.stderr })
  } catch (err) {
    self.postMessage({ type: 'fini', sortie: '', exception: err instanceof Error ? err.message : String(err) })
  }
}

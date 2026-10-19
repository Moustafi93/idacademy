/*
 * Exécution des programmes C de l'étudiant, dans le navigateur (aucun serveur).
 *
 * PicoC est un vrai interpréteur C, avec quelques particularités qu'on corrige
 * avant l'exécution, sans que l'étudiant le voie :
 *  - « float » y est stocké comme un « double » : dans scanf, %f devient %lf ;
 *  - le mot-clé « const » n'existe pas : on le retire ;
 *  - la dernière ligne affichée sans « \n » resterait invisible : le programme est
 *    lancé par un petit main() qui affiche un retour à la ligne à la fin.
 * Les numéros de ligne des erreurs restent ceux du code de l'étudiant.
 */

export interface ResultatC {
  sortie: string[]
  erreur: string | null
  dureeMs: number
}

const FONCTIONS_STDIO = ['printf', 'scanf', 'puts', 'putchar', 'getchar', 'fgets', 'gets', 'fflush', 'sprintf']
const FONCTIONS_MATH = ['sqrt', 'pow', 'fabs', 'floor', 'ceil', 'round', 'sin', 'cos', 'tan', 'log', 'exp']

export function adapterCode(code: string): string {
  let c = code
    .replace(/\bconst\s+/g, '')
    .replace(/scanf\s*\(\s*"([^"]*)"/g, (appel, format: string) => appel.replace(format, format.replace(/%(\d*)f/g, '%$1lf')))
  const main = c.match(/\b(int|void)\s+main\s*\(([^)]*)\)/)
  if (main) {
    c = c.replace(main[0], `${main[1]} __main_eleve(${main[2]})`)
    const avecArguments = main[2].trim() !== '' && main[2].trim() !== 'void'
    c += avecArguments
      ? `\nint main() { char *__argv[1]; __main_eleve(1, __argv); printf("\\n"); return 0; }\n`
      : `\nint main() { __main_eleve(); printf("\\n"); return 0; }\n`
  }
  return c
}

// Traduit en français les messages d'erreur de PicoC
export function traduireErreurC(message: string, ligne: number | null, nbLignes: number): string {
  const ou = ligne && ligne <= nbLignes ? `Ligne ${ligne} : ` : ''
  const ident = message.match(/'([^']+)' is undefined/)?.[1]
  if (ident) {
    if (ident === '__main_eleve') return "Il manque la fonction main() : tout programme C commence par int main() { … }."
    if (FONCTIONS_STDIO.includes(ident)) return `${ou}« ${ident} » est inconnu : as-tu oublié #include <stdio.h> en haut du programme ?`
    if (FONCTIONS_MATH.includes(ident)) return `${ou}« ${ident} » est inconnu : ajoute #include <math.h> en haut du programme.`
    return `${ou}« ${ident} » n'est pas déclaré. Déclare la variable avant de l'utiliser (ex. int ${ident};) ou vérifie l'orthographe (majuscules comprises).`
  }
  const regles: [RegExp, string][] = [
    [/';' expected/, 'il manque un point-virgule « ; » à la fin de l\'instruction (regarde aussi la ligne précédente).'],
    [/'\)' expected/, 'il manque une parenthèse fermante « ) ».'],
    [/'\(' expected/, 'il manque une parenthèse ouvrante « ( ».'],
    [/'\}' expected/, 'il manque une accolade fermante « } ».'],
    [/'\{' expected/, 'il manque une accolade ouvrante « { ».'],
    [/'\]' expected/, 'il manque un crochet fermant « ] ».'],
    [/(identifier|value|expression) not expected here/, 'il manque sans doute un point-virgule « ; » à la fin de la ligne précédente.'],
    [/identifier expected/, 'un nom (de variable ou de fonction) est attendu ici.'],
    [/'([^']+)' is already defined/, 'ce nom est déjà déclaré : choisis un autre nom de variable.'],
    [/bad type declaration|type not expected/, 'déclaration de type incorrecte (ex. int age;).'],
    [/can't assign|can't set/, 'affectation impossible : les deux côtés du « = » ne sont pas compatibles.'],
    [/expression expected/, 'une valeur ou une expression est attendue ici.'],
    [/unexpected end of file|unterminated/, 'le programme se termine trop tôt : il manque sans doute une accolade « } » ou un guillemet « " ».'],
    [/divide by zero/, 'division par zéro : le diviseur vaut 0.'],
    [/non-pointer argument to scanf/, 'dans scanf, il manque le « & » devant la variable (ex. scanf("%d", &n);).'],
    [/too many arguments|not enough arguments/, 'nombre d\'arguments incorrect dans l\'appel de fonction.'],
  ]
  const trouve = regles.find(([motif]) => motif.test(message))
  return `${ou}${trouve ? trouve[1] : `erreur : ${message}`}`
}

// Sépare l'affichage du programme et le message d'erreur de PicoC
export function analyserSortie(brute: string, exception: string | undefined, nbLignes: number): { sortie: string[]; erreur: string | null } {
  let lignes = brute.replace(/\r/g, '').split('\n')
  let erreur: string | null = null
  if (lignes.some((l) => /main\(\) is not defined/.test(l)))
    return { sortie: [], erreur: 'Il manque la fonction main() : tout programme C commence par int main() { … }.' }
  const i = lignes.findIndex((l) => /^programme\.c:\d+:\d+ /.test(l) || /^file\.c:\d+:\d+ /.test(l))
  if (i >= 0) {
    const [, ligne, message] = lignes[i].match(/:(\d+):\d+ (.*)$/)!
    erreur = traduireErreurC(message, Number(ligne), nbLignes)
    // Les deux lignes avant le message : l'extrait du code et le « ^ » qui montre l'endroit
    const debut = i >= 1 && /^\s*\^\s*$/.test(lignes[i - 1]) ? i - 2 : i
    lignes = lignes.slice(0, Math.max(debut, 0))
  } else if (exception) {
    erreur = traduireErreurC(exception, null, nbLignes)
  }
  while (lignes.length && lignes[lignes.length - 1] === '') lignes.pop()
  if (lignes.length > 500) lignes = [...lignes.slice(0, 500), '… (affichage coupé après 500 lignes)']
  return { sortie: lignes, erreur }
}

export function executerC(code: string, entree = '', delaiMs = 4000): Promise<ResultatC> {
  return new Promise((resolve) => {
    const debut = performance.now()
    const nbLignes = code.split('\n').length
    const travailleur = new Worker(new URL('./workerC.ts', import.meta.url), { type: 'module' })
    let minuteur: ReturnType<typeof setTimeout> | undefined
    const finir = (r: Omit<ResultatC, 'dureeMs'>) => {
      clearTimeout(minuteur)
      clearTimeout(chargement)
      travailleur.terminate()
      resolve({ ...r, dureeMs: Math.round(performance.now() - debut) })
    }
    // Premier lancement : téléchargement du moteur C (une seule fois, ensuite en cache)
    const chargement = setTimeout(() => finir({ sortie: [], erreur: "Le moteur C n'a pas pu se charger. Vérifie ta connexion internet puis réessaie." }), 30000)
    travailleur.onmessage = (e: MessageEvent<{ type: string; sortie?: string; exception?: string }>) => {
      if (e.data.type === 'demarre') {
        clearTimeout(chargement)
        minuteur = setTimeout(
          () => finir({ sortie: [], erreur: "Ton programme ne s'arrête pas (plus de 4 secondes) : vérifie la condition de ta boucle, ou fournis les valeurs attendues par scanf dans « Entrée clavier »." }),
          delaiMs,
        )
      } else {
        finir(analyserSortie(e.data.sortie ?? '', e.data.exception, nbLignes))
      }
    }
    travailleur.onerror = () => finir({ sortie: [], erreur: "Le moteur C n'a pas pu démarrer. Recharge la page et réessaie." })
    travailleur.postMessage({ code: adapterCode(code), entree: entree.endsWith('\n') ? entree : `${entree}\n` })
  })
}

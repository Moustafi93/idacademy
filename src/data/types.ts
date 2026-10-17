export type Formation = 'generale' | 'professionnelle' | 'plus-loin'
export type Couleur = 'bleu' | 'jaune' | 'menthe' | 'corail'

/*
 * Les « blocs » qui composent une leçon.
 * Dans les textes : **mot** = gras, `code` = code dans la phrase.
 */
export type BlocLecon =
  // Sous-titre d'une partie de la leçon
  | { type: 'titre'; contenu: string }
  // Paragraphe d'explication
  | { type: 'texte'; contenu: string }
  // Liste à puces (ou numérotée)
  | { type: 'liste'; elements: string[]; numerotee?: boolean }
  // Bloc de code ou d'algorithme, avec un titre et une explication facultatifs
  | { type: 'code'; langage: 'algo' | 'javascript' | 'c' | 'sql' | 'html' | 'css'; code: string; titre?: string; legende?: string }
  // Tableau : comparaison, tableau de déroulement (trace)…
  | { type: 'tableau'; entetes: string[]; lignes: string[][]; titre?: string; legende?: string }
  // Encadré coloré
  | {
      type: 'encadre'
      variante: 'retenir' | 'attention' | 'astuce' | 'exemple'
      titre: string
      contenu?: string
      elements?: string[]
    }
  // Mot du dictionnaire informatique
  | { type: 'definition'; mot: string; anglais: string; definition: string }
  // Question à choix multiple corrigée
  | { type: 'quiz'; question: string; options: string[]; bonneReponse: number; explication: string }
  // Diagramme des flux Merise (dessiné automatiquement)
  | { type: 'flux'; domaine: string; externes: string[]; internes: string[]; flux: [number, string, string][]; legende?: string }
  // Éditeur HTML/CSS avec aperçu en direct dans la leçon
  | { type: 'html'; code: string; titre?: string; legende?: string; hauteur?: number }
  // Terminal SQL dans la leçon : l'étudiant exécute (et peut modifier) la requête
  | { type: 'sql'; base: string; requete: string; titre?: string; legende?: string }
  // Exercice avec correction cachée (application = entraînement direct, bts = niveau examen)
  | {
      type: 'exercice-corrige'
      niveau?: 'application' | 'bts'
      titre: string
      enonce: string
      questions?: string[]
      solution: string
      explication: string
      langage?: 'algo' | 'javascript' | 'sql' | 'html' | 'texte'
    }

interface ExerciceCommun {
  id: string
  titre: string
  consigne: string
  codeDepart: string
  indice: string
  solution: string
}

// Exercice JavaScript : on compare ce que le programme affiche
export interface ExerciceJS extends ExerciceCommun {
  langage: 'javascript'
  sortieAttendue: string[]
}

// Exercice SQL : on compare le résultat de la requête de l'étudiant
// avec celui de la solution, exécutée sur la même base d'exemple
export interface ExerciceSQL extends ExerciceCommun {
  langage: 'sql'
  base: string
}

// Vérification d'une page HTML : on cherche des éléments avec un sélecteur CSS,
// éventuellement avec un texte, un attribut ou un style précis
export interface VerificationHTML {
  description: string // ce que l'étudiant voit : « La page contient un titre h1 »
  selecteur: string
  min?: number // nombre minimum d'éléments (1 par défaut)
  texte?: string // l'élément contient ce texte (sans tenir compte des majuscules)
  attribut?: [string, string?] // l'élément a cet attribut (et cette valeur)
  style?: [string, string] // propriété CSS calculée et valeur attendue
}

// Exercice HTML/CSS : on affiche la page et on vérifie son contenu
export interface ExerciceHTML extends ExerciceCommun {
  langage: 'html'
  verifications: VerificationHTML[]
}

export type Exercice = ExerciceJS | ExerciceSQL | ExerciceHTML

/*
 * Résumé animé « façon vidéo » : une suite de scènes jouées automatiquement.
 * `narration` = texte lu à voix haute par le navigateur (si le son est activé).
 */
export type SceneResume =
  | { type: 'titre'; titre: string; sousTitre?: string; narration: string }
  | { type: 'points'; titre: string; points: string[]; narration: string }
  | {
      type: 'code'
      titre: string
      lignes: string[]
      etapes: { ligne: number; variables: Record<string, string>; sortie?: string; note?: string }[]
      narration: string
    }
  | { type: 'comparaison'; titre: string; colonnes: { nom: string; texte: string }[]; narration: string }
  // Exemple concret : une situation réelle → la solution (code) → le résultat, révélés l'un après l'autre
  | { type: 'exemple'; titre: string; situation: string; langage: string; code: string[]; resultat: string[]; narration: string }
  // Défi : une question, un temps de réflexion avec compte à rebours, puis la réponse
  | { type: 'defi'; question: string; code?: string[]; reponse: string; explication?: string; narration: string; narrationReponse?: string }

export interface ResumeAnime {
  duree: string
  scenes: SceneResume[]
}

export interface Lecon {
  slug: string
  titre: string
  duree?: string // temps de lecture estimé
  objectifs?: string[]
  resume?: ResumeAnime // résumé animé façon vidéo
  video?: { youtubeId: string; titre: string; duree: string } // vidéo enregistrée (YouTube non répertorié)
  blocs: BlocLecon[]
  exercice?: Exercice
  // Leçon premium dont le contenu (blocs, résumé, exercice) est téléchargé à part
  distante?: boolean
  // Référence de l'exercice d'une leçon distante (pour retrouver l'exercice sans tout télécharger)
  exerciceRef?: { id: string; titre: string; langage: Exercice['langage'] }
}

// Ce qui est public pour une leçon premium : le titre, pas le contenu
export interface LeconMeta {
  slug: string
  titre: string
  duree?: string
  objectifs?: string[]
  exercice?: { id: string; titre: string; langage: Exercice['langage'] }
}

export interface Chapitre {
  slug: string
  titre: string
  gratuit: boolean
  lecons: Lecon[]
}

export interface Matiere {
  slug: string
  nom: string
  formation: Formation
  badge: string
  couleur: Couleur
  chapitres: Chapitre[]
}

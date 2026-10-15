import type { Chapitre, Couleur, Formation, Lecon, Matiere, SceneResume } from './types'
import { leconsBoucles } from './lecons-algo'
import { leconsVariables } from './algo/chapitre1-variables'
import { leconsConditions } from './algo/chapitre2-conditions'
import { leconsModeleRelationnel } from './bd/chapitre1-modele-relationnel'
import { leconsNormalisation } from './bd/chapitre2-normalisation'
import { leconsSystemeInformation } from './merise/chapitre1-systeme-information'
import { leconsDictionnaire } from './merise/chapitre2-dictionnaire'
import { leconsHTML } from './web/chapitre1-html'
import { leconsCSS } from './web/chapitre2-css'
import { exemplesAlgo } from './exemples/algo'
import { exemplesBD } from './exemples/bd'
import { exemplesMerise, exemplesWeb } from './exemples/merise-web'
import { preparerLecons } from './preparer'
import { META_PREMIUM } from './premium/meta.generated'

// Transforme un titre en identifiant d'URL : « Les boucles » → « les-boucles »
export function slugify(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Nombre de chapitres gratuits au début de chaque matière (modèle freemium)
export const CHAPITRES_GRATUITS = 2

function matiere(
  nom: string,
  formation: Formation,
  badge: string,
  couleur: Couleur,
  titresChapitres: string[],
): Matiere {
  const chapitres: Chapitre[] = titresChapitres.map((titre, index) => ({
    slug: slugify(titre),
    titre,
    gratuit: index < CHAPITRES_GRATUITS,
    lecons: [],
  }))
  return { slug: slugify(nom), nom, formation, badge, couleur, chapitres }
}

export const matieres: Matiere[] = [
  // ——— Formation professionnelle ———
  matiere('Algorithmique', 'professionnelle', 'for (i…)', 'bleu', [
    'Variables et types',
    'Les conditions',
    'Les boucles',
    'Les tableaux',
    'Procédures et fonctions',
    'Récursivité',
    'Tris et recherches',
    'Enregistrements et fichiers',
    'Listes chaînées, piles et files',
  ]),
  matiere('Méthodologie Merise', 'professionnelle', 'MCD', 'jaune', [
    "Le système d'information",
    'Dictionnaire de données',
    'Dépendances fonctionnelles',
    'Le MCD',
    'Du MCD au MLD',
    'Le MPD',
    'MCT et MOT',
    'Études de cas type examen',
  ]),
  matiere('Base de données', 'professionnelle', 'SELECT *', 'menthe', [
    'Le modèle relationnel',
    'La normalisation',
    'Algèbre relationnelle',
    'Créer des tables en SQL',
    'Requêtes SELECT',
    'Jointures et regroupements',
    'Sous-requêtes',
    'Mises à jour, contraintes et vues',
  ]),
  matiere('Web', 'professionnelle', '<html>', 'corail', [
    'HTML',
    'CSS',
    'Design responsive',
    'JavaScript',
    'Les formulaires',
    'PHP',
    'PHP et MySQL',
    'Sessions et authentification',
    'Projet : application web complète',
  ]),
  matiere('Langages Pascal et C', 'professionnelle', 'printf()', 'bleu', [
    'Compilation et premier programme',
    'Syntaxe de base',
    'Conditions et boucles',
    'Tableaux et chaînes',
    'Fonctions et procédures',
    'Les pointeurs',
    'Les structures',
    'Les fichiers',
    'Allocation dynamique',
  ]),
  matiere('Visual Basic', 'professionnelle', 'Dim x', 'jaune', [
    "L'environnement de développement",
    'Variables et types',
    'Structures de contrôle',
    'Formulaires et contrôles',
    'Gestion des événements',
    'Procédures et fonctions',
    'Gestion des erreurs',
    'Accès aux bases de données',
    'Projet : application de gestion',
  ]),
  matiere("Système d'exploitation", 'professionnelle', '$ ls -l', 'menthe', [
    "Rôle d'un système d'exploitation",
    'Processus et ordonnancement',
    'Gestion de la mémoire',
    'Système de fichiers',
    'Commandes Windows et Linux',
    'Utilisateurs et droits',
    'Scripts',
  ]),
  matiere('Architecture des ordinateurs et téléinformatique', 'professionnelle', '1010', 'corail', [
    'Systèmes de numération',
    "Codage de l'information",
    'Algèbre de Boole et portes logiques',
    'Processeur, mémoires et bus',
    'Périphériques',
    'Transmission de données',
    'Topologies réseau',
    'Modèle OSI et TCP/IP',
    'Adressage IP',
  ]),
  matiere('Mathématiques du signal', 'professionnelle', 'f(t)', 'bleu', [
    'Nombres complexes',
    'Signaux usuels',
    'Séries de Fourier',
    'Transformée de Laplace',
    'Transformée de Fourier',
    'Échantillonnage',
  ]),
  matiere('Logiciels', 'professionnelle', '=SOMME()', 'jaune', [
    'Traitement de texte',
    'Tableur : formules',
    'Tableur : graphiques',
    'Présentation',
    'Access',
    'Logiciels de gestion',
  ]),
  matiere('Négociation informatique', 'professionnelle', 'Deal', 'menthe', [
    'Communication commerciale',
    'Analyse des besoins du client',
    'Le cahier des charges',
    "Présenter une solution",
    'Techniques de négociation',
    'Traiter les objections',
    'Contrats informatiques',
    'Avant-vente et après-vente',
  ]),
  matiere('Projet', 'professionnelle', 'v1.0', 'corail', [
    'Méthodologie de projet',
    'Le cahier des charges',
    'Planification (Gantt)',
    'Analyse et conception',
    'Développement et tests',
    'Documentation',
    'La soutenance',
    'Projets de BTS corrigés',
  ]),

  // ——— Formation générale ———
  matiere("Technique d'expression", 'generale', 'Aa', 'jaune', [
    'La communication',
    'Prise de notes',
    'Résumé de texte',
    'Synthèse de documents',
    'Correspondance administrative',
    'Compte rendu, rapport et procès-verbal',
    'CV et lettre de motivation',
    "L'exposé oral",
    'Le rapport de stage',
  ]),
  matiere("Anglais appliqué à l'informatique", 'generale', 'EN', 'bleu', [
    'Vocabulaire du matériel',
    'Vocabulaire des logiciels',
    'Grammaire essentielle',
    'Lire une documentation technique',
    'Traduction technique',
    'E-mails professionnels',
    'CV et entretien en anglais',
  ]),
  matiere('Économie générale', 'generale', '€ → F', 'menthe', [
    'Besoins et biens',
    'Agents et circuit économique',
    'La production',
    'Consommation et épargne',
    'Monnaie et financement',
    'Le marché et les prix',
    "Le rôle de l'État",
    'Commerce international',
    'Croissance et développement',
  ]),
  matiere('Économie et organisation des entreprises', 'generale', 'SARL', 'corail', [
    "L'entreprise et sa classification",
    'Les formes juridiques',
    "Les fonctions de l'entreprise",
    'Structures organisationnelles',
    'Management et décision',
    'Gestion des ressources humaines',
    'La stratégie',
    "L'environnement de l'entreprise",
  ]),
  matiere('Comptabilité et contrôle de gestion', 'generale', 'Débit', 'bleu', [
    'Le SYSCOHADA',
    'Bilan et compte de résultat',
    'Journal, grand livre et balance',
    'Achats, ventes et TVA',
    'Amortissements et provisions',
    "Travaux d'inventaire",
    'Les coûts complets',
    'Seuil de rentabilité',
    'Les budgets',
  ]),
  matiere('Droit des affaires et droit du travail', 'generale', '§ OHADA', 'jaune', [
    'Introduction au droit',
    "L'OHADA",
    'Commerçant et actes de commerce',
    'Le fonds de commerce',
    'Les sociétés commerciales',
    'Les contrats',
    'Le contrat de travail',
    'Conditions de travail',
    'Rupture du contrat',
    'Représentation du personnel et CNPS',
  ]),
  matiere('Mathématiques générales, statistiques, probabilités', 'generale', '∑ x²', 'menthe', [
    'Logique et ensembles',
    'Fonctions',
    'Dérivées',
    'Intégrales',
    'Suites',
    'Matrices et systèmes linéaires',
    'Statistiques à une variable',
    'Statistiques à deux variables',
    'Dénombrement',
    'Probabilités',
    'Lois binomiale, de Poisson et normale',
  ]),
  matiere('Recherche opérationnelle', 'generale', 'max z', 'corail', [
    'Programmation linéaire : méthode graphique',
    'La méthode du simplexe',
    'Graphes et plus court chemin',
    'Ordonnancement PERT et MPM',
    'Transport et affectation',
    'Gestion des stocks (Wilson)',
  ]),
  matiere('Mathématiques financières', 'generale', '% i', 'bleu', [
    'Intérêts simples',
    "L'escompte",
    'Intérêts composés',
    'Les annuités',
    "Emprunts et tableaux d'amortissement",
    "Choix d'investissement (VAN, TRI)",
  ]),

  // ——— Aller plus loin ———
  matiere('Python', 'plus-loin', 'def()', 'menthe', ['Les bases', 'Fonctions', 'Listes et dictionnaires', 'Fichiers', 'Programmation orientée objet', 'Mini-projets']),
  matiere('Java', 'plus-loin', 'class', 'corail', ['Les bases', 'Classes et objets', 'Héritage', 'Interfaces', 'Exceptions', 'Collections', 'JDBC']),
  matiere('C# et .NET', 'plus-loin', 'C#', 'bleu', ['Les bases', 'Programmation objet', 'Windows Forms', 'Accès aux données', 'API web']),
  matiere('React', 'plus-loin', '<App />', 'bleu', ['Composants', 'Props', 'État', 'Hooks', 'Routage', "Appel d'API", 'Projet complet']),
  matiere('Git et GitHub', 'plus-loin', 'git push', 'jaune', ['Versions et commits', 'Branches', 'Fusion', 'Travail en équipe', 'Portfolio en ligne']),
  matiere('Insertion professionnelle', 'plus-loin', 'CV', 'menthe', ['CV de développeur', 'Portfolio', 'Trouver un stage', 'Entretien technique', 'Le freelance']),
]

// Exemples concrets et défis ajoutés à la fin des résumés vidéo, par matière
const exemplesParMatiere: Record<string, Record<string, SceneResume[]>> = {
  algorithmique: exemplesAlgo,
  'base-de-donnees': exemplesBD,
  'methodologie-merise': exemplesMerise,
  web: exemplesWeb,
}

function trouverChapitre(matiereSlug: string, chapitreSlug: string) {
  const chapitre = matieres.find((m) => m.slug === matiereSlug)?.chapitres.find((c) => c.slug === chapitreSlug)
  if (!chapitre) throw new Error(`Chapitre introuvable : ${matiereSlug} / ${chapitreSlug}`)
  return chapitre
}

// Contenu rédigé : on branche chaque chapitre sur sa matière
function brancher(matiereSlug: string, chapitreSlug: string, lecons: Lecon[], gratuit?: boolean) {
  const chapitre = trouverChapitre(matiereSlug, chapitreSlug)
  chapitre.lecons = preparerLecons(lecons, exemplesParMatiere[matiereSlug] ?? {})
  if (gratuit !== undefined) chapitre.gratuit = gratuit
}
brancher('algorithmique', 'variables-et-types', leconsVariables)
brancher('algorithmique', 'les-conditions', leconsConditions)
brancher('algorithmique', 'les-boucles', leconsBoucles, true) // chapitre « découverte » offert
brancher('base-de-donnees', 'le-modele-relationnel', leconsModeleRelationnel)
brancher('base-de-donnees', 'la-normalisation', leconsNormalisation)
brancher('methodologie-merise', 'le-systeme-d-information', leconsSystemeInformation)
brancher('methodologie-merise', 'dictionnaire-de-donnees', leconsDictionnaire)
brancher('web', 'html', leconsHTML)
brancher('web', 'css', leconsCSS)

// Chapitres premium : seuls les titres sont dans le site, le contenu est téléchargé à part
// (voir src/data/premium/chapitres.ts et src/lib/contenuPremium.ts)
for (const [cle, metas] of Object.entries(META_PREMIUM)) {
  const [matiereSlug, chapitreSlug] = cle.split('/')
  trouverChapitre(matiereSlug, chapitreSlug).lecons = metas.map(({ exercice, ...m }) => ({
    ...m,
    blocs: [],
    distante: true,
    ...(exercice ? { exerciceRef: exercice } : {}),
  }))
}

export const libellesFormation: Record<Formation, string> = {
  generale: 'Formation générale',
  professionnelle: 'Formation professionnelle',
  'plus-loin': 'Aller plus loin',
}

export function trouverMatiere(slug: string | undefined) {
  return matieres.find((m) => m.slug === slug)
}

export function trouverLecon(matiereSlug?: string, chapitreSlug?: string, leconSlug?: string) {
  const m = trouverMatiere(matiereSlug)
  const c = m?.chapitres.find((ch) => ch.slug === chapitreSlug)
  const index = c?.lecons.findIndex((l) => l.slug === leconSlug) ?? -1
  const lecon = c && index >= 0 ? c.lecons[index] : undefined
  return { matiere: m, chapitre: c, lecon, index }
}

// Première leçon du chapitre qui suit (pour enchaîner les chapitres)
export function chapitreSuivant(matiereSlug: string, chapitreSlug: string) {
  const m = trouverMatiere(matiereSlug)
  if (!m) return undefined
  const i = m.chapitres.findIndex((c) => c.slug === chapitreSlug)
  const suivant = m.chapitres[i + 1]
  return suivant && suivant.lecons.length > 0 ? { chapitre: suivant, lecon: suivant.lecons[0] } : undefined
}

export function tousLesExercices() {
  return matieres.flatMap((m) =>
    m.chapitres.flatMap((c) =>
      c.lecons.flatMap((l) => (l.exercice ? [{ matiere: m, chapitre: c, lecon: l, exercice: l.exercice }] : [])),
    ),
  )
}

export type ExerciceTrouve = ReturnType<typeof tousLesExercices>[number]

// Exercice d'une leçon premium (son contenu n'est pas encore téléchargé)
export function trouverExerciceDistant(id: string) {
  for (const m of matieres)
    for (const c of m.chapitres) {
      const index = c.lecons.findIndex((l) => l.exerciceRef?.id === id)
      if (index >= 0) return { matiere: m, chapitre: c, index }
    }
  return undefined
}

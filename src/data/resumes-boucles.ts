import type { ResumeAnime } from './types'

/*
 * Résumés animés du chapitre « Les boucles ».
 * Chaque scène de type « code » rejoue l'algorithme pas à pas :
 * `ligne` = ligne en cours (à partir de 0), `variables` = valeurs à cet instant,
 * `sortie` = ce qui s'affiche à cette étape.
 */

export const resumeLecon1: ResumeAnime = {
  duree: '1 min 30',
  scenes: [
    {
      type: 'titre',
      titre: 'Pourquoi les boucles ?',
      sousTitre: 'Le résumé en 1 minute 30',
      narration: 'Pourquoi les boucles ? Voici l\'essentiel en une minute trente.',
    },
    {
      type: 'points',
      titre: 'Le problème',
      points: [
        'Afficher « Bonjour » 5 fois → 5 lignes identiques',
        '1 000 fois → 1 000 lignes ? Impossible à écrire',
        'Nombre choisi par l\'utilisateur → on ne peut pas le prévoir',
      ],
      narration:
        "Pour afficher Bonjour cinq fois, on peut écrire cinq lignes. Mais pour mille fois, ou pour un nombre choisi par l'utilisateur, c'est impossible. Il faut une boucle.",
    },
    {
      type: 'code',
      titre: 'La solution : une boucle',
      lignes: ['Pour i ← 1 à 3 faire', '    Écrire("Bonjour")', 'FinPour'],
      etapes: [
        { ligne: 0, variables: { i: '1' }, note: 'Le compteur i commence à 1' },
        { ligne: 1, variables: { i: '1' }, sortie: 'Bonjour' },
        { ligne: 0, variables: { i: '2' }, note: 'i avance de 1' },
        { ligne: 1, variables: { i: '2' }, sortie: 'Bonjour' },
        { ligne: 0, variables: { i: '3' } },
        { ligne: 1, variables: { i: '3' }, sortie: 'Bonjour' },
        { ligne: 2, variables: { i: '4' }, note: '4 dépasse 3 : la boucle s\'arrête' },
      ],
      narration:
        "Avec une boucle, on écrit l'instruction une seule fois. Le compteur i commence à un, la boucle affiche Bonjour, puis i avance. Quand i dépasse trois, la boucle s'arrête.",
    },
    {
      type: 'points',
      titre: 'Le vocabulaire',
      points: [
        'Corps : les instructions répétées',
        'Itération : un tour de boucle',
        'Compteur : la variable qui compte les tours',
        'Condition d\'arrêt : ce qui arrête la boucle',
      ],
      narration:
        "Retiens quatre mots : le corps, ce sont les instructions répétées. Une itération, c'est un tour. Le compteur compte les tours. Et la condition d'arrêt arrête la boucle.",
    },
    {
      type: 'comparaison',
      titre: 'Les 3 boucles',
      colonnes: [
        { nom: 'Pour', texte: 'Nombre de tours connu à l\'avance' },
        { nom: 'TantQue', texte: 'Condition testée avant · 0 tour possible' },
        { nom: 'Répéter', texte: 'Condition testée après · au moins 1 tour' },
      ],
      narration:
        "Il existe trois boucles. Pour, quand on connaît le nombre de tours. Tant que, quand la condition est testée avant, donc zéro tour possible. Et Répéter jusqu'à, qui fait toujours au moins un tour.",
    },
    {
      type: 'titre',
      titre: 'À toi de jouer !',
      sousTitre: 'Lis le cours détaillé, puis fais les exercices',
      narration: 'À toi de jouer : lis le cours détaillé ci-dessous, puis entraîne-toi avec les exercices.',
    },
  ],
}

export const resumeLecon2: ResumeAnime = {
  duree: '2 min',
  scenes: [
    {
      type: 'titre',
      titre: 'La boucle Pour',
      sousTitre: 'Le résumé en 2 minutes',
      narration: 'La boucle Pour, résumée en deux minutes.',
    },
    {
      type: 'points',
      titre: 'Comment elle marche',
      points: [
        '1. Le compteur prend la valeur de début',
        '2. A-t-il dépassé la fin ? Si oui → on sort',
        '3. Sinon → on exécute le corps',
        '4. On ajoute le pas, et on recommence',
      ],
      narration:
        "La boucle Pour fonctionne en quatre temps. Le compteur prend la valeur de début. On vérifie s'il a dépassé la fin. Sinon, on exécute le corps. Puis on ajoute le pas, et on recommence.",
    },
    {
      type: 'code',
      titre: 'Exemple : la somme de 1 à 4',
      lignes: ['somme ← 0', 'Pour i ← 1 à 4 faire', '    somme ← somme + i', 'FinPour', 'Écrire(somme)'],
      etapes: [
        { ligne: 0, variables: { i: '—', somme: '0' }, note: 'L\'accumulateur commence à 0' },
        { ligne: 1, variables: { i: '1', somme: '0' } },
        { ligne: 2, variables: { i: '1', somme: '1' }, note: '0 + 1 = 1' },
        { ligne: 1, variables: { i: '2', somme: '1' } },
        { ligne: 2, variables: { i: '2', somme: '3' }, note: '1 + 2 = 3' },
        { ligne: 1, variables: { i: '3', somme: '3' } },
        { ligne: 2, variables: { i: '3', somme: '6' }, note: '3 + 3 = 6' },
        { ligne: 1, variables: { i: '4', somme: '6' } },
        { ligne: 2, variables: { i: '4', somme: '10' }, note: '6 + 4 = 10' },
        { ligne: 4, variables: { i: '5', somme: '10' }, sortie: '10', note: 'i = 5 dépasse 4 : on sort' },
      ],
      narration:
        "Regarde la somme de un à quatre. L'accumulateur somme commence à zéro. À chaque tour, on lui ajoute i : un, puis trois, puis six, puis dix. Quand i vaut cinq, on sort et on affiche dix.",
    },
    {
      type: 'points',
      titre: 'Les règles d\'or',
      points: [
        'Nombre de tours = fin − début + 1',
        'Somme : accumulateur à 0 · Produit : à 1',
        'Ne jamais modifier le compteur dans la boucle',
        'Pas négatif : Pour i ← 10 à 1 pas -1',
      ],
      narration:
        "Les règles d'or : le nombre de tours est égal à fin moins début plus un. Pour une somme, on initialise à zéro, pour un produit à un. On ne modifie jamais le compteur dans la boucle. Et pour compter à l'envers, on utilise un pas négatif.",
    },
    {
      type: 'titre',
      titre: 'Fais toujours une trace',
      sousTitre: 'C\'est la meilleure façon de vérifier ton algorithme',
      narration: "Dernier conseil : fais toujours une trace. C'est la meilleure façon de vérifier ton algorithme, et elle rapporte des points à l'examen.",
    },
  ],
}

export const resumeLecon3: ResumeAnime = {
  duree: '2 min',
  scenes: [
    {
      type: 'titre',
      titre: 'La boucle TantQue',
      sousTitre: 'Le résumé en 2 minutes',
      narration: 'La boucle Tant que, résumée en deux minutes.',
    },
    {
      type: 'points',
      titre: 'L\'essentiel',
      points: [
        'Répète tant que la condition est VRAIE',
        'La condition est testée AVANT chaque tour',
        'Si elle est fausse dès le départ → 0 tour',
        'Nombre de tours inconnu à l\'avance',
      ],
      narration:
        "Tant que répète ses instructions tant que la condition est vraie. La condition est testée avant chaque tour : si elle est fausse dès le départ, la boucle ne tourne pas du tout.",
    },
    {
      type: 'code',
      titre: 'Exemple : contrôler une note',
      lignes: ['Lire(note)', 'TantQue note < 0 OU note > 20 faire', '    Écrire("Erreur !")', '    Lire(note)', 'FinTantQue', 'Écrire("OK : ", note)'],
      etapes: [
        { ligne: 0, variables: { note: '25' }, note: 'L\'utilisateur tape 25' },
        { ligne: 1, variables: { note: '25' }, note: '25 > 20 : condition VRAIE' },
        { ligne: 2, variables: { note: '25' }, sortie: 'Erreur !' },
        { ligne: 3, variables: { note: '-3' }, note: 'Il tape -3' },
        { ligne: 1, variables: { note: '-3' }, note: '-3 < 0 : encore VRAIE' },
        { ligne: 2, variables: { note: '-3' }, sortie: 'Erreur !' },
        { ligne: 3, variables: { note: '14' }, note: 'Il tape 14' },
        { ligne: 1, variables: { note: '14' }, note: '14 est correct : condition FAUSSE' },
        { ligne: 5, variables: { note: '14' }, sortie: 'OK : 14' },
      ],
      narration:
        "Exemple classique : contrôler une note. L'utilisateur tape vingt-cinq : c'est faux, on affiche une erreur et on redemande. Il tape moins trois : encore une erreur. Il tape quatorze : la condition devient fausse, on sort de la boucle.",
    },
    {
      type: 'points',
      titre: 'Attention à la boucle infinie',
      points: [
        'Initialise la variable AVANT la boucle',
        'Modifie-la DANS la boucle',
        'Note incorrecte : < 0 OU > 20 (pas ET !)',
      ],
      narration:
        "Attention à la boucle infinie. La variable de la condition doit avoir une valeur avant la boucle, et être modifiée dans la boucle. Et pour une note incorrecte, on écrit OU, pas ET.",
    },
    {
      type: 'titre',
      titre: 'TantQue = while',
      sousTitre: 'En JavaScript et en C : while (condition) { … }',
      narration: 'En JavaScript et en C, Tant que s\'écrit while. Passe maintenant au cours détaillé.',
    },
  ],
}

export const resumeLecon4: ResumeAnime = {
  duree: '2 min',
  scenes: [
    {
      type: 'titre',
      titre: 'Répéter … Jusqu\'à',
      sousTitre: 'Le résumé en 2 minutes',
      narration: "Répéter jusqu'à, résumé en deux minutes.",
    },
    {
      type: 'points',
      titre: 'L\'essentiel',
      points: [
        'Le corps s\'exécute D\'ABORD',
        'La condition est testée APRÈS',
        'Au moins 1 tour, toujours',
        'On écrit la condition d\'ARRÊT',
      ],
      narration:
        "Avec Répéter, le corps s'exécute d'abord, et la condition est testée après. Il y a donc toujours au moins un tour. Attention : on écrit la condition pour s'arrêter.",
    },
    {
      type: 'code',
      titre: 'Exemple : code PIN, 3 essais',
      lignes: ['essais ← 0', 'Répéter', '    Lire(saisie)', '    essais ← essais + 1', 'Jusqu\'à saisie = 2580 OU essais = 3'],
      etapes: [
        { ligne: 0, variables: { saisie: '—', essais: '0' } },
        { ligne: 2, variables: { saisie: '1111', essais: '0' }, note: 'Premier essai : 1111' },
        { ligne: 3, variables: { saisie: '1111', essais: '1' } },
        { ligne: 4, variables: { saisie: '1111', essais: '1' }, note: 'Mauvais code, 1 essai : on recommence' },
        { ligne: 2, variables: { saisie: '2580', essais: '1' }, note: 'Deuxième essai : 2580' },
        { ligne: 3, variables: { saisie: '2580', essais: '2' } },
        { ligne: 4, variables: { saisie: '2580', essais: '2' }, sortie: 'Accès autorisé', note: 'Bon code : la boucle s\'arrête' },
      ],
      narration:
        "Exemple : un code PIN avec trois essais. Premier essai, mille cent onze : mauvais code, on recommence. Deuxième essai, deux mille cinq cent quatre-vingts : c'est le bon code, la boucle s'arrête.",
    },
    {
      type: 'comparaison',
      titre: 'TantQue ou Répéter ?',
      colonnes: [
        { nom: 'TantQue', texte: 'Testée avant · 0 tour possible · condition pour CONTINUER' },
        { nom: 'Répéter', texte: 'Testée après · au moins 1 tour · condition pour S\'ARRÊTER' },
      ],
      narration:
        "Pour résumer : Tant que teste avant et utilise une condition pour continuer. Répéter teste après et utilise une condition pour s'arrêter. Ce sont des conditions contraires.",
    },
    {
      type: 'titre',
      titre: 'Idéal pour les menus',
      sousTitre: 'Menus, saisies, codes secrets, jeux',
      narration: "Répéter est idéal pour les menus, les saisies et les codes secrets. À toi de jouer !",
    },
  ],
}

export const resumeLecon5: ResumeAnime = {
  duree: '1 min 30',
  scenes: [
    {
      type: 'titre',
      titre: 'Réussir un exercice de boucles',
      sousTitre: 'La méthode BTS en 1 minute 30',
      narration: "Voici la méthode pour réussir n'importe quel exercice de boucles à l'examen.",
    },
    {
      type: 'points',
      titre: 'La méthode en 5 étapes',
      points: [
        '1. Données à saisir, résultats à afficher',
        '2. Choisir la boucle',
        '3. Déclarer les variables et leur type',
        '4. Initialiser · traiter · afficher',
        '5. Vérifier avec une trace',
      ],
      narration:
        "Cinq étapes. Un : repère les données et les résultats. Deux : choisis la boucle. Trois : déclare tes variables. Quatre : initialise avant, traite dans la boucle, affiche après. Cinq : vérifie avec une trace.",
    },
    {
      type: 'comparaison',
      titre: 'Quelle boucle choisir ?',
      colonnes: [
        { nom: 'Pour', texte: '« les 7 jours », « les N étudiants »' },
        { nom: 'TantQue', texte: '« jusqu\'à ce qu\'il tape 0 », « tant que… »' },
        { nom: 'Répéter', texte: '« menu », « code secret », « contrôle de saisie »' },
      ],
      narration:
        "Repère les indices dans l'énoncé. Les sept jours, les N étudiants : boucle Pour. Jusqu'à ce qu'il tape zéro : Tant que. Un menu ou un code secret : Répéter.",
    },
    {
      type: 'code',
      titre: 'Exemple : 4 ! (factorielle)',
      lignes: ['fact ← 1', 'Pour i ← 1 à 4 faire', '    fact ← fact * i', 'FinPour', 'Écrire(fact)'],
      etapes: [
        { ligne: 0, variables: { i: '—', fact: '1' }, note: 'Un produit commence à 1' },
        { ligne: 2, variables: { i: '1', fact: '1' } },
        { ligne: 2, variables: { i: '2', fact: '2' } },
        { ligne: 2, variables: { i: '3', fact: '6' } },
        { ligne: 2, variables: { i: '4', fact: '24' } },
        { ligne: 4, variables: { i: '5', fact: '24' }, sortie: '24' },
      ],
      narration: "Exemple : la factorielle de quatre. Un produit commence à un, puis on multiplie par un, deux, trois et quatre. Résultat : vingt-quatre.",
    },
    {
      type: 'titre',
      titre: 'Entraîne-toi en conditions réelles',
      sousTitre: 'Fais le sujet type BTS en 45 minutes',
      narration: "Maintenant, entraîne-toi en conditions réelles avec le sujet type BTS. Bon courage !",
    },
  ],
}

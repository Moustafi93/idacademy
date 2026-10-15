import type { Lecon } from './types'

/*
 * Algorithmique — Chapitre 3 : Les boucles
 * Contenu complet, rédigé pour un étudiant de BTS IDA 1re année.
 * Convention d'écriture des algorithmes : celle utilisée en BTS en Côte d'Ivoire
 * (Algorithme / Variables / Début / Fin, affectation avec ←).
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'pourquoi-les-boucles',
  titre: 'Pourquoi les boucles ?',
  duree: '10 min',
  objectifs: [
    "Comprendre à quoi sert une boucle",
    "Connaître le vocabulaire : corps, itération, compteur, condition d'arrêt",
    "Savoir reconnaître les trois boucles et quand utiliser chacune",
  ],
  blocs: [
    { type: 'titre', contenu: '1. Le problème : répéter une action' },
    {
      type: 'texte',
      contenu:
        "Imagine que ton professeur te demande d'écrire un algorithme qui affiche **5 fois** le mot « Bonjour ». Avec ce que tu connais déjà (les instructions `Écrire`), tu ferais ceci :",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Sans boucle',
      code: `Algorithme Saluer
Début
    Écrire("Bonjour")
    Écrire("Bonjour")
    Écrire("Bonjour")
    Écrire("Bonjour")
    Écrire("Bonjour")
Fin`,
    },
    {
      type: 'texte',
      contenu:
        "Ça marche pour 5 fois. Mais si on te demande de l'afficher **1 000 fois** ? Tu ne vas pas écrire 1 000 lignes identiques. Et si le nombre de répétitions est choisi par l'utilisateur au moment où le programme tourne ? Là, c'est carrément impossible d'écrire le bon nombre de lignes à l'avance.",
    },
    {
      type: 'texte',
      contenu:
        "C'est exactement pour ça qu'on utilise une **boucle** : on écrit l'instruction **une seule fois**, et on indique à l'ordinateur combien de fois (ou jusqu'à quand) il doit la répéter.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Avec une boucle',
      code: `Algorithme Saluer
Variables
    i : entier
Début
    Pour i ← 1 à 5 faire
        Écrire("Bonjour")
    FinPour
Fin`,
      legende:
        "Pour afficher « Bonjour » 1 000 fois, il suffit de remplacer 5 par 1000. L'algorithme garde la même taille.",
    },

    { type: 'titre', contenu: '2. Le vocabulaire à connaître' },
    {
      type: 'texte',
      contenu: 'Ces mots reviennent dans tous les cours et tous les sujets de BTS. Apprends-les dès maintenant :',
    },
    {
      type: 'tableau',
      entetes: ['Mot', 'Signification', 'Dans l\'exemple ci-dessus'],
      lignes: [
        ['Boucle (ou structure répétitive)', 'Instruction qui fait répéter un bloc d\'instructions', 'Pour … FinPour'],
        ['Corps de la boucle', 'Les instructions qui sont répétées', 'Écrire("Bonjour")'],
        ['Itération (ou tour)', 'Une exécution complète du corps de la boucle', 'Il y a 5 itérations'],
        ['Compteur', 'Variable qui compte les tours', 'i'],
        ["Condition d'arrêt", 'Ce qui fait que la boucle s\'arrête', 'i a dépassé 5'],
      ],
    },
    {
      type: 'definition',
      mot: 'Itération',
      anglais: 'iteration',
      definition: "Une exécution du corps d'une boucle. Une boucle qui tourne 5 fois fait 5 itérations.",
    },

    { type: 'titre', contenu: '3. Les trois boucles en algorithmique' },
    {
      type: 'texte',
      contenu:
        "Il existe trois boucles. Elles font toutes répéter des instructions, mais elles ne s'utilisent pas dans les mêmes situations. Tout dépend d'une question : **est-ce que je connais à l'avance le nombre de tours ?**",
    },
    {
      type: 'tableau',
      entetes: ['Boucle', 'On l\'utilise quand…', 'Nombre de tours connu ?', 'Nombre minimum de tours'],
      lignes: [
        ['Pour … FinPour', 'on sait combien de fois répéter', 'Oui', '0'],
        ['TantQue … FinTantQue', 'on répète tant qu\'une condition est vraie', 'Non', '0 (la condition est testée avant)'],
        ['Répéter … Jusqu\'à', 'on doit faire l\'action au moins une fois', 'Non', '1 (la condition est testée après)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Trois situations de la vie courante',
      elements: [
        "**Pour** : tu remplis 10 bouteilles d'eau. Tu sais dès le départ qu'il y aura 10 répétitions.",
        "**TantQue** : tu verses de l'eau tant que le seau n'est pas plein. Tu ne sais pas combien de verres il faudra, et si le seau est déjà plein, tu ne verses rien du tout.",
        "**Répéter … Jusqu'à** : au guichet, tu tapes ton code PIN jusqu'à ce qu'il soit correct. Tu le tapes forcément au moins une fois.",
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Une boucle permet de répéter des instructions sans les recopier.',
        'Les instructions répétées forment le **corps** de la boucle ; chaque passage est une **itération**.',
        'Nombre de tours connu → **Pour**. Sinon → **TantQue** (0 tour possible) ou **Répéter** (au moins 1 tour).',
      ],
    },
    {
      type: 'quiz',
      question: 'Tu dois afficher les noms des 35 étudiants de ta classe. Quelle boucle choisir ?',
      options: ['Pour', 'TantQue', 'Répéter … Jusqu\'à'],
      bonneReponse: 0,
      explication: 'Le nombre de répétitions (35) est connu à l\'avance : la boucle Pour est la plus adaptée.',
    },
    {
      type: 'quiz',
      question: "Tu demandes à l'utilisateur un mot de passe jusqu'à ce qu'il soit correct. Quelle boucle est la plus naturelle ?",
      options: ['Pour', 'TantQue', 'Répéter … Jusqu\'à'],
      bonneReponse: 2,
      explication:
        "On doit demander le mot de passe au moins une fois, et on ne sait pas combien d'essais il faudra : Répéter … Jusqu'à convient parfaitement.",
    },
    {
      type: 'titre',
      contenu: '4. Et dans un vrai langage ?',
    },
    {
      type: 'texte',
      contenu:
        "Chaque boucle d'algorithme a son équivalent dans les langages de programmation. Voici la boucle Pour de l'exemple, écrite en JavaScript (le langage de l'éditeur IDAcademy) :",
    },
    {
      type: 'code',
      langage: 'javascript',
      code: `for (let i = 1; i <= 5; i++) {
  console.log("Bonjour");
}`,
      legende:
        "`console.log` est l'équivalent de `Écrire`. On reviendra en détail sur cette écriture dans la leçon suivante. Essaie l'exercice à droite pour ta première boucle !",
    },
  ],
  exercice: {
    id: 'boucle-bonjour-3-fois',
    titre: 'Ta première boucle',
    consigne: 'Modifie le programme pour afficher « Bonjour » exactement 3 fois, en utilisant une boucle.',
    langage: 'javascript',
    codeDepart: `// Ce programme affiche "Bonjour" 5 fois.
// Change un seul nombre pour qu'il l'affiche 3 fois.
for (let i = 1; i <= 5; i++) {
  console.log("Bonjour");
}
`,
    sortieAttendue: ['Bonjour', 'Bonjour', 'Bonjour'],
    indice: 'Le nombre après <= indique jusqu\'où va le compteur i.',
    solution: `for (let i = 1; i <= 3; i++) {
  console.log("Bonjour");
}
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'la-boucle-pour',
  titre: 'La boucle Pour',
  duree: '25 min',
  objectifs: [
    'Écrire une boucle Pour avec la bonne syntaxe',
    "Comprendre ce qui se passe à chaque tour grâce au tableau de déroulement",
    'Utiliser un pas différent de 1 (pas 2, pas -1…)',
    'Calculer une somme avec une boucle',
  ],
  blocs: [
    { type: 'titre', contenu: '1. La syntaxe' },
    {
      type: 'texte',
      contenu:
        "On utilise la boucle **Pour** quand on connaît **à l'avance** le nombre de répétitions. Elle utilise une variable **compteur** (souvent appelée `i`) qui prend automatiquement une nouvelle valeur à chaque tour.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Pour compteur ← valeurDébut à valeurFin [pas p] faire
    instructions        // le corps de la boucle
FinPour`,
      legende:
        'La partie [pas p] est facultative. Si on ne l\'écrit pas, le pas vaut 1 : le compteur augmente de 1 à chaque tour.',
    },
    {
      type: 'texte',
      contenu: "Voici exactement ce que fait l'ordinateur quand il rencontre une boucle Pour :",
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        'Il donne au compteur la **valeur de début**.',
        'Il vérifie si le compteur a **dépassé la valeur de fin**. Si oui, la boucle est terminée : il passe à l\'instruction après `FinPour`.',
        'Sinon, il exécute **le corps** de la boucle.',
        'Il **ajoute le pas** au compteur (+1 par défaut), puis retourne à l\'étape 2.',
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Déclare toujours le compteur',
      contenu:
        "Le compteur est une variable comme les autres : il doit être déclaré dans la partie `Variables`, en général de type **entier**. Oublier de le déclarer est une faute souvent sanctionnée à l'examen.",
    },

    { type: 'titre', contenu: '2. Premier exemple, pas à pas' },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 1 : afficher les tours de 1 à 5',
      code: `Algorithme Compter
Variables
    i : entier
Début
    Pour i ← 1 à 5 faire
        Écrire("Tour n° ", i)
    FinPour
    Écrire("Fin de la boucle")
Fin`,
    },
    {
      type: 'texte',
      contenu:
        "Pour être sûr de comprendre ce que fait un algorithme, on fait sa **trace** (on dit aussi **tableau de déroulement** ou **exécution à la main**) : on note, ligne par ligne, la valeur des variables et ce qui s'affiche. C'est une compétence demandée dans presque tous les sujets de BTS.",
    },
    {
      type: 'tableau',
      titre: 'Trace de l\'exemple 1',
      entetes: ['Tour', 'Valeur de i', 'i > 5 ?', 'Ce qui s\'affiche'],
      lignes: [
        ['1', '1', 'Non', 'Tour n° 1'],
        ['2', '2', 'Non', 'Tour n° 2'],
        ['3', '3', 'Non', 'Tour n° 3'],
        ['4', '4', 'Non', 'Tour n° 4'],
        ['5', '5', 'Non', 'Tour n° 5'],
        ['—', '6', 'Oui → on sort', 'Fin de la boucle'],
      ],
      legende:
        'Remarque : à la sortie de la boucle, le compteur vaut 6 et non 5. C\'est parce qu\'on lui ajoute 1 avant de constater qu\'il a dépassé la fin.',
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Combien de tours fait une boucle Pour ?',
      contenu:
        'Avec un pas de 1 : **nombre de tours = valeurFin − valeurDébut + 1**. Par exemple `Pour i ← 3 à 10` fait 10 − 3 + 1 = **8 tours**. Et si la valeur de début est plus grande que la valeur de fin (`Pour i ← 5 à 1`), la boucle ne fait **aucun tour**.',
    },

    { type: 'titre', contenu: '3. Utiliser le compteur dans un calcul' },
    {
      type: 'texte',
      contenu:
        "Le compteur ne sert pas seulement à compter : on peut l'utiliser dans les calculs. Exemple classique : afficher la table de multiplication d'un nombre choisi par l'utilisateur.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 2 : table de multiplication',
      code: `Algorithme TableMultiplication
Variables
    n, i : entier
Début
    Écrire("De quel nombre veux-tu la table ? ")
    Lire(n)
    Pour i ← 1 à 10 faire
        Écrire(n, " x ", i, " = ", n * i)
    FinPour
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace avec n = 7 (les premiers tours)',
      entetes: ['Tour', 'i', 'n * i', 'Affichage'],
      lignes: [
        ['1', '1', '7', '7 x 1 = 7'],
        ['2', '2', '14', '7 x 2 = 14'],
        ['3', '3', '21', '7 x 3 = 21'],
        ['…', '…', '…', '…'],
        ['10', '10', '70', '7 x 10 = 70'],
      ],
    },

    { type: 'titre', contenu: '4. Calculer une somme : la technique de l\'accumulateur' },
    {
      type: 'texte',
      contenu:
        "Très souvent, on utilise une boucle pour **additionner** des valeurs. On utilise alors une variable appelée **accumulateur** (ici `somme`). La méthode a toujours les mêmes trois étapes :",
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        '**Avant la boucle** : on initialise l\'accumulateur à 0 (`somme ← 0`).',
        '**Dans la boucle** : on lui ajoute la nouvelle valeur (`somme ← somme + valeur`).',
        '**Après la boucle** : on affiche ou on utilise le résultat.',
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 3 : somme des entiers de 1 à N',
      code: `Algorithme SommeEntiers
Variables
    N, i, somme : entier
Début
    Écrire("Entrer N : ")
    Lire(N)
    somme ← 0
    Pour i ← 1 à N faire
        somme ← somme + i
    FinPour
    Écrire("La somme de 1 à ", N, " vaut ", somme)
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace avec N = 4',
      entetes: ['Tour', 'i', 'Calcul', 'somme après le tour'],
      lignes: [
        ['Avant', '—', 'somme ← 0', '0'],
        ['1', '1', '0 + 1', '1'],
        ['2', '2', '1 + 2', '3'],
        ['3', '3', '3 + 3', '6'],
        ['4', '4', '6 + 4', '10'],
        ['Après', '5', '—', 'Affiche : La somme de 1 à 4 vaut 10'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: "Erreur fréquente : oublier d'initialiser",
      contenu:
        "Si tu oublies `somme ← 0` avant la boucle, `somme` contient une valeur inconnue au départ et le résultat est faux. Et si tu mets `somme ← 0` **dans** la boucle, elle est remise à zéro à chaque tour : à la fin, elle ne contient que la dernière valeur.",
    },
    {
      type: 'texte',
      contenu:
        'Le même principe marche pour un **produit**, mais on initialise alors à **1** (car multiplier par 0 donnerait toujours 0). C\'est ainsi qu\'on calcule une factorielle : `fact ← 1`, puis `fact ← fact * i` dans la boucle.',
    },

    { type: 'titre', contenu: '5. Le pas : compter de 2 en 2, ou à l\'envers' },
    {
      type: 'texte',
      contenu: 'Le pas indique de combien le compteur change à chaque tour. Il peut être plus grand que 1, ou négatif.',
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 4 : les nombres pairs de 0 à 10 (pas de 2)',
      code: `Pour i ← 0 à 10 pas 2 faire
    Écrire(i)
FinPour
// Affiche : 0  2  4  6  8  10`,
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 5 : compte à rebours (pas négatif)',
      code: `Pour i ← 10 à 1 pas -1 faire
    Écrire(i)
FinPour
Écrire("Décollage !")
// Affiche : 10  9  8 … 1  Décollage !`,
      legende: 'Avec un pas négatif, la boucle s\'arrête quand le compteur devient plus petit que la valeur de fin.',
    },

    { type: 'titre', contenu: '6. Les erreurs à éviter' },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Ne modifie jamais le compteur dans le corps de la boucle',
      contenu:
        "Une instruction comme `i ← i + 1` à l'intérieur d'une boucle Pour est une erreur : c'est la boucle elle-même qui fait avancer le compteur. Si tu le modifies en plus, tu sautes des tours ou tu crées un comportement imprévisible.",
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Attention aux bornes',
      contenu:
        "`Pour i ← 0 à 5` fait **6** tours (0, 1, 2, 3, 4, 5), pas 5. Vérifie toujours la première et la dernière valeur du compteur avec une petite trace.",
    },

    { type: 'titre', contenu: '7. La boucle Pour en JavaScript et en C' },
    {
      type: 'code',
      langage: 'javascript',
      titre: 'JavaScript',
      code: `for (let i = 1; i <= 5; i++) {
  console.log("Tour n° " + i);
}`,
      legende:
        'Les trois parties entre parenthèses correspondent à la boucle Pour : `let i = 1` (valeur de début), `i <= 5` (on continue tant que i ne dépasse pas la fin), `i++` (le pas : on ajoute 1).',
    },
    {
      type: 'code',
      langage: 'c',
      titre: 'Langage C',
      code: `int i;
for (i = 1; i <= 5; i++) {
    printf("Tour n° %d\\n", i);
}`,
    },
    {
      type: 'tableau',
      titre: 'Correspondance algorithme → JavaScript',
      entetes: ['Algorithme', 'JavaScript'],
      lignes: [
        ['Pour i ← 1 à 10 faire', 'for (let i = 1; i <= 10; i++)'],
        ['Pour i ← 0 à 10 pas 2 faire', 'for (let i = 0; i <= 10; i += 2)'],
        ['Pour i ← 10 à 1 pas -1 faire', 'for (let i = 10; i >= 1; i--)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'La boucle Pour s\'utilise quand le nombre de tours est **connu**.',
        'Nombre de tours (pas de 1) = **fin − début + 1**.',
        'Pour une somme : accumulateur à **0** avant la boucle ; pour un produit : à **1**.',
        'On ne modifie **jamais** le compteur à l\'intérieur de la boucle.',
        'Fais une **trace** pour vérifier ton algorithme : c\'est la meilleure façon de trouver les erreurs.',
      ],
    },
    {
      type: 'quiz',
      question: 'Combien de tours fait la boucle « Pour i ← 3 à 9 faire » ?',
      options: ['6 tours', '7 tours', '9 tours'],
      bonneReponse: 1,
      explication: 'Nombre de tours = 9 − 3 + 1 = 7 (i prend les valeurs 3, 4, 5, 6, 7, 8 et 9).',
    },
    {
      type: 'quiz',
      question: 'Que vaut somme après : somme ← 0, puis Pour i ← 1 à 3 faire somme ← somme + 2 * i ?',
      options: ['6', '12', '9'],
      bonneReponse: 1,
      explication: 'On ajoute 2×1 = 2, puis 2×2 = 4, puis 2×3 = 6. Total : 2 + 4 + 6 = 12.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Exercice corrigé : moyenne de 5 notes',
      enonce:
        "Écris un algorithme qui demande 5 notes à l'utilisateur, puis affiche leur moyenne. Les notes peuvent avoir une virgule (par exemple 12,5).",
      solution: `Algorithme MoyenneNotes
Variables
    i : entier
    note, total, moyenne : réel
Début
    total ← 0
    Pour i ← 1 à 5 faire
        Écrire("Note n° ", i, " : ")
        Lire(note)
        total ← total + note
    FinPour
    moyenne ← total / 5
    Écrire("La moyenne est : ", moyenne)
Fin`,
      explication:
        "On connaît le nombre de notes (5), donc on utilise une boucle Pour. `total` est un accumulateur initialisé à 0. Les notes, le total et la moyenne sont de type **réel** car ils peuvent contenir des décimales. La division se fait **après** la boucle, une seule fois.",
    },
  ],
  exercice: {
    id: 'boucle-pour-1-a-5',
    titre: 'Afficher les tours de 1 à 5',
    consigne: 'Écris une boucle for qui affiche « Tour n° 1 » jusqu\'à « Tour n° 5 », un message par ligne.',
    langage: 'javascript',
    codeDepart: `// Écris ta boucle ici.
// Rappel : for (let i = début; i <= fin; i++) { ... }
// Pour afficher : console.log("Tour n° " + i);

`,
    sortieAttendue: ['Tour n° 1', 'Tour n° 2', 'Tour n° 3', 'Tour n° 4', 'Tour n° 5'],
    indice: 'Le compteur commence à 1 et va jusqu\'à 5 inclus : utilise le signe <= dans la condition.',
    solution: `for (let i = 1; i <= 5; i++) {
  console.log("Tour n° " + i);
}
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'la-boucle-tantque',
  titre: 'La boucle TantQue',
  duree: '25 min',
  objectifs: [
    'Écrire une boucle TantQue avec une condition correcte',
    'Contrôler la saisie de l\'utilisateur',
    'Reconnaître et éviter une boucle infinie',
    'Transformer une boucle Pour en boucle TantQue',
  ],
  blocs: [
    { type: 'titre', contenu: '1. La syntaxe et le fonctionnement' },
    {
      type: 'texte',
      contenu:
        "La boucle **TantQue** répète ses instructions **tant qu'une condition est vraie**. On l'utilise quand on **ne connaît pas à l'avance** le nombre de tours : la boucle s'arrête quand la situation change.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `TantQue condition faire
    instructions
FinTantQue`,
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "L'ordinateur **teste la condition**.",
        'Si elle est **fausse**, la boucle est terminée : il passe à l\'instruction après `FinTantQue`.',
        'Si elle est **vraie**, il exécute le corps de la boucle, puis **retourne à l\'étape 1**.',
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'Deux points essentiels',
      elements: [
        'La condition est testée **avant** chaque tour. Si elle est fausse dès le départ, la boucle ne fait **aucun tour**.',
        'Le corps de la boucle doit **changer quelque chose** qui finira par rendre la condition fausse. Sinon, la boucle ne s\'arrête jamais.',
      ],
    },

    { type: 'titre', contenu: '2. Exemple 1 : contrôler une saisie' },
    {
      type: 'texte',
      contenu:
        "C'est l'utilisation la plus fréquente de TantQue, et elle tombe très souvent à l'examen. On veut obliger l'utilisateur à saisir une note **entre 0 et 20**. Tant que la note est incorrecte, on la redemande.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme SaisieNote
Variables
    note : réel
Début
    Écrire("Entrer une note entre 0 et 20 : ")
    Lire(note)
    TantQue note < 0 OU note > 20 faire
        Écrire("Erreur ! La note doit être entre 0 et 20 : ")
        Lire(note)
    FinTantQue
    Écrire("Note enregistrée : ", note)
Fin`,
    },
    {
      type: 'tableau',
      titre: "Trace si l'utilisateur tape 25, puis -3, puis 14",
      entetes: ['Étape', 'note', 'note < 0 OU note > 20 ?', 'Ce qui se passe'],
      lignes: [
        ['Saisie avant la boucle', '25', 'Vrai (25 > 20)', 'On entre dans la boucle'],
        ['Tour 1', '-3', 'Vrai (-3 < 0)', 'Message d\'erreur, nouvelle saisie'],
        ['Tour 2', '14', 'Faux', 'On sort de la boucle'],
        ['Après la boucle', '14', '—', 'Affiche : Note enregistrée : 14'],
      ],
      legende:
        'Si l\'utilisateur tape directement une note correcte (par exemple 12), la condition est fausse dès le départ : la boucle ne fait aucun tour.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'ET ou OU ?',
      contenu:
        "Une note est **incorrecte** si elle est plus petite que 0 **OU** plus grande que 20. Écrire `note < 0 ET note > 20` serait une erreur : aucun nombre ne peut être à la fois plus petit que 0 et plus grand que 20, donc la boucle ne tournerait jamais.",
    },

    { type: 'titre', contenu: '3. Exemple 2 : combien de mois pour épargner ?' },
    {
      type: 'texte',
      contenu:
        "Awa veut s'acheter un ordinateur à **100 000 F**. Elle met **15 000 F** de côté chaque mois. Combien de mois lui faut-il ? On ne connaît pas le nombre de tours à l'avance : c'est justement ce qu'on cherche. TantQue est donc le bon choix.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme Epargne
Variables
    epargne, mois : entier
Début
    epargne ← 0
    mois ← 0
    TantQue epargne < 100000 faire
        epargne ← epargne + 15000
        mois ← mois + 1
    FinTantQue
    Écrire("Il faut ", mois, " mois. Épargne finale : ", epargne, " F")
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace',
      entetes: ['Tour', 'epargne < 100000 ?', 'epargne après le tour', 'mois'],
      lignes: [
        ['Avant', '—', '0', '0'],
        ['1', 'Vrai', '15 000', '1'],
        ['2', 'Vrai', '30 000', '2'],
        ['3', 'Vrai', '45 000', '3'],
        ['4', 'Vrai', '60 000', '4'],
        ['5', 'Vrai', '75 000', '5'],
        ['6', 'Vrai', '90 000', '6'],
        ['7', 'Vrai', '105 000', '7'],
        ['—', 'Faux (105 000)', '—', 'Affiche : Il faut 7 mois'],
      ],
      legende: 'Ici, la variable `mois` joue le rôle d\'un compteur que l\'on fait avancer nous-mêmes.',
    },

    { type: 'titre', contenu: '4. Exemple 3 : compter les chiffres d\'un nombre' },
    {
      type: 'texte',
      contenu:
        "On veut savoir combien de chiffres possède un entier positif, par exemple 4527. L'idée : on divise le nombre par 10 (division entière, notée `DIV`) jusqu'à ce qu'il devienne 0, et on compte le nombre de divisions.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme NombreDeChiffres
Variables
    n, nbChiffres : entier
Début
    Écrire("Entrer un entier positif : ")
    Lire(n)
    nbChiffres ← 1
    TantQue n >= 10 faire
        n ← n DIV 10
        nbChiffres ← nbChiffres + 1
    FinTantQue
    Écrire("Ce nombre a ", nbChiffres, " chiffre(s)")
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace avec n = 4527',
      entetes: ['Tour', 'n >= 10 ?', 'n après le tour', 'nbChiffres'],
      lignes: [
        ['Avant', '—', '4527', '1'],
        ['1', 'Vrai', '452', '2'],
        ['2', 'Vrai', '45', '3'],
        ['3', 'Vrai', '4', '4'],
        ['—', 'Faux (4 < 10)', '—', 'Affiche : 4 chiffre(s)'],
      ],
    },

    { type: 'titre', contenu: '5. Le danger : la boucle infinie' },
    {
      type: 'texte',
      contenu:
        "Si la condition reste **toujours vraie**, la boucle ne s'arrête jamais : c'est une **boucle infinie**. Le programme semble « bloqué ». La cause est presque toujours la même : on a oublié de modifier la variable testée dans la condition.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Faux : boucle infinie',
      code: `i ← 1
TantQue i <= 5 faire
    Écrire(i)
    // on a oublié i ← i + 1 : i vaut toujours 1
FinTantQue`,
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Correct',
      code: `i ← 1
TantQue i <= 5 faire
    Écrire(i)
    i ← i + 1
FinTantQue`,
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'La vérification en 3 questions',
      elements: [
        'La variable de la condition a-t-elle une valeur **avant** la boucle ? (initialisation)',
        'Est-elle **modifiée dans** la boucle ?',
        'Cette modification la rapproche-t-elle de la sortie ?',
      ],
    },

    { type: 'titre', contenu: '6. Transformer une boucle Pour en TantQue' },
    {
      type: 'texte',
      contenu:
        "Toute boucle Pour peut s'écrire avec TantQue. Il faut alors gérer le compteur soi-même, en trois endroits. C'est une question classique d'examen (« Réécrire l'algorithme en utilisant la boucle TantQue »).",
    },
    {
      type: 'tableau',
      entetes: ['Avec Pour', 'Avec TantQue'],
      lignes: [
        ['Pour i ← 1 à 5 faire', 'i ← 1\nTantQue i <= 5 faire'],
        ['    Écrire(i)', '    Écrire(i)\n    i ← i + 1'],
        ['FinPour', 'FinTantQue'],
      ],
      legende: 'Initialisation avant la boucle, condition dans le TantQue, incrémentation à la fin du corps.',
    },

    { type: 'titre', contenu: '7. TantQue en JavaScript et en C' },
    {
      type: 'code',
      langage: 'javascript',
      titre: 'JavaScript et C (même écriture)',
      code: `let epargne = 0;
let mois = 0;
while (epargne < 100000) {
  epargne = epargne + 15000;
  mois = mois + 1;
}
console.log("Il faut " + mois + " mois");`,
      legende: 'TantQue se traduit par `while`. OU s\'écrit `||` et ET s\'écrit `&&`.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'TantQue répète **tant que la condition est vraie** et s\'arrête dès qu\'elle devient fausse.',
        'La condition est testée **avant** : 0 tour est possible.',
        'Il faut **initialiser** la variable testée avant la boucle et la **modifier** dans la boucle.',
        'Pour contrôler une saisie : on décrit dans la condition le cas **incorrect**.',
      ],
    },
    {
      type: 'quiz',
      question: 'Combien de fois s\'exécute le corps de : x ← 10, puis TantQue x < 5 faire … ?',
      options: ['0 fois', '1 fois', '5 fois'],
      bonneReponse: 0,
      explication: 'x vaut 10 : la condition x < 5 est fausse dès le premier test, la boucle ne fait aucun tour.',
    },
    {
      type: 'quiz',
      question: 'Pour obliger l\'utilisateur à taper « O » ou « N », quelle condition mettre dans le TantQue ?',
      options: ['rep = "O" OU rep = "N"', 'rep ≠ "O" ET rep ≠ "N"', 'rep ≠ "O" OU rep ≠ "N"'],
      bonneReponse: 1,
      explication:
        'On redemande tant que la réponse est incorrecte, c\'est-à-dire différente de « O » ET différente de « N ». Avec OU, la condition serait toujours vraie (boucle infinie).',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Exercice corrigé : additionner jusqu\'à zéro',
      enonce:
        "Écris un algorithme qui demande des nombres à l'utilisateur et les additionne, tant que l'utilisateur ne tape pas 0. À la fin, afficher la somme et le nombre de valeurs saisies (sans compter le 0).",
      solution: `Algorithme SommeJusquaZero
Variables
    x, somme, nb : entier
Début
    somme ← 0
    nb ← 0
    Écrire("Entrer un nombre (0 pour arrêter) : ")
    Lire(x)
    TantQue x ≠ 0 faire
        somme ← somme + x
        nb ← nb + 1
        Écrire("Entrer un nombre (0 pour arrêter) : ")
        Lire(x)
    FinTantQue
    Écrire("Somme : ", somme, " pour ", nb, " valeur(s)")
Fin`,
      explication:
        "On ne sait pas combien de nombres seront saisis : TantQue. On lit une première valeur **avant** la boucle pour pouvoir tester la condition, puis on relit une nouvelle valeur **à la fin** du corps. Ainsi, le 0 final n'est jamais ajouté ni compté. Ce schéma « lecture avant + lecture en fin de boucle » est à connaître par cœur.",
    },
  ],
  exercice: {
    id: 'boucle-while-puissances-2',
    titre: 'Les puissances de 2',
    consigne:
      'Avec une boucle while, affiche les puissances de 2 inférieures à 100 : 1, 2, 4, 8, 16, 32, 64 (un nombre par ligne).',
    langage: 'javascript',
    codeDepart: `let valeur = 1;
// Tant que valeur est inférieure à 100 :
//   afficher valeur, puis la multiplier par 2

`,
    sortieAttendue: ['1', '2', '4', '8', '16', '32', '64'],
    indice: 'while (valeur < 100) { console.log(valeur); valeur = valeur * 2; }',
    solution: `let valeur = 1;
while (valeur < 100) {
  console.log(valeur);
  valeur = valeur * 2;
}
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 4
const lecon4: Lecon = {
  slug: 'repeter-jusqua',
  titre: 'Répéter … Jusqu\'à',
  duree: '20 min',
  objectifs: [
    'Écrire une boucle Répéter … Jusqu\'à',
    'Comprendre la différence avec TantQue',
    'Construire un menu et une saisie avec nombre d\'essais limité',
  ],
  blocs: [
    { type: 'titre', contenu: '1. La syntaxe et le fonctionnement' },
    {
      type: 'texte',
      contenu:
        "La boucle **Répéter … Jusqu'à** exécute d'abord ses instructions, **puis** teste la condition. Elle s'arrête quand la condition devient **vraie**. Conséquence : le corps de la boucle est toujours exécuté **au moins une fois**.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Répéter
    instructions
Jusqu'à condition_d_arrêt`,
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "L'ordinateur exécute le corps de la boucle.",
        'Il teste la condition.',
        'Si elle est **vraie**, la boucle s\'arrête. Si elle est **fausse**, il recommence à l\'étape 1.',
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le piège n°1 : la condition est inversée',
      contenu:
        "Avec **TantQue**, on écrit la condition pour **continuer**. Avec **Répéter … Jusqu'à**, on écrit la condition pour **s'arrêter**. Ce sont des conditions contraires l'une de l'autre.",
    },

    { type: 'titre', contenu: '2. Exemple 1 : la saisie de note, version Répéter' },
    {
      type: 'texte',
      contenu:
        'Reprenons le contrôle de saisie de la leçon précédente. Avec Répéter, on n\'a plus besoin d\'une première saisie avant la boucle, car la boucle s\'exécute forcément une fois.',
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme SaisieNote
Variables
    note : réel
Début
    Répéter
        Écrire("Entrer une note entre 0 et 20 : ")
        Lire(note)
    Jusqu'à note >= 0 ET note <= 20
    Écrire("Note enregistrée : ", note)
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Comparaison des deux versions',
      entetes: ['', 'TantQue', 'Répéter … Jusqu\'à'],
      lignes: [
        ['Condition écrite', 'note < 0 OU note > 20 (cas incorrect → on continue)', 'note >= 0 ET note <= 20 (cas correct → on s\'arrête)'],
        ['Saisie avant la boucle ?', 'Oui, obligatoire', 'Non'],
        ['Nombre minimum de tours', '0', '1'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Inverser une condition (lois de De Morgan)',
      elements: [
        'Le contraire de `A OU B` est `NON A ET NON B`.',
        'Le contraire de `A ET B` est `NON A OU NON B`.',
        'Le contraire de `<` est `>=`, le contraire de `>` est `<=`, le contraire de `=` est `≠`.',
        'Exemple : le contraire de `note < 0 OU note > 20` est `note >= 0 ET note <= 20`.',
      ],
    },

    { type: 'titre', contenu: '3. Exemple 2 : un menu' },
    {
      type: 'texte',
      contenu:
        "Les applications de gestion demandées au BTS commencent souvent par un **menu**. Il doit s'afficher au moins une fois, puis revenir après chaque action, jusqu'à ce que l'utilisateur choisisse de quitter. C'est le cas idéal pour Répéter.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme Menu
Variables
    choix : entier
Début
    Répéter
        Écrire("1. Ajouter un étudiant")
        Écrire("2. Afficher la liste")
        Écrire("0. Quitter")
        Écrire("Votre choix : ")
        Lire(choix)
        Selon choix faire
            1 : Écrire("Ajout…")
            2 : Écrire("Affichage…")
            0 : Écrire("Au revoir")
            Sinon : Écrire("Choix invalide")
        FinSelon
    Jusqu'à choix = 0
Fin`,
    },

    { type: 'titre', contenu: '4. Exemple 3 : code PIN avec 3 essais maximum' },
    {
      type: 'texte',
      contenu:
        "Comme au distributeur de billets : l'utilisateur a droit à 3 essais pour taper son code. On s'arrête si le code est bon **OU** si les 3 essais sont épuisés. On combine donc une condition et un compteur.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme CodePIN
Constante
    CODE = 2580
Variables
    saisie, essais : entier
Début
    essais ← 0
    Répéter
        Écrire("Code PIN : ")
        Lire(saisie)
        essais ← essais + 1
    Jusqu'à saisie = CODE OU essais = 3
    Si saisie = CODE Alors
        Écrire("Accès autorisé")
    Sinon
        Écrire("Carte bloquée")
    FinSi
Fin`,
    },
    {
      type: 'tableau',
      titre: "Trace si l'utilisateur tape 1111, puis 2580",
      entetes: ['Tour', 'saisie', 'essais', 'saisie = CODE OU essais = 3 ?'],
      lignes: [
        ['1', '1111', '1', 'Faux → on recommence'],
        ['2', '2580', '2', 'Vrai → on s\'arrête'],
        ['Après', '—', '—', 'Affiche : Accès autorisé'],
      ],
      legende: "Après la boucle, on teste à nouveau `saisie = CODE` pour savoir **pourquoi** la boucle s'est arrêtée.",
    },

    { type: 'titre', contenu: '5. En JavaScript et en C : do … while' },
    {
      type: 'code',
      langage: 'javascript',
      code: `let n = 1;
do {
  console.log(n);
  n = n * 3;
} while (n < 500);`,
      legende:
        "Attention : en JavaScript et en C, la boucle s'appelle `do … while` et sa condition est une condition pour **continuer** (comme TantQue). Il faut donc **inverser** la condition du Jusqu'à : `Jusqu'à n >= 500` devient `while (n < 500)`.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        "Répéter … Jusqu'à fait **au moins un tour** : la condition est testée **après**.",
        "On écrit la condition d'**arrêt** (c'est le contraire de la condition du TantQue).",
        'Idéal pour les **menus**, les **saisies** et les **tentatives** (code PIN, jeu).',
        'En JavaScript/C : `do { … } while (condition pour continuer);`',
      ],
    },
    {
      type: 'quiz',
      question: "Combien de fois s'affiche « Salut » ? x ← 10 ; Répéter Écrire(\"Salut\") ; x ← x + 1 Jusqu'à x > 5",
      options: ['0 fois', '1 fois', '5 fois'],
      bonneReponse: 1,
      explication:
        "Le corps s'exécute une première fois (affiche Salut, x devient 11). Puis on teste x > 5 : c'est vrai, la boucle s'arrête. « Salut » s'affiche donc une seule fois.",
    },
    {
      type: 'quiz',
      question: 'Quelle condition Jusqu\'à équivaut à « TantQue rep ≠ "O" ET rep ≠ "N" » ?',
      options: ['Jusqu\'à rep = "O" OU rep = "N"', 'Jusqu\'à rep = "O" ET rep = "N"', 'Jusqu\'à rep ≠ "O" OU rep ≠ "N"'],
      bonneReponse: 0,
      explication: 'On inverse la condition : le contraire de (A ET B) est (NON A OU NON B), soit rep = "O" OU rep = "N".',
    },
  ],
  exercice: {
    id: 'boucle-do-while-puissances-3',
    titre: 'Les puissances de 3',
    consigne: 'Avec une boucle do … while, affiche les puissances de 3 inférieures à 500 : 1, 3, 9, 27, 81, 243.',
    langage: 'javascript',
    codeDepart: `let n = 1;
// Utilise une boucle do { ... } while (...);
// Affiche n, puis multiplie-le par 3.

`,
    sortieAttendue: ['1', '3', '9', '27', '81', '243'],
    indice: 'La condition du while est une condition pour continuer : on continue tant que n < 500.',
    solution: `let n = 1;
do {
  console.log(n);
  n = n * 3;
} while (n < 500);
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 5
const lecon5: Lecon = {
  slug: 'exercices-boucles',
  titre: 'Exercices corrigés type BTS',
  duree: '45 min',
  objectifs: [
    'Choisir la bonne boucle selon l\'énoncé',
    'Rédiger un algorithme complet comme à l\'examen',
    'Utiliser des boucles imbriquées',
  ],
  blocs: [
    {
      type: 'texte',
      contenu:
        "Voici des exercices du niveau de l'examen, classés du plus simple au plus difficile. **Cherche d'abord seul** sur une feuille, au moins 10 minutes par exercice, puis ouvre la correction. C'est en se trompant qu'on progresse.",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Méthode pour tout exercice de boucle',
      elements: [
        '**Quelles données** l\'utilisateur doit-il saisir ? Qu\'est-ce qu\'on doit afficher ?',
        '**Quelle boucle** ? Nombre de tours connu → Pour. Sinon → TantQue ou Répéter.',
        '**Quelles variables** ? N\'oublie pas compteur, accumulateur, et leur type.',
        '**Initialisations** avant la boucle, **traitement** dans la boucle, **résultat** après.',
        '**Vérifie** avec une petite trace sur un exemple simple.',
      ],
    },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Exercice 1 : la factorielle',
      enonce:
        "La factorielle d'un entier positif n, notée n!, est le produit 1 × 2 × 3 × … × n. Par exemple 5! = 1 × 2 × 3 × 4 × 5 = 120. Par convention, 0! = 1. Écris un algorithme qui lit n et affiche n!.",
      solution: `Algorithme Factorielle
Variables
    n, i, fact : entier
Début
    Répéter
        Écrire("Entrer un entier positif : ")
        Lire(n)
    Jusqu'à n >= 0
    fact ← 1
    Pour i ← 1 à n faire
        fact ← fact * i
    FinPour
    Écrire(n, "! = ", fact)
Fin`,
      explication:
        "C'est un produit : l'accumulateur `fact` est initialisé à **1**. Le nombre de tours (n) est connu au moment de la boucle : Pour. Si n = 0, la boucle `Pour i ← 1 à 0` ne fait aucun tour et fact reste à 1, ce qui donne bien 0! = 1. La boucle Répéter au début contrôle la saisie (n doit être positif).",
    },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Exercice 2 : le plus grand de N nombres',
      enonce:
        'Écris un algorithme qui lit un entier N (N ≥ 1), puis N nombres, et affiche le plus grand d\'entre eux.',
      solution: `Algorithme Maximum
Variables
    N, i : entier
    x, max : réel
Début
    Écrire("Combien de nombres ? ")
    Lire(N)
    Écrire("Nombre 1 : ")
    Lire(x)
    max ← x
    Pour i ← 2 à N faire
        Écrire("Nombre ", i, " : ")
        Lire(x)
        Si x > max Alors
            max ← x
        FinSi
    FinPour
    Écrire("Le plus grand est ", max)
Fin`,
      explication:
        "On ne peut pas initialiser `max` à 0 : si tous les nombres sont négatifs, le résultat serait faux. On initialise donc `max` avec le **premier nombre saisi**, puis la boucle commence à **2** pour lire les suivants. À chaque tour, on compare le nouveau nombre au maximum actuel.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Exercice 3 : nombre premier',
      enonce:
        "Un nombre premier est un entier supérieur à 1 qui n'est divisible que par 1 et par lui-même (2, 3, 5, 7, 11…). Écris un algorithme qui lit un entier n > 1 et dit s'il est premier. On utilisera `MOD` (reste de la division entière).",
      solution: `Algorithme Premier
Variables
    n, d : entier
    premier : booléen
Début
    Écrire("Entrer un entier > 1 : ")
    Lire(n)
    premier ← Vrai
    d ← 2
    TantQue d <= n DIV 2 ET premier faire
        Si n MOD d = 0 Alors
            premier ← Faux
        FinSi
        d ← d + 1
    FinTantQue
    Si premier Alors
        Écrire(n, " est premier")
    Sinon
        Écrire(n, " n'est pas premier")
    FinSi
Fin`,
      explication:
        "On cherche un diviseur `d` entre 2 et n/2. On utilise TantQue car on veut **s'arrêter dès qu'on trouve un diviseur** (inutile de continuer). La variable booléenne `premier` sert de **drapeau** : elle passe à Faux dès qu'un diviseur est trouvé. Exemple : pour n = 15, d = 2 (15 MOD 2 = 1), puis d = 3 (15 MOD 3 = 0) → premier devient Faux et la boucle s'arrête.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Exercice 4 : le jeu du nombre mystère',
      enonce:
        "L'ordinateur choisit un nombre mystère entre 1 et 100 (on suppose qu'il est déjà dans la variable `mystere`). L'utilisateur propose des nombres ; on lui répond « Trop grand » ou « Trop petit » jusqu'à ce qu'il trouve. À la fin, afficher le nombre d'essais.",
      solution: `Algorithme NombreMystere
Variables
    mystere, proposition, essais : entier
Début
    mystere ← Aléa(1, 100)
    essais ← 0
    Répéter
        Écrire("Ta proposition : ")
        Lire(proposition)
        essais ← essais + 1
        Si proposition > mystere Alors
            Écrire("Trop grand")
        Sinon Si proposition < mystere Alors
            Écrire("Trop petit")
        FinSi
    Jusqu'à proposition = mystere
    Écrire("Bravo ! Trouvé en ", essais, " essai(s)")
Fin`,
      explication:
        "L'utilisateur doit proposer au moins un nombre et on ne sait pas combien d'essais il lui faudra : Répéter … Jusqu'à. `essais` est un compteur que l'on fait avancer à chaque tour. La boucle s'arrête quand la proposition est égale au nombre mystère.",
    },

    { type: 'titre', contenu: 'Pour aller plus loin : les boucles imbriquées' },
    {
      type: 'texte',
      contenu:
        "On peut mettre une boucle **à l'intérieur** d'une autre. Pour chaque tour de la boucle extérieure, la boucle intérieure fait **tous** ses tours. C'est très utilisé pour les tableaux à deux dimensions (lignes et colonnes).",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple : un triangle d\'étoiles',
      code: `Algorithme Triangle
Variables
    ligne, col : entier
    texte : chaîne
Début
    Pour ligne ← 1 à 4 faire
        texte ← ""
        Pour col ← 1 à ligne faire
            texte ← texte + "*"
        FinPour
        Écrire(texte)
    FinPour
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Déroulement',
      entetes: ['ligne', 'La boucle col fait…', 'Affichage'],
      lignes: [
        ['1', '1 tour', '*'],
        ['2', '2 tours', '**'],
        ['3', '3 tours', '***'],
        ['4', '4 tours', '****'],
      ],
      legende: 'Au total, la boucle intérieure s\'exécute 1 + 2 + 3 + 4 = 10 fois.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Exercice 5 : la table de Pythagore',
      enonce: 'Écris un algorithme qui affiche les tables de multiplication de 1 à 5 (chaque table de 1 à 10).',
      solution: `Algorithme Tables
Variables
    n, i : entier
Début
    Pour n ← 1 à 5 faire
        Écrire("Table de ", n)
        Pour i ← 1 à 10 faire
            Écrire(n, " x ", i, " = ", n * i)
        FinPour
    FinPour
Fin`,
      explication:
        'La boucle extérieure choisit la table (n de 1 à 5), la boucle intérieure parcourt les multiplicateurs (i de 1 à 10). Les deux compteurs doivent avoir des **noms différents**. Le corps de la boucle intérieure s\'exécute 5 × 10 = 50 fois.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'Bilan du chapitre',
      elements: [
        '**Pour** : nombre de tours connu. **TantQue** : condition testée avant, 0 tour possible. **Répéter** : condition d\'arrêt testée après, au moins 1 tour.',
        'Accumulateur : 0 pour une somme, 1 pour un produit, le premier élément pour un maximum.',
        'Toujours initialiser, modifier la variable de la condition, et vérifier avec une trace.',
      ],
    },
  ],
  exercice: {
    id: 'boucles-imbriquees-triangle',
    titre: "Le triangle d'étoiles",
    consigne: "Avec deux boucles for imbriquées, affiche un triangle d'étoiles de 4 lignes : *, **, ***, ****.",
    langage: 'javascript',
    codeDepart: `for (let ligne = 1; ligne <= 4; ligne++) {
  let texte = "";
  // Ajoute ici une deuxième boucle qui ajoute "*" à texte,
  // autant de fois que la valeur de ligne.

  console.log(texte);
}
`,
    sortieAttendue: ['*', '**', '***', '****'],
    indice: 'for (let col = 1; col <= ligne; col++) { texte = texte + "*"; }',
    solution: `for (let ligne = 1; ligne <= 4; ligne++) {
  let texte = "";
  for (let col = 1; col <= ligne; col++) {
    texte = texte + "*";
  }
  console.log(texte);
}
`,
  },
}

import { exercicesLecon1, exercicesLecon2, exercicesLecon3, exercicesLecon4, exercicesLecon5 } from './exercices-boucles'

import { resumeLecon1, resumeLecon2, resumeLecon3, resumeLecon4, resumeLecon5 } from './resumes-boucles'

// Résumé vidéo animé au début de chaque leçon
lecon1.resume = resumeLecon1
lecon2.resume = resumeLecon2
lecon3.resume = resumeLecon3
lecon4.resume = resumeLecon4
lecon5.resume = resumeLecon5

// Chaque leçon se termine par ses exercices d'application et son sujet type BTS
lecon1.blocs.push(...exercicesLecon1)
lecon2.blocs.push(...exercicesLecon2)
lecon3.blocs.push(...exercicesLecon3)
lecon4.blocs.push(...exercicesLecon4)
lecon5.blocs.push(...exercicesLecon5)

export const leconsBoucles: Lecon[] = [lecon1, lecon2, lecon3, lecon4, lecon5]

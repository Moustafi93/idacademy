import type { Lecon } from '../types'

/*
 * Algorithmique — Chapitre 1 : Variables et types
 * Niveau : BTS IDA 1re année, premier contact avec l'algorithmique.
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'qu-est-ce-qu-un-algorithme',
  titre: "Qu'est-ce qu'un algorithme ?",
  duree: '15 min',
  objectifs: [
    'Définir ce qu\'est un algorithme',
    'Faire la différence entre un algorithme et un programme',
    'Connaître la structure d\'un algorithme : en-tête, déclarations, corps',
    'Repérer les entrées, le traitement et les sorties',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: "Qu'est-ce qu'un algorithme ?", sousTitre: 'Le résumé en 1 minute 30', narration: "Qu'est-ce qu'un algorithme ? Voici l'essentiel en une minute trente." },
      {
        type: 'points',
        titre: 'Un algorithme, c\'est…',
        points: ['Une suite d\'instructions', 'Précises et dans un ordre donné', 'Qui se termine', 'Pour résoudre un problème'],
        narration: "Un algorithme est une suite d'instructions précises, écrites dans un ordre donné, qui se termine et qui permet de résoudre un problème.",
      },
      {
        type: 'comparaison',
        titre: 'Algorithme ou programme ?',
        colonnes: [
          { nom: 'Algorithme', texte: 'En français, sur papier, compréhensible par un humain' },
          { nom: 'Programme', texte: 'Dans un langage (C, JavaScript…), exécuté par l\'ordinateur' },
        ],
        narration: "L'algorithme s'écrit en français, sur papier. Le programme est sa traduction dans un langage que l'ordinateur sait exécuter.",
      },
      {
        type: 'code',
        titre: 'La structure d\'un algorithme',
        lignes: ['Algorithme Bienvenue', 'Variables', '    prenom : chaîne', 'Début', '    Lire(prenom)', '    Écrire("Bonjour ", prenom)', 'Fin'],
        etapes: [
          { ligne: 0, variables: { prenom: '?' }, note: 'L\'en-tête : le nom de l\'algorithme' },
          { ligne: 2, variables: { prenom: '?' }, note: 'Les déclarations : les variables utilisées' },
          { ligne: 4, variables: { prenom: 'Awa' }, note: 'Le corps : entrée de la donnée' },
          { ligne: 5, variables: { prenom: 'Awa' }, sortie: 'Bonjour Awa', note: 'Sortie du résultat' },
        ],
        narration: "Un algorithme a trois parties : l'en-tête avec son nom, les déclarations des variables, puis le corps, entre Début et Fin, qui contient les instructions.",
      },
      {
        type: 'points',
        titre: 'Entrée → Traitement → Sortie',
        points: ['Entrée : les données qu\'on lit', 'Traitement : les calculs', 'Sortie : les résultats qu\'on affiche'],
        narration: "Presque tous les algorithmes suivent le même schéma : on lit des données, on les traite, puis on affiche les résultats.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Une définition simple' },
    {
      type: 'texte',
      contenu:
        "Un **algorithme** est une **suite finie d'instructions précises**, écrites **dans un ordre donné**, qui permet de **résoudre un problème**. Ce mot fait peur au début, mais tu utilises des algorithmes tous les jours sans le savoir.",
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Exemple de la vie courante : envoyer de l\'argent par Mobile Money',
      elements: [
        '1. Composer le code du service sur le téléphone',
        '2. Choisir « Transfert d\'argent »',
        '3. Saisir le numéro du destinataire',
        '4. Saisir le montant',
        '5. Saisir le code secret',
        '6. Lire le message de confirmation',
      ],
    },
    {
      type: 'texte',
      contenu:
        "Cette liste est un algorithme : chaque étape est **précise**, elles sont dans un **ordre** qui compte (on ne peut pas saisir le code secret avant le montant), et la suite **se termine**. Si on inverse deux étapes ou si une étape est floue (« envoyer l'argent »), ça ne marche plus.",
    },
    {
      type: 'tableau',
      titre: 'Les qualités d\'un bon algorithme',
      entetes: ['Qualité', 'Signification', 'Contre-exemple'],
      lignes: [
        ['Précis', 'Chaque instruction a un seul sens possible', '« Ajoute un peu de sel »'],
        ['Ordonné', 'Les instructions s\'exécutent l\'une après l\'autre, dans l\'ordre écrit', 'Afficher le total avant de l\'avoir calculé'],
        ['Fini', 'Il s\'arrête au bout d\'un nombre limité d\'étapes', 'Une répétition qui ne s\'arrête jamais'],
        ['Correct', 'Il donne le bon résultat pour toutes les données prévues', 'Une moyenne fausse quand une note vaut 0'],
      ],
    },

    { type: 'titre', contenu: '2. Algorithme ou programme ?' },
    {
      type: 'texte',
      contenu:
        "L'ordinateur ne comprend pas le français. Le développeur écrit d'abord l'**algorithme** (la méthode, en français), puis le **traduit** dans un langage de programmation (C, Pascal, JavaScript, Python…) : on obtient un **programme**. Un même algorithme peut être traduit dans plusieurs langages.",
    },
    {
      type: 'tableau',
      entetes: ['', 'Algorithme', 'Programme'],
      lignes: [
        ['Écrit en', 'Français structuré (pseudo-code)', 'Un langage : C, Pascal, JavaScript…'],
        ['Destiné à', 'Un humain (toi, ton professeur, l\'examinateur)', 'L\'ordinateur'],
        ['Exécuté par', 'Personne : on le déroule « à la main »', 'L\'ordinateur'],
        ['Exemple', 'Écrire("Bonjour")', 'printf("Bonjour"); ou console.log("Bonjour");'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Pourquoi passer par l\'algorithme ?',
      contenu:
        "Parce qu'il est beaucoup plus facile de réfléchir à la **méthode** sans se soucier des points-virgules et des parenthèses d'un langage. Une fois l'algorithme juste, la traduction est presque mécanique. C'est aussi ce qu'on te demande à l'épreuve écrite du BTS.",
    },

    { type: 'titre', contenu: '3. La structure d\'un algorithme' },
    {
      type: 'texte',
      contenu: 'En BTS, un algorithme s\'écrit toujours avec la même structure en trois parties :',
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Structure générale',
      code: `Algorithme NomDeLAlgorithme      // 1. l'en-tête
Constante                         // 2. les déclarations
    ...
Variables
    ...
Début                             // 3. le corps
    instruction 1
    instruction 2
    ...
Fin`,
    },
    {
      type: 'tableau',
      entetes: ['Partie', 'Rôle', 'Obligatoire ?'],
      lignes: [
        ['En-tête', 'Donne un nom à l\'algorithme (un seul mot, sans espace)', 'Oui'],
        ['Constantes', 'Valeurs fixes utilisées par l\'algorithme (taux de TVA…)', 'Seulement s\'il y en a'],
        ['Variables', 'Liste de toutes les variables avec leur type', 'Oui, dès qu\'on utilise une variable'],
        ['Corps (Début … Fin)', 'Les instructions, exécutées de haut en bas', 'Oui'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple complet : saluer l\'utilisateur',
      code: `Algorithme Bienvenue
Variables
    prenom : chaîne
Début
    Écrire("Quel est ton prénom ? ")
    Lire(prenom)
    Écrire("Bonjour ", prenom, ", bienvenue sur IDAcademy !")
Fin`,
      legende:
        "Si l'utilisateur tape Awa, l'algorithme affiche : « Bonjour Awa, bienvenue sur IDAcademy ! ». Les instructions `Lire` et `Écrire` sont détaillées dans la leçon 4.",
    },

    { type: 'titre', contenu: '4. Entrée → Traitement → Sortie' },
    {
      type: 'texte',
      contenu:
        "Presque tous les algorithmes suivent le même schéma. Avant d'écrire la moindre ligne, pose-toi toujours ces trois questions :",
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "**Entrées** : de quelles données ai-je besoin ? (ce que l'utilisateur doit saisir)",
        '**Traitement** : quels calculs dois-je faire avec ces données ?',
        '**Sorties** : quels résultats dois-je afficher ?',
      ],
    },
    {
      type: 'tableau',
      titre: 'Exemple : calculer la surface d\'une salle de classe rectangulaire',
      entetes: ['Étape', 'Contenu'],
      lignes: [
        ['Entrées', 'La longueur et la largeur de la salle'],
        ['Traitement', 'surface ← longueur × largeur'],
        ['Sortie', 'Afficher la surface'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme SurfaceSalle
Variables
    longueur, largeur, surface : réel
Début
    Écrire("Longueur (en m) : ")
    Lire(longueur)                      // entrée
    Écrire("Largeur (en m) : ")
    Lire(largeur)                       // entrée
    surface ← longueur * largeur        // traitement
    Écrire("Surface : ", surface, " m²") // sortie
Fin`,
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Un algorithme est une suite **finie** d\'instructions **précises** et **ordonnées** qui résout un problème.',
        'Le **programme** est la traduction de l\'algorithme dans un langage.',
        'Structure : **en-tête**, **déclarations** (constantes, variables), **corps** entre Début et Fin.',
        'Avant d\'écrire : repère les **entrées**, le **traitement** et les **sorties**.',
      ],
    },
    {
      type: 'quiz',
      question: 'Lequel de ces éléments n\'est PAS une qualité d\'un algorithme ?',
      options: ['Être précis', 'Être écrit en langage C', 'Se terminer'],
      bonneReponse: 1,
      explication: "Un algorithme est indépendant de tout langage : il s'écrit en français structuré. C'est le programme qui est écrit en C.",
    },
    {
      type: 'quiz',
      question: 'Dans un algorithme qui calcule le prix TTC à partir du prix HT, le prix HT est…',
      options: ['Une entrée', 'Un traitement', 'Une sortie'],
      bonneReponse: 0,
      explication: 'Le prix HT est une donnée fournie au départ : c\'est une entrée. Le calcul est le traitement, et le prix TTC affiché est la sortie.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : remettre dans l\'ordre',
      enonce: "Voici les étapes pour retirer de l'argent à un distributeur, dans le désordre. Remets-les dans le bon ordre.",
      questions: [
        'Prendre les billets',
        'Insérer la carte',
        'Saisir le montant',
        'Récupérer la carte',
        'Saisir le code secret',
        'Choisir « Retrait »',
      ],
      langage: 'texte',
      solution: `1. Insérer la carte
2. Saisir le code secret
3. Choisir « Retrait »
4. Saisir le montant
5. Récupérer la carte
6. Prendre les billets`,
      explication:
        "Certaines étapes dépendent d'autres : on ne peut pas saisir le code avant d'avoir inséré la carte, ni saisir le montant avant d'avoir choisi l'opération. C'est exactement ce qu'on appelle l'ordre des instructions. (Beaucoup de distributeurs rendent la carte avant les billets pour qu'on ne l'oublie pas.)",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : entrées, traitement, sorties',
      enonce: 'Pour chaque problème, indique les entrées, le traitement et les sorties.',
      questions: [
        'Calculer la moyenne de trois notes.',
        'Calculer le prix TTC d\'un article à partir de son prix HT (TVA de 18 %).',
        'Convertir une somme en francs CFA en euros (1 € = 655,957 F CFA).',
      ],
      langage: 'texte',
      solution: `1. Entrées : note1, note2, note3
   Traitement : moyenne ← (note1 + note2 + note3) / 3
   Sortie : la moyenne

2. Entrée : prixHT
   Traitement : prixTTC ← prixHT + prixHT × 0,18  (ou prixHT × 1,18)
   Sortie : le prix TTC

3. Entrée : sommeFCFA
   Traitement : sommeEuros ← sommeFCFA / 655,957
   Sortie : la somme en euros`,
      explication:
        "Les entrées sont toujours ce qu'on ne connaît pas à l'avance (l'utilisateur les saisit). Les valeurs fixes, comme 18 % ou 655,957, ne sont pas des entrées : ce sont des constantes, qu'on verra dans la leçon suivante.",
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Analyse d\'un algorithme',
      enonce:
        "On donne l'algorithme suivant :\n\nAlgorithme Calcul\nVariables\n    a, b, c : entier\nDébut\n    Écrire(\"Entrer deux nombres : \")\n    Lire(a)\n    Lire(b)\n    c ← a * b\n    Écrire(\"Résultat : \", c)\nFin",
      questions: [
        'Recopie l\'algorithme et identifie ses trois parties (en-tête, déclarations, corps).',
        'Quelles sont les entrées ? le traitement ? la sortie ?',
        "Qu'affiche l'algorithme si l'utilisateur saisit 7 puis 6 ?",
        'Propose un nom plus parlant pour l\'algorithme et pour la variable c.',
      ],
      langage: 'texte',
      solution: `1. En-tête : Algorithme Calcul
   Déclarations : Variables  a, b, c : entier
   Corps : tout ce qui se trouve entre Début et Fin

2. Entrées : a et b (lus au clavier)
   Traitement : c ← a * b (le produit des deux nombres)
   Sortie : l'affichage de c

3. a = 7, b = 6, c = 7 × 6 = 42
   Affichage : Résultat : 42

4. Algorithme Produit (ou ProduitDeuxNombres)
   c peut s'appeler produit.`,
      explication:
        "Les noms parlants (produit au lieu de c) rendent l'algorithme plus lisible et sont appréciés par les correcteurs. Sur ta copie, pour la question 3, montre toujours le calcul (7 × 6 = 42) et pas seulement le résultat.",
    },
  ],
  exercice: {
    id: 'algo-premier-programme',
    titre: 'Ton premier programme',
    consigne: 'Complète le programme pour qu\'il affiche deux lignes : « Bienvenue sur IDAcademy » puis « Je prépare mon BTS IDA ».',
    langage: 'javascript',
    codeDepart: `// console.log affiche un message (c'est l'équivalent de Écrire)
console.log("Bienvenue sur IDAcademy");
// Ajoute la deuxième ligne ici

`,
    sortieAttendue: ['Bienvenue sur IDAcademy', 'Je prépare mon BTS IDA'],
    indice: 'Recopie la ligne console.log(...) en changeant le texte entre les guillemets.',
    solution: `console.log("Bienvenue sur IDAcademy");
console.log("Je prépare mon BTS IDA");
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'variables-types-constantes',
  titre: 'Variables, types et constantes',
  duree: '20 min',
  objectifs: [
    'Comprendre ce qu\'est une variable',
    'Choisir le bon type : entier, réel, caractère, chaîne, booléen',
    'Déclarer des variables et des constantes correctement',
    'Donner des noms valides et parlants',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Variables, types et constantes', sousTitre: 'Le résumé en 1 minute 30', narration: 'Variables, types et constantes : voici l\'essentiel.' },
      {
        type: 'points',
        titre: 'Une variable, c\'est une boîte',
        points: ['Un NOM (l\'étiquette)', 'Un TYPE (ce qu\'elle peut contenir)', 'Une VALEUR (ce qu\'elle contient)', 'Une seule valeur à la fois'],
        narration: "Une variable est comme une boîte dans la mémoire. Elle a un nom, un type, et une valeur. Elle ne contient qu'une seule valeur à la fois.",
      },
      {
        type: 'comparaison',
        titre: 'Les 5 types',
        colonnes: [
          { nom: 'entier · réel', texte: '19 · 12,5 · 3500' },
          { nom: 'caractère · chaîne', texte: '\'A\' · "Abidjan"' },
          { nom: 'booléen', texte: 'Vrai ou Faux' },
        ],
        narration: "Il y a cinq types de base. Entier pour les nombres sans virgule, réel avec virgule. Caractère pour une seule lettre, chaîne pour un texte. Et booléen pour vrai ou faux.",
      },
      {
        type: 'code',
        titre: 'Déclarer',
        lignes: ['Constante', '    TVA = 0.18', 'Variables', '    age : entier', '    moyenne : réel', '    nom : chaîne', '    admis : booléen'],
        etapes: [
          { ligne: 1, variables: { TVA: '0.18' }, note: 'Une constante ne change jamais' },
          { ligne: 3, variables: { TVA: '0.18', age: '?' } },
          { ligne: 4, variables: { TVA: '0.18', age: '?', moyenne: '?' } },
          { ligne: 6, variables: { TVA: '0.18', age: '?', moyenne: '?', admis: '?' }, note: 'Déclarée = créée, mais pas encore remplie' },
        ],
        narration: "On déclare les constantes, qui ne changent jamais, puis chaque variable avec son type. Une variable déclarée existe, mais elle ne contient encore rien de connu.",
      },
      {
        type: 'points',
        titre: 'Bien nommer',
        points: ['Commence par une lettre', 'Pas d\'espace, pas d\'accent', 'Un nom qui dit ce qu\'elle contient', 'moyenneGenerale plutôt que mg'],
        narration: "Pour les noms : commence par une lettre, sans espace ni accent, et choisis un nom qui dit ce que la variable contient.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Qu\'est-ce qu\'une variable ?' },
    {
      type: 'texte',
      contenu:
        "Un algorithme a besoin de **retenir des informations** : le prénom de l'utilisateur, une note, un total… Il les range dans des **variables**. Une variable, c'est comme une **boîte avec une étiquette**, rangée dans la mémoire de l'ordinateur.",
    },
    {
      type: 'tableau',
      entetes: ['Caractéristique', 'Signification', 'Exemple'],
      lignes: [
        ['Nom', 'L\'étiquette collée sur la boîte, pour la retrouver', 'moyenne'],
        ['Type', 'Ce que la boîte a le droit de contenir', 'réel (un nombre à virgule)'],
        ['Valeur', 'Ce que la boîte contient à un instant donné', '13,5'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Une seule valeur à la fois',
      contenu:
        "Une variable ne contient **qu'une seule valeur** à un instant donné. Si on y range une nouvelle valeur, l'ancienne est **effacée définitivement**. C'est pour ça qu'on dit « variable » : sa valeur peut varier pendant l'exécution.",
    },

    { type: 'titre', contenu: '2. Les cinq types de base' },
    {
      type: 'tableau',
      entetes: ['Type', 'Contient', 'Exemples de valeurs', 'Exemples d\'utilisation'],
      lignes: [
        ['entier', 'Un nombre sans virgule (positif ou négatif)', '19 ; -4 ; 3500', 'âge, nombre d\'étudiants, quantité, prix en F CFA'],
        ['réel', 'Un nombre avec ou sans virgule', '12,5 ; 0,18 ; -3,75', 'moyenne, taille, taux, montant en euros'],
        ['caractère', 'Un seul caractère, entre apostrophes', "'A' ; 'O' ; '7' ; '?'", 'sexe (\'M\'/\'F\'), réponse (\'O\'/\'N\'), mention'],
        ['chaîne', 'Un texte (suite de caractères), entre guillemets', '"Koné" ; "Abidjan" ; "07 08 09 10 11"', 'nom, ville, matricule, numéro de téléphone'],
        ['booléen', 'Seulement deux valeurs possibles', 'Vrai ; Faux', 'admis, payé, abonné'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Le piège du numéro de téléphone',
      contenu:
        "Un numéro de téléphone contient des chiffres, mais ce n'est **pas** un nombre : on ne fait jamais de calcul avec, et en Côte d'Ivoire il commence par 0 (07…, 05…, 01…). Rangé dans un entier, le 0 du début disparaîtrait ! On le range donc dans une **chaîne**. Même chose pour un matricule ou un code postal.",
    },
    {
      type: 'texte',
      contenu:
        "Pour choisir le type, pose-toi la question : **est-ce que je vais faire des calculs avec cette donnée ?** Si oui, c'est un nombre (entier ou réel). Si non, c'est un caractère ou une chaîne. Et si la réponse est oui/non, c'est un booléen.",
    },

    { type: 'titre', contenu: '3. Déclarer les variables' },
    {
      type: 'texte',
      contenu:
        'Toute variable doit être **déclarée** avant d\'être utilisée, dans la partie `Variables`. On écrit son nom, deux-points, puis son type. Plusieurs variables du même type peuvent être déclarées sur la même ligne, séparées par des virgules.',
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple de déclarations',
      code: `Variables
    age, nbEtudiants : entier
    moyenne, taille : réel
    sexe : caractère
    nom, ville, telephone : chaîne
    admis : booléen`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Déclarée ne veut pas dire remplie',
      contenu:
        "Déclarer une variable crée la boîte, mais ne met **rien de connu dedans**. Utiliser une variable avant de lui avoir donné une valeur est une erreur classique : par exemple, calculer `total ← total + prix` sans avoir écrit `total ← 0` avant.",
    },

    { type: 'titre', contenu: '4. Bien nommer ses variables' },
    {
      type: 'liste',
      elements: [
        'Le nom commence par une **lettre**.',
        'Il ne contient **ni espace, ni accent, ni caractère spécial** (seuls les lettres, les chiffres et le tiret bas _ sont autorisés).',
        'Il ne doit pas être un **mot réservé** (Début, Fin, Si, Pour, Lire…).',
        'Il doit être **parlant** : on doit comprendre ce qu\'il contient en le lisant.',
        'Pour un nom en plusieurs mots, on colle les mots avec une majuscule : `moyenneGenerale`, `prixUnitaire`.',
      ],
    },
    {
      type: 'tableau',
      entetes: ['Nom proposé', 'Valide ?', 'Pourquoi'],
      lignes: [
        ['moyenneGenerale', 'Oui', 'Commence par une lettre, parlant'],
        ['note1', 'Oui', 'Les chiffres sont autorisés après la première lettre'],
        ['prix_ttc', 'Oui', 'Le tiret bas est autorisé'],
        ['1erNote', 'Non', 'Commence par un chiffre'],
        ['prix total', 'Non', 'Contient un espace'],
        ['année', 'Non', 'Contient un accent → écrire annee'],
        ['Début', 'Non', 'Mot réservé'],
        ['x', 'Valide mais à éviter', 'Ne dit pas ce qu\'il contient'],
      ],
    },

    { type: 'titre', contenu: '5. Les constantes' },
    {
      type: 'texte',
      contenu:
        "Une **constante** est une valeur qui **ne change jamais** pendant l'exécution. On la déclare dans la partie `Constante`, avec le signe `=` et sa valeur. Par convention, on écrit son nom en MAJUSCULES.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Constante
    TVA = 0.18                 // TVA de 18 % en Côte d'Ivoire
    TAUX_EURO = 655.957        // 1 € = 655,957 F CFA
    NB_MOIS = 12`,
    },
    {
      type: 'texte',
      contenu:
        "Pourquoi ne pas écrire directement 0.18 dans les calculs ? Parce que si la TVA change un jour, il suffit de modifier **une seule ligne**. Et `prix * TVA` est bien plus clair que `prix * 0.18` pour quelqu'un qui lit l'algorithme.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Une variable a un **nom**, un **type** et une **valeur** ; elle ne contient qu\'une valeur à la fois.',
        'Types : **entier**, **réel**, **caractère** (\'A\'), **chaîne** ("texte"), **booléen** (Vrai/Faux).',
        'On fait des calculs avec la donnée ? → nombre. Sinon → caractère ou chaîne.',
        'Toute variable se **déclare** avant d\'être utilisée ; une constante ne change jamais.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quel type choisir pour le matricule d\'un étudiant, par exemple « 24IDA0157 » ?',
      options: ['entier', 'réel', 'chaîne'],
      bonneReponse: 2,
      explication: 'Le matricule contient des lettres et des chiffres, et on ne fait aucun calcul avec : c\'est une chaîne.',
    },
    {
      type: 'quiz',
      question: 'Quel nom de variable est valide ?',
      options: ['2emeNote', 'note_finale', 'note finale'],
      bonneReponse: 1,
      explication: '2emeNote commence par un chiffre et « note finale » contient un espace. note_finale respecte toutes les règles.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : choisir le type',
      enonce: 'Indique le type le plus adapté pour chaque donnée, et justifie.',
      questions: [
        'Le nombre d\'enfants d\'une famille',
        'Le prix d\'un litre d\'essence en euros',
        'Le numéro de téléphone d\'un client',
        'Le fait qu\'une facture soit payée ou non',
        'La lettre de la mention obtenue (A, B, C…)',
        'Le nom de la commune d\'un étudiant',
      ],
      langage: 'texte',
      solution: `1. entier : on ne peut pas avoir 2,5 enfants.
2. réel : un prix en euros a des centimes (1,35 €).
3. chaîne : on ne calcule pas avec, et le 0 du début doit être gardé.
4. booléen : deux possibilités seulement (Vrai = payée, Faux = non payée).
5. caractère : une seule lettre.
6. chaîne : c'est un texte (« Yopougon », « Cocody »…).`,
      explication: 'La bonne question à se poser : quelles valeurs peut prendre la donnée, et va-t-on faire des calculs avec ?',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : corriger les noms',
      enonce: 'Les noms de variables suivants sont-ils valides ? Si non, propose une correction.',
      questions: ['nom client', 'prixHT', '3notes', 'quantité', 'Fin', 'total_general'],
      langage: 'texte',
      solution: `1. nom client → non (espace) → nomClient
2. prixHT → oui
3. 3notes → non (commence par un chiffre) → notes3 ou troisNotes
4. quantité → non (accent) → quantite
5. Fin → non (mot réservé) → finPeriode, dateFin…
6. total_general → oui`,
      explication: 'En cas de doute, choisis un nom simple, sans accent, collé avec des majuscules : c\'est la convention la plus utilisée.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les déclarations d\'une application de scolarité',
      enonce:
        "Un établissement veut informatiser l'inscription de ses étudiants. Pour chaque étudiant, on enregistre : son matricule, son nom, son prénom, son sexe (M ou F), son âge, son numéro de téléphone, sa moyenne de l'année précédente et s'il a payé ses frais d'inscription. Les frais d'inscription sont de 150 000 F pour tous les étudiants.",
    questions: [
        'Établis le dictionnaire des données : pour chaque information, donne un nom de variable et un type.',
        'Quelle information doit être une constante ? Pourquoi ?',
        'Écris la partie déclarations (Constante et Variables) de l\'algorithme.',
      ],
      langage: 'texte',
      solution: `1. Dictionnaire des données :
| Information               | Nom          | Type      |
| Matricule                 | matricule    | chaîne    |
| Nom                       | nom          | chaîne    |
| Prénom                    | prenom       | chaîne    |
| Sexe                      | sexe         | caractère |
| Âge                       | age          | entier    |
| Numéro de téléphone       | telephone    | chaîne    |
| Moyenne année précédente  | moyenne      | réel      |
| Frais payés ?             | fraisPayes   | booléen   |

2. Les frais d'inscription (150 000 F) : c'est la même valeur pour
   tous les étudiants et elle ne change pas pendant l'exécution.

3. Déclarations :
Constante
    FRAIS_INSCRIPTION = 150000
Variables
    matricule, nom, prenom, telephone : chaîne
    sexe : caractère
    age : entier
    moyenne : réel
    fraisPayes : booléen`,
      explication:
        "Le « dictionnaire des données » est un tableau qu'on te demandera aussi en Merise : il faut savoir le faire proprement, avec une colonne pour le nom et une pour le type. Les points se gagnent sur le choix du type : téléphone et matricule en chaîne, sexe en caractère, paiement en booléen.",
    },
  ],
  exercice: {
    id: 'algo-variables-affichage',
    titre: 'Déclarer et afficher des variables',
    consigne:
      'Déclare trois variables nom, age et moyenne avec les valeurs « Koné », 20 et 13.5, puis affiche les trois lignes attendues.',
    langage: 'javascript',
    codeDepart: `// En JavaScript, on déclare une variable avec let :
// let ville = "Abidjan";
// Déclare ici nom, age et moyenne


console.log("Nom : " + nom);
console.log("Âge : " + age);
console.log("Moyenne : " + moyenne);
`,
    sortieAttendue: ['Nom : Koné', 'Âge : 20', 'Moyenne : 13.5'],
    indice: 'let nom = "Koné"; let age = 20; let moyenne = 13.5; (en JavaScript, la virgule s\'écrit avec un point)',
    solution: `let nom = "Koné";
let age = 20;
let moyenne = 13.5;

console.log("Nom : " + nom);
console.log("Âge : " + age);
console.log("Moyenne : " + moyenne);
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'affectation-et-calculs',
  titre: "L'affectation et les calculs",
  duree: '25 min',
  objectifs: [
    'Donner une valeur à une variable avec ←',
    'Utiliser les opérateurs, dont DIV et MOD',
    'Respecter les priorités de calcul',
    'Échanger le contenu de deux variables',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: "L'affectation et les calculs", sousTitre: 'Le résumé en 2 minutes', narration: "L'affectation et les calculs, résumés en deux minutes." },
      {
        type: 'code',
        titre: 'x ← x + 1 : comment ça marche ?',
        lignes: ['x ← 5', 'x ← x + 1', 'x ← x * 2'],
        etapes: [
          { ligne: 0, variables: { x: '5' }, note: 'x reçoit 5' },
          { ligne: 1, variables: { x: '6' }, note: 'On calcule d\'abord à droite : 5 + 1 = 6' },
          { ligne: 2, variables: { x: '12' }, note: '6 × 2 = 12 : l\'ancienne valeur est effacée' },
        ],
        narration: "La flèche signifie reçoit. On calcule toujours d'abord la partie de droite, puis on range le résultat dans la variable de gauche. L'ancienne valeur est effacée.",
      },
      {
        type: 'points',
        titre: 'DIV et MOD',
        points: ['17 DIV 5 = 3 (le quotient)', '17 MOD 5 = 2 (le reste)', 'n MOD 2 = 0 → n est pair', '125 s = 125 DIV 60 min et 125 MOD 60 s'],
        narration: "Deux opérateurs très utiles : DIV donne le quotient de la division entière, MOD donne le reste. Dix-sept DIV cinq égale trois, reste deux. Un nombre est pair si son reste par deux vaut zéro.",
      },
      {
        type: 'code',
        titre: 'Échanger deux variables',
        lignes: ['temp ← a', 'a ← b', 'b ← temp'],
        etapes: [
          { ligne: 0, variables: { a: '3', b: '8', temp: '3' }, note: 'On met a de côté' },
          { ligne: 1, variables: { a: '8', b: '8', temp: '3' } },
          { ligne: 2, variables: { a: '8', b: '3', temp: '3' }, note: 'Échange réussi !' },
        ],
        narration: "Pour échanger deux variables, il faut une troisième variable temporaire, sinon on perd une des deux valeurs. C'est un grand classique de l'examen.",
      },
      {
        type: 'points',
        titre: 'Les priorités',
        points: ['* / DIV MOD avant + et -', '2 + 3 * 4 = 14', '(2 + 3) * 4 = 20', 'Moyenne : (a + b) / 2'],
        narration: "Attention aux priorités : multiplication et division passent avant l'addition. Pour une moyenne, n'oublie jamais les parenthèses.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. L\'affectation : ranger une valeur' },
    {
      type: 'texte',
      contenu:
        "L'**affectation** est l'instruction qui **range une valeur dans une variable**. Elle s'écrit avec une flèche vers la gauche `←`, et se lit « **reçoit** ».",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `age ← 19                 // age reçoit 19
nom ← "Traoré"           // nom reçoit le texte "Traoré"
total ← prix * quantite  // total reçoit le résultat du calcul`,
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "L'ordinateur **calcule d'abord** la partie de **droite** de la flèche.",
        'Il **range le résultat** dans la variable de **gauche**.',
        "L'ancienne valeur de cette variable est **effacée**.",
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'La flèche n\'est pas le signe égal',
      contenu:
        "En mathématiques, `x = x + 1` est impossible. En algorithmique, `x ← x + 1` est tout à fait normal : « x reçoit l'ancienne valeur de x, plus 1 ». À gauche de la flèche, il y a **toujours une seule variable** : `x + 1 ← x` n'a aucun sens.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 1 : l\'ordre des instructions compte',
      code: `a ← 3
b ← a + 2
a ← 10
Écrire(a, " ", b)`,
    },
    {
      type: 'tableau',
      titre: 'Trace',
      entetes: ['Instruction', 'a', 'b', 'Commentaire'],
      lignes: [
        ['a ← 3', '3', '?', ''],
        ['b ← a + 2', '3', '5', 'On calcule 3 + 2 avec la valeur actuelle de a'],
        ['a ← 10', '10', '5', 'b ne change pas : il a été calculé avant'],
        ['Écrire(a, " ", b)', '10', '5', 'Affiche : 10 5'],
      ],
      legende:
        "Beaucoup d'étudiants répondent « 10 12 », comme si b se recalculait tout seul. C'est faux : b a reçu une valeur (5) au moment de son affectation, et rien ne la change ensuite.",
    },

    { type: 'titre', contenu: '2. Les opérateurs de calcul' },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'Signification', 'Exemple', 'Résultat'],
      lignes: [
        ['+', 'Addition', '7 + 3', '10'],
        ['-', 'Soustraction', '7 - 3', '4'],
        ['*', 'Multiplication', '7 * 3', '21'],
        ['/', 'Division (résultat réel)', '7 / 2', '3,5'],
        ['DIV', 'Quotient de la division entière', '17 DIV 5', '3'],
        ['MOD', 'Reste de la division entière', '17 MOD 5', '2'],
      ],
    },
    {
      type: 'texte',
      contenu:
        "`DIV` et `MOD` ne marchent qu'avec des **entiers**. Rappelle-toi la division posée de l'école primaire : 17 divisé par 5, ça fait **3** (le quotient, donné par DIV), et il **reste 2** (donné par MOD). En effet, 5 × 3 + 2 = 17.",
    },
    {
      type: 'tableau',
      titre: 'À quoi servent DIV et MOD ?',
      entetes: ['Besoin', 'Formule', 'Exemple'],
      lignes: [
        ['Savoir si n est pair', 'n MOD 2 = 0', '14 MOD 2 = 0 → pair ; 9 MOD 2 = 1 → impair'],
        ['Savoir si a est un multiple de b', 'a MOD b = 0', '25 MOD 5 = 0 → 25 est un multiple de 5'],
        ['Le dernier chiffre d\'un nombre', 'n MOD 10', '4527 MOD 10 = 7'],
        ['Enlever le dernier chiffre', 'n DIV 10', '4527 DIV 10 = 452'],
        ['Convertir des minutes en heures et minutes', 'h ← m DIV 60 et reste ← m MOD 60', '135 min = 2 h et 15 min'],
      ],
    },

    { type: 'titre', contenu: '3. Les priorités de calcul' },
    {
      type: 'texte',
      contenu:
        "Comme en mathématiques, `*`, `/`, `DIV` et `MOD` sont calculés **avant** `+` et `-`. Les **parenthèses** permettent d'imposer un autre ordre.",
    },
    {
      type: 'tableau',
      entetes: ['Expression', 'Calcul', 'Résultat'],
      lignes: [
        ['2 + 3 * 4', '3 * 4 d\'abord = 12, puis 2 + 12', '14'],
        ['(2 + 3) * 4', 'parenthèses d\'abord = 5, puis 5 * 4', '20'],
        ['10 - 4 / 2', '4 / 2 = 2, puis 10 - 2', '8'],
        ['20 MOD 6 + 1', '20 MOD 6 = 2, puis 2 + 1', '3'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'L\'erreur classique de la moyenne',
      contenu:
        "`moyenne ← note1 + note2 / 2` est **faux** : seule note2 est divisée par 2. Avec 12 et 14, on obtient 12 + 7 = 19 au lieu de 13. Il faut écrire `moyenne ← (note1 + note2) / 2`.",
    },

    { type: 'titre', contenu: '4. Échanger deux variables' },
    {
      type: 'texte',
      contenu:
        "C'est un exercice classique d'examen : échanger le contenu de deux variables a et b. La première idée qui vient est fausse :",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Faux',
      code: `a ← b
b ← a`,
      legende:
        "Avec a = 3 et b = 8 : après `a ← b`, a vaut 8 et la valeur 3 est **perdue**. Puis `b ← a` met 8 dans b. Résultat : a = 8 et b = 8.",
    },
    {
      type: 'texte',
      contenu:
        "Il faut une **troisième variable** (souvent appelée `temp`, pour temporaire) pour mettre une valeur de côté, comme quand on échange le contenu de deux verres avec un troisième verre vide.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Correct',
      code: `temp ← a
a ← b
b ← temp`,
    },
    {
      type: 'tableau',
      titre: 'Trace avec a = 3 et b = 8',
      entetes: ['Instruction', 'a', 'b', 'temp'],
      lignes: [
        ['Départ', '3', '8', '?'],
        ['temp ← a', '3', '8', '3'],
        ['a ← b', '8', '8', '3'],
        ['b ← temp', '8', '3', '3'],
      ],
    },

    { type: 'titre', contenu: '5. Assembler des textes' },
    {
      type: 'texte',
      contenu:
        "Avec des chaînes, le signe `+` sert à **coller** (on dit **concaténer**) des textes : `\"Bon\" + \"jour\"` donne `\"Bonjour\"`. Exemple : `nomComplet ← prenom + \" \" + nom` donne « Awa Koné » (le `\" \"` ajoute l'espace entre les deux).",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`←` se lit « reçoit » : on calcule à droite, on range à gauche, l\'ancienne valeur est effacée.',
        '`DIV` = quotient, `MOD` = reste. `n MOD 2 = 0` signifie que n est pair.',
        '`*`, `/`, `DIV`, `MOD` avant `+` et `-` ; utilise des parenthèses pour une moyenne.',
        'Pour échanger deux variables, il faut une variable temporaire.',
      ],
    },
    {
      type: 'quiz',
      question: 'Que vaut 23 MOD 4 ?',
      options: ['5', '3', '5,75'],
      bonneReponse: 1,
      explication: '23 = 4 × 5 + 3. Le quotient est 5 (23 DIV 4) et le reste est 3 (23 MOD 4).',
    },
    {
      type: 'quiz',
      question: 'Après x ← 4, puis y ← x * 2, puis x ← y + 1, que valent x et y ?',
      options: ['x = 9 et y = 8', 'x = 4 et y = 8', 'x = 9 et y = 18'],
      bonneReponse: 0,
      explication: 'x = 4, puis y = 4 × 2 = 8, puis x = 8 + 1 = 9. y ne change pas après son affectation : il vaut toujours 8.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : trace d\'une suite d\'affectations',
      enonce: 'Fais la trace de cette suite d\'instructions et donne les valeurs finales de a, b et c.\n\na ← 5\nb ← a * 2\nc ← a + b\na ← c - b\nb ← b MOD 3\nc ← c DIV a',
      langage: 'texte',
      solution: `| Instruction  | a  | b  | c  |
| a ← 5        | 5  | ?  | ?  |
| b ← a * 2    | 5  | 10 | ?  |
| c ← a + b    | 5  | 10 | 15 |
| a ← c - b    | 5  | 10 | 15 |   (15 - 10 = 5)
| b ← b MOD 3  | 5  | 1  | 15 |   (10 = 3 × 3 + 1)
| c ← c DIV a  | 5  | 1  | 3  |   (15 DIV 5 = 3)

Valeurs finales : a = 5, b = 1, c = 3`,
      explication: 'Une ligne par instruction, une colonne par variable : on ne change que la colonne de la variable à gauche de la flèche, les autres sont recopiées.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : convertir des secondes',
      enonce:
        "Écris un algorithme qui lit une durée en secondes et l'affiche en heures, minutes et secondes. Exemple : 3725 secondes = 1 h 2 min 5 s. Fais la trace avec 3725.",
      solution: `Algorithme ConversionDuree
Variables
    total, h, m, s, reste : entier
Début
    Écrire("Durée en secondes : ")
    Lire(total)
    h ← total DIV 3600
    reste ← total MOD 3600
    m ← reste DIV 60
    s ← reste MOD 60
    Écrire(h, " h ", m, " min ", s, " s")
Fin

Trace avec total = 3725 :
h     = 3725 DIV 3600 = 1
reste = 3725 MOD 3600 = 125
m     = 125 DIV 60 = 2
s     = 125 MOD 60 = 5
Affichage : 1 h 2 min 5 s`,
      explication:
        "Une heure = 3600 secondes et une minute = 60 secondes. DIV donne combien d'unités entières on peut former, MOD donne ce qui reste à répartir dans l'unité suivante.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 3 : corriger l\'échange',
      enonce: "Un étudiant a écrit ceci pour échanger x et y :\n\nx ← y\ny ← x\n\nFais la trace avec x = 12 et y = 7, explique l'erreur et corrige l'algorithme.",
      langage: 'texte',
      solution: `Trace :
| Instruction | x  | y  |
| Départ      | 12 | 7  |
| x ← y       | 7  | 7  |
| y ← x       | 7  | 7  |
Résultat : x = 7 et y = 7. L'échange a échoué.

Erreur : la première affectation efface la valeur 12 de x avant
qu'on ait pu la recopier dans y.

Correction (avec une variable temporaire) :
temp ← x
x ← y
y ← temp`,
      explication: 'Faire la trace est la meilleure façon de prouver qu\'un algorithme est faux, et de le montrer au correcteur.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La facture d\'une quincaillerie',
      enonce:
        "Une quincaillerie de Yopougon veut calculer automatiquement ses factures. Pour un article, on saisit son prix unitaire HT et la quantité achetée. La TVA est de 18 %. Le magasin accorde une remise fixe de 500 F sur le montant TTC.",
      questions: [
        'Identifie les entrées, les constantes et les sorties.',
        'Écris l\'algorithme qui affiche le montant HT, le montant de la TVA, le montant TTC et le net à payer.',
        'Fais la trace pour 3 sacs de ciment à 2 500 F HT l\'unité.',
      ],
      solution: `1. Entrées : prixUnitaire, quantite
   Constantes : TVA = 0.18, REMISE = 500
   Sorties : montant HT, montant TVA, montant TTC, net à payer

2. Algorithme Facture
Constante
    TVA = 0.18
    REMISE = 500
Variables
    quantite : entier
    prixUnitaire, montantHT, montantTVA, montantTTC, net : réel
Début
    Écrire("Prix unitaire HT : ")
    Lire(prixUnitaire)
    Écrire("Quantité : ")
    Lire(quantite)
    montantHT ← prixUnitaire * quantite
    montantTVA ← montantHT * TVA
    montantTTC ← montantHT + montantTVA
    net ← montantTTC - REMISE
    Écrire("Montant HT : ", montantHT, " F")
    Écrire("TVA : ", montantTVA, " F")
    Écrire("Montant TTC : ", montantTTC, " F")
    Écrire("Net à payer : ", net, " F")
Fin

3. Trace avec prixUnitaire = 2500 et quantite = 3 :
montantHT  = 2500 × 3 = 7 500
montantTVA = 7500 × 0,18 = 1 350
montantTTC = 7500 + 1350 = 8 850
net        = 8850 - 500 = 8 350
Affichage :
Montant HT : 7500 F
TVA : 1350 F
Montant TTC : 8850 F
Net à payer : 8350 F`,
      explication:
        "Les taux et montants fixes (18 %, 500 F) sont déclarés en constantes : c'est plus lisible et facile à modifier. L'ordre des calculs est important : on ne peut pas calculer la TVA avant le montant HT. Les montants sont en réel car la TVA peut donner des décimales.",
    },
  ],
  exercice: {
    id: 'algo-conversion-secondes',
    titre: 'Convertir des secondes',
    consigne: 'Le programme contient une durée de 3725 secondes. Calcule h, m et s pour afficher exactement « 1 h 2 min 5 s ».',
    langage: 'javascript',
    codeDepart: `let total = 3725;
// En JavaScript :
//   DIV s'écrit Math.floor(a / b)
//   MOD s'écrit a % b
let h = 0; // à corriger
let m = 0; // à corriger
let s = 0; // à corriger

console.log(h + " h " + m + " min " + s + " s");
`,
    sortieAttendue: ['1 h 2 min 5 s'],
    indice: 'h = Math.floor(total / 3600) ; le reste en secondes est total % 3600 ; puis m = Math.floor(reste / 60) et s = reste % 60.',
    solution: `let total = 3725;
let h = Math.floor(total / 3600);
let reste = total % 3600;
let m = Math.floor(reste / 60);
let s = reste % 60;

console.log(h + " h " + m + " min " + s + " s");
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 4
const lecon4: Lecon = {
  slug: 'lire-et-ecrire',
  titre: 'Lire et Écrire : dialoguer avec l\'utilisateur',
  duree: '20 min',
  objectifs: [
    'Afficher des messages et des résultats avec Écrire',
    'Récupérer une saisie avec Lire',
    'Écrire un algorithme complet et convivial',
    'Éviter les erreurs classiques d\'entrée-sortie',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Lire et Écrire', sousTitre: 'Le résumé en 1 minute 30', narration: 'Lire et Écrire : dialoguer avec l\'utilisateur, en une minute trente.' },
      {
        type: 'comparaison',
        titre: 'Deux instructions',
        colonnes: [
          { nom: 'Écrire', texte: 'Affiche un message ou une valeur à l\'écran (sortie)' },
          { nom: 'Lire', texte: 'Attend une saisie au clavier et la range dans une variable (entrée)' },
        ],
        narration: "Écrire affiche un message ou une valeur à l'écran. Lire attend que l'utilisateur tape une valeur, et la range dans une variable.",
      },
      {
        type: 'code',
        titre: 'Exemple : calculer son âge',
        lignes: ['Écrire("Année de naissance : ")', 'Lire(annee)', 'age ← 2026 - annee', 'Écrire("Tu as ", age, " ans")'],
        etapes: [
          { ligne: 0, variables: { annee: '?', age: '?' }, sortie: 'Année de naissance :', note: 'On affiche d\'abord une question' },
          { ligne: 1, variables: { annee: '2005', age: '?' }, note: 'L\'utilisateur tape 2005' },
          { ligne: 2, variables: { annee: '2005', age: '21' }, note: '2026 - 2005 = 21' },
          { ligne: 3, variables: { annee: '2005', age: '21' }, sortie: 'Tu as 21 ans' },
        ],
        narration: "On affiche toujours une question avant de lire, sinon l'utilisateur ne sait pas quoi taper. Ensuite on calcule, puis on affiche le résultat avec un message clair.",
      },
      {
        type: 'points',
        titre: 'Les erreurs à éviter',
        points: ['Lire("texte") : on ne lit que dans une variable', 'Écrire("age") affiche le mot age, pas sa valeur', 'Un Lire sans message avant', 'Afficher un résultat avant de le calculer'],
        narration: "Attention : on ne lit que dans une variable. Avec des guillemets, on affiche le texte, sans guillemets, la valeur. Et on n'affiche jamais un résultat avant de l'avoir calculé.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Écrire : afficher à l\'écran' },
    {
      type: 'texte',
      contenu:
        "L'instruction **Écrire** affiche quelque chose à l'écran : c'est une **sortie**. Elle peut afficher un **texte** (entre guillemets), la **valeur d'une variable** (sans guillemets), ou les deux à la suite, séparés par des virgules.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Écrire("Bienvenue !")               // affiche : Bienvenue !
Écrire(moyenne)                    // affiche la valeur, par ex. : 13.5
Écrire("Ta moyenne est ", moyenne) // affiche : Ta moyenne est 13.5
Écrire("Total : ", prix * 2, " F") // on peut afficher un calcul`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Avec ou sans guillemets ?',
      contenu:
        "`Écrire(\"moyenne\")` affiche le **mot** moyenne. `Écrire(moyenne)` affiche la **valeur** de la variable moyenne. Cette confusion coûte des points à beaucoup d'étudiants.",
    },

    { type: 'titre', contenu: '2. Lire : récupérer une saisie' },
    {
      type: 'texte',
      contenu:
        "L'instruction **Lire** arrête l'algorithme et **attend que l'utilisateur tape une valeur** au clavier (puis appuie sur Entrée). La valeur saisie est rangée dans la variable indiquée : c'est une **entrée**.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `Lire(age)          // la valeur tapée est rangée dans age
Lire(note1, note2) // on peut lire plusieurs variables d'un coup`,
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Toujours un message avant Lire',
      contenu:
        "Si l'algorithme fait `Lire(age)` sans rien afficher avant, l'utilisateur voit un écran vide et ne sait pas quoi taper. On écrit donc **toujours** un message qui explique ce qu'il faut saisir : `Écrire(\"Ton âge : \")` puis `Lire(age)`. On dit que l'algorithme est **convivial**, et les correcteurs le vérifient.",
    },

    { type: 'titre', contenu: '3. Un algorithme complet' },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple : calculer son âge',
      code: `Algorithme CalculAge
Constante
    ANNEE_EN_COURS = 2026
Variables
    prenom : chaîne
    annee, age : entier
Début
    Écrire("Ton prénom : ")
    Lire(prenom)
    Écrire("Ton année de naissance : ")
    Lire(annee)
    age ← ANNEE_EN_COURS - annee
    Écrire(prenom, ", tu as ou tu auras ", age, " ans cette année.")
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace : l\'utilisateur tape Yao, puis 2005',
      entetes: ['Instruction', 'prenom', 'annee', 'age', 'Écran'],
      lignes: [
        ['Écrire("Ton prénom : ")', '?', '?', '?', 'Ton prénom :'],
        ['Lire(prenom)', 'Yao', '?', '?', '(l\'utilisateur tape Yao)'],
        ['Écrire("Ton année…")', 'Yao', '?', '?', 'Ton année de naissance :'],
        ['Lire(annee)', 'Yao', '2005', '?', '(l\'utilisateur tape 2005)'],
        ['age ← 2026 - annee', 'Yao', '2005', '21', ''],
        ['Écrire(…)', 'Yao', '2005', '21', 'Yao, tu as ou tu auras 21 ans cette année.'],
      ],
    },

    { type: 'titre', contenu: '4. Les erreurs classiques' },
    {
      type: 'tableau',
      entetes: ['Faux', 'Pourquoi', 'Correct'],
      lignes: [
        ['Lire("Ton âge")', 'On ne peut lire que dans une variable', 'Écrire("Ton âge : ")\nLire(age)'],
        ['Lire(prix * 2)', 'Un calcul n\'est pas une variable', 'Lire(prix)\ntotal ← prix * 2'],
        ['Écrire(total)\ntotal ← a + b', 'On affiche avant d\'avoir calculé', 'total ← a + b\nÉcrire(total)'],
        ['moyenne ← (n1 + n2) / 2\nLire(n1, n2)', 'On calcule avec des valeurs pas encore lues', 'Lire(n1, n2)\nmoyenne ← (n1 + n2) / 2'],
      ],
      legende: 'Retiens l\'ordre logique : on lit les données, puis on calcule, puis on affiche.',
    },

    { type: 'titre', contenu: '5. Dans les langages' },
    {
      type: 'tableau',
      entetes: ['Algorithme', 'JavaScript', 'Langage C'],
      lignes: [
        ['Écrire("Bonjour")', 'console.log("Bonjour");', 'printf("Bonjour\\n");'],
        ['Écrire("Âge : ", age)', 'console.log("Âge : " + age);', 'printf("Âge : %d\\n", age);'],
        ['Lire(age)', 'age = Number(prompt("Âge ?"));', 'scanf("%d", &age);'],
      ],
      legende:
        "Dans l'éditeur IDAcademy, on ne peut pas encore saisir au clavier : les exercices donnent directement les valeurs dans le code.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '**Écrire** = sortie (affichage). Texte entre guillemets, variables sans guillemets.',
        '**Lire** = entrée : la valeur saisie va dans une **variable**.',
        'Toujours un **message** avant chaque Lire.',
        'Ordre logique : **lire → calculer → afficher**.',
      ],
    },
    {
      type: 'quiz',
      question: 'Qu\'affiche Écrire("Total : ", total) si total vaut 4500 ?',
      options: ['Total : total', 'Total : 4500', '4500'],
      bonneReponse: 1,
      explication: 'Le texte entre guillemets est affiché tel quel, et total (sans guillemets) est remplacé par sa valeur.',
    },
    {
      type: 'quiz',
      question: 'Quelle instruction est correcte ?',
      options: ['Lire("Votre nom")', 'Lire(nom)', 'Lire(nom + prenom)'],
      bonneReponse: 1,
      explication: 'Lire attend toujours une variable dans laquelle ranger la valeur saisie.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : surface et périmètre',
      enonce: 'Écris un algorithme qui lit la longueur et la largeur d\'un terrain rectangulaire, puis affiche sa surface et son périmètre.',
      solution: `Algorithme Terrain
Variables
    longueur, largeur, surface, perimetre : réel
Début
    Écrire("Longueur du terrain (m) : ")
    Lire(longueur)
    Écrire("Largeur du terrain (m) : ")
    Lire(largeur)
    surface ← longueur * largeur
    perimetre ← 2 * (longueur + largeur)
    Écrire("Surface : ", surface, " m²")
    Écrire("Périmètre : ", perimetre, " m")
Fin`,
      explication: 'Attention aux parenthèses du périmètre : 2 * (longueur + largeur). Sans elles, seule la longueur serait multipliée par 2.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : trouver les erreurs',
      enonce:
        "Cet algorithme contient 4 erreurs. Trouve-les et corrige-les.\n\nAlgorithme Moyenne\nVariables\n    n1, n2 : réel\nDébut\n    moy ← (n1 + n2) / 2\n    Lire(\"note 1\")\n    Lire(n2)\n    Écrire(\"moy\")\nFin",
      langage: 'texte',
      solution: `Erreurs :
1. La variable moy n'est pas déclarée.
2. Le calcul est fait avant la lecture des notes.
3. Lire("note 1") : on ne lit pas un texte, on lit dans la variable n1.
4. Écrire("moy") affiche le mot « moy » au lieu de sa valeur.
(En plus : pas de message avant les saisies.)

Version corrigée :
Algorithme Moyenne
Variables
    n1, n2, moy : réel
Début
    Écrire("Note 1 : ")
    Lire(n1)
    Écrire("Note 2 : ")
    Lire(n2)
    moy ← (n1 + n2) / 2
    Écrire("Moyenne : ", moy)
Fin`,
      explication: 'Ce type de question (« trouver et corriger les erreurs ») est fréquent : relis chaque ligne en te demandant si toutes les variables sont déclarées, si elles ont une valeur et si l\'ordre est logique.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le bulletin simplifié',
      enonce:
        "On veut calculer la moyenne d'un étudiant dans trois matières avec des coefficients différents : Algorithmique (coefficient 2), Base de données (coefficient 3) et Anglais (coefficient 1).",
      questions: [
        'Écris un algorithme qui lit le nom de l\'étudiant et ses trois notes, puis affiche son nom et sa moyenne pondérée. Les coefficients seront des constantes.',
        'Fais la trace pour un étudiant nommé Diallo ayant 12 en Algorithmique, 14 en Base de données et 9 en Anglais.',
        'Quelle modification faudrait-il faire si le coefficient d\'Anglais passait à 2 ?',
      ],
      solution: `1. Algorithme Bulletin
Constante
    COEF_ALGO = 2
    COEF_BD = 3
    COEF_ANG = 1
Variables
    nom : chaîne
    noteAlgo, noteBD, noteAng, moyenne : réel
Début
    Écrire("Nom de l'étudiant : ")
    Lire(nom)
    Écrire("Note d'Algorithmique : ")
    Lire(noteAlgo)
    Écrire("Note de Base de données : ")
    Lire(noteBD)
    Écrire("Note d'Anglais : ")
    Lire(noteAng)
    moyenne ← (noteAlgo * COEF_ALGO + noteBD * COEF_BD + noteAng * COEF_ANG)
              / (COEF_ALGO + COEF_BD + COEF_ANG)
    Écrire(nom, " a une moyenne de ", moyenne, " / 20")
Fin

2. Trace :
nom = Diallo, noteAlgo = 12, noteBD = 14, noteAng = 9
Numérateur : 12 × 2 + 14 × 3 + 9 × 1 = 24 + 42 + 9 = 75
Dénominateur : 2 + 3 + 1 = 6
moyenne = 75 / 6 = 12,5
Affichage : Diallo a une moyenne de 12.5 / 20

3. Il suffit de modifier une ligne : COEF_ANG = 2.
   Le calcul utilise les constantes, il n'y a rien d'autre à changer.`,
      explication:
        "Moyenne pondérée = somme des (note × coefficient) divisée par la somme des coefficients. Diviser par 3 (le nombre de matières) serait une erreur. La question 3 montre tout l'intérêt des constantes.",
    },
  ],
  exercice: {
    id: 'algo-moyenne-ponderee',
    titre: 'La moyenne pondérée',
    consigne:
      'Avec les notes 12 (coefficient 2), 14 (coefficient 3) et 9 (coefficient 1), calcule la moyenne pondérée et affiche « Moyenne : 12.5 ».',
    langage: 'javascript',
    codeDepart: `const COEF_ALGO = 2;
const COEF_BD = 3;
const COEF_ANG = 1;

let noteAlgo = 12;
let noteBD = 14;
let noteAng = 9;

let moyenne = 0; // à corriger : calcule la moyenne pondérée

console.log("Moyenne : " + moyenne);
`,
    sortieAttendue: ['Moyenne : 12.5'],
    indice: 'Somme des (note × coefficient), divisée par la somme des coefficients. N\'oublie pas les parenthèses !',
    solution: `const COEF_ALGO = 2;
const COEF_BD = 3;
const COEF_ANG = 1;

let noteAlgo = 12;
let noteBD = 14;
let noteAng = 9;

let moyenne = (noteAlgo * COEF_ALGO + noteBD * COEF_BD + noteAng * COEF_ANG)
  / (COEF_ALGO + COEF_BD + COEF_ANG);

console.log("Moyenne : " + moyenne);
`,
  },
}

export const leconsVariables: Lecon[] = [lecon1, lecon2, lecon3, lecon4]

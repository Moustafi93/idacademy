import type { Lecon } from '../types'

/*
 * Algorithmique — Chapitre 2 : Les conditions (structures alternatives)
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'si-alors',
  titre: 'Si … Alors : prendre une décision',
  duree: '20 min',
  objectifs: [
    'Comprendre pourquoi un algorithme a besoin de conditions',
    'Écrire une condition avec les opérateurs de comparaison',
    'Utiliser la structure Si … Alors … FinSi',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Si … Alors', sousTitre: 'Le résumé en 1 minute 30', narration: 'Si alors : prendre une décision. Voici l\'essentiel.' },
      {
        type: 'points',
        titre: 'Le problème',
        points: ['Jusqu\'ici : toutes les instructions s\'exécutent', 'Mais parfois, une action dépend d\'une situation', '« SI la moyenne ≥ 10, ALORS afficher Admis »'],
        narration: "Jusqu'ici, toutes les instructions s'exécutaient. Mais souvent, une action ne doit se faire que dans certaines situations : si la moyenne est supérieure ou égale à dix, alors on affiche admis.",
      },
      {
        type: 'code',
        titre: 'Exemple',
        lignes: ['Lire(moyenne)', 'Si moyenne >= 10 Alors', '    Écrire("Admis")', 'FinSi', 'Écrire("Fin")'],
        etapes: [
          { ligne: 0, variables: { moyenne: '13' }, note: 'Premier cas : moyenne = 13' },
          { ligne: 1, variables: { moyenne: '13' }, note: '13 >= 10 est VRAI' },
          { ligne: 2, variables: { moyenne: '13' }, sortie: 'Admis' },
          { ligne: 4, variables: { moyenne: '13' }, sortie: 'Fin' },
        ],
        narration: "Avec une moyenne de treize, la condition est vraie : on affiche admis, puis fin. Avec une moyenne de huit, la condition serait fausse : on sauterait directement à fin.",
      },
      {
        type: 'comparaison',
        titre: 'Les comparaisons',
        colonnes: [
          { nom: '= et ≠', texte: 'égal · différent' },
          { nom: '< et >', texte: 'strictement inférieur · supérieur' },
          { nom: '<= et >=', texte: 'inférieur ou égal · supérieur ou égal' },
        ],
        narration: "Pour écrire une condition, on compare avec six opérateurs : égal, différent, inférieur, supérieur, inférieur ou égal, et supérieur ou égal.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Pourquoi des conditions ?' },
    {
      type: 'texte',
      contenu:
        "Jusqu'à présent, nos algorithmes exécutaient **toutes** leurs instructions, de haut en bas, quelles que soient les données. Mais dans la réalité, on prend sans cesse des décisions : **si** la moyenne est d'au moins 10, l'étudiant est admis ; **si** le solde est suffisant, le retrait est accepté ; **si** l'article coûte plus de 50 000 F, on accorde une remise.",
    },
    {
      type: 'texte',
      contenu:
        "Pour cela, on utilise une **structure conditionnelle** (on dit aussi **alternative**) : un bloc d'instructions qui ne s'exécute **que si une condition est vraie**.",
    },

    { type: 'titre', contenu: '2. La syntaxe' },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Si condition Alors
    instructions      // exécutées seulement si la condition est vraie
FinSi`,
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "L'ordinateur évalue la **condition** : elle est soit **Vrai**, soit **Faux**.",
        'Si elle est **vraie**, il exécute les instructions entre `Alors` et `FinSi`.',
        'Si elle est **fausse**, il **saute** directement après `FinSi`.',
        'Dans les deux cas, l\'algorithme continue ensuite normalement.',
      ],
    },

    { type: 'titre', contenu: '3. Écrire une condition' },
    {
      type: 'texte',
      contenu: 'Une condition compare deux valeurs avec un **opérateur de comparaison**. Son résultat est un **booléen** (Vrai ou Faux).',
    },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'Signification', 'Exemple', 'Avec x = 10'],
      lignes: [
        ['=', 'égal à', 'x = 10', 'Vrai'],
        ['≠ (ou <>)', 'différent de', 'x ≠ 10', 'Faux'],
        ['<', 'strictement inférieur à', 'x < 10', 'Faux'],
        ['>', 'strictement supérieur à', 'x > 5', 'Vrai'],
        ['<=', 'inférieur ou égal à', 'x <= 10', 'Vrai'],
        ['>=', 'supérieur ou égal à', 'x >= 11', 'Faux'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Lis bien l\'énoncé : « plus de » ou « au moins » ?',
      elements: [
        '« au moins 10 », « 10 ou plus », « à partir de 10 » → `>= 10`',
        '« plus de 10 », « dépasse 10 », « supérieur à 10 » → `> 10`',
        '« moins de 18 ans » → `< 18`',
        'Une erreur entre > et >= change le résultat pour la valeur limite (ici 10) : c\'est une faute fréquente à l\'examen.',
      ],
    },

    { type: 'titre', contenu: '4. Exemples commentés' },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 1 : afficher « Admis »',
      code: `Algorithme Resultat
Variables
    moyenne : réel
Début
    Écrire("Moyenne de l'étudiant : ")
    Lire(moyenne)
    Si moyenne >= 10 Alors
        Écrire("Admis, félicitations !")
    FinSi
    Écrire("Fin du traitement")
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Deux exécutions',
      entetes: ['moyenne saisie', 'moyenne >= 10 ?', 'Ce qui s\'affiche'],
      lignes: [
        ['13', 'Vrai', 'Admis, félicitations !\nFin du traitement'],
        ['8', 'Faux', 'Fin du traitement'],
        ['10', 'Vrai (10 est égal à 10)', 'Admis, félicitations !\nFin du traitement'],
      ],
      legende: 'Teste toujours la valeur limite (ici 10) : c\'est elle qui révèle les erreurs entre > et >=.',
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 2 : une remise sur les gros achats',
      code: `Algorithme Remise
Constante
    SEUIL = 50000
    TAUX_REMISE = 0.10
Variables
    montant : réel
Début
    Écrire("Montant des achats : ")
    Lire(montant)
    Si montant > SEUIL Alors
        montant ← montant - montant * TAUX_REMISE
        Écrire("Remise de 10 % appliquée")
    FinSi
    Écrire("Montant à payer : ", montant, " F")
Fin`,
      legende:
        "Avec 80 000 F : la condition est vraie, montant devient 80 000 − 8 000 = 72 000 F. Avec 30 000 F : la condition est fausse, montant reste 30 000 F. Dans les deux cas, la dernière ligne s'exécute.",
    },

    { type: 'titre', contenu: '5. Bonnes habitudes' },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Indente ton code',
      contenu:
        "Décale vers la droite (de 4 espaces) les instructions qui sont **à l'intérieur** du Si. On voit ainsi d'un coup d'œil ce qui dépend de la condition. C'est obligatoire dans une copie propre, et en Python c'est même une règle du langage.",
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Ne confonds pas = et ←',
      contenu:
        "Dans une condition, `=` **compare** (`Si x = 5 Alors` : « x est-il égal à 5 ? »). La flèche `←` **range** une valeur (`x ← 5`). En JavaScript et en C, la comparaison s'écrit `===` ou `==`, et l'affectation `=` : une source d'erreurs fréquente.",
    },
    {
      type: 'code',
      langage: 'javascript',
      titre: 'En JavaScript',
      code: `if (moyenne >= 10) {
  console.log("Admis, félicitations !");
}`,
      legende: 'Correspondances : = → === ; ≠ → !== ; les autres opérateurs s\'écrivent pareil.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`Si condition Alors … FinSi` : le bloc ne s\'exécute que si la condition est **vraie**.',
        'Une condition est une comparaison dont le résultat est **Vrai** ou **Faux**.',
        '« au moins » → `>=` ; « plus de » → `>`. Teste toujours la valeur limite.',
        'Indente le contenu du Si.',
      ],
    },
    {
      type: 'quiz',
      question: 'Un client a droit à la livraison gratuite « à partir de 25 000 F d\'achat ». Quelle condition écrire ?',
      options: ['montant > 25000', 'montant >= 25000', 'montant = 25000'],
      bonneReponse: 1,
      explication: '« À partir de 25 000 F » inclut 25 000 F : il faut >=.',
    },
    {
      type: 'quiz',
      question: 'Avec x ← 7, la condition x MOD 2 = 0 est…',
      options: ['Vraie', 'Fausse'],
      bonneReponse: 1,
      explication: '7 MOD 2 = 1 (7 = 2 × 3 + 1). 1 n\'est pas égal à 0, donc la condition est fausse : 7 est impair.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : écrire les conditions',
      enonce: 'Écris la condition correspondant à chaque phrase.',
      questions: [
        'L\'âge est d\'au moins 18 ans.',
        'Le solde est insuffisant pour retirer le montant demandé.',
        'Le nombre n est pair.',
        'La réponse de l\'utilisateur est la lettre O.',
        'La note dépasse 15.',
      ],
      langage: 'texte',
      solution: `1. age >= 18
2. montant > solde
3. n MOD 2 = 0
4. reponse = 'O'
5. note > 15`,
      explication: 'Pour la question 2, on traduit l\'idée : le solde est insuffisant quand le montant demandé est plus grand que le solde.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : valeur absolue',
      enonce:
        'Écris un algorithme qui lit un nombre et affiche sa valeur absolue (le nombre sans son signe : la valeur absolue de -7 est 7, celle de 4 est 4). Utilise uniquement Si … Alors … FinSi.',
      solution: `Algorithme ValeurAbsolue
Variables
    x : réel
Début
    Écrire("Entrer un nombre : ")
    Lire(x)
    Si x < 0 Alors
        x ← -x
    FinSi
    Écrire("Valeur absolue : ", x)
Fin`,
      explication: "On ne modifie le nombre que s'il est négatif : on le multiplie par -1 (ce qu'on écrit -x). S'il est positif ou nul, on n'y touche pas.",
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les frais de livraison',
      enonce:
        "Une boutique en ligne d'Abidjan facture la livraison 1 500 F. La livraison est offerte à partir de 25 000 F d'achat. De plus, les clients fidèles (qui ont une carte de fidélité) reçoivent un bon d'achat de 1 000 F à déduire du total.",
      questions: [
        'Écris un algorithme qui lit le montant des achats et la réponse à la question « Avez-vous une carte de fidélité (O/N) ? », puis affiche le montant total à payer.',
        'Fais la trace pour : 18 000 F sans carte ; 25 000 F avec carte.',
      ],
      solution: `1. Algorithme Livraison
Constante
    FRAIS_LIVRAISON = 1500
    SEUIL_GRATUIT = 25000
    BON_FIDELITE = 1000
Variables
    montant, total : réel
    carte : caractère
Début
    Écrire("Montant des achats : ")
    Lire(montant)
    Écrire("Avez-vous une carte de fidélité (O/N) ? ")
    Lire(carte)
    total ← montant
    Si montant < SEUIL_GRATUIT Alors
        total ← total + FRAIS_LIVRAISON
    FinSi
    Si carte = 'O' Alors
        total ← total - BON_FIDELITE
    FinSi
    Écrire("Total à payer : ", total, " F")
Fin

2. Traces :
| montant | carte | montant < 25000 ? | carte = 'O' ? | total  |
| 18 000  | N     | Vrai → +1 500     | Faux          | 19 500 |
| 25 000  | O     | Faux              | Vrai → -1 000 | 24 000 |`,
      explication:
        "Les deux conditions sont **indépendantes** : on les écrit l'une après l'autre, chacune avec son FinSi. Attention au seuil : « à partir de 25 000 F » signifie que 25 000 F donne droit à la livraison gratuite, donc on ajoute les frais seulement si montant < 25 000.",
    },
  ],
  exercice: {
    id: 'algo-si-admis',
    titre: 'Admis ou pas ?',
    consigne: 'La moyenne vaut 12. Avec un if, affiche « Admis » seulement si la moyenne est supérieure ou égale à 10, puis affiche toujours « Fin ».',
    langage: 'javascript',
    codeDepart: `let moyenne = 12;

// Écris ton if ici


console.log("Fin");
`,
    sortieAttendue: ['Admis', 'Fin'],
    indice: 'if (moyenne >= 10) { console.log("Admis"); }',
    solution: `let moyenne = 12;

if (moyenne >= 10) {
  console.log("Admis");
}

console.log("Fin");
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'si-sinon-imbriques',
  titre: 'Si … Sinon et conditions imbriquées',
  duree: '25 min',
  objectifs: [
    'Traiter deux cas avec Si … Alors … Sinon',
    'Traiter plusieurs cas avec SinonSi',
    'Choisir le bon ordre des conditions',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Si … Sinon', sousTitre: 'Le résumé en 2 minutes', narration: 'Si sinon, et les conditions imbriquées, en deux minutes.' },
      {
        type: 'code',
        titre: 'Deux cas : Si … Sinon',
        lignes: ['Si n MOD 2 = 0 Alors', '    Écrire("Pair")', 'Sinon', '    Écrire("Impair")', 'FinSi'],
        etapes: [
          { ligne: 0, variables: { n: '7' }, note: '7 MOD 2 = 1 : condition FAUSSE' },
          { ligne: 2, variables: { n: '7' }, note: 'On passe dans le Sinon' },
          { ligne: 3, variables: { n: '7' }, sortie: 'Impair' },
        ],
        narration: "Quand il y a deux cas, on utilise Si sinon. Si la condition est vraie, on fait le premier bloc, sinon on fait le second. Un seul des deux blocs est exécuté.",
      },
      {
        type: 'code',
        titre: 'Plusieurs cas : SinonSi',
        lignes: ['Si moy < 10 Alors', '    mention ← "Ajourné"', 'SinonSi moy < 12 Alors', '    mention ← "Passable"', 'SinonSi moy < 14 Alors', '    mention ← "Assez bien"', 'Sinon', '    mention ← "Bien ou plus"', 'FinSi'],
        etapes: [
          { ligne: 0, variables: { moy: '13.5', mention: '?' }, note: '13,5 < 10 ? Faux' },
          { ligne: 2, variables: { moy: '13.5', mention: '?' }, note: '13,5 < 12 ? Faux' },
          { ligne: 4, variables: { moy: '13.5', mention: '?' }, note: '13,5 < 14 ? VRAI' },
          { ligne: 5, variables: { moy: '13.5', mention: 'Assez bien' }, note: 'On s\'arrête au premier cas vrai' },
        ],
        narration: "Pour plusieurs cas, on enchaîne les SinonSi. L'ordinateur teste les conditions dans l'ordre et s'arrête à la première qui est vraie. Avec treize et demi, on obtient assez bien.",
      },
      {
        type: 'points',
        titre: 'Les règles',
        points: ['Un seul bloc exécuté', 'On s\'arrête à la 1re condition vraie', 'L\'ordre des conditions compte', 'Sinon = tous les autres cas'],
        narration: "Retiens : un seul bloc est exécuté, on s'arrête à la première condition vraie, donc l'ordre des conditions est très important.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Deux cas : Si … Alors … Sinon' },
    {
      type: 'texte',
      contenu:
        "Souvent, il faut faire **une chose si la condition est vraie, et une autre si elle est fausse** : admis ou ajourné, pair ou impair, retrait accepté ou refusé. On ajoute alors une partie **Sinon**.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Si condition Alors
    instructions A     // si la condition est vraie
Sinon
    instructions B     // si la condition est fausse
FinSi`,
      legende: 'Exactement **un** des deux blocs est exécuté : jamais les deux, jamais aucun.',
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 1 : pair ou impair',
      code: `Algorithme PairImpair
Variables
    n : entier
Début
    Écrire("Entrer un entier : ")
    Lire(n)
    Si n MOD 2 = 0 Alors
        Écrire(n, " est pair")
    Sinon
        Écrire(n, " est impair")
    FinSi
Fin`,
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 2 : le retrait Mobile Money',
      code: `Algorithme Retrait
Variables
    solde, montant : réel
Début
    Écrire("Solde du compte : ")
    Lire(solde)
    Écrire("Montant à retirer : ")
    Lire(montant)
    Si montant <= solde Alors
        solde ← solde - montant
        Écrire("Retrait effectué. Nouveau solde : ", solde, " F")
    Sinon
        Écrire("Solde insuffisant. Retrait refusé.")
    FinSi
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Deux exécutions',
      entetes: ['solde', 'montant', 'montant <= solde ?', 'Résultat'],
      lignes: [
        ['20 000', '15 000', 'Vrai', 'Retrait effectué. Nouveau solde : 5000 F'],
        ['20 000', '25 000', 'Faux', 'Solde insuffisant. Retrait refusé.'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 3 : le plus grand de deux nombres',
      code: `Si a > b Alors
    max ← a
Sinon
    max ← b
FinSi
Écrire("Le plus grand est ", max)`,
      legende: 'Si a et b sont égaux, on passe dans le Sinon et max reçoit b : le résultat reste correct.',
    },

    { type: 'titre', contenu: '2. Plus de deux cas : SinonSi' },
    {
      type: 'texte',
      contenu:
        "Quand il y a **plusieurs cas** (un nombre positif, négatif ou nul ; les mentions d'un examen…), on enchaîne les conditions avec **SinonSi**. L'ordinateur les teste **dans l'ordre**, et **s'arrête à la première qui est vraie**.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Si condition1 Alors
    instructions 1
SinonSi condition2 Alors
    instructions 2
SinonSi condition3 Alors
    instructions 3
Sinon
    instructions 4     // si aucune condition n'est vraie
FinSi`,
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 4 : les mentions',
      code: `Algorithme Mention
Variables
    moy : réel
    mention : chaîne
Début
    Écrire("Moyenne : ")
    Lire(moy)
    Si moy < 10 Alors
        mention ← "Ajourné"
    SinonSi moy < 12 Alors
        mention ← "Passable"
    SinonSi moy < 14 Alors
        mention ← "Assez bien"
    SinonSi moy < 16 Alors
        mention ← "Bien"
    Sinon
        mention ← "Très bien"
    FinSi
    Écrire("Mention : ", mention)
Fin`,
    },
    {
      type: 'tableau',
      titre: 'Trace avec moy = 13,5',
      entetes: ['Condition testée', 'Résultat', 'Suite'],
      lignes: [
        ['moy < 10', 'Faux', 'On passe au SinonSi suivant'],
        ['moy < 12', 'Faux', 'On passe au SinonSi suivant'],
        ['moy < 14', 'Vrai', 'mention ← "Assez bien", puis on va directement après FinSi'],
        ['moy < 16', 'Pas testée', 'Inutile : un cas vrai a déjà été trouvé'],
      ],
      legende:
        "Remarque : dans le deuxième test, il est inutile d'écrire `moy >= 10 ET moy < 12`. Si on arrive à ce SinonSi, c'est qu'on sait déjà que moy n'est pas < 10.",
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'L\'ordre des conditions est essentiel',
      contenu:
        "Si on avait écrit `Si moy < 16` en premier, une moyenne de 8 donnerait « Bien », car 8 < 16 est vrai et on s'arrête là ! Quand les conditions portent sur des intervalles, range-les du plus petit au plus grand (ou l'inverse), jamais dans le désordre.",
    },

    { type: 'titre', contenu: '3. Des Si dans des Si' },
    {
      type: 'texte',
      contenu:
        "On peut aussi placer un Si **à l'intérieur** d'un autre : on parle de **conditions imbriquées**. C'est utile quand une deuxième question ne se pose que si la première a reçu une certaine réponse.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 5 : inscription en BTS',
      code: `Si bac = 'O' Alors
    Si age <= 25 Alors
        Écrire("Inscription en formation initiale")
    Sinon
        Écrire("Inscription en formation continue")
    FinSi
Sinon
    Écrire("Le baccalauréat est obligatoire")
FinSi`,
      legende: 'L\'âge n\'est examiné que si l\'étudiant a le baccalauréat. Chaque Si a son propre FinSi : l\'indentation aide à ne pas les mélanger.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`Si … Sinon` : deux cas, **exactement un** bloc est exécuté.',
        '`SinonSi` : plusieurs cas, on s\'arrête à la **première condition vraie**.',
        'L\'**ordre** des conditions change le résultat : teste les valeurs limites.',
        'Chaque Si a son FinSi ; indente pour ne pas te perdre.',
      ],
    },
    {
      type: 'quiz',
      question: 'Avec l\'algorithme des mentions, quelle mention obtient une moyenne de exactement 14 ?',
      options: ['Assez bien', 'Bien', 'Très bien'],
      bonneReponse: 1,
      explication: '14 < 10 faux, 14 < 12 faux, 14 < 14 faux (14 n\'est pas strictement inférieur à 14), 14 < 16 vrai → « Bien ».',
    },
    {
      type: 'quiz',
      question: 'Combien de blocs d\'instructions sont exécutés dans un Si … SinonSi … Sinon … FinSi ?',
      options: ['Exactement un', 'Tous ceux dont la condition est vraie', 'Au moins deux'],
      bonneReponse: 0,
      explication: 'Dès qu\'une condition est vraie, son bloc est exécuté et on sort de la structure. S\'il n\'y en a aucune, c\'est le Sinon qui est exécuté.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : le signe d\'un nombre',
      enonce: 'Écris un algorithme qui lit un nombre et affiche s\'il est positif, négatif ou nul.',
      solution: `Algorithme Signe
Variables
    x : réel
Début
    Écrire("Entrer un nombre : ")
    Lire(x)
    Si x > 0 Alors
        Écrire("Positif")
    SinonSi x < 0 Alors
        Écrire("Négatif")
    Sinon
        Écrire("Nul")
    FinSi
Fin`,
      explication: 'Trois cas possibles → un Si, un SinonSi et un Sinon. Le Sinon traite le seul cas restant : x = 0.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : le plus grand de trois nombres',
      enonce: 'Écris un algorithme qui lit trois nombres a, b et c et affiche le plus grand.',
      solution: `Algorithme MaxTrois
Variables
    a, b, c, max : réel
Début
    Écrire("Entrer trois nombres : ")
    Lire(a, b, c)
    max ← a
    Si b > max Alors
        max ← b
    FinSi
    Si c > max Alors
        max ← c
    FinSi
    Écrire("Le plus grand est ", max)
Fin`,
      explication:
        "Méthode la plus simple : on suppose que a est le plus grand, puis on compare successivement avec b et avec c. Les deux Si sont indépendants. C'est la même technique que pour chercher le maximum avec une boucle.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 3 : trouver l\'erreur',
      enonce:
        "Pour une catégorie d'âge, un étudiant a écrit :\n\nSi age >= 0 Alors\n    categorie ← \"Enfant\"\nSinonSi age >= 13 Alors\n    categorie ← \"Adolescent\"\nSinonSi age >= 18 Alors\n    categorie ← \"Adulte\"\nFinSi\n\nQuel résultat obtient-on pour age = 30 ? Explique l'erreur et corrige.",
      langage: 'texte',
      solution: `Pour age = 30 : la première condition (30 >= 0) est vraie,
on obtient « Enfant ». C'est faux !

Erreur : la première condition est vraie pour TOUS les âges,
les autres ne sont donc jamais testées. L'ordre est mauvais.

Correction (du plus grand au plus petit) :
Si age >= 18 Alors
    categorie ← "Adulte"
SinonSi age >= 13 Alors
    categorie ← "Adolescent"
Sinon
    categorie ← "Enfant"
FinSi`,
      explication: 'Avec des conditions de type >=, on teste de la plus grande valeur vers la plus petite. Avec des conditions <, on fait l\'inverse.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La facture d\'électricité',
      enonce:
        "Une compagnie d'électricité facture la consommation par tranches. Les premiers 110 kWh coûtent 36 F le kWh. Au-delà de 110 kWh, chaque kWh supplémentaire coûte 72 F. Une redevance fixe de 1 200 F s'ajoute à toutes les factures. (Tarifs simplifiés pour l'exercice.)",
      questions: [
        'Écris un algorithme qui lit la consommation en kWh et affiche le montant de la facture.',
        'Calcule la facture pour 80 kWh, puis pour 200 kWh.',
        'Complète l\'algorithme : si la consommation est négative, afficher « Consommation invalide » au lieu de la facture.',
      ],
      solution: `1. et 3. Algorithme FactureElectricite
Constante
    SEUIL = 110
    PRIX_TRANCHE1 = 36
    PRIX_TRANCHE2 = 72
    REDEVANCE = 1200
Variables
    conso, montant : réel
Début
    Écrire("Consommation (kWh) : ")
    Lire(conso)
    Si conso < 0 Alors
        Écrire("Consommation invalide")
    Sinon
        Si conso <= SEUIL Alors
            montant ← conso * PRIX_TRANCHE1
        Sinon
            montant ← SEUIL * PRIX_TRANCHE1 + (conso - SEUIL) * PRIX_TRANCHE2
        FinSi
        montant ← montant + REDEVANCE
        Écrire("Montant de la facture : ", montant, " F")
    FinSi
Fin

2. Calculs :
• 80 kWh (≤ 110) : 80 × 36 = 2 880 F, + 1 200 = 4 080 F
• 200 kWh (> 110) : 110 × 36 = 3 960 F
                    (200 − 110) × 72 = 90 × 72 = 6 480 F
                    total : 3 960 + 6 480 + 1 200 = 11 640 F`,
      explication:
        "Le piège : au-delà de 110 kWh, ce ne sont pas tous les kWh qui coûtent 72 F, mais seulement ceux qui dépassent 110. Les 110 premiers restent à 36 F. La redevance est ajoutée dans tous les cas valides, donc après le Si intérieur. La question 3 se traite avec un Si qui englobe tout le calcul.",
    },
  ],
  exercice: {
    id: 'algo-mention',
    titre: 'Trouver la mention',
    consigne:
      'La moyenne vaut 13.5. Avec if / else if / else, affiche la mention : « Ajourné » (< 10), « Passable » (< 12), « Assez bien » (< 14), « Bien » (< 16) ou « Très bien ».',
    langage: 'javascript',
    codeDepart: `let moy = 13.5;
let mention = "";

// Complète avec if / else if / else


console.log("Mention : " + mention);
`,
    sortieAttendue: ['Mention : Assez bien'],
    indice: 'if (moy < 10) { ... } else if (moy < 12) { ... } else if (moy < 14) { ... } ...',
    solution: `let moy = 13.5;
let mention = "";

if (moy < 10) {
  mention = "Ajourné";
} else if (moy < 12) {
  mention = "Passable";
} else if (moy < 14) {
  mention = "Assez bien";
} else if (moy < 16) {
  mention = "Bien";
} else {
  mention = "Très bien";
}

console.log("Mention : " + mention);
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'operateurs-logiques',
  titre: 'Les opérateurs logiques ET, OU, NON',
  duree: '25 min',
  objectifs: [
    'Combiner plusieurs conditions avec ET, OU, NON',
    'Utiliser les tables de vérité',
    'Écrire le contraire d\'une condition (lois de De Morgan)',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'ET, OU, NON', sousTitre: 'Le résumé en 2 minutes', narration: 'Les opérateurs logiques et, ou, non, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'Les trois opérateurs',
        colonnes: [
          { nom: 'ET', texte: 'Vrai seulement si les DEUX sont vraies' },
          { nom: 'OU', texte: 'Vrai si AU MOINS UNE est vraie' },
          { nom: 'NON', texte: 'Inverse : Vrai devient Faux' },
        ],
        narration: "ET est vrai seulement si les deux conditions sont vraies. OU est vrai si au moins une est vraie. NON inverse le résultat.",
      },
      {
        type: 'code',
        titre: 'Une note valide ?',
        lignes: ['Si note >= 0 ET note <= 20 Alors', '    Écrire("Note valide")', 'Sinon', '    Écrire("Note invalide")', 'FinSi'],
        etapes: [
          { ligne: 0, variables: { note: '25' }, note: '25 >= 0 Vrai · 25 <= 20 Faux' },
          { ligne: 0, variables: { note: '25' }, note: 'Vrai ET Faux = FAUX' },
          { ligne: 3, variables: { note: '25' }, sortie: 'Note invalide' },
        ],
        narration: "Une note est valide si elle est supérieure ou égale à zéro ET inférieure ou égale à vingt. Avec vingt-cinq, la deuxième partie est fausse, donc tout est faux.",
      },
      {
        type: 'points',
        titre: 'Le contraire d\'une condition',
        points: ['NON (A ET B) = NON A OU NON B', 'NON (A OU B) = NON A ET NON B', 'Le contraire de < est >=', 'Le contraire de = est ≠'],
        narration: "Pour écrire le contraire d'une condition : ET devient OU, OU devient ET, et chaque comparaison est inversée. Ce sont les lois de De Morgan.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Combiner des conditions' },
    {
      type: 'texte',
      contenu:
        "Une seule comparaison ne suffit pas toujours. Pour être inscrit, il faut avoir le bac **et** moins de 25 ans. Le magasin est fermé le samedi **ou** le dimanche. On combine alors plusieurs conditions avec les **opérateurs logiques** : **ET**, **OU** et **NON**.",
    },

    { type: 'titre', contenu: '2. L\'opérateur ET' },
    {
      type: 'texte',
      contenu: '`A ET B` est vrai **seulement si A et B sont vraies toutes les deux**. Il suffit qu\'une seule soit fausse pour que le tout soit faux.',
    },
    {
      type: 'tableau',
      titre: 'Table de vérité de ET',
      entetes: ['A', 'B', 'A ET B'],
      lignes: [
        ['Vrai', 'Vrai', 'Vrai'],
        ['Vrai', 'Faux', 'Faux'],
        ['Faux', 'Vrai', 'Faux'],
        ['Faux', 'Faux', 'Faux'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple : une note est-elle valide ?',
      code: `Si note >= 0 ET note <= 20 Alors
    Écrire("Note valide")
Sinon
    Écrire("Note invalide")
FinSi`,
      legende: 'Une note de 25 donne Vrai ET Faux = Faux → invalide. Une note de 14 donne Vrai ET Vrai = Vrai → valide.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'On ne peut pas écrire 0 <= note <= 20',
      contenu:
        "En mathématiques, on écrit 0 ≤ note ≤ 20. En algorithmique, il faut **deux comparaisons reliées par ET** : `note >= 0 ET note <= 20`. Chaque côté du ET doit être une condition complète : `note >= 0 ET <= 20` est faux.",
    },

    { type: 'titre', contenu: '3. L\'opérateur OU' },
    {
      type: 'texte',
      contenu: '`A OU B` est vrai **dès qu\'au moins une des deux est vraie**. Il n\'est faux que si les deux sont fausses.',
    },
    {
      type: 'tableau',
      titre: 'Table de vérité de OU',
      entetes: ['A', 'B', 'A OU B'],
      lignes: [
        ['Vrai', 'Vrai', 'Vrai'],
        ['Vrai', 'Faux', 'Vrai'],
        ['Faux', 'Vrai', 'Vrai'],
        ['Faux', 'Faux', 'Faux'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple : le week-end',
      code: `Si jour = "samedi" OU jour = "dimanche" Alors
    Écrire("C'est le week-end")
FinSi`,
    },

    { type: 'titre', contenu: '4. L\'opérateur NON' },
    {
      type: 'texte',
      contenu:
        '`NON A` **inverse** la valeur de A : NON Vrai = Faux, NON Faux = Vrai. Il est souvent utilisé avec une variable booléenne : `Si NON payé Alors Écrire("Paiement en attente")`.',
    },

    { type: 'titre', contenu: '5. Priorités et parenthèses' },
    {
      type: 'texte',
      contenu:
        "Quand on mélange les opérateurs, **NON** est évalué en premier, puis **ET**, puis **OU** (comme × avant + en maths). En cas de doute, **mets des parenthèses** : elles rendent la condition claire pour toi et pour le correcteur.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple classique : l\'année bissextile',
      code: `// Une année est bissextile si elle est divisible par 4 mais pas par 100,
// ou si elle est divisible par 400.
Si (annee MOD 4 = 0 ET annee MOD 100 ≠ 0) OU annee MOD 400 = 0 Alors
    Écrire(annee, " est bissextile")
Sinon
    Écrire(annee, " n'est pas bissextile")
FinSi`,
    },
    {
      type: 'tableau',
      titre: 'Vérification sur trois années',
      entetes: ['annee', 'MOD 4 = 0', 'MOD 100 ≠ 0', 'MOD 400 = 0', 'Résultat'],
      lignes: [
        ['2024', 'Vrai', 'Vrai', 'Faux', '(Vrai ET Vrai) OU Faux = Vrai → bissextile'],
        ['1900', 'Vrai', 'Faux', 'Faux', '(Vrai ET Faux) OU Faux = Faux → non'],
        ['2000', 'Vrai', 'Faux', 'Vrai', '(Vrai ET Faux) OU Vrai = Vrai → bissextile'],
      ],
    },

    { type: 'titre', contenu: '6. Écrire le contraire d\'une condition' },
    {
      type: 'texte',
      contenu:
        "On a souvent besoin du **contraire** d'une condition (par exemple pour passer d'une boucle TantQue à Répéter, ou pour tester le cas invalide). On utilise les **lois de De Morgan** :",
    },
    {
      type: 'tableau',
      entetes: ['Condition', 'Son contraire'],
      lignes: [
        ['A ET B', 'NON A OU NON B'],
        ['A OU B', 'NON A ET NON B'],
        ['x = y', 'x ≠ y'],
        ['x < y', 'x >= y'],
        ['x > y', 'x <= y'],
        ['note >= 0 ET note <= 20 (note valide)', 'note < 0 OU note > 20 (note invalide)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Vérifie avec un exemple',
      contenu:
        "Après avoir écrit un contraire, teste-le avec une valeur : pour note = 25, « note valide » doit être Faux et « note invalide » doit être Vrai. Si les deux donnent le même résultat, tu t'es trompé.",
    },
    {
      type: 'code',
      langage: 'javascript',
      titre: 'En JavaScript et en C',
      code: `// ET → &&    OU → ||    NON → !
if (note >= 0 && note <= 20) {
  console.log("Note valide");
}`,
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '**ET** : vrai si les deux sont vraies. **OU** : vrai si au moins une est vraie. **NON** : inverse.',
        'Un intervalle s\'écrit avec ET : `note >= 0 ET note <= 20`.',
        'Priorité : NON, puis ET, puis OU. Utilise des parenthèses.',
        'Contraire : ET ↔ OU, et chaque comparaison est inversée (De Morgan).',
      ],
    },
    {
      type: 'quiz',
      question: 'Avec age = 30 et bac = Vrai, que vaut : bac ET age <= 25 ?',
      options: ['Vrai', 'Faux'],
      bonneReponse: 1,
      explication: 'bac est Vrai, mais age <= 25 est Faux (30 > 25). Vrai ET Faux = Faux.',
    },
    {
      type: 'quiz',
      question: 'Quel est le contraire de « x > 5 OU y = 0 » ?',
      options: ['x < 5 ET y ≠ 0', 'x <= 5 ET y ≠ 0', 'x <= 5 OU y ≠ 0'],
      bonneReponse: 1,
      explication: 'OU devient ET ; le contraire de x > 5 est x <= 5 (et non x < 5, car 5 doit être inclus) ; le contraire de y = 0 est y ≠ 0.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : évaluer des conditions',
      enonce: 'Avec a = 4, b = 9 et c = 4, donne la valeur (Vrai ou Faux) de chaque expression, en détaillant.',
      questions: ['a = c ET b > 10', 'a = c OU b > 10', 'NON (a < b)', '(a < b ET b < c) OU c = 4', 'NON (a = 4 ET b = 9)'],
      langage: 'texte',
      solution: `1. a = c → Vrai ; b > 10 → Faux ; Vrai ET Faux = Faux
2. Vrai OU Faux = Vrai
3. a < b → Vrai ; NON Vrai = Faux
4. a < b → Vrai ; b < c → Faux ; Vrai ET Faux = Faux ;
   c = 4 → Vrai ; Faux OU Vrai = Vrai
5. a = 4 → Vrai ; b = 9 → Vrai ; Vrai ET Vrai = Vrai ; NON Vrai = Faux`,
      explication: 'Évalue d\'abord chaque comparaison, puis applique les opérateurs dans l\'ordre (parenthèses, NON, ET, OU).',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : traduire en conditions',
      enonce: 'Écris la condition correspondant à chaque règle.',
      questions: [
        'L\'âge est compris entre 16 et 35 ans (inclus).',
        'Le client a moins de 12 ans ou plus de 60 ans (tarif réduit).',
        'L\'utilisateur a répondu O ou o (majuscule ou minuscule).',
        'Le mot de passe est faux, ou le compte est bloqué (bloque est un booléen).',
      ],
      langage: 'texte',
      solution: `1. age >= 16 ET age <= 35
2. age < 12 OU age > 60
3. reponse = 'O' OU reponse = 'o'
4. mdp ≠ MOT_DE_PASSE OU bloque`,
      explication: 'Pour la question 4, un booléen s\'utilise directement comme condition : « bloque » suffit, inutile d\'écrire « bloque = Vrai ».',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les conditions d\'octroi d\'un prêt',
      enonce:
        "Une microfinance d'Abidjan accorde un prêt étudiant si les conditions suivantes sont réunies : l'étudiant a entre 18 et 30 ans, il est inscrit dans un établissement agréé, et il a un garant OU un revenu mensuel d'au moins 50 000 F.",
      questions: [
        'Établis le dictionnaire des données (nom et type de chaque variable).',
        'Écris la condition d\'octroi du prêt.',
        'Écris l\'algorithme complet qui lit les données et affiche « Prêt accordé » ou « Prêt refusé ».',
        'Vérifie ta condition avec : Kouassi, 22 ans, inscrit, sans garant, revenu 30 000 F.',
      ],
      solution: `1. Dictionnaire des données :
| Donnée                      | Nom      | Type      |
| Âge                         | age      | entier    |
| Inscrit (O/N)               | inscrit  | caractère |
| A un garant (O/N)           | garant   | caractère |
| Revenu mensuel              | revenu   | réel      |

2. Condition :
(age >= 18 ET age <= 30) ET inscrit = 'O' ET (garant = 'O' OU revenu >= 50000)

3. Algorithme Pret
Constante
    REVENU_MIN = 50000
Variables
    age : entier
    inscrit, garant : caractère
    revenu : réel
Début
    Écrire("Âge : ")
    Lire(age)
    Écrire("Inscrit dans un établissement agréé (O/N) ? ")
    Lire(inscrit)
    Écrire("Avez-vous un garant (O/N) ? ")
    Lire(garant)
    Écrire("Revenu mensuel : ")
    Lire(revenu)
    Si (age >= 18 ET age <= 30) ET inscrit = 'O' ET (garant = 'O' OU revenu >= REVENU_MIN) Alors
        Écrire("Prêt accordé")
    Sinon
        Écrire("Prêt refusé")
    FinSi
Fin

4. Vérification avec Kouassi :
age >= 18 ET age <= 30 → 22 : Vrai
inscrit = 'O' → Vrai
garant = 'O' → Faux ; revenu >= 50000 → 30 000 : Faux ; Faux OU Faux = Faux
Vrai ET Vrai ET Faux = Faux → Prêt refusé`,
      explication:
        "Les parenthèses autour de (garant = 'O' OU revenu >= REVENU_MIN) sont indispensables : sans elles, à cause de la priorité de ET sur OU, un étudiant de 50 ans non inscrit mais avec un revenu suffisant obtiendrait le prêt. Explique ce genre de choix sur ta copie.",
    },
  ],
  exercice: {
    id: 'algo-note-valide',
    titre: 'Une note valide',
    consigne: 'Pour chacune des notes 14, 25 et -2, affiche « Valide » si elle est entre 0 et 20 (inclus), sinon « Invalide ». Utilise && dans ta condition.',
    langage: 'javascript',
    codeDepart: `function verifier(note) {
  // Écris ici un if / else avec && :
  // affiche "Valide" ou "Invalide"

}

verifier(14);
verifier(25);
verifier(-2);
`,
    sortieAttendue: ['Valide', 'Invalide', 'Invalide'],
    indice: 'if (note >= 0 && note <= 20) { console.log("Valide"); } else { console.log("Invalide"); }',
    solution: `function verifier(note) {
  if (note >= 0 && note <= 20) {
    console.log("Valide");
  } else {
    console.log("Invalide");
  }
}

verifier(14);
verifier(25);
verifier(-2);
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 4
const lecon4: Lecon = {
  slug: 'selon',
  titre: 'Le choix multiple : Selon',
  duree: '20 min',
  objectifs: [
    'Utiliser la structure Selon pour traiter plusieurs valeurs',
    'Savoir quand utiliser Selon plutôt que Si',
    'Construire un menu et une calculatrice',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Le choix multiple : Selon', sousTitre: 'Le résumé en 1 minute 30', narration: 'La structure Selon, en une minute trente.' },
      {
        type: 'code',
        titre: 'Selon : un cas par valeur',
        lignes: ['Selon jour faire', '    1 : Écrire("Lundi")', '    2 : Écrire("Mardi")', '    3 : Écrire("Mercredi")', '    Sinon : Écrire("Erreur")', 'FinSelon'],
        etapes: [
          { ligne: 0, variables: { jour: '3' }, note: 'On regarde la valeur de jour' },
          { ligne: 3, variables: { jour: '3' }, sortie: 'Mercredi', note: 'On va directement au cas 3' },
        ],
        narration: "Selon regarde la valeur d'une variable et va directement au cas correspondant. Si aucune valeur ne correspond, c'est le Sinon qui s'exécute.",
      },
      {
        type: 'comparaison',
        titre: 'Selon ou Si ?',
        colonnes: [
          { nom: 'Selon', texte: 'Une seule variable, comparée à des valeurs précises (1, 2, \'A\'…)' },
          { nom: 'Si', texte: 'Intervalles (< 10), plusieurs variables, ET / OU' },
        ],
        narration: "Utilise Selon quand une seule variable est comparée à des valeurs précises, par exemple un choix de menu. Pour des intervalles ou des conditions combinées, utilise Si.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Le problème des longues chaînes de Si' },
    {
      type: 'texte',
      contenu:
        "Imagine un algorithme qui affiche le nom du jour à partir de son numéro (1 = lundi, 2 = mardi…). Avec des SinonSi, on écrit sept fois `SinonSi jour = …`. Ça marche, mais c'est long et répétitif. La structure **Selon** permet d'écrire ce genre de choix de façon plus claire.",
    },

    { type: 'titre', contenu: '2. La syntaxe' },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Forme générale',
      code: `Selon variable faire
    valeur1 : instructions 1
    valeur2 : instructions 2
    valeur3, valeur4 : instructions 3   // plusieurs valeurs, même traitement
    Sinon : instructions 4              // aucune valeur ne correspond
FinSelon`,
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        "L'ordinateur regarde la **valeur de la variable**.",
        'Il exécute les instructions du **cas qui correspond** à cette valeur, et seulement celui-là.',
        'Si **aucun** cas ne correspond, il exécute le **Sinon** (s\'il existe).',
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple 1 : le jour de la semaine',
      code: `Algorithme JourSemaine
Variables
    jour : entier
Début
    Écrire("Numéro du jour (1 à 7) : ")
    Lire(jour)
    Selon jour faire
        1 : Écrire("Lundi")
        2 : Écrire("Mardi")
        3 : Écrire("Mercredi")
        4 : Écrire("Jeudi")
        5 : Écrire("Vendredi")
        6, 7 : Écrire("Week-end")
        Sinon : Écrire("Numéro invalide")
    FinSelon
Fin`,
    },

    { type: 'titre', contenu: '3. Exemple : une calculatrice' },
    {
      type: 'code',
      langage: 'algo',
      code: `Algorithme Calculatrice
Variables
    a, b, resultat : réel
    op : caractère
Début
    Écrire("Premier nombre : ")
    Lire(a)
    Écrire("Opération (+ - * /) : ")
    Lire(op)
    Écrire("Deuxième nombre : ")
    Lire(b)
    Selon op faire
        '+' : Écrire(a, " + ", b, " = ", a + b)
        '-' : Écrire(a, " - ", b, " = ", a - b)
        '*' : Écrire(a, " x ", b, " = ", a * b)
        '/' : Si b ≠ 0 Alors
                  Écrire(a, " / ", b, " = ", a / b)
              Sinon
                  Écrire("Division par zéro impossible")
              FinSi
        Sinon : Écrire("Opération inconnue")
    FinSelon
Fin`,
      legende:
        "Un cas peut contenir n'importe quelle instruction, y compris un Si. Ici, on protège la division : diviser par 0 est impossible et ferait planter un vrai programme.",
    },

    { type: 'titre', contenu: '4. Selon ou Si ?' },
    {
      type: 'tableau',
      entetes: ['Situation', 'Structure', 'Exemple'],
      lignes: [
        ['Une variable comparée à des valeurs précises', 'Selon', 'choix d\'un menu, code d\'opération, numéro du mois'],
        ['Des intervalles de valeurs', 'Si … SinonSi', 'mentions (moy < 10, moy < 12…), tranches d\'âge'],
        ['Plusieurs variables ou ET / OU', 'Si', 'âge ET inscription, garant OU revenu'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Selon ne teste que l\'égalité',
      contenu:
        "Dans un Selon, chaque cas compare la variable à une **valeur exacte**. On ne peut pas écrire `moy < 10 :` comme cas. Pour les mentions, il faut donc garder des Si … SinonSi.",
    },
    {
      type: 'code',
      langage: 'javascript',
      titre: 'En JavaScript et en C : switch',
      code: `switch (jour) {
  case 1:
    console.log("Lundi");
    break;
  case 6:
  case 7:
    console.log("Week-end");
    break;
  default:
    console.log("Numéro invalide");
}`,
      legende:
        "Attention : en JavaScript et en C, il faut écrire `break` à la fin de chaque cas. Sans lui, l'exécution continue dans le cas suivant ! `default` correspond au Sinon.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`Selon` compare **une** variable à des **valeurs précises** et exécute le cas correspondant.',
        'Le `Sinon` traite les valeurs non prévues : pense toujours à le mettre (message d\'erreur).',
        'Pour des intervalles ou des ET / OU, utilise **Si**.',
        'En JavaScript/C : `switch`, `case`, `break`, `default`.',
      ],
    },
    {
      type: 'quiz',
      question: 'Pour afficher le nom d\'un mois à partir de son numéro (1 à 12), quelle structure est la plus adaptée ?',
      options: ['Selon', 'Si … SinonSi avec des <', 'Une boucle Pour'],
      bonneReponse: 0,
      explication: 'Une seule variable (le numéro du mois) comparée à 12 valeurs précises : c\'est exactement le rôle de Selon.',
    },
    {
      type: 'quiz',
      question: 'Que se passe-t-il en JavaScript si on oublie le break à la fin d\'un case ?',
      options: ['Une erreur s\'affiche', 'Le cas suivant est aussi exécuté', 'Rien de particulier'],
      bonneReponse: 1,
      explication: "Sans break, l'exécution « tombe » dans le cas suivant. C'est une source de bugs très courante.",
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : réécrire avec Selon',
      enonce:
        "Réécris cet algorithme avec une structure Selon :\n\nSi choix = 1 Alors\n    Écrire(\"Consulter le solde\")\nSinonSi choix = 2 Alors\n    Écrire(\"Faire un transfert\")\nSinonSi choix = 3 Alors\n    Écrire(\"Acheter du crédit\")\nSinon\n    Écrire(\"Choix invalide\")\nFinSi",
      solution: `Selon choix faire
    1 : Écrire("Consulter le solde")
    2 : Écrire("Faire un transfert")
    3 : Écrire("Acheter du crédit")
    Sinon : Écrire("Choix invalide")
FinSelon`,
      explication: 'Toutes les conditions comparent la même variable (choix) à des valeurs précises : Selon est plus court et plus lisible.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : le nombre de jours du mois',
      enonce: 'Écris un algorithme qui lit un numéro de mois (1 à 12) et affiche le nombre de jours de ce mois (on considère que février a 28 jours).',
      solution: `Algorithme JoursDuMois
Variables
    mois : entier
Début
    Écrire("Numéro du mois (1 à 12) : ")
    Lire(mois)
    Selon mois faire
        1, 3, 5, 7, 8, 10, 12 : Écrire("31 jours")
        4, 6, 9, 11 : Écrire("30 jours")
        2 : Écrire("28 jours")
        Sinon : Écrire("Mois invalide")
    FinSelon
Fin`,
      explication: 'Regrouper plusieurs valeurs dans un même cas (séparées par des virgules) évite de répéter sept fois la même instruction.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La billetterie d\'une compagnie de transport',
      enonce:
        "Une compagnie de cars au départ d'Abidjan propose quatre destinations, identifiées par un code : 1 = Yamoussoukro (5 000 F), 2 = Bouaké (7 000 F), 3 = Korhogo (12 000 F), 4 = San-Pédro (8 000 F). Les enfants de moins de 12 ans paient demi-tarif.",
      questions: [
        'Écris un algorithme qui affiche le menu des destinations, lit le code de la destination, le nombre d\'adultes et le nombre d\'enfants, puis affiche le prix total à payer.',
        'Si le code est invalide, l\'algorithme doit afficher « Destination inconnue » et ne rien calculer.',
        'Calcule le prix pour 2 adultes et 1 enfant à destination de Bouaké.',
      ],
      solution: `1. et 2. Algorithme Billetterie
Variables
    code, nbAdultes, nbEnfants : entier
    prix, total : réel
    valide : booléen
Début
    Écrire("1. Yamoussoukro  2. Bouaké  3. Korhogo  4. San-Pédro")
    Écrire("Code de la destination : ")
    Lire(code)
    valide ← Vrai
    Selon code faire
        1 : prix ← 5000
        2 : prix ← 7000
        3 : prix ← 12000
        4 : prix ← 8000
        Sinon : valide ← Faux
    FinSelon
    Si valide Alors
        Écrire("Nombre d'adultes : ")
        Lire(nbAdultes)
        Écrire("Nombre d'enfants de moins de 12 ans : ")
        Lire(nbEnfants)
        total ← nbAdultes * prix + nbEnfants * prix / 2
        Écrire("Total à payer : ", total, " F")
    Sinon
        Écrire("Destination inconnue")
    FinSi
Fin

3. Bouaké : prix = 7 000 F
   total = 2 × 7 000 + 1 × 7 000 / 2 = 14 000 + 3 500 = 17 500 F`,
      explication:
        "Le Selon sert uniquement à trouver le prix ; le calcul est fait une seule fois après, au lieu d'être répété dans chaque cas. La variable booléenne valide (un « drapeau ») mémorise si le code était correct, pour décider ensuite si on fait le calcul.",
    },
  ],
  exercice: {
    id: 'algo-switch-jour',
    titre: 'Le jour de la semaine',
    consigne: 'Complète la fonction avec un switch pour que les appels affichent : Lundi, Mercredi, Week-end, Numéro invalide.',
    langage: 'javascript',
    codeDepart: `function nomDuJour(jour) {
  switch (jour) {
    case 1:
      console.log("Lundi");
      break;
    // Ajoute : 2 Mardi, 3 Mercredi, 4 Jeudi, 5 Vendredi,
    // 6 et 7 Week-end, et un default "Numéro invalide"

  }
}

nomDuJour(1);
nomDuJour(3);
nomDuJour(7);
nomDuJour(9);
`,
    sortieAttendue: ['Lundi', 'Mercredi', 'Week-end', 'Numéro invalide'],
    indice: 'Pour 6 et 7, écris case 6: puis case 7: l\'un sous l\'autre, suivis d\'un seul console.log et d\'un break.',
    solution: `function nomDuJour(jour) {
  switch (jour) {
    case 1:
      console.log("Lundi");
      break;
    case 2:
      console.log("Mardi");
      break;
    case 3:
      console.log("Mercredi");
      break;
    case 4:
      console.log("Jeudi");
      break;
    case 5:
      console.log("Vendredi");
      break;
    case 6:
    case 7:
      console.log("Week-end");
      break;
    default:
      console.log("Numéro invalide");
  }
}

nomDuJour(1);
nomDuJour(3);
nomDuJour(7);
nomDuJour(9);
`,
  },
}

export const leconsConditions: Lecon[] = [lecon1, lecon2, lecon3, lecon4]

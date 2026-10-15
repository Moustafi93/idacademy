import type { BlocLecon } from './types'

/*
 * Exercices placés à la fin de chaque leçon du chapitre « Les boucles ».
 *  - Exercices d'application : pour vérifier qu'on a compris la leçon.
 *  - Sujet type BTS : un problème complet, avec plusieurs questions, au niveau de l'examen.
 */

const introApplication: BlocLecon = {
  type: 'texte',
  contenu:
    "Fais ces exercices sur une feuille **avant** d'ouvrir la correction. Si tu bloques, relis la partie de la leçon qui correspond, puis réessaie.",
}

// ───────────────────────────────────────────────────────────── Leçon 1
export const exercicesLecon1: BlocLecon[] = [
  { type: 'titre', contenu: "Exercices d'application" },
  introApplication,
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 1 : choisir la bonne boucle',
    enonce: 'Pour chacune des situations suivantes, indique la boucle la plus adaptée (Pour, TantQue ou Répéter … Jusqu\'à) et justifie ton choix.',
    questions: [
      'Afficher les 12 mois de l\'année.',
      "Lire des prix d'articles jusqu'à ce que le caissier tape -1 (le caissier peut taper -1 tout de suite si le client n'a rien acheté).",
      "Demander « Voulez-vous continuer (O/N) ? » et recommencer tant que la réponse n'est pas valide.",
      'Calculer la somme des notes des 30 étudiants d\'une classe.',
      "Doubler une somme placée à la banque jusqu'à ce qu'elle dépasse 1 000 000 F.",
    ],
    langage: 'texte',
    solution: `1. Pour : on sait qu'il y a exactement 12 mois.
2. TantQue : le nombre de prix est inconnu, et il peut n'y en avoir aucun
   (0 tour possible).
3. Répéter … Jusqu'à : on doit poser la question au moins une fois.
4. Pour : le nombre d'étudiants (30) est connu.
5. TantQue : on ne sait pas combien de fois il faudra doubler la somme.
   (Répéter est aussi accepté si la somme de départ est forcément
   inférieure à 1 000 000 F.)`,
    explication:
      "La question à se poser est toujours la même : est-ce que je connais le nombre de tours avant de commencer ? Si oui → Pour. Si non → TantQue si la boucle peut ne pas tourner du tout, Répéter si elle doit tourner au moins une fois.",
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 2 : reconnaître les éléments d\'une boucle',
    enonce: 'On donne l\'algorithme suivant :\n\nPour k ← 1 à 4 faire\n    Écrire("Bienvenue à IDAcademy")\nFinPour',
    questions: [
      'Quel est le compteur de cette boucle ?',
      'Quel est le corps de la boucle ?',
      "Combien d'itérations la boucle fait-elle ?",
      'Quelle est la condition d\'arrêt ?',
      'Modifie l\'algorithme pour afficher le message 50 fois.',
    ],
    langage: 'texte',
    solution: `1. Le compteur est k.
2. Le corps est : Écrire("Bienvenue à IDAcademy")
3. 4 itérations (k vaut 1, 2, 3 puis 4).
4. La boucle s'arrête quand k dépasse 4 (k vaut alors 5).
5. Il suffit de remplacer 4 par 50 :
   Pour k ← 1 à 50 faire
       Écrire("Bienvenue à IDAcademy")
   FinPour`,
    explication:
      "Savoir nommer chaque partie d'une boucle t'aide à lire les sujets d'examen : on te demande souvent « combien de fois s'exécute telle instruction ? ».",
  },

  { type: 'titre', contenu: 'Sujet type BTS' },
  {
    type: 'exercice-corrige',
    niveau: 'bts',
    titre: 'Analyse d\'algorithme',
    enonce:
      "Soit l'algorithme suivant :\n\nAlgorithme Mystere\nVariables\n    i, s : entier\nDébut\n    s ← 0\n    Pour i ← 1 à 3 faire\n        s ← s + 10\n        Écrire(s)\n    FinPour\nFin",
    questions: [
      'Quel type de structure est utilisé ? Justifie.',
      "Combien de fois l'instruction s ← s + 10 est-elle exécutée ?",
      "Qu'affiche cet algorithme ? Présente ta réponse sous forme de tableau de déroulement.",
      'Que vaut s à la fin de l\'algorithme ?',
      "Modifie l'algorithme pour qu'il affiche 10, 20, 30, … jusqu'à 100.",
    ],
    langage: 'texte',
    solution: `1. Une structure répétitive : la boucle Pour, car le nombre de tours (3)
   est connu à l'avance.

2. 3 fois (une fois par tour, i = 1, 2, 3).

3. Tableau de déroulement :
   | i | s avant | s après | Affichage |
   | 1 |    0    |   10    |    10     |
   | 2 |   10    |   20    |    20     |
   | 3 |   20    |   30    |    30     |
   L'algorithme affiche : 10, 20, 30.

4. s vaut 30.

5. Il faut 10 tours au lieu de 3 :
   Pour i ← 1 à 10 faire
       s ← s + 10
       Écrire(s)
   FinPour`,
    explication:
      "À l'examen, la question « qu'affiche cet algorithme ? » se traite toujours avec un tableau de déroulement : une colonne par variable, une ligne par tour. Cela montre ta démarche et rapporte des points même en cas d'erreur de calcul.",
  },
]

// ───────────────────────────────────────────────────────────── Leçon 2
export const exercicesLecon2: BlocLecon[] = [
  { type: 'titre', contenu: "Exercices d'application" },
  introApplication,
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 1 : les nombres impairs',
    enonce: 'Écris un algorithme qui affiche tous les nombres impairs de 1 à 19.',
    solution: `Algorithme Impairs
Variables
    i : entier
Début
    Pour i ← 1 à 19 pas 2 faire
        Écrire(i)
    FinPour
Fin`,
    explication:
      'En partant de 1 avec un pas de 2, le compteur prend les valeurs 1, 3, 5, …, 19. Autre solution correcte : `Pour i ← 1 à 19 faire` avec `Si i MOD 2 = 1 Alors Écrire(i)`, mais elle fait deux fois plus de tours.',
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 2 : la somme des carrés',
    enonce: 'Écris un algorithme qui lit un entier N et calcule S = 1² + 2² + 3² + … + N².',
    questions: ['Écris l\'algorithme.', 'Fais la trace pour N = 3.'],
    solution: `Algorithme SommeCarres
Variables
    N, i, S : entier
Début
    Écrire("Entrer N : ")
    Lire(N)
    S ← 0
    Pour i ← 1 à N faire
        S ← S + i * i
    FinPour
    Écrire("S = ", S)
Fin

Trace pour N = 3 :
| i     | i * i | S          |
| avant |   —   | 0          |
| 1     |   1   | 0 + 1 = 1  |
| 2     |   4   | 1 + 4 = 5  |
| 3     |   9   | 5 + 9 = 14 |
Affichage : S = 14`,
    explication:
      "C'est le schéma de l'accumulateur : S ← 0 avant la boucle, puis S ← S + (valeur du tour) dans la boucle. Ici la valeur ajoutée à chaque tour est i × i.",
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 3 : calculer une puissance',
    enonce:
      "Sans utiliser l'opérateur de puissance, écris un algorithme qui lit un réel x et un entier positif n, puis calcule et affiche xⁿ. Exemple : x = 2 et n = 5 donne 32.",
    solution: `Algorithme Puissance
Variables
    x, p : réel
    n, i : entier
Début
    Écrire("Entrer x : ")
    Lire(x)
    Écrire("Entrer n (positif) : ")
    Lire(n)
    p ← 1
    Pour i ← 1 à n faire
        p ← p * x
    FinPour
    Écrire(x, " puissance ", n, " = ", p)
Fin`,
    explication:
      "xⁿ, c'est x multiplié par lui-même n fois : on utilise un accumulateur de produit, initialisé à 1. Si n = 0, la boucle ne tourne pas et p reste à 1, ce qui est juste (x⁰ = 1).",
  },

  { type: 'titre', contenu: 'Sujet type BTS' },
  {
    type: 'exercice-corrige',
    niveau: 'bts',
    titre: 'Les ventes d\'une boutique à Adjamé',
    enonce:
      "Le gérant d'une boutique de téléphones à Adjamé veut un programme pour analyser ses ventes de la semaine. Chaque soir, il note le montant total des ventes du jour (en francs CFA). La semaine compte 7 jours de vente.",
    questions: [
      "Écris un algorithme qui permet de saisir les ventes des 7 jours et d'afficher le total de la semaine et la moyenne journalière.",
      'Complète l\'algorithme pour afficher aussi le nombre de jours où les ventes ont dépassé 50 000 F.',
      'Fais la trace avec les ventes suivantes : 45 000 ; 60 000 ; 30 000 ; 75 000 ; 50 000 ; 52 000 ; 40 000.',
    ],
    solution: `Algorithme VentesSemaine
Variables
    jour, nbBonsJours : entier
    vente, total, moyenne : réel
Début
    total ← 0
    nbBonsJours ← 0
    Pour jour ← 1 à 7 faire
        Écrire("Ventes du jour ", jour, " : ")
        Lire(vente)
        total ← total + vente
        Si vente > 50000 Alors
            nbBonsJours ← nbBonsJours + 1
        FinSi
    FinPour
    moyenne ← total / 7
    Écrire("Total de la semaine : ", total, " F")
    Écrire("Moyenne par jour : ", moyenne, " F")
    Écrire("Jours au-dessus de 50 000 F : ", nbBonsJours)
Fin

Trace :
| jour | vente  | total   | vente > 50000 ? | nbBonsJours |
| —    | —      | 0       | —               | 0           |
| 1    | 45 000 | 45 000  | Non             | 0           |
| 2    | 60 000 | 105 000 | Oui             | 1           |
| 3    | 30 000 | 135 000 | Non             | 1           |
| 4    | 75 000 | 210 000 | Oui             | 2           |
| 5    | 50 000 | 260 000 | Non (égal)      | 2           |
| 6    | 52 000 | 312 000 | Oui             | 3           |
| 7    | 40 000 | 352 000 | Non             | 3           |

Affichage :
Total de la semaine : 352 000 F
Moyenne par jour : 50 285,71 F
Jours au-dessus de 50 000 F : 3`,
    explication:
      "On connaît le nombre de jours (7) : boucle Pour. Deux variables sont initialisées avant la boucle : l'accumulateur total (à 0) et le compteur nbBonsJours (à 0). Remarque le jour 5 : 50 000 n'est pas **strictement** supérieur à 50 000, il n'est donc pas compté. Lis toujours bien les mots « dépasser », « au moins », « plus de » dans les énoncés.",
  },
]

// ───────────────────────────────────────────────────────────── Leçon 3
export const exercicesLecon3: BlocLecon[] = [
  { type: 'titre', contenu: "Exercices d'application" },
  introApplication,
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 1 : contrôler un âge',
    enonce:
      "Pour s'inscrire en BTS, l'âge doit être compris entre 16 et 35 ans. Écris un algorithme qui demande l'âge et le redemande tant qu'il n'est pas valide, en utilisant TantQue.",
    solution: `Algorithme SaisieAge
Variables
    age : entier
Début
    Écrire("Votre âge : ")
    Lire(age)
    TantQue age < 16 OU age > 35 faire
        Écrire("Âge non valide (16 à 35 ans). Votre âge : ")
        Lire(age)
    FinTantQue
    Écrire("Inscription possible")
Fin`,
    explication:
      'Même schéma que la saisie de note de la leçon : une saisie avant la boucle, et la condition décrit le cas **incorrect** (trop jeune OU trop âgé).',
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 2 : de Pour à TantQue',
    enonce: 'Réécris l\'algorithme suivant en remplaçant la boucle Pour par une boucle TantQue :\n\nPour i ← 1 à 10 faire\n    Écrire(i * i)\nFinPour',
    solution: `i ← 1
TantQue i <= 10 faire
    Écrire(i * i)
    i ← i + 1
FinTantQue`,
    explication:
      "Trois éléments à ne pas oublier : l'initialisation du compteur avant la boucle (i ← 1), la condition de continuation (i <= 10) et l'incrémentation à la fin du corps (i ← i + 1). Sans cette dernière ligne, la boucle serait infinie.",
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 3 : la somme des chiffres',
    enonce:
      "Écris un algorithme qui lit un entier positif et calcule la somme de ses chiffres. Exemple : pour 4527, on obtient 4 + 5 + 2 + 7 = 18. Utilise MOD (reste) et DIV (division entière). Fais la trace avec 4527.",
    solution: `Algorithme SommeChiffres
Variables
    n, somme : entier
Début
    Écrire("Entrer un entier positif : ")
    Lire(n)
    somme ← 0
    TantQue n > 0 faire
        somme ← somme + n MOD 10
        n ← n DIV 10
    FinTantQue
    Écrire("Somme des chiffres : ", somme)
Fin

Trace avec n = 4527 :
| Tour  | n MOD 10 | somme | n après DIV 10 |
| avant |    —     |   0   | 4527           |
| 1     |    7     |   7   | 452            |
| 2     |    2     |   9   | 45             |
| 3     |    5     |  14   | 4              |
| 4     |    4     |  18   | 0              |
n = 0 : on sort. Affichage : Somme des chiffres : 18`,
    explication:
      "`n MOD 10` donne le dernier chiffre du nombre, et `n DIV 10` l'enlève. On recommence tant qu'il reste des chiffres (n > 0). Le nombre de tours dépend du nombre de chiffres : c'est pour ça qu'on utilise TantQue.",
  },

  { type: 'titre', contenu: 'Sujet type BTS' },
  {
    type: 'exercice-corrige',
    niveau: 'bts',
    titre: 'La caisse d\'un supermarché',
    enonce:
      "Un supermarché de Cocody veut informatiser sa caisse. Le caissier saisit les prix des articles un par un. La saisie se termine quand il tape 0. Si le total dépasse 20 000 F, le client a droit à une remise de 5 %.",
    questions: [
      "Écris un algorithme qui calcule et affiche le total des achats et le nombre d'articles.",
      'Complète-le pour afficher le prix de l\'article le plus cher.',
      'Ajoute le calcul de la remise et du montant net à payer.',
      'Fais la trace avec les prix : 2 500 ; 12 000 ; 8 000 ; 0.',
    ],
    solution: `Algorithme Caisse
Variables
    prix, total, plusCher, remise, net : réel
    nbArticles : entier
Début
    total ← 0
    nbArticles ← 0
    plusCher ← 0
    Écrire("Prix de l'article (0 pour terminer) : ")
    Lire(prix)
    TantQue prix ≠ 0 faire
        total ← total + prix
        nbArticles ← nbArticles + 1
        Si prix > plusCher Alors
            plusCher ← prix
        FinSi
        Écrire("Prix de l'article (0 pour terminer) : ")
        Lire(prix)
    FinTantQue
    Si total > 20000 Alors
        remise ← total * 5 / 100
    Sinon
        remise ← 0
    FinSi
    net ← total - remise
    Écrire("Nombre d'articles : ", nbArticles)
    Écrire("Article le plus cher : ", plusCher, " F")
    Écrire("Total : ", total, " F")
    Écrire("Remise : ", remise, " F")
    Écrire("Net à payer : ", net, " F")
Fin

Trace :
| prix lu | prix ≠ 0 ? | total  | nbArticles | plusCher |
| 2 500   | Oui        | 2 500  | 1          | 2 500    |
| 12 000  | Oui        | 14 500 | 2          | 12 000   |
| 8 000   | Oui        | 22 500 | 3          | 12 000   |
| 0       | Non → fin  |        |            |          |
Total = 22 500 F > 20 000 F → remise = 22 500 × 5 / 100 = 1 125 F
Net à payer = 22 500 − 1 125 = 21 375 F`,
    explication:
      "Le nombre d'articles est inconnu et le client peut n'avoir rien acheté (le caissier tape 0 tout de suite) : TantQue avec lecture avant la boucle et relecture en fin de corps. Ici plusCher peut être initialisé à 0 car un prix est toujours positif. Le calcul de la remise se fait **après** la boucle, une seule fois, quand le total est connu.",
  },
]

// ───────────────────────────────────────────────────────────── Leçon 4
export const exercicesLecon4: BlocLecon[] = [
  { type: 'titre', contenu: "Exercices d'application" },
  introApplication,
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 1 : répondre par O ou N',
    enonce:
      "Écris un algorithme qui pose la question « Voulez-vous imprimer le reçu (O/N) ? » et la repose jusqu'à ce que la réponse soit « O » ou « N ».",
    solution: `Algorithme Question
Variables
    rep : caractère
Début
    Répéter
        Écrire("Voulez-vous imprimer le reçu (O/N) ? ")
        Lire(rep)
    Jusqu'à rep = 'O' OU rep = 'N'
    Si rep = 'O' Alors
        Écrire("Impression en cours…")
    FinSi
Fin`,
    explication:
      'La question doit être posée au moins une fois : Répéter. La condition est celle de l\'**arrêt** : on s\'arrête quand la réponse est valide.',
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 2 : de TantQue à Répéter',
    enonce:
      "Réécris avec une boucle Répéter … Jusqu'à :\n\nLire(age)\nTantQue age < 16 OU age > 35 faire\n    Écrire(\"Âge non valide\")\n    Lire(age)\nFinTantQue",
    solution: `Répéter
    Écrire("Votre âge (16 à 35) : ")
    Lire(age)
Jusqu'à age >= 16 ET age <= 35`,
    explication:
      "La première saisie avant la boucle disparaît, car le corps de Répéter s'exécute au moins une fois. La condition est inversée avec les lois de De Morgan : NON(age < 16 OU age > 35) = age >= 16 ET age <= 35.",
  },
  {
    type: 'exercice-corrige',
    niveau: 'application',
    titre: 'Application 3 : atteindre un objectif',
    enonce:
      "Écris un algorithme qui lit des nombres positifs et les additionne jusqu'à ce que la somme atteigne ou dépasse 1 000. Afficher ensuite la somme et le nombre de valeurs saisies.",
    solution: `Algorithme Objectif
Variables
    x, somme : réel
    nb : entier
Début
    somme ← 0
    nb ← 0
    Répéter
        Écrire("Entrer un nombre positif : ")
        Lire(x)
        somme ← somme + x
        nb ← nb + 1
    Jusqu'à somme >= 1000
    Écrire("Somme : ", somme, " atteinte en ", nb, " saisie(s)")
Fin`,
    explication:
      "Au départ, la somme vaut 0 : il faut forcément au moins une saisie. Répéter est donc naturel. La condition d'arrêt est « la somme atteint ou dépasse 1 000 », soit somme >= 1000.",
  },

  { type: 'titre', contenu: 'Sujet type BTS' },
  {
    type: 'exercice-corrige',
    niveau: 'bts',
    titre: 'Le guichet de Mobile Money',
    enonce:
      "Une agence de Mobile Money veut un programme de guichet simplifié. Le compte a un code secret (1234) et un solde de départ de 0 F.",
    questions: [
      "Au démarrage, le programme demande le code secret. L'utilisateur a droit à 3 essais. Après 3 échecs, afficher « Compte bloqué » et arrêter.",
      'Si le code est bon, afficher le menu : 1. Dépôt — 2. Retrait — 3. Consulter le solde — 0. Quitter. Le menu revient après chaque opération jusqu\'à ce que l\'utilisateur choisisse 0.',
      'Un retrait est refusé si le montant est supérieur au solde. Un montant de dépôt ou de retrait doit être strictement positif.',
    ],
    solution: `Algorithme GuichetMobileMoney
Constante
    CODE = 1234
Variables
    saisie, essais, choix : entier
    solde, montant : réel
Début
    // Question 1 : vérification du code (3 essais)
    essais ← 0
    Répéter
        Écrire("Code secret : ")
        Lire(saisie)
        essais ← essais + 1
        Si saisie ≠ CODE ET essais < 3 Alors
            Écrire("Code incorrect. Il vous reste ", 3 - essais, " essai(s)")
        FinSi
    Jusqu'à saisie = CODE OU essais = 3

    Si saisie ≠ CODE Alors
        Écrire("Compte bloqué")
    Sinon
        // Question 2 : le menu
        solde ← 0
        Répéter
            Écrire("1. Dépôt  2. Retrait  3. Solde  0. Quitter")
            Lire(choix)
            Selon choix faire
                1 : Répéter                              // Question 3
                        Écrire("Montant du dépôt : ")
                        Lire(montant)
                    Jusqu'à montant > 0
                    solde ← solde + montant
                    Écrire("Dépôt effectué. Nouveau solde : ", solde, " F")
                2 : Répéter
                        Écrire("Montant du retrait : ")
                        Lire(montant)
                    Jusqu'à montant > 0
                    Si montant > solde Alors
                        Écrire("Retrait refusé : solde insuffisant")
                    Sinon
                        solde ← solde - montant
                        Écrire("Retrait effectué. Nouveau solde : ", solde, " F")
                    FinSi
                3 : Écrire("Votre solde : ", solde, " F")
                0 : Écrire("Merci, au revoir")
                Sinon : Écrire("Choix invalide")
            FinSelon
        Jusqu'à choix = 0
    FinSi
Fin`,
    explication:
      "Ce sujet combine tout le chapitre. (1) Le code : Répéter, car on le demande au moins une fois, avec une condition d'arrêt double (code bon OU 3 essais). Après la boucle, on teste à nouveau le code pour savoir pourquoi on est sorti. (2) Le menu : Répéter jusqu'à 0, car il s'affiche au moins une fois. (3) Les montants : une petite boucle de contrôle de saisie dans chaque opération. Ce type de sujet « application de gestion avec menu » est très fréquent au BTS : entraîne-toi à le réécrire sans regarder la correction.",
  },
]

// ───────────────────────────────────────────────────────────── Leçon 5
export const exercicesLecon5: BlocLecon[] = [
  { type: 'titre', contenu: 'Sujet type BTS complet' },
  {
    type: 'texte',
    contenu:
      "Ce dernier sujet ressemble à une vraie épreuve. Donne-toi **45 minutes**, comme à l'examen, puis compare avec la correction.",
  },
  {
    type: 'exercice-corrige',
    niveau: 'bts',
    titre: 'Gestion des notes d\'une classe',
    enonce:
      "Le responsable pédagogique d'un établissement de BTS veut un programme pour analyser les résultats d'un devoir d'algorithmique. Chaque note est sur 20.",
    questions: [
      "Écris un algorithme qui demande le nombre d'étudiants N (entre 1 et 50), puis saisit les N notes. Chaque note doit être contrôlée (entre 0 et 20).",
      'Calcule et affiche la moyenne de la classe.',
      'Affiche la meilleure note et la plus faible.',
      'Affiche le nombre d\'étudiants admis (note supérieure ou égale à 10) et le pourcentage d\'admis.',
      'Fais la trace pour N = 4 avec les notes 12 ; 7,5 ; 15 ; 9.',
    ],
    solution: `Algorithme ResultatsDevoir
Variables
    N, i, nbAdmis : entier
    note, total, moyenne, meilleure, faible, pourcentage : réel
Début
    // Nombre d'étudiants contrôlé
    Répéter
        Écrire("Nombre d'étudiants (1 à 50) : ")
        Lire(N)
    Jusqu'à N >= 1 ET N <= 50

    total ← 0
    nbAdmis ← 0
    meilleure ← 0
    faible ← 20

    Pour i ← 1 à N faire
        // Note contrôlée
        Répéter
            Écrire("Note de l'étudiant ", i, " : ")
            Lire(note)
        Jusqu'à note >= 0 ET note <= 20

        total ← total + note
        Si note > meilleure Alors
            meilleure ← note
        FinSi
        Si note < faible Alors
            faible ← note
        FinSi
        Si note >= 10 Alors
            nbAdmis ← nbAdmis + 1
        FinSi
    FinPour

    moyenne ← total / N
    pourcentage ← nbAdmis * 100 / N
    Écrire("Moyenne de la classe : ", moyenne)
    Écrire("Meilleure note : ", meilleure, " — Plus faible : ", faible)
    Écrire("Admis : ", nbAdmis, " (", pourcentage, " %)")
Fin

Trace pour N = 4 :
| i | note | total | meilleure | faible | nbAdmis |
| — |  —   |  0    |    0      |  20    |   0     |
| 1 |  12  |  12   |   12      |  12    |   1     |
| 2 | 7,5  | 19,5  |   12      |  7,5   |   1     |
| 3 |  15  | 34,5  |   15      |  7,5   |   2     |
| 4 |  9   | 43,5  |   15      |  7,5   |   2     |

moyenne = 43,5 / 4 = 10,875
pourcentage = 2 × 100 / 4 = 50 %
Affichage :
Moyenne de la classe : 10,875
Meilleure note : 15 — Plus faible : 7,5
Admis : 2 (50 %)`,
    explication:
      "Le sujet utilise les trois boucles à bon escient : Répéter pour les deux contrôles de saisie (on saisit au moins une fois), Pour pour parcourir les N étudiants (nombre connu). Pour la meilleure et la plus faible note, on peut initialiser à 0 et à 20, car toutes les notes sont forcément entre 0 et 20. Les calculs de moyenne et de pourcentage se font **après** la boucle. Pense à justifier tes choix de boucle sur ta copie : les correcteurs apprécient.",
  },
]

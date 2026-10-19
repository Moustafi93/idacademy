import type { Lecon } from '../types'

/*
 * Langages Pascal et C — Chapitre 2 : Syntaxe de base
 * Variables et types, opérateurs, lecture au clavier avec scanf.
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'variables-et-types-en-c',
  titre: 'Variables, types et constantes en C',
  duree: '30 min',
  objectifs: [
    'Déclarer des variables de type int, float, double et char',
    'Afficher une variable avec printf et le bon format (%d, %f, %c)',
    'Définir une constante avec #define ou const',
    'Comprendre qu\'un caractère est un code ASCII',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les variables en C', sousTitre: 'Le résumé en 2 minutes', narration: 'Les variables, les types et les formats de printf, en deux minutes.' },
      {
        type: 'points',
        titre: 'Les 4 types de base',
        points: ['int : entier (âge, quantité)', 'float : réel (moyenne, prix)', 'double : réel plus précis', 'char : un seul caractère'],
        narration: "En C, on choisit un type pour chaque variable : int pour un entier comme un âge, float pour un réel comme une moyenne, double pour un réel plus précis, et char pour un seul caractère.",
      },
      {
        type: 'code',
        titre: 'Déclarer et afficher',
        lignes: ['int age = 20;', 'float moyenne = 13.75;', 'char initiale = \'K\';', 'printf("%d ans\\n", age);', 'printf("%.2f\\n", moyenne);'],
        etapes: [
          { ligne: 0, variables: { age: '20' } },
          { ligne: 1, variables: { age: '20', moyenne: '13.75' } },
          { ligne: 2, variables: { age: '20', moyenne: '13.75', initiale: "'K'" } },
          { ligne: 3, variables: { age: '20', moyenne: '13.75', initiale: "'K'" }, sortie: '20 ans', note: '%d est remplacé par la valeur de age' },
          { ligne: 4, variables: { age: '20', moyenne: '13.75', initiale: "'K'" }, sortie: '13.75', note: '%.2f : 2 chiffres après la virgule' },
        ],
        narration: "On déclare chaque variable avec son type et on peut lui donner une valeur tout de suite. Pour l'afficher, on place un format dans printf : pourcentage d pour un entier, pourcentage f pour un réel.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Déclarer une variable' },
    {
      type: 'texte',
      contenu:
        "Une **variable** est une case de la mémoire qui porte un **nom** et contient une **valeur**. En C, toute variable doit être **déclarée** avant d'être utilisée, en indiquant son **type**. On peut lui donner une valeur dès la déclaration : c'est l'**initialisation**.",
    },
    {
      type: 'code',
      langage: 'c',
      titre: 'Déclarations',
      code: `int quantite;               // déclaration seule (valeur inconnue !)
int age = 20;               // déclaration + initialisation
float prix = 1500.5, remise = 0.1;   // plusieurs variables du même type
char categorie = 'A';       // un caractère entre apostrophes`,
    },
    {
      type: 'tableau',
      titre: 'Les types de base',
      entetes: ['Type', 'Contient', 'Taille habituelle', 'Format printf / scanf', 'Exemple'],
      lignes: [
        ['int', 'un nombre entier', '4 octets', '%d', 'int age = 20;'],
        ['float', 'un réel (≈ 7 chiffres exacts)', '4 octets', '%f', 'float moyenne = 13.75;'],
        ['double', 'un réel plus précis (≈ 15 chiffres)', '8 octets', '%f (printf), %lf (scanf)', 'double taux = 655.957;'],
        ['char', 'un seul caractère', '1 octet', '%c', "char sexe = 'F';"],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Règles pour nommer une variable',
      elements: [
        'Lettres, chiffres et `_` seulement : `prix_ttc`, `note1` — pas d\'espace, pas d\'accent.',
        'Ne commence pas par un chiffre : `1note` est interdit.',
        'Pas de mot réservé du C : `int`, `return`, `if`…',
        'Choisis des noms parlants : `moyenne` plutôt que `m`.',
      ],
    },

    { type: 'titre', contenu: '2. Afficher des variables avec printf' },
    {
      type: 'texte',
      contenu:
        "Dans le texte de printf, chaque **format** (%d, %f, %c) est remplacé, dans l'ordre, par les valeurs placées après la virgule. **%.2f** affiche un réel avec 2 chiffres après la virgule, **%.0f** sans décimales.",
    },
    {
      type: 'c',
      titre: 'La fiche d\'un article',
      code: `#include <stdio.h>

int main() {
    int stock = 48;
    float prix = 2750.5;
    char rayon = 'B';

    printf("Stock : %d unites\\n", stock);
    printf("Prix : %f F\\n", prix);
    printf("Prix arrondi : %.2f F\\n", prix);
    printf("Rayon %c, %d unites a %.0f F\\n", rayon, stock, prix);
    return 0;
}`,
      legende: '%f seul affiche 6 décimales. Dans la dernière ligne, les 3 formats sont remplacés dans l\'ordre par rayon, stock et prix.',
    },

    { type: 'titre', contenu: '3. Les constantes' },
    {
      type: 'texte',
      contenu:
        "Une **constante** est une valeur qui ne change jamais pendant le programme : le taux de TVA, le prix d'un ticket… On la définit une fois, en majuscules par convention. Si le taux change, on ne modifie qu'une seule ligne.",
    },
    {
      type: 'tableau',
      entetes: ['Écriture', 'Fonctionnement'],
      lignes: [
        ['#define TVA 0.18', 'Le préprocesseur remplace TVA par 0.18 partout (pas de = ni de ;)'],
        ['const float TVA = 0.18;', 'Une variable que le compilateur interdit de modifier'],
      ],
    },
    {
      type: 'c',
      titre: 'Le prix du ticket de bus',
      code: `#include <stdio.h>
#define PRIX_TICKET 200

int main() {
    int voyages = 22;
    printf("Ticket : %d F\\n", PRIX_TICKET);
    printf("Budget du mois : %d F\\n", voyages * PRIX_TICKET);
    return 0;
}`,
      legende: 'Le prix du ticket passe à 250 F ? Change seulement la ligne #define et exécute à nouveau.',
    },

    { type: 'titre', contenu: '4. Un caractère est un nombre' },
    {
      type: 'texte',
      contenu:
        "En mémoire, un **char** est un petit entier : son **code ASCII**. 'A' vaut 65, 'B' 66, 'a' 97, '0' 48. On peut donc afficher un char avec %c (le caractère) ou avec %d (son code), et même faire des calculs dessus.",
    },
    {
      type: 'c',
      titre: 'Les codes ASCII',
      code: `#include <stdio.h>

int main() {
    char lettre = 'A';
    printf("%c a pour code %d\\n", lettre, lettre);
    printf("La lettre suivante : %c\\n", lettre + 1);
    printf("Taille d'un int : %d octets\\n", (int) sizeof(int));
    return 0;
}`,
      legende: "lettre + 1 donne 66, c'est-à-dire 'B'. sizeof donne la taille d'un type en octets.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Toute variable se **déclare** avec son type : `int`, `float`, `double`, `char`.',
        'Formats : `%d` entier, `%f` réel (`%.2f` = 2 décimales), `%c` caractère.',
        'Constante : `#define TVA 0.18` (sans = ni ;) ou `const float TVA = 0.18;`.',
        "Un `char` s'écrit entre apostrophes ('K') et vaut son code ASCII ('A' = 65).",
      ],
    },
    {
      type: 'quiz',
      question: 'Quel type choisir pour le nombre d\'étudiants d\'une classe ?',
      options: ['float', 'int', 'char'],
      bonneReponse: 1,
      explication: 'Un nombre d\'étudiants est toujours entier : int.',
    },
    {
      type: 'quiz',
      question: 'Qu\'affiche printf("%.1f", 12.75); ?',
      options: ['12.7', '12.8', '12.75'],
      bonneReponse: 1,
      explication: '%.1f arrondit à 1 chiffre après la virgule : 12.75 devient 12.8.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : choisir le type',
      enonce: 'Donne le type C et une déclaration pour chaque donnée.',
      questions: ['Le nombre d\'heures de cours par semaine', 'Le prix d\'un litre de carburant (865,5 F)', 'La mention d\'un étudiant : A, B, C ou D', 'Le taux de change de l\'euro (655,957)'],
      langage: 'c',
      solution: `int heures = 30;
float prix_litre = 865.5;
char mention = 'B';
double taux = 655.957;   /* ou #define TAUX 655.957 car il ne change pas */`,
      explication: 'Le taux fixe peut aussi être une constante : c\'est même préférable, puisqu\'il ne change jamais.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : trouve les erreurs',
      enonce: 'Ce programme contient 4 erreurs. Trouve-les.\n\nint main() {\n    int 2note = 14;\n    float moyenne = 12,5;\n    char lettre = "A";\n    printf("Moyenne : %d", moyenne);\n}',
      langage: 'texte',
      solution: `1. int 2note : un nom ne commence pas par un chiffre → note2.
2. 12,5 : en C, la virgule décimale est un POINT → 12.5.
3. "A" est une chaîne : un caractère s'écrit entre apostrophes → 'A'.
4. %d affiche un entier : pour un float il faut %f (ou %.2f).
(Il manque aussi #include <stdio.h> et return 0;)`,
      explication: 'La virgule décimale est l\'erreur la plus fréquente chez les débutants francophones : en C, on écrit toujours 12.5.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le bulletin d\'un étudiant',
      enonce: "L'école souhaite afficher la fiche d'un étudiant : matricule 2045, note de C : 14.5, note de SQL : 12, coefficient de C : 3, de SQL : 2. La moyenne est pondérée par les coefficients.",
      questions: [
        'Déclare les variables nécessaires avec le type adapté. Les coefficients seront des constantes.',
        'Écris le programme qui calcule la moyenne et affiche : « Matricule : 2045 » puis « Moyenne : 13.50 / 20 ».',
        'Pourquoi le résultat serait-il faux si toutes les variables étaient de type int ?',
      ],
      langage: 'c',
      solution: `#include <stdio.h>
#define COEF_C 3
#define COEF_SQL 2

int main() {
    int matricule = 2045;
    float note_c = 14.5, note_sql = 12;
    float moyenne;

    moyenne = (note_c * COEF_C + note_sql * COEF_SQL) / (COEF_C + COEF_SQL);
    printf("Matricule : %d\\n", matricule);
    printf("Moyenne : %.2f / 20\\n", moyenne);
    return 0;
}

/* 3. Avec des int, 14.5 serait stocké 14, et la division entière
      (66 / 5) donnerait 13 au lieu de 13.50. */`,
      explication: '(14,5 × 3 + 12 × 2) / 5 = (43,5 + 24) / 5 = 13,5. La division entière est vue en détail dans la leçon suivante.',
    },
  ],
  exercice: {
    id: 'c-fiche-etudiant',
    titre: 'La fiche de l\'étudiant',
    consigne:
      'Complète le programme : déclare age (int) = 20, moyenne (float) = 13.75 et initiale (char) = \'K\', puis affiche exactement : « Age : 20 ans », « Moyenne : 13.75 », « Initiale : K ».',
    langage: 'c',
    codeDepart: `#include <stdio.h>

int main() {
    // Déclare les 3 variables ici

    // Affiche-les avec printf et les formats %d, %.2f et %c

    return 0;
}`,
    sortieAttendue: ['Age : 20 ans', 'Moyenne : 13.75', 'Initiale : K'],
    indice: 'int age = 20; … puis printf("Age : %d ans\\n", age); printf("Moyenne : %.2f\\n", moyenne); printf("Initiale : %c\\n", initiale);',
    solution: `#include <stdio.h>

int main() {
    int age = 20;
    float moyenne = 13.75;
    char initiale = 'K';

    printf("Age : %d ans\\n", age);
    printf("Moyenne : %.2f\\n", moyenne);
    printf("Initiale : %c\\n", initiale);
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'operateurs-et-expressions',
  titre: 'Opérateurs et expressions',
  duree: '30 min',
  objectifs: [
    'Utiliser les opérateurs arithmétiques + - * / %',
    'Comprendre la division entière et le modulo',
    'Convertir un type avec un cast : (float)',
    'Utiliser ++, +=, la priorité des opérateurs et math.h',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les opérateurs', sousTitre: 'Le résumé en 2 minutes', narration: 'Les opérateurs du C et le piège de la division entière, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'La division',
        colonnes: [
          { nom: '7 / 2', texte: '= 3 (deux entiers : division entière)' },
          { nom: '7 % 2', texte: '= 1 (le reste)' },
          { nom: '7.0 / 2', texte: '= 3.5 (un réel : division réelle)' },
        ],
        narration: "Attention : sept divisé par deux donne trois, car entre deux entiers, la division est entière. Sept modulo deux donne le reste, un. Et si l'un des nombres est réel, on obtient trois virgule cinq.",
      },
      {
        type: 'points',
        titre: 'Les raccourcis',
        points: ['i++ : ajoute 1', 'total += prix : total = total + prix', '(float) n : convertit n en réel'],
        narration: "Quelques raccourcis : i plus plus ajoute un, total plus égal prix ajoute prix au total, et float entre parenthèses convertit un entier en réel.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Les opérateurs arithmétiques' },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'Rôle', 'Exemple', 'Résultat'],
      lignes: [
        ['+', 'addition', '15 + 4', '19'],
        ['-', 'soustraction', '15 - 4', '11'],
        ['*', 'multiplication', '15 * 4', '60'],
        ['/', 'division (entière si les 2 sont entiers !)', '15 / 4', '3'],
        ['/', 'division réelle', '15.0 / 4', '3.75'],
        ['%', 'reste de la division entière (modulo)', '15 % 4', '3'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le piège n°1 du C : la division entière',
      contenu:
        "Quand les **deux** nombres sont des entiers, `/` donne le **quotient entier** : la partie décimale est perdue. `15 / 4` vaut 3, et même `float r = 15 / 4;` donne 3.00, car le calcul est fait **avant** d'être rangé dans r. Pour obtenir 3.75, il faut qu'au moins un des deux soit réel.",
    },
    {
      type: 'c',
      titre: 'Division entière, modulo et division réelle',
      code: `#include <stdio.h>

int main() {
    int a = 15, b = 4;
    float r1 = a / b;
    float r2 = (float) a / b;

    printf("a / b = %d\\n", a / b);
    printf("a %% b = %d\\n", a % b);
    printf("r1 = %.2f (faux !)\\n", r1);
    printf("r2 = %.2f\\n", r2);
    return 0;
}`,
      legende: '(float) a convertit a en réel avant la division : c\'est un **cast** (conversion de type).',
    },

    { type: 'titre', contenu: '2. À quoi sert le modulo ?' },
    {
      type: 'texte',
      contenu:
        "Le modulo `%` donne le **reste** de la division entière. Il est très utile : savoir si un nombre est **pair** (`n % 2 == 0`), récupérer le dernier chiffre d'un nombre (`n % 10`), ou **découper** une quantité en unités (heures, minutes, billets…).",
    },
    {
      type: 'c',
      titre: 'Rendre la monnaie en billets de 10 000 et 5 000 F',
      code: `#include <stdio.h>

int main() {
    int somme = 37500;
    int b10000 = somme / 10000;
    int reste = somme % 10000;
    int b5000 = reste / 5000;
    reste = reste % 5000;

    printf("Billets de 10000 : %d\\n", b10000);
    printf("Billets de 5000 : %d\\n", b5000);
    printf("Reste en pieces : %d F\\n", reste);
    return 0;
}`,
      legende: '37500 / 10000 = 3 billets, reste 7500 ; 7500 / 5000 = 1 billet, reste 2500. Essaie avec 68000.',
    },

    { type: 'titre', contenu: '3. Priorité et raccourcis' },
    {
      type: 'tableau',
      titre: 'Ordre de priorité (du plus fort au plus faible)',
      entetes: ['Priorité', 'Opérateurs', 'Exemple'],
      lignes: [
        ['1', '( )', '(2 + 3) * 4 = 20'],
        ['2', '* / %', '2 + 3 * 4 = 14'],
        ['3', '+ -', '10 - 4 - 3 = 3 (de gauche à droite)'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Les raccourcis d\'écriture',
      entetes: ['Raccourci', 'Équivaut à'],
      lignes: [
        ['i++;', 'i = i + 1;'],
        ['i--;', 'i = i - 1;'],
        ['total += prix;', 'total = total + prix;'],
        ['stock -= 5;', 'stock = stock - 5;'],
        ['prix *= 2;', 'prix = prix * 2;'],
      ],
    },
    {
      type: 'c',
      titre: 'Le panier du client',
      code: `#include <stdio.h>
#include <math.h>

int main() {
    int articles = 0;
    float total = 0;

    total += 4500;  articles++;   // riz
    total += 1500;  articles++;   // huile
    total += 750;   articles++;   // sucre

    printf("%d articles, total : %.0f F\\n", articles, total);
    printf("Racine de 144 : %.0f\\n", sqrt(144));
    printf("2 puissance 10 : %.0f\\n", pow(2, 10));
    return 0;
}`,
      legende: 'math.h fournit sqrt (racine carrée) et pow (puissance). Avec gcc sous Linux, on compile avec -lm : gcc panier.c -o panier -lm.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Entre deux entiers, `/` donne le **quotient entier** : `7 / 2` vaut 3.',
        '`%` donne le **reste** : pair si `n % 2 == 0`.',
        'Pour une division réelle : `(float) a / b` ou `a / 2.0`.',
        '`* / %` passent avant `+ -` ; `i++` et `total += x` sont des raccourcis.',
      ],
    },
    {
      type: 'quiz',
      question: 'Que vaut 17 % 5 ?',
      options: ['3', '2', '3.4'],
      bonneReponse: 1,
      explication: '17 = 5 × 3 + 2 : le reste est 2.',
    },
    {
      type: 'quiz',
      question: 'int a = 9, b = 2; float m = (a + b) / 2; — que vaut m ?',
      options: ['5.50', '5.00', '10.00'],
      bonneReponse: 1,
      explication: '(a + b) vaut 11, et 11 / 2 entre deux entiers donne 5. Il faudrait écrire (a + b) / 2.0.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : calcule à la main',
      enonce: 'Avec int x = 23, y = 4; donne la valeur de chaque expression.',
      questions: ['x / y', 'x % y', 'x + y * 2', '(x + y) * 2', '(float) x / y', 'x % 2'],
      langage: 'texte',
      solution: `1. 23 / 4 = 5       (division entière)
2. 23 % 4 = 3       (23 = 4 × 5 + 3)
3. 23 + 8 = 31      (* avant +)
4. 27 * 2 = 54
5. 23.0 / 4 = 5.75
6. 1                (23 est impair)`,
      explication: 'Retiens la méthode : quotient avec /, reste avec %, et un cast pour garder les décimales.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La durée d\'appel d\'un opérateur téléphonique',
      enonce: "Un opérateur mobile ivoirien enregistre la durée totale des appels d'un client en secondes. On veut l'afficher en minutes et secondes, et calculer le coût : 1 F la seconde, avec une réduction de 10 % si la durée dépasse une heure.",
      questions: [
        'Pour une durée de 4 250 secondes, calcule à la main les minutes et les secondes restantes.',
        'Écris les instructions C qui calculent minutes et secondes à partir de duree (int).',
        'Écris l\'expression du coût avec réduction (on suppose que la durée dépasse une heure). Pourquoi faut-il écrire 0.9 et non 9 / 10 ?',
      ],
      langage: 'c',
      solution: `/* 1. 4250 / 60 = 70 minutes, 4250 % 60 = 50 secondes */

int duree = 4250;
int minutes = duree / 60;
int secondes = duree % 60;
printf("%d min %d s\\n", minutes, secondes);   /* 70 min 50 s */

/* 3. */
float cout = duree * 0.9;                      /* 3825 F */
/* 9 / 10 est une division entière : elle vaut 0, et le coût serait 0 F ! */`,
      explication: 'La question 3 vérifie que tu connais le piège de la division entière : 9 / 10 vaut 0 en C.',
    },
  ],
  exercice: {
    id: 'c-heures-minutes',
    titre: 'Convertir des secondes',
    consigne:
      'La variable duree vaut 7384 secondes. Calcule les heures, les minutes et les secondes restantes avec / et %, puis affiche exactement : « 2 h 3 min 4 s ».',
    langage: 'c',
    codeDepart: `#include <stdio.h>

int main() {
    int duree = 7384;
    int heures, minutes, secondes;
    // Calcule heures, minutes et secondes

    printf("%d h %d min %d s\\n", heures, minutes, secondes);
    return 0;
}`,
    sortieAttendue: ['2 h 3 min 4 s'],
    indice: 'heures = duree / 3600; puis le reste (duree % 3600) donne les minutes avec / 60 et les secondes avec % 60.',
    solution: `#include <stdio.h>

int main() {
    int duree = 7384;
    int heures, minutes, secondes;
    heures = duree / 3600;
    minutes = (duree % 3600) / 60;
    secondes = duree % 60;

    printf("%d h %d min %d s\\n", heures, minutes, secondes);
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'lire-avec-scanf',
  titre: 'Lire au clavier avec scanf',
  duree: '25 min',
  objectifs: [
    'Lire un entier, un réel ou un caractère avec scanf',
    'Comprendre le rôle du & (adresse de la variable)',
    'Lire plusieurs valeurs en une seule instruction',
    'Éviter les pièges classiques de scanf',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La fonction scanf', sousTitre: 'Le résumé en 2 minutes', narration: 'Lire ce que tape l\'utilisateur avec scanf, en deux minutes.' },
      {
        type: 'code',
        titre: 'Lire une valeur',
        lignes: ['int qte;', 'printf("Quantite : ");', 'scanf("%d", &qte);', 'printf("Tu as pris %d\\n", qte);'],
        etapes: [
          { ligne: 0, variables: { qte: '?' } },
          { ligne: 1, variables: { qte: '?' }, sortie: 'Quantite : ', note: 'On affiche d\'abord une question' },
          { ligne: 2, variables: { qte: '3' }, note: 'L\'utilisateur tape 3 : il est rangé à l\'adresse &qte' },
          { ligne: 3, variables: { qte: '3' }, sortie: 'Tu as pris 3' },
        ],
        narration: "On affiche d'abord une question avec printf. Puis scanf attend que l'utilisateur tape une valeur, et la range dans la variable dont on donne l'adresse avec l'esperluette.",
      },
      {
        type: 'points',
        titre: 'Les formats de scanf',
        points: ['%d : int', '%f : float', '%lf : double', ' %c : char (avec un espace avant)'],
        narration: "Les formats : pourcentage d pour un entier, pourcentage f pour un float, pourcentage l f pour un double, et pour un caractère, pourcentage c précédé d'un espace.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Le principe' },
    {
      type: 'texte',
      contenu:
        "**scanf** (scan formatted) attend que l'utilisateur tape une valeur puis appuie sur Entrée, et range cette valeur dans une variable. Sa forme : `scanf(\"format\", &variable);`. On l'accompagne **toujours** d'un printf qui explique ce qu'il faut taper : sinon, l'utilisateur voit un écran vide qui attend.",
    },
    {
      type: 'tableau',
      entetes: ['Type', 'Format scanf', 'Exemple'],
      lignes: [
        ['int', '%d', 'scanf("%d", &age);'],
        ['float', '%f', 'scanf("%f", &prix);'],
        ['double', '%lf', 'scanf("%lf", &taux);'],
        ['char', ' %c (espace avant)', 'scanf(" %c", &reponse);'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Pourquoi le & ?',
      contenu:
        "`&age` désigne l'**adresse** de la variable age, c'est-à-dire l'endroit où elle se trouve dans la mémoire. scanf a besoin de cette adresse pour savoir **où ranger** la valeur tapée. C'est comme donner son adresse au livreur : sans elle, il ne sait pas où déposer le colis. Les pointeurs, vus plus tard, reposent sur cette notion.",
    },
    {
      type: 'c',
      titre: 'Une calculatrice de moyenne',
      code: `#include <stdio.h>

int main() {
    float n1, n2, moyenne;
    printf("Note 1 : ");
    scanf("%f", &n1);
    printf("Note 2 : ");
    scanf("%f", &n2);
    moyenne = (n1 + n2) / 2;
    printf("\\nMoyenne : %.2f / 20\\n", moyenne);
    return 0;
}`,
      entree: '12.5\n15',
      legende: "Dans « Entrée clavier », chaque ligne correspond à ce que l'utilisateur tape avant d'appuyer sur Entrée. Remplace par tes propres notes.",
    },

    { type: 'titre', contenu: '2. Lire plusieurs valeurs' },
    {
      type: 'texte',
      contenu:
        "Un seul scanf peut lire plusieurs valeurs : `scanf(\"%d %f\", &qte, &prix);`. L'utilisateur les sépare par un **espace** ou un **retour à la ligne**.",
    },
    {
      type: 'c',
      titre: 'Quantité et prix en une seule saisie',
      code: `#include <stdio.h>

int main() {
    int qte;
    float prix;
    char paiement;

    printf("Quantite et prix unitaire : ");
    scanf("%d %f", &qte, &prix);
    printf("Paiement (W = Wave, E = especes) : ");
    scanf(" %c", &paiement);

    printf("\\nTotal : %.0f F, paye par %c\\n", qte * prix, paiement);
    return 0;
}`,
      entree: '3 2500\nW',
      legende: "L'espace avant %c ignore le retour à la ligne laissé par la saisie précédente. Sans lui, paiement recevrait ce retour à la ligne au lieu de W.",
    },

    { type: 'titre', contenu: '3. Les pièges de scanf' },
    {
      type: 'tableau',
      entetes: ['Erreur', 'Conséquence', 'Correction'],
      lignes: [
        ['scanf("%d", age);', 'Oubli du & : le programme plante ou range la valeur n\'importe où', 'scanf("%d", &age);'],
        ['scanf("%d", &prix); avec float prix', 'Mauvais format : valeur fausse', 'scanf("%f", &prix);'],
        ['scanf("%d\\n", &age);', 'Le \\n fait attendre une saisie supplémentaire', 'Jamais de \\n dans scanf'],
        ['scanf("%c", &rep); après un autre scanf', 'Lit le retour à la ligne précédent', 'scanf(" %c", &rep);'],
        ['scanf("Age : %d", &age);', 'scanf attend que l\'utilisateur tape « Age : »', 'Le texte va dans printf, pas dans scanf'],
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`scanf("%d", &n);` lit un entier ; toujours un **printf** avant pour guider l\'utilisateur.',
        'Le **&** donne l\'adresse de la variable : il est obligatoire (sauf pour les chaînes, vues plus tard).',
        'Formats : `%d` int, `%f` float, `%lf` double, `" %c"` char.',
        'Pas de texte ni de `\\n` dans le format de scanf.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle instruction lit correctement un double nommé taux ?',
      options: ['scanf("%f", &taux);', 'scanf("%lf", &taux);', 'scanf("%lf", taux);'],
      bonneReponse: 1,
      explication: 'Pour un double, scanf attend %lf, et le & est obligatoire.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : corrige les scanf',
      enonce: 'Corrige chaque instruction (int age; float prix; char rep;).',
      questions: ['scanf("%d", age);', 'scanf("%d", &prix);', 'scanf("Entrez l\'age : %d", &age);', 'scanf("%c", &rep); (placé après un autre scanf)'],
      langage: 'c',
      solution: `scanf("%d", &age);       /* 1. il manquait le &          */
scanf("%f", &prix);      /* 2. %f pour un float          */
printf("Entrez l'age : ");
scanf("%d", &age);       /* 3. le texte va dans printf    */
scanf(" %c", &rep);      /* 4. espace avant %c            */`,
      explication: 'Ces 4 erreurs représentent la grande majorité des problèmes de scanf rencontrés en TP.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La facture d\'électricité',
      enonce: "Un distributeur d'électricité calcule la facture ainsi : l'agent saisit l'ancien et le nouvel index du compteur (en kWh). La consommation est la différence. Le prix est de 79 F le kWh, auquel on ajoute une redevance fixe de 1 500 F.",
      questions: [
        'Écris l\'algorithme de ce calcul.',
        'Écris le programme C complet. Le prix du kWh et la redevance seront des constantes.',
        'Fais la trace du programme pour un ancien index de 12 450 et un nouvel index de 12 630.',
      ],
      langage: 'texte',
      solution: `1. Algorithme Facture
   Constantes
       PRIX_KWH = 79
       REDEVANCE = 1500
   Variables
       ancien, nouveau, conso, montant : entier
   Début
       Écrire("Ancien index : ")
       Lire(ancien)
       Écrire("Nouvel index : ")
       Lire(nouveau)
       conso ← nouveau - ancien
       montant ← conso * PRIX_KWH + REDEVANCE
       Écrire("Consommation : ", conso, " kWh")
       Écrire("Montant : ", montant, " F")
   Fin

2. #include <stdio.h>
   #define PRIX_KWH 79
   #define REDEVANCE 1500

   int main() {
       int ancien, nouveau, conso, montant;
       printf("Ancien index : ");
       scanf("%d", &ancien);
       printf("Nouvel index : ");
       scanf("%d", &nouveau);
       conso = nouveau - ancien;
       montant = conso * PRIX_KWH + REDEVANCE;
       printf("Consommation : %d kWh\\n", conso);
       printf("Montant : %d F\\n", montant);
       return 0;
   }

3. ancien = 12450, nouveau = 12630
   conso = 12630 - 12450 = 180 kWh
   montant = 180 × 79 + 1500 = 14220 + 1500 = 15720 F`,
      explication: 'Les index et les montants sont entiers ici : le type int suffit, et il n\'y a pas de division.',
    },
  ],
  exercice: {
    id: 'c-facture',
    titre: 'La facture du client',
    consigne:
      'Lis la quantité (int) puis le prix unitaire (float) avec scanf. Affiche le total hors taxe puis le total TTC (TVA 18 %). Le test tape « 2 1500 » : on attend « Total HT : 3000 F » puis « Total TTC : 3540 F ».',
    langage: 'c',
    entree: '2 1500',
    codeDepart: `#include <stdio.h>
#define TVA 0.18

int main() {
    int qte;
    float prix, ht, ttc;
    // Lis qte et prix, puis calcule ht et ttc

    printf("Total HT : %.0f F\\n", ht);
    printf("Total TTC : %.0f F\\n", ttc);
    return 0;
}`,
    sortieAttendue: ['Total HT : 3000 F', 'Total TTC : 3540 F'],
    indice: 'scanf("%d %f", &qte, &prix); puis ht = qte * prix; et ttc = ht * (1 + TVA);',
    solution: `#include <stdio.h>
#define TVA 0.18

int main() {
    int qte;
    float prix, ht, ttc;
    scanf("%d %f", &qte, &prix);
    ht = qte * prix;
    ttc = ht * (1 + TVA);

    printf("Total HT : %.0f F\\n", ht);
    printf("Total TTC : %.0f F\\n", ttc);
    return 0;
}`,
  },
}

export const leconsSyntaxe: Lecon[] = [lecon1, lecon2, lecon3]

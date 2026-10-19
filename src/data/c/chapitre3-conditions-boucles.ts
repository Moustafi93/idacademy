import type { Lecon } from '../types'

/*
 * Langages Pascal et C — Chapitre 3 : Conditions et boucles (PREMIUM)
 * Ce fichier n'est jamais inclus dans le site public en production :
 * il est exporté vers Supabase par `npm run premium`.
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'les-conditions-en-c',
  titre: 'Les conditions : if, else if, else',
  duree: '35 min',
  objectifs: [
    'Écrire une condition avec if et else',
    'Utiliser les opérateurs de comparaison et les opérateurs logiques && || !',
    'Enchaîner plusieurs cas avec else if',
    'Traduire Si … Alors … Sinon en Pascal et en C',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les conditions en C', sousTitre: 'Le résumé en 2 minutes', narration: 'Les instructions if, else if et else, en deux minutes.' },
      {
        type: 'code',
        titre: 'if … else',
        lignes: ['if (moyenne >= 10) {', '    printf("Admis\\n");', '} else {', '    printf("Ajourne\\n");', '}'],
        etapes: [
          { ligne: 0, variables: { moyenne: '12.5' }, note: '12.5 >= 10 est vrai' },
          { ligne: 1, variables: { moyenne: '12.5' }, sortie: 'Admis', note: 'On exécute le bloc du if' },
          { ligne: 4, variables: { moyenne: '12.5' }, note: 'Le bloc else est sauté' },
        ],
        narration: "Si la condition entre parenthèses est vraie, le programme exécute le bloc du if. Sinon, il exécute le bloc du else. Jamais les deux.",
      },
      {
        type: 'points',
        titre: 'Combiner des conditions',
        points: ['&& : ET (les deux vraies)', '|| : OU (au moins une vraie)', '! : NON (inverse)', '== pour comparer, jamais ='],
        narration: "Pour combiner des conditions : et s'écrit deux esperluettes, ou s'écrit deux barres verticales, et non s'écrit avec un point d'exclamation. Et pour comparer, on utilise toujours double égal.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La structure if … else' },
    {
      type: 'texte',
      contenu:
        "Un programme doit souvent **choisir** : accorder ou non une remise, déclarer un étudiant admis ou ajourné… En algorithme, on écrit **Si … Alors … Sinon … FinSi**. En C, on écrit **if** (si) et **else** (sinon). La condition est **toujours entre parenthèses**, et chaque bloc est entre **accolades**.",
    },
    {
      type: 'tableau',
      entetes: ['Algorithme', 'Pascal', 'C'],
      lignes: [
        ['Si moyenne >= 10 Alors', 'if moyenne >= 10 then', 'if (moyenne >= 10) {'],
        ['    Écrire("Admis")', "    writeln('Admis')", '    printf("Admis\\n");'],
        ['Sinon', 'else', '} else {'],
        ['    Écrire("Ajourné")', "    writeln('Ajourne');", '    printf("Ajourne\\n");'],
        ['FinSi', '(pas de mot de fin)', '}'],
      ],
      legende: "En Pascal, il n'y a **pas de point-virgule avant else**. S'il y a plusieurs instructions dans un bloc, on les entoure de begin … end.",
    },
    {
      type: 'c',
      titre: 'Admis ou ajourné ?',
      code: `#include <stdio.h>

int main() {
    float moyenne;
    printf("Moyenne annuelle : ");
    scanf("%f", &moyenne);

    if (moyenne >= 10) {
        printf("\\nAdmis en 2e annee\\n");
    } else {
        printf("\\nAjourne : il manque %.2f points\\n", 10 - moyenne);
    }
    return 0;
}`,
      entree: '11.25',
      legende: 'Essaie avec 8.5 puis avec 10 dans « Entrée clavier ». Avec 10, la condition >= 10 est vraie.',
    },

    { type: 'titre', contenu: '2. Comparer et combiner' },
    {
      type: 'tableau',
      titre: 'Les opérateurs de comparaison',
      entetes: ['Algorithme', 'Pascal', 'C', 'Exemple en C'],
      lignes: [
        ['=', '=', '==', 'if (choix == 1)'],
        ['≠', '<>', '!=', 'if (stock != 0)'],
        ['<  ≤', '<  <=', '<  <=', 'if (age < 18)'],
        ['>  ≥', '>  >=', '>  >=', 'if (note >= 10)'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Les opérateurs logiques',
      entetes: ['Algorithme', 'Pascal', 'C', 'Vrai quand…'],
      lignes: [
        ['ET', 'and', '&&', 'les deux conditions sont vraies'],
        ['OU', 'or', '||', 'au moins une condition est vraie'],
        ['NON', 'not', '!', 'la condition est fausse'],
      ],
      legende: 'En Pascal, chaque condition se met entre parenthèses : if (age >= 18) and (note >= 10) then',
    },
    {
      type: 'c',
      titre: 'Une remise sous conditions',
      code: `#include <stdio.h>

int main() {
    float montant = 60000;
    int fidele = 1;          /* 1 = vrai, 0 = faux */
    float remise = 0;

    if (montant >= 50000 && fidele) {
        remise = montant * 0.10;
    }
    if (montant < 5000 || !fidele) {
        printf("Pas de livraison gratuite\\n");
    }
    printf("Remise : %.0f F\\n", remise);
    printf("A payer : %.0f F\\n", montant - remise);
    return 0;
}`,
      legende: 'Le client a droit à 10 % s\'il achète pour 50 000 F ou plus ET qu\'il est fidèle. Mets fidele = 0 et exécute à nouveau.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les deux pièges classiques',
      elements: [
        '`if (note = 10)` **affecte** 10 à note, et la condition est toujours vraie : il faut `if (note == 10)`.',
        '`if (note >= 10);` avec un point-virgule après la parenthèse : le if est vide, et le bloc qui suit s\'exécute **toujours**.',
        'En C, une condition est vraie si elle vaut autre chose que 0 : `if (fidele)` signifie `if (fidele != 0)`.',
      ],
    },

    { type: 'titre', contenu: '3. Plusieurs cas : else if' },
    {
      type: 'texte',
      contenu:
        "Quand il y a plus de deux cas, on enchaîne les tests avec **else if**. Le programme teste les conditions **dans l'ordre** et s'arrête à la **première vraie**. C'est pour cela qu'on peut écrire `else if (moyenne >= 12)` sans ajouter `&& moyenne < 14` : si on arrive là, on sait déjà que la moyenne est inférieure à 14.",
    },
    {
      type: 'c',
      titre: 'La mention au BTS',
      code: `#include <stdio.h>

int main() {
    float moyenne;
    scanf("%f", &moyenne);

    if (moyenne >= 16) {
        printf("Mention : Tres bien\\n");
    } else if (moyenne >= 14) {
        printf("Mention : Bien\\n");
    } else if (moyenne >= 12) {
        printf("Mention : Assez bien\\n");
    } else if (moyenne >= 10) {
        printf("Mention : Passable\\n");
    } else {
        printf("Ajourne\\n");
    }
    return 0;
}`,
      entree: '14.75',
      legende: 'Teste 16, 12.5 et 9. Que se passe-t-il si on place le test >= 10 en premier ? Essaie : toutes les moyennes au-dessus de 10 deviennent « Passable ».',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`if (condition) { … } else { … }` : la condition est toujours **entre parenthèses**.',
        'Comparer : `==`, `!=`, `<`, `<=`, `>`, `>=`. Combiner : `&&` (ET), `||` (OU), `!` (NON).',
        '`else if` teste les cas dans l\'ordre et s\'arrête au **premier vrai** : place les seuils du plus grand au plus petit.',
        'Pascal : `if … then … else …` sans `;` avant else, `begin … end` pour plusieurs instructions.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle condition est vraie si l\'âge est compris entre 18 et 25 ans (inclus) ?',
      options: ['age >= 18 || age <= 25', 'age >= 18 && age <= 25', '18 <= age <= 25'],
      bonneReponse: 1,
      explication: 'Il faut que les deux conditions soient vraies en même temps : ET, donc &&. La forme 18 <= age <= 25 ne fonctionne pas en C.',
    },
    {
      type: 'quiz',
      question: 'int n = 5; if (n = 0) printf("zero"); else printf("non nul"); — qu\'affiche ce code ?',
      options: ['zero', 'non nul', 'Rien : erreur de compilation'],
      bonneReponse: 1,
      explication: 'n = 0 met 0 dans n, et la valeur de l\'expression est 0, donc faux : le programme affiche « non nul ». Il fallait écrire n == 0.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : pair ou impair',
      enonce: 'Écris un programme C qui lit un entier et affiche « Pair » ou « Impair ».',
      langage: 'c',
      solution: `#include <stdio.h>

int main() {
    int n;
    printf("Nombre : ");
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("Pair\\n");
    } else {
        printf("Impair\\n");
    }
    return 0;
}`,
      explication: 'Un nombre est pair si le reste de sa division par 2 vaut 0 : n % 2 == 0.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : traduire en Pascal',
      enonce: 'Traduis en Pascal :\n\nif (temperature > 38 && fievre_depuis >= 3) {\n    printf("Consulter un medecin\\n");\n} else {\n    printf("Surveiller\\n");\n}',
      langage: 'pascal',
      solution: `if (temperature > 38) and (fievre_depuis >= 3) then
    writeln('Consulter un medecin')
else
    writeln('Surveiller');`,
      explication: 'Pas de point-virgule avant else en Pascal, et chaque condition est entre parenthèses autour du and.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le tarif d\'un transporteur Abidjan – Bouaké',
      enonce:
        "Une compagnie de transport fixe le prix d'un billet Abidjan – Bouaké à 7 000 F. Les enfants de moins de 5 ans voyagent gratuitement, les moins de 12 ans paient demi-tarif, et les étudiants (sur présentation de la carte) bénéficient de 20 % de réduction. Un bagage de plus de 20 kg coûte 1 000 F de supplément.",
      questions: [
        'Écris l\'algorithme qui lit l\'âge, le statut étudiant (O/N) et le poids du bagage, puis affiche le prix à payer.',
        'Traduis-le en C.',
        'Donne le prix pour : (a) un enfant de 8 ans avec 10 kg ; (b) un étudiant de 22 ans avec 25 kg ; (c) un adulte non étudiant de 40 ans avec 15 kg.',
      ],
      langage: 'texte',
      solution: `1. Algorithme Billet
   Constante PRIX = 7000
   Variables
       age : entier
       poids, montant : réel
       etudiant : caractère
   Début
       Lire(age, etudiant, poids)
       Si age < 5 Alors
           montant ← 0
       Sinon Si age < 12 Alors
           montant ← PRIX / 2
       Sinon Si etudiant = 'O' Alors
           montant ← PRIX * 0.8
       Sinon
           montant ← PRIX
       FinSi
       Si poids > 20 Alors
           montant ← montant + 1000
       FinSi
       Écrire("Prix : ", montant, " F")
   Fin

2. #include <stdio.h>
   #define PRIX 7000

   int main() {
       int age;
       char etudiant;
       float poids, montant;
       printf("Age, etudiant (O/N), poids du bagage : ");
       scanf("%d %c %f", &age, &etudiant, &poids);

       if (age < 5) {
           montant = 0;
       } else if (age < 12) {
           montant = PRIX / 2.0;
       } else if (etudiant == 'O') {
           montant = PRIX * 0.8;
       } else {
           montant = PRIX;
       }
       if (poids > 20) {
           montant = montant + 1000;
       }
       printf("Prix : %.0f F\\n", montant);
       return 0;
   }

3. (a) 8 ans : demi-tarif 3 500 F, bagage 10 kg sans supplément → 3 500 F
   (b) étudiant : 7 000 × 0,8 = 5 600 F, + 1 000 F (25 kg) → 6 600 F
   (c) adulte : 7 000 F, bagage 15 kg → 7 000 F`,
      explication: "Le supplément bagage est un test séparé (un deuxième if), car il s'ajoute quel que soit le tarif. Erreur fréquente : le mettre dans un else if, ce qui l'empêche de s'appliquer aux étudiants.",
    },
  ],
  exercice: {
    id: 'c-mention',
    titre: 'La mention de l\'étudiant',
    consigne:
      'Lis une moyenne (float) et affiche la mention : « Mention : Tres bien » (≥ 16), « Mention : Bien » (≥ 14), « Mention : Assez bien » (≥ 12), « Mention : Passable » (≥ 10), sinon « Ajourne ». Le test tape 13.5.',
    langage: 'c',
    entree: '13.5',
    codeDepart: `#include <stdio.h>

int main() {
    float moyenne;
    scanf("%f", &moyenne);
    // Teste les seuils du plus grand au plus petit

    return 0;
}`,
    sortieAttendue: ['Mention : Assez bien'],
    indice: 'if (moyenne >= 16) { … } else if (moyenne >= 14) { … } else if (moyenne >= 12) { … } …',
    solution: `#include <stdio.h>

int main() {
    float moyenne;
    scanf("%f", &moyenne);
    if (moyenne >= 16) {
        printf("Mention : Tres bien\\n");
    } else if (moyenne >= 14) {
        printf("Mention : Bien\\n");
    } else if (moyenne >= 12) {
        printf("Mention : Assez bien\\n");
    } else if (moyenne >= 10) {
        printf("Mention : Passable\\n");
    } else {
        printf("Ajourne\\n");
    }
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'le-choix-multiple-switch',
  titre: 'Le choix multiple : switch',
  duree: '25 min',
  objectifs: [
    'Écrire un choix multiple avec switch, case et default',
    'Comprendre le rôle indispensable de break',
    'Construire un menu de programme',
    'Traduire Selon … Faire en Pascal (case … of) et en C',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Le switch', sousTitre: 'Le résumé en 2 minutes', narration: 'Le choix multiple avec switch, en deux minutes.' },
      {
        type: 'code',
        titre: 'switch … case',
        lignes: ['switch (choix) {', '    case 1: printf("Vente\\n"); break;', '    case 2: printf("Stock\\n"); break;', '    default: printf("Choix invalide\\n");', '}'],
        etapes: [
          { ligne: 0, variables: { choix: '2' }, note: 'On cherche le case qui vaut 2' },
          { ligne: 2, variables: { choix: '2' }, sortie: 'Stock', note: 'break : on sort du switch' },
          { ligne: 4, variables: { choix: '2' } },
        ],
        narration: "Le switch compare une variable à plusieurs valeurs. Il saute directement au case qui correspond, exécute ses instructions, et break le fait sortir. Default traite tous les autres cas.",
      },
      {
        type: 'points',
        titre: 'Les règles',
        points: ['Variable entière ou caractère seulement', 'break à la fin de chaque case', 'default = « Sinon »'],
        narration: "Trois règles : le switch ne marche qu'avec un entier ou un caractère, chaque case se termine par break, et default joue le rôle du sinon.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Quand utiliser switch ?' },
    {
      type: 'texte',
      contenu:
        "Quand on compare **une même variable** à une liste de **valeurs précises** (1, 2, 3… ou 'A', 'B', 'C'), une suite de else if devient longue. Le **switch** (en algorithme : **Selon … Faire**) est plus lisible. Il sert surtout pour les **menus** : « 1. Vente, 2. Stock, 3. Quitter ».",
    },
    {
      type: 'tableau',
      entetes: ['Algorithme', 'Pascal', 'C'],
      lignes: [
        ['Selon choix Faire', 'case choix of', 'switch (choix) {'],
        ['    1 : Écrire("Vente")', "    1 : writeln('Vente');", '    case 1: printf("Vente\\n"); break;'],
        ['    2 : Écrire("Stock")', "    2 : writeln('Stock');", '    case 2: printf("Stock\\n"); break;'],
        ['    Sinon : Écrire("Erreur")', "    else writeln('Erreur');", '    default: printf("Erreur\\n");'],
        ['FinSelon', 'end;', '}'],
      ],
    },
    {
      type: 'c',
      titre: 'Le menu de la caisse',
      code: `#include <stdio.h>

int main() {
    int choix;
    printf("1. Nouvelle vente\\n");
    printf("2. Consulter le stock\\n");
    printf("3. Quitter\\n");
    printf("Votre choix : ");
    scanf("%d", &choix);
    printf("\\n");

    switch (choix) {
        case 1:
            printf("Ouverture d'une nouvelle vente...\\n");
            break;
        case 2:
            printf("Stock : 148 articles\\n");
            break;
        case 3:
            printf("Au revoir !\\n");
            break;
        default:
            printf("Choix invalide\\n");
    }
    return 0;
}`,
      entree: '2',
      legende: 'Change l\'entrée clavier : 1, 3, puis 7 (qui passe dans default).',
    },

    { type: 'titre', contenu: '2. Le piège du break oublié' },
    {
      type: 'texte',
      contenu:
        "Le switch **saute** au bon case puis exécute **tout ce qui suit**, jusqu'au premier **break** ou jusqu'à la fin. Si on oublie break, le programme continue dans les case suivants : c'est l'erreur la plus fréquente avec switch.",
    },
    {
      type: 'c',
      titre: 'Sans break : que se passe-t-il ?',
      code: `#include <stdio.h>

int main() {
    int jour = 2;
    switch (jour) {
        case 1: printf("Lundi\\n");
        case 2: printf("Mardi\\n");
        case 3: printf("Mercredi\\n");
        default: printf("Autre jour\\n");
    }
    return 0;
}`,
      legende: 'Le programme affiche Mardi, Mercredi ET Autre jour ! Ajoute break; après chaque printf pour corriger.',
    },
    {
      type: 'texte',
      contenu:
        "Ce comportement est parfois **utile** : pour donner le même traitement à plusieurs valeurs, on écrit les case les uns sous les autres, sans instruction entre eux.",
    },
    {
      type: 'c',
      titre: 'Plusieurs valeurs, un seul traitement',
      code: `#include <stdio.h>

int main() {
    char reponse = 'o';
    switch (reponse) {
        case 'O':
        case 'o':
            printf("Commande confirmee\\n");
            break;
        case 'N':
        case 'n':
            printf("Commande annulee\\n");
            break;
        default:
            printf("Repondez par O ou N\\n");
    }
    return 0;
}`,
      legende: 'Majuscule ou minuscule, la réponse est acceptée. Un caractère s\'écrit entre apostrophes : case \'O\'.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les limites du switch',
      elements: [
        'La variable doit être un **entier** ou un **caractère** : pas de float, pas de chaîne.',
        'Chaque case est une **valeur précise** : pas d\'intervalle comme `case >= 10`. Pour des intervalles (mentions, tranches d\'impôt), on utilise **else if**.',
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`switch (variable) { case valeur: … break; default: … }`',
        'Sans **break**, l\'exécution continue dans les case suivants.',
        '**default** traite toutes les autres valeurs (le « Sinon »).',
        'Switch pour des valeurs précises (menus) ; else if pour des intervalles.',
      ],
    },
    {
      type: 'quiz',
      question: 'Pour afficher la tranche d\'impôt selon un salaire (moins de 75 000 F, de 75 000 à 240 000 F…), que faut-il utiliser ?',
      options: ['switch', 'else if', 'Les deux conviennent'],
      bonneReponse: 1,
      explication: 'Ce sont des intervalles et le salaire est un réel : switch ne convient pas. Il faut une suite de else if.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : réécrire avec switch',
      enonce: 'Réécris avec un switch :\n\nif (code == 1) printf("Wave\\n");\nelse if (code == 2) printf("Orange Money\\n");\nelse if (code == 3) printf("MTN MoMo\\n");\nelse printf("Moyen inconnu\\n");',
      langage: 'c',
      solution: `switch (code) {
    case 1: printf("Wave\\n"); break;
    case 2: printf("Orange Money\\n"); break;
    case 3: printf("MTN MoMo\\n"); break;
    default: printf("Moyen inconnu\\n");
}`,
      explication: 'Le dernier else devient default. Pas besoin de break après default : c\'est le dernier cas.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La calculatrice',
      enonce: "On veut une calculatrice simple : l'utilisateur saisit deux nombres réels et un opérateur (+, -, * ou /). Le programme affiche le résultat. Il doit refuser la division par zéro et les opérateurs inconnus.",
      questions: [
        'Pourquoi peut-on utiliser un switch sur l\'opérateur ?',
        'Écris le programme C complet.',
        'Écris la partie switch en Pascal (case … of).',
      ],
      langage: 'texte',
      solution: `1. L'opérateur est un caractère (char) qui prend des valeurs précises :
   '+', '-', '*', '/'. Le switch accepte les caractères.

2. #include <stdio.h>

   int main() {
       float a, b;
       char op;
       printf("Calcul (ex. 12 * 4) : ");
       scanf("%f %c %f", &a, &op, &b);

       switch (op) {
           case '+': printf("= %.2f\\n", a + b); break;
           case '-': printf("= %.2f\\n", a - b); break;
           case '*': printf("= %.2f\\n", a * b); break;
           case '/':
               if (b == 0) {
                   printf("Division par zero impossible\\n");
               } else {
                   printf("= %.2f\\n", a / b);
               }
               break;
           default:
               printf("Operateur inconnu\\n");
       }
       return 0;
   }

3. case op of
       '+' : writeln('= ', a + b:0:2);
       '-' : writeln('= ', a - b:0:2);
       '*' : writeln('= ', a * b:0:2);
       '/' : if b = 0 then
                 writeln('Division par zero impossible')
             else
                 writeln('= ', a / b:0:2);
   else
       writeln('Operateur inconnu');
   end;`,
      explication: 'On peut placer un if à l\'intérieur d\'un case : ici pour refuser la division par zéro. En Pascal, il n\'y a pas de break : chaque cas s\'arrête tout seul.',
    },
  ],
  exercice: {
    id: 'c-jour-semaine',
    titre: 'Le jour de la semaine',
    consigne:
      'Lis un numéro de jour (int) et affiche son nom avec un switch : 1 → Lundi, 2 → Mardi, … 7 → Dimanche, sinon « Numero invalide ». Le test tape 3 : on attend « Mercredi », et une seule ligne.',
    langage: 'c',
    entree: '3',
    codeDepart: `#include <stdio.h>

int main() {
    int jour;
    scanf("%d", &jour);
    switch (jour) {
        case 1: printf("Lundi\\n");
        case 2: printf("Mardi\\n");
        case 3: printf("Mercredi\\n");
        case 4: printf("Jeudi\\n");
        // Complète les autres jours et le cas invalide
    }
    return 0;
}`,
    sortieAttendue: ['Mercredi'],
    indice: 'Il manque break; à la fin de chaque case, les case 5, 6, 7 et le default.',
    solution: `#include <stdio.h>

int main() {
    int jour;
    scanf("%d", &jour);
    switch (jour) {
        case 1: printf("Lundi\\n"); break;
        case 2: printf("Mardi\\n"); break;
        case 3: printf("Mercredi\\n"); break;
        case 4: printf("Jeudi\\n"); break;
        case 5: printf("Vendredi\\n"); break;
        case 6: printf("Samedi\\n"); break;
        case 7: printf("Dimanche\\n"); break;
        default: printf("Numero invalide\\n");
    }
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'les-boucles-en-c',
  titre: 'Les boucles : for, while, do … while',
  duree: '40 min',
  objectifs: [
    'Répéter des instructions avec for, while et do … while',
    'Choisir la bonne boucle selon la situation',
    'Utiliser un compteur et un accumulateur (somme, moyenne)',
    'Contrôler une saisie et éviter les boucles infinies',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les boucles en C', sousTitre: 'Le résumé en 2 minutes', narration: 'Les trois boucles du C, en deux minutes.' },
      {
        type: 'code',
        titre: 'La boucle for',
        lignes: ['for (i = 1; i <= 3; i++) {', '    printf("Tour %d\\n", i);', '}'],
        etapes: [
          { ligne: 0, variables: { i: '1' }, note: 'Départ : i = 1' },
          { ligne: 1, variables: { i: '1' }, sortie: 'Tour 1' },
          { ligne: 1, variables: { i: '2' }, sortie: 'Tour 2', note: 'i++ puis on teste i <= 3' },
          { ligne: 1, variables: { i: '3' }, sortie: 'Tour 3' },
          { ligne: 2, variables: { i: '4' }, note: '4 <= 3 est faux : on sort' },
        ],
        narration: "La boucle for regroupe trois choses : le départ, la condition pour continuer, et le pas. Ici, i commence à un, on continue tant que i est inférieur ou égal à trois, et on ajoute un à chaque tour.",
      },
      {
        type: 'comparaison',
        titre: 'Quelle boucle choisir ?',
        colonnes: [
          { nom: 'for', texte: 'On connaît le nombre de tours' },
          { nom: 'while', texte: 'On répète tant qu\'une condition est vraie (peut faire 0 tour)' },
          { nom: 'do … while', texte: 'Au moins 1 tour : idéal pour contrôler une saisie' },
        ],
        narration: "For quand on connaît le nombre de tours. While quand on répète tant qu'une condition est vraie. Et do while quand il faut faire au moins un tour, par exemple pour redemander une saisie.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La boucle for (Pour)' },
    {
      type: 'texte',
      contenu:
        "Quand on sait **combien de fois** répéter (10 étudiants, 12 mois…), on utilise **for**. Ses parenthèses contiennent trois parties séparées par des **points-virgules** : l'**initialisation** (départ), la **condition** pour continuer, et le **pas** (ce qu'on fait à la fin de chaque tour).",
    },
    {
      type: 'tableau',
      entetes: ['Algorithme', 'Pascal', 'C'],
      lignes: [
        ['Pour i ← 1 à 10 Faire', 'for i := 1 to 10 do', 'for (i = 1; i <= 10; i++) {'],
        ['Pour i ← 10 à 1 pas -1', 'for i := 10 downto 1 do', 'for (i = 10; i >= 1; i--) {'],
        ['Pour i ← 0 à 100 pas 5', '(pas de pas libre en Pascal : on utilise while)', 'for (i = 0; i <= 100; i += 5) {'],
        ['FinPour', 'begin … end; si plusieurs instructions', '}'],
      ],
    },
    {
      type: 'c',
      titre: 'La table de multiplication',
      code: `#include <stdio.h>

int main() {
    int n, i;
    printf("Table de : ");
    scanf("%d", &n);
    printf("\\n");
    for (i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}`,
      entree: '7',
      legende: 'Change le nombre dans « Entrée clavier ». Puis modifie la boucle pour afficher la table à l\'envers (de 10 à 1).',
    },

    { type: 'titre', contenu: '2. Compteur et accumulateur' },
    {
      type: 'texte',
      contenu:
        "Deux techniques reviennent dans presque tous les sujets de BTS. Le **compteur** compte combien de fois quelque chose arrive (`nb_admis++`). L'**accumulateur** additionne des valeurs (`somme += note`). Les deux doivent être **initialisés à 0 avant la boucle**, sinon ils contiennent une valeur au hasard.",
    },
    {
      type: 'c',
      titre: 'Les notes d\'une classe',
      code: `#include <stdio.h>

int main() {
    int nb, i, admis = 0;
    float note, somme = 0;

    printf("Nombre d'etudiants : ");
    scanf("%d", &nb);
    for (i = 1; i <= nb; i++) {
        printf("Note %d : ", i);
        scanf("%f", &note);
        somme += note;              /* accumulateur */
        if (note >= 10) admis++;    /* compteur */
    }
    printf("\\nMoyenne de la classe : %.2f\\n", somme / nb);
    printf("Admis : %d sur %d\\n", admis, nb);
    return 0;
}`,
      entree: '5\n12 8.5 15 9 13',
      legende: 'La première valeur (5) est le nombre d\'étudiants, puis viennent les 5 notes. Ajoute un 6e étudiant : mets 6 et une note de plus.',
    },

    { type: 'titre', contenu: '3. La boucle while (Tant que)' },
    {
      type: 'texte',
      contenu:
        "Quand on ne connaît **pas** le nombre de tours à l'avance, on utilise **while** : la boucle se répète **tant que** la condition est vraie. La condition est testée **avant** chaque tour : si elle est fausse dès le départ, la boucle ne s'exécute jamais.",
    },
    {
      type: 'c',
      titre: 'Combien de mois pour épargner ?',
      code: `#include <stdio.h>

int main() {
    float epargne = 0, objectif = 250000, mensuel = 35000;
    int mois = 0;

    while (epargne < objectif) {
        epargne += mensuel;
        mois++;
    }
    printf("Objectif atteint en %d mois\\n", mois);
    printf("Epargne : %.0f F\\n", epargne);
    return 0;
}`,
      legende: 'Pour acheter un ordinateur à 250 000 F en épargnant 35 000 F par mois. Change mensuel et exécute à nouveau.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'La boucle infinie',
      contenu:
        "Si rien ne change dans la boucle, la condition reste vraie pour toujours : c'est une **boucle infinie**, et le programme ne s'arrête jamais. Ici, IDAcademy l'arrête au bout de 4 secondes. Vérifie toujours qu'une instruction **rapproche la condition de la sortie** : `mois++`, `epargne += mensuel`…",
    },

    { type: 'titre', contenu: '4. La boucle do … while (Répéter)' },
    {
      type: 'texte',
      contenu:
        "**do … while** exécute le bloc **d'abord**, puis teste la condition : il y a donc **au moins un tour**. C'est la boucle idéale pour **contrôler une saisie** : on redemande tant que la valeur est incorrecte. Attention : en C, la boucle continue **tant que** la condition est vraie, alors qu'en Pascal, repeat … until s'arrête **quand** la condition devient vraie : la condition est inversée.",
    },
    {
      type: 'tableau',
      entetes: ['Algorithme', 'Pascal', 'C'],
      lignes: [
        ['Répéter', 'repeat', 'do {'],
        ['    Lire(note)', '    readln(note);', '    scanf("%f", &note);'],
        ['Jusqu\'à note >= 0 ET note <= 20', 'until (note >= 0) and (note <= 20);', '} while (note < 0 || note > 20);'],
      ],
    },
    {
      type: 'c',
      titre: 'Une saisie contrôlée',
      code: `#include <stdio.h>

int main() {
    float note;
    do {
        printf("Note sur 20 : ");
        scanf("%f", &note);
        if (note < 0 || note > 20) {
            printf("Note invalide !\\n");
        }
    } while (note < 0 || note > 20);

    printf("Note enregistree : %.2f\\n", note);
    return 0;
}`,
      entree: '25\n-3\n14.5',
      legende: 'Les deux premières saisies (25 et -3) sont refusées, la troisième est acceptée.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`for (i = 1; i <= n; i++)` : nombre de tours **connu**.',
        '`while (condition)` : testée **avant** chaque tour, peut faire 0 tour.',
        '`do { … } while (condition);` : **au moins un tour**, idéal pour contrôler une saisie (attention au `;` final).',
        'Compteur et accumulateur : **initialisés à 0 avant la boucle**.',
        'Pascal : `for … to/downto … do`, `while … do`, `repeat … until` (condition **inversée** par rapport au C).',
      ],
    },
    {
      type: 'quiz',
      question: 'Combien de fois s\'exécute : for (i = 0; i < 5; i++) ?',
      options: ['4 fois', '5 fois', '6 fois'],
      bonneReponse: 1,
      explication: 'i prend les valeurs 0, 1, 2, 3, 4 : cinq tours. À i = 5, la condition i < 5 est fausse.',
    },
    {
      type: 'quiz',
      question: 'Pour redemander un code PIN tant qu\'il est faux, quelle boucle est la plus adaptée ?',
      options: ['for', 'while', 'do … while'],
      bonneReponse: 2,
      explication: 'Il faut demander le code au moins une fois, puis recommencer s\'il est faux : do … while.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : trace d\'une boucle',
      enonce: 'Donne la valeur de s et i à chaque tour, puis ce qu\'affiche le programme.\n\nint i, s = 0;\nfor (i = 1; i <= 4; i++) {\n    s = s + i * 2;\n}\nprintf("%d", s);',
      langage: 'texte',
      solution: `Tour | i | s
  1  | 1 | 0 + 2 = 2
  2  | 2 | 2 + 4 = 6
  3  | 3 | 6 + 6 = 12
  4  | 4 | 12 + 8 = 20
Fin : i = 5 (5 <= 4 faux). Le programme affiche 20.`,
      explication: 'Le tableau de trace (ou tableau de déroulement) est demandé dans presque tous les sujets : une ligne par tour, une colonne par variable.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : convertir for en while',
      enonce: 'Réécris cette boucle avec while, puis en Pascal avec for :\n\nfor (i = 10; i >= 0; i -= 2) printf("%d ", i);',
      langage: 'texte',
      solution: `C avec while :
i = 10;
while (i >= 0) {
    printf("%d ", i);
    i -= 2;
}

Pascal : for ne permet que des pas de 1 ou -1, on utilise while :
i := 10;
while i >= 0 do
begin
    write(i, ' ');
    i := i - 2;
end;

Affichage : 10 8 6 4 2 0`,
      explication: 'Les trois parties du for se retrouvent dans le while : l\'initialisation avant, la condition dans while, le pas à la fin du bloc.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les ventes de la semaine d\'une boutique',
      enonce:
        "Une boutique de Yopougon veut analyser ses ventes. Le gérant saisit le chiffre d'affaires de chacun des 7 jours de la semaine (montant positif ou nul, à contrôler). Le programme affiche le total de la semaine, la moyenne journalière, le meilleur jour (numéro et montant) et le nombre de jours où le chiffre d'affaires a dépassé 100 000 F.",
      questions: [
        'Quelles boucles utiliser pour (a) parcourir les 7 jours et (b) contrôler chaque saisie ? Justifie.',
        'Écris le programme C complet.',
        'Pour les ventes 85 000, 120 000, 0, 95 000, 150 000, 210 000, 60 000, donne les résultats affichés.',
      ],
      langage: 'texte',
      solution: `1. (a) for : on connaît le nombre de tours (7 jours).
   (b) do … while : on demande au moins une fois, et on redemande
       tant que le montant est négatif.

2. #include <stdio.h>
   #define NB_JOURS 7
   #define SEUIL 100000

   int main() {
       int jour, meilleur_jour = 1, bons_jours = 0;
       float vente, total = 0, meilleure_vente = -1;

       for (jour = 1; jour <= NB_JOURS; jour++) {
           do {
               printf("Ventes du jour %d : ", jour);
               scanf("%f", &vente);
           } while (vente < 0);

           total += vente;
           if (vente > meilleure_vente) {
               meilleure_vente = vente;
               meilleur_jour = jour;
           }
           if (vente > SEUIL) {
               bons_jours++;
           }
       }
       printf("Total : %.0f F\\n", total);
       printf("Moyenne : %.0f F\\n", total / NB_JOURS);
       printf("Meilleur jour : %d (%.0f F)\\n", meilleur_jour, meilleure_vente);
       printf("Jours > %d F : %d\\n", SEUIL, bons_jours);
       return 0;
   }

3. Total : 720 000 F
   Moyenne : 102 857 F (720 000 / 7)
   Meilleur jour : 6 (210 000 F)
   Jours > 100 000 F : 3 (120 000, 150 000, 210 000)`,
      explication: "Pour chercher un maximum, on initialise meilleure_vente à une valeur plus petite que toutes les ventes possibles (-1), ou bien à la première vente saisie. Si on l'initialisait à un grand nombre, le maximum ne serait jamais trouvé.",
    },
  ],
  exercice: {
    id: 'c-moyenne-classe',
    titre: 'La moyenne de la classe',
    consigne:
      'Lis le nombre de notes n, puis les n notes avec une boucle for. Affiche « Moyenne : » avec 2 décimales et « Admis : » (nombre de notes ≥ 10). Le test tape « 4 » puis « 12 15 9 14 » : on attend « Moyenne : 12.50 » et « Admis : 3 ».',
    langage: 'c',
    entree: '4\n12 15 9 14',
    codeDepart: `#include <stdio.h>

int main() {
    int n, i, admis;
    float note, somme;
    scanf("%d", &n);
    // Boucle : lis chaque note, ajoute-la à somme, compte les admis

    printf("Moyenne : %.2f\\n", somme / n);
    printf("Admis : %d\\n", admis);
    return 0;
}`,
    sortieAttendue: ['Moyenne : 12.50', 'Admis : 3'],
    indice: 'Initialise somme = 0 et admis = 0 avant la boucle. Dans for (i = 1; i <= n; i++) : scanf("%f", &note); somme += note; if (note >= 10) admis++;',
    solution: `#include <stdio.h>

int main() {
    int n, i, admis = 0;
    float note, somme = 0;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        scanf("%f", &note);
        somme += note;
        if (note >= 10) admis++;
    }
    printf("Moyenne : %.2f\\n", somme / n);
    printf("Admis : %d\\n", admis);
    return 0;
}`,
  },
}

export const leconsConditionsBouclesC: Lecon[] = [lecon1, lecon2, lecon3]

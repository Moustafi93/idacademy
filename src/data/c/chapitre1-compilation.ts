import type { Lecon } from '../types'

/*
 * Langages Pascal et C — Chapitre 1 : Compilation et premier programme
 * Les blocs de type « c » s'exécutent dans le navigateur (interpréteur PicoC).
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'du-code-source-a-l-executable',
  titre: "Du code source au programme exécutable",
  duree: '25 min',
  objectifs: [
    'Comprendre pourquoi un programme C doit être compilé',
    'Connaître les étapes : préprocesseur, compilation, édition des liens',
    'Compiler et lancer un programme avec gcc ou Code::Blocks',
    'Reconnaître les 4 types d\'erreurs : compilation, liens, exécution, logique',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La compilation', sousTitre: 'Le résumé en 2 minutes', narration: 'Du code source au programme exécutable, en deux minutes.' },
      {
        type: 'points',
        titre: 'Le problème',
        points: ['Le processeur ne comprend que des 0 et des 1', 'Nous écrivons en C, un langage lisible', 'Il faut traduire : c\'est la compilation'],
        narration: "Le processeur de l'ordinateur ne comprend que le langage machine, fait de zéros et de uns. Nous, nous écrivons en C, un langage lisible par un humain. Il faut donc traduire : c'est le rôle du compilateur.",
      },
      {
        type: 'points',
        titre: 'Les 4 étapes',
        points: ['1. Édition : on écrit bonjour.c', '2. Préprocesseur : traite les #include', '3. Compilation : traduit en code machine', '4. Édition des liens : crée bonjour.exe'],
        narration: "Quatre étapes : on écrit le fichier source point c. Le préprocesseur traite les lignes qui commencent par dièse. Le compilateur traduit en code machine. Et l'éditeur de liens assemble le tout pour créer le programme exécutable.",
      },
      {
        type: 'comparaison',
        titre: 'Compilé ou interprété ?',
        colonnes: [
          { nom: 'Compilé', texte: 'C, Pascal : traduit une fois, puis s\'exécute très vite' },
          { nom: 'Interprété', texte: 'Python, JavaScript : traduit ligne par ligne à chaque exécution' },
        ],
        narration: "Le C et le Pascal sont des langages compilés : on traduit une fois, et le programme s'exécute très vite. Python et JavaScript sont interprétés : ils sont traduits ligne par ligne à chaque exécution.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Pourquoi compiler ?' },
    {
      type: 'texte',
      contenu:
        "Le **processeur** d'un ordinateur ne comprend qu'une seule langue : le **langage machine**, une suite d'instructions codées en binaire (des 0 et des 1). Écrire directement en binaire serait interminable et source d'erreurs. On écrit donc le programme dans un **langage de programmation** lisible par un humain, comme le **C** ou le **Pascal**, puis un logiciel le **traduit** en langage machine. Ce logiciel s'appelle le **compilateur**.",
    },
    {
      type: 'tableau',
      entetes: ['Terme', 'Signification', 'Exemple'],
      lignes: [
        ['Code source', 'Le programme écrit par le développeur, en C', 'bonjour.c'],
        ['Compilateur', 'Logiciel qui traduit le code source en langage machine', 'gcc, le compilateur de Code::Blocks'],
        ['Programme exécutable', 'Le résultat : un fichier que l\'ordinateur peut lancer', 'bonjour.exe (Windows), bonjour (Linux)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Une comparaison',
      contenu:
        "Un étudiant ivoirien écrit une lettre en français à un partenaire chinois. Un traducteur la traduit **une fois** en chinois, puis le partenaire peut la relire autant qu'il veut. Le compilateur joue le rôle du traducteur : le programme est traduit une seule fois, puis exécuté autant de fois qu'on veut, très rapidement.",
    },

    { type: 'titre', contenu: '2. Les étapes de la compilation' },
    {
      type: 'tableau',
      entetes: ['Étape', 'Rôle', 'Entrée → Sortie'],
      lignes: [
        ['1. Édition', 'On écrit le programme dans un éditeur', '→ bonjour.c (texte)'],
        ['2. Préprocesseur', 'Traite les lignes qui commencent par #, par exemple #include <stdio.h> (copie les déclarations de printf, scanf…)', 'bonjour.c → code source complet'],
        ['3. Compilation', 'Vérifie la syntaxe, puis traduit en langage machine', '→ bonjour.o (fichier objet)'],
        ['4. Édition des liens', 'Assemble le fichier objet avec les bibliothèques (le code de printf…)', 'bonjour.o + bibliothèques → bonjour.exe'],
        ['5. Exécution', 'Le système lance le programme', 'bonjour.exe → résultat à l\'écran'],
      ],
    },
    {
      type: 'code',
      langage: 'console',
      titre: 'Compiler et lancer avec gcc (dans un terminal)',
      code: `gcc bonjour.c -o bonjour      # compile et crée le programme « bonjour »
./bonjour                      # lance le programme (Linux)
bonjour.exe                    # lance le programme (Windows)`,
      legende: 'Avec **Code::Blocks** ou **Dev-C++**, très utilisés dans les écoles, un seul bouton fait tout : **Build and run** (touche F9).',
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Sur IDAcademy',
      contenu:
        "Ici, tu n'as rien à installer : ton programme C est exécuté directement dans le navigateur, même sur téléphone. En TP et à l'examen pratique, tu utiliseras gcc ou Code::Blocks : le code C est exactement le même.",
    },

    { type: 'titre', contenu: '3. Les quatre types d\'erreurs' },
    {
      type: 'texte',
      contenu:
        "Un programme peut échouer à quatre moments différents. Savoir **quand** une erreur se produit aide à la trouver plus vite, et c'est une question classique au BTS.",
    },
    {
      type: 'tableau',
      entetes: ['Type d\'erreur', 'Quand ?', 'Exemple', 'Qui la détecte ?'],
      lignes: [
        ['Erreur de compilation (syntaxe)', 'Pendant la compilation', 'Point-virgule oublié, variable non déclarée', 'Le compilateur, avec le numéro de ligne'],
        ['Erreur d\'édition des liens', 'Pendant l\'édition des liens', 'Fonction mal écrite : prinft au lieu de printf', 'L\'éditeur de liens (undefined reference)'],
        ['Erreur d\'exécution', 'Pendant que le programme tourne', 'Division par zéro', 'Le système : le programme s\'arrête brutalement'],
        ['Erreur de logique', 'Jamais signalée !', 'Calcul faux : moyenne = a + b / 2', 'Personne : il faut tester le programme'],
      ],
    },
    {
      type: 'c',
      titre: 'Corrige l\'erreur de compilation',
      code: `#include <stdio.h>

int main() {
    printf("Bienvenue en BTS IDA\\n")
    printf("Le C est un langage compile\\n");
    return 0;
}`,
      legende: 'Clique sur **Exécuter** : le message indique la ligne et la cause. Ajoute le point-virgule manquant, puis exécute à nouveau.',
    },
    {
      type: 'c',
      titre: 'Une erreur de logique (aucun message !)',
      code: `#include <stdio.h>

int main() {
    float note1 = 12, note2 = 16;
    float moyenne = note1 + note2 / 2;
    printf("Moyenne : %.2f\\n", moyenne);
    return 0;
}`,
      legende: "Le programme affiche 20.00 au lieu de 14.00, sans aucune erreur : la division est faite avant l'addition. Corrige avec des parenthèses : (note1 + note2) / 2.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Le processeur ne comprend que le **langage machine** : le **compilateur** traduit le code source C.',
        'Étapes : **édition** (.c) → **préprocesseur** (#include) → **compilation** (.o) → **édition des liens** (.exe).',
        'C et Pascal sont **compilés** ; Python et JavaScript sont **interprétés**.',
        '4 types d\'erreurs : **compilation**, **édition des liens**, **exécution**, **logique** (la plus dangereuse, car non signalée).',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle étape remplace #include <stdio.h> par les déclarations de printf et scanf ?',
      options: ['Le préprocesseur', 'L\'éditeur de liens', 'Le processeur'],
      bonneReponse: 0,
      explication: 'Le préprocesseur traite toutes les lignes qui commencent par #, avant la compilation proprement dite.',
    },
    {
      type: 'quiz',
      question: 'Un programme de moyenne affiche 20 au lieu de 14, sans message d\'erreur. De quel type d\'erreur s\'agit-il ?',
      options: ['Erreur de compilation', 'Erreur d\'exécution', 'Erreur de logique'],
      bonneReponse: 2,
      explication: 'Le programme se compile et s\'exécute sans problème, mais le résultat est faux : c\'est une erreur de logique, détectée seulement en testant.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : quel type d\'erreur ?',
      enonce: 'Pour chaque situation, donne le type d\'erreur (compilation, édition des liens, exécution ou logique).',
      questions: [
        'Le compilateur affiche : « error: expected \';\' before \'return\' ».',
        'Le programme calcule un prix TTC de 10 180 F au lieu de 11 800 F pour 10 000 F HT.',
        'Le message « undefined reference to `scnaf\' » apparaît.',
        'Le programme s\'arrête brutalement quand l\'utilisateur saisit 0 comme nombre de jours.',
        'Le compilateur indique : « \'total\' undeclared ».',
      ],
      langage: 'texte',
      solution: `1. Erreur de compilation (syntaxe) : il manque un point-virgule.
2. Erreur de logique : le calcul est faux (sans doute ht + 0.18 au lieu de ht * 1.18).
3. Erreur d'édition des liens : la fonction « scnaf » n'existe dans aucune bibliothèque.
4. Erreur d'exécution : division par zéro.
5. Erreur de compilation : la variable total n'est pas déclarée.`,
      explication: '« undefined reference » est toujours une erreur d\'édition des liens : le compilateur a accepté l\'appel, mais l\'éditeur de liens ne trouve pas le code de la fonction.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : remets les étapes dans l\'ordre',
      enonce: 'Remets dans l\'ordre : A. bonjour.o est créé — B. on écrit bonjour.c — C. bonjour.exe est créé — D. #include <stdio.h> est traité — E. le programme affiche « Bonjour ».',
      langage: 'texte',
      solution: 'B → D → A → C → E',
      explication: 'Édition (B), préprocesseur (D), compilation (A), édition des liens (C), exécution (E).',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Questions de cours sur la compilation',
      enonce: "Une entreprise d'Abidjan recrute un stagiaire développeur. Lors de l'entretien, on lui pose les questions suivantes.",
      questions: [
        'Définis les termes : code source, compilateur, programme exécutable.',
        'Cite et explique les étapes qui permettent de passer de facture.c à facture.exe.',
        'Quelle est la différence entre un langage compilé et un langage interprété ? Donne deux exemples de chaque.',
        'Un collègue écrit prinft("Total"); au lieu de printf. À quelle étape l\'erreur sera-t-elle détectée ? Justifie.',
        'Pourquoi une erreur de logique est-elle plus dangereuse qu\'une erreur de compilation ?',
      ],
      langage: 'texte',
      solution: `1. Code source : le texte du programme écrit par le développeur dans un langage
   de programmation (ici facture.c).
   Compilateur : logiciel qui traduit le code source en langage machine.
   Programme exécutable : fichier en langage machine que le système peut lancer
   (facture.exe).

2. - Préprocesseur : traite les directives # (inclusion de stdio.h…).
   - Compilation : vérification de la syntaxe et traduction en code objet (facture.o).
   - Édition des liens : assemblage du code objet avec les bibliothèques
     (code de printf, scanf…) pour produire facture.exe.

3. Compilé : traduit une seule fois en langage machine avant l'exécution
   (exécution rapide) — C, Pascal.
   Interprété : traduit et exécuté instruction par instruction à chaque lancement
   — Python, JavaScript.

4. À l'édition des liens. Le compilateur accepte l'appel (en C ancien, une fonction
   inconnue est supposée exister ailleurs ; les compilateurs récents affichent au
   moins un avertissement), mais l'éditeur de liens ne trouve pas le code de
   « prinft » dans les bibliothèques : « undefined reference to prinft ».

5. Elle n'est signalée par aucun outil : le programme fonctionne mais donne un
   résultat faux. Elle peut passer inaperçue et produire, par exemple, des factures
   fausses chez le client. Il faut tester le programme avec des valeurs connues.`,
      explication: 'Pour la question 4, la réponse attendue est « édition des liens » : c\'est un piège classique, car beaucoup d\'étudiants répondent « compilation ».',
    },
  ],
  exercice: {
    id: 'c-corriger-erreurs',
    titre: 'Corrige les 3 erreurs',
    consigne:
      'Ce programme contient 3 erreurs de compilation. Corrige-les pour qu\'il affiche les deux lignes attendues.',
    langage: 'c',
    codeDepart: `int main() {
    printf("Je compile mon premier programme\\n")
    printf("BTS IDA\\n");
    return 0;
`,
    sortieAttendue: ['Je compile mon premier programme', 'BTS IDA'],
    indice: 'Il manque : la ligne #include <stdio.h> au début, un point-virgule, et l\'accolade fermante } à la fin.',
    solution: `#include <stdio.h>

int main() {
    printf("Je compile mon premier programme\\n");
    printf("BTS IDA\\n");
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'structure-et-printf',
  titre: 'Structure d\'un programme C et affichage avec printf',
  duree: '25 min',
  objectifs: [
    'Connaître la structure minimale d\'un programme C',
    'Afficher du texte avec printf',
    'Utiliser les caractères spéciaux \\n, \\t, \\" et %%',
    'Écrire des commentaires et un code bien indenté',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Le premier programme C', sousTitre: 'Le résumé en 2 minutes', narration: 'La structure d\'un programme C et la fonction printf, en deux minutes.' },
      {
        type: 'code',
        titre: 'La structure',
        lignes: ['#include <stdio.h>', '', 'int main() {', '    printf("Bonjour !\\n");', '    return 0;', '}'],
        etapes: [
          { ligne: 0, variables: { partie: 'bibliothèque' }, note: 'Pour utiliser printf et scanf' },
          { ligne: 2, variables: { partie: 'main' }, note: 'Le programme commence ici' },
          { ligne: 3, variables: { partie: 'instruction' }, sortie: 'Bonjour !', note: 'Chaque instruction finit par ;' },
          { ligne: 4, variables: { partie: 'fin' }, note: '0 = tout s\'est bien passé' },
        ],
        narration: "Un programme C commence par l'inclusion de la bibliothèque stdio point h. Puis vient la fonction main, où le programme commence. Chaque instruction se termine par un point-virgule, et return zéro indique que tout s'est bien passé.",
      },
      {
        type: 'points',
        titre: 'Les caractères spéciaux',
        points: ['\\n : retour à la ligne', '\\t : tabulation', '\\" : guillemet', '%% : signe pourcentage'],
        narration: "Dans printf, antislash n passe à la ligne, antislash t ajoute une tabulation, antislash guillemet affiche un guillemet, et deux pourcentages affichent un pourcentage.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La structure minimale' },
    {
      type: 'code',
      langage: 'c',
      titre: 'Le squelette de tout programme C',
      code: `#include <stdio.h>      // 1. on inclut la bibliothèque d'entrées-sorties

int main() {            // 2. la fonction principale : le programme commence ici
    // 3. les instructions, chacune terminée par ;
    printf("Bonjour !\\n");
    return 0;           // 4. on indique au système que tout s'est bien passé
}                       // 5. fin de main`,
    },
    {
      type: 'tableau',
      entetes: ['Élément', 'Rôle', 'Attention'],
      lignes: [
        ['#include <stdio.h>', 'Donne accès à printf (afficher) et scanf (lire)', 'Pas de point-virgule à la fin'],
        ['int main()', 'Fonction principale, obligatoire, unique', 'Le programme commence toujours par main'],
        ['{ … }', 'Délimitent le bloc d\'instructions (comme Début … Fin)', 'Chaque { doit avoir son }'],
        ['instruction ;', 'Chaque instruction se termine par un point-virgule', 'Oubli = erreur de compilation'],
        ['return 0;', 'Termine main et renvoie 0 (succès) au système', 'Dernière instruction de main'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le C distingue les majuscules',
      contenu: "Le C est **sensible à la casse** : printf, Printf et PRINTF sont trois mots différents, et seul printf existe. De même, les variables note et Note sont deux variables différentes.",
    },

    { type: 'titre', contenu: '2. Afficher avec printf' },
    {
      type: 'texte',
      contenu:
        "**printf** (print formatted) affiche le texte placé entre guillemets. Attention : printf ne passe **pas** à la ligne tout seul. Pour aller à la ligne, on écrit **\\n** (antislash n) dans le texte.",
    },
    {
      type: 'c',
      titre: 'Avec et sans \\n',
      code: `#include <stdio.h>

int main() {
    printf("Maquis ");
    printf("Chez Tantie\\n");
    printf("Ouvert de 11 h\\na 23 h\\n");
    return 0;
}`,
      legende: 'Les deux premiers printf s\'affichent sur la même ligne. Un seul printf peut afficher plusieurs lignes grâce à plusieurs \\n.',
    },
    {
      type: 'tableau',
      titre: 'Les caractères spéciaux',
      entetes: ['Écriture', 'Affiche', 'Exemple'],
      lignes: [
        ['\\n', 'un retour à la ligne', 'printf("Ligne 1\\nLigne 2");'],
        ['\\t', 'une tabulation (alignement en colonnes)', 'printf("Riz\\t18500 F");'],
        ['\\"', 'un guillemet', 'printf("Il dit \\"Bonjour\\"");'],
        ['\\\\', 'un antislash', 'printf("C:\\\\Cours");'],
        ['%%', 'un signe %', 'printf("Remise : 10 %%");'],
      ],
    },
    {
      type: 'c',
      titre: 'Un ticket de caisse aligné',
      code: `#include <stdio.h>

int main() {
    printf("=== SUPERETTE LA GRACE ===\\n");
    printf("Article\\t\\tPrix\\n");
    printf("Riz 5 kg\\t4500 F\\n");
    printf("Huile 1 L\\t1500 F\\n");
    printf("Remise fidelite : 5 %%\\n");
    printf("Merci, a bientot !\\n");
    return 0;
}`,
      legende: 'Les \\t alignent les prix en colonne. Modifie le nom de la supérette et ajoute un article.',
    },

    { type: 'titre', contenu: '3. Commentaires et présentation' },
    {
      type: 'tableau',
      entetes: ['Écriture', 'Usage'],
      lignes: [
        ['// commentaire', 'Commentaire sur une seule ligne'],
        ['/* commentaire */', 'Commentaire sur plusieurs lignes'],
      ],
    },
    {
      type: 'texte',
      contenu:
        "Les commentaires sont **ignorés** par le compilateur : ils servent au lecteur. Au BTS, un programme commenté et **bien indenté** (décalé de 4 espaces à l'intérieur des accolades) rapporte des points de présentation.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Structure : `#include <stdio.h>`, `int main() { … return 0; }`.',
        'Chaque instruction se termine par **;** — le C distingue les **majuscules**.',
        '`printf("…")` affiche ; il faut **\\n** pour passer à la ligne.',
        '`\\t` tabulation, `\\"` guillemet, `%%` pourcentage ; commentaires `//` et `/* */`.',
      ],
    },
    {
      type: 'quiz',
      question: 'Combien de lignes affiche : printf("A"); printf("B\\nC");',
      options: ['1 ligne : ABC', '2 lignes : AB puis C', '3 lignes : A, B, C'],
      bonneReponse: 1,
      explication: 'Le premier printf n\'a pas de \\n : B s\'affiche juste après A. Le \\n se trouve entre B et C.',
    },
    {
      type: 'quiz',
      question: 'Comment afficher « Réduction : 20 % » avec printf ?',
      options: ['printf("Réduction : 20 %");', 'printf("Réduction : 20 %%");', 'printf("Réduction : 20 \\%");'],
      bonneReponse: 1,
      explication: 'Dans printf, % sert aux formats (%d, %f…). Pour afficher le signe lui-même, on le double : %%.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : prédire l\'affichage',
      enonce: 'Écris exactement ce qu\'affiche ce programme.\n\nprintf("IDA");\nprintf("cademy\\n");\nprintf("Cours\\tExercices\\n");\nprintf("100 %% en ligne\\n");',
      langage: 'texte',
      solution: `IDAcademy
Cours    Exercices
100 % en ligne`,
      explication: 'Pas de \\n après "IDA" : la suite s\'écrit sur la même ligne. \\t place une tabulation ; %% affiche %.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le menu d\'accueil d\'un logiciel de pharmacie',
      enonce: "La pharmacie du Plateau souhaite qu'au démarrage, son logiciel affiche l'écran suivant :\n\n******************************\n*   PHARMACIE DU PLATEAU     *\n******************************\n1. Vente\n2. Stock\n3. Quitter\nVotre choix : ",
      questions: [
        'Écris le programme C complet qui affiche cet écran.',
        'Pourquoi la dernière ligne ne doit-elle pas se terminer par \\n ?',
        'Ajoute un commentaire en tête du programme indiquant son rôle et la date.',
      ],
      langage: 'c',
      solution: `/* Écran d'accueil du logiciel de la Pharmacie du Plateau
   Date : 19/10/2026 */
#include <stdio.h>

int main() {
    printf("******************************\\n");
    printf("*   PHARMACIE DU PLATEAU     *\\n");
    printf("******************************\\n");
    printf("1. Vente\\n");
    printf("2. Stock\\n");
    printf("3. Quitter\\n");
    printf("Votre choix : ");   /* pas de \\n : le curseur reste sur la ligne */
    return 0;
}`,
      explication: "Question 2 : sans \\n, le curseur reste juste après « Votre choix : » ; l'utilisateur tapera son choix sur la même ligne, ce qui est plus clair.",
    },
  ],
  exercice: {
    id: 'c-carte-etudiant',
    titre: 'La carte d\'étudiant',
    consigne: 'Écris un programme qui affiche exactement ces 3 lignes : « Nom : KONE Awa », « Classe : BTS IDA 1 », « Ville : Abidjan ».',
    langage: 'c',
    codeDepart: `#include <stdio.h>

int main() {
    // Affiche les 3 lignes ici

    return 0;
}`,
    sortieAttendue: ['Nom : KONE Awa', 'Classe : BTS IDA 1', 'Ville : Abidjan'],
    indice: 'Un printf par ligne, chacun terminé par \\n : printf("Nom : KONE Awa\\n");',
    solution: `#include <stdio.h>

int main() {
    printf("Nom : KONE Awa\\n");
    printf("Classe : BTS IDA 1\\n");
    printf("Ville : Abidjan\\n");
    return 0;
}`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'algorithme-pascal-et-c',
  titre: 'De l\'algorithme au Pascal et au C',
  duree: '30 min',
  objectifs: [
    'Traduire un algorithme en Pascal et en C',
    'Connaître les équivalences : types, affectation, Lire, Écrire',
    'Lire une valeur au clavier avec scanf',
    'Éviter les pièges : = et :=, = et ==',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Algorithme → Pascal → C', sousTitre: 'Le résumé en 2 minutes', narration: 'Traduire un algorithme en Pascal et en C, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'L\'affectation',
        colonnes: [
          { nom: 'Algorithme', texte: 'prix ← 1500' },
          { nom: 'Pascal', texte: 'prix := 1500;' },
          { nom: 'C', texte: 'prix = 1500;' },
        ],
        narration: "L'affectation s'écrit avec une flèche en algorithme, deux-points égal en Pascal, et un simple égal en C.",
      },
      {
        type: 'comparaison',
        titre: 'Lire et Écrire',
        colonnes: [
          { nom: 'Algorithme', texte: 'Lire(n) / Écrire(n)' },
          { nom: 'Pascal', texte: 'readln(n); / writeln(n);' },
          { nom: 'C', texte: 'scanf("%d", &n); / printf("%d", n);' },
        ],
        narration: "Lire devient readln en Pascal et scanf en C. Écrire devient writeln en Pascal et printf en C.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Un même programme, trois écritures' },
    {
      type: 'texte',
      contenu:
        "Au BTS, on conçoit d'abord la solution en **algorithme**, puis on la **traduit** dans un langage. Le Pascal et le C se ressemblent beaucoup : une fois les équivalences connues, la traduction est presque mécanique. Exemple : calculer la surface d'un terrain.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Algorithme',
      code: `Algorithme Surface
Variables
    longueur, largeur, surface : réel
Début
    Écrire("Longueur ? ")
    Lire(longueur)
    Écrire("Largeur ? ")
    Lire(largeur)
    surface ← longueur * largeur
    Écrire("Surface : ", surface, " m2")
Fin`,
    },
    {
      type: 'code',
      langage: 'pascal',
      titre: 'Pascal',
      code: `program Surface;
var
    longueur, largeur, surface : real;
begin
    write('Longueur ? ');
    readln(longueur);
    write('Largeur ? ');
    readln(largeur);
    surface := longueur * largeur;
    writeln('Surface : ', surface:0:2, ' m2');
end.`,
    },
    {
      type: 'c',
      titre: 'C (exécutable ici)',
      code: `#include <stdio.h>

int main() {
    float longueur, largeur, surface;
    printf("Longueur ? ");
    scanf("%f", &longueur);
    printf("Largeur ? ");
    scanf("%f", &largeur);
    surface = longueur * largeur;
    printf("\\nSurface : %.2f m2\\n", surface);
    return 0;
}`,
      entree: '20\n15',
      legende: "Les valeurs de « Entrée clavier » remplacent ce que l'utilisateur taperait. Change-les (ex. 25 et 12) et exécute à nouveau.",
    },

    { type: 'titre', contenu: '2. Le tableau des équivalences' },
    {
      type: 'tableau',
      entetes: ['Notion', 'Algorithme', 'Pascal', 'C'],
      lignes: [
        ['En-tête', 'Algorithme Nom', 'program Nom;', '#include <stdio.h> + int main()'],
        ['Déclaration', 'Variables  n : entier', 'var n : integer;', 'int n;'],
        ['Réel', 'réel', 'real', 'float (ou double)'],
        ['Caractère', 'caractère', 'char', 'char'],
        ['Chaîne', 'chaîne', 'string', 'char nom[30];'],
        ['Booléen', 'booléen', 'boolean', 'int (0 = faux, 1 = vrai)'],
        ['Début / Fin', 'Début … Fin', 'begin … end.', '{ … }'],
        ['Affectation', 'n ← 5', 'n := 5;', 'n = 5;'],
        ['Écrire', 'Écrire("Total : ", t)', "writeln('Total : ', t);", 'printf("Total : %d\\n", t);'],
        ['Lire', 'Lire(n)', 'readln(n);', 'scanf("%d", &n);'],
        ['Égal (comparaison)', 'si n = 0', 'if n = 0 then', 'if (n == 0)'],
        ['Différent', '≠', '<>', '!='],
        ['Commentaire', '// …', '{ … }', '// … ou /* … */'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le piège du signe =',
      elements: [
        'En **Pascal**, `:=` affecte et `=` compare.',
        'En **C**, `=` affecte et `==` compare.',
        'Écrire `if (note = 10)` en C est une erreur classique : cela **met 10 dans note** au lieu de comparer !',
      ],
    },

    { type: 'titre', contenu: '3. Lire une valeur avec scanf' },
    {
      type: 'texte',
      contenu:
        "**scanf** lit ce que l'utilisateur tape au clavier et le range dans une variable. Le format indique le type attendu (**%d** pour un entier, **%f** pour un réel), et le **&** devant la variable est obligatoire : il donne à scanf l'**adresse** de la variable, c'est-à-dire l'endroit où ranger la valeur. Le chapitre suivant détaille scanf.",
    },
    {
      type: 'c',
      titre: 'Le prix TTC',
      code: `#include <stdio.h>

int main() {
    float ht, ttc;
    printf("Prix hors taxe : ");
    scanf("%f", &ht);
    ttc = ht * 1.18;
    printf("\\nPrix TTC : %.0f F\\n", ttc);
    return 0;
}`,
      entree: '10000',
      legende: 'Essaie avec 25000 dans « Entrée clavier ». Puis enlève le & devant ht pour voir le message d\'erreur.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '← devient `:=` en Pascal et `=` en C ; Début/Fin devient `begin … end.` et `{ … }`.',
        'Écrire → `writeln` / `printf` ; Lire → `readln` / `scanf("%d", &n)`.',
        'Comparaison : `=` en Pascal, `==` en C. Différent : `<>` en Pascal, `!=` en C.',
        'Dans scanf, le **&** devant la variable est obligatoire.',
      ],
    },
    {
      type: 'quiz',
      question: 'Comment écrit-on « total ← prix * 2 » en C ?',
      options: ['total := prix * 2;', 'total = prix * 2;', 'total == prix * 2;'],
      bonneReponse: 1,
      explication: ':= est l\'affectation en Pascal, == est la comparaison en C. En C, l\'affectation est =.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : traduire en Pascal et en C',
      enonce: 'Traduis cet algorithme en Pascal, puis en C.\n\nAlgorithme Double\nVariables\n    n, d : entier\nDébut\n    Écrire("Nombre ? ")\n    Lire(n)\n    d ← n * 2\n    Écrire("Le double est ", d)\nFin',
      langage: 'texte',
      solution: `PASCAL
program Double;
var
    n, d : integer;
begin
    write('Nombre ? ');
    readln(n);
    d := n * 2;
    writeln('Le double est ', d);
end.

C
#include <stdio.h>

int main() {
    int n, d;
    printf("Nombre ? ");
    scanf("%d", &n);
    d = n * 2;
    printf("Le double est %d\\n", d);
    return 0;
}`,
      explication: 'En C, la valeur d\'une variable s\'affiche avec un format : %d remplace la valeur de d dans le texte.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La conversion des francs CFA en euros',
      enonce: "Un bureau de change de Treichville veut un petit programme. L'agent saisit une somme en francs CFA, et le programme affiche son équivalent en euros. On rappelle que 1 euro = 655,957 F CFA (taux fixe).",
      questions: [
        'Écris l\'algorithme correspondant (avec une constante pour le taux).',
        'Traduis-le en Pascal.',
        'Traduis-le en C. Le résultat sera affiché avec 2 chiffres après la virgule.',
        'Quel est le résultat pour 100 000 F CFA ?',
      ],
      langage: 'texte',
      solution: `1. Algorithme Conversion
   Constante
       TAUX = 655.957
   Variables
       cfa, euros : réel
   Début
       Écrire("Somme en F CFA : ")
       Lire(cfa)
       euros ← cfa / TAUX
       Écrire("Soit ", euros, " euros")
   Fin

2. program Conversion;
   const
       TAUX = 655.957;
   var
       cfa, euros : real;
   begin
       write('Somme en F CFA : ');
       readln(cfa);
       euros := cfa / TAUX;
       writeln('Soit ', euros:0:2, ' euros');
   end.

3. #include <stdio.h>
   #define TAUX 655.957

   int main() {
       float cfa, euros;
       printf("Somme en F CFA : ");
       scanf("%f", &cfa);
       euros = cfa / TAUX;
       printf("Soit %.2f euros\\n", euros);
       return 0;
   }

4. 100000 / 655.957 ≈ 152.45 euros.`,
      explication: "En Pascal, euros:0:2 affiche 2 décimales ; en C, c'est le format %.2f. La constante s'écrit const en Pascal et #define (ou const) en C.",
    },
  ],
  exercice: {
    id: 'c-prix-ttc',
    titre: 'Traduire : le prix TTC',
    consigne:
      'Traduis en C : Lire(ht) ; ttc ← ht × 1,18 ; Écrire("Prix TTC : ", ttc, " F"). Le test tape 10000 au clavier : ton programme doit afficher « Prix TTC : 11800 F » (sans décimales, format %.0f).',
    langage: 'c',
    entree: '10000',
    codeDepart: `#include <stdio.h>

int main() {
    float ht, ttc;
    // Lis ht, calcule ttc, puis affiche le résultat

    return 0;
}`,
    sortieAttendue: ['Prix TTC : 11800 F'],
    indice: 'scanf("%f", &ht); puis ttc = ht * 1.18; puis printf("Prix TTC : %.0f F\\n", ttc);',
    solution: `#include <stdio.h>

int main() {
    float ht, ttc;
    scanf("%f", &ht);
    ttc = ht * 1.18;
    printf("Prix TTC : %.0f F\\n", ttc);
    return 0;
}`,
  },
}

export const leconsCompilation: Lecon[] = [lecon1, lecon2, lecon3]

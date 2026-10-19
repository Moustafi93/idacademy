import type { SceneResume } from '../types'

/*
 * Exemples concrets et défis ajoutés à la fin des résumés vidéo — Langage C.
 */
export const exemplesC: Record<string, SceneResume[]> = {
  // ——— Chapitre 1 : Compilation et premier programme ———
  'du-code-source-a-l-executable': [
    {
      type: 'exemple',
      titre: 'Compiler la caisse d\'une boutique',
      situation: 'Un développeur a écrit caisse.c pour une boutique d\'Adjamé. Il veut obtenir le programme à installer.',
      langage: 'Terminal',
      code: ['gcc caisse.c -o caisse', './caisse'],
      resultat: ['caisse.c  → préprocesseur', '          → caisse.o', '          → caisse.exe', 'Le programme se lance'],
      narration: "Exemple concret : une seule commande gcc fait le préprocesseur, la compilation et l'édition des liens. On obtient le programme caisse, qu'on lance aussitôt.",
    },
    {
      type: 'exemple',
      titre: 'Lire un message d\'erreur',
      situation: 'Le compilateur affiche une erreur. Que faire ?',
      langage: 'Terminal',
      code: ['caisse.c:7: error:', "  expected ';' before 'return'"],
      resultat: ['Ligne 7 → regarder', 'la ligne 6 : il manque', 'un point-virgule'],
      narration: "Deuxième exemple : le compilateur donne le numéro de ligne. Quand il réclame un point-virgule avant return, l'oubli se trouve presque toujours à la fin de la ligne précédente.",
    },
    {
      type: 'defi',
      question: 'Le message « undefined reference to `prinft\' » apparaît. À quelle étape ?',
      reponse: 'À l\'édition des liens',
      explication: 'Le code de la fonction « prinft » n\'existe dans aucune bibliothèque : c\'est l\'éditeur de liens qui le signale.',
      narration: "À toi de jouer. Undefined reference to prinft : à quelle étape cette erreur est-elle détectée ?",
    },
  ],
  'structure-et-printf': [
    {
      type: 'exemple',
      titre: 'Le reçu d\'un dépôt Wave',
      situation: 'Afficher un petit reçu sur 3 lignes.',
      langage: 'C',
      code: ['printf("DEPOT WAVE\\n");', 'printf("Montant :\\t10000 F\\n");', 'printf("Frais :\\t\\t0 %%\\n");'],
      resultat: ['DEPOT WAVE', 'Montant :    10000 F', 'Frais :      0 %'],
      narration: "Exemple concret : un reçu. Chaque antislash n passe à la ligne, les tabulations alignent les montants, et les deux pourcentages affichent un seul signe pourcentage.",
    },
    {
      type: 'exemple',
      titre: 'L\'oubli du \\n',
      situation: 'Deux printf sans retour à la ligne.',
      langage: 'C',
      code: ['printf("Bonjour");', 'printf("Awa");'],
      resultat: ['BonjourAwa'],
      narration: "Deuxième exemple : sans antislash n, les deux textes sont collés sur la même ligne. printf ne passe jamais à la ligne tout seul.",
    },
    {
      type: 'defi',
      question: 'Qu\'affiche ce code ?',
      code: ['printf("A\\tB\\n");', 'printf("100 %%");'],
      reponse: 'A [tabulation] B, puis « 100 % » sur la ligne suivante',
      narration: "À toi de jouer. Qu'affiche ce programme ?",
    },
  ],
  'algorithme-pascal-et-c': [
    {
      type: 'exemple',
      titre: 'Le salaire net en 3 langages',
      situation: 'Calculer le salaire net : brut moins 6,3 % de cotisation.',
      langage: 'Algo / Pascal / C',
      code: ['net ← brut * 0.937', 'net := brut * 0.937;', 'net = brut * 0.937;'],
      resultat: ['Brut 200000 F', '→ net 187400 F'],
      narration: "Exemple concret : la même affectation, écrite avec une flèche en algorithme, deux-points égal en Pascal, et égal en C.",
    },
    {
      type: 'exemple',
      titre: 'Lire une quantité',
      situation: 'L\'utilisateur saisit le nombre d\'articles.',
      langage: 'Algo / Pascal / C',
      code: ['Lire(qte)', 'readln(qte);', 'scanf("%d", &qte);'],
      resultat: ['En C : format %d', 'et & devant la variable'],
      narration: "Deuxième exemple : Lire devient readln en Pascal, et scanf en C, avec le format et l'esperluette.",
    },
    {
      type: 'defi',
      question: 'Comment écrit-on « Si moyenne ≠ 10 » en Pascal et en C ?',
      reponse: 'Pascal : if moyenne <> 10 then — C : if (moyenne != 10)',
      narration: "À toi de jouer. Comment écrire « si moyenne différent de dix » en Pascal, puis en C ?",
    },
  ],

  // ——— Chapitre 2 : Syntaxe de base ———
  'variables-et-types-en-c': [
    {
      type: 'exemple',
      titre: 'La fiche d\'un produit',
      situation: 'Un supermarché enregistre un produit : stock, prix, rayon.',
      langage: 'C',
      code: ['int stock = 48;', 'float prix = 2750.5;', "char rayon = 'B';", 'printf("%d - %.0f F - %c", ...);'],
      resultat: ['48 - 2750 F - B'],
      narration: "Exemple concret : un entier pour le stock, un réel pour le prix, un caractère pour le rayon. Le format point zéro f affiche le prix sans décimales.",
    },
    {
      type: 'exemple',
      titre: 'Une constante pour la TVA',
      situation: 'Le taux de TVA ne change pas pendant le programme.',
      langage: 'C',
      code: ['#define TVA 0.18', 'ttc = ht * (1 + TVA);'],
      resultat: ['ht = 5000', '→ ttc = 5900'],
      narration: "Deuxième exemple : la TVA est une constante. Si le taux change un jour, on ne modifie qu'une seule ligne.",
    },
    {
      type: 'defi',
      question: 'Trouve l\'erreur : float moyenne = 12,5;',
      reponse: 'En C, la virgule décimale est un point : 12.5',
      narration: "À toi de jouer. Où est l'erreur dans cette déclaration ?",
    },
  ],
  'operateurs-et-expressions': [
    {
      type: 'exemple',
      titre: 'Répartir des étudiants en groupes',
      situation: '47 étudiants, des groupes de 6 pour les TP.',
      langage: 'C',
      code: ['int groupes = 47 / 6;', 'int restants = 47 % 6;'],
      resultat: ['groupes = 7', 'restants = 5'],
      narration: "Exemple concret : 47 divisé par 6 en entiers donne 7 groupes complets, et le modulo donne les 5 étudiants restants.",
    },
    {
      type: 'exemple',
      titre: 'Le piège de la moyenne',
      situation: 'Deux notes entières : 13 et 14.',
      langage: 'C',
      code: ['int a = 13, b = 14;', 'float m1 = (a + b) / 2;', 'float m2 = (a + b) / 2.0;'],
      resultat: ['m1 = 13.00 (faux)', 'm2 = 13.50'],
      narration: "Deuxième exemple : diviser par 2 donne une division entière, 13. Diviser par 2 point 0 donne le bon résultat, 13 virgule 5.",
    },
    {
      type: 'defi',
      question: 'Comment savoir si un nombre n est pair en C ?',
      reponse: 'n % 2 == 0',
      explication: 'Un nombre est pair si le reste de sa division par 2 vaut 0.',
      narration: "À toi de jouer. Quelle expression teste si n est pair ?",
    },
  ],
  'lire-avec-scanf': [
    {
      type: 'exemple',
      titre: 'Saisir un retrait Orange Money',
      situation: 'L\'agent saisit le montant et le code du service.',
      langage: 'C',
      code: ['printf("Montant : ");', 'scanf("%d", &montant);', 'printf("Service : ");', 'scanf(" %c", &service);'],
      resultat: ['Montant : 25000', 'Service : R'],
      narration: "Exemple concret : un printf guide l'agent, puis scanf lit le montant. Pour le caractère, l'espace avant pourcentage c évite de lire l'ancien retour à la ligne.",
    },
    {
      type: 'exemple',
      titre: 'Deux valeurs en une saisie',
      situation: 'Quantité et prix tapés sur la même ligne.',
      langage: 'C',
      code: ['scanf("%d %f", &qte, &prix);'],
      resultat: ['Saisie : 3 2500', 'qte = 3, prix = 2500.0'],
      narration: "Deuxième exemple : un seul scanf peut lire deux valeurs, séparées par un espace.",
    },
    {
      type: 'defi',
      question: 'Pourquoi ce code plante-t-il ? scanf("%d", age);',
      reponse: 'Il manque le & : scanf("%d", &age);',
      explication: 'scanf a besoin de l\'adresse de la variable pour y ranger la valeur.',
      narration: "À toi de jouer. Pourquoi ce scanf fait-il planter le programme ?",
    },
  ],
}

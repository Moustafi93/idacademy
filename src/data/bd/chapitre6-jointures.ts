import type { Lecon } from '../types'

/*
 * Base de données — Chapitre 6 : Jointures et regroupements
 * Toutes les requêtes s'exécutent sur la base d'exemple « Scolarité ».
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'jointure-interne',
  titre: 'La jointure interne : relier plusieurs tables',
  duree: '30 min',
  objectifs: [
    'Comprendre pourquoi on a besoin d\'une jointure',
    'Écrire une jointure avec INNER JOIN … ON',
    'Utiliser des alias de tables',
    'Joindre trois tables ou plus',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La jointure', sousTitre: 'Le résumé en 2 minutes', narration: 'La jointure interne en SQL, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'Le problème',
        colonnes: [
          { nom: 'Table etudiant', texte: "Contient le code de la filière : 'IDA'" },
          { nom: 'Table filiere', texte: "Contient le libellé : 'Informatique Développeur d'Application'" },
        ],
        narration: "Grâce à la normalisation, chaque information n'est écrite qu'une fois. La table étudiant contient seulement le code de la filière ; son libellé est dans la table filière. Pour afficher les deux ensemble, il faut relier les tables : c'est la jointure.",
      },
      {
        type: 'code',
        titre: 'Relier par la clé',
        lignes: ['SELECT e.nom, f.libelle', 'FROM etudiant e', 'JOIN filiere f', '  ON e.code_filiere = f.code_filiere;'],
        etapes: [
          { ligne: 1, variables: { tables: 'etudiant' } },
          { ligne: 2, variables: { tables: 'etudiant + filiere' }, note: 'On ajoute la table filiere' },
          { ligne: 3, variables: { tables: 'etudiant + filiere' }, note: 'Clé étrangère = clé primaire' },
          { ligne: 0, variables: { tables: 'etudiant + filiere' }, sortie: 'Koné | Informatique Développeur…' },
        ],
        narration: "On écrit FROM la première table, JOIN la deuxième, et après ON, la condition de jointure : la clé étrangère est égale à la clé primaire. Chaque étudiant est alors associé à sa filière.",
      },
      {
        type: 'points',
        titre: 'À ne pas oublier',
        points: ['Une condition ON par table ajoutée', 'Préfixer les colonnes communes', 'Sans condition : produit cartésien !'],
        narration: "Il faut une condition ON pour chaque table ajoutée, préfixer les colonnes qui existent dans plusieurs tables, et ne jamais oublier la condition, sinon on obtient toutes les combinaisons possibles.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Pourquoi joindre des tables ?' },
    {
      type: 'texte',
      contenu:
        "Une base normalisée découpe l'information en plusieurs tables reliées par des **clés étrangères**. C'est efficace pour stocker, mais pour **afficher**, on a souvent besoin de colonnes venant de plusieurs tables. Exemple : la table `etudiant` contient `code_filiere = 'IDA'`, mais le libellé « Informatique Développeur d'Application » est dans la table `filiere`.",
    },
    {
      type: 'texte',
      contenu:
        "La **jointure** reconstitue l'information : pour chaque ligne de la première table, le SGBD cherche la ligne de la deuxième table dont la **clé primaire** est égale à la **clé étrangère**, et colle les deux lignes côte à côte.",
    },

    { type: 'titre', contenu: '2. La syntaxe INNER JOIN … ON' },
    {
      type: 'code',
      langage: 'sql',
      code: `SELECT colonnes
FROM table1
INNER JOIN table2 ON table1.cle_etrangere = table2.cle_primaire;`,
      legende: '`INNER JOIN` peut s\'écrire simplement `JOIN`.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Chaque étudiant avec le libellé de sa filière',
      requete: `SELECT etudiant.nom, etudiant.prenom, filiere.libelle
FROM etudiant
INNER JOIN filiere ON etudiant.code_filiere = filiere.code_filiere;`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les colonnes « ambiguës »',
      contenu:
        "La colonne `code_filiere` existe dans les deux tables. Si on écrit simplement `SELECT code_filiere`, le SGBD ne sait pas laquelle prendre et renvoie une erreur « ambiguous column ». Il faut **préfixer** par le nom de la table : `etudiant.code_filiere`.",
    },

    { type: 'titre', contenu: '3. Les alias de tables' },
    {
      type: 'texte',
      contenu:
        "Répéter `etudiant.` et `filiere.` devient vite long. On donne à chaque table un **alias** court juste après son nom dans FROM ou JOIN, puis on l'utilise partout dans la requête.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'La même requête avec des alias',
      requete: `SELECT e.nom, e.prenom, f.libelle AS filiere
FROM etudiant e
JOIN filiere f ON e.code_filiere = f.code_filiere
WHERE e.ville = 'Abidjan'
ORDER BY e.nom;`,
      legende: 'On peut ajouter WHERE et ORDER BY comme d\'habitude, après les jointures.',
    },

    { type: 'titre', contenu: '4. Joindre trois tables' },
    {
      type: 'texte',
      contenu:
        "Pour afficher un **relevé de notes** (nom de l'étudiant, libellé de la matière, note), il faut trois tables : `etudiant`, `note` et `matiere`. La table `note` est au milieu : elle contient les deux clés étrangères. On ajoute **un JOIN et une condition ON par table**.",
    },
    {
      type: 'tableau',
      entetes: ['Table', 'Relie à', 'Condition'],
      lignes: [
        ['note', 'etudiant', 'n.matricule = e.matricule'],
        ['note', 'matiere', 'n.code_matiere = m.code_matiere'],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Le relevé de notes d\'Awa Koné',
      requete: `SELECT e.nom, e.prenom, m.libelle, m.coefficient, n.note
FROM note n
JOIN etudiant e ON n.matricule = e.matricule
JOIN matiere m ON n.code_matiere = m.code_matiere
WHERE e.matricule = 'IDA001';`,
      legende: 'Remplace IDA001 par IDA003 ou FCG001. Enlève la ligne WHERE pour voir le relevé de toute l\'école.',
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Méthode pour toute question de jointure',
      elements: [
        'Liste les **colonnes** demandées et note de quelle table vient chacune.',
        'Ajoute les **tables intermédiaires** nécessaires pour relier ces tables (suis les flèches du schéma relationnel).',
        'Écris **une condition ON par table ajoutée** : clé étrangère = clé primaire.',
        'Ajoute enfin WHERE, puis ORDER BY.',
      ],
    },

    { type: 'titre', contenu: '5. L\'ancienne syntaxe et le produit cartésien' },
    {
      type: 'texte',
      contenu:
        "Tu rencontreras aussi, dans les anciens sujets et corrigés, la jointure écrite **dans le WHERE** : on liste les tables après FROM, séparées par des virgules, et on met la condition de jointure dans WHERE. Le résultat est le même.",
    },
    {
      type: 'code',
      langage: 'sql',
      code: `SELECT e.nom, f.libelle
FROM etudiant e, filiere f
WHERE e.code_filiere = f.code_filiere;`,
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Sans condition de jointure : le produit cartésien',
      requete: `SELECT e.nom, f.libelle
FROM etudiant e, filiere f;`,
      legende: '8 étudiants × 3 filières = 24 lignes : chaque étudiant est associé à toutes les filières. C\'est faux ! Ajoute la condition WHERE pour revenir à 8 lignes.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'La jointure relie deux tables par **clé étrangère = clé primaire**.',
        '`FROM t1 JOIN t2 ON t1.fk = t2.pk` ; alias : `FROM etudiant e`.',
        'Préfixe les colonnes présentes dans plusieurs tables (`e.code_filiere`).',
        '**n tables → n − 1 conditions de jointure** ; sans condition, on obtient le produit cartésien.',
      ],
    },
    {
      type: 'quiz',
      question: 'Pour joindre 4 tables, combien faut-il de conditions de jointure ?',
      options: ['2', '3', '4'],
      bonneReponse: 1,
      explication: 'Il faut n − 1 conditions pour n tables : chaque table ajoutée après la première est reliée par une condition.',
    },
    {
      type: 'quiz',
      question: 'Que signifie l\'erreur « ambiguous column name: matricule » ?',
      options: ['La colonne matricule n\'existe pas', 'La colonne matricule existe dans plusieurs tables de la requête', 'La colonne matricule contient des doublons'],
      bonneReponse: 1,
      explication: 'Il faut préciser la table : e.matricule ou n.matricule.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : écrire des jointures',
      enonce: 'Écris les requêtes suivantes sur la base Scolarité.',
      questions: [
        'Le nom et le prénom des étudiants de la filière « Gestion Commerciale » (en utilisant le libellé, pas le code).',
        'Le matricule, le libellé de la matière et la note de toutes les notes supérieures ou égales à 15.',
        'Le nom de l\'étudiant, le libellé de sa filière, le libellé de la matière et la note, pour les notes d\'anglais, triées par note décroissante.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT e.nom, e.prenom
FROM etudiant e
JOIN filiere f ON e.code_filiere = f.code_filiere
WHERE f.libelle = 'Gestion Commerciale';

-- 2
SELECT n.matricule, m.libelle, n.note
FROM note n
JOIN matiere m ON n.code_matiere = m.code_matiere
WHERE n.note >= 15;

-- 3 (4 tables → 3 conditions)
SELECT e.nom, f.libelle AS filiere, m.libelle AS matiere, n.note
FROM note n
JOIN etudiant e ON n.matricule = e.matricule
JOIN filiere f  ON e.code_filiere = f.code_filiere
JOIN matiere m  ON n.code_matiere = m.code_matiere
WHERE n.code_matiere = 'ANG'
ORDER BY n.note DESC;`,
      explication: 'Question 1 : le libellé est dans filiere, les noms dans etudiant : il faut les deux tables, même si on n\'affiche que des colonnes d\'etudiant.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La gestion des commandes d\'un grossiste',
      enonce:
        "Un grossiste de Yopougon utilise le schéma relationnel suivant :\n\nCLIENT (num_client, nom_client, ville)\nCOMMANDE (num_cde, date_cde, #num_client)\nPRODUIT (ref_produit, designation, prix_unitaire)\nLIGNE_COMMANDE (#num_cde, #ref_produit, quantite)",
      questions: [
        'Identifie les clés étrangères et la table qu\'elles référencent.',
        'Affiche le numéro et la date des commandes passées par le client « Boutique Bénédiction ».',
        'Affiche la désignation et la quantité des produits de la commande n° 1045.',
        'Affiche le nom des clients de Bouaké ayant commandé du « Riz parfumé 25 kg » (sans doublons).',
        'Affiche, pour chaque ligne de la commande n° 1045, la désignation, la quantité, le prix unitaire et le montant de la ligne.',
      ],
      langage: 'sql',
      solution: `-- 1
-- COMMANDE.num_client         → CLIENT(num_client)
-- LIGNE_COMMANDE.num_cde      → COMMANDE(num_cde)
-- LIGNE_COMMANDE.ref_produit  → PRODUIT(ref_produit)

-- 2
SELECT co.num_cde, co.date_cde
FROM commande co
JOIN client cl ON co.num_client = cl.num_client
WHERE cl.nom_client = 'Boutique Bénédiction';

-- 3
SELECT p.designation, l.quantite
FROM ligne_commande l
JOIN produit p ON l.ref_produit = p.ref_produit
WHERE l.num_cde = 1045;

-- 4 (4 tables → 3 conditions)
SELECT DISTINCT cl.nom_client
FROM client cl
JOIN commande co      ON co.num_client = cl.num_client
JOIN ligne_commande l ON l.num_cde = co.num_cde
JOIN produit p        ON p.ref_produit = l.ref_produit
WHERE cl.ville = 'Bouaké'
  AND p.designation = 'Riz parfumé 25 kg';

-- 5
SELECT p.designation, l.quantite, p.prix_unitaire,
       l.quantite * p.prix_unitaire AS montant
FROM ligne_commande l
JOIN produit p ON l.ref_produit = p.ref_produit
WHERE l.num_cde = 1045;`,
      explication:
        "Question 3 : inutile de joindre COMMANDE, car le numéro de commande est déjà dans LIGNE_COMMANDE. Joindre une table dont on n'a pas besoin n'est pas faux, mais un correcteur apprécie une requête sans table inutile. Question 4 : DISTINCT évite d'afficher plusieurs fois un client qui a commandé ce riz plusieurs fois.",
    },
  ],
  exercice: {
    id: 'sql-releve-ida',
    titre: 'Le relevé de notes de la filière IDA',
    consigne:
      'Affiche le nom, le prénom, le libellé de la matière et la note des étudiants de la filière IDA, triés par nom puis par libellé de matière.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Relevé des notes de la filière IDA (3 tables)\n\n',
    indice: 'FROM note n JOIN etudiant e ON … JOIN matiere m ON … WHERE e.code_filiere = \'IDA\' ORDER BY e.nom, m.libelle',
    solution: `SELECT e.nom, e.prenom, m.libelle, n.note
FROM note n
JOIN etudiant e ON n.matricule = e.matricule
JOIN matiere m ON n.code_matiere = m.code_matiere
WHERE e.code_filiere = 'IDA'
ORDER BY e.nom, m.libelle;`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'jointure-externe',
  titre: 'La jointure externe : garder les lignes sans correspondance',
  duree: '25 min',
  objectifs: [
    'Comprendre ce que la jointure interne fait disparaître',
    'Écrire une jointure externe avec LEFT JOIN',
    'Trouver les lignes « sans correspondance » avec IS NULL',
    'Placer correctement une condition dans ON ou dans WHERE',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'LEFT JOIN', sousTitre: 'Le résumé en 2 minutes', narration: 'La jointure externe, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'Interne ou externe ?',
        colonnes: [
          { nom: 'INNER JOIN', texte: 'Seulement les lignes qui ont une correspondance' },
          { nom: 'LEFT JOIN', texte: 'Toutes les lignes de gauche, avec NULL s\'il n\'y a pas de correspondance' },
        ],
        narration: "La jointure interne ne garde que les lignes qui ont une correspondance dans l'autre table. La jointure externe gauche garde toutes les lignes de la table de gauche, et met NULL quand il n'y a pas de correspondance.",
      },
      {
        type: 'code',
        titre: 'Trouver ce qui manque',
        lignes: ['SELECT f.libelle', 'FROM filiere f', 'LEFT JOIN etudiant e ON e.code_filiere = f.code_filiere', 'WHERE e.matricule IS NULL;'],
        etapes: [
          { ligne: 1, variables: { filieres: 'toutes' } },
          { ligne: 2, variables: { filieres: 'toutes', etudiant: 'ou NULL' }, note: 'Chaque filière garde sa ligne' },
          { ligne: 3, variables: { filieres: 'sans étudiant' }, sortie: 'Les filières vides', note: 'On garde les NULL' },
        ],
        narration: "Pour trouver ce qui n'existe pas, par exemple les filières sans étudiant, on fait un LEFT JOIN puis on garde les lignes où la colonne de droite est NULL.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Ce que la jointure interne fait disparaître' },
    {
      type: 'texte',
      contenu:
        "La jointure interne ne garde que les lignes qui ont une **correspondance** dans les deux tables. Une filière qui n'a encore **aucun** étudiant n'apparaît donc pas dans le résultat. Pour le voir, ajoutons une nouvelle filière, « Ressources Humaines et Communication », sans étudiant :",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Jointure interne : la nouvelle filière a disparu',
      requete: `INSERT INTO filiere VALUES ('RHC', 'Ressources Humaines et Communication');

SELECT f.libelle, e.nom, e.prenom
FROM filiere f
INNER JOIN etudiant e ON e.code_filiere = f.code_filiere;`,
      legende: '8 lignes : la filière RHC n\'est pas affichée, car aucun étudiant ne lui correspond.',
    },

    { type: 'titre', contenu: '2. LEFT JOIN : garder toutes les lignes de gauche' },
    {
      type: 'texte',
      contenu:
        "Avec **LEFT JOIN** (ou LEFT OUTER JOIN), **toutes** les lignes de la table de gauche (celle écrite dans FROM) sont gardées. Quand une ligne n'a pas de correspondance, les colonnes de la table de droite sont remplies avec **NULL**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Jointure externe : toutes les filières',
      requete: `INSERT INTO filiere VALUES ('RHC', 'Ressources Humaines et Communication');

SELECT f.libelle, e.nom, e.prenom
FROM filiere f
LEFT JOIN etudiant e ON e.code_filiere = f.code_filiere;`,
      legende: '9 lignes : la filière RHC apparaît, avec NULL dans les colonnes nom et prénom.',
    },
    {
      type: 'tableau',
      entetes: ['Jointure', 'Lignes gardées'],
      lignes: [
        ['INNER JOIN', 'Seulement les lignes qui ont une correspondance des deux côtés'],
        ['LEFT JOIN', 'Toutes les lignes de la table de gauche (+ NULL si pas de correspondance)'],
        ['RIGHT JOIN', 'Toutes les lignes de la table de droite (rarement utilisé : on inverse les tables et on fait un LEFT JOIN)'],
        ['FULL OUTER JOIN', 'Toutes les lignes des deux tables (n\'existe pas en MySQL)'],
      ],
    },

    { type: 'titre', contenu: '3. Trouver ce qui n\'existe pas' },
    {
      type: 'texte',
      contenu:
        "C'est l'usage le plus fréquent du LEFT JOIN, et une question très classique d'examen : « les filières **sans** étudiant », « les clients qui n'ont **jamais** commandé », « les produits **jamais** vendus ». On fait un LEFT JOIN, puis on garde les lignes où la clé de la table de droite **IS NULL**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les filières sans aucun étudiant',
      requete: `INSERT INTO filiere VALUES ('RHC', 'Ressources Humaines et Communication');

SELECT f.code_filiere, f.libelle
FROM filiere f
LEFT JOIN etudiant e ON e.code_filiere = f.code_filiere
WHERE e.matricule IS NULL;`,
    },

    { type: 'titre', contenu: '4. Une condition dans ON ou dans WHERE ?' },
    {
      type: 'texte',
      contenu:
        "Question : afficher **tous** les étudiants avec leur note d'algorithmique, y compris ceux qui n'en ont pas (les étudiants de FCGE et GEC ne suivent pas l'ALGO). La place de la condition `code_matiere = 'ALGO'` change tout :",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Condition dans ON : correct',
      requete: `SELECT e.nom, e.prenom, n.note AS note_algo
FROM etudiant e
LEFT JOIN note n ON n.matricule = e.matricule
               AND n.code_matiere = 'ALGO';`,
      legende: '8 lignes : les 4 étudiants sans note d\'ALGO sont gardés avec NULL.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Condition dans WHERE : les NULL disparaissent',
      requete: `SELECT e.nom, e.prenom, n.note AS note_algo
FROM etudiant e
LEFT JOIN note n ON n.matricule = e.matricule
WHERE n.code_matiere = 'ALGO';`,
      legende: '4 lignes seulement : WHERE est appliqué après la jointure, et NULL = \'ALGO\' n\'est pas vrai. Le LEFT JOIN se comporte alors comme un INNER JOIN.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`INNER JOIN` : seulement les lignes qui ont une correspondance.',
        '`LEFT JOIN` : toutes les lignes de la table de gauche ; NULL quand il n\'y a pas de correspondance.',
        'Trouver « les X sans Y » : `X LEFT JOIN Y … WHERE Y.cle IS NULL`.',
        'Une condition sur la table de droite se met dans **ON** si on veut garder les lignes sans correspondance.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle requête trouve les matières pour lesquelles aucune note n\'a été saisie ?',
      options: [
        'SELECT m.libelle FROM matiere m JOIN note n ON n.code_matiere = m.code_matiere WHERE n.note IS NULL;',
        'SELECT m.libelle FROM matiere m LEFT JOIN note n ON n.code_matiere = m.code_matiere WHERE n.code_matiere IS NULL;',
        'SELECT m.libelle FROM note n LEFT JOIN matiere m ON n.code_matiere = m.code_matiere WHERE m.code_matiere IS NULL;',
      ],
      bonneReponse: 1,
      explication: 'On part de la table dont on veut toutes les lignes (matiere), à gauche, puis on garde celles sans correspondance dans note. La 3e requête cherche des notes sans matière, ce qui est impossible grâce à la clé étrangère.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : interne ou externe ?',
      enonce: 'Pour chaque demande, indique s\'il faut une jointure interne ou externe, puis écris la requête.',
      questions: [
        'La liste des étudiants avec le libellé de leur filière.',
        'Toutes les matières, avec le nombre de notes saisies pour chacune (même 0). Écris seulement la jointure, le comptage sera vu dans la leçon suivante.',
        'Les étudiants qui n\'ont pas de note d\'anglais.',
      ],
      langage: 'sql',
      solution: `-- 1 : interne (chaque étudiant a une filière)
SELECT e.nom, e.prenom, f.libelle
FROM etudiant e
JOIN filiere f ON e.code_filiere = f.code_filiere;

-- 2 : externe (on veut aussi les matières sans note)
SELECT m.libelle, n.note
FROM matiere m
LEFT JOIN note n ON n.code_matiere = m.code_matiere;

-- 3 : externe + IS NULL
SELECT e.nom, e.prenom
FROM etudiant e
LEFT JOIN note n ON n.matricule = e.matricule AND n.code_matiere = 'ANG'
WHERE n.matricule IS NULL;`,
      explication: 'Question 3 : dans la base d\'exemple, tous les étudiants ont une note d\'anglais : le résultat est vide, ce qui est une réponse correcte !',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La bibliothèque universitaire',
      enonce:
        "La bibliothèque d'une université utilise le schéma suivant :\n\nLIVRE (code_livre, titre, auteur, annee)\nADHERENT (num_adherent, nom, prenom, filiere)\nEMPRUNT (#code_livre, #num_adherent, date_emprunt, date_retour)\n\ndate_retour est NULL tant que le livre n'est pas rendu.",
      questions: [
        'Affiche le titre des livres et le nom des adhérents pour tous les emprunts en cours (non rendus).',
        'Affiche les livres qui n\'ont jamais été empruntés.',
        'Affiche les adhérents qui n\'ont jamais emprunté de livre.',
        'Affiche tous les adhérents de la filière IDA, et pour ceux qui ont un emprunt en cours, le titre du livre.',
        'Explique pourquoi une jointure interne ne convient pas pour la question 2.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT l.titre, a.nom, a.prenom
FROM emprunt em
JOIN livre l    ON em.code_livre = l.code_livre
JOIN adherent a ON em.num_adherent = a.num_adherent
WHERE em.date_retour IS NULL;

-- 2
SELECT l.code_livre, l.titre
FROM livre l
LEFT JOIN emprunt em ON em.code_livre = l.code_livre
WHERE em.code_livre IS NULL;

-- 3
SELECT a.num_adherent, a.nom, a.prenom
FROM adherent a
LEFT JOIN emprunt em ON em.num_adherent = a.num_adherent
WHERE em.num_adherent IS NULL;

-- 4 : la condition « en cours » va dans ON pour garder tous les adhérents
SELECT a.nom, a.prenom, l.titre
FROM adherent a
LEFT JOIN emprunt em ON em.num_adherent = a.num_adherent
                    AND em.date_retour IS NULL
LEFT JOIN livre l    ON em.code_livre = l.code_livre
WHERE a.filiere = 'IDA';

-- 5
-- Une jointure interne ne garde que les livres qui ont au moins une ligne
-- dans EMPRUNT : les livres jamais empruntés, justement ceux qu'on cherche,
-- disparaissent du résultat.`,
      explication:
        "Question 4 : la condition sur la filière concerne la table de gauche (adherent) : elle peut aller dans WHERE. La condition « en cours » concerne la table de droite : elle doit aller dans ON, sinon les adhérents sans emprunt en cours disparaissent.",
    },
  ],
  exercice: {
    id: 'sql-sans-note-bd',
    titre: 'Les étudiants sans note de BD',
    consigne: 'Affiche le matricule, le nom et le prénom des étudiants qui n\'ont pas de note en Base de données (code BD).',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Étudiants sans note de BD (LEFT JOIN … IS NULL)\n\n',
    indice: "FROM etudiant e LEFT JOIN note n ON n.matricule = e.matricule AND n.code_matiere = 'BD' WHERE n.matricule IS NULL",
    solution: `SELECT e.matricule, e.nom, e.prenom
FROM etudiant e
LEFT JOIN note n ON n.matricule = e.matricule
               AND n.code_matiere = 'BD'
WHERE n.matricule IS NULL;`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'group-by-et-having',
  titre: 'GROUP BY et HAVING : calculer par groupe',
  duree: '30 min',
  objectifs: [
    'Regrouper les lignes avec GROUP BY',
    'Respecter la règle des colonnes du SELECT',
    'Filtrer les groupes avec HAVING',
    'Calculer une moyenne pondérée par étudiant',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'GROUP BY et HAVING', sousTitre: 'Le résumé en 2 minutes', narration: 'GROUP BY et HAVING, en deux minutes.' },
      {
        type: 'code',
        titre: 'Une moyenne par matière',
        lignes: ['SELECT code_matiere, AVG(note)', 'FROM note', 'GROUP BY code_matiere;'],
        etapes: [
          { ligne: 1, variables: { lignes: '18 notes' } },
          { ligne: 2, variables: { groupes: 'ALGO, BD, ANG, COMPTA' }, note: 'On forme un paquet par matière' },
          { ligne: 0, variables: { groupes: 'ALGO, BD, ANG, COMPTA' }, sortie: 'ALGO 13.25 | BD 12 | ANG 11.75 | COMPTA 12', note: 'Une ligne par paquet' },
        ],
        narration: "GROUP BY range les lignes en paquets, un par matière. Puis la fonction d'agrégation calcule une valeur par paquet : on obtient une moyenne par matière.",
      },
      {
        type: 'comparaison',
        titre: 'WHERE ou HAVING ?',
        colonnes: [
          { nom: 'WHERE', texte: 'Filtre les lignes, avant le regroupement' },
          { nom: 'HAVING', texte: 'Filtre les groupes, après le calcul : HAVING AVG(note) >= 10' },
        ],
        narration: "WHERE filtre les lignes avant le regroupement. HAVING filtre les groupes après le calcul : c'est là qu'on met une condition sur une moyenne ou un nombre.",
      },
      {
        type: 'points',
        titre: 'La règle d\'or',
        points: ['Dans le SELECT : colonnes du GROUP BY', '… ou fonctions d\'agrégation', 'Rien d\'autre !'],
        narration: "La règle d'or : dans le SELECT, on ne met que les colonnes du GROUP BY et des fonctions d'agrégation.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Calculer par groupe' },
    {
      type: 'texte',
      contenu:
        "Au chapitre précédent, `AVG(note)` donnait **une seule** moyenne pour toute la table. Mais le directeur des études veut la moyenne **de chaque matière**. **GROUP BY** range les lignes en **groupes** ayant la même valeur dans une colonne, puis la fonction d'agrégation est calculée **pour chaque groupe**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'La moyenne de chaque matière',
      requete: `SELECT code_matiere, COUNT(*) AS nb_notes, AVG(note) AS moyenne
FROM note
GROUP BY code_matiere;`,
      legende: 'Une ligne par matière. Vérifie pour ALGO : (15 + 9 + 17 + 12) / 4 = 13,25.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Avec une jointure : le libellé et l\'effectif de chaque filière',
      requete: `SELECT f.libelle, COUNT(*) AS effectif
FROM etudiant e
JOIN filiere f ON e.code_filiere = f.code_filiere
GROUP BY f.libelle
ORDER BY effectif DESC;`,
    },

    { type: 'titre', contenu: '2. La règle d\'or du GROUP BY' },
    {
      type: 'texte',
      contenu:
        "Dans une requête avec GROUP BY, le résultat contient **une ligne par groupe**. Chaque colonne du SELECT doit donc avoir **une seule valeur par groupe**. D'où la règle : dans le SELECT, on ne met que **les colonnes du GROUP BY** et **des fonctions d'agrégation**.",
    },
    {
      type: 'tableau',
      entetes: ['Requête', 'Correcte ?', 'Pourquoi'],
      lignes: [
        ['SELECT code_matiere, AVG(note) FROM note GROUP BY code_matiere', 'Oui', 'code_matiere est dans le GROUP BY'],
        ['SELECT matricule, AVG(note) FROM note GROUP BY code_matiere', 'Non', 'Plusieurs matricules par matière : lequel afficher ?'],
        ['SELECT e.matricule, e.nom, AVG(n.note) … GROUP BY e.matricule, e.nom', 'Oui', 'Les deux colonnes sont dans le GROUP BY'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'SQLite est tolérant, pas l\'examinateur',
      contenu:
        "Le terminal (SQLite) accepte certaines requêtes qui ne respectent pas la règle et affiche une valeur au hasard. MySQL (en mode strict), SQL Server et Oracle les refusent, et un correcteur les compte fausses. Respecte toujours la règle.",
    },

    { type: 'titre', contenu: '3. Regrouper par étudiant : la moyenne pondérée' },
    {
      type: 'texte',
      contenu:
        "Une moyenne de BTS est **pondérée** par les coefficients : on additionne les `note × coefficient`, puis on divise par la somme des coefficients. Il faut donc joindre `note` et `matiere` (pour le coefficient), puis regrouper par étudiant.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'La moyenne pondérée de chaque étudiant',
      requete: `SELECT e.matricule, e.nom, e.prenom,
       ROUND(SUM(n.note * m.coefficient) * 1.0 / SUM(m.coefficient), 2) AS moyenne
FROM note n
JOIN etudiant e ON n.matricule = e.matricule
JOIN matiere m  ON n.code_matiere = m.code_matiere
GROUP BY e.matricule, e.nom, e.prenom
ORDER BY moyenne DESC;`,
      legende: 'Pour Awa Koné : (15×3 + 13,5×3 + 12×1) / (3 + 3 + 1) = 97,5 / 7 ≈ 13,93.',
    },

    { type: 'titre', contenu: '4. HAVING : filtrer les groupes' },
    {
      type: 'texte',
      contenu:
        "Pour n'afficher que les étudiants **admis** (moyenne ≥ 10), on ne peut pas écrire `WHERE AVG(note) >= 10` : WHERE est appliqué **avant** le regroupement, quand les moyennes n'existent pas encore. Les conditions sur les **résultats d'agrégation** se mettent dans **HAVING**, placé après GROUP BY.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les matières dont la moyenne est d\'au moins 12',
      requete: `SELECT code_matiere, AVG(note) AS moyenne
FROM note
GROUP BY code_matiere
HAVING AVG(note) >= 12;`,
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'WHERE et HAVING dans la même requête',
      requete: `SELECT matricule, COUNT(*) AS nb_bonnes_notes
FROM note
WHERE note >= 12
GROUP BY matricule
HAVING COUNT(*) >= 2;`,
      legende: 'WHERE garde d\'abord les notes ≥ 12 ; GROUP BY les range par étudiant ; HAVING garde les étudiants qui en ont au moins 2.',
    },
    {
      type: 'tableau',
      titre: 'L\'ordre d\'exécution d\'une requête',
      entetes: ['Étape', 'Clause', 'Rôle'],
      lignes: [
        ['1', 'FROM / JOIN', 'Prendre et relier les tables'],
        ['2', 'WHERE', 'Filtrer les lignes'],
        ['3', 'GROUP BY', 'Former les groupes'],
        ['4', 'HAVING', 'Filtrer les groupes'],
        ['5', 'SELECT', 'Calculer les colonnes affichées'],
        ['6', 'ORDER BY', 'Trier le résultat'],
      ],
      legende: 'C\'est pourquoi un alias défini dans SELECT ne peut pas être utilisé dans WHERE (étape 2), mais peut l\'être dans ORDER BY (étape 6).',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`GROUP BY col` : une ligne de résultat par valeur de col ; les fonctions d\'agrégation sont calculées par groupe.',
        'Dans le SELECT : seulement les colonnes du GROUP BY et des fonctions d\'agrégation.',
        '**WHERE** filtre les lignes (avant) ; **HAVING** filtre les groupes (après), avec des conditions sur COUNT, SUM, AVG…',
        'Moyenne pondérée : `SUM(note * coefficient) / SUM(coefficient)`.',
      ],
    },
    {
      type: 'quiz',
      question: 'Où placer la condition « filières de plus de 3 étudiants » ?',
      options: ['WHERE COUNT(*) > 3', 'HAVING COUNT(*) > 3', 'GROUP BY COUNT(*) > 3'],
      bonneReponse: 1,
      explication: 'C\'est une condition sur le résultat d\'une fonction d\'agrégation, calculé par groupe : elle va dans HAVING.',
    },
    {
      type: 'quiz',
      question: 'Où placer la condition « seulement les étudiants d\'Abidjan » dans une requête qui compte les étudiants par filière ?',
      options: ['WHERE ville = \'Abidjan\'', 'HAVING ville = \'Abidjan\''],
      bonneReponse: 0,
      explication: 'C\'est une condition sur chaque ligne (chaque étudiant), à appliquer avant le regroupement : WHERE.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : statistiques par groupe',
      enonce: 'Écris les requêtes suivantes sur la base Scolarité.',
      questions: [
        'Le nombre d\'étudiants par ville.',
        'Le nombre d\'étudiantes et d\'étudiants (par sexe) dans la filière IDA.',
        'La meilleure note de chaque étudiant (matricule, meilleure note).',
        'Le libellé des matières dont la moyenne est inférieure à 12.',
        'Le matricule et la moyenne simple des étudiants qui ont au moins 3 notes.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT ville, COUNT(*) AS nombre
FROM etudiant
GROUP BY ville;

-- 2
SELECT sexe, COUNT(*) AS nombre
FROM etudiant
WHERE code_filiere = 'IDA'
GROUP BY sexe;

-- 3
SELECT matricule, MAX(note) AS meilleure_note
FROM note
GROUP BY matricule;

-- 4
SELECT m.libelle
FROM note n
JOIN matiere m ON n.code_matiere = m.code_matiere
GROUP BY m.libelle
HAVING AVG(n.note) < 12;

-- 5
SELECT matricule, AVG(note) AS moyenne
FROM note
GROUP BY matricule
HAVING COUNT(*) >= 3;`,
      explication: 'Question 4 : on peut utiliser AVG dans HAVING sans l\'afficher dans le SELECT. Résultat : Anglais (11,75).',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les statistiques d\'une compagnie de transport',
      enonce:
        "Une compagnie de cars assure des voyages au départ d'Abidjan. Schéma relationnel :\n\nVILLE (code_ville, nom_ville)\nVOYAGE (num_voyage, date_voyage, #code_ville_arrivee, prix_billet)\nRESERVATION (num_reservation, #num_voyage, nom_passager, nb_places)",
      questions: [
        'Affiche le nombre de voyages par ville d\'arrivée (nom de la ville, nombre de voyages).',
        'Affiche, pour chaque voyage, le numéro et le nombre total de places réservées.',
        'Affiche le numéro et la recette (prix du billet × places réservées) de chaque voyage, du plus rentable au moins rentable.',
        'Affiche le nom des villes ayant reçu plus de 10 voyages en 2025.',
        'Affiche les voyages qui n\'ont aucune réservation.',
        'Explique la différence entre WHERE et HAVING en t\'appuyant sur la question 4.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT vi.nom_ville, COUNT(*) AS nb_voyages
FROM voyage vo
JOIN ville vi ON vo.code_ville_arrivee = vi.code_ville
GROUP BY vi.nom_ville;

-- 2
SELECT num_voyage, SUM(nb_places) AS places_reservees
FROM reservation
GROUP BY num_voyage;

-- 3
SELECT vo.num_voyage, SUM(r.nb_places * vo.prix_billet) AS recette
FROM voyage vo
JOIN reservation r ON r.num_voyage = vo.num_voyage
GROUP BY vo.num_voyage
ORDER BY recette DESC;

-- 4
SELECT vi.nom_ville
FROM voyage vo
JOIN ville vi ON vo.code_ville_arrivee = vi.code_ville
WHERE vo.date_voyage BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY vi.nom_ville
HAVING COUNT(*) > 10;

-- 5
SELECT vo.num_voyage, vo.date_voyage
FROM voyage vo
LEFT JOIN reservation r ON r.num_voyage = vo.num_voyage
WHERE r.num_reservation IS NULL;

-- 6
-- WHERE filtre les lignes AVANT le regroupement : ici, il ne garde que
-- les voyages de 2025 (condition sur chaque voyage).
-- HAVING filtre les groupes APRÈS le calcul : il ne garde que les villes
-- dont le nombre de voyages (COUNT, calculé par groupe) dépasse 10.
-- On ne peut pas écrire WHERE COUNT(*) > 10, car le comptage n'existe
-- pas encore au moment où WHERE est appliqué.`,
      explication:
        "Ce sujet balaie tout le chapitre : jointure, GROUP BY, HAVING, LEFT JOIN. Dans la question 3, on pourrait aussi grouper par vo.num_voyage et vo.prix_billet puis écrire SUM(r.nb_places) * vo.prix_billet : les deux réponses sont correctes.",
    },
  ],
  exercice: {
    id: 'sql-effectif-filiere',
    titre: 'L\'effectif de chaque filière',
    consigne:
      'Affiche le libellé de chaque filière et son nombre d\'étudiants, de la filière la plus nombreuse à la moins nombreuse ; à effectif égal, par ordre alphabétique du libellé.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Libellé et effectif de chaque filière\n\n',
    indice: 'JOIN filiere … GROUP BY f.libelle ORDER BY COUNT(*) DESC, f.libelle',
    solution: `SELECT f.libelle, COUNT(*) AS effectif
FROM etudiant e
JOIN filiere f ON e.code_filiere = f.code_filiere
GROUP BY f.libelle
ORDER BY effectif DESC, f.libelle;`,
  },
}

export const leconsJointures: Lecon[] = [lecon1, lecon2, lecon3]

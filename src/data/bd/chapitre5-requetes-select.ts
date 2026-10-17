import type { Lecon } from '../types'

/*
 * Base de données — Chapitre 5 : Requêtes SELECT
 * Toutes les requêtes s'exécutent sur la base d'exemple « Scolarité ».
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'projection-et-tri',
  titre: 'SELECT : choisir les colonnes et trier',
  duree: '25 min',
  objectifs: [
    'Écrire une requête SELECT … FROM …',
    'Choisir les colonnes à afficher (projection)',
    'Renommer une colonne avec AS et faire des calculs',
    'Supprimer les doublons avec DISTINCT et trier avec ORDER BY',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'SELECT et ORDER BY', sousTitre: 'Le résumé en 2 minutes', narration: 'Choisir les colonnes et trier les résultats en SQL, en deux minutes.' },
      {
        type: 'code',
        titre: 'Lire une requête',
        lignes: ['SELECT nom, prenom', 'FROM etudiant', 'ORDER BY nom;'],
        etapes: [
          { ligne: 1, variables: { table: 'etudiant' }, note: 'FROM : dans quelle table ?' },
          { ligne: 0, variables: { table: 'etudiant', colonnes: 'nom, prenom' }, note: 'SELECT : quelles colonnes ?' },
          { ligne: 2, variables: { table: 'etudiant', colonnes: 'nom, prenom', tri: 'nom A → Z' }, sortie: 'Bamba Ibrahim, Diallo Fatou…', note: 'ORDER BY : dans quel ordre ?' },
        ],
        narration: "Une requête se lit dans cet ordre : FROM indique la table, SELECT les colonnes à afficher, et ORDER BY l'ordre des lignes.",
      },
      {
        type: 'points',
        titre: 'Les outils du SELECT',
        points: ['* : toutes les colonnes', 'AS : renommer une colonne', 'DISTINCT : supprimer les doublons', 'ORDER BY … DESC : ordre décroissant'],
        narration: "L'étoile affiche toutes les colonnes. AS renomme une colonne du résultat. DISTINCT supprime les lignes en double. Et ORDER BY suivi de DESC trie en ordre décroissant.",
      },
      {
        type: 'comparaison',
        titre: 'ASC ou DESC ?',
        colonnes: [
          { nom: 'ASC (par défaut)', texte: 'Croissant : A → Z, 0 → 20, ancien → récent' },
          { nom: 'DESC', texte: 'Décroissant : Z → A, 20 → 0, récent → ancien' },
        ],
        narration: "ASC, l'ordre croissant, est l'ordre par défaut. DESC donne l'ordre décroissant, par exemple pour classer les notes de la meilleure à la moins bonne.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La structure d\'une requête SELECT' },
    {
      type: 'texte',
      contenu:
        "La requête **SELECT** sert à **interroger** la base : elle ne modifie rien, elle affiche un résultat sous forme de tableau. C'est de loin la requête la plus utilisée, et la plus présente dans les sujets du BTS. Sa forme complète comporte six clauses, toujours dans cet ordre :",
    },
    {
      type: 'code',
      langage: 'sql',
      code: `SELECT   colonnes à afficher        -- obligatoire
FROM     table(s)                   -- obligatoire
WHERE    condition sur les lignes   -- leçon 2
GROUP BY regroupement               -- chapitre suivant
HAVING   condition sur les groupes  -- chapitre suivant
ORDER BY tri;                       -- cette leçon`,
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Écrire proprement',
      elements: [
        'Les mots-clés SQL s\'écrivent en **MAJUSCULES** par convention (le SGBD accepte aussi les minuscules).',
        'On met **une clause par ligne** pour que la requête soit lisible.',
        'La requête se termine par un **point-virgule**.',
        'Les **textes** s\'écrivent entre apostrophes simples : `\'Abidjan\'`. Les nombres, sans apostrophes : `12`.',
      ],
    },

    { type: 'titre', contenu: '2. Choisir les colonnes (la projection)' },
    {
      type: 'texte',
      contenu:
        "Après SELECT, on liste les colonnes voulues, séparées par des **virgules**, dans l'ordre où on veut les voir. `SELECT *` affiche toutes les colonnes : pratique pour découvrir une table, mais à éviter dans une copie d'examen quand la question précise les colonnes demandées.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Le nom, le prénom et la ville des étudiants',
      requete: `SELECT nom, prenom, ville
FROM etudiant;`,
      legende: 'Change l\'ordre des colonnes (par exemple `ville, nom`) et observe le résultat.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'L\'erreur classique : la virgule',
      contenu:
        "Une virgule en trop avant FROM (`SELECT nom, prenom, FROM etudiant`) provoque une erreur de syntaxe. Une virgule oubliée (`SELECT nom prenom`) est plus traîtresse : le SGBD comprend « la colonne nom, renommée prenom » et n'affiche qu'une seule colonne !",
    },

    { type: 'titre', contenu: '3. Renommer avec AS et calculer' },
    {
      type: 'texte',
      contenu:
        "Le mot-clé **AS** donne un nom plus parlant à une colonne du **résultat** (un « alias »). La table, elle, n'est pas modifiée. On peut aussi afficher des **calculs** (`+ - * /`) et assembler des textes avec l'opérateur `||` (en MySQL, on utilise plutôt la fonction `CONCAT`).",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Alias et calculs',
      requete: `SELECT matricule,
       code_matiere AS matiere,
       note AS note_sur_20,
       note * 5 AS note_sur_100
FROM note;`,
      legende: 'La colonne note_sur_100 n\'existe pas dans la table : elle est calculée pour chaque ligne.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Assembler des textes',
      requete: `SELECT prenom || ' ' || nom AS etudiant,
       'né(e) le ' || date_naissance AS naissance
FROM etudiant;`,
      legende: 'En MySQL : `CONCAT(prenom, \' \', nom)`.',
    },

    { type: 'titre', contenu: '4. Supprimer les doublons avec DISTINCT' },
    {
      type: 'texte',
      contenu:
        "Quand on affiche la colonne `ville`, Abidjan apparaît quatre fois, car quatre étudiants y habitent. **DISTINCT**, placé juste après SELECT, ne garde qu'un exemplaire de chaque ligne identique.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les villes d\'origine, sans doublons',
      requete: `SELECT DISTINCT ville
FROM etudiant;`,
      legende: 'Enlève DISTINCT puis exécute à nouveau : tu obtiens 8 lignes au lieu de 5.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'DISTINCT porte sur toute la ligne',
      contenu:
        "`SELECT DISTINCT ville, sexe` supprime les lignes où **la ville ET le sexe** sont identiques. Abidjan apparaîtra donc deux fois : une fois avec F, une fois avec M.",
    },

    { type: 'titre', contenu: '5. Trier avec ORDER BY' },
    {
      type: 'texte',
      contenu:
        "Sans ORDER BY, l'ordre des lignes n'est **pas garanti** : le SGBD les affiche comme il veut. **ORDER BY** trie le résultat selon une ou plusieurs colonnes, en ordre croissant (**ASC**, par défaut) ou décroissant (**DESC**).",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Classement des notes, de la meilleure à la moins bonne',
      requete: `SELECT matricule, code_matiere, note
FROM note
ORDER BY note DESC;`,
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Tri sur deux colonnes',
      requete: `SELECT ville, nom, prenom
FROM etudiant
ORDER BY ville ASC, nom ASC;`,
      legende: 'On trie d\'abord par ville ; pour les étudiants de la même ville (Abidjan), on trie ensuite par nom.',
    },
    {
      type: 'tableau',
      titre: 'Limiter le nombre de lignes',
      entetes: ['SGBD', 'Les 3 meilleures notes'],
      lignes: [
        ['MySQL, PostgreSQL, SQLite', 'SELECT … ORDER BY note DESC LIMIT 3;'],
        ['SQL Server, Access', 'SELECT TOP 3 … ORDER BY note DESC;'],
        ['Oracle', 'SELECT … ORDER BY note DESC FETCH FIRST 3 ROWS ONLY;'],
      ],
      legende: 'Le terminal de cette leçon utilise SQLite : c\'est donc LIMIT.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Ordre des clauses : `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …`.',
        'Projection : on liste les colonnes après SELECT, séparées par des virgules ; `*` = toutes.',
        '`AS` renomme une colonne du résultat ; on peut afficher des calculs.',
        '`DISTINCT` supprime les lignes en double ; `ORDER BY col DESC` trie en décroissant (ASC par défaut).',
      ],
    },
    {
      type: 'quiz',
      question: 'Que fait SELECT DISTINCT code_filiere FROM etudiant; ?',
      options: ['Affiche les 8 codes de filière des étudiants', 'Affiche chaque code de filière une seule fois', 'Affiche les filières qui n\'ont aucun étudiant'],
      bonneReponse: 1,
      explication: 'DISTINCT supprime les doublons : on obtient IDA, FCGE et GEC, une fois chacun.',
    },
    {
      type: 'quiz',
      question: 'Comment classer les étudiants du plus jeune au plus âgé ?',
      options: ['ORDER BY date_naissance ASC', 'ORDER BY date_naissance DESC', 'ORDER BY age'],
      bonneReponse: 1,
      explication: 'Le plus jeune est né le plus récemment : il faut la date de naissance la plus grande en premier, donc DESC. La colonne age n\'existe pas.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : écrire des requêtes simples',
      enonce: 'Sur la base Scolarité, écris les requêtes suivantes, puis teste-les dans le terminal SQL.',
      questions: [
        'Le libellé et le coefficient de toutes les matières.',
        'Les matières, de la plus importante (coefficient le plus élevé) à la moins importante.',
        'Les différents codes de matière présents dans la table note.',
        'Le matricule, le code matière et la note de chaque note, avec une colonne « points » égale à la note multipliée par 2.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT libelle, coefficient
FROM matiere;

-- 2
SELECT libelle, coefficient
FROM matiere
ORDER BY coefficient DESC;

-- 3
SELECT DISTINCT code_matiere
FROM note;

-- 4
SELECT matricule, code_matiere, note, note * 2 AS points
FROM note;`,
      explication: 'Question 3 : sans DISTINCT, on obtiendrait 18 lignes (une par note). Avec DISTINCT, on obtient les 4 matières.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : trouver l\'erreur',
      enonce: 'Chacune de ces requêtes contient une erreur. Trouve-la et corrige-la.',
      questions: [
        'SELECT nom, prenom, FROM etudiant;',
        'SELECT nom prenom FROM etudiant;',
        'FROM etudiant SELECT nom;',
        'SELECT nom FROM etudiant ORDER BY nom DECROISSANT;',
      ],
      langage: 'sql',
      solution: `-- 1 : virgule en trop avant FROM
SELECT nom, prenom FROM etudiant;

-- 2 : virgule oubliée (prenom devient un alias de nom)
SELECT nom, prenom FROM etudiant;

-- 3 : SELECT vient toujours avant FROM
SELECT nom FROM etudiant;

-- 4 : le mot-clé est DESC
SELECT nom FROM etudiant ORDER BY nom DESC;`,
      explication: 'La requête 2 ne provoque pas d\'erreur, et c\'est ce qui la rend dangereuse : il faut toujours vérifier que le résultat a le bon nombre de colonnes.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le catalogue d\'une quincaillerie',
      enonce:
        "Une quincaillerie d'Adjamé gère ses articles dans une base de données. On donne la relation :\n\nARTICLE (ref_article, designation, categorie, prix_unitaire, quantite_stock)\n\nExemple de ligne : ('A012', 'Ciment CPJ 50 kg', 'Maçonnerie', 5500, 120)",
      questions: [
        'Écris la requête qui affiche la désignation et le prix de tous les articles.',
        'Écris la requête qui affiche les différentes catégories d\'articles.',
        'Écris la requête qui affiche la désignation et la valeur du stock (prix × quantité) de chaque article, la colonne calculée étant nommée valeur_stock.',
        'Écris la requête qui affiche les articles du plus cher au moins cher ; pour un même prix, par ordre alphabétique de désignation.',
        'Écris la requête qui affiche les 5 articles les moins chers (préciser le SGBD utilisé).',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT designation, prix_unitaire
FROM article;

-- 2
SELECT DISTINCT categorie
FROM article;

-- 3
SELECT designation, prix_unitaire * quantite_stock AS valeur_stock
FROM article;

-- 4
SELECT *
FROM article
ORDER BY prix_unitaire DESC, designation ASC;

-- 5 (MySQL)
SELECT designation, prix_unitaire
FROM article
ORDER BY prix_unitaire ASC
LIMIT 5;
-- (SQL Server : SELECT TOP 5 designation, prix_unitaire FROM article ORDER BY prix_unitaire;)`,
      explication:
        "Au BTS, chaque requête est notée sur sa logique : bonnes colonnes, bonne table, bon tri. Respecte exactement les colonnes demandées et nomme les colonnes calculées quand l'énoncé le précise.",
    },
  ],
  exercice: {
    id: 'sql-tri-etudiants',
    titre: 'L\'annuaire des étudiants',
    consigne: 'Affiche le nom, le prénom et la ville de tous les étudiants, triés par ordre alphabétique du nom.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Nom, prénom et ville, triés par nom\n\n',
    indice: 'SELECT … FROM etudiant ORDER BY nom;',
    solution: `SELECT nom, prenom, ville
FROM etudiant
ORDER BY nom;`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'filtrer-avec-where',
  titre: 'WHERE : filtrer les lignes',
  duree: '30 min',
  objectifs: [
    'Filtrer les lignes avec WHERE et les opérateurs de comparaison',
    'Combiner des conditions avec AND, OR, NOT et des parenthèses',
    'Utiliser BETWEEN, IN et LIKE',
    'Tester les valeurs absentes avec IS NULL',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La clause WHERE', sousTitre: 'Le résumé en 2 minutes', narration: 'Filtrer les lignes avec WHERE, en deux minutes.' },
      {
        type: 'code',
        titre: 'Garder certaines lignes',
        lignes: ['SELECT nom, prenom', 'FROM etudiant', "WHERE ville = 'Abidjan';"],
        etapes: [
          { ligne: 1, variables: { lignes: '8' }, note: 'On part des 8 étudiants' },
          { ligne: 2, variables: { lignes: '4' }, note: 'On garde ceux d\'Abidjan' },
          { ligne: 0, variables: { lignes: '4' }, sortie: 'Koné, Kouassi, N\'Guessan, Yao', note: 'On affiche nom et prénom' },
        ],
        narration: "WHERE garde seulement les lignes qui vérifient la condition. Ici, sur les huit étudiants, seuls les quatre qui habitent Abidjan sont affichés.",
      },
      {
        type: 'points',
        titre: 'Les opérateurs',
        points: ['=, <>, <, <=, >, >=', 'AND, OR, NOT', 'BETWEEN 10 AND 15', "IN ('IDA', 'GEC')", "LIKE 'K%'"],
        narration: "On compare avec égal, différent, inférieur, supérieur. On combine avec AND, OR et NOT. BETWEEN teste un intervalle, IN une liste de valeurs, et LIKE un modèle de texte.",
      },
      {
        type: 'comparaison',
        titre: 'LIKE : les jokers',
        colonnes: [
          { nom: '%', texte: "N'importe quelle suite de caractères : 'K%' = commence par K" },
          { nom: '_', texte: "Exactement un caractère : 'Ya_' = Yao, Yak…" },
        ],
        narration: "Avec LIKE, le pourcentage remplace n'importe quelle suite de caractères, et le tiret bas remplace exactement un caractère.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Le principe de WHERE' },
    {
      type: 'texte',
      contenu:
        "La clause **WHERE** se place après FROM. Elle contient une **condition** que le SGBD teste **ligne par ligne** : la ligne est gardée si la condition est vraie, écartée sinon. C'est l'opération de **sélection** (ou restriction) de l'algèbre relationnelle.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les étudiants qui habitent Abidjan',
      requete: `SELECT nom, prenom, ville
FROM etudiant
WHERE ville = 'Abidjan';`,
      legende: 'Remplace Abidjan par Bouaké, puis par abidjan (en minuscules) : le texte doit correspondre exactement.',
    },

    { type: 'titre', contenu: '2. Les opérateurs de comparaison' },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'Signification', 'Exemple'],
      lignes: [
        ['=', 'égal à', "code_filiere = 'IDA'"],
        ['<> (ou !=)', 'différent de', "sexe <> 'M'"],
        ['<, <=', 'inférieur, inférieur ou égal', 'note < 10'],
        ['>, >=', 'supérieur, supérieur ou égal', 'coefficient >= 2'],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les notes inférieures à 10',
      requete: `SELECT matricule, code_matiere, note
FROM note
WHERE note < 10
ORDER BY note;`,
      legende: 'WHERE se place toujours avant ORDER BY.',
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Comparer des dates',
      contenu:
        "Les dates s'écrivent entre apostrophes au format `'AAAA-MM-JJ'`. Dans ce format, l'ordre alphabétique est aussi l'ordre chronologique : `date_naissance >= '2005-01-01'` donne les étudiants nés en 2005 ou après.",
    },

    { type: 'titre', contenu: '3. Combiner les conditions : AND, OR, NOT' },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'La ligne est gardée si…', 'Exemple'],
      lignes: [
        ['AND', 'les deux conditions sont vraies', "sexe = 'F' AND ville = 'Abidjan'"],
        ['OR', 'au moins une condition est vraie', "ville = 'Bouaké' OR ville = 'Korhogo'"],
        ['NOT', 'la condition est fausse', "NOT ville = 'Abidjan'"],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Les étudiantes d\'Abidjan',
      requete: `SELECT nom, prenom, ville
FROM etudiant
WHERE sexe = 'F' AND ville = 'Abidjan';`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'AND passe avant OR : mets des parenthèses',
      contenu:
        "Comme la multiplication avant l'addition, **AND est évalué avant OR**. `WHERE ville = 'Abidjan' OR ville = 'Bouaké' AND sexe = 'F'` signifie « (Abidjan) OU (Bouaké ET F) » : les garçons d'Abidjan sont gardés ! Pour « les filles d'Abidjan ou de Bouaké », il faut écrire `WHERE (ville = 'Abidjan' OR ville = 'Bouaké') AND sexe = 'F'`.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Essaie avec et sans les parenthèses',
      requete: `SELECT nom, prenom, ville, sexe
FROM etudiant
WHERE (ville = 'Abidjan' OR ville = 'Bouaké') AND sexe = 'F';`,
      legende: 'Avec les parenthèses : 2 étudiantes. Supprime-les : tu obtiens 4 lignes, dont des garçons.',
    },

    { type: 'titre', contenu: '4. BETWEEN, IN et LIKE' },
    {
      type: 'tableau',
      entetes: ['Opérateur', 'Rôle', 'Équivalent'],
      lignes: [
        ['note BETWEEN 10 AND 15', 'Valeur dans un intervalle (bornes incluses)', 'note >= 10 AND note <= 15'],
        ["ville IN ('Bouaké', 'Korhogo')", 'Valeur dans une liste', "ville = 'Bouaké' OR ville = 'Korhogo'"],
        ["nom LIKE 'K%'", 'Texte qui correspond à un modèle', 'Commence par K'],
        ["NOT IN, NOT BETWEEN, NOT LIKE", 'Le contraire', ''],
      ],
    },
    {
      type: 'tableau',
      titre: 'Les modèles de LIKE (sur les prénoms de la base)',
      entetes: ['Modèle', 'Signification', 'Prénoms qui correspondent'],
      lignes: [
        ["'K%'", 'commence par K', 'Kevin'],
        ["'%a'", 'se termine par a', 'Awa, Moussa, Aya'],
        ["'%ou%'", 'contient « ou »', 'Moussa, Fatou'],
        ["'Y_o'", 'Y, un seul caractère, puis o', 'Yao'],
        ["'_____'", 'exactement 5 caractères', 'Fatou, Kevin'],
      ],
      legende: 'Dans SQLite et MySQL, LIKE ne tient pas compte des majuscules : \'k%\' trouve aussi Kevin.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Teste les trois opérateurs',
      requete: `SELECT nom, prenom, ville, date_naissance
FROM etudiant
WHERE ville IN ('Abidjan', 'Yamoussoukro')
  AND date_naissance BETWEEN '2005-01-01' AND '2005-12-31'
  AND prenom LIKE '%a%';`,
      legende: 'Les étudiants d\'Abidjan ou de Yamoussoukro, nés en 2005, dont le prénom contient un « a ». Modifie chaque condition pour voir son effet.',
    },

    { type: 'titre', contenu: '5. Les valeurs absentes : IS NULL' },
    {
      type: 'texte',
      contenu:
        "**NULL** signifie « valeur inconnue ou absente » (par exemple, un étudiant dont on ne connaît pas la ville). Ce n'est ni 0, ni un texte vide. Attention : on ne peut **pas** tester NULL avec `=` ; il faut écrire **`IS NULL`** ou **`IS NOT NULL`**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Un étudiant sans ville',
      requete: `INSERT INTO etudiant (matricule, nom, prenom, sexe, code_filiere)
VALUES ('IDA005', 'Kouamé', 'Serge', 'M', 'IDA');

SELECT matricule, nom, prenom, ville
FROM etudiant
WHERE ville IS NULL;`,
      legende: 'On ajoute d\'abord un étudiant sans ville, puis on le retrouve. Remplace IS NULL par = NULL : aucune ligne n\'est trouvée !',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`WHERE condition` garde les lignes pour lesquelles la condition est vraie ; il se place après FROM et avant ORDER BY.',
        'Textes et dates entre apostrophes : `\'Abidjan\'`, `\'2005-01-01\'`.',
        'AND est évalué avant OR : utilise des **parenthèses**.',
        '`BETWEEN a AND b` (bornes incluses), `IN (liste)`, `LIKE` avec `%` et `_`, `IS NULL`.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle condition trouve les étudiants dont le nom commence par « Ko » ?',
      options: ["nom = 'Ko%'", "nom LIKE 'Ko%'", "nom LIKE '%Ko'"],
      bonneReponse: 1,
      explication: "Les jokers ne fonctionnent qu'avec LIKE. '%Ko' signifierait « se termine par Ko ».",
    },
    {
      type: 'quiz',
      question: 'note BETWEEN 10 AND 12 garde-t-il une note de 12 ?',
      options: ['Oui, les bornes sont incluses', 'Non, 12 est exclu'],
      bonneReponse: 0,
      explication: 'BETWEEN inclut les deux bornes : c\'est équivalent à note >= 10 AND note <= 12.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : traduire en SQL',
      enonce: 'Écris les requêtes suivantes sur la base Scolarité.',
      questions: [
        'Les étudiants de la filière IDA (nom, prénom).',
        'Les notes comprises entre 12 et 16 (matricule, matière, note).',
        'Les étudiants qui ne sont pas d\'Abidjan.',
        'Les notes d\'anglais (ANG) inférieures à 10.',
        'Les étudiants dont le nom contient la lettre « u », triés par nom.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT nom, prenom FROM etudiant
WHERE code_filiere = 'IDA';

-- 2
SELECT matricule, code_matiere, note FROM note
WHERE note BETWEEN 12 AND 16;

-- 3
SELECT * FROM etudiant
WHERE ville <> 'Abidjan';

-- 4
SELECT * FROM note
WHERE code_matiere = 'ANG' AND note < 10;

-- 5
SELECT * FROM etudiant
WHERE nom LIKE '%u%'
ORDER BY nom;`,
      explication: 'Question 4 : deux conditions qui doivent être vraies en même temps, donc AND. Résultat : la note 8.5 de IDA003 et la note 9 de FCG002.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La gestion des clients d\'un opérateur de transfert d\'argent',
      enonce:
        "Une agence de transfert d'argent utilise la relation suivante :\n\nCLIENT (num_client, nom, prenom, telephone, ville, date_inscription, solde)\n\nLe solde est exprimé en francs CFA. La colonne telephone peut être vide (NULL).",
      questions: [
        'Affiche les clients de Daloa dont le solde dépasse 100 000 F.',
        'Affiche les clients inscrits au cours de l\'année 2025.',
        'Affiche les clients de Man, Daloa ou Gagnoa, triés par ville puis par nom.',
        'Affiche les clients dont le numéro de téléphone n\'est pas renseigné.',
        'Affiche les clients dont le numéro commence par 07, avec un solde compris entre 5 000 et 50 000 F.',
        'Explique pourquoi la requête suivante ne donne pas le résultat attendu « clients de Man ou Daloa ayant un solde nul » :\nSELECT * FROM client WHERE ville = \'Man\' OR ville = \'Daloa\' AND solde = 0;',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT * FROM client
WHERE ville = 'Daloa' AND solde > 100000;

-- 2
SELECT * FROM client
WHERE date_inscription BETWEEN '2025-01-01' AND '2025-12-31';

-- 3
SELECT * FROM client
WHERE ville IN ('Man', 'Daloa', 'Gagnoa')
ORDER BY ville, nom;

-- 4
SELECT * FROM client
WHERE telephone IS NULL;

-- 5
SELECT * FROM client
WHERE telephone LIKE '07%'
  AND solde BETWEEN 5000 AND 50000;

-- 6
-- AND est évalué avant OR : la requête est comprise comme
--   ville = 'Man' OR (ville = 'Daloa' AND solde = 0)
-- Elle affiche donc TOUS les clients de Man, quel que soit leur solde.
-- Correction :
SELECT * FROM client
WHERE (ville = 'Man' OR ville = 'Daloa') AND solde = 0;`,
      explication:
        "La question 6 est un grand classique : sa réponse doit nommer la cause (priorité de AND sur OR) et proposer la correction avec des parenthèses. Note aussi que les montants s'écrivent sans espace (100000) et sans « F ».",
    },
  ],
  exercice: {
    id: 'sql-nes-en-2005',
    titre: 'Les étudiants nés en 2005',
    consigne: 'Affiche le nom, le prénom et la date de naissance des étudiants nés en 2005.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Étudiants nés en 2005\n\n',
    indice: "WHERE date_naissance BETWEEN '2005-01-01' AND '2005-12-31'",
    solution: `SELECT nom, prenom, date_naissance
FROM etudiant
WHERE date_naissance BETWEEN '2005-01-01' AND '2005-12-31';`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'fonctions-d-agregation',
  titre: 'Les fonctions d\'agrégation : compter, additionner, calculer une moyenne',
  duree: '25 min',
  objectifs: [
    'Utiliser COUNT, SUM, AVG, MIN et MAX',
    'Combiner une fonction d\'agrégation avec WHERE',
    'Arrondir un résultat avec ROUND',
    'Distinguer COUNT(*), COUNT(colonne) et COUNT(DISTINCT colonne)',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les fonctions d\'agrégation', sousTitre: 'Le résumé en 2 minutes', narration: 'Les fonctions d\'agrégation en SQL, en deux minutes.' },
      {
        type: 'points',
        titre: '5 fonctions à connaître',
        points: ['COUNT : compter', 'SUM : additionner', 'AVG : moyenne', 'MIN et MAX : plus petite et plus grande valeur'],
        narration: "Cinq fonctions résument plusieurs lignes en une seule valeur : COUNT compte, SUM additionne, AVG calcule la moyenne, MIN et MAX donnent la plus petite et la plus grande valeur.",
      },
      {
        type: 'code',
        titre: 'Les notes d\'algorithmique',
        lignes: ['SELECT COUNT(*), AVG(note)', 'FROM note', "WHERE code_matiere = 'ALGO';"],
        etapes: [
          { ligne: 1, variables: { lignes: '18' }, note: '18 notes dans la table' },
          { ligne: 2, variables: { lignes: '4' }, note: 'WHERE garde les 4 notes d\'ALGO' },
          { ligne: 0, variables: { lignes: '1' }, sortie: '4 | 13.25', note: 'Les 4 lignes deviennent une seule' },
        ],
        narration: "WHERE filtre d'abord les lignes : il reste les quatre notes d'algorithmique. Puis les fonctions les résument en une seule ligne : quatre notes, moyenne treize virgule vingt-cinq.",
      },
      {
        type: 'comparaison',
        titre: 'Les 3 façons de compter',
        colonnes: [
          { nom: 'COUNT(*)', texte: 'Toutes les lignes' },
          { nom: 'COUNT(ville)', texte: 'Les lignes où ville n\'est pas NULL' },
          { nom: 'COUNT(DISTINCT ville)', texte: 'Le nombre de villes différentes' },
        ],
        narration: "COUNT étoile compte toutes les lignes. COUNT d'une colonne ignore les valeurs NULL. Et COUNT DISTINCT compte les valeurs différentes.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Résumer plusieurs lignes en une seule' },
    {
      type: 'texte',
      contenu:
        "Jusqu'ici, nos requêtes affichaient des lignes de la table. Les **fonctions d'agrégation** font autre chose : elles prennent **toutes les lignes** retenues et les **résument** en une seule valeur. C'est ce qu'on utilise pour répondre aux questions « combien ? », « quel total ? », « quelle moyenne ? ».",
    },
    {
      type: 'tableau',
      entetes: ['Fonction', 'Rôle', 'Exemple'],
      lignes: [
        ['COUNT(*)', 'Nombre de lignes', 'Combien d\'étudiants ?'],
        ['SUM(colonne)', 'Somme des valeurs', 'Total des ventes'],
        ['AVG(colonne)', 'Moyenne des valeurs', 'Moyenne des notes'],
        ['MIN(colonne)', 'Plus petite valeur', 'La note la plus basse'],
        ['MAX(colonne)', 'Plus grande valeur', 'La date d\'inscription la plus récente'],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Statistiques sur toutes les notes',
      requete: `SELECT COUNT(*) AS nombre_notes,
       AVG(note) AS moyenne,
       MIN(note) AS plus_basse,
       MAX(note) AS plus_haute
FROM note;`,
      legende: 'Une seule ligne de résultat, même si la table contient 18 notes.',
    },

    { type: 'titre', contenu: '2. Avec WHERE : filtrer d\'abord, résumer ensuite' },
    {
      type: 'texte',
      contenu:
        "Le SGBD applique **d'abord** WHERE pour choisir les lignes, **puis** calcule la fonction sur les lignes restantes. Pour obtenir la moyenne en algorithmique, on garde les notes d'ALGO, puis on fait la moyenne.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'La moyenne de la classe en algorithmique',
      requete: `SELECT AVG(note) AS moyenne_algo
FROM note
WHERE code_matiere = 'ALGO';`,
      legende: 'Calcul : (15 + 9 + 17 + 12) / 4 = 13,25. Remplace ALGO par BD ou ANG.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Combien d\'étudiantes ?',
      requete: `SELECT COUNT(*) AS nombre_etudiantes
FROM etudiant
WHERE sexe = 'F';`,
    },

    { type: 'titre', contenu: '3. Arrondir avec ROUND' },
    {
      type: 'texte',
      contenu:
        "Une moyenne donne souvent beaucoup de décimales (12,1666…). **ROUND(valeur, n)** arrondit à n chiffres après la virgule.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Moyenne générale arrondie',
      requete: `SELECT AVG(note) AS brute,
       ROUND(AVG(note), 2) AS arrondie
FROM note;`,
    },

    { type: 'titre', contenu: '4. Les trois façons de compter' },
    {
      type: 'tableau',
      entetes: ['Écriture', 'Ce qui est compté'],
      lignes: [
        ['COUNT(*)', 'Toutes les lignes'],
        ['COUNT(colonne)', 'Les lignes où la colonne n\'est pas NULL'],
        ['COUNT(DISTINCT colonne)', 'Le nombre de valeurs différentes (sans NULL)'],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Comparer les trois',
      requete: `INSERT INTO etudiant (matricule, nom, prenom, sexe, code_filiere)
VALUES ('IDA005', 'Kouamé', 'Serge', 'M', 'IDA');

SELECT COUNT(*) AS etudiants,
       COUNT(ville) AS villes_renseignees,
       COUNT(DISTINCT ville) AS villes_differentes
FROM etudiant;`,
      legende: 'On ajoute un étudiant sans ville : 9 étudiants, 8 villes renseignées, 5 villes différentes.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Une erreur fréquente',
      contenu:
        "On ne peut pas mélanger une colonne « normale » et une fonction d'agrégation : `SELECT nom, MAX(note) FROM …` n'a pas de sens, car il y a plusieurs noms mais un seul maximum. MySQL et SQL Server refusent cette requête (SQLite l'accepte mais le résultat est trompeur). Pour obtenir un résultat **par** étudiant ou **par** matière, il faut **GROUP BY**, vu au chapitre suivant.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`COUNT`, `SUM`, `AVG`, `MIN`, `MAX` résument toutes les lignes retenues en une seule valeur.',
        'WHERE est appliqué **avant** le calcul.',
        '`ROUND(valeur, 2)` arrondit à 2 décimales.',
        '`COUNT(*)` compte les lignes, `COUNT(col)` ignore les NULL, `COUNT(DISTINCT col)` compte les valeurs différentes.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle requête donne le nombre de villes différentes des étudiants ?',
      options: ['SELECT COUNT(ville) FROM etudiant;', 'SELECT COUNT(DISTINCT ville) FROM etudiant;', 'SELECT DISTINCT COUNT(ville) FROM etudiant;'],
      bonneReponse: 1,
      explication: 'COUNT(DISTINCT ville) compte les villes différentes (5). COUNT(ville) compte les 8 étudiants dont la ville est renseignée.',
    },
    {
      type: 'quiz',
      question: 'Que renvoie SELECT MAX(date_naissance) FROM etudiant; ?',
      options: ['La date de naissance de l\'étudiant le plus âgé', 'La date de naissance de l\'étudiant le plus jeune'],
      bonneReponse: 1,
      explication: 'La date la plus grande est la plus récente : c\'est celle de l\'étudiant le plus jeune (2006-02-11, Mariam Ouattara).',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : statistiques de la scolarité',
      enonce: 'Écris une requête pour chaque question, puis note le résultat obtenu dans le terminal.',
      questions: [
        'Le nombre total d\'étudiants.',
        'Le nombre d\'étudiants de la filière IDA.',
        'La meilleure note obtenue en Base de données (BD).',
        'La somme des coefficients de toutes les matières.',
        'La moyenne des notes d\'anglais, arrondie à 2 décimales.',
      ],
      langage: 'sql',
      solution: `-- 1 → 8
SELECT COUNT(*) FROM etudiant;

-- 2 → 4
SELECT COUNT(*) FROM etudiant
WHERE code_filiere = 'IDA';

-- 3 → 16
SELECT MAX(note) FROM note
WHERE code_matiere = 'BD';

-- 4 → 9
SELECT SUM(coefficient) FROM matiere;

-- 5 → 11.75
SELECT ROUND(AVG(note), 2) FROM note
WHERE code_matiere = 'ANG';`,
      explication: 'Question 5 : il y a 8 notes d\'anglais, dont la somme est 94 ; 94 / 8 = 11,75.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les ventes d\'une boutique de téléphones',
      enonce:
        "Une boutique de téléphones de Cocody enregistre ses ventes dans la relation :\n\nVENTE (num_vente, date_vente, ref_produit, quantite, prix_unitaire, mode_paiement)\n\nmode_paiement vaut 'Espèces', 'Wave' ou 'Orange Money'.",
      questions: [
        'Écris la requête qui donne le nombre total de ventes enregistrées.',
        'Écris la requête qui donne le chiffre d\'affaires total (somme de quantite × prix_unitaire).',
        'Écris la requête qui donne le chiffre d\'affaires du mois de mars 2026.',
        'Écris la requête qui donne le prix unitaire le plus élevé et le plus bas pratiqués.',
        'Écris la requête qui donne le nombre de produits différents vendus.',
        'Écris la requête qui donne le nombre de ventes payées par Wave ou Orange Money.',
      ],
      langage: 'sql',
      solution: `-- 1
SELECT COUNT(*) AS nombre_ventes
FROM vente;

-- 2
SELECT SUM(quantite * prix_unitaire) AS chiffre_affaires
FROM vente;

-- 3
SELECT SUM(quantite * prix_unitaire) AS ca_mars_2026
FROM vente
WHERE date_vente BETWEEN '2026-03-01' AND '2026-03-31';

-- 4
SELECT MAX(prix_unitaire) AS prix_max, MIN(prix_unitaire) AS prix_min
FROM vente;

-- 5
SELECT COUNT(DISTINCT ref_produit) AS produits_vendus
FROM vente;

-- 6
SELECT COUNT(*) AS ventes_mobile_money
FROM vente
WHERE mode_paiement IN ('Wave', 'Orange Money');`,
      explication:
        "Question 2 : on peut faire un calcul à l'intérieur d'une fonction d'agrégation. SUM(quantite) * SUM(prix_unitaire) serait faux : il faut multiplier ligne par ligne, puis additionner.",
    },
  ],
  exercice: {
    id: 'sql-stats-algo',
    titre: 'Les statistiques d\'algorithmique',
    consigne:
      "Affiche, pour la matière ALGO : le nombre de notes, la moyenne, la note la plus basse et la note la plus haute (4 colonnes, dans cet ordre).",
    langage: 'sql',
    base: 'scolarite',
    codeDepart: "-- Nombre, moyenne, minimum et maximum des notes d'ALGO\n\n",
    indice: "SELECT COUNT(*), AVG(note), MIN(note), MAX(note) FROM note WHERE …",
    solution: `SELECT COUNT(*) AS nombre, AVG(note) AS moyenne, MIN(note) AS minimum, MAX(note) AS maximum
FROM note
WHERE code_matiere = 'ALGO';`,
  },
}

export const leconsSelect: Lecon[] = [lecon1, lecon2, lecon3]

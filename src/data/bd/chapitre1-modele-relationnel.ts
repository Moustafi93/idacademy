import type { Lecon } from '../types'

/*
 * Base de données — Chapitre 1 : Le modèle relationnel
 * Les blocs « sql » utilisent la base d'exemple « scolarité » (src/data/bases/scolarite.ts).
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'qu-est-ce-qu-une-base-de-donnees',
  titre: "Qu'est-ce qu'une base de données ?",
  duree: '20 min',
  objectifs: [
    'Comprendre les limites de la gestion par fichiers (cahiers, tableurs)',
    'Définir une base de données et un SGBD',
    'Connaître les rôles d\'un SGBD',
    'Exécuter ta première requête SQL',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: "Qu'est-ce qu'une base de données ?", sousTitre: 'Le résumé en 1 minute 30', narration: "Qu'est-ce qu'une base de données ? Voici l'essentiel." },
      {
        type: 'points',
        titre: 'Le problème des fichiers',
        points: ['Les mêmes données recopiées partout', 'Des copies qui finissent par se contredire', 'Difficile à partager et à sécuriser'],
        narration: "Quand on gère ses données dans des cahiers ou des fichiers Excel, on recopie les mêmes informations à plusieurs endroits. Elles finissent par se contredire, et elles sont difficiles à partager et à protéger.",
      },
      {
        type: 'comparaison',
        titre: 'Les mots clés',
        colonnes: [
          { nom: 'Base de données', texte: 'Données organisées, sans redondance inutile, partagées' },
          { nom: 'SGBD', texte: 'Le logiciel qui gère la base : MySQL, PostgreSQL…' },
          { nom: 'SQL', texte: 'Le langage pour parler au SGBD' },
        ],
        narration: "Une base de données regroupe des données organisées et partagées. Le SGBD est le logiciel qui la gère, comme MySQL. Et SQL est le langage qu'on utilise pour lui parler.",
      },
      {
        type: 'code',
        titre: 'Ta première requête',
        lignes: ['SELECT *', 'FROM etudiant;'],
        etapes: [
          { ligne: 0, variables: { colonnes: 'toutes' }, note: 'SELECT * : toutes les colonnes' },
          { ligne: 1, variables: { colonnes: 'toutes', table: 'etudiant' }, note: 'FROM : la table à lire' },
          { ligne: 1, variables: { colonnes: 'toutes', table: 'etudiant', lignes: '8' }, sortie: '8 étudiants affichés' },
        ],
        narration: "Ta première requête : SELECT étoile FROM etudiant. Elle affiche toutes les colonnes de la table des étudiants.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Le problème : gérer avec des cahiers ou des fichiers Excel' },
    {
      type: 'texte',
      contenu:
        "Imagine la scolarité d'un établissement qui gère ses étudiants dans un fichier Excel. Pour chaque étudiant, on recopie le nom de sa filière en entier. La comptabilité a son propre fichier, avec à nouveau les noms des étudiants. Le service des examens en a un troisième.",
    },
    {
      type: 'tableau',
      titre: 'Le fichier Excel de la scolarité',
      entetes: ['Matricule', 'Nom', 'Prénom', 'Filière'],
      lignes: [
        ['IDA001', 'Koné', 'Awa', 'Informatique Développeur d\'Application'],
        ['IDA002', 'Traoré', 'Moussa', 'Informatique Développeur d\'Applications'],
        ['IDA003', 'Kouassi', 'Yao', 'Info. Dév. d\'Application'],
      ],
      legende: 'Le nom de la filière est écrit de trois façons différentes : impossible ensuite de compter correctement les étudiants de la filière IDA.',
    },
    {
      type: 'tableau',
      titre: 'Les problèmes de la gestion par fichiers',
      entetes: ['Problème', 'Explication', 'Exemple'],
      lignes: [
        ['Redondance', 'La même information est enregistrée plusieurs fois', 'Le nom d\'un étudiant est dans 3 fichiers différents'],
        ['Incohérence', 'Les copies finissent par se contredire', 'L\'étudiant a changé de numéro dans un fichier, pas dans les autres'],
        ['Partage difficile', 'Deux personnes ne peuvent pas modifier le fichier en même temps', 'La scolarité et la comptabilité s\'écrasent leurs modifications'],
        ['Sécurité faible', 'Tout le monde voit et modifie tout', 'Un stagiaire peut modifier les notes'],
        ['Recherches lentes', 'Il faut tout parcourir à la main', 'Trouver les étudiants de Bouaké ayant plus de 12 en Algo'],
      ],
    },

    { type: 'titre', contenu: '2. La solution : une base de données' },
    {
      type: 'texte',
      contenu:
        "Une **base de données** (BD) est un **ensemble structuré de données**, enregistrées **sans redondance inutile**, et **partagées** par plusieurs utilisateurs et applications. Chaque information n'est enregistrée qu'**une seule fois**, à un seul endroit : le libellé de la filière IDA n'est écrit qu'une fois, et tous les étudiants y font référence.",
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Les bases de données sont partout',
      elements: [
        'Ton opérateur Mobile Money : comptes, soldes, historique des transferts.',
        'Ta banque, la CNPS, les impôts : clients, cotisations, déclarations.',
        'Les sites de vente en ligne : produits, clients, commandes, livraisons.',
        'L\'état civil, les hôpitaux, les écoles… et IDAcademy, pour ta progression !',
      ],
    },

    { type: 'titre', contenu: '3. Le SGBD : le logiciel qui gère la base' },
    {
      type: 'texte',
      contenu:
        "On n'accède jamais directement aux fichiers d'une base de données. On passe par un logiciel spécialisé : le **SGBD** (Système de Gestion de Bases de Données, en anglais **DBMS**). C'est lui qui range les données, les retrouve, les protège et vérifie qu'elles restent cohérentes.",
    },
    {
      type: 'tableau',
      titre: 'Les rôles d\'un SGBD',
      entetes: ['Rôle', 'Ce que ça veut dire'],
      lignes: [
        ['Stocker', 'Enregistrer les données de façon organisée sur le disque'],
        ['Interroger', 'Retrouver rapidement les données demandées (avec le langage SQL)'],
        ['Contrôler l\'intégrité', 'Refuser les données incorrectes : note de 25/20, étudiant dans une filière qui n\'existe pas…'],
        ['Sécuriser', 'Gérer les utilisateurs et leurs droits : qui peut lire, qui peut modifier'],
        ['Partager', 'Permettre à plusieurs personnes de travailler en même temps sans conflit'],
        ['Sauvegarder', 'Protéger les données contre les pannes et permettre de les restaurer'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Des SGBD que tu rencontreras',
      entetes: ['SGBD', 'Caractéristiques'],
      lignes: [
        ['MySQL / MariaDB', 'Gratuit, très utilisé pour les sites web avec PHP'],
        ['PostgreSQL', 'Gratuit, très puissant, utilisé par de grandes applications'],
        ['SQL Server', 'Microsoft, fréquent dans les entreprises et avec C#'],
        ['Oracle', 'Grandes entreprises, banques, administrations'],
        ['SQLite', 'Une base dans un simple fichier : téléphones, petites applications (c\'est lui qui tourne dans cette page !)'],
        ['Access', 'Microsoft Office, pour les petites bases de bureau'],
      ],
    },

    { type: 'titre', contenu: '4. SQL : le langage pour parler au SGBD' },
    {
      type: 'texte',
      contenu:
        "Pour demander quelque chose au SGBD, on écrit une **requête** en **SQL** (Structured Query Language). C'est le même langage pour presque tous les SGBD. La requête la plus simple affiche tout le contenu d'une table : `SELECT *` signifie « toutes les colonnes », et `FROM` indique la table.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Ta première requête : la liste des étudiants',
      requete: 'SELECT *\nFROM etudiant;',
      legende:
        "Clique sur **Exécuter**. Tu peux ensuite remplacer `etudiant` par `filiere`, `matiere` ou `note` pour voir les autres tables de la base d'exemple.",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Ne t\'inquiète pas, tu ne peux rien casser',
      contenu:
        "La base d'exemple est recréée à neuf à chaque exécution. Tu peux faire toutes les erreurs que tu veux : c'est en essayant qu'on apprend le SQL.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'La gestion par fichiers entraîne **redondance**, **incohérence**, partage et sécurité difficiles.',
        'Une **base de données** regroupe des données structurées, sans redondance inutile, partagées.',
        'Le **SGBD** (MySQL, PostgreSQL…) stocke, interroge, contrôle, sécurise, partage et sauvegarde.',
        'On parle au SGBD en **SQL** : `SELECT * FROM table;` affiche toute une table.',
      ],
    },
    {
      type: 'quiz',
      question: 'Le même numéro de téléphone d\'un étudiant est enregistré dans trois fichiers. Comment s\'appelle ce problème ?',
      options: ['La redondance', 'La normalisation', 'L\'intégrité'],
      bonneReponse: 0,
      explication: 'Enregistrer plusieurs fois la même information s\'appelle la redondance. Elle mène souvent à des incohérences.',
    },
    {
      type: 'quiz',
      question: 'Lequel de ces logiciels est un SGBD ?',
      options: ['Excel', 'PostgreSQL', 'Word'],
      bonneReponse: 1,
      explication: 'PostgreSQL est un SGBD. Excel est un tableur : il stocke des données, mais ne gère ni l\'intégrité, ni les droits, ni l\'accès simultané comme un SGBD.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : fichiers ou base de données ?',
      enonce: 'Pour chaque situation, indique quel problème de la gestion par fichiers elle illustre, et comment une base de données le résout.',
      questions: [
        'Le prix d\'un produit a été modifié dans le fichier des ventes, mais pas dans le catalogue.',
        'Deux caissiers enregistrent une vente en même temps, et l\'une des deux disparaît.',
        'N\'importe quel employé peut ouvrir le fichier des salaires.',
      ],
      langage: 'texte',
      solution: `1. Incohérence (due à la redondance : le prix est écrit à deux endroits).
   Avec une BD, le prix n'est enregistré qu'une seule fois, dans la table
   des produits ; les ventes y font référence.

2. Problème de partage (accès simultané).
   Le SGBD gère les accès concurrents : les deux ventes sont enregistrées.

3. Sécurité faible.
   Le SGBD gère des utilisateurs avec des droits : seul le service
   des ressources humaines peut lire la table des salaires.`,
      explication: 'Pour chaque problème, cite le rôle du SGBD qui le résout : c\'est ce qu\'attend le correcteur.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : explorer la base d\'exemple',
      enonce: 'Avec le terminal SQL de la leçon, exécute SELECT * sur chacune des quatre tables de la base « Scolarité », puis réponds.',
      questions: [
        'Combien y a-t-il de filières ? d\'étudiants ? de matières ?',
        'Dans quelle filière est inscrite Mariam Ouattara ?',
        'Quel est le coefficient de la Base de données ?',
      ],
      langage: 'texte',
      solution: `1. 3 filières (IDA, FCGE, GEC), 8 étudiants, 4 matières.
2. Dans la filière GEC (code_filiere = 'GEC'), c'est-à-dire Gestion Commerciale.
3. Le coefficient de la Base de données (code BD) est 3.`,
      explication:
        "Pour la question 2, la table etudiant ne contient que le code de la filière (GEC). Son libellé est dans la table filiere. C'est exactement le principe d'une base de données : le libellé n'est écrit qu'une fois.",
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La pharmacie du quartier',
      enonce:
        "Une pharmacie de Treichville enregistre ses ventes dans un cahier, et son stock dans un fichier Excel tenu par le gérant. Les vendeurs notent le nom du médicament et le prix à chaque vente. En fin de journée, le gérant met à jour le stock à partir du cahier.",
      questions: [
        'Relève trois inconvénients de cette organisation.',
        'Le gérant envisage une base de données. Définis ce terme.',
        'Cite quatre rôles du SGBD qui seraient utiles à cette pharmacie, en les illustrant par un exemple.',
        'Propose un SGBD adapté et justifie ton choix.',
      ],
      langage: 'texte',
      solution: `1. Inconvénients (trois parmi) :
   - Redondance : le nom et le prix des médicaments sont recopiés à chaque vente.
   - Incohérence et erreurs : un vendeur peut écrire un mauvais prix ou un nom
     mal orthographié ; le stock du fichier ne correspond plus à la réalité.
   - Stock jamais à jour en journée : impossible de savoir en temps réel
     si un médicament est disponible.
   - Perte de temps : recopie du cahier dans Excel chaque soir.
   - Sécurité : le cahier peut être perdu, abîmé ou modifié.

2. Une base de données est un ensemble structuré de données, enregistrées
   sans redondance inutile et partagées par plusieurs utilisateurs.

3. Rôles du SGBD :
   - Stocker : chaque médicament et son prix enregistrés une seule fois.
   - Contrôler l'intégrité : refuser une vente d'un médicament inexistant
     ou une quantité négative.
   - Partager : plusieurs vendeurs enregistrent des ventes en même temps.
   - Sécuriser : seul le gérant peut modifier les prix.
   - Sauvegarder : les données ne sont pas perdues en cas de panne.

4. MySQL (ou PostgreSQL) : gratuit, fiable, adapté à plusieurs utilisateurs
   en même temps, et utilisable avec une application web ou de bureau.`,
      explication:
        "Dans ce type de question, rattache toujours ta réponse au cas présenté (médicaments, vendeurs, gérant) au lieu de réciter le cours. Une réponse générale rapporte moins de points.",
    },
  ],
  exercice: {
    id: 'sql-premiere-requete',
    titre: 'Afficher les filières',
    consigne: 'Écris une requête qui affiche tout le contenu de la table filiere.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Affiche toutes les colonnes de la table filiere\n\n',
    indice: 'SELECT * FROM nom_de_la_table;',
    solution: 'SELECT *\nFROM filiere;',
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'tables-lignes-colonnes',
  titre: 'Tables, lignes et colonnes',
  duree: '20 min',
  objectifs: [
    'Maîtriser le vocabulaire du modèle relationnel',
    'Écrire un schéma relationnel',
    'Choisir les types de données SQL',
    'Afficher seulement certaines colonnes et certaines lignes',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Tables, lignes et colonnes', sousTitre: 'Le résumé en 1 minute 30', narration: 'Tables, lignes et colonnes : le vocabulaire du modèle relationnel.' },
      {
        type: 'comparaison',
        titre: 'Trois mots, plusieurs noms',
        colonnes: [
          { nom: 'Table', texte: 'aussi appelée relation' },
          { nom: 'Ligne', texte: 'tuple, enregistrement, occurrence' },
          { nom: 'Colonne', texte: 'attribut, champ' },
        ],
        narration: "Une table s'appelle aussi une relation. Une ligne est un tuple ou un enregistrement. Une colonne est un attribut ou un champ.",
      },
      {
        type: 'points',
        titre: 'Le schéma relationnel',
        points: ['ETUDIANT(matricule, nom, prenom, #code_filiere)', 'Clé primaire soulignée', 'Clé étrangère précédée de #'],
        narration: "On décrit une table par son schéma : son nom, puis ses colonnes entre parenthèses. La clé primaire est soulignée, et la clé étrangère est précédée d'un dièse.",
      },
      {
        type: 'code',
        titre: 'Choisir ses colonnes et ses lignes',
        lignes: ['SELECT nom, prenom', 'FROM etudiant', "WHERE ville = 'Abidjan';"],
        etapes: [
          { ligne: 0, variables: { colonnes: '2' }, note: 'Seulement nom et prénom' },
          { ligne: 1, variables: { colonnes: '2', table: 'etudiant' } },
          { ligne: 2, variables: { colonnes: '2', table: 'etudiant', lignes: '4' }, sortie: '4 étudiants d\'Abidjan', note: 'WHERE garde seulement certaines lignes' },
        ],
        narration: "Après SELECT, on choisit les colonnes. Et avec WHERE, on ne garde que les lignes qui respectent une condition, par exemple les étudiants d'Abidjan.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Une base relationnelle est faite de tables' },
    {
      type: 'texte',
      contenu:
        "Dans le **modèle relationnel**, inventé par Edgar F. Codd en 1970 et utilisé par presque tous les SGBD actuels, les données sont rangées dans des **tables** à deux dimensions, comme des tableaux : chaque **ligne** décrit un élément (un étudiant), chaque **colonne** décrit une caractéristique (son nom, sa ville…).",
    },
    {
      type: 'tableau',
      titre: 'La table ETUDIANT (extrait)',
      entetes: ['matricule', 'nom', 'prenom', 'ville', 'code_filiere'],
      lignes: [
        ['IDA001', 'Koné', 'Awa', 'Abidjan', 'IDA'],
        ['IDA002', 'Traoré', 'Moussa', 'Bouaké', 'IDA'],
        ['FCG001', 'N\'Guessan', 'Aya', 'Abidjan', 'FCGE'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Le vocabulaire',
      entetes: ['Terme courant', 'Terme du modèle relationnel', 'Autres noms', 'Dans l\'exemple'],
      lignes: [
        ['Table', 'Relation', '—', 'ETUDIANT'],
        ['Ligne', 'Tuple (ou n-uplet)', 'Enregistrement, occurrence', 'IDA001, Koné, Awa, Abidjan, IDA'],
        ['Colonne', 'Attribut', 'Champ', 'ville'],
        ['Ensemble des valeurs possibles d\'une colonne', 'Domaine', '—', 'sexe : {M, F}'],
        ['Nombre de colonnes', 'Degré', '—', '5'],
        ['Nombre de lignes', 'Cardinalité', '—', '3'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Trois règles d\'une table relationnelle',
      elements: [
        'Chaque **case** contient **une seule valeur** (pas deux numéros de téléphone dans la même case).',
        'Deux lignes ne peuvent pas être **identiques** : chaque ligne est identifiée par une clé (leçon suivante).',
        'L\'**ordre** des lignes et des colonnes n\'a pas d\'importance.',
      ],
    },

    { type: 'titre', contenu: '2. Le schéma relationnel' },
    {
      type: 'texte',
      contenu:
        "Pour décrire la structure d'une base sans montrer ses données, on écrit son **schéma relationnel** : pour chaque table, son **nom** (souvent en majuscules) suivi de la liste de ses **attributs** entre parenthèses. La **clé primaire** est **soulignée**, et les **clés étrangères** sont précédées d'un **#**. C'est la notation demandée au BTS.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Schéma relationnel de la base « Scolarité »',
      code: `FILIERE (code_filiere, libelle)
ETUDIANT (matricule, nom, prenom, sexe, date_naissance, ville, #code_filiere)
MATIERE (code_matiere, libelle, coefficient)
NOTE (#matricule, #code_matiere, note)`,
      legende:
        "Dans une copie, on souligne les clés primaires : code_filiere, matricule, code_matiere, et le couple (matricule, code_matiere) pour NOTE. Ici, le soulignement ne peut pas s'afficher dans le bloc de code : retiens qu'il s'agit du premier attribut de chaque table.",
    },

    { type: 'titre', contenu: '3. Les types de données en SQL' },
    {
      type: 'texte',
      contenu: 'Chaque colonne a un **type**, comme les variables en algorithmique. Voici les plus utilisés, avec leur équivalent en algorithmique :',
    },
    {
      type: 'tableau',
      entetes: ['Type SQL', 'Contient', 'Équivalent algorithmique', 'Exemple'],
      lignes: [
        ['INT (INTEGER)', 'Nombre entier', 'entier', 'quantite, age'],
        ['DECIMAL(p, d)', 'Nombre décimal exact (p chiffres dont d après la virgule)', 'réel', 'prix DECIMAL(10, 2)'],
        ['VARCHAR(n)', 'Texte de longueur variable, n caractères maximum', 'chaîne', 'nom VARCHAR(50)'],
        ['CHAR(n)', 'Texte de longueur fixe', 'caractère / chaîne', 'sexe CHAR(1)'],
        ['DATE', 'Une date (format AAAA-MM-JJ)', '—', 'date_naissance'],
        ['BOOLEAN', 'Vrai ou faux', 'booléen', 'paye'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'La valeur NULL',
      contenu:
        "Quand une case n'a pas de valeur (information inconnue ou pas encore saisie), elle contient **NULL**. NULL ne veut pas dire 0 ni texte vide : il veut dire « pas de valeur ». On verra qu'on peut interdire NULL dans une colonne avec `NOT NULL`.",
    },

    { type: 'titre', contenu: '4. Choisir les colonnes et les lignes à afficher' },
    {
      type: 'texte',
      contenu:
        "Plutôt que `SELECT *`, on peut **choisir les colonnes** à afficher en les listant après SELECT, séparées par des virgules. C'est ce qu'on appelle une **projection**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Projection : seulement le nom et le prénom',
      requete: 'SELECT nom, prenom\nFROM etudiant;',
    },
    {
      type: 'texte',
      contenu:
        "On peut aussi **garder seulement certaines lignes** avec `WHERE` suivi d'une condition, comme un Si en algorithmique. C'est ce qu'on appelle une **sélection**. Les textes s'écrivent entre **apostrophes** : `'Abidjan'`.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Sélection : les étudiants d\'Abidjan',
      requete: "SELECT nom, prenom, ville\nFROM etudiant\nWHERE ville = 'Abidjan';",
      legende: "Essaie de remplacer 'Abidjan' par 'Bouaké', ou d'ajouter `AND sexe = 'F'` à la fin de la condition. Les requêtes SELECT seront étudiées en détail au chapitre 5.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Table = **relation** ; ligne = **tuple** (enregistrement) ; colonne = **attribut** (champ).',
        'Degré = nombre de colonnes ; cardinalité = nombre de lignes.',
        'Schéma relationnel : `TABLE (clé soulignée, attribut, #clé_étrangère)`.',
        '`SELECT col1, col2 FROM table WHERE condition;` choisit les colonnes et les lignes.',
      ],
    },
    {
      type: 'quiz',
      question: 'La table MATIERE de la base d\'exemple a 3 colonnes et 4 lignes. Quel est son degré ?',
      options: ['3', '4', '12'],
      bonneReponse: 0,
      explication: 'Le degré est le nombre de colonnes (attributs) : 3. La cardinalité, c\'est le nombre de lignes : 4.',
    },
    {
      type: 'quiz',
      question: 'Quel type SQL choisir pour un prix en francs CFA avec TVA, qui peut avoir des centimes après calcul ?',
      options: ['VARCHAR(10)', 'DECIMAL(10, 2)', 'BOOLEAN'],
      bonneReponse: 1,
      explication: 'Un montant est un nombre sur lequel on calcule : DECIMAL(10, 2) permet jusqu\'à 10 chiffres dont 2 après la virgule.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : vocabulaire',
      enonce: 'Voici une table :\n\nCLIENT\n| code | nom      | telephone  | ville    |\n| C01  | Bamba    | 0707070707 | Abidjan  |\n| C02  | Koffi    | 0505050505 | Daloa    |\n| C03  | Soro     | 0101010101 | Korhogo  |\n| C04  | Gnagne   | 0708080808 | Abidjan  |',
      questions: ['Quel est le nom de la relation ?', 'Cite ses attributs.', 'Quel est son degré ? sa cardinalité ?', 'Écris un tuple de cette relation.', 'Écris son schéma relationnel.'],
      langage: 'texte',
      solution: `1. CLIENT
2. code, nom, telephone, ville
3. Degré : 4 (colonnes) ; cardinalité : 4 (lignes)
4. Par exemple : (C02, Koffi, 0505050505, Daloa)
5. CLIENT (code, nom, telephone, ville)   — avec code souligné`,
      explication: 'Attention à ne pas confondre degré (colonnes) et cardinalité (lignes) : ici les deux valent 4, ce qui est un piège classique.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : choisir les types',
      enonce: 'Propose un type SQL pour chaque colonne de la table PRODUIT(reference, designation, prix_unitaire, quantite_stock, date_peremption, disponible).',
      langage: 'texte',
      solution: `reference        VARCHAR(10)     (lettres et chiffres, pas de calcul)
designation      VARCHAR(100)
prix_unitaire    DECIMAL(10, 2)
quantite_stock   INT
date_peremption  DATE
disponible       BOOLEAN`,
      explication: 'Même raisonnement qu\'en algorithmique : on calcule avec ? → nombre ; une date → DATE ; oui/non → BOOLEAN ; sinon → texte.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La bibliothèque de l\'établissement',
      enonce:
        "La bibliothèque veut informatiser ses prêts. Un livre est identifié par un code et possède un titre, un auteur et une année de parution. Un lecteur est identifié par un numéro de carte et possède un nom, un prénom et un numéro de téléphone. Lors d'un prêt, on enregistre le livre, le lecteur, la date de prêt et la date de retour (inconnue tant que le livre n'est pas rendu).",
      questions: [
        'Propose le schéma relationnel de cette base (trois tables).',
        'Pour la table des prêts, indique le type SQL de chaque colonne.',
        'Quelle valeur contiendra la date de retour d\'un livre pas encore rendu ?',
        'Écris la requête qui affiche le titre et l\'auteur de tous les livres.',
      ],
      langage: 'texte',
      solution: `1. LIVRE (code_livre, titre, auteur, annee_parution)
   LECTEUR (num_carte, nom, prenom, telephone)
   PRET (#code_livre, #num_carte, date_pret, date_retour)
   (clés primaires soulignées : code_livre ; num_carte ;
    pour PRET : code_livre + num_carte + date_pret, car un même lecteur
    peut emprunter plusieurs fois le même livre à des dates différentes)

2. code_livre   VARCHAR(10)
   num_carte    VARCHAR(10)
   date_pret    DATE
   date_retour  DATE

3. NULL : la date de retour n'est pas encore connue.

4. SELECT titre, auteur
   FROM livre;`,
      explication:
        "La question de la clé de PRET est souvent mal traitée : si la clé était seulement (code_livre, num_carte), un lecteur ne pourrait jamais réemprunter le même livre. Ajouter la date de prêt règle le problème. On approfondit les clés dans la leçon suivante.",
    },
  ],
  exercice: {
    id: 'sql-projection-matiere',
    titre: 'Les matières et leurs coefficients',
    consigne: 'Affiche seulement le libellé et le coefficient de toutes les matières.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Affiche libelle et coefficient de la table matiere\n\n',
    indice: 'SELECT colonne1, colonne2 FROM matiere;',
    solution: 'SELECT libelle, coefficient\nFROM matiere;',
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'cles-et-contraintes',
  titre: 'Clés primaires, clés étrangères et contraintes',
  duree: '25 min',
  objectifs: [
    'Choisir une clé primaire (simple ou composée)',
    'Relier deux tables avec une clé étrangère',
    'Connaître les trois contraintes d\'intégrité',
    'Voir le SGBD refuser des données incorrectes',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les clés et les contraintes', sousTitre: 'Le résumé en 2 minutes', narration: 'Clés primaires, clés étrangères et contraintes, en deux minutes.' },
      {
        type: 'points',
        titre: 'La clé primaire',
        points: ['Identifie chaque ligne de façon unique', 'Jamais vide (pas de NULL)', 'Stable : elle ne change pas', 'Peut être composée de plusieurs colonnes'],
        narration: "La clé primaire identifie chaque ligne de façon unique. Elle n'est jamais vide, elle ne change pas, et elle peut être composée de plusieurs colonnes.",
      },
      {
        type: 'code',
        titre: 'La clé étrangère',
        lignes: ['ETUDIANT (matricule, nom, #code_filiere)', 'FILIERE (code_filiere, libelle)'],
        etapes: [
          { ligne: 0, variables: { code_filiere: 'IDA' }, note: 'L\'étudiant pointe vers une filière' },
          { ligne: 1, variables: { code_filiere: 'IDA', libelle: 'Informatique…' }, note: 'La valeur doit exister dans FILIERE' },
        ],
        narration: "La clé étrangère relie deux tables. Le code filière d'un étudiant doit correspondre à une filière qui existe vraiment dans la table filière.",
      },
      {
        type: 'comparaison',
        titre: 'Les 3 contraintes d\'intégrité',
        colonnes: [
          { nom: 'Domaine', texte: 'Une valeur autorisée : note entre 0 et 20' },
          { nom: 'Entité', texte: 'Clé primaire unique et non nulle' },
          { nom: 'Référentielle', texte: 'Une clé étrangère pointe vers une ligne qui existe' },
        ],
        narration: "Le SGBD vérifie trois contraintes : de domaine, pour les valeurs autorisées ; d'entité, pour la clé primaire ; et référentielle, pour les clés étrangères.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La clé primaire : identifier chaque ligne' },
    {
      type: 'texte',
      contenu:
        "Dans une classe, deux étudiants peuvent s'appeler « Kouassi Yao ». Comment les distinguer ? Grâce à leur **matricule**, qui est différent pour chacun. En base de données, la colonne (ou le groupe de colonnes) qui identifie **chaque ligne de façon unique** s'appelle la **clé primaire** (en anglais *primary key*).",
    },
    {
      type: 'tableau',
      titre: 'Les qualités d\'une clé primaire',
      entetes: ['Qualité', 'Explication', 'Bon exemple', 'Mauvais exemple'],
      lignes: [
        ['Unique', 'Deux lignes ne peuvent pas avoir la même valeur', 'matricule', 'nom (homonymes)'],
        ['Non nulle', 'Elle a toujours une valeur', 'numéro de facture', 'e-mail (tout le monde n\'en a pas)'],
        ['Stable', 'Elle ne change pas au cours du temps', 'code produit', 'numéro de téléphone (peut changer)'],
        ['Courte', 'Simple à saisir et à utiliser', 'IDA001', 'nom + prénom + date de naissance'],
      ],
    },
    {
      type: 'texte',
      contenu:
        "Parfois, une seule colonne ne suffit pas. Dans la table NOTE, un étudiant a plusieurs notes (une par matière) et une matière a plusieurs notes (une par étudiant). Ce qui est unique, c'est le **couple** (matricule, code_matiere) : un étudiant n'a qu'une note par matière. On parle de **clé primaire composée**.",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Une table avec une clé composée',
      requete: "SELECT *\nFROM note\nWHERE matricule = 'IDA001';",
      legende: 'IDA001 apparaît plusieurs fois, ALGO aussi dans toute la table, mais le couple (IDA001, ALGO) n\'apparaît qu\'une fois.',
    },
    {
      type: 'texte',
      contenu: 'Le SGBD **refuse** d\'enregistrer deux lignes avec la même clé primaire. Essaie d\'ajouter un étudiant avec un matricule qui existe déjà :',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Le SGBD refuse un doublon',
      requete: "INSERT INTO etudiant (matricule, nom, prenom, sexe, ville, code_filiere)\nVALUES ('IDA001', 'Zadi', 'Serge', 'M', 'Gagnoa', 'IDA');",
      legende: "Le matricule IDA001 est déjà celui d'Awa Koné : l'insertion est refusée. Remplace IDA001 par IDA005 et réexécute : cette fois, ça marche.",
    },

    { type: 'titre', contenu: '2. La clé étrangère : relier les tables' },
    {
      type: 'texte',
      contenu:
        "Dans la table ETUDIANT, la colonne `code_filiere` ne contient pas le libellé de la filière, mais son **code**, qui renvoie à une ligne de la table FILIERE. Une colonne qui fait **référence à la clé primaire d'une autre table** s'appelle une **clé étrangère** (*foreign key*). On la note avec un **#** dans le schéma relationnel.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: `FILIERE (code_filiere, libelle)
ETUDIANT (matricule, nom, prenom, …, #code_filiere)
                                       └── fait référence à FILIERE.code_filiere`,
    },
    {
      type: 'texte',
      contenu:
        "Grâce à la clé étrangère, le libellé « Informatique Développeur d'Application » n'est écrit **qu'une seule fois**, dans FILIERE. Pour afficher les étudiants avec le libellé de leur filière, on **relie** les deux tables : c'est une **jointure** (chapitre 6).",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Aperçu : une jointure grâce à la clé étrangère',
      requete: 'SELECT etudiant.nom, etudiant.prenom, filiere.libelle\nFROM etudiant, filiere\nWHERE etudiant.code_filiere = filiere.code_filiere;',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Une clé étrangère peut se répéter',
      contenu:
        "Contrairement à la clé primaire, une clé étrangère n'est pas unique : beaucoup d'étudiants ont `IDA` comme code_filiere. C'est normal, c'est même tout l'intérêt : plusieurs étudiants appartiennent à la même filière.",
    },

    { type: 'titre', contenu: '3. Les contraintes d\'intégrité' },
    {
      type: 'texte',
      contenu:
        "Les **contraintes d'intégrité** sont des règles que les données doivent toujours respecter. Le SGBD les vérifie **automatiquement** à chaque ajout ou modification, et refuse ce qui ne les respecte pas. Il en existe trois grandes familles :",
    },
    {
      type: 'tableau',
      entetes: ['Contrainte', 'Règle', 'Exemple de refus'],
      lignes: [
        ['De domaine', 'Chaque valeur appartient au domaine de sa colonne (type, plage, liste)', 'Une note de 25 ; un sexe « X »'],
        ['D\'entité (ou de clé)', 'La clé primaire est unique et jamais NULL', 'Deux étudiants avec le matricule IDA001'],
        ['Référentielle', 'Une clé étrangère contient une valeur qui existe dans la table référencée (ou NULL)', 'Un étudiant dans la filière « MEDECINE », qui n\'existe pas'],
      ],
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Contrainte de domaine : une note de 25/20',
      requete: "INSERT INTO note (matricule, code_matiere, note)\nVALUES ('IDA001', 'COMPTA', 25);",
      legende: 'La table note a une contrainte CHECK (note BETWEEN 0 AND 20). Remplace 25 par 14 : l\'insertion est acceptée.',
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Contrainte référentielle : une filière qui n\'existe pas',
      requete: "INSERT INTO etudiant (matricule, nom, prenom, sexe, ville, code_filiere)\nVALUES ('MED001', 'Aka', 'Paul', 'M', 'Abidjan', 'MEDECINE');",
      legende: "La filière MEDECINE n'est pas dans la table FILIERE : le SGBD refuse. Conséquence importante : il faut toujours créer la filière **avant** d'y inscrire des étudiants.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'La **clé primaire** identifie chaque ligne : unique, non nulle, stable. Elle peut être **composée**.',
        'Une **clé étrangère** (#) fait référence à la clé primaire d\'une autre table ; elle peut se répéter.',
        'Contraintes : **de domaine** (valeurs permises), **d\'entité** (clé primaire), **référentielle** (clé étrangère).',
        'Ordre d\'insertion : d\'abord la table référencée (FILIERE), puis celle qui y fait référence (ETUDIANT).',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle colonne ferait la meilleure clé primaire pour une table CLIENT d\'un opérateur téléphonique ?',
      options: ['Le nom du client', 'Un numéro client attribué par l\'opérateur', 'La ville du client'],
      bonneReponse: 1,
      explication: 'Le nom peut avoir des homonymes et la ville se répète. Un numéro client attribué par l\'entreprise est unique, toujours renseigné et stable.',
    },
    {
      type: 'quiz',
      question: 'On essaie d\'enregistrer une note pour un matricule qui n\'existe pas dans ETUDIANT. Quelle contrainte est violée ?',
      options: ['De domaine', 'D\'entité', 'Référentielle'],
      bonneReponse: 2,
      explication: 'matricule est une clé étrangère dans NOTE : sa valeur doit exister dans la table ETUDIANT. C\'est la contrainte référentielle.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : repérer les clés',
      enonce:
        'Pour chaque table de ce schéma, indique la clé primaire et les clés étrangères.\n\nCLIENT (num_client, nom, telephone)\nCOMMANDE (num_commande, date_commande, num_client)\nPRODUIT (ref_produit, designation, prix)\nLIGNE_COMMANDE (num_commande, ref_produit, quantite)',
      langage: 'texte',
      solution: `CLIENT : clé primaire num_client ; pas de clé étrangère.
COMMANDE : clé primaire num_commande ; clé étrangère #num_client → CLIENT.
PRODUIT : clé primaire ref_produit ; pas de clé étrangère.
LIGNE_COMMANDE : clé primaire composée (num_commande, ref_produit) ;
  clés étrangères #num_commande → COMMANDE et #ref_produit → PRODUIT.

Schéma noté :
CLIENT (num_client, nom, telephone)
COMMANDE (num_commande, date_commande, #num_client)
PRODUIT (ref_produit, designation, prix)
LIGNE_COMMANDE (#num_commande, #ref_produit, quantite)`,
      explication:
        "Dans LIGNE_COMMANDE, chaque colonne de la clé primaire est aussi une clé étrangère. C'est très fréquent : c'est la table qui relie une commande à ses produits, avec la quantité.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : accepté ou refusé ?',
      enonce:
        "Dans la base « Scolarité », dis si chaque insertion est acceptée ou refusée, et pourquoi. Vérifie ensuite tes réponses avec le terminal SQL.",
      questions: [
        "INSERT INTO filiere VALUES ('LOG', 'Logistique');",
        "INSERT INTO filiere VALUES ('IDA', 'Informatique');",
        "INSERT INTO note VALUES ('GEC002', 'ALGO', 12);",
        "INSERT INTO note VALUES ('XYZ999', 'ALGO', 12);",
        "INSERT INTO etudiant (matricule, nom, prenom, sexe) VALUES ('LOG001', 'Kra', 'Ange', 'H');",
      ],
      langage: 'texte',
      solution: `1. Acceptée : LOG n'existe pas encore.
2. Refusée : IDA existe déjà (contrainte d'entité : doublon de clé primaire).
3. Acceptée : GEC002 et ALGO existent, et ce couple n'a pas encore de note.
4. Refusée : l'étudiant XYZ999 n'existe pas (contrainte référentielle).
5. Refusée : le sexe doit être 'M' ou 'F' (contrainte de domaine, CHECK).`,
      explication: 'Tu peux coller chaque requête dans le terminal de la leçon pour voir le message du SGBD.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La gestion d\'une agence de location de voitures',
      enonce:
        "On donne le schéma relationnel suivant d'une agence de location de voitures à Abidjan :\n\nCATEGORIE (code_cat, libelle, tarif_jour)\nVOITURE (immatriculation, marque, modele, #code_cat)\nCLIENT (num_client, nom, prenom, num_permis, telephone)\nLOCATION (num_location, date_debut, date_fin, #immatriculation, #num_client)",
      questions: [
        'Pour chaque table, indique la clé primaire et justifie le choix de celle de VOITURE.',
        'Liste les clés étrangères et la table à laquelle chacune fait référence.',
        'Dans quel ordre faut-il remplir les tables ? Justifie.',
        'Pour chacune des trois contraintes d\'intégrité, donne un exemple d\'opération que le SGBD refuserait dans cette base.',
        'Un client peut-il louer plusieurs voitures ? Une voiture peut-elle être louée plusieurs fois ? Justifie à partir du schéma.',
      ],
      langage: 'texte',
      solution: `1. CATEGORIE : code_cat ; VOITURE : immatriculation ; CLIENT : num_client ;
   LOCATION : num_location.
   L'immatriculation est unique pour chaque voiture, toujours renseignée
   et ne change pas : c'est une bonne clé primaire.

2. VOITURE.#code_cat → CATEGORIE
   LOCATION.#immatriculation → VOITURE
   LOCATION.#num_client → CLIENT

3. D'abord CATEGORIE et CLIENT (ils ne font référence à aucune table),
   puis VOITURE (référence CATEGORIE), enfin LOCATION (référence VOITURE
   et CLIENT). Une clé étrangère ne peut contenir qu'une valeur qui existe
   déjà dans la table référencée (contrainte référentielle).

4. - Domaine : un tarif_jour négatif, ou une date_fin écrite « demain ».
   - Entité : deux voitures avec la même immatriculation.
   - Référentielle : une location pour le client n° 9999 qui n'existe pas,
     ou la suppression d'une catégorie encore utilisée par des voitures.

5. Oui aux deux : num_client et immatriculation sont des clés étrangères
   dans LOCATION, donc ils peuvent se répéter. Un même client apparaît
   dans plusieurs lignes de LOCATION, et une même voiture aussi.`,
      explication:
        "La question 5 teste la compréhension profonde des clés étrangères : une valeur qui peut se répéter dans une table permet le « plusieurs ». Ce raisonnement prépare directement les cardinalités du MCD en Merise.",
    },
  ],
  exercice: {
    id: 'sql-notes-etudiant',
    titre: 'Les notes d\'un étudiant',
    consigne: "Affiche toutes les notes (toutes les colonnes) de l'étudiant de matricule IDA003.",
    langage: 'sql',
    base: 'scolarite',
    codeDepart: "-- Utilise WHERE pour ne garder que les lignes de IDA003\nSELECT *\nFROM note\n",
    indice: "WHERE matricule = 'IDA003' (le texte entre apostrophes)",
    solution: "SELECT *\nFROM note\nWHERE matricule = 'IDA003';",
  },
}

export const leconsModeleRelationnel: Lecon[] = [lecon1, lecon2, lecon3]

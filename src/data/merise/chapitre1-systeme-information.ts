import type { Lecon } from '../types'

/*
 * Méthodologie Merise — Chapitre 1 : Le système d'information
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'entreprise-et-systeme-information',
  titre: "L'entreprise et son système d'information",
  duree: '20 min',
  objectifs: [
    'Voir l\'entreprise comme un système composé de trois sous-systèmes',
    'Définir le système d\'information et ses quatre fonctions',
    'Distinguer système d\'information et système informatique',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: "Le système d'information", sousTitre: 'Le résumé en 1 minute 30', narration: "L'entreprise et son système d'information, en une minute trente." },
      {
        type: 'comparaison',
        titre: 'Les 3 sous-systèmes',
        colonnes: [
          { nom: 'Pilotage', texte: 'Décide : la direction, les objectifs' },
          { nom: 'Information', texte: 'Mémorise et fait circuler l\'information' },
          { nom: 'Opérant', texte: 'Produit : fabrique, vend, livre' },
        ],
        narration: "Toute entreprise est un système composé de trois sous-systèmes. Le système de pilotage décide. Le système opérant produit. Et entre les deux, le système d'information mémorise et fait circuler l'information.",
      },
      {
        type: 'points',
        titre: 'Les 4 fonctions du SI',
        points: ['Collecter l\'information', 'Mémoriser (stocker)', 'Traiter (calculer, trier)', 'Diffuser (transmettre)'],
        narration: "Le système d'information a quatre fonctions : collecter, mémoriser, traiter et diffuser l'information.",
      },
      {
        type: 'comparaison',
        titre: 'Ne pas confondre',
        colonnes: [
          { nom: 'Système d\'information', texte: 'Toute l\'information de l\'entreprise, avec ou sans ordinateur' },
          { nom: 'Système informatique', texte: 'La partie automatisée : matériels, logiciels, réseaux' },
        ],
        narration: "Ne confonds pas le système d'information, qui existe même sans ordinateur, et le système informatique, qui n'en est que la partie automatisée.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. L\'entreprise vue comme un système' },
    {
      type: 'texte',
      contenu:
        "Merise s'appuie sur l'**approche systémique** : on regarde l'entreprise comme un **système**, c'est-à-dire un ensemble d'éléments qui travaillent ensemble pour atteindre un objectif. Ce système reçoit des **entrées** de son environnement (commandes, matières premières, argent), les transforme, et produit des **sorties** (produits, services, factures).",
    },
    {
      type: 'texte',
      contenu: 'À l\'intérieur, on distingue **trois sous-systèmes** :',
    },
    {
      type: 'tableau',
      entetes: ['Sous-système', 'Rôle', 'Exemple dans un supermarché'],
      lignes: [
        ['Système de pilotage (ou de décision)', 'Fixe les objectifs, prend les décisions, contrôle les résultats', 'Le directeur décide des prix, des promotions, des commandes aux fournisseurs'],
        ['Système d\'information', 'Mémorise les informations et les fait circuler entre les deux autres', 'Le fichier des produits, l\'état des stocks, les tickets de caisse, les rapports de ventes'],
        ['Système opérant (ou opérationnel)', 'Réalise l\'activité de l\'entreprise : produire, vendre, livrer', 'Les caissiers, les magasiniers, les livreurs'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Comment circule l\'information',
      code: `        ┌──────────────────────┐
        │ SYSTÈME DE PILOTAGE  │   décide
        └──────────┬───────────┘
          décisions ↓   ↑ informations de synthèse
        ┌──────────────────────┐
        │ SYSTÈME D'INFORMATION│   mémorise, traite
        └──────────┬───────────┘
        instructions ↓   ↑ informations de terrain
        ┌──────────────────────┐
        │  SYSTÈME OPÉRANT     │   produit, vend
        └──────────────────────┘`,
      legende:
        "Le système opérant remonte les informations de terrain (ventes du jour, stock restant) ; le SI les traite et présente une synthèse au pilotage ; le pilotage prend une décision (commander du riz), qui redescend vers le système opérant.",
    },

    { type: 'titre', contenu: '2. Le système d\'information (SI)' },
    {
      type: 'texte',
      contenu:
        "Le **système d'information** est l'ensemble des **moyens** (personnes, matériels, logiciels, procédures, données) qui permettent de **collecter, mémoriser, traiter et diffuser** l'information utile au fonctionnement de l'entreprise.",
    },
    {
      type: 'tableau',
      titre: 'Les quatre fonctions du SI',
      entetes: ['Fonction', 'Signification', 'Exemple dans une école'],
      lignes: [
        ['Collecter', 'Recueillir les informations à la source', 'Remplir la fiche d\'inscription d\'un nouvel étudiant'],
        ['Mémoriser', 'Conserver les informations dans le temps', 'Enregistrer les notes de chaque devoir dans la base de données'],
        ['Traiter', 'Transformer les informations : calculer, trier, rechercher', 'Calculer les moyennes et le classement'],
        ['Diffuser', 'Transmettre l\'information à ceux qui en ont besoin', 'Imprimer les bulletins, envoyer les résultats par SMS'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'SI ≠ système informatique',
      contenu:
        "Un système d'information existe **même sans ordinateur** : une boutique qui note ses ventes dans un cahier a un SI. Le **système informatique** n'est que la **partie automatisée** du SI : ordinateurs, logiciels, réseaux, bases de données. Le travail du développeur, avec Merise, est justement d'informatiser tout ou partie du SI.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'L\'entreprise est un **système** composé de trois sous-systèmes : **pilotage**, **information**, **opérant**.',
        'Le **SI** relie le pilotage et l\'opérant ; il **collecte, mémorise, traite et diffuse** l\'information.',
        'Le **système informatique** est la partie automatisée du SI.',
      ],
    },
    {
      type: 'quiz',
      question: 'Dans une pharmacie, le pharmacien titulaire qui décide d\'ouvrir le dimanche fait partie du…',
      options: ['Système opérant', 'Système de pilotage', 'Système d\'information'],
      bonneReponse: 1,
      explication: 'Prendre une décision qui oriente l\'activité de l\'entreprise relève du système de pilotage.',
    },
    {
      type: 'quiz',
      question: 'Calculer le total des ventes de la semaine correspond à quelle fonction du SI ?',
      options: ['Collecter', 'Traiter', 'Diffuser'],
      bonneReponse: 1,
      explication: 'Un calcul transforme des informations existantes : c\'est un traitement.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : classer les éléments',
      enonce: 'Dans une entreprise de transport de voyageurs (gare routière d\'Adjamé), classe chaque élément dans le bon sous-système.',
      questions: [
        'Le chauffeur qui conduit le car vers Bouaké',
        'Le directeur qui décide d\'ajouter un départ à 6 h',
        'Le registre des billets vendus',
        'Le guichetier qui vend les billets',
        'Le tableau des recettes de la semaine',
      ],
      langage: 'texte',
      solution: `1. Système opérant (il réalise l'activité : transporter)
2. Système de pilotage (décision)
3. Système d'information (mémorisation)
4. Système opérant (activité de vente)… et il collecte aussi l'information
   pour le SI en enregistrant chaque billet.
5. Système d'information (traitement et diffusion vers le pilotage)`,
      explication:
        "Une même personne peut avoir un pied dans deux sous-systèmes : le guichetier vend (opérant) et saisit les ventes (collecte pour le SI). À l'examen, explique cette nuance plutôt que de forcer une seule réponse.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : les fonctions du SI',
      enonce: 'Dans une agence Mobile Money, donne un exemple concret pour chacune des quatre fonctions du système d\'information.',
      langage: 'texte',
      solution: `- Collecter : l'agent saisit le numéro du client et le montant du dépôt.
- Mémoriser : la transaction est enregistrée dans la base de données de l'opérateur.
- Traiter : le nouveau solde du client et la commission de l'agent sont calculés.
- Diffuser : le client reçoit un SMS de confirmation avec son nouveau solde.`,
      explication: 'Les exemples doivent suivre l\'ordre naturel de l\'information : elle entre (collecte), elle est gardée (mémorisation), transformée (traitement), puis transmise (diffusion).',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La société de distribution de boissons',
      enonce:
        "La société DISTRI-CI, installée à Koumassi, livre des boissons aux maquis et restaurants d'Abidjan. Les commerciaux prennent les commandes par téléphone et les notent sur des bons. Le magasinier prépare les commandes et les livreurs les apportent aux clients. Chaque soir, la secrétaire saisit les bons dans un tableur et calcule le chiffre d'affaires du jour, qu'elle transmet au directeur. Celui-ci décide des quantités à commander aux brasseries.",
      questions: [
        'Identifie les trois sous-systèmes de DISTRI-CI, avec leurs acteurs.',
        'Illustre chacune des quatre fonctions du système d\'information dans ce cas.',
        'Le système d\'information de DISTRI-CI est-il informatisé ? Justifie.',
        'Propose deux améliorations qu\'une application informatique pourrait apporter.',
      ],
      langage: 'texte',
      solution: `1. - Pilotage : le directeur (décide des achats aux brasseries).
   - Information : les bons de commande, le tableur de la secrétaire,
     le chiffre d'affaires transmis au directeur.
   - Opérant : les commerciaux (vente), le magasinier (préparation),
     les livreurs (livraison).

2. - Collecter : les commerciaux notent les commandes sur des bons.
   - Mémoriser : les bons papier, puis le fichier du tableur.
   - Traiter : la secrétaire calcule le chiffre d'affaires du jour.
   - Diffuser : le chiffre d'affaires est transmis au directeur ;
     les bons sont transmis au magasinier.

3. Partiellement : la saisie et le calcul se font sur tableur, mais la
   collecte est manuelle (bons papier) et les données sont ressaisies,
   avec un risque d'erreurs et de retard (le chiffre n'est connu que le soir).

4. - Saisie directe des commandes dans une application par les commerciaux :
     plus de ressaisie, moins d'erreurs, information disponible tout de suite.
   - Suivi du stock en temps réel et alerte automatique quand un produit
     passe sous un seuil : aide le directeur à décider des achats.`,
      explication:
        "Comme toujours en Merise, appuie chaque réponse sur les éléments de l'énoncé (commerciaux, bons, secrétaire…). La question 3 attend une nuance : un SI peut être informatisé en partie seulement.",
    },
  ],
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'la-methode-merise',
  titre: 'La méthode Merise',
  duree: '20 min',
  objectifs: [
    'Savoir pourquoi on utilise une méthode d\'analyse',
    'Connaître les principes de Merise',
    'Connaître les trois niveaux et les six modèles',
    'Connaître les étapes d\'un projet informatique',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La méthode Merise', sousTitre: 'Le résumé en 2 minutes', narration: 'La méthode Merise, résumée en deux minutes.' },
      {
        type: 'points',
        titre: 'Merise en bref',
        points: ['Méthode française, fin des années 1970', 'Pour analyser et concevoir un SI', 'Sépare les DONNÉES et les TRAITEMENTS', 'Avance par niveaux d\'abstraction'],
        narration: "Merise est une méthode française de la fin des années soixante-dix, pour analyser et concevoir un système d'information. Elle sépare les données et les traitements, et avance du plus abstrait au plus concret.",
      },
      {
        type: 'comparaison',
        titre: 'Les 3 niveaux',
        colonnes: [
          { nom: 'Conceptuel', texte: 'QUOI ? Ce qu\'on gère' },
          { nom: 'Organisationnel / logique', texte: 'QUI ? OÙ ? QUAND ?' },
          { nom: 'Physique', texte: 'COMMENT ? Avec quels outils' },
        ],
        narration: "Le niveau conceptuel répond à la question quoi. Le niveau organisationnel et logique répond à qui, où et quand. Le niveau physique répond à comment.",
      },
      {
        type: 'comparaison',
        titre: 'Les 6 modèles',
        colonnes: [
          { nom: 'Données', texte: 'MCD → MLD → MPD' },
          { nom: 'Traitements', texte: 'MCT → MOT → MOpT' },
        ],
        narration: "Pour les données, on passe du MCD au MLD puis au MPD. Pour les traitements, du MCT au MOT puis au modèle opérationnel.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Pourquoi une méthode ?' },
    {
      type: 'texte',
      contenu:
        "Informatiser la gestion d'une entreprise, c'est un projet qui coûte cher et implique beaucoup de personnes. Sans méthode, on code trop vite, on oublie des besoins, chaque développeur fait à sa façon, et l'application ne correspond pas à ce que voulait le client. Une **méthode d'analyse et de conception** fournit une **démarche** (les étapes à suivre), des **modèles** (des schémas standard) et un **langage commun** entre informaticiens et utilisateurs.",
    },

    { type: 'titre', contenu: '2. Présentation de Merise' },
    {
      type: 'texte',
      contenu:
        "**Merise** est une méthode française créée à la fin des années 1970 (1978-1979), à l'initiative du ministère de l'Industrie, par une équipe de chercheurs et de sociétés de services. Elle reste très utilisée dans l'enseignement et dans les administrations des pays francophones, dont la Côte d'Ivoire, et c'est la méthode au programme du BTS IDA.",
    },
    {
      type: 'tableau',
      titre: 'Les grands principes de Merise',
      entetes: ['Principe', 'Signification'],
      lignes: [
        ['Approche systémique', 'L\'entreprise est vue comme un système (pilotage, information, opérant)'],
        ['Séparation données / traitements', 'On étudie d\'un côté les informations à mémoriser (données), de l\'autre ce qu\'on en fait (traitements)'],
        ['Niveaux d\'abstraction', 'On commence par le plus général (quoi ?) avant le plus technique (comment ?)'],
        ['Démarche par étapes', 'Le projet suit un ordre précis, validé à chaque étape avec les utilisateurs'],
      ],
    },

    { type: 'titre', contenu: '3. Les trois niveaux et les six modèles' },
    {
      type: 'tableau',
      entetes: ['Niveau', 'Question', 'Modèle des données', 'Modèle des traitements'],
      lignes: [
        ['Conceptuel', 'QUOI ? Que fait l\'entreprise, quelles informations gère-t-elle ? (indépendant de l\'organisation et de la technique)', 'MCD : Modèle Conceptuel des Données', 'MCT : Modèle Conceptuel des Traitements'],
        ['Organisationnel / logique', 'QUI fait quoi ? OÙ ? QUAND ? Quel type de base de données ?', 'MLD : Modèle Logique des Données (en relationnel : le schéma relationnel)', 'MOT : Modèle Organisationnel des Traitements'],
        ['Physique / opérationnel', 'COMMENT ? Avec quel SGBD, quel langage, quel matériel ?', 'MPD : Modèle Physique des Données (les tables en SQL)', 'MOpT : Modèle Opérationnel des Traitements (les programmes)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Le chemin des données, de l\'idée à la base',
      elements: [
        '**MCD** : « un étudiant appartient à une filière » (un schéma avec des entités et des associations).',
        '**MLD** : `ETUDIANT (matricule, nom, #code_filiere)` — le schéma relationnel que tu as vu en Base de données.',
        '**MPD** : `CREATE TABLE etudiant (matricule VARCHAR(10) PRIMARY KEY, …);` — le code SQL pour MySQL.',
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Ce qui compte le plus au BTS',
      contenu:
        "Le **MCD**, le **passage du MCD au MLD** et le **MCT** sont les grands classiques de l'épreuve. Le dictionnaire des données (chapitre 2) est la première étape pour construire le MCD : c'est pour ça qu'on commence par lui.",
    },

    { type: 'titre', contenu: '4. Les étapes d\'un projet (cycle de vie)' },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        '**Schéma directeur** : définir les grandes orientations informatiques de l\'entreprise pour plusieurs années.',
        '**Étude préalable** : analyser l\'existant (ce qui se fait aujourd\'hui), ses défauts, et proposer des solutions.',
        '**Étude détaillée** : décrire précisément la solution retenue (MCD, MCT, MLD, MOT…).',
        '**Étude technique** : choisir le matériel, le SGBD, l\'architecture.',
        '**Réalisation** : programmer, créer la base de données, tester.',
        '**Mise en œuvre** : installer, former les utilisateurs, reprendre les anciennes données.',
        '**Maintenance** : corriger les erreurs et faire évoluer l\'application.',
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Merise : méthode française (1978-1979) d\'analyse et de conception des SI.',
        'Principes : approche systémique, **séparation données / traitements**, niveaux d\'abstraction, démarche par étapes.',
        '3 niveaux : **conceptuel** (quoi), **organisationnel/logique** (qui, où, quand), **physique** (comment).',
        '6 modèles : **MCD → MLD → MPD** pour les données, **MCT → MOT → MOpT** pour les traitements.',
      ],
    },
    {
      type: 'quiz',
      question: 'À quel niveau choisit-on d\'utiliser MySQL plutôt que PostgreSQL ?',
      options: ['Conceptuel', 'Organisationnel / logique', 'Physique'],
      bonneReponse: 2,
      explication: 'Le choix d\'un outil précis (SGBD, langage) répond à la question « comment ? » : c\'est le niveau physique.',
    },
    {
      type: 'quiz',
      question: 'Quel modèle décrit les données au niveau conceptuel ?',
      options: ['MCT', 'MCD', 'MLD'],
      bonneReponse: 1,
      explication: 'MCD = Modèle Conceptuel des Données. Le MCT décrit les traitements, le MLD décrit les données au niveau logique.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : à quel niveau ?',
      enonce: 'Pour chaque décision prise pendant un projet, indique le niveau de Merise concerné.',
      questions: [
        'Un client peut passer plusieurs commandes.',
        'La saisie des commandes se fera par les commerciaux sur une tablette, le matin.',
        'La base de données utilisera PostgreSQL.',
        'Une commande est livrée si le stock est suffisant.',
        'La table CLIENT aura une colonne telephone de type VARCHAR(15).',
      ],
      langage: 'texte',
      solution: `1. Conceptuel (règle sur les données, indépendante de l'organisation)
2. Organisationnel (qui ? où ? quand ?)
3. Physique (quel outil ?)
4. Conceptuel (règle de traitement)
5. Physique (type précis dans un SGBD)`,
      explication: 'Pose-toi la question : est-ce une règle de l\'entreprise (conceptuel), une façon de s\'organiser (organisationnel), ou un choix technique (physique) ?',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Questions de cours',
      enonce: 'Ce type de questions ouvre souvent l\'épreuve de Merise. Réponds de façon précise et structurée.',
      questions: [
        'Qu\'est-ce que Merise ? Donne sa date et son origine.',
        'Cite et explique deux principes de la méthode.',
        'Présente dans un tableau les niveaux d\'abstraction et les modèles associés.',
        'Que signifient les sigles MCD, MLD et MOT ?',
        'Cite, dans l\'ordre, quatre étapes d\'un projet informatique selon Merise.',
      ],
      langage: 'texte',
      solution: `1. Merise est une méthode d'analyse et de conception des systèmes
   d'information, créée en France à la fin des années 1970 (1978-1979),
   à l'initiative du ministère de l'Industrie.

2. - Séparation des données et des traitements : on étudie séparément
     les informations à mémoriser et les opérations qu'on leur applique.
   - Niveaux d'abstraction : on décrit d'abord le « quoi » (conceptuel),
     puis le « qui, où, quand » (organisationnel), enfin le « comment »
     (physique).

3. | Niveau          | Données | Traitements |
   | Conceptuel      | MCD     | MCT         |
   | Organisationnel | MLD     | MOT         |
   | Physique        | MPD     | MOpT        |

4. MCD : Modèle Conceptuel des Données
   MLD : Modèle Logique des Données
   MOT : Modèle Organisationnel des Traitements

5. Étude préalable, étude détaillée, réalisation, mise en œuvre
   (ou : schéma directeur, étude préalable, étude détaillée, étude technique…).`,
      explication: 'Ces questions de cours sont des points « faciles » : apprends le tableau des niveaux et des modèles par cœur, il revient presque chaque année.',
    },
  ],
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'acteurs-et-flux',
  titre: 'Les acteurs et les flux d\'information',
  duree: '25 min',
  objectifs: [
    'Délimiter le domaine d\'étude',
    'Distinguer acteurs internes et acteurs externes',
    'Établir le tableau des flux',
    'Construire le diagramme des flux',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Acteurs et flux', sousTitre: 'Le résumé en 2 minutes', narration: "Les acteurs et les flux d'information, en deux minutes." },
      {
        type: 'comparaison',
        titre: 'Deux sortes d\'acteurs',
        colonnes: [
          { nom: 'Acteur interne', texte: 'Dans le domaine étudié : service commercial, magasin…' },
          { nom: 'Acteur externe', texte: 'En dehors : client, fournisseur, banque…' },
        ],
        narration: "Un acteur est une personne ou un service qui échange des informations. Il est interne s'il fait partie du domaine étudié, externe sinon, comme un client ou un fournisseur.",
      },
      {
        type: 'code',
        titre: 'Le tableau des flux',
        lignes: ['1 | Client → Service commercial | Bon de commande', '2 | Service commercial → Magasin | Ordre de préparation', '3 | Magasin → Client | Livraison + bon de livraison', '4 | Comptabilité → Client | Facture'],
        etapes: [
          { ligne: 0, variables: { flux: '1' }, note: 'Chaque flux a un émetteur et un récepteur' },
          { ligne: 1, variables: { flux: '2' } },
          { ligne: 2, variables: { flux: '3' } },
          { ligne: 3, variables: { flux: '4' }, note: 'On les numérote dans l\'ordre chronologique' },
        ],
        narration: "On liste chaque échange d'information dans un tableau des flux : un numéro, l'émetteur, le récepteur, et le contenu du flux, dans l'ordre chronologique.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Le domaine d\'étude' },
    {
      type: 'texte',
      contenu:
        "Avant d'informatiser, on doit comprendre **comment l'information circule aujourd'hui**. On commence par délimiter le **domaine d'étude** : la partie de l'entreprise qu'on va analyser (par exemple « la gestion des commandes clients » ou « la gestion des inscriptions »). Tout ce qui est dans le domaine est **interne**, tout le reste est **externe**.",
    },

    { type: 'titre', contenu: '2. Les acteurs' },
    {
      type: 'texte',
      contenu:
        "Un **acteur** est une personne, un service ou un organisme qui **émet ou reçoit des informations**. On ne s'intéresse pas aux individus (« Monsieur Kouassi »), mais au **rôle** (« le service commercial »).",
    },
    {
      type: 'tableau',
      entetes: ['Type', 'Définition', 'Exemples'],
      lignes: [
        ['Acteur interne', 'Fait partie du domaine étudié', 'Service commercial, magasin, comptabilité, scolarité'],
        ['Acteur externe', 'Est en dehors du domaine, mais échange des informations avec lui', 'Client, fournisseur, banque, ministère, parents d\'élèves'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Interne ou externe dépend du domaine',
      contenu:
        "Le service comptabilité est **interne** si on étudie toute l'entreprise, mais **externe** si le domaine d'étude est seulement « la gestion des stocks ». Relis toujours la définition du domaine dans l'énoncé.",
    },

    { type: 'titre', contenu: '3. Les flux d\'information' },
    {
      type: 'texte',
      contenu:
        "Un **flux d'information** est un **échange d'information** entre deux acteurs : un document (bon de commande, facture), un appel, un message, une donnée transmise. Chaque flux a un **émetteur** et un **récepteur**. On les recense dans un **tableau des flux**, numérotés dans l'**ordre chronologique**.",
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Le cas : les commandes de la librairie Le Savoir',
      contenu:
        "Une librairie d'Adjamé vend des fournitures aux écoles. L'école envoie un bon de commande au service commercial. Celui-ci vérifie la disponibilité auprès du magasin. Si les articles sont disponibles, le magasin prépare la commande et la livre à l'école avec un bon de livraison. Le service commercial transmet le bon de livraison signé à la comptabilité, qui établit la facture et l'envoie à l'école. L'école règle la facture par virement.",
    },
    {
      type: 'tableau',
      titre: 'Tableau des flux (domaine : gestion des commandes)',
      entetes: ['N°', 'Émetteur', 'Récepteur', 'Flux'],
      lignes: [
        ['1', 'École (externe)', 'Service commercial', 'Bon de commande'],
        ['2', 'Service commercial', 'Magasin', 'Demande de disponibilité'],
        ['3', 'Magasin', 'Service commercial', 'Réponse sur la disponibilité'],
        ['4', 'Magasin', 'École (externe)', 'Livraison + bon de livraison'],
        ['5', 'École (externe)', 'Magasin', 'Bon de livraison signé'],
        ['6', 'Magasin', 'Service commercial', 'Bon de livraison signé'],
        ['7', 'Service commercial', 'Comptabilité', 'Bon de livraison signé'],
        ['8', 'Comptabilité', 'École (externe)', 'Facture'],
        ['9', 'École (externe)', 'Comptabilité', 'Règlement (virement)'],
      ],
      legende:
        'Remarque : le texte ne dit pas comment le bon de livraison signé revient au service commercial ; on a supposé qu\'il passait par le magasin. À l\'examen, si tu fais une hypothèse, écris-la.',
    },

    { type: 'titre', contenu: '4. Le diagramme des flux' },
    {
      type: 'texte',
      contenu:
        "Le **diagramme des flux** (appelé aussi **modèle conceptuel de communication**, MCC) représente la même chose sous forme de **schéma** : les acteurs **internes** dans des **cercles** (ou ellipses) **à l'intérieur** d'un cadre qui représente le domaine, les acteurs **externes** dans des **rectangles à l'extérieur**, et les flux par des **flèches numérotées**.",
    },
    {
      type: 'flux',
      domaine: 'gestion des commandes',
      externes: ['École'],
      internes: ['Service commercial', 'Magasin', 'Comptabilité'],
      flux: [
        [1, 'École', 'Service commercial'],
        [2, 'Service commercial', 'Magasin'],
        [3, 'Magasin', 'Service commercial'],
        [4, 'Magasin', 'École'],
        [5, 'École', 'Magasin'],
        [6, 'Magasin', 'Service commercial'],
        [7, 'Service commercial', 'Comptabilité'],
        [8, 'Comptabilité', 'École'],
        [9, 'École', 'Comptabilité'],
      ],
      legende:
        'Les numéros renvoient au tableau des flux. Sur ta copie, dessine-le à la règle : rectangles pour les acteurs externes, cercles ou ellipses pour les internes, une flèche numérotée par flux.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Délimite d\'abord le **domaine d\'étude**.',
        'Un **acteur** est un rôle (service, organisme), **interne** ou **externe** au domaine.',
        'Un **flux** a un émetteur, un récepteur et un contenu ; on les **numérote** chronologiquement.',
        '**Tableau des flux** puis **diagramme des flux** : externes en rectangles, internes en cercles.',
      ],
    },
    {
      type: 'quiz',
      question: 'Dans l\'étude de la gestion des inscriptions d\'un établissement, le ministère de l\'Enseignement est un acteur…',
      options: ['Interne', 'Externe'],
      bonneReponse: 1,
      explication: 'Le ministère ne fait pas partie de l\'établissement étudié, mais il échange des informations avec lui (listes d\'inscrits, résultats) : c\'est un acteur externe.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : la commande de pizza',
      enonce:
        "Le client appelle la pizzeria et passe sa commande au standard. Le standard transmet la commande à la cuisine. La cuisine prépare la pizza et la remet au livreur avec le ticket. Le livreur apporte la pizza au client et lui remet le ticket. Le client paie le livreur, qui reverse l'argent à la caisse en fin de service.",
      questions: ['Identifie les acteurs internes et externes (domaine : la pizzeria).', 'Établis le tableau des flux.'],
      langage: 'texte',
      solution: `1. Externes : Client
   Internes : Standard, Cuisine, Livreur, Caisse

2. | N° | Émetteur | Récepteur | Flux                 |
   | 1  | Client   | Standard  | Commande (appel)     |
   | 2  | Standard | Cuisine   | Commande             |
   | 3  | Cuisine  | Livreur   | Pizza + ticket       |
   | 4  | Livreur  | Client    | Pizza + ticket       |
   | 5  | Client   | Livreur   | Paiement             |
   | 6  | Livreur  | Caisse    | Recette du service   |`,
      explication: 'Le paiement est aussi un flux (il s\'accompagne d\'informations : montant, ticket). En Merise, on garde surtout les flux qui transportent de l\'information.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La gestion des inscriptions',
      enonce:
        "Domaine étudié : la gestion des inscriptions de l'établissement privé ESTIC (Abidjan).\n\nLe candidat dépose au service de la scolarité un dossier (fiche de renseignements, copie du bac, photos). La scolarité vérifie le dossier ; s'il est incomplet, elle le retourne au candidat. Si le dossier est complet, elle remet au candidat une fiche de paiement. Le candidat paie les frais à la banque partenaire, qui lui remet un reçu. Le candidat présente le reçu à la scolarité, qui lui délivre sa carte d'étudiant et transmet la liste des nouveaux inscrits au service des examens. En fin d'année, la scolarité envoie la liste officielle des inscrits au ministère.",
      questions: [
        'Liste les acteurs internes et externes.',
        'Établis le tableau des flux.',
        'Indique les flux qui seraient automatisés en priorité par une application, et pourquoi.',
      ],
      langage: 'texte',
      solution: `1. Internes : Scolarité, Service des examens
   Externes : Candidat, Banque, Ministère

2. | N° | Émetteur          | Récepteur          | Flux                                  |
   | 1  | Candidat          | Scolarité          | Dossier d'inscription                 |
   | 2  | Scolarité         | Candidat           | Dossier incomplet (retour)            |
   | 3  | Scolarité         | Candidat           | Fiche de paiement                     |
   | 4  | Candidat          | Banque             | Paiement des frais                    |
   | 5  | Banque            | Candidat           | Reçu de paiement                      |
   | 6  | Candidat          | Scolarité          | Reçu de paiement                      |
   | 7  | Scolarité         | Candidat           | Carte d'étudiant                      |
   | 8  | Scolarité         | Service examens    | Liste des nouveaux inscrits           |
   | 9  | Scolarité         | Ministère          | Liste officielle des inscrits         |

   (Les flux 2 et 3 sont alternatifs : l'un ou l'autre selon le dossier.)

3. - Flux 8 et 9 (listes d'inscrits) : produites automatiquement à partir
     de la base de données, sans ressaisie ni erreur.
   - Flux 4, 5, 6 (paiement) : une confirmation automatique de la banque
     (ou un paiement Mobile Money) éviterait au candidat de revenir avec
     son reçu, et la scolarité verrait le paiement en temps réel.`,
      explication:
        "Le flux du dossier incomplet est souvent oublié : il dépend d'une condition. Les flux entre deux acteurs externes (candidat → banque) peuvent être indiqués s'ils aident à comprendre le processus ; certains professeurs préfèrent les ignorer. Précise ton choix.",
    },
  ],
}

export const leconsSystemeInformation: Lecon[] = [lecon1, lecon2, lecon3]

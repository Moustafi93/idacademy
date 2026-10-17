import type { Lecon } from '../types'

/*
 * Méthodologie Merise — Chapitre 2 : Le dictionnaire des données
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'recenser-les-donnees',
  titre: 'Recenser les données : le dictionnaire',
  duree: '25 min',
  objectifs: [
    'Savoir où trouver les données d\'un système d\'information',
    'Connaître les colonnes d\'un dictionnaire des données',
    'Coder les données (mnémoniques) et choisir leur type',
    'Distinguer données élémentaires et calculées',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Le dictionnaire des données', sousTitre: 'Le résumé en 1 minute 30', narration: 'Le dictionnaire des données, en une minute trente.' },
      {
        type: 'points',
        titre: 'C\'est quoi ?',
        points: ['La liste de TOUTES les données du domaine', 'Trouvées dans les documents et les entretiens', 'Première étape avant le MCD'],
        narration: "Le dictionnaire des données est la liste de toutes les informations que le système doit gérer. On les trouve dans les documents de l'entreprise et en interrogeant les utilisateurs. C'est la première étape avant de construire le MCD.",
      },
      {
        type: 'code',
        titre: 'Une ligne du dictionnaire',
        lignes: ['Code       : nom_cli', 'Désignation: Nom du client', 'Type       : A (alphabétique)', 'Taille     : 30', 'Nature     : E (élémentaire)'],
        etapes: [
          { ligne: 0, variables: { colonne: 'mnémonique' }, note: 'Un nom court, sans espace' },
          { ligne: 1, variables: { colonne: 'libellé' } },
          { ligne: 2, variables: { colonne: 'type' }, note: 'A, N, AN, D ou B' },
          { ligne: 3, variables: { colonne: 'taille' } },
          { ligne: 4, variables: { colonne: 'nature' }, note: 'E élémentaire ou C calculée' },
        ],
        narration: "Pour chaque donnée, on indique un code court, une désignation claire, un type, une taille, et sa nature : élémentaire, ou calculée à partir d'autres données.",
      },
      {
        type: 'comparaison',
        titre: 'Élémentaire ou calculée ?',
        colonnes: [
          { nom: 'Élémentaire (E)', texte: 'Saisie, non calculable : prix unitaire, quantité' },
          { nom: 'Calculée (C)', texte: 'Obtenue par un calcul : montant = prix × quantité' },
        ],
        narration: "Une donnée élémentaire est saisie et ne se calcule pas. Une donnée calculée s'obtient à partir d'autres données, comme le montant égal au prix fois la quantité.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. À quoi sert le dictionnaire des données ?' },
    {
      type: 'texte',
      contenu:
        "Avant de dessiner le MCD, il faut savoir **quelles informations** le système doit gérer. Le **dictionnaire des données** est le **tableau qui recense toutes les données** du domaine étudié, avec leurs caractéristiques. C'est la base de tout le reste : une donnée oubliée ici sera absente de la base de données finale.",
    },
    {
      type: 'tableau',
      titre: 'Où trouver les données ?',
      entetes: ['Source', 'Exemples'],
      lignes: [
        ['Les documents de l\'entreprise', 'Factures, bons de commande, fiches d\'inscription, reçus, bulletins'],
        ['Les entretiens avec les utilisateurs', '« Nous aimerions aussi connaître la date de livraison prévue »'],
        ['Les règles de gestion', '« La TVA est de 18 % », « un client a un plafond de crédit »'],
        ['Les états à produire', 'Listes, statistiques, tableaux de bord demandés par la direction'],
      ],
    },

    { type: 'titre', contenu: '2. Les colonnes du dictionnaire' },
    {
      type: 'tableau',
      entetes: ['Colonne', 'Contenu', 'Exemple'],
      lignes: [
        ['N°', 'Numéro d\'ordre', '1'],
        ['Code (mnémonique)', 'Nom court de la donnée, sans espace ni accent, unique', 'num_cli'],
        ['Désignation (libellé)', 'Signification claire de la donnée', 'Numéro du client'],
        ['Type', 'A (alphabétique), N (numérique), AN (alphanumérique), D (date), B (booléen)', 'AN'],
        ['Taille', 'Nombre maximum de caractères ou de chiffres', '10'],
        ['Nature', 'E (élémentaire) ou C (calculée)', 'E'],
        ['Règle de calcul / observations', 'Formule pour une donnée calculée, contraintes, remarques', 'Format : C + 4 chiffres'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Les types de données en Merise',
      entetes: ['Type', 'Signification', 'Exemples'],
      lignes: [
        ['A', 'Alphabétique : lettres uniquement', 'nom, prénom, ville'],
        ['N', 'Numérique : nombres sur lesquels on calcule', 'quantité, prix, note, âge'],
        ['AN', 'Alphanumérique : lettres et chiffres', 'matricule (IDA001), adresse, numéro de téléphone'],
        ['D', 'Date', 'date de commande, date de naissance'],
        ['B', 'Booléen : oui / non', 'payé, livré'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Bien choisir les codes',
      contenu:
        "Le code (mnémonique) doit être **court, parlant et unique**. Utilise un préfixe commun pour les données d'un même objet : `num_cli`, `nom_cli`, `tel_cli` pour le client ; `ref_art`, `lib_art`, `pu_art` pour l'article. Ces codes deviendront les noms des colonnes des tables.",
    },

    { type: 'titre', contenu: '3. Données élémentaires et données calculées' },
    {
      type: 'texte',
      contenu:
        "Une donnée **élémentaire** (E) est une information de base, qu'on ne peut pas déduire d'autres données : elle doit être **saisie**. Une donnée **calculée** (C) s'obtient **à partir d'autres données** par une formule : elle n'a pas besoin d'être saisie, ni (en général) mémorisée.",
    },
    {
      type: 'tableau',
      entetes: ['Donnée', 'Nature', 'Règle de calcul'],
      lignes: [
        ['Prix unitaire', 'E', '—'],
        ['Quantité commandée', 'E', '—'],
        ['Montant d\'une ligne', 'C', 'prix unitaire × quantité'],
        ['Total HT de la facture', 'C', 'somme des montants des lignes'],
        ['Montant TVA', 'C', 'total HT × taux de TVA'],
        ['Âge', 'C', 'année en cours − année de naissance'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'L\'âge est une donnée calculée',
      contenu:
        "On enregistre la **date de naissance** (élémentaire, qui ne change jamais), pas l'âge (calculé, qui change chaque année). Si on stockait l'âge, il serait faux un an plus tard.",
    },

    { type: 'titre', contenu: '4. Exemple : la fiche d\'inscription' },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Document : fiche d\'inscription de l\'établissement',
      elements: [
        'Matricule : IDA2026-015',
        'Nom : DIALLO — Prénoms : Fatou',
        'Date de naissance : 09/07/2005 — Sexe : F',
        'Téléphone : 07 08 09 10 11',
        'Filière : IDA — Informatique Développeur d\'Application',
        'Frais d\'inscription : 150 000 F — Payés : Oui',
      ],
    },
    {
      type: 'tableau',
      titre: 'Dictionnaire des données obtenu',
      entetes: ['N°', 'Code', 'Désignation', 'Type', 'Taille', 'Nature', 'Observations'],
      lignes: [
        ['1', 'matricule', 'Matricule de l\'étudiant', 'AN', '12', 'E', 'Identifiant'],
        ['2', 'nom_etu', 'Nom de l\'étudiant', 'A', '30', 'E', ''],
        ['3', 'prenom_etu', 'Prénoms de l\'étudiant', 'A', '50', 'E', ''],
        ['4', 'date_naiss', 'Date de naissance', 'D', '10', 'E', ''],
        ['5', 'sexe_etu', 'Sexe', 'A', '1', 'E', 'M ou F'],
        ['6', 'tel_etu', 'Téléphone de l\'étudiant', 'AN', '14', 'E', 'Chaîne : garder le 0 initial'],
        ['7', 'code_fil', 'Code de la filière', 'AN', '5', 'E', 'Identifiant de la filière'],
        ['8', 'lib_fil', 'Libellé de la filière', 'A', '60', 'E', ''],
        ['9', 'frais_insc', 'Frais d\'inscription', 'N', '7', 'E', 'Montant en F CFA'],
        ['10', 'paye', 'Frais payés', 'B', '1', 'E', 'Oui / Non'],
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Le dictionnaire des données recense **toutes** les données du domaine : documents, entretiens, règles, états.',
        'Colonnes : **code**, **désignation**, **type** (A, N, AN, D, B), **taille**, **nature** (E/C), **observations**.',
        'Une donnée **calculée** s\'obtient par une formule ; on stocke les données **élémentaires** dont elle dépend.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quel type donner à un numéro de facture comme « FAC-2026-0042 » ?',
      options: ['N', 'AN', 'D'],
      bonneReponse: 1,
      explication: 'Il contient des lettres, des chiffres et des tirets, et on ne calcule pas avec : il est alphanumérique (AN).',
    },
    {
      type: 'quiz',
      question: 'Le « net à payer » d\'une facture est une donnée…',
      options: ['Élémentaire', 'Calculée'],
      bonneReponse: 1,
      explication: 'Le net à payer se calcule à partir du total HT, de la TVA et des remises éventuelles : c\'est une donnée calculée.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : type et nature',
      enonce: 'Pour chaque donnée d\'une agence de location de voitures, indique le type et la nature (E ou C).',
      questions: [
        'Immatriculation du véhicule',
        'Date de début de location',
        'Nombre de jours de location',
        'Tarif journalier',
        'Montant de la location',
        'Le client a-t-il laissé une caution ?',
      ],
      langage: 'texte',
      solution: `1. AN, E
2. D, E
3. N, C (date de fin − date de début), ou E si on saisit directement
   le nombre de jours au lieu de la date de fin : précise ton hypothèse
4. N, E
5. N, C (nombre de jours × tarif journalier)
6. B, E`,
      explication: 'Une même donnée peut être élémentaire ou calculée selon les autres données disponibles. Si tu fais un choix, justifie-le dans la colonne Observations.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : ton premier dictionnaire',
      enonce:
        "Établis le dictionnaire des données à partir de ce reçu de dépôt Mobile Money :\n\nReçu n° R-889201 — Date : 14/10/2026 — Agent : AG-117, Kiosque Yao (Abobo)\nClient : 0707123456 — KOUAME Adjoua\nMontant déposé : 25 000 F — Frais : 0 F\nNouveau solde : 61 500 F",
      langage: 'texte',
      solution: `| N° | Code        | Désignation                 | Type | Taille | Nature | Observations          |
| 1  | num_recu    | Numéro du reçu              | AN   | 10     | E      | Identifiant           |
| 2  | date_depot  | Date du dépôt               | D    | 10     | E      |                       |
| 3  | code_agent  | Code de l'agent             | AN   | 6      | E      |                       |
| 4  | nom_agent   | Nom du kiosque de l'agent   | AN   | 40     | E      |                       |
| 5  | commune_ag  | Commune de l'agent          | A    | 30     | E      |                       |
| 6  | num_tel_cli | Numéro du client            | AN   | 10     | E      | Identifiant du client |
| 7  | nom_cli     | Nom et prénom du client     | A    | 50     | E      | À séparer si besoin   |
| 8  | montant_dep | Montant déposé              | N    | 9      | E      |                       |
| 9  | frais_dep   | Frais du dépôt              | N    | 6      | E      |                       |
| 10 | solde_cli   | Solde du compte             | N    | 10     | C      | Ancien solde + dépôt  |`,
      explication:
        "Le nouveau solde se calcule à partir de l'ancien solde et des opérations. Dans la réalité, les opérateurs stockent quand même le solde pour aller plus vite : c'est un choix technique (niveau physique), pas conceptuel.",
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La facture de la quincaillerie',
      enonce:
        "QUINCAILLERIE LA BONNE AFFAIRE — Yopougon\nFacture n° F-2026-0312 du 10/10/2026\nClient : C0045 — Entreprise BATIR-CI — Tél : 27 23 45 67 89\n\nRéf.   | Désignation      | Prix unitaire | Qté | Montant\nCIM50  | Sac de ciment    | 5 500         | 20  | 110 000\nFER10  | Barre de fer 10  | 3 200         | 15  | 48 000\n\nTotal HT : 158 000 F — TVA (18 %) : 28 440 F — Total TTC : 186 440 F",
      questions: [
        'Établis le dictionnaire des données à partir de cette facture.',
        'Indique les règles de calcul des données calculées.',
        'Quelles données serviront d\'identifiants ?',
      ],
      langage: 'texte',
      solution: `1. et 2. Dictionnaire des données :
| N° | Code      | Désignation             | Type | Taille | Nature | Règle de calcul / Obs.          |
| 1  | num_fact  | Numéro de facture       | AN   | 12     | E      | Identifiant de la facture       |
| 2  | date_fact | Date de la facture      | D    | 10     | E      |                                 |
| 3  | num_cli   | Numéro du client        | AN   | 5      | E      | Identifiant du client           |
| 4  | nom_cli   | Nom du client           | AN   | 50     | E      |                                 |
| 5  | tel_cli   | Téléphone du client     | AN   | 14     | E      |                                 |
| 6  | ref_art   | Référence de l'article  | AN   | 6      | E      | Identifiant de l'article        |
| 7  | des_art   | Désignation de l'article| AN   | 40     | E      |                                 |
| 8  | pu_art    | Prix unitaire HT        | N    | 8      | E      |                                 |
| 9  | qte_cde   | Quantité commandée      | N    | 5      | E      |                                 |
| 10 | montant   | Montant de la ligne     | N    | 10     | C      | pu_art × qte_cde                |
| 11 | total_ht  | Total HT                | N    | 10     | C      | Somme des montants              |
| 12 | mt_tva    | Montant de la TVA       | N    | 10     | C      | total_ht × taux_tva             |
| 13 | total_ttc | Total TTC               | N    | 10     | C      | total_ht + mt_tva               |
| 14 | taux_tva  | Taux de TVA             | N    | 4      | E      | Paramètre : 18 %                |

3. Identifiants : num_fact (facture), num_cli (client), ref_art (article).`,
      explication:
        "Le taux de TVA est une constante (un paramètre), à noter dans le dictionnaire mais qui ne deviendra pas une propriété d'une entité. Le nom de l'entreprise de la quincaillerie (en-tête) n'est pas une donnée à gérer : c'est toujours la même. Vérifie tes calculs : 110 000 + 48 000 = 158 000 ; 158 000 × 0,18 = 28 440.",
    },
  ],
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'epurer-le-dictionnaire',
  titre: 'Épurer le dictionnaire des données',
  duree: '20 min',
  objectifs: [
    'Repérer et éliminer les synonymes',
    'Repérer et séparer les polysèmes',
    'Écarter les données calculées et les paramètres',
    'Décomposer les données composées',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Épurer le dictionnaire', sousTitre: 'Le résumé en 1 minute 30', narration: 'Épurer le dictionnaire des données, en une minute trente.' },
      {
        type: 'comparaison',
        titre: 'Les 2 pièges de vocabulaire',
        colonnes: [
          { nom: 'Synonymes', texte: 'Deux noms, une même donnée → on n\'en garde qu\'un' },
          { nom: 'Polysèmes', texte: 'Un nom, deux données différentes → on les sépare' },
        ],
        narration: "Deux pièges de vocabulaire : les synonymes, deux noms pour une même donnée, dont on ne garde qu'un. Et les polysèmes, un même nom pour deux données différentes, qu'il faut séparer.",
      },
      {
        type: 'points',
        titre: 'On retire aussi…',
        points: ['Les données calculées (on garde leur règle)', 'Les paramètres et constantes (TVA)', 'Les données hors du domaine'],
        narration: "On retire aussi du dictionnaire épuré les données calculées, en gardant leur règle de calcul, les paramètres comme le taux de TVA, et les données qui sortent du domaine étudié.",
      },
      {
        type: 'points',
        titre: 'Et on décompose',
        points: ['adresse → rue, commune, ville', 'nom complet → nom, prénom', 'Chaque donnée devient atomique'],
        narration: "Enfin, on décompose les données composées en données élémentaires : l'adresse en rue, commune et ville, le nom complet en nom et prénom.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Pourquoi épurer ?' },
    {
      type: 'texte',
      contenu:
        "Le premier dictionnaire, construit à partir de plusieurs documents et entretiens, contient des **doublons**, des **ambiguïtés** et des données **inutiles** pour le MCD. L'**épuration** consiste à le nettoyer pour ne garder que des données **uniques, précises et élémentaires**. C'est une question presque systématique à l'examen.",
    },

    { type: 'titre', contenu: '2. Les synonymes' },
    {
      type: 'texte',
      contenu:
        "Des **synonymes** sont **deux noms différents pour une même donnée**. Ils apparaissent quand on recense les données sur plusieurs documents : le bon de commande parle de « code client », la facture de « numéro client ».",
    },
    {
      type: 'tableau',
      entetes: ['Données trouvées', 'Problème', 'Correction'],
      lignes: [
        ['code_client (bon de commande) et num_client (facture)', 'Même information, deux noms', 'On garde un seul code : num_cli'],
        ['désignation (catalogue) et libellé article (facture)', 'Même information', 'On garde : lib_art'],
      ],
    },

    { type: 'titre', contenu: '3. Les polysèmes' },
    {
      type: 'texte',
      contenu:
        "Un **polysème** est **un même nom utilisé pour des données différentes**. Le mot « date » sur un bon de commande peut désigner la date de commande, la date de livraison prévue et la date de facturation. Il faut **créer une donnée distincte** pour chaque sens.",
    },
    {
      type: 'tableau',
      entetes: ['Donnée ambiguë', 'Sens différents', 'Correction'],
      lignes: [
        ['date', 'Date de la commande / date de livraison', 'date_cde et date_liv'],
        ['adresse', 'Adresse de facturation / adresse de livraison', 'adr_fact et adr_liv'],
        ['nom', 'Nom du client / nom du livreur', 'nom_cli et nom_livreur'],
      ],
    },

    { type: 'titre', contenu: '4. Les données à retirer' },
    {
      type: 'tableau',
      entetes: ['Catégorie', 'Pourquoi on la retire du dictionnaire épuré', 'Exemples'],
      lignes: [
        ['Données calculées', 'Elles se déduisent d\'autres données ; on garde leur règle de calcul pour les traitements', 'montant, total HT, TVA, âge'],
        ['Paramètres (constantes)', 'Valeur unique pour tout le système, pas une caractéristique d\'un objet', 'taux de TVA, nom de l\'entreprise'],
        ['Données hors domaine', 'Elles ne concernent pas le domaine étudié', 'Le salaire du magasinier si on étudie les commandes'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Une exception importante',
      contenu:
        "Certaines données calculées sont **gardées** si on a besoin de leur valeur **historique**. Exemple : le **prix de vente** au moment de la commande, si les prix du catalogue changent ensuite. Sans lui, une ancienne facture recalculée donnerait un autre montant. Écris toujours ce genre de choix dans les observations.",
    },

    { type: 'titre', contenu: '5. Décomposer les données composées' },
    {
      type: 'texte',
      contenu:
        "Une donnée **composée** regroupe plusieurs informations. Si on peut en avoir besoin séparément (trier par commune, chercher par nom), on la **décompose** en données **atomiques** (c'est déjà l'esprit de la 1FN en Base de données).",
    },
    {
      type: 'tableau',
      entetes: ['Donnée composée', 'Décomposition'],
      lignes: [
        ['nom_complet : « DIALLO Fatou »', 'nom_etu, prenom_etu'],
        ['adresse : « Rue 12, Cocody, Abidjan »', 'rue, commune, ville'],
        ['periode : « du 10/10 au 15/10 »', 'date_debut, date_fin'],
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '**Synonymes** (2 noms, 1 donnée) : on n\'en garde qu\'un.',
        '**Polysèmes** (1 nom, plusieurs données) : on crée une donnée par sens.',
        'On retire les données **calculées** (on garde la règle), les **paramètres** et les données **hors domaine**.',
        'On **décompose** les données composées en données atomiques.',
      ],
    },
    {
      type: 'quiz',
      question: '« Matricule » sur la fiche d\'inscription et « numéro étudiant » sur le bulletin désignent la même chose. C\'est…',
      options: ['Un polysème', 'Un synonyme', 'Une donnée calculée'],
      bonneReponse: 1,
      explication: 'Deux noms différents pour la même donnée : ce sont des synonymes. On n\'en garde qu\'un dans le dictionnaire épuré.',
    },
    {
      type: 'quiz',
      question: 'Le taux de TVA (18 %), identique pour toutes les factures, est…',
      options: ['Une donnée élémentaire à garder', 'Un paramètre à retirer du dictionnaire épuré', 'Un identifiant'],
      bonneReponse: 1,
      explication: 'C\'est une constante valable pour tout le système, pas une caractéristique d\'une facture : c\'est un paramètre.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : épurer une liste',
      enonce:
        "Voici les données recensées pour la gestion des livraisons d'une entreprise. Épure cette liste en justifiant chaque modification.\n\nnum_client, code_client, nom_client, adresse_client, date, num_livraison, nom_livreur, quantite_livree, prix_unitaire, montant_livraison, taux_tva, nom_entreprise",
      langage: 'texte',
      solution: `- num_client / code_client : synonymes → on garde num_client.
- adresse_client : composée → rue_client, commune_client.
- date : polysème probable → date_cde (commande) et date_liv (livraison).
- montant_livraison : calculée (quantite_livree × prix_unitaire) → retirée,
  règle notée pour les traitements.
- taux_tva : paramètre → retiré.
- nom_entreprise : paramètre (toujours le même) → retiré.

Dictionnaire épuré :
num_client, nom_client, rue_client, commune_client, num_livraison,
date_cde, date_liv, nom_livreur, quantite_livree, prix_unitaire`,
      explication: 'Pour chaque modification, nomme le type de problème (synonyme, polysème, calculée, paramètre, composée) : c\'est ce que le correcteur vérifie.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les réservations d\'un hôtel',
      enonce:
        "Un hôtel de Grand-Bassam utilise deux documents. La fiche de réservation contient : numéro de réservation, date, nom complet du client, téléphone, numéro de chambre, type de chambre, prix de la nuit, nombre de nuits. La facture de séjour contient : numéro de facture, date, code client, nom complet du client, numéro de chambre, prix de la nuit, nombre de nuits, montant du séjour, taxe de séjour (1 000 F par nuit), total à payer.",
      questions: [
        'Relève les synonymes et les polysèmes.',
        'Relève les données calculées et donne leur règle.',
        'Relève les paramètres et les données composées.',
        'Établis le dictionnaire des données épuré (code, désignation, type).',
      ],
      langage: 'texte',
      solution: `1. - Polysème : « date » = date de réservation (fiche) et date de facture
     (facture) → date_resa et date_fact.
   - « Nom complet du client » apparaît sur les deux documents : c'est la même
     donnée (pas un synonyme, juste un doublon), on la garde une fois.
   - Il manque un identifiant client sur la fiche : on utilise code_client.

2. - montant_sejour = prix_nuit × nb_nuits
   - mt_taxe = TAXE_NUIT × nb_nuits
   - total_payer = montant_sejour + mt_taxe

3. - Paramètre : la taxe de séjour par nuit (1 000 F).
   - Donnée composée : nom complet → nom_cli et prenom_cli.

4. Dictionnaire épuré :
| Code        | Désignation                  | Type |
| num_resa    | Numéro de réservation        | AN   |
| date_resa   | Date de la réservation       | D    |
| code_cli    | Code du client               | AN   |
| nom_cli     | Nom du client                | A    |
| prenom_cli  | Prénom du client             | A    |
| tel_cli     | Téléphone du client          | AN   |
| num_chambre | Numéro de la chambre         | AN   |
| type_chambre| Type de chambre              | A    |
| prix_nuit   | Prix de la nuit              | N    |
| nb_nuits    | Nombre de nuits              | N    |
| num_fact    | Numéro de facture            | AN   |
| date_fact   | Date de la facture           | D    |`,
      explication:
        "Remarque : prix_nuit dépend sans doute du type de chambre. Au moment du MCD, on se demandera si le prix est une propriété de la chambre, du type de chambre, ou de la réservation (s'il peut varier selon la saison). Le dictionnaire épuré prépare ces questions.",
    },
  ],
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'identifiants-et-preparation-mcd',
  titre: 'Les identifiants et la préparation du MCD',
  duree: '25 min',
  objectifs: [
    'Repérer les identifiants dans le dictionnaire',
    'Regrouper les données autour des objets de gestion',
    'Préparer le passage au MCD',
  ],
  resume: {
    duree: '1 min 30',
    scenes: [
      { type: 'titre', titre: 'Identifiants et préparation du MCD', sousTitre: 'Le résumé en 1 minute 30', narration: 'Les identifiants et la préparation du MCD.' },
      {
        type: 'points',
        titre: 'Un identifiant',
        points: ['Permet de distinguer chaque objet', 'Unique, toujours renseigné, stable', 'num_cli, ref_art, matricule…', 'Il deviendra la clé primaire'],
        narration: "Un identifiant permet de distinguer chaque objet de gestion. Il est unique, toujours renseigné et stable. C'est lui qui deviendra la clé primaire dans la base de données.",
      },
      {
        type: 'code',
        titre: 'Regrouper autour des identifiants',
        lignes: ['num_cli → nom_cli, tel_cli', 'ref_art → lib_art, pu_art', 'num_fact → date_fact', '(num_fact, ref_art) → qte'],
        etapes: [
          { ligne: 0, variables: { objet: 'CLIENT' } },
          { ligne: 1, variables: { objet: 'ARTICLE' } },
          { ligne: 2, variables: { objet: 'FACTURE' } },
          { ligne: 3, variables: { objet: 'lien' }, note: 'Dépend de deux identifiants → future association' },
        ],
        narration: "On regroupe les données autour de chaque identifiant : le client, l'article, la facture. Une donnée qui dépend de deux identifiants, comme la quantité, deviendra une association dans le MCD.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Les identifiants' },
    {
      type: 'texte',
      contenu:
        "Un **identifiant** est une donnée qui permet de **distinguer chaque occurrence** d'un objet de gestion : chaque client, chaque article, chaque facture. C'est l'équivalent conceptuel de la **clé primaire** que tu connais en Base de données.",
    },
    {
      type: 'tableau',
      entetes: ['Qualité', 'Explication'],
      lignes: [
        ['Unique', 'Deux occurrences ne peuvent pas avoir la même valeur'],
        ['Toujours renseigné', 'Chaque occurrence a une valeur'],
        ['Stable', 'Sa valeur ne change pas dans le temps'],
        ['Sans signification cachée', 'Éviter les codes qui changent si la situation change (ex. code qui inclut la ville du client)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Créer un identifiant quand il n\'y en a pas',
      contenu:
        "Si les documents ne contiennent pas d'identifiant (le client n'a pas de numéro, seulement un nom), on en **crée un** : `num_cli`. C'est tout à fait normal et attendu à l'examen : le nom n'est jamais un bon identifiant (homonymes).",
    },

    { type: 'titre', contenu: '2. Regrouper les données autour des identifiants' },
    {
      type: 'texte',
      contenu:
        "Une fois le dictionnaire épuré, on cherche **de quel identifiant dépend chaque donnée** (ce sont les **dépendances fonctionnelles**, que tu as vues en Base de données). Chaque identifiant, avec les données qui en dépendent, forme un **futur objet** du MCD (une **entité**).",
    },
    {
      type: 'tableau',
      titre: 'Exemple : la facture de la quincaillerie (leçon 1)',
      entetes: ['Identifiant', 'Données qui en dépendent', 'Futur objet du MCD'],
      lignes: [
        ['num_cli', 'nom_cli, tel_cli', 'CLIENT'],
        ['ref_art', 'des_art, pu_art', 'ARTICLE'],
        ['num_fact', 'date_fact (et le client concerné)', 'FACTURE'],
        ['(num_fact, ref_art)', 'qte_cde', 'Lien entre FACTURE et ARTICLE (une future association)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'exemple',
      titre: 'Les règles de gestion',
      elements: [
        'Une facture concerne **un seul** client.',
        'Un client peut recevoir **plusieurs** factures.',
        'Une facture contient **un ou plusieurs** articles, chacun avec une quantité.',
        'Un article peut figurer sur **plusieurs** factures.',
      ],
    },
    {
      type: 'texte',
      contenu:
        "Ces **règles de gestion** décrivent comment les objets sont liés entre eux. Elles donneront les **associations** et les **cardinalités** du MCD (chapitre 4). Repère-les dès maintenant dans les énoncés : elles contiennent souvent les mots « un », « plusieurs », « au moins », « au plus ».",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Aperçu du MCD que l\'on obtiendra',
      code: `CLIENT (num_cli, nom_cli, tel_cli)
     |
  [RECEVOIR]   une facture est reçue par 1 seul client
     |
FACTURE (num_fact, date_fact)
     |
  [CONTENIR] (qte_cde)   la quantité porte sur le lien
     |
ARTICLE (ref_art, des_art, pu_art)`,
      legende:
        'Ne t\'inquiète pas si ce schéma n\'est pas encore clair : la construction du MCD (entités, associations, cardinalités) est le cœur du chapitre 4. Le dictionnaire bien fait rend cette étape beaucoup plus simple.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Un **identifiant** distingue chaque occurrence : unique, toujours renseigné, stable. On en **crée** un s\'il n\'existe pas.',
        'Chaque identifiant et les données qui en dépendent forment un **futur objet** (entité).',
        'Une donnée qui dépend de **plusieurs** identifiants portera sur un **lien** (association).',
        'Les **règles de gestion** (un, plusieurs) préparent les cardinalités.',
      ],
    },
    {
      type: 'quiz',
      question: 'Dans une école, la note d\'un devoir dépend…',
      options: ['Du matricule seul', 'Du code matière seul', 'Du matricule et du code matière (et du devoir)'],
      bonneReponse: 2,
      explication: 'Il faut connaître l\'étudiant ET la matière (et le devoir) pour connaître une note : elle porte sur un lien entre plusieurs objets.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : regrouper les données',
      enonce:
        "Dictionnaire épuré d'une bibliothèque : code_livre, titre, annee_parution, code_auteur, nom_auteur, num_lecteur, nom_lecteur, tel_lecteur, date_pret, date_retour.\nRègles : un livre a un seul auteur ; un auteur écrit plusieurs livres ; un lecteur emprunte plusieurs livres ; un livre est emprunté plusieurs fois.",
      questions: ['Repère les identifiants.', 'Regroupe les données autour des identifiants.', 'Quelles données porteront sur un lien ?'],
      langage: 'texte',
      solution: `1. Identifiants : code_livre, code_auteur, num_lecteur.

2. code_livre → titre, annee_parution (et l'auteur : code_auteur)
   code_auteur → nom_auteur
   num_lecteur → nom_lecteur, tel_lecteur

   Futurs objets : LIVRE (code_livre, titre, annee_parution)
                   AUTEUR (code_auteur, nom_auteur)
                   LECTEUR (num_lecteur, nom_lecteur, tel_lecteur)

3. date_pret et date_retour dépendent du livre ET du lecteur (et du moment
   du prêt) : elles porteront sur le lien « emprunter » entre LECTEUR et LIVRE.`,
      explication: 'Le lien entre LIVRE et AUTEUR ne porte aucune donnée : c\'est une simple association « écrire ». Celui entre LECTEUR et LIVRE porte les dates du prêt.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le bon de commande de la librairie',
      enonce:
        "LIBRAIRIE LE SAVOIR — Adjamé\nBon de commande n° BC-1207 du 03/10/2026 — Livraison prévue le : 08/10/2026\nÉcole : EP Les Cocotiers (code E-031) — Commune : Marcory — Contact : M. Aka, 05 06 07 08 09\n\nCode art. | Désignation              | Catégorie   | Prix unitaire | Qté | Montant\nCAH200    | Cahier 200 pages         | Papeterie   | 800           | 300 | 240 000\nSTY-B     | Stylo bleu (boîte de 50) | Écriture    | 4 500         | 10  | 45 000\nGEO       | Kit de géométrie         | Matériel    | 1 500         | 120 | 180 000\n\nTotal : 465 000 F — Remise (5 %) : 23 250 F — Net à payer : 441 750 F\n\nRègles : une école passe plusieurs commandes ; une commande concerne une seule école ; un article appartient à une seule catégorie.",
      questions: [
        'Établis le dictionnaire des données brut.',
        'Épure-le (synonymes, polysèmes, calculées, paramètres, composées), en justifiant.',
        'Repère les identifiants (crée-en si nécessaire) et regroupe les données en futurs objets.',
        'Quelles données porteront sur un lien ?',
      ],
      langage: 'texte',
      solution: `1. Données brutes : num_bc, date (commande), date (livraison), code_ecole,
   nom_ecole, commune_ecole, contact (nom + téléphone), code_art, des_art,
   categorie, prix_unitaire, quantite, montant, total, taux_remise,
   montant_remise, net_a_payer.

2. Épuration :
   - Polysème « date » → date_cde et date_liv_prevue.
   - Composée « contact » → nom_contact et tel_contact.
   - Calculées : montant (pu × qté), total (somme des montants),
     montant_remise (total × taux), net_a_payer (total − remise).
   - Paramètre : taux_remise (5 %), si la remise est la même pour toutes
     les commandes (sinon c'est une donnée de la commande : hypothèse à écrire).
   - « LIBRAIRIE LE SAVOIR » : paramètre (toujours la même), retiré.

   Dictionnaire épuré :
   num_bc, date_cde, date_liv_prevue, code_ecole, nom_ecole, commune_ecole,
   nom_contact, tel_contact, code_art, des_art, lib_cat, prix_unitaire, quantite

3. Identifiants : num_bc, code_ecole, code_art, et on crée code_cat
   pour la catégorie (un libellé n'est pas un bon identifiant).

   ECOLE (code_ecole, nom_ecole, commune_ecole, nom_contact, tel_contact)
   COMMANDE (num_bc, date_cde, date_liv_prevue)    — liée à 1 école
   ARTICLE (code_art, des_art, prix_unitaire)      — lié à 1 catégorie
   CATEGORIE (code_cat, lib_cat)

4. La quantite dépend de la commande ET de l'article : elle porte sur le lien
   « contenir » entre COMMANDE et ARTICLE.`,
      explication:
        "Ce sujet suit exactement la progression de l'épreuve : dictionnaire brut, épuration justifiée, identifiants et regroupements. Vérifie les calculs du document : 240 000 + 45 000 + 180 000 = 465 000 ; 5 % = 23 250 ; net = 441 750. Créer code_cat montre que tu as compris le rôle d'un identifiant.",
    },
  ],
}

export const leconsDictionnaire: Lecon[] = [lecon1, lecon2, lecon3]

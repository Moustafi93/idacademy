import type { Lecon } from '../types'

/*
 * Base de données — Chapitre 2 : La normalisation
 * Utilise la base « inscription_brute » (une seule table, non normalisée)
 * pour montrer les anomalies, et la base « scolarite » (normalisée) pour comparer.
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'pourquoi-normaliser',
  titre: 'Pourquoi normaliser ? Les dépendances fonctionnelles',
  duree: '25 min',
  objectifs: [
    'Reconnaître les anomalies d\'une table mal conçue',
    'Comprendre la notion de dépendance fonctionnelle',
    'Trouver les dépendances fonctionnelles d\'une table',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Pourquoi normaliser ?', sousTitre: 'Le résumé en 2 minutes', narration: 'Pourquoi normaliser une base de données ? Voici l\'essentiel.' },
      {
        type: 'points',
        titre: 'Une seule grosse table, c\'est…',
        points: ['Des données répétées partout (redondance)', 'Anomalie de mise à jour', 'Anomalie d\'insertion', 'Anomalie de suppression'],
        narration: "Mettre toutes les données dans une seule grosse table, c'est répéter les mêmes informations partout. Et cela crée trois anomalies : de mise à jour, d'insertion, et de suppression.",
      },
      {
        type: 'comparaison',
        titre: 'Les trois anomalies',
        colonnes: [
          { nom: 'Mise à jour', texte: 'On modifie une copie, les autres restent fausses' },
          { nom: 'Insertion', texte: 'Impossible d\'ajouter une matière sans étudiant' },
          { nom: 'Suppression', texte: 'Supprimer un étudiant efface sa filière' },
        ],
        narration: "Mise à jour : on modifie une copie, les autres deviennent fausses. Insertion : on ne peut pas ajouter une matière tant qu'aucun étudiant n'y est inscrit. Suppression : effacer le dernier étudiant d'une filière fait disparaître la filière.",
      },
      {
        type: 'code',
        titre: 'La dépendance fonctionnelle',
        lignes: ['matricule → nom, prenom', 'code_matiere → libelle_matiere, coefficient', '(matricule, code_matiere) → note'],
        etapes: [
          { ligne: 0, variables: { si_je_connais: 'matricule' }, note: 'Un matricule → un seul nom' },
          { ligne: 1, variables: { si_je_connais: 'code_matiere' }, note: 'Un code → un seul libellé et coefficient' },
          { ligne: 2, variables: { si_je_connais: 'les deux' }, note: 'Il faut les deux pour connaître la note' },
        ],
        narration: "Une dépendance fonctionnelle, c'est quand la valeur d'une donnée permet de trouver une seule valeur d'une autre. Le matricule donne le nom. Le code matière donne le libellé. Et il faut le matricule et le code matière pour connaître la note.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Une table qui pose problème' },
    {
      type: 'texte',
      contenu:
        "Un débutant qui crée une base pour les notes d'un établissement met souvent **tout dans une seule table** : l'étudiant, sa filière, la matière et la note. Exécute la requête ci-dessous pour voir cette table.",
    },
    {
      type: 'sql',
      base: 'inscription_brute',
      titre: 'La table INSCRIPTION (non normalisée)',
      requete: 'SELECT *\nFROM inscription;',
      legende:
        "Compte combien de fois sont écrits « Koné Awa », le libellé de la filière IDA ou le coefficient de l'algorithmique. Tout est répété : c'est de la **redondance**.",
    },
    {
      type: 'texte',
      contenu:
        "Cette redondance gaspille de la place, mais surtout elle provoque trois **anomalies**, c'est-à-dire des situations où la base devient fausse ou impossible à utiliser correctement.",
    },

    { type: 'titre', contenu: '2. Les trois anomalies' },
    {
      type: 'texte',
      contenu:
        "**Anomalie de mise à jour** : la filière IDA change de nom. Si on oublie de modifier une seule des lignes, la base contient deux libellés différents pour la même filière. Voyons ce qui arrive si on ne modifie que la première ligne :",
    },
    {
      type: 'sql',
      base: 'inscription_brute',
      titre: 'Une mise à jour incomplète',
      requete:
        "UPDATE inscription\nSET libelle_filiere = 'Informatique Dév. Applications'\nWHERE matricule = 'IDA001' AND code_matiere = 'ALGO';\n\nSELECT DISTINCT code_filiere, libelle_filiere\nFROM inscription;",
      legende: 'La filière IDA a maintenant **deux libellés** : la base se contredit. `SELECT DISTINCT` affiche chaque combinaison une seule fois.',
    },
    {
      type: 'tableau',
      entetes: ['Anomalie', 'Ce qui se passe', 'Dans notre table'],
      lignes: [
        ['De mise à jour', 'Une même information est stockée plusieurs fois ; si on n\'en modifie qu\'une partie, la base devient incohérente', 'Changer le coefficient de l\'algorithmique oblige à modifier toutes les lignes ALGO'],
        ['D\'insertion', 'On ne peut pas enregistrer une information sans en avoir une autre', 'Impossible d\'ajouter la nouvelle matière « Réseaux » tant qu\'aucun étudiant n\'a de note dedans'],
        ['De suppression', 'Supprimer une information en fait disparaître une autre qu\'on voulait garder', 'Si Mariam Ouattara quitte l\'établissement, la filière GEC disparaît de la base'],
      ],
    },
    {
      type: 'texte',
      contenu:
        "La **normalisation** est la méthode qui permet d'éviter ces anomalies, en **découpant** la grosse table en plusieurs petites tables bien construites. Pour savoir comment découper, on s'appuie sur les **dépendances fonctionnelles**.",
    },

    { type: 'titre', contenu: '3. Les dépendances fonctionnelles' },
    {
      type: 'texte',
      contenu:
        "On dit que **B dépend fonctionnellement de A**, et on note **A → B**, si **à une valeur de A correspond une seule valeur de B**. Autrement dit : si je connais A, je connais B.",
    },
    {
      type: 'tableau',
      titre: 'Les dépendances fonctionnelles de la table INSCRIPTION',
      entetes: ['Dépendance', 'Se lit', 'Pourquoi'],
      lignes: [
        ['matricule → nom, prenom, code_filiere', 'le matricule détermine le nom, le prénom et la filière', 'Un matricule correspond à un seul étudiant'],
        ['code_filiere → libelle_filiere', 'le code filière détermine son libellé', 'Un code correspond à une seule filière'],
        ['code_matiere → libelle_matiere, coefficient', 'le code matière détermine le libellé et le coefficient', 'Une matière a un seul nom et un seul coefficient'],
        ['(matricule, code_matiere) → note', 'le couple détermine la note', 'Un étudiant a une seule note par matière'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le sens de la flèche compte',
      contenu:
        "`matricule → nom` est vraie, mais `nom → matricule` est **fausse** : deux étudiants peuvent s'appeler Koné. Pour vérifier une dépendance A → B, demande-toi : « est-ce que deux lignes avec le même A peuvent avoir des B différents ? » Si oui, la dépendance n'existe pas.",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Le lien avec les clés',
      contenu:
        "Une **clé primaire** est justement un attribut (ou un groupe d'attributs) dont **tous les autres attributs dépendent**. Dans INSCRIPTION, aucune colonne seule ne suffit : la clé est le couple (matricule, code_matiere).",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Tout mettre dans une seule table crée de la **redondance** et trois anomalies : **mise à jour**, **insertion**, **suppression**.',
        '**A → B** : à une valeur de A correspond une seule valeur de B.',
        'La clé primaire détermine tous les autres attributs.',
        'La **normalisation** découpe les tables à partir des dépendances fonctionnelles.',
      ],
    },
    {
      type: 'quiz',
      question: 'Dans une table PRODUIT, laquelle de ces dépendances est vraie ?',
      options: ['designation → reference', 'reference → designation', 'prix → reference'],
      bonneReponse: 1,
      explication: 'Une référence correspond à un seul produit, donc à une seule désignation. L\'inverse est faux : deux produits peuvent avoir la même désignation (ou le même prix).',
    },
    {
      type: 'quiz',
      question: 'Supprimer le dernier client d\'une ville fait disparaître le code postal de cette ville de la base. Quelle anomalie est-ce ?',
      options: ['Anomalie d\'insertion', 'Anomalie de mise à jour', 'Anomalie de suppression'],
      bonneReponse: 2,
      explication: 'Une suppression a fait perdre une information qu\'on voulait garder : c\'est l\'anomalie de suppression.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : vraie ou fausse ?',
      enonce: 'Dans la base d\'une agence de voyages, dis si chaque dépendance fonctionnelle est vraie ou fausse, et justifie.',
      questions: [
        'num_client → nom_client',
        'nom_client → telephone_client',
        'num_reservation → num_client',
        'num_client → num_reservation',
        'code_ville → nom_ville',
      ],
      langage: 'texte',
      solution: `1. Vraie : un numéro client correspond à un seul client.
2. Fausse : deux clients peuvent avoir le même nom et des téléphones différents.
3. Vraie : une réservation est faite par un seul client.
4. Fausse : un client peut faire plusieurs réservations.
5. Vraie : un code correspond à une seule ville.`,
      explication: 'Pour les questions 3 et 4, la même paire d\'attributs donne une dépendance vraie dans un sens et fausse dans l\'autre : c\'est exactement le sens de la flèche.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : repérer les anomalies',
      enonce:
        "Une boutique enregistre ses ventes dans une seule table :\n\nVENTE (num_vente, date_vente, ref_produit, designation, prix_unitaire, quantite, num_vendeur, nom_vendeur)",
      questions: ['Donne un exemple de chacune des trois anomalies.', 'Écris les dépendances fonctionnelles de cette table.'],
      langage: 'texte',
      solution: `1. Anomalies :
   - Mise à jour : si le prix d'un produit change, il faut le modifier sur
     toutes les ventes de ce produit ; en oublier une rend la base incohérente.
   - Insertion : impossible d'enregistrer un nouveau produit (ou un nouveau
     vendeur) tant qu'il n'a pas été vendu (ou n'a rien vendu).
   - Suppression : supprimer la seule vente d'un produit fait disparaître
     ce produit (sa désignation et son prix) de la base.

2. Dépendances fonctionnelles (en supposant une vente = un produit) :
   num_vente → date_vente, ref_produit, quantite, num_vendeur
   ref_produit → designation, prix_unitaire
   num_vendeur → nom_vendeur`,
      explication: 'Remarque : il manque une table PRODUIT et une table VENDEUR. Les dépendances fonctionnelles l\'indiquent : chaque « tête de flèche » différente deviendra une table.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le centre de formation',
      enonce:
        "Un centre de formation en informatique de Cocody gère les inscriptions dans un fichier unique :\n\nINSCRIPTION (num_stagiaire, nom_stagiaire, tel_stagiaire, code_formation, intitule_formation, duree_heures, prix_formation, code_formateur, nom_formateur, date_inscription)\n\nRègles de gestion : un stagiaire peut s'inscrire à plusieurs formations ; chaque formation est animée par un seul formateur ; un formateur peut animer plusieurs formations.",
      questions: [
        'Montre, avec un exemple, que cette table présente une redondance.',
        'Illustre chacune des trois anomalies dans ce contexte.',
        'Établis la liste des dépendances fonctionnelles.',
        'Quelle est la clé primaire de la table INSCRIPTION ? Justifie.',
      ],
      langage: 'texte',
      solution: `1. Si 20 stagiaires suivent la formation « Développement web », son intitulé,
   sa durée, son prix et le nom de son formateur sont recopiés 20 fois.

2. - Mise à jour : si le prix de la formation augmente, il faut le modifier
     sur toutes les lignes de cette formation.
   - Insertion : impossible d'enregistrer une nouvelle formation (ou un
     nouveau formateur) tant qu'aucun stagiaire n'y est inscrit.
   - Suppression : si l'unique stagiaire d'une formation annule son
     inscription, la formation et son formateur disparaissent de la base.

3. Dépendances fonctionnelles :
   num_stagiaire → nom_stagiaire, tel_stagiaire
   code_formation → intitule_formation, duree_heures, prix_formation, code_formateur
   code_formateur → nom_formateur
   (num_stagiaire, code_formation) → date_inscription

4. La clé primaire est (num_stagiaire, code_formation) :
   - un stagiaire peut suivre plusieurs formations (num_stagiaire seul ne suffit pas) ;
   - une formation a plusieurs stagiaires (code_formation seul ne suffit pas) ;
   - le couple détermine tous les autres attributs (directement ou par
     l'intermédiaire de num_stagiaire et code_formation).`,
      explication:
        "Les règles de gestion de l'énoncé sont essentielles : « chaque formation est animée par un seul formateur » donne code_formation → code_formateur. Lis toujours ces règles avant d'écrire tes dépendances. Ce sujet sera normalisé jusqu'en 3FN dans la dernière leçon du chapitre.",
    },
  ],
  exercice: {
    id: 'sql-distinct-filieres',
    titre: 'Repérer la redondance',
    consigne:
      'Dans la table non normalisée inscription, affiche chaque matière une seule fois avec son code, son libellé et son coefficient (utilise SELECT DISTINCT).',
    langage: 'sql',
    base: 'inscription_brute',
    codeDepart: '-- DISTINCT supprime les lignes en double du résultat\nSELECT\nFROM inscription;\n',
    indice: 'SELECT DISTINCT code_matiere, libelle_matiere, coefficient FROM inscription;',
    solution: 'SELECT DISTINCT code_matiere, libelle_matiere, coefficient\nFROM inscription;',
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: '1fn-et-2fn',
  titre: 'Première et deuxième formes normales',
  duree: '25 min',
  objectifs: [
    'Vérifier qu\'une table est en 1FN (valeurs atomiques)',
    'Repérer une dépendance partielle',
    'Décomposer une table pour la mettre en 2FN',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: '1FN et 2FN', sousTitre: 'Le résumé en 2 minutes', narration: 'La première et la deuxième formes normales, en deux minutes.' },
      {
        type: 'points',
        titre: '1re forme normale (1FN)',
        points: ['Une clé primaire', 'Une seule valeur par case (atomique)', 'Pas de liste : « 0707…, 0505… »', 'Pas de groupe répété : tel1, tel2, tel3'],
        narration: "Une table est en première forme normale si elle a une clé primaire, et si chaque case contient une seule valeur : pas de liste, et pas de colonnes répétées comme téléphone un, téléphone deux.",
      },
      {
        type: 'points',
        titre: '2e forme normale (2FN)',
        points: ['Être en 1FN', 'Concerne les clés composées', 'Chaque attribut dépend de TOUTE la clé', 'Pas d\'une partie seulement'],
        narration: "Pour la deuxième forme normale, la table doit être en 1FN, et chaque attribut doit dépendre de toute la clé, et pas d'une partie seulement. Cela ne concerne que les clés composées.",
      },
      {
        type: 'code',
        titre: 'Exemple de décomposition',
        lignes: ['INSCRIPTION (matricule, code_matiere, nom, libelle, note)', '→ ETUDIANT (matricule, nom)', '→ MATIERE (code_matiere, libelle)', '→ NOTE (#matricule, #code_matiere, note)'],
        etapes: [
          { ligne: 0, variables: { probleme: 'nom dépend de matricule seul' } },
          { ligne: 1, variables: { probleme: 'réglé' }, note: 'nom part avec matricule' },
          { ligne: 2, variables: { probleme: 'réglé' }, note: 'libellé part avec code_matiere' },
          { ligne: 3, variables: { probleme: 'réglé' }, note: 'note dépend bien des deux' },
        ],
        narration: "Le nom ne dépend que du matricule : il part dans une table étudiant. Le libellé ne dépend que du code matière : il part dans une table matière. Et la note, qui dépend des deux, reste avec la clé complète.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La première forme normale (1FN)' },
    {
      type: 'texte',
      contenu: 'Une table est en **première forme normale** si :',
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        'elle possède une **clé primaire** ;',
        'chaque attribut est **atomique** : une case contient **une seule valeur**, qu\'on ne peut pas découper ;',
        'il n\'y a pas de **groupe répétitif** (des colonnes comme telephone1, telephone2, telephone3).',
      ],
    },
    {
      type: 'tableau',
      titre: 'Une table qui n\'est PAS en 1FN',
      entetes: ['num_client', 'nom_complet', 'telephones'],
      lignes: [
        ['C01', 'Bamba Ibrahim', '0707070707, 0505050505'],
        ['C02', 'Koffi Ama', '0101010101'],
      ],
      legende:
        '`telephones` contient parfois deux valeurs (liste), et `nom_complet` mélange nom et prénom : on ne peut pas trier par nom ni chercher un numéro facilement.',
    },
    {
      type: 'texte',
      contenu:
        "Pour passer en 1FN, on **sépare** les valeurs composées (nom et prénom dans deux colonnes) et on place les valeurs multiples dans une **table à part**, reliée par une clé étrangère :",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Après correction : en 1FN',
      code: `CLIENT (num_client, nom, prenom)
TELEPHONE (numero, #num_client)`,
      legende: 'Un client peut maintenant avoir autant de numéros qu\'il veut, sans changer la structure de la table.',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Le piège des colonnes numérotées',
      contenu:
        "Remplacer la liste par `telephone1, telephone2, telephone3` n'est **pas** une solution : c'est un groupe répétitif. Que faire si un client a 4 numéros ? Et les colonnes sont vides pour ceux qui n'en ont qu'un. Dès que tu vois des colonnes numérotées, pense « table à part ».",
    },

    { type: 'titre', contenu: '2. La deuxième forme normale (2FN)' },
    {
      type: 'texte',
      contenu:
        "Une table est en **deuxième forme normale** si elle est **en 1FN** et si **chaque attribut qui ne fait pas partie de la clé dépend de toute la clé**, et pas seulement d'une partie. On dit qu'il n'y a **pas de dépendance partielle**.",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Raccourci utile',
      contenu:
        "La 2FN ne pose problème qu'avec une **clé composée** (plusieurs colonnes). Une table en 1FN dont la clé primaire est une **seule colonne** est **automatiquement en 2FN** : on ne peut pas dépendre d'une « partie » d'une seule colonne.",
    },
    {
      type: 'texte',
      contenu: "Reprenons notre table INSCRIPTION. Sa clé est (matricule, code_matiere). Regardons de quoi dépend chaque attribut :",
    },
    {
      type: 'tableau',
      entetes: ['Attribut', 'Dépend de', 'Dépendance partielle ?'],
      lignes: [
        ['nom, prenom, code_filiere, libelle_filiere', 'matricule seulement', 'Oui → problème'],
        ['libelle_matiere, coefficient', 'code_matiere seulement', 'Oui → problème'],
        ['note', '(matricule, code_matiere) : toute la clé', 'Non → OK'],
      ],
    },
    {
      type: 'texte',
      contenu:
        "**Méthode de décomposition** : pour chaque partie de la clé dont dépendent des attributs, on crée une **nouvelle table** dont cette partie devient la clé, et on y **déplace** ces attributs. Dans la table d'origine, il ne reste que la clé complète et les attributs qui en dépendent entièrement.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'INSCRIPTION décomposée en 2FN',
      code: `ETUDIANT (matricule, nom, prenom, code_filiere, libelle_filiere)
MATIERE (code_matiere, libelle_matiere, coefficient)
NOTE (#matricule, #code_matiere, note)`,
    },
    {
      type: 'texte',
      contenu:
        "Les anomalies liées aux matières ont disparu : on peut ajouter la matière « Réseaux » sans aucune note, et changer un coefficient ne touche qu'une ligne. Mais la table ETUDIANT a encore un problème : le libellé de la filière est répété pour chaque étudiant de la filière. On le règle avec la 3FN, dans la leçon suivante.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '**1FN** : une clé primaire, des valeurs **atomiques**, pas de groupe répétitif.',
        '**2FN** : 1FN + **pas de dépendance partielle** (un attribut ne dépend pas d\'une partie de la clé).',
        'Une table en 1FN avec une clé à **une seule colonne** est déjà en 2FN.',
        'Décomposer : chaque partie de clé « déterminante » devient la clé d\'une nouvelle table.',
      ],
    },
    {
      type: 'quiz',
      question: 'La table ETUDIANT(matricule, nom, prenom, ville) est en 1FN. Est-elle en 2FN ?',
      options: ['Oui, forcément', 'Non, jamais', 'Impossible à dire'],
      bonneReponse: 0,
      explication: 'Sa clé n\'a qu\'une seule colonne (matricule) : il ne peut pas y avoir de dépendance partielle. Elle est donc en 2FN.',
    },
    {
      type: 'quiz',
      question: 'Dans LIGNE_COMMANDE(num_commande, ref_produit, designation, quantite), quel attribut crée une dépendance partielle ?',
      options: ['quantite', 'designation', 'aucun'],
      bonneReponse: 1,
      explication: 'designation dépend de ref_produit seul (une partie de la clé). quantite dépend bien du couple : une quantité d\'un produit dans une commande.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : mettre en 1FN',
      enonce:
        "La table suivante n'est pas en 1FN. Explique pourquoi et propose une correction.\n\nETUDIANT (matricule, nom_prenom, adresse_complete, matieres_suivies)\n\nExemple de ligne : (IDA010, « Zadi Serge », « Rue 12, Cocody, Abidjan », « ALGO, BD, ANG »)",
      langage: 'texte',
      solution: `Pourquoi : nom_prenom et adresse_complete contiennent plusieurs informations
(non atomiques), et matieres_suivies contient une liste de valeurs.

Correction :
ETUDIANT (matricule, nom, prenom, rue, commune, ville)
MATIERE (code_matiere, libelle)
SUIVRE (#matricule, #code_matiere)`,
      explication: 'La liste des matières devient une table de liaison SUIVRE : une ligne par couple (étudiant, matière). C\'est le même principe que la table NOTE de notre base d\'exemple.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : mettre en 2FN',
      enonce:
        "La table suivante est en 1FN :\n\nLIGNE_FACTURE (num_facture, ref_produit, designation, prix_unitaire, quantite, date_facture)",
      questions: ['Quelle est la clé primaire ?', 'Repère les dépendances partielles.', 'Décompose la table en 2FN.'],
      langage: 'texte',
      solution: `1. Clé primaire : (num_facture, ref_produit).

2. Dépendances partielles :
   ref_produit → designation, prix_unitaire
   num_facture → date_facture

3. Décomposition :
   PRODUIT (ref_produit, designation, prix_unitaire)
   FACTURE (num_facture, date_facture)
   LIGNE_FACTURE (#num_facture, #ref_produit, quantite)`,
      explication: 'Il y a deux dépendances partielles, vers chacune des deux parties de la clé : on crée donc deux nouvelles tables. Seule la quantité dépend du couple.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les réparations d\'un garage',
      enonce:
        "Un garage de Yopougon enregistre ses réparations ainsi :\n\nREPARATION (num_reparation, date_rep, immatriculation, marque, modele, nom_proprietaire, codes_pieces, km_compteur)\n\nLa colonne codes_pieces contient la liste des pièces changées, par exemple « P12, P45, P07 ». Chaque pièce a une désignation et un prix.",
      questions: [
        'La table est-elle en 1FN ? Justifie.',
        'Propose une structure en 1FN, en créant une table PIECE.',
        'Dans la nouvelle table qui relie réparations et pièces, quelle est la clé primaire ? Ajoute-y la quantité de chaque pièce.',
        'Les tables obtenues sont-elles en 2FN ? Justifie pour chacune.',
      ],
      langage: 'texte',
      solution: `1. Non : codes_pieces contient plusieurs valeurs (une liste), ce n'est pas
   un attribut atomique.

2. PIECE (code_piece, designation, prix)
   REPARATION (num_reparation, date_rep, immatriculation, marque, modele,
               nom_proprietaire, km_compteur)
   UTILISER (#num_reparation, #code_piece, quantite)

3. Clé primaire de UTILISER : (num_reparation, code_piece). Une réparation
   utilise plusieurs pièces, et une pièce est utilisée dans plusieurs
   réparations : le couple est unique. La quantité dépend du couple.

4. - PIECE : clé à une seule colonne → en 2FN.
   - REPARATION : clé à une seule colonne → en 2FN.
   - UTILISER : quantite dépend de tout le couple → en 2FN.
   (Remarque : REPARATION contient encore marque, modele, nom_proprietaire
   qui dépendent de immatriculation et non directement de num_reparation :
   c'est une dépendance transitive, réglée par la 3FN.)`,
      explication:
        "Le correcteur attend une justification pour chaque table, pas seulement « oui ». Et la remarque de la question 4 montre que tu as déjà repéré le problème suivant : c'est très apprécié.",
    },
  ],
  exercice: {
    id: 'sql-etudiantes',
    titre: 'Les étudiantes',
    consigne: "Dans la base « Scolarité » (normalisée), affiche le nom, le prénom et la ville de toutes les étudiantes (sexe = 'F').",
    langage: 'sql',
    base: 'scolarite',
    codeDepart: '-- Projection (colonnes) + sélection (WHERE)\n\n',
    indice: "SELECT nom, prenom, ville FROM etudiant WHERE sexe = 'F';",
    solution: "SELECT nom, prenom, ville\nFROM etudiant\nWHERE sexe = 'F';",
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'troisieme-forme-normale',
  titre: 'La troisième forme normale et la méthode complète',
  duree: '30 min',
  objectifs: [
    'Repérer une dépendance transitive',
    'Mettre une table en 3FN',
    'Normaliser une table de A à Z, comme à l\'examen',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'La 3e forme normale', sousTitre: 'Le résumé en 2 minutes', narration: 'La troisième forme normale, et la méthode complète, en deux minutes.' },
      {
        type: 'points',
        titre: '3e forme normale (3FN)',
        points: ['Être en 2FN', 'Pas de dépendance transitive', 'Un attribut non clé ne dépend pas d\'un autre attribut non clé'],
        narration: "Une table est en troisième forme normale si elle est en 2FN, et si aucun attribut non clé ne dépend d'un autre attribut non clé. On dit qu'il n'y a pas de dépendance transitive.",
      },
      {
        type: 'code',
        titre: 'Repérer la transitivité',
        lignes: ['matricule → code_filiere', 'code_filiere → libelle_filiere', 'donc matricule → libelle (transitive)'],
        etapes: [
          { ligne: 0, variables: { etape: '1' } },
          { ligne: 1, variables: { etape: '2' }, note: 'Un non-clé détermine un autre non-clé' },
          { ligne: 2, variables: { etape: '3' }, note: '→ FILIERE devient une table à part' },
        ],
        narration: "Le matricule donne le code filière, et le code filière donne le libellé. Le libellé dépend donc du matricule en passant par le code filière : c'est transitif. La filière doit devenir une table à part.",
      },
      {
        type: 'points',
        titre: 'La méthode en 4 étapes',
        points: ['1. Lister les dépendances fonctionnelles', '2. 1FN : valeurs atomiques, clé', '3. 2FN : enlever les dépendances partielles', '4. 3FN : enlever les dépendances transitives'],
        narration: "La méthode complète : liste les dépendances, mets en 1FN, puis enlève les dépendances partielles pour la 2FN, et enfin les dépendances transitives pour la 3FN.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. La troisième forme normale (3FN)' },
    {
      type: 'texte',
      contenu:
        "Une table est en **troisième forme normale** si elle est **en 2FN** et si **aucun attribut non clé ne dépend d'un autre attribut non clé**. On dit qu'il n'y a **pas de dépendance transitive**.",
    },
    {
      type: 'texte',
      contenu: 'Reprenons la table ETUDIANT obtenue à la leçon précédente :',
    },
    {
      type: 'code',
      langage: 'algo',
      code: 'ETUDIANT (matricule, nom, prenom, code_filiere, libelle_filiere)',
    },
    {
      type: 'texte',
      contenu:
        "On a `matricule → code_filiere` et `code_filiere → libelle_filiere`. Le libellé dépend du matricule, mais **en passant par** code_filiere, qui n'est pas la clé : c'est une **dépendance transitive** (comme une transitivité en mathématiques : si A → B et B → C, alors A → C).",
    },
    {
      type: 'tableau',
      titre: 'Conséquence : encore de la redondance',
      entetes: ['matricule', 'nom', 'code_filiere', 'libelle_filiere'],
      lignes: [
        ['IDA001', 'Koné', 'IDA', 'Informatique Développeur d\'Application'],
        ['IDA002', 'Traoré', 'IDA', 'Informatique Développeur d\'Application'],
        ['IDA003', 'Kouassi', 'IDA', 'Informatique Développeur d\'Application'],
      ],
      legende: 'Le libellé est répété pour chaque étudiant de la filière : les trois anomalies sont toujours possibles pour les filières.',
    },
    {
      type: 'texte',
      contenu:
        "**Correction** : l'attribut « intermédiaire » (`code_filiere`) devient la clé d'une **nouvelle table**, qui reçoit les attributs qui en dépendent (`libelle_filiere`). Dans la table d'origine, `code_filiere` **reste**, comme **clé étrangère**.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'ETUDIANT décomposée en 3FN',
      code: `FILIERE (code_filiere, libelle_filiere)
ETUDIANT (matricule, nom, prenom, #code_filiere)`,
    },
    {
      type: 'texte',
      contenu:
        "C'est exactement la structure de la base « Scolarité » que tu utilises depuis le début. Grâce à la jointure, on retrouve toutes les informations de l'ancienne grosse table, mais chacune n'est stockée qu'une fois :",
    },
    {
      type: 'sql',
      base: 'scolarite',
      titre: 'Reconstituer l\'information à partir des tables normalisées',
      requete:
        'SELECT etudiant.nom, filiere.libelle, matiere.libelle, note.note\nFROM etudiant, filiere, note, matiere\nWHERE etudiant.code_filiere = filiere.code_filiere\n  AND note.matricule = etudiant.matricule\n  AND note.code_matiere = matiere.code_matiere;',
      legende: 'Normaliser ne fait rien perdre : les clés étrangères permettent de tout relier au moment de la requête.',
    },

    { type: 'titre', contenu: '2. La méthode complète, pas à pas' },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        '**Lister les dépendances fonctionnelles** à partir des données et des règles de gestion.',
        '**1FN** : rendre les attributs atomiques, supprimer les listes et groupes répétitifs, trouver la clé primaire.',
        '**2FN** : si la clé est composée, sortir les attributs qui ne dépendent que d\'une partie de la clé.',
        '**3FN** : sortir les attributs qui dépendent d\'un attribut non clé, en gardant celui-ci comme clé étrangère.',
        '**Écrire le schéma relationnel final** : clés primaires soulignées, clés étrangères avec #.',
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Le moyen mnémotechnique',
      contenu:
        "Chaque attribut non clé doit dépendre « **de la clé** (1FN), **de toute la clé** (2FN), **et de rien d'autre que la clé** (3FN) ».",
    },

    { type: 'titre', contenu: '3. Exemple complet : la facture' },
    {
      type: 'texte',
      contenu:
        "Une quincaillerie enregistre ses factures dans une seule table. Une facture concerne un client et peut contenir plusieurs produits.",
    },
    {
      type: 'code',
      langage: 'algo',
      code: 'FACTURE (num_facture, date_facture, num_client, nom_client, ville_client, ref_produit, designation, prix_unitaire, quantite)',
    },
    {
      type: 'tableau',
      titre: 'Étape 1 : les dépendances fonctionnelles',
      entetes: ['Dépendance', 'Justification'],
      lignes: [
        ['num_facture → date_facture, num_client', 'Une facture a une date et un seul client'],
        ['num_client → nom_client, ville_client', 'Un client a un nom et une ville'],
        ['ref_produit → designation, prix_unitaire', 'Un produit a une désignation et un prix'],
        ['(num_facture, ref_produit) → quantite', 'La quantité d\'un produit dans une facture'],
      ],
    },
    {
      type: 'tableau',
      titre: 'Étapes 2 à 4',
      entetes: ['Étape', 'Constat', 'Résultat'],
      lignes: [
        ['1FN', 'Valeurs atomiques ; une facture a plusieurs produits → clé (num_facture, ref_produit)', 'FACTURE (num_facture, ref_produit, …) en 1FN'],
        ['2FN', 'date_facture, num_client, nom_client, ville_client dépendent de num_facture seul ; designation, prix_unitaire de ref_produit seul', 'FACTURE (num_facture, date_facture, num_client, nom_client, ville_client)\nPRODUIT (ref_produit, designation, prix_unitaire)\nLIGNE_FACTURE (#num_facture, #ref_produit, quantite)'],
        ['3FN', 'Dans FACTURE : num_facture → num_client → nom_client, ville_client (transitive)', 'CLIENT (num_client, nom_client, ville_client)\nFACTURE (num_facture, date_facture, #num_client)'],
      ],
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Schéma relationnel final (3FN)',
      code: `CLIENT (num_client, nom_client, ville_client)
FACTURE (num_facture, date_facture, #num_client)
PRODUIT (ref_produit, designation, prix_unitaire)
LIGNE_FACTURE (#num_facture, #ref_produit, quantite)`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les données calculées',
      contenu:
        "Le montant d'une ligne (prix × quantité) ou le total d'une facture ne sont **pas** stockés : ils se **calculent** dans la requête quand on en a besoin. Les stocker créerait de la redondance (et des incohérences si le prix change).",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '**3FN** : 2FN + **pas de dépendance transitive** (non clé → non clé).',
        'Correction : l\'attribut intermédiaire devient la clé d\'une nouvelle table, et reste en clé étrangère.',
        'Méthode : **DF → 1FN → 2FN → 3FN → schéma final**.',
        '« De la clé, de toute la clé, et de rien d\'autre que la clé. »',
      ],
    },
    {
      type: 'quiz',
      question: 'EMPLOYE(matricule, nom, code_service, nom_service). Quelle forme normale n\'est pas respectée ?',
      options: ['1FN', '2FN', '3FN'],
      bonneReponse: 2,
      explication: 'La clé est simple, donc la 2FN est respectée. Mais code_service → nom_service, et code_service n\'est pas la clé : dépendance transitive, la 3FN n\'est pas respectée.',
    },
    {
      type: 'quiz',
      question: 'Pour mettre EMPLOYE en 3FN, que devient code_service dans la table EMPLOYE ?',
      options: ['Il est supprimé', 'Il reste comme clé étrangère', 'Il devient la clé primaire d\'EMPLOYE'],
      bonneReponse: 1,
      explication: 'On crée SERVICE(code_service, nom_service), et EMPLOYE garde #code_service pour savoir dans quel service travaille chaque employé.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : mettre en 3FN',
      enonce:
        "Mets la table suivante en 3FN :\n\nCOMMANDE (num_commande, date_commande, num_client, nom_client, code_commune, nom_commune)",
      langage: 'texte',
      solution: `Dépendances :
num_commande → date_commande, num_client
num_client → nom_client, code_commune
code_commune → nom_commune

La clé (num_commande) est simple : la table est en 2FN.
Dépendances transitives : num_commande → num_client → nom_client, code_commune
                         et num_client → code_commune → nom_commune

Schéma en 3FN :
COMMUNE (code_commune, nom_commune)
CLIENT (num_client, nom_client, #code_commune)
COMMANDE (num_commande, date_commande, #num_client)`,
      explication: 'Il y a ici une « chaîne » de deux transitivités : on crée une table pour chaque attribut intermédiaire (num_client, puis code_commune).',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : diagnostic',
      enonce: 'Indique la plus haute forme normale respectée par chaque table, et justifie.',
      questions: [
        'PRODUIT (ref, designation, prix, code_categorie, libelle_categorie)',
        'SUIVRE (matricule, code_matiere, nom_etudiant, note)',
        'CLIENT (num_client, nom, prenom, telephones)  — telephones peut contenir plusieurs numéros',
        'VILLE (code_ville, nom_ville, region)',
      ],
      langage: 'texte',
      solution: `1. 2FN seulement : clé simple, mais code_categorie → libelle_categorie
   (transitive).
2. 1FN seulement : nom_etudiant dépend de matricule seul (partielle).
3. Pas en 1FN : telephones n'est pas atomique.
4. 3FN : clé simple, et nom_ville, region dépendent directement de la clé
   (en supposant que la région ne dépend pas du nom de la ville).`,
      explication: 'Pour chaque table : vérifie d\'abord l\'atomicité (1FN), puis le type de clé (simple ou composée) pour la 2FN, et enfin les dépendances entre attributs non clés (3FN).',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Normalisation complète : le centre de formation',
      enonce:
        "On reprend la table du centre de formation de Cocody (leçon 1 du chapitre) :\n\nINSCRIPTION (num_stagiaire, nom_stagiaire, tel_stagiaire, code_formation, intitule_formation, duree_heures, prix_formation, code_formateur, nom_formateur, date_inscription)\n\nRègles : un stagiaire peut s'inscrire à plusieurs formations ; une formation est animée par un seul formateur ; un formateur peut animer plusieurs formations ; un stagiaire n'a qu'un numéro de téléphone.",
      questions: [
        'Rappelle les dépendances fonctionnelles et la clé primaire.',
        'La table est-elle en 1FN ? Justifie.',
        'Mets la table en 2FN.',
        'Mets le résultat en 3FN.',
        'Écris le schéma relationnel final.',
        'Comment calculer le chiffre d\'affaires d\'une formation sans le stocker ?',
      ],
      langage: 'texte',
      solution: `1. num_stagiaire → nom_stagiaire, tel_stagiaire
   code_formation → intitule_formation, duree_heures, prix_formation, code_formateur
   code_formateur → nom_formateur
   (num_stagiaire, code_formation) → date_inscription
   Clé primaire : (num_stagiaire, code_formation)

2. Oui : tous les attributs sont atomiques (un seul téléphone par stagiaire),
   il n'y a pas de groupe répétitif, et la table a une clé primaire.

3. 2FN — on sort les dépendances partielles :
   STAGIAIRE (num_stagiaire, nom_stagiaire, tel_stagiaire)
   FORMATION (code_formation, intitule_formation, duree_heures, prix_formation,
              code_formateur, nom_formateur)
   INSCRIPTION (#num_stagiaire, #code_formation, date_inscription)

4. 3FN — dans FORMATION : code_formation → code_formateur → nom_formateur
   (dépendance transitive). On crée FORMATEUR :
   FORMATEUR (code_formateur, nom_formateur)
   FORMATION (code_formation, intitule_formation, duree_heures, prix_formation,
              #code_formateur)

5. Schéma final :
   STAGIAIRE (num_stagiaire, nom_stagiaire, tel_stagiaire)
   FORMATEUR (code_formateur, nom_formateur)
   FORMATION (code_formation, intitule_formation, duree_heures, prix_formation, #code_formateur)
   INSCRIPTION (#num_stagiaire, #code_formation, date_inscription)

6. Chiffre d'affaires d'une formation = prix_formation × nombre d'inscrits.
   On compte les lignes de INSCRIPTION pour cette formation et on multiplie
   par son prix, au moment de la requête (COUNT, chapitre sur les regroupements).`,
      explication:
        "C'est le déroulé exact attendu à l'examen : DF, puis chaque forme normale avec une justification, puis le schéma final. Écris chaque étape même si elle te semble évidente : chacune rapporte des points.",
    },
  ],
  exercice: {
    id: 'sql-jointure-filiere',
    titre: 'Retrouver le libellé de la filière',
    consigne:
      'Complète la requête pour afficher le nom, le prénom et le libellé de la filière de chaque étudiant, en reliant les tables par la clé étrangère code_filiere.',
    langage: 'sql',
    base: 'scolarite',
    codeDepart: 'SELECT etudiant.nom, etudiant.prenom, filiere.libelle\nFROM etudiant, filiere\nWHERE -- complète la condition de jointure\n',
    indice: 'La condition relie les deux colonnes code_filiere : etudiant.code_filiere = filiere.code_filiere',
    solution: 'SELECT etudiant.nom, etudiant.prenom, filiere.libelle\nFROM etudiant, filiere\nWHERE etudiant.code_filiere = filiere.code_filiere;',
  },
}

export const leconsNormalisation: Lecon[] = [lecon1, lecon2, lecon3]

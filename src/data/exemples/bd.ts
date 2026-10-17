import type { SceneResume } from '../types'

/*
 * Exemples concrets et défis ajoutés à la fin des résumés vidéo — Base de données.
 * Les résultats SQL correspondent à la base d'exemple « Scolarité ».
 */
export const exemplesBD: Record<string, SceneResume[]> = {
  // ——— Chapitre 1 : Le modèle relationnel ———
  'qu-est-ce-qu-une-base-de-donnees': [
    {
      type: 'exemple',
      titre: 'Le prix du riz change',
      situation: "Dans le cahier d'une boutique, le prix du sac de riz est recopié sur 300 lignes. Il passe à 18 500 F : il faut tout corriger, et on en oublie forcément.",
      langage: 'SQL',
      code: ['UPDATE produit', 'SET prix = 18500', "WHERE ref = 'RIZ25';"],
      resultat: ['1 ligne modifiée', '', 'Le prix n\'est écrit', 'qu\'une seule fois :', 'tout le monde voit', 'le nouveau prix'],
      narration:
        "Exemple concret. Dans un cahier, le prix du riz est recopié des centaines de fois : le changer, c'est risquer des oublis. Dans une base de données, il n'est écrit qu'une fois : une seule ligne à modifier, et tout le monde voit le nouveau prix.",
    },
    {
      type: 'exemple',
      titre: 'Interroger la base',
      situation: 'La scolarité veut la liste des filières de l\'école.',
      langage: 'SQL',
      code: ['SELECT *', 'FROM filiere;'],
      resultat: ['IDA  | Informatique Dév. d\'Application', 'FCGE | Finance Comptabilité…', 'GEC  | Gestion Commerciale'],
      narration: "Deuxième exemple : pour interroger la base, on écrit une requête SQL. SELECT étoile FROM filière affiche toutes les filières.",
    },
    {
      type: 'defi',
      question: 'Excel est-il un SGBD ?',
      reponse: 'Non',
      explication: "C'est un tableur : il ne gère ni l'intégrité des données, ni les droits d'accès, ni plusieurs utilisateurs en même temps.",
      narration: "À toi de jouer. Excel est-il un système de gestion de base de données ?",
    },
  ],
  'tables-lignes-colonnes': [
    {
      type: 'exemple',
      titre: 'Le catalogue d\'une pharmacie',
      situation: 'La pharmacie du Plateau range ses médicaments dans une table : une colonne par information, une ligne par médicament.',
      langage: 'Table medicament',
      code: ['code | nom           | prix', '-----+---------------+-----', 'M01  | Paracétamol   | 500', 'M02  | Amoxicilline  | 2500', 'M03  | Sirop toux    | 1800'],
      resultat: ['3 colonnes (attributs)', '3 lignes (enregistrements)', '', 'Schéma :', 'MEDICAMENT(code, nom, prix)'],
      narration:
        "Exemple concret : le catalogue d'une pharmacie. Chaque colonne est un attribut : le code, le nom, le prix. Chaque ligne est un enregistrement : un médicament. On note la table ainsi : MEDICAMENT, puis la liste des attributs entre parenthèses.",
    },
    {
      type: 'exemple',
      titre: 'Choisir des colonnes',
      situation: 'Le vendeur veut seulement le nom et le prix, sans le code.',
      langage: 'SQL',
      code: ['SELECT nom, prix', 'FROM medicament;'],
      resultat: ['Paracétamol  | 500', 'Amoxicilline | 2500', 'Sirop toux   | 1800'],
      narration: "Deuxième exemple : en SQL, on liste après SELECT les colonnes voulues. Les lignes, elles, sont toutes affichées.",
    },
    {
      type: 'defi',
      question: 'La table CLIENT décrit 25 clients avec num_client, nom, telephone et ville. Combien de lignes ? De colonnes ?',
      reponse: '25 lignes, 4 colonnes',
      explication: 'Une ligne par client, une colonne par attribut.',
      narration: "À toi de jouer. Une table décrit vingt-cinq clients avec quatre informations. Combien a-t-elle de lignes et de colonnes ?",
      narrationReponse: "Réponse : vingt-cinq lignes, une par client, et quatre colonnes, une par attribut.",
    },
  ],
  'cles-et-contraintes': [
    {
      type: 'exemple',
      titre: 'Deux étudiants, un même matricule ?',
      situation: 'Un agent tente d\'inscrire un nouvel étudiant avec le matricule IDA001, déjà attribué à Awa Koné.',
      langage: 'SQL',
      code: ['INSERT INTO etudiant', "VALUES ('IDA001', 'Bamba',", "        'Sékou', 'M', '2005-01-10',", "        'Abidjan', 'IDA');"],
      resultat: ['Refusé !', 'Doublon interdit : le matricule', 'est la clé primaire'],
      narration:
        "Exemple concret : la clé primaire. Le matricule identifie chaque étudiant de façon unique. Le SGBD refuse donc un deuxième étudiant avec le même matricule.",
    },
    {
      type: 'exemple',
      titre: 'Une filière qui n\'existe pas',
      situation: 'On inscrit un étudiant dans la filière « XYZ », qui n\'existe pas dans la table filiere.',
      langage: 'SQL',
      code: ['INSERT INTO etudiant', "VALUES ('IDA009', 'Yao', 'Ange',", "        'F', '2006-04-02',", "        'Abidjan', 'XYZ');"],
      resultat: ['Refusé !', 'Clé étrangère invalide :', 'la filière XYZ n\'existe pas'],
      narration: "Deuxième exemple : la clé étrangère. Le code filière de l'étudiant doit exister dans la table filière. Le SGBD protège ainsi la cohérence des données.",
    },
    {
      type: 'defi',
      question: 'COMMANDE (num_cde, date_cde, #num_client) : quelle est la clé étrangère, et que référence-t-elle ?',
      reponse: 'num_client → CLIENT',
      explication: 'Le # signale la clé étrangère : chaque commande est passée par un client existant.',
      narration: "À toi de jouer. Dans la table commande, quelle est la clé étrangère, et à quelle table fait-elle référence ?",
      narrationReponse: "Réponse : num client, qui fait référence à la table client. Le dièse signale la clé étrangère.",
    },
  ],

  // ——— Chapitre 2 : La normalisation ———
  'pourquoi-normaliser': [
    {
      type: 'exemple',
      titre: 'Un libellé recopié partout',
      situation: "Dans une table unique d'inscriptions, le libellé de la filière est répété sur chaque ligne. La filière GEC est renommée : il faut modifier toutes ses lignes.",
      langage: 'Table inscription (extrait)',
      code: ['matricule | code_fil | libelle_filiere', 'GEC001    | GEC      | Gestion Commerciale', 'GEC002    | GEC      | Gestion Commerciale', 'GEC003    | GEC      | Gestion Comerciale'],
      resultat: ['Anomalie :', 'une ligne mal recopiée', '→ deux libellés différents', 'pour la même filière'],
      narration:
        "Exemple concret : quand une information est répétée, on finit par avoir des versions différentes. Ici, une ligne contient une faute : la base devient incohérente. C'est ce que la normalisation évite.",
    },
    {
      type: 'exemple',
      titre: 'Trouver les dépendances fonctionnelles',
      situation: 'Pour la scolarité, on se demande : « si je connais ceci, est-ce que je connais forcément cela ? »',
      langage: 'Dépendances fonctionnelles',
      code: ['matricule → nom, prenom', 'code_matiere → libelle, coefficient', '(matricule, code_matiere) → note'],
      resultat: ['Un matricule donne', 'UN seul nom', '', 'La note dépend de', 'l\'étudiant ET de la matière'],
      narration: "Deuxième exemple : les dépendances fonctionnelles. Le matricule détermine le nom de l'étudiant. Mais la note dépend des deux : de l'étudiant et de la matière.",
    },
    {
      type: 'defi',
      question: 'num_client → ville est vrai. Et ville → num_client ?',
      reponse: 'Faux',
      explication: 'Une ville compte plusieurs clients : connaître la ville ne donne pas un seul client.',
      narration: "À toi de jouer. Le numéro du client détermine sa ville. Mais la ville détermine-t-elle le numéro du client ?",
      narrationReponse: "Réponse : non. Une ville compte plusieurs clients, donc connaître la ville ne permet pas de retrouver un seul client.",
    },
  ],
  '1fn-et-2fn': [
    {
      type: 'exemple',
      titre: 'Plusieurs téléphones dans une case',
      situation: 'Un client a deux numéros, écrits dans la même case : « 0707…, 0505… ». La valeur n\'est pas atomique.',
      langage: 'Avant → après (1FN)',
      code: ['CLIENT(num, nom, telephones)', '  → pas en 1FN', '', 'CLIENT(num, nom)', 'TELEPHONE(numero, #num)'],
      resultat: ['Une seule valeur', 'par case :', 'la relation est en 1FN'],
      narration:
        "Exemple concret : la première forme normale. Chaque case ne doit contenir qu'une seule valeur. On crée donc une table des téléphones, reliée au client.",
    },
    {
      type: 'exemple',
      titre: 'Le libellé de la matière',
      situation: 'Dans NOTE(matricule, code_matiere, libelle, note), le libellé ne dépend que du code matière, pas de toute la clé.',
      langage: 'Avant → après (2FN)',
      code: ['NOTE(matricule, code_matiere,', '     libelle, note)', '  → pas en 2FN', '', 'MATIERE(code_matiere, libelle)', 'NOTE(#matricule, #code_matiere, note)'],
      resultat: ['Plus aucun attribut', 'ne dépend d\'une partie', 'de la clé : 2FN'],
      narration: "Deuxième exemple : la deuxième forme normale. Le libellé dépend seulement d'une partie de la clé, le code matière. On le déplace dans une table matière.",
    },
    {
      type: 'defi',
      question: 'Une relation en 1FN dont la clé primaire n\'a qu\'un seul attribut est-elle forcément en 2FN ?',
      reponse: 'Oui',
      explication: 'La 2FN interdit les dépendances à une partie de la clé ; une clé d\'un seul attribut n\'a pas de « partie ».',
      narration: "À toi de jouer. Une relation en première forme normale, avec une clé d'un seul attribut, est-elle forcément en deuxième forme normale ?",
      narrationReponse: "Réponse : oui. La deuxième forme normale interdit les dépendances à une partie de la clé. Une clé d'un seul attribut n'a pas de partie.",
    },
  ],
  'troisieme-forme-normale': [
    {
      type: 'exemple',
      titre: 'L\'étudiant et sa filière',
      situation: 'ETUDIANT(matricule, nom, code_filiere, libelle_filiere) : le libellé dépend du code filière, qui n\'est pas la clé.',
      langage: 'Avant → après (3FN)',
      code: ['matricule → code_filiere', 'code_filiere → libelle_filiere', '  → dépendance transitive', '', 'FILIERE(code_filiere, libelle)', 'ETUDIANT(matricule, nom,', '         #code_filiere)'],
      resultat: ['Chaque attribut dépend', 'de la clé, et seulement', 'de la clé : 3FN'],
      narration:
        "Exemple concret : la troisième forme normale. Le libellé dépend du code filière, qui dépend lui-même du matricule : c'est une dépendance transitive. On sort la filière dans sa propre table.",
    },
    {
      type: 'exemple',
      titre: 'Les employés et leurs services',
      situation: 'Une entreprise stocke EMPLOYE(matricule, nom, code_service, nom_service).',
      langage: 'Après normalisation',
      code: ['SERVICE(code_service, nom_service)', 'EMPLOYE(matricule, nom,', '        #code_service)'],
      resultat: ['Renommer un service :', '1 seule ligne à modifier'],
      narration: "Deuxième exemple : le même raisonnement pour les services d'une entreprise. Après normalisation, renommer un service ne demande qu'une seule modification.",
    },
    {
      type: 'defi',
      question: 'VEHICULE(immatriculation, marque, num_proprietaire, nom_proprietaire). Quelle dépendance empêche la 3FN ?',
      reponse: 'num_proprietaire → nom_proprietaire',
      explication: 'Le nom du propriétaire dépend d\'un attribut qui n\'est pas la clé : on crée PROPRIETAIRE(num_proprietaire, nom).',
      narration: "À toi de jouer. Dans cette relation véhicule, quelle dépendance empêche la troisième forme normale ?",
      narrationReponse: "Réponse : le numéro du propriétaire détermine son nom. Ce n'est pas la clé, donc on crée une table propriétaire.",
    },
  ],
}

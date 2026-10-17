import type { SceneResume } from '../types'

/*
 * Exemples et défis des résumés vidéo des chapitres PREMIUM de Base de données.
 * Ce fichier n'est jamais inclus dans le site public en production : il est exporté
 * avec le contenu premium vers la base de données (voir scripts/exporter-premium.mjs).
 */
export const exemplesBDPremium: Record<string, SceneResume[]> = {
  // ——— Chapitre 5 : Requêtes SELECT ———
  'projection-et-tri': [
    {
      type: 'exemple',
      titre: 'Les matières par importance',
      situation: 'Un étudiant veut savoir sur quelles matières concentrer ses révisions : celles qui ont le plus gros coefficient.',
      langage: 'SQL',
      code: ['SELECT libelle, coefficient', 'FROM matiere', 'ORDER BY coefficient DESC,', '         libelle;'],
      resultat: ['Algorithmique    | 3', 'Base de données  | 3', 'Comptabilité     | 2', 'Anglais          | 1'],
      narration:
        "Exemple concret : trier les matières par coefficient décroissant. Pour les matières à égalité, on trie ensuite par libellé, dans l'ordre alphabétique.",
    },
    {
      type: 'exemple',
      titre: 'D\'où viennent les étudiants ?',
      situation: 'La direction veut la liste des villes d\'origine, chacune une seule fois.',
      langage: 'SQL',
      code: ['SELECT DISTINCT ville', 'FROM etudiant', 'ORDER BY ville;'],
      resultat: ['Abidjan', 'Bouaké', 'Korhogo', 'San-Pédro', 'Yamoussoukro'],
      narration: "Deuxième exemple : DISTINCT supprime les doublons. Abidjan apparaît quatre fois dans la table, mais une seule fois dans le résultat.",
    },
    {
      type: 'defi',
      question: 'Combien de colonnes affiche cette requête ?',
      code: ['SELECT nom prenom', 'FROM etudiant;'],
      reponse: 'Une seule !',
      explication: 'Sans virgule, « prenom » devient un alias : on affiche la colonne nom, renommée prenom.',
      narration: "À toi de jouer. Combien de colonnes affiche cette requête ? Regarde bien.",
      narrationReponse: "Réponse : une seule. Il manque la virgule : prénom devient un alias, et on affiche seulement la colonne nom, renommée.",
    },
  ],
  'filtrer-avec-where': [
    {
      type: 'exemple',
      titre: 'Les étudiantes d\'Abidjan',
      situation: 'Une association de femmes en informatique organise un atelier à Abidjan et veut inviter les étudiantes de la ville.',
      langage: 'SQL',
      code: ['SELECT nom, prenom', 'FROM etudiant', "WHERE ville = 'Abidjan'", "  AND sexe = 'F';"],
      resultat: ['Koné      | Awa', 'N\'Guessan | Aya'],
      narration: "Exemple concret : avec AND, les deux conditions doivent être vraies. On obtient les deux étudiantes qui habitent Abidjan.",
    },
    {
      type: 'exemple',
      titre: 'Repérer les étudiants en difficulté',
      situation: 'Le professeur d\'anglais veut proposer du soutien aux étudiants qui ont moins de 10.',
      langage: 'SQL',
      code: ['SELECT matricule, note', 'FROM note', "WHERE code_matiere = 'ANG'", '  AND note < 10;'],
      resultat: ['IDA003 | 8.5', 'FCG002 | 9'],
      narration: "Deuxième exemple : on filtre les notes d'anglais inférieures à dix. Deux étudiants sont concernés.",
    },
    {
      type: 'defi',
      question: 'Quels prénoms de la base correspondent à prenom LIKE \'%a\' ?',
      reponse: 'Awa, Moussa, Aya',
      explication: '%a signifie « se termine par a », quel que soit le début.',
      narration: "À toi de jouer. Quels prénoms se terminent par la lettre a ?",
      narrationReponse: "Réponse : Awa, Moussa et Aya. Pourcentage a signifie : se termine par a.",
    },
  ],
  'fonctions-d-agregation': [
    {
      type: 'exemple',
      titre: 'Le bilan de l\'algorithmique',
      situation: 'Après l\'examen, le professeur d\'algorithmique veut le nombre de copies, la moyenne et la meilleure note.',
      langage: 'SQL',
      code: ['SELECT COUNT(*), AVG(note),', '       MAX(note)', 'FROM note', "WHERE code_matiere = 'ALGO';"],
      resultat: ['COUNT | AVG   | MAX', '4     | 13.25 | 17'],
      narration:
        "Exemple concret : WHERE garde d'abord les quatre notes d'algorithmique, puis les fonctions les résument : quatre notes, moyenne treize virgule vingt-cinq, meilleure note dix-sept.",
    },
    {
      type: 'exemple',
      titre: 'L\'effectif de la filière IDA',
      situation: 'Pour commander les supports de cours, la scolarité doit savoir combien d\'étudiants sont en IDA.',
      langage: 'SQL',
      code: ['SELECT COUNT(*) AS effectif', 'FROM etudiant', "WHERE code_filiere = 'IDA';"],
      resultat: ['effectif', '4'],
      narration: "Deuxième exemple : COUNT étoile compte les lignes retenues. Il y a quatre étudiants en IDA.",
    },
    {
      type: 'defi',
      question: 'Que renvoie cette requête ?',
      code: ['SELECT SUM(coefficient)', 'FROM matiere;'],
      reponse: '9',
      explication: '3 + 3 + 1 + 2 = 9 : la somme des coefficients des 4 matières.',
      narration: "À toi de jouer. Les coefficients sont trois, trois, un et deux. Que renvoie cette requête ?",
      narrationReponse: "Réponse : neuf, la somme des quatre coefficients.",
    },
  ],

  // ——— Chapitre 6 : Jointures et regroupements ———
  'jointure-interne': [
    {
      type: 'exemple',
      titre: 'Les étudiants de Bouaké et leur filière',
      situation: 'Le délégué de Bouaké veut le prénom de chaque étudiant de sa ville, avec le nom complet de sa filière.',
      langage: 'SQL',
      code: ['SELECT e.prenom, f.libelle', 'FROM etudiant e', 'JOIN filiere f', '  ON e.code_filiere = f.code_filiere', "WHERE e.ville = 'Bouaké';"],
      resultat: ['Moussa | Informatique', '       | Développeur d\'Application'],
      narration:
        "Exemple concret : le prénom est dans la table étudiant, le libellé dans la table filière. La jointure relie les deux par le code filière.",
    },
    {
      type: 'exemple',
      titre: 'Le relevé de notes de Yao',
      situation: 'Yao Kouassi (IDA003) demande son relevé : libellé de chaque matière et note. Trois tables sont nécessaires.',
      langage: 'SQL',
      code: ['SELECT m.libelle, n.note', 'FROM note n', 'JOIN matiere m', '  ON n.code_matiere = m.code_matiere', "WHERE n.matricule = 'IDA003';"],
      resultat: ['Algorithmique   | 17', 'Base de données | 16', 'Anglais         | 8.5'],
      narration: "Deuxième exemple : le relevé de Yao. La note est dans la table note, le libellé de la matière dans la table matière : on les relie par le code matière.",
    },
    {
      type: 'defi',
      question: '8 étudiants, 3 filières. Combien de lignes si on oublie la condition de jointure ?',
      code: ['SELECT e.nom, f.libelle', 'FROM etudiant e, filiere f;'],
      reponse: '24 lignes',
      explication: 'Produit cartésien : 8 × 3 = 24. Chaque étudiant est associé à toutes les filières.',
      narration: "À toi de jouer. Huit étudiants, trois filières, et on a oublié la condition de jointure. Combien de lignes ?",
      narrationReponse: "Réponse : vingt-quatre lignes. C'est le produit cartésien, huit fois trois : chaque étudiant est associé à toutes les filières.",
    },
  ],
  'jointure-externe': [
    {
      type: 'exemple',
      titre: 'Qui n\'a pas composé en BD ?',
      situation: 'Le jury veut la liste des étudiants qui n\'ont aucune note de Base de données.',
      langage: 'SQL',
      code: ['SELECT e.prenom', 'FROM etudiant e', 'LEFT JOIN note n', '  ON n.matricule = e.matricule', "  AND n.code_matiere = 'BD'", 'WHERE n.matricule IS NULL;'],
      resultat: ['Aya', 'Ibrahim', 'Mariam', 'Kevin'],
      narration:
        "Exemple concret : LEFT JOIN garde tous les étudiants. Ceux qui n'ont pas de note de BD reçoivent NULL, et WHERE IS NULL les sélectionne.",
    },
    {
      type: 'exemple',
      titre: 'Les clients qui n\'ont jamais commandé',
      situation: 'Un grossiste veut relancer les clients inscrits qui n\'ont encore jamais passé de commande.',
      langage: 'SQL',
      code: ['SELECT c.nom_client', 'FROM client c', 'LEFT JOIN commande co', '  ON co.num_client = c.num_client', 'WHERE co.num_cde IS NULL;'],
      resultat: ['Les clients', 'sans aucune commande'],
      narration: "Deuxième exemple : la même méthode pour un grossiste. LEFT JOIN, puis IS NULL : on obtient les clients qui n'ont jamais commandé.",
    },
    {
      type: 'defi',
      question: 'Pour lister les produits jamais vendus, quelle jointure et quelle condition ?',
      reponse: 'LEFT JOIN + IS NULL',
      explication: 'produit LEFT JOIN vente … WHERE vente.num_vente IS NULL',
      narration: "À toi de jouer. Pour lister les produits jamais vendus, quelle jointure et quelle condition utiliser ?",
      narrationReponse: "Réponse : une jointure externe gauche, LEFT JOIN, depuis la table produit, puis la condition IS NULL sur la table des ventes.",
    },
  ],
  'group-by-et-having': [
    {
      type: 'exemple',
      titre: 'La moyenne de chaque matière',
      situation: 'Le conseil pédagogique compare les matières pour savoir où renforcer les cours.',
      langage: 'SQL',
      code: ['SELECT code_matiere,', '       AVG(note) AS moyenne', 'FROM note', 'GROUP BY code_matiere;'],
      resultat: ['ALGO   | 13.25', 'ANG    | 11.75', 'BD     | 12', 'COMPTA | 12'],
      narration:
        "Exemple concret : GROUP BY forme un groupe par matière, et AVG calcule la moyenne de chaque groupe. L'anglais a la moyenne la plus basse.",
    },
    {
      type: 'exemple',
      titre: 'Le tableau d\'honneur',
      situation: 'L\'école affiche les étudiants dont la moyenne pondérée atteint au moins 13.',
      langage: 'SQL',
      code: ['SELECT e.prenom, ROUND(SUM(n.note *', '  m.coefficient) / SUM(m.coefficient), 2)', 'FROM note n JOIN etudiant e …', '            JOIN matiere m …', 'GROUP BY e.matricule, e.prenom', 'HAVING SUM(n.note * m.coefficient)', '       / SUM(m.coefficient) >= 13;'],
      resultat: ['Mariam | 16', 'Yao    | 15.36', 'Awa    | 13.93', 'Aya    | 13'],
      narration: "Deuxième exemple : on calcule la moyenne pondérée de chaque étudiant, puis HAVING ne garde que les groupes dont la moyenne atteint treize.",
    },
    {
      type: 'defi',
      question: 'Pour garder les filières de plus de 3 étudiants : WHERE ou HAVING ?',
      reponse: 'HAVING COUNT(*) > 3',
      explication: 'C\'est une condition sur un groupe, calculée après le regroupement. Résultat : IDA (4 étudiants).',
      narration: "À toi de jouer. Pour garder les filières de plus de trois étudiants, faut-il WHERE ou HAVING ?",
      narrationReponse: "Réponse : HAVING, car c'est une condition sur le nombre d'étudiants de chaque groupe, calculé après le regroupement. Seule la filière IDA est gardée.",
    },
  ],
}

// Fichier généré par « npm run premium » : ne pas modifier à la main.
import type { LeconMeta } from '../types'

export const META_PREMIUM: Record<string, LeconMeta[]> = {
  "base-de-donnees/requetes-select": [
    {
      "slug": "projection-et-tri",
      "titre": "SELECT : choisir les colonnes et trier",
      "duree": "25 min",
      "objectifs": [
        "Écrire une requête SELECT … FROM …",
        "Choisir les colonnes à afficher (projection)",
        "Renommer une colonne avec AS et faire des calculs",
        "Supprimer les doublons avec DISTINCT et trier avec ORDER BY"
      ],
      "exercice": {
        "id": "sql-tri-etudiants",
        "titre": "L'annuaire des étudiants",
        "langage": "sql"
      }
    },
    {
      "slug": "filtrer-avec-where",
      "titre": "WHERE : filtrer les lignes",
      "duree": "30 min",
      "objectifs": [
        "Filtrer les lignes avec WHERE et les opérateurs de comparaison",
        "Combiner des conditions avec AND, OR, NOT et des parenthèses",
        "Utiliser BETWEEN, IN et LIKE",
        "Tester les valeurs absentes avec IS NULL"
      ],
      "exercice": {
        "id": "sql-nes-en-2005",
        "titre": "Les étudiants nés en 2005",
        "langage": "sql"
      }
    },
    {
      "slug": "fonctions-d-agregation",
      "titre": "Les fonctions d'agrégation : compter, additionner, calculer une moyenne",
      "duree": "25 min",
      "objectifs": [
        "Utiliser COUNT, SUM, AVG, MIN et MAX",
        "Combiner une fonction d'agrégation avec WHERE",
        "Arrondir un résultat avec ROUND",
        "Distinguer COUNT(*), COUNT(colonne) et COUNT(DISTINCT colonne)"
      ],
      "exercice": {
        "id": "sql-stats-algo",
        "titre": "Les statistiques d'algorithmique",
        "langage": "sql"
      }
    }
  ],
  "base-de-donnees/jointures-et-regroupements": [
    {
      "slug": "jointure-interne",
      "titre": "La jointure interne : relier plusieurs tables",
      "duree": "30 min",
      "objectifs": [
        "Comprendre pourquoi on a besoin d'une jointure",
        "Écrire une jointure avec INNER JOIN … ON",
        "Utiliser des alias de tables",
        "Joindre trois tables ou plus"
      ],
      "exercice": {
        "id": "sql-releve-ida",
        "titre": "Le relevé de notes de la filière IDA",
        "langage": "sql"
      }
    },
    {
      "slug": "jointure-externe",
      "titre": "La jointure externe : garder les lignes sans correspondance",
      "duree": "25 min",
      "objectifs": [
        "Comprendre ce que la jointure interne fait disparaître",
        "Écrire une jointure externe avec LEFT JOIN",
        "Trouver les lignes « sans correspondance » avec IS NULL",
        "Placer correctement une condition dans ON ou dans WHERE"
      ],
      "exercice": {
        "id": "sql-sans-note-bd",
        "titre": "Les étudiants sans note de BD",
        "langage": "sql"
      }
    },
    {
      "slug": "group-by-et-having",
      "titre": "GROUP BY et HAVING : calculer par groupe",
      "duree": "30 min",
      "objectifs": [
        "Regrouper les lignes avec GROUP BY",
        "Respecter la règle des colonnes du SELECT",
        "Filtrer les groupes avec HAVING",
        "Calculer une moyenne pondérée par étudiant"
      ],
      "exercice": {
        "id": "sql-effectif-filiere",
        "titre": "L'effectif de chaque filière",
        "langage": "sql"
      }
    }
  ]
}

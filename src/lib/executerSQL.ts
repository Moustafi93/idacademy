import type { SqlJsStatic } from 'sql.js'
import { BASES } from '../data/bases/scolarite'

/*
 * Exécute des requêtes SQL dans le navigateur avec SQLite (bibliothèque sql.js).
 * La bibliothèque n'est téléchargée que la première fois qu'on exécute du SQL,
 * pour ne pas alourdir les autres pages. Aucun serveur n'est utilisé.
 */

export interface TableResultat {
  colonnes: string[]
  lignes: (string | number | null)[][]
}

export interface ResultatSQL {
  table: TableResultat | null
  message: string | null // pour les requêtes sans résultat (INSERT, UPDATE…)
  erreur: string | null
}

let moteur: Promise<SqlJsStatic> | null = null

function chargerMoteur() {
  if (!moteur) {
    moteur = Promise.all([import('sql.js'), import('sql.js/dist/sql-wasm.wasm?url')]).then(([mod, wasm]) =>
      mod.default({ locateFile: () => wasm.default }),
    )
  }
  return moteur
}

// Traduit les messages d'erreur les plus courants de SQLite en français
function traduireErreur(message: string): string {
  const regles: [RegExp, string][] = [
    [/no such table: (\w+)/, 'La table « $1 » n\'existe pas. Vérifie son nom.'],
    [/no such column: ([\w.]+)/, 'La colonne « $1 » n\'existe pas. Vérifie son nom et sa table.'],
    [/near "(.+?)": syntax error/, 'Erreur de syntaxe près de « $1 ».'],
    [/incomplete input/, 'La requête est incomplète (il manque peut-être une parenthèse ou une fin de requête).'],
    [/UNIQUE constraint failed: ([\w.]+)/, 'Doublon interdit : la valeur de « $1 » existe déjà (clé primaire ou contrainte UNIQUE).'],
    [/NOT NULL constraint failed: ([\w.]+)/, 'La colonne « $1 » est obligatoire (NOT NULL).'],
    [/CHECK constraint failed/, 'Une valeur ne respecte pas une contrainte CHECK de la table.'],
    [/FOREIGN KEY constraint failed/, 'Clé étrangère invalide : la valeur référencée n\'existe pas.'],
    [/ambiguous column name: (\w+)/, 'La colonne « $1 » existe dans plusieurs tables : précise la table (ex. etudiant.$1).'],
  ]
  for (const [motif, traduction] of regles) {
    const trouve = message.match(motif)
    if (trouve) return trouve.slice(1).reduce((texte, valeur, i) => texte.split(`$${i + 1}`).join(valeur), traduction)
  }
  return message
}

export async function executerSQL(requete: string, base = 'scolarite'): Promise<ResultatSQL> {
  const SQL = await chargerMoteur()
  const db = new SQL.Database()
  try {
    db.exec('PRAGMA foreign_keys = ON;')
    db.exec(BASES[base]?.script ?? '')
    const totalModifs = () => Number(db.exec('SELECT total_changes()')[0].values[0][0])
    const avant = totalModifs()
    const resultats = db.exec(requete)
    const dernier = resultats[resultats.length - 1]
    if (dernier) return { table: { colonnes: dernier.columns, lignes: dernier.values as TableResultat['lignes'] }, message: null, erreur: null }
    const modifiees = totalModifs() - avant
    return { table: null, message: `Requête exécutée. ${Math.max(modifiees, 0)} ligne(s) modifiée(s).`, erreur: null }
  } catch (e) {
    return { table: null, message: null, erreur: traduireErreur(e instanceof Error ? e.message : String(e)) }
  } finally {
    db.close()
  }
}

// Deux résultats sont équivalents s'ils ont le même nombre de colonnes et les mêmes lignes.
// L'ordre des lignes n'est pris en compte que si la requête attendue contient ORDER BY.
export function memesResultats(obtenu: TableResultat | null, attendu: TableResultat | null, ordreCompte: boolean) {
  if (!obtenu || !attendu) return false
  if (obtenu.colonnes.length !== attendu.colonnes.length || obtenu.lignes.length !== attendu.lignes.length) return false
  const normaliser = (t: TableResultat) => {
    const lignes = t.lignes.map((l) => JSON.stringify(l.map((v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v))))
    return ordreCompte ? lignes : [...lignes].sort()
  }
  const a = normaliser(obtenu)
  const b = normaliser(attendu)
  return a.every((l, i) => l === b[i])
}

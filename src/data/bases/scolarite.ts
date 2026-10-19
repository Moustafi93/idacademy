/*
 * Base d'exemple « scolarité » utilisée dans les cours de Base de données.
 * Elle est recréée à neuf dans le navigateur à chaque exécution :
 * l'étudiant peut tout tester (même DELETE ou DROP) sans rien casser.
 */
export const BASE_SCOLARITE = `
CREATE TABLE filiere (
  code_filiere TEXT PRIMARY KEY,
  libelle      TEXT NOT NULL
);

CREATE TABLE etudiant (
  matricule      TEXT PRIMARY KEY,
  nom            TEXT NOT NULL,
  prenom         TEXT NOT NULL,
  sexe           TEXT CHECK (sexe IN ('M', 'F')),
  date_naissance TEXT,
  ville          TEXT,
  code_filiere   TEXT REFERENCES filiere(code_filiere)
);

CREATE TABLE matiere (
  code_matiere TEXT PRIMARY KEY,
  libelle      TEXT NOT NULL,
  coefficient  INTEGER NOT NULL
);

CREATE TABLE note (
  matricule    TEXT REFERENCES etudiant(matricule),
  code_matiere TEXT REFERENCES matiere(code_matiere),
  note         REAL CHECK (note BETWEEN 0 AND 20),
  PRIMARY KEY (matricule, code_matiere)
);

INSERT INTO filiere VALUES
  ('IDA', 'Informatique Développeur d''Application'),
  ('FCGE', 'Finance Comptabilité et Gestion des Entreprises'),
  ('GEC', 'Gestion Commerciale');

INSERT INTO etudiant VALUES
  ('IDA001', 'Koné', 'Awa', 'F', '2005-03-14', 'Abidjan', 'IDA'),
  ('IDA002', 'Traoré', 'Moussa', 'M', '2004-11-02', 'Bouaké', 'IDA'),
  ('IDA003', 'Kouassi', 'Yao', 'M', '2006-01-25', 'Abidjan', 'IDA'),
  ('IDA004', 'Diallo', 'Fatou', 'F', '2005-07-09', 'Yamoussoukro', 'IDA'),
  ('FCG001', 'N''Guessan', 'Aya', 'F', '2005-05-30', 'Abidjan', 'FCGE'),
  ('FCG002', 'Bamba', 'Ibrahim', 'M', '2004-09-18', 'Korhogo', 'FCGE'),
  ('GEC001', 'Ouattara', 'Mariam', 'F', '2006-02-11', 'San-Pédro', 'GEC'),
  ('GEC002', 'Yao', 'Kevin', 'M', '2005-12-03', 'Abidjan', 'GEC');

INSERT INTO matiere VALUES
  ('ALGO', 'Algorithmique', 3),
  ('BD', 'Base de données', 3),
  ('ANG', 'Anglais', 1),
  ('COMPTA', 'Comptabilité', 2);

INSERT INTO note VALUES
  ('IDA001', 'ALGO', 15), ('IDA001', 'BD', 13.5), ('IDA001', 'ANG', 12),
  ('IDA002', 'ALGO', 9), ('IDA002', 'BD', 11), ('IDA002', 'ANG', 14),
  ('IDA003', 'ALGO', 17), ('IDA003', 'BD', 16), ('IDA003', 'ANG', 8.5),
  ('IDA004', 'ALGO', 12), ('IDA004', 'BD', 7.5), ('IDA004', 'ANG', 13),
  ('FCG001', 'COMPTA', 14), ('FCG001', 'ANG', 11),
  ('FCG002', 'COMPTA', 10), ('FCG002', 'ANG', 9),
  ('GEC001', 'ANG', 16), ('GEC002', 'ANG', 10.5);
`

/*
 * Base « non normalisée » : tout dans une seule table, pour montrer les anomalies
 * (chapitre Normalisation).
 */
export const BASE_INSCRIPTION_BRUTE = `
CREATE TABLE inscription (
  matricule       TEXT,
  nom             TEXT,
  prenom          TEXT,
  code_filiere    TEXT,
  libelle_filiere TEXT,
  code_matiere    TEXT,
  libelle_matiere TEXT,
  coefficient     INTEGER,
  note            REAL
);

INSERT INTO inscription VALUES
  ('IDA001', 'Koné', 'Awa', 'IDA', 'Informatique Développeur d''Application', 'ALGO', 'Algorithmique', 3, 15),
  ('IDA001', 'Koné', 'Awa', 'IDA', 'Informatique Développeur d''Application', 'BD', 'Base de données', 3, 13.5),
  ('IDA001', 'Koné', 'Awa', 'IDA', 'Informatique Développeur d''Application', 'ANG', 'Anglais', 1, 12),
  ('IDA002', 'Traoré', 'Moussa', 'IDA', 'Informatique Développeur d''Application', 'ALGO', 'Algorithmique', 3, 9),
  ('IDA002', 'Traoré', 'Moussa', 'IDA', 'Informatique Développeur d''Application', 'BD', 'Base de données', 3, 11),
  ('GEC001', 'Ouattara', 'Mariam', 'GEC', 'Gestion Commerciale', 'ANG', 'Anglais', 1, 16);
`

export interface InfoBase {
  nom: string
  script: string
  // Schéma relationnel affiché à l'étudiant (# = clé étrangère, souligné = clé primaire)
  schema: { table: string; cle: string[]; colonnes: string[] }[]
}

export const BASES: Record<string, InfoBase> = {
  scolarite: {
    nom: 'Scolarité',
    script: BASE_SCOLARITE,
    schema: [
      { table: 'filiere', cle: ['code_filiere'], colonnes: ['libelle'] },
      { table: 'etudiant', cle: ['matricule'], colonnes: ['nom', 'prenom', 'sexe', 'date_naissance', 'ville', '#code_filiere'] },
      { table: 'matiere', cle: ['code_matiere'], colonnes: ['libelle', 'coefficient'] },
      { table: 'note', cle: ['#matricule', '#code_matiere'], colonnes: ['note'] },
    ],
  },
  inscription_brute: {
    nom: 'Inscriptions (non normalisée)',
    script: BASE_INSCRIPTION_BRUTE,
    schema: [
      {
        table: 'inscription',
        cle: [],
        colonnes: ['matricule', 'nom', 'prenom', 'code_filiere', 'libelle_filiere', 'code_matiere', 'libelle_matiere', 'coefficient', 'note'],
      },
    ],
  },
}

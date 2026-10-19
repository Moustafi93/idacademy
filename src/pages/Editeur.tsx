import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { tousLesExercices, trouverExerciceDistant, type ExerciceTrouve } from '../data/matieres'
import { useSession } from '../context/Session'
import { useContenuChapitre } from '../lib/useContenuChapitre'
import { AccesPremium } from '../components/AccesPremium'
import { EditeurCode } from '../components/EditeurCode'
import { Console } from '../components/Console'
import { TableSQL } from '../components/TableSQL'
import { SchemaBase } from '../components/SchemaBase'
import { EspaceHTML } from '../components/EspaceHTML'
import { EntreeClavier } from '../components/EntreeClavier'
import { useExecution, type Langage } from '../lib/useExecution'
import { executerSQL, type TableResultat } from '../lib/executerSQL'
import { IconeCadenas, IconeEtincelle, IconeLecture, IconeRetour } from '../components/Icones'
import { ecrire, lire } from '../lib/stockage'

const LANGAGES: { nom: string; code?: Langage }[] = [
  { nom: 'JavaScript', code: 'javascript' },
  { nom: 'SQL', code: 'sql' },
  { nom: 'HTML / CSS', code: 'html' },
  { nom: 'C', code: 'c' },
  { nom: 'Python' },
]

const CODE_LIBRE: Record<Langage, string> = {
  javascript: '// Écris ton code JavaScript ici\nconst prenom = "Awa";\nconsole.log("Bonjour " + prenom + " !");\n',
  sql: '-- Écris ta requête SQL ici (base « Scolarité »)\nSELECT nom, prenom, ville\nFROM etudiant\nWHERE ville = \'Abidjan\';\n',
  html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { color: #2438F0; }
  </style>
</head>
<body>
  <h1>Bonjour Abidjan !</h1>
  <p>Modifie ce code : la page se met à jour à droite.</p>
</body>
</html>
`,
  c: `#include <stdio.h>

int main() {
    char prenom[30];
    int age;

    printf("Ton prénom et ton âge : ");
    scanf("%s %d", prenom, &age);
    printf("\nBonjour %s, dans 5 ans tu auras %d ans.\n", prenom, age + 5);
    return 0;
}
`,
}

const FICHIER: Record<Langage, string> = { javascript: 'programme.js', sql: 'requete.sql', html: 'index.html', c: 'programme.c' }
const ENTREE_LIBRE = 'Awa 19'

// La clé force un nouvel éditeur quand on change d'exercice ou de langage
export default function PageEditeur() {
  const { exercice } = useParams()
  const [params] = useSearchParams()
  const demande = params.get('langage')
  const langage: Langage = demande === 'sql' || demande === 'html' || demande === 'c' ? demande : 'javascript'
  const cle = `${exercice ?? 'libre'}-${langage}`
  const local = exercice ? tousLesExercices().find((e) => e.exercice.id === exercice) : undefined
  const distant = exercice && !local ? trouverExerciceDistant(exercice) : undefined
  if (distant) return <EditeurPremium key={cle} {...distant} />
  return <Editeur key={cle} trouve={local} langageLibre={langage} />
}

// Exercice d'un chapitre premium : on télécharge d'abord le chapitre
function EditeurPremium({ matiere, chapitre, index }: NonNullable<ReturnType<typeof trouverExerciceDistant>>) {
  const { aAccesComplet } = useSession()
  const autorise = chapitre.gratuit || aAccesComplet
  const contenu = useContenuChapitre(matiere.slug, chapitre, autorise)
  const lecon = contenu.lecons?.[index]
  if (!autorise || contenu.erreur === 'acces') return <AccesPremium titre={chapitre.titre} />
  if (!lecon?.exercice)
    return (
      <p role="status" className="mt-10 text-center font-display text-lg font-bold">
        {contenu.erreur ? 'Impossible de charger l\'exercice. Vérifie ta connexion.' : 'Chargement de l\'exercice…'}
      </p>
    )
  return <Editeur trouve={{ matiere, chapitre, lecon, exercice: lecon.exercice }} langageLibre={lecon.exercice.langage} />
}

function Editeur({ trouve, langageLibre }: { trouve?: ExerciceTrouve; langageLibre: Langage }) {
  const [, setParams] = useSearchParams()
  const exercice = trouve?.exercice
  const langage: Langage = exercice?.langage ?? langageLibre
  const cle = `idacademy:code:${exercice?.id ?? `libre-${langage}`}`

  const [code, setCode] = useState(() => lire(cle, exercice?.codeDepart ?? CODE_LIBRE[langage]))
  const [entree, setEntree] = useState(ENTREE_LIBRE)
  const [voirIndice, setVoirIndice] = useState(false)
  const [voirSolution, setVoirSolution] = useState(false)
  const [tableAttendue, setTableAttendue] = useState<TableResultat | null>(null)
  const { resultat, enCours, executer, reussi } = useExecution(exercice, langageLibre)

  useEffect(() => ecrire(cle, code), [cle, code])

  // Pour un exercice SQL, le résultat attendu est celui de la solution
  useEffect(() => {
    if (exercice?.langage === 'sql') executerSQL(exercice.solution, exercice.base).then((r) => setTableAttendue(r.table))
  }, [exercice])

  const base = exercice?.langage === 'sql' ? exercice.base : 'scolarite'

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {trouve && (
          <Link
            to={`/matieres/${trouve.matiere.slug}/${trouve.chapitre.slug}/${trouve.lecon.slug}`}
            aria-label="Retour à la leçon"
            className="grid size-11 place-items-center rounded-full border border-ligne bg-white text-encre"
          >
            <IconeRetour taille={18} strokeWidth={2.4} />
          </Link>
        )}
        <div className="min-w-0 flex-[1_1_260px]">
          <p className="m-0 text-[13px] font-bold text-gris">{trouve ? `Exercice · ${trouve.chapitre.titre}` : 'Espace libre'}</p>
          <h1 className="m-0 font-display text-lg font-bold">
            {exercice?.titre ?? { sql: 'Teste tes requêtes SQL', html: 'Crée ta page web', javascript: 'Teste ton code JavaScript', c: 'Teste ton programme C' }[langage]}
          </h1>
        </div>
        <div role="group" aria-label="Langage" className="flex flex-wrap gap-1 rounded-full border border-ligne bg-white p-1">
          {LANGAGES.map((l) => {
            const actif = l.code === langage
            const dispo = !!l.code && (!exercice || actif)
            return (
              <button
                key={l.nom}
                type="button"
                disabled={!dispo}
                aria-pressed={actif}
                onClick={() => l.code && setParams(l.code === 'javascript' ? {} : { langage: l.code })}
                title={l.code ? undefined : 'Bientôt disponible'}
                className={`flex h-[38px] items-center gap-1 rounded-full border-0 px-3.5 font-mono text-[13px] ${
                  actif ? 'cursor-pointer bg-bleu font-bold text-white' : dispo ? 'cursor-pointer bg-transparent text-encre hover:bg-creme' : 'cursor-not-allowed bg-transparent text-gris'
                }`}
              >
                {!l.code && <IconeCadenas taille={12} />}
                {l.nom}
              </button>
            )
          })}
        </div>
        {langage !== 'html' && (
          <button
            type="button"
            onClick={() => executer(code, entree)}
            disabled={enCours}
            className="flex h-12 cursor-pointer items-center gap-2 rounded-full border-0 bg-jaune px-6 text-[15px] font-extrabold text-encre disabled:opacity-60"
          >
            <IconeLecture /> Exécuter
          </button>
        )}
      </header>

      <div className="flex flex-wrap items-stretch gap-4">
        {(exercice || langage === 'sql') && (
          <section className="flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[28px] border border-ligne bg-white p-6">
            {exercice && (
              <>
                <span className="self-start rounded-full bg-bleu-clair px-3 py-1.5 text-xs font-extrabold text-bleu">Consigne</span>
                <p className="m-0 text-base font-semibold leading-relaxed">{exercice.consigne}</p>
                {exercice.langage !== 'html' && <p className="m-0 mt-1 text-xs font-extrabold uppercase tracking-wider text-gris">Résultat attendu</p>}
                {exercice.langage === 'html' ? null : exercice.langage === 'javascript' || exercice.langage === 'c' ? (
                  <pre className="m-0 rounded-2xl bg-creme px-3.5 py-3 font-mono text-[13px] leading-[1.7]">{exercice.sortieAttendue.join('\n')}</pre>
                ) : (
                  tableAttendue && <TableSQL table={tableAttendue} max={12} />
                )}
              </>
            )}
            {langage === 'sql' && <SchemaBase base={base} compact />}
            {exercice && (
              <>
                {voirIndice && <p className="m-0 rounded-2xl bg-jaune p-3.5 text-sm font-semibold">{exercice.indice}</p>}
                {voirSolution && (
                  <div className="flex flex-col gap-2">
                    <pre className="m-0 overflow-x-auto rounded-2xl bg-encre px-3.5 py-3 font-mono text-[13px] leading-[1.7] text-[#E6E8F5]">{exercice.solution}</pre>
                    <p className="m-0 text-xs font-semibold text-gris">Essaie de comprendre chaque ligne, puis réécris-la toi-même sans regarder.</p>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setVoirIndice((v) => !v)}
                    className="h-[46px] flex-1 cursor-pointer rounded-full border-[1.5px] border-encre bg-transparent text-sm font-extrabold text-encre"
                  >
                    {voirIndice ? "Masquer l'indice" : 'Voir un indice'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCode(exercice.codeDepart)}
                    className="h-[46px] flex-1 cursor-pointer rounded-full border border-ligne bg-fond text-sm font-bold text-encre"
                  >
                    Recommencer
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoirSolution((v) => !v)}
                    className="h-[46px] w-full cursor-pointer rounded-full border-0 bg-transparent text-sm font-bold text-bleu underline"
                  >
                    {voirSolution ? 'Masquer la solution' : 'Voir la solution'}
                  </button>
                </div>
              </>
            )}
            {!exercice && langage === 'sql' && (
              <p className="m-0 text-sm font-semibold leading-relaxed text-gris">
                La base est recréée à chaque exécution : tu peux tout essayer (INSERT, UPDATE, DELETE…) sans rien casser.
              </p>
            )}
          </section>
        )}

        <div className={`flex min-w-0 flex-col gap-4 ${langage === 'html' ? 'flex-[4_1_600px]' : 'flex-[3_1_480px]'}`}>
          {langage === 'html' ? (
            <EspaceHTML code={code} setCode={setCode} exercice={exercice?.langage === 'html' ? exercice : undefined} />
          ) : (
            <>
              <EditeurCode valeur={code} onChange={setCode} hauteurMin={langage === 'sql' ? 220 : 320} nomFichier={FICHIER[langage]} onExecuter={() => executer(code, entree)} />
              {langage === 'c' &&
                (exercice?.langage === 'c' ? (
                  exercice.entree !== undefined && <EntreeClavier valeur={exercice.entree} lectureSeule />
                ) : (
                  <EntreeClavier valeur={entree} onChange={setEntree} />
                ))}
              <Console resultat={resultat} enCours={enCours} reussi={reussi} titre={langage === 'sql' ? 'Résultat' : 'Console'} />
            </>
          )}
        </div>

        <section className={`min-w-0 flex-[1_1_240px] flex-col gap-3 rounded-[28px] bg-bleu p-5 text-white ${langage === 'html' ? 'hidden' : 'flex'}`}>
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-full bg-jaune text-encre">
              <IconeEtincelle taille={20} />
            </span>
            <h2 className="m-0 font-display text-[17px] font-bold">Assistant IA</h2>
          </div>
          <p className="m-0 text-sm font-semibold leading-relaxed text-[#E4E7FF]">
            Bientôt : pose une question sur ton code ou ton erreur, l'assistant t'explique pas à pas sans te donner directement la solution.
          </p>
          <p className="m-0 mt-auto text-xs font-bold text-bleu-doux">Prévu pour la version 4 · réservé aux abonnés</p>
        </section>
      </div>
    </div>
  )
}

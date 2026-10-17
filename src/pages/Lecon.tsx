import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { chapitreSuivant, trouverLecon } from '../data/matieres'
import { BlocLeconVue } from '../components/BlocsLecon'
import { ResumeVideo, VideoYoutube } from '../components/ResumeVideo'
import { EditeurCode } from '../components/EditeurCode'
import { Console } from '../components/Console'
import { SchemaBase } from '../components/SchemaBase'
import { EspaceHTML } from '../components/EspaceHTML'
import { AccesPremium } from '../components/AccesPremium'
import { useExecution } from '../lib/useExecution'
import { useContenuChapitre } from '../lib/useContenuChapitre'
import { IconeCadenas, IconeCoche, IconeFleche, IconeRetour } from '../components/Icones'
import Introuvable from './Introuvable'

export default function Lecon() {
  const { matiere: mSlug, chapitre: cSlug, lecon: lSlug } = useParams()
  const { matiere, chapitre, lecon: meta, index } = trouverLecon(mSlug, cSlug, lSlug)
  const { aAccesComplet, leconsTerminees, terminerLecon, ouvrirLecon } = useSession()
  const navigate = useNavigate()

  const id = `${mSlug}/${cSlug}/${lSlug}`
  const autorise = !!chapitre && (chapitre.gratuit || aAccesComplet)
  // Chapitre premium : le contenu de la leçon est téléchargé depuis le serveur
  const contenu = useContenuChapitre(mSlug, chapitre, autorise)
  const lecon = contenu.lecons?.[index]

  const exercice = lecon?.exercice
  const [code, setCode] = useState(exercice?.codeDepart ?? '')
  const { resultat, enCours, executer, reinitialiser, reussi } = useExecution(exercice)

  useEffect(() => {
    setCode(exercice?.codeDepart ?? '')
    reinitialiser()
  }, [id, exercice, reinitialiser])

  useEffect(() => {
    if (lecon && autorise) ouvrirLecon(id)
  }, [id, lecon, autorise, ouvrirLecon])

  if (!matiere || !chapitre || !meta) return <Introuvable message="Cette leçon n'existe pas encore." />
  if (!autorise || contenu.erreur === 'acces') return <AccesPremium titre={chapitre.titre} />
  if (contenu.erreur === 'reseau')
    return (
      <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-4 rounded-[32px] border border-ligne bg-white p-10 text-center">
        <h1 className="m-0 font-display text-2xl font-bold">Impossible de charger la leçon</h1>
        <p className="m-0 font-semibold text-gris">Vérifie ta connexion internet, puis réessaie.</p>
        <button type="button" onClick={contenu.reessayer} className="h-12 cursor-pointer rounded-full border-0 bg-bleu px-6 font-extrabold text-white">
          Réessayer
        </button>
      </div>
    )
  if (!lecon)
    return (
      <div role="status" className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-3 rounded-[32px] border border-ligne bg-white p-10 text-center">
        <span aria-hidden className="size-10 animate-spin rounded-full border-4 border-bleu-clair border-t-bleu" />
        <p className="m-0 font-display text-lg font-bold">Chargement de « {meta.titre} »…</p>
      </div>
    )

  const precedente = chapitre.lecons[index - 1]
  const suivante = chapitre.lecons[index + 1]
  const prochainChapitre = suivante ? undefined : chapitreSuivant(matiere.slug, chapitre.slug)
  const base = `/matieres/${matiere.slug}/${chapitre.slug}`

  const continuer = () => {
    terminerLecon(id)
    if (suivante) navigate(`${base}/${suivante.slug}`)
    else if (prochainChapitre) navigate(`/matieres/${matiere.slug}/${prochainChapitre.chapitre.slug}/${prochainChapitre.lecon.slug}`)
    else navigate(`/matieres/${matiere.slug}`)
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          to={`/matieres/${matiere.slug}`}
          aria-label={`Retour à ${matiere.nom}`}
          className="grid size-11 place-items-center rounded-full border border-ligne bg-white text-encre"
        >
          <IconeRetour taille={18} strokeWidth={2.4} />
        </Link>
        <div className="min-w-0 flex-[1_1_240px]">
          <p className="m-0 text-[13px] font-bold text-gris">
            {matiere.nom} · Chapitre {matiere.chapitres.indexOf(chapitre) + 1}
          </p>
          <p className="m-0 font-display text-lg font-bold">{chapitre.titre}</p>
        </div>
        <div className="flex flex-[1_1_280px] items-center gap-3">
          <div className="grid flex-1 gap-1.5" style={{ gridTemplateColumns: `repeat(${chapitre.lecons.length}, minmax(0, 1fr))` }}>
            {chapitre.lecons.map((l, i) => (
              <span
                key={l.slug}
                className={`h-2 rounded ${i <= index || leconsTerminees.includes(`${matiere.slug}/${chapitre.slug}/${l.slug}`) ? 'bg-bleu' : 'bg-ligne-forte'}`}
              />
            ))}
          </div>
          <span className="whitespace-nowrap text-[13px] font-extrabold text-gris">
            {index + 1} / {chapitre.lecons.length}
          </span>
        </div>
      </header>

      <div className="flex flex-wrap items-start gap-5">
        <article className="flex min-w-0 flex-[3_1_460px] flex-col gap-[18px] rounded-[32px] border border-ligne bg-white p-6 sm:px-10 sm:py-9">
          <span className="self-start rounded-full bg-bleu-clair px-3 py-1.5 text-[13px] font-extrabold text-bleu">Leçon {index + 1}</span>
          <h1 className="m-0 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-[40px]">{lecon.titre}</h1>
          {lecon.duree && <p className="m-0 -mt-2 text-sm font-bold text-gris">Temps estimé : {lecon.duree}</p>}
          {lecon.objectifs && (
            <section className="flex flex-col gap-2 rounded-3xl bg-fond px-6 py-5">
              <h2 className="m-0 font-display text-[15px] font-bold">Dans cette leçon, tu vas apprendre à :</h2>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[16px] font-semibold leading-relaxed marker:text-bleu">
                {lecon.objectifs.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </section>
          )}
          {lecon.video && <VideoYoutube {...lecon.video} />}
          {lecon.resume && (
            <div className="flex flex-col gap-2">
              <p className="m-0 text-sm font-bold text-gris">
                Regarde d'abord le résumé vidéo, puis lis le cours détaillé en dessous.
              </p>
              <ResumeVideo key={lecon.slug} resume={lecon.resume} titreLecon={lecon.titre} />
            </div>
          )}
          {lecon.blocs.map((b, i) => (
            <BlocLeconVue key={`${lecon.slug}-${i}`} bloc={b} />
          ))}

          <div className="mt-1.5 flex flex-wrap justify-between gap-2.5">
            {precedente ? (
              <Link
                to={`${base}/${precedente.slug}`}
                className="flex h-[52px] items-center rounded-full border border-ligne px-5 text-[15px] font-bold text-encre no-underline"
              >
                Leçon précédente
              </Link>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={continuer}
              className="flex h-[52px] cursor-pointer items-center gap-2.5 rounded-full border-0 bg-bleu px-6 text-[15px] font-extrabold text-white hover:bg-bleu-fonce"
            >
              {suivante ? 'Leçon suivante' : prochainChapitre ? 'Chapitre suivant' : 'Terminer le chapitre'}
              <IconeFleche taille={16} strokeWidth={2.6} />
            </button>
          </div>
        </article>

        <div className="flex min-w-0 flex-[2_1_320px] flex-col gap-4 lg:sticky lg:top-4">
          {exercice && (
            <section className="flex flex-col gap-3 rounded-[28px] bg-bleu p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="m-0 font-display text-base font-bold">Essaie maintenant</h2>
                <span className="rounded-full bg-jaune px-2.5 py-1 font-mono text-xs font-bold text-encre">{{ sql: 'SQL', html: 'HTML / CSS', javascript: 'JavaScript' }[exercice.langage]}</span>
              </div>
              <p className="m-0 text-sm font-semibold leading-relaxed text-[#E4E7FF]">{exercice.consigne}</p>
              {exercice.langage === 'html' ? (
                <>
                  <EspaceHTML code={code} setCode={setCode} exercice={exercice} compact />
                  <Link
                    to={`/coder/${exercice.id}`}
                    className="flex h-[46px] items-center justify-center rounded-full border-[1.5px] border-[#8F9BFF] text-sm font-bold text-white no-underline"
                  >
                    Ouvrir en plein écran
                  </Link>
                </>
              ) : (
                <>
                <EditeurCode valeur={code} onChange={setCode} hauteurMin={130} nomFichier={exercice.langage === 'sql' ? 'requete.sql' : 'exercice.js'} onExecuter={() => executer(code)} />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => executer(code)}
                    disabled={enCours}
                    className="h-[46px] flex-1 cursor-pointer rounded-full border-0 bg-jaune text-[15px] font-extrabold text-encre disabled:opacity-60"
                  >
                    Exécuter
                  </button>
                  <Link
                    to={`/coder/${exercice.id}`}
                    className="flex h-[46px] flex-1 items-center justify-center rounded-full border-[1.5px] border-[#8F9BFF] text-sm font-bold text-white no-underline"
                  >
                    Plein écran
                  </Link>
                </div>
                {exercice.langage === 'sql' && <SchemaBase base={exercice.base} compact />}
                <Console resultat={resultat} enCours={enCours} reussi={reussi} compact titre={exercice.langage === 'sql' ? 'Résultat' : 'Console'} />
                </>
              )}
            </section>
          )}

          <nav aria-label="Leçons du chapitre" className="flex flex-col gap-1 rounded-[28px] border border-ligne bg-white p-4">
            <p className="m-0 px-2 pb-2 pt-1 font-display text-sm font-bold">Dans ce chapitre</p>
            {chapitre.lecons.map((l, i) => {
              const faite = leconsTerminees.includes(`${matiere.slug}/${chapitre.slug}/${l.slug}`)
              const actuelle = i === index
              return (
                <Link
                  key={l.slug}
                  to={`${base}/${l.slug}`}
                  aria-current={actuelle ? 'page' : undefined}
                  className={`flex min-h-11 items-center gap-2.5 rounded-2xl px-2.5 text-sm no-underline ${
                    actuelle ? 'bg-bleu-clair font-extrabold text-bleu' : 'font-semibold text-encre hover:bg-fond'
                  }`}
                >
                  {faite ? (
                    <span className="grid size-[22px] place-items-center rounded-full bg-menthe text-menthe-fonce" aria-label="Terminée">
                      <IconeCoche taille={12} strokeWidth={3} />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className={`size-[22px] rounded-full border-[3px] ${actuelle ? 'border-bleu' : 'border-ligne-forte'}`}
                    />
                  )}
                  {i + 1}. {l.titre}
                </Link>
              )
            })}
            {!aAccesComplet && (
              <Link to="/abonnement" className="mt-1 flex min-h-11 items-center gap-2.5 rounded-2xl px-2.5 text-sm font-semibold text-gris no-underline">
                <IconeCadenas taille={20} /> Chapitres suivants en Premium
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

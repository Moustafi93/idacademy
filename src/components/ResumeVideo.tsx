import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { ResumeAnime, SceneResume } from '../data/types'
import { PAUSE_FIN_SCENE, REFLEXION_DEFI, dureeEtape, nbEtapes } from '../lib/tempsResume'

/*
 * Lecteur de « résumé vidéo » : les scènes s'enchaînent toutes seules, comme une vidéo.
 * Tout est animé dans le navigateur : aucun fichier vidéo, donc aucun coût d'hébergement
 * et très peu de données mobiles consommées. La voix utilise la synthèse vocale du navigateur.
 */

const vocalDisponible = typeof window !== 'undefined' && 'speechSynthesis' in window

function voixFrancaise() {
  const voix = window.speechSynthesis.getVoices()
  return voix.find((v) => v.lang.startsWith('fr') && /google|natural|premium/i.test(v.name)) ?? voix.find((v) => v.lang.startsWith('fr'))
}

// ——— Les différentes scènes ———

function SceneTitre({ s }: { s: Extract<SceneResume, { type: 'titre' }> }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[calc(var(--u)*2)] bg-bleu px-[calc(var(--u)*8)] text-center text-white">
      <span aria-hidden className="anim-pop grid size-[calc(var(--u)*9)] -rotate-6 place-items-center rounded-[calc(var(--u)*2)] bg-jaune font-mono text-[length:calc(var(--u)*3.2)] font-bold text-encre">
        &lt;/&gt;
      </span>
      <p className="anim-apparaitre m-0 font-display text-[length:calc(var(--u)*5.6)] font-bold leading-[1.1] tracking-tight">{s.titre}</p>
      {s.sousTitre && (
        <p className="anim-apparaitre m-0 text-[length:calc(var(--u)*2.4)] font-bold text-jaune" style={{ animationDelay: '0.25s' }}>
          {s.sousTitre}
        </p>
      )}
    </div>
  )
}

function ScenePoints({ s, etape }: { s: Extract<SceneResume, { type: 'points' }>; etape: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[calc(var(--u)*2.4)] bg-jaune px-[calc(var(--u)*7)] text-encre">
      <p className="anim-apparaitre m-0 font-display text-[length:calc(var(--u)*4)] font-bold tracking-tight">{s.titre}</p>
      <ul className="m-0 flex list-none flex-col gap-[calc(var(--u)*1.4)] p-0">
        {s.points.map((p, i) =>
          i <= etape ? (
            <li key={p} className="anim-apparaitre flex items-center gap-[calc(var(--u)*1.6)] rounded-[calc(var(--u)*1.6)] bg-white px-[calc(var(--u)*2)] py-[calc(var(--u)*1.2)] text-[length:calc(var(--u)*2.5)] font-bold">
              <span aria-hidden className="size-[calc(var(--u)*1.4)] shrink-0 rounded-full bg-bleu" />
              {p}
            </li>
          ) : (
            <li key={p} aria-hidden className="h-[calc(var(--u)*5.2)] rounded-[calc(var(--u)*1.6)] border-[calc(var(--u)*0.25)] border-dashed border-encre/15" />
          ),
        )}
      </ul>
    </div>
  )
}

function SceneCode({ s, etape }: { s: Extract<SceneResume, { type: 'code' }>; etape: number }) {
  const actuelle = s.etapes[etape]
  const sorties = s.etapes.slice(0, etape + 1).flatMap((e) => (e.sortie ? [e.sortie] : []))
  const precedente = s.etapes[etape - 1]
  return (
    <div className="flex h-full flex-col gap-[calc(var(--u)*1.8)] bg-encre px-[calc(var(--u)*4.5)] py-[calc(var(--u)*3.5)] text-white">
      <p className="m-0 font-display text-[length:calc(var(--u)*3)] font-bold">{s.titre}</p>
      <div className="flex min-h-0 flex-1 gap-[calc(var(--u)*2.5)] @max-lg:flex-col">
        <pre className="m-0 flex flex-[3] flex-col justify-center rounded-[calc(var(--u)*1.8)] bg-[#1E2138] py-[calc(var(--u)*1.5)] font-mono text-[length:calc(var(--u)*2.1)] leading-[1.9]">
          {s.lignes.map((l, i) => (
            <span
              key={i}
              className={`block border-l-[calc(var(--u)*0.5)] px-[calc(var(--u)*2)] transition-colors duration-300 ${
                i === actuelle.ligne ? 'border-jaune bg-jaune/20 text-white' : 'border-transparent text-[#9EA3C2]'
              }`}
            >
              {l || ' '}
            </span>
          ))}
        </pre>
        <div className="flex flex-[2] flex-col gap-[calc(var(--u)*1.5)]">
          <div className="flex flex-wrap gap-[calc(var(--u)*1.2)]">
            {Object.entries(actuelle.variables).map(([nom, valeur]) => (
              <div key={nom} className="flex min-w-[calc(var(--u)*10)] flex-1 flex-col items-center rounded-[calc(var(--u)*1.6)] bg-bleu px-[calc(var(--u)*1.5)] py-[calc(var(--u)*1)]">
                <span className="font-mono text-[length:calc(var(--u)*1.7)] font-bold text-bleu-doux">{nom}</span>
                <span
                  key={valeur}
                  className={`font-display text-[length:calc(var(--u)*3.6)] font-bold ${precedente?.variables[nom] !== valeur ? 'anim-pop text-jaune' : ''}`}
                >
                  {valeur}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col rounded-[calc(var(--u)*1.6)] bg-white px-[calc(var(--u)*1.8)] py-[calc(var(--u)*1.2)] text-encre">
            <span className="text-[length:calc(var(--u)*1.5)] font-extrabold uppercase tracking-wider text-gris">Écran</span>
            <div className="font-mono text-[length:calc(var(--u)*2)] leading-[1.6]">
              {sorties.map((o, i) => (
                <div key={i} className={i === sorties.length - 1 && actuelle.sortie ? 'anim-apparaitre' : ''}>
                  {o}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[calc(var(--u)*5)]">
        {actuelle.note && (
          <p key={etape} className="anim-apparaitre m-0 inline-block rounded-full bg-menthe px-[calc(var(--u)*2)] py-[calc(var(--u)*0.9)] text-[length:calc(var(--u)*2.1)] font-extrabold text-menthe-fonce">
            {actuelle.note}
          </p>
        )}
      </div>
    </div>
  )
}

function SceneComparaison({ s, etape }: { s: Extract<SceneResume, { type: 'comparaison' }>; etape: number }) {
  const couleurs = ['bg-bleu text-white', 'bg-jaune text-encre', 'bg-corail text-encre']
  return (
    <div className="flex h-full flex-col justify-center gap-[calc(var(--u)*3)] bg-menthe px-[calc(var(--u)*6)] text-menthe-fonce">
      <p className="anim-apparaitre m-0 font-display text-[length:calc(var(--u)*4)] font-bold tracking-tight">{s.titre}</p>
      <div className={`grid gap-[calc(var(--u)*2)] @max-lg:grid-cols-1 ${s.colonnes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {s.colonnes.map((c, i) => (
          <div
            key={c.nom}
            className={`flex flex-col gap-[calc(var(--u)*1.5)] rounded-[calc(var(--u)*2)] bg-white p-[calc(var(--u)*2.2)] ${i <= etape ? 'anim-apparaitre' : 'opacity-0'}`}
          >
            <span className={`self-start rounded-full px-[calc(var(--u)*1.8)] py-[calc(var(--u)*0.6)] font-display text-[length:calc(var(--u)*2.4)] font-bold ${couleurs[i % 3]}`}>{c.nom}</span>
            <span className="text-[length:calc(var(--u)*2.2)] font-bold leading-snug text-encre">{c.texte}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Bloc({ visible, children, className }: { visible: boolean; children: ReactNode; className: string }) {
  return visible ? (
    <div className={`anim-apparaitre ${className}`}>{children}</div>
  ) : (
    <div aria-hidden className="flex-1 rounded-[calc(var(--u)*1.6)] border-[calc(var(--u)*0.25)] border-dashed border-encre/15" />
  )
}

function SceneExemple({ s, etape }: { s: Extract<SceneResume, { type: 'exemple' }>; etape: number }) {
  // Plus le code est long, plus le texte est petit, pour que tout tienne dans le cadre
  const lignes = Math.max(s.code.length, s.resultat.length)
  const taille = { '--t': Math.min(1.85, 12 / (lignes + 1)) } as CSSProperties
  return (
    <div className="flex h-full flex-col gap-[calc(var(--u)*1.6)] bg-fond px-[calc(var(--u)*4)] py-[calc(var(--u)*3)] text-encre">
      <div className="flex flex-wrap items-center gap-[calc(var(--u)*1.4)]">
        <span className="rounded-full bg-corail px-[calc(var(--u)*1.6)] py-[calc(var(--u)*0.5)] text-[length:calc(var(--u)*1.7)] font-extrabold uppercase tracking-wider">
          Exemple concret
        </span>
        <p className="m-0 font-display text-[length:calc(var(--u)*3)] font-bold leading-tight">{s.titre}</p>
      </div>
      <div className="anim-apparaitre flex items-start gap-[calc(var(--u)*1.4)] rounded-[calc(var(--u)*1.6)] bg-bleu-clair px-[calc(var(--u)*2)] py-[calc(var(--u)*1.3)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-[calc(var(--u)*0.3)] size-[calc(var(--u)*2.6)] shrink-0 text-bleu">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <p className="m-0 text-[length:calc(var(--u)*2.1)] font-bold leading-snug">{s.situation}</p>
      </div>
      <div className="flex min-h-0 flex-1 gap-[calc(var(--u)*2)] @max-lg:flex-col">
        <Bloc visible={etape >= 1} className="flex min-h-0 flex-[3] flex-col overflow-hidden rounded-[calc(var(--u)*1.6)] bg-encre text-white">
          <span className="bg-[#1E2138] px-[calc(var(--u)*2)] py-[calc(var(--u)*0.7)] font-mono text-[length:calc(var(--u)*1.6)] font-bold text-bleu-doux">{s.langage}</span>
          <pre style={taille} className="m-0 flex flex-1 flex-col justify-center px-[calc(var(--u)*2)] py-[calc(var(--u)*1)] font-mono text-[length:calc(var(--u)*var(--t))] leading-[1.6] @max-lg:text-[length:calc(var(--u)*1.85)] whitespace-pre-wrap">
            {s.code.join('\n')}
          </pre>
        </Bloc>
        <Bloc visible={etape >= 2} className="flex min-h-0 flex-[2] flex-col gap-[calc(var(--u)*0.8)] rounded-[calc(var(--u)*1.6)] bg-menthe px-[calc(var(--u)*2)] py-[calc(var(--u)*1.3)] text-menthe-fonce">
          <span className="text-[length:calc(var(--u)*1.6)] font-extrabold uppercase tracking-wider">Résultat</span>
          <div style={taille} className="flex flex-1 flex-col justify-center gap-[calc(var(--u)*0.4)] font-mono text-[length:calc(var(--u)*var(--t))] font-bold @max-lg:text-[length:calc(var(--u)*1.85)] leading-snug">
            {s.resultat.map((r, i) => (
              <div key={i}>{r}</div>
            ))}
          </div>
        </Bloc>
      </div>
    </div>
  )
}

function SceneDefi({ s, etape, lecture }: { s: Extract<SceneResume, { type: 'defi' }>; etape: number; lecture: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[calc(var(--u)*2)] bg-bleu px-[calc(var(--u)*5)] py-[calc(var(--u)*3)] text-white">
      <span className="anim-pop self-start rounded-full bg-jaune px-[calc(var(--u)*1.8)] py-[calc(var(--u)*0.6)] text-[length:calc(var(--u)*1.9)] font-extrabold text-encre">À toi de jouer !</span>
      <p className="anim-apparaitre m-0 font-display text-[length:calc(var(--u)*3.2)] font-bold leading-tight">{s.question}</p>
      {s.code && (
        <pre className="anim-apparaitre m-0 rounded-[calc(var(--u)*1.6)] bg-encre px-[calc(var(--u)*2.2)] py-[calc(var(--u)*1.3)] font-mono text-[length:calc(var(--u)*1.9)] leading-[1.6] whitespace-pre-wrap">
          {s.code.join('\n')}
        </pre>
      )}
      {etape === 0 ? (
        <div className="flex items-center gap-[calc(var(--u)*1.6)]">
          <span className="text-[length:calc(var(--u)*2)] font-extrabold text-jaune">Réfléchis…</span>
          <span className="h-[calc(var(--u)*1)] flex-1 overflow-hidden rounded-full bg-white/20">
            <span
              className="anim-rebours block h-full rounded-full bg-jaune"
              style={{ '--duree-rebours': `${REFLEXION_DEFI}ms`, animationPlayState: lecture ? 'running' : 'paused' } as CSSProperties}
            />
          </span>
        </div>
      ) : (
        <div className="anim-pop flex flex-col gap-[calc(var(--u)*0.8)] rounded-[calc(var(--u)*1.8)] bg-white px-[calc(var(--u)*2.4)] py-[calc(var(--u)*1.6)] text-encre">
          <span className="text-[length:calc(var(--u)*1.6)] font-extrabold uppercase tracking-wider text-bleu">Réponse</span>
          <p className="m-0 font-display text-[length:calc(var(--u)*2.8)] font-bold leading-tight whitespace-pre-line">{s.reponse}</p>
          {s.explication && <p className="m-0 text-[length:calc(var(--u)*1.9)] font-semibold leading-snug text-gris">{s.explication}</p>}
        </div>
      )}
    </div>
  )
}

function Scene({ s, etape, lecture }: { s: SceneResume; etape: number; lecture: boolean }) {
  switch (s.type) {
    case 'titre':
      return <SceneTitre s={s} />
    case 'points':
      return <ScenePoints s={s} etape={etape} />
    case 'code':
      return <SceneCode s={s} etape={etape} />
    case 'comparaison':
      return <SceneComparaison s={s} etape={etape} />
    case 'exemple':
      return <SceneExemple s={s} etape={etape} />
    case 'defi':
      return <SceneDefi s={s} etape={etape} lecture={lecture} />
  }
}

// ——— Le lecteur ———

export function ResumeVideo({ resume, titreLecon }: { resume: ResumeAnime; titreLecon: string }) {
  const [scene, setScene] = useState(0)
  const [etape, setEtape] = useState(0)
  const [lecture, setLecture] = useState(false)
  const [demarre, setDemarre] = useState(false)
  const [fini, setFini] = useState(false)
  const [son, setSon] = useState(vocalDisponible)
  const parle = useRef(false)
  const conteneur = useRef<HTMLDivElement>(null)

  const total = resume.scenes.length
  const courante = resume.scenes[scene]

  const taire = useCallback(() => {
    if (vocalDisponible) window.speechSynthesis.cancel()
    parle.current = false
  }, [])

  const dire = useCallback(
    (texte: string) => {
      taire()
      const phrase = new SpeechSynthesisUtterance(texte)
      phrase.lang = 'fr-FR'
      const voix = voixFrancaise()
      if (voix) phrase.voice = voix
      phrase.rate = 1.02
      phrase.onend = () => (parle.current = false)
      phrase.onerror = () => (parle.current = false)
      parle.current = true
      window.speechSynthesis.speak(phrase)
    },
    [taire],
  )

  // Narration au début de chaque scène
  useEffect(() => {
    if (!lecture || !son || !vocalDisponible) return
    dire(resume.scenes[scene].narration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, lecture, son])

  // Défi : on lit la réponse quand elle s'affiche
  useEffect(() => {
    const s = resume.scenes[scene]
    if (!lecture || !son || !vocalDisponible || s.type !== 'defi' || etape !== 1) return
    dire(s.narrationReponse ?? s.explication ?? s.reponse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etape])

  // Avancement automatique
  useEffect(() => {
    if (!lecture) return
    const derniere = etape >= nbEtapes(courante) - 1
    const delai = dureeEtape(courante, etape) + (derniere ? PAUSE_FIN_SCENE : 0)
    // Pour un défi, on attend aussi la fin de la question lue avant d'afficher la réponse
    const attendreVoix = derniere || courante.type === 'defi'
    let attente: ReturnType<typeof setTimeout> | undefined
    const debut = Date.now() + delai
    const minuteur = setTimeout(function avancer() {
      if (attendreVoix && parle.current && Date.now() - debut < 12000) {
        attente = setTimeout(avancer, 300)
        return
      }
      if (!derniere) return setEtape((e) => e + 1)
      // On attend la fin de la voix avant de changer de scène (12 s maximum,
      // au cas où l'appareil n'a pas de voix française et ne signale jamais la fin).
      if (parle.current && Date.now() - debut < 12000) {
        attente = setTimeout(avancer, 300)
        return
      }
      taire()
      if (scene < total - 1) {
        setScene((s) => s + 1)
        setEtape(0)
      } else {
        setLecture(false)
        setFini(true)
      }
    }, delai)
    return () => {
      clearTimeout(minuteur)
      clearTimeout(attente)
    }
  }, [lecture, etape, scene, courante, total, taire])

  useEffect(() => taire, [taire])

  const allerA = (n: number) => {
    taire()
    setScene(Math.max(0, Math.min(total - 1, n)))
    setEtape(0)
    setFini(false)
  }

  const basculerLecture = () => {
    setDemarre(true)
    if (fini) {
      allerA(0)
      setLecture(true)
      return
    }
    if (lecture) taire()
    setLecture((l) => !l)
  }

  const basculerSon = () => {
    if (son) taire()
    setSon((s) => !s)
  }

  const pleinEcran = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else conteneur.current?.requestFullscreen?.()
  }

  return (
    <section ref={conteneur} className="lecteur flex flex-col gap-3" aria-label={`Résumé vidéo : ${titreLecon}`}>
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[9/16] max-h-[78vh] w-full overflow-hidden rounded-[28px] @container sm:aspect-video sm:max-h-none" aria-live="polite">
          <div key={scene} className="scene anim-apparaitre h-full">
            <Scene s={courante} etape={etape} lecture={lecture} />
          </div>

          {!demarre && (
            <button
              type="button"
              onClick={basculerLecture}
              className="scene absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-[calc(var(--u)*2)] border-0 bg-encre/70 text-white"
              aria-label="Lancer le résumé vidéo"
            >
              <span className="grid size-[calc(var(--u)*12)] place-items-center rounded-full bg-jaune text-encre shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-[calc(var(--u)*0.8)] size-[calc(var(--u)*5)]" aria-hidden>
                  <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
                </svg>
              </span>
              <span className="rounded-full bg-encre px-[calc(var(--u)*2.4)] py-[calc(var(--u)*1)] text-[length:calc(var(--u)*2.2)] font-extrabold">Regarder le résumé · {resume.duree}</span>
            </button>
          )}

          {fini && (
            <div className="scene absolute inset-0 flex flex-col items-center justify-center gap-[calc(var(--u)*2)] bg-encre/80 text-white">
              <p className="m-0 font-display text-[length:calc(var(--u)*4)] font-bold">Résumé terminé</p>
              <button type="button" onClick={basculerLecture} className="cursor-pointer rounded-full border-0 bg-jaune px-[calc(var(--u)*3)] py-[calc(var(--u)*1.4)] text-[length:calc(var(--u)*2.2)] font-extrabold text-encre">
                Revoir
              </button>
            </div>
          )}
        </div>

        {/* Barre de progression par scène */}
        <div className="flex gap-1.5" aria-hidden>
          {resume.scenes.map((s, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => allerA(i)}
              className="h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full border-0 bg-ligne-forte p-0"
            >
              <span
                className="block h-full origin-left rounded-full bg-bleu transition-transform duration-500"
                style={{ transform: `scaleX(${i < scene ? 1 : i === scene ? (etape + 1) / nbEtapes(s) : 0})` }}
              />
            </button>
          ))}
        </div>

        {/* Commandes */}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => allerA(scene - 1)} aria-label="Scène précédente" className="grid size-11 cursor-pointer place-items-center rounded-full border border-ligne bg-white text-encre">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6 5h2v14H6zM20 5.5v13a1 1 0 0 1-1.5.86L9 13.7a1 1 0 0 1 0-1.72l9.5-6.48A1 1 0 0 1 20 5.5z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={basculerLecture}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white"
          >
            {lecture ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
              </svg>
            )}
            {lecture ? 'Pause' : fini ? 'Revoir' : demarre ? 'Reprendre' : 'Lecture'}
          </button>
          <button type="button" onClick={() => allerA(scene + 1)} aria-label="Scène suivante" className="grid size-11 cursor-pointer place-items-center rounded-full border border-ligne bg-white text-encre">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16 5h2v14h-2zM4 5.5v13a1 1 0 0 0 1.5.86L15 13.7a1 1 0 0 0 0-1.72L5.5 5.5A1 1 0 0 0 4 5.5z" />
            </svg>
          </button>
          <span className="text-sm font-bold text-gris">
            Scène {scene + 1} / {total}
          </span>
          <div className="ml-auto flex gap-2">
            {vocalDisponible && (
              <button
                type="button"
                onClick={basculerSon}
                aria-pressed={son}
                className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-bold ${son ? 'border-bleu bg-bleu-clair text-bleu' : 'border-ligne bg-white text-gris'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5 6 9H2v6h4l5 4z" />
                  {son ? <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /> : <path d="m22 9-6 6M16 9l6 6" />}
                </svg>
                {son ? 'Voix activée' : 'Voix coupée'}
              </button>
            )}
            <button type="button" onClick={pleinEcran} aria-label="Plein écran" className="grid size-11 cursor-pointer place-items-center rounded-full border border-ligne bg-white text-encre">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Vidéo enregistrée sur YouTube (non répertoriée). On n'affiche que l'image tant que l'étudiant
// n'a pas cliqué : la vidéo ne consomme pas de données mobiles pour rien.
export function VideoYoutube({ youtubeId, titre, duree }: { youtubeId: string; titre: string; duree: string }) {
  const [active, setActive] = useState(false)
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-encre">
      {active ? (
        <iframe
          className="absolute inset-0 size-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={titre}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 cursor-pointer border-0 p-0" aria-label={`Lire la vidéo : ${titre}`}>
          <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" className="size-full object-cover opacity-80" loading="lazy" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-3 rounded-full bg-jaune px-6 py-3 font-extrabold text-encre">▶ {titre} · {duree}</span>
          </span>
        </button>
      )}
    </div>
  )
}

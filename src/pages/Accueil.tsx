import { Link } from 'react-router-dom'
import { calculerSerie, useSession } from '../context/Session'
import { matieres, trouverLecon } from '../data/matieres'
import { BadgeCode, BarreProgression } from '../components/ui'
import { progressionMatiere } from '../lib/affichage'
import { IconeChrono, IconeEnvoyer, IconeEtincelle, IconeFleche } from '../components/Icones'

const JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function semaineCourante(joursActifs: string[]) {
  const lundi = new Date()
  lundi.setDate(lundi.getDate() - ((lundi.getDay() + 6) % 7))
  return JOURS.map((lettre, i) => {
    const d = new Date(lundi)
    d.setDate(lundi.getDate() + i)
    return { lettre, actif: joursActifs.includes(d.toISOString().slice(0, 10)), cle: i }
  })
}

export default function Accueil() {
  const session = useSession()
  const { utilisateur, derniereLecon, leconsTerminees, joursActifs, aAccesComplet, joursRestants, typeAcces } = session

  const [mSlug, cSlug, lSlug] = (derniereLecon ?? 'algorithmique/variables-et-types/qu-est-ce-qu-un-algorithme').split('/')
  const { matiere, chapitre, lecon, index } = trouverLecon(mSlug, cSlug, lSlug)
  const lienReprise = `/matieres/${mSlug}/${cSlug}/${lSlug}`
  const avancement = matiere ? progressionMatiere(matiere, leconsTerminees) : 0
  const serie = calculerSerie(joursActifs)
  const mesMatieres = matieres.filter((m) => m.formation === 'professionnelle').slice(0, 4)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Carte principale */}
        <section className="flex flex-wrap items-center gap-7 overflow-hidden rounded-[32px] bg-bleu p-7 text-white sm:p-9 lg:col-span-8">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5">
            <p className="m-0 text-[15px] font-bold text-bleu-doux">
              {utilisateur ? `Bonjour ${utilisateur.prenom}` : 'Bienvenue sur IDAcademy'}
            </p>
            <h1 className="m-0 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-[42px]">
              Ton BTS IDA, un chapitre à la fois.
            </h1>
            <p className="m-0 text-base leading-relaxed text-[#E4E7FF]">
              {derniereLecon
                ? `Reprends « ${chapitre?.titre} » là où tu t'es arrêté : ${avancement} % de ${matiere?.nom} fait.`
                : "Commence par le début : qu'est-ce qu'un algorithme ? Le premier chapitre est gratuit."}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              <Link
                to={lienReprise}
                className="flex h-[52px] items-center gap-2.5 rounded-full bg-jaune px-6 text-[15px] font-extrabold text-encre no-underline hover:brightness-95"
              >
                {derniereLecon ? 'Reprendre la leçon' : 'Commencer'}
                <IconeFleche taille={16} strokeWidth={2.6} />
              </Link>
              <Link
                to={`/matieres/${mSlug}`}
                className="flex h-[52px] items-center rounded-full border-[1.5px] border-[#8F9BFF] px-5 text-[15px] font-bold text-white no-underline hover:bg-white/10"
              >
                Voir la matière
              </Link>
            </div>
          </div>
          <div className="relative min-w-0 flex-[0_1_280px] py-2.5" aria-hidden>
            <pre className="m-0 rotate-3 overflow-hidden rounded-[20px] bg-encre px-5 py-4 font-mono text-sm leading-[1.8] text-[#E6E8F5]">
              <span className="text-corail">Pour</span> i ← 1 <span className="text-corail">à</span> 5 <span className="text-corail">faire</span>{'\n'}
              {'  '}Écrire(<span className="text-menthe">"Tour "</span>, i){'\n'}
              <span className="text-corail">FinPour</span>
            </pre>
            {lecon && chapitre && (
              <span className="absolute -bottom-3.5 -right-1.5 -rotate-[5deg] rounded-full bg-menthe px-3.5 py-2 text-[13px] font-extrabold text-menthe-fonce">
                Leçon {index + 1} sur {chapitre.lecons.length}
              </span>
            )}
          </div>
        </section>

        {/* Essai / abonnement */}
        <section className="flex flex-col gap-2 rounded-[32px] bg-jaune p-7 text-encre lg:col-span-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-extrabold uppercase tracking-wider">
              {typeAcces === 'premium' && aAccesComplet ? 'Premium actif' : 'Essai gratuit'}
            </span>
            {aAccesComplet && (
              <span className="rounded-full bg-encre px-2.5 py-1.5 text-xs font-extrabold text-jaune">Tout est ouvert</span>
            )}
          </div>
          {aAccesComplet ? (
            <>
              <div className="mt-2.5 flex items-baseline gap-2.5">
                <span className="font-display text-8xl font-extrabold leading-[0.9] tracking-[-5px]">{joursRestants}</span>
                <span className="text-lg font-extrabold leading-tight">
                  {joursRestants > 1 ? 'jours' : 'jour'}
                  <br />
                  restants
                </span>
              </div>
              <p className="m-0 mt-2 text-[15px] font-semibold leading-relaxed text-[#3D3415]">
                {typeAcces === 'premium' ? 'Pense à renouveler avant la fin.' : "Garde l'accès complet après l'essai."}
              </p>
            </>
          ) : (
            <>
              <p className="m-0 mt-3 font-display text-3xl font-bold leading-tight">3 jours offerts</p>
              <p className="m-0 mt-1 text-[15px] font-semibold leading-relaxed text-[#3D3415]">
                Utilise le code <strong className="font-mono">IDA3</strong> pour tout ouvrir gratuitement.
              </p>
            </>
          )}
          <Link
            to="/abonnement"
            className="mt-auto flex h-[52px] items-center justify-center rounded-full bg-encre text-[15px] font-extrabold text-white no-underline hover:bg-black"
          >
            {aAccesComplet && typeAcces === 'premium' ? 'Renouveler' : 'Passer Premium · 3 000 F'}
          </Link>
        </section>

        {/* Série */}
        <section className="flex flex-col gap-4 rounded-[32px] border border-ligne bg-white p-6 lg:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="m-0 font-display text-[17px] font-bold">Ta série</h2>
            <span className="font-display text-2xl font-extrabold text-orange">{serie} j</span>
          </div>
          <ul className="m-0 grid list-none grid-cols-7 gap-1.5 p-0 text-center text-xs font-extrabold text-gris">
            {semaineCourante(joursActifs).map((j) => (
              <li key={j.cle} className="flex flex-col items-center gap-1.5">
                <span
                  className={`size-8 rounded-full ${j.actif ? 'bg-orange' : 'border-2 border-dashed border-ligne-forte'}`}
                  aria-label={j.actif ? 'Jour actif' : 'Jour sans activité'}
                />
                {j.lettre}
              </li>
            ))}
          </ul>
          <p className="m-0 text-sm font-semibold text-gris">Une leçon aujourd'hui pour garder la flamme.</p>
        </section>

        {/* Préparation BTS */}
        <section className="flex flex-col gap-2.5 rounded-[32px] bg-menthe p-6 text-menthe-fonce lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-full bg-white">
              <IconeChrono taille={20} />
            </span>
            <h2 className="m-0 font-display text-[17px] font-bold">Préparation BTS</h2>
          </div>
          <p className="m-0 mt-1 text-lg font-extrabold">Sujet type · Merise</p>
          <p className="m-0 text-sm font-semibold leading-relaxed text-[#1F4A37]">
            Mode examen chronométré, corrigé détaillé après l'épreuve.
          </p>
          <Link
            to="/preparation-bts"
            className="mt-auto flex h-[46px] items-center self-start rounded-full bg-menthe-fonce px-5 text-sm font-extrabold text-white no-underline"
          >
            Voir les sujets
          </Link>
        </section>

        {/* Assistant IA */}
        <section className="flex flex-col gap-3 rounded-[32px] border border-ligne bg-white p-6 lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-full bg-bleu-clair text-bleu">
              <IconeEtincelle taille={20} />
            </span>
            <h2 className="m-0 font-display text-[17px] font-bold">Assistant IA</h2>
            <span className="ml-auto rounded-full bg-creme px-2.5 py-1 text-xs font-extrabold text-gris">Bientôt</span>
          </div>
          <p className="m-0 text-sm font-semibold leading-relaxed text-gris">
            Une notion pas claire ? Une erreur dans ton code ? Tu pourras bientôt demander ici.
          </p>
          <form className="mt-auto flex items-center gap-2 rounded-full border border-ligne bg-fond py-1 pl-4 pr-1" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="question-ia" className="sr-only">
              Question pour l'assistant IA
            </label>
            <input
              id="question-ia"
              disabled
              placeholder="C'est quoi une clé étrangère ?"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-encre outline-none"
            />
            <button type="submit" disabled aria-label="Envoyer" className="grid size-10 place-items-center rounded-full bg-bleu text-white opacity-50">
              <IconeEnvoyer taille={16} />
            </button>
          </form>
        </section>
      </div>

      {/* Mes matières */}
      <section className="mt-2 flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="m-0 font-display text-2xl font-bold tracking-tight">Mes matières</h2>
          <Link to="/matieres" className="text-sm font-extrabold text-bleu no-underline">
            Voir les 21 matières →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {mesMatieres.map((m) => (
            <Link
              key={m.slug}
              to={`/matieres/${m.slug}`}
              className="flex flex-col gap-3.5 rounded-3xl border border-ligne bg-white p-5 text-encre no-underline transition-transform hover:-translate-y-0.5"
            >
              <BadgeCode texte={m.badge} couleur={m.couleur} />
              <span className="font-display text-base font-semibold">{m.nom}</span>
              <BarreProgression valeur={progressionMatiere(m, leconsTerminees)} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

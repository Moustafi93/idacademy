import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { ChampMotDePasse } from '../components/ChampMotDePasse'

type Mode = 'inscription' | 'connexion' | 'oubli'

const TITRES: Record<Mode, string> = {
  inscription: 'Créer mon compte',
  connexion: 'Me connecter',
  oubli: 'Mot de passe oublié',
}

const champ = 'h-[50px] rounded-full border border-ligne bg-fond px-[18px] text-[15px]'

export default function Connexion() {
  const { utilisateur, pret, modeServeur, inscrire, connecter, motDePasseOublie } = useSession()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const mode: Mode = params.get('mode') === 'connexion' || params.get('mode') === 'oubli' ? (params.get('mode') as Mode) : 'inscription'
  const retour = params.get('retour')?.startsWith('/') ? params.get('retour')! : '/'

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; texte: string; detail?: string } | null>(null)

  if (pret && utilisateur) return <Navigate to={retour} replace />

  const changerMode = (m: Mode) => {
    setMessage(null)
    const p = new URLSearchParams(params)
    if (m === 'inscription') p.delete('mode')
    else p.set('mode', m)
    setParams(p, { replace: true })
  }

  const valider = async (e: FormEvent) => {
    e.preventDefault()
    setEnvoi(true)
    setMessage(null)
    const r =
      mode === 'inscription' ? await inscrire(prenom, nom, email, motDePasse) : mode === 'connexion' ? await connecter(email, motDePasse) : await motDePasseOublie(email)
    setEnvoi(false)
    setMessage({ ok: r.ok, texte: r.message, detail: r.detail })
    // En démo, ou si la confirmation par e-mail est désactivée, on est connecté tout de suite
    if (r.ok && mode !== 'oubli' && !modeServeur) navigate(retour)
  }

  return (
    <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 overflow-hidden rounded-[32px] border border-ligne bg-white md:grid-cols-2">
      <div className="flex flex-col justify-between gap-6 bg-bleu p-9 text-white">
        <h1 className="m-0 font-display text-3xl font-bold leading-tight">Rejoins les étudiants qui révisent leur BTS IDA.</h1>
        <ul className="m-0 flex list-none flex-col gap-2 p-0 font-semibold text-[#E4E7FF]">
          <li>2 chapitres gratuits dans chaque matière</li>
          <li>3 jours d'essai complet avec le code IDA3</li>
          <li>Ta progression sauvegardée sur tous tes appareils</li>
        </ul>
      </div>

      <form onSubmit={valider} className="flex flex-col gap-4 p-9">
        {mode !== 'oubli' && (
          <div role="tablist" aria-label="Type de formulaire" className="flex gap-1 self-start rounded-full bg-fond p-1">
            {(['inscription', 'connexion'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => changerMode(m)}
                className={`h-10 cursor-pointer rounded-full border-0 px-4 text-sm font-extrabold ${mode === m ? 'bg-bleu text-white' : 'bg-transparent text-gris'}`}
              >
                {m === 'inscription' ? 'Inscription' : 'Connexion'}
              </button>
            ))}
          </div>
        )}
        <h2 className="m-0 font-display text-xl font-bold">{TITRES[mode]}</h2>

        {mode === 'inscription' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <label htmlFor="nom" className="text-sm font-bold text-gris">
                Nom
              </label>
              <input id="nom" required autoComplete="family-name" value={nom} onChange={(e) => setNom(e.target.value)} className={`${champ} min-w-0`} />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <label htmlFor="prenom" className="text-sm font-bold text-gris">
                Prénom
              </label>
              <input id="prenom" required autoComplete="given-name" value={prenom} onChange={(e) => setPrenom(e.target.value)} className={`${champ} min-w-0`} />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-bold text-gris">
            Adresse e-mail
          </label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={champ} />
        </div>
        {mode !== 'oubli' && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="mot-de-passe" className="text-sm font-bold text-gris">
              Mot de passe {mode === 'inscription' && <span className="font-semibold">(6 caractères minimum)</span>}
            </label>
            <ChampMotDePasse id="mot-de-passe" valeur={motDePasse} onChange={setMotDePasse} nouveau={mode === 'inscription'} className={champ} />
          </div>
        )}

        {message && (
          <div role="status" className={`flex flex-col gap-1.5 rounded-2xl p-3.5 text-sm font-bold ${message.ok ? 'bg-menthe text-menthe-fonce' : 'bg-[#FFE3D8] text-[#9A2A06]'}`}>
            <p className="m-0">{message.texte}</p>
            {message.detail && (
              <p className="m-0 break-words font-mono text-[11px] font-semibold opacity-80">Détail : {message.detail}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={envoi}
          className="mt-1 h-[52px] cursor-pointer rounded-full border-0 bg-bleu text-[15px] font-extrabold text-white hover:bg-bleu-fonce disabled:opacity-60"
        >
          {envoi ? 'Un instant…' : mode === 'inscription' ? 'Créer mon compte' : mode === 'connexion' ? 'Me connecter' : 'Recevoir le lien'}
        </button>

        {mode === 'connexion' && modeServeur && (
          <button type="button" onClick={() => changerMode('oubli')} className="cursor-pointer self-start border-0 bg-transparent p-0 text-sm font-bold text-bleu underline">
            Mot de passe oublié ?
          </button>
        )}
        {mode === 'oubli' && (
          <button type="button" onClick={() => changerMode('connexion')} className="cursor-pointer self-start border-0 bg-transparent p-0 text-sm font-bold text-bleu underline">
            Retour à la connexion
          </button>
        )}
        {mode === 'inscription' && (
          <p className="m-0 text-xs font-semibold leading-relaxed text-gris">
            En créant un compte, tu acceptes les <Link to="/conditions" className="text-bleu">conditions d'utilisation</Link>.
          </p>
        )}
        {!modeServeur && <p className="m-0 text-xs font-semibold text-gris">Mode démo : tes données restent dans ce navigateur.</p>}
      </form>
    </div>
  )
}

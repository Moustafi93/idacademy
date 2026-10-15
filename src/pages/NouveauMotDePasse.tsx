import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../context/Session'
import { supabase } from '../lib/supabase'

// Page ouverte depuis le lien « mot de passe oublié » reçu par e-mail
export default function NouveauMotDePasse() {
  const { utilisateur, pret } = useSession()
  const navigate = useNavigate()
  const [motDePasse, setMotDePasse] = useState('')
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null)

  const valider = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    const { error } = await supabase.auth.updateUser({ password: motDePasse })
    if (error) setMessage({ ok: false, texte: 'Impossible de changer le mot de passe. Le lien a peut-être expiré : redemande-en un.' })
    else {
      setMessage({ ok: true, texte: 'Mot de passe changé !' })
      setTimeout(() => navigate('/'), 1200)
    }
  }

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col gap-4 rounded-[32px] border border-ligne bg-white p-9">
      <h1 className="m-0 font-display text-2xl font-bold">Nouveau mot de passe</h1>
      {!pret ? (
        <p className="m-0 font-semibold text-gris">Vérification du lien…</p>
      ) : !utilisateur ? (
        <>
          <p className="m-0 font-semibold text-gris">Ce lien n'est plus valide. Redemande un lien depuis la page de connexion.</p>
          <Link to="/connexion?mode=oubli" className="flex h-12 items-center justify-center rounded-full bg-bleu font-extrabold text-white no-underline">
            Redemander un lien
          </Link>
        </>
      ) : (
        <form onSubmit={valider} className="flex flex-col gap-3">
          <label htmlFor="nouveau" className="text-sm font-bold text-gris">
            Choisis un nouveau mot de passe (6 caractères minimum)
          </label>
          <input
            id="nouveau"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="h-[50px] rounded-full border border-ligne bg-fond px-[18px] text-[15px]"
          />
          {message && (
            <p role="status" className={`m-0 rounded-2xl p-3 text-sm font-bold ${message.ok ? 'bg-menthe text-menthe-fonce' : 'bg-[#FFE3D8] text-[#9A2A06]'}`}>
              {message.texte}
            </p>
          )}
          <button type="submit" className="h-[52px] cursor-pointer rounded-full border-0 bg-bleu font-extrabold text-white">
            Enregistrer
          </button>
        </form>
      )}
    </div>
  )
}

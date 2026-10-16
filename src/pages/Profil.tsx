import { Link, Navigate } from 'react-router-dom'
import { calculerSerie, useSession } from '../context/Session'

export default function Profil() {
  const { utilisateur, pret, estAdmin, leconsTerminees, joursActifs, aAccesComplet, joursRestants, typeAcces, accesJusquau, paiementEnAttente, deconnecter } = useSession()
  if (!pret) return <p className="mt-10 text-center font-bold text-gris">Chargement…</p>
  if (!utilisateur) return <Navigate to="/connexion?mode=connexion&retour=/profil" replace />

  const stats = [
    { valeur: leconsTerminees.length, libelle: 'leçons terminées' },
    { valeur: calculerSerie(joursActifs), libelle: 'jours de série' },
    { valeur: joursActifs.length, libelle: 'jours actifs' },
  ]
  const fin = accesJusquau ? new Date(accesJusquau).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null

  return (
    <div className="mx-auto mt-4 flex max-w-3xl flex-col gap-5">
      <section className="flex flex-wrap items-center gap-5 rounded-[32px] border border-ligne bg-white p-7">
        <span className="grid size-16 place-items-center rounded-full bg-menthe font-display text-2xl font-bold text-menthe-fonce">
          {utilisateur.prenom.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="m-0 font-display text-2xl font-bold">{`${utilisateur.prenom} ${utilisateur.nom ?? ''}`.trim()}</h1>
          <p className="m-0 font-semibold text-gris">{utilisateur.email || 'Aucun e-mail renseigné'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {estAdmin && (
            <Link to="/admin" className="flex h-11 items-center rounded-full bg-encre px-5 font-bold text-white no-underline">
              Espace admin
            </Link>
          )}
          <button type="button" onClick={deconnecter} className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-5 font-bold">
            Se déconnecter
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.libelle} className="rounded-[28px] border border-ligne bg-white p-6">
            <p className="m-0 font-display text-4xl font-extrabold">{s.valeur}</p>
            <p className="m-0 text-sm font-bold text-gris">{s.libelle}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] bg-jaune p-7">
        <div>
          <h2 className="m-0 font-display text-lg font-bold">Mon abonnement</h2>
          <p className="m-0 font-semibold text-[#3D3415]">
            {aAccesComplet
              ? `${typeAcces === 'premium' ? 'Premium' : 'Essai gratuit'} : encore ${joursRestants} jour${joursRestants > 1 ? 's' : ''} (jusqu'au ${fin})`
              : 'Compte gratuit'}
          </p>
          {paiementEnAttente && <p className="m-0 mt-1 text-sm font-bold text-[#3D3415]">Un paiement est en cours de vérification.</p>}
        </div>
        <Link to="/abonnement" className="flex h-12 items-center rounded-full bg-encre px-6 font-extrabold text-white no-underline">
          {aAccesComplet ? 'Prolonger' : 'Passer Premium'}
        </Link>
      </section>

    </div>
  )
}

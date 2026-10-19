import { lazy, Suspense, useEffect, useState } from 'react'
import { useSession } from '../context/Session'
import { supabase } from '../lib/supabase'
import Introuvable from './Introuvable'

/*
 * L'espace administrateur est INVISIBLE pour les étudiants :
 *  - /admin et /diagnostic affichent « page introuvable », comme si elles n'existaient pas ;
 *  - leur code n'est téléchargé que par l'administrateur (chargement à la demande).
 * La vraie protection reste celle du serveur (règles de la base de données).
 */
const Admin = lazy(() => import('./Admin'))
const Diagnostic = lazy(() => import('./Diagnostic'))

const Chargement = () => <p className="mt-10 text-center font-bold text-gris">Chargement…</p>

export function PageAdmin() {
  const { pret, estAdmin } = useSession()
  if (!pret) return <Chargement />
  if (!estAdmin) return <Introuvable />
  return (
    <Suspense fallback={<Chargement />}>
      <Admin />
    </Suspense>
  )
}

// /diagnostic : pour l'administrateur, ou pendant l'installation (tant qu'aucun admin n'existe)
export function PageDiagnostic() {
  const { pret, estAdmin, modeServeur } = useSession()
  const [installation, setInstallation] = useState<boolean | null>(null)

  useEffect(() => {
    if (!supabase || estAdmin) return
    supabase.rpc('admin_existe').then(({ data, error }) => setInstallation(!!error || data !== true))
  }, [estAdmin])

  if (!pret || (modeServeur && !estAdmin && installation === null)) return <Chargement />
  if (!estAdmin && modeServeur && !installation) return <Introuvable />
  return (
    <Suspense fallback={<Chargement />}>
      <Diagnostic />
    </Suspense>
  )
}

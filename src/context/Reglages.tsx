import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CONFIG } from '../config'
import { supabase } from '../lib/supabase'
import { ecrire, lire } from '../lib/stockage'
import type { MoyenEtudiant, Resultat } from '../lib/paiement'

/*
 * Réglages affichés sur le site (numéros de paiement, nom du bénéficiaire, WhatsApp…).
 * L'administrateur les modifie dans son espace (onglet Réglages) : ils sont enregistrés
 * dans la table « reglages_publics » et s'appliquent tout de suite, sans remise en ligne.
 * Une valeur vide reprend celle du fichier .env / des variables Netlify.
 */

export const CLES_REGLAGES = ['numero_wave', 'numero_orange', 'numero_mtn', 'numero_moov', 'numero_djamo', 'nom_beneficiaire', 'whatsapp', 'lien_wave'] as const
export type CleReglage = (typeof CLES_REGLAGES)[number]
export type ValeursReglages = Record<CleReglage, string>

const CLE_DEMO = 'idacademy:demo-reglages'

// Valeurs par défaut : celles du fichier .env / des variables Netlify
const PAR_DEFAUT: ValeursReglages = {
  numero_wave: CONFIG.numeros.wave ?? '',
  numero_orange: CONFIG.numeros.orange_money ?? '',
  numero_mtn: CONFIG.numeros.mtn_momo ?? '',
  numero_moov: CONFIG.numeros.moov_money ?? '',
  numero_djamo: CONFIG.numeros.djamo ?? '',
  nom_beneficiaire: CONFIG.beneficiaire,
  whatsapp: CONFIG.whatsapp ?? '',
  lien_wave: CONFIG.lienWave ?? '',
}

const fusionner = (base: ValeursReglages, ajout: Partial<ValeursReglages>): ValeursReglages => {
  const r = { ...base }
  for (const cle of CLES_REGLAGES) if (ajout[cle]?.trim()) r[cle] = ajout[cle]!.trim()
  return r
}

interface ReglagesApi {
  valeurs: ValeursReglages // valeurs effectivement utilisées sur le site
  enregistrees: Partial<ValeursReglages> // valeurs saisies par l'admin (sans les valeurs par défaut)
  numeros: Record<MoyenEtudiant, string>
  lienWhatsapp: (message: string) => string
  enregistrer: (nouvelles: Partial<ValeursReglages>) => Promise<Resultat>
}

const ReglagesContext = createContext<ReglagesApi | null>(null)

export function ReglagesProvider({ children }: { children: ReactNode }) {
  const [enregistrees, setEnregistrees] = useState<Partial<ValeursReglages>>(() => (supabase ? {} : lire(CLE_DEMO, {})))

  const charger = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('reglages_publics').select('cle, valeur')
    if (data) setEnregistrees(Object.fromEntries(data.map((l) => [l.cle, l.valeur])) as Partial<ValeursReglages>)
  }, [])

  useEffect(() => {
    charger()
  }, [charger])

  const enregistrer = useCallback(
    async (nouvelles: Partial<ValeursReglages>): Promise<Resultat> => {
      const nettoyees = Object.fromEntries(Object.entries(nouvelles).map(([k, v]) => [k, (v ?? '').trim()])) as Partial<ValeursReglages>
      if (!supabase) {
        const total = { ...enregistrees, ...nettoyees }
        ecrire(CLE_DEMO, total)
        setEnregistrees(total)
        return { ok: true, message: 'Réglages enregistrés (démo).' }
      }
      for (const [cle, valeur] of Object.entries(nettoyees)) {
        const { error } = await supabase.from('reglages_publics').update({ valeur }).eq('cle', cle)
        if (error) return { ok: false, message: `Erreur : ${error.message}` }
      }
      await charger()
      return { ok: true, message: 'Réglages enregistrés : ils sont déjà visibles sur le site.' }
    },
    [enregistrees, charger],
  )

  const api = useMemo<ReglagesApi>(() => {
    const valeurs = fusionner(PAR_DEFAUT, enregistrees)
    return {
      valeurs,
      enregistrees,
      numeros: {
        wave: valeurs.numero_wave,
        orange_money: valeurs.numero_orange,
        mtn_momo: valeurs.numero_mtn,
        moov_money: valeurs.numero_moov,
        djamo: valeurs.numero_djamo,
      },
      lienWhatsapp: (message: string) => `https://wa.me/${valeurs.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      enregistrer,
    }
  }, [enregistrees, enregistrer])

  return <ReglagesContext.Provider value={api}>{children}</ReglagesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReglages() {
  const ctx = useContext(ReglagesContext)
  if (!ctx) throw new Error('useReglages doit être utilisé dans <ReglagesProvider>')
  return ctx
}

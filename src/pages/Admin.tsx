import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../context/Session'
import { supabase } from '../lib/supabase'
import { formaterPrix } from '../lib/affichage'
import { FORMULES, MOYENS_ETUDIANT, MOYENS, type Formule, type Paiement, type StatutPaiement } from '../lib/paiement'
import { ListePaiements } from '../components/ListePaiements'

/*
 * Espace administrateur : SEUL endroit où les paiements sont visibles.
 *  - Paiements : vérifier, valider ou refuser ceux que les étudiants ont déclarés.
 *  - Étudiants : rechercher un compte, voir son accès, ajouter des jours (espèces, offert).
 * La sécurité est assurée par le serveur (règles RLS + fonctions réservées au rôle admin).
 */

interface Stats {
  inscrits: number
  abonnes_actifs: number
  essais_actifs: number
  en_attente: number
  recette_mois: number
}

interface Etudiant {
  id: string
  prenom: string
  email: string | null
  telephone: string | null
  role: 'etudiant' | 'admin'
  acces_jusquau: string | null
  type_acces: 'essai' | 'premium' | null
  cree_le: string | null
}

const ONGLETS: { statut: StatutPaiement; nom: string }[] = [
  { statut: 'en_attente', nom: 'À vérifier' },
  { statut: 'valide', nom: 'Validés' },
  { statut: 'refuse', nom: 'Refusés' },
]

const MOTIFS = ['Référence introuvable', 'Montant incorrect', 'Paiement non reçu']
const SELECT_PAIEMENT = '*, profils!paiements_user_id_fkey(prenom, email, telephone)'
const dateCourte = (d: string | number) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Admin() {
  const { pret, estAdmin, modeServeur } = useSession()
  const [vue, setVue] = useState<'paiements' | 'etudiants'>('paiements')
  const [stats, setStats] = useState<Stats | null>(null)

  const chargerStats = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.rpc('statistiques_admin')
    setStats(data as Stats | null)
  }, [])

  useEffect(() => {
    if (modeServeur && estAdmin) chargerStats()
  }, [modeServeur, estAdmin, chargerStats, vue])

  if (!pret) return <p className="mt-10 text-center font-bold text-gris">Chargement…</p>
  if (!estAdmin)
    return (
      <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-4 rounded-[32px] border border-ligne bg-white p-10 text-center">
        <h1 className="m-0 font-display text-2xl font-bold">Accès réservé</h1>
        <p className="m-0 font-semibold text-gris">Cette page est réservée à l'administrateur d'IDAcademy.</p>
        {!modeServeur && (
          <p className="m-0 rounded-2xl bg-jaune p-3 text-sm font-bold">
            Mode démo : connecte-toi avec une adresse qui commence par « admin » (ex. admin@idacademy.ci) pour voir l'espace administrateur.
          </p>
        )}
        <Link to="/" className="flex h-12 items-center rounded-full bg-bleu px-6 font-extrabold text-white no-underline">
          Retour à l'accueil
        </Link>
      </div>
    )

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[13px] font-bold text-gris">Espace administrateur</p>
          <h1 className="m-0 font-display text-3xl font-bold">{vue === 'paiements' ? 'Paiements' : 'Étudiants'}</h1>
        </div>
        <div role="tablist" aria-label="Rubrique" className="flex gap-1 rounded-full border border-ligne bg-white p-1">
          {(['paiements', 'etudiants'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={vue === v}
              onClick={() => setVue(v)}
              className={`h-10 cursor-pointer rounded-full border-0 px-5 text-sm font-extrabold ${vue === v ? 'bg-encre text-white' : 'bg-transparent text-gris'}`}
            >
              {v === 'paiements' ? 'Paiements' : 'Étudiants'}
            </button>
          ))}
        </div>
      </header>

      {!modeServeur && (
        <p className="m-0 rounded-2xl bg-jaune p-3.5 text-sm font-bold">
          Mode démo : les comptes et paiements créés dans ce navigateur. En production, seul ton compte administrateur voit cette page.
        </p>
      )}

      <Statistiques stats={stats} />

      {vue === 'paiements' ? <OngletPaiements apresAction={chargerStats} /> : <OngletEtudiants apresAction={chargerStats} />}
    </div>
  )
}

// ——— Chiffres du tableau de bord
function Statistiques({ stats }: { stats: Stats | null }) {
  const { demo } = useSession()
  const maintenant = Date.now()
  const s: Stats | null = demo
    ? {
        inscrits: demo.comptes.filter((c) => c.utilisateur.role !== 'admin').length,
        abonnes_actifs: demo.comptes.filter((c) => c.typeAcces === 'premium' && (c.accesJusquau ?? 0) > maintenant).length,
        essais_actifs: demo.comptes.filter((c) => c.typeAcces === 'essai' && (c.accesJusquau ?? 0) > maintenant).length,
        en_attente: demo.paiements.filter((p) => p.statut === 'en_attente').length,
        recette_mois: demo.paiements.filter((p) => p.statut === 'valide' && p.cree_le.slice(0, 7) === new Date().toISOString().slice(0, 7)).reduce((t, p) => t + p.montant, 0),
      }
    : stats
  if (!s) return null
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {[
        { v: s.en_attente, l: 'à vérifier', c: 'bg-jaune' },
        { v: s.abonnes_actifs, l: 'abonnés actifs', c: 'bg-bleu text-white' },
        { v: s.essais_actifs, l: 'essais en cours', c: 'bg-white border border-ligne' },
        { v: s.inscrits, l: 'inscrits', c: 'bg-white border border-ligne' },
        { v: formaterPrix(s.recette_mois), l: 'encaissés ce mois', c: 'bg-menthe text-menthe-fonce' },
      ].map((x) => (
        <div key={x.l} className={`rounded-[24px] p-5 ${x.c}`}>
          <p className="m-0 font-display text-3xl font-extrabold">{x.v}</p>
          <p className="m-0 text-sm font-bold opacity-80">{x.l}</p>
        </div>
      ))}
    </section>
  )
}

// ——— Onglet Paiements
function OngletPaiements({ apresAction }: { apresAction: () => void }) {
  const { demo } = useSession()
  const [statut, setStatut] = useState<StatutPaiement>('en_attente')
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [recherche, setRecherche] = useState('')
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const [refus, setRefus] = useState<{ id: string; motif: string } | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const charger = useCallback(async () => {
    if (!supabase) return
    let requete = supabase.from('paiements').select(SELECT_PAIEMENT).eq('statut', statut).order('cree_le', { ascending: statut === 'en_attente' }).limit(100)
    // Les paiements Djamo automatiques en cours (sans référence) sont confirmés par Djamo, pas à la main
    if (statut === 'en_attente') requete = requete.not('reference', 'is', null)
    const { data, error } = await requete
    if (error) setMessage(`Erreur : ${error.message}`)
    setPaiements((data ?? []) as Paiement[])
  }, [statut])

  useEffect(() => {
    charger()
    if (!supabase) return
    const t = setInterval(charger, 60_000) // rafraîchissement automatique
    return () => clearInterval(t)
  }, [charger])

  const liste = useMemo(() => {
    const source = demo ? demo.paiements.filter((p) => p.statut === statut && (statut !== 'en_attente' || p.reference)) : paiements
    const r = recherche.trim().toUpperCase()
    return r ? source.filter((p) => p.reference?.includes(r) || p.profils?.email?.toUpperCase().includes(r) || p.numero_payeur?.includes(r)) : source
  }, [demo, paiements, statut, recherche])

  const traiter = async (p: Paiement, valider: boolean, motif?: string) => {
    setConfirmation(null)
    setRefus(null)
    if (demo) {
      demo.traiterPaiement(p.id, valider, motif)
      setMessage(valider ? 'Paiement validé : l\'accès de l\'étudiant est activé.' : 'Paiement refusé.')
      return
    }
    if (!supabase) return
    const { data, error } = valider ? await supabase.rpc('valider_paiement', { p_id: p.id }) : await supabase.rpc('refuser_paiement', { p_id: p.id, p_motif: motif ?? '' })
    setMessage(error ? `Erreur : ${error.message}` : ((data as { message: string })?.message ?? 'Fait.'))
    charger()
    apresAction()
  }

  const actions = (p: Paiement) => {
    if (p.statut !== 'en_attente') return null
    if (refus?.id === p.id)
      return (
        <div className="flex w-full flex-wrap items-center gap-2">
          {MOTIFS.map((m) => (
            <button key={m} type="button" onClick={() => setRefus({ id: p.id, motif: m })} className={`h-9 cursor-pointer rounded-full border px-3 text-xs font-bold ${refus.motif === m ? 'border-encre bg-encre text-white' : 'border-ligne bg-white'}`}>
              {m}
            </button>
          ))}
          <button type="button" onClick={() => traiter(p, false, refus.motif)} className="h-9 cursor-pointer rounded-full border-0 bg-corail px-4 text-xs font-extrabold">
            Confirmer le refus
          </button>
          <button type="button" onClick={() => setRefus(null)} className="h-9 cursor-pointer rounded-full border border-ligne bg-white px-3 text-xs font-bold">
            Annuler
          </button>
        </div>
      )
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => (confirmation === p.id ? traiter(p, true) : setConfirmation(p.id))}
          className={`h-10 cursor-pointer rounded-full border-0 px-4 text-sm font-extrabold ${confirmation === p.id ? 'bg-encre text-white' : 'bg-menthe text-menthe-fonce'}`}
        >
          {confirmation === p.id ? 'Confirmer ?' : 'Valider'}
        </button>
        <button type="button" onClick={() => setRefus({ id: p.id, motif: MOTIFS[0] })} className="h-10 cursor-pointer rounded-full border border-ligne bg-white px-4 text-sm font-bold">
          Refuser
        </button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4 rounded-[32px] border border-ligne bg-fond p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Statut" className="flex gap-1 rounded-full bg-white p-1">
          {ONGLETS.map((o) => (
            <button
              key={o.statut}
              type="button"
              role="tab"
              aria-selected={statut === o.statut}
              onClick={() => setStatut(o.statut)}
              className={`h-10 cursor-pointer rounded-full border-0 px-4 text-sm font-extrabold ${statut === o.statut ? 'bg-bleu text-white' : 'bg-transparent text-gris'}`}
            >
              {o.nom}
            </button>
          ))}
        </div>
        <input
          type="search"
          aria-label="Rechercher une référence, un e-mail ou un numéro"
          placeholder="Référence, e-mail ou numéro…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="h-11 min-w-0 flex-[1_1_220px] rounded-full border border-ligne bg-white px-4 text-sm"
        />
        {!demo && (
          <button type="button" onClick={charger} className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-5 text-sm font-bold">
            Actualiser
          </button>
        )}
      </div>

      {message && (
        <p role="status" className="m-0 rounded-2xl bg-white p-3 text-sm font-bold">
          {message}
        </p>
      )}

      {statut === 'en_attente' && liste.length > 0 && (
        <p className="m-0 text-sm font-semibold text-gris">
          Pour chaque paiement, ouvre ton application ({MOYENS_ETUDIANT.map((m) => MOYENS[m].nom).join(', ')}) et vérifie le montant et la référence avant de valider.
        </p>
      )}

      {liste.length ? (
        <ListePaiements paiements={liste} actions={actions} />
      ) : (
        <p className="m-0 py-6 text-center font-bold text-gris">Aucun paiement {ONGLETS.find((o) => o.statut === statut)?.nom.toLowerCase()}.</p>
      )}
    </section>
  )
}

// ——— Onglet Étudiants
function OngletEtudiants({ apresAction }: { apresAction: () => void }) {
  const { demo } = useSession()
  const [etudiants, setEtudiants] = useState<Etudiant[]>([])
  const [recherche, setRecherche] = useState('')
  const [ouvert, setOuvert] = useState<{ id: string; mode: 'acces' | 'historique' } | null>(null)
  const [historique, setHistorique] = useState<Paiement[]>([])
  const [formule, setFormule] = useState<Formule>('mensuel')
  const [moyen, setMoyen] = useState<'especes' | 'offert'>('especes')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const charger = useCallback(async () => {
    if (!supabase) return
    let requete = supabase.from('profils').select('id, prenom, email, telephone, role, acces_jusquau, type_acces, cree_le').order('cree_le', { ascending: false }).limit(50)
    const r = recherche.trim().replace(/[,()%*]/g, '')
    if (r) requete = requete.or(`email.ilike.%${r}%,prenom.ilike.%${r}%,telephone.ilike.%${r}%`)
    const { data, error } = await requete
    if (error) setMessage(`Erreur : ${error.message}`)
    setEtudiants((data ?? []) as Etudiant[])
  }, [recherche])

  useEffect(() => {
    if (!supabase) return
    const t = setTimeout(charger, 300) // petite attente pendant la frappe
    return () => clearTimeout(t)
  }, [charger])

  const liste: Etudiant[] = useMemo(() => {
    if (!demo) return etudiants
    const r = recherche.trim().toLowerCase()
    return demo.comptes
      .map((c) => ({
        id: c.utilisateur.email,
        prenom: c.utilisateur.prenom,
        email: c.utilisateur.email,
        telephone: null,
        role: c.utilisateur.role,
        acces_jusquau: c.accesJusquau ? new Date(c.accesJusquau).toISOString() : null,
        type_acces: c.typeAcces,
        cree_le: null,
      }))
      .filter((e) => !r || e.email.includes(r) || e.prenom.toLowerCase().includes(r))
  }, [demo, etudiants, recherche])

  const ouvrirHistorique = async (e: Etudiant) => {
    setMessage(null)
    if (ouvert?.id === e.id && ouvert.mode === 'historique') return setOuvert(null)
    setOuvert({ id: e.id, mode: 'historique' })
    if (demo) return setHistorique(demo.paiements.filter((p) => p.profils?.email === e.email))
    const { data } = await supabase!.from('paiements').select(SELECT_PAIEMENT).eq('user_id', e.id).order('cree_le', { ascending: false }).limit(30)
    setHistorique((data ?? []) as Paiement[])
  }

  const accorder = async (e: Etudiant) => {
    if (demo) {
      const r = demo.accorderAcces(e.email!, formule, moyen, note)
      setMessage(r.message)
    } else {
      const { data, error } = await supabase!.rpc('enregistrer_paiement_admin', { p_user: e.id, p_formule: formule, p_moyen: moyen, p_note: note })
      setMessage(error ? `Erreur : ${error.message}` : (data as { ok: boolean; message: string }).ok ? `Accès ajouté à ${e.prenom || e.email}.` : (data as { message: string }).message)
      charger()
      apresAction()
    }
    setOuvert(null)
    setNote('')
  }

  const statutAcces = (e: Etudiant) => {
    const actif = e.acces_jusquau && new Date(e.acces_jusquau).getTime() > Date.now()
    if (!actif) return { texte: 'Gratuit', classe: 'bg-creme text-gris' }
    return e.type_acces === 'premium'
      ? { texte: `Premium jusqu'au ${dateCourte(e.acces_jusquau!)}`, classe: 'bg-bleu text-white' }
      : { texte: `Essai jusqu'au ${dateCourte(e.acces_jusquau!)}`, classe: 'bg-jaune text-encre' }
  }

  return (
    <section className="flex flex-col gap-4 rounded-[32px] border border-ligne bg-fond p-5 sm:p-6">
      <input
        type="search"
        aria-label="Rechercher un étudiant"
        placeholder="Rechercher par prénom, e-mail ou téléphone…"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="h-11 rounded-full border border-ligne bg-white px-4 text-sm"
      />
      {message && (
        <p role="status" className="m-0 rounded-2xl bg-white p-3 text-sm font-bold">
          {message}
        </p>
      )}
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {liste.map((e) => {
          const s = statutAcces(e)
          return (
            <li key={e.id} className="flex flex-col gap-3 rounded-2xl border border-ligne bg-white px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex min-w-0 flex-[1_1_220px] flex-col">
                  <span className="font-bold">
                    {e.prenom || 'Sans prénom'} {e.role === 'admin' && <span className="ml-1 rounded-full bg-encre px-2 py-0.5 text-[11px] font-extrabold text-white">admin</span>}
                  </span>
                  <span className="text-sm font-semibold text-gris">
                    {e.email}
                    {e.telephone && ` · ${e.telephone}`}
                    {e.cree_le && ` · inscrit le ${dateCourte(e.cree_le)}`}
                  </span>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${s.classe}`}>{s.texte}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setOuvert(ouvert?.id === e.id && ouvert.mode === 'acces' ? null : { id: e.id, mode: 'acces' })} className="h-10 cursor-pointer rounded-full border-0 bg-menthe px-4 text-sm font-extrabold text-menthe-fonce">
                    Ajouter un accès
                  </button>
                  <button type="button" onClick={() => ouvrirHistorique(e)} className="h-10 cursor-pointer rounded-full border border-ligne bg-white px-4 text-sm font-bold">
                    Historique
                  </button>
                </div>
              </div>

              {ouvert?.id === e.id && ouvert.mode === 'acces' && (
                <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-fond p-4">
                  <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                    Formule
                    <select value={formule} onChange={(ev) => setFormule(ev.target.value as Formule)} className="h-10 rounded-full border border-ligne bg-white px-3 text-sm font-bold text-encre">
                      {(['mensuel', 'trimestre'] as const).map((f) => (
                        <option key={f} value={f}>
                          {FORMULES[f].nom} ({FORMULES[f].jours} jours)
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                    Type
                    <select value={moyen} onChange={(ev) => setMoyen(ev.target.value as 'especes' | 'offert')} className="h-10 rounded-full border border-ligne bg-white px-3 text-sm font-bold text-encre">
                      <option value="especes">Payé en espèces</option>
                      <option value="offert">Offert (0 F)</option>
                    </select>
                  </label>
                  <label className="flex min-w-0 flex-[1_1_180px] flex-col gap-1 text-xs font-bold text-gris">
                    Note (facultatif)
                    <input value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="Ex. payé en classe le 15/10" className="h-10 rounded-full border border-ligne bg-white px-3 text-sm text-encre" />
                  </label>
                  <button type="button" onClick={() => accorder(e)} className="h-10 cursor-pointer rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white">
                    Enregistrer
                  </button>
                </div>
              )}

              {ouvert?.id === e.id && ouvert.mode === 'historique' &&
                (historique.length ? <ListePaiements paiements={historique} /> : <p className="m-0 text-sm font-semibold text-gris">Aucun paiement pour ce compte.</p>)}
            </li>
          )
        })}
        {liste.length === 0 && <p className="m-0 py-6 text-center font-bold text-gris">Aucun étudiant trouvé.</p>}
      </ul>
    </section>
  )
}

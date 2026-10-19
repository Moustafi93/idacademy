import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../context/Session'
import { supabase } from '../lib/supabase'
import { formaterPrix } from '../lib/affichage'
import { CLE_PARAMETRES_DEMO, CLE_TARIFS_DEMO, MOYENS_ETUDIANT, MOYENS, parametresDemo, type Formule, type Paiement, type StatutPaiement } from '../lib/paiement'
import { useTarifs } from '../lib/useTarifs'
import { CLES_REGLAGES, useReglages, type CleReglage, type ValeursReglages } from '../context/Reglages'
import { ecrire } from '../lib/stockage'
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
  nom?: string | null
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

type Vue = 'paiements' | 'etudiants' | 'reglages'
const NOMS_VUES: Record<Vue, string> = { paiements: 'Paiements', etudiants: 'Étudiants', reglages: 'Réglages' }
const SELECT_PAIEMENT = '*, profils!paiements_user_id_fkey(*)'
const dateCourte = (d: string | number) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Admin() {
  const { pret, estAdmin, modeServeur } = useSession()
  const [vue, setVue] = useState<Vue>('paiements')
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
  if (!estAdmin) return null // jamais affiché : la page est protégée par ZoneAdmin

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[13px] font-bold text-gris">
            Espace administrateur · <Link to="/diagnostic">Diagnostic du site</Link>
          </p>
          <h1 className="m-0 font-display text-3xl font-bold">{NOMS_VUES[vue]}</h1>
        </div>
        <div role="tablist" aria-label="Rubrique" className="flex gap-1 rounded-full border border-ligne bg-white p-1">
          {(Object.keys(NOMS_VUES) as Vue[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={vue === v}
              onClick={() => setVue(v)}
              className={`h-10 cursor-pointer rounded-full border-0 px-5 text-sm font-extrabold ${vue === v ? 'bg-encre text-white' : 'bg-transparent text-gris'}`}
            >
              {NOMS_VUES[v]}
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

      {vue === 'paiements' && <OngletPaiements apresAction={chargerStats} />}
      {vue === 'etudiants' && <OngletEtudiants apresAction={chargerStats} />}
      {vue === 'reglages' && <OngletReglages />}
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
  const tarifs = useTarifs()
  const { demo } = useSession()
  const [etudiants, setEtudiants] = useState<Etudiant[]>([])
  const [recherche, setRecherche] = useState('')
  const [ouvert, setOuvert] = useState<{ id: string; mode: 'acces' | 'historique' | 'modifier' } | null>(null)
  const [historique, setHistorique] = useState<Paiement[]>([])
  const [formule, setFormule] = useState<Formule>('mensuel')
  const [moyen, setMoyen] = useState<'especes' | 'offert'>('especes')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const charger = useCallback(async () => {
    if (!supabase) return
    let requete = supabase.from('profils').select('*').order('cree_le', { ascending: false }).limit(50)
    const r = recherche.trim().replace(/[,()%*]/g, '')
    if (r) requete = requete.or(`email.ilike.%${r}%,prenom.ilike.%${r}%,nom.ilike.%${r}%,telephone.ilike.%${r}%`)
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
        nom: c.utilisateur.nom,
        email: c.utilisateur.email,
        telephone: null,
        role: c.utilisateur.role,
        acces_jusquau: c.accesJusquau ? new Date(c.accesJusquau).toISOString() : null,
        type_acces: c.typeAcces,
        cree_le: null,
      }))
      .filter((e) => !r || e.email.includes(r) || `${e.prenom} ${e.nom ?? ''}`.toLowerCase().includes(r))
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
      setMessage(error ? `Erreur : ${error.message}` : (data as { ok: boolean; message: string }).ok ? `Accès ajouté à ${`${e.prenom} ${e.nom ?? ''}`.trim() || e.email}.` : (data as { message: string }).message)
      charger()
      apresAction()
    }
    setOuvert(null)
    setNote('')
  }

  const statutAcces = (e: Etudiant) => {
    if (e.role === 'admin') return { texte: 'Administrateur · accès complet', classe: 'bg-encre text-white' }
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
        placeholder="Rechercher par nom, prénom, e-mail ou téléphone…"
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
                    {`${e.prenom} ${e.nom ?? ''}`.trim() || 'Sans nom'} {e.role === 'admin' && <span className="ml-1 rounded-full bg-encre px-2 py-0.5 text-[11px] font-extrabold text-white">admin</span>}
                  </span>
                  <span className="text-sm font-semibold text-gris">
                    {e.email}
                    {e.telephone && ` · ${e.telephone}`}
                    {e.cree_le && ` · inscrit le ${dateCourte(e.cree_le)}`}
                  </span>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${s.classe}`}>{s.texte}</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setOuvert(ouvert?.id === e.id && ouvert.mode === 'modifier' ? null : { id: e.id, mode: 'modifier' })} className="h-10 cursor-pointer rounded-full border-0 bg-encre px-4 text-sm font-extrabold text-white">
                    Modifier
                  </button>
                  <button type="button" onClick={() => setOuvert(ouvert?.id === e.id && ouvert.mode === 'acces' ? null : { id: e.id, mode: 'acces' })} className="h-10 cursor-pointer rounded-full border-0 bg-menthe px-4 text-sm font-extrabold text-menthe-fonce">
                    Ajouter un accès
                  </button>
                  <button type="button" onClick={() => ouvrirHistorique(e)} className="h-10 cursor-pointer rounded-full border border-ligne bg-white px-4 text-sm font-bold">
                    Historique
                  </button>
                </div>
              </div>

              {ouvert?.id === e.id && ouvert.mode === 'modifier' && (
                <FormulaireEtudiant
                  etudiant={e}
                  onFini={(texte) => {
                    setMessage(texte)
                    setOuvert(null)
                    charger()
                    apresAction()
                  }}
                />
              )}

              {ouvert?.id === e.id && ouvert.mode === 'acces' && (
                <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-fond p-4">
                  <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                    Formule
                    <select value={formule} onChange={(ev) => setFormule(ev.target.value as Formule)} className="h-10 rounded-full border border-ligne bg-white px-3 text-sm font-bold text-encre">
                      {(['mensuel', 'trimestre'] as const).map((f) => (
                        <option key={f} value={f}>
                          {tarifs[f].nom} ({tarifs[f].jours} jours)
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

// ——— Formulaire « Modifier » d'un étudiant
const dateVersChamp = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('sv-SE') : '') // AAAA-MM-JJ, heure locale
const champVersDate = (jour: string) => (jour ? new Date(`${jour}T23:59:59`).toISOString() : null)
const champ = 'h-10 rounded-full border border-ligne bg-white px-3 text-sm text-encre'

function FormulaireEtudiant({ etudiant: e, onFini }: { etudiant: Etudiant; onFini: (message: string) => void }) {
  const { demo, utilisateur } = useSession()
  const [prenom, setPrenom] = useState(e.prenom ?? '')
  const [nom, setNom] = useState(e.nom ?? '')
  const [telephone, setTelephone] = useState(e.telephone ?? '')
  const [role, setRole] = useState(e.role)
  const actif = !!e.acces_jusquau && new Date(e.acces_jusquau).getTime() > Date.now()
  const [typeAcces, setTypeAcces] = useState<'aucun' | 'essai' | 'premium'>(actif ? (e.type_acces ?? 'premium') : 'aucun')
  const [jusquau, setJusquau] = useState(actif ? dateVersChamp(e.acces_jusquau) : '')
  const [erreur, setErreur] = useState<string | null>(null)
  const estMoi = utilisateur?.email === e.email

  const enregistrer = async () => {
    setErreur(null)
    if (typeAcces !== 'aucun' && !jusquau) return setErreur("Choisis la date de fin d'accès.")
    const fin = typeAcces === 'aucun' ? null : champVersDate(jusquau)
    const type = typeAcces === 'aucun' ? null : typeAcces
    if (demo) {
      const r = demo.modifierCompte(e.email!, { prenom, nom, telephone, role, accesJusquau: fin ? new Date(fin).getTime() : null, typeAcces: type })
      return r.ok ? onFini(r.message) : setErreur(r.message)
    }
    const { data, error } = await supabase!.rpc('admin_modifier_etudiant', {
      p_user: e.id,
      p_prenom: prenom,
      p_nom: nom,
      p_telephone: telephone,
      p_acces_jusquau: fin,
      p_type_acces: type,
      p_role: role,
    })
    const r = data as { ok: boolean; message: string } | null
    if (error || !r?.ok) return setErreur(error?.message ?? r?.message ?? 'Erreur.')
    onFini(`${r.message} (${`${prenom} ${nom}`.trim() || e.email})`)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-fond p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Prénom
          <input value={prenom} onChange={(ev) => setPrenom(ev.target.value)} className={champ} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Nom
          <input value={nom} onChange={(ev) => setNom(ev.target.value)} className={champ} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Téléphone
          <input type="tel" value={telephone} onChange={(ev) => setTelephone(ev.target.value)} className={champ} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Accès
          <select value={typeAcces} onChange={(ev) => setTypeAcces(ev.target.value as 'aucun' | 'essai' | 'premium')} className={`${champ} font-bold`}>
            <option value="aucun">Gratuit (aucun accès premium)</option>
            <option value="premium">Premium</option>
            <option value="essai">Essai</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Jusqu'au (inclus)
          <input type="date" value={jusquau} disabled={typeAcces === 'aucun'} onChange={(ev) => setJusquau(ev.target.value)} className={`${champ} disabled:opacity-50`} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gris">
          Rôle
          <select value={role} disabled={estMoi} onChange={(ev) => setRole(ev.target.value as 'etudiant' | 'admin')} className={`${champ} font-bold disabled:opacity-50`}>
            <option value="etudiant">Étudiant</option>
            <option value="admin">Administrateur</option>
          </select>
        </label>
      </div>
      {role === 'admin' && !estMoi && e.role !== 'admin' && (
        <p className="m-0 text-xs font-bold text-[#9A2A06]">Attention : un administrateur voit tous les paiements et peut tout modifier.</p>
      )}
      {erreur && <p className="m-0 text-sm font-bold text-[#9A2A06]">{erreur}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={enregistrer} className="h-10 cursor-pointer rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white">
          Enregistrer
        </button>
        {typeAcces !== 'aucun' && (
          <button type="button" onClick={() => setTypeAcces('aucun')} className="h-10 cursor-pointer rounded-full border border-ligne bg-white px-4 text-sm font-bold">
            Retirer l'accès
          </button>
        )}
      </div>
    </div>
  )
}

// ——— Onglet Réglages : tarifs, essai, paiement et contact
function Carte({ titre, description, children }: { titre: string; description: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-[28px] border border-ligne bg-white p-5 sm:p-6">
      <div>
        <h2 className="m-0 font-display text-lg font-bold">{titre}</h2>
        <p className="m-0 text-sm font-semibold text-gris">{description}</p>
      </div>
      {children}
    </section>
  )
}

const LIBELLES_REGLAGES: Record<CleReglage, { libelle: string; aide?: string; type?: string }> = {
  numero_wave: { libelle: 'Numéro Wave', type: 'tel' },
  numero_orange: { libelle: 'Numéro Orange Money', type: 'tel' },
  numero_mtn: { libelle: 'Numéro MTN MoMo', type: 'tel' },
  numero_moov: { libelle: 'Numéro Moov Money', type: 'tel' },
  numero_djamo: { libelle: 'Numéro Djamo', type: 'tel' },
  nom_beneficiaire: { libelle: 'Nom du bénéficiaire', aide: 'Exactement comme il apparaît chez Wave ou Orange Money.' },
  whatsapp: { libelle: 'WhatsApp du support', aide: 'Format international sans « + » : 2250700000000', type: 'tel' },
  lien_wave: { libelle: 'Lien de paiement Wave (facultatif)', aide: 'Ex. https://pay.wave.com/m/…', type: 'url' },
}

function OngletReglages() {
  const { demo } = useSession()
  const reglages = useReglages()
  const tarifs = useTarifs()
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null)

  // Tarifs
  const [edition, setEdition] = useState<Record<'mensuel' | 'trimestre', { nom: string; prix: string; jours: string; actif: boolean }> | null>(null)
  useEffect(() => {
    setEdition({
      mensuel: { nom: tarifs.mensuel.nom, prix: String(tarifs.mensuel.prix ?? ''), jours: String(tarifs.mensuel.jours ?? ''), actif: tarifs.mensuel.prix !== null },
      trimestre: { nom: tarifs.trimestre.nom, prix: String(tarifs.trimestre.prix ?? ''), jours: String(tarifs.trimestre.jours ?? ''), actif: tarifs.trimestre.prix !== null },
    })
  }, [tarifs])

  // Essai
  const [essai, setEssai] = useState<{ code_essai: string; jours_essai: string } | null>(null)
  useEffect(() => {
    if (demo) return setEssai(parametresDemo())
    supabase?.rpc('lire_parametres_admin').then(({ data }) => setEssai(data as { code_essai: string; jours_essai: string }))
  }, [demo])

  // Paiement et contact
  const [valeurs, setValeurs] = useState<Partial<ValeursReglages>>(reglages.enregistrees)
  useEffect(() => setValeurs(reglages.enregistrees), [reglages.enregistrees])

  const afficher = (ok: boolean, texte: string) => {
    setMessage({ ok, texte })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const enregistrerTarifs = async () => {
    if (!edition) return
    for (const f of ['mensuel', 'trimestre'] as const) {
      const prix = Number(edition[f].prix)
      const jours = Number(edition[f].jours)
      if (!edition[f].nom.trim() || !Number.isInteger(prix) || prix < 100 || !Number.isInteger(jours) || jours < 1 || jours > 400)
        return afficher(false, `Vérifie la formule « ${edition[f].nom || f} » : prix d'au moins 100 F et durée entre 1 et 400 jours.`)
    }
    if (demo) {
      ecrire(CLE_TARIFS_DEMO, {
        mensuel: { nom: edition.mensuel.nom, prix: edition.mensuel.actif ? Number(edition.mensuel.prix) : null, jours: Number(edition.mensuel.jours) },
        trimestre: { nom: edition.trimestre.nom, prix: edition.trimestre.actif ? Number(edition.trimestre.prix) : null, jours: Number(edition.trimestre.jours) },
      })
      return afficher(true, 'Tarifs enregistrés (démo).')
    }
    for (const f of ['mensuel', 'trimestre'] as const) {
      const { error } = await supabase!
        .from('tarifs')
        .update({ nom: edition[f].nom.trim(), prix: Number(edition[f].prix), jours: Number(edition[f].jours), actif: edition[f].actif })
        .eq('formule', f)
      if (error) return afficher(false, `Erreur : ${error.message}`)
    }
    afficher(true, 'Tarifs enregistrés : les nouveaux prix sont déjà affichés sur la page Abonnement.')
  }

  const enregistrerEssai = async () => {
    if (!essai) return
    if (demo) {
      ecrire(CLE_PARAMETRES_DEMO, { code_essai: essai.code_essai.trim().toUpperCase(), jours_essai: essai.jours_essai.trim() })
      return afficher(true, "Code d'essai enregistré (démo).")
    }
    for (const cle of ['code_essai', 'jours_essai'] as const) {
      const { data, error } = await supabase!.rpc('modifier_parametre', { p_cle: cle, p_valeur: essai[cle] })
      const r = data as { ok: boolean; message: string } | null
      if (error || !r?.ok) return afficher(false, error?.message ?? r?.message ?? 'Erreur.')
    }
    afficher(true, `Code d'essai enregistré : « ${essai.code_essai.trim().toUpperCase()} », ${essai.jours_essai} jours.`)
  }

  const enregistrerReglages = async () => {
    const r = await reglages.enregistrer(Object.fromEntries(CLES_REGLAGES.map((c) => [c, valeurs[c] ?? ''])) as Partial<ValeursReglages>)
    afficher(r.ok, r.message)
  }

  return (
    <div className="flex flex-col gap-4">
      {message && (
        <p role="status" className={`m-0 rounded-2xl p-3.5 text-sm font-bold ${message.ok ? 'bg-menthe text-menthe-fonce' : 'bg-[#FFE3D8] text-[#9A2A06]'}`}>
          {message.texte}
        </p>
      )}

      <Carte titre="Tarifs" description="Les prix et durées des formules. Un changement s'applique aux prochains paiements (pas à ceux déjà validés).">
        {edition && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(['mensuel', 'trimestre'] as const).map((f) => (
              <fieldset key={f} className="m-0 flex flex-col gap-3 rounded-2xl border border-ligne bg-fond p-4">
                <legend className="px-1 text-xs font-extrabold uppercase tracking-wider text-gris">{f === 'mensuel' ? 'Formule mensuelle' : 'Formule 3 mois'}</legend>
                <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                  Nom affiché
                  <input value={edition[f].nom} onChange={(ev) => setEdition({ ...edition, [f]: { ...edition[f], nom: ev.target.value } })} className={champ} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                    Prix (F CFA)
                    <input type="number" min={100} step={100} value={edition[f].prix} onChange={(ev) => setEdition({ ...edition, [f]: { ...edition[f], prix: ev.target.value } })} className={champ} />
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-gris">
                    Durée (jours)
                    <input type="number" min={1} max={400} value={edition[f].jours} onChange={(ev) => setEdition({ ...edition, [f]: { ...edition[f], jours: ev.target.value } })} className={champ} />
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="checkbox" checked={edition[f].actif} onChange={(ev) => setEdition({ ...edition, [f]: { ...edition[f], actif: ev.target.checked } })} className="size-5 accent-bleu" />
                  Proposée aux étudiants
                </label>
              </fieldset>
            ))}
          </div>
        )}
        <button type="button" onClick={enregistrerTarifs} className="h-11 cursor-pointer self-start rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white">
          Enregistrer les tarifs
        </button>
      </Carte>

      <Carte titre="Essai gratuit" description="Le code que les étudiants saisissent sur la page Abonnement. Chaque compte ne peut l'utiliser qu'une fois.">
        {essai && (
          <div className="grid grid-cols-2 gap-3 sm:max-w-md">
            <label className="flex flex-col gap-1 text-xs font-bold text-gris">
              Code
              <input value={essai.code_essai} onChange={(ev) => setEssai({ ...essai, code_essai: ev.target.value.toUpperCase() })} className={`${champ} font-mono`} />
            </label>
            <label className="flex flex-col gap-1 text-xs font-bold text-gris">
              Durée (jours)
              <input type="number" min={0} max={30} value={essai.jours_essai} onChange={(ev) => setEssai({ ...essai, jours_essai: ev.target.value })} className={champ} />
            </label>
          </div>
        )}
        <button type="button" onClick={enregistrerEssai} className="h-11 cursor-pointer self-start rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white">
          Enregistrer l'essai
        </button>
      </Carte>

      <Carte
        titre="Paiement et contact"
        description="Affichés sur la page Abonnement et dans le pied de page. Laisse un numéro vide pour masquer ce moyen de paiement (s'il n'est pas non plus défini dans les variables Netlify)."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CLES_REGLAGES.map((c) => (
            <label key={c} className="flex flex-col gap-1 text-xs font-bold text-gris">
              {LIBELLES_REGLAGES[c].libelle}
              <input
                type={LIBELLES_REGLAGES[c].type ?? 'text'}
                value={valeurs[c] ?? ''}
                placeholder={reglages.valeurs[c] && !valeurs[c] ? `Actuel : ${reglages.valeurs[c]} (variable Netlify)` : ''}
                onChange={(ev) => setValeurs({ ...valeurs, [c]: ev.target.value })}
                className={champ}
              />
              {LIBELLES_REGLAGES[c].aide && <span className="font-semibold">{LIBELLES_REGLAGES[c].aide}</span>}
            </label>
          ))}
        </div>
        <button type="button" onClick={enregistrerReglages} className="h-11 cursor-pointer self-start rounded-full border-0 bg-encre px-5 text-sm font-extrabold text-white">
          Enregistrer
        </button>
      </Carte>
    </div>
  )
}

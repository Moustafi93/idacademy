import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ecrire, lire } from '../lib/stockage'
import { MODE_SERVEUR, supabase } from '../lib/supabase'
import { viderCachePremium } from '../lib/contenuPremium'
import { FORMULES, type Formule, type MoyenPaiement, type Paiement, type Resultat } from '../lib/paiement'

/*
 * Session de l'étudiant.
 *
 * MODE SERVEUR (Supabase configuré) : vrai compte avec mot de passe. L'accès premium,
 * l'essai et les paiements sont décidés par le serveur (voir supabase/migrations).
 * L'étudiant ne voit JAMAIS la liste des paiements : il sait seulement si un paiement
 * est en cours de vérification. Seul l'administrateur voit et traite les paiements.
 *
 * MODE DÉMO (sans Supabase) : tout est simulé dans le navigateur pour tester les écrans.
 * Un compte dont l'e-mail commence par « admin » est administrateur. Rien n'est sécurisé.
 */

export type { Formule } from '../lib/paiement'
export { FORMULES } from '../lib/paiement'

export const CODE_ESSAI = 'IDA3' // utilisé seulement en mode démo (en production, le code est sur le serveur)
const JOURS_ESSAI = 3
const JOUR_MS = 24 * 60 * 60 * 1000

export interface Utilisateur {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string | null
  role: 'etudiant' | 'admin'
}

interface EtatSession {
  utilisateur: Utilisateur | null
  essaiUtilise: boolean
  accesJusquau: number | null // fin de l'accès complet (essai ou premium), en ms
  typeAcces: 'essai' | 'premium' | null
  leconsTerminees: string[] // identifiants « matiere/chapitre/lecon »
  derniereLecon: string | null
  joursActifs: string[] // dates AAAA-MM-JJ
  // Ce que l'étudiant sait de ses paiements (aucun détail)
  paiementEnAttente: boolean
  paiementRefuse: boolean
}

const ETAT_INITIAL: EtatSession = {
  utilisateur: null,
  essaiUtilise: false,
  accesJusquau: null,
  typeAcces: null,
  leconsTerminees: [],
  derniereLecon: null,
  joursActifs: [],
  paiementEnAttente: false,
  paiementRefuse: false,
}

// Mode démo : session en cours. Mode serveur : seulement la progression d'un visiteur non connecté.
const CLE = MODE_SERVEUR ? 'idacademy:visiteur' : 'idacademy:session'
// Mode démo : tous les comptes créés dans ce navigateur, et tous les paiements déclarés
const CLE_COMPTES_DEMO = 'idacademy:demo-comptes'
const CLE_PAIEMENTS_DEMO = 'idacademy:demo-paiements'

export type CompteDemo = EtatSession & { utilisateur: Utilisateur }

interface OutilsDemo {
  paiements: Paiement[]
  comptes: CompteDemo[]
  traiterPaiement: (id: string, valider: boolean, motif?: string) => void
  accorderAcces: (email: string, formule: Formule, moyen: 'especes' | 'offert', note: string) => Resultat
}

interface SessionApi extends EtatSession {
  pret: boolean // la session est chargée (évite d'afficher « non connecté » pendant le chargement)
  modeServeur: boolean
  aAccesComplet: boolean
  joursRestants: number
  estAdmin: boolean
  inscrire: (prenom: string, nom: string, email: string, motDePasse: string) => Promise<Resultat>
  connecter: (email: string, motDePasse: string) => Promise<Resultat>
  motDePasseOublie: (email: string) => Promise<Resultat>
  deconnecter: () => Promise<void>
  appliquerCode: (code: string) => Promise<Resultat>
  declarerPaiement: (formule: Formule, moyen: MoyenPaiement, reference: string, numero: string) => Promise<Resultat>
  rafraichir: () => Promise<void>
  terminerLecon: (id: string) => void
  ouvrirLecon: (id: string) => void
  demo: OutilsDemo | null // mode démo uniquement : simule le travail de l'administrateur
}

const SessionContext = createContext<SessionApi | null>(null)

function aujourdhui() {
  return new Date().toISOString().slice(0, 10)
}

const ajouterJour = (jours: string[]) => (jours.includes(aujourdhui()) ? jours : [...jours, aujourdhui()].slice(-90))
const prolonger = (fin: number | null, jours: number) => Math.max(fin ?? 0, Date.now()) + jours * JOUR_MS

// Erreurs de Supabase traduites en français, avec la marche à suivre.
// Le détail technique est gardé pour la page /diagnostic et pour l'administrateur.
type ErreurSupabase = { message?: string; code?: string; status?: number }

function traduireErreur(erreur: ErreurSupabase): Resultat {
  const m = erreur.message ?? ''
  const code = erreur.code ?? ''
  const detail = `${code || (erreur.status ? `HTTP ${erreur.status}` : 'erreur')} — ${m}`
  const regles: [boolean, string][] = [
    [code === 'email_address_not_authorized' || /not authorized/i.test(m),
      "L'e-mail de confirmation n'a pas pu être envoyé : le service d'e-mail de Supabase n'est pas encore configuré (il n'envoie qu'aux membres de l'équipe Supabase). Administrateur : voir la page Diagnostic."],
    [/error sending (confirmation|recovery|magic link|invite)/i.test(m),
      "L'e-mail n'a pas pu être envoyé (réglages e-mail du serveur à vérifier). Réessaie plus tard ou contacte le support. Administrateur : voir la page Diagnostic."],
    [code === 'over_email_send_rate_limit' || /email rate limit/i.test(m),
      "Trop d'e-mails envoyés pour le moment (le service gratuit de Supabase en autorise 2 par heure). Réessaie dans une heure."],
    [code === 'invalid_credentials' || /invalid login credentials/i.test(m), 'E-mail ou mot de passe incorrect.'],
    [code === 'email_not_confirmed' || /email not confirmed/i.test(m), "Confirme d'abord ton adresse e-mail : clique sur le lien reçu par mail (regarde aussi dans les spams)."],
    [code === 'user_already_exists' || code === 'email_exists' || /already registered|already exists/i.test(m), 'Un compte existe déjà avec cet e-mail. Connecte-toi (onglet « Connexion »).'],
    [code === 'weak_password' || /password should|password is too weak/i.test(m), 'Mot de passe trop faible : utilise au moins 6 caractères, avec des lettres et des chiffres.'],
    [code === 'signup_disabled' || /signups not allowed/i.test(m), 'Les inscriptions sont fermées pour le moment.'],
    [code === 'email_provider_disabled', "La connexion par e-mail n'est pas activée sur le serveur."],
    [code === 'email_address_invalid' || /invalid.*email|unable to validate email/i.test(m), "Cette adresse e-mail n'est pas valide."],
    [/database error saving new user/i.test(m), "Le compte n'a pas pu être enregistré : la base de données n'est pas complètement installée. Administrateur : voir la page Diagnostic."],
    [/invalid api key|no api key/i.test(m) || erreur.status === 401, 'Le site est mal relié au serveur (clé Supabase invalide). Administrateur : voir la page Diagnostic.'],
    [code === 'over_request_rate_limit' || /rate limit|too many requests|security purposes/i.test(m), 'Trop de tentatives. Patiente une minute puis réessaie.'],
    [/failed to fetch|network|load failed/i.test(m), 'Impossible de joindre le serveur. Vérifie ta connexion internet et réessaie.'],
  ]
  const trouve = regles.find(([condition]) => condition)
  return { ok: false, message: trouve?.[1] ?? 'Une erreur inattendue est survenue. Réessaie, ou envoie le détail ci-dessous au support.', detail }
}

function lireEtatLocal(): EtatSession {
  const e = { ...ETAT_INITIAL, ...lire<Partial<EtatSession>>(CLE, {}) }
  // Anciennes sessions de démo (avant la version 2) : on complète l'utilisateur
  if (e.utilisateur) e.utilisateur = Object.assign({ id: 'demo', nom: '', telephone: null, role: 'etudiant' as const }, e.utilisateur)
  return e
}

const nettoyerEmail = (email: string) => email.trim().toLowerCase()

export function SessionProvider({ children }: { children: ReactNode }) {
  const [etat, setEtat] = useState<EtatSession>(lireEtatLocal)
  const [userId, setUserId] = useState<string | null>(null)
  const [pret, setPret] = useState(!MODE_SERVEUR)
  const [maintenant, setMaintenant] = useState(() => Date.now())
  const etatRef = useRef(etat)
  useEffect(() => {
    etatRef.current = etat
  }, [etat])

  // Mode démo : comptes et paiements de ce navigateur
  const [comptesDemo, setComptesDemo] = useState<Record<string, CompteDemo>>(() => (MODE_SERVEUR ? {} : lire(CLE_COMPTES_DEMO, {})))
  const [paiementsDemo, setPaiementsDemo] = useState<Paiement[]>(() => (MODE_SERVEUR ? [] : lire(CLE_PAIEMENTS_DEMO, [])))

  // Sauvegarde locale
  useEffect(() => {
    if (MODE_SERVEUR) {
      if (!etat.utilisateur) ecrire(CLE, { leconsTerminees: etat.leconsTerminees, derniereLecon: etat.derniereLecon, joursActifs: etat.joursActifs })
      return
    }
    ecrire(CLE, etat)
    const u = etat.utilisateur
    if (u) setComptesDemo((c) => ({ ...c, [u.email]: { ...etat, utilisateur: u } }))
  }, [etat])
  useEffect(() => {
    if (!MODE_SERVEUR) ecrire(CLE_COMPTES_DEMO, comptesDemo)
  }, [comptesDemo])
  useEffect(() => {
    if (!MODE_SERVEUR) ecrire(CLE_PAIEMENTS_DEMO, paiementsDemo)
  }, [paiementsDemo])

  useEffect(() => {
    const t = setInterval(() => setMaintenant(Date.now()), 60_000)
    return () => clearInterval(t)
  }, [])

  // ——— Mode serveur : chargement du compte depuis Supabase
  const chargerCompte = useCallback(async (id: string) => {
    if (!supabase) return
    const [profil, progression, activite, statut] = await Promise.all([
      supabase.from('profils').select('*').eq('id', id).single(),
      supabase.from('progression').select('lecon'),
      supabase.from('activite').select('jour').order('jour', { ascending: false }).limit(90),
      supabase.rpc('statut_mes_paiements'),
    ])
    if (profil.error || !profil.data) return
    const p = profil.data
    const lecons = (progression.data ?? []).map((l) => l.lecon as string)

    // La progression faite avant la connexion est ajoutée au compte
    const visiteur = lire<Partial<EtatSession>>(CLE, {})
    const nouvelles = (visiteur.leconsTerminees ?? []).filter((l) => !lecons.includes(l))
    if (nouvelles.length) {
      await supabase.from('progression').upsert(
        nouvelles.map((lecon) => ({ user_id: id, lecon })),
        { onConflict: 'user_id,lecon', ignoreDuplicates: true },
      )
      lecons.push(...nouvelles)
    }
    ecrire(CLE, {})

    const s = (statut.data ?? {}) as { en_attente?: boolean; refuse?: boolean }
    setEtat({
      utilisateur: { id, prenom: p.prenom || p.email?.split('@')[0] || 'Étudiant', nom: p.nom ?? '', email: p.email ?? '', telephone: p.telephone, role: p.role },
      essaiUtilise: p.essai_utilise,
      accesJusquau: p.acces_jusquau ? new Date(p.acces_jusquau).getTime() : null,
      typeAcces: p.type_acces,
      leconsTerminees: lecons,
      derniereLecon: p.derniere_lecon ?? visiteur.derniereLecon ?? null,
      joursActifs: (activite.data ?? []).map((a) => a.jour as string).reverse(),
      paiementEnAttente: !!s.en_attente,
      paiementRefuse: !!s.refuse,
    })
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null)
      if (!data.session) setPret(true)
    })
    // Ne pas appeler Supabase directement dans ce rappel (recommandation de la bibliothèque)
    const { data } = supabase.auth.onAuthStateChange((_evenement, session) => setUserId(session?.user.id ?? null))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!MODE_SERVEUR) return
    if (userId) chargerCompte(userId).finally(() => setPret(true))
    else setEtat((e) => (e.utilisateur ? { ...ETAT_INITIAL } : e))
  }, [userId, chargerCompte])

  const rafraichir = useCallback(async () => {
    if (userId) await chargerCompte(userId)
  }, [userId, chargerCompte])

  // Quand l'étudiant revient sur l'onglet (après avoir payé sur son téléphone), on recharge son accès
  useEffect(() => {
    if (!userId) return
    const auRetour = () => document.visibilityState === 'visible' && chargerCompte(userId)
    document.addEventListener('visibilitychange', auRetour)
    return () => document.removeEventListener('visibilitychange', auRetour)
  }, [userId, chargerCompte])

  const aAccesComplet = etat.accesJusquau !== null && etat.accesJusquau > maintenant
  const joursRestants = aAccesComplet ? Math.ceil((etat.accesJusquau! - maintenant) / JOUR_MS) : 0

  // ——— Mode démo : ouvrir le compte d'un e-mail (le créer s'il n'existe pas)
  const ouvrirCompteDemo = useCallback(
    (email: string, prenom?: string, nom?: string) => {
      const cle = nettoyerEmail(email)
      const existant = comptesDemo[cle]
      if (existant) return setEtat(existant)
      const progression = etatRef.current.utilisateur ? ETAT_INITIAL : etatRef.current // progression du visiteur
      setEtat({
        ...ETAT_INITIAL,
        leconsTerminees: progression.leconsTerminees,
        derniereLecon: progression.derniereLecon,
        joursActifs: progression.joursActifs,
        utilisateur: {
          id: `demo-${cle}`,
          prenom: prenom?.trim() || cle.split('@')[0],
          nom: nom?.trim() ?? '',
          email: cle,
          telephone: null,
          role: cle.startsWith('admin') ? 'admin' : 'etudiant',
        },
      })
    },
    [comptesDemo],
  )

  // ——— Compte
  const inscrire = useCallback(
    async (prenom: string, nom: string, email: string, motDePasse: string): Promise<Resultat> => {
      if (!supabase) {
        ouvrirCompteDemo(email, prenom, nom)
        return { ok: true, message: 'Compte de démonstration créé.' }
      }
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: motDePasse,
        options: { data: { prenom: prenom.trim(), nom: nom.trim() }, emailRedirectTo: `${window.location.origin}/connexion` },
      })
      if (error) return traduireErreur(error)
      if (!data.session) return { ok: true, message: `Presque fini ! Ouvre le mail envoyé à ${email.trim()} et clique sur le lien pour activer ton compte.` }
      return { ok: true, message: 'Bienvenue sur IDAcademy !' }
    },
    [ouvrirCompteDemo],
  )

  const connecter = useCallback(
    async (email: string, motDePasse: string): Promise<Resultat> => {
      if (!supabase) {
        ouvrirCompteDemo(email)
        return { ok: true, message: 'Connecté (démo).' }
      }
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: motDePasse })
      if (error) return traduireErreur(error)
      return { ok: true, message: 'Connecté.' }
    },
    [ouvrirCompteDemo],
  )

  const motDePasseOublie = useCallback(async (email: string): Promise<Resultat> => {
    if (!supabase) return { ok: false, message: 'Indisponible en mode démo.' }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/nouveau-mot-de-passe` })
    if (error) return traduireErreur(error)
    return { ok: true, message: `Si un compte existe pour ${email.trim()}, tu vas recevoir un lien pour choisir un nouveau mot de passe.` }
  }, [])

  const deconnecter = useCallback(async () => {
    viderCachePremium()
    if (supabase) await supabase.auth.signOut()
    setEtat(ETAT_INITIAL)
  }, [])

  // ——— Essai et paiements
  const appliquerCode = useCallback(
    async (code: string): Promise<Resultat> => {
      if (supabase) {
        if (!userId) return { ok: false, message: "Connecte-toi pour utiliser ton code d'essai." }
        const { data, error } = await supabase.rpc('utiliser_code_essai', { p_code: code })
        if (error) return traduireErreur(error)
        await chargerCompte(userId)
        return data as Resultat
      }
      if (code.trim().toUpperCase() !== CODE_ESSAI) return { ok: false, message: "Ce code n'est pas valide." }
      if (etat.essaiUtilise) return { ok: false, message: 'Tu as déjà utilisé ton essai gratuit.' }
      setEtat((e) => ({ ...e, essaiUtilise: true, typeAcces: e.typeAcces ?? 'essai', accesJusquau: prolonger(e.accesJusquau, JOURS_ESSAI) }))
      return { ok: true, message: `Essai activé : tout est ouvert pendant ${JOURS_ESSAI} jours.` }
    },
    [userId, chargerCompte, etat.essaiUtilise],
  )

  const declarerPaiement = useCallback(
    async (formule: Formule, moyen: MoyenPaiement, reference: string, numero: string): Promise<Resultat> => {
      if (supabase) {
        if (!userId) return { ok: false, message: 'Connecte-toi pour déclarer ton paiement.' }
        const { data, error } = await supabase.rpc('declarer_paiement', { p_formule: formule, p_moyen: moyen, p_reference: reference, p_numero: numero })
        if (error) return traduireErreur(error)
        await chargerCompte(userId)
        return data as Resultat
      }
      const u = etatRef.current.utilisateur
      if (!u) return { ok: false, message: 'Connecte-toi pour déclarer ton paiement.' }
      const tarif = FORMULES[formule]
      const ref = reference.trim().toUpperCase()
      if (!tarif.prix || !tarif.jours) return { ok: false, message: 'Formule bientôt disponible.' }
      if (ref.length < 4) return { ok: false, message: 'Indique la référence de la transaction reçue par SMS.' }
      if (paiementsDemo.some((p) => p.moyen === moyen && p.reference === ref && p.statut !== 'refuse'))
        return { ok: false, message: 'Cette référence de transaction a déjà été déclarée.' }
      const paiement: Paiement = {
        id: crypto.randomUUID(),
        formule,
        montant: tarif.prix,
        jours: tarif.jours,
        moyen,
        reference: ref,
        numero_payeur: numero.trim() || null,
        statut: 'en_attente',
        motif_refus: null,
        cree_le: new Date().toISOString(),
        profils: { prenom: u.prenom, nom: u.nom, email: u.email, telephone: null },
      }
      setPaiementsDemo((l) => [paiement, ...l])
      return { ok: true, message: 'Paiement déclaré. Ton accès sera activé dès la vérification (en général en moins de 2 heures).' }
    },
    [userId, chargerCompte, paiementsDemo],
  )

  // ——— Mode démo : actions de l'administrateur
  const crediterCompteDemo = useCallback((email: string, jours: number) => {
    if (etatRef.current.utilisateur?.email === email) {
      setEtat((e) => ({ ...e, typeAcces: 'premium', accesJusquau: prolonger(e.accesJusquau, jours) }))
    } else {
      setComptesDemo((c) => (c[email] ? { ...c, [email]: { ...c[email], typeAcces: 'premium', accesJusquau: prolonger(c[email].accesJusquau, jours) } } : c))
    }
  }, [])

  const demoTraiterPaiement = useCallback(
    (id: string, valider: boolean, motif?: string) => {
      const p = paiementsDemo.find((x) => x.id === id)
      if (!p || p.statut !== 'en_attente') return
      setPaiementsDemo((l) => l.map((x) => (x.id === id ? { ...x, statut: valider ? 'valide' : 'refuse', motif_refus: valider ? null : (motif ?? null) } : x)))
      if (valider && p.profils?.email) crediterCompteDemo(p.profils.email, p.jours)
    },
    [paiementsDemo, crediterCompteDemo],
  )

  const demoAccorderAcces = useCallback(
    (email: string, formule: Formule, moyen: 'especes' | 'offert', note: string): Resultat => {
      const compte = comptesDemo[email]
      const tarif = FORMULES[formule]
      if (!compte || !tarif.jours || !tarif.prix) return { ok: false, message: 'Étudiant ou formule introuvable.' }
      setPaiementsDemo((l) => [
        {
          id: crypto.randomUUID(),
          formule,
          montant: moyen === 'offert' ? 0 : tarif.prix!,
          jours: tarif.jours!,
          moyen,
          reference: null,
          numero_payeur: null,
          statut: 'valide',
          motif_refus: null,
          note_admin: note.trim() || null,
          cree_le: new Date().toISOString(),
          profils: { prenom: compte.utilisateur.prenom, nom: compte.utilisateur.nom, email, telephone: null },
        },
        ...l,
      ])
      crediterCompteDemo(email, tarif.jours)
      return { ok: true, message: `${tarif.jours} jours ajoutés à ${compte.utilisateur.prenom}.` }
    },
    [comptesDemo, crediterCompteDemo],
  )

  // ——— Progression
  const terminerLecon = useCallback(
    (id: string) => {
      setEtat((e) => ({
        ...e,
        leconsTerminees: e.leconsTerminees.includes(id) ? e.leconsTerminees : [...e.leconsTerminees, id],
        joursActifs: ajouterJour(e.joursActifs),
      }))
      if (supabase && userId) {
        supabase.from('progression').upsert({ user_id: userId, lecon: id }, { onConflict: 'user_id,lecon', ignoreDuplicates: true }).then(() => {})
        supabase.from('activite').upsert({ user_id: userId, jour: aujourdhui() }, { onConflict: 'user_id,jour', ignoreDuplicates: true }).then(() => {})
      }
    },
    [userId],
  )

  const ouvrirLecon = useCallback(
    (id: string) => {
      const actuel = etatRef.current
      if (actuel.derniereLecon === id && actuel.joursActifs.includes(aujourdhui())) return
      setEtat((e) => ({ ...e, derniereLecon: id, joursActifs: ajouterJour(e.joursActifs) }))
      if (supabase && userId) {
        supabase.from('profils').update({ derniere_lecon: id }).eq('id', userId).then(() => {})
        supabase.from('activite').upsert({ user_id: userId, jour: aujourdhui() }, { onConflict: 'user_id,jour', ignoreDuplicates: true }).then(() => {})
      }
    },
    [userId],
  )

  // En démo, l'état des paiements de l'étudiant est calculé à partir de la liste du navigateur
  const mesPaiementsDemo = useMemo(
    () => (MODE_SERVEUR || !etat.utilisateur ? [] : paiementsDemo.filter((p) => p.profils?.email === etat.utilisateur!.email && p.reference)),
    [paiementsDemo, etat.utilisateur],
  )

  const demo = useMemo<OutilsDemo | null>(
    () =>
      MODE_SERVEUR
        ? null
        : {
            paiements: paiementsDemo,
            comptes: Object.values(comptesDemo),
            traiterPaiement: demoTraiterPaiement,
            accorderAcces: demoAccorderAcces,
          },
    [paiementsDemo, comptesDemo, demoTraiterPaiement, demoAccorderAcces],
  )

  const api = useMemo<SessionApi>(
    () => ({
      ...etat,
      ...(MODE_SERVEUR
        ? {}
        : {
            paiementEnAttente: mesPaiementsDemo.some((p) => p.statut === 'en_attente'),
            paiementRefuse: mesPaiementsDemo[0]?.statut === 'refuse',
          }),
      pret,
      modeServeur: MODE_SERVEUR,
      aAccesComplet,
      joursRestants,
      estAdmin: etat.utilisateur?.role === 'admin',
      inscrire,
      connecter,
      motDePasseOublie,
      deconnecter,
      appliquerCode,
      declarerPaiement,
      rafraichir,
      terminerLecon,
      ouvrirLecon,
      demo,
    }),
    [etat, mesPaiementsDemo, pret, aAccesComplet, joursRestants, inscrire, connecter, motDePasseOublie, deconnecter, appliquerCode, declarerPaiement, rafraichir, terminerLecon, ouvrirLecon, demo],
  )

  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession doit être utilisé dans <SessionProvider>')
  return ctx
}

// Série de jours consécutifs jusqu'à aujourd'hui (ou hier)
// eslint-disable-next-line react-refresh/only-export-components
export function calculerSerie(jours: string[]): number {
  const set = new Set(jours)
  let serie = 0
  const d = new Date()
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  while (set.has(d.toISOString().slice(0, 10))) {
    serie++
    d.setDate(d.getDate() - 1)
  }
  return serie
}

/*
 * Formules, moyens de paiement et types partagés.
 * Les prix affichés ici servent en mode démo ; en production, les prix
 * qui comptent sont ceux de la table « tarifs » du serveur.
 */
export type Formule = 'mensuel' | 'trimestre' | 'examen'

export const FORMULES: Record<Formule, { nom: string; prix: number | null; jours: number | null; detail: string }> = {
  mensuel: { nom: 'Mensuel', prix: 3000, jours: 31, detail: 'Accès complet pendant 31 jours' },
  trimestre: { nom: 'Pass 3 mois', prix: 8500, jours: 93, detail: '93 jours, payé en une seule fois' },
  examen: { nom: 'Pass examen', prix: null, jours: null, detail: "Jusqu'à la fin de la session du BTS" },
}

// Moyens que l'étudiant peut choisir
export type MoyenEtudiant = 'wave' | 'orange_money' | 'mtn_momo' | 'moov_money' | 'djamo'
// + moyens enregistrés uniquement par l'administrateur (payé en main propre, accès offert)
export type MoyenPaiement = MoyenEtudiant | 'especes' | 'offert'

export const MOYENS_ETUDIANT: MoyenEtudiant[] = ['wave', 'orange_money', 'mtn_momo', 'moov_money', 'djamo']

export const MOYENS: Record<MoyenPaiement, { nom: string; couleur: string; aide: string }> = {
  wave: { nom: 'Wave', couleur: 'bg-[#1DC8FF] text-encre', aide: "La référence commence souvent par « T_ » : tu la trouves dans l'historique de l'application Wave." },
  orange_money: { nom: 'Orange Money', couleur: 'bg-[#FF7900] text-encre', aide: 'La référence (ex. « CI230915.1234.A12345 ») est dans le SMS de confirmation.' },
  mtn_momo: { nom: 'MTN MoMo', couleur: 'bg-[#FFCB05] text-encre', aide: "L'identifiant de transaction est dans le SMS de confirmation MTN." },
  moov_money: { nom: 'Moov Money', couleur: 'bg-[#0066B3] text-white', aide: 'La référence est dans le SMS de confirmation Moov.' },
  djamo: { nom: 'Djamo', couleur: 'bg-encre text-white', aide: "La référence est dans le détail de la transaction, dans l'application Djamo." },
  especes: { nom: 'Espèces', couleur: 'bg-menthe text-menthe-fonce', aide: '' },
  offert: { nom: 'Offert', couleur: 'bg-jaune text-encre', aide: '' },
}

export type StatutPaiement = 'en_attente' | 'valide' | 'refuse'

export interface Paiement {
  id: string
  formule: string
  montant: number
  jours: number
  moyen: MoyenPaiement
  reference: string | null
  numero_payeur: string | null
  statut: StatutPaiement
  motif_refus: string | null
  note_admin?: string | null
  cree_le: string
  // Pour l'espace admin : l'étudiant qui a payé
  profils?: { prenom: string; nom?: string | null; email: string | null; telephone: string | null } | null
}

export interface Resultat {
  ok: boolean
  message: string
  detail?: string // détail technique de l'erreur (affiché en petit, utile pour le diagnostic)
}

export const LIBELLES_STATUT: Record<StatutPaiement, { texte: string; classe: string }> = {
  en_attente: { texte: 'En vérification', classe: 'bg-jaune text-encre' },
  valide: { texte: 'Validé', classe: 'bg-menthe text-menthe-fonce' },
  refuse: { texte: 'Refusé', classe: 'bg-corail text-encre' },
}

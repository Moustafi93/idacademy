import type { ReactNode } from 'react'
import { formaterPrix } from '../lib/affichage'
import { LIBELLES_STATUT, MOYENS, type Paiement } from '../lib/paiement'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

// Liste des paiements (étudiant ou admin). `actions` ajoute des boutons sur chaque ligne (admin).
export function ListePaiements({ paiements, titre, actions }: { paiements: Paiement[]; titre?: string; actions?: (p: Paiement) => ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      {titre && <h3 className="m-0 font-display text-base font-bold">{titre}</h3>}
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {paiements.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-ligne bg-white px-4 py-3">
            <div className="flex min-w-0 flex-[1_1_220px] flex-col">
              {p.profils && (
                <span className="font-bold">
                  {p.profils.prenom || 'Sans prénom'} <span className="font-semibold text-gris">· {p.profils.email}</span>
                </span>
              )}
              <span className="text-sm font-bold">
                {formaterPrix(p.montant)} · {MOYENS[p.moyen]?.nom ?? p.moyen} · {p.jours} jours
              </span>
              <span className="text-[13px] font-semibold text-gris">
                {formatDate(p.cree_le)}
                {p.reference && (
                  <>
                    {' '}· réf. <span className="font-mono text-encre">{p.reference}</span>
                  </>
                )}
                {p.numero_payeur && <> · payé depuis le {p.numero_payeur}</>}
              </span>
              {p.statut === 'refuse' && p.motif_refus && <span className="text-[13px] font-bold text-[#9A2A06]">Motif : {p.motif_refus}</span>}
              {p.note_admin && <span className="text-[13px] font-bold text-menthe-fonce">Note : {p.note_admin}</span>}
            </div>
            <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${LIBELLES_STATUT[p.statut].classe}`}>{LIBELLES_STATUT[p.statut].texte}</span>
            {actions?.(p)}
          </li>
        ))}
      </ul>
    </section>
  )
}

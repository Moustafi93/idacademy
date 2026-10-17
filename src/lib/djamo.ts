import type { Formule } from './paiement'
import { supabase } from './supabase'

/*
 * Paiement automatique Djamo : notre fonction serveur crée le paiement chez Djamo
 * et renvoie le lien vers lequel on envoie l'étudiant. L'accès est activé par le
 * serveur quand Djamo confirme (webhook), jamais par le navigateur.
 */
export async function payerAvecDjamo(formule: Formule): Promise<{ ok: boolean; message: string }> {
  if (!supabase) return { ok: false, message: 'Paiement Djamo indisponible en mode démo.' }
  const { data, error } = await supabase.functions.invoke('djamo-paiement', { body: { formule } })
  if (error || !data?.paymentUrl) return { ok: false, message: data?.message ?? 'Djamo ne répond pas pour le moment. Réessaie ou paie par mobile money.' }
  window.location.assign(data.paymentUrl)
  return { ok: true, message: 'Redirection vers Djamo…' }
}

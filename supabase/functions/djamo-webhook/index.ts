/*
 * Reçoit les événements Djamo (topic « charge/events ») et active l'accès quand
 * le paiement est payé. C'est le SEUL chemin automatique vers l'accès Premium.
 *
 * Secret supplémentaire : DJAMO_WEBHOOK_SECRET (la SECRET_KEY fournie par Djamo).
 * À enregistrer chez Djamo : POST /v1/webhooks { "topic": "charge/events",
 *   "url": "https://<projet>.supabase.co/functions/v1/djamo-webhook" }
 * Cette fonction est publique (verify_jwt = false) : la signature remplace la connexion.
 */
import { createClient } from 'npm:@supabase/supabase-js@2'
import { signatureValide } from '../_shared/signature.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Méthode non autorisée', { status: 405 })

  const corps = await req.text() // corps BRUT : indispensable pour vérifier la signature
  const secret = Deno.env.get('DJAMO_WEBHOOK_SECRET') ?? ''
  if (!(await signatureValide(corps, req.headers.get('x-djamo-hmac-sha256'), secret))) {
    console.warn('Webhook Djamo : signature invalide')
    return new Response('Signature invalide', { status: 401 })
  }

  const evenement = JSON.parse(corps) as { topic: string; data: { id: string; externalId: string; status: string; amount: number; currency?: string } }
  if (evenement.topic !== 'charge/events') return new Response('Ignoré', { status: 200 })

  const charge = evenement.data
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data: paiement } = await admin
    .from('paiements')
    .select('id, montant, statut, djamo_charge_id')
    .eq('id', charge.externalId)
    .maybeSingle()

  // Le paiement doit exister et correspondre à la même opération Djamo
  if (!paiement || (paiement.djamo_charge_id && paiement.djamo_charge_id !== charge.id)) {
    console.warn('Webhook Djamo : paiement inconnu', charge.externalId)
    return new Response('Paiement inconnu', { status: 200 })
  }

  if (charge.status === 'paid') {
    if (charge.amount < paiement.montant || (charge.currency && charge.currency !== 'XOF')) {
      console.error('Webhook Djamo : montant incorrect', charge)
      return new Response('Montant incorrect', { status: 200 })
    }
    const { error } = await admin.rpc('appliquer_paiement', { p_id: paiement.id, p_par: null })
    if (error) return new Response('Erreur', { status: 500 }) // Djamo réessaiera
  } else if (charge.status === 'dropped' && paiement.statut === 'en_attente') {
    await admin.from('paiements').update({ statut: 'refuse', motif_refus: 'Paiement Djamo annulé ou expiré', traite_le: new Date().toISOString() }).eq('id', paiement.id)
  }
  return new Response('OK', { status: 200 })
})

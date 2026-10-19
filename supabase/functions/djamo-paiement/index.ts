/*
 * Crée un paiement Djamo pour l'étudiant connecté et renvoie le lien de paiement.
 *
 * Secrets à définir dans Supabase (Edge Functions → Secrets) :
 *   DJAMO_BASE_URL       URL de l'API fournie par Djamo (staging puis production)
 *   DJAMO_ACCESS_TOKEN   jeton d'accès (commence par « at_ »)
 *   DJAMO_COMPANY_ID     identifiant de l'entreprise chez Djamo
 *   SITE_URL             adresse du site, ex. https://idacademy.ci
 * (SUPABASE_URL, SUPABASE_ANON_KEY et SUPABASE_SERVICE_ROLE_KEY sont fournis automatiquement.)
 */
import { createClient } from 'npm:@supabase/supabase-js@2'
import { enTetesCors, reponse } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: enTetesCors })
  if (req.method !== 'POST') return reponse({ message: 'Méthode non autorisée' }, 405)

  const baseUrl = Deno.env.get('DJAMO_BASE_URL')
  const jeton = Deno.env.get('DJAMO_ACCESS_TOKEN')
  const entreprise = Deno.env.get('DJAMO_COMPANY_ID')
  const site = Deno.env.get('SITE_URL')
  if (!baseUrl || !jeton || !entreprise || !site) {
    return reponse({ message: 'Le paiement Djamo automatique n\'est pas encore activé. Paie par mobile money.' }, 503)
  }

  // 1. Qui paie ? (jeton de connexion de l'étudiant)
  const utilisateur = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  })
  const { data: auth } = await utilisateur.auth.getUser()
  if (!auth.user) return reponse({ message: 'Connecte-toi pour payer.' }, 401)

  // 2. Quel tarif ? (le prix vient TOUJOURS de la base, jamais du navigateur)
  const { formule } = await req.json().catch(() => ({ formule: null }))
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data: tarif } = await admin.from('tarifs').select('*').eq('formule', formule).eq('actif', true).maybeSingle()
  if (!tarif) return reponse({ message: 'Formule inconnue.' }, 400)

  // 3. On enregistre le paiement « en attente » avant d'appeler Djamo
  const { data: paiement, error } = await admin
    .from('paiements')
    .insert({ user_id: auth.user.id, formule: tarif.formule, montant: tarif.prix, jours: tarif.jours, moyen: 'djamo' })
    .select('id')
    .single()
  if (error || !paiement) return reponse({ message: 'Impossible de créer le paiement.' }, 500)

  // 4. Création du paiement chez Djamo (POST /v1/charges)
  const djamo = await fetch(`${baseUrl.replace(/\/$/, '')}/v1/charges`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jeton}`, 'X-Company-Id': entreprise },
    body: JSON.stringify({
      amount: tarif.prix,
      externalId: paiement.id,
      description: `IDAcademy - ${tarif.nom}`,
      onCompletedRedirectionUrl: `${site}/abonnement?djamo=termine`,
      onCanceledRedirectionUrl: `${site}/abonnement?djamo=annule`,
      metadata: { user_id: auth.user.id, formule: tarif.formule },
    }),
  })
  const charge = await djamo.json().catch(() => null)
  if (!djamo.ok || !charge?.paymentUrl) {
    await admin.from('paiements').update({ statut: 'refuse', motif_refus: 'Création Djamo échouée' }).eq('id', paiement.id)
    console.error('Djamo', djamo.status, charge)
    return reponse({ message: 'Djamo ne répond pas pour le moment. Réessaie ou paie par mobile money.' }, 502)
  }

  await admin.from('paiements').update({ djamo_charge_id: charge.id }).eq('id', paiement.id)
  return reponse({ paymentUrl: charge.paymentUrl })
})

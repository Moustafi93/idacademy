/*
 * Vérification de la signature des webhooks Djamo.
 * Djamo signe le corps brut de la requête avec HMAC-SHA256 et la clé secrète,
 * encode le résultat en Base64 et l'envoie dans l'en-tête « x-djamo-hmac-sha256 ».
 * (Web Crypto : fonctionne dans Supabase Edge Functions, Deno et Node.js.)
 */
export async function signer(corps: string, secret: string): Promise<string> {
  const cle = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const octets = new Uint8Array(await crypto.subtle.sign('HMAC', cle, new TextEncoder().encode(corps)))
  let binaire = ''
  for (const o of octets) binaire += String.fromCharCode(o)
  return btoa(binaire)
}

// Comparaison en temps constant (évite de deviner la signature caractère par caractère)
function egales(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let difference = 0
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return difference === 0
}

export async function signatureValide(corps: string, signatureRecue: string | null, secret: string): Promise<boolean> {
  if (!signatureRecue || !secret) return false
  return egales(await signer(corps, secret), signatureRecue.trim())
}

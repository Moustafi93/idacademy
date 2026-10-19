/*
 * Réglages du site, à remplir dans le fichier .env (voir .env.exemple).
 * Aucune de ces valeurs n'est secrète : elles sont visibles dans le site.
 */
import type { MoyenEtudiant } from './lib/paiement'

const env = import.meta.env

export const CONFIG = {
  // Numéros qui reçoivent les paiements (format affiché tel quel, ex. « 07 07 00 00 00 »)
  numeros: {
    wave: env.VITE_NUMERO_WAVE as string | undefined,
    orange_money: env.VITE_NUMERO_ORANGE as string | undefined,
    mtn_momo: env.VITE_NUMERO_MTN as string | undefined,
    moov_money: env.VITE_NUMERO_MOOV as string | undefined,
    djamo: env.VITE_NUMERO_DJAMO as string | undefined,
  } satisfies Record<MoyenEtudiant, string | undefined>,
  // Nom affiché chez le payeur, pour qu'il vérifie qu'il envoie au bon numéro
  beneficiaire: (env.VITE_NOM_BENEFICIAIRE as string | undefined) || 'IDAcademy',
  // Lien de paiement Wave Business (optionnel), ex. https://pay.wave.com/m/M_xxxx/c/ci/
  lienWave: env.VITE_LIEN_WAVE as string | undefined,
  // Numéro WhatsApp du support, au format international sans « + » (ex. 2250707000000)
  whatsapp: env.VITE_WHATSAPP as string | undefined,
  // « 1 » quand les clés Djamo sont installées sur le serveur (paiement automatique)
  djamoAutomatique: env.VITE_DJAMO_AUTO === '1',
}

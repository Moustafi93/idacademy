import { createClient } from '@supabase/supabase-js'

/*
 * Connexion au serveur Supabase (comptes, paiements, contenu premium).
 *
 * Les deux valeurs viennent du fichier .env (voir .env.exemple) :
 *   VITE_SUPABASE_URL      = https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY = clé publique « anon » du projet
 *
 * Sans ces valeurs, le site fonctionne en MODE DÉMO : tout est simulé dans le
 * navigateur (pratique pour développer), et aucun paiement réel n'est possible.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const cle = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const MODE_SERVEUR = !!import.meta.env.VITE_SUPABASE_URL

export const supabase = MODE_SERVEUR && url && cle ? createClient(url, cle, { auth: { persistSession: true, autoRefreshToken: true } }) : null

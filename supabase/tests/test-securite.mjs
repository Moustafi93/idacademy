/*
 * Tests de sécurité de la base de données (sans serveur Supabase).
 * Lance PostgreSQL dans Node (PGlite), simule les rôles de Supabase, exécute la
 * migration puis vérifie que chaque règle protège bien les données et l'accès premium.
 *
 * Usage : npm run test:base
 */
import { PGlite } from '@electric-sql/pglite'
import fs from 'fs'

const db = new PGlite()
// Toutes les migrations, dans l'ordre
const migrations = fs.readdirSync('supabase/migrations').filter((f) => f.endsWith('.sql')).sort().map((f) => fs.readFileSync(`supabase/migrations/${f}`, 'utf8'))

// ——— Environnement « façon Supabase »
await db.exec(`
  create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key, email text, raw_user_meta_data jsonb);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  grant usage on schema auth to anon, authenticated, service_role;
  grant execute on function auth.uid() to anon, authenticated, service_role;
  grant usage on schema public to anon, authenticated, service_role;
  alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
`)
for (const m of migrations) await db.exec(m)

const A = '11111111-1111-1111-1111-111111111111'
const B = '22222222-2222-2222-2222-222222222222'
const ADMIN = '33333333-3333-3333-3333-333333333333'
await db.exec(`
  insert into auth.users values ('${A}', 'awa@ex.ci', '{"prenom":"Awa"}'), ('${B}', 'yao@ex.ci', '{"prenom":"Yao"}'), ('${ADMIN}', 'admin@ex.ci', '{"prenom":"Admin"}');
  update public.profils set role = 'admin' where id = '${ADMIN}';
  insert into public.contenu_premium values ('base-de-donnees/requetes-select', '[{"slug":"x"}]');
`)

let ok = 0, ko = 0
const verifier = (nom, cond, detail = '') => {
  if (cond) ok++
  else { ko++; console.log('ÉCHEC :', nom, detail) }
}
async function en(qui, sql) {
  await db.exec('reset role')
  await db.query(`select set_config('request.jwt.claim.sub', $1, false)`, [qui === 'anon' ? '' : qui])
  await db.exec(qui === 'anon' ? 'set role anon' : qui === 'service' ? 'set role service_role' : 'set role authenticated')
  try {
    const r = await db.query(sql)
    return { rows: r.rows, affected: r.affectedRows }
  } catch (e) {
    return { erreur: e.message }
  } finally {
    await db.exec('reset role')
  }
}
const json = (r) => r.rows?.[0] && Object.values(r.rows[0])[0]

// 1. Profils créés automatiquement
let r = await en(ADMIN, 'select prenom from profils order by prenom')
verifier('profils créés (admin voit tout)', r.rows?.length === 3, JSON.stringify(r))
r = await en(A, 'select * from profils')
verifier('étudiant ne voit que son profil', r.rows?.length === 1 && r.rows[0].prenom === 'Awa', JSON.stringify(r))

// 2. Modifications interdites
r = await en(A, `update profils set acces_jusquau = now() + interval '1 year' where id = '${A}'`)
verifier('étudiant ne peut pas se donner l\'accès', !!r.erreur, JSON.stringify(r))
r = await en(A, `update profils set role = 'admin' where id = '${A}'`)
verifier('étudiant ne peut pas devenir admin', !!r.erreur)
r = await en(A, `update profils set prenom = 'Awa K.', telephone = '0707' where id = '${A}'`)
verifier('étudiant modifie son prénom', !r.erreur && r.affected === 1, JSON.stringify(r))
r = await en(A, `update profils set prenom = 'Pirate' where id = '${B}'`)
verifier('étudiant ne modifie pas le profil d\'un autre', !r.erreur && r.affected === 0, JSON.stringify(r))

// 3. Contenu premium et code d'essai
r = await en(A, 'select cle from contenu_premium')
verifier('premium invisible sans accès', r.rows?.length === 0, JSON.stringify(r))
r = await en('anon', 'select cle from contenu_premium')
verifier('premium invisible pour un visiteur', r.rows?.length === 0)
r = await en(A, `select utiliser_code_essai('FAUX')`)
verifier('mauvais code refusé', json(r)?.ok === false)
r = await en(A, `select utiliser_code_essai(' ida3 ')`)
verifier('code IDA3 accepté', json(r)?.ok === true, JSON.stringify(r))
r = await en(A, `select utiliser_code_essai('IDA3')`)
verifier('code utilisable une seule fois', json(r)?.ok === false && /déjà/.test(json(r).message))
r = await en(A, 'select cle from contenu_premium')
verifier('premium visible pendant l\'essai', r.rows?.length === 1)
r = await en(A, `select type_acces, round(extract(epoch from acces_jusquau - now()) / 86400) as jours from profils`)
verifier('essai de 3 jours', r.rows?.[0]?.type_acces === 'essai' && Number(r.rows[0].jours) === 3, JSON.stringify(r.rows))
r = await en('anon', `select utiliser_code_essai('IDA3')`)
verifier('visiteur ne peut pas appeler la fonction', !!r.erreur)

// 4. Déclaration de paiements
r = await en(B, `select declarer_paiement('mensuel', 'wave', 'tx-ab12cd34', '0707070707')`)
verifier('déclaration Wave', json(r)?.ok === true, JSON.stringify(r))
const idB = json(r)?.id
r = await en(A, `select declarer_paiement('mensuel', 'wave', 'TX-AB12CD34', '')`)
verifier('même référence refusée (même en minuscules)', json(r)?.ok === false && /déjà/.test(json(r).message), JSON.stringify(r))
r = await en(A, `select declarer_paiement('gratuit', 'wave', 'REF12345', '')`)
verifier('formule inconnue refusée', json(r)?.ok === false)
r = await en(A, `select declarer_paiement('mensuel', 'wave', 'ab', '')`)
verifier('référence trop courte refusée', json(r)?.ok === false)
r = await en(A, `insert into paiements (user_id, formule, montant, jours, moyen, statut) values ('${A}', 'mensuel', 1, 999, 'wave', 'valide')`)
verifier('insertion directe interdite', !!r.erreur)
r = await en(ADMIN, `select montant, jours, statut from paiements where id = '${idB}'`)
verifier('montant fixé par le serveur', r.rows?.[0]?.montant === 3000 && r.rows[0].jours === 31 && r.rows[0].statut === 'en_attente', JSON.stringify(r.rows))
r = await en(B, `select * from paiements`)
verifier('l\'étudiant ne voit pas la liste de ses paiements', r.rows?.length === 0, JSON.stringify(r))
r = await en(B, `select statut_mes_paiements()`)
verifier('l\'étudiant sait seulement qu\'un paiement est en vérification', json(r)?.en_attente === true && json(r)?.refuse === false && Object.keys(json(r)).length === 2, JSON.stringify(r))
r = await en('anon', `select statut_mes_paiements()`)
verifier('statut inaccessible pour un visiteur', !!r.erreur)
r = await en(A, `select * from paiements`)
verifier('étudiant ne voit pas les paiements des autres', r.rows?.length === 0)
for (const n of [1, 2, 3]) await en(A, `select declarer_paiement('mensuel', 'orange_money', 'OM-REF-${n}', '')`)
r = await en(A, `select declarer_paiement('mensuel', 'orange_money', 'OM-REF-4', '')`)
verifier('maximum 3 paiements en attente', json(r)?.ok === false)

// 5. Validation
r = await en(A, `select valider_paiement('${idB}')`)
verifier('étudiant ne peut pas valider', json(r)?.ok === false)
r = await en(A, `select appliquer_paiement('${idB}', '${A}')`)
verifier('fonction interne inaccessible', !!r.erreur)
r = await en(ADMIN, `select valider_paiement('${idB}')`)
verifier('admin valide', json(r)?.ok === true, JSON.stringify(r))
r = await en(ADMIN, `select valider_paiement('${idB}')`)
verifier('validation idempotente', json(r)?.ok === true && /déjà/.test(json(r).message))
r = await en(B, `select type_acces, round(extract(epoch from acces_jusquau - now()) / 86400) as jours from profils`)
verifier('accès premium de 31 jours', r.rows?.[0]?.type_acces === 'premium' && Number(r.rows[0].jours) === 31, JSON.stringify(r.rows))
r = await en(B, 'select cle from contenu_premium')
verifier('premium visible après paiement', r.rows?.length === 1)

// Le paiement d'Awa (en essai) prolonge son accès depuis la fin de l'essai
const idA = (await en(ADMIN, `select id from paiements where reference = 'OM-REF-1'`)).rows[0].id
await en(ADMIN, `select valider_paiement('${idA}')`)
r = await en(A, `select type_acces, round(extract(epoch from acces_jusquau - now()) / 86400) as jours from profils`)
verifier('essai + mensuel = 34 jours', r.rows?.[0]?.type_acces === 'premium' && Number(r.rows[0].jours) === 34, JSON.stringify(r.rows))

// 6. Refus puis réutilisation de la référence
const idA2 = (await en(ADMIN, `select id from paiements where reference = 'OM-REF-2'`)).rows[0].id
r = await en(ADMIN, `select refuser_paiement('${idA2}', 'Référence introuvable')`)
verifier('admin refuse', json(r)?.ok === true)
r = await en(ADMIN, `select refuser_paiement('${idA2}', 'x')`)
verifier('refus déjà traité', json(r)?.ok === false)
const D = '55555555-5555-5555-5555-555555555555'
await db.exec(`insert into auth.users values ('${D}', 'fatou@ex.ci', '{"prenom":"Fatou"}')`)
r = await en(D, `select declarer_paiement('mensuel', 'wave', 'T_FAUSSE01', '')`)
await en(ADMIN, `select refuser_paiement('${json(r).id}', 'Référence introuvable')`)
r = await en(D, `select statut_mes_paiements()`)
verifier('après un refus : l\'étudiant est prévenu (sans détails)', json(r)?.refuse === true && json(r)?.en_attente === false, JSON.stringify(r))
r = await en(A, `select declarer_paiement('mensuel', 'orange_money', 'OM-REF-2', '')`)
verifier('référence refusée réutilisable', json(r)?.ok === true, JSON.stringify(r))

r = await en(A, `select statut_mes_paiements()`)
verifier('après un refus (puis nouvelle déclaration) : pas d\'alerte de refus', json(r)?.refuse === false, JSON.stringify(r))

// 6 bis. Paiement enregistré par l'admin (espèces / offert)
r = await en(A, `select enregistrer_paiement_admin('${A}', 'trimestre', 'offert', 'Pirate')`)
verifier('étudiant ne peut pas s\'offrir un accès', json(r)?.ok === false)
r = await en(A, `select enregistrer_paiement_admin('${A}', 'trimestre', 'wave', '')`)
verifier('admin : seulement espèces ou offert', json(r)?.ok === false)
const C = '44444444-4444-4444-4444-444444444444'
await db.exec(`insert into auth.users values ('${C}', 'kevin@ex.ci', '{"prenom":"Kevin"}')`)
r = await en(ADMIN, `select enregistrer_paiement_admin('${C}', 'mensuel', 'especes', 'Payé en classe')`)
verifier('admin enregistre un paiement en espèces', json(r)?.ok === true, JSON.stringify(r))
r = await en(C, `select type_acces, round(extract(epoch from acces_jusquau - now()) / 86400) as jours from profils`)
verifier('espèces : accès de 31 jours', r.rows?.[0]?.type_acces === 'premium' && Number(r.rows[0].jours) === 31, JSON.stringify(r.rows))
r = await en(ADMIN, `select montant, moyen, statut, note_admin from paiements where user_id = '${C}'`)
verifier('paiement espèces tracé', r.rows?.[0]?.montant === 3000 && r.rows[0].statut === 'valide' && r.rows[0].note_admin === 'Payé en classe', JSON.stringify(r.rows))
r = await en(ADMIN, `select enregistrer_paiement_admin('${C}', 'mensuel', 'offert', '')`)
verifier('accès offert : montant 0', json(r)?.ok === true)

// 6 ter. Nom à l'inscription et version du schéma
const E = '66666666-6666-6666-6666-666666666666'
await db.exec(`insert into auth.users values ('${E}', 'ange@ex.ci', '{"prenom":"Ange","nom":"Yao"}')`)
r = await en(E, 'select prenom, nom from profils')
verifier('prénom et nom enregistrés à l\'inscription', r.rows?.[0]?.prenom === 'Ange' && r.rows[0].nom === 'Yao', JSON.stringify(r.rows))
r = await en(E, `update profils set nom = 'Yao Kouamé' where id = '${E}'`)
verifier('l\'étudiant peut corriger son nom', !r.erreur && r.affected === 1)
r = await en(E, `update profils set type_acces = 'premium' where id = '${E}'`)
verifier('mais toujours pas son accès', !!r.erreur)
r = await en('anon', 'select version_schema() as v')
verifier('version du schéma lisible par la page diagnostic', r.rows?.[0]?.v === 3)

// 7. Visiteur, paramètres, tarifs, statistiques
r = await en('anon', 'select formule, prix from tarifs order by prix')
verifier('tarifs publics', r.rows?.length === 2 && r.rows[0].prix === 3000)
r = await en(A, 'select * from parametres')
verifier('paramètres privés (code d\'essai caché)', r.rows?.length === 0 || !!r.erreur)
r = await en(A, 'select statistiques_admin()')
verifier('statistiques réservées à l\'admin', json(r) === null)
r = await en(ADMIN, 'select statistiques_admin()')
const st = json(r)
verifier('statistiques admin', st?.inscrits === 6 && st.abonnes_actifs === 3 && st.recette_mois === 9000 && st.en_attente === 2, JSON.stringify(st))

// 8. Progression
r = await en(A, `insert into progression (user_id, lecon) values ('${A}', 'algorithmique/les-boucles/la-boucle-pour')`)
verifier('progression enregistrée', !r.erreur)
r = await en(A, `insert into progression (user_id, lecon) values ('${B}', 'x')`)
verifier('progression d\'un autre interdite', !!r.erreur)
r = await en(A, `insert into activite (user_id) values ('${A}')`)
verifier('activité enregistrée', !r.erreur)
r = await en(B, `select * from progression`)
verifier('progression privée', r.rows?.length === 0)

// 9. Service (webhook Djamo) peut appliquer un paiement
const idA3 = (await en(ADMIN, `select id from paiements where reference = 'OM-REF-3'`)).rows[0].id
r = await en('service', `select appliquer_paiement('${idA3}', null)`)
verifier('le serveur (webhook) peut valider', json(r)?.ok === true, JSON.stringify(r))

// 10. Contenu premium généré + opérations du serveur (fonctions Djamo)
await db.exec(fs.readFileSync('supabase/contenu_premium.sql', 'utf8'))
r = await en(B, "select cle, jsonb_array_length(lecons) as n, lecons->0->'exercice'->>'id' as ex from contenu_premium where cle like 'base-de-donnees/%' order by cle")
verifier('contenu premium importé et lisible par un abonné', r.rows?.length === 2 && r.rows[0].n === 3, JSON.stringify(r))
r = await en('anon', "select count(*)::int as n from contenu_premium")
verifier('contenu premium invisible pour un visiteur', r.rows?.[0]?.n === 0)
r = await en('service', `insert into paiements (user_id, formule, montant, jours, moyen) values ('${B}', 'mensuel', 3000, 31, 'djamo') returning id`)
verifier('le serveur crée un paiement Djamo', !r.erreur && r.rows?.length === 1, JSON.stringify(r))
const idDjamo = r.rows?.[0]?.id
r = await en('service', `update paiements set djamo_charge_id = 'ch_123' where id = '${idDjamo}'`)
verifier('le serveur enregistre l\'identifiant Djamo', !r.erreur && r.affected === 1)
r = await en('service', `update paiements set statut = 'refuse', motif_refus = 'annulé' where id = '${idDjamo}' and statut = 'en_attente'`)
verifier('le serveur annule un paiement Djamo abandonné', !r.erreur && r.affected === 1)

console.log(`${ok} vérifications réussies, ${ko} échec(s)`)
process.exit(ko ? 1 : 0)

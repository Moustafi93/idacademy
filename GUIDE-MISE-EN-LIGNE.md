# Mettre IDAcademy en ligne — guide pas à pas

Ce guide te fait passer de la version démo à un vrai site, avec de vrais comptes et de vrais paiements.
Compte environ **2 heures** la première fois. Tout est gratuit au départ, sauf le nom de domaine.

| Service | Rôle | Prix au départ |
|---|---|---|
| **Supabase** | Comptes, base de données, contenu premium, paiements | Gratuit (500 Mo de base, 50 000 utilisateurs actifs par mois) |
| **Netlify** | Héberge le site | Gratuit : 300 crédits par mois (voir l'encadré ci-dessous) |
| **GitHub** | Garde le code et déclenche les mises à jour du site | Gratuit |
| Nom de domaine (ex. `idacademy.ci` ou `.com`) | L'adresse du site | Environ 10 000 à 25 000 F par an |

> **Les crédits Netlify, à bien comprendre.** L'offre gratuite donne **300 crédits par mois**. Ils servent à payer :
> - le **trafic** : environ 10 à 20 crédits par Go, selon la date de création de ton compte (regarde dans ton tableau de bord). Un nouveau visiteur télécharge environ 0,3 à 0,6 Mo, puis son navigateur garde les fichiers en mémoire.
> - chaque **mise en ligne d'une nouvelle version** (*production deploy*) : **15 crédits**. Vingt mises en ligne dans le mois suffisent à tout consommer.
>
> **Quand les crédits sont épuisés, le site est mis en pause jusqu'au mois suivant.** Pour un site où les étudiants paient, il ne faut pas que ça arrive. Voici les règles à suivre :
> 1. **Regroupe tes modifications** et publie au maximum **une à deux fois par semaine** (voir l'étape 4).
> 2. Surveille ta consommation dans **Netlify → Team settings → Usage & billing** chaque semaine.
> 3. Dès que tu dépasses environ 200 crédits par mois, passe à l'offre **Personal (9 $ par mois, 1 000 crédits)** : c'est bien moins cher qu'un mois d'abonnements perdus.

> Attention : sur l'offre gratuite de Supabase, un projet **sans aucune activité pendant une semaine est mis en pause**. Dès que des étudiants l'utilisent, ça n'arrive pas. Si ça arrive, il suffit de cliquer sur « Restore » dans le tableau de bord.

---

## Étape 1 — Créer la base de données (Supabase)

1. Va sur **supabase.com**, crée un compte, puis **New project**.
   - Nom : `idacademy`
   - Mot de passe de la base : génère-le et **garde-le** dans un endroit sûr.
   - Région : choisis l'**Europe** (Paris ou Francfort), la plus proche de la Côte d'Ivoire.
2. Quand le projet est prêt, ouvre **SQL Editor** → **New query**.
3. Exécute les fichiers du dossier `supabase/migrations/` **dans l'ordre**, un par requête : copie-colle le contenu, puis clique **Run**. Tu dois voir « Success » à chaque fois.
   1. `20261015000000_idacademy.sql` (tables, sécurité, paiements)
   2. `20261015120000_paiements_reserves_admin.sql` (paiements visibles par l'administrateur seulement)
4. Nouvelle requête : copie-colle le fichier `supabase/contenu_premium.sql`, puis **Run**. Ça installe les chapitres premium.
5. Va dans **Project Settings → API** et note :
   - **Project URL** (ex. `https://abcd1234.supabase.co`)
   - la clé **anon public** (longue clé qui commence par `eyJ…`)

   La clé `service_role` est **secrète** : ne la mets jamais dans le site ni dans GitHub.

## Étape 2 — Régler les comptes (Authentication)

1. **Authentication → URL Configuration** :
   - **Site URL** : l'adresse finale du site (ex. `https://idacademy.ci`). Tu pourras la changer après l'étape 4.
   - **Redirect URLs** : ajoute `https://idacademy.ci/connexion` et `https://idacademy.ci/nouveau-mot-de-passe` (avec ton adresse).
2. **Authentication → Sign In / Providers → Email** : laisse **Confirm email** activé. Les étudiants confirmeront leur adresse par un lien.
3. **Important : l'envoi des e-mails.** Le service d'e-mail fourni par Supabase est limité à quelques messages par heure, ce qui ne suffit pas pour un vrai site. Crée un compte gratuit chez **Brevo** (300 e-mails par jour) ou **Resend**, puis renseigne ses identifiants dans **Authentication → Emails → SMTP Settings**.
4. Facultatif mais conseillé : dans **Authentication → Emails → Templates**, traduis les messages en français. Par exemple, pour l'objet de l'e-mail de confirmation : « Confirme ton compte IDAcademy ».

## Étape 3 — Mettre le code sur GitHub

1. Crée un compte sur **github.com**, puis un dépôt **privé** nommé `idacademy`.
2. Sur ton ordinateur, dans le dossier du projet :
   ```bash
   git init
   git add .
   git commit -m "IDAcademy v2"
   git branch -M main
   git remote add origin https://github.com/TON-COMPTE/idacademy.git
   git push -u origin main
   ```
   Le fichier `.env` n'est jamais envoyé : il est listé dans `.gitignore`.

## Étape 4 — Publier le site (Netlify)

Le projet contient déjà le fichier **`netlify.toml`**, qui règle tout : la commande de build, le dossier à publier, la version de Node et les redirections, pour que les adresses comme `/matieres/web/css` fonctionnent.

1. Crée un compte sur **app.netlify.com** (avec ton compte GitHub, c'est le plus simple).
2. **Add new site → Import an existing project → GitHub**, puis choisis ton dépôt `idacademy`.
3. Netlify lit `netlify.toml` et affiche déjà `npm run build` et `dist` : ne change rien.
4. Avant de cliquer sur Deploy, ouvre **Add environment variables** (ou, plus tard, **Site configuration → Environment variables**) et ajoute les variables de `.env.exemple` :

   | Variable | Valeur |
   |---|---|
   | `VITE_SUPABASE_URL` | la Project URL de l'étape 1 |
   | `VITE_SUPABASE_ANON_KEY` | la clé anon de l'étape 1 |
   | `VITE_NUMERO_WAVE` | ton numéro Wave, ex. `07 00 00 00 00` |
   | `VITE_NUMERO_ORANGE` | ton numéro Orange Money |
   | `VITE_NUMERO_MTN`, `VITE_NUMERO_MOOV`, `VITE_NUMERO_DJAMO` | si tu les utilises (sinon, laisse vide : le moyen est masqué) |
   | `VITE_NOM_BENEFICIAIRE` | ton nom **exactement** comme il s'affiche chez Wave ou Orange Money |
   | `VITE_WHATSAPP` | ton WhatsApp au format `2250700000000` |

5. **Deploy**. Au bout de 2 à 3 minutes, le site est en ligne sur une adresse du type `idacademy.netlify.app`. Tu peux changer ce nom dans **Site configuration → Change site name**.
6. **Nom de domaine** (facultatif) : **Domain management → Add a domain**, puis suis les instructions (réglages DNS chez ton bureau d'enregistrement). Netlify installe le certificat HTTPS tout seul.
7. Retourne à l'étape 2 et mets l'adresse finale (`https://idacademy.netlify.app` ou ton domaine) dans *Site URL* et *Redirect URLs* de Supabase.

> **Important : une variable modifiée n'est prise en compte qu'après une nouvelle mise en ligne** (Deploys → Trigger deploy → Deploy site).

### Économiser les crédits : publier une fois par semaine

Par défaut, Netlify republie le site à **chaque** `git push`, et chaque publication coûte 15 crédits. Pour garder le contrôle :

1. Dans **Site configuration → Build & deploy → Continuous deployment → Branches and deploy contexts**, mets **Branch deploys** et **Deploy Previews** sur **None** (ou laisse les aperçus, ils sont gratuits).
2. Travaille sur une branche `dev` (`git checkout -b dev`), et pousse autant que tu veux : **rien n'est publié**.
3. Quand une série de modifications est prête (par exemple une fois par semaine), fusionne-la dans `main` :
   ```bash
   git checkout main
   git merge dev
   git push
   git checkout dev
   ```
   Une seule publication, donc 15 crédits.

## Étape 5 — Devenir administrateur

1. Sur ton site en ligne, crée ton propre compte (page **Connexion**) et confirme ton e-mail.
2. Dans Supabase → **SQL Editor**, exécute (avec ton e-mail) :
   ```sql
   update public.profils set role = 'admin' where email = 'ton.email@exemple.com';
   ```
3. Reconnecte-toi : un lien **Admin** apparaît dans le menu, et seulement pour toi (adresse directe : `/admin`).

Les étudiants **ne voient jamais les paiements**. Ils effectuent et déclarent leur paiement, et le site leur dit seulement « paiement en cours de vérification ». Toutes les informations (montants, références, numéros, historique) sont dans ton espace admin, qui a deux onglets :
- **Paiements** : à vérifier, validés, refusés.
- **Étudiants** : rechercher un compte, voir son accès, consulter son historique, et **ajouter un accès** pour un paiement en espèces (payé en classe) ou un accès offert.

## Étape 6 — Tester avant d'annoncer

1. Avec un **deuxième compte** (autre e-mail), ouvre un chapitre premium : il doit être bloqué.
2. Envoie-toi 100 F par Wave (ou fais un vrai paiement de 3 000 F que tu te rembourses), puis déclare le paiement avec la vraie référence.
3. Dans **/admin**, vérifie le paiement dans ton application Wave, puis **Valider** → **Confirmer**.
4. Avec le compte étudiant, recharge la page : l'accès Premium est actif et le chapitre premium s'ouvre.
5. Teste aussi le code **IDA3** avec un troisième compte, ainsi que « Mot de passe oublié ».

## Ta routine au quotidien

- Ouvre **/admin** une à trois fois par jour. Le compteur « à vérifier » montre les paiements en attente.
- Pour chaque paiement, ouvre ton application (Wave, Orange Money…) et vérifie **le montant** et **la référence**. Ensuite, clique **Valider**, ou **Refuser** avec un motif.
- Le bouton WhatsApp de la page Abonnement permet à l'étudiant de te prévenir : tu peux valider tout de suite.
- Une même référence ne peut pas être déclarée deux fois : le serveur la refuse automatiquement.

## Changer les prix ou le code d'essai

Dans Supabase → **Table Editor** :
- table **tarifs** : modifie `prix` ou `jours`, ou décoche `actif` pour masquer une formule. Le site affiche les nouveaux prix immédiatement.
- table **parametres** : `code_essai` (aujourd'hui `IDA3`) et `jours_essai` (aujourd'hui `3`).

## Ajouter du contenu

- **Chapitre gratuit** (les 2 premiers de chaque matière) : comme aujourd'hui, ajoute le fichier dans `src/data/…` et branche-le dans `src/data/matieres.ts`, puis `git push`.
- **Chapitre premium** :
  1. Écris le fichier du chapitre, puis ajoute-le dans `src/data/premium/chapitres.ts`.
  2. Lance `npm run premium`. Ça met à jour `supabase/contenu_premium.sql` et la liste des titres.
  3. Exécute `supabase/contenu_premium.sql` dans le SQL Editor de Supabase.
  4. `git push` pour publier les titres sur le site.

  Le contenu premium n'est **jamais** dans le site public : il n'est téléchargé que par les comptes qui ont un accès en cours.

## Plus tard : le paiement automatique Djamo

L'API de Djamo permet de payer automatiquement, mais **seulement depuis un compte Djamo** (Mobile Money est annoncé « bientôt »). Il faut aussi une entreprise enregistrée (**RCCM**, attestation fiscale, justificatif d'adresse). Quand tu les as :

1. Écris à Djamo Business pour demander l'accès à l'API. Tu recevras des clés de test (*staging*), puis de production : `ACCESS_TOKEN`, `SECRET_KEY`, `COMPANY_ID` et l'adresse de l'API.
2. Installe les fonctions du serveur (depuis le dossier du projet) :
   ```bash
   npx supabase login
   npx supabase link --project-ref TON-REF-PROJET
   npx supabase functions deploy djamo-paiement
   npx supabase functions deploy djamo-webhook --no-verify-jwt
   npx supabase secrets set DJAMO_BASE_URL=... DJAMO_ACCESS_TOKEN=at_... DJAMO_COMPANY_ID=... DJAMO_WEBHOOK_SECRET=... SITE_URL=https://idacademy.netlify.app
   ```
3. Enregistre le webhook chez Djamo (topic `charge/events`, URL `https://TON-REF-PROJET.supabase.co/functions/v1/djamo-webhook`).
4. Dans Netlify, ajoute la variable `VITE_DJAMO_AUTO=1` et redéploie. Le bouton « Payer avec Djamo » apparaît : l'accès s'active seul dès que Djamo confirme.

La signature de chaque notification de Djamo est vérifiée (HMAC-SHA256) : personne ne peut se donner un accès en imitant Djamo.

## Quand passer aux offres payantes ?

- **Supabase Pro (25 $ par mois)** : quand la base approche de 500 Mo, ou pour ne plus jamais risquer la mise en pause. Ça ajoute aussi les sauvegardes quotidiennes, très utiles une fois que des étudiants ont payé.
- **Netlify Personal (9 $ par mois, 1 000 crédits)** : dès que ta consommation dépasse environ 200 crédits par mois (Team settings → Usage & billing). Sur l'offre gratuite, un dépassement met le site en pause jusqu'au mois suivant.

## Vérifier la sécurité après une modification de la base

```bash
npm run test:base
```
Ce test lance PostgreSQL sur ton ordinateur et vérifie 57 règles. Par exemple : un étudiant ne peut pas se donner l'accès Premium, ne voit aucun paiement (même les siens), et ne peut pas lire le contenu premium sans abonnement.

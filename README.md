# IDAcademy

Plateforme web pour réussir le **BTS Informatique Développeur d'Application (IDA)** en Côte d'Ivoire : cours, exercices, éditeur de code dans le navigateur, sujets types d'examen et abonnement mensuel.

Version actuelle : **Version 2.0 – Prête pour la mise en ligne** (comptes, paiements et contenu premium protégés par le serveur Supabase).

👉 Pour mettre le site en ligne (Supabase + Netlify) : **[GUIDE-MISE-EN-LIGNE.md](GUIDE-MISE-EN-LIGNE.md)**. La configuration Netlify est dans `netlify.toml`.

## Lancer le projet

Il faut [Node.js](https://nodejs.org) version 20 ou plus.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site sur http://localhost:5173
npm run build    # prépare la version à mettre en ligne (dossier dist/)
npm run premium  # exporte les chapitres premium vers supabase/contenu_premium.sql
npm run test:base  # vérifie les règles de sécurité de la base (57 tests)
```

### Deux modes

- **Mode démo** (aucun fichier `.env`) : tout est simulé dans le navigateur. Pratique pour développer et montrer le site. Code d'essai : **IDA3**. Pour l'espace admin, connecte-toi avec une adresse qui commence par « admin » (ex. `admin@idacademy.ci`).
- **Mode production** (fichier `.env` rempli, voir `.env.exemple`) : vrais comptes avec mot de passe, paiements vérifiés par l'administrateur, contenu premium téléchargé seulement par les abonnés.

## Ce qui fonctionne

- Accueil avec reprise de la dernière leçon, série de jours, essai gratuit
- Catalogue des 21 matières du BTS IDA + 6 modules « Aller plus loin », avec recherche
- Page de chaque matière avec ses chapitres (2 gratuits, le reste en Premium)
- Leçons avec texte, code, mot du dictionnaire et mini-quiz corrigé
- Contenu rédigé (25 leçons), chacune avec résumé vidéo, cours détaillé, exercices d'application et sujets type BTS corrigés :
  - Algorithmique : chapitres 1 à 3 (variables, conditions, boucles)
  - Base de données : chapitres 1 et 2 (modèle relationnel, normalisation)
  - Méthodologie Merise : chapitres 1 et 2 (système d'information, dictionnaire des données)
  - Base de données (premium) : chapitres 5 et 6 (Requêtes SELECT, Jointures et regroupements)
  - Web : chapitres 1 et 2 (HTML, CSS)
- Terminal SQL intégré (SQLite dans le navigateur, base d'exemple « Scolarité ») : exemples exécutables dans les leçons et exercices corrigés automatiquement
- Résumés vidéo enrichis : chaque résumé se termine par 2 exemples concrets (situation réelle → solution → résultat) et un défi « À toi de jouer » avec temps de réflexion ; format vertical 9:16 sur téléphone
- Éditeur HTML / CSS avec aperçu en direct et vérification automatique de la page
- Diagrammes des flux Merise dessinés automatiquement
- Éditeur JavaScript et SQL qui exécute le code dans le navigateur, vérifie le résultat de l'exercice et arrête les boucles infinies
- Comptes : inscription avec confirmation par e-mail, connexion, mot de passe oublié, progression sauvegardée sur le serveur
- Abonnement : prix fixés par le serveur, paiement par Wave, Orange Money, MTN MoMo, Moov Money ou Djamo (déclaration de la référence, puis validation par l'admin), code d'essai unique par compte
- Espace admin (visible seulement par l'administrateur) : paiements à vérifier, validation ou refus avec motif, statistiques ; onglet Étudiants pour rechercher un compte, voir son historique et ajouter un accès (espèces ou offert)
- Les étudiants ne voient aucun paiement : ils paient et déclarent, le site leur indique seulement « en cours de vérification »
- Contenu premium **absent du site public** : téléchargé depuis le serveur seulement si l'accès est en cours
- Paiement automatique Djamo prêt (fonctions serveur + webhook signé), à activer quand les clés seront disponibles
- Conditions d'utilisation
- Design responsive : ordinateur et téléphone

## Résumés vidéo

Chaque leçon commence par un **résumé animé façon vidéo** (fichier `src/data/resumes-boucles.ts`) : les scènes s'enchaînent seules, le code s'exécute ligne par ligne, et le navigateur lit le texte à voix haute. Aucun fichier vidéo n'est hébergé : ça ne coûte rien et consomme très peu de données mobiles.

Pour ajouter **ta propre vidéo** enregistrée : mets-la sur YouTube en « non répertoriée », puis ajoute dans la leçon :

```ts
video: { youtubeId: 'ID_DE_LA_VIDEO', titre: 'La boucle Pour expliquée', duree: '6 min' },
```

L'identifiant est la partie après `v=` dans l'adresse YouTube.

## Organisation du code

```
src/
├── App.tsx                 Routes des pages
├── config.ts               Numéros de paiement, WhatsApp… (lus dans .env)
├── context/Session.tsx     Compte, essai, paiements, progression (démo ou serveur)
├── data/
│   ├── matieres.ts         Les matières et leurs chapitres
│   ├── algo/, bd/, merise/, web/   Le contenu des cours
│   ├── exemples/           Exemples et défis des résumés vidéo
│   ├── premium/            Chapitres premium (exportés vers le serveur)
│   └── types.ts            Structure des données
├── lib/
│   ├── supabase.ts         Connexion au serveur
│   ├── contenuPremium.ts   Téléchargement du contenu premium
│   ├── executerCode.ts     Exécution sécurisée du code (Web Worker)
│   └── executerSQL.ts      SQLite dans le navigateur
├── components/             Éléments réutilisables
└── pages/                  Une page par écran (dont Admin.tsx)

supabase/
├── migrations/             Tables, règles de sécurité et fonctions du serveur
├── contenu_premium.sql     Contenu premium à importer (généré)
├── functions/              Paiement automatique Djamo (création + webhook)
└── tests/                  Tests de sécurité de la base
```

## Sécurité

- Le navigateur ne décide jamais de l'accès : l'essai, les prix et l'activation de l'abonnement sont des fonctions du serveur, et les règles RLS empêchent chaque étudiant de lire ou de modifier les données des autres.
- Les chapitres premium ne sont pas dans le site public (vérifié à chaque build) : ils sont dans la table `contenu_premium`, lisible seulement avec un accès en cours.
- Une référence de transaction ne peut être déclarée qu'une fois ; les notifications Djamo sont vérifiées par signature HMAC-SHA256.

## Prochaines étapes

1. **Mise en ligne** : suivre [GUIDE-MISE-EN-LIGNE.md](GUIDE-MISE-EN-LIGNE.md).
2. **Contenu** : les chapitres gratuits des autres matières professionnelles (Langage C, Visual Basic, Système d'exploitation, Réseaux…).
3. **Préparation BTS** : sujets complets avec barème, mode examen, assistant IA, parrainage.

## Ajouter des exemples à un résumé vidéo

Les exemples et défis sont dans `src/data/exemples/` (un fichier par matière), rangés par slug de leçon.
Ils sont ajoutés automatiquement à la fin du résumé, et la durée affichée est recalculée.

- `exemple` : `titre`, `situation`, `langage`, `code` (lignes), `resultat` (lignes), `narration`
- `defi` : `question`, `code?`, `reponse`, `explication?`, `narration`, `narrationReponse?`

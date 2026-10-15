import type { Lecon } from '../types'

/*
 * Web — Chapitre 1 : HTML
 * Les blocs « html » affichent le code et la page côte à côte (aperçu en direct).
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'comment-fonctionne-le-web',
  titre: 'Comment fonctionne le web ? Ta première page HTML',
  duree: '25 min',
  objectifs: [
    'Comprendre le rôle du client, du serveur, de l\'URL et de HTTP',
    'Distinguer HTML, CSS, JavaScript et PHP',
    'Écrire des balises et des attributs correctement',
    'Construire la structure minimale d\'une page HTML',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Comment fonctionne le web ?', sousTitre: 'Le résumé en 2 minutes', narration: 'Comment fonctionne le web, et comment écrire ta première page HTML.' },
      {
        type: 'code',
        titre: 'Le voyage d\'une page web',
        lignes: ['1. Tu tapes une URL dans le navigateur', '2. Le navigateur envoie une requête HTTP', '3. Le serveur renvoie le fichier HTML', '4. Le navigateur affiche la page'],
        etapes: [
          { ligne: 0, variables: { client: 'navigateur' } },
          { ligne: 1, variables: { client: 'navigateur', requete: 'GET /index.html' }, note: 'Le client demande' },
          { ligne: 2, variables: { client: 'navigateur', reponse: 'HTML' }, note: 'Le serveur répond' },
          { ligne: 3, variables: { client: 'navigateur', reponse: 'HTML' }, sortie: 'Page affichée', note: 'Le navigateur dessine la page' },
        ],
        narration: "Quand tu tapes une adresse, ton navigateur, le client, envoie une requête HTTP au serveur. Le serveur renvoie un fichier HTML, et le navigateur l'affiche.",
      },
      {
        type: 'comparaison',
        titre: 'Les 3 langages du navigateur',
        colonnes: [
          { nom: 'HTML', texte: 'La structure et le contenu : titres, textes, images' },
          { nom: 'CSS', texte: 'La présentation : couleurs, tailles, mise en page' },
          { nom: 'JavaScript', texte: 'Le comportement : réagir aux clics, animer' },
        ],
        narration: "Trois langages travaillent ensemble : HTML pour le contenu, CSS pour la présentation, et JavaScript pour le comportement.",
      },
      {
        type: 'points',
        titre: 'Une balise',
        points: ['<p>Bonjour</p>', 'Ouvrante, contenu, fermante', '<img src="logo.png" alt="Logo">', 'Attributs : nom="valeur"'],
        narration: "Le HTML utilise des balises : une balise ouvrante, le contenu, puis une balise fermante. Les attributs donnent des informations en plus, sous la forme nom égal valeur.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Ce qui se passe quand tu ouvres un site' },
    {
      type: 'texte',
      contenu:
        "Quand tu tapes une adresse comme `https://www.jumia.ci` dans ton navigateur, ton téléphone ne « contient » pas le site. Il le **demande** à un ordinateur distant, le **serveur**, qui lui **renvoie** la page. Le web fonctionne donc sur le modèle **client / serveur**.",
    },
    {
      type: 'tableau',
      entetes: ['Élément', 'Rôle', 'Exemple'],
      lignes: [
        ['Client', 'Le programme qui demande et affiche les pages', 'Chrome, Firefox, Safari sur ton téléphone ou ton PC'],
        ['Serveur', 'L\'ordinateur qui stocke le site et répond aux demandes', 'Un serveur chez un hébergeur (Vercel, OVH…)'],
        ['URL', 'L\'adresse d\'une page', 'https://www.exemple.ci/cours/html.html'],
        ['HTTP / HTTPS', 'Le protocole (les règles de dialogue) entre client et serveur. Le S signifie que l\'échange est chiffré', 'Requête GET pour demander une page'],
        ['Nom de domaine', 'Le nom lisible du site, traduit en adresse IP', 'exemple.ci'],
      ],
    },
    {
      type: 'liste',
      numerotee: true,
      elements: [
        'Tu tapes l\'**URL** ou tu cliques sur un lien.',
        'Le navigateur envoie une **requête HTTP** au serveur : « donne-moi la page /cours/html.html ».',
        'Le serveur renvoie une **réponse** contenant le fichier **HTML** (et ensuite les images, le CSS…).',
        'Le navigateur **lit** le HTML et **dessine** la page à l\'écran.',
      ],
    },

    { type: 'titre', contenu: '2. HTML, CSS, JavaScript… et PHP' },
    {
      type: 'tableau',
      entetes: ['Langage', 'Rôle', 'S\'exécute', 'Comparaison avec une maison'],
      lignes: [
        ['HTML', 'Structure et contenu : titres, paragraphes, images, liens', 'Dans le navigateur', 'Les murs et les pièces'],
        ['CSS', 'Présentation : couleurs, polices, tailles, mise en page', 'Dans le navigateur', 'La peinture et la décoration'],
        ['JavaScript', 'Comportement : réagir aux clics, vérifier un formulaire, animer', 'Dans le navigateur', 'L\'électricité : les interrupteurs, les lampes'],
        ['PHP (ou Node.js…)', 'Préparer les pages sur le serveur, lire la base de données', 'Sur le serveur', 'La cuisine : on prépare avant de servir'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'HTML n\'est pas un langage de programmation',
      contenu:
        "HTML est un **langage de balisage** : il décrit le contenu (« ceci est un titre, ceci est une liste »), mais il ne fait ni calcul, ni condition, ni boucle. Pour programmer, on utilise JavaScript ou PHP. C'est une question classique d'examen.",
    },

    { type: 'titre', contenu: '3. Balises, éléments et attributs' },
    {
      type: 'texte',
      contenu:
        "Le HTML est fait de **balises** entre chevrons `< >`. La plupart vont par deux : une balise **ouvrante** `<p>` et une balise **fermante** `</p>` (avec une barre oblique). L'ensemble balise ouvrante + contenu + balise fermante forme un **élément**.",
    },
    {
      type: 'code',
      langage: 'html',
      code: `<p>Ceci est un paragraphe.</p>

<!-- Un attribut donne une information en plus : nom="valeur" -->
<a href="https://www.education.gouv.ci">Site du ministère</a>

<!-- Certaines balises n'ont pas de fermante : on les appelle « orphelines » -->
<img src="logo.png" alt="Logo de l'école">
<br>`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les balises s\'emboîtent comme des boîtes',
      contenu:
        "La dernière balise ouverte doit être la première fermée. `<p>Texte <strong>important</p></strong>` est **faux**. Il faut écrire `<p>Texte <strong>important</strong></p>`. Indente ton code (décale les balises qui sont à l'intérieur d'autres) pour éviter ces erreurs.",
    },

    { type: 'titre', contenu: '4. La structure d\'une page HTML' },
    {
      type: 'texte',
      contenu: 'Toute page HTML suit la même structure de base. Modifie le texte à gauche : la page se met à jour à droite.',
    },
    {
      type: 'html',
      titre: 'La structure minimale',
      hauteur: 330,
      code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma première page</title>
</head>
<body>
  <h1>Bienvenue sur ma page</h1>
  <p>Je suis étudiant en BTS IDA à Abidjan.</p>
</body>
</html>`,
    },
    {
      type: 'tableau',
      titre: 'Explication ligne par ligne',
      entetes: ['Code', 'Rôle'],
      lignes: [
        ['<!DOCTYPE html>', 'Indique au navigateur que c\'est une page HTML5 (la version actuelle)'],
        ['<html lang="fr">', 'Début de la page ; lang="fr" indique la langue (utile pour Google et les lecteurs d\'écran)'],
        ['<head> … </head>', 'L\'en-tête : des informations SUR la page, qui ne s\'affichent pas dedans'],
        ['<meta charset="UTF-8">', 'L\'encodage des caractères : indispensable pour afficher correctement é, è, à, ç'],
        ['<title> … </title>', 'Le titre affiché dans l\'onglet du navigateur et dans les résultats de Google'],
        ['<body> … </body>', 'Le corps : TOUT ce qui s\'affiche dans la page'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Pour travailler sur ton ordinateur',
      elements: [
        'Installe un éditeur de code gratuit : **Visual Studio Code**.',
        'Crée un fichier nommé `index.html` et colle-y la structure ci-dessus.',
        'Double-clique sur le fichier : il s\'ouvre dans ton navigateur. Après chaque modification, enregistre et actualise la page (F5).',
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Le **client** (navigateur) demande la page au **serveur** avec le protocole **HTTP(S)**.',
        '**HTML** = contenu, **CSS** = présentation, **JavaScript** = comportement ; **PHP** s\'exécute sur le serveur.',
        'Une balise ouvrante `<p>` se ferme par `</p>` ; les attributs s\'écrivent `nom="valeur"`.',
        'Structure : `<!DOCTYPE html>`, `<html>`, `<head>` (meta, title), `<body>` (le contenu visible).',
      ],
    },
    {
      type: 'quiz',
      question: 'Où faut-il écrire un titre h1 pour qu\'il s\'affiche dans la page ?',
      options: ['Dans <head>', 'Dans <body>', 'Dans <title>'],
      bonneReponse: 1,
      explication: 'Tout ce qui s\'affiche dans la page va dans <body>. Le <head> contient des informations sur la page (titre de l\'onglet, encodage…).',
    },
    {
      type: 'quiz',
      question: 'Quel langage s\'exécute sur le serveur ?',
      options: ['CSS', 'HTML', 'PHP'],
      bonneReponse: 2,
      explication: 'PHP s\'exécute sur le serveur, qui renvoie ensuite du HTML au navigateur. HTML et CSS sont interprétés par le navigateur.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : corriger l\'imbrication',
      enonce: "Le code suivant contient des erreurs d'imbrication et de fermeture. Corrige-le.\n\n<html>\n<body>\n<h1>Mon école</h1>\n<p>Bienvenue à <strong>l'EPCCI</p></strong>\n<p>Inscriptions ouvertes\n</html>\n</body>",
      langage: 'html',
      solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon école</title>
</head>
<body>
  <h1>Mon école</h1>
  <p>Bienvenue à <strong>l'EPCCI</strong></p>
  <p>Inscriptions ouvertes</p>
</body>
</html>`,
      explication:
        "Trois erreurs : strong doit être fermé avant p ; le deuxième paragraphe n'est pas fermé ; body doit être fermé avant html. On a aussi ajouté ce qui manquait à la structure : DOCTYPE, head, meta charset et title.",
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : vocabulaire',
      enonce: 'Dans la ligne suivante, identifie la balise, l\'attribut, la valeur de l\'attribut et le contenu.\n\n<a href="https://www.idacademy.ci">Mon site de révision</a>',
      langage: 'texte',
      solution: `- Balise : a (balise ouvrante <a …>, balise fermante </a>)
- Attribut : href
- Valeur de l'attribut : https://www.idacademy.ci
- Contenu : Mon site de révision (le texte cliquable)`,
      explication: 'L\'ensemble <a …>…</a> est un élément « lien ». href (hypertext reference) indique où mène le lien.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Questions de cours sur le web',
      enonce: 'Réponds de façon précise.',
      questions: [
        'Explique le fonctionnement client / serveur lors de l\'affichage d\'une page web.',
        'Que signifient HTML, CSS et HTTP ? Donne le rôle de chacun.',
        'Quelle est la différence entre HTTP et HTTPS ?',
        'Écris la structure minimale d\'une page HTML5 dont le titre d\'onglet est « Accueil » et qui affiche le titre principal « Bienvenue ».',
        'Quelle est la différence entre <head> et <body> ?',
      ],
      langage: 'texte',
      solution: `1. Le client (navigateur) envoie une requête HTTP au serveur pour demander
   une page à une URL donnée. Le serveur traite la demande et renvoie une
   réponse contenant le code HTML. Le navigateur interprète ce code et
   affiche la page.

2. - HTML (HyperText Markup Language) : langage de balisage qui décrit
     la structure et le contenu de la page.
   - CSS (Cascading Style Sheets) : feuilles de style qui décrivent la
     présentation (couleurs, polices, mise en page).
   - HTTP (HyperText Transfer Protocol) : protocole de communication entre
     le client et le serveur.

3. HTTPS est la version sécurisée de HTTP : les échanges sont chiffrés,
   ce qui protège les mots de passe et les paiements.

4. <!DOCTYPE html>
   <html lang="fr">
   <head>
     <meta charset="UTF-8">
     <title>Accueil</title>
   </head>
   <body>
     <h1>Bienvenue</h1>
   </body>
   </html>

5. <head> contient des informations sur la page (encodage, titre de l'onglet,
   liens vers le CSS) qui ne s'affichent pas dans la page ; <body> contient
   tout le contenu visible.`,
      explication: 'Apprends par cœur la signification des sigles : HyperText Markup Language, Cascading Style Sheets, HyperText Transfer Protocol. Ce sont des points faciles.',
    },
  ],
  exercice: {
    id: 'web-premiere-page',
    titre: 'Ta première page',
    consigne:
      'Complète la page : ajoute lang="fr" à la balise html, le titre d\'onglet « Ma première page », un titre h1 « Bienvenue sur ma page » et un paragraphe qui te présente.',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

</body>
</html>
`,
    verifications: [
      { description: 'La balise html a l\'attribut lang="fr"', selecteur: 'html', attribut: ['lang', 'fr'] },
      { description: 'Le titre d\'onglet est « Ma première page »', selecteur: 'title', texte: 'Ma première page' },
      { description: 'Un titre h1 contient « Bienvenue sur ma page »', selecteur: 'body h1', texte: 'Bienvenue sur ma page' },
      { description: 'La page contient un paragraphe (p)', selecteur: 'body p' },
    ],
    indice: 'Le paragraphe s\'écrit <p>Je m\'appelle…</p>, sous le <h1>, à l\'intérieur de <body>.',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma première page</title>
</head>
<body>
  <h1>Bienvenue sur ma page</h1>
  <p>Je m'appelle Awa et je prépare mon BTS IDA.</p>
</body>
</html>
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'textes-listes-liens-images',
  titre: 'Titres, textes, listes, liens et images',
  duree: '30 min',
  objectifs: [
    'Organiser une page avec des titres h1 à h6',
    'Écrire des paragraphes et mettre en valeur du texte',
    'Créer des listes à puces et numérotées',
    'Insérer des liens et des images',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les balises de contenu', sousTitre: 'Le résumé en 2 minutes', narration: 'Titres, textes, listes, liens et images : les balises de contenu essentielles.' },
      {
        type: 'points',
        titre: 'Titres et textes',
        points: ['<h1> à <h6> : titres, du plus au moins important', 'Un seul <h1> par page', '<p> : paragraphe', '<strong> important · <em> accentué'],
        narration: "Les titres vont de h1, le plus important, à h6. Utilise un seul h1 par page. Les paragraphes s'écrivent avec p, et strong et em mettent du texte en valeur.",
      },
      {
        type: 'comparaison',
        titre: 'Deux sortes de listes',
        colonnes: [
          { nom: '<ul>', texte: 'Liste à puces (l\'ordre ne compte pas)' },
          { nom: '<ol>', texte: 'Liste numérotée (l\'ordre compte)' },
        ],
        narration: "Une liste à puces s'écrit avec ul, une liste numérotée avec ol. Dans les deux cas, chaque élément est un li.",
      },
      {
        type: 'points',
        titre: 'Liens et images',
        points: ['<a href="page.html">Texte</a>', 'tel: et mailto: pour appeler ou écrire', '<img src="photo.jpg" alt="Description">', 'L\'attribut alt est obligatoire'],
        narration: "Un lien s'écrit avec a et l'attribut href. Une image avec img, src et alt. Le texte alternatif alt est obligatoire : il décrit l'image si elle ne s'affiche pas.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Les titres : h1 à h6' },
    {
      type: 'texte',
      contenu:
        "HTML propose six niveaux de titres, de `<h1>` (le plus important) à `<h6>`. Ils servent à **organiser** le contenu, comme le plan d'un devoir : un titre principal, des parties, des sous-parties. Google les utilise pour comprendre de quoi parle la page.",
    },
    {
      type: 'html',
      titre: 'La hiérarchie des titres',
      hauteur: 300,
      code: `<h1>Cours d'algorithmique</h1>
<h2>Chapitre 1 : Les variables</h2>
<h3>1. Les types</h3>
<h3>2. L'affectation</h3>
<h2>Chapitre 2 : Les conditions</h2>
<h3>1. Si … Alors</h3>`,
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les titres ne servent pas à grossir le texte',
      contenu:
        "Ne choisis pas un `<h3>` parce qu'il a « la bonne taille » : la taille se règle en CSS. Choisis le niveau selon l'**importance** dans le plan. Une page a **un seul h1**, et on ne saute pas de niveau (pas de h4 directement sous un h2).",
    },

    { type: 'titre', contenu: '2. Paragraphes et mise en valeur' },
    {
      type: 'tableau',
      entetes: ['Balise', 'Rôle', 'Affichage par défaut'],
      lignes: [
        ['<p>', 'Un paragraphe', 'Un bloc de texte avec un espace avant et après'],
        ['<br>', 'Un retour à la ligne (orpheline)', 'Passe à la ligne sans créer de paragraphe'],
        ['<strong>', 'Texte important', 'Gras'],
        ['<em>', 'Texte accentué (on insiste dessus)', 'Italique'],
        ['<!-- … -->', 'Commentaire : n\'est pas affiché', 'Rien'],
      ],
    },
    {
      type: 'html',
      titre: 'Paragraphes et mise en valeur',
      hauteur: 200,
      code: `<p>Les inscriptions en BTS IDA sont <strong>ouvertes jusqu'au 30 octobre</strong>.</p>
<p>Pièces à fournir : copie du bac, <em>deux</em> photos d'identité.<br>
Contact : scolarité, bâtiment A.</p>
<!-- Ce commentaire n'apparaît pas dans la page -->`,
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Les espaces et retours à la ligne sont ignorés',
      contenu:
        "Dans le code HTML, plusieurs espaces ou retours à la ligne s'affichent comme **un seul espace**. Pour changer de ligne, il faut une balise : `<p>` pour un nouveau paragraphe, `<br>` pour un simple retour à la ligne.",
    },

    { type: 'titre', contenu: '3. Les listes' },
    {
      type: 'html',
      titre: 'Listes à puces, numérotées et imbriquées',
      hauteur: 320,
      code: `<h2>Fournitures</h2>
<ul>
  <li>Cahier de 200 pages</li>
  <li>Clé USB</li>
  <li>Calculatrice</li>
</ul>

<h2>Étapes de l'inscription</h2>
<ol>
  <li>Déposer le dossier</li>
  <li>Payer les frais
    <ul>
      <li>à la banque</li>
      <li>ou par Mobile Money</li>
    </ul>
  </li>
  <li>Retirer la carte d'étudiant</li>
</ol>`,
      legende: 'Une sous-liste se place **à l\'intérieur** d\'un `<li>`, pas directement dans `<ul>` ou `<ol>`.',
    },

    { type: 'titre', contenu: '4. Les liens' },
    {
      type: 'texte',
      contenu:
        "Un lien s'écrit avec la balise `<a>` et l'attribut **`href`** qui indique la destination. Le texte entre les balises est ce qui est cliquable.",
    },
    {
      type: 'tableau',
      entetes: ['Type de lien', 'Exemple de href', 'Effet'],
      lignes: [
        ['Absolu (autre site)', 'https://www.education.gouv.ci', 'Ouvre un autre site'],
        ['Relatif (même site)', 'contact.html ou cours/html.html', 'Ouvre une autre page du même site'],
        ['Dossier parent', '../index.html', 'Remonte d\'un dossier'],
        ['Téléphone', 'tel:+2250707070707', 'Lance un appel sur téléphone'],
        ['E-mail', 'mailto:contact@exemple.ci', 'Ouvre l\'application de messagerie'],
        ['Ancre (même page)', '#tarifs', 'Descend jusqu\'à l\'élément id="tarifs"'],
      ],
    },
    {
      type: 'code',
      langage: 'html',
      code: `<a href="https://www.education.gouv.ci" target="_blank">Ministère (nouvel onglet)</a>
<a href="tel:+2250707070707">Appeler la scolarité</a>
<a href="https://wa.me/2250707070707">Nous écrire sur WhatsApp</a>`,
      legende: '`target="_blank"` ouvre le lien dans un nouvel onglet. Les liens `tel:` et WhatsApp sont très utiles pour les sites ivoiriens, consultés surtout sur téléphone.',
    },

    { type: 'titre', contenu: '5. Les images' },
    {
      type: 'code',
      langage: 'html',
      code: `<img src="images/campus.jpg" alt="Le campus de l'école à Cocody" width="400">`,
    },
    {
      type: 'tableau',
      entetes: ['Attribut', 'Rôle'],
      lignes: [
        ['src', 'Le chemin ou l\'adresse du fichier image (obligatoire)'],
        ['alt', 'Texte alternatif : décrit l\'image si elle ne charge pas, et pour les personnes aveugles (obligatoire)'],
        ['width / height', 'Largeur / hauteur en pixels (facultatif, souvent réglé en CSS)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les chemins relatifs',
      contenu:
        "`src=\"images/campus.jpg\"` signifie : « dans le dossier images, qui est à côté de la page ». Si l'image ne s'affiche pas, c'est presque toujours un chemin faux, une faute dans le nom du fichier, ou une majuscule oubliée (`Campus.JPG` n'est pas `campus.jpg` sur un serveur).",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Allège tes images',
      contenu:
        "En Côte d'Ivoire, beaucoup de visiteurs naviguent avec des données mobiles limitées. Une photo de 5 Mo coûte cher à charger. Redimensionne et compresse tes images (format JPG ou WebP, moins de 200 Ko) avant de les mettre sur un site.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Titres `<h1>` à `<h6>` selon l\'importance ; **un seul h1** par page.',
        '`<p>` paragraphe, `<br>` retour à la ligne, `<strong>` important, `<em>` accentué.',
        '`<ul>` liste à puces, `<ol>` liste numérotée, chaque élément dans un `<li>`.',
        '`<a href="…">` pour un lien ; `<img src="…" alt="…">` pour une image, **alt obligatoire**.',
      ],
    },
    {
      type: 'quiz',
      question: 'Pour afficher les étapes d\'une recette, dans l\'ordre, quelle balise de liste utiliser ?',
      options: ['<ul>', '<ol>', '<li>'],
      bonneReponse: 1,
      explication: 'L\'ordre des étapes compte : on utilise une liste numérotée <ol>. Chaque étape est ensuite un <li>.',
    },
    {
      type: 'quiz',
      question: 'Quel attribut d\'une image est lu par les lecteurs d\'écran des personnes aveugles ?',
      options: ['src', 'alt', 'width'],
      bonneReponse: 1,
      explication: 'alt contient un texte qui décrit l\'image. Il est aussi affiché si l\'image ne se charge pas.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : la fiche d\'un produit',
      enonce:
        "Écris le code HTML (contenu du body seulement) de la fiche d'un téléphone vendu en ligne : un titre principal avec le nom du produit, une image (fichier « tecno.jpg »), un paragraphe avec le prix en gras, une liste à puces de 3 caractéristiques, et un lien « Commander sur WhatsApp ».",
      langage: 'html',
      solution: `<h1>Tecno Spark 20</h1>
<img src="tecno.jpg" alt="Téléphone Tecno Spark 20, coloris noir" width="300">
<p>Prix : <strong>85 000 F CFA</strong></p>
<ul>
  <li>Écran de 6,6 pouces</li>
  <li>128 Go de stockage</li>
  <li>Batterie de 5000 mAh</li>
</ul>
<a href="https://wa.me/2250707070707">Commander sur WhatsApp</a>`,
      explication: 'Le alt décrit vraiment l\'image (pas seulement « image »). Le prix est mis en valeur avec strong parce qu\'il est important, pas seulement pour le gras.',
    },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 2 : trouve les erreurs',
      enonce: 'Ce code contient 4 erreurs. Trouve-les.\n\n<h1>Mon CV</h1>\n<h1>Formation</h1>\n<ul>\n  <li>BTS IDA</li>\n  <ul><li>EPCCI, 2025-2027</li></ul>\n</ul>\n<img src="photo.jpg">\n<a>Mon portfolio</a>',
      langage: 'texte',
      solution: `1. Deux h1 dans la page : « Formation » doit être un h2.
2. La sous-liste <ul> est placée directement dans <ul> : elle doit être
   à l'intérieur du <li> « BTS IDA ».
3. L'image n'a pas d'attribut alt.
4. Le lien n'a pas d'attribut href : il ne mène nulle part.

Correction :
<h1>Mon CV</h1>
<h2>Formation</h2>
<ul>
  <li>BTS IDA
    <ul><li>EPCCI, 2025-2027</li></ul>
  </li>
</ul>
<img src="photo.jpg" alt="Photo de profil">
<a href="https://github.com/moncompte">Mon portfolio</a>`,
      explication: 'Ces erreurs n\'empêchent pas forcément la page de s\'afficher, mais elles la rendent incorrecte : les navigateurs « devinent », les correcteurs non.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La page de présentation d\'un cybercafé',
      enonce:
        "Le cybercafé « Clic Net » de Yopougon veut une page web simple. Elle doit contenir : le nom du cybercafé comme titre principal ; une photo de la salle (« salle.jpg ») ; une partie « Nos services » avec une liste à puces (navigation internet, impression, saisie de documents, scan) ; une partie « Comment nous trouver » avec l'adresse dans un paragraphe ; une partie « Contact » avec un lien pour appeler le 07 07 12 34 56 et un lien vers la page « tarifs.html ».",
      questions: [
        'Écris le code HTML complet de la page (avec la structure de base).',
        'Pourquoi utilise-t-on h2 pour « Nos services » et non h1 ?',
        'Quelle est la différence entre le lien vers tarifs.html et le lien vers https://www.google.com ?',
      ],
      langage: 'html',
      solution: `<!-- 1. -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Clic Net - Cybercafé à Yopougon</title>
</head>
<body>
  <h1>Cybercafé Clic Net</h1>
  <img src="salle.jpg" alt="La salle du cybercafé Clic Net avec ses ordinateurs">

  <h2>Nos services</h2>
  <ul>
    <li>Navigation internet</li>
    <li>Impression</li>
    <li>Saisie de documents</li>
    <li>Scan</li>
  </ul>

  <h2>Comment nous trouver</h2>
  <p>Yopougon Siporex, en face de la pharmacie, Abidjan.</p>

  <h2>Contact</h2>
  <p>
    <a href="tel:+2250707123456">Appeler le 07 07 12 34 56</a><br>
    <a href="tarifs.html">Voir nos tarifs</a>
  </p>
</body>
</html>

<!--
2. Le h1 est réservé au titre principal de la page (le nom du cybercafé),
   unique. Les parties de la page sont des titres de niveau inférieur (h2).

3. tarifs.html est un lien relatif : une autre page du même site, dans le
   même dossier. https://www.google.com est un lien absolu vers un autre site.
-->`,
      explication: 'Le correcteur vérifie : la structure de base, un seul h1, des h2 pour les parties, une vraie liste ul/li, le alt de l\'image et les deux types de liens (tel: et relatif).',
    },
  ],
  exercice: {
    id: 'web-mini-cv',
    titre: 'Ton mini CV',
    consigne:
      'Crée un mini CV : un h1 avec ton nom, un h2 « Compétences » suivi d\'une liste à puces d\'au moins 3 compétences, une image avec un texte alternatif, et un lien (avec href) vers ton portfolio.',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon CV</title>
</head>
<body>
  <!-- Écris ton CV ici -->

</body>
</html>
`,
    verifications: [
      { description: 'Un titre h1 (ton nom)', selecteur: 'h1' },
      { description: 'Un titre h2 « Compétences »', selecteur: 'h2', texte: 'Compétences' },
      { description: 'Une liste à puces d\'au moins 3 éléments', selecteur: 'ul > li', min: 3 },
      { description: 'Une image avec un attribut alt', selecteur: 'img[alt]:not([alt=""])' },
      { description: 'Un lien avec un attribut href', selecteur: 'a[href]:not([href=""])' },
    ],
    indice: 'Pour la liste : <ul> puis une ligne <li>…</li> par compétence. Pour l\'image : <img src="photo.jpg" alt="Ma photo">.',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon CV</title>
</head>
<body>
  <h1>Awa Koné</h1>
  <img src="photo.jpg" alt="Photo d'Awa Koné" width="120">
  <h2>Compétences</h2>
  <ul>
    <li>Algorithmique</li>
    <li>HTML et CSS</li>
    <li>SQL</li>
  </ul>
  <a href="https://github.com/awakone">Mon portfolio</a>
</body>
</html>
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'tableaux-et-structure',
  titre: 'Les tableaux et la structure d\'une page',
  duree: '30 min',
  objectifs: [
    'Construire un tableau avec en-têtes, lignes et cellules',
    'Fusionner des cellules',
    'Structurer une page avec les balises sémantiques',
    'Savoir quand utiliser div et span',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Tableaux et structure', sousTitre: 'Le résumé en 2 minutes', narration: 'Les tableaux et la structure d\'une page, en deux minutes.' },
      {
        type: 'code',
        titre: 'Un tableau',
        lignes: ['<table>', '  <tr><th>Produit</th><th>Prix</th></tr>', '  <tr><td>Attiéké</td><td>500 F</td></tr>', '</table>'],
        etapes: [
          { ligne: 0, variables: { balise: 'table' }, note: 'Le tableau' },
          { ligne: 1, variables: { balise: 'tr + th' }, note: 'tr = une ligne, th = cellule d\'en-tête' },
          { ligne: 2, variables: { balise: 'tr + td' }, note: 'td = cellule de données' },
        ],
        narration: "Un tableau s'écrit avec table. Chaque ligne est un tr. Les cellules d'en-tête sont des th, et les cellules de données des td.",
      },
      {
        type: 'points',
        titre: 'La structure d\'une page',
        points: ['<header> : en-tête du site', '<nav> : menu de navigation', '<main> : contenu principal', '<footer> : pied de page'],
        narration: "Pour structurer une page, on utilise des balises qui ont un sens : header pour l'en-tête, nav pour le menu, main pour le contenu principal et footer pour le pied de page.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Les tableaux' },
    {
      type: 'texte',
      contenu:
        "Un tableau sert à présenter des **données en lignes et en colonnes** : des tarifs, un emploi du temps, des résultats. Il se construit **ligne par ligne**.",
    },
    {
      type: 'tableau',
      entetes: ['Balise', 'Signification'],
      lignes: [
        ['<table>', 'Le tableau entier'],
        ['<caption>', 'La légende (le titre) du tableau'],
        ['<thead> / <tbody>', 'La partie en-tête / la partie données (facultatives mais recommandées)'],
        ['<tr>', 'Une ligne (table row)'],
        ['<th>', 'Une cellule d\'en-tête (table header) : en gras et centrée par défaut'],
        ['<td>', 'Une cellule de données (table data)'],
      ],
    },
    {
      type: 'html',
      titre: 'Le menu d\'un maquis',
      hauteur: 280,
      code: `<table border="1">
  <caption>Menu du jour</caption>
  <thead>
    <tr>
      <th>Plat</th>
      <th>Prix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Attiéké poisson</td>
      <td>2 000 F</td>
    </tr>
    <tr>
      <td>Garba</td>
      <td>1 000 F</td>
    </tr>
    <tr>
      <td>Foutou sauce graine</td>
      <td>2 500 F</td>
    </tr>
  </tbody>
</table>`,
      legende: '`border="1"` affiche les bordures pour bien voir le tableau ; en pratique on les règle en CSS. Ajoute une ligne pour l\'alloco à 500 F.',
    },
    {
      type: 'texte',
      contenu:
        "Pour **fusionner** des cellules, on utilise `colspan` (une cellule s'étend sur plusieurs **colonnes**) et `rowspan` (sur plusieurs **lignes**).",
    },
    {
      type: 'html',
      titre: 'Fusion de cellules : un emploi du temps',
      hauteur: 220,
      code: `<table border="1">
  <tr>
    <th>Heure</th>
    <th>Lundi</th>
    <th>Mardi</th>
  </tr>
  <tr>
    <td>8 h - 10 h</td>
    <td rowspan="2">Algorithmique</td>
    <td>Anglais</td>
  </tr>
  <tr>
    <td>10 h - 12 h</td>
    <td>Merise</td>
  </tr>
  <tr>
    <td>14 h - 16 h</td>
    <td colspan="2">Projet (toute la classe)</td>
  </tr>
</table>`,
      legende: 'L\'algorithmique occupe deux créneaux (rowspan="2") : la ligne suivante n\'a donc que 2 cellules. Le projet occupe deux jours (colspan="2").',
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les tableaux ne servent pas à la mise en page',
      contenu:
        "Autrefois, on utilisait des tableaux pour placer les éléments d'une page (menu à gauche, contenu à droite). C'est **à éviter** : c'est le rôle du CSS. Un tableau ne sert qu'à afficher des **données tabulaires**.",
    },

    { type: 'titre', contenu: '2. La structure sémantique d\'une page' },
    {
      type: 'texte',
      contenu:
        "HTML5 propose des balises qui décrivent le **rôle** de chaque partie de la page. On dit qu'elles sont **sémantiques** (elles ont un sens). Elles aident Google, les lecteurs d'écran, et les développeurs qui lisent ton code.",
    },
    {
      type: 'tableau',
      entetes: ['Balise', 'Rôle', 'Exemple de contenu'],
      lignes: [
        ['<header>', 'En-tête de la page (ou d\'une section)', 'Logo, nom du site'],
        ['<nav>', 'Menu de navigation', 'Liens Accueil, Cours, Contact'],
        ['<main>', 'Contenu principal, unique dans la page', 'Le cœur de la page'],
        ['<section>', 'Une partie thématique, avec un titre', 'Nos services, Nos tarifs'],
        ['<article>', 'Un contenu autonome', 'Un article de blog, une fiche produit'],
        ['<aside>', 'Contenu secondaire, à côté', 'Publicité, liens utiles'],
        ['<footer>', 'Pied de page', 'Adresse, copyright, réseaux sociaux'],
      ],
    },
    {
      type: 'html',
      titre: 'Une page bien structurée',
      hauteur: 360,
      code: `<header>
  <h1>École Les Lauréats</h1>
  <nav>
    <a href="index.html">Accueil</a> |
    <a href="formations.html">Formations</a> |
    <a href="contact.html">Contact</a>
  </nav>
</header>

<main>
  <section>
    <h2>Nos formations</h2>
    <p>BTS IDA, BTS FCGE, BTS GEC.</p>
  </section>
  <section>
    <h2>Inscriptions</h2>
    <p>Ouvertes jusqu'au 30 octobre.</p>
  </section>
</main>

<footer>
  <p>Cocody, Abidjan — 27 22 00 00 00</p>
</footer>`,
      legende: 'Sans CSS, ces balises ne changent pas l\'apparence : elles organisent le contenu. La mise en forme viendra au chapitre CSS.',
    },

    { type: 'titre', contenu: '3. Les balises génériques : div et span' },
    {
      type: 'tableau',
      entetes: ['Balise', 'Type', 'Usage'],
      lignes: [
        ['<div>', 'Bloc (prend toute la largeur, passe à la ligne)', 'Regrouper des éléments pour la mise en page, quand aucune balise sémantique ne convient'],
        ['<span>', 'En ligne (reste dans le texte)', 'Cibler un morceau de texte pour le styler (ex. un prix en rouge)'],
      ],
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Sémantique d\'abord',
      contenu:
        "Avant d'écrire `<div>`, demande-toi si une balise sémantique existe : `<nav>` pour un menu, `<footer>` pour un pied de page… N'utilise `<div>` et `<span>` que quand aucune ne convient.",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Tableau : `<table>`, lignes `<tr>`, en-têtes `<th>`, données `<td>`, légende `<caption>`.',
        '`colspan` fusionne des colonnes, `rowspan` des lignes. Les tableaux ne servent pas à la mise en page.',
        'Structure sémantique : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.',
        '`<div>` (bloc) et `<span>` (en ligne) sont des conteneurs sans sens, en dernier recours.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle balise représente une cellule d\'en-tête dans un tableau ?',
      options: ['<td>', '<th>', '<tr>'],
      bonneReponse: 1,
      explication: '<th> (table header) est une cellule d\'en-tête ; <td> une cellule de données ; <tr> une ligne.',
    },
    {
      type: 'quiz',
      question: 'Le menu principal d\'un site doit être placé dans…',
      options: ['<footer>', '<nav>', '<aside>'],
      bonneReponse: 1,
      explication: '<nav> est la balise sémantique des blocs de navigation principaux.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : le tableau des notes',
      enonce:
        "Écris un tableau HTML avec la légende « Résultats du devoir », une ligne d'en-tête (Étudiant, Algorithmique, Base de données) et trois lignes de données de ton choix. Ajoute une dernière ligne : la première cellule contient « Moyenne de la classe », et la deuxième, qui contient la moyenne générale, s'étend sur les deux colonnes de notes.",
      langage: 'html',
      solution: `<table border="1">
  <caption>Résultats du devoir</caption>
  <thead>
    <tr>
      <th>Étudiant</th>
      <th>Algorithmique</th>
      <th>Base de données</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Koné Awa</td><td>15</td><td>13,5</td></tr>
    <tr><td>Traoré Moussa</td><td>9</td><td>11</td></tr>
    <tr><td>Kouassi Yao</td><td>17</td><td>16</td></tr>
    <tr>
      <th>Moyenne de la classe</th>
      <td colspan="2">13,6</td>
    </tr>
  </tbody>
</table>`,
      explication: 'colspan="2" sur la deuxième cellule de la dernière ligne la fait s\'étendre sur les deux colonnes de notes. La première cellule peut être un th, car elle sert d\'en-tête de ligne.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le site d\'une agence de voyages',
      enonce:
        "L'agence « Évasion CI » souhaite une page présentant ses circuits. La page doit comporter : un en-tête avec le nom de l'agence et un menu (Accueil, Circuits, Contact) ; un contenu principal avec une section « Nos circuits » contenant un tableau (Destination, Durée, Prix) de trois circuits : Assinie (2 jours, 45 000 F), Yamoussoukro (1 jour, 25 000 F), Parc de la Comoé (3 jours, 120 000 F) ; un pied de page avec le numéro de téléphone cliquable.",
      questions: [
        'Écris le code HTML complet de la page en utilisant les balises sémantiques adaptées.',
        'Justifie l\'emploi de <nav> et de <footer>.',
        'Ajoute au tableau une ligne finale « Réduction de 10 % pour les groupes de plus de 10 personnes » occupant toute la largeur.',
      ],
      langage: 'html',
      solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Évasion CI - Nos circuits</title>
</head>
<body>
  <header>
    <h1>Évasion CI</h1>
    <nav>
      <a href="index.html">Accueil</a>
      <a href="circuits.html">Circuits</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Nos circuits</h2>
      <table border="1">
        <caption>Circuits proposés</caption>
        <thead>
          <tr><th>Destination</th><th>Durée</th><th>Prix</th></tr>
        </thead>
        <tbody>
          <tr><td>Assinie</td><td>2 jours</td><td>45 000 F</td></tr>
          <tr><td>Yamoussoukro</td><td>1 jour</td><td>25 000 F</td></tr>
          <tr><td>Parc de la Comoé</td><td>3 jours</td><td>120 000 F</td></tr>
          <!-- 3. -->
          <tr><td colspan="3">Réduction de 10 % pour les groupes de plus de 10 personnes</td></tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>Contact : <a href="tel:+2250707070707">07 07 07 07 07</a></p>
  </footer>
</body>
</html>

<!--
2. <nav> indique au navigateur, aux moteurs de recherche et aux lecteurs
   d'écran que ce bloc est le menu de navigation principal. <footer>
   indique le pied de page (coordonnées, mentions). Ces balises donnent
   un sens à la structure, contrairement à <div>.
-->`,
      explication: 'Pour la question 3, colspan="3" car le tableau a trois colonnes. Les points se gagnent sur la structure sémantique (header, nav, main, section, footer), le tableau complet avec caption et th, et le lien tel:.',
    },
  ],
  exercice: {
    id: 'web-tableau-tarifs',
    titre: 'Le tableau des tarifs',
    consigne:
      'Crée le tableau des tarifs d\'un cybercafé : une légende (caption), une ligne d\'en-tête avec au moins 2 cellules th (Service, Prix), et au moins 3 lignes de données.',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Tarifs</title>
</head>
<body>
  <h1>Cybercafé Clic Net</h1>
  <!-- Ton tableau ici -->

</body>
</html>
`,
    verifications: [
      { description: 'La page contient un tableau (table)', selecteur: 'table' },
      { description: 'Le tableau a une légende (caption)', selecteur: 'table caption' },
      { description: 'Au moins 2 cellules d\'en-tête (th)', selecteur: 'table th', min: 2 },
      { description: 'Au moins 3 lignes contenant des cellules td', selecteur: 'table tr:has(td)', min: 3 },
    ],
    indice: 'Chaque ligne : <tr><td>Impression</td><td>100 F la page</td></tr>. La caption se place juste après <table>.',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Tarifs</title>
</head>
<body>
  <h1>Cybercafé Clic Net</h1>
  <table border="1">
    <caption>Nos tarifs</caption>
    <tr><th>Service</th><th>Prix</th></tr>
    <tr><td>Internet (1 heure)</td><td>300 F</td></tr>
    <tr><td>Impression (la page)</td><td>100 F</td></tr>
    <tr><td>Scan (la page)</td><td>150 F</td></tr>
  </table>
</body>
</html>
`,
  },
}

export const leconsHTML: Lecon[] = [lecon1, lecon2, lecon3]

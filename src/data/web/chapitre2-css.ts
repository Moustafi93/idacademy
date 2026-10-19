import type { Lecon } from '../types'

/*
 * Web — Chapitre 2 : CSS
 */

// ───────────────────────────────────────────────────────────── Leçon 1
const lecon1: Lecon = {
  slug: 'introduction-au-css',
  titre: 'Introduction au CSS : couleurs et textes',
  duree: '25 min',
  objectifs: [
    'Comprendre le rôle du CSS',
    'Écrire une règle CSS : sélecteur, propriété, valeur',
    'Connaître les trois façons d\'ajouter du CSS',
    'Utiliser les couleurs et les propriétés de texte',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Introduction au CSS', sousTitre: 'Le résumé en 2 minutes', narration: 'Introduction au CSS : couleurs et textes, en deux minutes.' },
      {
        type: 'code',
        titre: 'Une règle CSS',
        lignes: ['h1 {', '  color: #2438F0;', '  font-size: 32px;', '}'],
        etapes: [
          { ligne: 0, variables: { selecteur: 'h1' }, note: 'Le sélecteur : quels éléments ?' },
          { ligne: 1, variables: { selecteur: 'h1', color: '#2438F0' }, note: 'propriété: valeur;' },
          { ligne: 2, variables: { selecteur: 'h1', color: '#2438F0', 'font-size': '32px' } },
          { ligne: 3, variables: { selecteur: 'h1', color: '#2438F0', 'font-size': '32px' }, sortie: 'Tous les h1 sont bleus et grands' },
        ],
        narration: "Une règle CSS commence par un sélecteur, qui indique les éléments à styler. Puis, entre accolades, des déclarations : propriété, deux-points, valeur, point-virgule.",
      },
      {
        type: 'comparaison',
        titre: '3 façons d\'ajouter du CSS',
        colonnes: [
          { nom: 'Attribut style', texte: 'Dans la balise : à éviter' },
          { nom: 'Balise <style>', texte: 'Dans le <head> de la page' },
          { nom: 'Fichier .css', texte: 'Un fichier externe : la meilleure solution' },
        ],
        narration: "On peut écrire le CSS dans l'attribut style, dans une balise style, ou dans un fichier externe. Le fichier externe est la meilleure solution, car il sert à toutes les pages du site.",
      },
      {
        type: 'points',
        titre: 'Les propriétés de base',
        points: ['color : couleur du texte', 'background-color : couleur du fond', 'font-size, font-family, font-weight', 'text-align : alignement'],
        narration: "Les propriétés de base : color pour le texte, background-color pour le fond, font-size, font-family et font-weight pour la police, et text-align pour l'alignement.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. À quoi sert le CSS ?' },
    {
      type: 'texte',
      contenu:
        "Le HTML décrit le **contenu** ; le **CSS** (Cascading Style Sheets, feuilles de style en cascade) décrit la **présentation** : couleurs, polices, tailles, espacements, mise en page. Séparer les deux permet de changer tout le design d'un site en modifiant un seul fichier CSS, sans toucher au HTML.",
    },

    { type: 'titre', contenu: '2. La syntaxe d\'une règle' },
    {
      type: 'code',
      langage: 'css',
      code: `sélecteur {
  propriété: valeur;
  propriété: valeur;
}

/* Exemple : tous les titres h1 en bleu et centrés */
h1 {
  color: #2438F0;
  text-align: center;
}`,
    },
    {
      type: 'tableau',
      entetes: ['Partie', 'Rôle', 'Exemple'],
      lignes: [
        ['Sélecteur', 'Indique quels éléments sont concernés', 'h1'],
        ['Propriété', 'Ce qu\'on veut changer', 'color'],
        ['Valeur', 'La nouvelle valeur', '#2438F0'],
        ['Déclaration', 'Une paire propriété: valeur; (le point-virgule termine)', 'color: #2438F0;'],
        ['Commentaire', 'Note ignorée par le navigateur', '/* … */'],
      ],
    },
    {
      type: 'encadre',
      variante: 'attention',
      titre: 'Les erreurs qui cassent tout',
      elements: [
        'Oublier le **point-virgule** entre deux déclarations : la deuxième est ignorée.',
        'Oublier l\'**accolade fermante** : les règles suivantes ne marchent plus.',
        'Mettre un **espace** entre le nombre et l\'unité : `16 px` est faux, il faut `16px`.',
        'Une faute dans le nom d\'une propriété (`colour`, `font-weigth`) : elle est simplement ignorée, sans message d\'erreur.',
      ],
    },

    { type: 'titre', contenu: '3. Les trois façons d\'ajouter du CSS' },
    {
      type: 'tableau',
      entetes: ['Méthode', 'Exemple', 'Avis'],
      lignes: [
        ['Attribut style (en ligne)', '<p style="color: red;">…</p>', 'À éviter : mélange contenu et présentation, à répéter partout'],
        ['Balise <style> dans le <head>', '<style> p { color: red; } </style>', 'Pratique pour une seule page ou un exercice'],
        ['Fichier externe .css', '<link rel="stylesheet" href="style.css">', 'La meilleure : un seul fichier pour tout le site, mis en cache par le navigateur'],
      ],
    },
    {
      type: 'code',
      langage: 'html',
      titre: 'Relier un fichier CSS externe',
      code: `<head>
  <meta charset="UTF-8">
  <title>Mon site</title>
  <link rel="stylesheet" href="style.css">
</head>`,
      legende: 'Dans les exemples de ce cours, on utilise la balise `<style>` pour tout voir dans un seul bloc.',
    },

    { type: 'titre', contenu: '4. Les couleurs' },
    {
      type: 'tableau',
      entetes: ['Notation', 'Exemple', 'Remarque'],
      lignes: [
        ['Nom', 'red, blue, orange, white', 'Simple, mais peu de choix'],
        ['Hexadécimal', '#2438F0, #FFD84D, #000', 'Le plus utilisé : #RRVVBB, de 00 à FF pour chaque couleur'],
        ['RGB', 'rgb(36, 56, 240)', 'Rouge, vert, bleu de 0 à 255'],
        ['RGBA', 'rgba(0, 0, 0, 0.5)', 'Le 4e nombre est l\'opacité (0 = transparent, 1 = opaque)'],
      ],
    },

    { type: 'titre', contenu: '5. Les propriétés de texte' },
    {
      type: 'tableau',
      entetes: ['Propriété', 'Rôle', 'Exemples de valeurs'],
      lignes: [
        ['color', 'Couleur du texte', '#15172A, red'],
        ['background-color', 'Couleur du fond', '#F7F5F0'],
        ['font-family', 'La police (avec des polices de secours)', 'Arial, sans-serif'],
        ['font-size', 'La taille du texte', '16px, 1.2rem'],
        ['font-weight', 'L\'épaisseur', 'normal, bold, 700'],
        ['font-style', 'Italique', 'italic'],
        ['text-align', 'Alignement', 'left, center, right, justify'],
        ['text-decoration', 'Soulignement', 'none (pour enlever le soulignement des liens), underline'],
        ['text-transform', 'Majuscules', 'uppercase, lowercase, capitalize'],
        ['line-height', 'Hauteur des lignes (interligne)', '1.6'],
      ],
    },
    {
      type: 'html',
      titre: 'Essaie de changer les couleurs et les tailles',
      hauteur: 380,
      code: `<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #F7F5F0;
    color: #15172A;
  }
  h1 {
    color: #2438F0;
    text-align: center;
    text-transform: uppercase;
  }
  p {
    font-size: 18px;
    line-height: 1.6;
  }
  .prix {
    color: #C2370B;
    font-weight: bold;
  }
</style>

<h1>Maquis Chez Tantie</h1>
<p>Le meilleur attiéké poisson de Treichville.</p>
<p>Prix : <span class="prix">2 000 F</span></p>`,
      legende: 'Remplace #2438F0 par orange ou par #0E8C6A, et center par right : la page change immédiatement.',
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'Les unités de taille',
      elements: [
        '`px` (pixel) : une taille fixe. Simple pour commencer.',
        '`rem` : relatif à la taille de base du navigateur (en général 16px). `1.5rem` = 24px. Recommandé, car il respecte les réglages de l\'utilisateur.',
        '`%` : relatif à l\'élément parent.',
      ],
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Le CSS gère la **présentation** ; le HTML le contenu.',
        'Règle : `sélecteur { propriété: valeur; }` — n\'oublie pas les points-virgules.',
        'Préférer un **fichier externe** relié par `<link rel="stylesheet" href="style.css">`.',
        'Couleurs en hexadécimal (`#2438F0`) ; propriétés clés : `color`, `background-color`, `font-size`, `font-family`, `font-weight`, `text-align`.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quelle propriété change la couleur du fond d\'un élément ?',
      options: ['color', 'background-color', 'font-color'],
      bonneReponse: 1,
      explication: 'color change la couleur du texte, background-color celle du fond. font-color n\'existe pas.',
    },
    {
      type: 'quiz',
      question: 'Que se passe-t-il avec : p { color: red font-size: 20px; } ?',
      options: ['Tout fonctionne', 'Aucune des deux déclarations ne fonctionne correctement', 'Le navigateur affiche une erreur'],
      bonneReponse: 1,
      explication: 'Il manque le point-virgule après red : le navigateur lit « red font-size: 20px » comme une seule valeur invalide pour color. Il n\'affiche aucun message : il ignore la déclaration.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : écrire des règles',
      enonce: 'Écris les règles CSS correspondant à ces consignes.',
      questions: [
        'Tous les paragraphes en gris foncé (#4B4E63), taille 16px, interligne 1.6.',
        'Les titres h2 en bleu (#2438F0), en majuscules.',
        'Le fond de la page en crème (#F7F5F0), avec la police Arial (sans-serif en secours).',
        'Les liens sans soulignement.',
      ],
      langage: 'texte',
      solution: `p {
  color: #4B4E63;
  font-size: 16px;
  line-height: 1.6;
}
h2 {
  color: #2438F0;
  text-transform: uppercase;
}
body {
  background-color: #F7F5F0;
  font-family: Arial, sans-serif;
}
a {
  text-decoration: none;
}`,
      explication: 'Le fond et la police se règlent sur body : grâce à l\'héritage (leçon suivante), la police s\'applique à tout le texte de la page.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'La charte graphique d\'une pharmacie',
      enonce:
        "La Pharmacie du Plateau veut appliquer sa charte graphique à son site : vert (#0E8C6A) pour les titres, texte gris foncé (#333333), fond blanc, police Verdana (ou sans-serif). Le titre principal doit être centré. Les informations de garde doivent apparaître en gras et en rouge (#C2370B).",
      questions: [
        'Donne trois avantages d\'un fichier CSS externe pour ce site de plusieurs pages.',
        'Écris la ligne HTML qui relie le fichier « charte.css » aux pages.',
        'Écris le contenu du fichier charte.css. Les informations de garde sont dans des éléments ayant la classe « garde ».',
        'Pourquoi ne faut-il pas écrire le style des titres avec l\'attribut style dans chaque page ?',
      ],
      langage: 'texte',
      solution: `1. - Une seule modification change l'apparence de toutes les pages.
   - Le code HTML est plus lisible (contenu et présentation séparés).
   - Le fichier est mis en cache par le navigateur : les pages suivantes
     se chargent plus vite (moins de données mobiles).

2. <link rel="stylesheet" href="charte.css">   (dans le <head> de chaque page)

3. body {
     background-color: #FFFFFF;
     color: #333333;
     font-family: Verdana, sans-serif;
   }
   h1, h2, h3 {
     color: #0E8C6A;
   }
   h1 {
     text-align: center;
   }
   .garde {
     color: #C2370B;
     font-weight: bold;
   }

4. Il faudrait le recopier sur chaque titre de chaque page : long, source
   d'erreurs, et tout changement de couleur obligerait à modifier toutes
   les pages une par une.`,
      explication: 'Le sélecteur groupé « h1, h2, h3 » applique la même règle aux trois titres. Le sélecteur de classe « .garde » est détaillé dans la leçon suivante.',
    },
  ],
  exercice: {
    id: 'web-css-couleurs',
    titre: 'Habiller une page',
    consigne:
      'Dans la balise <style>, mets le fond de la page (body) en #F7F5F0, le titre h1 en couleur #2438F0 et centré, et les paragraphes en taille 18px.',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Maquis Chez Tantie</title>
  <style>
    /* Écris tes règles CSS ici */

  </style>
</head>
<body>
  <h1>Maquis Chez Tantie</h1>
  <p>Le meilleur attiéké poisson de Treichville.</p>
  <p>Ouvert tous les jours de 11 h à 23 h.</p>
</body>
</html>
`,
    verifications: [
      { description: 'Le fond de la page (body) est #F7F5F0', selecteur: 'body', style: ['background-color', '#F7F5F0'] },
      { description: 'Le titre h1 est de couleur #2438F0', selecteur: 'h1', style: ['color', '#2438F0'] },
      { description: 'Le titre h1 est centré', selecteur: 'h1', style: ['text-align', 'center'] },
      { description: 'Les paragraphes ont une taille de 18px', selecteur: 'p', style: ['font-size', '18px'], min: 2 },
    ],
    indice: 'body { background-color: #F7F5F0; } puis h1 { … } et p { font-size: 18px; }',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Maquis Chez Tantie</title>
  <style>
    body {
      background-color: #F7F5F0;
    }
    h1 {
      color: #2438F0;
      text-align: center;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <h1>Maquis Chez Tantie</h1>
  <p>Le meilleur attiéké poisson de Treichville.</p>
  <p>Ouvert tous les jours de 11 h à 23 h.</p>
</body>
</html>
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 2
const lecon2: Lecon = {
  slug: 'selecteurs-et-cascade',
  titre: 'Les sélecteurs, la cascade et l\'héritage',
  duree: '25 min',
  objectifs: [
    'Cibler des éléments avec les classes et les identifiants',
    'Utiliser les sélecteurs combinés et les pseudo-classes',
    'Comprendre quelle règle s\'applique en cas de conflit',
    'Savoir ce qui s\'hérite et ce qui ne s\'hérite pas',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Les sélecteurs CSS', sousTitre: 'Le résumé en 2 minutes', narration: 'Les sélecteurs, la cascade et l\'héritage, en deux minutes.' },
      {
        type: 'comparaison',
        titre: 'Les 3 sélecteurs de base',
        colonnes: [
          { nom: 'p', texte: 'Tous les éléments p' },
          { nom: '.prix', texte: 'Les éléments avec class="prix" (plusieurs possibles)' },
          { nom: '#menu', texte: 'L\'élément avec id="menu" (unique)' },
        ],
        narration: "Trois sélecteurs de base : le nom de la balise cible tous ces éléments. Le point cible une classe, qu'on peut donner à plusieurs éléments. Le dièse cible un identifiant, unique dans la page.",
      },
      {
        type: 'points',
        titre: 'En cas de conflit',
        points: ['L\'id l\'emporte sur la classe', 'La classe l\'emporte sur la balise', 'À égalité : la dernière règle gagne'],
        narration: "Quand deux règles se contredisent, la plus précise gagne : l'identifiant l'emporte sur la classe, qui l'emporte sur la balise. À égalité, c'est la dernière règle écrite qui gagne.",
      },
      {
        type: 'points',
        titre: 'L\'héritage',
        points: ['color et font s\'héritent des parents', 'border, margin, background ne s\'héritent pas', 'D\'où : on règle la police sur body'],
        narration: "Certaines propriétés, comme la couleur et la police, s'héritent du parent. D'autres, comme les bordures et les marges, ne s'héritent pas. C'est pour ça qu'on règle la police une seule fois, sur body.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Les classes et les identifiants' },
    {
      type: 'texte',
      contenu:
        "Le sélecteur de balise (`p`, `h1`) touche **tous** les éléments de ce type. Pour cibler seulement **certains** éléments, on leur donne une **classe** ou un **identifiant** dans le HTML.",
    },
    {
      type: 'tableau',
      entetes: ['', 'Classe', 'Identifiant'],
      lignes: [
        ['En HTML', 'class="prix"', 'id="menu-principal"'],
        ['En CSS', '.prix { … }', '#menu-principal { … }'],
        ['Combien d\'éléments ?', 'Autant qu\'on veut', 'Un seul par page (unique)'],
        ['Plusieurs par élément ?', 'Oui : class="prix promo"', 'Non : un seul id'],
        ['Usage conseillé', 'Le style (presque toujours)', 'Les ancres (#tarifs) et JavaScript'],
      ],
    },
    {
      type: 'html',
      titre: 'Classes et identifiant',
      hauteur: 330,
      code: `<style>
  .prix { color: #C2370B; font-weight: bold; }
  .promo { background-color: #FFD84D; }
  #titre-boutique { text-transform: uppercase; }
</style>

<h1 id="titre-boutique">Boutique Tech Abidjan</h1>
<p>Clé USB 32 Go : <span class="prix">4 000 F</span></p>
<p>Souris sans fil : <span class="prix promo">3 500 F</span></p>
<p class="promo">Livraison gratuite ce week-end !</p>`,
      legende: 'La souris a deux classes : « prix » et « promo ». Elle reçoit les styles des deux règles.',
    },

    { type: 'titre', contenu: '2. Combiner les sélecteurs' },
    {
      type: 'tableau',
      entetes: ['Sélecteur', 'Signification', 'Exemple'],
      lignes: [
        ['h1, h2, h3', 'Groupe : la même règle pour plusieurs sélecteurs', 'h1, h2 { color: navy; }'],
        ['nav a', 'Descendant : les a qui sont à l\'intérieur d\'un nav', 'nav a { text-decoration: none; }'],
        ['ul > li', 'Enfant direct : les li directement dans un ul', 'ul > li { margin-bottom: 4px; }'],
        ['p.important', 'Les p qui ont la classe important', 'p.important { color: red; }'],
        ['a:hover', 'Pseudo-classe : un lien survolé par la souris', 'a:hover { color: orange; }'],
        ['li:first-child', 'Le premier li de sa liste', 'li:first-child { font-weight: bold; }'],
      ],
    },
    {
      type: 'html',
      titre: 'Un menu stylé avec des sélecteurs combinés',
      hauteur: 200,
      code: `<style>
  nav a {
    color: #FFFFFF;
    background-color: #2438F0;
    padding: 8px 14px;
    text-decoration: none;
    border-radius: 20px;
  }
  nav a:hover {
    background-color: #15172A;
  }
</style>

<nav>
  <a href="#">Accueil</a>
  <a href="#">Cours</a>
  <a href="#">Contact</a>
</nav>
<p>Ce <a href="#">lien</a> n'est pas dans le nav : il garde son style normal.</p>`,
      legende: 'Passe la souris sur les boutons du menu (sur ordinateur) : `:hover` change leur couleur.',
    },

    { type: 'titre', contenu: '3. La cascade : quelle règle gagne ?' },
    {
      type: 'texte',
      contenu:
        "Quand plusieurs règles donnent des valeurs différentes à la même propriété d'un élément, le navigateur choisit selon la **spécificité** (la précision du sélecteur), puis selon l'**ordre** d'écriture. C'est la « cascade » des Cascading Style Sheets.",
    },
    {
      type: 'tableau',
      titre: 'Du plus fort au plus faible',
      entetes: ['Rang', 'Sélecteur', 'Exemple'],
      lignes: [
        ['1', 'Attribut style dans la balise', '<p style="color: red">'],
        ['2', 'Identifiant', '#intro'],
        ['3', 'Classe, pseudo-classe', '.important, a:hover'],
        ['4', 'Balise', 'p'],
        ['À égalité', 'La règle écrite le plus bas gagne', ''],
      ],
    },
    {
      type: 'html',
      titre: 'Quelle couleur pour ce paragraphe ?',
      hauteur: 160,
      code: `<style>
  #intro { color: green; }
  .important { color: blue; }
  p { color: red; }
</style>

<p id="intro" class="important">De quelle couleur suis-je ?</p>`,
      legende: "Il est **vert** : l'identifiant est plus spécifique que la classe et que la balise, même s'il est écrit en premier. Supprime la règle #intro : il devient bleu.",
    },

    { type: 'titre', contenu: '4. L\'héritage' },
    {
      type: 'texte',
      contenu:
        "Certaines propriétés sont **héritées** : si on les applique à un élément, ses enfants les reçoivent aussi. C'est le cas des propriétés de **texte** (`color`, `font-family`, `font-size`, `line-height`, `text-align`). D'autres ne s'héritent **pas** : `border`, `margin`, `padding`, `background`, `width`…",
    },
    {
      type: 'encadre',
      variante: 'astuce',
      titre: 'L\'astuce du body',
      contenu:
        "Grâce à l'héritage, on écrit une seule fois `body { font-family: Arial, sans-serif; color: #15172A; }` et **toute** la page en profite. On ne redéfinit ensuite que ce qui change (les titres, les liens…).",
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        '`.classe` (réutilisable, plusieurs par élément) et `#id` (unique dans la page).',
        'Combinaisons : groupe `h1, h2`, descendant `nav a`, enfant `ul > li`, pseudo-classe `a:hover`.',
        'Conflit : style en ligne > id > classe > balise ; à égalité, la dernière règle gagne.',
        'Le texte (color, font…) s\'hérite ; les boîtes (border, margin, padding…) non.',
      ],
    },
    {
      type: 'quiz',
      question: 'Quel sélecteur cible les liens situés dans le pied de page uniquement ?',
      options: ['footer, a', 'footer a', 'a.footer'],
      bonneReponse: 1,
      explication: '« footer a » (avec un espace) cible les a descendants de footer. « footer, a » cible le footer ET tous les liens. « a.footer » cible les liens qui ont la classe footer.',
    },
    {
      type: 'quiz',
      question: 'On applique border: 1px solid black au <ul>. Les <li> ont-ils aussi une bordure ?',
      options: ['Oui, par héritage', 'Non, border ne s\'hérite pas'],
      bonneReponse: 1,
      explication: 'Les propriétés de boîte (border, margin, padding) ne s\'héritent pas : seule la liste a une bordure.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : quelle couleur ?',
      enonce:
        "Avec le CSS suivant, donne la couleur de chaque élément et justifie.\n\np { color: black; }\n.alerte { color: red; }\n#info { color: blue; }\nsection p { color: green; }\n\n1. <p>Texte 1</p>\n2. <p class=\"alerte\">Texte 2</p>\n3. <section><p>Texte 3</p></section>\n4. <section><p class=\"alerte\">Texte 4</p></section>\n5. <p id=\"info\" class=\"alerte\">Texte 5</p>",
      langage: 'texte',
      solution: `1. Noir : seule la règle p s'applique.
2. Rouge : la classe .alerte est plus spécifique que p.
3. Vert : « section p » (2 balises) est plus spécifique que « p » (1 balise).
4. Rouge : une classe (.alerte) est plus spécifique que deux balises (section p).
5. Bleu : l'identifiant #info l'emporte sur la classe .alerte.`,
      explication: 'Pour comparer, compte d\'abord les id, puis les classes, puis les balises : un seul id bat n\'importe quel nombre de classes, une seule classe bat n\'importe quel nombre de balises.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Le menu et les produits d\'une boutique',
      enonce:
        "On donne le HTML suivant :\n\n<nav id=\"menu\">\n  <a href=\"index.html\" class=\"actif\">Accueil</a>\n  <a href=\"produits.html\">Produits</a>\n</nav>\n<article class=\"produit\">\n  <h2>Fer à repasser</h2>\n  <p class=\"prix\">12 500 F</p>\n</article>\n<article class=\"produit promo\">\n  <h2>Ventilateur</h2>\n  <p class=\"prix\">18 000 F</p>\n</article>",
      questions: [
        'Écris la règle qui met les liens du menu en blanc, sans soulignement.',
        'Écris la règle qui met le lien de la page active (classe actif) en gras.',
        'Écris la règle qui change la couleur d\'un lien du menu en jaune (#FFD84D) au survol.',
        'Écris la règle qui met les prix en rouge, et celle qui met les prix des produits en promotion sur fond jaune.',
        'Explique la différence entre class="produit promo" et id="produit".',
      ],
      langage: 'texte',
      solution: `1. #menu a {
     color: #FFFFFF;
     text-decoration: none;
   }

2. #menu a.actif {
     font-weight: bold;
   }

3. #menu a:hover {
     color: #FFD84D;
   }

4. .prix {
     color: #C2370B;
   }
   .promo .prix {
     background-color: #FFD84D;
   }

5. class="produit promo" donne deux classes à l'élément : il reçoit les
   styles de .produit ET de .promo, et ces classes peuvent être utilisées
   par d'autres éléments. Un id est unique dans la page : un seul élément
   peut s'appeler « produit », et un élément n'a qu'un seul id.`,
      explication: '« .promo .prix » (avec un espace) cible les éléments de classe prix situés à l\'intérieur d\'un élément de classe promo : seul le prix du ventilateur est concerné.',
    },
  ],
  exercice: {
    id: 'web-css-classes',
    titre: 'Classes et identifiant',
    consigne:
      'Complète le CSS : les éléments de classe « prix » en rouge (#C2370B) et en gras, et l\'élément d\'identifiant « promo » sur fond jaune (#FFD84D).',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Boutique</title>
  <style>
    /* Règle pour la classe prix */

    /* Règle pour l'identifiant promo */

  </style>
</head>
<body>
  <h1>Boutique Tech Abidjan</h1>
  <p>Clé USB 32 Go : <span class="prix">4 000 F</span></p>
  <p>Souris sans fil : <span class="prix">3 500 F</span></p>
  <p id="promo">Livraison gratuite ce week-end !</p>
</body>
</html>
`,
    verifications: [
      { description: 'Les 2 prix (classe prix) sont en couleur #C2370B', selecteur: '.prix', style: ['color', '#C2370B'], min: 2 },
      { description: 'Les prix sont en gras', selecteur: '.prix', style: ['font-weight', 'bold'], min: 2 },
      { description: 'L\'élément #promo a un fond #FFD84D', selecteur: '#promo', style: ['background-color', '#FFD84D'] },
    ],
    indice: 'Une classe se cible avec un point (.prix), un identifiant avec un dièse (#promo).',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Boutique</title>
  <style>
    .prix {
      color: #C2370B;
      font-weight: bold;
    }
    #promo {
      background-color: #FFD84D;
    }
  </style>
</head>
<body>
  <h1>Boutique Tech Abidjan</h1>
  <p>Clé USB 32 Go : <span class="prix">4 000 F</span></p>
  <p>Souris sans fil : <span class="prix">3 500 F</span></p>
  <p id="promo">Livraison gratuite ce week-end !</p>
</body>
</html>
`,
  },
}

// ───────────────────────────────────────────────────────────── Leçon 3
const lecon3: Lecon = {
  slug: 'modele-de-boite',
  titre: 'Le modèle de boîte : marges, bordures, dimensions',
  duree: '30 min',
  objectifs: [
    'Comprendre le modèle de boîte : contenu, padding, border, margin',
    'Calculer la taille réelle d\'un élément',
    'Utiliser box-sizing: border-box',
    'Distinguer éléments de type bloc et en ligne',
  ],
  resume: {
    duree: '2 min',
    scenes: [
      { type: 'titre', titre: 'Le modèle de boîte', sousTitre: 'Le résumé en 2 minutes', narration: 'Le modèle de boîte en CSS, en deux minutes.' },
      {
        type: 'points',
        titre: 'Chaque élément est une boîte',
        points: ['content : le contenu', 'padding : marge intérieure', 'border : la bordure', 'margin : marge extérieure'],
        narration: "En CSS, chaque élément est une boîte composée de quatre couches : le contenu, la marge intérieure appelée padding, la bordure, et la marge extérieure appelée margin.",
      },
      {
        type: 'code',
        titre: 'Calculer la largeur réelle',
        lignes: ['width: 300px;', 'padding: 20px;', 'border: 2px solid;', 'margin: 10px;'],
        etapes: [
          { ligne: 0, variables: { largeur: '300' } },
          { ligne: 1, variables: { largeur: '340' }, note: '+ 20 à gauche + 20 à droite' },
          { ligne: 2, variables: { largeur: '344' }, note: '+ 2 + 2 : largeur visible' },
          { ligne: 3, variables: { largeur: '364' }, note: '+ 10 + 10 : place occupée', sortie: 'Visible : 344px, occupée : 364px' },
        ],
        narration: "Par défaut, la largeur indiquée est celle du contenu seulement. On ajoute le padding et la bordure des deux côtés pour la largeur visible, puis la marge pour la place totale occupée.",
      },
      {
        type: 'comparaison',
        titre: 'Bloc ou en ligne ?',
        colonnes: [
          { nom: 'Bloc', texte: 'Toute la largeur, à la ligne : div, p, h1, section' },
          { nom: 'En ligne', texte: 'Dans le texte : span, a, strong, img' },
        ],
        narration: "Les éléments de type bloc prennent toute la largeur et passent à la ligne. Les éléments en ligne restent dans le texte, à la suite les uns des autres.",
      },
    ],
  },
  blocs: [
    { type: 'titre', contenu: '1. Chaque élément est une boîte' },
    {
      type: 'texte',
      contenu:
        "Pour le navigateur, **chaque élément** de la page est un **rectangle** (une boîte), même un simple mot. Cette boîte est faite de **quatre couches**, de l'intérieur vers l'extérieur :",
    },
    {
      type: 'tableau',
      entetes: ['Couche', 'Propriété', 'Rôle'],
      lignes: [
        ['Contenu', 'width, height', 'Le texte, l\'image'],
        ['Marge intérieure', 'padding', 'L\'espace entre le contenu et la bordure (le fond s\'y étend)'],
        ['Bordure', 'border', 'Le trait autour'],
        ['Marge extérieure', 'margin', 'L\'espace entre la boîte et ses voisines (toujours transparente)'],
      ],
    },
    {
      type: 'html',
      titre: 'Voir les quatre couches',
      hauteur: 260,
      code: `<style>
  .boite {
    width: 220px;
    padding: 20px;
    border: 6px solid #2438F0;
    margin: 30px;
    background-color: #FFD84D;
  }
  body { background-color: #E8EAFF; }
</style>

<div class="boite">Contenu de la boîte : le fond jaune s'étend dans le padding.</div>
<div class="boite">Deuxième boîte : la marge (30px) les sépare.</div>`,
      legende: 'Change padding: 20px en 50px, puis margin: 30px en 0, et observe la différence entre les deux.',
    },

    { type: 'titre', contenu: '2. Écrire les marges et les bordures' },
    {
      type: 'tableau',
      entetes: ['Écriture', 'Signification'],
      lignes: [
        ['padding: 20px;', '20px sur les 4 côtés'],
        ['padding: 10px 20px;', '10px en haut et en bas, 20px à gauche et à droite'],
        ['padding: 5px 10px 15px 20px;', 'haut, droite, bas, gauche (sens des aiguilles d\'une montre)'],
        ['margin-top: 30px;', 'seulement en haut (aussi : -right, -bottom, -left)'],
        ['margin: 0 auto;', '0 en haut et en bas, automatique sur les côtés : centre un bloc qui a une largeur'],
        ['border: 2px solid #333;', 'épaisseur, style (solid, dashed, dotted), couleur'],
        ['border-radius: 12px;', 'coins arrondis (50% sur un carré = un cercle)'],
      ],
    },

    { type: 'titre', contenu: '3. Calculer la taille réelle d\'une boîte' },
    {
      type: 'texte',
      contenu:
        "Par défaut, `width` ne concerne que le **contenu**. Le padding et la bordure s'**ajoutent** : la boîte est donc plus large que ce qu'on a écrit. C'est une source fréquente de mises en page cassées, et une question classique d'examen.",
    },
    {
      type: 'code',
      langage: 'algo',
      titre: 'Exemple : width: 300px; padding: 20px; border: 2px; margin: 10px;',
      code: `Largeur visible  = contenu + padding gauche + padding droit + bordure gauche + bordure droite
                 = 300 + 20 + 20 + 2 + 2 = 344 px

Place occupée    = largeur visible + marge gauche + marge droite
                 = 344 + 10 + 10 = 364 px`,
    },
    {
      type: 'texte',
      contenu:
        "Pour simplifier, on utilise presque toujours **`box-sizing: border-box`** : `width` inclut alors le padding et la bordure. Avec le même exemple, la largeur visible fait exactement **300px** (le contenu se réduit à 300 − 40 − 4 = 256px).",
    },
    {
      type: 'code',
      langage: 'css',
      titre: 'À mettre au début de chaque feuille de style',
      code: `* {
  box-sizing: border-box;
}`,
      legende: '`*` est le sélecteur universel : il cible tous les éléments.',
    },

    { type: 'titre', contenu: '4. Bloc, en ligne et inline-block' },
    {
      type: 'tableau',
      entetes: ['display', 'Comportement', 'Exemples par défaut'],
      lignes: [
        ['block', 'Prend toute la largeur, commence sur une nouvelle ligne ; width et height marchent', 'div, p, h1-h6, ul, section, header'],
        ['inline', 'Reste dans la ligne, prend la largeur de son contenu ; width et height ignorés', 'span, a, strong, em'],
        ['inline-block', 'Reste dans la ligne, mais accepte width, height, padding vertical', 'Boutons, badges'],
        ['none', 'L\'élément disparaît complètement', 'Un menu caché sur mobile'],
      ],
    },
    {
      type: 'html',
      titre: 'Une carte produit',
      hauteur: 320,
      code: `<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; background: #F7F5F0; }
  .carte {
    width: 280px;
    margin: 20px auto;
    padding: 20px;
    background: #FFFFFF;
    border: 1px solid #E8E4DA;
    border-radius: 16px;
  }
  .badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    background: #6FE3AE;
    font-size: 13px;
    font-weight: bold;
  }
  .bouton {
    display: block;
    margin-top: 12px;
    padding: 12px;
    border-radius: 999px;
    background: #2438F0;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
  }
</style>

<div class="carte">
  <span class="badge">En stock</span>
  <h2>Ventilateur 16 pouces</h2>
  <p>18 000 F</p>
  <a class="bouton" href="#">Commander</a>
</div>`,
      legende: 'Le lien `<a>` est en ligne par défaut ; avec `display: block`, il devient un vrai bouton large. La carte est centrée grâce à `margin: 20px auto`.',
    },
    {
      type: 'encadre',
      variante: 'retenir',
      titre: 'À retenir',
      elements: [
        'Boîte = **contenu** + **padding** + **border** + **margin**.',
        'Par défaut : largeur visible = width + 2 × padding + 2 × bordure ; place occupée = + 2 × margin.',
        '`* { box-sizing: border-box; }` : width inclut padding et bordure.',
        '`block` (toute la largeur), `inline` (dans le texte), `inline-block`, `none` ; `margin: 0 auto` centre un bloc.',
      ],
    },
    {
      type: 'quiz',
      question: 'width: 200px; padding: 10px; border: 1px solid; (sans border-box). Quelle est la largeur visible ?',
      options: ['200px', '222px', '211px'],
      bonneReponse: 1,
      explication: '200 + 10 + 10 (padding) + 1 + 1 (bordure) = 222px.',
    },
    {
      type: 'quiz',
      question: 'Quelle propriété crée de l\'espace entre la bordure et le contenu ?',
      options: ['margin', 'padding', 'border-spacing'],
      bonneReponse: 1,
      explication: 'padding est la marge intérieure (entre contenu et bordure). margin est l\'espace à l\'extérieur de la bordure.',
    },

    { type: 'titre', contenu: "Exercices d'application" },
    {
      type: 'exercice-corrige',
      niveau: 'application',
      titre: 'Application 1 : calculs de boîtes',
      enonce: 'Pour chaque boîte, calcule la largeur visible et la place horizontale occupée.',
      questions: [
        'width: 400px; padding: 15px; border: 3px solid; margin: 20px;',
        'width: 250px; padding: 10px 30px; border: 1px solid; margin: 0;',
        'Même boîte que la 1, avec box-sizing: border-box.',
      ],
      langage: 'texte',
      solution: `1. Visible : 400 + 15 + 15 + 3 + 3 = 436 px
   Occupée : 436 + 20 + 20 = 476 px

2. padding: 10px 30px → 30px à gauche et à droite
   Visible : 250 + 30 + 30 + 1 + 1 = 312 px
   Occupée : 312 + 0 = 312 px

3. Avec border-box, width inclut padding et bordure :
   Visible : 400 px (contenu : 400 − 30 − 6 = 364 px)
   Occupée : 400 + 20 + 20 = 440 px`,
      explication: 'Avec deux valeurs, padding: 10px 30px donne 10px en haut/bas et 30px à gauche/droite : pour une largeur, seule la deuxième valeur compte.',
    },

    { type: 'titre', contenu: 'Sujet type BTS' },
    {
      type: 'exercice-corrige',
      niveau: 'bts',
      titre: 'Les cartes de formations',
      enonce:
        "Un centre de formation affiche ses formations sous forme de cartes. La zone qui les contient mesure 960px de large. Chaque carte est définie ainsi :\n\n.carte {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #2438F0;\n  margin: 10px;\n  display: inline-block;\n}",
      questions: [
        'Calcule la largeur visible et la place occupée par une carte (sans box-sizing).',
        'Peut-on afficher trois cartes sur une même ligne dans la zone de 960px ? Justifie par le calcul.',
        'Propose une modification de la règle (sans changer width) pour que trois cartes tiennent sur une ligne, et vérifie par le calcul.',
        'Écris la règle qui arrondit les coins des cartes (12px) et la règle qui centre la zone de 960px dans la page.',
      ],
      langage: 'texte',
      solution: `1. Visible : 300 + 20 + 20 + 2 + 2 = 344 px
   Occupée : 344 + 10 + 10 = 364 px

2. Trois cartes : 3 × 364 = 1092 px > 960 px.
   Non, la troisième carte passe à la ligne.

3. Ajouter box-sizing: border-box :
   .carte { box-sizing: border-box; … }
   Visible : 300 px ; occupée : 300 + 10 + 10 = 320 px
   Trois cartes : 3 × 320 = 960 px ≤ 960 px → elles tiennent sur une ligne.
   (En pratique, les espaces entre éléments inline-block ajoutent quelques
   pixels : on prévoit souvent une petite marge de sécurité, ou on utilise
   flexbox, vu au chapitre Design responsive.)

4. .carte {
     border-radius: 12px;
   }
   .zone {
     width: 960px;
     margin: 0 auto;
   }`,
      explication:
        "Ce sujet combine calcul et raisonnement : montre toujours le détail des calculs. La remarque sur les espaces entre éléments inline-block montre au correcteur que tu as une vraie expérience pratique.",
    },
  ],
  exercice: {
    id: 'web-css-boite',
    titre: 'La carte produit',
    consigne:
      'Style la div de classe « carte » : largeur 300px, marge intérieure (padding) de 20px, bordure de 2px solide, coins arrondis de 12px.',
    langage: 'html',
    codeDepart: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Carte</title>
  <style>
    .carte {
      /* À compléter */

    }
  </style>
</head>
<body>
  <div class="carte">
    <h2>Ventilateur 16 pouces</h2>
    <p>18 000 F</p>
  </div>
</body>
</html>
`,
    verifications: [
      { description: 'La carte a une largeur de 300px', selecteur: '.carte', style: ['width', '300px'] },
      { description: 'La carte a un padding de 20px', selecteur: '.carte', style: ['padding-left', '20px'] },
      { description: 'La carte a une bordure de 2px', selecteur: '.carte', style: ['border-top-width', '2px'] },
      { description: 'La bordure est de style solide', selecteur: '.carte', style: ['border-top-style', 'solid'] },
      { description: 'Les coins sont arrondis de 12px', selecteur: '.carte', style: ['border-top-left-radius', '12px'] },
    ],
    indice: 'width: 300px; padding: 20px; border: 2px solid #2438F0; border-radius: 12px;',
    solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Carte</title>
  <style>
    .carte {
      width: 300px;
      padding: 20px;
      border: 2px solid #2438F0;
      border-radius: 12px;
    }
  </style>
</head>
<body>
  <div class="carte">
    <h2>Ventilateur 16 pouces</h2>
    <p>18 000 F</p>
  </div>
</body>
</html>
`,
  },
}

export const leconsCSS: Lecon[] = [lecon1, lecon2, lecon3]

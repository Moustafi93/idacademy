import type { SceneResume } from '../types'

/*
 * Exemples concrets et défis ajoutés à la fin des résumés vidéo — Merise et Web.
 */
export const exemplesMerise: Record<string, SceneResume[]> = {
  // ——— Chapitre 1 : Le système d'information ———
  'entreprise-et-systeme-information': [
    {
      type: 'exemple',
      titre: 'Le maquis « Chez Tantie »',
      situation: 'Un maquis de Treichville, vu comme une entreprise : qui décide, qui travaille, et où circule l\'information ?',
      langage: 'Analyse',
      code: ['Pilotage    : Tantie fixe les prix', '              et les menus', 'Information : cahier des commandes,', '              stock, recettes du jour', 'Opérant     : cuisinières, serveurs'],
      resultat: ['Le SI relie la décision', 'et l\'action : sans le', 'cahier, Tantie ne sait', 'pas ce qui se vend'],
      narration:
        "Exemple concret : un maquis. Tantie, qui décide des prix, c'est le système de pilotage. Les cuisinières et les serveurs, c'est le système opérant. Et le cahier des commandes et du stock, c'est le système d'information, qui fait le lien entre les deux.",
    },
    {
      type: 'exemple',
      titre: 'Les 4 fonctions du SI à la pharmacie',
      situation: 'Un client arrive à la pharmacie avec une ordonnance.',
      langage: 'Analyse',
      code: ['Collecter  : saisir l\'ordonnance', 'Mémoriser  : enregistrer la vente', 'Traiter    : calculer le total', '             et mettre à jour le stock', 'Diffuser   : imprimer le ticket'],
      resultat: ['Les 4 fonctions,', 'dans une seule vente'],
      narration: "Deuxième exemple : une vente en pharmacie. On collecte l'ordonnance, on mémorise la vente, on traite en calculant le total et le stock, et on diffuse en imprimant le ticket.",
    },
    {
      type: 'defi',
      question: 'Le livreur qui apporte la commande au client appartient à quel sous-système ?',
      reponse: 'Le système opérant',
      explication: 'Il réalise l\'activité de l\'entreprise (livrer) ; il ne décide pas et ne gère pas l\'information.',
      narration: "À toi de jouer. Le livreur qui apporte la commande appartient à quel sous-système ?",
    },
  ],
  'la-methode-merise': [
    {
      type: 'exemple',
      titre: 'L\'application de la bibliothèque',
      situation: 'L\'université veut informatiser les emprunts de sa bibliothèque. Merise découpe l\'étude en 3 niveaux.',
      langage: 'Les 3 niveaux',
      code: ['Conceptuel : QUOI ?', '  livres, adhérents, emprunts', 'Organisationnel : QUI ? QUAND ?', '  le bibliothécaire, au guichet', 'Physique : COMMENT ?', '  MySQL + PHP'],
      resultat: ['On décide d\'abord', 'QUOI, puis QUI,', 'et seulement à la fin', 'avec quels outils'],
      narration:
        "Exemple concret : la bibliothèque. Au niveau conceptuel, on décide quelles données gérer. Au niveau organisationnel, qui fait quoi et quand. Et seulement au niveau physique, on choisit les outils, comme MySQL et PHP.",
    },
    {
      type: 'exemple',
      titre: 'Les 6 modèles pour ce projet',
      situation: 'Pour chaque niveau, Merise propose un modèle des données et un modèle des traitements.',
      langage: 'Données | Traitements',
      code: ['MCD : LIVRE, ADHERENT… | MCT', 'MLD : tables et clés   | MOT', 'MPD : CREATE TABLE …   | MOpT'],
      resultat: ['MCD → MLD → MPD', 'MCT → MOT → MOpT'],
      narration: "Deuxième exemple : pour les données, on passe du MCD au MLD, puis au MPD, qui contient les tables en SQL. Pour les traitements, du MCT au MOT, puis au modèle opérationnel.",
    },
    {
      type: 'defi',
      question: 'Le choix de MySQL comme SGBD relève de quel niveau ?',
      reponse: 'Le niveau physique',
      explication: 'Il répond à la question « comment ? » : avec quel outil.',
      narration: "À toi de jouer. Choisir MySQL comme SGBD, cela relève de quel niveau de Merise ?",
    },
  ],
  'acteurs-et-flux': [
    {
      type: 'exemple',
      titre: 'La commande de pizza',
      situation: 'Domaine étudié : la gestion des commandes d\'une pizzeria de Cocody.',
      langage: 'Tableau des flux',
      code: ['1. Client   → Accueil  : commande', '2. Accueil  → Cuisine  : bon de préparation', '3. Accueil  → Client   : facture', '4. Client   → Accueil  : paiement'],
      resultat: ['Acteur externe :', '  Client', 'Acteurs internes :', '  Accueil, Cuisine'],
      narration:
        "Exemple concret : une pizzeria. Le client est un acteur externe : il est hors du domaine étudié. L'accueil et la cuisine sont des acteurs internes. Chaque flux est une information échangée : la commande, le bon de préparation, la facture.",
    },
    {
      type: 'exemple',
      titre: 'Interne ou externe ? Ça dépend du domaine',
      situation: 'Le service comptabilité de la même entreprise.',
      langage: 'Analyse',
      code: ['Domaine = gestion des commandes', '  → Comptabilité : acteur EXTERNE', '', 'Domaine = toute l\'entreprise', '  → Comptabilité : acteur INTERNE'],
      resultat: ['On fixe toujours', 'le domaine d\'abord'],
      narration: "Deuxième exemple : un même service peut être externe ou interne, selon le domaine qu'on étudie. Il faut toujours fixer le domaine en premier.",
    },
    {
      type: 'defi',
      question: 'Domaine : les ventes d\'une boutique. La banque qui reçoit les versements est-elle un acteur interne ou externe ?',
      reponse: 'Externe',
      explication: 'La banque échange des informations avec la boutique, mais ne fait pas partie du domaine étudié.',
      narration: "À toi de jouer. La banque qui reçoit les versements d'une boutique est-elle un acteur interne ou externe ?",
    },
  ],

  // ——— Chapitre 2 : Le dictionnaire des données ———
  'recenser-les-donnees': [
    {
      type: 'exemple',
      titre: 'Le ticket de caisse d\'une supérette',
      situation: 'On part d\'un vrai document : un ticket de caisse. Chaque information du ticket devient une ligne du dictionnaire.',
      langage: 'Dictionnaire (extrait)',
      code: ['Code         Type Taille Nature', 'num_ticket   AN   10     E', 'date_ticket  D    10     E', 'designation  AN   40     E', 'qte          N    3      E', 'prix_unit    N    8      E', 'montant_lig  N    10     C'],
      resultat: ['montant_lig est', 'CALCULÉE :', 'qte × prix_unit'],
      narration:
        "Exemple concret : un ticket de caisse. Chaque information devient une ligne : son code, son type, sa taille et sa nature. Le montant de la ligne est une donnée calculée, à partir de la quantité et du prix unitaire.",
    },
    {
      type: 'exemple',
      titre: 'Bien choisir le type',
      situation: 'Pour la fiche d\'inscription d\'un étudiant.',
      langage: 'Dictionnaire (extrait)',
      code: ['matricule     AN  (IDA001)', 'nom_etu       A   (Koné)', 'date_naiss    D   (2005-03-14)', 'tel_etu       AN  (0707123456)', 'nb_enfants    N   (0)'],
      resultat: ['Le téléphone est AN :', 'on garde le 0 initial', 'et on ne calcule rien'],
      narration: "Deuxième exemple : le choix du type. Le matricule mélange lettres et chiffres : alphanumérique. Le téléphone aussi, pour garder le zéro du début.",
    },
    {
      type: 'defi',
      question: 'L\'âge de l\'étudiant : donnée élémentaire ou calculée ?',
      reponse: 'Calculée',
      explication: 'On la calcule à partir de la date de naissance : c\'est la date qu\'on enregistre.',
      narration: "À toi de jouer. L'âge de l'étudiant est-il une donnée élémentaire ou calculée ?",
    },
  ],
  'epurer-le-dictionnaire': [
    {
      type: 'exemple',
      titre: 'Les synonymes et les polysèmes',
      situation: "Dans les documents d'un grossiste, on trouve « code client » sur la facture et « n° client » sur le bon de commande, et le mot « date » partout.",
      langage: 'Épuration',
      code: ['code_client = num_client', '  → synonymes : on garde num_client', '', 'date (commande) ≠ date (livraison)', '  → polysème : date_cde, date_liv'],
      resultat: ['Un seul nom par donnée,', 'une seule donnée par nom'],
      narration:
        "Exemple concret : deux noms pour la même donnée, ce sont des synonymes, on n'en garde qu'un. Un même nom pour deux données différentes, c'est un polysème : on les sépare avec deux noms distincts.",
    },
    {
      type: 'exemple',
      titre: 'Ce qu\'on retire',
      situation: 'Sur la facture, on trouve aussi le total TTC et le taux de TVA de 18 %.',
      langage: 'Épuration',
      code: ['montant_total → retiré (calculé)', 'taux_tva      → retiré (paramètre)', 'adresse       → décomposée :', '                rue, quartier, ville'],
      resultat: ['On garde seulement', 'les données élémentaires', 'utiles et indécomposables'],
      narration: "Deuxième exemple : on retire les données calculées comme le total, et les paramètres comme le taux de TVA. Et on décompose les données composées, comme l'adresse.",
    },
    {
      type: 'defi',
      question: 'nom_client et nom_fournisseur : faut-il n\'en garder qu\'un ?',
      reponse: 'Non, on garde les deux',
      explication: 'Ce ne sont pas des synonymes : ils désignent deux informations différentes (un client, un fournisseur).',
      narration: "À toi de jouer. Nom client et nom fournisseur sont-ils des synonymes ? Faut-il n'en garder qu'un ?",
    },
  ],
  'identifiants-et-preparation-mcd': [
    {
      type: 'exemple',
      titre: 'Regrouper autour des identifiants',
      situation: 'Le dictionnaire épuré d\'une boutique contient une dizaine de données. On les range derrière l\'identifiant dont elles dépendent.',
      langage: 'Regroupement',
      code: ['num_client  → nom_client, tel_client', 'ref_produit → designation, prix_unit', 'num_cde     → date_cde', '(num_cde, ref_produit) → qte'],
      resultat: ['Futures entités :', 'CLIENT, PRODUIT,', 'COMMANDE', '+ la quantité, qui relie', 'commande et produit'],
      narration:
        "Exemple concret : on range chaque donnée derrière l'identifiant qui la détermine. Chaque groupe deviendra une entité du MCD : client, produit, commande. La quantité dépend à la fois de la commande et du produit.",
    },
    {
      type: 'exemple',
      titre: 'Créer un identifiant',
      situation: 'Les salles de l\'école ne sont désignées que par leur nom : « Salle Bleue », « Labo info »…',
      langage: 'Solution',
      code: ['On crée : code_salle (AN 5)', '', 'S01 | Salle Bleue', 'S02 | Labo info'],
      resultat: ['Un code court, unique', 'et qui ne change pas'],
      narration: "Deuxième exemple : quand aucune donnée ne peut servir d'identifiant, on en crée un : un code court, unique et stable.",
    },
    {
      type: 'defi',
      question: 'Le nom de l\'étudiant peut-il servir d\'identifiant ?',
      reponse: 'Non',
      explication: 'Deux étudiants peuvent avoir le même nom (homonymes) : on utilise le matricule.',
      narration: "À toi de jouer. Le nom de l'étudiant peut-il servir d'identifiant ?",
    },
  ],
}

export const exemplesWeb: Record<string, SceneResume[]> = {
  // ——— Chapitre 1 : HTML ———
  'comment-fonctionne-le-web': [
    {
      type: 'exemple',
      titre: 'Ce qui se passe quand tu ouvres un site',
      situation: 'Tu tapes l\'adresse du site de ton école dans le navigateur de ton téléphone.',
      langage: 'Étapes',
      code: ['1. Le navigateur envoie une requête', '   au serveur de l\'école', '2. Le serveur renvoie le fichier', '   index.html (et le CSS, les images)', '3. Le navigateur lit le HTML', '   et affiche la page'],
      resultat: ['Client (navigateur)', '   ⇄', 'Serveur (hébergement)'],
      narration:
        "Exemple concret : quand tu ouvres un site, ton navigateur, le client, demande la page au serveur. Le serveur renvoie le fichier HTML, et le navigateur le transforme en page affichée.",
    },
    {
      type: 'exemple',
      titre: 'Ta première page',
      situation: 'Awa crée la page d\'accueil de son CV en ligne.',
      langage: 'HTML',
      code: ['<!DOCTYPE html>', '<html lang="fr">', '<head>', '  <title>CV d\'Awa Koné</title>', '</head>', '<body>', '  <h1>Awa Koné</h1>', '</body>', '</html>'],
      resultat: ['Onglet :', '  CV d\'Awa Koné', 'Page :', '  Awa Koné (gros titre)'],
      narration: "Deuxième exemple : une page minimale. Le titre dans head s'affiche dans l'onglet. Le contenu de body, ici un grand titre, s'affiche dans la page.",
    },
    {
      type: 'defi',
      question: 'Où s\'affiche le texte de la balise <title> ?',
      reponse: 'Dans l\'onglet du navigateur',
      explication: 'Il est aussi utilisé par Google dans les résultats de recherche. Il ne s\'affiche pas dans la page.',
      narration: "À toi de jouer. Où s'affiche le texte de la balise title ?",
    },
  ],
  'textes-listes-liens-images': [
    {
      type: 'exemple',
      titre: 'Le menu du maquis',
      situation: 'Le maquis veut afficher ses plats sous forme de liste sur son site.',
      langage: 'HTML',
      code: ['<h2>Nos plats</h2>', '<ul>', '  <li>Attiéké poisson</li>', '  <li>Garba</li>', '  <li>Kedjenou de poulet</li>', '</ul>'],
      resultat: ['Nos plats', '• Attiéké poisson', '• Garba', '• Kedjenou de poulet'],
      narration:
        "Exemple concret : une liste à puces. ul crée la liste, et chaque li est un élément de la liste.",
    },
    {
      type: 'exemple',
      titre: 'Le bouton « Commander sur WhatsApp »',
      situation: 'Le maquis veut que ses clients puissent commander directement sur WhatsApp, et afficher la photo d\'un plat.',
      langage: 'HTML',
      code: ['<a href="https://wa.me/2250102030405">', '  Commander sur WhatsApp', '</a>', '<img src="garba.jpg"', '     alt="Assiette de garba">'],
      resultat: ['Un lien cliquable qui', 'ouvre WhatsApp', '+ la photo du plat'],
      narration: "Deuxième exemple : la balise a crée un lien, l'attribut href indique où il mène. La balise img affiche une image, avec un texte alternatif dans alt.",
    },
    {
      type: 'defi',
      question: 'À quoi sert l\'attribut alt d\'une image ?',
      reponse: 'À décrire l\'image',
      explication: 'Le texte s\'affiche si l\'image ne charge pas, et il est lu aux personnes malvoyantes.',
      narration: "À toi de jouer. À quoi sert l'attribut alt d'une image ?",
      narrationReponse: "Réponse : à décrire l'image. Ce texte s'affiche si l'image ne charge pas, et il est lu aux personnes malvoyantes par leur logiciel.",
    },
  ],
  'tableaux-et-structure': [
    {
      type: 'exemple',
      titre: 'L\'emploi du temps',
      situation: 'La classe de BTS IDA 1 publie son emploi du temps du lundi.',
      langage: 'HTML',
      code: ['<table>', '  <tr><th>Heure</th><th>Cours</th></tr>', '  <tr><td>8 h</td><td>Merise</td></tr>', '  <tr><td>10 h</td><td>Anglais</td></tr>', '</table>'],
      resultat: ['Heure | Cours', '8 h   | Merise', '10 h  | Anglais'],
      narration:
        "Exemple concret : un tableau. Chaque tr est une ligne. th est une cellule d'en-tête, en gras, et td une cellule de données.",
    },
    {
      type: 'exemple',
      titre: 'La structure d\'un site',
      situation: 'Toutes les pages du site de l\'école ont la même organisation.',
      langage: 'HTML',
      code: ['<header>Logo de l\'école</header>', '<nav>Accueil · Filières · Contact</nav>', '<main>Contenu de la page</main>', '<footer>© 2026 · Abidjan</footer>'],
      resultat: ['En-tête', 'Menu', 'Contenu principal', 'Pied de page'],
      narration: "Deuxième exemple : les balises de structure. header pour l'en-tête, nav pour le menu, main pour le contenu principal, et footer pour le pied de page.",
    },
    {
      type: 'defi',
      question: 'Quelle balise utiliser pour une cellule d\'en-tête de tableau ?',
      reponse: '<th>',
      explication: 'th = table header (en-tête) ; td = table data (donnée).',
      narration: "À toi de jouer. Quelle balise utiliser pour une cellule d'en-tête de tableau ?",
      narrationReponse: "Réponse : la balise th, pour table header. La balise td sert aux cellules de données.",
    },
  ],

  // ——— Chapitre 2 : CSS ———
  'introduction-au-css': [
    {
      type: 'exemple',
      titre: 'La charte d\'une pharmacie',
      situation: 'La Pharmacie du Plateau veut ses titres en vert, centrés, et un texte gris foncé facile à lire.',
      langage: 'CSS',
      code: ['body {', '  font-family: Verdana, sans-serif;', '  color: #333333;', '}', 'h1 {', '  color: #0E8C6A;', '  text-align: center;', '}'],
      resultat: ['Titres verts et centrés', 'Texte gris foncé', 'Police Verdana partout'],
      narration:
        "Exemple concret : la charte graphique d'une pharmacie. La règle body fixe la police et la couleur du texte pour toute la page, et la règle h1 met les titres en vert et au centre.",
    },
    {
      type: 'exemple',
      titre: 'Un seul fichier pour tout le site',
      situation: 'Le site a 10 pages. La pharmacie change sa couleur verte : il suffit de modifier un seul fichier.',
      langage: 'HTML',
      code: ['<head>', '  <link rel="stylesheet"', '        href="charte.css">', '</head>'],
      resultat: ['1 modification', '= 10 pages mises à jour'],
      narration: "Deuxième exemple : avec un fichier CSS externe relié par la balise link, une seule modification met à jour toutes les pages du site.",
    },
    {
      type: 'defi',
      question: 'Que se passe-t-il avec cette règle ?',
      code: ['p { color: red font-size: 20px; }'],
      reponse: 'Rien ne marche',
      explication: 'Il manque le point-virgule après red : le navigateur ignore la déclaration, sans afficher d\'erreur.',
      narration: "À toi de jouer. Que se passe-t-il avec cette règle CSS ? Regarde bien.",
      narrationReponse: "Réponse : rien ne fonctionne. Il manque le point-virgule après red, donc le navigateur ignore la déclaration, sans aucun message d'erreur.",
    },
  ],
  'selecteurs-et-cascade': [
    {
      type: 'exemple',
      titre: 'Les prix en promotion',
      situation: 'Une boutique en ligne veut ses prix en rouge, et sur fond jaune seulement pour les produits en promo.',
      langage: 'CSS',
      code: ['.prix {', '  color: #C2370B;', '}', '.promo .prix {', '  background-color: #FFD84D;', '}'],
      resultat: ['Tous les prix : rouges', 'Prix des produits', 'en promo : fond jaune'],
      narration:
        "Exemple concret : la classe prix met tous les prix en rouge. Le sélecteur point promo espace point prix ne cible que les prix situés dans un produit en promotion.",
    },
    {
      type: 'exemple',
      titre: 'Qui gagne ?',
      situation: 'Trois règles donnent une couleur différente au même paragraphe : <p id="intro" class="important">.',
      langage: 'CSS',
      code: ['#intro     { color: green; }', '.important { color: blue; }', 'p          { color: red; }'],
      resultat: ['Vert !', 'id > classe > balise'],
      narration: "Deuxième exemple : la cascade. L'identifiant est plus précis que la classe, qui est plus précise que la balise. Le paragraphe est donc vert.",
    },
    {
      type: 'defi',
      question: 'Quel sélecteur cible uniquement les liens situés dans le menu <nav> ?',
      reponse: 'nav a',
      explication: 'Avec un espace : les <a> descendants de <nav>. « nav, a » ciblerait le menu ET tous les liens.',
      narration: "À toi de jouer. Quel sélecteur cible uniquement les liens situés dans le menu nav ?",
      narrationReponse: "Réponse : nav, espace, a. L'espace signifie : les liens qui sont à l'intérieur du menu.",
    },
  ],
  'modele-de-boite': [
    {
      type: 'exemple',
      titre: 'La largeur réelle d\'une carte produit',
      situation: 'Un développeur prévoit des cartes de 300 px, mais elles débordent. Pourquoi ?',
      langage: 'CSS',
      code: ['.carte {', '  width: 300px;', '  padding: 20px;', '  border: 2px solid;', '}'],
      resultat: ['300 + 20 + 20 + 2 + 2', '= 344 px de large !'],
      narration:
        "Exemple concret : par défaut, la largeur ne compte que le contenu. Le padding et la bordure s'ajoutent des deux côtés : la carte fait en réalité trois cent quarante-quatre pixels.",
    },
    {
      type: 'exemple',
      titre: 'La solution : border-box',
      situation: 'On ajoute une seule règle au début de la feuille de style.',
      langage: 'CSS',
      code: ['* {', '  box-sizing: border-box;', '}'],
      resultat: ['La carte fait', 'exactement 300 px', '(contenu : 256 px)'],
      narration: "Deuxième exemple : avec box-sizing border-box, la largeur inclut le padding et la bordure. La carte fait exactement trois cents pixels.",
    },
    {
      type: 'defi',
      question: 'Sans border-box, quelle est la largeur visible ?',
      code: ['width: 200px;', 'padding: 10px;', 'border: 1px solid;'],
      reponse: '222 px',
      explication: '200 + 10 + 10 + 1 + 1 = 222 px.',
      narration: "À toi de jouer. Sans border-box, quelle est la largeur visible de cette boîte ?",
      narrationReponse: "Réponse : deux cent vingt-deux pixels. Deux cents, plus dix et dix de padding, plus un et un de bordure.",
    },
  ],
}

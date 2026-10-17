import type { SceneResume } from '../types'

/*
 * Exemples concrets et défis ajoutés à la fin des résumés vidéo — Algorithmique.
 * Clé = slug de la leçon.
 */
export const exemplesAlgo: Record<string, SceneResume[]> = {
  // ——— Chapitre 1 : Variables et types ———
  'qu-est-ce-qu-un-algorithme': [
    {
      type: 'exemple',
      titre: 'Acheter du crédit avec Orange Money',
      situation: "Ta tante te demande comment acheter du crédit. Tu lui donnes des étapes précises, dans l'ordre : c'est déjà un algorithme !",
      langage: 'Algorithme en français',
      code: ['1. Composer #144#', '2. Choisir « Acheter du crédit »', '3. Saisir le montant : 1000', '4. Valider avec le code secret', '5. Attendre le SMS de confirmation'],
      resultat: ['Crédit de 1 000 F reçu', '', 'Étapes précises', '+ ordre précis', '+ une fin = algorithme'],
      narration:
        "Exemple concret. Pour expliquer à ta tante comment acheter du crédit, tu donnes des étapes précises, dans un ordre précis, et qui se terminent. C'est exactement la définition d'un algorithme.",
    },
    {
      type: 'exemple',
      titre: 'Le même principe, pour l\'ordinateur',
      situation: "L'application d'inscription de ton école souhaite la bienvenue à chaque nouvel étudiant.",
      langage: 'Algorithme',
      code: ['Algorithme Bienvenue', 'Variables', '    prenom : chaîne', 'Début', '    Écrire("Ton prénom ?")', '    Lire(prenom)', '    Écrire("Bienvenue ", prenom)', 'Fin'],
      resultat: ['Ton prénom ?', '> Awa', 'Bienvenue Awa'],
      narration:
        "Pour l'ordinateur, c'est pareil, mais écrit dans un langage précis. L'algorithme demande le prénom, le lit, puis affiche Bienvenue suivi du prénom. Si l'étudiante tape Awa, l'écran affiche Bienvenue Awa.",
    },
    {
      type: 'defi',
      question: 'Remets ces instructions dans le bon ordre :',
      code: ['A.  Écrire(total)', 'B.  Lire(prix)', 'C.  total ← prix * 2'],
      reponse: 'B, puis C, puis A',
      explication: 'On lit la donnée (entrée), on calcule (traitement), puis on affiche (sortie).',
      narration: "À toi de jouer. Remets ces trois instructions dans le bon ordre. Réfléchis bien.",
      narrationReponse: "Réponse : B, puis C, puis A. On lit d'abord la donnée, on calcule, et on affiche le résultat à la fin : entrée, traitement, sortie.",
    },
  ],
  'variables-types-constantes': [
    {
      type: 'exemple',
      titre: 'La fiche d\'un étudiant',
      situation: 'Le logiciel de scolarité doit mémoriser le nom, l\'âge, la moyenne et la décision du jury pour chaque étudiant.',
      langage: 'Algorithme',
      code: ['Variables', '    nom : chaîne', '    age : entier', '    moyenne : réel', '    admis : booléen'],
      resultat: ['nom     = "Koné"', 'age     = 19', 'moyenne = 13.5', 'admis   = VRAI'],
      narration:
        "Exemple concret : la fiche d'un étudiant. Le nom est une chaîne de caractères, l'âge un entier, la moyenne un réel car elle a une virgule, et la décision du jury un booléen : vrai ou faux.",
    },
    {
      type: 'exemple',
      titre: 'La TVA d\'une facture',
      situation: "Une boutique calcule le prix TTC de ses articles. Le taux de TVA (18 % en Côte d'Ivoire) ne change pas pendant le calcul : c'est une constante.",
      langage: 'Algorithme',
      code: ['Constante', '    TVA = 0.18', 'Variables', '    ht, ttc : réel', 'Début', '    ht ← 10000', '    ttc ← ht + ht * TVA', 'Fin'],
      resultat: ['ht  = 10 000', 'ttc = 11 800'],
      narration:
        "Deuxième exemple : la TVA. Le taux de dix-huit pour cent ne change pas, on le déclare donc comme une constante. Pour un prix hors taxe de dix mille francs, le prix toutes taxes comprises vaut onze mille huit cents francs.",
    },
    {
      type: 'defi',
      question: 'Quel type choisir pour un numéro de téléphone comme 0707123456 ?',
      reponse: 'Chaîne de caractères',
      explication: "On ne fait aucun calcul dessus, et un entier ferait disparaître le 0 du début.",
      narration: "À toi de jouer. Quel type choisir pour un numéro de téléphone ? Réfléchis.",
    },
  ],
  'affectation-et-calculs': [
    {
      type: 'exemple',
      titre: 'L\'addition au maquis',
      situation: 'Trois amis commandent 2 plats d\'attiéké poisson à 1 500 F et 3 jus de bissap à 500 F. Combien payer ?',
      langage: 'Algorithme',
      code: ['plats ← 2 * 1500', 'jus ← 3 * 500', 'total ← plats + jus', 'Écrire("Total : ", total, " F")'],
      resultat: ['plats = 3000', 'jus   = 1500', 'Total : 4500 F'],
      narration:
        "Exemple concret : l'addition au maquis. Deux plats à mille cinq cents francs font trois mille francs, trois jus à cinq cents francs font mille cinq cents. Le total, quatre mille cinq cents francs, est rangé dans la variable total, puis affiché.",
    },
    {
      type: 'exemple',
      titre: 'La durée d\'un film',
      situation: 'Un film dure 135 minutes. On veut l\'afficher en heures et minutes.',
      langage: 'Algorithme',
      code: ['duree ← 135', 'h ← duree DIV 60', 'm ← duree MOD 60', 'Écrire(h, " h ", m, " min")'],
      resultat: ['h = 2', 'm = 15', '2 h 15 min'],
      narration:
        "Deuxième exemple : convertir cent trente-cinq minutes. DIV donne le quotient de la division entière : deux heures. MOD donne le reste : quinze minutes.",
    },
    {
      type: 'defi',
      question: 'Que vaut a à la fin ?',
      code: ['a ← 5', 'b ← a + 2', 'a ← b * 2'],
      reponse: 'a = 14',
      explication: 'b reçoit 5 + 2 = 7, puis a reçoit 7 × 2 = 14 : son ancienne valeur (5) est écrasée.',
      narration: "À toi de jouer. Que vaut la variable a à la fin de ces trois instructions ?",
      narrationReponse: "Réponse : a vaut quatorze. b reçoit sept, puis a reçoit sept fois deux. L'ancienne valeur de a est écrasée.",
    },
  ],
  'lire-et-ecrire': [
    {
      type: 'exemple',
      titre: 'La surface d\'un terrain',
      situation: "Un agent immobilier de Bingerville veut connaître la surface d'un terrain dont il saisit la longueur et la largeur.",
      langage: 'Algorithme',
      code: ['Écrire("Longueur ?")', 'Lire(longueur)', 'Écrire("Largeur ?")', 'Lire(largeur)', 'surface ← longueur * largeur', 'Écrire("Surface : ", surface, " m²")'],
      resultat: ['Longueur ? > 20', 'Largeur ? > 15', 'Surface : 300 m²'],
      narration:
        "Exemple concret : la surface d'un terrain. Écrire affiche une question, Lire récupère la réponse tapée au clavier. Pour vingt mètres sur quinze, l'algorithme affiche trois cents mètres carrés.",
    },
    {
      type: 'exemple',
      titre: 'Rendre la monnaie',
      situation: 'À la caisse d\'une supérette, le client achète pour 3 750 F et donne un billet de 5 000 F.',
      langage: 'Algorithme',
      code: ['Lire(total)', 'Lire(donne)', 'monnaie ← donne - total', 'Écrire("Monnaie : ", monnaie, " F")'],
      resultat: ['> 3750', '> 5000', 'Monnaie : 1250 F'],
      narration: "Deuxième exemple : rendre la monnaie. Le caissier saisit le total et la somme donnée ; l'algorithme calcule la différence : mille deux cent cinquante francs.",
    },
    {
      type: 'defi',
      question: 'Avec prix ← 800, qu\'affichent ces deux instructions ?',
      code: ['Écrire("prix")', 'Écrire(prix)'],
      reponse: 'prix\n800',
      explication: 'Entre guillemets, le texte est affiché tel quel. Sans guillemets, on affiche la valeur de la variable.',
      narration: "À toi de jouer. Si la variable prix vaut huit cents, qu'affichent ces deux instructions ?",
      narrationReponse: "Réponse : la première affiche le mot prix, la deuxième affiche huit cents. Entre guillemets, c'est un texte ; sans guillemets, c'est la valeur de la variable.",
    },
  ],

  // ——— Chapitre 2 : Les conditions ———
  'si-alors': [
    {
      type: 'exemple',
      titre: 'La livraison gratuite',
      situation: 'Une boutique en ligne d\'Abidjan offre la livraison pour toute commande d\'au moins 20 000 F.',
      langage: 'Algorithme',
      code: ['Lire(montant)', 'Si montant >= 20000 Alors', '    Écrire("Livraison gratuite !")', 'FinSi', 'Écrire("Merci pour votre commande")'],
      resultat: ['25 000 F →', '  Livraison gratuite !', '  Merci pour votre commande', '12 000 F →', '  Merci pour votre commande'],
      narration:
        "Exemple concret : la livraison gratuite. Si le montant atteint vingt mille francs, on affiche le message. Sinon, on saute le bloc. Dans les deux cas, le message de remerciement s'affiche, car il est après FinSi.",
    },
    {
      type: 'exemple',
      titre: 'La réduction étudiant',
      situation: 'Un cybercafé fait 1 000 F de réduction aux étudiants sur le forfait de 5 000 F.',
      langage: 'Algorithme',
      code: ['prix ← 5000', 'Lire(etudiant)', 'Si etudiant = VRAI Alors', '    prix ← prix - 1000', 'FinSi', 'Écrire("À payer : ", prix, " F")'],
      resultat: ['Étudiant     → 4000 F', 'Non étudiant → 5000 F'],
      narration: "Deuxième exemple : la réduction étudiant. Le prix de départ est cinq mille francs. Si le client est étudiant, on retire mille francs. Sinon, le prix ne change pas.",
    },
    {
      type: 'defi',
      question: 'Qu\'affiche cet algorithme ?',
      code: ['note ← 9.5', 'Si note >= 10 Alors', '    Écrire("Admis")', 'FinSi', 'Écrire("Fin")'],
      reponse: 'Fin',
      explication: '9,5 n\'est pas supérieur ou égal à 10 : le bloc Si est sauté, seul « Fin » s\'affiche.',
      narration: "À toi de jouer. La note vaut neuf virgule cinq. Qu'affiche cet algorithme ?",
      narrationReponse: "Réponse : seulement Fin. Neuf virgule cinq n'est pas supérieur ou égal à dix, donc le bloc Si est sauté.",
    },
  ],
  'si-sinon-imbriques': [
    {
      type: 'exemple',
      titre: 'La mention au BTS',
      situation: 'Le logiciel de délibération attribue une mention selon la moyenne de l\'étudiant.',
      langage: 'Algorithme',
      code: ['Si moy >= 16 Alors m ← "Très bien"', 'SinonSi moy >= 14 Alors m ← "Bien"', 'SinonSi moy >= 12 Alors m ← "Assez bien"', 'SinonSi moy >= 10 Alors m ← "Passable"', 'Sinon m ← "Ajourné"', 'FinSi', 'Écrire(m)'],
      resultat: ['13.4 → Assez bien', '17   → Très bien', ' 8   → Ajourné'],
      narration:
        "Exemple concret : la mention. On teste les conditions de la plus grande à la plus petite. Dès qu'une condition est vraie, on affiche la mention et on sort. Avec treize virgule quatre, c'est Assez bien.",
    },
    {
      type: 'exemple',
      titre: 'Le prix du ticket de car',
      situation: 'Une compagnie de transport Abidjan–Bouaké : gratuit avant 5 ans, demi-tarif avant 12 ans, 4 000 F sinon.',
      langage: 'Algorithme',
      code: ['Lire(age)', 'Si age < 5 Alors', '    prix ← 0', 'SinonSi age < 12 Alors', '    prix ← 2000', 'Sinon', '    prix ← 4000', 'FinSi'],
      resultat: ['3 ans  → 0 F', '8 ans  → 2000 F', '30 ans → 4000 F'],
      narration: "Deuxième exemple : le prix d'un ticket de car. Moins de cinq ans, c'est gratuit. Moins de douze ans, demi-tarif. Sinon, plein tarif. Un enfant de huit ans paie deux mille francs.",
    },
    {
      type: 'defi',
      question: 'Avec moy = 17, qu\'affiche cet algorithme ?',
      code: ['Si moy >= 10 Alors Écrire("Passable")', 'SinonSi moy >= 16 Alors Écrire("Très bien")', 'FinSi'],
      reponse: 'Passable',
      explication: 'La première condition vraie gagne : 17 ≥ 10, donc « Passable ». Il faut tester du plus grand au plus petit.',
      narration: "À toi de jouer. L'étudiant a dix-sept de moyenne. Qu'affiche cet algorithme ? Attention au piège.",
      narrationReponse: "Réponse : Passable ! La première condition vraie gagne, et dix-sept est bien supérieur à dix. Il faut toujours tester du plus grand au plus petit.",
    },
  ],
  'operateurs-logiques': [
    {
      type: 'exemple',
      titre: 'L\'attribution d\'une bourse',
      situation: 'Une bourse est accordée aux étudiants qui ont au moins 12 de moyenne ET moins de 25 ans.',
      langage: 'Algorithme',
      code: ['Lire(moyenne)', 'Lire(age)', 'Si moyenne >= 12 ET age < 25 Alors', '    Écrire("Bourse accordée")', 'Sinon', '    Écrire("Bourse refusée")', 'FinSi'],
      resultat: ['13 et 22 ans → accordée', '13 et 27 ans → refusée', '11 et 20 ans → refusée'],
      narration:
        "Exemple concret : une bourse. Avec ET, les deux conditions doivent être vraies. Un étudiant de vingt-sept ans avec treize de moyenne est refusé, car la condition sur l'âge est fausse.",
    },
    {
      type: 'exemple',
      titre: 'Les horaires du maquis',
      situation: 'Le maquis ouvre à 10 h le samedi OU le dimanche, et à 17 h les autres jours.',
      langage: 'Algorithme',
      code: ['Lire(jour)', 'Si jour = "samedi" OU', '   jour = "dimanche" Alors', '    Écrire("Ouvert dès 10 h")', 'Sinon', '    Écrire("Ouvert dès 17 h")', 'FinSi'],
      resultat: ['dimanche → dès 10 h', 'mardi    → dès 17 h'],
      narration: "Deuxième exemple : avec OU, il suffit qu'une seule condition soit vraie. Le dimanche, la deuxième condition est vraie : le maquis ouvre à dix heures.",
    },
    {
      type: 'defi',
      question: 'note = 12 et absent = FAUX. Que vaut cette expression ?',
      code: ['NON (note < 10 OU absent)'],
      reponse: 'VRAI',
      explication: 'note < 10 est FAUX, absent est FAUX, donc (FAUX OU FAUX) = FAUX, et NON FAUX = VRAI.',
      narration: "À toi de jouer. La note vaut douze et l'étudiant n'est pas absent. Que vaut cette expression ?",
      narrationReponse: "Réponse : vrai. Note inférieure à dix est faux, absent est faux, faux ou faux donne faux, et non faux donne vrai.",
    },
  ],
  selon: [
    {
      type: 'exemple',
      titre: 'Le menu d\'un code USSD',
      situation: 'Quand tu composes un code de mobile money, un menu s\'affiche et tu tapes un numéro de choix.',
      langage: 'Algorithme',
      code: ['Lire(choix)', 'Selon choix faire', '    1 : Écrire("Consulter le solde")', '    2 : Écrire("Transférer de l\'argent")', '    3 : Écrire("Acheter du crédit")', '    Sinon : Écrire("Choix invalide")', 'FinSelon'],
      resultat: ['2 → Transférer de l\'argent', '7 → Choix invalide'],
      narration:
        "Exemple concret : le menu d'un code USSD. Selon compare la valeur du choix à chaque cas, et va directement au bon. Si aucun cas ne correspond, c'est la branche Sinon qui s'exécute.",
    },
    {
      type: 'exemple',
      titre: 'Le libellé d\'une filière',
      situation: 'Sur le relevé de notes, on veut afficher le nom complet de la filière à partir de son code.',
      langage: 'Algorithme',
      code: ['Selon code faire', '    "IDA"  : Écrire("Développeur d\'Application")', '    "FCGE" : Écrire("Finance Comptabilité")', '    "GEC"  : Écrire("Gestion Commerciale")', '    Sinon  : Écrire("Filière inconnue")', 'FinSelon'],
      resultat: ['"GEC" → Gestion Commerciale'],
      narration: "Deuxième exemple : Selon fonctionne aussi avec des textes. Pour le code GEC, on affiche Gestion Commerciale.",
    },
    {
      type: 'defi',
      question: 'Peut-on utiliser Selon pour afficher une mention selon que la moyenne est ≥ 16, ≥ 14, ≥ 12… ?',
      reponse: 'Non',
      explication: 'Selon compare des valeurs exactes. Pour des intervalles, il faut Si … SinonSi.',
      narration: "À toi de jouer. Peut-on utiliser Selon pour attribuer une mention à partir d'une moyenne ?",
      narrationReponse: "Réponse : non. Selon compare des valeurs exactes, comme un, deux ou trois. Pour des intervalles, il faut utiliser Si et SinonSi.",
    },
  ],

  // ——— Chapitre 3 : Les boucles ———
  'pourquoi-les-boucles': [
    {
      type: 'exemple',
      titre: 'La table de multiplication de 7',
      situation: 'Un élève de CM1 doit réviser sa table de 7. Écrire 10 lignes à la main ? Une boucle le fait pour lui.',
      langage: 'Algorithme',
      code: ['Pour i ← 1 à 10 faire', '    Écrire("7 x ", i, " = ", 7 * i)', 'FinPour'],
      resultat: ['7 x 1 = 7', '7 x 2 = 14', '…', '7 x 10 = 70'],
      narration:
        "Exemple concret : la table de sept. Au lieu d'écrire dix lignes, une boucle répète la même instruction dix fois, avec i qui vaut un, puis deux, jusqu'à dix.",
    },
    {
      type: 'exemple',
      titre: 'L\'épargne de la tontine',
      situation: 'Mariam épargne 15 000 F par mois. Combien de mois pour atteindre 100 000 F ? On ne le sait pas à l\'avance : la boucle continue tant que l\'objectif n\'est pas atteint.',
      langage: 'Algorithme',
      code: ['epargne ← 0', 'mois ← 0', 'TantQue epargne < 100000 faire', '    epargne ← epargne + 15000', '    mois ← mois + 1', 'FinTantQue', 'Écrire(mois, " mois")'],
      resultat: ['7 mois', '(épargne : 105 000 F)'],
      narration: "Deuxième exemple : l'épargne. Le nombre de tours n'est pas connu à l'avance, donc on utilise TantQue. Après sept mois, Mariam a cent cinq mille francs.",
    },
    {
      type: 'defi',
      question: 'Pour redemander un code PIN jusqu\'à ce qu\'il soit correct, quelle boucle choisir ?',
      reponse: 'Répéter … Jusqu\'à',
      explication: 'Le code doit être saisi au moins une fois, et on ne sait pas combien d\'essais il faudra.',
      narration: "À toi de jouer. Pour redemander un code PIN jusqu'à ce qu'il soit correct, quelle boucle choisir ?",
      narrationReponse: "Réponse : Répéter jusqu'à. Le code doit être saisi au moins une fois, et on ne sait pas combien d'essais il faudra.",
    },
  ],
  'la-boucle-pour': [
    {
      type: 'exemple',
      titre: 'Les ventes de la semaine',
      situation: 'Le gérant d\'une boutique saisit la recette de chacun des 7 jours de la semaine pour connaître le total.',
      langage: 'Algorithme',
      code: ['total ← 0', 'Pour j ← 1 à 7 faire', '    Lire(vente)', '    total ← total + vente', 'FinPour', 'Écrire("Total : ", total, " F")'],
      resultat: ['25000 30000 18500 22000', '27000 35000 25000', 'Total : 182500 F'],
      narration:
        "Exemple concret : le total des ventes de la semaine. Le nombre de jours est connu, sept, donc on utilise Pour. À chaque tour, on lit une vente et on l'ajoute au total, qui commence à zéro.",
    },
    {
      type: 'exemple',
      titre: 'La somme de 1 à 100',
      situation: 'Additionner tous les nombres de 1 à 100 à la main prendrait du temps. Avec une boucle, c\'est instantané.',
      langage: 'Algorithme',
      code: ['s ← 0', 'Pour i ← 1 à 100 faire', '    s ← s + i', 'FinPour', 'Écrire(s)'],
      resultat: ['5050'],
      narration: "Deuxième exemple : la somme de un à cent. La variable s accumule chaque valeur de i. Le résultat est cinq mille cinquante.",
    },
    {
      type: 'defi',
      question: 'Combien de fois la boucle s\'exécute-t-elle ?',
      code: ['Pour i ← 3 à 7 faire', '    Écrire(i)', 'FinPour'],
      reponse: '5 fois',
      explication: 'i prend les valeurs 3, 4, 5, 6 et 7 : 7 − 3 + 1 = 5 tours.',
      narration: "À toi de jouer. Combien de fois cette boucle s'exécute-t-elle ?",
      narrationReponse: "Réponse : cinq fois. i prend les valeurs trois, quatre, cinq, six et sept. On calcule sept moins trois plus un.",
    },
  ],
  'la-boucle-tantque': [
    {
      type: 'exemple',
      titre: 'Refuser une note impossible',
      situation: 'Dans le logiciel de notes, l\'enseignant tape 25 par erreur. Le programme doit redemander la note tant qu\'elle n\'est pas entre 0 et 20.',
      langage: 'Algorithme',
      code: ['Lire(note)', 'TantQue note < 0 OU note > 20 faire', '    Écrire("Note invalide")', '    Lire(note)', 'FinTantQue', 'Écrire("Note enregistrée : ", note)'],
      resultat: ['> 25', 'Note invalide', '> 14', 'Note enregistrée : 14'],
      narration:
        "Exemple concret : le contrôle de saisie. Tant que la note est en dehors de zéro à vingt, on affiche un message et on la redemande. Dès qu'elle est correcte, on sort de la boucle.",
    },
    {
      type: 'exemple',
      titre: 'Rembourser un prêt',
      situation: 'Koffi rembourse un prêt de 50 000 F à raison de 12 000 F par mois. En combien de mois ?',
      langage: 'Algorithme',
      code: ['dette ← 50000', 'mois ← 0', 'TantQue dette > 0 faire', '    dette ← dette - 12000', '    mois ← mois + 1', 'FinTantQue', 'Écrire(mois, " mois")'],
      resultat: ['5 mois'],
      narration: "Deuxième exemple : un remboursement. Après quatre mois, il reste deux mille francs à payer, donc la boucle fait un cinquième tour. Koffi rembourse en cinq mois.",
    },
    {
      type: 'defi',
      question: 'Quel est le problème de cet algorithme ?',
      code: ['x ← 10', 'TantQue x > 0 faire', '    x ← x + 1', 'FinTantQue'],
      reponse: 'Boucle infinie !',
      explication: 'x augmente au lieu de diminuer : la condition x > 0 reste toujours vraie.',
      narration: "À toi de jouer. Quel est le problème de cet algorithme ?",
      narrationReponse: "Réponse : c'est une boucle infinie. x augmente au lieu de diminuer, donc la condition reste toujours vraie, et le programme ne s'arrête jamais.",
    },
  ],
  'repeter-jusqua': [
    {
      type: 'exemple',
      titre: 'Le code PIN du guichet',
      situation: 'Au guichet automatique, tu tapes ton code au moins une fois, et on te le redemande jusqu\'à ce qu\'il soit correct.',
      langage: 'Algorithme',
      code: ['Répéter', '    Écrire("Code PIN :")', '    Lire(code)', 'Jusqu\'à code = 1234', 'Écrire("Accès autorisé")'],
      resultat: ['Code PIN : > 1111', 'Code PIN : > 1234', 'Accès autorisé'],
      narration:
        "Exemple concret : le code PIN. Les instructions sont exécutées une première fois, puis la condition est testée à la fin. Tant qu'elle est fausse, on recommence.",
    },
    {
      type: 'exemple',
      titre: 'Le menu d\'un jeu',
      situation: 'Un petit jeu affiche son menu en boucle, jusqu\'à ce que le joueur choisisse de quitter.',
      langage: 'Algorithme',
      code: ['Répéter', '    Écrire("1. Jouer   0. Quitter")', '    Lire(choix)', '    Si choix = 1 Alors', '        Écrire("Partie !")', '    FinSi', 'Jusqu\'à choix = 0', 'Écrire("Au revoir")'],
      resultat: ['> 1  Partie !', '> 1  Partie !', '> 0  Au revoir'],
      narration: "Deuxième exemple : un menu. Il doit s'afficher au moins une fois, puis revenir jusqu'à ce que le joueur tape zéro.",
    },
    {
      type: 'defi',
      question: 'Que vaut x à la fin ?',
      code: ['x ← 10', 'Répéter', '    x ← x + 1', 'Jusqu\'à x > 5'],
      reponse: 'x = 11',
      explication: 'Le corps est exécuté au moins une fois : x passe à 11, puis 11 > 5 est vrai, on s\'arrête.',
      narration: "À toi de jouer. x vaut dix au départ. Que vaut x à la fin ?",
      narrationReponse: "Réponse : onze. Avec Répéter, le corps est exécuté au moins une fois : x passe à onze, la condition est vraie, et on s'arrête.",
    },
  ],
  'exercices-boucles': [
    {
      type: 'exemple',
      titre: 'Compter les admis',
      situation: 'Un professeur saisit les 30 notes de sa classe et veut savoir combien d\'étudiants ont la moyenne.',
      langage: 'Algorithme',
      code: ['nb ← 0', 'Pour i ← 1 à 30 faire', '    Lire(note)', '    Si note >= 10 Alors', '        nb ← nb + 1', '    FinSi', 'FinPour', 'Écrire(nb, " admis")'],
      resultat: ['18 admis'],
      narration:
        "Exemple concret, très fréquent au BTS : un compteur dans une boucle. nb commence à zéro, et augmente de un à chaque note supérieure ou égale à dix.",
    },
    {
      type: 'exemple',
      titre: 'La meilleure note',
      situation: 'On veut aussi la meilleure note de la classe, sans trier.',
      langage: 'Algorithme',
      code: ['Lire(note)', 'max ← note', 'Pour i ← 2 à 30 faire', '    Lire(note)', '    Si note > max Alors', '        max ← note', '    FinSi', 'FinPour'],
      resultat: ['12, 15, 9, 17, 11…', 'max = 17'],
      narration: "Deuxième exemple : la recherche du maximum. On prend la première note comme maximum provisoire, puis chaque note plus grande le remplace.",
    },
    {
      type: 'defi',
      question: 'Que calcule cet algorithme ?',
      code: ['s ← 0', 'Pour i ← 1 à 5 faire', '    s ← s + i * i', 'FinPour', 'Écrire(s)'],
      reponse: '55',
      explication: 'La somme des carrés : 1 + 4 + 9 + 16 + 25 = 55.',
      narration: "À toi de jouer. Que calcule et qu'affiche cet algorithme ?",
      narrationReponse: "Réponse : cinquante-cinq. C'est la somme des carrés de un à cinq : un, plus quatre, plus neuf, plus seize, plus vingt-cinq.",
    },
  ],
}

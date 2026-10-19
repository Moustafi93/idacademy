import type { SceneResume } from '../types'

/*
 * Exemples et défis des résumés vidéo des chapitres PREMIUM du Langage C.
 * Jamais inclus dans le site public en production : exporté avec le contenu premium.
 */
export const exemplesCPremium: Record<string, SceneResume[]> = {
  // ——— Chapitre 3 : Conditions et boucles ———
  'les-conditions-en-c': [
    {
      type: 'exemple',
      titre: 'Le forfait internet',
      situation: 'Un opérateur offre 1 Go bonus si le client recharge au moins 5 000 F ET qu\'il est abonné depuis plus de 6 mois.',
      langage: 'C',
      code: ['if (recharge >= 5000 && mois > 6) {', '    printf("Bonus : 1 Go\\n");', '} else {', '    printf("Pas de bonus\\n");', '}'],
      resultat: ['recharge = 5000, mois = 8', '→ Bonus : 1 Go'],
      narration: "Exemple concret : les deux conditions doivent être vraies en même temps, on utilise donc deux esperluettes, le ET du C.",
    },
    {
      type: 'exemple',
      titre: 'Les tranches de consommation',
      situation: 'Le prix du kWh dépend de la consommation.',
      langage: 'C',
      code: ['if (kwh > 200)       prix = 95;', 'else if (kwh > 80)   prix = 79;', 'else                 prix = 62;'],
      resultat: ['kwh = 150 → prix = 79'],
      narration: "Deuxième exemple : des tranches. Le programme teste de la plus grande à la plus petite, et s'arrête au premier test vrai.",
    },
    {
      type: 'defi',
      question: 'Pourquoi ce code affiche-t-il toujours « Gagné » ?',
      code: ['if (numero = 7)', '    printf("Gagne");'],
      reponse: 'Un seul = affecte 7 à numero (toujours vrai). Il faut ==',
      narration: "À toi de jouer. Pourquoi ce programme affiche-t-il toujours gagné, quel que soit le numéro ?",
    },
  ],
  'le-choix-multiple-switch': [
    {
      type: 'exemple',
      titre: 'Le menu USSD',
      situation: 'Le client tape un chiffre dans le menu de son mobile money.',
      langage: 'C',
      code: ['switch (choix) {', '  case 1: printf("Transfert\\n"); break;', '  case 2: printf("Solde\\n"); break;', '  default: printf("Choix invalide\\n");', '}'],
      resultat: ['choix = 2 → Solde', 'choix = 9 → Choix invalide'],
      narration: "Exemple concret : un menu de mobile money. Chaque chiffre correspond à un case, et default traite les choix qui n'existent pas.",
    },
    {
      type: 'exemple',
      titre: 'Le break oublié',
      situation: 'Que se passe-t-il sans break ?',
      langage: 'C',
      code: ['case 1: printf("Petit ");', 'case 2: printf("Moyen ");', 'case 3: printf("Grand");'],
      resultat: ['taille = 2', '→ Moyen Grand'],
      narration: "Deuxième exemple : sans break, le programme continue dans les case suivants. Pour la taille 2, il affiche moyen, puis grand.",
    },
    {
      type: 'defi',
      question: 'Peut-on écrire switch (moyenne) avec float moyenne ?',
      reponse: 'Non : switch n\'accepte qu\'un entier ou un caractère',
      explication: 'Pour une moyenne, on utilise une suite de else if.',
      narration: "À toi de jouer. Peut-on faire un switch sur une moyenne de type float ?",
    },
  ],
  'les-boucles-en-c': [
    {
      type: 'exemple',
      titre: 'Le total d\'un panier',
      situation: 'Additionner les prix de 4 articles.',
      langage: 'C',
      code: ['total = 0;', 'for (i = 1; i <= 4; i++) {', '    scanf("%f", &prix);', '    total += prix;', '}'],
      resultat: ['Saisie : 1500 750 3000 500', '→ total = 5750'],
      narration: "Exemple concret : un accumulateur. Total commence à zéro, et chaque tour de la boucle for y ajoute le prix saisi.",
    },
    {
      type: 'exemple',
      titre: 'Le code PIN',
      situation: 'Redemander le code tant qu\'il est faux.',
      langage: 'C',
      code: ['do {', '    printf("Code PIN : ");', '    scanf("%d", &code);', '} while (code != 1234);'],
      resultat: ['Saisie : 1111, 1234', '→ 2 tours, puis on sort'],
      narration: "Deuxième exemple : do while demande le code au moins une fois, et recommence tant qu'il est différent du bon code.",
    },
    {
      type: 'defi',
      question: 'Combien de fois « Bonjour » s\'affiche-t-il ?',
      code: ['for (i = 10; i > 0; i -= 3)', '    printf("Bonjour\\n");'],
      reponse: '4 fois (i = 10, 7, 4, 1)',
      narration: "À toi de jouer. Combien de fois ce programme affiche-t-il bonjour ?",
    },
  ],
}

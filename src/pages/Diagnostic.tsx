import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MODE_SERVEUR, supabase } from '../lib/supabase'
import { useSession } from '../context/Session'

/*
 * Page /diagnostic : vérifie que le site est bien relié à Supabase et que tout est installé.
 * Chaque problème trouvé est accompagné de la marche à suivre pour le corriger.
 * Elle n'affiche aucun secret (seulement l'adresse publique du projet).
 */

type Etat = 'ok' | 'erreur' | 'attention' | 'info' | 'attente'

interface Verification {
  titre: string
  etat: Etat
  texte: ReactNode
  correction?: ReactNode
}

const URL_SUPABASE = import.meta.env.VITE_SUPABASE_URL as string | undefined
const CLE_SUPABASE = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const VERSION_ATTENDUE = 3

const STYLES: Record<Etat, { icone: string; classe: string }> = {
  ok: { icone: '✓', classe: 'bg-menthe text-menthe-fonce' },
  erreur: { icone: '✗', classe: 'bg-corail text-encre' },
  attention: { icone: '!', classe: 'bg-jaune text-encre' },
  info: { icone: 'i', classe: 'bg-bleu-clair text-bleu' },
  attente: { icone: '…', classe: 'bg-creme text-gris' },
}

const Chemin = ({ children }: { children: ReactNode }) => <strong className="rounded-md bg-creme px-1.5 py-0.5 font-bold text-encre">{children}</strong>

interface ReglagesAuth {
  disable_signup?: boolean
  mailer_autoconfirm?: boolean
  external?: { email?: boolean }
}

async function lancerVerifications(connecte: boolean): Promise<Verification[]> {
  const resultats: Verification[] = []

  // 1. Le site est-il relié à un serveur ?
  if (!MODE_SERVEUR || !URL_SUPABASE || !CLE_SUPABASE) {
    resultats.push({
      titre: 'Liaison avec Supabase',
      etat: 'erreur',
      texte: "Le site fonctionne en mode démo : il n'est relié à aucun serveur (les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont absentes).",
      correction: (
        <>
          Dans Netlify : <Chemin>Site configuration → Environment variables</Chemin>, ajoute les deux variables (valeurs dans Supabase : <Chemin>Project Settings → API</Chemin>), puis{' '}
          <Chemin>Deploys → Trigger deploy</Chemin>. Une variable n'est prise en compte qu'après une nouvelle mise en ligne.
        </>
      ),
    })
    return resultats
  }

  let hote = URL_SUPABASE
  try {
    hote = new URL(URL_SUPABASE).host
  } catch {
    /* adresse mal formée : signalée ci-dessous */
  }
  const urlCorrecte = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(URL_SUPABASE.trim())
  resultats.push({
    titre: 'Adresse du projet Supabase',
    etat: urlCorrecte ? 'ok' : 'attention',
    texte: (
      <>
        Le site est relié à <strong>{hote}</strong>.
      </>
    ),
    correction: urlCorrecte ? undefined : (
      <>
        L'adresse doit ressembler à <Chemin>https://abcd1234.supabase.co</Chemin>, sans « / » ni texte après. Copie la <Chemin>Project URL</Chemin> de <Chemin>Project Settings → API</Chemin>.
      </>
    ),
  })

  // 2. Le serveur de comptes répond-il, et la clé est-elle acceptée ?
  let reglages: ReglagesAuth | null = null
  try {
    const reponse = await fetch(`${URL_SUPABASE.replace(/\/$/, '')}/auth/v1/settings`, { headers: { apikey: CLE_SUPABASE } })
    if (reponse.ok) {
      reglages = await reponse.json()
      resultats.push({ titre: 'Serveur des comptes et clé', etat: 'ok', texte: 'Le serveur répond et accepte la clé du site.' })
    } else if (reponse.status === 401 || reponse.status === 403) {
      resultats.push({
        titre: 'Serveur des comptes et clé',
        etat: 'erreur',
        texte: `Le serveur refuse la clé du site (erreur ${reponse.status}).`,
        correction: (
          <>
            VITE_SUPABASE_ANON_KEY doit contenir la clé <Chemin>anon public</Chemin> (ou « publishable ») de <Chemin>Project Settings → API</Chemin>, en entier, sans espace. Corrige-la dans Netlify, puis redéploie.
          </>
        ),
      })
    } else {
      resultats.push({ titre: 'Serveur des comptes et clé', etat: 'attention', texte: `Réponse inattendue du serveur (erreur ${reponse.status}). Réessaie dans quelques minutes.` })
    }
  } catch {
    resultats.push({
      titre: 'Serveur des comptes et clé',
      etat: 'erreur',
      texte: `Impossible de joindre ${hote}.`,
      correction: (
        <>
          Vérifie ta connexion internet, puis l'adresse VITE_SUPABASE_URL. Sur l'offre gratuite, un projet inactif depuis une semaine est mis en pause : ouvre ton projet sur supabase.com et clique sur <Chemin>Restore project</Chemin>.
        </>
      ),
    })
  }

  // 3. Réglages des inscriptions et des e-mails
  if (reglages) {
    resultats.push({
      titre: 'Inscriptions',
      etat: reglages.disable_signup ? 'erreur' : 'ok',
      texte: reglages.disable_signup ? 'Les inscriptions sont désactivées : personne ne peut créer de compte.' : 'Les nouveaux étudiants peuvent créer un compte.',
      correction: reglages.disable_signup ? (
        <>
          Supabase : <Chemin>Authentication → Sign In / Providers</Chemin>, active <Chemin>Allow new users to sign up</Chemin>.
        </>
      ) : undefined,
    })
    if (reglages.external && reglages.external.email === false)
      resultats.push({
        titre: 'Connexion par e-mail',
        etat: 'erreur',
        texte: 'La connexion par e-mail et mot de passe est désactivée.',
        correction: (
          <>
            Supabase : <Chemin>Authentication → Sign In / Providers → Email</Chemin>, active le fournisseur <Chemin>Email</Chemin>.
          </>
        ),
      })
    resultats.push(
      reglages.mailer_autoconfirm
        ? {
            titre: "Confirmation de l'adresse e-mail",
            etat: 'attention',
            texte: "La confirmation par e-mail est désactivée : les comptes sont activés tout de suite. C'est pratique pour tester, mais n'importe qui peut s'inscrire avec l'adresse d'un autre.",
            correction: (
              <>
                Avant d'annoncer le site : configure un SMTP (voir ci-dessous), puis réactive <Chemin>Confirm email</Chemin> dans <Chemin>Authentication → Sign In / Providers → Email</Chemin>.
              </>
            ),
          }
        : {
            titre: "Confirmation de l'adresse e-mail",
            etat: 'attention',
            texte: (
              <>
                La confirmation par e-mail est activée : chaque inscription envoie un e-mail. <strong>Sans SMTP personnalisé</strong>, Supabase n'envoie qu'aux membres de ton équipe Supabase, et seulement 2 e-mails par heure. Les autres inscriptions échouent (« Email address not authorized »). Cette page ne peut pas voir si un SMTP est configuré.
              </>
            ),
            correction: (
              <>
                <strong>Solution durable</strong> : crée un compte gratuit Brevo (300 e-mails par jour) et renseigne-le dans <Chemin>Authentication → Emails → SMTP Settings</Chemin>.
                <br />
                <strong>Pour tester tout de suite</strong> : désactive <Chemin>Confirm email</Chemin> dans <Chemin>Authentication → Sign In / Providers → Email</Chemin> (à réactiver avant le lancement).
                <br />
                Pour voir la cause exacte d'un échec : <Chemin>Logs → Auth</Chemin>.
              </>
            ),
          },
    )
  }

  // 4. Les fichiers SQL ont-ils été exécutés ?
  if (supabase) {
    const tarifs = await supabase.from('tarifs').select('formule')
    resultats.push(
      tarifs.error
        ? {
            titre: 'Base de données (fichier SQL n°1)',
            etat: 'erreur',
            texte: `Les tables d'IDAcademy sont introuvables (${tarifs.error.code ?? ''} ${tarifs.error.message}).`,
            correction: (
              <>
                Supabase : <Chemin>SQL Editor</Chemin>, exécute <Chemin>supabase/migrations/20261015000000_idacademy.sql</Chemin>, puis les fichiers suivants dans l'ordre.
              </>
            ),
          }
        : { titre: 'Base de données (fichier SQL n°1)', etat: 'ok', texte: `Tables installées (${tarifs.data.length} formules d'abonnement).` },
    )

    const statut = await supabase.rpc('statut_mes_paiements')
    const migration2 = !statut.error || statut.error.code === '42501' // 42501 = installé mais réservé aux comptes connectés
    resultats.push(
      migration2
        ? { titre: 'Paiements réservés à l\'admin (fichier SQL n°2)', etat: 'ok', texte: 'Installé.' }
        : {
            titre: 'Paiements réservés à l\'admin (fichier SQL n°2)',
            etat: 'erreur',
            texte: 'Pas encore installé.',
            correction: (
              <>
                <Chemin>SQL Editor</Chemin> : exécute <Chemin>20261015120000_paiements_reserves_admin.sql</Chemin>.
              </>
            ),
          },
    )

    const version = await supabase.rpc('version_schema')
    const v = typeof version.data === 'number' ? version.data : 0
    resultats.push(
      v >= VERSION_ATTENDUE
        ? { titre: 'Nom et prénom à l\'inscription (fichier SQL n°3)', etat: 'ok', texte: 'Installé.' }
        : {
            titre: 'Nom et prénom à l\'inscription (fichier SQL n°3)',
            etat: 'erreur',
            texte: "Pas encore installé : le nom des étudiants ne sera pas enregistré.",
            correction: (
              <>
                <Chemin>SQL Editor</Chemin> : exécute <Chemin>20261016000000_nom_et_diagnostic.sql</Chemin>.
              </>
            ),
          },
    )

    if (connecte) {
      const contenu = await supabase.from('contenu_premium').select('cle', { count: 'exact', head: true })
      resultats.push({
        titre: 'Contenu premium',
        etat: contenu.count ? 'ok' : 'info',
        texte: contenu.count
          ? `${contenu.count} chapitre(s) premium installé(s).`
          : "Aucun chapitre premium visible : soit le fichier supabase/contenu_premium.sql n'a pas été exécuté, soit ton compte n'a pas d'accès Premium en cours.",
      })
    }
  }
  return resultats
}

export default function Diagnostic() {
  const { utilisateur, estAdmin, pret } = useSession()
  const [verifications, setVerifications] = useState<Verification[] | null>(null)

  const lancer = useCallback(async () => {
    setVerifications(null)
    setVerifications(await lancerVerifications(!!utilisateur))
  }, [utilisateur])

  useEffect(() => {
    if (pret) lancer()
  }, [pret, lancer])

  const erreurs = verifications?.filter((v) => v.etat === 'erreur').length ?? 0

  return (
    <div className="mx-auto mt-4 flex max-w-3xl flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[13px] font-bold text-gris">Outil de l'administrateur</p>
          <h1 className="m-0 font-display text-3xl font-bold">Diagnostic du site</h1>
        </div>
        <button type="button" onClick={lancer} className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-5 font-bold">
          Relancer
        </button>
      </header>

      {verifications && (
        <p role="status" className={`m-0 rounded-2xl p-4 font-bold ${erreurs ? 'bg-[#FFE3D8] text-[#9A2A06]' : 'bg-menthe text-menthe-fonce'}`}>
          {erreurs ? `${erreurs} problème${erreurs > 1 ? 's' : ''} à corriger : suis les instructions sous chaque ligne rouge, puis clique sur « Relancer ».` : 'Aucun problème bloquant. Lis quand même les points en jaune.'}
        </p>
      )}

      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {(verifications ?? [{ titre: 'Vérification en cours…', etat: 'attente' as const, texte: 'Un instant.' }]).map((v) => (
          <li key={v.titre} className="flex gap-3.5 rounded-[24px] border border-ligne bg-white p-5">
            <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-black ${STYLES[v.etat].classe}`}>
              {STYLES[v.etat].icone}
            </span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h2 className="m-0 font-display text-base font-bold">{v.titre}</h2>
              <p className="m-0 text-[15px] font-semibold leading-relaxed text-gris">{v.texte}</p>
              {v.correction && <p className="m-0 rounded-2xl bg-fond p-3 text-sm font-semibold leading-relaxed text-encre">{v.correction}</p>}
            </div>
          </li>
        ))}
      </ul>

      <p className="m-0 text-sm font-semibold text-gris">
        {estAdmin ? (
          <Link to="/admin">Retour à l'espace admin</Link>
        ) : (
          'Cette page ne montre aucune information secrète : seulement l\'adresse publique du projet et l\'état de l\'installation.'
        )}
      </p>
    </div>
  )
}

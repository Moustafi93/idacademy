import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSession } from '../context/Session'
import { formaterPrix } from '../lib/affichage'
import { MOYENS, MOYENS_ETUDIANT, type Formule, type MoyenEtudiant } from '../lib/paiement'
import { useTarifs } from '../lib/useTarifs'
import { payerAvecDjamo } from '../lib/djamo'
import { CONFIG } from '../config'
import { useReglages } from '../context/Reglages'
import { IconeCoche, IconeWhatsapp } from '../components/Icones'

const ORDRE: Formule[] = ['trimestre', 'mensuel', 'examen']

const styles: Record<Formule, string> = {
  trimestre: 'border border-ligne bg-white text-encre',
  mensuel: 'bg-bleu text-white lg:-translate-y-2',
  examen: 'bg-menthe text-menthe-fonce',
}

const AVANTAGES = [
  'Tous les chapitres des 21 matières',
  'Sujets types BTS corrigés',
  'Résumés vidéo, exemples et défis',
  'Exercices de code corrigés automatiquement',
  'Aucun renouvellement automatique',
]

const champ = 'h-[50px] min-w-0 rounded-full border border-ligne bg-white px-[18px] font-mono text-[15px] text-encre'

export default function Abonnement() {
  const session = useSession()
  const { utilisateur, aAccesComplet, joursRestants, typeAcces, appliquerCode, declarerPaiement, paiementEnAttente, paiementRefuse, modeServeur, rafraichir } = session
  const formules = useTarifs()
  const [params] = useSearchParams()
  const [formule, setFormule] = useState<Formule>('mensuel')
  const [moyen, setMoyen] = useState<MoyenEtudiant | null>(null)
  const [code, setCode] = useState('')
  const [reference, setReference] = useState('')
  const [numero, setNumero] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [messageCode, setMessageCode] = useState<{ ok: boolean; texte: string } | null>(null)
  const [messagePaiement, setMessagePaiement] = useState<{ ok: boolean; texte: string } | null>(null)
  const [copie, setCopie] = useState(false)

  const prix = formules[formule].prix
  const retourDjamo = params.get('djamo') === 'termine'

  // Moyens proposés : ceux dont le numéro est configuré (tous en mode démo)
  const { numeros, valeurs, lienWhatsapp } = useReglages()
  const moyens = MOYENS_ETUDIANT.filter((m) => !modeServeur || numeros[m] || (m === 'djamo' && CONFIG.djamoAutomatique))
  const numeroMoyen = moyen ? numeros[moyen] || (modeServeur ? '' : '07 00 00 00 00 (démo)') : ''
  const djamoAuto = moyen === 'djamo' && CONFIG.djamoAutomatique

  // Retour de Djamo : on vérifie l'activation quelques fois (le webhook peut prendre quelques secondes)
  useEffect(() => {
    if (!retourDjamo || aAccesComplet) return
    const t = setInterval(rafraichir, 4000)
    const fin = setTimeout(() => clearInterval(t), 60_000)
    return () => {
      clearInterval(t)
      clearTimeout(fin)
    }
  }, [retourDjamo, aAccesComplet, rafraichir])

  const validerCode = async (e: FormEvent) => {
    e.preventDefault()
    const r = await appliquerCode(code)
    setMessageCode({ ok: r.ok, texte: r.message })
  }

  const declarer = async (e: FormEvent) => {
    e.preventDefault()
    if (!moyen) return
    setEnvoi(true)
    const r = await declarerPaiement(formule, moyen, reference, numero)
    setEnvoi(false)
    setMessagePaiement({ ok: r.ok, texte: r.message })
    if (r.ok) {
      setReference('')
      setNumero('')
      setMoyen(null)
    }
  }

  const lancerDjamo = async () => {
    setEnvoi(true)
    const r = await payerAvecDjamo(formule)
    if (!r.ok) {
      setEnvoi(false)
      setMessagePaiement({ ok: false, texte: r.message })
    }
  }

  const copierNumero = async () => {
    try {
      await navigator.clipboard.writeText(numeroMoyen.replace(/\s/g, ''))
      setCopie(true)
      setTimeout(() => setCopie(false), 1500)
    } catch {
      /* copie impossible : le numéro reste affiché */
    }
  }

  // Message pré-rempli : l'étudiant n'a pas besoin de connaître les détails, l'admin les voit dans son espace
  const messageWhatsapp = `Bonjour IDAcademy, je viens d'effectuer et de déclarer mon paiement pour le compte ${utilisateur?.email ?? ''}. Merci d'activer mon accès.`

  return (
    <div className="flex flex-col gap-7">
      <div className="mt-2.5 flex flex-col items-center gap-3 text-center">
        {aAccesComplet && (
          <span className="-rotate-2 rounded-full bg-jaune px-3.5 py-1.5 text-[13px] font-extrabold">
            {typeAcces === 'premium' ? 'Premium' : 'Essai'} : encore {joursRestants} jour{joursRestants > 1 ? 's' : ''}
          </span>
        )}
        <h1 className="m-0 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-[52px]">
          Débloque tout <span className="text-bleu">IDAcademy</span>
        </h1>
        <p className="m-0 max-w-[620px] text-[17px] font-semibold text-gris">
          Tous les cours, sujets types BTS corrigés et exercices. Paie par mobile money, sans carte bancaire. Ta progression est gardée à la fin de l'abonnement.
        </p>
      </div>

      {retourDjamo && (
        <div role="status" className={`rounded-3xl p-4 text-center font-bold ${aAccesComplet ? 'bg-menthe text-menthe-fonce' : 'bg-jaune'}`}>
          {aAccesComplet ? 'Paiement Djamo confirmé : ton accès Premium est actif !' : 'Paiement Djamo reçu : activation de ton accès en cours…'}
        </div>
      )}

      <fieldset className="m-0 grid grid-cols-1 gap-4 border-0 p-0 md:grid-cols-3">
        <legend className="sr-only">Choisir une formule</legend>
        {ORDRE.map((f) => {
          const info = formules[f]
          return (
            <label key={f} className={`flex cursor-pointer flex-col gap-3 rounded-[32px] p-7 ${styles[f]} ${formule === f ? 'ring-4 ring-jaune' : ''}`}>
              <span className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{info.nom}</span>
                <input type="radio" name="formule" checked={formule === f} onChange={() => setFormule(f)} disabled={!info.prix} className="m-0 size-[22px] accent-jaune" />
              </span>
              <span>
                <span className="font-display text-[40px] font-extrabold tracking-tight">{info.prix ? formaterPrix(info.prix) : 'Bientôt'}</span>
                {f === 'mensuel' && <span className="text-sm font-bold text-bleu-doux"> / {info.jours} jours</span>}
              </span>
              <span className="text-sm font-bold opacity-80">{info.detail}</span>
              {f === 'mensuel' && <span className="self-start rounded-full bg-jaune px-3 py-1.5 text-xs font-extrabold text-encre">Le plus choisi</span>}
            </label>
          )
        })}
      </fieldset>

      <div className="flex flex-wrap items-start gap-4">
        <section className="flex min-w-0 flex-[3_1_420px] flex-col gap-5 rounded-[32px] border border-ligne bg-white p-7">
          <h2 className="m-0 font-display text-xl font-bold">Paiement</h2>

          {!utilisateur ? (
            <div className="flex flex-col gap-3 rounded-3xl bg-fond p-5">
              <p className="m-0 font-semibold leading-relaxed">
                Pour payer ou utiliser ton code d'essai, crée d'abord ton compte (gratuit) : ton accès Premium y sera rattaché, sur tous tes appareils.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/connexion?retour=/abonnement" className="flex h-12 items-center rounded-full bg-bleu px-6 font-extrabold text-white no-underline">
                  Créer mon compte
                </Link>
                <Link to="/connexion?mode=connexion&retour=/abonnement" className="flex h-12 items-center rounded-full border border-ligne px-6 font-bold text-encre no-underline">
                  J'ai déjà un compte
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* L'étudiant sait seulement qu'un paiement est en vérification : les détails sont dans l'espace admin */}
              {paiementEnAttente && (
                <div role="status" className="flex flex-col gap-2.5 rounded-3xl bg-jaune p-5">
                  <p className="m-0 font-bold">Ton paiement a bien été reçu et est en cours de vérification.</p>
                  <p className="m-0 text-sm font-semibold text-[#3D3415]">Ton accès sera activé automatiquement, en général en moins de 2 heures (de 7 h à 22 h).</p>
                  {valeurs.whatsapp && (
                    <a href={lienWhatsapp(messageWhatsapp)} target="_blank" rel="noreferrer" className="flex h-11 items-center gap-2 self-start rounded-full bg-encre px-5 text-sm font-extrabold text-white no-underline">
                      <IconeWhatsapp /> Accélérer la vérification sur WhatsApp
                    </a>
                  )}
                </div>
              )}
              {paiementRefuse && !paiementEnAttente && (
                <div role="status" className="flex flex-col gap-2 rounded-3xl bg-[#FFE3D8] p-5 text-[#9A2A06]">
                  <p className="m-0 font-bold">Ton dernier paiement n'a pas pu être vérifié.</p>
                  <p className="m-0 text-sm font-semibold">Vérifie la référence reçue par SMS et déclare-le à nouveau, ou contacte-nous sur WhatsApp.</p>
                </div>
              )}

              {messagePaiement && (
                <p role="status" className={`m-0 rounded-2xl p-3.5 text-sm font-bold ${messagePaiement.ok ? 'bg-menthe text-menthe-fonce' : 'bg-[#FFE3D8] text-[#9A2A06]'}`}>
                  {messagePaiement.texte}
                </p>
              )}

              {/* Étape 1 : le moyen de paiement */}
              <div className="flex flex-col gap-2.5">
                <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-gris">1. Choisis ton moyen de paiement</p>
                {moyens.length === 0 ? (
                  <p className="m-0 font-semibold text-gris">Le paiement sera bientôt disponible.</p>
                ) : (
                  <div role="radiogroup" aria-label="Moyen de paiement" className="flex flex-wrap gap-2">
                    {moyens.map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={moyen === m}
                        disabled={!prix}
                        onClick={() => {
                          setMoyen(m)
                          setMessagePaiement(null)
                        }}
                        className={`flex h-12 cursor-pointer items-center gap-2 rounded-full border-2 px-4 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-50 ${
                          moyen === m ? 'border-bleu bg-bleu-clair text-bleu' : 'border-ligne bg-white text-encre'
                        }`}
                      >
                        <span aria-hidden className={`grid size-6 place-items-center rounded-full text-[10px] font-black ${MOYENS[m].couleur}`}>
                          {MOYENS[m].nom.charAt(0)}
                        </span>
                        {MOYENS[m].nom}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {moyen && prix && djamoAuto && (
                <div className="flex flex-col gap-2.5 rounded-3xl bg-fond p-5">
                  <button
                    type="button"
                    onClick={lancerDjamo}
                    disabled={envoi}
                    className="h-14 cursor-pointer rounded-full border-0 bg-encre text-base font-extrabold text-white disabled:opacity-60"
                  >
                    {envoi ? 'Redirection…' : `Payer ${formaterPrix(prix)} avec Djamo`}
                  </button>
                  <p className="m-0 text-[13px] font-semibold text-gris">Tu valides le paiement dans ton application Djamo ; ton accès s'active tout seul.</p>
                </div>
              )}

              {moyen && prix && !djamoAuto && (
                <>
                  {/* Étape 2 : envoyer l'argent */}
                  <div className="flex flex-col gap-2.5">
                    <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-gris">2. Envoie le montant</p>
                    <div className="flex flex-col gap-3 rounded-3xl bg-fond p-5">
                      <p className="m-0 font-semibold leading-relaxed">
                        Envoie exactement <strong>{formaterPrix(prix)}</strong> par <strong>{MOYENS[moyen].nom}</strong> au :
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-2xl bg-white px-4 py-2.5 font-mono text-xl font-bold tracking-wide">{numeroMoyen}</span>
                        <button type="button" onClick={copierNumero} className="h-11 cursor-pointer rounded-full border border-ligne bg-white px-4 text-sm font-bold">
                          {copie ? 'Copié !' : 'Copier'}
                        </button>
                      </div>
                      <p className="m-0 text-sm font-semibold text-gris">
                        Nom du bénéficiaire : <strong className="text-encre">{valeurs.nom_beneficiaire || 'IDAcademy'}</strong>. Vérifie-le avant de valider.
                      </p>
                      {moyen === 'wave' && valeurs.lien_wave && (
                        <a href={valeurs.lien_wave} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center self-start rounded-full bg-[#1DC8FF] px-5 text-sm font-extrabold text-encre no-underline">
                          Ouvrir le lien de paiement Wave
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Étape 3 : déclarer la référence */}
                  <form onSubmit={declarer} className="flex flex-col gap-2.5">
                    <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-gris">3. Déclare ton paiement</p>
                    <label htmlFor="reference" className="text-sm font-bold text-gris">
                      Référence de la transaction
                    </label>
                    <input id="reference" required minLength={4} value={reference} onChange={(e) => setReference(e.target.value)} className={champ} />
                    <p className="m-0 text-[13px] font-semibold text-gris">{MOYENS[moyen].aide}</p>
                    <label htmlFor="numero" className="mt-1 text-sm font-bold text-gris">
                      Numéro qui a payé <span className="font-semibold">(facultatif, aide à vérifier plus vite)</span>
                    </label>
                    <input id="numero" type="tel" autoComplete="tel" value={numero} onChange={(e) => setNumero(e.target.value)} className={champ} />
                    <button type="submit" disabled={envoi} className="mt-1 h-[52px] cursor-pointer rounded-full border-0 bg-bleu text-[15px] font-extrabold text-white disabled:opacity-60">
                      {envoi ? 'Envoi…' : "J'ai payé : déclarer mon paiement"}
                    </button>
                  </form>
                </>
              )}

              {/* Code d'essai */}
              <form id="code" onSubmit={validerCode} className="flex flex-col gap-1.5 border-t border-ligne pt-5">
                <label htmlFor="champ-code" className="text-sm font-bold text-gris">
                  Code d'essai
                </label>
                <div className="flex gap-2">
                  <input id="champ-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ex. IDA3" className={`${champ} flex-1 bg-fond`} />
                  <button type="submit" className="h-[50px] cursor-pointer rounded-full border-[1.5px] border-encre bg-white px-5 text-sm font-extrabold text-encre">
                    Appliquer
                  </button>
                </div>
                {messageCode && (
                  <p role="status" className={`m-0 text-sm font-bold ${messageCode.ok ? 'text-[#0E7A4C]' : 'text-[#C2370B]'}`}>
                    {messageCode.texte}
                  </p>
                )}
              </form>

            </>
          )}
        </section>

        <section className="flex min-w-0 flex-[2_1_300px] flex-col gap-3.5 rounded-[32px] bg-jaune p-7">
          <h2 className="m-0 font-display text-xl font-bold">Inclus dans Premium</h2>
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] font-bold">
            {AVANTAGES.map((a) => (
              <li key={a} className="flex items-center gap-2.5">
                <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-encre text-jaune">
                  <IconeCoche taille={12} strokeWidth={3} />
                </span>
                {a}
              </li>
            ))}
          </ul>
          <a href={lienWhatsapp("Bonjour IDAcademy, j'ai une question sur l'abonnement.")} target="_blank" rel="noreferrer" className="mt-auto flex min-h-11 items-center gap-2 text-sm font-extrabold text-encre no-underline">
            <IconeWhatsapp /> Une question ? Écris-nous sur WhatsApp
          </a>
        </section>
      </div>
    </div>
  )
}

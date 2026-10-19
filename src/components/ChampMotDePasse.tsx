import { useState } from 'react'

/*
 * Champ « mot de passe » avec un bouton pour afficher ou masquer ce qu'on tape.
 * Pratique sur téléphone, où les fautes de frappe sont fréquentes.
 */
interface Props {
  id: string
  valeur: string
  onChange: (v: string) => void
  nouveau?: boolean // nouveau mot de passe (inscription) ou mot de passe existant (connexion)
  className?: string
}

export function ChampMotDePasse({ id, valeur, onChange, nouveau = false, className = '' }: Props) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative flex">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        required
        minLength={6}
        autoComplete={nouveau ? 'new-password' : 'current-password'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pr-[54px] ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        aria-pressed={visible}
        aria-controls={id}
        title={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-gris hover:bg-creme hover:text-encre"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
          {visible && <path d="M3 3l18 18" />}
        </svg>
      </button>
    </div>
  )
}

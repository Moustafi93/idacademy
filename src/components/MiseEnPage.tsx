import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSession } from '../context/Session'
import { useReglages } from '../context/Reglages'
import { Logo } from './ui'

const liens = [
  { to: '/', label: 'Accueil', fin: true },
  { to: '/matieres', label: 'Matières', fin: false },
  { to: '/preparation-bts', label: 'Préparation BTS', fin: false },
  { to: '/coder', label: 'Coder', fin: false },
]

export function EnTete() {
  const { utilisateur, aAccesComplet, typeAcces, estAdmin } = useSession()
  const initiale = utilisateur?.prenom.charAt(0).toUpperCase() ?? '?'

  return (
    <header className="flex flex-wrap items-center gap-x-5 gap-y-3 py-1.5">
      <Logo />
      <nav
        aria-label="Navigation principale"
        className="order-3 mx-auto flex w-full gap-1 overflow-x-auto whitespace-nowrap rounded-full border border-ligne bg-white p-1.5 sm:order-none sm:w-auto"
      >
        {[...liens, ...(estAdmin ? [{ to: '/admin', label: 'Admin', fin: false }] : [])].map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.fin}
            className={({ isActive }) =>
              `flex h-10 shrink-0 items-center rounded-full px-4 text-sm no-underline transition-colors ${
                isActive ? 'bg-encre font-extrabold text-white' : 'font-semibold text-gris hover:bg-creme'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        {!estAdmin && !(aAccesComplet && typeAcces === 'premium') && (
          <Link
            to="/abonnement"
            className="hidden h-11 items-center rounded-full bg-jaune px-4 text-sm font-extrabold text-encre no-underline hover:brightness-95 sm:flex"
          >
            Premium
          </Link>
        )}
        {utilisateur ? (
          <Link
            to="/profil"
            aria-label={`Profil de ${utilisateur.prenom}`}
            className="grid size-11 place-items-center rounded-full bg-menthe text-[15px] font-extrabold text-menthe-fonce no-underline"
          >
            {initiale}
          </Link>
        ) : (
          <Link
            to="/connexion"
            className="flex h-11 items-center rounded-full border border-ligne bg-white px-4 text-sm font-bold text-encre no-underline"
          >
            Connexion
          </Link>
        )}
      </div>
    </header>
  )
}

export function MiseEnPage() {
  const reglages = useReglages()
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="min-h-screen px-4 pb-14 pt-5 sm:px-6">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
        <EnTete />
        <main>
          <Outlet />
        </main>
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ligne pt-6 text-sm font-semibold text-gris">
          <span>© {new Date().getFullYear()} IDAcademy · Réussis ton BTS IDA</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/conditions" className="font-bold text-gris no-underline">
              Conditions d'utilisation
            </Link>
            <a href={reglages.lienWhatsapp('Bonjour IDAcademy, ')} target="_blank" rel="noreferrer" className="font-bold text-bleu no-underline">
              Support WhatsApp
            </a>
          </span>
        </footer>
      </div>
    </div>
  )
}

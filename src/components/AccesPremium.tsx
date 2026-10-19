import { Link } from 'react-router-dom'
import { IconeCadenas } from './Icones'

export function AccesPremium({ titre }: { titre: string }) {
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 rounded-[32px] bg-jaune p-10 text-center text-encre">
      <span className="grid size-14 place-items-center rounded-full bg-encre text-jaune">
        <IconeCadenas taille={24} />
      </span>
      <h1 className="m-0 font-display text-2xl font-bold">« {titre} » est réservé aux abonnés</h1>
      <p className="m-0 max-w-md font-semibold text-[#3D3415]">
        Les 2 premiers chapitres de chaque matière sont gratuits. Pour tout débloquer, passe Premium ou active ton essai de 3 jours.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Link to="/abonnement" className="flex h-[52px] items-center rounded-full bg-encre px-6 font-extrabold text-white no-underline">
          Voir les formules
        </Link>
        <Link to="/abonnement#code" className="flex h-[52px] items-center rounded-full border-[1.5px] border-encre px-6 font-extrabold text-encre no-underline">
          J'ai un code d'essai
        </Link>
      </div>
    </div>
  )
}

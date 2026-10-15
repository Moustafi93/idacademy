import { Link } from 'react-router-dom'

export default function Introuvable({ message = "Cette page n'existe pas (ou plus)." }: { message?: string }) {
  return (
    <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-[32px] border border-ligne bg-white p-10 text-center">
      <span className="font-mono text-5xl font-bold text-bleu">404</span>
      <h1 className="m-0 font-display text-2xl font-bold">Oups, page introuvable</h1>
      <p className="m-0 font-semibold text-gris">{message}</p>
      <Link to="/" className="flex h-12 items-center rounded-full bg-bleu px-6 font-extrabold text-white no-underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}

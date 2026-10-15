import { Link } from 'react-router-dom'
import { IconeChrono } from '../components/Icones'

// Les sujets types arriveront à la version 4. Cette page présente le module.
const SUJETS = [
  { matiere: 'Méthodologie Merise', titre: 'Gestion d\'une bibliothèque : MCD et MLD', duree: '3 h' },
  { matiere: 'Algorithmique', titre: 'Gestion des notes d\'une classe', duree: '3 h' },
  { matiere: 'Base de données', titre: 'Requêtes SQL sur une base de ventes', duree: '2 h' },
  { matiere: 'Langages Pascal et C', titre: 'Tableaux et fichiers en C', duree: '3 h' },
]

export default function PreparationBTS() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3 rounded-[32px] bg-menthe p-8 text-menthe-fonce sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-white">
          <IconeChrono taille={22} />
        </span>
        <h1 className="m-0 font-display text-3xl font-bold leading-tight sm:text-[42px]">Entraîne-toi comme le jour J.</h1>
        <p className="m-0 max-w-2xl text-[17px] font-semibold text-[#1F4A37]">
          Sujets types du BTS IDA, mode examen chronométré et corrigés détaillés avec barème. Arrive bientôt.
        </p>
      </section>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {SUJETS.map((s) => (
          <article key={s.titre} className="flex flex-col gap-3 rounded-[28px] border border-ligne bg-white p-6">
            <span className="self-start rounded-full bg-bleu-clair px-3 py-1.5 text-xs font-extrabold text-bleu">{s.matiere}</span>
            <h2 className="m-0 text-lg font-extrabold leading-snug">{s.titre}</h2>
            <p className="m-0 text-sm font-semibold text-gris">Durée : {s.duree}</p>
            <span className="mt-auto self-start rounded-full bg-creme px-3 py-1.5 text-xs font-extrabold text-gris">Bientôt disponible</span>
          </article>
        ))}
      </div>

      <p className="m-0 text-sm font-semibold text-gris">
        En attendant, révise avec le <Link to="/matieres/algorithmique/variables-et-types/qu-est-ce-qu-un-algorithme" className="font-extrabold text-bleu">cours d'algorithmique</Link>.
      </p>
    </div>
  )
}

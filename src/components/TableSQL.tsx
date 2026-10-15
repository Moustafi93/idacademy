import type { TableResultat } from '../lib/executerSQL'

// Affiche le résultat d'une requête SQL sous forme de tableau
export function TableSQL({ table, max = 50 }: { table: TableResultat; max?: number }) {
  const lignes = table.lignes.slice(0, max)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="max-h-80 overflow-auto rounded-2xl border border-ligne">
        <table className="w-full border-collapse text-left font-mono text-[13px]">
          <thead className="sticky top-0">
            <tr className="bg-bleu-clair">
              {table.colonnes.map((c, i) => (
                <th key={`${c}-${i}`} scope="col" className="whitespace-nowrap px-3 py-2 font-bold text-bleu">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((l, i) => (
              <tr key={i} className="border-t border-ligne odd:bg-white even:bg-fond">
                {l.map((v, j) => (
                  <td key={j} className="whitespace-nowrap px-3 py-1.5">
                    {v === null ? <span className="italic text-gris">NULL</span> : String(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="m-0 text-xs font-bold text-gris">
        {table.lignes.length} ligne{table.lignes.length > 1 ? 's' : ''}
        {table.lignes.length > max ? ` (${max} premières affichées)` : ''}
      </p>
    </div>
  )
}

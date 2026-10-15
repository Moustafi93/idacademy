import { BASES } from '../data/bases/scolarite'

// Affiche le schéma relationnel de la base d'exemple (clé primaire soulignée, # = clé étrangère)
export function SchemaBase({ base, compact = false }: { base: string; compact?: boolean }) {
  const info = BASES[base]
  if (!info) return null
  return (
    <div className={`flex flex-col gap-1.5 rounded-2xl bg-creme ${compact ? 'px-3.5 py-3' : 'px-4 py-3.5'}`}>
      <p className="m-0 text-xs font-extrabold uppercase tracking-wider text-gris">Base « {info.nom} »</p>
      {info.schema.map((t) => (
        <p key={t.table} className="m-0 font-mono text-[13px] leading-relaxed">
          <strong className="text-bleu">{t.table.toUpperCase()}</strong>(
          {t.cle.map((c, i) => (
            <span key={c}>
              {i > 0 && ', '}
              <span className="font-bold underline">{c}</span>
            </span>
          ))}
          {t.colonnes.map((c, i) => (
            <span key={c}>
              {(t.cle.length > 0 || i > 0) && ', '}
              {c}
            </span>
          ))}
          )
        </p>
      ))}
    </div>
  )
}

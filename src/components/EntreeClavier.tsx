// Ce que l'étudiant « tape au clavier » pour les scanf de son programme C
export function EntreeClavier({ valeur, onChange, lectureSeule = false }: { valeur: string; onChange?: (v: string) => void; lectureSeule?: boolean }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-extrabold uppercase tracking-wider text-gris">
      Entrée clavier {lectureSeule ? '(valeurs utilisées pour tester)' : '(une valeur par ligne ou séparées par des espaces)'}
      <textarea
        value={valeur}
        readOnly={lectureSeule}
        onChange={(e) => onChange?.(e.target.value)}
        rows={Math.min(4, Math.max(2, valeur.split('\n').length))}
        spellCheck={false}
        className="resize-y rounded-2xl border border-ligne bg-fond px-3.5 py-2.5 font-mono text-sm font-semibold normal-case tracking-normal text-encre read-only:opacity-80"
      />
    </label>
  )
}

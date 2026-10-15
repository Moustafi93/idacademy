/*
 * Exporte les chapitres premium :
 *  1. src/data/premium/meta.generated.ts : titres des leçons (affichés à tous, sans le contenu)
 *  2. supabase/contenu_premium.sql      : contenu complet, à exécuter dans Supabase (SQL Editor)
 *
 * Usage : npm run premium
 */
import { build } from 'esbuild'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dossier = mkdtempSync(join(tmpdir(), 'idacademy-premium-'))
const sortie = join(dossier, 'chapitres.mjs')
await build({
  entryPoints: ['src/data/premium/chapitres.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: sortie,
  logLevel: 'error',
})
const { CHAPITRES_PREMIUM } = await import(pathToFileURL(sortie).href)
rmSync(dossier, { recursive: true, force: true })

const meta = {}
const lignesSql = []
for (const [cle, charger] of Object.entries(CHAPITRES_PREMIUM)) {
  const lecons = await charger()
  meta[cle] = lecons.map((l) => ({
    slug: l.slug,
    titre: l.titre,
    ...(l.duree ? { duree: l.duree } : {}),
    ...(l.objectifs ? { objectifs: l.objectifs } : {}),
    ...(l.exercice ? { exercice: { id: l.exercice.id, titre: l.exercice.titre, langage: l.exercice.langage } } : {}),
  }))
  const json = JSON.stringify(lecons)
  if (json.includes('$contenu$')) throw new Error(`Le chapitre ${cle} contient le délimiteur $contenu$`)
  lignesSql.push(
    `insert into public.contenu_premium (cle, lecons) values ('${cle}', $contenu$${json}$contenu$::jsonb)\n` +
      `on conflict (cle) do update set lecons = excluded.lecons, mis_a_jour = now();`,
  )
}

writeFileSync(
  'src/data/premium/meta.generated.ts',
  `// Fichier généré par « npm run premium » : ne pas modifier à la main.\n` +
    `import type { LeconMeta } from '../types'\n\n` +
    `export const META_PREMIUM: Record<string, LeconMeta[]> = ${JSON.stringify(meta, null, 2)}\n`,
)
writeFileSync(
  'supabase/contenu_premium.sql',
  `-- Contenu premium d'IDAcademy, généré par « npm run premium ».\n` +
    `-- À exécuter dans Supabase (SQL Editor) après chaque modification d'un chapitre premium.\n\n` +
    lignesSql.join('\n\n') +
    '\n',
)
console.log(`Contenu premium exporté : ${Object.keys(meta).length} chapitre(s), ${Object.values(meta).flat().length} leçon(s).`)

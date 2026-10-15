/*
 * Diagramme des flux (Merise) dessiné automatiquement :
 * acteurs externes = rectangles à gauche, hors du domaine ;
 * acteurs internes = ellipses en colonne dans le cadre du domaine ;
 * flux = flèches courbes numérotées (les courbes évitent de traverser les acteurs).
 */

interface Props {
  domaine: string
  externes: string[]
  internes: string[]
  flux: [number, string, string][] // [numéro, émetteur, récepteur]
  legende?: string
}

type Pos = { x: number; y: number; forme: 'rect' | 'ellipse'; colonne: number; rang: number }
type Pt = { x: number; y: number }

const L = 760
const RECT = { dx: 78, dy: 26 }
const ELL = { rx: 92, ry: 32 }
const PAS = 140 // espace vertical entre deux acteurs internes

export function DiagrammeFlux({ domaine, externes, internes, flux, legende }: Props) {
  const H = Math.max(internes.length, externes.length) * PAS + 80
  const pos: Record<string, Pos> = {}
  const yDe = (i: number, n: number) => 60 + ((H - 80) / n) * (i + 0.5)
  externes.forEach((nom, i) => (pos[nom] = { x: 105, y: yDe(i, externes.length), forme: 'rect', colonne: 0, rang: i }))
  internes.forEach((nom, i) => (pos[nom] = { x: 520, y: yDe(i, internes.length), forme: 'ellipse', colonne: 1, rang: i }))

  // point sur le bord d'une forme, dans la direction (dx, dy)
  const bord = (p: Pt & { forme: Pos['forme'] }, dx: number, dy: number): Pt => {
    const n = Math.hypot(dx, dy) || 1
    const ux = dx / n
    const uy = dy / n
    const t =
      p.forme === 'rect'
        ? Math.min(RECT.dx / Math.abs(ux || 1e-9), RECT.dy / Math.abs(uy || 1e-9))
        : 1 / Math.sqrt((ux / ELL.rx) ** 2 + (uy / ELL.ry) ** 2)
    return { x: p.x + ux * (t + 4), y: p.y + uy * (t + 4) }
  }

  // nombre de flux entre chaque paire d'acteurs, pour écarter les courbes
  const total: Record<string, number> = {}
  const index = flux.map(([, de, vers]) => {
    const cle = [de, vers].sort().join('|')
    total[cle] = (total[cle] ?? 0) + 1
    return total[cle] - 1
  })

  const fleches = flux.map(([num, de, vers], i) => {
    const a = pos[de]
    const b = pos[vers]
    if (!a || !b) return null
    const cle = [de, vers].sort().join('|')
    // orientation stable pour une paire donnée, quel que soit le sens du flux
    const [p, q] = de < vers ? [a, b] : [b, a]
    const dx = q.x - p.x
    const dy = q.y - p.y
    const n = Math.hypot(dx, dy) || 1
    let courbure = (index[i] - (total[cle] - 1) / 2) * 46
    // deux internes non voisins : on contourne par la droite ceux qui sont entre eux
    if (a.colonne === 1 && b.colonne === 1 && Math.abs(a.rang - b.rang) > 1) courbure += (dy > 0 ? -1 : 1) * 250
    const nx = -dy / n
    const ny = dx / n
    const c: Pt = { x: (p.x + q.x) / 2 + nx * courbure, y: (p.y + q.y) / 2 + ny * courbure }
    const debut = bord(a, c.x - a.x, c.y - a.y)
    const fin = bord(b, c.x - b.x, c.y - b.y)
    // milieu de la courbe de Bézier (t = 0,5)
    const m: Pt = { x: 0.25 * debut.x + 0.5 * c.x + 0.25 * fin.x, y: 0.25 * debut.y + 0.5 * c.y + 0.25 * fin.y }
    return { num, d: `M${debut.x} ${debut.y} Q${c.x} ${c.y} ${fin.x} ${fin.y}`, m }
  })

  return (
    <figure className="m-0 flex flex-col gap-2">
      <div className="overflow-x-auto rounded-[22px] border border-ligne bg-white p-2">
        <svg viewBox={`0 0 ${L} ${H}`} role="img" aria-label={`Diagramme des flux : ${domaine}`} className="block w-full min-w-[520px]">
          <defs>
            <marker id="fleche-flux" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="#2438F0" />
            </marker>
          </defs>
          <rect x="300" y="44" width={L - 316} height={H - 60} rx="22" fill="#F1EFE8" stroke="#D5D0C4" strokeWidth="1.5" strokeDasharray="6 5" />
          <text x="318" y="32" fontSize="16" fontWeight="700" fill="#15172A" fontFamily="Manrope, sans-serif">
            Domaine : {domaine}
          </text>
          <text x="27" y="32" fontSize="14" fontWeight="700" fill="#4B4E63" fontFamily="Manrope, sans-serif">
            Acteurs externes
          </text>

          {fleches.map(
            (f) =>
              f && (
                <path key={`l${f.num}`} d={f.d} fill="none" stroke="#2438F0" strokeWidth="1.7" markerEnd="url(#fleche-flux)" />
              ),
          )}

          {externes.map((nom) => (
            <g key={nom}>
              <rect x={pos[nom].x - RECT.dx} y={pos[nom].y - RECT.dy} width={RECT.dx * 2} height={RECT.dy * 2} rx="6" fill="#FFFFFF" stroke="#15172A" strokeWidth="1.7" />
              <text x={pos[nom].x} y={pos[nom].y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#15172A" fontFamily="Manrope, sans-serif">
                {nom}
              </text>
            </g>
          ))}
          {internes.map((nom) => (
            <g key={nom}>
              <ellipse cx={pos[nom].x} cy={pos[nom].y} rx={ELL.rx} ry={ELL.ry} fill="#E8EAFF" stroke="#2438F0" strokeWidth="1.7" />
              <text x={pos[nom].x} y={pos[nom].y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#15172A" fontFamily="Manrope, sans-serif">
                {nom}
              </text>
            </g>
          ))}

          {/* numéros dessinés en dernier pour rester lisibles */}
          {fleches.map(
            (f) =>
              f && (
                <g key={`n${f.num}`}>
                  <circle cx={f.m.x} cy={f.m.y} r="12" fill="#FFD84D" stroke="#15172A" strokeWidth="1" />
                  <text x={f.m.x} y={f.m.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#15172A" fontFamily="Manrope, sans-serif">
                    {f.num}
                  </text>
                </g>
              ),
          )}
        </svg>
      </div>
      {legende && <figcaption className="px-1 text-[15px] font-semibold leading-relaxed text-gris">{legende}</figcaption>}
    </figure>
  )
}

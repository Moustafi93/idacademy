import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { taille?: number }

function base({ taille = 18, ...rest }: P) {
  return {
    width: taille,
    height: taille,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  }
}

export const IconeFleche = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
)
export const IconeRetour = (p: P) => (
  <svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>
)
export const IconeRecherche = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)
export const IconeCadenas = (p: P) => (
  <svg {...base(p)}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
)
export const IconeCoche = (p: P) => (
  <svg {...base(p)}><path d="m5 12 5 5 9-10" /></svg>
)
export const IconeChrono = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M9 2h6" /></svg>
)
export const IconeEtincelle = (p: P) => (
  <svg {...base(p)}><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" /></svg>
)
export const IconeEnvoyer = (p: P) => (
  <svg {...base(p)}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></svg>
)
export const IconeLecture = ({ taille = 14, ...p }: P) => (
  <svg width={taille} height={taille} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
)
export const IconeWhatsapp = (p: P) => (
  <svg {...base(p)}><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" /></svg>
)
export const IconeMenu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
)

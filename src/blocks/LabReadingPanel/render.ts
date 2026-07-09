import { DIMS, RATIO_DEFS, TEAM_DEFS } from './constants'

export type ArchetypeData = {
  id: string
  name: string
  card: string
  density: number
  score: number
  band: string
  teams: number[] // 6 values, TEAM_DEFS order
  radar: number[] // 5 values, DIMS order
  ratios: number[] // 4 values, RATIO_DEFS order
  whats: string
  focusHtml: string
  stress?: boolean
  hold?: boolean
}

// Mulberry32 — same seeded PRNG as the mockup, so the scatter-dot cloud renders
// identically (deterministic) across re-renders instead of jittering on every selection.
function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function teamStatus(pct: number, team: { lo: number; hi: number }): { label: string; cls: string } {
  if (pct < team.lo) return { label: 'Low', cls: 's-low' }
  if (pct > team.hi) return { label: 'High', cls: 's-high' }
  return { label: 'In range', cls: 's-in' }
}

export function renderTeamsSvg(a: ArchetypeData): string {
  const rnd = mulberry32(7)
  let s = ''
  TEAM_DEFS.forEach((t, i) => {
    const pct = a.teams[i] ?? 0
    const r = Math.max(5, 13 * Math.sqrt(pct) * Math.sqrt(a.density))
    s += `<circle cx="${t.cx}" cy="${t.cy}" r="${(r * 1.05).toFixed(1)}" style="fill:var(${t.cssVar});opacity:.07;filter:url(#mi8soft)"/>`
    const n = Math.max(2, Math.round(pct * 5.2 * a.density))
    for (let k = 0; k < n; k++) {
      const ang = rnd() * 6.2832
      const dist = r * Math.pow(rnd(), 0.6) * 0.98
      const cx = (t.cx + Math.cos(ang) * dist).toFixed(1)
      const cy = (t.cy + Math.sin(ang) * dist).toFixed(1)
      const cr = ((2.1 + rnd() * 2.1) / 2).toFixed(1)
      const op = (0.55 + rnd() * 0.45).toFixed(2)
      s += `<circle cx="${cx}" cy="${cy}" r="${cr}" style="fill:var(${t.cssVar});opacity:${op}"/>`
    }
  })
  return s
}

export function renderRadarSvg(a: ArchetypeData): string {
  const cx = 150
  const cy = 150
  const R = 108
  const pt = (i: number, f: number): [number, number] => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    return [cx + Math.cos(ang) * R * f, cy + Math.sin(ang) * R * f]
  }
  let g = ''
  ;[0.25, 0.5, 0.75, 1].forEach((f) => {
    const pts = DIMS.map((_, i) =>
      pt(i, f)
        .map((n) => n.toFixed(1))
        .join(','),
    ).join(' ')
    g += `<polygon points="${pts}" fill="none" stroke="rgba(18,49,77,${f === 1 ? 0.18 : 0.09})" stroke-width="1"/>`
  })
  DIMS.forEach((_, i) => {
    const p = pt(i, 1)
    g += `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="rgba(18,49,77,.08)"/>`
  })
  const dataPts = DIMS.map((_, i) =>
    pt(i, a.radar[i] / 100)
      .map((n) => n.toFixed(1))
      .join(','),
  ).join(' ')
  g += `<polygon points="${dataPts}" fill="rgba(10,143,176,.15)" stroke="#0A8FB0" stroke-width="2"/>`
  DIMS.forEach((d, i) => {
    const p = pt(i, a.radar[i] / 100)
    const lp = pt(i, 1.23)
    g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#0A8FB0"/>`
    const anc = Math.abs(lp[0] - cx) < 6 ? 'middle' : lp[0] > cx ? 'start' : 'end'
    g += `<text x="${lp[0].toFixed(1)}" y="${(lp[1] - 2).toFixed(1)}" fill="rgba(18,49,77,.82)" font-size="12.5" font-weight="500" text-anchor="${anc}" font-family="Instrument Sans,sans-serif">${d}</text>`
    g += `<text x="${lp[0].toFixed(1)}" y="${(lp[1] + 13).toFixed(1)}" fill="rgba(18,49,77,.45)" font-size="11" text-anchor="${anc}" font-family="Instrument Sans,sans-serif">${a.radar[i]}%</text>`
  })
  return g
}

export function ratioZone(pos: number): { label: string; cls: string; colorVar: string } {
  if (pos >= 60) return { label: 'In range', cls: 'r-good', colorVar: 'var(--accent)' }
  if (pos >= 45) return { label: 'Watch', cls: 'r-mid', colorVar: 'var(--low)' }
  return { label: 'Needs work', cls: 'r-bad', colorVar: 'var(--high)' }
}

export function scoreNote(a: ArchetypeData): string {
  if (a.hold) return 'The job here is to <b>hold this</b>, not disturb it.'
  if (a.stress) return 'The score reads well. The work here is <b>a targeted strain set</b>, not an ecological rebuild.'
  let lowIdx = 0
  a.radar.forEach((v, i) => {
    if (v < a.radar[lowIdx]) lowIdx = i
  })
  return `Lowest pillar: <b>${DIMS[lowIdx].toLowerCase()}.</b> That is what the formula is built to move.`
}

export function whatsShort(whats: string): string {
  return whats.split(/\.\s/)[0].replace(/\.+$/, '') + '.'
}

export { RATIO_DEFS }

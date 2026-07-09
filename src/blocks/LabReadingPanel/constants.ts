// Fixed structural scaffolding for the reading dashboard, extracted verbatim from the
// mockup's inline script. These are the taxonomy of the scoring system itself (which six
// teams exist, which four ratios, which five score pillars, and each pattern's icon) —
// not per-archetype editorial content, so they stay as code constants rather than CMS
// fields. Per-archetype numbers/copy (teams%, radar%, ratios, whats/focus text) are CMS
// fields on the `archetypes` array in config.ts.

export type TeamDef = { name: string; sub: string; lo: number; hi: number; cssVar: string; cx: number; cy: number }

export const TEAM_DEFS: TeamDef[] = [
  { name: 'Fibre', sub: 'break down fibre', lo: 30, hi: 50, cssVar: '--t1', cx: 172, cy: 178 },
  { name: 'Butyrate', sub: 'make butyrate', lo: 10, hi: 25, cssVar: '--t2', cx: 320, cy: 120 },
  { name: 'Cross-feeders', sub: 'pass nutrients along', lo: 6, hi: 12, cssVar: '--t3', cx: 360, cy: 240 },
  { name: 'Bifido', sub: 'feed the acetate base', lo: 2, hi: 10, cssVar: '--t4', cx: 240, cy: 285 },
  { name: 'Mucus', sub: 'turn over the mucus layer', lo: 1, hi: 4, cssVar: '--t5', cx: 112, cy: 270 },
  { name: 'Protein', sub: 'ferment protein', lo: 1, hi: 5, cssVar: '--t6', cx: 108, cy: 108 },
]

export const DIMS = ['Health', 'Diversity', 'Metabolic', 'Team balance', 'Safety'] as const

export type RatioDef = { name: string; bad: string; good: string }

export const RATIO_DEFS: RatioDef[] = [
  { name: 'Main fuel preference', bad: 'Protein-driven', good: 'Carbohydrate-driven' },
  { name: 'Fermentation efficiency', bad: 'Stalled', good: 'Efficient' },
  { name: 'Gut-lining dependence', bad: 'Feeding on the lining', good: 'Diet-fed' },
  { name: 'Harsh by-products', bad: 'Putrefactive', good: 'SCFA-dominant' },
]

export const ARCHETYPE_ICONS: Record<string, string> = {
  protein:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9.2 14.8 11.4 12.6M14.8 9.6 16.4 8"/><circle cx="7.5" cy="16.5" r="2.5" fill="currentColor" stroke="none"/><circle cx="13" cy="11" r="2"/><circle cx="17.6" cy="6.8" r="1.6"/></svg>',
  bifido:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15.8 19 10.4"/><path d="M12 13 9.3 18.8H14.7Z"/><circle cx="5.2" cy="15.7" r="1.4" fill="currentColor" stroke="none"/></svg>',
  fibre:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4h11M6.5 20h11M8 4v3c0 1.5 2.7 3.3 4 5 1.3-1.7 4-3.5 4-5V4M8 20v-3c0-1.5 2.7-3.3 4-5 1.3 1.7 4 3.5 4 5v3"/></svg>',
  mucus:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 19 5.7v5c0 4.8-3.4 8.2-7 9.6-3.6-1.4-7-4.8-7-9.6v-5z"/><circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12.8" r="1" fill="currentColor" stroke="none"/></svg>',
  crowded:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="14.6" r="1.7" fill="currentColor" stroke="none"/><circle cx="13.3" cy="15.8" r="1.5"/><circle cx="11.2" cy="10.9" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.4" cy="11.7" r="1.2"/><circle cx="8.1" cy="10.7" r="1"/></svg>',
  depletion:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="15" height="6.6" rx="2.2"/><path d="M20.2 11.4v2.8"/><rect x="5" y="11" width="3.4" height="2.6" rx=".8" fill="currentColor" stroke="none"/></svg>',
  gutbrain:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.5h3.8l1.8-5 3 9.5 2-4.5H21"/></svg>',
  balance:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12h17"/><circle cx="12" cy="12" r="3"/></svg>',
}

export const ARCHETYPE_ID_OPTIONS = [
  { label: 'Protein fermentation running hot', value: 'protein' },
  { label: 'Low bifido backbone', value: 'bifido' },
  { label: 'Weak fibre fermentation', value: 'fibre' },
  { label: 'Mucus barrier wearing thin', value: 'mucus' },
  { label: 'Fibre processors crowded out', value: 'crowded' },
  { label: 'Broad depletion', value: 'depletion' },
  { label: 'Gut-brain stress signals', value: 'gutbrain' },
  { label: 'In balance, holding steady', value: 'balance' },
]

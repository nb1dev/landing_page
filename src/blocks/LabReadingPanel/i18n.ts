import type { AppLocale } from '@/i18n/config'

/**
 * Localized copy for the reading-dashboard's hardcoded UI strings — the pieces
 * that live in code (data-viz labels, status pills, computed score notes) rather
 * than in the CMS. Values keyed to the enum/position logic still use the English
 * key; only the displayed text is localized. Locales without an entry fall back
 * to English. German comes from the Lab translations workbook (LAB.295–327).
 */
export type LRPStrings = {
  dims: string[] // 5, DIMS order
  teams: { name: string; sub: string }[] // 6, TEAM_DEFS order
  ratios: { name: string; bad: string; good: string }[] // 4, RATIO_DEFS order
  status: Record<'Low' | 'High' | 'In range', string> // teamStatus labels
  zone: Record<'In range' | 'Watch' | 'Needs work', string> // ratioZone labels
  borderline: string
  note: {
    hold: string
    stress: string
    lowest: string // template with {p} placeholder for the pillar name
    lowerPillar: boolean // lowercase the pillar inside the sentence (EN grammar)
  }
}

const en: LRPStrings = {
  dims: ['Health', 'Diversity', 'Metabolic', 'Team balance', 'Safety'],
  teams: [
    { name: 'Fibre', sub: 'break down fibre' },
    { name: 'Butyrate', sub: 'make butyrate' },
    { name: 'Cross-feeders', sub: 'pass nutrients along' },
    { name: 'Bifido', sub: 'feed the acetate base' },
    { name: 'Mucus', sub: 'turn over the mucus layer' },
    { name: 'Protein', sub: 'ferment protein' },
  ],
  ratios: [
    { name: 'Main fuel preference', bad: 'Protein-driven', good: 'Carbohydrate-driven' },
    { name: 'Fermentation efficiency', bad: 'Stalled', good: 'Efficient' },
    { name: 'Gut-lining dependence', bad: 'Feeding on the lining', good: 'Diet-fed' },
    { name: 'Harsh by-products', bad: 'Putrefactive', good: 'SCFA-dominant' },
  ],
  status: { Low: 'Low', High: 'High', 'In range': 'In range' },
  zone: { 'In range': 'In range', Watch: 'Watch', 'Needs work': 'Needs work' },
  borderline: 'Borderline',
  note: {
    hold: 'The job here is to <b>hold this</b>, not disturb it.',
    stress:
      'The score reads well. The work here is <b>a targeted strain set</b>, not an ecological rebuild.',
    lowest: 'Lowest pillar: <b>{p}.</b> That is what the formula is built to move.',
    lowerPillar: true,
  },
}

const de: LRPStrings = {
  dims: ['Gesundheit', 'Vielfalt', 'Stoffwechsel', 'Balance der funktionellen Gruppen', 'Sicherheit'],
  teams: [
    { name: 'Ballaststoffe', sub: 'Ballaststoffe abbauen' },
    { name: 'Butyrat', sub: 'Butyrat bilden' },
    { name: 'Cross-Feeder', sub: 'Geben Stoffwechselprodukte weiter' },
    { name: 'Bifido', sub: 'Versorgen die Acetat-Basis' },
    { name: 'Schleim', sub: 'Erneuern die Schleimbarriere' },
    { name: 'Protein', sub: 'Fermentieren Proteine' },
  ],
  ratios: [
    { name: 'Bevorzugte Energiequelle', bad: 'vorwiegend proteinbasiert', good: 'vorwiegend kohlehydratbasiert' },
    { name: 'Fermentationseffizienz', bad: 'Verlangsamt', good: 'Optimal' },
    { name: 'Abhängigkeit zur Darmschleimhaut', bad: 'Nutzt die Darmschleimhaut als Energiequelle', good: 'Wird über Ernährung ausreichend versorgt' },
    { name: 'Belastende Nebenprodukte', bad: 'Fäulnisbetont', good: 'Überwiegend von SCFA geprägt' },
  ],
  status: { Low: 'Niedrig', High: 'Hoch', 'In range': 'Im Zielbereich' },
  zone: { 'In range': 'Im Zielbereich', Watch: 'Beobachten', 'Needs work': 'Optimierungsbedarf' },
  borderline: 'Grenzwertig',
  note: {
    hold: 'Hier liegt der Fokus auf dem Erhalt der Werte – statt das Gleichgewicht zu stören.',
    stress:
      'Der Score sieht gut aus. An dieser Stelle geht es darum, <b>einen gezielten Komplex an Bakterienstämmen</b> hinzuzufügen – nicht um einen Wiederaufbau des kompletten Ökosystems.',
    lowest: 'Die niedrigste Säule: <b>{p}.</b> Die Formel ist darauf ausgerichtet, diesen Wert zu bewegen.',
    lowerPillar: false,
  },
}

const BY_LOCALE: Partial<Record<AppLocale, LRPStrings>> = { en, de }

export function getLRPStrings(locale?: AppLocale): LRPStrings {
  return (locale && BY_LOCALE[locale]) || en
}

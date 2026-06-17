/**
 * Shared client for the NB1 subscriptions/plans API.
 *
 * Backend: GET {NB1_API_URL}/subscriptions/plans, /subscriptions/plans/slug/{slug}
 * Docs: https://apistg.nb1.com/docs#/Subscriptions
 *
 * Scope note: only month=4, 8, 12 are modelled here. The API also returns a
 * month=1 row for some plan families (e.g. NB1-ADVANCED-1), but per product
 * decision the "flexible monthly" option shown on cycleSelector/planSelector
 * is a separate, manually-edited concept (its own price + checkout href set
 * directly in Payload) and is NOT sourced from this API. Do not wire month=1
 * rows into these helpers without re-confirming that decision.
 */
import type { CurrencyCode } from '@/utilities/currency'

export type PlanFamily = 'Core' | 'Advanced'
export type PlanMonth = 4 | 8 | 12

const SUPPORTED_MONTHS: PlanMonth[] = [4, 8, 12]
const BASELINE_MONTH: PlanMonth = 4

// Reuses the same backend host already configured for the rest of the app
// (see src/lib/createAccount.ts) rather than introducing a second env var.
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://apistg.nb1.com'

/** Raw shape returned by the API (PlanPublicOut), trimmed to what we use. */
export interface RawPlan {
  id: string
  title: string
  slug: string
  description?: string | null
  options: Record<string, string>
  is_preferred: boolean
  is_visible: boolean
  prices: Record<string, number>
  discount: Record<string, number>
  month: number
  bill_cycle: number
}

/** Resolved plan for a single (family, month) pair, in the requested currency. */
export interface ResolvedPlan {
  id: string
  slug: string
  family: PlanFamily
  month: PlanMonth
  /** Monthly rate in the requested currency, as a plain number (e.g. 89). */
  price: number
  /**
   * Total saved across the cycle vs. the 4-month rate for this family, in
   * the requested currency. Always 0 for month=4 (it IS the baseline).
   * NOT the same as the API's raw `discount` field — see note below.
   */
  savings: number
  isPreferred: boolean
  /** Numbered option/feature strings from the API, in insertion order. */
  options: string[]
}

let cache: { fetchedAt: number; plans: RawPlan[] } | null = null
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes — mirrors the Next.js fetch revalidate window

async function fetchAllPlans(): Promise<RawPlan[]> {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) return cache.plans

  const res = await fetch(`${API_BASE}/subscriptions/plans?preferred_first=false`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`subscriptions/plans request failed: ${res.status} ${res.statusText}`)
  }
  const plans = (await res.json()) as RawPlan[]
  cache = { fetchedAt: now, plans }
  return plans
}

function toOptionsList(options: Record<string, string>): string[] {
  return Object.keys(options)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => options[key])
}

/**
 * Computes "savings vs the 4-month rate" ourselves rather than trusting the
 * API's `discount` field. The API anchors `discount` to the cheapest
 * available cycle for that family — which is month=1 for Advanced (since
 * NB1-ADVANCED-1 exists) but month=4 for Core (since there's no
 * NB1-CORE-1). Since month=1 is out of scope (see file header), using the
 * raw `discount` field directly would silently change Advanced's savings
 * copy (e.g. would show "€224 / cycle" for the 8-month tier instead of the
 * "€64 / cycle" the existing site copy uses). Recomputing against the
 * 4-month baseline keeps both families consistent and matches existing copy.
 */
function computeSavings(
  monthlyRateAtMonth: number,
  monthlyRateAtBaseline: number,
  month: PlanMonth,
): number {
  return Math.round((monthlyRateAtBaseline - monthlyRateAtMonth) * month)
}

/**
 * Fetch every (family × month) combination needed to render a full
 * 4/8/12 cycle grid for one plan family, resolved into the given currency.
 */
export async function getPlanCycles(
  family: PlanFamily,
  currency: CurrencyCode,
): Promise<ResolvedPlan[]> {
  const all = await fetchAllPlans()
  const rows = all.filter(
    (p) => p.title === family && SUPPORTED_MONTHS.includes(p.month as PlanMonth),
  )

  const baseline = rows.find((p) => p.month === BASELINE_MONTH)
  const baselineRate = baseline ? baseline.prices[currency] ?? baseline.prices.EUR ?? 0 : 0

  return rows
    .map((p) => {
      const rate = p.prices[currency] ?? p.prices.EUR ?? 0
      return {
        id: p.id,
        slug: p.slug,
        family,
        month: p.month as PlanMonth,
        price: rate,
        savings: computeSavings(rate, baselineRate, p.month as PlanMonth),
        isPreferred: p.is_preferred,
        options: toOptionsList(p.options),
      }
    })
    .sort((a, b) => a.month - b.month)
}

/** Fetch a single (family, month) plan — e.g. for a headline card price. */
export async function getPlan(
  family: PlanFamily,
  month: PlanMonth,
  currency: CurrencyCode,
): Promise<ResolvedPlan | null> {
  const cycles = await getPlanCycles(family, currency)
  return cycles.find((p) => p.month === month) ?? null
}

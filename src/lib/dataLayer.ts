declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function mintEventId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function pushEvent(event: string, payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ ecommerce: null })
  window.dataLayer.push({ event, event_id: mintEventId(), ...payload })
}

export type Nb1Item = {
  item_id: string
  item_name: string
  item_brand: string
  item_category: string
  item_category2: string
  item_variant: string
  price: number
  quantity: number
  discount?: number
}

export type Nb1ItemOptions = {
  planTitle?: string
  monthNum?: number
  discount?: number
}

export function buildNb1Item(
  planKey: string,
  cycleKey: string,
  monthlyPrice: number | string,
  options: Nb1ItemOptions = {},
): Nb1Item {
  const price = typeof monthlyPrice === 'string' ? parseFloat(monthlyPrice) : monthlyPrice
  const monthNum = options.monthNum ?? (cycleKey === 'monthly' ? 1 : Number(cycleKey))
  const planTitle = options.planTitle ?? (planKey === 'advanced' ? 'Advanced' : 'Core')
  const item: Nb1Item = {
    item_id: `NB1-${planKey.toUpperCase()}-${monthNum}`,
    item_name: `NB1 ${planTitle} Plan`,
    item_brand: 'NB1',
    item_category: 'Personalised Supplements',
    item_category2: 'Subscription',
    item_variant: `${monthNum}-Month Subscription`,
    price,
    quantity: 1,
  }
  if (options.discount != null && options.discount > 0) item.discount = options.discount
  return item
}

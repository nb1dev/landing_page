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

/* ─── Enhanced Conversions (client-side hashing) ──────────────────────────
   Server hashing lives in lib/meta/hash.ts (node:crypto) and can't run in the
   browser, so we hash here with the Web Crypto API. Hashed values are safe to
   put on the dataLayer; postal_code / city / country stay unhashed per the
   Enhanced Conversions spec. */

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const normBasic = (v: string) => v.trim().toLowerCase()
const normPhone = (v: string) => v.replace(/\D/g, '').replace(/^0+/, '') // digits only, drop leading zeros

export type EcUserFields = {
  userId?: string // stable, non-PII (e.g. external_id)
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  address?: string // street line(s)
  postalCode?: string
  city?: string
  country?: string // ISO-3166 alpha-2, e.g. "DE"
}

/** Build the hashed `user_data` object (undefined if nothing usable / no crypto). */
export async function buildEnhancedUserData(
  f: EcUserFields,
): Promise<Record<string, unknown> | undefined> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) return undefined
  const phoneDigits = f.phone ? normPhone(f.phone) : ''
  const [email, phone, fn, ln, addr] = await Promise.all([
    f.email?.trim() ? sha256Hex(normBasic(f.email)) : undefined,
    phoneDigits ? sha256Hex(phoneDigits) : undefined,
    f.firstName?.trim() ? sha256Hex(normBasic(f.firstName)) : undefined,
    f.lastName?.trim() ? sha256Hex(normBasic(f.lastName)) : undefined,
    f.address?.trim() ? sha256Hex(normBasic(f.address)) : undefined,
  ])

  const address: Record<string, unknown> = {}
  if (fn) address.sha256_first_name = fn
  if (ln) address.sha256_last_name = ln
  if (addr) address.sha256_address = addr
  if (f.postalCode?.trim()) address.postal_code = f.postalCode.trim()
  if (f.city?.trim()) address.city = f.city.trim()
  if (f.country?.trim()) address.country = f.country.trim()

  const user_data: Record<string, unknown> = {}
  if (email) user_data.sha256_email_address = email
  if (phone) user_data.sha256_phone_number = phone
  if (Object.keys(address).length) user_data.address = address

  return Object.keys(user_data).length ? user_data : undefined
}

/** Push a GA4 event that also carries Enhanced Conversions `user_data`
 *  (+ `user_id` when a stable id is available). Safe to fire-and-forget. */
export async function pushEventWithUser(
  event: string,
  payload: Record<string, unknown>,
  fields: EcUserFields,
): Promise<void> {
  const user_data = await buildEnhancedUserData(fields)
  pushEvent(event, {
    ...payload,
    ...(fields.userId ? { user_id: fields.userId } : {}),
    ...(user_data ? { user_data } : {}),
  })
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

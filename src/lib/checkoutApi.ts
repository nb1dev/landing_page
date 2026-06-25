const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

export type CheckoutPaymentIntentIn = {
  plan_slug: string
  currency?: string
  shipping_option?: string
  discount_code?: string | null
  customer_email: string
  customer_name?: string | null
  customer_phone?: string | null
  idempotency_key?: string | null
  payment_method_type?: string | null
}

export type CheckoutPaymentIntentOut = {
  client_secret: string
  setup_intent_id: string
  customer_id: string
  amount: number
  currency: string
  plan_id: string
  plan_slug: string
  shipping_option: string
  discount_code: string | null
  discount_code_valid: boolean
}

export type PublicShippingAddressIn = {
  first_name: string
  last_name: string
  email?: string | null
  phone?: string | null
  address_line1: string
  address_line2?: string | null
  city: string
  state?: string | null
  postal_code: string
  country: string
  country_code: string
}

export type BillingAddressIn = {
  address_type?: 'individual' | 'company' | null
  first_name: string
  last_name: string
  company_name?: string | null
  tax_id?: string | null
  registration_number?: string | null
  email?: string | null
  phone?: string | null
  address_line1: string
  address_line2?: string | null
  city: string
  state?: string | null
  postal_code: string
  country: string
}

export type CheckoutConfirmIn = {
  setup_intent_id: string
  shipping_address: PublicShippingAddressIn
  billing_address: BillingAddressIn
  idempotency_key?: string | null
}

export type CheckoutConfirmOut = {
  status: string
  subscription_id: string
  user_id: string
  user_email: string
  plan_id: string
  plan_slug: string
  plan_title: string
  included_stool_kit: boolean
  billing_status: string
  billing_started_at: string | null
  sample_return_deadline_at: string | null
  password_setup_email_sent: boolean
  order_number: string | null
  event_id: string
  external_id: string
  referral_code: string | null
  referral_share_url: string | null
}

export async function checkoutPaymentIntent(
  params: CheckoutPaymentIntentIn,
): Promise<CheckoutPaymentIntentOut> {
  const res = await fetch(`${BACKEND}/subscriptions/public/checkout/payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw Object.assign(new Error(err?.detail ?? 'Payment intent failed'), { code: 'payment_intent_failed' })
  }
  return res.json()
}

export async function checkoutConfirm(
  params: CheckoutConfirmIn,
): Promise<CheckoutConfirmOut> {
  const res = await fetch(`${BACKEND}/subscriptions/public/checkout/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw Object.assign(new Error(err?.detail ?? 'Checkout confirm failed'), { code: 'confirm_failed' })
  }
  return res.json()
}

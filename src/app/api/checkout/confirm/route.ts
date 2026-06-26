import { NextResponse } from 'next/server'
import type { CheckoutConfirmIn, CheckoutConfirmOut } from '@/lib/checkoutApi'
import { buildServerEvent, sendMetaEvents } from '@/lib/meta/server'
import type { MetaEventPayload } from '@/lib/meta/types'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

/** Extended body: standard confirm fields + _meta sidecar (stripped before forwarding) */
export interface ConfirmWithMetaIn extends CheckoutConfirmIn {
  _meta?: {
    consent: boolean
    fbp?: string
    fbc?: string
    /** plan info needed to build custom_data */
    currency?: string
    value?: number
    item_id?: string
    item_name?: string
  }
}

export async function POST(req: Request) {
  const body: ConfirmWithMetaIn = await req.json()
  const { _meta, ...confirmBody } = body

  // Forward to external backend
  const backendRes = await fetch(`${BACKEND}/subscriptions/public/checkout/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(confirmBody),
  })

  if (!backendRes.ok) {
    const err = await backendRes.json().catch(() => ({}))
    return NextResponse.json(err, { status: backendRes.status })
  }

  const confirmation: CheckoutConfirmOut = await backendRes.json()

  // Fire purchase CAPI server-to-server — non-blocking, never delays response
  if (_meta?.consent) {
    const addr = confirmBody.shipping_address
    const payload: MetaEventPayload = {
      event: 'purchase',
      event_id: confirmation.event_id,
      consent: true,
      fbp: _meta.fbp,
      fbc: _meta.fbc,
      sourceUrl: req.headers.get('referer') ?? undefined,
      ecommerce: {
        transaction_id: confirmation.subscription_id,
        currency: _meta.currency,
        value: _meta.value,
        items: _meta.item_id
          ? [{ item_id: _meta.item_id, item_name: _meta.item_name, price: _meta.value, quantity: 1 }]
          : undefined,
      },
      user: {
        email: addr.email ?? undefined,
        phone: addr.phone ?? undefined,
        first_name: addr.first_name,
        last_name: addr.last_name,
        city: addr.city,
        zip: addr.postal_code,
        country: addr.country_code || addr.country,
        external_id: confirmation.external_id,
      },
    }

    const event = buildServerEvent(payload, req)
    // Fire and forget — purchase confirmation must not be gated on CAPI success
    sendMetaEvents([event]).catch((err) => console.error('[meta/purchase]', err))
  }

  return NextResponse.json(confirmation)
}

import { NextResponse } from 'next/server'
import type { MetaEventPayload } from '@/lib/meta/types'
import { buildServerEvent, sendMetaEvents } from '@/lib/meta/server'

export async function POST(req: Request) {
  try {
    const payload: MetaEventPayload = await req.json()
    if (!payload.consent) {
      return NextResponse.json({ sent: 0 })
    }

    const event = buildServerEvent(payload, req)
    const result = await sendMetaEvents([event])
    return NextResponse.json(result)
  } catch (err) {
    console.error('[meta/events]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}

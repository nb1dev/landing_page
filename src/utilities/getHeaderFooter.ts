import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache'

const LOCALES = ['en', 'de'] as const
type AppLocale = (typeof LOCALES)[number]

function safeLocale(locale?: string): AppLocale {
  return (LOCALES as readonly string[]).includes(locale ?? '') ? (locale as AppLocale) : 'en'
}

async function fetchHeaderById(id: string, locale?: string) {
  noStore()
  const payload = await getPayload({ config: configPromise })
  return payload.findByID({
    collection: 'headers',
    id,
    depth: 2,
    locale: safeLocale(locale),
  })
}

async function fetchDefaultHeader(locale?: string) {
  noStore()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'headers',
    where: { isDefault: { equals: true } },
    limit: 1,
    depth: 2,
    locale: safeLocale(locale),
  })
  return result.docs[0] ?? null
}

async function fetchFooterById(id: string, locale?: string) {
  const payload = await getPayload({ config: configPromise })
  return payload.findByID({
    collection: 'footers',
    id,
    depth: 1,
    locale: safeLocale(locale),
  })
}

async function fetchDefaultFooter(locale?: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'footers',
    where: { isDefault: { equals: true } },
    limit: 1,
    depth: 1,
    locale: safeLocale(locale),
  })
  return result.docs[0] ?? null
}

export const getCachedHeader = (id: string | null | undefined, locale?: string) => {
  if (id) {
    return unstable_cache(() => fetchHeaderById(id, locale), ['header', id, locale ?? 'en'], {
      tags: [`header_${id}`],
    })
  }
  return unstable_cache(() => fetchDefaultHeader(locale), ['header', 'default', locale ?? 'en'], {
    tags: ['header_default'],
  })
}

export const getCachedFooter = (id: string | null | undefined, locale?: string) => {
  if (id) {
    return unstable_cache(() => fetchFooterById(id, locale), ['footer', id, locale ?? 'en'], {
      tags: [`footer_${id}`],
    })
  }
  return unstable_cache(() => fetchDefaultFooter(locale), ['footer', 'default', locale ?? 'en'], {
    tags: ['footer_default'],
  })
}

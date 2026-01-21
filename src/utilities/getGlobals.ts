import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

const LOCALES = ['en', 'de', 'fr'] as const
type AppLocale = (typeof LOCALES)[number]
type PayloadLocale = AppLocale | 'all'

function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

async function getGlobal(slug: Global, depth = 0, locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const safeLocale: PayloadLocale | undefined = locale
    ? isAppLocale(locale)
      ? (locale as PayloadLocale)
      : 'en'
    : undefined

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: safeLocale,
  })

  return global
}

export const getCachedGlobal = (slug: Global, depth = 0, locale?: string) =>
  unstable_cache(
    async () => getGlobal(slug, depth, locale),
    [slug, String(depth), locale || 'default'],
    {
      tags: [`global_${slug}`, locale ? `global_${slug}_${locale}` : `global_${slug}_default`],
    },
  )

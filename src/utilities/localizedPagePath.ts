import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { AppLocale } from '@/i18n/config'

/**
 * Resolve the locale-specific path of a page identified by its canonical English
 * slug. Page slugs are localized in the CMS (e.g. en `order-details` → de
 * `bestellen-details`), so code-generated links must target the visitor-locale
 * slug: linking to the en slug triggers the cross-locale redirect in
 * [locale]/[slug]/page.tsx, which drops query params like ?plan=…&cycle=….
 * Falls back to `/{locale}/{enSlug}` when the page can't be resolved.
 */
export const getLocalizedPagePath = cache(
  async (enSlug: string, locale: AppLocale | string): Promise<string> => {
    try {
      const payload = await getPayload({ config: configPromise })

      const ref = await payload.find({
        collection: 'pages',
        where: { slug: { equals: enSlug } },
        locale: 'en',
        limit: 1,
        pagination: false,
        overrideAccess: true,
        depth: 0,
        select: { slug: true },
      })
      const id = ref.docs?.[0]?.id
      if (!id) return `/${locale}/${enSlug}`

      const doc = await payload.findByID({
        collection: 'pages',
        id,
        locale: locale as AppLocale,
        fallbackLocale: 'en',
        overrideAccess: true,
        depth: 0,
        select: { slug: true },
      })
      const slug = (doc?.slug as string | undefined) || enSlug
      return `/${locale}/${slug}`
    } catch {
      return `/${locale}/${enSlug}`
    }
  },
)

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { appLocales, type AppLocale } from '../../../i18n/config'

async function revalidateAllLocalePaths(
  docId: string,
  fallbackSlug: string | null | undefined,
  payload: Pick<Payload, 'findByID' | 'logger'>,
) {
  // Fetch the page with all locale slugs so each locale gets its own translated path.
  let slugsByLocale: Partial<Record<string, string>> = {}
  try {
    const doc = await payload.findByID({
      collection: 'pages',
      id: docId,
      locale: 'all',
      overrideAccess: true,
      depth: 0,
    })
    if (doc?.slug && typeof doc.slug === 'object') {
      slugsByLocale = doc.slug as Partial<Record<string, string>>
    } else if (typeof doc?.slug === 'string') {
      // Non-localized fallback (pre-migration)
      appLocales.forEach((l) => { slugsByLocale[l] = doc.slug as string })
    }
  } catch {
    // If the fetch fails, fall back to the slug we already have
    if (fallbackSlug) appLocales.forEach((l) => { slugsByLocale[l] = fallbackSlug })
  }

  appLocales.forEach((locale: AppLocale) => {
    const slug = slugsByLocale[locale] ?? fallbackSlug
    if (!slug) return
    if (slug === 'home') {
      payload.logger.info(`Revalidating page at path: /${locale}`)
      revalidatePath(`/${locale}`)
    } else {
      payload.logger.info(`Revalidating page at path: /${locale}/${slug}`)
      revalidatePath(`/${locale}/${slug}`)
    }
  })

  revalidateTag('pages-sitemap')
}

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      await revalidateAllLocalePaths(String(doc.id), doc.slug as string, payload)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      await revalidateAllLocalePaths(String(doc.id), previousDoc.slug as string, payload)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    await revalidateAllLocalePaths(String(doc?.id), doc?.slug as string, payload)
  }

  return doc
}

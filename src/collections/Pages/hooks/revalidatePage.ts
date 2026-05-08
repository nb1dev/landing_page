import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

const LOCALES = ['en', 'de', 'fr'] as const

function revalidatePagePaths(slug: string | undefined | null, payload: any) {
  if (slug === 'home') {
    LOCALES.forEach((locale) => {
      payload.logger.info(`Revalidating page at path: /${locale}`)
      revalidatePath(`/${locale}`)
    })
  } else if (slug) {
    LOCALES.forEach((locale) => {
      payload.logger.info(`Revalidating page at path: /${locale}/${slug}`)
      revalidatePath(`/${locale}/${slug}`)
    })
  }
  revalidateTag('pages-sitemap')
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePagePaths(doc.slug, payload)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePagePaths(previousDoc.slug, payload)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    revalidatePagePaths(doc?.slug, payload)
  }

  return doc
}

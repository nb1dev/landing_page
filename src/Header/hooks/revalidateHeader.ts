import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header ${doc.id}`)

    revalidateTag(`header_${doc.id}`)

    if (doc.isDefault) {
      revalidateTag('header_default')
    }
  }

  return doc
}

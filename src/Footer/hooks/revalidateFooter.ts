import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFooter: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag(`footer_${doc.id}`)
    revalidateTag('footer_default')
    revalidatePath('/', 'layout')
    revalidatePath('/de', 'layout')
  }

  return doc
}

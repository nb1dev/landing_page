import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { appLocales } from '@/i18n/config'

export const revalidateFooter: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag(`footer_${doc.id}`)
    revalidateTag('footer_default')
    // Was only revalidating '/' and '/de' — missed en/fr/nl/ch/be/uk/uae,
    // so footer edits appeared stale on every other locale.
    revalidatePath('/', 'layout')
    appLocales.forEach((locale) => {
      revalidatePath(`/${locale}`, 'layout')
    })
  }

  return doc
}

import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header ${doc.id}`)

    revalidateTag(`header_${doc.id}`)
    // Always bust the "default header" cache too, not just when this doc is
    // the default: saving any header can change which one Payload resolves
    // as default (see enforceSingleDefault), and pages with no explicit
    // header relationship read from the header_default tag, not header_${id}.
    revalidateTag('header_default')
  }

  return doc
}

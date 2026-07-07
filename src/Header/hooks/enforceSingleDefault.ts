import type { CollectionAfterChangeHook } from 'payload'

/**
 * Only one header can be the site default. If a header is saved with
 * isDefault:true, unset it on every other header — otherwise
 * fetchDefaultHeader()'s `where: { isDefault: { equals: true } }` query can
 * match more than one row, and with no explicit sort, Postgres returns
 * whichever one it feels like (varies per query plan / server instance),
 * so pages with no explicit header relationship show a random header.
 */
export const enforceSingleDefault: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!doc.isDefault) return doc
  if (req.context.skipEnforceSingleDefault) return doc

  const others = await req.payload.find({
    collection: 'headers',
    where: {
      and: [{ isDefault: { equals: true } }, { id: { not_equals: doc.id } }],
    },
    limit: 100,
    depth: 0,
    req,
  })

  for (const other of others.docs) {
    await req.payload.update({
      collection: 'headers',
      id: other.id,
      data: { isDefault: false },
      req,
      context: { skipEnforceSingleDefault: true },
    })
  }

  return doc
}

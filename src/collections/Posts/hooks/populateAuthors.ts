import type { CollectionAfterReadHook } from 'payload'

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req }) => {
  const authors = Array.isArray(doc?.authors) ? doc.authors : []

  if (!authors.length) {
    doc.populatedAuthors = []
    return doc
  }

  const populated = await Promise.all(
    authors.map(async (a: any) => {
      const id = typeof a === 'string' ? a : a?.id
      if (!id) return null

      // If already hydrated, use it; else fetch
      const author =
        typeof a === 'object' && a?.id
          ? a
          : await req.payload.findByID({
              collection: 'authors',
              id,
              overrideAccess: true,
            })

      const avatarUrl = author?.avatar?.url || ''

      return {
        id: String(id),
        name: String(author?.name || ''),
        slug: String(author?.slug || ''),
        credentials: String(author?.credentials || ''),
        avatarUrl: String(avatarUrl),
      }
    }),
  )

  doc.populatedAuthors = populated.filter(Boolean)
  return doc
}

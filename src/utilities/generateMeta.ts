import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

/**
 * Build a clean canonical URL:
 * - absolute
 * - no query params
 * - trailing slash handled by Next config
 */
function buildCanonicalURL(doc: Partial<Page> | Partial<Post> | null) {
  const base = getServerSideURL()

  if (!doc?.slug) return base

  // slug can be string or string[] depending on setup
  const path = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug

  // ensure leading slash
  return `${base}/${path}`.replace(/\/+/g, '/').replace(':/', '://')
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const canonical = buildCanonicalURL(doc)

  const title = doc?.meta?.title ? doc.meta.title + ' | NB1' : 'NB1'

  return {
    title,
    description: doc?.meta?.description,

    // ✅ canonical without query params
    alternates: {
      canonical,
    },

    openGraph: mergeOpenGraph({
      title,
      description: doc?.meta?.description || '',
      url: canonical, // ✅ og:url must be canonical
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}

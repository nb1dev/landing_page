import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

function getLocale(req: PayloadRequest): string {
  const r = req as any
  const locale = r?.locale || r?.i18n?.language || r?.payloadAPI?.locale || r?.query?.locale

  return typeof locale === 'string' && locale.trim() ? locale.trim() : 'en'
}

function getFrontendURL(): string {
  // Set this to your STG frontend URL in Payload env
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL

  return (url || 'http://localhost:3000').replace(/\/+$/g, '')
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) return null

  const cleanSlug = String(slug)
    .trim()
    .replace(/^\/+|\/+$/g, '')
  const prefix = collectionPrefixMap[collection] ?? ''
  const locale = getLocale(req)

  const path = `/${locale}${prefix}/${cleanSlug}`.replace(/\/+/g, '/')

  const params = new URLSearchParams({
    slug: cleanSlug,
    collection,
    path, // keep unencoded; URLSearchParams encodes safely
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const frontendURL = getFrontendURL()

  return `${frontendURL}/cms/next/preview?${params.toString()}`
}

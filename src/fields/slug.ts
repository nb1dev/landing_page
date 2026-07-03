// src/fields/slug.ts
import type { Field, PayloadRequest } from 'payload'

const MAX_SLUG_LENGTH = 70

/**
 * Strict slug rules:
 * - lowercase
 * - spaces/underscores -> hyphens
 * - german chars -> ae/oe/ue/ss
 * - remove everything except a-z 0-9 and hyphens
 * - collapse multiple hyphens
 * - max length 70 chars
 */
export function normalizeSlug(input: string, maxLength = MAX_SLUG_LENGTH) {
  const slug = String(input || '')
    .trim()
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (slug.length <= maxLength) return slug

  const trimmed = slug.slice(0, maxLength)
  const lastDash = trimmed.lastIndexOf('-')

  return lastDash > 20 ? trimmed.slice(0, lastDash) : trimmed
}

/**
 * Custom slug field used across collections.
 * - Auto-generates from `from` field if empty
 * - Normalizes to lowercase + hyphens only
 * - Enforces max 70 chars
 * - When `localized: true`, stores a slug per locale and validates uniqueness per locale
 *   instead of using a DB-level unique constraint (which doesn't work per-locale).
 */
export function costomSlugField({
  name = 'slug',
  label = 'Slug',
  from = 'title',
  unique = true,
  required = true,
  sidebar = true,
  maxLength = MAX_SLUG_LENGTH,
  localized = false,
  collection,
}: {
  name?: string
  label?: string
  from?: string
  unique?: boolean
  required?: boolean
  sidebar?: boolean
  maxLength?: number
  /** When true, stores one slug value per locale. Disables DB unique constraint
   *  and replaces it with a per-locale uniqueness validate hook. */
  localized?: boolean
  /** Collection slug used for per-locale uniqueness check (required when localized=true). */
  collection?: string
} = {}): Field {
  return {
    name,
    label,
    type: 'text',
    required,
    // When localized, skip the DB-level unique constraint — it enforces uniqueness
    // across ALL locales globally, which would reject e.g. de="unsere-plaene" if
    // another locale already has "unsere-plaene". Per-locale uniqueness is checked
    // in the validate hook below instead.
    unique: localized ? false : unique,
    index: true,
    ...(localized ? { localized: true } : {}),

    admin: {
      ...(sidebar ? { position: 'sidebar' as const } : {}),
      description: `Auto-formatted: lowercase + hyphens only. Max ${maxLength} characters.`,
    },

    validate: async (
      value: unknown,
      options: { req: PayloadRequest; id?: string | number; operation?: string },
    ) => {
      if (typeof value !== 'string') return true
      if (value.length > maxLength) {
        return `Slug must be ${maxLength} characters or less (currently ${value.length}).`
      }

      if (localized && collection && value && options?.req?.payload) {
        const locale = options.req.locale as string | undefined
        const existing = await options.req.payload.find({
          collection: collection as 'pages',
          where: {
            [name]: { equals: value },
            ...(options.id ? { id: { not_equals: options.id } } : {}),
          },
          locale: locale as 'en' | undefined,
          overrideAccess: true,
          limit: 1,
          pagination: false,
          select: { id: true } as Record<string, true>,
        })
        if (existing.totalDocs > 0) {
          return `Slug "${value}" is already in use for the ${locale ?? 'current'} locale.`
        }
      }

      return true
    },

    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const fromValue = (data as Record<string, unknown> | undefined)?.[from]
          const candidate =
            typeof value === 'string' && value.trim()
              ? value
              : typeof fromValue === 'string'
                ? fromValue
                : ''

          if (!candidate) return value
          return normalizeSlug(candidate, maxLength)
        },
      ],
    },
  }
}

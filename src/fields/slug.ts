// src/fields/slug.ts
import type { Field } from 'payload'

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
 */
export function costomSlugField({
  name = 'slug',
  label = 'Slug',
  from = 'title',
  unique = true,
  required = true,
  sidebar = true,
  maxLength = MAX_SLUG_LENGTH,
}: {
  name?: string
  label?: string
  from?: string
  unique?: boolean
  required?: boolean
  sidebar?: boolean
  maxLength?: number
} = {}): Field {
  return {
    name,
    label,
    type: 'text',
    required,
    unique,
    index: true,

    admin: {
      ...(sidebar ? { position: 'sidebar' as const } : {}),
      description: `Auto-formatted: lowercase + hyphens only. Max ${maxLength} characters.`,
    },

    validate: (value: unknown) => {
      if (typeof value !== 'string') return true
      if (value.length > maxLength) {
        return `Slug must be ${maxLength} characters or less (currently ${value.length}).`
      }
      return true
    },

    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const candidate =
            typeof value === 'string' && value.trim()
              ? value
              : typeof (data as any)?.[from] === 'string'
                ? (data as any)[from]
                : ''

          if (!candidate) return value
          return normalizeSlug(candidate, maxLength)
        },
      ],
    },
  }
}

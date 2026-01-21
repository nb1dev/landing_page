import type { Block } from 'payload'

export const Citation: Block = {
  slug: 'citation',
  labels: { singular: 'Citation', plural: 'Citations' },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'sourceName', type: 'text', required: true, localized: true },
    { name: 'sourceUrl', type: 'text', required: true },
  ],
}

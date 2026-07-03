import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const CloseBandBlock: Block = {
  slug: 'closeBand',
  interfaceName: 'CloseBandBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text', localized: true },
  ],
}

import type { Block } from 'payload'
import { inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolCredStripBlock: Block = {
  slug: 'protocolCredStrip',
  interfaceName: 'ProtocolCredStripBlock',
  // Short dbName: the default (pages_blocks_protocol_cred_strip_...) pushes
  // the nested array locale index names past Postgres's 63-char limit.
  dbName: 'pcs',
  labels: {
    singular: 'Protocol: Science Board Credibility Strip',
    plural: 'Protocol: Science Board Credibility Strip Blocks',
  },
  fields: [
    {
      name: 'faces',
      label: 'Faces',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Up to 6, rendered as two interlocking rows of 3.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
      ],
    },
    { name: 'headline', type: 'textarea', localized: true },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "independently reviewed" and the two names, matching the mockup.' },
    },
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', localized: true, required: true, admin: { description: 'e.g. "254" or "17,000+"' } },
        { name: 'label', type: 'text', localized: true, required: true, admin: { description: 'e.g. "published papers"' } },
      ],
    },
  ],
}

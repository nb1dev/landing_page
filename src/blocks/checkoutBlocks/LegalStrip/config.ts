import type { Block } from 'payload'

export const LegalStrip: Block = {
  slug: 'legalStrip',
  interfaceName: 'LegalStripBlock',
  labels: { singular: 'Legal Strip', plural: 'Legal Strips' },
  fields: [
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright text',
      type: 'text',
      defaultValue: '© NB1 Health GmbH 2026',
      localized: true,
    },
  ],
}

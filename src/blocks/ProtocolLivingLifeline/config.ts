import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const ProtocolLivingLifelineBlock: Block = {
  slug: 'protocolLivingLifeline',
  interfaceName: 'ProtocolLivingLifelineBlock',
  dbName: 'pll',
  labels: {
    singular: 'Protocol: Living Lifeline Diagram',
    plural: 'Protocol: Living Lifeline Diagram Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "or a living protocol.", matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },
    { name: 'originLabel', label: 'Origin Label', type: 'text', localized: true, defaultValue: 'Gut diagnostic everyone starts here' },
    {
      name: 'core',
      label: 'Core Track',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true, defaultValue: 'Core' },
        { name: 'copy', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'advanced',
      label: 'Advanced Track',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true, defaultValue: 'Advanced' },
        { name: 'badge', type: 'text', localized: true, defaultValue: 'the living protocol' },
        { name: 'copy', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'milestones',
      label: 'Milestones',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Exactly 3: two dated milestones (e.g. "Retest: gut + blood" / "Month 3") plus a final open-ended one ("keeps adapting", muted, no month).',
      },
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'month', type: 'text', localized: true, admin: { description: 'e.g. "Month 3". Leave empty for the final muted milestone.' } },
        { name: 'muted', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'compareLabel', label: 'Compare Link Label', type: 'text', localized: true, defaultValue: 'Compare Core and Advanced in full' },
    { name: 'compareUrl', label: 'Compare Link URL', type: 'text', localized: true, defaultValue: '/your-plan' },
  ],
}

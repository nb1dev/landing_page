import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolJourneyBlock: Block = {
  slug: 'protocolJourney',
  interfaceName: 'ProtocolJourneyBlock',
  // Short dbName: the default (pages_blocks_protocol_journey_...) pushes the
  // nested "steps" array's locale index name past Postgres's 63-char limit.
  dbName: 'prj',
  labels: {
    singular: 'Protocol: Journey Rail',
    plural: 'Protocol: Journey Rail Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "end to end.", matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },
    {
      name: 'steps',
      label: 'Steps',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'kit',
          options: [
            { label: 'Kit (box)', value: 'kit' },
            { label: 'Collect (magnifier)', value: 'collect' },
            { label: 'Lab (microscope)', value: 'lab' },
            { label: 'Clock (formula built)', value: 'clock' },
            { label: 'Delivery (calendar)', value: 'delivery' },
          ],
        },
        { name: 'dayRange', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Day 1–3"' } },
        { name: 'name', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Kit arrives"' } },
        { name: 'description', type: 'textarea', localized: true, required: true },
        {
          name: 'isPayStep',
          label: 'Is Pay Step',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Marks this as the "You pay here" step — adds the lime pay tag and lime rail segment.' },
        },
        {
          name: 'payTagLabel',
          label: 'Pay Tag Label',
          type: 'text',
          localized: true,
          defaultValue: 'You pay here',
          admin: { condition: (_, siblingData) => !!siblingData?.isPayStep },
        },
      ],
    },
    {
      name: 'paygate',
      label: 'Pay Gate Callout',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          editor: inlineRichTextEditor,
          admin: { description: 'Bold the "unlocks your full health report" phrase, matching the mockup.' },
        },
      ],
    },
    { name: 'underBadge', label: 'Under-badge Text', type: 'text', localized: true, admin: { description: 'e.g. "Under 4 weeks, every time."' } },
    { name: 'footnote', label: 'Footnote', type: 'textarea', localized: true },
  ],
}

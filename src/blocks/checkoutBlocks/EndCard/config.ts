import type { Block } from 'payload'

export const EndCard: Block = {
  slug: 'endCard',
  interfaceName: 'EndCardBlock',
  labels: { singular: 'End Card', plural: 'End Cards' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow label',
      localized: true,
      admin: { placeholder: 'Ready when you are' },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: true,
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'CTAs',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button text',
          localized: true,
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link href',
          required: true,
          localized: true,
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Visual variant',
          defaultValue: 'advanced',
          options: [
            { label: 'Advanced (lime fill)', value: 'advanced' },
            { label: 'Core (ghost, white border)', value: 'core' },
            { label: 'Primary lime', value: 'core-primary' },
            { label: 'Alt ghost', value: 'core-alt' },
          ],
        },
      ],
    },
  ],
}

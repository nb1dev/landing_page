import type { Block } from 'payload'

export const KeyTakeaways: Block = {
  slug: 'keyTakeaways',
  interfaceName: 'KeyTakeawaysBlock',
  labels: {
    singular: 'Key Takeaways',
    plural: 'Key Takeaways',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 5,
      labels: {
        singular: 'Takeaway Item',
        plural: 'Takeaway Items',
      },
      fields: [
        {
          name: 'leadIn',
          type: 'text',
          localized: true,
          required: true,
          label: 'Lead-in',
          admin: {
            description:
              'Bold lead-in phrase, e.g. "Your microbiome filters everything you swallow."',
          },
        },
        {
          name: 'explanation',
          type: 'text',
          localized: true,
          required: true,
          label: 'Explanation',
          admin: {
            description: 'Normal-weight explanation text, ideally 1–2 sentences.',
          },
        },
      ],
    },
  ],
}

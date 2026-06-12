import type { Block } from 'payload'

export const CheckoutFaq: Block = {
  slug: 'checkoutFaq',
  interfaceName: 'CheckoutFaqBlock',
  labels: { singular: 'Checkout FAQ', plural: 'Checkout FAQs' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section title',
      defaultValue: 'Common questions',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'FAQ items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}

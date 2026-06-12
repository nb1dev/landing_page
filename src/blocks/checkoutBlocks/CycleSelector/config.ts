import type { Block } from 'payload'

export const CycleSelector: Block = {
  slug: 'cycleSelector',
  interfaceName: 'CycleSelectorBlock',
  labels: { singular: 'Cycle Selector', plural: 'Cycle Selectors' },
  fields: [
    {
      name: 'planName',
      type: 'text',
      label: 'Plan name (e.g. Core)',
      localized: true,
      required: true,
      admin: { placeholder: 'Core' },
    },
    {
      name: 'switchLinkLabel',
      type: 'text',
      label: 'Switch plan link label',
      localized: true,
      admin: { placeholder: 'Switch to Advanced →' },
    },
    {
      name: 'switchLinkHref',
      type: 'text',
      label: 'Switch plan link href',
      admin: { placeholder: '/order-cycle-advanced' },
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Cycle tiers',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'months',
          type: 'text',
          label: 'Duration label (e.g. 4 months)',
          localized: true,
          required: true,
        },
        {
          name: 'monthlyRate',
          type: 'text',
          label: 'Monthly rate (e.g. €99)',
          localized: true,
          required: true,
        },
        {
          name: 'saveLabel',
          type: 'text',
          label: 'Save label (e.g. Save €40 / cycle)',
          localized: true,
          admin: { description: 'Leave empty for no savings badge' },
        },
        {
          name: 'isBestValue',
          type: 'checkbox',
          label: 'Show "Best value" tag',
          defaultValue: false,
        },
        {
          name: 'checkoutHref',
          type: 'text',
          label: 'Continue href (goes to checkout/details)',
          required: true,
          admin: { placeholder: '/order-details?plan=core&cycle=4' },
        },
      ],
    },
    {
      name: 'showMonthlyOption',
      type: 'checkbox',
      label: 'Show flexible monthly option',
      defaultValue: false,
    },
    {
      name: 'monthlyRate',
      type: 'text',
      label: 'Flexible monthly rate (e.g. €109)',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.showMonthlyOption,
        placeholder: '€109',
      },
    },
    {
      name: 'monthlyCheckoutHref',
      type: 'text',
      label: 'Flexible monthly checkout href',
      admin: {
        condition: (_, siblingData) => siblingData?.showMonthlyOption,
        placeholder: '/order-details?plan=core&cycle=monthly',
      },
    },
    {
      name: 'faqTitle',
      type: 'text',
      label: 'FAQ section title',
      localized: true,
      admin: { placeholder: 'Choosing your duration' },
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ items',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}

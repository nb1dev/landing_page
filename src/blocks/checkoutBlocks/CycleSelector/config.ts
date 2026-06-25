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
      name: 'planFamily',
      type: 'select',
      label: 'Plan family (live pricing)',
      required: true,
      defaultValue: 'core',
      options: [
        { label: 'Core', value: 'core' },
        { label: 'Advanced', value: 'advanced' },
      ],
      admin: {
        description:
          'The 4/8/12-month price grid below is fetched live from the subscriptions API for this plan family — it is not editable here. Checkout links are generated as /order-details?plan={family}&cycle={month}.',
      },
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
      name: 'yourPlanLabel',
      type: 'text',
      label: '"Your plan" label',
      localized: true,
      admin: { placeholder: 'Your plan' },
    },
    {
      name: 'bestValueLabel',
      type: 'text',
      label: '"Best value" badge text',
      localized: true,
      admin: { placeholder: 'Best value' },
    },
    {
      name: 'preferFlexibleLabel',
      type: 'text',
      label: '"Prefer to stay flexible?" label',
      localized: true,
      admin: {
        placeholder: 'Prefer to stay flexible?',
        condition: (_, siblingData) => siblingData?.showMonthlyOption,
      },
    },
    {
      name: 'chooseFlexiblePrefix',
      type: 'text',
      label: '"Choose Flexible monthly" prefix',
      localized: true,
      admin: {
        placeholder: 'Choose Flexible monthly ·',
        condition: (_, siblingData) => siblingData?.showMonthlyOption,
      },
    },
    {
      name: 'continuePrefix',
      type: 'text',
      label: '"Continue" CTA prefix',
      localized: true,
      admin: { placeholder: 'Continue' },
    },
    {
      name: 'cancelAnytimeLabel',
      type: 'text',
      label: '"Cancel anytime" label',
      localized: true,
      admin: { placeholder: 'cancel anytime' },
    },
    {
      name: 'billedMonthlyShortLabel',
      type: 'text',
      label: '"Billed monthly" short label (footer bar)',
      localized: true,
      admin: { placeholder: 'billed monthly' },
    },
    {
      name: 'guaranteeItems',
      type: 'array',
      label: 'Guarantee strip items',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          localized: true,
          required: true,
        },
      ],
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

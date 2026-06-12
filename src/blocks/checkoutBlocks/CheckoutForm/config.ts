import type { Block } from 'payload'

export const CheckoutForm: Block = {
  slug: 'checkoutForm',
  interfaceName: 'CheckoutFormBlock',
  labels: { singular: 'Checkout Form', plural: 'Checkout Forms' },
  fields: [
    {
      name: 'backHref',
      type: 'text',
      label: 'Back link href (overrides URL-param default)',
      admin: { placeholder: '/order-cycle-core' },
    },
  ],
}

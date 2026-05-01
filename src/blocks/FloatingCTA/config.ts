import type { Block } from 'payload'

export const FloatingCTABlock: Block = {
  slug: 'floatingCTA',
  interfaceName: 'FloatingCTABlock',
  labels: {
    singular: 'Floating CTA',
    plural: 'Floating CTA Blocks',
  },
  fields: [
    {
      name: 'text',
      label: 'Text (plain)',
      type: 'text',
      admin: {
        placeholder: 'Get your kit',
        description: 'e.g. "Get your kit" — plain text shown before the highlighted part.',
      },
    },
    {
      name: 'highlightedText',
      label: 'Highlighted Text (teal accent)',
      type: 'text',
      admin: {
        placeholder: '2 weeks before anyone else',
        description: 'e.g. "2 weeks before anyone else" — displayed in teal accent color.',
      },
    },
    {
      name: 'buttonText',
      label: 'Button Label',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Reserve my kit →',
        description: 'e.g. "Reserve my kit →"',
      },
    },
    {
      name: 'buttonHref',
      label: 'Button Link',
      type: 'text',
      required: true,
      admin: {
        placeholder: '#reserve',
        description: 'e.g. "#reserve" (in-page anchor) or "/early-access"',
      },
    },
    {
      name: 'heroSelector',
      label: 'Hero Section Selector',
      type: 'text',
      admin: {
        placeholder: '.hero',
        description:
          'e.g. ".hero" or "#hero" — bar appears after this element scrolls out of view.',
      },
    },
    {
      name: 'reserveSelector',
      label: 'Reserve Section Selector',
      type: 'text',
      admin: {
        placeholder: '#reserve',
        description:
          'e.g. "#reserve" or ".reserve-cta" — bar hides when this element comes into view.',
      },
    },
  ],
}

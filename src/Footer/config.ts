import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

const themeOptions = [
  { label: 'Light (white background)', value: 'light' },
  { label: 'Dark (navy background)', value: 'dark' },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'theme',
      label: 'Default Theme',
      type: 'select',
      defaultValue: 'light',
      options: themeOptions,
      admin: {
        description: 'Used when no A/B variant matches. Light = white bg, Dark = navy bg.',
      },
    },
    {
      name: 'linkColor',
      label: 'Link Color',
      type: 'text',
      admin: {
        description:
          'CSS color for nav links (e.g. "rgba(18,49,77,0.55)" or "#303438"). Falls back to theme default if empty.',
      },
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short tagline shown next to logo, e.g. "Sequenced. Then yours."',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Nav Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'address',
      label: 'Address Line',
      type: 'text',
      localized: true,
      admin: {
        description: 'Company address shown in the legal section.',
      },
    },
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      localized: true,
    },
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: {
            description: 'Matches the ?v= URL param (e.g. "dark-page", "eu-b"). Case-sensitive.',
          },
        },
        {
          name: 'theme',
          label: 'Theme for this variant',
          type: 'select',
          options: themeOptions,
          required: true,
        },
        {
          name: 'linkColor',
          label: 'Link Color',
          type: 'text',
          admin: {
            description: 'Overrides the default link color for this variant. Any CSS color value.',
          },
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Overrides the default logo for this variant.',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        description:
          'Map URL variant keys to a footer theme. A visitor with ?v=<key> in the URL gets the matching theme.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

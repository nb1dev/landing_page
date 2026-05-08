import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const themeOptions = [
  { label: 'Light (white/glass background)', value: 'light' },
  { label: 'Dark (navy/glass background)', value: 'dark' },
]

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo (Light)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoDark',
      label: 'Logo (Dark)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shown when theme is dark. Falls back to the light logo if empty.',
      },
    },
    {
      name: 'theme',
      label: 'Default Theme',
      type: 'select',
      defaultValue: 'light',
      options: themeOptions,
      admin: {
        description: 'Used when no A/B variant matches.',
      },
    },
    {
      name: 'loginText',
      label: 'Login Link Text',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Login →"',
      },
    },
    {
      name: 'loginUrl',
      label: 'Login Link URL',
      type: 'text',
    },
    {
      name: 'loginTextColor',
      label: 'Login Text Color',
      type: 'text',
      admin: {
        description: 'CSS color override. Falls back to theme default if empty.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
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
            description: 'Matches the ?v= URL param. Case-sensitive.',
          },
        },
        {
          name: 'theme',
          label: 'Theme',
          type: 'select',
          options: themeOptions,
          required: true,
        },
        {
          name: 'loginTextColor',
          label: 'Login Text Color',
          type: 'text',
          admin: {
            description: 'Overrides the default login text color for this variant.',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        description: 'Override header appearance per A/B variant (?v= URL param).',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

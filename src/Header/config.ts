import type { CollectionConfig } from 'payload'

import { link } from '@/fields/link'
import { enforceSingleDefault } from './hooks/enforceSingleDefault'
import { revalidateHeader } from './hooks/revalidateHeader'

const themeOptions = [
  { label: 'Light (white/glass background)', value: 'light' },
  { label: 'Dark (navy/glass background)', value: 'dark' },
]

export const Headers: CollectionConfig = {
  slug: 'headers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'theme', 'isDefault'],
  },
  hooks: {
    afterChange: [enforceSingleDefault, revalidateHeader],
  },
  fields: [
    {
      name: 'name',
      label: 'Header Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal label, e.g. "Default", "Dark Landing", "Checkout".',
      },
    },
    {
      name: 'isDefault',
      label: 'Use as site default',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pages that do not select a specific header will use the default.',
      },
    },
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
      name: 'darkHero',
      label: 'Dark Hero Mode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Nav starts transparent with white text over a dark hero, then frosts on scroll. Enable when the page starts with a dark/image hero.',
      },
    },
    {
      name: 'ctaLabel',
      label: 'CTA Button Label',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Order your kit". Leave empty to hide the CTA button.',
      },
    },
    {
      name: 'ctaUrl',
      label: 'CTA Button URL',
      type: 'text',
      localized: true,
    },
    {
      name: 'loginText',
      label: 'Login Link Text',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Log in"',
      },
    },
    {
      name: 'loginUrl',
      label: 'Login Link URL',
      type: 'text',
      localized: true,
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
}

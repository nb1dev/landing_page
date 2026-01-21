import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'brandName',
      label: 'Brand',
      type: 'text',
      defaultValue: 'NB1',
      admin: { position: 'sidebar' },
    },
    {
      name: 'manufacturerName',
      label: 'Manufacturer',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'jsonLd',
      label: 'Product JSON-LD',
      type: 'json',
      admin: {
        description: 'Leave empty to auto-generate from localized fields.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        if (!data.jsonLd) {
          data.jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: data.name,
            description: data.description,
            brand: { '@type': 'Brand', name: data.brandName || 'NB1' },
            manufacturer: { '@type': 'Organization', name: data.manufacturerName || 'NB1' },
          }
        }

        return data
      },
    ],
  },
}

import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { WelcomeBannerBlock } from '@/blocks/WelcomeBanner/config'
import { DetailsBanner } from '@/blocks/DetailsBanner/config'
import { MissionBanner } from '@/blocks/MissionBanner/config'
import { FormCustom } from '@/blocks/FormCostom/config'
import { hero } from '@/heros/config'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import { MetaImageField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'

import { costomSlugField } from '@/fields/slug'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      title: true,
      description: true,
      image: true,
      robots: true,
      canonicalURL: true,
      ogTitle: true,
      ogDescription: true,
      ogImage: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // ✅ EN/DE unique titles
    },

    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },

        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                WelcomeBannerBlock,
                DetailsBanner,
                MissionBanner,
                FormCustom,
              ],
              required: true,
              admin: { initCollapsed: true },
            },
          ],
          label: 'Content',
        },

        {
          name: 'meta',
          label: 'SEO',
          fields: [
            // ✅ Nice overview card
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),

            // ✅ Your own localized fields (reliable + meets requirement)
            {
              name: 'title',
              label: 'Title Tag',
              type: 'text',
              localized: true,
              required: false,
              maxLength: 60,
              admin: {
                description: 'Custom meta title per page. If empty, uses page Title.',
              },
            },
            {
              name: 'description',
              label: 'Meta Description',
              type: 'textarea',
              localized: true,
              required: false,
              maxLength: 155,
              admin: {
                description: 'Custom meta description per page. If empty, uses a fallback.',
              },
            },

            // ✅ Meta image (social fallback)
            MetaImageField({
              relationTo: 'media',
            }),

            // ✅ Robots Tag
            {
              name: 'robots',
              label: 'Robots Tag',
              type: 'select',
              defaultValue: 'index,follow',
              options: [
                { label: 'Index, Follow', value: 'index,follow' },
                { label: 'Noindex, Follow', value: 'noindex,follow' },
                { label: 'Index, Nofollow', value: 'index,nofollow' },
                { label: 'Noindex, Nofollow', value: 'noindex,nofollow' },
              ],
              admin: { description: 'Controls indexing & link following.' },
            },

            // ✅ Canonical override
            {
              name: 'canonicalURL',
              label: 'Canonical URL',
              type: 'text',
              admin: {
                placeholder: 'https://example.com/page',
                description: 'Optional override. Leave empty to use computed canonical.',
              },
              validate: (val: unknown) => {
                if (!val) return true
                try {
                  new URL(String(val))
                  return true
                } catch {
                  return 'Please enter a valid absolute URL (including https://).'
                }
              },
            },

            // ✅ Open Graph overrides (localized text)
            {
              name: 'ogTitle',
              label: 'OG Title',
              type: 'text',
              localized: true,
              maxLength: 60,
              admin: { description: 'Optional. Defaults to Title Tag if empty.' },
            },
            {
              name: 'ogDescription',
              label: 'OG Description',
              type: 'textarea',
              localized: true,
              maxLength: 155,
              admin: { description: 'Optional. Defaults to Meta Description if empty.' },
            },
            {
              name: 'ogImage',
              label: 'Open Graph Image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Defaults to Meta Image if empty.' },
            },

            // ✅ Preview card in admin
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },

    // ✅ slug should not be localized in your /[locale]/[slug] setup
    costomSlugField(),
  ],

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        data.meta = data.meta || {}

        // ✅ Fallback rules (per-locale automatically because fields are localized)
        // If meta.title not set, use page title
        data.meta.title = data.meta.title || data.title

        // If OG fields empty, inherit meta fields
        data.meta.ogTitle = data.meta.ogTitle || data.meta.title || data.title
        data.meta.ogDescription = data.meta.ogDescription || data.meta.description

        // Prefer explicit ogImage, else fallback to meta image
        data.meta.ogImage = data.meta.ogImage || data.meta.image

        return data
      },
    ],
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },

  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

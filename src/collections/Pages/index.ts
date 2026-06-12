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
import { BoxCardBlock } from '@/blocks/landingBlocks/BoxCard/config'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import { MetaImageField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'

import { costomSlugField } from '@/fields/slug'
import { FormulaCardBlock } from '@/blocks/landingBlocks/FormulaCard/config'
import { ResultsCardBlock } from '@/blocks/landingBlocks/ResultsCard/config'
import { ReviewCardBlock } from '@/blocks/landingBlocks/ReviewCard/config'
import { StepsCardBlock } from '@/blocks/landingBlocks/StepsCard/config'
import { SymptomsCardBlock } from '@/blocks/landingBlocks/SymptomsCard/config'
import { VideoCardBlock } from '@/blocks/landingBlocks/VideoCard/config'
import { KeyTakeaways } from '@/blocks/KeyTakeways/config'
import { FAQBlock } from '@/blocks/FAQ/config'
import { DataTableBlock } from '@/blocks/DataTable/config'
import { CtaBlock } from '@/blocks/CTA/config'
import { BulletListBlock } from '@/blocks/BulletList/config'
import { ContactFormBlock } from '@/blocks/contactBlocks/ContactForm/config'
import { ContactInfoBlock } from '@/blocks/contactBlocks/ContactInfo/config'
import { ContactSectionBlock } from '@/blocks/contactBlocks/ContactSection/config'
import { BenefitsBanner } from '@/blocks/newLandingBlocks/BenefitsBanner/config'
import { StepsBanner } from '@/blocks/newLandingBlocks/StepsBanner/config'
import { ProductBanner } from '@/blocks/newLandingBlocks/ProductBanner/config'
import { AccessBanner } from '@/blocks/newLandingBlocks/AccessBanner/config'
import { ProductShowcase } from '@/blocks/ProductShowcase/config'
import { EarlyAccessBlock } from '@/blocks/EarlyAccessBlock/config'
import { EvolutionBandBlock } from '@/blocks/EvolutionBandBlock/config'
import { HeroBannerBlock } from '@/blocks/newLandingBlocks/HeroBanner/config'
import { OutcomesSectionBlock } from '@/blocks/newLandingBlocks/OutcomesSection/config'
import { ProcessDiagramBlock } from '@/blocks/newLandingBlocks/ProcessDiagram/config'
import { StatBreakBlock } from '@/blocks/newLandingBlocks/StatBreak/config'
import { ReserveCtaBlock } from '@/blocks/newLandingBlocks/ReserveCta/config'
import { AthleteBannerBlock } from '@/blocks/newLandingBlocks/AthleteBanner/config'
import { PriceBreakBlock } from '@/blocks/PriceBreakBlock/config'
import { ScienceBoardBlock } from '@/blocks/ScienceBoardBlock/config'
import { FloatingCTABlock } from '@/blocks/FloatingCTA/config'
import { YpHeroBlock } from '@/blocks/yourPlanBlocks/Hero/config'
import { YpPlansBlock } from '@/blocks/yourPlanBlocks/Plans/config'
import { YpThreeComponentsBlock } from '@/blocks/yourPlanBlocks/ThreeComponents/config'
import { YpDashboardBlock } from '@/blocks/yourPlanBlocks/Dashboard/config'
import { YpTimelineBlock } from '@/blocks/yourPlanBlocks/Timeline/config'
import { YpScienceBoardBlock } from '@/blocks/yourPlanBlocks/ScienceBoard/config'
import { YpAthletesBlock } from '@/blocks/yourPlanBlocks/Athletes/config'
import { YpBreakupBlock } from '@/blocks/yourPlanBlocks/Breakup/config'
import { YpFaqBlock } from '@/blocks/yourPlanBlocks/Faq/config'
import { YpStickyBuyBlock } from '@/blocks/yourPlanBlocks/StickyBuy/config'
import { YpReassuranceBlock } from '@/blocks/yourPlanBlocks/Reassurance/config'
import { YpBuyBoxBlock } from '@/blocks/yourPlanBlocks/BuyBox/config'
import { OrderStepHero } from '@/blocks/checkoutBlocks/OrderStepHero/config'
import { TrustSealsBar } from '@/blocks/checkoutBlocks/TrustSealsBar/config'
import { OrderTimeline } from '@/blocks/checkoutBlocks/OrderTimeline/config'
import { FormulaKit } from '@/blocks/checkoutBlocks/FormulaKit/config'
import { CheckoutFaq } from '@/blocks/checkoutBlocks/CheckoutFaq/config'
import { EndCard } from '@/blocks/checkoutBlocks/EndCard/config'
import { PlanSummaryCard } from '@/blocks/checkoutBlocks/PlanSummaryCard/config'
import { GuaranteeBadges } from '@/blocks/checkoutBlocks/GuaranteeBadges/config'
import { CyclesPricingGrid } from '@/blocks/checkoutBlocks/CyclesPricingGrid/config'
import { ReinforceCta } from '@/blocks/checkoutBlocks/ReinforceCta/config'
import { PlanPivot } from '@/blocks/checkoutBlocks/PlanPivot/config'
import { StickyCtaBar } from '@/blocks/checkoutBlocks/StickyCtaBar/config'
import { PlanSelector } from '@/blocks/checkoutBlocks/PlanSelector/config'
import { CycleSelector } from '@/blocks/checkoutBlocks/CycleSelector/config'
import { CheckoutForm } from '@/blocks/checkoutBlocks/CheckoutForm/config'
import { HomepageHeroBlock } from '@/blocks/HomepageHero/config'
import { TheCaseBlock } from '@/blocks/TheCase/config'
import { TwoModelsBlock } from '@/blocks/TwoModels/config'
import { GutFirstBlock } from '@/blocks/GutFirst/config'
import { HowItWorksBlock } from '@/blocks/HowItWorks/config'
import { WhatArrivesBlock } from '@/blocks/WhatArrives/config'
import { OutcomesBlock } from '@/blocks/Outcomes/config'
import { AthletesBlock } from '@/blocks/Athletes/config'
import { ScienceBoardNewBlock } from '@/blocks/ScienceBoardNew/config'
import { StandardsBlock } from '@/blocks/Standards/config'
import { PlansBlock } from '@/blocks/Plans/config'
import { CloseBandBlock } from '@/blocks/CloseBand/config'

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
      localized: true,
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
                BoxCardBlock,
                FormulaCardBlock,
                ResultsCardBlock,
                ReviewCardBlock,
                StepsCardBlock,
                SymptomsCardBlock,
                VideoCardBlock,
                KeyTakeaways,
                FAQBlock,
                DataTableBlock,
                CtaBlock,
                BulletListBlock,
                ContactFormBlock,
                ContactInfoBlock,
                ContactSectionBlock,
                BenefitsBanner,
                StepsBanner,
                ProductBanner,
                AccessBanner,
                ProductShowcase,
                EarlyAccessBlock,
                EvolutionBandBlock,
                HeroBannerBlock,
                OutcomesSectionBlock,
                ProcessDiagramBlock,
                StatBreakBlock,
                ReserveCtaBlock,
                AthleteBannerBlock,
                PriceBreakBlock,
                ScienceBoardBlock,
                FloatingCTABlock,
                YpHeroBlock,
                YpPlansBlock,
                YpThreeComponentsBlock,
                YpDashboardBlock,
                YpTimelineBlock,
                YpScienceBoardBlock,
                YpAthletesBlock,
                YpBreakupBlock,
                YpFaqBlock,
                YpReassuranceBlock,
                YpBuyBoxBlock,
                YpStickyBuyBlock,
                OrderStepHero,
                TrustSealsBar,
                OrderTimeline,
                FormulaKit,
                CheckoutFaq,
                EndCard,
                PlanSummaryCard,
                GuaranteeBadges,
                CyclesPricingGrid,
                ReinforceCta,
                PlanPivot,
                StickyCtaBar,
                PlanSelector,
                CycleSelector,
                CheckoutForm,
                HomepageHeroBlock,
                TheCaseBlock,
                TwoModelsBlock,
                GutFirstBlock,
                HowItWorksBlock,
                WhatArrivesBlock,
                OutcomesBlock,
                AthletesBlock,
                ScienceBoardNewBlock,
                StandardsBlock,
                PlansBlock,
                CloseBandBlock,
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
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
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
            MetaImageField({
              relationTo: 'media',
            }),
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

    costomSlugField(),
  ],

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        data.meta = data.meta || {}

        data.meta.title = data.meta.title || data.title
        data.meta.ogTitle = data.meta.ogTitle || data.meta.title || data.title
        data.meta.ogDescription = data.meta.ogDescription || data.meta.description
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

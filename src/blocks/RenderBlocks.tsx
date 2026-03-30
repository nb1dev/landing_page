import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { AppLocale } from '@/i18n/config'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { WelcomeBannerBlock } from '@/blocks/WelcomeBanner/Component'
import { DetailsBannerBlock } from '@/blocks/DetailsBanner/Component'
import { MissionBannerBlock } from '@/blocks/MissionBanner/Component'
import { FormCustomBlock } from '@/blocks/FormCostom/Component'
import { BoxCardBlock } from '@/blocks/landingBlocks/BoxCard/Component'
import { FormulaCardBlock } from './landingBlocks/FormulaCard/Component'
import { ResultsCardBlock } from './landingBlocks/ResultsCard/Component'
import { ReviewCardBlock } from './landingBlocks/ReviewCard/Component'
import { StepsCardBlock } from './landingBlocks/StepsCard/Component'
import { SymptomsCardBlock } from './landingBlocks/SymptomsCard/Component'
import { VideoCardBlock } from './landingBlocks/VideoCard/Component'
import { KeyTakeawaysBlock } from '@/blocks/KeyTakeways/Component'
import { FAQBlockComponent } from './FAQ/Component'
import { DataTableBlockComponent } from '@/blocks/DataTable/Component'
import { CtaBlockComponent } from '@/blocks/CTA/Component'
import { BulletListBlockComponent } from '@/blocks/BulletList/Component'
import { ContactFormBlock } from '@/blocks/contactBlocks/ContactForm/Component'
import { ContactInfoBlock } from '@/blocks/contactBlocks/ContactInfo/Component'
import { ContactSectionBlock } from '@/blocks/contactBlocks/ContactSection/Component'

const blockComponents: Record<string, React.FC<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'welcome-banner': WelcomeBannerBlock,
  'details-banner': DetailsBannerBlock,
  'mission-banner': MissionBannerBlock,
  'form-custom': FormCustomBlock,
  'box-card': BoxCardBlock,
  'formula-card': FormulaCardBlock,
  'results-card': ResultsCardBlock,
  'review-card': ReviewCardBlock,
  'steps-card': StepsCardBlock,
  'symptoms-card': SymptomsCardBlock,
  'video-card': VideoCardBlock,
  keyTakeaways: KeyTakeawaysBlock,
  faq: FAQBlockComponent,
  dataTable: DataTableBlockComponent,
  ctaBlock: CtaBlockComponent,
  bulletList: BulletListBlockComponent,
  'contact-form': ContactFormBlock,
  'contact-info': ContactInfoBlock,
  'contact-section': ContactSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: AppLocale
}> = ({ blocks, locale }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return (
              <div className="p-0" key={index}>
                <Block {...block} locale={locale} disableInnerContainer />
              </div>
            )
          }
        }

        return null
      })}
    </Fragment>
  )
}

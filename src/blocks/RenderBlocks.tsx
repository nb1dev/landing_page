import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { WelcomeBannerBlock } from '@/blocks/WelcomeBanner/Component'
import { DetailsBannerBlock } from '@/blocks/DetailsBanner/Component'
import { MissionBannerBlock } from '@/blocks/MissionBanner/Component'
import { FormCustomBlock } from '@/blocks/FormCostom/Component'

// ✅ Keys MUST match Payload block slug (= blockType)
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
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

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
                <Block {...block} disableInnerContainer />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}

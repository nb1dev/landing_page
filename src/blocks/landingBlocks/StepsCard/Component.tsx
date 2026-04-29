/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { StepsCardBlock as StepsCardBlockProps } from '@/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import '../landing-template.css'

export const StepsCardBlock: React.FC<StepsCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  return (
    <div className="lc-wrapper--dark">
      <div className="lc-title lc-title--steps lc-title--on-dark">
        <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
      </div>
      <div className="lc-divider" />
      <div className="lc-steps">
        {props?.steps?.map((step, index) => (
          <div key={index} className="lc-step">
            <div
              className={`flex ${isMobile ? 'justify-between' : 'flex-col'}`}
              style={{ gap: isMobile ? '' : '24px' }}
            >
              <div className="flex flex-row" style={{ gap: '13px', height: isMobile ? '' : '90px' }}>
                <img
                  src={getMediaUrl(
                    typeof step?.stepNumber === 'object' ? step.stepNumber?.url : '',
                  )}
                  alt={`Step ${index + 1} Icon`}
                  className="lc-step__number"
                />
                <div className="lc-step__title">{step?.stepTitle}</div>
              </div>
              <div className={`flex ${!isMobile ? 'mr-auto ml-auto' : ''}`} style={{ height: isMobile ? '' : '120px' }}>
                <img
                  src={getMediaUrl(typeof step?.icon === 'object' ? step.icon?.url : '')}
                  alt={`Step ${index + 1} Icon`}
                  className="lc-step__icon"
                />
              </div>
            </div>
            <div className="lc-step__description">
              <RichText
                data={step?.stepDescription as any}
                enableGutter={false}
                enableProse={false}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'justify-between'}`}
        style={{
          flexDirection: isMobile ? 'column-reverse' : 'row',
          marginTop: '40px',
          padding: isMobile ? '0 12px' : '0 40px',
        }}
      >
        <div
          className="lc-note--accent flex mt-auto mb-auto"
          style={{
            marginRight: isMobile ? 'auto' : '',
            marginLeft: isMobile ? 'auto' : '',
            marginTop: isMobile ? '12px' : '',
          }}
        >
          {props?.note}
        </div>
        <div className="lc-btn lc-btn--light flex mt-auto mb-auto" style={{ marginRight: isMobile ? 'auto' : '', marginLeft: isMobile ? 'auto' : '' }}>
          {props?.button?.label}
        </div>
      </div>
    </div>
  )
}

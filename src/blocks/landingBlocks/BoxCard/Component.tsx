/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { BoxCardBlock as BoxCardBlockProps } from '@/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import '../landing-template.css'

export const BoxCardBlock: React.FC<BoxCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  return (
    <div className="lc-wrapper">
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}
        style={{
          width: '100%',
          backgroundColor: 'white',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          backgroundImage: isMobile
            ? `url(${getMediaUrl(typeof props?.backgroundImage?.mobile === 'object' ? props.backgroundImage.mobile?.url : '')})`
            : `url(${getMediaUrl(typeof props?.backgroundImage?.web === 'object' ? props.backgroundImage.web?.url : '')})`,
        }}
      >
        <div
          className="flex flex-col"
          style={{
            marginTop: isMobile ? '37px' : '75px',
            marginLeft: isMobile ? '37px' : '75px',
            marginRight: isMobile ? '37px' : '',
            marginBottom: isMobile ? '37px' : '37px',
            width: isMobile ? '' : '644px',
          }}
        >
          <div className="lc-title" style={{ marginBottom: isMobile ? '24px' : '4px' }}>
            <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
          </div>
          <div className="lc-description" style={{ fontSize: isMobile ? '14px' : '20px', lineHeight: isMobile ? '24px' : '32px' }}>
            <RichText data={props?.description as any} enableGutter={false} enableProse={false} />
          </div>
          <div className="lc-icon-list" style={{ marginTop: '38px', marginBottom: '38px' }}>
            {props.itemsList?.map((item, index) => (
              <div key={index} className="lc-icon-list__item">
                <img
                  src={
                    typeof item.icon === 'object'
                      ? getMediaUrl(item.icon?.url).toString()
                      : undefined
                  }
                  className="lc-icon-list__icon"
                  alt="icon"
                />
                <div
                  className="lc-icon-list__label"
                  style={{ fontSize: isMobile ? '14px' : '20px', lineHeight: isMobile ? '24px' : '32px' }}
                >
                  {item.textLabel}
                </div>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className="flex mt-auto mb-auto">
              <div className="w-full">
                <img
                  src={
                    typeof props.boxImage?.mobile === 'object'
                      ? getMediaUrl(props.boxImage?.mobile?.url).toString()
                      : undefined
                  }
                  alt="img"
                />
              </div>
            </div>
          )}
          <div className={isMobile ? 'mr-auto ml-auto' : ''}>
            <button className="lc-btn" style={{ marginBottom: '12px' }}>
              {props.button?.label}
            </button>
          </div>
          <div className="lc-note" style={{ textAlign: isMobile ? 'center' : 'left' }}>
            {props.note}
          </div>
        </div>
        {!isMobile && (
          <div className="flex mt-auto mb-auto">
            <div className="w-full">
              <img
                src={
                  typeof props.boxImage?.web === 'object'
                    ? getMediaUrl(props.boxImage?.web?.url).toString()
                    : undefined
                }
                alt="img"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

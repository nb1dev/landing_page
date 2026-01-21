'use client'
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import type { MissionBannerBlock as MissionBannerBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'

export const MissionBannerBlock: React.FC<MissionBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const firstImage =
    Array.isArray(props.images) && props.images.length > 0 ? props.images[0] : undefined

  const heroImageUrl =
    firstImage && typeof firstImage.image === 'object'
      ? getMediaUrl(firstImage.image.url).toString()
      : undefined

  const logoUrl =
    typeof props.logo === 'object' ? getMediaUrl(props.logo.url).toString() : undefined

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '20px' : '' }}
    >
      <div
        style={{
          width: '100%',
          paddingBottom: '20px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          backgroundColor: '#1D1D1D',
          padding: isMobile ? '24px' : '',
        }}
      >
        <div
          className="flex flex-row w-full"
          style={{
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '24px' : '80px',
          }}
        >
          {/* Mobile heading on top */}
          {isMobile && (
            <div
              style={{
                fontSize: '42px',
                marginBottom: '16px',
                width: '100%',
                fontFamily: 'Instrument Sans',
                fontWeight: '500',
                lineHeight: '42px',
                color: 'white',
              }}
            >
              <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Left image */}
          <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'}`}>
            <img
              style={{ width: isMobile ? '75%' : '100%', marginBottom: '5px', maxHeight: '384px' }}
              src={heroImageUrl}
              alt=""
            />
          </div>

          {/* Right column */}
          <div
            className={`flex ${isMobile ? 'w-full' : 'w-1/2'} flex-col`}
            style={{ color: 'white' }}
          >
            {!isMobile && (
              <div
                style={{
                  fontSize: '50px',
                  marginBottom: '16px',
                  fontFamily: 'Instrument Sans',
                  fontWeight: '500',
                  lineHeight: '74px',
                }}
              >
                <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
              </div>
            )}

            <div
              style={{
                marginBottom: '16px',
                fontSize: isMobile ? '15px' : '18px',
                fontFamily: 'Inter',
                fontWeight: '400',
                lineHeight: isMobile ? '22px' : '24px',
                opacity: 0.9,
              }}
            >
              <RichText data={props.description as any} enableGutter={false} enableProse={false} />
            </div>

            <div style={{ marginTop: 'auto' }}>
              <img style={{ marginBottom: '16px', maxHeight: '384px' }} src={logoUrl} alt="" />

              <div
                style={{
                  color: '#8b8a8a',
                  fontSize: isMobile ? '12px' : '14px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                }}
              >
                {props.copyright}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

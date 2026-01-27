'use client'

import React from 'react'
import Image from 'next/image'
import type { MissionBannerBlock as MissionBannerBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'

export const MissionBannerBlock: React.FC<MissionBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const firstImage =
    Array.isArray(props.images) && props.images.length > 0 ? props.images[0] : undefined

  const hero =
    firstImage && typeof firstImage.image === 'object' && firstImage.image?.url
      ? {
          src: getMediaUrl(firstImage.image.url).toString(),
          alt: firstImage.image.alt || 'Mission image',
        }
      : null

  const logo =
    typeof props.logo === 'object' && props.logo?.url
      ? {
          src: getMediaUrl(props.logo.url).toString(),
          alt: props.logo.alt || 'Logo',
        }
      : null
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
            {hero && (
              <Image
                src={hero.src}
                alt={hero.alt}
                width={2400}
                height={1600}
                priority
                quality={100}
                sizes="(min-width: 1024px) 50vw, 75vw"
                style={{
                  width: isMobile ? '75%' : '100%',
                  height: 'auto',
                  marginBottom: '5px',
                  maxHeight: '384px',
                  display: 'block',
                }}
              />
            )}
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
              {logo && (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={1200}
                  height={600}
                  quality={95}
                  sizes={isMobile ? '60vw' : '25vw'}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '384px',
                    marginBottom: '16px',
                    display: 'block',
                  }}
                />
              )}

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

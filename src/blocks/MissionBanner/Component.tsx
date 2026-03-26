'use client'

import React from 'react'
import Image from 'next/image'
import type { MissionBannerBlock as MissionBannerBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'
import '@/styles/banner-template.css'

function toRelativeSrc(input?: string): string | undefined {
  if (!input) return undefined
  if (input.startsWith('/')) return input

  try {
    const u = new URL(input)
    return `${u.pathname}${u.search}`
  } catch {
    return input
  }
}

export const MissionBannerBlock: React.FC<MissionBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()

  const firstImage =
    Array.isArray(props.images) && props.images.length > 0 ? props.images[0] : undefined

  const hero =
    firstImage && typeof firstImage.image === 'object' && firstImage.image?.url
      ? {
          src: toRelativeSrc(getMediaUrl(firstImage.image.url).toString()),
          alt: firstImage.image.alt || 'Mission image',
        }
      : null

  const logo =
    typeof props.logo === 'object' && props.logo?.url
      ? {
          src: toRelativeSrc(getMediaUrl(props.logo.url).toString()),
          alt: props.logo.alt || 'Logo',
        }
      : null

  return (
    <div className="banner-wrapper">
      <div
        className="banner-container banner-container--dark"
        style={isMobile ? { padding: '24px' } : undefined}
      >
        <div className="banner-row banner-row--wide-gap">
          {/* Mobile heading on top */}
          {isMobile && (
            <div className="banner-heading banner-heading--on-dark">
              <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Left hero image */}
          <div className="banner-col banner-col--full-mobile">
            {hero?.src && (
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
          <div className="banner-col banner-col--full-mobile">
            {!isMobile && (
              <div className="banner-heading banner-heading--on-dark">
                <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
              </div>
            )}

            <div className="banner-description banner-description--on-dark">
              <RichText data={props.description as any} enableGutter={false} enableProse={false} />
            </div>

            <div style={{ marginTop: 'auto' }}>
              {logo?.src && (
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

              <div className="banner-copyright">{props.copyright}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import Image from 'next/image'
import type { DetailsBannerBlock as DetailsBannerBlockProps } from '@/payload-types'

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

export const DetailsBannerBlock: React.FC<DetailsBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const items = Array.isArray(props.content) ? props.content : []

  const c0 = items[0]
  const c1 = items[1]
  const c2 = items[2]
  const c3 = items[3]

  const bg = (item: any) => {
    if (!item) return null

    const chosenMedia =
      isMobile && typeof item?.backgroundImageMobile === 'object'
        ? item.backgroundImageMobile
        : typeof item?.backgroundImage === 'object'
          ? item.backgroundImage
          : null

    if (!chosenMedia?.url) return null

    return {
      src: toRelativeSrc(getMediaUrl(chosenMedia.url).toString()),
      alt: chosenMedia.alt || 'Card background',
    }
  }

  const bg0 = bg(c0)
  const bg1 = bg(c1)
  const bg2 = bg(c2)
  const bg3 = bg(c3)

  return (
    <div className="banner-wrapper">
      <div className="banner-container banner-container--dark">
        <div
          className="banner-heading banner-heading--on-dark"
          style={{
            width: isMobile ? '78%' : '75%',
            marginBottom: isMobile ? '24px' : '40px',
          }}
        >
          <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
        </div>

        <div className="banner-cards-grid">
          {/* Card 1 */}
          <div className="banner-card banner-card--dark">
            {bg0?.src && (
              <Image
                src={bg0.src}
                alt={bg0.alt}
                fill
                sizes={isMobile ? '100vw' : '50vw'}
                quality={90}
                className="object-cover"
              />
            )}
            <div className="banner-card__content">
              <div className="banner-card__title banner-card__title--on-light w-full">
                {c0?.title || ''}
              </div>
              <div className={`banner-card__description banner-card__description--on-light ${isMobile ? 'w-full' : 'w-2/3'}`}>
                {c0?.description || ''}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="banner-card banner-card--dark">
            {bg1?.src && (
              <Image
                src={bg1.src}
                alt={bg1.alt}
                fill
                sizes={isMobile ? '100vw' : '50vw'}
                quality={90}
                className="object-cover"
              />
            )}
            <div className="banner-card__content">
              <div className="banner-card__title banner-card__title--on-dark w-full">
                {c1?.title || ''}
              </div>
              <div className={`banner-card__description banner-card__description--on-dark ${isMobile ? 'w-full' : 'w-2/3'}`}>
                {c1?.description || ''}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="banner-card banner-card--blue">
            {bg2?.src && (
              <Image
                src={bg2.src}
                alt={bg2.alt}
                fill
                sizes={isMobile ? '100vw' : '50vw'}
                quality={90}
                className="object-cover"
              />
            )}
            <div className="banner-card__content">
              <div className="banner-card__inner-row">
                <div style={{ width: isMobile ? '100%' : '70%', paddingRight: isMobile ? '32px' : '0' }}>
                  <div className="banner-card__title banner-card__title--on-dark">
                    {c2?.title || ''}
                  </div>
                  <div className="banner-card__description banner-card__description--on-dark">
                    {c2?.description || ''}
                  </div>
                </div>
                <div style={{ width: isMobile ? '100%' : '40%', flexShrink: 0, marginLeft: 'auto' }}>
                  {typeof c2?.imageContent === 'object' && c2.imageContent?.url && (
                    <Image
                      src={toRelativeSrc(getMediaUrl(c2.imageContent.url).toString()) as string}
                      alt={c2.imageContent.alt || 'Illustration'}
                      width={2000}
                      height={2000}
                      quality={95}
                      sizes={isMobile ? '73vw' : '30vw'}
                      className="banner-card__image"
                      style={{ width: isMobile ? '73%' : '100%', marginLeft: 'auto' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="banner-card banner-card--teal">
            {bg3?.src && (
              <Image
                src={bg3.src}
                alt={bg3.alt}
                fill
                sizes={isMobile ? '100vw' : '50vw'}
                quality={90}
                className="object-cover"
              />
            )}
            <div className="banner-card__content">
              <div className="banner-card__inner-row">
                <div style={{ width: isMobile ? '100%' : '60%' }}>
                  <div className="banner-card__title banner-card__title--on-dark">
                    {c3?.title || ''}
                  </div>
                  <div className="banner-card__description banner-card__description--on-dark">
                    {c3?.description || ''}
                  </div>
                </div>
                <div style={{ width: isMobile ? '100%' : '46%', flexShrink: 0, marginLeft: 'auto' }}>
                  {typeof c3?.imageContent === 'object' && c3.imageContent?.url && (
                    <Image
                      src={toRelativeSrc(getMediaUrl(c3.imageContent.url).toString()) as string}
                      alt={c3.imageContent.alt || 'Illustration'}
                      width={2000}
                      height={2000}
                      quality={95}
                      sizes={isMobile ? '100vw' : '40vw'}
                      className="banner-card__image"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

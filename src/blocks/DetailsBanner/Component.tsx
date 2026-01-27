'use client'

import React from 'react'
import Image from 'next/image'
import type { DetailsBannerBlock as DetailsBannerBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'

export const DetailsBannerBlock: React.FC<DetailsBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const items = Array.isArray(props.content) ? props.content : []

  // ✅ Safety: avoid crashes if admin content isn't filled yet
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
      src: getMediaUrl(chosenMedia.url).toString(),
      alt: chosenMedia.alt || 'Card background',
    }
  }

  const bg0 = bg(c0)
  const bg1 = bg(c1)
  const bg2 = bg(c2)
  const bg3 = bg(c3)

  const imgUrl = (media: any) => {
    if (!media || typeof media !== 'object') return undefined
    const url = media?.url
    return url ? getMediaUrl(url).toString() : undefined
  }

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '0 20px 20px' : '' }}
    >
      <div
        style={{
          width: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          backgroundColor: '#1D1D1D',
        }}
      >
        <div
          style={{
            fontSize: isMobile ? '38px' : '50px',
            width: isMobile ? '78%' : '75%',
            marginBottom: isMobile ? '24px' : '40px',
            lineHeight: isMobile ? '42px' : '74px',
          }}
        >
          <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
        </div>

        <div>
          {/* Row 1 */}
          <div
            className={`flex w-full mb-6 ${isMobile ? 'flex-col' : 'flex-row'}`}
            style={{ gap: '24px' }}
          >
            {/* Card 1 */}
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: '300px',
                backgroundColor: 'black',
                padding: isMobile ? '24px' : '32px 40px',
                marginBottom: isMobile ? '0' : '8px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {bg0 && (
                <Image
                  src={bg0.src}
                  alt={bg0.alt}
                  fill
                  sizes={isMobile ? '100vw' : '50vw'}
                  quality={90}
                  className="object-cover"
                />
              )}
              <div className="relative z-10">
                <div
                  className="w-full"
                  style={{
                    color: '#292929',
                    marginBottom: isMobile ? '16px' : '32px',
                    fontSize: isMobile ? '24px' : '32px',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '400',
                    lineHeight: '38px',
                  }}
                >
                  {c0?.title || ''}
                </div>
                <div
                  className={isMobile ? 'w-full' : 'w-2/3'}
                  style={{
                    color: '#292929',
                    fontSize: isMobile ? '15px' : '16px',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    lineHeight: '24px',
                  }}
                >
                  {c0?.description || ''}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: '300px',
                backgroundColor: 'black',
                padding: isMobile ? '24px' : '32px 40px',
                marginBottom: isMobile ? '0' : '8px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {bg1 && (
                <Image
                  src={bg1.src}
                  alt={bg1.alt}
                  fill
                  sizes={isMobile ? '100vw' : '50vw'}
                  quality={90}
                  className="object-cover"
                />
              )}
              <div className="relative z-10">
                <div
                  className="w-full"
                  style={{
                    color: 'white',
                    marginBottom: isMobile ? '16px' : '32px',
                    fontSize: isMobile ? '24px' : '32px',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '400',
                    lineHeight: isMobile ? '32px' : '38px',
                  }}
                >
                  {c1?.title || ''}
                </div>
                <div
                  className={isMobile ? 'w-full' : 'w-2/3'}
                  style={{
                    color: 'white',
                    fontSize: isMobile ? '15px' : '16px',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    lineHeight: '24px',
                    opacity: '0.8',
                  }}
                >
                  {c1?.description || ''}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div
            className={`flex w-full ${isMobile ? 'flex-col' : 'flex-row'}`}
            style={{ gap: '24px' }}
          >
            {/* Card 3 */}
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                backgroundColor: '#138DF1',
                padding: isMobile ? '24px 0 24px 24px' : '32px 0 32px 40px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background image */}
              {bg2 && (
                <Image
                  src={bg2.src}
                  alt={bg2.alt}
                  fill
                  sizes={isMobile ? '100vw' : '50vw'}
                  quality={90}
                  className="object-cover"
                />
              )}

              {/* Content layer */}
              <div
                className={`relative z-10 w-full flex ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}
              >
                <div
                  style={{
                    width: isMobile ? '100%' : '70%',
                    paddingRight: isMobile ? '32px' : '0',
                  }}
                >
                  <div
                    style={{
                      color: 'white',
                      marginBottom: isMobile ? '16px' : '32px',
                      fontSize: isMobile ? '24px' : '32px',
                      fontFamily: 'Instrument Sans',
                      fontWeight: '400',
                      lineHeight: isMobile ? '32px' : '38px',
                    }}
                  >
                    {c2?.title || ''}
                  </div>

                  <div
                    style={{
                      color: 'white',
                      fontSize: isMobile ? '15px' : '16px',
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      lineHeight: '24px',
                      opacity: '0.8',
                    }}
                  >
                    {c2?.description || ''}
                  </div>
                </div>
                <div
                  style={{
                    width: isMobile ? '100%' : '40%', // 👈 controls how big it is on desktop
                    flexShrink: 0, // 👈 prevents shrinking
                    marginLeft: 'auto',
                  }}
                >
                  {typeof c2?.imageContent === 'object' && c2.imageContent?.url && (
                    <Image
                      src={getMediaUrl(c2.imageContent.url).toString()}
                      alt={c2.imageContent.alt || 'Illustration'}
                      width={2000}
                      height={2000}
                      quality={95}
                      sizes={isMobile ? '73vw' : '30vw'}
                      style={{
                        width: isMobile ? '73%' : '100%',
                        height: 'auto',
                        display: 'block',
                        marginLeft: 'auto',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                backgroundColor: '#008498',
                padding: isMobile ? '0 24px 24px 24px' : '32px 0 32px 40px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: isMobile ? 'auto' : '326px',
              }}
            >
              {/* Background image */}
              {bg3 && (
                <Image
                  src={bg3.src}
                  alt={bg3.alt}
                  fill
                  sizes={isMobile ? '100vw' : '50vw'}
                  quality={90}
                  className="object-cover"
                />
              )}

              {/* Content layer */}
              <div
                className={`relative z-10 w-full flex ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}
              >
                <div style={{ width: isMobile ? '100%' : '60%' }}>
                  <div
                    style={{
                      color: 'white',
                      marginBottom: isMobile ? '16px' : '32px',
                      fontSize: isMobile ? '24px' : '32px',
                      fontFamily: 'Instrument Sans',
                      fontWeight: '400',
                      lineHeight: isMobile ? '32px' : '38px',
                    }}
                  >
                    {c3?.title || ''}
                  </div>

                  <div
                    style={{
                      color: 'white',
                      fontSize: isMobile ? '15px' : '16px',
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      lineHeight: '24px',
                      opacity: '0.8',
                    }}
                  >
                    {c3?.description || ''}
                  </div>
                </div>

                <div
                  style={{
                    width: isMobile ? '100%' : '46%', // 👈 bigger than card 3, matches your old look usually
                    flexShrink: 0,
                    marginLeft: 'auto',
                  }}
                >
                  {typeof c3?.imageContent === 'object' && c3.imageContent?.url && (
                    <Image
                      src={getMediaUrl(c3.imageContent.url).toString()}
                      alt={c3.imageContent.alt || 'Illustration'}
                      width={2000}
                      height={2000}
                      quality={95}
                      sizes={isMobile ? '100vw' : '40vw'}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
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

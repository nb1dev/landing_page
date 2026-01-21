/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
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
    if (!item) return undefined
    const chosen =
      isMobile && typeof item?.backgroundImageMobile === 'object'
        ? item.backgroundImageMobile?.url
        : typeof item?.backgroundImage === 'object'
          ? item.backgroundImage?.url
          : undefined

    if (!chosen) return undefined
    return `url(${getMediaUrl(chosen).toString()})`
  }

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
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: bg(c0),
              }}
            >
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

            {/* Card 2 */}
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: '300px',
                backgroundColor: 'black',
                padding: isMobile ? '24px' : '32px 40px',
                borderRadius: '20px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: isMobile ? '0' : '8px',
                backgroundImage: bg(c1),
              }}
            >
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
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: bg(c2),
              }}
            >
              <div className={`w-full flex ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}>
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

                <div className={isMobile ? 'w-full' : ''}>
                  <img
                    style={{ width: isMobile ? '73%' : '100%', marginLeft: 'auto' }}
                    src={imgUrl(c2?.imageContent)}
                    alt=""
                  />
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
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: bg(c3),
              }}
            >
              <div className={`w-full flex ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}>
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

                <div className={isMobile ? 'w-full' : ''}>
                  <img className="w-full" src={imgUrl(c3?.imageContent)} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

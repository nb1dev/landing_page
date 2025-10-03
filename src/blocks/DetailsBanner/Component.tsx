'use client'

import type { DetailsBannerBlock as DetailsBannerBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'
// import { BlocksField } from '@payloadcms/ui'

export const DetailsBannerBlock: React.FC<DetailsBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()

  return (
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
      <div>
        <div>
          <div style={{ fontSize: '4.3rem', width: '75%' }}>
            <RichText data={props.heading} />
          </div>
        </div>
        <div>
          <div className={`flex w-full gap-4 mb-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: '300px',
                backgroundColor: 'black',
                padding: '24px',
                borderRadius: '20px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: isMobile
                  ? `url(${getMediaUrl(
                      props.content && typeof props.content[0]?.backgroundImageMobile === 'object'
                        ? getMediaUrl(props.content[0]?.backgroundImageMobile?.url).toString()
                        : undefined,
                    )})`
                  : `url(${getMediaUrl(
                      props.content && typeof props.content[0]?.backgroundImage === 'object'
                        ? getMediaUrl(props.content[0]?.backgroundImage?.url).toString()
                        : undefined,
                    )})`,
              }}
            >
              {/* <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[0]?.icon === 'object'
                    ? getMediaUrl(props.content[0]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              /> */}
              <div
                className="w-full"
                style={{
                  color: '#292929',
                  marginBottom: '16px',
                  fontSize: '2rem',
                  fontFamily: 'Instrument Sans',
                  fontWeight: '500',
                }}
              >
                {props.content ? props.content[0]?.title : ''}
              </div>
              <div
                className={isMobile ? 'w-full' : 'w-2/3'}
                style={{
                  color: '#292929',
                  fontSize: '1rem',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                }}
              >
                {props.content ? props.content[0]?.description : ''}
              </div>
            </div>
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: '300px',
                backgroundColor: 'black',
                padding: '24px',
                borderRadius: '20px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: isMobile
                  ? `url(${getMediaUrl(
                      props.content && typeof props.content[1]?.backgroundImageMobile === 'object'
                        ? getMediaUrl(props.content[1]?.backgroundImageMobile?.url).toString()
                        : undefined,
                    )})`
                  : `url(${getMediaUrl(
                      props.content && typeof props.content[1]?.backgroundImage === 'object'
                        ? getMediaUrl(props.content[1]?.backgroundImage?.url).toString()
                        : undefined,
                    )})`,
              }}
            >
              {/* <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[1]?.icon === 'object'
                    ? getMediaUrl(props.content[1]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              /> */}
              <div
                className="w-full"
                style={{
                  color: 'white',
                  marginBottom: '16px',
                  fontSize: '2rem',
                  fontFamily: 'Instrument Sans',
                  fontWeight: '500',
                }}
              >
                {props.content ? props.content[1]?.title : ''}
              </div>
              <div
                className={isMobile ? 'w-full' : 'w-2/3'}
                style={{ color: 'white', fontSize: '1rem', fontFamily: 'Inter', fontWeight: '400' }}
              >
                {props.content ? props.content[1]?.description : ''}
              </div>
            </div>
          </div>
          <div className={`flex w-full gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: isMobile ? '570px' : '300px',
                height: isMobile ? '570px' : '',
                backgroundColor: 'black',
                padding: '24px',
                borderRadius: '20px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: isMobile
                  ? `url(${getMediaUrl(
                      props.content && typeof props.content[2]?.backgroundImageMobile === 'object'
                        ? getMediaUrl(props.content[2]?.backgroundImageMobile?.url).toString()
                        : undefined,
                    )})`
                  : `url(${getMediaUrl(
                      props.content && typeof props.content[2]?.backgroundImage === 'object'
                        ? getMediaUrl(props.content[2]?.backgroundImage?.url).toString()
                        : undefined,
                    )})`,
              }}
            >
              {/* <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[2]?.icon === 'object'
                    ? getMediaUrl(props.content[2]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              /> */}
              <div className={`${isMobile ? 'h-1/2' : ''}`}></div>
              <div className={`w-full ${isMobile ? 'h-1/2' : ''}`}>
                <div
                  className={`${isMobile ? 'w-full' : 'w-1/2'}`}
                  style={{
                    color: 'white',
                    marginBottom: '16px',
                    fontSize: '2rem',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '500',
                  }}
                >
                  {props.content ? props.content[2]?.title : ''}
                </div>
                <div
                  className={`${isMobile ? 'w-full' : 'w-1/2'}`}
                  style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                  }}
                >
                  {props.content ? props.content[2]?.description : ''}
                </div>
              </div>
            </div>
            <div
              className={`${isMobile ? 'w-full' : 'w-1/2'}`}
              style={{
                minHeight: isMobile ? '570px' : '300px',
                height: isMobile ? '570px' : '',
                backgroundColor: 'black',
                padding: '24px',
                borderRadius: '20px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: isMobile
                  ? `url(${getMediaUrl(
                      props.content && typeof props.content[3]?.backgroundImageMobile === 'object'
                        ? getMediaUrl(props.content[3]?.backgroundImageMobile?.url).toString()
                        : undefined,
                    )})`
                  : `url(${getMediaUrl(
                      props.content && typeof props.content[3]?.backgroundImage === 'object'
                        ? getMediaUrl(props.content[3]?.backgroundImage?.url).toString()
                        : undefined,
                    )})`,
              }}
            >
              {/* <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[3]?.icon === 'object'
                    ? getMediaUrl(props.content[3]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              /> */}
              <div className={`${isMobile ? 'h-1/2' : ''}`}></div>
              <div className={`w-full ${isMobile ? 'h-1/2' : ''}`}>
                <div
                  className={`${isMobile ? 'w-full' : 'w-1/2'}`}
                  style={{
                    color: 'white',
                    marginBottom: '16px',
                    fontSize: '2rem',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '500',
                  }}
                >
                  {props.content ? props.content[3]?.title : ''}
                </div>
                <div
                  className={`${isMobile ? 'w-full' : 'w-1/3'}`}
                  style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                  }}
                >
                  {props.content ? props.content[3]?.description : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

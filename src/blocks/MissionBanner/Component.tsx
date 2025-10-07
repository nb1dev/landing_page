'use client'
/* eslint-disable @next/next/no-img-element */
import type { MissionBannerBlock as MissionBannerBlockProps } from 'src/payload-types'
import React, { useEffect, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'
// import { BlocksField } from '@payloadcms/ui'

export const MissionBannerBlock: React.FC<MissionBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const [locationUrl, setLocationUrl] = useState('/')

  useEffect(() => {
    const loc = window.location.pathname
    setLocationUrl(loc)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        paddingBottom: '20px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        backgroundColor: '#1D1D1D',
      }}
    >
      <div
        className="flex flex-row w-full"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '24px' : locationUrl === '/' ? '80px' : '80px',
        }}
      >
        {/* <div className="flex w-1/2">
          <div className="flex w-full gap-2">
            <div className="flex w-2/3 gap-2 flex-col">
              <div className="flex flex-row w-full">
                <img
                  style={{ width: '100%' }}
                  src={
                    props.images && typeof props.images[0]?.image === 'object'
                      ? getMediaUrl(props.images[0]?.image.url).toString()
                      : undefined
                  }
                  alt="icon"
                />
              </div>
              <div className="flex flex-row gap-2 w-full">
                <div className="flex w-2/3">
                  <img
                    style={{ width: '100%' }}
                    src={
                      props.images && typeof props.images[1]?.image === 'object'
                        ? getMediaUrl(props.images[1]?.image.url).toString()
                        : undefined
                    }
                    alt="icon"
                  />
                </div>
                <div className="flex w-1/3">
                  <img
                    style={{ width: '100%' }}
                    src={
                      props.images && typeof props.images[2]?.image === 'object'
                        ? getMediaUrl(props.images[2]?.image.url).toString()
                        : undefined
                    }
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-1/3 gap-2 flex-col">
              <div className="flex flex-col gap-2 h-full">
                <div className="flex h-1/3">
                  <img
                    style={{ width: '100%' }}
                    src={
                      props.images && typeof props.images[3]?.image === 'object'
                        ? getMediaUrl(props.images[3]?.image.url).toString()
                        : undefined
                    }
                    alt="icon"
                  />
                </div>
                <div className="flex h-2/3">
                  <img
                    style={{ width: '100%' }}
                    src={
                      props.images && typeof props.images[4]?.image === 'object'
                        ? getMediaUrl(props.images[4]?.image.url).toString()
                        : undefined
                    }
                    alt="icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {isMobile && (
          <div
            style={{
              fontSize: isMobile ? '2.375rem' : '4.3rem',
              marginBottom: '16px',
              width: isMobile ? '50%' : '100%',
            }}
          >
            <RichText data={props.heading} />
          </div>
        )}
        <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'}`}>
          <img
            style={{ width: isMobile ? '75%' : '100%', marginBottom: '5px', maxHeight: '384px' }}
            src={
              props.images && typeof props.images[0]?.image === 'object'
                ? getMediaUrl(props.images[0]?.image.url).toString()
                : undefined
            }
            alt="icon"
          />
        </div>
        <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'} flex-col`}>
          {!isMobile && (
            <div
              style={{
                fontSize: isMobile ? '2.375rem' : '4.3rem',
                marginBottom: '16px',
                fontFamily: 'Instrument Sans',
                fontWeight: '500',
              }}
            >
              <RichText data={props.heading} />
            </div>
          )}

          <div
            style={{
              marginBottom: '16px',
              fontSize: '1.125rem',
              fontFamily: 'Inter',
              fontWeight: '400',
            }}
          >
            <RichText data={props.description} />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <img
              style={{ marginBottom: '16px', maxHeight: '384px' }}
              src={
                typeof props.logo === 'object' ? getMediaUrl(props.logo.url).toString() : undefined
              }
              alt="icon"
            />
            <div
              style={{
                color: '#8b8a8a',
                fontSize: '0.875rem',
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
  )
}

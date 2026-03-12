/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { BoxCardBlock as BoxCardBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'

export const BoxCardBlock: React.FC<BoxCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '0 20px 20px' : '', backgroundColor: 'white' }}
    >
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
          <div
            style={{
              fontFamily: 'Instrument Sans',
              fontWeight: '500',
              fontStyle: 'Medium',
              fontSize: isMobile ? '40px' : '64px',
              lineHeight: isMobile ? '44px' : '70px',
              marginBottom: isMobile ? '24px' : '4px',
            }}
          >
            <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
          </div>
          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: '400',
              fontStyle: 'Regular',
              fontSize: isMobile ? '14px' : '20px',
              lineHeight: isMobile ? '24px' : '32px',
              color: 'rgba(0, 0, 0, 1)',
            }}
          >
            <RichText data={props?.description as any} enableGutter={false} enableProse={false} />
          </div>
          <div className="flex flex-col" style={{ marginTop: '38px', marginBottom: '38px' }}>
            {props.itemsList?.map((item, index) => {
              return (
                <div key={index} className="flex flex-row">
                  <div style={{ marginRight: '10px' }}>
                    <img
                      src={
                        typeof item.icon === 'object'
                          ? getMediaUrl(item.icon?.url).toString()
                          : undefined
                      }
                      style={{
                        height: isMobile ? '35px' : '50px',
                        width: isMobile ? '35px' : '50px',
                      }}
                      alt="icon"
                    />
                  </div>
                  <div className="flex mt-auto mb-auto">
                    <div
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        fontStyle: 'Regular',
                        fontSize: isMobile ? '14px' : '20px',
                        lineHeight: isMobile ? '24px' : '32px',
                        color: 'rgba(0, 0, 0, 1)',
                      }}
                    >
                      {item.textLabel}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {isMobile && (
            <div className="flex mt-auto mb-auto">
              <div className="w-full" style={{}}>
                <img
                  src={
                    isMobile
                      ? typeof props.boxImage?.mobile === 'object'
                        ? getMediaUrl(props.boxImage?.mobile?.url).toString()
                        : undefined
                      : typeof props.boxImage?.web === 'object'
                        ? getMediaUrl(props.boxImage?.web?.url).toString()
                        : undefined
                  }
                  alt="img"
                />
              </div>
            </div>
          )}
          <div className={`${isMobile ? 'mr-auto ml-auto' : ''}`}>
            <button
              style={{
                borderRadius: '100px',
                color: 'white',
                backgroundColor: 'black',
                height: '60px',
                fontFamily: 'Instrument Sans',
                fontWeight: '500',
                fontSize: isMobile ? '14px' : '20px',
                paddingRight: '30px',
                paddingLeft: '30px',
                marginBottom: '12px',
              }}
            >
              {props.button?.label}
            </button>
          </div>
          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: '400',
              fontStyle: 'Regular',
              fontSize: isMobile ? '13px' : '16px',
              lineHeight: '24px',
              color: 'rgba(0, 0, 0, 1)',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {props.note}
          </div>
        </div>
        {!isMobile && (
          <div className="flex mt-auto mb-auto">
            <div className="w-full" style={{}}>
              <img
                src={
                  isMobile
                    ? typeof props.boxImage?.mobile === 'object'
                      ? getMediaUrl(props.boxImage?.mobile?.url).toString()
                      : undefined
                    : typeof props.boxImage?.web === 'object'
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

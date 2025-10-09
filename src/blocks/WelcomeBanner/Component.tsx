'use client'
/* eslint-disable @next/next/no-img-element */
import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from 'src/payload-types'
import React, { useEffect, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'
import { CarouselBanner } from './CarouselBanner'
import 'flag-icons/css/flag-icons.min.css'
// import { useLocation } from 'react-router'
// import { BlocksField } from '@payloadcms/ui'

export const WelcomeBannerBlock: React.FC<WelcomeBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const [locationUrl, setLocationUrl] = useState('/')

  useEffect(() => {
    const loc = window.location.pathname
    setLocationUrl(loc)
  }, [])

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '20px' : '' }}
    >
      <div className="flex flex-row mb-6 ml-auto w-full">
        <div className="flex ml-auto">
          <div
            className="p-2"
            style={{
              backgroundColor: locationUrl === '/' ? 'white' : 'black',
              color: locationUrl === '/' ? 'black' : 'white',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push('/')
            }}
          >
            <span style={{ border: '1px solid white' }} className="fi fi-gb"></span>
          </div>
          <div
            className="p-2"
            style={{
              backgroundColor: locationUrl === '/de' ? 'white' : 'black',
              color: locationUrl === '/de' ? 'black' : 'white',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push('/de')
            }}
          >
            <span style={{ border: '1px solid white' }} className="fi fi-de"></span>
          </div>
        </div>
      </div>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row gap-2'}`}
        style={{
          width: '100%',
          minHeight: isMobile ? (locationUrl === '/de' ? '673px' : '620px') : '640px',
          backgroundColor: 'white',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          position: 'relative',
          overflowY: 'hidden',
          overflowX: 'hidden',
          backgroundImage: isMobile
            ? `url(${getMediaUrl(typeof props?.backgroundImageMobile === 'object' ? props.backgroundImageMobile.url : '')})`
            : `url(${getMediaUrl(typeof props?.backgroundImage === 'object' ? props.backgroundImage.url : '')})`,
        }}
      >
        <div
          className={`${isMobile ? 'w-full ' : 'w-1/2'}`}
          style={{
            paddingTop: isMobile ? '37px' : '100px',
            paddingLeft: isMobile ? '37px' : '87px',
            paddingRight: isMobile ? '37px' : '',
          }}
        >
          <div className={`${isMobile ? '' : 'mb-16'}`}>
            <img
              // style={{ width: '1000px' }}
              src={
                typeof props.logo === 'object' ? getMediaUrl(props.logo.url).toString() : undefined
              }
              alt="icon"
            />
          </div>
          <div className={`flex w-full gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <div className={`flex ${isMobile ? 'w-full' : ''} flex-col gap-8`}>
              <div className={`${isMobile ? 'mb-4 pt-4 mt-8' : 'mb-16 '}`}>
                <div
                  style={{
                    fontSize: isMobile ? '38px' : '70px',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '500',
                    lineHeight: isMobile ? '42px' : '74px',
                    marginBottom: '24px',
                    width: isMobile ? '85%' : '100%',
                  }}
                  className="mb-6"
                >
                  <RichText data={props.heading} />
                </div>
                <div
                  style={{
                    fontSize: isMobile ? '20px' : '24px',
                    color: '#292929',
                    fontWeight: '400',
                    fontFamily: 'Inter',
                    lineHeight: isMobile ? '26px' : '34px',
                    width: isMobile ? '85%' : '100%',
                  }}
                >
                  {props.description}
                </div>
              </div>
              {/* <div className={`flex flex-row gap-2 ${isMobile ? 'mt-4' : 'mt-16'}`}>
                  <div
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      borderRadius: '20px',
                      border: '1px solid black',
                    }}
                  >
                    <Button className="p-3">
                      <p>{props.access_button.label}</p>
                    </Button>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '20px',
                      border: '1px solid black',
                    }}
                  >
                    <Button className="p-3">
                      <p>{props.details_button.label}</p>
                    </Button>
                  </div>
                </div> */}
            </div>
            {/* <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'}`}>
                <img
                  src={
                    typeof props.boxImage === 'object'
                      ? getMediaUrl(props.boxImage.url).toString()
                      : undefined
                  }
                  alt="icon"
                />
              </div> */}
          </div>
        </div>

        <div
          className={`${isMobile ? 'w-full' : 'w-1/2 ml-auto'}`}
          style={{ marginTop: isMobile ? '' : '' }}
        >
          {!isMobile && (
            <div className="w-full">
              <div
                className="ml-auto"
                style={{
                  width: 'fit-content',
                  marginRight: '22px',
                  marginTop: '22px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  lineHeight: '34px',
                  color: '#646464',
                }}
              >
                {props.copyrightText}
              </div>
            </div>
          )}

          <div style={{ marginTop: isMobile ? '' : '206px' }}>
            <CarouselBanner {...props} />
          </div>
        </div>
      </div>
      <div
        className={`${isMobile ? 'w-full' : 'w-1/2'}`}
        style={{
          fontSize: isMobile ? '15px' : '18px',
          marginTop: isMobile ? '32px' : '80px',
          // marginBottom: '32px',
          color: '#a6a6a6',
          fontFamily: 'Inter',
          fontWeight: '400',
          lineHeight: isMobile ? '22px' : '30px',
        }}
      >
        {props.lineText}
      </div>
    </div>
  )
}

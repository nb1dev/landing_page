'use client'
/* eslint-disable @next/next/no-img-element */
import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from 'src/payload-types'
import React, { useEffect, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'
import { useLocation } from 'react-router'
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
    <>
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
            EN
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
            DE
          </div>
        </div>
      </div>
      <div
        className="flex flex-col"
        style={{
          width: '100%',
          minHeight: isMobile ? '755px' : '640px',
          backgroundColor: 'white',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          backgroundImage: isMobile
            ? `url(${getMediaUrl(typeof props?.backgroundImageMobile === 'object' ? props.backgroundImageMobile.url : '')})`
            : `url(${getMediaUrl(typeof props?.backgroundImage === 'object' ? props.backgroundImage.url : '')})`,
        }}
      >
        <div className="p-16">
          <div className={`${isMobile ? 'mb-4' : 'mb-16'}`}>
            <img
              // style={{ width: '1000px' }}
              src={
                typeof props.logo === 'object' ? getMediaUrl(props.logo.url).toString() : undefined
              }
              alt="icon"
            />
          </div>
          <div className={`flex w-full gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'} flex-col gap-8`}>
              <div className={`${isMobile ? 'mb-4 pt-4 mt-8' : 'mb-16 '}`}>
                <div
                  style={{
                    fontSize: isMobile ? '2.375rem' : '4.3rem',
                    fontFamily: 'Instrument Sans',
                    fontWeight: '500',
                  }}
                  className="mb-6"
                >
                  <RichText data={props.heading} />
                </div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    color: '#292929',
                    fontWeight: '400',
                    fontFamily: 'Inter',
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
      </div>
    </>
  )
}

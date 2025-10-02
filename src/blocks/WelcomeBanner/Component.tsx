'use client'
/* eslint-disable @next/next/no-img-element */
import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Button } from '@payloadcms/ui'
import RichText from '@/components/RichText'
// import { BlocksField } from '@payloadcms/ui'

export const WelcomeBannerBlock: React.FC<WelcomeBannerBlockProps> = (props) => {
  return (
    <div
      className="flex flex-col"
      style={{
        height: '680px',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        backgroundImage: `url(${getMediaUrl(typeof props?.backgroundImage === 'object' ? props.backgroundImage.url : '')})`,
      }}
    >
      <div className="p-16">
        <div className="mb-16">
          <img
            // style={{ width: '1000px' }}
            src={
              typeof props.logo === 'object' ? getMediaUrl(props.logo.url).toString() : undefined
            }
            alt="icon"
          />
        </div>
        <div className="flex w-full gap-8">
          <div className="flex w-1/2 flex-col gap-8">
            <div className="mb-16">
              <div style={{ fontSize: '3rem', width: '75%' }} className="mb-6">
                <RichText data={props.heading} />
              </div>
              <div style={{ fontSize: '1.2rem' }}>{props.description}</div>
            </div>
            <div className="flex flex-row gap-2 mt-16">
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
            </div>
          </div>
          <div className="flex w-1/2">
            <img
              src={
                typeof props.boxImage === 'object'
                  ? getMediaUrl(props.boxImage.url).toString()
                  : undefined
              }
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

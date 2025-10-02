/* eslint-disable @next/next/no-img-element */
import type { DetailsBannerBlock as DetailsBannerBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import RichText from '@/components/RichText'
// import { BlocksField } from '@payloadcms/ui'

export const DetailsBannerBlock: React.FC<DetailsBannerBlockProps> = (props) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        backgroundColor: '#1D1D1D',
      }}
    >
      <div>
        <div>
          <div style={{ fontSize: '3rem', width: '75%' }}>
            <RichText data={props.heading} />
          </div>
        </div>
        <div>
          <div className="flex w-full gap-4 mb-4 flex-row">
            <div
              className="w-1/2"
              style={{ backgroundColor: 'black', padding: '24px', borderRadius: '20px' }}
            >
              <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[0]?.icon === 'object'
                    ? getMediaUrl(props.content[0]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              />
              <div style={{ color: '#e7e7e7', marginBottom: '16px' }}>
                {props.content ? props.content[0]?.title : ''}
              </div>
              <div style={{ color: '#8B8A8A' }}>
                {props.content ? props.content[0]?.description : ''}
              </div>
            </div>
            <div
              className="w-1/2"
              style={{ backgroundColor: 'black', padding: '24px', borderRadius: '20px' }}
            >
              <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[1]?.icon === 'object'
                    ? getMediaUrl(props.content[1]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              />
              <div style={{ color: '#e7e7e7', marginBottom: '16px' }}>
                {props.content ? props.content[1]?.title : ''}
              </div>
              <div style={{ color: '#8B8A8A' }}>
                {props.content ? props.content[1]?.description : ''}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4 flex-row">
            <div
              className="w-1/2"
              style={{ backgroundColor: 'black', padding: '24px', borderRadius: '20px' }}
            >
              <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[2]?.icon === 'object'
                    ? getMediaUrl(props.content[2]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              />
              <div style={{ color: '#e7e7e7', marginBottom: '16px' }}>
                {props.content ? props.content[2]?.title : ''}
              </div>
              <div style={{ color: '#8B8A8A' }}>
                {props.content ? props.content[2]?.description : ''}
              </div>
            </div>
            <div
              className="w-1/2"
              style={{ backgroundColor: 'black', padding: '24px', borderRadius: '20px' }}
            >
              <img
                style={{ marginBottom: '16px' }}
                src={
                  props.content && typeof props.content[3]?.icon === 'object'
                    ? getMediaUrl(props.content[3]?.icon.url).toString()
                    : undefined
                }
                alt="icon"
              />
              <div style={{ color: '#e7e7e7', marginBottom: '16px' }}>
                {props.content ? props.content[3]?.title : ''}
              </div>
              <div style={{ color: '#8B8A8A' }}>
                {props.content ? props.content[3]?.description : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

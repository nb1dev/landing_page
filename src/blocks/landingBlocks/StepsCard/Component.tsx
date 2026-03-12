/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { StepsCardBlock as StepsCardBlockProps } from 'src/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'

export const StepsCardBlock: React.FC<StepsCardBlockProps> = (props) => {
  const isMobile = useIsMobile()

  return (
    <div
      className={`${!isMobile ? 'mr-10 ml-10 mt-5 mb-5' : 'mr-[20px] ml-[20px]'}`}
      style={{
        padding: isMobile ? '24px 0 24px 0' : '40px 0 40px 0',
        borderRadius: '20px',
        backgroundColor: 'rgba(29, 29, 29, 1)',
      }}
    >
      <div
        style={{
          fontFamily: 'Instrument Sans',
          fontWeight: 500,
          fontStyle: 'Medium',
          fontSize: isMobile ? '30px' : '64px',
          lineHeight: isMobile ? '36px' : '74px',
          letterSpacing: '-3%',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
      </div>
      <div
        style={{
          padding: '2px',
          width: '',
          backgroundColor: 'rgba(0, 194, 224, 1)',
          marginBottom: '18px',
        }}
      ></div>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}
        style={{
          gap: isMobile ? '24px' : '40px',
          padding: isMobile ? '0 12px' : '0 40px',
        }}
      >
        {props?.steps?.map((step, index) => (
          <div
            key={index}
            className="flex flex-col"
            style={{ gap: '24px', width: isMobile ? '100%' : 'calc(100% / 4)' }}
          >
            <div
              className={`flex ${isMobile ? 'justify-between' : 'flex-col'}`}
              style={{ gap: isMobile ? '' : '24px' }}
            >
              <div
                className="flex flex-row"
                style={{ gap: '13px', height: isMobile ? '' : '90px' }}
              >
                <img
                  src={getMediaUrl(
                    typeof step?.stepNumber === 'object' ? step.stepNumber?.url : '',
                  )}
                  alt={`Step ${index + 1} Icon`}
                  style={{ width: '48px', height: '48px' }}
                />
                <div
                  style={{
                    fontFamily: 'Instrument Sans',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: isMobile ? '20px' : '24px',
                    lineHeight: '100%',
                    letterSpacing: '-3%',
                    color: 'rgba(0, 194, 224, 1)',
                    width: isMobile ? '' : 'calc(100% - 120px)',
                  }}
                >
                  {step?.stepTitle}
                </div>
              </div>
              <div
                className={`flex ${!isMobile ? 'mr-auto ml-auto' : ''}`}
                style={{ height: isMobile ? '' : '120px' }}
              >
                <img
                  src={getMediaUrl(typeof step?.icon === 'object' ? step.icon?.url : '')}
                  alt={`Step ${index + 1} Icon`}
                  style={{
                    width: isMobile ? '44px' : '100px',
                    height: isMobile ? '50px' : '100px',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontStyle: 'Light',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                color: 'rgba(244, 244, 244, 1)',
              }}
            >
              <RichText
                data={step?.stepDescription as any}
                enableGutter={false}
                enableProse={false}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'justify-between'}`}
        style={{
          gap: isMobile ? '' : 'auto',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          marginTop: '40px',
          padding: isMobile ? '0 12px' : '0 40px',
        }}
      >
        <div
          className="flex mt-auto mb-auto"
          style={{
            fontFamily: 'Instrument Sans',
            fontWeight: 400,
            fontStyle: 'Regular',
            fontSize: isMobile ? '14px' : '24px',
            lineHeight: '100%',
            color: 'rgba(0, 194, 224, 1)',
            marginRight: isMobile ? 'auto' : '',
            marginLeft: isMobile ? 'auto' : '',
            marginTop: isMobile ? '12px' : '',
          }}
        >
          {props?.note}
        </div>
        <div
          className="flex mt-auto mb-auto"
          style={{
            backgroundColor: 'rgba(255, 249, 249, 1)',
            color: 'rgba(0, 0, 0, 1)',
            padding: '15px 30px',
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            fontStyle: 'Medium',
            fontSize: isMobile ? '16px' : '20px',
            letterSpacing: '0%',
            borderRadius: '100px',
            cursor: 'pointer',
            width: 'fit-content',
            marginRight: isMobile ? 'auto' : '',
            marginLeft: isMobile ? 'auto' : '',
          }}
        >
          {props?.button?.label}
        </div>
      </div>
    </div>
  )
}

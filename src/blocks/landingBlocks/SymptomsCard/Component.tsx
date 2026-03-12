/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { SymptomsCardBlock as SymptomsCardBlockProps } from 'src/payload-types'
import React, { useMemo, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const SymptomsCardBlock: React.FC<SymptomsCardBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const [showAllSymptoms, setShowAllSymptoms] = useState(false)

  const visibleCount = 12
  const symptoms = props?.symptoms || []

  const visibleSymptoms = useMemo(() => {
    if (showAllSymptoms) return symptoms
    return symptoms.slice(0, visibleCount)
  }, [showAllSymptoms, symptoms])

  const hasMoreSymptoms = symptoms.length > visibleCount

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '0 20px 20px' : undefined, backgroundColor: 'white' }}
    >
      <div
        className={`flex ${!isMobile ? 'flex-row' : 'flex-col'}`}
        style={{
          gap: '20px',
          alignItems: 'stretch', // important
        }}
      >
        {/* LEFT */}
        <div
          className="flex flex-col"
          style={{
            gap: '24px',
            minWidth: 0,
            width: '100%',
            flex: 1,
          }}
        >
          <div
            style={{
              fontFamily: 'Instrument Sans',
              fontWeight: 500,
              fontSize: isMobile ? '40px' : '64px',
              lineHeight: isMobile ? '44px' : '70px',
              letterSpacing: '-0.03em',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
          </div>

          <div className="flex flex-col" style={{ gap: '16px' }}>
            <div
              className="flex flex-wrap"
              style={{
                gap: '8px',
              }}
            >
              {visibleSymptoms.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 244, 221, 1)',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '30px',
                    color: 'rgba(36, 39, 43, 1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item?.symptom}
                </div>
              ))}
            </div>

            {!showAllSymptoms && hasMoreSymptoms && (
              <button
                type="button"
                onClick={() => setShowAllSymptoms(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(248, 248, 248, 1)',
                  border: 'none',
                  cursor: 'pointer',
                  width: 'fit-content',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '30px',
                  color: 'rgba(36, 39, 43, 1)',
                }}
              >
                {props?.moreButton || 'And more'}

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="rgba(36, 39, 43, 1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {isMobile && (
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                width: isMobile ? '100%' : '500px',
                minWidth: isMobile ? '100%' : '500px',
                alignSelf: 'stretch',
              }}
            >
              <img
                src={getMediaUrl(
                  typeof props.symptomsImage === 'object' ? props.symptomsImage?.url : '',
                )}
                alt="Symptoms Image"
                style={{
                  width: '100%',
                  height: '307px',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          <div
            className="flex flex-col"
            style={{
              padding: '0',
              backgroundColor: 'white',
              borderRadius: '16px',
              gap: '24px',
            }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-0.03em',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              {props?.description}
            </div>

            <div
              style={{
                padding: '15px 30px',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                color: 'rgba(255, 255, 255, 1)',
                borderRadius: '100px',
                fontFamily: 'Instrument Sans',
                fontWeight: 500,
                fontSize: isMobile ? '16px' : '20px',
                lineHeight: '30px',
                cursor: 'pointer',
                width: 'fit-content',
                textAlign: isMobile ? 'center' : 'left',
                marginLeft: isMobile ? 'auto' : '',
                marginRight: isMobile ? 'auto' : '',
              }}
            >
              {props?.testButton?.buttonText}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {!isMobile && (
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              width: isMobile ? '100%' : '500px',
              minWidth: isMobile ? '100%' : '500px',
              alignSelf: 'stretch',
            }}
          >
            <img
              src={getMediaUrl(
                typeof props.symptomsImage === 'object' ? props.symptomsImage?.url : '',
              )}
              alt="Symptoms Image"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

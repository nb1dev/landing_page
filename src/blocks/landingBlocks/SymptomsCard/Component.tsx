/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { SymptomsCardBlock as SymptomsCardBlockProps } from 'src/payload-types'
import React, { useMemo, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import '../landing-template.css'

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
    <div className="lc-wrapper">
      <div
        className={`flex ${!isMobile ? 'flex-row' : 'flex-col'}`}
        style={{ gap: '20px', alignItems: 'stretch' }}
      >
        {/* LEFT */}
        <div className="lc-col" style={{ gap: '24px' }}>
          <div className="lc-title lc-title--center-mobile">
            <RichText data={props?.title as any} enableGutter={false} enableProse={false} />
          </div>

          <div className="flex flex-col" style={{ gap: '16px' }}>
            <div className="lc-tags">
              {visibleSymptoms.map((item, index) => (
                <div key={index} className="lc-tag">
                  {item?.symptom}
                </div>
              ))}
            </div>

            {!showAllSymptoms && hasMoreSymptoms && (
              <button
                type="button"
                onClick={() => setShowAllSymptoms(true)}
                className="lc-tag lc-tag--more"
                style={{ width: 'fit-content' }}
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
            <div className="lc-panel">
              <img
                src={getMediaUrl(
                  typeof props.symptomsImage === 'object' ? props.symptomsImage?.url : '',
                )}
                alt="Symptoms Image"
                className="lc-panel__img lc-panel__img--fixed-h"
              />
            </div>
          )}

          <div className="flex flex-col" style={{ gap: '24px' }}>
            <div className="lc-description" style={{ letterSpacing: 0 }}>
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
            className="lc-col--panel"
            style={{ alignSelf: 'stretch' }}
          >
            <div className="lc-panel" style={{ height: '100%' }}>
              <img
                src={getMediaUrl(
                  typeof props.symptomsImage === 'object' ? props.symptomsImage?.url : '',
                )}
                alt="Symptoms Image"
                className="lc-panel__img"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

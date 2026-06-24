'use client'

import React, { useEffect, useRef, useState } from 'react'

type PlanConfig = {
  planKey?: string | null
  selectedLabel?: string | null
  switchLinkText?: string | null
  switchToPlanKey?: string | null
  ctaText?: string | null
  ctaHref?: string | null
  ctaVariant?: 'advanced' | 'core' | null
}

type Props = {
  defaultPlanKey?: string | null
  plans?: PlanConfig[] | null
}

export const PlanStickyBarClient: React.FC<Props> = ({ defaultPlanKey = 'advanced', plans }) => {
  const [activePlanKey, setActivePlanKey] = useState(defaultPlanKey ?? 'advanced')
  const [visible, setVisible] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onPlanSelected = (e: Event) => {
      const key = (e as CustomEvent<{ key: string }>).detail?.key
      if (key) setActivePlanKey(key)
    }
    window.addEventListener('nb1:planselected', onPlanSelected)
    return () => window.removeEventListener('nb1:planselected', onPlanSelected)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const showBar = (show: boolean) => {
      setVisible(show)
      document.body.classList.toggle('nb1-sticky-active', show)
    }

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      const isMobile = window.innerWidth <= 760
      const pastSentinel = (sentinel?.getBoundingClientRect().bottom ?? 0) < 0

      if (!pastSentinel) {
        showBar(false)
      } else if (isMobile && delta < 0) {
        showBar(false)
      } else {
        showBar(true)
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.body.classList.remove('nb1-sticky-active')
    }
  }, [])

  const plan = plans?.find(p => p.planKey === activePlanKey) ?? plans?.[0]
  if (!plan) return null

  const isAdvanced = (plan.ctaVariant ?? plan.planKey) === 'advanced'

  return (
    <>
      <div ref={sentinelRef} style={{ height: 0, pointerEvents: 'none' }} aria-hidden="true" />

      <div className={`nb1-psb${visible ? ' nb1-psb-show' : ''}`}>
        <style jsx>{`
          .nb1-psb {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 90;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 28px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(16px);
            border-top: 1px solid rgba(18, 49, 77, 0.1);
            transform: translateY(110%);
            transition: transform 0.4s cubic-bezier(0.16, 0.84, 0.44, 1);
            pointer-events: none;
          }
          .nb1-psb.nb1-psb-show {
            transform: translateY(0);
            pointer-events: auto;
          }
          .nb1-psb-left {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: #12314d;
          }
          .nb1-psb-label {
            font-weight: 600;
          }
          .nb1-psb-dot {
            color: rgba(18, 49, 77, 0.35);
          }
          .nb1-psb-switch {
            font-size: 13px;
            color: #0a8fb0;
            font-weight: 500;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            font-family: inherit;
          }
          .nb1-psb-switch:hover {
            opacity: 0.8;
          }
          .nb1-psb-cta {
            padding: 11px 24px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 14px;
            white-space: nowrap;
            text-decoration: none;
            transition: background 0.18s, border-color 0.18s, transform 0.18s;
          }
          .nb1-psb-cta:hover {
            transform: translateY(-1px);
          }
          .nb1-psb-cta.advanced {
            background: #c6ff5b;
            color: #0e2740;
          }
          .nb1-psb-cta.advanced:hover {
            background: #aaea42;
          }
          .nb1-psb-cta.core {
            background: transparent;
            color: #12314d;
            border: 1.5px solid rgba(18, 49, 77, 0.2);
          }
          .nb1-psb-cta.core:hover {
            border-color: #12314d;
          }
          @media (max-width: 560px) {
            .nb1-psb {
              padding: 11px 16px;
              gap: 10px;
            }
            .nb1-psb-cta {
              padding: 10px 16px;
              font-size: 13px;
            }
            .nb1-psb-left {
              font-size: 13px;
            }
          }
          @media (max-width: 400px) {
            .nb1-psb-label { display: none; }
            .nb1-psb-dot { display: none; }
          }
        `}</style>

        <div className="nb1-psb-left">
          {plan.selectedLabel && <span className="nb1-psb-label">{plan.selectedLabel}</span>}
          {plan.switchLinkText && plan.switchToPlanKey && (
            <>
              <span className="nb1-psb-dot">·</span>
              <button
                type="button"
                className="nb1-psb-switch"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('nb1:selectplan', { detail: { key: plan.switchToPlanKey } }))
                }}
              >
                {plan.switchLinkText}
              </button>
            </>
          )}
        </div>

        {plan.ctaText && plan.ctaHref && (
          <a
            href={plan.ctaHref}
            className={`nb1-psb-cta ${isAdvanced ? 'advanced' : 'core'}`}
          >
            {plan.ctaText}
          </a>
        )}
      </div>
    </>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getStoredPlanSelection, PLAN_SELECTION_EVENT } from '@/lib/plans/selectionStore'

type Props = {
  logo?: { url?: string | null; alt?: string | null } | number | null
  logoUrl?: string | null
  activeStep?: string | null
  step1Label?: string | null
  step1Url?: string | null
  step2Label?: string | null
  step2Url?: string | null
  step3Label?: string | null
  step3Url?: string | null
  backLabel?: string | null
  backUrl?: string | null
  locale?: string
}

export const OrderStepNavComponent: React.FC<Props> = ({
  logo,
  logoUrl = '/',
  activeStep = '1',
  step1Label = 'Plan',
  step1Url,
  step2Label = 'Duration',
  step2Url,
  step3Label = 'Checkout',
  step3Url,
  backLabel = '← Back',
  backUrl,
}) => {
  const logoMedia = typeof logo === 'object' && logo !== null ? logo : null
  const active = Number(activeStep === 'done' ? 4 : activeStep)

  const pathname = usePathname() || ''
  // On family-agnostic pages (e.g. order-details) the pathname reveals no
  // variant — fall back to the visitor's stored selection so "Plan"/"Duration"
  // links go back to the family they actually picked, not urls[0] (core).
  // Read post-mount to keep SSR markup and hydration identical.
  const [storedPlan, setStoredPlan] = useState<string | null>(null)
  useEffect(() => {
    const sync = () => setStoredPlan(getStoredPlanSelection().plan ?? null)
    sync()
    // Blocks on the same page (e.g. the checkout form, plan selector) may write
    // the selection AFTER this nav mounts — stay in sync via the store event.
    window.addEventListener(PLAN_SELECTION_EVENT, sync)
    return () => window.removeEventListener(PLAN_SELECTION_EVENT, sync)
  }, [])
  const variant = pathname.includes('advanced')
    ? 'advanced'
    : pathname.includes('core')
      ? 'core'
      : storedPlan

  function resolveUrl(raw?: string | null) {
    if (!raw) return raw
    const urls = raw.split(',').map((u) => u.trim()).filter(Boolean)
    if (urls.length <= 1) return urls[0] ?? raw
    const match = urls.find((u) => (variant ? u.toLowerCase().includes(variant) : false))
    return match || urls[0]
  }

  const resolvedStep1Url = resolveUrl(step1Url)
  const resolvedStep2Url = resolveUrl(step2Url)

  function stepClass(n: number) {
    if (activeStep === 'done') return 'osn-step done'
    if (n < active) return 'osn-step done'
    if (n === active) return 'osn-step active'
    return 'osn-step'
  }

  const steps = [
    { n: 1, label: step1Label, url: resolvedStep1Url },
    { n: 2, label: step2Label, url: resolvedStep2Url },
    { n: 3, label: step3Label, url: step3Url },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <nav className="osn-nav" aria-label="Order steps">
        <div className="osn-in">
          <Link href={logoUrl || '/'} className="osn-logo" aria-label="NB1">
            {logoMedia?.url && (
              <img src={logoMedia.url} alt={logoMedia.alt || 'Logo'} />
            )}
          </Link>

          <div className="osn-steps" aria-label="Progress">
            {steps.map((s, i) => {
              const cls = stepClass(s.n)
              const isClickable = !!s.url && cls.includes('done')
              const inner = (
                <>
                  <span className="osn-n">{s.n}</span>
                  <span className="osn-lbl">{s.label}</span>
                </>
              )
              return (
                <React.Fragment key={s.n}>
                  {i > 0 && <div className="osn-sep" aria-hidden="true" />}
                  {isClickable ? (
                    <Link
                      href={s.url!}
                      className={`${cls} osn-step-link`}
                      aria-current={cls.includes('active') ? 'step' : undefined}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls} aria-current={cls.includes('active') ? 'step' : undefined}>
                      {inner}
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {backUrl ? (
            <Link href={backUrl} className="osn-back">
              {backLabel}
            </Link>
          ) : (
            <span className="osn-back osn-back--empty" aria-hidden="true" />
          )}
        </div>
      </nav>
    </>
  )
}

const CSS = `
  .osn-nav {
    position: sticky; top: 0; z-index: 80;
    background: rgba(255,255,255,.9);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom: 1px solid rgba(18,49,77,.07);
  }
  .osn-in {
    max-width: 980px; margin: 0 auto; padding: 0 28px;
    height: 64px; display: flex; align-items: center;
    justify-content: space-between; gap: 20px;
  }
  .osn-logo img { height: 22px; display: block; }
  .osn-steps { display: flex; align-items: center; }
  .osn-step {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: rgba(18,49,77,.40);
    text-decoration: none;
  }
  .osn-step-link { cursor: pointer; transition: color .15s; }
  .osn-step-link:hover { color: #12314D; }
  .osn-step-link:hover .osn-n { background: #12314D; border-color: #12314D; color: #fff; }
  .osn-n {
    width: 22px; height: 22px; border-radius: 50%;
    border: 1.5px solid rgba(18,49,77,.10);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600; flex-shrink: 0;
    transition: background .15s, border-color .15s, color .15s;
  }
  .osn-step.active { color: #12314D; font-weight: 600; }
  .osn-step.active .osn-n { background: #0A8FB0; border-color: #0A8FB0; color: #fff; }
  .osn-step.done .osn-n { background: #12314D; border-color: #12314D; color: #fff; }
  .osn-sep { width: 28px; height: 1px; background: rgba(18,49,77,.10); margin: 0 14px; flex-shrink: 0; }
  .osn-back { font-size: 13px; color: rgba(18,49,77,.55); font-weight: 500; text-decoration: none; white-space: nowrap; }
  .osn-back:hover { color: #12314D; }
  .osn-back--empty { min-width: 60px; }
  @media (max-width: 560px) {
    .osn-in { padding: 0 16px; }
    .osn-steps { gap: 7px; }
    .osn-step { font-size: 0; gap: 0; }
    .osn-n { width: 21px; height: 21px; font-size: 10px; }
    .osn-sep { width: 12px; margin: 0 3px; }
    .osn-back { font-size: 12px; }
  }
`

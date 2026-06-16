'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createAccountAndSave } from '@/lib/createAccount'

/* ─── Data ──────────────────────────────────────────────────────────── */

const PLAN_DATA: Record<string, Record<string, { label: string; rate: string; billing: string }>> = {
  core: {
    '4':       { label: '4 months',         rate: '€99',  billing: 'Billed monthly' },
    '8':       { label: '8 months',         rate: '€94',  billing: 'Billed monthly' },
    '12':      { label: '12 months',        rate: '€89',  billing: 'Billed monthly' },
    'monthly': { label: 'Flexible monthly', rate: '€109', billing: 'Cancel anytime' },
  },
  advanced: {
    '4':  { label: '4 months',  rate: '€149', billing: 'Billed monthly' },
    '8':  { label: '8 months',  rate: '€141', billing: 'Billed monthly' },
    '12': { label: '12 months', rate: '€134', billing: 'Billed monthly' },
  },
}

const PROMO_CODES: Record<string, string> = {
  WELCOME10:      '10% off your first cycle',
  NB1:            '15% off your first cycle',
  HYROX:          '20% off your first cycle',
  FREEMONTH:      'First month free',
  FIRSTMONTHFREE: 'First month free',
}

const COUNTRIES = ['Germany', 'Austria', 'Netherlands', 'Belgium', 'France', 'Luxembourg', 'Ireland']

/* ─── Types ─────────────────────────────────────────────────────────── */

type PayMethod = 'card' | 'paypal' | 'klarna' | 'sepa'

type Props = { backHref?: string | null }

/* ─── Inner component (needs useSearchParams inside Suspense) ────────── */

function CheckoutFormInner({ backHref }: Props) {
  const searchParams = useSearchParams()
  const planKey  = searchParams?.get('plan')  ?? 'core'
  const cycleKey = searchParams?.get('cycle') ?? '4'

  const planInfo   = PLAN_DATA[planKey]?.[cycleKey] ?? PLAN_DATA.core['4']
  const planLabel  = planKey === 'advanced' ? 'Advanced' : 'Core'
  const defaultBack = planKey === 'advanced' ? '/order-cycle-advanced' : '/order-cycle-core'
  const backLink   = backHref || defaultBack

  /* accordion */
  const [step, setStep]           = useState(1)
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set())
  const [confirmed, setConfirmed] = useState(false)

  /* step 1 */
  const [email, setEmail]     = useState('')
  const [emailErr, setEmailErr] = useState('')

  /* step 2 */
  const [fn, setFn]       = useState('')
  const [ln, setLn]       = useState('')
  const [country, setCountry] = useState('Germany')
  const [a1, setA1]       = useState('')
  const [a2, setA2]       = useState('')
  const [zip, setZip]     = useState('')
  const [city, setCity]   = useState('')
  const [phone, setPhone] = useState('')
  const [addrErr, setAddrErr] = useState<Record<string, string>>({})

  /* step 3 */
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard')

  /* step 4 */
  const [payMethod,   setPayMethod]   = useState<PayMethod>('card')
  const [cardNo,      setCardNo]      = useState('')
  const [exp,         setExp]         = useState('')
  const [cvc,         setCvc]         = useState('')
  const [cardName,    setCardName]    = useState('')
  const [iban,        setIban]        = useState('')
  const [ibanName,    setIbanName]    = useState('')
  const [billingSame, setBillingSame] = useState(true)
  const [payErr,      setPayErr]      = useState<Record<string, string>>({})

  /* account creation */
  const [accountStatus, setAccountStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [accountErr,    setAccountErr]    = useState('')

  /* promo */
  const [promoInput,   setPromoInput]   = useState('')
  const [promoApplied, setPromoApplied] = useState<string | null>(null)
  const [promoMsg,     setPromoMsg]     = useState<{ text: string; ok: boolean } | null>(null)
  const [promoOpen,    setPromoOpen]    = useState(false)

  /* ── helpers ── */
  const shippingLabel = shipping === 'express' ? 'Express · €9' : 'Standard · Free'

  function markDone(n: number) {
    setDoneSteps(s => new Set([...s, n]))
    setStep(n + 1)
  }

  function nextEmail() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr('Enter a valid email address.')
      return
    }
    setEmailErr('')
    markDone(1)
  }

  function nextAddr() {
    const e: Record<string, string> = {}
    if (!fn.trim()) e.fn = 'Required.'
    if (!ln.trim()) e.ln = 'Required.'
    if (!a1.trim()) e.a1 = 'Required.'
    if (!zip.trim()) e.zip = 'Required.'
    if (!city.trim()) e.city = 'Required.'
    setAddrErr(e)
    if (Object.keys(e).length) return
    markDone(2)
  }

  function nextShipping() { markDone(3) }

  async function nextPayment() {
    const e: Record<string, string> = {}
    if (payMethod === 'card') {
      if (cardNo.replace(/\s/g, '').length < 13) e.cardNo = 'Enter a valid card number.'
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(exp)) e.exp = 'MM / YY.'
      if (cvc.length < 3) e.cvc = '3–4 digits.'
      if (!cardName.trim()) e.cardName = 'Required.'
    }
    if (payMethod === 'sepa') {
      if (iban.replace(/\s/g, '').length < 15) e.iban = 'Enter a valid IBAN.'
      if (!ibanName.trim()) e.ibanName = 'Required.'
    }
    setPayErr(e)
    if (Object.keys(e).length) return

    setAccountStatus('sending')
    setAccountErr('')
    try {
      await createAccountAndSave(
        email,
        { firstName: fn, lastName: ln, phone },
        { firstName: fn, lastName: ln, email, phone, addressLine1: a1, addressLine2: a2, city, zip, country },
      )
      setAccountStatus('sent')
    } catch (err: unknown) {
      setAccountStatus('error')
      const code = (err as { code?: string })?.code
      if (code === 'auth/email-already-in-use') {
        setAccountErr('An account with this email already exists. Please sign in instead.')
      } else {
        setAccountErr('Could not create your account. Please try again.')
      }
      return
    }

    setConfirmed(true)
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setPromoApplied(code)
      setPromoMsg({ text: `✓ ${code} applied — ${PROMO_CODES[code]}.`, ok: true })
    } else {
      setPromoMsg({ text: "That code isn't valid.", ok: false })
    }
  }

  function removePromo() {
    setPromoApplied(null)
    setPromoInput('')
    setPromoMsg(null)
  }

  function fmtCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 ')
  }
  function fmtExp(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d
  }
  function fmtIban(v: string) {
    return v.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 34).replace(/(.{4})(?=.)/g, '$1 ')
  }

  const confirmLabel = payMethod === 'paypal' ? 'Continue with PayPal →'
    : payMethod === 'klarna' ? 'Continue with Klarna →'
    : 'Confirm — €0 due today'

  /* ── Confirmation screen ── */
  if (confirmed) {
    return (
      <div className="nb1-det-confirmed">
        <style jsx global>{`
          .nb1-det-confirmed {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 28px;
            text-align: center;
          }
          .nb1-det-check-circle {
            width: 72px; height: 72px;
            border-radius: 50%;
            background: #0a8fb0;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 28px;
          }
          .nb1-det-conf-h { font-family: 'Instrument Sans','Inter',sans-serif; font-weight: 600; font-size: clamp(26px,3vw,36px); letter-spacing: -0.02em; color: #12314d; margin-bottom: 14px; }
          .nb1-det-conf-p { font-size: 15px; color: rgba(18,49,77,0.7); line-height: 1.6; max-width: 480px; margin: 0 auto 32px; }
          .nb1-det-conf-btn { display: inline-block; background: #c6ff5b; color: #0e2740; font-weight: 700; font-size: 15px; padding: 16px 36px; border-radius: 100px; text-decoration: none; }
          .nb1-det-conf-btn:hover { background: #aaea42; }
        `}</style>
        <div className="nb1-det-check-circle">
          <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="nb1-det-conf-h">You&apos;re all set{fn ? `, ${fn}` : ''}.</h2>
        <p className="nb1-det-conf-p">
          Your kit is being prepared. We&apos;ve sent a sign-in link to <strong>{email}</strong> — click it to activate your account and access your dashboard. Nothing is charged until your formula enters manufacture.
        </p>
        <Link href="/" className="nb1-det-conf-btn">Go to my dashboard →</Link>
      </div>
    )
  }

  /* ── Main layout ── */
  return (
    <div className="nb1-det-wrap">
      <style jsx global>{`
        /* ── Layout ── */
        .nb1-det-wrap { max-width: 900px; margin: 0 auto; padding: 46px 28px 80px; }
        .nb1-det-hero { margin-bottom: 40px; }
        .nb1-det-hero h1 {
          font-family: 'Instrument Sans','Inter',sans-serif;
          font-weight: 600; font-size: clamp(28px,3.6vw,44px);
          letter-spacing: -0.03em; color: #12314d; margin: 0 0 10px;
        }
        .nb1-det-hero h1 span { color: #0a8fb0; }
        .nb1-det-hero p { font-size: 15px; color: rgba(18,49,77,0.65); line-height: 1.55; max-width: 520px; margin: 0; }
        .nb1-det-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 44px;
          align-items: start;
        }
        .nb1-det-left {}
        .nb1-det-right { position: sticky; top: 96px; }

/* ── Accordion ── */
        .nb1-acc { border: 1px solid rgba(18,49,77,0.1); border-radius: 14px; margin-bottom: 14px; overflow: hidden; background: #fff; transition: border-color 0.15s, box-shadow 0.15s; }
        .nb1-acc.open { border-color: #0a8fb0; box-shadow: 0 0 0 3px rgba(10,143,176,0.08); }
        .nb1-acc.locked { opacity: 0.55; pointer-events: none; }
        .nb1-acc-hd {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 24px; cursor: pointer; background: none; border: none; width: 100%; text-align: left;
        }
        .nb1-acc-num {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 600;
          border: 1.5px solid rgba(18,49,77,0.1); color: rgba(18,49,77,0.4);
          transition: all 0.15s;
        }
        .nb1-acc.open .nb1-acc-num { border-color: #0a8fb0; color: #0a8fb0; }
        .nb1-acc.done .nb1-acc-num { border-color: #0a8fb0; background: #0a8fb0; color: #fff; font-size: 0; }
        .nb1-acc.done .nb1-acc-num::after { content: '✓'; font-size: 13px; }
        .nb1-acc-title { font-family: 'Instrument Sans','Inter',sans-serif; font-weight: 600; font-size: 16.5px; color: #12314d; flex: 1; }
        .nb1-acc.locked .nb1-acc-title { color: rgba(18,49,77,0.4); }
        .nb1-acc-summary { font-size: 13px; color: rgba(18,49,77,0.55); margin-left: auto; }
        .nb1-acc-edit { font-size: 13px; font-weight: 600; color: #0a8fb0; margin-left: 12px; text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; }
        .nb1-acc-body { padding: 2px 24px 24px; display: none; }
        .nb1-acc.open .nb1-acc-body { display: block; }

        /* ── Form fields ── */
        .nb1-frow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .nb1-frow.full { grid-template-columns: 1fr; }
        .nb1-fg { display: flex; flex-direction: column; gap: 5px; }
        .nb1-fg label { font-size: 13px; font-weight: 600; color: rgba(18,49,77,0.7); }
        .nb1-fg input, .nb1-fg select {
          padding: 13px 15px; border-radius: 11px;
          border: 1.5px solid rgba(18,49,77,0.1); background: #fff;
          font-size: 15px; color: #12314d; outline: none; width: 100%;
          font-family: 'Inter',sans-serif;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .nb1-fg input:focus, .nb1-fg select:focus { border-color: #0a8fb0; box-shadow: 0 0 0 3px rgba(10,143,176,0.1); }
        .nb1-fg input.err { border-color: #c0392b; }
        .nb1-fg .nb1-err { font-size: 12px; color: #c0392b; }
        .nb1-fg .nb1-hint { font-size: 12.5px; color: rgba(18,49,77,0.5); }

        /* ── Next button ── */
        .nb1-acc-next {
          margin-top: 18px; height: 48px; padding: 0 32px;
          background: #c6ff5b; color: #0e2740; border: none; border-radius: 100px;
          font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.18s;
        }
        .nb1-acc-next:hover { background: #aaea42; }

        /* ── Shipping options ── */
        .nb1-ship-opts { display: flex; flex-direction: column; gap: 10px; }
        .nb1-ship-opt {
          display: flex; align-items: center; gap: 14px;
          border: 1.5px solid rgba(18,49,77,0.12); border-radius: 12px; padding: 16px 18px;
          cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .nb1-ship-opt.sel { border-color: #0a8fb0; box-shadow: 0 0 0 3px rgba(10,143,176,0.08); }
        .nb1-ship-radio {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(18,49,77,0.2);
          flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s;
        }
        .nb1-ship-opt.sel .nb1-ship-radio { border-color: #0a8fb0; }
        .nb1-ship-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #0a8fb0; display: none; }
        .nb1-ship-opt.sel .nb1-ship-radio-dot { display: block; }
        .nb1-ship-info { flex: 1; }
        .nb1-ship-name { font-size: 14px; font-weight: 600; color: #12314d; }
        .nb1-ship-sub  { font-size: 12.5px; color: rgba(18,49,77,0.55); }
        .nb1-ship-price { font-size: 14px; font-weight: 600; color: #12314d; }

        /* ── Payment methods ── */
        .nb1-wallet-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; }
        .nb1-wallet-btn {
          height: 48px; border-radius: 10px; border: 1.5px solid rgba(18,49,77,0.12);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity 0.15s;
        }
        .nb1-wallet-btn:hover { opacity: 0.85; }
        .nb1-wallet-apple { background: #000; color: #fff; border-color: #000; }
        .nb1-wallet-gpay  { background: #fff; color: #12314d; }
        .nb1-pay-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; color: rgba(18,49,77,0.4); font-size: 12.5px; }
        .nb1-pay-divider::before, .nb1-pay-divider::after { content: ''; flex: 1; height: 1px; background: rgba(18,49,77,0.1); }
        .nb1-pmlist { display: flex; flex-direction: column; gap: 10px; }
        .nb1-pm-row { border: 1.5px solid rgba(18,49,77,0.1); border-radius: 12px; overflow: hidden; transition: border-color 0.15s, box-shadow 0.15s; }
        .nb1-pm-row.active { border-color: #0a8fb0; box-shadow: 0 0 0 3px rgba(10,143,176,0.08); }
        .nb1-pm-hd {
          display: flex; align-items: center; gap: 12px; padding: 15px 18px;
          cursor: pointer; background: none; border: none; width: 100%; text-align: left;
          font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #12314d;
        }
        .nb1-pm-hd:hover { background: rgba(18,49,77,0.02); }
        .nb1-pm-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(18,49,77,0.2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s; }
        .nb1-pm-row.active .nb1-pm-radio { border-color: #0a8fb0; }
        .nb1-pm-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #0a8fb0; display: none; }
        .nb1-pm-row.active .nb1-pm-radio-dot { display: block; }
        .nb1-pm-icons { display: flex; gap: 5px; margin-left: auto; }
        .nb1-pm-body { padding: 0 18px 18px; display: none; }
        .nb1-pm-row.active .nb1-pm-body { display: block; }
        .nb1-pm-note { font-size: 13.5px; color: rgba(18,49,77,0.65); line-height: 1.55; padding: 4px 0 8px; }
        .nb1-klarna-badge { display: inline-block; background: #ffb3c7; color: #0e2740; font-style: italic; font-weight: 700; font-size: 12px; padding: 3px 9px; border-radius: 100px; }

        /* billing same */
        .nb1-billing-check { display: flex; align-items: center; gap: 10px; margin-top: 18px; cursor: pointer; font-size: 13.5px; color: rgba(18,49,77,0.7); }
        .nb1-billing-check input { width: 16px; height: 16px; accent-color: #0a8fb0; cursor: pointer; }
        .nb1-billing-addr { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }

        /* secure badge */
        .nb1-secure { display: flex; align-items: center; gap: 7px; margin-top: 16px; font-size: 12.5px; color: rgba(18,49,77,0.5); border: none; border-radius: 0; background: none; }

        /* promo in form */
        .nb1-promo-toggle { background: none; border: none; cursor: pointer; font-size: 13.5px; font-weight: 600; color: #0a8fb0; padding: 0; margin-top: 14px; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(10,143,176,0.3); }
        .nb1-promo-row { display: flex; gap: 8px; margin-top: 10px; }
        .nb1-promo-input { flex: 1; height: 40px; padding: 0 12px; border: 1.5px solid rgba(18,49,77,0.15); border-radius: 8px; font-size: 13.5px; color: #12314d; outline: none; text-transform: uppercase; font-family: 'Inter',sans-serif; }
        .nb1-promo-input:focus { border-color: #0a8fb0; }
        .nb1-promo-apply { height: 40px; padding: 0 16px; background: #12314d; color: #fff; border: none; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer; }
        .nb1-promo-apply:hover { background: #1a4068; }
        .nb1-promo-msg { font-size: 13px; margin-top: 6px; }
        .nb1-promo-msg.ok { color: #0a8fb0; font-weight: 600; }
        .nb1-promo-msg.err { color: #c0392b; }

        /* confirm button */
        .nb1-confirm-btn { display: block; width: 100%; height: 52px; background: #c6ff5b; color: #0e2740; border: none; border-radius: 100px; font-weight: 700; font-size: 15px; cursor: pointer; margin-top: 20px; transition: background 0.18s; }
        .nb1-confirm-btn:hover { background: #aaea42; }
        .nb1-confirm-legal { font-size: 11.5px; color: rgba(18,49,77,0.45); line-height: 1.55; margin-top: 12px; }
        .nb1-confirm-legal a { color: #0a8fb0; text-decoration: none; }

        /* ── What's next ── */
        .nb1-whats-next { background: #f1f4f7; border: 1px solid rgba(18,49,77,0.07); border-radius: 16px; padding: 22px 24px; margin-top: 40px; }
        .nb1-whats-next-h { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(18,49,77,0.45); margin-bottom: 14px; }
        .nb1-whats-next ol { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 10px; }
        .nb1-whats-next li { font-size: 13.5px; color: rgba(18,49,77,0.65); line-height: 1.5; }

        /* ── Sidebar ── */
        .nb1-sum { background: #fff; border: 1px solid rgba(18,49,77,0.1); border-radius: 16px; padding: 24px; }
        .nb1-sum-title { font-family: 'Instrument Sans','Inter',sans-serif; font-weight: 600; font-size: 15px; color: #12314d; margin-bottom: 18px; }
        .nb1-sum-rows { display: flex; flex-direction: column; gap: 0; }
        .nb1-sum-row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; border-bottom: 1px solid rgba(18,49,77,0.07); font-size: 13.5px; }
        .nb1-sum-row:last-of-type { border-bottom: none; }
        .nb1-sum-label { color: rgba(18,49,77,0.55); }
        .nb1-sum-val { font-weight: 600; color: #12314d; }
        .nb1-sum-divider { height: 1px; background: rgba(18,49,77,0.1); margin: 14px 0; }
        .nb1-sum-price-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
        .nb1-sum-price-label { font-size: 13.5px; color: rgba(18,49,77,0.55); }
        .nb1-sum-price { display: flex; align-items: baseline; gap: 3px; }
        .nb1-sum-price-big { font-family: 'Instrument Sans','Inter',sans-serif; font-weight: 600; font-size: 25px; letter-spacing: -0.02em; color: #12314d; line-height: 1; }
        .nb1-sum-price-per { font-size: 13px; color: rgba(18,49,77,0.5); }
        .nb1-sum-edit { font-size: 12.5px; color: #0a8fb0; text-decoration: none; border-bottom: 1px solid rgba(10,143,176,0.25); }
        .nb1-sum-zero { margin-top: 18px; background: rgba(10,143,176,0.08); border-radius: 10px; padding: 12px; text-align: center; font-size: 15px; font-weight: 700; color: #0a8fb0; }
        .nb1-sum-note { font-size: 12px; color: rgba(18,49,77,0.45); line-height: 1.55; margin-top: 14px; }
        .nb1-sum-secure { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 12px; font-size: 12px; color: rgba(18,49,77,0.45); border: none; border-radius: 0; background: none; }
        /* sidebar promo */
        .nb1-sum-promo-toggle { background: none; border: none; cursor: pointer; font-size: 13px; font-weight: 600; color: #0a8fb0; padding: 12px 0 0; display: block; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(10,143,176,0.3); }

        /* ── Legal footer ── */
        .nb1-det-legal { text-align: center; margin-top: 60px; font-size: 12px; color: rgba(18,49,77,0.35); }
        .nb1-det-legal a { color: rgba(18,49,77,0.45); text-decoration: none; margin: 0 6px; }

        /* ── Responsive ── */
        @media (max-width: 880px) {
          .nb1-det-grid { grid-template-columns: 1fr; }
          .nb1-det-right { position: static; }
        }
        @media (max-width: 560px) {
          .nb1-det-wrap { padding: 24px 16px 60px; }
          .nb1-frow { grid-template-columns: 1fr; }
          .nb1-wallet-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="nb1-det-hero">
        <h1>Almost <span>there.</span></h1>
        <p>Your email, address, shipping, and payment — all here. Nothing is charged today.</p>
      </div>

      <div className="nb1-det-grid">
        {/* ── Left: accordion form ── */}
        <div className="nb1-det-left">

          {/* Accordion 1 — Email */}
          <div className={`nb1-acc${step === 1 ? ' open' : doneSteps.has(1) ? ' done' : ' locked'}`}>
            <button type="button" className="nb1-acc-hd" onClick={() => doneSteps.has(1) && setStep(1)}>
              <span className="nb1-acc-num">1</span>
              <span className="nb1-acc-title">Your email</span>
              {doneSteps.has(1) && step !== 1 && (
                <>
                  <span className="nb1-acc-summary">{email}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(1) }}>Edit</button>
                </>
              )}
            </button>
            <div className="nb1-acc-body">
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-email">Email</label>
                  <input
                    id="nb1-email" type="email" autoComplete="email"
                    placeholder="you@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className={emailErr ? 'err' : ''}
                    onKeyDown={e => e.key === 'Enter' && nextEmail()}
                  />
                  {emailErr && <span className="nb1-err">{emailErr}</span>}
                  <span className="nb1-hint">We&apos;ll create your account and send kit tracking here.</span>
                </div>
              </div>
              <button type="button" className="nb1-acc-next" onClick={nextEmail}>Next →</button>
            </div>
          </div>

          {/* Accordion 2 — Address */}
          <div className={`nb1-acc${step === 2 ? ' open' : doneSteps.has(2) ? ' done' : ' locked'}`}>
            <button type="button" className="nb1-acc-hd" onClick={() => doneSteps.has(2) && setStep(2)}>
              <span className="nb1-acc-num">2</span>
              <span className="nb1-acc-title">Where to send your kit</span>
              {doneSteps.has(2) && step !== 2 && (
                <>
                  <span className="nb1-acc-summary">{fn} {ln}, {city}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(2) }}>Edit</button>
                </>
              )}
            </button>
            <div className="nb1-acc-body">
              <div className="nb1-frow">
                <div className="nb1-fg">
                  <label htmlFor="nb1-fn">First name</label>
                  <input id="nb1-fn" type="text" autoComplete="given-name" value={fn} onChange={e => setFn(e.target.value)} className={addrErr.fn ? 'err' : ''} />
                  {addrErr.fn && <span className="nb1-err">{addrErr.fn}</span>}
                </div>
                <div className="nb1-fg">
                  <label htmlFor="nb1-ln">Last name</label>
                  <input id="nb1-ln" type="text" autoComplete="family-name" value={ln} onChange={e => setLn(e.target.value)} className={addrErr.ln ? 'err' : ''} />
                  {addrErr.ln && <span className="nb1-err">{addrErr.ln}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-country">Country</label>
                  <select id="nb1-country" value={country} onChange={e => setCountry(e.target.value)}>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-a1">Address</label>
                  <input id="nb1-a1" type="text" autoComplete="address-line1" placeholder="Street and house number" value={a1} onChange={e => setA1(e.target.value)} className={addrErr.a1 ? 'err' : ''} />
                  {addrErr.a1 && <span className="nb1-err">{addrErr.a1}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-a2">Apartment, suite, etc. <span style={{fontWeight:400,opacity:0.6}}>(optional)</span></label>
                  <input id="nb1-a2" type="text" autoComplete="address-line2" value={a2} onChange={e => setA2(e.target.value)} />
                </div>
              </div>
              <div className="nb1-frow">
                <div className="nb1-fg">
                  <label htmlFor="nb1-zip">Postal code</label>
                  <input id="nb1-zip" type="text" autoComplete="postal-code" value={zip} onChange={e => setZip(e.target.value)} className={addrErr.zip ? 'err' : ''} />
                  {addrErr.zip && <span className="nb1-err">{addrErr.zip}</span>}
                </div>
                <div className="nb1-fg">
                  <label htmlFor="nb1-city">City</label>
                  <input id="nb1-city" type="text" autoComplete="address-level2" value={city} onChange={e => setCity(e.target.value)} className={addrErr.city ? 'err' : ''} />
                  {addrErr.city && <span className="nb1-err">{addrErr.city}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-phone">Phone <span style={{fontWeight:400,opacity:0.6}}>(for delivery updates)</span></label>
                  <input id="nb1-phone" type="tel" autoComplete="tel" placeholder="+49 …" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <button type="button" className="nb1-acc-next" onClick={nextAddr}>Next →</button>
            </div>
          </div>

          {/* Accordion 3 — Shipping */}
          <div className={`nb1-acc${step === 3 ? ' open' : doneSteps.has(3) ? ' done' : ' locked'}`}>
            <button type="button" className="nb1-acc-hd" onClick={() => doneSteps.has(3) && setStep(3)}>
              <span className="nb1-acc-num">3</span>
              <span className="nb1-acc-title">Shipment options</span>
              {doneSteps.has(3) && step !== 3 && (
                <>
                  <span className="nb1-acc-summary">{shippingLabel}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(3) }}>Edit</button>
                </>
              )}
            </button>
            <div className="nb1-acc-body">
              <div className="nb1-ship-opts">
                {([
                  { val: 'standard', name: 'Standard', sub: '3–5 working days · tracked', price: 'Free' },
                  { val: 'express',  name: 'Express',  sub: '1–2 working days · tracked', price: '€9' },
                ] as const).map(opt => (
                  <div key={opt.val} className={`nb1-ship-opt${shipping === opt.val ? ' sel' : ''}`} onClick={() => setShipping(opt.val)}>
                    <div className="nb1-ship-radio"><div className="nb1-ship-radio-dot" /></div>
                    <div className="nb1-ship-info">
                      <div className="nb1-ship-name">{opt.name}</div>
                      <div className="nb1-ship-sub">{opt.sub}</div>
                    </div>
                    <div className="nb1-ship-price">{opt.price}</div>
                  </div>
                ))}
              </div>
              <button type="button" className="nb1-acc-next" onClick={nextShipping}>Next →</button>
            </div>
          </div>

          {/* Accordion 4 — Payment */}
          <div className={`nb1-acc${step === 4 ? ' open' : doneSteps.has(4) ? ' done' : ' locked'}`}>
            <button type="button" className="nb1-acc-hd">
              <span className="nb1-acc-num">4</span>
              <span className="nb1-acc-title">Payment</span>
            </button>
            <div className="nb1-acc-body">
              {/* Wallet buttons */}
              <div className="nb1-wallet-row">
                <button type="button" className="nb1-wallet-btn nb1-wallet-apple" onClick={() => setConfirmed(true)}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  Apple Pay
                </button>
                <button type="button" className="nb1-wallet-btn nb1-wallet-gpay" onClick={() => setConfirmed(true)}>
                  <svg viewBox="0 0 41 17" width={41} height={17}><text x="0" y="13" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#5F6368">G</text><text x="12" y="13" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#4285F4">o</text><text x="20" y="13" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#EA4335">o</text><text x="28" y="13" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#FBBC05">g</text><text x="35" y="13" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#34A853">le</text></svg>
                  Pay
                </button>
              </div>

              <div className="nb1-pay-divider">or pay another way</div>

              {/* Payment method list */}
              <div className="nb1-pmlist">
                {/* Card */}
                <div className={`nb1-pm-row${payMethod === 'card' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('card')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    Card
                    <div className="nb1-pm-icons">
                      <svg viewBox="0 0 38 24" width={32} height={20} rx="4"><rect width={38} height={24} rx="4" fill="#1A1F71"/><text x="5" y="17" fill="#fff" fontSize="10" fontWeight="700" fontFamily="sans-serif">VISA</text></svg>
                      <svg viewBox="0 0 38 24" width={32} height={20}><rect width={38} height={24} rx="4" fill="#fff" stroke="#e0e0e0"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/></svg>
                    </div>
                  </button>
                  <div className="nb1-pm-body">
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>Card number</label>
                        <input type="text" inputMode="numeric" placeholder="1234 1234 1234 1234" value={cardNo} onChange={e => setCardNo(fmtCard(e.target.value))} className={payErr.cardNo ? 'err' : ''} />
                        {payErr.cardNo && <span className="nb1-err">{payErr.cardNo}</span>}
                      </div>
                    </div>
                    <div className="nb1-frow">
                      <div className="nb1-fg">
                        <label>Expiry</label>
                        <input type="text" inputMode="numeric" placeholder="MM / YY" value={exp} onChange={e => setExp(fmtExp(e.target.value))} className={payErr.exp ? 'err' : ''} />
                        {payErr.exp && <span className="nb1-err">{payErr.exp}</span>}
                      </div>
                      <div className="nb1-fg">
                        <label>CVC</label>
                        <input type="text" inputMode="numeric" placeholder="123" maxLength={4} value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g,'').slice(0,4))} className={payErr.cvc ? 'err' : ''} />
                        {payErr.cvc && <span className="nb1-err">{payErr.cvc}</span>}
                      </div>
                    </div>
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>Name on card</label>
                        <input type="text" autoComplete="cc-name" value={cardName} onChange={e => setCardName(e.target.value)} className={payErr.cardName ? 'err' : ''} />
                        {payErr.cardName && <span className="nb1-err">{payErr.cardName}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PayPal */}
                <div className={`nb1-pm-row${payMethod === 'paypal' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('paypal')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    <span style={{color:'#003087',fontWeight:700}}>Pay</span><span style={{color:'#009cde',fontWeight:700}}>Pal</span>
                  </button>
                  <div className="nb1-pm-body">
                    <p className="nb1-pm-note">You&apos;ll be redirected to PayPal to approve your plan. Nothing is charged today — your first payment is taken only when your formula is manufactured.</p>
                  </div>
                </div>

                {/* Klarna */}
                <div className={`nb1-pm-row${payMethod === 'klarna' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('klarna')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    Klarna <span className="nb1-klarna-badge">Klarna</span>
                  </button>
                  <div className="nb1-pm-body">
                    <p className="nb1-pm-note">Pay with Klarna on invoice or instant bank transfer. You&apos;ll approve in Klarna — your first charge is taken only at manufacture.</p>
                  </div>
                </div>

                {/* SEPA */}
                <div className={`nb1-pm-row${payMethod === 'sepa' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('sepa')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    SEPA Direct Debit
                  </button>
                  <div className="nb1-pm-body">
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>IBAN</label>
                        <input type="text" placeholder="DE00 0000 0000 0000 0000 00" value={iban} onChange={e => setIban(fmtIban(e.target.value))} className={payErr.iban ? 'err' : ''} />
                        {payErr.iban && <span className="nb1-err">{payErr.iban}</span>}
                      </div>
                    </div>
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>Account holder</label>
                        <input type="text" autoComplete="name" value={ibanName} onChange={e => setIbanName(e.target.value)} className={payErr.ibanName ? 'err' : ''} />
                        {payErr.ibanName && <span className="nb1-err">{payErr.ibanName}</span>}
                      </div>
                    </div>
                    <p className="nb1-pm-note" style={{fontSize:'12px',marginTop:8}}>By providing your IBAN you authorise NB1 and Stripe to debit your account by SEPA Direct Debit, beginning only when your formula is manufactured.</p>
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <label className="nb1-billing-check">
                <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
                Billing address same as delivery
              </label>
              {!billingSame && (
                <div className="nb1-billing-addr">
                  <div className="nb1-fg">
                    <label>Street &amp; number</label>
                    <input type="text" autoComplete="billing street-address" />
                  </div>
                  <div className="nb1-frow">
                    <div className="nb1-fg"><label>Postal code</label><input type="text" autoComplete="billing postal-code" /></div>
                    <div className="nb1-fg"><label>City</label><input type="text" autoComplete="billing address-level2" /></div>
                  </div>
                </div>
              )}

              {/* Secure */}
              <div className="nb1-secure">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#0a8fb0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secured by Stripe
              </div>

              {/* Promo in form */}
              <button type="button" className="nb1-promo-toggle" onClick={() => setPromoOpen(o => !o)}>
                {promoApplied ? 'Change code' : 'Add discount code'}
              </button>
              {promoOpen && (
                <div>
                  <div className="nb1-promo-row">
                    <input className="nb1-promo-input" placeholder="Discount code" value={promoInput} onChange={e => setPromoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} />
                    <button type="button" className="nb1-promo-apply" onClick={applyPromo}>Apply</button>
                  </div>
                  {promoMsg && <div className={`nb1-promo-msg${promoMsg.ok ? ' ok' : ' err'}`}>{promoMsg.text}</div>}
                  {promoApplied && <button type="button" style={{fontSize:'12px',color:'rgba(18,49,77,0.5)',background:'none',border:'none',cursor:'pointer',padding:'4px 0'}} onClick={removePromo}>Remove</button>}
                </div>
              )}

              {/* Confirm */}
              {accountErr && <p style={{color:'#c0392b',fontSize:'13px',marginTop:12}}>{accountErr}</p>}
              <button
                type="button"
                className="nb1-confirm-btn"
                onClick={nextPayment}
                disabled={accountStatus === 'sending'}
                style={accountStatus === 'sending' ? {opacity:0.65,cursor:'not-allowed'} : undefined}
              >
                {accountStatus === 'sending' ? 'Processing…' : confirmLabel}
              </button>
              <p className="nb1-confirm-legal">
                By confirming you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>, and consent to NB1 processing your biological sample. Your first charge is around two weeks after you return your sample, only once your formula enters manufacture. A one-time <strong>€49 fee</strong> applies only if your sample isn&apos;t returned within 4 weeks.
              </p>
            </div>
          </div>

          {/* What's next */}
          <div className="nb1-whats-next">
            <div className="nb1-whats-next-h">What happens next</div>
            <ol>
              <li>Your kit ships — a two-minute gut sample, posted back in the prepaid envelope.</li>
              <li>We sequence it and a researcher approves your formula.</li>
              <li>First charge, then your one-of-one formula ships.</li>
            </ol>
          </div>
        </div>

        {/* ── Right: order summary ── */}
        <div className="nb1-det-right">
          <div className="nb1-sum">
            <div className="nb1-sum-title">Your order</div>
            <div className="nb1-sum-rows">
              <div className="nb1-sum-row"><span className="nb1-sum-label">Plan</span><span className="nb1-sum-val">{planLabel}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">Duration</span><span className="nb1-sum-val">{planInfo.label}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">Billing</span><span className="nb1-sum-val">{planInfo.billing}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">Shipping</span><span className="nb1-sum-val">{shippingLabel}</span></div>
            </div>
            <div className="nb1-sum-divider" />
            <div className="nb1-sum-price-row">
              <span className="nb1-sum-price-label">Monthly</span>
              <div className="nb1-sum-price">
                <span className="nb1-sum-price-big">{planInfo.rate}</span>
                <span className="nb1-sum-price-per">/mo</span>
              </div>
            </div>
            <a href={backLink} className="nb1-sum-edit">Edit plan or duration</a>
            {/* Sidebar promo */}
            <button type="button" className="nb1-sum-promo-toggle" onClick={() => setPromoOpen(o => !o)}>
              {promoApplied ? `${promoApplied} applied` : 'Add discount code'}
            </button>
            {promoOpen && (
              <div style={{marginTop:8}}>
                <div className="nb1-promo-row">
                  <input className="nb1-promo-input" placeholder="Discount code" value={promoInput} onChange={e => setPromoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} />
                  <button type="button" className="nb1-promo-apply" onClick={applyPromo}>Apply</button>
                </div>
                {promoMsg && <div className={`nb1-promo-msg${promoMsg.ok ? ' ok' : ' err'}`}>{promoMsg.text}</div>}
              </div>
            )}

            <div className="nb1-sum-zero">€0 due today</div>
            <p className="nb1-sum-note">Your first charge is around two weeks after you return your sample, only once your formula enters manufacture.</p>

          </div>
          <div className="nb1-sum-secure">
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#0a8fb0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secured by Stripe
          </div>
        </div>
      </div>

      {/* Legal footer */}
      <div className="nb1-det-legal">
        <a href="#">Privacy</a>·<a href="#">Terms</a>·<a href="#">Imprint</a>·<a href="#">GDPR</a>· © NB1 Health GmbH 2026
      </div>
    </div>
  )
}

/* ── Exported wrapper (Suspense for useSearchParams) ─────────────────── */
export const CheckoutFormComponent: React.FC<Props> = (props) => (
  <Suspense fallback={null}>
    <CheckoutFormInner {...props} />
  </Suspense>
)

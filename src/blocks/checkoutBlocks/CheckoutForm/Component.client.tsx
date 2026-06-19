'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js'
import type { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js'
import { createFirebaseAccount } from '@/lib/createAccount'
import { checkoutPaymentIntent, checkoutConfirm } from '@/lib/checkoutApi'
import { getDictionary } from '@/i18n/getDictionary'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

/* ─── Data ──────────────────────────────────────────────────────────── */

// 'monthly' (flexible) stays hardcoded — it's a separate, non-API concept
// (see src/lib/plans/api.ts file header). label/billing are localized below
// via dict.plans.months / dict.checkout.summary; only the rate here is the
// static EUR fallback used if the live fetch (passed in as planRates) failed.
const STATIC_RATES: Record<string, Record<string, string>> = {
  core: { '4': '€99', '8': '€94', '12': '€89', monthly: '€109' },
  advanced: { '4': '€149', '8': '€141', '12': '€134' },
}

const COUNTRIES = ['Germany', 'Austria', 'Netherlands', 'Belgium', 'France', 'Luxembourg', 'Ireland']

const COUNTRY_CODES: Record<string, string> = {
  Germany: 'DE', Austria: 'AT', Netherlands: 'NL',
  Belgium: 'BE', France: 'FR', Luxembourg: 'LU', Ireland: 'IE',
}

/* ─── Types ─────────────────────────────────────────────────────────── */

type PayMethod = 'card' | 'paypal' | 'klarna' | 'sepa'

/** Live-fetched rate per (plan, cycle) — see Component.tsx (server). */
type PlanRates = Record<string, Record<string, string>>

type Props = { backHref?: string | null; locale?: string }

/* ─── Inner component (needs useSearchParams inside Suspense) ────────── */

function CheckoutFormInner({ backHref, locale }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const dict = getDictionary(locale)
  const t = dict.checkout
  const searchParams = useSearchParams()
  const planKey  = searchParams?.get('plan')  ?? 'core'
  const cycleKey = searchParams?.get('cycle') ?? '4'

  const [planRates, setPlanRates] = useState<PlanRates>(STATIC_RATES)
  const zeroPrice = '€0'

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://apistg.nb1.com'
    fetch(`${backend}/subscriptions/plans?preferred_first=false`)
      .then(r => r.json())
      .then((plans: Array<{ title: string; month: number; prices: Record<string, number> }>) => {
        const rates: PlanRates = { core: {}, advanced: {} }
        for (const p of plans) {
          const key = p.title === 'Advanced' ? 'advanced' : 'core'
          if (p.prices.EUR) rates[key][String(p.month)] = `€${p.prices.EUR}`
        }
        setPlanRates(rates)
      })
      .catch(() => { /* keep static fallback */ })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const monthNum = Number(cycleKey)
  const durationLabel = !Number.isNaN(monthNum) && dict.plans.months[monthNum as 4 | 8 | 12]
    ? dict.plans.months[monthNum as 4 | 8 | 12]
    : cycleKey === 'monthly' ? t.summary.cancelAnytime : cycleKey
  const billingLabel = cycleKey === 'monthly' ? t.summary.cancelAnytime : t.summary.billingMonthly
  const rate = planRates[planKey]?.[cycleKey] ?? STATIC_RATES[planKey]?.[cycleKey] ?? STATIC_RATES.core['4']
  const planInfo = { label: durationLabel, billing: billingLabel, rate }
  const planLabel  = planKey === 'advanced' ? 'Advanced' : 'Core'
  const orderHref  = `/${locale || 'en'}/order`

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
  const [country, setCountry] = useState('Germany') // value stays the English key (matches COUNTRIES); display label is localized via dict.countries
  const [a1, setA1]       = useState('')
  const [a2, setA2]       = useState('')
  const [zip, setZip]     = useState('')
  const [city, setCity]   = useState('')
  const [phone, setPhone] = useState('')
  const [addrErr, setAddrErr] = useState<Record<string, string>>({})

  /* step 3 */
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard')

  /* ── sessionStorage: restore on mount ── */
  const FORM_KEY = 'nb1_checkout_form'
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(FORM_KEY)
      if (!saved) return
      const d = JSON.parse(saved)
      if (d.email)    setEmail(d.email)
      if (d.fn)       setFn(d.fn)
      if (d.ln)       setLn(d.ln)
      if (d.country)  setCountry(d.country)
      if (d.a1)       setA1(d.a1)
      if (d.a2)       setA2(d.a2)
      if (d.zip)      setZip(d.zip)
      if (d.city)     setCity(d.city)
      if (d.phone)    setPhone(d.phone)
      if (d.shipping) setShipping(d.shipping)
      if (d.step)     setStep(d.step)
      if (d.doneSteps) setDoneSteps(new Set(d.doneSteps))
    } catch { /* noop */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── sessionStorage: save on every change ── */
  useEffect(() => {
    try {
      sessionStorage.setItem(FORM_KEY, JSON.stringify({
        email, fn, ln, country, a1, a2, zip, city, phone, shipping,
        step, doneSteps: [...doneSteps],
      }))
    } catch { /* noop */ }
  }, [email, fn, ln, country, a1, a2, zip, city, phone, shipping, step, doneSteps])

  /* wallet (Apple Pay / Google Pay) */
  const [paymentRequest, setPaymentRequest] = useState<ReturnType<NonNullable<typeof stripe>['paymentRequest']> | null>(null)
  const [walletAvailable, setWalletAvailable] = useState(false)

  /* step 4 */
  const [payMethod,   setPayMethod]   = useState<PayMethod>('card')
  const [cardName,    setCardName]    = useState('')
  const [iban,        setIban]        = useState('')
  const [ibanName,    setIbanName]    = useState('')
  const [billingSame, setBillingSame] = useState(true)
  const [payErr,      setPayErr]      = useState<Record<string, string>>({})

  /* billing address (used when billingSame is false) */
  const [bAddrType,  setBAddrType]  = useState<'individual' | 'company'>('individual')
  const [bFn,        setBFn]        = useState('')
  const [bLn,        setBLn]        = useState('')
  const [bCompany,   setBCompany]   = useState('')
  const [bTaxId,     setBTaxId]     = useState('')
  const [bRegNum,    setBRegNum]    = useState('')
  const [bEmail,     setBEmail]     = useState('')
  const [bPhone,     setBPhone]     = useState('')
  const [bA1,        setBA1]        = useState('')
  const [bA2,        setBA2]        = useState('')
  const [bZip,       setBZip]       = useState('')
  const [bCity,      setBCity]      = useState('')
  const [bCountry,   setBCountry]   = useState('Germany')

  /* account creation */
  const [accountStatus, setAccountStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [accountErr,    setAccountErr]    = useState('')
  const submittingRef = useRef(false)

  /* idempotency key — generated once per checkout session, persisted in sessionStorage */
  const idempotencyKeyRef = useRef<string>('')
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('nb1_checkout_idempotency_key')
      idempotencyKeyRef.current = saved ?? crypto.randomUUID()
      sessionStorage.setItem('nb1_checkout_idempotency_key', idempotencyKeyRef.current)
    } catch {
      idempotencyKeyRef.current = crypto.randomUUID()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* promo */
  const [promoInput,   setPromoInput]   = useState('')
  const [promoApplied, setPromoApplied] = useState<string | null>(null)
  const [promoMsg,     setPromoMsg]     = useState<{ text: string; ok: boolean } | null>(null)
  const [promoOpen,    setPromoOpen]    = useState(false)

  /* ── Wallet: create PaymentRequest once Stripe is ready ── */
  useEffect(() => {
    if (!stripe) return
    const pr = stripe.paymentRequest({
      country: 'DE',
      currency: 'eur',
      total: { label: `NB1 ${planLabel} Plan`, amount: 0, pending: true },
      requestPayerName: true,
      requestPayerEmail: true,
    })
    void pr.canMakePayment().then(result => {
      console.log('[Wallet] canMakePayment result:', result)
      if (result) {
        setPaymentRequest(pr)
        setWalletAvailable(true)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe])

  /* ── Wallet: paymentmethod handler (re-registers when form state changes) ── */
  useEffect(() => {
    if (!paymentRequest || !stripe) return
    const accountError = t.confirm.accountError
    const accountExists = t.confirm.accountExists
    const handler = async (event: PaymentRequestPaymentMethodEvent) => {
      if (submittingRef.current) { event.complete('fail'); return }
      submittingRef.current = true
      setAccountStatus('sending')
      setAccountErr('')
      try {
        const monthNum = cycleKey === 'monthly' ? 1 : Number(cycleKey)
        const planSlug = `NB1-${planKey.toUpperCase()}-${monthNum}`
        const intent = await checkoutPaymentIntent({
          plan_slug: planSlug,
          currency: 'EUR',
          shipping_option: shipping,
          discount_code: promoApplied ?? null,
          customer_email: email,
          customer_name: `${fn} ${ln}`.trim() || null,
          customer_phone: phone || null,
          idempotency_key: idempotencyKeyRef.current || undefined,
        })
        const { error: stripeError } = await stripe.confirmCardSetup(intent.client_secret, {
          payment_method: event.paymentMethod.id,
        })
        if (stripeError) {
          event.complete('fail')
          setAccountErr(stripeError.message ?? accountError)
          setAccountStatus('error')
          submittingRef.current = false
          return
        }
        event.complete('success')
        await checkoutConfirm({
          setup_intent_id: intent.setup_intent_id,
          idempotency_key: idempotencyKeyRef.current || intent.setup_intent_id,
          shipping_address: {
            first_name: fn, last_name: ln, email,
            phone: phone || null, address_line1: a1, address_line2: a2 || null,
            city, state: null, postal_code: zip, country,
            country_code: COUNTRY_CODES[country] ?? '',
          },
          billing_address: {
            address_type: 'individual',
            first_name: fn, last_name: ln, company_name: null,
            tax_id: null, registration_number: null, email,
            phone: phone || null, address_line1: a1, address_line2: a2 || null,
            city, state: null, postal_code: zip,
            country: COUNTRY_CODES[country] ?? country,
          },
        })
        setAccountStatus('sent')
        setConfirmed(true)
      } catch (err: unknown) {
        event.complete('fail')
        setAccountStatus('error')
        const code = (err as { code?: string })?.code
        setAccountErr(code === 'auth/email-already-in-use' ? accountExists : accountError)
        submittingRef.current = false
      }
    }
    paymentRequest.on('paymentmethod', handler)
    return () => { paymentRequest.off('paymentmethod', handler) }
  }, [paymentRequest, stripe, email, fn, ln, phone, a1, a2, zip, city, country, shipping, planKey, cycleKey, promoApplied, t.confirm.accountError, t.confirm.accountExists])

  /* ── helpers ── */
  const shippingLabel = shipping === 'express'
    ? `${t.shipping.expressName} · ${t.shipping.expressPrice}`
    : `${t.shipping.standardName} · ${t.shipping.standardPrice}`

  function markDone(n: number) {
    setDoneSteps(s => new Set([...s, n]))
    setStep(n + 1)
  }

  function nextEmail() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(t.email.invalid)
      return
    }
    setEmailErr('')
    markDone(1)
  }

  function nextAddr() {
    const e: Record<string, string> = {}
    if (!fn.trim()) e.fn = t.required
    if (!ln.trim()) e.ln = t.required
    if (!a1.trim()) e.a1 = t.required
    if (!zip.trim()) e.zip = t.required
    if (!city.trim()) e.city = t.required
    setAddrErr(e)
    if (Object.keys(e).length) return
    markDone(2)
  }

  function nextShipping() { markDone(3) }

  async function nextPayment() {
    const e: Record<string, string> = {}
    if (payMethod === 'sepa') {
      if (iban.replace(/\s/g, '').length < 15) e.iban = t.payment.ibanInvalid
      if (!ibanName.trim()) e.ibanName = t.required
    }
    setPayErr(e)
    if (Object.keys(e).length) return

    if (submittingRef.current) return
    submittingRef.current = true
    setAccountStatus('sending')
    setAccountErr('')

    try {
      // 1. Create Stripe SetupIntent via backend
      // Backend slugs follow the pattern NB1-{PLAN}-{MONTHS} (e.g. NB1-CORE-4)
      const monthNum = cycleKey === 'monthly' ? 1 : Number(cycleKey)
      const planSlug = `NB1-${planKey.toUpperCase()}-${monthNum}`

      const intent = await checkoutPaymentIntent({
        plan_slug: planSlug,
        currency: 'EUR',
        shipping_option: shipping,
        discount_code: promoApplied ?? null,
        customer_email: email,
        customer_name: `${fn} ${ln}`.trim() || null,
        customer_phone: phone || null,
        idempotency_key: idempotencyKeyRef.current || undefined,
      })

      // 2. Confirm card with Stripe.js
      if (payMethod === 'card') {
        if (!stripe || !elements) {
          setAccountErr(t.confirm.accountError)
          setAccountStatus('error')
          return
        }
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
          setAccountErr(t.confirm.accountError)
          setAccountStatus('error')
          return
        }
        const { error: stripeError } = await stripe.confirmCardSetup(intent.client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardName || `${fn} ${ln}`.trim(), email },
          },
        })
        if (stripeError) {
          setAccountErr(stripeError.message ?? t.confirm.accountError)
          setAccountStatus('error')
          return
        }
      }

      // 3. Confirm checkout — backend creates user + subscription
      await checkoutConfirm({
        setup_intent_id: intent.setup_intent_id,
        idempotency_key: idempotencyKeyRef.current || intent.setup_intent_id,
        shipping_address: {
          first_name: fn,
          last_name: ln,
          email,
          phone: phone || null,
          address_line1: a1,
          address_line2: a2 || null,
          city,
          state: null,
          postal_code: zip,
          country,
          country_code: COUNTRY_CODES[country] ?? '',
        },
        billing_address: billingSame ? {
          address_type: 'individual',
          first_name: fn,
          last_name: ln,
          company_name: null,
          tax_id: null,
          registration_number: null,
          email,
          phone: phone || null,
          address_line1: a1,
          address_line2: a2 || null,
          city,
          state: null,
          postal_code: zip,
          country: COUNTRY_CODES[country] ?? country,
        } : {
          address_type: bAddrType,
          first_name: bFn || fn,
          last_name: bLn || ln,
          company_name: bCompany || null,
          tax_id: bTaxId || null,
          registration_number: bRegNum || null,
          email: bEmail || email,
          phone: bPhone || phone || null,
          address_line1: bA1,
          address_line2: bA2 || null,
          city: bCity,
          state: null,
          postal_code: bZip,
          country: COUNTRY_CODES[bCountry] ?? bCountry,
        },
      })

      setAccountStatus('sent')
    } catch (err: unknown) {
      setAccountStatus('error')
      const code = (err as { code?: string })?.code
      if (code === 'auth/email-already-in-use') {
        setAccountErr(t.confirm.accountExists)
      } else {
        setAccountErr(t.confirm.accountError)
      }
      submittingRef.current = false
      return
    }

    setConfirmed(true)
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase()
    const desc = dict.promo.codes[code]
    if (desc) {
      setPromoApplied(code)
      setPromoMsg({ text: dict.promo.appliedTemplate.replace('{code}', code).replace('{desc}', desc), ok: true })
    } else {
      setPromoMsg({ text: dict.promo.invalid, ok: false })
    }
  }

  function removePromo() {
    setPromoApplied(null)
    setPromoInput('')
    setPromoMsg(null)
  }

  function fmtIban(v: string) {
    return v.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 34).replace(/(.{4})(?=.)/g, '$1 ')
  }

  const zero = zeroPrice ?? '€0'
  const confirmLabel = payMethod === 'paypal' ? t.confirm.paypal
    : payMethod === 'klarna' ? t.confirm.klarna
    : t.confirm.label.replace('{zeroPrice}', zero)

  const [doneBodyPrefix, doneBodySuffix] = t.done.body.split('{email}')

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
        <h2 className="nb1-det-conf-h">{t.done.heading}{fn ? `, ${fn}` : ''}.</h2>
        <p className="nb1-det-conf-p">
          {doneBodyPrefix}<strong>{email}</strong>{doneBodySuffix}
        </p>
        <Link href="/" className="nb1-det-conf-btn">{t.done.dashboard}</Link>
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
        <h1>{t.hero.titlePrefix}<span>{t.hero.titleAccent}</span></h1>
        <p>{t.hero.subtitle}</p>
      </div>

      <div className="nb1-det-grid">
        {/* ── Left: accordion form ── */}
        <div className="nb1-det-left">

          {/* Accordion 1 — Email */}
          <div className={`nb1-acc${step === 1 ? ' open' : doneSteps.has(1) ? ' done' : ' locked'}`}>
            <div role="button" tabIndex={0} className="nb1-acc-hd" onClick={() => doneSteps.has(1) && setStep(1)}>
              <span className="nb1-acc-num">1</span>
              <span className="nb1-acc-title">{t.steps.email}</span>
              {doneSteps.has(1) && step !== 1 && (
                <>
                  <span className="nb1-acc-summary">{email}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(1) }}>{t.edit}</button>
                </>
              )}
            </div>
            <div className="nb1-acc-body">
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-email">{t.email.label}</label>
                  <input
                    id="nb1-email" type="email" autoComplete="email"
                    placeholder={t.email.placeholder}
                    value={email} onChange={e => setEmail(e.target.value)}
                    className={emailErr ? 'err' : ''}
                    onKeyDown={e => e.key === 'Enter' && nextEmail()}
                  />
                  {emailErr && <span className="nb1-err">{emailErr}</span>}
                  <span className="nb1-hint">{t.email.hint}</span>
                </div>
              </div>
              <button type="button" className="nb1-acc-next" onClick={nextEmail}>{t.next}</button>
            </div>
          </div>

          {/* Accordion 2 — Address */}
          <div className={`nb1-acc${step === 2 ? ' open' : doneSteps.has(2) ? ' done' : ' locked'}`}>
            <div role="button" tabIndex={0} className="nb1-acc-hd" onClick={() => doneSteps.has(2) && setStep(2)}>
              <span className="nb1-acc-num">2</span>
              <span className="nb1-acc-title">{t.steps.address}</span>
              {doneSteps.has(2) && step !== 2 && (
                <>
                  <span className="nb1-acc-summary">{fn} {ln}, {city}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(2) }}>{t.edit}</button>
                </>
              )}
            </div>
            <div className="nb1-acc-body">
              <div className="nb1-frow">
                <div className="nb1-fg">
                  <label htmlFor="nb1-fn">{t.address.firstName}</label>
                  <input id="nb1-fn" type="text" autoComplete="given-name" value={fn} onChange={e => setFn(e.target.value)} className={addrErr.fn ? 'err' : ''} />
                  {addrErr.fn && <span className="nb1-err">{addrErr.fn}</span>}
                </div>
                <div className="nb1-fg">
                  <label htmlFor="nb1-ln">{t.address.lastName}</label>
                  <input id="nb1-ln" type="text" autoComplete="family-name" value={ln} onChange={e => setLn(e.target.value)} className={addrErr.ln ? 'err' : ''} />
                  {addrErr.ln && <span className="nb1-err">{addrErr.ln}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-country">{t.address.country}</label>
                  <select id="nb1-country" value={country} onChange={e => setCountry(e.target.value)}>
                    {COUNTRIES.map(c => <option key={c} value={c}>{dict.countries[c] ?? c}</option>)}
                  </select>
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-a1">{t.address.addressLabel}</label>
                  <input id="nb1-a1" type="text" autoComplete="address-line1" placeholder={t.address.addressPlaceholder} value={a1} onChange={e => setA1(e.target.value)} className={addrErr.a1 ? 'err' : ''} />
                  {addrErr.a1 && <span className="nb1-err">{addrErr.a1}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-a2">{t.address.apt} <span style={{fontWeight:400,opacity:0.6}}>{t.address.optional}</span></label>
                  <input id="nb1-a2" type="text" autoComplete="address-line2" value={a2} onChange={e => setA2(e.target.value)} />
                </div>
              </div>
              <div className="nb1-frow">
                <div className="nb1-fg">
                  <label htmlFor="nb1-zip">{t.address.postalCode}</label>
                  <input id="nb1-zip" type="text" autoComplete="postal-code" value={zip} onChange={e => setZip(e.target.value)} className={addrErr.zip ? 'err' : ''} />
                  {addrErr.zip && <span className="nb1-err">{addrErr.zip}</span>}
                </div>
                <div className="nb1-fg">
                  <label htmlFor="nb1-city">{t.address.city}</label>
                  <input id="nb1-city" type="text" autoComplete="address-level2" value={city} onChange={e => setCity(e.target.value)} className={addrErr.city ? 'err' : ''} />
                  {addrErr.city && <span className="nb1-err">{addrErr.city}</span>}
                </div>
              </div>
              <div className="nb1-frow full">
                <div className="nb1-fg">
                  <label htmlFor="nb1-phone">{t.address.phone} <span style={{fontWeight:400,opacity:0.6}}>{t.address.phoneNote}</span></label>
                  <input id="nb1-phone" type="tel" autoComplete="tel" placeholder={t.address.phonePlaceholder} value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <button type="button" className="nb1-acc-next" onClick={nextAddr}>{t.next}</button>
            </div>
          </div>

          {/* Accordion 3 — Shipping */}
          <div className={`nb1-acc${step === 3 ? ' open' : doneSteps.has(3) ? ' done' : ' locked'}`}>
            <div role="button" tabIndex={0} className="nb1-acc-hd" onClick={() => doneSteps.has(3) && setStep(3)}>
              <span className="nb1-acc-num">3</span>
              <span className="nb1-acc-title">{t.steps.shipping}</span>
              {doneSteps.has(3) && step !== 3 && (
                <>
                  <span className="nb1-acc-summary">{shippingLabel}</span>
                  <button type="button" className="nb1-acc-edit" onClick={e => { e.stopPropagation(); setStep(3) }}>{t.edit}</button>
                </>
              )}
            </div>
            <div className="nb1-acc-body">
              <div className="nb1-ship-opts">
                {([
                  { val: 'standard', name: t.shipping.standardName, sub: t.shipping.standardSub, price: t.shipping.standardPrice },
                  { val: 'express',  name: t.shipping.expressName,  sub: t.shipping.expressSub,  price: t.shipping.expressPrice },
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
              <button type="button" className="nb1-acc-next" onClick={nextShipping}>{t.next}</button>
            </div>
          </div>

          {/* Accordion 4 — Payment */}
          <div className={`nb1-acc${step === 4 ? ' open' : doneSteps.has(4) ? ' done' : ' locked'}`}>
            <div className="nb1-acc-hd">
              <span className="nb1-acc-num">4</span>
              <span className="nb1-acc-title">{t.steps.payment}</span>
            </div>
            <div className="nb1-acc-body">
              {walletAvailable && paymentRequest && (
                <div style={{marginBottom: 14}}>
                  <PaymentRequestButtonElement
                    options={{
                      paymentRequest,
                      style: { paymentRequestButton: { height: '48px' } },
                    }}
                  />
                </div>
              )}
              <div className="nb1-pay-divider" style={{marginTop:0}}>{t.payment.orPayAnotherWay}</div>

              {/* Payment method list */}
              <div className="nb1-pmlist">
                {/* Card */}
                <div className={`nb1-pm-row${payMethod === 'card' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('card')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    {t.payment.card}
                    <div className="nb1-pm-icons">
                      <svg viewBox="0 0 38 24" width={32} height={20} rx="4"><rect width={38} height={24} rx="4" fill="#1A1F71"/><text x="5" y="17" fill="#fff" fontSize="10" fontWeight="700" fontFamily="sans-serif">VISA</text></svg>
                      <svg viewBox="0 0 38 24" width={32} height={20}><rect width={38} height={24} rx="4" fill="#fff" stroke="#e0e0e0"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/></svg>
                    </div>
                  </button>
                  <div className="nb1-pm-body">
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>{t.payment.nameOnCard}</label>
                        <input type="text" autoComplete="cc-name" value={cardName} onChange={e => setCardName(e.target.value)} className={payErr.cardName ? 'err' : ''} />
                        {payErr.cardName && <span className="nb1-err">{payErr.cardName}</span>}
                      </div>
                    </div>
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>{t.payment.cardNumber}</label>
                        <div style={{padding:'13px 15px',borderRadius:'11px',border:`1.5px solid rgba(18,49,77,0.1)`,background:'#fff'}}>
                          <CardElement options={{ style: { base: { fontSize: '15px', color: '#12314d', fontFamily: 'Inter, sans-serif', '::placeholder': { color: 'rgba(18,49,77,0.35)' } } } }} />
                        </div>
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
                    <p className="nb1-pm-note">{t.payment.paypalNote}</p>
                  </div>
                </div>

                {/* Klarna */}
                <div className={`nb1-pm-row${payMethod === 'klarna' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('klarna')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    {t.payment.klarna} <span className="nb1-klarna-badge">Klarna</span>
                  </button>
                  <div className="nb1-pm-body">
                    <p className="nb1-pm-note">{t.payment.klarnaNote}</p>
                  </div>
                </div>

                {/* SEPA */}
                <div className={`nb1-pm-row${payMethod === 'sepa' ? ' active' : ''}`}>
                  <button type="button" className="nb1-pm-hd" onClick={() => setPayMethod('sepa')}>
                    <div className="nb1-pm-radio"><div className="nb1-pm-radio-dot" /></div>
                    {t.payment.sepa}
                  </button>
                  <div className="nb1-pm-body">
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>{t.payment.iban}</label>
                        <input type="text" placeholder={t.payment.ibanPlaceholder} value={iban} onChange={e => setIban(fmtIban(e.target.value))} className={payErr.iban ? 'err' : ''} />
                        {payErr.iban && <span className="nb1-err">{payErr.iban}</span>}
                      </div>
                    </div>
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>{t.payment.accountHolder}</label>
                        <input type="text" autoComplete="name" value={ibanName} onChange={e => setIbanName(e.target.value)} className={payErr.ibanName ? 'err' : ''} />
                        {payErr.ibanName && <span className="nb1-err">{payErr.ibanName}</span>}
                      </div>
                    </div>
                    <p className="nb1-pm-note" style={{fontSize:'12px',marginTop:8}}>{t.payment.sepaConsent}</p>
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <label className="nb1-billing-check">
                <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
                {t.payment.billingSame}
              </label>
              {!billingSame && (
                <div className="nb1-billing-addr">
                  {/* Address type toggle */}
                  <div className="nb1-frow" style={{gridTemplateColumns:'1fr 1fr',marginBottom:14}}>
                    {(['individual','company'] as const).map(type => (
                      <div key={type} className={`nb1-ship-opt${bAddrType === type ? ' sel' : ''}`} onClick={() => setBAddrType(type)} style={{padding:'12px 16px'}}>
                        <div className="nb1-ship-radio"><div className="nb1-ship-radio-dot" /></div>
                        <span className="nb1-ship-name" style={{fontSize:14}}>{type === 'individual' ? t.payment.billingIndividual : t.payment.billingCompany}</span>
                      </div>
                    ))}
                  </div>

                  {bAddrType === 'company' && (<>
                    <div className="nb1-frow full">
                      <div className="nb1-fg">
                        <label>{t.payment.companyName}</label>
                        <input type="text" autoComplete="organization" value={bCompany} onChange={e => setBCompany(e.target.value)} />
                      </div>
                    </div>
                    <div className="nb1-frow">
                      <div className="nb1-fg">
                        <label>{t.payment.taxId}</label>
                        <input type="text" value={bTaxId} onChange={e => setBTaxId(e.target.value)} />
                      </div>
                      <div className="nb1-fg">
                        <label>{t.payment.registrationNumber}</label>
                        <input type="text" value={bRegNum} onChange={e => setBRegNum(e.target.value)} />
                      </div>
                    </div>
                  </>)}

                  <div className="nb1-frow">
                    <div className="nb1-fg">
                      <label>{t.address.firstName}</label>
                      <input type="text" autoComplete="billing given-name" value={bFn} onChange={e => setBFn(e.target.value)} />
                    </div>
                    <div className="nb1-fg">
                      <label>{t.address.lastName}</label>
                      <input type="text" autoComplete="billing family-name" value={bLn} onChange={e => setBLn(e.target.value)} />
                    </div>
                  </div>
                  <div className="nb1-frow">
                    <div className="nb1-fg">
                      <label>{t.email.label}</label>
                      <input type="email" autoComplete="billing email" value={bEmail} onChange={e => setBEmail(e.target.value)} />
                    </div>
                    <div className="nb1-fg">
                      <label>{t.address.phone} <span style={{fontWeight:400,opacity:0.6}}>{t.address.phoneNote}</span></label>
                      <input type="tel" autoComplete="billing tel" value={bPhone} onChange={e => setBPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="nb1-frow full">
                    <div className="nb1-fg">
                      <label>{t.address.country}</label>
                      <select autoComplete="billing country-name" value={bCountry} onChange={e => setBCountry(e.target.value)}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{dict.countries[c] ?? c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="nb1-frow full">
                    <div className="nb1-fg">
                      <label>{t.address.addressLabel}</label>
                      <input type="text" autoComplete="billing address-line1" placeholder={t.address.addressPlaceholder} value={bA1} onChange={e => setBA1(e.target.value)} />
                    </div>
                  </div>
                  <div className="nb1-frow full">
                    <div className="nb1-fg">
                      <label>{t.address.apt} <span style={{fontWeight:400,opacity:0.6}}>{t.address.optional}</span></label>
                      <input type="text" autoComplete="billing address-line2" value={bA2} onChange={e => setBA2(e.target.value)} />
                    </div>
                  </div>
                  <div className="nb1-frow">
                    <div className="nb1-fg">
                      <label>{t.address.postalCode}</label>
                      <input type="text" autoComplete="billing postal-code" value={bZip} onChange={e => setBZip(e.target.value)} />
                    </div>
                    <div className="nb1-fg">
                      <label>{t.address.city}</label>
                      <input type="text" autoComplete="billing address-level2" value={bCity} onChange={e => setBCity(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Secure */}
              <div className="nb1-secure">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#0a8fb0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                {t.secured}
              </div>

              {/* Promo in form */}
              <button type="button" className="nb1-promo-toggle" onClick={() => setPromoOpen(o => !o)}>
                {promoApplied ? t.promoUi.changeCode : t.promoUi.addCode}
              </button>
              {promoOpen && (
                <div>
                  <div className="nb1-promo-row">
                    <input className="nb1-promo-input" placeholder={t.promoUi.placeholder} value={promoInput} onChange={e => setPromoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} />
                    <button type="button" className="nb1-promo-apply" onClick={applyPromo}>{t.promoUi.apply}</button>
                  </div>
                  {promoMsg && <div className={`nb1-promo-msg${promoMsg.ok ? ' ok' : ' err'}`}>{promoMsg.text}</div>}
                  {promoApplied && <button type="button" style={{fontSize:'12px',color:'rgba(18,49,77,0.5)',background:'none',border:'none',cursor:'pointer',padding:'4px 0'}} onClick={removePromo}>{t.promoUi.removeCode}</button>}
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
                {accountStatus === 'sending' ? t.confirm.processing : confirmLabel}
              </button>
              <p className="nb1-confirm-legal">
                {t.confirm.legalPrefix} <a href="#">{t.confirm.terms}</a> {t.confirm.and} <a href="#">{t.confirm.privacyPolicy}</a>{t.confirm.legalMid}<strong>{t.confirm.feeBold}</strong> {t.confirm.legalEnd}
              </p>
            </div>
          </div>

          {/* What's next */}
          <div className="nb1-whats-next">
            <div className="nb1-whats-next-h">{t.whatsNext.heading}</div>
            <ol>
              <li>{t.whatsNext.step1}</li>
              <li>{t.whatsNext.step2}</li>
              <li>{t.whatsNext.step3}</li>
            </ol>
          </div>
        </div>

        {/* ── Right: order summary ── */}
        <div className="nb1-det-right">
          <div className="nb1-sum">
            <div className="nb1-sum-title">{t.summary.title}</div>
            <div className="nb1-sum-rows">
              <div className="nb1-sum-row"><span className="nb1-sum-label">{t.summary.plan}</span><span className="nb1-sum-val">{planLabel}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">{t.summary.duration}</span><span className="nb1-sum-val">{planInfo.label}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">{t.summary.billing}</span><span className="nb1-sum-val">{planInfo.billing}</span></div>
              <div className="nb1-sum-row"><span className="nb1-sum-label">{t.summary.shipping}</span><span className="nb1-sum-val">{shippingLabel}</span></div>
            </div>
            <div className="nb1-sum-divider" />
            <div className="nb1-sum-price-row">
              <span className="nb1-sum-price-label">{t.summary.monthly}</span>
              <div className="nb1-sum-price">
                <span className="nb1-sum-price-big">{planInfo.rate}</span>
                <span className="nb1-sum-price-per">{dict.plans.perMonth}</span>
              </div>
            </div>
            <a href={orderHref} className="nb1-sum-edit">{t.summary.editLink}</a>
            {/* Sidebar promo */}
            <button type="button" className="nb1-sum-promo-toggle" onClick={() => setPromoOpen(o => !o)}>
              {promoApplied ? t.promoUi.appliedSuffix.replace('{code}', promoApplied) : t.promoUi.addCode}
            </button>
            {promoOpen && (
              <div style={{marginTop:8}}>
                <div className="nb1-promo-row">
                  <input className="nb1-promo-input" placeholder={t.promoUi.placeholder} value={promoInput} onChange={e => setPromoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} />
                  <button type="button" className="nb1-promo-apply" onClick={applyPromo}>{t.promoUi.apply}</button>
                </div>
                {promoMsg && <div className={`nb1-promo-msg${promoMsg.ok ? ' ok' : ' err'}`}>{promoMsg.text}</div>}
              </div>
            )}

            <div className="nb1-sum-zero">{t.summary.dueToday.replace('{zeroPrice}', zero)}</div>
            <p className="nb1-sum-note">{t.summary.note}</p>

          </div>
          <div className="nb1-sum-secure">
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#0a8fb0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            {t.secured}
          </div>
        </div>
      </div>

      {/* Legal footer */}
      <div className="nb1-det-legal">
        <a href="#">{t.legal.privacy}</a>·<a href="#">{t.legal.terms}</a>·<a href="#">{t.legal.imprint}</a>·<a href="#">{t.legal.gdpr}</a>· {t.legal.copyright}
      </div>
    </div>
  )
}

/* ── Exported wrapper (Elements + Suspense for useSearchParams) ─────── */
export const CheckoutFormClient: React.FC<Props> = (props) => (
  <Elements stripe={stripePromise}>
    <Suspense fallback={null}>
      <CheckoutFormInner {...props} />
    </Suspense>
  </Elements>
)


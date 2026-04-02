/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

type SocialLink = { platform: string; url: string; id?: string | null }

type ContactSectionBlockProps = {
  form?: {
    title?: string | null
    description?: string | null
    formTitle?: string | null
    formDescription?: string | null
    labels?: { firstName?: string | null; lastName?: string | null; email?: string | null; message?: string | null } | null
    placeholders?: { firstName?: string | null; lastName?: string | null; email?: string | null; message?: string | null } | null
    submitLabel?: string | null
    successMessage?: string | null
    errorMessage?: string | null
    recipientEmail?: string | null
  } | null
  info?: {
    title?: string | null
    description?: string | null
    phone?: string | null
    phoneLabel?: string | null
    email?: string | null
    emailLabel?: string | null
    address?: string | null
    addressLabel?: string | null
    hours?: string | null
    hoursLabel?: string | null
    socialLinks?: SocialLink[] | null
    socialsLabel?: string | null
    backgroundImage?: { url?: string | null } | number | null
  } | null
}
import React, { useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import '../contact-template.css'

export const ContactSectionBlock: React.FC<ContactSectionBlockProps> = (props) => {
  const { form, info } = props

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Required'
    if (!formData.email.trim()) {
      newErrors.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Required'
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsLoading(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recipientEmail: form?.recipientEmail }),
      })
      if (!res.ok) throw new Error('Server error')
      setHasSubmitted(true)
    } catch {
      setSubmitError(form?.errorMessage || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const bgUrl =
    info?.backgroundImage && typeof info.backgroundImage === 'object'
      ? getMediaUrl((info.backgroundImage as any).url)
      : null

  const hasInfoItems = info?.phone || info?.email || info?.address || info?.hours
  const hasSocials = info?.socialLinks && info.socialLinks.length > 0

  return (
    <div className="ct-wrapper">

      {/* ── Row 1: Introduction (title left, description right) ── */}
      {(form?.title || form?.description) && (
        <div className="ct-row" style={{ marginBottom: '40px' }}>
          <div className="ct-col ct-col--intro">
            {form.title && <h2 className="ct-title">{form.title}</h2>}
          </div>
          <div className="ct-col">
            {form.description && <p className="ct-description" style={{ marginBottom: 0 }}>{form.description}</p>}
          </div>
        </div>
      )}

      {/* ── Row 2: Form (left) + Info card (right) ── */}
      <div className="ct-row">

        {/* Form column */}
        <div className="ct-col">
          <div className="ct-form-card">
            {form?.formTitle && <h3 className="ct-subtitle">{form.formTitle}</h3>}
            {form?.formDescription && (
              <p className="ct-description" style={{ marginBottom: '28px' }}>{form.formDescription}</p>
            )}

            {hasSubmitted ? (
              <div className="ct-status ct-status--success">
                {form?.successMessage || 'Thank you! Your message has been sent.'}
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="cs-firstName">
                      {form?.labels?.firstName || 'First Name'}
                    </label>
                    <input
                      id="cs-firstName"
                      name="firstName"
                      type="text"
                      className={`ct-input${errors.firstName ? ' ct-input--error' : ''}`}
                      placeholder={form?.placeholders?.firstName || 'Enter your first name'}
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                    {errors.firstName && <span className="ct-error-msg">{errors.firstName}</span>}
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="cs-lastName">
                      {form?.labels?.lastName || 'Last Name'}
                    </label>
                    <input
                      id="cs-lastName"
                      name="lastName"
                      type="text"
                      className={`ct-input${errors.lastName ? ' ct-input--error' : ''}`}
                      placeholder={form?.placeholders?.lastName || 'Enter your last name'}
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                    {errors.lastName && <span className="ct-error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label" htmlFor="cs-email">
                    {form?.labels?.email || 'Email'}
                  </label>
                  <input
                    id="cs-email"
                    name="email"
                    type="email"
                    className={`ct-input${errors.email ? ' ct-input--error' : ''}`}
                    placeholder={form?.placeholders?.email || 'Enter your email address'}
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <span className="ct-error-msg">{errors.email}</span>}
                </div>

                <div className="ct-field">
                  <label className="ct-label" htmlFor="cs-message">
                    {form?.labels?.message || 'Message'}
                  </label>
                  <textarea
                    id="cs-message"
                    name="message"
                    className={`ct-input ct-input--textarea${errors.message ? ' ct-input--error' : ''}`}
                    placeholder={form?.placeholders?.message || 'Write your message here...'}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="ct-error-msg">{errors.message}</span>}
                </div>

                {submitError && <div className="ct-status ct-status--error">{submitError}</div>}

                <button type="submit" className="ct-btn" disabled={isLoading}>
                  {isLoading ? 'Sending...' : (form?.submitLabel || 'Send Message')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info column */}
        <div className="ct-col" style={{ flex: '0 1 420px', minWidth: '280px' }}>
          <div className="ct-info-card">
            {bgUrl && <img src={bgUrl.toString()} alt="" className="ct-info-card__bg" />}

            <div className="ct-info-card__body">
              {info?.title && (
                <h2 className="ct-title ct-title--on-dark" style={{ marginBottom: 0 }}>
                  {info.title}
                </h2>
              )}

              {info?.description && (
                <p className="ct-description" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 0 }}>
                  {info.description}
                </p>
              )}

              {hasInfoItems && (
                <div className="ct-info-items">
                  {info?.phone && (
                    <div className="ct-info-item">
                      <svg className="ct-info-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,194,224,1)' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
                      </svg>
                      <div className="ct-info-item__content">
                        <span className="ct-info-item__label">{info?.phoneLabel || 'Phone'}</span>
                        <span className="ct-info-item__value"><a href={`tel:${info.phone}`}>{info.phone}</a></span>
                      </div>
                    </div>
                  )}

                  {info?.email && (
                    <div className="ct-info-item">
                      <svg className="ct-info-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,194,224,1)' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <div className="ct-info-item__content">
                        <span className="ct-info-item__label">{info?.emailLabel || 'Email'}</span>
                        <span className="ct-info-item__value"><a href={`mailto:${info.email}`}>{info.email}</a></span>
                      </div>
                    </div>
                  )}

                  {info?.address && (
                    <div className="ct-info-item">
                      <svg className="ct-info-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,194,224,1)' }}>
                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div className="ct-info-item__content">
                        <span className="ct-info-item__label">{info?.addressLabel || 'Address'}</span>
                        <span className="ct-info-item__value" style={{ whiteSpace: 'pre-line' }}>{info.address}</span>
                      </div>
                    </div>
                  )}

                  {info?.hours && (
                    <div className="ct-info-item">
                      <svg className="ct-info-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,194,224,1)' }}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div className="ct-info-item__content">
                        <span className="ct-info-item__label">{info?.hoursLabel || 'Business Hours'}</span>
                        <span className="ct-info-item__value">{info.hours}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {hasSocials && (
                <>
                  <div className="ct-divider" />
                  <div className="ct-socials">
                    <span className="ct-socials__label">{info?.socialsLabel || 'Follow Us'}</span>
                    <div className="ct-socials__links">
                      {info!.socialLinks!.map((link: SocialLink, index: number) => (
                        <a
                          key={index}
                          href={link.url}
                          className="ct-social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

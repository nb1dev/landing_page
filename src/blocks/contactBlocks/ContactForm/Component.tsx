'use client'

type ContactFormBlockProps = {
  title?: string | null
  description?: string | null
  formTitle?: string | null
  formDescription?: string | null
  labels?: {
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    message?: string | null
  } | null
  placeholders?: {
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    message?: string | null
  } | null
  submitLabel?: string | null
  successMessage?: string | null
  errorMessage?: string | null
  recipientEmail?: string | null
}

import React, { useState } from 'react'
import '../contact-template.css'

export const ContactFormBlock: React.FC<ContactFormBlockProps> = (props) => {
  const {
    title,
    description,
    formTitle,
    formDescription,
    labels,
    placeholders,
    submitLabel,
    successMessage,
    errorMessage,
    recipientEmail,
  } = props

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
        body: JSON.stringify({ ...formData, recipientEmail }),
      })
      if (!res.ok) throw new Error('Server error')
      setHasSubmitted(true)
    } catch {
      setSubmitError(errorMessage || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const hasIntro = Boolean(title || description)

  const formFields = (
    <>
      {formTitle && <h3 className="ct-subtitle">{formTitle}</h3>}
      {formDescription && (
        <p className="ct-description" style={{ marginBottom: '28px' }}>
          {formDescription}
        </p>
      )}

      {hasSubmitted ? (
        <div className="ct-status ct-status--success">
          {successMessage || 'Thank you! Your message has been sent.'}
        </div>
      ) : (
        <form className="ct-form" onSubmit={handleSubmit} noValidate>
          <div className="ct-form-row">
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-firstName">
                {labels?.firstName || 'First Name'}
              </label>
              <input
                id="ct-firstName"
                name="firstName"
                type="text"
                className={`ct-input${errors.firstName ? ' ct-input--error' : ''}`}
                placeholder={placeholders?.firstName || 'Enter your first name'}
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
              {errors.firstName && <span className="ct-error-msg">{errors.firstName}</span>}
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-lastName">
                {labels?.lastName || 'Last Name'}
              </label>
              <input
                id="ct-lastName"
                name="lastName"
                type="text"
                className={`ct-input${errors.lastName ? ' ct-input--error' : ''}`}
                placeholder={placeholders?.lastName || 'Enter your last name'}
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
              {errors.lastName && <span className="ct-error-msg">{errors.lastName}</span>}
            </div>
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="ct-email">
              {labels?.email || 'Email'}
            </label>
            <input
              id="ct-email"
              name="email"
              type="email"
              className={`ct-input${errors.email ? ' ct-input--error' : ''}`}
              placeholder={placeholders?.email || 'Enter your email address'}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="ct-error-msg">{errors.email}</span>}
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="ct-message">
              {labels?.message || 'Message'}
            </label>
            <textarea
              id="ct-message"
              name="message"
              className={`ct-input ct-input--textarea${errors.message ? ' ct-input--error' : ''}`}
              placeholder={placeholders?.message || 'Write your message here...'}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="ct-error-msg">{errors.message}</span>}
          </div>

          {submitError && <div className="ct-status ct-status--error">{submitError}</div>}

          <button type="submit" className="ct-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : submitLabel || 'Send Message'}
          </button>
        </form>
      )}
    </>
  )

  return (
    <div className="ct-wrapper">
      <div className="ct-form-card">
        {hasIntro ? (
          <div className="ct-col">
            <div className="ct-col ct-col--intro">
              {title && <h2 className="ct-title">{title}</h2>}
              {description && <p className="ct-description">{description}</p>}
            </div>
            <div className="ct-col">{formFields}</div>
          </div>
        ) : (
          formFields
        )}
      </div>
    </div>
  )
}

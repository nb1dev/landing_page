/* eslint-disable @next/next/no-img-element */
type ContactInfoBlockProps = {
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
  socialLinks?: { platform: string; url: string; id?: string | null }[] | null
  socialsLabel?: string | null
  backgroundImage?: { url?: string | null } | number | null
}
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import '../contact-template.css'

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = (props) => {
  const {
    title,
    description,
    phone,
    phoneLabel,
    email,
    emailLabel,
    address,
    addressLabel,
    hours,
    hoursLabel,
    socialLinks,
    socialsLabel,
    backgroundImage,
  } = props

  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? getMediaUrl(backgroundImage.url)
      : null

  const hasInfoItems = phone || email || address || hours
  const hasSocials = socialLinks && socialLinks.length > 0

  return (
    <div className="ct-info-card">
      {bgUrl && <img src={bgUrl.toString()} alt="" className="ct-info-card__bg" />}

      <div className="ct-info-card__body">
        {title && (
          <h2 className="ct-title ct-title--on-dark" style={{ marginBottom: 0 }}>
            {title}
          </h2>
        )}

        {description && (
          <p className="ct-description" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 0 }}>
            {description}
          </p>
        )}

        {hasInfoItems && (
          <div className="ct-info-items">
            {phone && (
              <div className="ct-info-item">
                <svg
                  className="ct-info-item__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'rgba(0,194,224,1)' }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
                </svg>
                <div className="ct-info-item__content">
                  <span className="ct-info-item__label">{phoneLabel || 'Phone'}</span>
                  <span className="ct-info-item__value">
                    <a href={`tel:${phone}`}>{phone}</a>
                  </span>
                </div>
              </div>
            )}

            {email && (
              <div className="ct-info-item">
                <svg
                  className="ct-info-item__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'rgba(0,194,224,1)' }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div className="ct-info-item__content">
                  <span className="ct-info-item__label">{emailLabel || 'Email'}</span>
                  <span className="ct-info-item__value">
                    <a href={`mailto:${email}`}>{email}</a>
                  </span>
                </div>
              </div>
            )}

            {address && (
              <div className="ct-info-item">
                <svg
                  className="ct-info-item__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'rgba(0,194,224,1)' }}
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="ct-info-item__content">
                  <span className="ct-info-item__label">{addressLabel || 'Address'}</span>
                  <span className="ct-info-item__value" style={{ whiteSpace: 'pre-line' }}>
                    {address}
                  </span>
                </div>
              </div>
            )}

            {hours && (
              <div className="ct-info-item">
                <svg
                  className="ct-info-item__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'rgba(0,194,224,1)' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div className="ct-info-item__content">
                  <span className="ct-info-item__label">{hoursLabel || 'Business Hours'}</span>
                  <span className="ct-info-item__value">{hours}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {hasSocials && (
          <>
            <div className="ct-divider" />
            <div className="ct-socials">
              <span className="ct-socials__label">{socialsLabel || 'Follow Us'}</span>
              <div className="ct-socials__links">
                {socialLinks.map((link: { platform: string; url: string }, index: number) => (
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
  )
}

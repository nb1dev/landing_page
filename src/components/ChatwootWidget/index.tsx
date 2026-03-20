'use client'

import { useEffect } from 'react'

type ChatwootUser = {
  id: string
  email?: string
  name?: string
  avatar_url?: string
}

type Props = {
  locale?: string
  user?: ChatwootUser | null
}

declare global {
  interface Window {
    chatwootSettings?: {
      hideMessageBubble?: boolean
      position?: 'left' | 'right'
      locale?: string
      type?: 'standard' | 'expanded_bubble'
    }
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void
    }
    $chatwoot?: {
      setUser: (
        identifier: string,
        attributes: {
          email?: string
          name?: string
          avatar_url?: string
        },
      ) => void
      reset?: () => void
    }
    __chatwootInitialized?: boolean
  }
}

export function ChatwootWidget({ locale = 'en', user = null }: Props) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || 'https://app.chatwoot.com'
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN

    console.log(websiteToken)

    if (!websiteToken) {
      console.warn('Chatwoot: missing NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN environment variable.')
      return
    }

    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right',
      locale,
      type: 'standard',
    }

    const runChatwoot = () => {
      if (!window.chatwootSDK || window.__chatwootInitialized) return

      window.chatwootSDK.run({
        websiteToken,
        baseUrl,
      })

      window.__chatwootInitialized = true
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-chatwoot-sdk="true"]',
    )

    if (existingScript) {
      if (window.chatwootSDK) {
        runChatwoot()
      } else {
        existingScript.addEventListener('load', runChatwoot, { once: true })
      }
    } else {
      const script = document.createElement('script')
      script.src = `${baseUrl}/packs/js/sdk.js`
      script.async = true
      script.defer = true
      script.setAttribute('data-chatwoot-sdk', 'true')
      script.addEventListener('load', runChatwoot, { once: true })
      document.head.appendChild(script)
    }

    return () => {
      // No teardown here because this component is intended to live
      // for the whole app lifecycle inside RootLayout.
    }
  }, [locale])

  useEffect(() => {
    const setUserInfo = () => {
      if (!user || !window.$chatwoot) return

      window.$chatwoot.setUser(user.id, {
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      })
    }

    if (window.$chatwoot) {
      setUserInfo()
    } else {
      window.addEventListener('chatwoot:ready', setUserInfo)
      return () => {
        window.removeEventListener('chatwoot:ready', setUserInfo)
      }
    }
  }, [user])

  return null
}

export default ChatwootWidget

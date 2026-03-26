'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'
import '@/styles/article-template.css'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <div className="art-code-wrap">
          <div className="art-code-header">
            <span className="art-code-header__lang">{language || 'code'}</span>
            <CopyButton code={code} />
          </div>
          <pre className="art-code-pre">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ className: 'art-code-line', line })}>
                <span className="art-code-line__num">{i + 1}</span>
                <span className="art-code-line__content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}

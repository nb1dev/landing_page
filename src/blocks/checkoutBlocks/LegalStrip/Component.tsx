import React from 'react'

type Props = {
  links?: Array<{ label?: string | null; url?: string | null }> | null
  copyright?: string | null
}

export const LegalStripComponent: React.FC<Props> = ({ links, copyright }) => {
  return (
    <div className="ls-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {links && links.length > 0 && links.map((link, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="ls-dot">·</span>}
          <a href={link.url || '#'} className="ls-link">{link.label}</a>
        </React.Fragment>
      ))}
      {copyright && (
        <>
          {links && links.length > 0 && <span className="ls-dot">·</span>}
          <span>{copyright}</span>
        </>
      )}
    </div>
  )
}

const CSS = `
  .ls-wrap {
    text-align: center;
    font-size: 12px;
    color: rgba(18,49,77,.40);
    padding: 28px 24px 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px 8px;
  }
  .ls-link {
    color: rgba(18,49,77,.40);
    text-decoration: none;
    transition: color .15s;
  }
  .ls-link:hover { color: #12314D; }
  .ls-dot { color: rgba(18,49,77,.25); }
`

'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import siteMetadata from '@/data/siteMetadata'

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void }
  }
}

let widget: Promise<void> | undefined

// Loads Calendly's popup script on first use rather than on every page view.
// A failed load clears the cache so the next click can try again.
function loadWidget(): Promise<void> {
  if (window.Calendly) return Promise.resolve()
  widget ??= new Promise<void>((resolve, reject) => {
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = WIDGET_CSS
    document.head.appendChild(style)

    const script = document.createElement('script')
    script.src = WIDGET_JS
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      script.remove()
      widget = undefined
      reject(new Error('Calendly widget failed to load'))
    }
    document.body.appendChild(script)
  })
  return widget
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  url?: string
}

// A booking link that opens Calendly in a popup over the page. It stays a real
// link, so without JavaScript it opens Calendly in a new tab, and modified
// clicks (cmd, ctrl, middle) still do. If the widget can't load, the click
// falls back to navigating there, since a delayed window.open gets blocked.
export default function CalendlyLink({ url = siteMetadata.calendly, children, ...rest }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    loadWidget()
      .then(() => window.Calendly?.initPopupWidget({ url }))
      .catch(() => window.location.assign(url))
  }

  return (
    <a
      {...rest}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onPointerEnter={() => void loadWidget().catch(() => {})}
      onFocus={() => void loadWidget().catch(() => {})}
    >
      {children}
    </a>
  )
}

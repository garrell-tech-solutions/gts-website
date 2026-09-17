'use client'

import { useRef, useState, type ReactNode } from 'react'

// Replaces pliny's Pre, whose copy button only appeared on mouse hover.
const Pre = ({ children }: { children?: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    const pre = containerRef.current?.querySelector('pre')
    if (!pre) return
    navigator.clipboard.writeText(pre.textContent ?? '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={containerRef} className="group relative">
      <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy code'}
        onClick={onCopy}
        className={`absolute top-2 right-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 dark:bg-gray-800 ${
          copied ? 'border-green-400' : 'border-gray-300'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          aria-hidden="true"
          className={copied ? 'text-green-400' : 'text-gray-300'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              copied
                ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            }
          />
        </svg>
      </button>
      {/* A focusable scroll region lets keyboard users scroll long lines of code (WCAG 2.1.1). */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <pre tabIndex={0}>{children}</pre>
    </div>
  )
}

export default Pre

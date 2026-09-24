'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { TIMELINES, type InquiryForm, type InquiryOutcome } from '@/data/inquiry'

type Status = 'idle' | 'sending' | InquiryOutcome

// Posts to this site's own /api/inquiry, which forwards to the backend. The
// browser never learns where the backend is or how requests to it are signed.
async function sendInquiry(form: InquiryForm): Promise<InquiryOutcome> {
  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form),
    })
    const { outcome } = (await response.json()) as { outcome?: InquiryOutcome }
    return outcome ?? 'failed'
  } catch {
    return 'failed'
  }
}

const LABEL = 'text-[15px] font-semibold text-gray-900 dark:text-gray-100'
const CONTROL =
  'mt-2 block w-full rounded-md border-gray-400 bg-white text-base text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100'
const LINK = 'text-primary-800 dark:text-primary-300 font-semibold underline'

function ContactFallback() {
  return (
    <>
      Call{' '}
      <a href={`tel:${siteMetadata.phoneE164}`} className={`${LINK} whitespace-nowrap`}>
        {siteMetadata.phone}
      </a>{' '}
      or email{' '}
      <a href={`mailto:${siteMetadata.email}`} className={LINK}>
        {siteMetadata.email}
      </a>
      .
    </>
  )
}

// Laid over the form in the same grid cell, so the box keeps the form's height.
function Sent() {
  return (
    <div
      role="status"
      className="bg-mint border-t-gold col-start-1 row-start-1 flex flex-col items-center justify-center gap-5 rounded-xl border-t-4 p-8 text-center sm:p-10 dark:bg-gray-900"
    >
      <span className="bg-primary-800 flex h-16 w-16 items-center justify-center rounded-full text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-8 w-8"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </span>
      <p className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
        Thanks, I have it.
      </p>
      <p className="max-w-md text-xl text-balance text-gray-700 dark:text-gray-300">
        I&rsquo;ll read it myself and get back to you with next steps. Need me sooner?{' '}
        <ContactFallback />
      </p>
    </div>
  )
}

export default function LeadForm({ consultUrl }: { consultUrl: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const shownAt = useRef<number | null>(null)

  useEffect(() => {
    shownAt.current = Date.now()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '')
    setStatus('sending')
    setStatus(
      await sendInquiry({
        name: field('name'),
        email: field('email'),
        company: field('company'),
        timeline: field('timeline'),
        need: field('need'),
        referrer: document.referrer,
        landingPath: window.location.pathname,
        timeOnFormMs: shownAt.current === null ? null : Date.now() - shownAt.current,
        website: field('website'),
      })
    )
  }

  const sending = status === 'sending'
  const delivered = status === 'delivered'

  return (
    <div className="grid">
      <form
        onSubmit={onSubmit}
        inert={delivered}
        className={`col-start-1 row-start-1 flex flex-col gap-5 rounded-xl border border-gray-300 bg-white p-5 sm:p-10 dark:border-gray-700 dark:bg-gray-950 ${delivered ? 'invisible' : ''}`}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={LABEL}>
            Name
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={300}
              className={`${CONTROL} h-12`}
            />
          </label>
          <label className={LABEL}>
            Work email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={300}
              className={`${CONTROL} h-12`}
            />
          </label>
          <label className={LABEL}>
            Company
            <input
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={300}
              className={`${CONTROL} h-12`}
            />
          </label>
          <label className={LABEL}>
            When do you need it?
            <select name="timeline" className={`${CONTROL} h-12`}>
              {TIMELINES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <label className={LABEL}>
          What are you trying to build or fix?
          <textarea
            name="need"
            rows={5}
            required
            maxLength={5000}
            className={`${CONTROL} resize-y`}
          />
        </label>
        {/* Hidden from people and from assistive tech; only a bot fills it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="bg-gold text-primary-900 hover:bg-gold/90 mt-2 h-14 rounded-md text-lg font-bold transition-colors duration-200 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? 'Sending…' : 'Send my project details'}
        </button>
        <p role="status" className="text-center text-sm text-gray-600 dark:text-gray-400">
          {status === 'failed' ? (
            <>
              That didn&rsquo;t go through, sorry. <ContactFallback />
            </>
          ) : status === 'missing_fields' ? (
            'Please add your name, a valid email, and what you need built.'
          ) : (
            <>
              Prefer to pick a time?{' '}
              <a href={consultUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                Book the 30-min call directly
              </a>
              .
            </>
          )}
        </p>
      </form>
      {delivered && <Sent />}
    </div>
  )
}

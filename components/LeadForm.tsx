'use client'

import { useState, type FormEvent } from 'react'
import siteMetadata from '@/data/siteMetadata'

type Lead = {
  name: string
  email: string
  company: string
  timeline: string
  need: string
}

const TIMELINES = ['Within a month', '1 to 3 months', '3 months or more', 'Just exploring']

// For now a submission opens the visitor's email app with the details filled in.
// The form is being wired to the backend in a follow-up
// (docs/plans/2026-09-24-gts-inquiry-backend.md); only this function changes.
function submitLead(lead: Lead) {
  const subject = `Project inquiry from ${lead.name}${lead.company ? `, ${lead.company}` : ''}`
  const body = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || 'Not given'}`,
    `Timeline: ${lead.timeline}`,
    '',
    lead.need,
  ].join('\n')
  window.location.href = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const LABEL = 'text-[15px] font-semibold text-gray-900 dark:text-gray-100'
const CONTROL =
  'mt-2 block w-full rounded-md border-gray-400 bg-white text-base text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100'
const LINK = 'text-primary-800 dark:text-primary-300 font-semibold underline'

export default function LeadForm({ consultUrl }: { consultUrl: string }) {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '')
    submitLead({
      name: field('name'),
      email: field('email'),
      company: field('company'),
      timeline: field('timeline'),
      need: field('need'),
    })
    setSent(true)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-xl border border-gray-300 bg-white p-5 sm:p-10 dark:border-gray-700 dark:bg-gray-950"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className={LABEL}>
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
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
            className={`${CONTROL} h-12`}
          />
        </label>
        <label className={LABEL}>
          Company
          <input
            name="company"
            type="text"
            autoComplete="organization"
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
        <textarea name="need" rows={5} required className={`${CONTROL} resize-y`} />
      </label>
      <button
        type="submit"
        className="bg-gold text-primary-900 hover:bg-gold/90 mt-2 h-14 rounded-md text-lg font-bold transition-colors duration-200"
      >
        Send my project details
      </button>
      <p role="status" className="text-center text-sm text-gray-600 dark:text-gray-400">
        {sent ? (
          <>
            Your email app should open with your details filled in. If it didn&rsquo;t, call{' '}
            <a href={`tel:${siteMetadata.phoneE164}`} className={LINK}>
              {siteMetadata.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${siteMetadata.email}`} className={LINK}>
              {siteMetadata.email}
            </a>
            .
          </>
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
  )
}

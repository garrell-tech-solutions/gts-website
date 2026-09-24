// Shared by the lead form (components/LeadForm.tsx) and the route it posts to
// (app/api/inquiry/route.ts), so the server accepts exactly what the form offers.

export const TIMELINES = ['Within a month', '1 to 3 months', '3 months or more', 'Just exploring']

// The backend's answer, passed through unchanged. Nothing else about the backend
// ever reaches the browser.
export type InquiryOutcome = 'delivered' | 'failed' | 'missing_fields'

export const OUTCOMES: readonly InquiryOutcome[] = ['delivered', 'failed', 'missing_fields']

// What the form sends. The server cleans every field before it goes anywhere.
export interface InquiryForm {
  name: string
  email: string
  company: string
  timeline: string
  need: string
  referrer: string
  landingPath: string
  timeOnFormMs: number | null
  // The honeypot: hidden from people, so anything in it came from a bot.
  website: string
}

import 'server-only'
import { NextResponse } from 'next/server'
import { sealEnvelope } from 'lib/edge-envelope'
import { OUTCOMES, TIMELINES, type InquiryOutcome } from '@/data/inquiry'

// POST /api/inquiry: the homepage lead form, forwarded to the Supabase backend's
// `gts-inquiry` route (docs/plans/2026-09-24-gts-inquiry-backend.md).
//
// This repo is public, so everything that identifies the backend stays in
// Vercel's server-side environment: BACKEND_URL and GTS_EDGE_SECRET, both
// Production only (a preview must never write to the real table). The browser
// gets back one word, the outcome, and never an error from upstream.

export const dynamic = 'force-dynamic'

const SITE = 'gts'
const ROUTE = 'gts-inquiry'

// Long enough for a cold start plus its insert and email, short enough not to strand a visitor.
const TIMEOUT_MS = 8000

const MAX_FIELD = 300
const MAX_NEED = 5000

const NEWLINE = 10

// Every control character becomes a space, except a newline when it is kept.
function withoutControls(value: string, keepNewlines: boolean): string {
  return Array.from(value, (char) => {
    const code = char.charCodeAt(0)
    const isControl = code < 32 || code === 127
    return isControl && !(keepNewlines && code === NEWLINE) ? ' ' : char
  }).join('')
}

// Fields that sit on one line: control characters and runs of whitespace
// collapse, so a pasted CR/LF can't reach an email subject.
function oneLine(value: unknown, limit = MAX_FIELD): string {
  if (typeof value !== 'string') return ''
  return withoutControls(value, false).replace(/\s+/g, ' ').trim().slice(0, limit)
}

// The one free-text field keeps its line breaks and nothing else unprintable.
function paragraph(value: unknown): string {
  if (typeof value !== 'string') return ''
  return withoutControls(value.replace(/\r\n?/g, '\n'), true).trim().slice(0, MAX_NEED)
}

function timeOnForm(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : null
}

function answer(outcome: InquiryOutcome, status = 200) {
  return NextResponse.json({ outcome }, { status })
}

async function forward(body: string): Promise<InquiryOutcome> {
  const backendUrl = process.env.BACKEND_URL
  const secret = process.env.GTS_EDGE_SECRET
  if (!backendUrl || !secret) {
    console.error('[inquiry] BACKEND_URL or GTS_EDGE_SECRET is not set')
    return 'failed'
  }
  // No visitor IP: nothing downstream throttles or stores it, so it isn't sent.
  const headers = await sealEnvelope(
    { site: SITE, clientIp: '', route: ROUTE, body },
    secret,
    Date.now()
  )
  headers.set('content-type', 'application/json')
  try {
    const response = await fetch(`${backendUrl}/functions/v1/api/${ROUTE}`, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) {
      console.error('[inquiry] backend answered', response.status)
      return 'failed'
    }
    const { outcome } = (await response.json()) as { outcome?: unknown }
    return OUTCOMES.includes(outcome as InquiryOutcome) ? (outcome as InquiryOutcome) : 'failed'
  } catch (error) {
    console.error('[inquiry] backend unreachable', error instanceof Error ? error.message : error)
    return 'failed'
  }
}

export async function POST(request: Request) {
  let form: Record<string, unknown>
  try {
    const parsed: unknown = await request.json()
    if (typeof parsed !== 'object' || parsed === null) return answer('missing_fields', 400)
    form = parsed as Record<string, unknown>
  } catch {
    return answer('missing_fields', 400)
  }

  // A bot filled the hidden field: tell it all went well and send nothing.
  if (oneLine(form.website)) return answer('delivered')

  const timeline = oneLine(form.timeline)
  const inquiry = {
    name: oneLine(form.name),
    email: oneLine(form.email),
    company: oneLine(form.company),
    timeline: TIMELINES.includes(timeline) ? timeline : '',
    need: paragraph(form.need),
    receivedAt: new Date().toISOString(),
    referrer: oneLine(form.referrer, 500),
    landingPath: oneLine(form.landingPath, 200),
    timeOnFormMs: timeOnForm(form.timeOnFormMs),
  }
  if (!inquiry.name || !inquiry.need || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return answer('missing_fields', 400)
  }

  return answer(await forward(JSON.stringify(inquiry)))
}

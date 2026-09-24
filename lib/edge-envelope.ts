import 'server-only'

// Seals a request for the Supabase backend's `api` function, the way its
// Cloudflare edges do. A copy of sealEnvelope from laundry-mat-template's
// template/backend/infrastructure/edge-envelope.ts, which is what verifies it:
// HMAC-SHA256 over the time, the route, the site, the client IP and the exact
// body, one per line. Change one and the other refuses every request.
//
// The format is public; the key is not. GTS_EDGE_SECRET lives only in Vercel's
// server-side environment, and `server-only` fails the build if this module is
// ever pulled into client code.

export interface EnvelopeInput {
  readonly site: string
  readonly clientIp: string
  readonly route: string
  readonly body: string
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return Array.from(new Uint8Array(mac), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function sealEnvelope(
  input: EnvelopeInput,
  secret: string,
  nowMs: number
): Promise<Headers> {
  const issuedAt = String(nowMs)
  const payload = [issuedAt, input.route, input.site, input.clientIp, input.body].join('\n')
  return new Headers({
    'x-gts-site': input.site,
    'x-gts-client-ip': input.clientIp,
    'x-gts-issued-at': issuedAt,
    'x-gts-signature': await hmacHex(secret, payload),
  })
}

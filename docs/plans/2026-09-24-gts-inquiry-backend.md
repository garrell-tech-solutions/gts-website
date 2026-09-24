# GTS inquiries through the Supabase backend

The homepage lead form (app/page.tsx, components/LeadForm.tsx) sends each inquiry to
the Supabase backend in `laundry-mat-template`, where it is stored and emailed to
Jeremy. Decided 2026-09-24.

## Decisions

- **Its own schema, not a store.** `gts.inquiries`, a `gts-inquiry` route and its own
  use case, following `api/demo-request` (the agency's own inbound, "deliberately not
  a lead"). `backend.leads` is shaped for laundromat pickups (phone, address and
  window are required) and feeds per-store SMS, the unreached-lead job and client
  reports, none of which should see GTS.
- **The GTS site is its own edge.** garrellts.com is served by Vercel, so a Next.js
  Route Handler seals the envelope and forwards it. No hosting move.
- **A separate signing secret.** `GTS_EDGE_SECRET` is accepted only on `gts-inquiry`,
  and only from site `gts`. The fleet-wide `EDGE_SHARED_SECRET` is refused there, and
  the GTS secret is refused everywhere else, so a leak from Vercel can only file fake
  GTS inquiries.
- **Nothing reaches the public repo or the browser.** The browser posts to
  `/api/inquiry` on garrellts.com. `BACKEND_URL` and `GTS_EDGE_SECRET` are Vercel
  server-side env vars (never `NEXT_PUBLIC_`), the route module is `server-only`, and
  the response is only `{ outcome }`. Backend errors are logged on Vercel, never
  returned.

## Backend: laundry-mat-template (branch `feat/gts-inquiry`)

1. **Migration** `template/supabase/migrations/20260927000000_gts_inquiries.sql`:
   `create schema gts`, revoke all from `public, anon, authenticated`, table
   `gts.inquiries` (id, received_at, name, email, company, timeline, need, referrer,
   landing_path, time_on_form_ms), an index on `received_at`, RLS on with no policies.
   `gts` stays off `config.toml`'s `[api] schemas`.
2. **Ports**: `GtsInquiry`, `GtsInquiryLog`, `GtsInquiryAlert` in
   `backend/application/ports.ts`.
3. **Use case** `backend/application/submit-gts-inquiry.ts`: name, email and need are
   required. The row and the email settle independently, as in `submitDemoRequest`.
4. **Email**: `backend/application/gts-inquiry-message.ts` and
   `backend/infrastructure/notify/gts-inquiry-email.ts` (to `GTS_INQUIRY_TO_EMAIL`;
   an unset value refuses loudly).
5. **SQL**: `insertGtsInquirySql` in `postgres/translate.ts` and `gtsInquiries` in
   `postgres/ports.ts`.
6. **Route and secret**: the router picks the secret by route (`gts-inquiry` uses
   `gtsEdgeSecret`, everything else uses `edgeSecret`). The handler also refuses any
   site claim other than `gts`.
7. **Compose**: `GTS_EDGE_SECRET` and `GTS_INQUIRY_TO_EMAIL`.
8. **Docs**: both secrets in `docs/secrets-inventory.md`.

Tests sit beside their demo-request counterparts in `template/tests/backend/`, plus
router tests for the cross-secret refusals.

## Site: gts-website (branch `feature/landing-page`)

9. `lib/edge-envelope.ts`: `sealEnvelope`, copied from the backend's, `server-only`.
10. `app/api/inquiry/route.ts`: POST JSON, a honeypot, field cleaning and caps, seal
    for site `gts` and route `gts-inquiry`, forward with an 8-second timeout, and
    answer `{ outcome }` only.
11. `components/LeadForm.tsx`: post to `/api/inquiry`, with sending, sent and failed
    states. On failure it shows the phone number and email.
12. **Verify**: seal on the site side, open with the backend's `openEnvelope`, then
    search the client bundle and the committed files for the backend host, the secret
    names and anything key-shaped.

## Jeremy's steps (outward-facing, not done by Claude)

- Generate the secret: `openssl rand -hex 32`.
- Supabase: apply the migration, deploy the `api` function, and set `GTS_EDGE_SECRET`
  and `GTS_INQUIRY_TO_EMAIL`.
- Vercel, **Production only**, both marked Sensitive: `BACKEND_URL` (the Supabase
  project URL, no trailing slash) and `GTS_EDGE_SECRET`. Preview stays unset: the
  backend's rule is that a preview never writes to the production table, so a preview
  form answers "failed" and shows the phone number and email. Redeploy afterwards.
- Review and merge both branches.

## Side effect

A POST Route Handler can't be statically exported, so an `EXPORT=1` build of the site
no longer works. Nothing uses it: the GitHub Pages workflow triggers on `main`, which
this repo doesn't have, and the live site builds on Vercel.

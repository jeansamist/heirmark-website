# HeirMark inquiry email activation

Combined Google Workspace SMTP and Cloudflare Turnstile release. Deployment is authorized only after combined local checks pass. No environment, DNS, or Stripe settings are changed by this implementation.

## Existing implementation reused
Nodemailer and React Email dependencies; lib/email.tsx; Contact and Booking templates and Route Handlers; three existing form validators; existing form fields, CSS, and Speaking two-step navigation. Partnerships now uses the same service. Removed the hardcoded inquiry recipient. The obsolete contact component under components/contact is not mounted by any route and was left untouched.

## Routes and mail flow
GET /api/contact, /api/booking, /api/partnership return only {ready:boolean}, with no-store. Readiness requires valid server-side configuration and successful SMTP verify (connection/TLS/authentication). A 60-second per-instance cache limits repeated verification; it is NOT a rate limiter. Reload a page after correcting configuration or recovering from an unavailable readiness check.

POST to the same endpoints validates the existing fields, rejects invalid requests, renders escaped HTML and plain text, and sends with the Workspace account as sender and the validated visitor address as replyTo. All inquiries go to CONTACT_RECIPIENT_EMAIL. Success is returned only when Nodemailer reports that recipient accepted by SMTP. This does not prove inbox delivery or prevent later bounces. No submissions are stored.

## Required server-only environment variables
SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_APP_PASSWORD, CONTACT_RECIPIENT_EMAIL.
All five are absent from this local environment. Vercel values were not inspected or modified. No live SMTP email was sent. Do not paste credentials into chat or commit .env files.
465 uses implicit TLS; 587 requires STARTTLS. Certificates are verified and TLS 1.2 is the minimum. Connection/greeting timeouts are 10 seconds; socket timeout is 15 seconds. Browser submission timeout is 55 seconds; route maximum is 60 seconds.
Existing order confirmation uses its existing SMTP_PASS/SMTP_FROM/SMTP_SECURE configuration. Its recipient and checkout flow remain unchanged. Shared transport hardening and accepted-recipient checks also apply to it.

## Security controls
Strict field types, enum/required/consent validation, per-field lengths, 32KiB streamed request limit, email syntax and CRLF/control-character validation, fixed subjects, same-origin check when Origin is present, JSON-only requests, hidden honeypot, server-only email module, React-escaped HTML, plain-text alternative, disabled remote/file content loading, no raw SMTP diagnostics or payload logging. Client locks prevent simultaneous submissions and repeat submission after a successful response in the current mounted form. Failed submissions remain retryable.

## Required production infrastructure: durable rate limiting
No durable rate limiter exists in this repository, and none was silently provisioned. Configure Vercel WAF rate limiting before activating public delivery. Suggested starting policy: combined POST paths /api/contact, /api/booking and /api/partnership, keyed by client IP, 5 requests per 10 minutes; tune for shared networks and legitimate traffic. Also protect GET readiness endpoints (e.g. 30 requests/minute/IP). Confirm available plan/features and test enforcement on the actual project. Honeypots and origin checks are not substitutes for this control. There is no in-memory rate-limit claim.
Vercel documentation: https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
SMTP documentation: https://nodemailer.com/smtp

A browser timeout can occur after SMTP accepts a message. A subsequent manual retry may duplicate it. There is no cross-instance idempotency store or exactly-once guarantee. Do not describe this implementation as durable duplicate suppression.

## Local validation
- TypeScript: pass, tsc --noEmit --incremental false.
- ESLint: no errors; one pre-existing unused defaultDescription warning in components/contact/ContactSection.tsx.
- Production build: pass; initial sandbox font-fetch failure resolved by allowing network access to existing Google Fonts.
- 28 mocked server checks: all pass (all forms, required fields, invalid email, header injection, controls/limits, honeypot/types, escaped HTML/plain text, TLS modes, invalid port, consent, malformed JSON, origin/content type, oversized stream, rejection/unaccepted recipient, SMTP verify failure).
- Three browser suites: duplicate-submit lock, failure state, retained input, retry, acceptance-only success; Speaking back/edit preserves values.
- Contact, Speaking, Partnerships at 320/390/768/1440px: no horizontal overflow. Existing CSS/layout unchanged. Screenshots saved outside the source repository under outputs/email-integration.
- Tests use synthetic example.com values and mocked SMTP/responses, never real personal data or credentials.

Re-run from workspace root: node outputs/email-integration/server-tests.cjs. Browser tests require built local site on port 3002: node outputs/email-integration/browser-tests.cjs.

## Controlled activation checklist
1. Review this uncommitted diff and confirm the existing production environment contains the five required names with correct values.
2. Configure and verify durable WAF rules. Do not enable unrestricted public SMTP endpoints without them.
3. With explicit deployment approval, deploy the reviewed changes; this task did not commit, push, or deploy.
4. Perform authorized live tests of all three forms using a controlled mailbox; confirm SMTP acceptance, actual recipient inbox/spam receipt, replyTo, and complete field labels. Verify Google Workspace allows the configured app password/account to send.
5. Exercise delivery failure and retry, then confirm production readiness and rate-limit enforcement. SMTP verify alone cannot establish inbox deliverability.

## Files changed
Modified: .env.example; lib/email.tsx; lib/contact-validation.ts; lib/booking-validation.ts; lib/partnership-validation.ts; app/api/contact/route.ts; app/api/booking/route.ts; app/contact/ContactPageForm.tsx; app/speaking/SpeakingForm.tsx; app/partnerships/InquiryForm.tsx; emails/shared.tsx (correct existing logo path).
Added: lib/inquiry-validation.ts; lib/inquiry-handler.ts; app/api/partnership/route.ts; components/useInquiry.ts; components/InquiryHoneypot.tsx; emails/PartnershipInquiryEmail.tsx; docs/email-backend.md.
External local validation artifacts: outputs/email-integration/server-tests.cjs, browser-tests.cjs, screenshots.cjs, browser-results.json, and screenshots. These are not production source files. Existing untracked docs were preserved.


## Turnstile combined release
Server-only TURNSTILE_SECRET_KEY and build-time NEXT_PUBLIC_TURNSTILE_SITE_KEY are required. Production builds must use the real public key already configured in Vercel. Local browser automation uses an official dummy public key and intercepted widget responses; no test keys are committed. Configure the widget for the canonical website hostname; preview hostnames require Cloudflare widget allowlisting too.

The shared widget loads the official Cloudflare script once, renders explicitly, uses compact size to fit narrow forms, handles script failure with a retry button, clears expired tokens, and refreshes after every submission attempt. Speaking shows verification only on step 2 and clears it when changing steps. Client submission locks are retained.

The existing inquiry handler validates fields and honeypot, then POSTs the token to Cloudflare Siteverify with an 8-second timeout before touching SMTP. It requires success=true, the expected form action, and a matching allowlisted hostname. Missing/oversized/invalid tokens, malformed responses, outages, and hostname/action mismatches fail closed. Cloudflare enforces token expiry and single use; the server does not cache successful verifications. No tokens or secrets are logged. Turnstile is bot protection, not a durable per-IP rate limiter; the WAF limitation above still applies.

Reference: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
New production files: lib/turnstile.ts, components/InquiryTurnstile.tsx. Extended files: shared inquiry handler/hook and all three existing forms. All previous email implementation files are included in the same reviewed release. Existing unrelated documents and .env.example remain local and unstaged.

Live verification must check widget rendering, GET readiness and rejection of missing/invalid tokens. Actual delivery remains unconfirmed until a human submits a valid inquiry and verifies receipt in CONTACT_RECIPIENT_EMAIL. Use an authorized test sender, submit one clearly labeled test per form, inspect inbox/spam and reply-to, and do not infer receipt from the SMTP-accepted screen.

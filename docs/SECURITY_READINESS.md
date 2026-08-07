# Security Readiness

Evidence date: 2026-08-07.

## 1. Framework/dependency security state

Next.js 15.5.21, React 19.2.8, and the existing lockfile are in use. The
dependency audit reported no known vulnerabilities. No broad dependency upgrade
was made in Phase 4.

## 2. Security headers before and after

Before Phase 4, next.config.js had no response-header policy. After Phase 4:

- Enforced CSP clickjacking directive: frame-ancestors none
- CSP full policy: report-only
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin
- restrictive Permissions-Policy
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Resource-Policy: same-origin

HSTS is intentionally deferred because local validation runs over HTTP and the
production HTTPS/domain boundary is not yet connected. No includeSubDomains or
preload directive is used.

## 3. CSP design and status

Status: report-only for the broad policy, with enforced frame-ancestors.

The policy permits only same-origin defaults, scripts, connections, media,
fonts, workers, and images. data: is allowed only for images. Inline styles
remain allowed for current framework/style behavior; unsafe-eval is absent.
The policy is report-only until browser and production-preview validation
confirms that Next.js runtime behavior does not require a different nonce/hash
strategy.

## 4. Environment-variable assessment

Application source has no process.env reads and no NEXT_PUBLIC_ use. The
project example contains only blank names: NEXT_PUBLIC_SITE_URL,
CONTACT_RECIPIENT_EMAIL, and future server-only BREVO_API_KEY.

## 5. Secret-exposure assessment

No real secret, API key, private key, or token was found in tracked source or
documentation. Future Brevo credentials remain a server-only operational
value and are not implemented.

## 6. Client-side attack-surface assessment

No dangerous HTML rendering, dynamic script injection, untrusted URL
construction, open redirect, external target link, query-string rendering, or
user input surface was found. The only client component is the local-state
mobile navigation.

## 7. Logging assessment

The application has no application logging code and no current input endpoint.
Future contact handling must not log secrets, complete message content, email
headers, or unnecessary personal data. Errors shown to visitors must remain
generic and must not expose stack traces.

## 8. Contact-form security requirements

The endpoint remains unimplemented. Required controls are documented in
docs/THREAT_MODEL.md: schema and length validation, body-size limits,
honeypot, rate limiting, generic errors, no uploads/database, safe Brevo
construction, validated Reply-To, operator-controlled From, and minimal logs.

## 9. Hosting-dependent security controls

HTTPS/HSTS, Netlify access control, deploy-preview privacy, build/runtime secret
separation, provider logs, DPA terms, processing regions, and rollback access
remain outside this provider-independent phase.

## 10. Remaining blockers

- Netlify security and DPA review
- Production-only HSTS configuration after HTTPS/domain authorization
- CSP enforcement review on a real preview
- Future contact endpoint threat-control implementation
- Font licensing confirmation

## 11. Rollback instructions

Remove the Phase 4 header configuration from next.config.js, restore the
previous .env.project.example names only if the environment contract is
deliberately reverted, and remove the Phase 4 security test/documentation
changes. Do not roll back to a vulnerable dependency state without a separate
security decision. Validate with the full command set after rollback.

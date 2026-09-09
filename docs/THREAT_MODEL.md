# Security Threat Model

Evidence date: 2026-09-09. This is a provider-independent model for the
current static application and the explicitly planned contact endpoint. It is
not a penetration test or legal advice.

## 1. Assets

- Visitor trust, page integrity, and navigation behavior
- Approved operator/legal information
- Local fonts, poster, and future hero media
- GitHub source and deployment artifacts
- Contact submissions and mailbox access

## 2. Trust boundaries

1. Visitor browser to the public Next.js application origin
2. Static application origin to the hosting/build provider
3. Contact form to Netlify Forms and the optional IONOS notification
4. Operator access to GitHub, Netlify, and IONOS consoles

The contact form is a visitor-controlled input boundary. Submissions are stored
by Netlify Forms; the application itself has no database.

## 3. Public attack surface

- Static routes: /, /impressum, and /datenschutz
- Same-origin Next.js assets and image optimization route
- Header/mobile navigation and anchor links
- Public source/deployment metadata held by providers

No API route, server action, middleware, upload surface, authentication flow,
query-string renderer, redirect, dynamic script, or dangerous HTML rendering is
present in the current source.

## 4. Current threats

| Threat | Current exposure | Mitigation/status |
|---|---|---|
| Clickjacking | Static pages could otherwise be framed | Enforced CSP frame-ancestors none and X-Frame-Options DENY |
| MIME confusion | Static asset responses | X-Content-Type-Options nosniff |
| Referrer leakage | Cross-origin navigation | strict-origin-when-cross-origin |
| Unused browser capabilities | No camera, microphone, location, payment, USB, or motion APIs | Permissions-Policy disables them |
| Cross-window opener risks | No external target links | No target=_blank or external links found |
| Cross-origin resource misuse | Same-origin-only application | COOP/CORP same-origin; CSP report-only policy |
| Secret exposure | No environment reads in application source | No secret found; example file contains names only |
| Dependency compromise | Package supply-chain risk | Lockfile, pinned versions, clean audit; continue patch monitoring |

## 5. Future contact-form threats

- Spam and automated abuse
- Oversized or malformed request bodies
- Header/email injection
- HTML/script injection in message handling
- Log injection and accidental sensitive-data logging
- Rate-limit bypass and denial of service
- Netlify Forms spam or notification abuse
- Sensitive or confidential visitor submissions

## 6. Existing mitigations

- The contact form uses browser validation plus Netlify's honeypot and spam filtering
- No application-owned contact-submission database exists
- No uploads are accepted
- No browser storage, analytics, or third-party runtime scripts exist
- Local fonts and media avoid external runtime dependencies
- Security headers are applied centrally in next.config.js
- CSP enforcement is limited to clickjacking protection while the broader CSP
  remains report-only
- E2E tests verify security headers, same-origin requests, and empty storage

## 7. Required future mitigations

Netlify form detection, notification settings, access controls, spam handling,
and submission retention must be reviewed in the provider console. File uploads
remain disabled.

## 8. Residual risks

- Hosting and provider controls are not yet verified on Netlify.
- HSTS is deferred to the HTTPS production boundary.
- The broader CSP is report-only until production-like violation review is
  complete.
- Provider DPA, processing-region, access-control, and retention details remain
  external review items.
- Font licensing is not documented in the repository.

## 9. Hosting-dependent controls

- HTTPS, redirect policy, and production-only HSTS
- Netlify access control, deploy-preview privacy, logs, build environment, and
  rollback permissions
- Netlify Forms detection, notifications, spam filtering, access, and retention

## 10. Incident-response assumptions

Pouya Hedayati is the accountable operator. On a suspected incident, preserve
only necessary evidence, revoke or rotate affected provider credentials, disable
the affected route/integration, review provider logs, assess notification and
data-subject obligations, and roll back to the last known-good Git/Netlify
revision. No incident workflow is implemented by this phase.

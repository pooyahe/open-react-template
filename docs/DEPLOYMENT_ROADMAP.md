# Deployment Roadmap

This roadmap gates a Netlify Free private preview and subsequent public launch
of AktenKompass. It does not authorize deployment, DNS changes, or third-party
account changes.

## Global rules

- Preserve the existing Next.js App Router foundation and unrelated user changes.
- Do not store secrets in the repository or expose `BREVO_API_KEY` to the client.
- Keep previews noindex and keep the production hostname disconnected until
  explicit approval.
- Do not add analytics, unnecessary cookies, uploads, database storage, or new
  providers without a recorded decision.
- Every gate requires command output and, where applicable, browser evidence.

## Phase 0 — Context and architecture inventory

- Objective: establish confirmed business, legal, provider, media, ownership, and
  route context before deployment work.
- Prerequisites: repository inspection and the completed context interview.
- Questions still needing answers: legal status; address publication approval;
  bilingual route/content model; final media; Brevo/DNS readiness; Netlify DPA.
- Allowed changes: deployment-context, roadmap, and decision documentation;
  read-only architecture inspection.
- Prohibited changes: application redesign, package installation, deployment,
  DNS changes, provider connections, commits.
- Deliverables: `DEPLOYMENT_CONTEXT.md`, this roadmap, `DEPLOYMENT_DECISIONS.md`.
- Automated validation: document consistency check; Git status inspection.
- Manual validation: operator reviews every confirmed value and unresolved item.
- Exit criteria: no material deployment category is missing; unresolved items are
  explicitly owned and gated.
- Rollback point: remove or revise documentation only; application untouched.

## Phase 1 — Baseline quality and dependency audit

- Objective: prove the existing application can lint, typecheck, test, and build;
  identify scripts, dependency, route, and lockfile risks.
- Prerequisites: Phase 0 complete; no application changes required.
- Questions: which required scripts are absent; what are baseline failures; are
  current dependencies and Netlify Next.js support suitable?
- Allowed changes: documented audit findings; narrowly justified tooling fixes
  after approval; no package changes during this context task.
- Prohibited changes: replacing the app, changing package manager/lockfile,
  adding analytics or deployment integrations.
- Deliverables: baseline report, dependency/license notes, command evidence.
- Automated validation: `corepack pnpm@10.15.1 lint`, `typecheck`, `test`,
  `test:e2e`, `build` where scripts exist.
- Manual validation: route inventory and review of client/server boundaries.
- Exit criteria: baseline pass or every failure has a documented owner and fix
  plan; no unexplained deployment-critical failure.
- Rollback point: Git commit immediately before any approved tooling change.

## Phase 2 — Legal and operator-information surface

- Objective: make public identity, Impressum, Datenschutz, contact wording, and
  claims accurate for a pre-launch individual operator.
- Prerequisites: legal status decision; address publication decision; confirmed
  bilingual content approach; provider list.
- Questions: is the activity presented as pre-launch/unregistered accurately; is
  the home address publishable; has the operator approved final wording?
- Allowed changes: legal routes, content/configuration, claims, metadata, and
  visible review labels until approved.
- Prohibited changes: GmbH/UG/agency/team/certification/customer claims; legal or
  tax advice; publication of unresolved placeholders.
- Deliverables: final Impressum/Datenschutz text, claims inventory, legal signoff.
- Automated validation: link/route checks, heading and metadata checks, secret scan.
- Manual validation: Pouya Hedayati reviews every public legal and claims surface.
- Exit criteria: no placeholder or misleading entity claim remains; legal wording
  is approved for the actual operating status.
- Rollback point: previous reviewed legal-content commit.

## Phase 3 — Privacy and third-party minimization

- Objective: implement the smallest accurate data flow: direct mail plus an
  optional stateless contact-form notification.
- Prerequisites: Phase 2 wording; Netlify DPA review; IONOS and Brevo data-flow
  inventory; decision on whether Brevo is ready.
- Questions: are Brevo sender verification and provider terms ready; is the
  form needed for preview; are retention and access procedures documented?
- Allowed changes: privacy notice, form UI/route handler, mailto fallback,
  minimal provider integration, no-store headers, preview noindex.
- Prohibited changes: database, uploads, auto-confirmations, complete-content
  logging, analytics, cookies/storage, third-party widgets.
- Deliverables: data-flow inventory, privacy text, form design, fallback plan.
- Automated validation: form schema tests, request-size/rate-limit/honeypot
  tests, no-secret scan, no-index preview check.
- Manual validation: inspect browser network requests and mailbox behavior using
  test data; confirm deletion procedure.
- Exit criteria: privacy surface matches actual behavior; Brevo is either fully
  verified or the public form remains disabled with mailto CTA.
- Rollback point: mailto-only contact path.

## Phase 4 — Security hardening

- Objective: protect the form, provider credentials, repository, deployment, and
  operator accounts.
- Prerequisites: Phase 3 architecture; Netlify/GitHub/IONOS/Brevo ownership.
- Questions: are MFA/recovery controls enabled; are environment variables scoped
  correctly; are SPF, DKIM, and DMARC passing?
- Allowed changes: server-side validation, rate limiting, honeypot, request
  limits, secure headers, secret configuration, branch protection, MFA.
- Prohibited changes: client-side secrets, unrestricted APIs, verbose payload
  logging, automatic paid add-ons or auto-recharge.
- Deliverables: security checklist, environment-variable inventory without values,
  email-authentication evidence, incident/deletion procedure.
- Automated validation: dependency audit, secret scan, security-header checks,
  negative form tests, production build.
- Manual validation: authenticated provider-console review and controlled form
  delivery test.
- Exit criteria: no known critical secret, injection, abuse, or email-auth gap;
  SPF/DKIM/DMARC pass before public launch.
- Rollback point: mailto-only path and last known-good Netlify deploy.

## Phase 5 — Performance and media optimization

- Objective: deliver a fast static-first hero with final media as progressive
  enhancement.
- Prerequisites: final media supplied with usage approval; Phase 1 build baseline.
- Questions: what are measured LCP/CLS/INP and video request costs; is mobile
  video worthwhile; what size limits meet the budget?
- Allowed changes: compressed poster, WebM/MP4, mobile variant, lazy/viewport
  loading, stable dimensions, poster-only fallback.
- Prohibited changes: making video required for comprehension; autoplay with
  audio; GSAP/cinematic scroll for this first public version; raw footage.
- Deliverables: asset manifest, measured performance budget and report.
- Automated validation: production build, asset-size check, Lighthouse or
  equivalent performance measurements, image/media metadata checks.
- Manual validation: desktop/mobile network inspection and media-failure test.
- Exit criteria: hero text/CTA render immediately; no material layout shift; the
  measured limits are recorded and mobile remains usable on slow connections.
- Rollback point: poster-only hero.

## Phase 6 — Accessibility and responsive quality

- Objective: ensure bilingual content, navigation, contact, legal routes, and
  static hero work for keyboard, screen readers, reduced motion, and narrow view.
- Prerequisites: final content and static-first layout.
- Questions: are German/English labels natural; are focus and language changes
  correct; are 320px and 200% zoom flows clean?
- Allowed changes: semantic markup, focus states, menu behavior, labels, reduced
  motion, responsive styles, accessible fallback text.
- Prohibited changes: essential information conveyed only through motion/media;
  inaccessible overlays or hover-only controls.
- Deliverables: accessibility review and browser evidence.
- Automated validation: lint, typecheck, component tests, Playwright flows, axe
  or equivalent where available.
- Manual validation: keyboard, screen-reader-oriented landmark review, 1440px,
  768px, 390px, 320px, zoom, reduced-motion, and no-JavaScript checks.
- Exit criteria: no blocking mobile navigation, CTA, focus, contrast, overflow,
  language, or reduced-motion issue.
- Rollback point: last accessible static shell.

## Phase 7 — SEO, metadata, domain, and indexing

- Objective: publish accurate bilingual metadata and prevent previews from being
  indexed while preparing the no-www production domain.
- Prerequisites: legal/content approval; canonical hostname decision; final route
  model; no-placeholder policy satisfied.
- Questions: are translated titles/descriptions ready; are robots/sitemap and
  alternates accurate; are all structured-data facts verified?
- Allowed changes: metadata, canonical, hreflang if supported by the chosen
  routing, robots, sitemap, redirects, Open Graph assets.
- Prohibited changes: indexing preview deployments; invented organization facts;
  connecting production DNS without explicit deployment authorization.
- Deliverables: SEO checklist, preview/production indexing plan, redirect plan.
- Automated validation: metadata/robots/sitemap assertions, link checks, build.
- Manual validation: inspect page source and social preview metadata on preview.
- Exit criteria: preview is noindex; production metadata contains only verified
  facts; `aktenkompass.de` is canonical and `www` behavior is defined.
- Rollback point: prior metadata and DNS-independent preview.

## Phase 8 — Private preview deployment

- Objective: validate the complete candidate on Netlify without touching the
  public domain.
- Prerequisites: Phases 1–7 exit; GitHub/Netlify integration; preview env vars;
  Brevo either verified or deliberately disabled.
- Questions: does the real Netlify build match local output; are deploy previews
  noindex; do notifications and rollback work?
- Allowed changes: Netlify preview configuration, preview environment variables,
  deploy-preview testing, fixes within approved scope.
- Prohibited changes: production DNS; indexing preview; storing production secrets
  in logs; paid Netlify add-ons.
- Deliverables: preview URL, build logs, browser evidence, rollback rehearsal.
- Automated validation: Netlify build, all quality commands, E2E against preview,
  noindex and security checks.
- Manual validation: desktop/mobile/reduced-motion/form-failure review and owner
  acceptance.
- Exit criteria: private preview is usable, secure, noindex, and rollback-tested.
- Rollback point: previous Netlify preview deploy.

## Phase 9 — Final public-launch audit

- Objective: confirm every public, legal, privacy, security, performance, and
  operational gate immediately before release.
- Prerequisites: accepted private preview; final media; legal/operator approval;
  Brevo/DNS authentication; no unresolved blockers.
- Questions: did any provider, copy, asset, or account state change; is explicit
  public deployment approval recorded?
- Allowed changes: final corrections and documentation only.
- Prohibited changes: unreviewed scope expansion, new services, new tracking,
  new providers, or last-minute architecture changes.
- Deliverables: signed/checklisted launch decision, final evidence bundle,
  handoff/rollback notes.
- Automated validation: full lint/typecheck/test/e2e/build suite; secret and link
  scans; final production-like build.
- Manual validation: owner review of every CTA, legal page, form, provider flow,
  mobile state, and preview indexing state.
- Exit criteria: all critical blockers closed; public deployment explicitly
  authorized by Pouya Hedayati.
- Rollback point: accepted private-preview/last-known-good production candidate.

## Phase 10 — Public production deployment

- Objective: deploy the approved build to Netlify and connect `aktenkompass.de`.
- Prerequisites: Phase 9 approval; DNS change approval; production environment
  variables; SPF/DKIM/DMARC; canonical/redirect configuration.
- Questions: are DNS TTL/rollback contacts available; are post-deploy checks
  scheduled; is the production mailbox monitored?
- Allowed changes: production deploy and explicitly approved IONOS DNS records.
- Prohibited changes: unrelated DNS edits, paid upgrades, analytics, or scope
  expansion.
- Deliverables: production URL, DNS evidence, deploy log, smoke-test results.
- Automated validation: production smoke tests, HTTPS, redirects, robots/sitemap,
  form security tests, build/deploy status.
- Manual validation: owner checks desktop/mobile, legal pages, contact delivery,
  canonical hostname, and no console/hydration errors.
- Exit criteria: site is reachable at `https://aktenkompass.de`, secure, accurate,
  and all critical user journeys work.
- Rollback point: Netlify deploy rollback and prior DNS state.

## Phase 11 — Post-launch monitoring and maintenance

- Objective: operate a low-traffic, low-frequency-update site safely.
- Prerequisites: successful public smoke test; uptime/build notifications enabled.
- Questions: are usage credits, uptime, email delivery, privacy requests, and
  hero performance stable; did any claim or provider change?
- Allowed changes: monthly-or-less content updates, dependency/security patches,
  measured performance improvements, documented legal/privacy updates.
- Prohibited changes: indefinite message retention, unreviewed claims, enabling
  tracking or paid add-ons, storing secrets or message content in logs.
- Deliverables: monthly deletion review, monitoring review, change log, rollback
  readiness check, updated handoff documentation.
- Automated validation: uptime/build alerts, scheduled quality checks, dependency
  and secret scans where configured.
- Manual validation: monthly mailbox deletion review, provider/account review,
  browser smoke test, Netlify credit review.
- Exit criteria: alerts are actionable, deletion and rollback procedures work,
  and all changes remain within approved scope.
- Rollback point: last known-good Netlify deploy and Git revision.

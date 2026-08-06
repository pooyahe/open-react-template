# Baseline Quality and Dependency Audit

Audit scope: Deployment Roadmap Phase 1 only. Audited 2026-08-06 from the
working tree on branch `chore/deployment-readiness`.

No application source, package manifest, lockfile, configuration, DNS, hosting
account, or external service was modified during this audit. The existing user
change in `docs/DESIGN_SYSTEM.md` was preserved.

## 1. Executive summary

The application is a small Next.js App Router site that builds successfully as
a static site. Its current source is mostly server-rendered, uses self-hosted
fonts, has no form or API route, reads no environment variables, and uses no
browser storage or cookies. Netlify is technically compatible with this
architecture: its current Next.js documentation lists full support for App
Router, React Server Components, static generation, route handlers, and
`next/image` through the OpenNext adapter.

The baseline is not deployment-ready. The required quality scripts are
missing, `lint` opens an interactive ESLint setup wizard, and `pnpm audit`
reports 36 advisories including one critical and 14 high-severity advisories
through the pinned Next.js dependency range. The app still exposes visible
company/legal placeholders, has no robots or sitemap implementation, is
German-only despite the confirmed bilingual launch scope, has no contact form,
and uses current hero media that has been marked non-final. These are separate
from the build result and must not be hidden by the passing build.

## 2. Repository and framework baseline

| Area | Finding |
|---|---|
| Framework | Next.js 15.1.11, App Router, React 19.2.3, TypeScript 5.7.3 |
| Styling | Tailwind CSS 4.0.3 with `@tailwindcss/postcss`; existing custom CSS tokens |
| Package manager | pnpm 10.15.1, pinned in `package.json` and `pnpm-lock.yaml` |
| Next config | `next.config.js` is the default empty configuration |
| TypeScript | Strict mode enabled, no emit, incremental checking, `@/*` path alias |
| Rendering | Static prerendering observed for `/`, `/impressum`, and `/datenschutz` |
| Client code | Only `components/ui/header.tsx` declares `"use client"` for mobile-menu state |
| Forms/API | No `<form>` or input surface; no `route.ts` or API route exists |
| Environment use | No `process.env`, `NEXT_PUBLIC_*`, or provider API key read in application source |
| Fonts | Local Nacelle WOFF2 files through `next/font/local` |
| Git state | Branch `chore/deployment-readiness`; `docs/DESIGN_SYSTEM.md` is modified; no application-source diff was present at audit time |
| Graph state | `graphify-out/graph.json` exists; Graphify was queried before broad source inspection. Its route node data includes stale inherited template references not present in the current route inventory, so current files remain authoritative. |

## 3. Command results

Commands were run with the existing package-manager configuration and no
dependency installation.

| Command | Result | Classification |
|---|---|---|
| `corepack pnpm@10.15.1 lint` | FAIL, exit 1. `next lint` opened the interactive ESLint configuration wizard because no ESLint configuration is present. | Missing project capability; blocks automated lint gate |
| `corepack pnpm@10.15.1 typecheck` | FAIL, exit 1. Script not found. | Missing project capability |
| `corepack pnpm@10.15.1 test` | FAIL, exit 1. Script not found. | Missing project capability |
| `corepack pnpm@10.15.1 test:e2e` | FAIL, exit 1. Script not found. | Missing project capability |
| `corepack pnpm@10.15.1 build` | PASS, exit 0. Next.js compiled, type/lint build checks completed, six static pages generated. | Passing baseline |
| `corepack pnpm@10.15.1 audit` | First sandbox attempt failed with EACCES to the npm audit endpoint. A read-only network-approved retry completed and reported 36 vulnerabilities: 3 low, 18 moderate, 14 high, 1 critical. | Dependency/security blocker |

The passing build does not prove that the required quality or deployment gates
are complete. The build’s internal checks do not replace the missing scripts or
the separate audit result.

## 4. Missing quality scripts

`package.json` currently defines only `dev`, `build`, `start`, and `lint`.

Missing capabilities:

- `typecheck`
- `test`
- `test:e2e`
- A non-interactive, configured lint implementation

No scripts or tools were added during this audit. Adding them is a deliberate
follow-up decision, not an incidental audit correction.

## 5. Dependency findings

Direct dependencies include `next@15.1.11`, `react@19.2.3`,
`react-dom@19.2.3`, `aos@3.0.0-beta.6`, and `@headlessui/react@2.2.0`.
Development dependencies include Tailwind CSS 4.0.3, PostCSS 8.5.1,
`@tailwindcss/forms`, and `@types/aos`.

### Security findings

The approved `pnpm audit` result reports 1 critical, 14 high, 18 moderate,
and 3 low advisories. The most deployment-relevant findings are in the current
Next.js range, including a critical authorization-bypass advisory and multiple
high-severity React Server Components/HTTP deserialization and denial-of-service
advisories. Additional findings affect `glob`, `minimatch`, `postcss`, and
related transitive paths.

The exact advisory output identified patched versions newer than the pinned
baseline. No upgrade was performed because dependency upgrades are explicitly
out of scope for this audit. The current dependency baseline is a `BLOCKING`
public-deployment finding until reviewed and remediated.

### Unused or legacy dependency signals

- `aos` is a production dependency and `@types/aos` is a dev dependency, but
  current application source does not import AOS. `theme.css` still contains
  legacy AOS selectors. This creates avoidable client/performance and audit
  surface and should be removed only after confirming no hidden consumer.
- `@headlessui/react` is installed but no current source import was found. Its
  transitive tree is not currently needed by the visible application inventory.
- `@tailwindcss/forms` is configured as a dependency but no current form exists;
  its future use should be decided together with the contact-form phase.

## 6. Route inventory

Current application routes found on disk:

| Route | Source | Current behavior |
|---|---|---|
| `/` | `app/(default)/page.tsx` | Static German homepage with hero poster and content sections |
| `/impressum` | `app/impressum/page.tsx` | Static legal placeholder page |
| `/datenschutz` | `app/datenschutz/page.tsx` | Static privacy placeholder page |
| `/_not-found` | Next.js generated route | Framework fallback |

No current route handler, API endpoint, authentication route, reset-password
route, sitemap route, or robots route was found in the current `app/` tree.
Graphify’s stale node for `(auth)/reset-password` is inherited graph data and
was not treated as a live route.

## 7. Server/client boundary assessment

- `app/layout.tsx`, `app/(default)/layout.tsx`, the homepage, section components,
  footer, logo, and configuration/content modules are server components by
  default.
- `components/ui/header.tsx` is the only explicit client component and uses
  local React state for mobile-menu disclosure.
- No `use server` directive, server action, route handler, or browser API use
  was found.
- The current client boundary is small and proportionate, but the mobile menu
  still needs later keyboard Escape handling and focus-return verification.
- This is a healthy starting boundary for Netlify and should be preserved.

## 8. Environment-variable and secrets assessment

Application source contains no `process.env` reads and no `NEXT_PUBLIC_*` use.
`.env.project.example` lists these future placeholders:

- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_RECIPIENT_EMAIL`
- `CONTACT_PROVIDER_API_KEY`

They are not consumed by the current app. The repository ignores `.env*.local`
files and PEM files. No credential, API token, or private key was found in the
inspected source/configuration files.

The deployment plan’s future `BREVO_API_KEY` must be server-side only and must
not be added to client-exposed configuration. Environment names should be
reconciled before the form phase so the example file does not describe an
unimplemented or misleading provider contract.

## 9. Forms and untrusted-input inventory

There is currently no form, input, textarea, select, FormData handling, query
parameter handling, route handler, or API endpoint in the application.

Therefore no current untrusted-input validation or abuse protection exists.
This is not a present input vulnerability because no input surface is exposed,
but it is a `HIGH` implementation gap relative to the confirmed launch scope:
the planned contact form requires server-side validation, request-size limits,
rate limiting, a honeypot, minimal logging, and a mailto fallback until Brevo is
ready.

## 10. External-request inventory

No runtime `fetch`, external API request, third-party embed, map, booking widget,
chat widget, CAPTCHA, analytics, newsletter, or error-monitoring request was
found in application source.

The app uses local font files via `next/font/local` and local image/media paths
through `next/image` and static asset URLs. It uses no external font host.

Repository documentation and the inherited Cruip README contain ordinary
documentation links. Those are not runtime browser requests from the app.

## 11. Cookie and browser-storage inventory

No `cookies()`, `document.cookie`, `localStorage`, `sessionStorage`, or other
browser-storage usage was found in current source. No analytics or consent
mechanism is present. This matches the confirmed deployment decision to avoid
nonessential cookies and storage.

## 12. Legal-route status

Both legal routes are visibly incomplete:

- `/impressum` renders `[COMPANY_NAME]`, `[CONTACT_PERSON]`, `[ADDRESS]`, and
  `[CITY]` placeholders.
- `/datenschutz` explicitly states that it is a placeholder and has no actual
  IONOS, Netlify, Brevo, form, retention, or data-subject handling description.
- Footer copyright text still contains `[COMPANY_NAME]` and a placeholder notice.
- `config/site.ts` still contains `[COMPANY_NAME]`, `[EMAIL]`, `[PHONE]`,
  `[CITY]`, and `[BOOKING_URL]`.

This directly violates the confirmed “no visible placeholder at deployment”
rule and is a `BLOCKING` public-launch finding. It is not fixed in Phase 1.

## 13. SEO and preview-indexing status

Current metadata status:

- Root metadata contains `[COMPANY_NAME]` and only German metadata.
- Homepage metadata has a generic German title/description and no canonical URL.
- No `app/robots.ts` or `app/sitemap.ts` exists.
- No bilingual metadata/routing or alternate-language strategy exists.
- Structured data is not present.

Netlify’s current official documentation says Deploy Previews, unpublished
production deploys, and old branch deploys receive an `X-Robots-Tag: noindex`
header automatically. This platform behavior must still be verified on an
actual preview; the repository itself currently has no explicit preview-indexing
policy.

Sources: [Netlify Next.js support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/),
[Netlify Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/),
and [Netlify deploy overview/indexing behavior](https://docs.netlify.com/deploy/deploy-overview/).

## 14. Hosting compatibility

Netlify is technically compatible with the current static Next.js App Router
build. Netlify documents full support for App Router, React Server Components,
SSG, route handlers, image optimization, and related Next.js features through
its OpenNext adapter.

The current app has no dynamic server behavior, so the present build is simpler
than the planned Brevo form. A future route handler should be tested on a real
Netlify Deploy Preview with a server-only provider secret, request limits, and
the mailto fallback.

Hosting does not remove the dependency, legal, content, media, or quality
blockers identified in this audit.

## 15. Performance risks

- The hero poster is 84,586 bytes and is prioritized above the fold; this is
  reasonable as a placeholder but final media is still pending.
- `public/videos/video.mp4` is approximately 2.79 MB and is not currently
  referenced by the homepage. It is not evidence of a working optimized video
  path and should not be assumed launch-ready.
- The hero uses a large background image with a full-cover `next/image`; final
  aspect ratio, mobile fallback, and measured LCP/CLS behavior remain unverified.
- Legacy AOS CSS remains in `app/css/additional-styles/theme.css`, and the AOS
  package remains installed despite no current source import.
- Several inherited images, testimonial portraits, client logos, workflow
  images, and decorative illustrations remain in `public/images`; unused assets
  increase repository and review surface until removal is justified.
- No performance measurement or browser evidence was produced in this Phase 1
  audit.

## 16. Accessibility risks

Positive baseline signals:

- Root document uses `lang="de"`.
- A skip link and `main` target exist.
- Visible `:focus-visible` styling exists.
- The page has a single homepage H1 and logical sections/articles/nav/footer.
- Reduced-motion CSS disables smooth scrolling and shortens transitions.

Risks requiring later verification or correction:

- The mobile menu has no Escape-key handling or focus return.
- The navigation uses a client component solely for disclosure; browser and
  keyboard behavior has not been tested in this audit.
- The menu button’s icon is text-based and should be checked for accessible name
  and visual rendering across fonts/encodings.
- The current legal and content placeholders are not a credible accessible
  public experience.
- English support, language switching, and language-specific metadata do not yet
  exist.
- No automated accessibility or end-to-end tooling is currently available.

## 17. Inherited template content

The repository retains the original Cruip/Open React template README, GPL terms,
and attribution. This is required by the project instructions and must remain.

Likely inherited or currently unused assets include:

- `public/images/client-logo-01.svg` through `client-logo-09.svg`;
- `public/images/testimonial-01.jpg` through `testimonial-09.jpg`;
- workflow screenshots and legacy illustrations;
- `public/images/logo.svg`, `footer-illustration.svg`, blurred shapes, and
  secondary illustrations;
- `public/videos/video.mp4` pending final media review.

Current homepage components have already removed visible testimonial/logo
sections, but the unused assets remain. No asset was deleted in this audit.

## 18. Findings by severity

### BLOCKING

- `next@15.1.11` is included in a `pnpm audit` result with one critical and
  multiple high-severity advisories. Upgrade/remediation is required before
  public deployment; no upgrade was performed in this audit.
- Visible legal, brand, contact, and company placeholders remain in live routes,
  config, metadata, and footer.
- Confirmed operator/business legal status and publication approval for the home
  address are unresolved.
- Confirmed German/English launch scope is not implemented; current document
  language and content architecture are German-only.
- Final hero media is not supplied, while current media has been declared
  non-final.

### HIGH

- Required quality scripts (`typecheck`, `test`, `test:e2e`) are absent and lint
  is interactive/unconfigured.
- The confirmed contact workflow is not implemented; no form, validation,
  rate-limiting, honeypot, or Brevo/mailto decision is wired in the app.
- No actual privacy notice describes the planned IONOS, Netlify, Brevo, form,
  retention, or deletion flows.
- No repository robots/sitemap/canonical implementation exists; preview noindex
  behavior has not been verified on Netlify.
- The dependency tree contains avoidable legacy AOS and likely-unused UI/form
  dependencies.

### MEDIUM

- Mobile navigation behavior lacks Escape and focus-return handling and has no
  browser evidence.
- No automated accessibility, unit, integration, E2E, or performance tooling is
  available.
- Final hero asset budgets, mobile delivery strategy, and media-failure behavior
  are not measured.
- Graphify route data is stale relative to the current source inventory.
- The DMS/data-analysis/dashboard content wording still needs reconciliation with
  the confirmed service naming policy.

### LOW

- Inherited unused public assets increase repository size and content-review
  surface.
- Default `next.config.js` contains no explicit deployment headers or redirects;
  this is acceptable for the current static baseline but needs an approved
  production/preview policy later.
- Documentation/README links create no runtime third-party request risk.

## 19. Safe corrections suitable for the next phase

These are recommendations, not changes made by this audit:

1. Resolve the legal/business status and address-publication decision before
   replacing legal placeholders.
2. Reconcile the bilingual launch requirement with routing, content, metadata,
   and language-switching architecture.
3. Define the contact-form boundary and keep mailto as the safe fallback until
   Brevo/domain authentication is ready.
4. Plan a reviewed dependency update/remediation for Next.js and transitive
   advisories; do not make an untested upgrade during legal-content work.
5. Configure non-interactive lint and the missing quality scripts in a separately
   approved quality-tooling phase.
6. Remove AOS and other unused dependencies/assets only after import and route
   verification.
7. Supply final hero media, rights/approval, dimensions, and measured budgets.

## 20. Phase 1 exit criteria

| Criterion | Result |
|---|---|
| Repository and docs inspected | PASS |
| Graphify used before broad source inspection | PASS |
| Package manager, lockfile, routes, boundaries, env, inputs, requests, storage, legal, SEO, hosting, performance, accessibility, and template content assessed | PASS |
| Baseline commands executed and exact results recorded | PASS |
| Missing scripts documented without installing tools | PASS |
| No application changes made | PASS |
| No dependency upgrade made | PASS |
| Critical security advisories resolved | FAIL |
| Legal/content placeholders resolved | FAIL; intentionally deferred |
| Bilingual launch scope implemented | FAIL; intentionally deferred |
| Final media supplied and measured | FAIL; intentionally deferred |
| All required quality gates pass | FAIL |

Phase 1 documentation work is complete, but the quality/deployment readiness
exit criteria do not pass. This is an audit result, not a claim of production
readiness.

## 21. Recommended next gated phase

Proceed to Deployment Roadmap Phase 2 — Legal and operator-information surface
only after Pouya Hedayati resolves the business-status and home-address
publication questions. Phase 2 should replace the visible legal/operator
placeholders, reconcile the approved pre-launch claims, and update the privacy
surface without implementing the contact form, Brevo, bilingual routing, media,
or public deployment.

## End-of-audit handoff

### 1. Files inspected

- `AGENTS.md`
- `TASK.md`
- `README.PROJECT.md`
- `docs/PRD.md`
- `docs/CONTENT.md`
- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/DESIGN_IMPLEMENTATION_PLAN.md`
- `docs/SEO_AND_COMPLIANCE.md`
- `docs/TEST_STRATEGY.md`
- `docs/DEPLOYMENT_CONTEXT.md`
- `docs/DEPLOYMENT_ROADMAP.md`
- `docs/DEPLOYMENT_DECISIONS.md`
- `package.json`, `pnpm-lock.yaml`, `next.config.js`, `tsconfig.json`,
  `postcss.config.js`, `.env.project.example`, `.gitignore`
- Current `app/`, `components/`, `config/`, `content/`, `utils/`, and `public/`
  inventories
- `graphify-out/graph.json` via Graphify query

### 2. Commands executed

```text
corepack pnpm@10.15.1 lint
corepack pnpm@10.15.1 typecheck
corepack pnpm@10.15.1 test
corepack pnpm@10.15.1 test:e2e
corepack pnpm@10.15.1 build
corepack pnpm@10.15.1 audit
corepack pnpm@10.15.1 list --depth 1
corepack pnpm@10.15.1 why aos
corepack pnpm@10.15.1 why @headlessui/react
corepack pnpm@10.15.1 why @tailwindcss/forms
git status --short --branch
git diff --name-only -- app components config content utils package.json pnpm-lock.yaml next.config.js tsconfig.json
```

### 3. Exact command results

- `lint`: exit 1; interactive ESLint setup wizard.
- `typecheck`: exit 1; script not found.
- `test`: exit 1; script not found.
- `test:e2e`: exit 1; script not found.
- `build`: exit 0; production build passed and generated six static pages.
- `audit`: exit 1 because vulnerabilities were found; 36 total (1 critical,
  14 high, 18 moderate, 3 low).
- dependency listing: completed; direct and transitive tree recorded above.
- Git source diff: no application/config/package source paths changed.

### 4. Files changed

- `docs/BASELINE_AUDIT.md` created.

No application source, package manifest, lockfile, or configuration was changed.

### 5. Critical blockers

Next.js dependency advisories, unresolved legal/business status, unresolved
address publication approval, visible placeholders, missing bilingual scope,
and missing final hero media. Quality scripts and form/privacy implementation
are also required before the intended public release.

### 6. Whether a private preview is technically possible

Yes, the current static build is technically deployable to a Netlify preview,
but it is not an approved preview candidate for the intended launch because it
still contains visible placeholders, stale service wording, and unverified
quality/preview-indexing behavior.

### 7. Whether Phase 1 exit criteria passed

No. The audit and documentation deliverable is complete, but security, legal,
content, media, and quality-gate criteria remain open.

### 8. Exact recommended Phase 2 prompt

```text
Read AGENTS.md, TASK.md, README.PROJECT.md, docs/PRD.md, docs/CONTENT.md,
docs/ARCHITECTURE.md, docs/DESIGN_SYSTEM.md, docs/SEO_AND_COMPLIANCE.md,
docs/DEPLOYMENT_CONTEXT.md, docs/DEPLOYMENT_ROADMAP.md,
docs/DEPLOYMENT_DECISIONS.md, and docs/BASELINE_AUDIT.md.

Execute only Deployment Roadmap Phase 2: Legal and operator-information
surface.

Before editing, confirm that Pouya Hedayati has resolved the business-status
wording and approved publication of the service address. If either decision is
still unresolved, stop and report the blocker without modifying application
source.

Preserve unrelated user changes, especially docs/DESIGN_SYSTEM.md. Do not deploy,
connect DNS, install packages, upgrade dependencies, modify external services,
create a Git commit, implement bilingual routing, create a contact form,
integrate Brevo, replace hero media, add analytics, or add new website features.

Replace only the approved visible legal/operator placeholders in the existing
Impressum, Datenschutz, metadata/configuration, and footer surfaces. Use the
confirmed AktenKompass brand, Pouya Hedayati operator identity, approved
pre-launch status, service scope, public contact details, and conservative claim
policy. Describe IONOS, Netlify, Brevo, form retention, deletion responsibility,
and provider data flows only to the extent confirmed by the deployment context;
do not imply that the contact form or Brevo integration already exists.

Keep the current server/client boundaries. Run the existing build and report
exact command output. Do not claim Phase 2 completion unless every visible
placeholder removed in scope is backed by an explicitly confirmed fact and the
operator has reviewed the resulting wording.
```

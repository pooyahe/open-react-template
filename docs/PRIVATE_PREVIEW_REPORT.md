# Private Preview Report

## Git-connected deployment evidence — 2026-08-11

Status: deployment succeeded, but Phase 8 is **not fully passed** because authenticated real-host browser validation could not be completed in this execution environment.

- Project: `aktenkompass` (linked repository confirmed by `netlify status`)
- Repository: `https://github.com/pooyahe/open-react-template`
- Branch: `chore/deployment-readiness`
- Commit: `1ed9e8312e515474a9474d7861d413ed961d0eac`
- Preview deploy: `6a7b78a8f8a9a70008194128`
- Build: `6a7b78a8f8a9a70008194126`
- Preview URL: `https://deploy-preview-1--aktenkompass.netlify.app`
- Context: `deploy-preview`
- Framework: `next`
- Deploy state: `ready`
- `manual_deploy`: `false`
- `plugin_state`: `success`
- Build command: `corepack pnpm@10.15.1 build`
- Publish directory: `.next`
- Node: `.nvmrc` specifies `24.18.0`

Netlify generated one `___netlify-server-handler` function named `Next.js Server Handler`, using `@netlify/plugin-nextjs@5.15.13`, bootstrap version `2.18.0`, runtime API version `2`, Node runtime `nodejs24.x`, and a catch-all `/*` route. Netlify reported three redirects and one header rule processed. This confirms native Next.js/OpenNext processing and runtime routing; no application source change or `@netlify/plugin-nextjs` dependency was added.

The prior manual `.next` upload is not this deployment: it had no commit SHA or build ID. The Git-connected deploy has both, and `manual_deploy=false`.

Unauthenticated HTTPS probes to the preview returned `401` with `X-Robots-Tag: noindex` for `/`, `/impressum`, `/datenschutz`, `/robots.txt`, `/sitemap.xml`, and an unknown route. The available browser runtime could not connect to a signed-in session, so authenticated page content, security headers, CSP, storage/cookies, network behavior, responsive behavior, accessibility, performance, and application 404 handling remain pending.

The requested CLI deploy-log command returned `404 Not Found`; deploy/build API metadata still confirms a completed Git build and native runtime deployment. No redeploy was performed.

## Status

Git-connected preview deployment is complete and ready. Phase 8 remains not fully passed until the authenticated real-host validation matrix is executed.

```text
https://deploy-preview-1--aktenkompass.netlify.app
```

## 1. Deployment architecture

- Source repository: `https://github.com/pooyahe/open-react-template.git`.
- Preview branch: `chore/deployment-readiness`.
- Approved provider: Netlify Free.
- Framework: Next.js 15.5.21 App Router with React Server Components.
- Build output: Next.js `.next` output with Netlify's native current Next.js integration.
- Production domain: not connected and not changed.

Netlify's current documentation states that App Router, SSR, route handlers, image optimization, and static generation are supported through the automatically maintained OpenNext integration. No Netlify adapter package is pinned or added.

## 2. Repository and branch

The repository and preview branch were confirmed by the Git-connected deploy. Netlify built commit `1ed9e8312e515474a9474d7861d413ed961d0eac` from `chore/deployment-readiness`; the PR was not merged. `master` remains the requested base branch.

## 3. Netlify project configuration

`netlify.toml` is intentionally minimal:

- build command: `corepack pnpm@10.15.1 build`;
- publish directory: `.next`;
- preview-safe non-secret environment values for the general, Deploy Preview, branch-deploy, and confirmed preview-branch contexts.

No Netlify plugin, adapter, redirect, DNS, domain, analytics, or provider-specific runtime code was added.

## 4. Node/pnpm/build configuration

- Node: `.nvmrc` pins `24.18.0`, matching the tested local runtime.
- Package manager: existing `pnpm@10.15.1` package-manager declaration and lockfile are preserved.
- Next.js: `15.5.21`, supported by Netlify's current Next.js integration.
- Build command: `corepack pnpm@10.15.1 build`.
- Output mode: standard Next.js hybrid/App Router output; no `next export`.

## 5. Environment variables by context

| Context | `DEPLOYMENT_ENV` | `SEO_INDEXING_ENABLED` | Secrets |
| --- | --- | --- | --- |
| Local/default | preview behavior unless explicitly overridden | false | none |
| Deploy Preview | `preview` | `false` | none |
| Branch deploy | `preview` | `false` | none |
| `chore/deployment-readiness` branch context | `preview` | `false` | none |
| Future production | `production` | `true` only after explicit launch approval | managed in Netlify UI; never committed |

`BREVO_API_KEY`, production mail credentials, analytics credentials, and other secrets are not configured for preview.

## 6. Access-control status

The requested preference is Netlify team-login/private visibility when available on Free. Netlify's current documentation says project visibility is available on credit-based Free plans, but Free projects are single-seat and only the Team Owner can view them. The Netlify UI must be checked after project creation to confirm the team's actual plan and visibility controls.

Password protection is not enabled and the plan must not be upgraded solely to obtain it without a new user decision.

Until actual visibility is verified, the external deployment must not be described as private. If no access restriction is available, the accurate classification is:

`UNINDEXED PREVIEW — URL ACCESSIBLE`

## 7. Indexing-protection status

Local preview-context validation confirms:

- `noindex, nofollow` is emitted;
- `/robots.txt` disallows crawling;
- `/sitemap.xml` is empty;
- no production canonical URL is emitted;
- no production indexing flag is configured.

This protection is defense in depth and does not replace human access control.

## 8. Preview URL

No URL exists yet because no external deployment has been authorized or performed. The expected Netlify Deploy Preview shape is `https://deploy-preview-<number>--<site-name>.netlify.app`; the actual URL must be recorded only after deployment.

## 9. Security-header results

Local production-like responses retain the configured headers:

- `Content-Security-Policy: frame-ancestors 'none';`
- restrictive `Content-Security-Policy-Report-Only`;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`;
- strict-origin referrer policy;
- restrictive Permissions Policy;
- COOP and CORP same-origin policies.

HSTS remains deferred to the confirmed HTTPS production domain boundary. Real Netlify response headers must be checked after authorization.

## 10. CSP results

The local browser baseline found no unexpected third-party requests and no known application CSP requirement beyond the documented inline-style allowance in report-only policy. A real Netlify preview has not yet been available, so platform-specific CSP report-only console violations remain untested.

No CSP weakening is authorized based on local evidence.

## 11. Privacy/network results

Local production-like browser evidence found only same-origin requests, local fonts/media, no cookies, no localStorage/sessionStorage, no IndexedDB, and no service workers. Netlify CDN/provider behavior has not yet been observed on a real host. Provider processing, logging, region, and DPA status remain separate privacy-review items.

## 12. Accessibility results

The local Chromium suite passes homepage, legal-route, keyboard, skip-link, visible-focus, mobile-navigation, reduced-motion, text-scale, and 320–1440px overflow checks. The real preview still requires verification at its HTTPS hostname after authorization.

## 13. Responsive results

The local production-mode suite passes 1440px, 1024px, 768px, 390px, and 320px overflow checks. Final preview verification must repeat these checks against the Netlify URL.

## 14. Performance results

The Phase 5 local production measurements remain the baseline: hero poster LCP under 500ms in the local Chromium run, CLS 0, no video request, no external hostnames, and mobile poster transfer of approximately 7.3 KB after responsive sizing. Real Netlify CDN measurements remain pending.

## 15. Rollback procedure

Before public production exists, rollback means selecting the previous successful Netlify deployment in the site's Deploys history and restoring it as the active preview/branch deployment. Git-based redeployment of the previous known-good branch head is the secondary path. No destructive rollback has been performed.

## 16. Netlify DPA review status

Not reviewed or accepted in this phase. Netlify's actual data-processing terms, subprocessors, region behavior, access-control configuration, and logs require separate privacy/legal review before public launch.

## 17. Remaining preview issues

- Authenticated real-host route and browser validation is pending because the execution browser could not retain the Netlify access-gate session.
- Application response security headers and CSP behavior are not yet verified on the authenticated preview response.
- Real-host CSP report-only console behavior is unknown.
- Provider privacy/DPA review is incomplete.

## 18. Public-launch blockers

- No public DNS connection or production deployment authorization.
- Final legal/provider privacy review.
- Final hero media and rights approval.
- Brevo readiness, sender verification, SPF, DKIM, and DMARC.
- Explicit production indexing approval.

## Validation

Before the deployment gate, the following completed successfully: frozen install, lint, typecheck, component tests, production build, Chromium E2E tests, dependency audit, and `git diff --check`. The actual command output and exit codes are recorded in the Phase 8 handoff.

## Sources

- Netlify Next.js framework support: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify deploy previews: https://docs.netlify.com/deploy/deploy-types/deploy-previews/
- Netlify project visibility: https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/
- Netlify build dependencies and Node versions: https://docs.netlify.com/build/configure-builds/manage-dependencies/

# Deployment Decisions

Only confirmed decisions from the deployment context interview are recorded
here. Open questions and gates remain in `DEPLOYMENT_CONTEXT.md` and
`DEPLOYMENT_ROADMAP.md`.

| Decision | Rationale | Scope/status |
|---|---|---|
| Use Netlify Free for the private preview and initial public landing page | Low expected traffic, deploy previews, rollback, Next.js support, and no initial paid commitment | Confirmed; deployment not yet authorized |
| Keep GitHub as source repository and `main` as production branch | Existing workflow and clear production boundary | Confirmed |
| Use `https://github.com/pooyahe/open-react-template.git` and `chore/deployment-readiness` for the Phase 8 preview | Explicit repository and branch confirmation | Confirmed; external deployment still requires approval |
| Use Netlify deploy previews for branches/PRs | Enables review before production | Confirmed; previews must be noindex |
| Prefer Netlify team-login/private visibility for the preview when available on Free | Keeps preview access restricted without an automatic plan upgrade | Confirmed preference; Free-plan seat/access limits require verification in the Netlify UI |
| Use IONOS for the domain, DNS, and mailbox | Existing ownership and mailbox at `info@aktenkompass.de` | Confirmed |
| Use `aktenkompass.de` as the canonical no-www hostname | Explicit operator choice | Confirmed; DNS connection requires approval |
| Use Netlify Forms for contact submissions and notifications | Removes the separate Brevo credential and uses the existing hosting platform | Implemented; Netlify form detection and notification require one-time UI configuration |
| Keep info@aktenkompass.de as the direct-email fallback and notification recipient | Preserves a simple contact path | Confirmed |
| Do not store contact submissions in an application database | Netlify Forms is the only form store | Confirmed |
| Do not allow uploads, auto-confirmations, complete-content logs, analytics, or nonessential cookies/storage | Explicit scope and privacy minimization | Confirmed |
| Require server-side form validation, size limits, rate limiting, and honeypot | Basic abuse and input protection before enabling form delivery | Implemented; hosting-level rate-limit hardening remains recommended |
| Require SPF, DKIM, and DMARC before public launch | Reliable and safer sender authentication | Confirmed launch gate |
| Use self-hosted fonts only | Avoid external requests and third-party font processing | Confirmed |
| Do not use maps, booking, CAPTCHA, error monitoring, social embeds, chat, or newsletter services at launch | Keeps MVP and privacy surface small | Confirmed |
| Do not require cinematic scroll for the first public version | Static poster and semantic content are sufficient and more resilient | Confirmed |
| Prepare final desktop WebM/MP4, poster, and mobile video or poster-only fallback | Progressive enhancement with performance fallback | Confirmed; final media pending |
| Set media size limits after measurement | Avoids arbitrary budget assumptions and ties limits to observed UX | Confirmed |
| Maintain with Git history and Netlify deploy rollback | Adequate recovery path for low-traffic site | Confirmed |
| Pouya Hedayati owns and controls GitHub, Netlify, IONOS, and Brevo and authorizes public release | Single accountable operator | Confirmed; MFA/recovery review required |
| Public site is B2B-only and consultation-led | Matches product purpose and avoids transactional scope | Confirmed |
| Primary named service is Dokumentenmanagementsysteme (DMS) | “Dashboards” was considered unclear as a primary service label | Confirmed; data analysis/automation capabilities may remain accurately described |
| Use pre-launch, individual-operator claims only | Avoids implying GmbH/UG, team, agency, certification, references, or established customer base | Confirmed policy; legal wording still requires review |
| Publish the approved operator identity, pre-launch status, and service address in the legal/operator surface | Pouya Hedayati explicitly approved the wording and publication of the home address for this phase | Confirmed for Phase 2; not public-deployment authorization |
| Keep the initial browser runtime same-origin and storage-free | Phase 3 browser evidence found no external hostnames or persistent browser storage; local fonts and media satisfy the current target posture | Confirmed for current app; provider-side processing and future form flows remain gated |
| Support German and English at launch | Explicit operator scope decision, superseding the current German-only document assumption | Confirmed; architecture/content work required |

## Decisions deliberately not made

- No decision has been made to connect production DNS or deploy publicly.
- No decision has been made to publish the home address without legal/privacy
  review.
- No legal status has been established by this document.
- No Brevo credentials, DNS records, provider acceptance, or domain verification
  are represented here.
- No final hero media or licensing/usage approval has been recorded.
- No new package, framework, database, analytics, CMS, chatbot, or third-party
  integration is authorized by this document.

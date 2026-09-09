# AktenKompass Produktionsübergabe

## Technisch abgeschlossen

- [x] German-first homepage with responsive navigation
- [x] Functional `mailto:` consultation and problem-description CTAs
- [x] Functional `tel:` call CTA and clickable contact details
- [x] Impressum and Datenschutz routes
- [x] Metadata, robots.txt, and sitemap.xml
- [x] Local-only assets, no analytics, cookies, or third-party embeds
- [x] Lint, typecheck, unit tests, E2E tests, and production build

## Required owner approval before public DNS/deployment

- [ ] Review and approve the Impressum for the current legal status
- [ ] Review and approve the Datenschutz text for the selected hosting and mailbox providers
- [ ] Confirm the public email and phone are monitored and reachable
- [ ] Confirm rights and final approval for the hero and social-preview media
- [ ] Confirm SPF, DKIM, and DMARC for `aktenkompass.de`
- [ ] Enable MFA and recovery access for GitHub, Netlify, IONOS, and the mailbox
- [ ] Configure Netlify production context with `DEPLOYMENT_ENV=production` and `SEO_INDEXING_ENABLED=true`
- [ ] Run the final smoke test on the real production hostname before DNS cutover
- [ ] Confirm explicit production deployment authorization

## Deployment

```powershell
corepack pnpm@10.15.1 install --frozen-lockfile
corepack pnpm@10.15.1 lint
corepack pnpm@10.15.1 typecheck
corepack pnpm@10.15.1 test
corepack pnpm@10.15.1 test:e2e
corepack pnpm@10.15.1 build
```

The current implementation intentionally uses direct email and telephone contact. A contact form must not be enabled until Brevo sender verification, server-side validation, rate limiting, honeypot protection, privacy wording, and retention handling are implemented.

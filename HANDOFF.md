# AktenKompass Produktionsübergabe

## Technisch abgeschlossen

- [x] German-first homepage with responsive navigation
- [x] Functional `mailto:` consultation CTA and problem-description fallback
- [x] Contact form UI with validation, honeypot, rate limiting, and Brevo delivery route
- [x] Functional `tel:` call CTA and clickable contact details
- [x] Impressum and Datenschutz routes
- [x] Metadata, robots.txt, and sitemap.xml
- [x] Local-only assets, no analytics, cookies, or third-party embeds
- [x] Lint, typecheck, unit tests, E2E tests, and production build

## Required owner approval before public DNS/deployment

- [ ] Review and approve the Impressum for the current legal status
- [ ] Review and approve the Datenschutz text for the selected hosting and mailbox providers
- [ ] Confirm the public email and phone are monitored and reachable
- [ ] Add `BREVO_API_KEY` and `CONTACT_RECIPIENT_EMAIL` to the Netlify production environment
- [ ] Verify `website@aktenkompass.de` as a Brevo sender and test delivery to `info@aktenkompass.de`
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

The form is implemented but remains unavailable until the Brevo sender is verified and the production environment variables are configured. Until then, the visible email fallback remains available.

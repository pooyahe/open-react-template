# SEO, Metadata, Domain, and Indexing Readiness

## 1. Current indexing state

The application is German-first and currently defaults to a safe preview state. With no explicit production indexing configuration, the page emits `noindex, nofollow`, `/robots.txt` disallows crawling, and `/sitemap.xml` contains no URLs. This prevents local, ambiguous, and preview builds from becoming indexable accidentally.

Production indexing requires both:

```text
DEPLOYMENT_ENV=production
SEO_INDEXING_ENABLED=true
```

No deployment or DNS change was made.

## 2. Canonical-host strategy

The confirmed canonical hostname is the non-`www` URL:

```text
https://aktenkompass.de
```

The value is centralized in `config/site.ts`. Canonical links, production sitemap URLs, robots sitemap references, and production Open Graph URLs use this hostname. Preview and ambiguous builds do not emit a canonical link.

The later hosting phase must redirect any enabled `www` variant to the canonical non-`www` host and must not connect DNS without explicit authorization.

## 3. Route metadata inventory

| Route | Title | Description | Canonical when indexing enabled |
| --- | --- | --- | --- |
| `/` | Dokumentenmanagement für kleine Unternehmen \| AktenKompass | Strukturierte digitale Dokumentenverwaltung, pragmatische Automatisierung und verständliche Datennutzung für kleine Unternehmen. | `https://aktenkompass.de/` |
| `/impressum` | Impressum \| AktenKompass | Impressum und Angaben zum Betreiber von AktenKompass. | `https://aktenkompass.de/impressum` |
| `/datenschutz` | Datenschutz \| AktenKompass | Vorläufige Datenschutzhinweise für die aktuelle statische Website von AktenKompass. | `https://aktenkompass.de/datenschutz` |

The root document language remains `de`. No English routes, alternate-language URLs, or `hreflang` links are emitted.

## 4. Homepage title and description

The homepage metadata uses the primary confirmed service, Dokumentenmanagement, and supporting capabilities without guarantees, customer claims, certifications, or keyword stuffing. The wording follows the approved German-first content baseline and remains B2B-focused.

## 5. Robots behavior

`app/robots.ts` uses the same explicit indexing gate:

- Safe default/preview: `User-agent: *`, `Disallow: /`.
- Explicitly indexable production: `User-agent: *`, `Allow: /`, canonical host, and canonical sitemap URL.

Production indexing is not enabled by default in this phase.

## 6. Sitemap behavior

`app/sitemap.ts` uses the native Next.js metadata API. It emits only these public routes when indexing is explicitly enabled:

- `/`
- `/impressum`
- `/datenschutz`

No `lastModified` values are fabricated. Preview and ambiguous builds return an empty sitemap.

## 7. Preview noindex design

The design is provider-independent and server-side. It does not introduce a `NEXT_PUBLIC_*` deployment flag or a secret. The metadata robots directive and disallowing robots route provide defense in depth. The safe default is noindex whenever either the deployment context or explicit indexing approval is missing.

Production-like verification confirmed both branches:

- Preview/default build: no canonical, `noindex`, robots disallow, empty sitemap.
- Explicit production indexing build: canonical present, no `noindex`, robots allow, and sitemap contains the three canonical URLs.

## 8. German-language indexing status

German is the current indexed-language target, with `<html lang="de">` and `de_DE` Open Graph locale when indexing is enabled. English remains a future requirement. No nonexistent English URLs are advertised.

The deployment decisions contain an older broad “German and English at launch” scope statement, while the current architecture and phase instructions define a German-only release. This phase follows the current German-only release gate and does not implement bilingual routing. SEO architecture must be revisited when English routes are actually approved and built.

## 9. Structured-data decision

A conservative `WebSite` JSON-LD object describes only the verified site name,
canonical URL, description, language, and schema context. It deliberately does
not claim an incorporated organization and emits no review, rating, price,
certification, customer, or unsupported local-business data.

## 10. Social-preview asset status

Open Graph and Twitter metadata use the local hero poster only when explicit production indexing is enabled. The poster is a neutral local workplace image with no unsupported claims or third-party branding. A final branded social image remains recommended before public launch.

The inherited favicon and unused Cruip-style `public/images/logo.svg` were removed. `app/icon.svg` now supplies a minimal local AktenKompass-derived icon based on the approved blue brand mark. No external icon service is loaded.

## 11. Template residue findings

No Cruip, Open Pro, SaaS, Web3, crypto, login/signup, pricing, customer-count, or testimonial strings were found in rendered metadata. The public configuration placeholder `[BOOKING_URL]` was removed because no booking tool is approved. The remaining brand README and unused inherited image assets are not rendered, indexed, or referenced by the current application.

## 12. Bilingual SEO requirements for later

Before English indexing is introduced:

- create and review real English routes;
- define locale URL structure;
- add reciprocal `hreflang` links;
- localize titles, descriptions, headings, and social metadata;
- generate language-specific sitemap entries;
- review canonical behavior for each locale;
- test language navigation and duplicate-content behavior.

## 13. Production-domain requirements

Before public indexing:

- obtain explicit deployment authorization;
- connect and verify `aktenkompass.de` DNS;
- enforce HTTPS and normalize any `www` variant;
- confirm the production environment sets both indexing variables deliberately;
- validate the live canonical, robots, sitemap, and social metadata;
- complete legal, privacy, final-media, and email-authentication gates.

## 14. Remaining SEO blockers

- Public deployment and DNS authorization are outstanding.
- Final branded social-preview artwork is outstanding.
- The German/English scope conflict requires reconciliation before bilingual work.
- Final legal review and operator approval remain deployment gates.
- Search-console or equivalent ownership/verification has not been configured and is outside this phase.

## 15. Rollback instructions

To roll back Phase 7, restore the prior metadata exports and `config/site.ts`, remove `config/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, `app/icon.svg`, the SEO E2E test, and this report. Restore the removed inherited favicon/logo only if a later reviewed decision requires them; do not revert unrelated working-tree changes.

## Validation

The final validation commands and exit codes are recorded in the Phase 7 handoff. Production-like route responses were inspected for `/`, `/impressum`, `/datenschutz`, `/robots.txt`, and `/sitemap.xml`; homepage head output was inspected through Playwright.

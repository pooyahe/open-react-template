# Test Baseline

## 1. Test frameworks selected

- Vitest 3.2.7
- React Testing Library 16.3.2
- `@testing-library/jest-dom` 7.0.0
- Playwright 1.62.1
- jsdom 30.0.1 for component-test DOM behavior

## 2. Why each framework is necessary

Vitest provides deterministic TypeScript component tests without introducing a
second test runner. React Testing Library verifies user-visible semantics and
accessible roles. `jest-dom` provides readable DOM assertions. Playwright is
needed for real routing, responsive breakpoints, keyboard focus, mobile menu
behavior, and document overflow measurements.

Playwright uses a production-like `next start` server after `next build`, on a
machine-independent localhost port. Chromium is the only browser installed for
this foundation phase.

## 3. Component tests implemented

- Homepage H1 and primary CTA accessible name and target
- Required homepage content sections
- Header navigation landmark
- Meaningful primary navigation and CTA link names

Tests use semantic roles and do not assert Tailwind implementation classes.

## 4. Browser tests implemented

- Homepage renders with the expected H1 and actionable CTA
- `/impressum` and `/datenschutz` resolve, including footer navigation
- Desktop navigation is keyboard reachable and activates its anchor
- Mobile navigation opens, closes, keeps links usable, and avoids overflow
- Keyboard smoke test reaches visible interactive controls and activates the CTA
- Horizontal overflow regression at all required viewports

## 5. Viewports tested

1440×900, 1024×768, 768×1024, 390×844, and 320×700.

## 6. Accessibility behavior covered

The baseline checks semantic landmarks, accessible names, keyboard reachability,
visible focus, operable primary navigation and CTA controls, and basic mobile
menu state behavior. It is not a substitute for a full manual or automated
accessibility audit.

## 7. Intentionally not covered

Final legal wording, contact-form validation and submission, Brevo delivery,
database retention, bilingual routing, analytics/cookies, final hero media,
reduced-motion visual review, contrast measurement, and production deployment
configuration are outside Phase 1B.

## 8. Known limitations

Only Chromium is covered. Firefox and WebKit/Safari are later release-gate
requirements. Component tests mock `next/link` and `next/image`; routing and
layout behavior is covered in Playwright instead. Existing placeholder content
remains intentionally unresolved.

## 9. Commands and exit codes

Final command results are recorded in the handoff. The required command set is:

```text
corepack pnpm@10.15.1 lint
corepack pnpm@10.15.1 typecheck
corepack pnpm@10.15.1 test
corepack pnpm@10.15.1 build
corepack pnpm@10.15.1 test:e2e
corepack pnpm@10.15.1 audit
git diff --check
git status --short
```

The test runner also has `test:watch` and `test:e2e:headed` scripts.

Final Phase 1B exit codes:

- frozen install: 0
- lint: 0
- typecheck: 0
- component test: 0; 2 files and 2 tests passed in 8.48 seconds
- build: 0
- E2E: 0; 6 tests passed in 5.9 seconds after the production build
- audit: 0; no known vulnerabilities
- audit JSON: 0; critical/high/moderate/low/info all 0
- `git diff --check`: 0, with existing LF-to-CRLF warnings only

## 10. Execution time

Component tests completed in approximately 10 seconds in the local Windows
environment. Build and browser execution time is environment-dependent and is
reported with the final command output.

## 11. Future test requirements

- Contact form: server-side validation, size limits, rate limiting, honeypot,
  no content logging, and failure states.
- Brevo: server-only API-key handling, sender/reply-to behavior, and delivery
  failure handling using a controlled test account.
- Bilingual routing: locale links, metadata, route fallback, and no accidental
  language mixing.
- Privacy: third-party data-flow behavior, cookie/storage assertions, and
  retention documentation review.
- Production deployment: preview `noindex`, canonical metadata, legal routes,
  domain redirects, rollback, and monitoring checks.

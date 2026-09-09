# Test Strategy

## Purpose

Tests must protect user-visible promises and risky behavior, not chase arbitrary coverage percentages.

## Unit and component tests

Use Vitest and Testing Library for:

- Content/config validation where useful
- Header and mobile navigation behavior
- CTA anchor behavior
- Hero fallback selection logic
- Reduced-motion branch logic
- Contact form validation and states, if enabled
- Structured-data generation from verified configuration

Do not over-test static presentational markup.

## End-to-end tests

Use Playwright for critical flows:

1. Homepage loads with visible H1 and primary CTA
2. Primary CTA reaches the contact section
3. Mobile navigation opens, is keyboard usable, and closes
4. Legal links resolve
5. Reduced-motion mode displays a stable hero
6. Hero remains usable when video fails or is blocked
7. Contact form succeeds/fails clearly if enabled
8. No horizontal overflow on narrow mobile

## Accessibility checks

At minimum:

- Keyboard-only navigation
- Focus visibility
- Skip link
- Heading hierarchy
- Landmark structure
- Form label/error association
- Contrast inspection
- Reduced motion
- Decorative media handling

An automated accessibility scanner may be used, but manual keyboard and visual checks remain required.

## Performance checks

Inspect:

- Initial HTML includes hero text and CTA
- Hero dimensions are reserved
- Video is not render-blocking
- Mobile does not download unnecessary desktop media where avoidable
- Client component scope is controlled
- No repeated animation listeners or ScrollTrigger leaks
- Images have dimensions and optimized formats
- No unexpected third-party scripts

## Required commands

The final package scripts must support:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

## Evidence format

For each completed phase, the summary must state:

- Commands run
- Pass/fail result
- Browser sizes inspected
- Material issues found and fixed
- Remaining manual checks or placeholders

“Looks good” is not sufficient evidence.

## Phase 1B automated baseline

The repository now uses Vitest with React Testing Library and `jest-dom` for
stable component behavior, and Playwright for browser behavior that depends on
routing, responsive layout, keyboard input, and real focus handling. Chromium
is the initial automated browser target; Firefox and WebKit/Safari remain later
release-gate coverage.

The component baseline covers the homepage H1, primary CTA, required homepage
content, the header navigation landmark, and meaningful navigation link names.
The Playwright baseline covers homepage availability, both legal-route smoke
flows, footer navigation, desktop and mobile navigation, keyboard focus and
activation, and horizontal overflow at 1440, 1024, 768, 390, and 320 pixels.

Tests intentionally do not validate unresolved legal wording, contact-form or
Brevo behavior, bilingual routing, analytics, privacy retention, final media,
or a complete WCAG audit. Those require their own implementation and review
gates.

## Phase 6 accessibility baseline

The Playwright baseline now includes skip-link activation, visible focus
inspection, Escape-close and focus restoration for mobile navigation,
reduced-motion behavior, and a 200% text-scale proxy at a narrow desktop width.
The responsive overflow test continues to cover 1440, 1024, 768, 390, and 320
pixels. Native browser zoom, Firefox/WebKit, screen readers, and a complete
WCAG audit remain manual or later release-gate work.

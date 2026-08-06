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

---
name: website-foundation
description: Initialize or extend the project’s Next.js foundation, typed configuration, reusable layout, content architecture, responsive navigation, and test tooling. Use for application bootstrap and shared website structure, not for the specialized cinematic hero.
---

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and the active GSD plan.
2. Use current stable Next.js with App Router, TypeScript strict mode, Tailwind, and `pnpm`.
3. Prefer server components; create the narrowest possible client boundaries.
4. Put business values in typed config and homepage text in typed content modules.
5. Implement semantic landmarks, skip navigation, keyboard support, and visible focus from the beginning.
6. Add only the dependencies required by the active phase and verify legitimacy.
7. Add or update focused Vitest and Playwright coverage for user-visible behavior.
8. Run focused checks, then the phase-required gates.
9. Report changed files, dependencies, tests, and remaining placeholders.

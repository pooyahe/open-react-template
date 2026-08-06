---
name: quality-gate
description: Verify a completed phase or release using lint, type checking, tests, build, Playwright, accessibility, performance, content, and diff review. Use before claiming completion or shipping.
---

1. Read the active phase acceptance criteria in `TASK.md` and GSD verification artifacts.
2. Run the phase-required commands; for final readiness run:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm test:e2e`
   - `pnpm build`
3. Inspect the changed diff and ensure no unrelated files or secrets were introduced.
4. Delegate parallel read-only reviews to accessibility, performance, content, and quality agents when appropriate.
5. Test desktop, tablet, mobile, narrow mobile, and reduced-motion behavior.
6. Verify the hero before video load and under media failure.
7. Verify links, navigation, legal routes, and contact paths.
8. Fix blocking issues sequentially, rerun affected checks, then rerun the final gate.
9. Never convert an unverified manual judgment into a passing claim.
10. Produce a concise evidence report with commands, browser sizes, findings, fixes, and remaining placeholders.

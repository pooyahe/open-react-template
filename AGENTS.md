# Repository Instructions

## Mission

Transform the existing Cruip `open-react-template` codebase into a fast, accessible, German-language corporate website for a digitalization company serving small businesses. The site is primarily a digital business card and lead-generation homepage, not a broad SaaS product.

## Existing-template rule

This repository already contains a working Next.js template. It is the application foundation.

- Audit before changing application code.
- Preserve useful layout, components, responsive behavior, and styling primitives.
- Adapt incrementally; do not replace the repository wholesale.
- Do not run `create-next-app` or any bootstrap script that creates another application.
- Do not overwrite `package.json`, `pnpm-lock.yaml`, Next.js configuration, TypeScript configuration, or existing application folders without a reviewed migration reason.
- Preserve the template's copyright and GPL terms. Do not republish, redistribute, or resell the source as a template.

## Source of truth

Read these before implementation:

1. `TASK.md` — phase order and completion gates
2. `docs/PRD.md` — product requirements and scope
3. `docs/CONTENT.md` — approved German content and placeholders
4. `docs/DESIGN_SYSTEM.md` — visual rules
5. `docs/ARCHITECTURE.md` — technical boundaries
6. `docs/TEST_STRATEGY.md` — required verification
7. `.planning/` — GSD state after initialization

When documents conflict, use this precedence: `TASK.md` → `docs/PRD.md` → specialized document → generated planning notes. Record material resolutions in `docs/DECISIONS.md`.

## Working method

- Use GSD for phase planning and durable state. Do not manually recreate GSD internals.
- Use Graphify before broad source searches after a graph exists.
- Keep the main Codex thread focused on coordination, decisions, phase state, and final review.
- Delegate independent exploration, content review, accessibility review, performance review, and test analysis to subagents.
- Avoid parallel writes to overlapping files.
- Make small, reviewable, atomic commits.
- Never overwrite unrelated user changes.
- Do not claim completion without command output and browser evidence.

## Technical baseline

Preserve the template baseline unless the audit proves a change is necessary:

- Next.js App Router
- React Server Components
- TypeScript
- Tailwind CSS v4
- pnpm and the existing `pnpm-lock.yaml`
- Existing package-manager version from `package.json`

On this Windows environment, plain `pnpm` may not be globally available. Use `corepack pnpm@10.15.1` when needed. Do not create `package-lock.json` or switch package managers.

Add only justified dependencies. GSAP ScrollTrigger may be used for the cinematic hero only when native CSS, video playback, and IntersectionObserver are insufficient.

## Product constraints

- German-first website using formal `Sie` language.
- Primary audience: small businesses with paper-heavy or fragmented processes.
- Core services: document management, AI consulting and automation, data analysis, and dashboards.
- Visual style: clean corporate, calm, trustworthy, modern, and human.
- Do not use cyberpunk visuals, humanoid robots, fake dashboards, invented customer numbers, fake testimonials, fake certifications, or unsupported savings claims.
- Keep the MVP concise. Do not add authentication, a database, CMS, blog, customer portal, chatbot, or complex backend without an explicit approved decision.

## Code rules

- Prefer server components. Use client components only for interaction or browser APIs.
- Keep business content in typed configuration/data files, not duplicated across components.
- Keep components small and semantically named.
- Preserve accessibility: semantic HTML, keyboard access, visible focus, contrast, reduced motion, labeled controls, and non-animation alternatives.
- Treat the cinematic hero as progressive enhancement. The page must remain useful if video, JavaScript, or motion is unavailable.
- Do not expose secrets or personal data in source code.
- Validate and sanitize contact-form input server-side if a form backend is enabled.

## Required workflow before redesign

1. Verify a clean Git state and create a baseline commit.
2. Run and record the existing template's development and production build behavior.
3. Build the Graphify graph.
4. Produce `docs/TEMPLATE_AUDIT.md` with the component reuse map, removable SaaS content, dependency risks, accessibility risks, performance risks, route decisions, and license considerations.
5. Reconcile GSD so Phase 1 is template audit and adaptation foundation.
6. Only then modify the homepage.

## Quality commands

Use the scripts that exist at each phase. The intended final gates are:

```powershell
corepack pnpm@10.15.1 lint
corepack pnpm@10.15.1 typecheck
corepack pnpm@10.15.1 test
corepack pnpm@10.15.1 test:e2e
corepack pnpm@10.15.1 build
```

If a script is initially absent, record that as a baseline gap and add it deliberately during Phase 1. Also inspect desktop and mobile behavior in a real browser and verify reduced-motion behavior.

## Blocking review findings

- Broken mobile navigation or CTA
- Hero content unreadable before video loads
- Motion without reduced-motion fallback
- Layout shift caused by hero media
- Fabricated marketing or trust claims
- Missing or misleading legal placeholders
- Unnecessary client-side rendering
- Failing lint, type, tests, build, or critical browser flow
- Large dependency added without documented justification

# Master Execution Task

## Objective

Adapt the existing Cruip Open Next.js template into a production-ready, German-language, clean corporate homepage for a digitalization company serving small businesses. The site must explain the offer quickly, demonstrate the transformation from paper burden to digital clarity, and convert visitors into consultation requests.

## Execution principles

- Preserve and adapt the working template; do not bootstrap a second application.
- Follow phases in order.
- Use GSD as the durable planner and state manager after initialization.
- Use Graphify as repository knowledge after the initial graph is built.
- Keep the site intentionally small and polished.
- Use explicit placeholders for missing business, legal, contact, and media facts.
- Do not deploy or connect paid services without credentials and approval.
- Preserve the template license and copyright information.

---

## Phase 0 — Workflow integration and baseline

### Goal

Integrate Codex project instructions, GSD, and Graphify without modifying the working website.

### Tasks

1. Confirm the repository root, current branch, clean status, and remote.
2. Confirm the template runs with `corepack pnpm@10.15.1 dev`.
3. Run the existing production build and record the result.
4. Confirm Codex loaded `AGENTS.md`, `.codex/config.toml`, subagents, and skills.
5. Install GSD Core for Codex at project/local scope.
6. Initialize or reconcile GSD with `docs/PRD.md` and this task file.
7. Install Graphify project-scoped for Codex.
8. Install and verify its Git hook.
9. Build the initial graph.
10. Commit the workflow integration as an atomic baseline.

### Acceptance criteria

- The original template still runs after workflow files are merged.
- GSD project state exists under `.planning/`.
- Graphify can index the repository and its hook is active.
- No application source file was changed during workflow integration.
- The repository has a clean baseline commit.

---

## Phase 1 — Template audit and adaptation foundation

### Goal

Understand the existing codebase and prepare a safe component-level adaptation plan.

### Tasks

1. Audit routes, layouts, components, styles, public assets, dependencies, metadata, and scripts.
2. Use Graphify before broad searches to identify page composition and component relationships.
3. Create `docs/TEMPLATE_AUDIT.md` containing:
   - application structure,
   - reusable components,
   - components to modify,
   - SaaS-specific sections to remove,
   - routes/assets to retain or delete,
   - design-token mapping,
   - dependency risks,
   - accessibility and performance risks,
   - baseline command results,
   - license and attribution handling.
4. Create a component reuse map from current files to the target sections.
5. Preserve pnpm and the existing lockfile.
6. Add missing `lint`, `typecheck`, `test`, and `test:e2e` scripts only after inspecting the current setup.
7. Add Vitest/Testing Library and Playwright only when absent and justified.
8. Create typed site configuration with business placeholders.
9. Establish a minimal homepage smoke test before major visual changes.

### Acceptance criteria

- `docs/TEMPLATE_AUDIT.md` is complete and evidence-based.
- The reuse/removal plan names exact files.
- Existing behavior remains intact except for deliberate tooling corrections.
- Build and available checks pass, or baseline failures are documented clearly.
- GSD roadmap reflects adaptation rather than greenfield bootstrap.

---

## Phase 2 — Brand system and content architecture

### Goal

Convert the template's visual language and content model into a clean, approachable digitalization brand.

### Tasks

1. Implement colors, typography, spacing, radii, shadows, widths, and motion tokens from `docs/DESIGN_SYSTEM.md` using the existing Tailwind v4 setup.
2. Retain useful existing primitives and remove duplicated components.
3. Move homepage copy into typed data/config modules.
4. Implement responsive navigation with target-page anchors.
5. Add visible keyboard focus, skip navigation, and scroll-margin behavior.
6. Replace startup/SaaS terminology with approved German content.

### Acceptance criteria

- Content has a clear typed source of truth.
- No long-form copy is duplicated across components.
- Navigation works by keyboard and on mobile.
- No horizontal overflow exists at 320 px.
- The page remains coherent without animation.

---

## Phase 3 — Static conversion homepage

### Goal

Complete the full static homepage before introducing cinematic complexity.

### Required sections

1. Hero fallback with headline and CTAs
2. Common business problems
3. Services: DMS, AI/automation, data analysis/dashboards
4. Before/after transformation
5. Practical process
6. Use cases or benefits
7. Trust principles
8. Contact/consultation CTA
9. Footer with legal links

### Acceptance criteria

- A visitor understands the company, services, target audience, and next action from one page.
- All sections are readable on mobile.
- No unsupported claims, invented testimonials, or invented metrics appear.
- Critical content works without JavaScript animation.

---

## Phase 4 — Cinematic scroll hero

### Goal

Implement the paper-to-data visual story as progressive enhancement.

### Tasks

1. Use media paths defined in `docs/ASSET_MANIFEST.md` and a poster fallback until final assets exist.
2. Reserve stable dimensions to avoid layout shift.
3. Support WebM and MP4 sources where provided.
4. Implement the stages: paper burden, paper dissolving, data entering the laptop, organized work and relief.
5. Keep concise text overlays synchronized with scroll progress.
6. Add reduced-motion, mobile, loading, failure, and no-JavaScript fallbacks.
7. Prefer a robust staged composition over unreliable exact video-frame seeking.

### Acceptance criteria

- Hero content appears immediately before video is ready.
- Video failure never hides the headline or CTA.
- Reduced-motion mode uses a stable visual without scroll scrubbing.
- Mobile remains performant.
- Browser tests cover fallback behavior.

---

## Phase 5 — Contact, legal placeholders, and trust

### Goal

Provide credible, low-friction conversion paths without unnecessary backend complexity.

### Tasks

1. Implement configurable email, phone, and booking-link CTAs.
2. Add an inquiry form only if configured and justified.
3. Create `/impressum` and `/datenschutz` placeholder routes clearly marked for legal review.
4. Avoid nonessential third-party scripts before consent.
5. Build trust from process and competence rather than invented endorsements.

### Acceptance criteria

- At least one conversion path works without a third-party widget.
- Legal placeholders cannot be mistaken for finalized legal advice.
- No secrets are committed.

---

## Phase 6 — SEO and metadata

### Goal

Make the website understandable to search engines and social previews.

### Tasks

1. Implement configurable title, description, canonical URL, Open Graph metadata, robots, and sitemap.
2. Add structured data only for verified facts.
3. Confirm one H1, logical headings, and correct media alternatives.
4. Avoid geographic or business claims until configured.

### Acceptance criteria

- Metadata renders from configuration.
- Structured data contains no placeholder claims presented as fact.
- Sitemap and robots routes build.

---

## Phase 7 — Quality, accessibility, and performance

### Goal

Prove production readiness.

### Intended final commands

```powershell
corepack pnpm@10.15.1 lint
corepack pnpm@10.15.1 typecheck
corepack pnpm@10.15.1 test
corepack pnpm@10.15.1 test:e2e
corepack pnpm@10.15.1 build
```

### Browser matrix

- Desktop around 1440×900
- Tablet around 768×1024
- Mobile around 390×844
- Narrow mobile at 320 px
- Reduced-motion mode
- Video-failure fallback

### Acceptance criteria

- All configured final commands pass.
- No blocking accessibility issue, broken link, console error, hydration error, or horizontal overflow remains.
- Hero media does not block primary content.
- Final evidence includes command output and browser inspection.

---

## Phase 8 — Deployment readiness

### Goal

Prepare a clean handoff without forcing a hosting provider.

### Tasks

1. Complete setup and environment documentation.
2. Document hero asset replacement and compression.
3. Document deployment for Vercel and generic Node hosting.
4. Verify a clean install and production build.
5. Record every remaining business, legal, media, and credential placeholder in `HANDOFF.md`.
6. Update GSD and Graphify state.

### Acceptance criteria

- A new developer can clone, install, run, test, and build using documented commands.
- `HANDOFF.md` lists all owner actions.
- Repository is clean.

---

## Deferred backlog

Do not implement without explicit approval:

- Blog or CMS
- Industry subpages
- Customer portal
- Authentication or database
- Live chat or AI chatbot
- CRM integration
- Newsletter automation
- Multilingual routing
- Customer case studies without verified source material

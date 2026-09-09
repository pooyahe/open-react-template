# Design Implementation Plan

## Scope and design decision

The repository is a working Cruip Open PRO Next.js template, but its current
homepage is an English, dark SaaS landing page. The target is a predominantly
light, German-language corporate homepage for a practical digitalization
consultancy serving small businesses. The redesign should retain the technical
foundation and responsive primitives while changing the brand expression,
content model, route relevance, and motion strategy.

This plan is based on the required project documents, the existing source, the
structural Graphify graph, and independent architecture, UX/content,
accessibility, and performance reviews. No application source is changed by
this plan.

## Reference analysis: additional visual direction

The two supplied references show a mature, light corporate information site.
They are useful for layout discipline and hierarchy, but their enterprise
navigation, login affordance, and branded claims must not be copied into this
small-business consultancy MVP.

### Typography

- Use a bold, highly legible sans-serif for headings with tight but readable
  line height. The reference uses strong black headings rather than thin,
  oversized startup display text.
- Body copy is dark navy/black on white, set at a comfortable reading size with
  generous line spacing. Important phrases are emphasized selectively with bold
  weight inside paragraphs.
- Keep headings sentence- or title-case in German and avoid all-caps labels
  except for small, genuinely useful metadata.
- The visual hierarchy comes from weight, size, and whitespace rather than
  gradients, glow, or decorative type treatments.

### Spacing and page rhythm

- The page uses a wide white canvas with a centered content rail and large
  vertical gaps between major content blocks.
- The header has generous horizontal breathing room and a shallow height. The
  main content begins well below it, giving the page a calm, established feel.
- Long-form sections use a readable max width instead of filling every pixel;
  CTA blocks are separated from body copy with substantial whitespace.
- Use the reference rhythm as a refinement of the existing plan: broad desktop
  gutters, a clear content rail, and visibly distinct section starts. Preserve
  the planned 20–24px mobile gutters and stack spacing on narrow screens.

### Hierarchy and content structure

- Reference 01 demonstrates a simple reading sequence: one strong H2, two short
  explanatory paragraphs, a centered CTA, then a contrasting editorial content
  block.
- Reference 02 demonstrates a conventional corporate page sequence: utility
  header, primary navigation bar, breadcrumb, visual hero, then explanatory
  content. For the target site, retain the clarity of these layers without
  adding enterprise information architecture that the MVP does not need.
- The target homepage should therefore use a compact header/navigation layer,
  a decisive hero, concise problem and service sections, and a single final
  conversion path. Avoid placing long paragraphs above the first useful CTA.
- Use bold inline emphasis sparingly for concrete terms such as documents,
  recurring tasks, data, and dashboards; never use emphasis to create
  unsupported performance claims.

### Card and content-block treatment

- The references favor large, rectangular editorial blocks with light-blue or
  warm neutral surfaces, not dense collections of floating gradient cards.
- For services, use three calm cards or bordered blocks with moderate radii,
  thin borders, clear H3 headings, short descriptions, and compact benefit
  lists. A subtle tinted surface may distinguish the cards, but avoid heavy
  shadows and pill-shaped containers.
- Reserve a stronger tinted panel for one meaningful conversion or explanatory
  block, such as the digitalization check. It should remain a real CTA, not a
  fake whitepaper promotion or invented resource offer.
- Before/after content can use two adjacent editorial panels on desktop and a
  clearly labeled vertical comparison on mobile. Color should support meaning:
  warm paper for the starting state and soft blue/white for organized digital
  work.

### Navigation

- The reference header establishes a clear corporate pattern: logo on the left,
  utility actions on the right, and a distinct horizontal navigation band below.
- For this project, simplify that pattern to one compact header. Use the
  typographic company placeholder on the left, anchor links for Leistungen,
  Vorgehen, Vorteile, and Kontakt, and one prominent
  “Kostenloses Erstgespräch” CTA.
- Do not copy “Login”, language switching, search, or enterprise-level utility
  controls; they are outside MVP scope. Add only a real contact action and
  verified legal links.
- A breadcrumb is unnecessary for the single-page homepage. It becomes useful
  only on future legal or secondary routes, where it must not compete with the
  primary conversion path.
- A blue navigation bar can be expressed more lightly through an accent-colored
  CTA or a thin active-link treatment; do not introduce a full-width saturated
  bar unless it improves contrast and remains consistent with the approved
  light corporate palette.

### Hero composition

- Reference 02 uses a wide, stable media rectangle with the image carrying the
  visual story and a dark translucent text panel anchored on the left. This is a
  strong composition model for the paper-to-digital hero.
- Adapt it with a controlled dark-navy text-safe panel over the left side of the
  poster/video, white H1 text, a restrained eyebrow, supporting copy, and one
  primary plus one secondary CTA. The panel must have enough opacity and
  padding to remain readable across poster, video, and crop variations.
- Keep the central/right media area available for the paper, laptop, and human
  office story. Do not overlay a fake dashboard or embed generated text in the
  video.
- Maintain a stable wide aspect ratio on desktop and move the text above or
  below the media on mobile when a crop would reduce contrast. The poster must
  still communicate the offer without JavaScript.
- Reference 01’s centered CTA below long-form copy supports using a second,
  standalone consultation prompt later in the page, but the hero CTA should
  remain close to the headline for conversion clarity.

### Accessibility and trust interpretation

- The reference includes visible accessibility controls, but the implementation
  should prioritize native semantic accessibility, keyboard support, focus
  visibility, reduced motion, and tested contrast rather than copying third-party
  floating widgets.
- The references are from a large branded enterprise context. Their customer
  language, whitepaper promotion, login, and global-business navigation are not
  evidence for this company and must not be reproduced as claims or sections.

## 1. Current template design audit

### Composition

The current public homepage is assembled as:

```text
Root layout → Header → Default layout → PageIllustration →
Hero → Workflows → Features → Testimonials → CTA → Footer
```

## Static visual phase implementation record

Completed:

- Added light corporate color variables and Tailwind theme tokens in
  `app/css/style.css`.
- Replaced the dual-font dark shell with one local font strategy and German
  document metadata in `app/layout.tsx`.
- Added typed configuration in `config/site.ts`, `config/navigation.ts`, and
  `content/homepage.ts`.
- Rebuilt the header with anchor navigation, a responsive mobile menu, skip
  navigation, visible focus treatment, and a consultation CTA.
- Replaced the centered SaaS hero with a static wide poster-backed hero using
  `public/media/hero/hero-poster.webp`. Scroll-synchronized video is not
  implemented.
- Added homepage structure for problems, services, before/after transformation,
  process, use cases, benefits, intermediate CTA, contact CTA, and footer.
- Added `/impressum` and `/datenschutz` routes as clearly marked legal
  placeholders.
- Removed unused template homepage components, fake testimonials/logos, auth
  routes, and the demo API route from the application surface.
- Removed runtime AOS usage from the app. The dependency remains in
  `package.json`/`pnpm-lock.yaml` because the environment’s pnpm store/network
  configuration prevented a safe package removal; it is no longer imported or
  executed.

Validation evidence:

- `corepack pnpm@10.15.1 dev`: started successfully on port 3003 after the
  initial hot-reload process became stale.
- `Invoke-WebRequest http://localhost:3003/`: returned HTTP 200; rendered HTML
  contains the poster path, German hero text, and navigation labels.
- `./node_modules/.bin/tsc.cmd --noEmit`: passed after removing stale `.next`
  generated types.
- `./node_modules/.bin/next.cmd build`: passed; six static routes were generated.
- The in-app browser runtime reported no available browser, and Playwright is
  not installed locally. Therefore no screenshots were produced and the
  requested viewport, reduced-motion, and overflow checks still require browser
  validation.

Remaining work:

- Replace the temporary poster conversion with the final approved
  paper-to-digital hero poster when supplied.
- Remove AOS and its type package from `package.json` and `pnpm-lock.yaml` once
  the pnpm store/network issue is resolved.
- Validate mobile menu focus return, exact responsive wrapping, contrast, and
  visual spacing in a real browser at the required viewport sizes.
- Add focused automated tests and browser evidence before treating the phase as
  fully accepted.
- Implement the cinematic hero only in the next phase, with progressive media
  loading, reduced-motion fallback, and no dependency on video for essential
  content.

Recommended prompt for the cinematic hero phase:

```text
Implement only the cinematic hero phase described in
docs/DESIGN_IMPLEMENTATION_PLAN.md. Preserve the completed static homepage and
all unrelated user changes. Use the final assets from docs/ASSET_MANIFEST.md:
hero-poster.webp first, then optional desktop/mobile WebM and MP4 sources.

Add the hero as progressive enhancement: server-rendered German headline,
supporting copy, CTAs, and poster must appear immediately; reserve stable media
dimensions; load video only near the viewport; pause it offscreen; and provide a
visible poster/error state when media fails. Add coarse staged overlays for the
paper-to-digital story only where supported. Do not hide essential content in
video frames. Respect prefers-reduced-motion, simplify or disable playback on
mobile/constrained devices, and keep the no-JavaScript poster state complete.

Do not add authentication, a form backend, CMS, database, fake dashboards,
unsupported claims, or broad visual changes. Use native video, CSS, and
IntersectionObserver first. Add GSAP only if a measured limitation justifies
it, and record that decision. Validate with typecheck, production build, and
real-browser screenshots at desktop, tablet, mobile, reduced motion, and media
failure states.
```

The current route groups produce `/`, `/signin`, `/signup`, and
`/reset-password`; there is also an unused `/api/hello` route. Authentication is
not part of the target MVP.

### Visual language

- Dark gray/navy backgrounds with indigo gradients, glows, blurred shapes, and
  decorative illustrations.
- Nacelle and Inter are both loaded; the system currently favors a startup/SaaS
  display treatment rather than calm editorial corporate typography.
- Cards use rounded, gradient-bordered surfaces and low-opacity light text.
- The page relies on template imagery, fake client logos, testimonials, and
  product/workflow screenshots.
- The hero is centered promotional copy plus a clickable modal video thumbnail,
  not the required paper-to-digital cinematic story.

### Navigation and content

The header contains only Cruip branding plus `Sign In` and `Register`; it has no
navigation landmark, target-page anchors, mobile menu, or consultation CTA.
Many links use `#0`. The homepage copy is English SaaS/product language such as
“AI-driven tools”, “Start Building”, “Schedule Demo”, and “Join the content-first
platform”.

### Responsive behavior

The template has useful `max-w-6xl`, padding, grid, and mobile stacking patterns.
However, mobile navigation is absent, some controls are hidden on mobile, and
the content hierarchy is still based on a desktop SaaS template. The existing
hero image has explicit dimensions, which is a useful layout-stability pattern
to preserve.

### Animation and client behavior

- AOS is initialized from the default layout, making the entire default layout
  a client component.
- AOS applies opacity-based entrance states directly to hero headings, copy,
  CTAs, and the video thumbnail. Slow JavaScript, disabled JavaScript, or
  failed hydration can therefore hide essential content.
- Infinite gradient animation appears in global styles and hero/CTA headings.
- `Spotlight` and `useMousePosition` add high-frequency pointer listeners and
  layout reads.
- `Testimonials` uses client-side filtering and masonry behavior.
- `ModalVideo` uses Headless UI correctly as a starting dialog primitive, but it
  is the wrong primary architecture for an inline progressive-enhancement hero.

### Risks found

- No real mobile navigation or focus-management model.
- Document language is `en`; metadata and brand labels are template defaults.
- Focus styles are inconsistent and some outlines are suppressed.
- Several low-opacity color combinations are likely to fail contrast checks.
- No reduced-motion branch exists.
- The current video path is malformed in the hero (`videos//video.mp4`), and the
  video has no captions, transcript, or meaningful failure fallback.
- `lint`, `typecheck`, `test`, and `test:e2e` scripts are not all present; lint
  currently prompts because ESLint configuration is absent. The existing build
  was reported as passing by the read-only audit.
- The worktree already contains a user modification to
  `docs/DESIGN_SYSTEM.md`; it must be preserved.

## 2. Components that can be retained

Retain boundaries and useful mechanics, not the current appearance or copy.

| Existing file | Retain | Adaptation |
| --- | --- | --- |
| `components/ui/header.tsx` | Header shell, container, logo placement | Rebuild as semantic German navigation with a keyboard-accessible mobile menu and configured CTA. |
| `components/ui/footer.tsx` | Responsive grid and footer spacing | Reduce to tagline, anchor links, contact, Impressum, Datenschutz, and preserved license/copyright handling. |
| `components/ui/logo.tsx` | Small brand component boundary | Replace Cruip asset/name with `[COMPANY_NAME]` typographic placeholder. |
| `components/workflows.tsx` | Card/grid and responsive layout ideas | Convert to services or process cards with headings, approved German content, and restrained visuals. |
| `components/features.tsx` | Grid/card patterns | Convert to problems, transformation, benefits, or use cases; remove fake product claims and screenshots. |
| `components/cta.tsx` | CTA layout and button affordances | Use configured `mailto:`, `tel:`, booking, and anchor destinations. |
| `app/css/style.css` | Tailwind v4 entry point and existing utility setup | Replace theme tokens, dark defaults, animation rules, and focus/contrast primitives. |
| `app/layout.tsx` | App Router root layout and font loading boundary | Set `lang="de"`, metadata, light body tokens, skip link, and one documented font strategy. |

The existing `max-w-6xl` container, grid breakpoints, explicit media sizing,
button classes, and server-first App Router structure are valuable foundations.

## 3. Components and sections to simplify

- `hero-home.tsx`: keep the semantic hero boundary, but replace centered SaaS
  copy and modal thumbnail with a left-safe text block, poster-backed media,
  and optional cinematic enhancement.
- `workflows.tsx`: simplify from image-led SaaS workflows to three service cards:
  Dokumentenmanagement, KI-Beratung und Automatisierung, and Datenanalyse und
  Dashboards. If the design system requires four visible service labels, split
  the last card into Datenanalyse and Dashboards/Reporting without inventing a
  fourth business capability.
- `features.tsx`: reuse only the layout idea for the practical transformation,
  use cases, or trust principles. Avoid tabs, filters, fake interfaces, and
  decorative icon density.
- `cta.tsx`: make the final consultation CTA calm, direct, and configurable;
  remove gradients and template terminology.
- `modal-video.tsx`: retain Headless UI only if a separate user-triggered video
  remains justified. Prefer an inline `<video>` enhancement for the hero.
- `app/(default)/layout.tsx`: remove AOS initialization and return to a server
  component. Motion should be local and optional.

## 4. Components and sections to remove

Remove from the target homepage and likely from the relevant public surface:

- `components/testimonials.tsx` and `utils/useMasonry.tsx`: fabricated people,
  companies, logos, claims, filtering, and masonry complexity.
- `components/spotlight.tsx` and `utils/useMousePosition.tsx`: pointer-tracking
  glow effects with no business value.
- `components/page-illustration.tsx` and blurred/glowing template artwork unless
  a specific asset is validated for the new visual direction.
- Auth routes under `app/(auth)/**`, including sign-in, sign-up, and password
  reset; they conflict with the MVP scope and should not be linked.
- `app/api/hello/route.ts`, if confirmed unused.
- Product/company/resource/content-library footer groups, pricing, blog,
  careers, social placeholders, client logos, fake statistics, and all `#0`
  links.
- `public/images/testimonial-*`, `client-logo-*`, workflow screenshots, and
  SaaS illustrations from the homepage path once no remaining source imports
  them. Deletion should be a separate reviewed cleanup, not part of the first
  visual pass.

Do not remove the repository’s GPL/copyright/license material.

## 5. Proposed light corporate design system

### Tokens

Use the approved `docs/DESIGN_SYSTEM.md` values as CSS variables or Tailwind
theme tokens. Validate rendered contrast before finalizing:

| Role | Token |
| --- | --- |
| Ink / primary text | `#132235` |
| Deep navy | `#0B1F33` |
| Accent blue | `#356AE6` |
| Accent hover | `#2855BF` |
| Soft blue surface | `#EAF0FF` |
| Warm paper surface | `#F3EEE7` |
| Page background | `#F8F9F7` |
| White surface | `#FFFFFF` |
| Muted text | `#5F6B78` |
| Border | `#DCE2E8` |

Use a restrained accessible green and red only after contrast validation. Avoid
neon gradients, glowing purple surfaces, heavy blur, and decorative infinite
motion.

### Typography and layout

- Choose one modern readable sans-serif family, preferably the existing local
  font if its metrics and German glyph coverage are suitable; otherwise use a
  single robust fallback strategy. Do not load Inter and Nacelle redundantly.
- H1: fluid and restrained, approximately `clamp(2.7rem, 6vw, 5.5rem)`.
- H2: approximately 2–3.5rem; H3: approximately 1.25–1.6rem.
- Body: 1rem with 1.5+ line height; large intro text 1.125–1.25rem.
- Keep body measure near 55–72 characters and reading blocks near 700–760px.
- Use a 1200–1280px content width, 20–24px mobile gutters, and 32–48px
  desktop gutters.
- Use thin borders, moderate radii, and subtle shadows only where hierarchy
  requires them. Buttons remain solid accent primary and bordered secondary.

### Motion

Use 160–240ms for control transitions and 400–700ms for optional reveals.
Motion should describe paper becoming organized information. All content must
be visible without motion; `prefers-reduced-motion: reduce` disables scroll
scrubbing, continuous animation, and nonessential transitions.

## 6. Homepage information hierarchy

The homepage should follow the approved content order:

1. Header with `Leistungen`, `Vorgehen`, `Vorteile`, `Kontakt`, and
   `Kostenloses Erstgespräch`.
2. Hero: “Weniger Papier. Mehr Zeit für Ihr Unternehmen.” plus concise support
   copy and two CTAs; video is enhancement, not the information source.
3. Problem section: recognizable paper, email, spreadsheet, and fragmented-data
   pain points.
4. Services: three core cards with concrete descriptions and benefits.
5. Before/after transformation: operational changes, without invented metrics.
6. Process: Verstehen → Priorisieren → Umsetzen.
7. Benefits/trust: personal collaboration, clarity, gradual implementation,
   existing systems, privacy and security considered early.
8. Contact/digitalization-check CTA with configured direct contact paths.
9. Footer with tagline, anchor links, contact, legal placeholders, and license
   handling.

The optional FAQ/use-case content in the design direction should be added only
if it remains concise and does not displace the primary conversion path.

## 7. Desktop, tablet, and mobile behavior

### Desktop: approximately 1440×900

- Keep an editorial two-column hero: readable text in the left safe area and
  paper-to-digital media occupying the right/central visual field.
- Use generous section spacing and a maximum content width near 1200–1280px.
- Services can use three columns; before/after can use a two-column comparison;
  process can use three horizontal steps.
- Keep the header compact, clear, and visually light rather than a floating
  dark pill.

### Tablet: approximately 768×1024

- Collapse services and process into two-column or stacked groups as needed.
- Keep the hero text above or beside media with a stable aspect-ratio media box.
- Preserve visible navigation where it fits; otherwise use the same tested
  disclosure menu as mobile rather than a second interaction model.
- Reduce decorative media and motion to maintain hierarchy and touch spacing.

### Mobile: approximately 390×844 and narrow 320px

- Use a single-column flow, 20–24px gutters, and full-width or comfortably
  tappable buttons.
- Provide a menu button with `aria-expanded`, `aria-controls`, Escape handling,
  focus return, and visible focus styling.
- Place headline, support text, and primary CTA before or over a static poster;
  do not require video or scrolling to understand the offer.
- Prefer poster-only behavior or a smaller mobile video when bandwidth,
  reduced-motion, or device capability makes playback inappropriate.
- Test text wrapping, long German labels, 200% zoom, and no horizontal overflow.

## 8. Hero video integration strategy

Implement the hero as progressive enhancement in stages:

1. Server-render the eyebrow, H1, support copy, CTAs, and a stable poster frame
   from the expected `public/media/hero/hero-poster.webp` path.
2. Reserve the media dimensions with `aspect-ratio` or a responsive min-height
   so poster/video replacement cannot shift the page.
3. Add desktop WebM and MP4 sources from `docs/ASSET_MANIFEST.md`; use `muted`,
   `playsInline`, and controlled loading. No audio or embedded text.
4. Load or activate video near the viewport with `IntersectionObserver`, pause
   it offscreen, and expose a poster/error state when loading or playback fails.
5. Use coarse staged overlays synchronized to normalized progress only on
   capable devices. Prefer “paper burden”, “structured information”,
   “central findability”, and “clearer decisions” as HTML text stages.
6. Under reduced motion, on constrained mobile, or without JavaScript, show the
   poster and all semantic content without scroll-scrubbing.
7. Add captions/transcript only if the video contains meaningful spoken content;
   the planned no-audio asset should still have an equivalent textual story.

Do not use frame-accurate seeking or GSAP until native video, CSS, and
IntersectionObserver are measured and shown to be insufficient. GSAP would be a
hero-only dependency and must be justified in `docs/DECISIONS.md`.

## 9. Accessibility requirements

- Set `<html lang="de">` and use accurate German accessible names.
- Add a skip link, one clear `nav` landmark, semantic `main`, labeled sections,
  one H1, logical H2/H3 hierarchy, and footer navigation groups.
- Make every link destination real and action-specific; remove `#0`.
- Build the mobile menu for keyboard, screen reader, Escape, focus return, and
  touch use.
- Provide consistent high-contrast `:focus-visible` styles on every control.
- Meet WCAG 2.2 AA-oriented contrast: 4.5:1 normal text, 3:1 large text and
  non-text focus indicators.
- Keep all essential content visible with JavaScript disabled, slow hydration,
  failed media, or animation disabled.
- Respect `prefers-reduced-motion`; never make motion carry unique meaning.
- If a video has speech, provide captions and a transcript; provide a visible
  failure/fallback state regardless.
- Use empty alt text for decorative imagery and meaningful alt text only for
  informative media.
- If a form is later enabled, associate labels, validate server-side, announce
  errors, use `aria-invalid`/`aria-describedby`, and protect against spam.
- Verify keyboard navigation, focus visibility, text resize, 320px width, and
  browser zoom in a real browser.

## 10. Performance strategy

- Remove global AOS; keep the default layout server-rendered.
- Keep client components limited to mobile navigation, hero media behavior, and
  optional form interaction.
- Select one font strategy and avoid redundant font downloads or reflow.
- Do not load hero video before it is useful; use poster-first rendering,
  controlled preload, viewport activation, offscreen pause, and WebM/MP4
  alternatives.
- Compress poster and video assets, keep them free of audio, and avoid raw
  footage in the repository.
- Remove mouse-tracking, masonry, and high-frequency layout work from the MVP.
- Use stable dimensions for all above-the-fold media and avoid layout shifts.
- Avoid third-party analytics, embeds, or consent scripts until explicitly
  approved and required.
- Measure LCP, CLS, INP, long tasks, font shifts, video request timing, and
  scroll scripting at desktop, tablet, 390px, 320px, reduced motion, and media
  failure states.

## 11. Exact source files likely to change

### First implementation surface

- `app/layout.tsx`
- `app/(default)/layout.tsx`
- `app/(default)/page.tsx`
- `app/css/style.css`
- `app/css/additional-styles/theme.css`
- `components/ui/header.tsx`
- `components/ui/logo.tsx`
- `components/ui/footer.tsx`
- `components/hero-home.tsx`
- `components/workflows.tsx`
- `components/features.tsx`
- `components/cta.tsx`

### New files when their phase begins

- `config/site.ts`
- `config/navigation.ts`
- `content/homepage.ts`
- `components/sections/problems.tsx`
- `components/sections/services.tsx`
- `components/sections/transformation.tsx`
- `components/sections/process.tsx`
- `components/sections/benefits.tsx`
- `components/sections/contact.tsx`
- `components/hero/hero-media.tsx` or a similarly small hero client controller
- `app/impressum/page.tsx`
- `app/datenschutz/page.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `test/` and `tests/e2e/`
- `public/media/hero/hero-poster.webp` and final WebM/MP4 assets when supplied

### Candidates for reviewed removal after imports are gone

- `components/testimonials.tsx`
- `utils/useMasonry.tsx`
- `components/spotlight.tsx`
- `utils/useMousePosition.tsx`
- `components/page-illustration.tsx`
- `components/modal-video.tsx` if no dialog remains
- `app/(auth)/**`
- `app/api/hello/route.ts`

Do not edit or revert the existing user change in `docs/DESIGN_SYSTEM.md`.

## 12. Implementation phases

### Phase 1 — Audit foundation and static shell

Create typed site/content configuration, establish light tokens, set German
metadata/language, remove AOS from the global layout, and implement semantic
header/footer/navigation. No cinematic behavior yet.

### Phase 2 — Static German homepage

Implement hero fallback, problems, services, transformation, process,
benefits/trust, contact CTA, and footer using approved content. All essential
content must work without JavaScript, video, or animation.

### Phase 3 — Contact, legal, and metadata

Configure direct `mailto:`, `tel:`, and booking paths; add clearly marked legal
review placeholder routes; add metadata, robots, sitemap, and verified
structured data only where facts exist.

### Phase 4 — Cinematic hero enhancement

Add poster and optional WebM/MP4 video, stable dimensions, viewport activation,
staged overlays, reduced-motion branch, mobile simplification, and failure
fallback. Add GSAP only after a measured native implementation gap.

### Phase 5 — Quality and browser evidence

Add justified lint/type/test/E2E tooling, then verify the required browser
matrix, keyboard flows, contrast, reduced motion, video failure, no-JavaScript
state, no horizontal overflow, and performance metrics.

## 13. Acceptance criteria for each phase

### Phase 1 acceptance

- No application redesign depends on AOS or a global client layout.
- The document is German, light-themed, and has one real navigation landmark.
- Header/mobile menu and footer destinations are meaningful and keyboard usable.
- Site/content data has a typed source of truth.
- No auth or template SaaS CTA is linked from the public shell.

### Phase 2 acceptance

- A visitor can explain the company, audience, three services, process, and next
  action from the homepage.
- The page has one H1 and a logical heading hierarchy.
- No fake customers, testimonials, logos, metrics, certifications, pricing,
  login/signup buttons, or unsupported claims remain.
- All essential content is visible without JS, video, or motion.
- The page works at 320px without horizontal overflow.

### Phase 3 acceptance

- At least one direct conversion path works without a third-party widget.
- Impressum and Datenschutz are clearly labeled as placeholders pending legal
  review, not presented as final legal advice.
- Metadata is generated from configuration and contains no invented business
  facts.

### Phase 4 acceptance

- Poster, headline, and CTAs appear immediately before video readiness.
- Missing or failed video never hides content and causes no layout shift.
- Reduced motion and mobile use a stable, comprehensible visual state.
- Desktop WebM/MP4 sources are used only when the final assets exist and are
  compressed; the poster remains a valid fallback.

### Phase 5 acceptance

- `lint`, `typecheck`, `test`, `test:e2e`, and `build` pass, or any baseline gap
  is explicitly documented with a follow-up decision.
- Browser evidence covers 1440×900, 768×1024, 390×844, 320px, keyboard use,
  reduced motion, JavaScript-disabled content, and video failure.
- No console, hydration, focus, contrast, overflow, or critical CTA issue
  remains.
- Performance review records LCP, CLS, INP, media request timing, and major
  long tasks.

## First implementation phase proposal

Start with **Phase 1 — Audit foundation and static shell**. Establish the light
token layer, German document shell, typed content boundaries, accessible anchor
navigation/mobile menu, and simplified footer while leaving the hero as a fully
usable static fallback. This creates a safe visual and semantic foundation for
the later homepage sections and cinematic enhancement.

### Exact Codex prompt for Phase 1

```text
Read AGENTS.md, TASK.md, docs/PRD.md, docs/CONTENT.md, docs/DESIGN_SYSTEM.md,
docs/ARCHITECTURE.md, docs/ASSET_MANIFEST.md, and
docs/DESIGN_IMPLEMENTATION_PLAN.md. Use the existing Cruip Open React template
as the foundation. Implement only Phase 1: audit foundation and static shell.

Before editing, inspect the current source and preserve unrelated user changes,
especially docs/DESIGN_SYSTEM.md. Do not bootstrap a new app, replace the
repository, or add cinematic scroll behavior yet.

Create typed site/navigation/content configuration as needed. Set the root
document to German, implement the approved light corporate tokens, remove the
global AOS client boundary, and adapt the header, logo, and footer into an
accessible German shell with anchor navigation, a keyboard-operable mobile menu,
visible focus states, skip navigation, and configured placeholder contact CTAs.
Remove public links to sign-in, signup, and template SaaS actions. Keep the
homepage content itself as a usable static fallback; do not add video scrubbing,
GSAP, a form backend, authentication, CMS, database, or invented business facts.

Use server components by default. Add a client component only where mobile menu
interaction requires it. Preserve the existing Next.js, TypeScript, Tailwind v4,
pnpm, and lockfile baseline. Record any material dependency or architecture
decision in docs/DECISIONS.md. Run the relevant existing checks and report exact
command output. Do not claim completion without verifying the desktop/mobile
navigation behavior and reduced-motion-safe static state in a real browser.
```

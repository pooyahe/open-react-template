---
name: cinematic-scroll
description: Design, implement, debug, or review the paper-to-data cinematic scroll hero with video, stage overlays, GSAP, performance safeguards, mobile behavior, and reduced-motion fallbacks. Use only for hero motion/media work.
---

1. Read `docs/DESIGN_SYSTEM.md`, `docs/ASSET_MANIFEST.md`, `docs/ARCHITECTURE.md`, and Phase 4 in `TASK.md`.
2. Preserve server-rendered headline, supporting text, and CTAs independently of motion.
3. Reserve media dimensions and render a poster immediately.
4. Prefer staged overlays over fragile frame-perfect seeking.
5. Use GSAP context and deterministic cleanup if ScrollTrigger is required.
6. Do not initialize scrub animations in reduced-motion mode.
7. Simplify or disable motion on constrained mobile layouts.
8. Handle missing source, load failure, autoplay restriction, and offscreen behavior.
9. Avoid unique essential information inside the video.
10. Add tests for fallback selection and Playwright coverage for reduced motion/video failure.
11. Inspect for layout shift, listener leaks, contrast changes, and horizontal overflow.
12. Return evidence from tests and real browser checks.

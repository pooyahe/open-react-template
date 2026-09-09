# Performance Report

## 1. Baseline measurements

Measurements were taken against the production build served by `next start` through the existing local production test server. The browser was Chromium, with one cold page load per viewport. These are synthetic local measurements, not field Core Web Vitals.

| Metric | 1440px before | 390px before | 1440px after | 390px after |
| --- | ---: | ---: | ---: | ---: |
| Requests | 13 | 13 | 13 | 13 |
| Total transferred | 217,603 B | 203,859 B | 217,682 B | 198,514 B |
| Encoded resource bytes | 213,703 B | 199,959 B | 213,782 B | 194,614 B |
| HTML snapshot | 60,858 B | 60,950 B | 62,115 B | 62,207 B |
| JavaScript | 115,078 B | 115,078 B | 115,078 B | 115,078 B |
| CSS | 9,024 B | 9,024 B | 9,024 B | 9,024 B |
| Fonts | 57,776 B | 57,776 B | 57,776 B | 57,776 B |
| Hero image | 26,482 B | 12,738 B | 26,482 B | 7,314 B |
| LCP | 404 ms | 236 ms | 448 ms | 452 ms |
| CLS | 0 | 0 | 0 | 0 |
| Horizontal overflow | 0 px | 0 px | 0 px | 0 px |

The mobile image transfer decreased by 5,424 B (42.6%) after the `sizes` correction. The small HTML increase is the longer responsive `sizes` value and is immaterial relative to the image saving. LCP variance is expected from local single-run timing and is not treated as a field regression.

The measurement command is `node scripts/measure-performance.cjs`. It records navigation timing, resource categories, LCP, CLS, image dimensions, overflow, and external hostnames.

## 2. Performance budgets

The initial budgets are:

- LCP: <= 2.5 seconds under representative test conditions.
- CLS: <= 0.1.
- INP: <= 200 ms when real interactions are measurable.
- No unintended horizontal overflow.
- No render-blocking hero video.
- Headline and primary CTA must be available without waiting for media.
- No unnecessary third-party requests or client-side JavaScript.

The local measurements meet the LCP and CLS budgets. INP is not measurable on an untouched page load because no interaction entries were emitted; the existing keyboard and navigation E2E tests remain the appropriate interaction smoke coverage. Local timings are not a substitute for field data under mobile CPU/network throttling.

## 3. LCP candidate analysis

The LCP candidate in both measured viewports is the local hero poster image, delivered through the Next.js image optimizer. The headline and CTA are server-rendered in the same reserved hero container and do not depend on image or video completion.

The hero reserves space with explicit responsive minimum heights (`620px`, `640px`, and `680px`), so the current poster does not introduce a measurable layout shift.

## 4. JavaScript assessment

The production build reports 111 kB First Load JS for the homepage, with 102 kB shared and a 5.34 kB route entry. The only intentional client boundary in the application shell is the header, which needs state for mobile navigation. Homepage sections remain server components. No scroll listeners, `requestAnimationFrame` loops, dynamic script injection, or runtime animation library execution were found in the current homepage path.

The inherited `aos` dependency and legacy AOS selectors are not active in the current rendered path. Their removal remains a separate dependency/template-cleanup decision because the package and legacy styles are outside this narrow performance change.

## 5. Font assessment

Fonts are local through `next/font/local` and use `display: swap`. Only the required normal weights are loaded:

- `nacelle-regular.woff2`: 28,772 B.
- `nacelle-semibold.woff2`: 28,404 B.

Italic font files exist in `public/fonts` but were not requested by the measured page. The measured browser font transfer was 57,776 B. Nacelle licensing is still a separate launch-review item and is not resolved by this performance phase.

## 6. Image assessment

The current important image is `public/media/hero/hero-poster.webp`, a local WebP of 2,208 × 1,152 pixels and 84,586 B. It is rendered with `next/image`, `fill`, `priority`, and a responsive `sizes` attribute.

The change narrows the mobile `sizes` declaration to `calc(100vw - 2.5rem)`, matching the 350px rendered mobile hero width. Desktop continues to use the 1,200px source candidate. No unused image files were deleted in this phase because the inherited assets may still be referenced by future template cleanup work and deletion is not needed for the current page payload.

## 7. Hero/media assessment

No video is referenced by the current homepage, and no video request occurred during the production-browser measurements. The current hero is therefore poster-only, with no render-blocking video, no autoplay, and no audio path.

The inherited `public/videos/video.mp4` is not part of the current hero implementation. Static metadata inspection and browser metadata loading found 1,280 × 720 pixels, 14.16 seconds, an `avc1` H.264 video track, and no `mp4a` audio marker. Its file size is 2,790,943 B (approximately 1.58 Mbps average container bitrate). It remains unused and is not presented as the final hero asset.

The poster is local, independently useful, and suitable as the current mobile fallback. Reduced-motion CSS disables transitions and animations; the current hero has no motion-dependent behavior.

## 8. Changes implemented

- Corrected the hero image `sizes` value for the actual narrow mobile container.
- Added `scripts/measure-performance.cjs` for repeatable production-mode measurements.
- Added this report.

No page structure, approved content, typography, animation system, legal surface, third-party integration, or hosting configuration was changed.

## 9. Before/after measurements

The before state was measured after the initial production build with the former `(max-width: 768px) 100vw` image sizing. The after state was measured after the responsive sizing correction and a fresh production build.

Desktop remained effectively unchanged: the optimized hero transfer was 26,482 B and JavaScript/CSS/font payloads were identical. Mobile now requests a 384px image candidate and transfers 7,314 B instead of the former 640px candidate at 12,738 B.

## 10. Mobile assessment

The 390px hero renders at 350 × 620 CSS pixels, has no horizontal overflow, and uses a 384px optimized image candidate. The current poster-only behavior avoids loading the 2.79 MB unused MP4 on mobile or desktop. The existing E2E suite also checks overflow at 320px, 390px, 768px, 1024px, and 1440px.

## 11. Reduced-motion assessment

The global stylesheet includes a `prefers-reduced-motion: reduce` fallback that disables smooth scrolling and reduces animation/transition durations. The current hero uses a static poster and has no required animation, so the page remains fully usable with reduced motion enabled.

## 12. Remaining performance risks

- The final cinematic hero video has not been supplied and must be measured after delivery.
- Field LCP/INP data is unavailable before a real preview or production deployment.
- The inherited unused video and Cruip image set add repository weight, though they are not requested by the current page.
- Nacelle licensing requires launch review.
- The local measurement is not a throttled mobile Lighthouse run.

## 13. Final hero media specification

For this page's wide desktop crop and tall mobile crop, the future final media should meet these targets:

| Item | Recommendation |
| --- | --- |
| Desktop video | 1,920 × 1,080 maximum; 16:9 source with a centered safe composition |
| Mobile video | Optional 960 × 1,280 maximum; poster-only is acceptable for the first release |
| Duration | 8–12 seconds; avoid the current 14.16s placeholder duration unless justified |
| MP4 | H.264 (`avc1`), yuv420p, 24/30 fps, approximately 1.2–2.0 Mbps |
| WebM | VP9, 24/30 fps, approximately 0.8–1.4 Mbps |
| Desktop file size | MP4 <= 2.5 MB; WebM <= 1.8 MB |
| Mobile file size | MP4 <= 1.2 MB; WebM <= 900 KB |
| Poster | WebP, 2,208 × 1,152 or a similarly composed responsive source |
| Poster size | <= 150 KB source; optimized delivery should remain substantially smaller |
| Audio | None; no audio track and no autoplay audio |
| Fallback | Local poster, readable overlay, and semantic text/CTA without video |
| Preload | `metadata` or `none`; do not preload the complete video without measured justification |

The final asset must be checked at desktop and mobile dimensions, with reduced motion selecting poster-only behavior.

## 14. Future Netlify caching recommendations

These recommendations are for the later hosting phase and are not implemented here:

- Keep Next.js hashed `/_next/static/*` assets immutable and long-lived.
- Cache the poster and future media with content-hash filenames or an equivalent immutable release strategy.
- Serve video with byte-range support and cache headers suitable for public, non-personal media.
- Do not cache future contact responses or any server-side form endpoint.
- Confirm cache behavior in deploy previews and production before relying on it for budgets.

## 15. Rollback instructions

To roll back the Phase 5 implementation, restore the previous `sizes` value in `app/(default)/page.tsx` and remove `scripts/measure-performance.cjs` plus this report. Do not revert unrelated working-tree changes. The application has no new runtime dependency or hosting change from this phase.

## Validation status

Final command results:

| Command | Exit code | Result |
| --- | ---: | --- |
| `corepack pnpm@10.15.1 lint` | 0 | Passed |
| `corepack pnpm@10.15.1 typecheck` | 0 | Passed |
| `corepack pnpm@10.15.1 test` | 0 | 2 component tests passed |
| `corepack pnpm@10.15.1 build` | 0 | Passed; homepage First Load JS 111 kB |
| `corepack pnpm@10.15.1 test:e2e` | 0 | 9 Chromium tests passed |
| `corepack pnpm@10.15.1 audit` | 0 | No known vulnerabilities found |
| `git diff --check` | 0 | Passed; line-ending warnings only |

The E2E overflow test covers 1440px, 1024px, 768px, 390px, and 320px. Lighthouse was not available in the repository/tool environment and was not installed; the Playwright production-mode measurement is the equivalent evidence used for this phase.

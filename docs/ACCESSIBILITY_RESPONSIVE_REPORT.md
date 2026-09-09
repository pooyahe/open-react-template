# Accessibility and Responsive Quality Report

## 1. Accessibility baseline

The application uses semantic HTML, a German document language, an App Router layout, local fonts, server-rendered page content, and a client-only mobile navigation header. The homepage has one H1, section H2 headings, content H3 headings, one main region, named navigation landmarks, a footer landmark, and a global skip link.

The initial browser baseline already covered homepage availability, legal routes, keyboard navigation, mobile menu behavior, focus reachability, and 320–1440px horizontal overflow. The Phase 6 audit extended that coverage for skip-link focus, visible focus, Escape-close behavior, reduced motion, and a narrow text-scaling proxy.

## 2. Semantic structure findings

No material heading-level defect was found. The homepage has one meaningful H1; section headings are H2; process, service, comparison, and use-case cards use H3. Legal routes each have one H1. Links are used for navigation and buttons are used for the mobile-menu action.

The homepage and legal routes expose one identifiable `main#main-content`. The legal pages previously lacked the skip-link target; this was corrected and the target is programmatically focusable.

## 3. Keyboard-navigation findings

The keyboard pass verified:

- Skip link is first reachable and moves focus to main content.
- Header navigation and primary CTA are reachable.
- Mobile navigation opens from its button and remains keyboard usable.
- Escape closes the mobile navigation and restores focus to the menu button.
- Footer and legal links are reachable and operable.
- No unexpected focus trap or hidden focused element was observed.

## 4. Focus findings

The existing global `:focus-visible` rule provides a 3px blue outline with offset. Automated browser coverage now verifies that a primary CTA receives a non-zero visible outline. The mobile menu no longer clips its own focus outline because unnecessary `overflow: hidden` was removed from `.menu-button`.

## 5. Contrast findings

The current palette was checked using WCAG relative-luminance contrast calculations. Representative results:

| Combination | Contrast | Assessment |
| --- | ---: | --- |
| `#356ae6` on white | 4.82:1 | Passes normal-text AA |
| `#2855bf` on white | 6.68:1 | Passes AA |
| `#5f6b78` on white | 5.44:1 | Passes AA |
| `#132235` on `#f8f9f7` | 15.20:1 | Passes AA |
| `#93c5fd` on `#0b1f33` | 9.26:1 | Passes AA |
| `#bfdbfe` on `#0b1f33` | 11.75:1 | Passes AA |
| Focus blue on deep navy | 3.46:1 | Sufficient adjacent contrast for the current focus treatment |

No color-token change was necessary.

## 6. Image/media findings

The hero poster is meaningful as visual context and has the alternative text `Arbeitsplatz mit Laptop und digitalen Unterlagen`. The visible H1 and supporting copy carry the actual business message, so the poster is not the sole source of meaning. Decorative gradients and icon-like dots are hidden from assistive technology.

The future cinematic hero must have no required audio, must not announce decorative motion unnecessarily, must keep the meaningful narrative in visible text, and must provide an equivalent static poster for reduced-motion users.

## 7. Reduced-motion findings

The existing reduced-motion media query disables smooth scrolling and reduces CSS animation and transition durations. Browser coverage now emulates reduced motion and verifies that the page content remains visible and document scrolling becomes `auto`. The current poster-based hero has no required animation.

## 8. Responsive findings

Production-mode Chromium coverage passed at 1440px, 1024px, 768px, 390px, and 320px with no unintended horizontal overflow. Buttons, navigation, legal text, footer content, and the primary CTA remained usable.

The 200% text-scale proxy initially exposed intrinsic-width overflow in the hero and was used to drive these narrow fixes:

- hero content column now permits shrinking with `min-w-0 w-full max-w-full`;
- hero heading and paragraph are constrained to the available width;
- hero CTA row can wrap at larger breakpoints.

A representative 620px narrow-desktop text-scale proxy now passes for essential content, footer visibility, and horizontal overflow. A literal 640px `html { font-size: 200% }` proxy is not a reliable browser-zoom equivalent because it simultaneously scales rem-based spacing while leaving media-query breakpoints unchanged; real browser zoom remains a manual release check.

## 9. 200% zoom/text-scaling findings

The automated proxy uses a 620px viewport and a 200% root-font-size setting. H1, primary CTA, footer, and page width checks pass. Browser automation in the current harness does not control native browser zoom in a way that faithfully reproduces every browser's reflow algorithm. Manual validation at 200% browser zoom remains required before public launch, especially for card grids and legal text.

## 10. Automated coverage

Playwright Chromium now covers:

- skip-link focus and main-content focus;
- named navigation and legal-route navigation;
- desktop keyboard reachability;
- mobile menu open, close, Escape behavior, and focus restoration;
- visible focus outline;
- reduced-motion behavior;
- narrow text-scale proxy;
- horizontal overflow at 1440, 1024, 768, 390, and 320px;
- privacy, security-header, homepage, and legal-route smoke checks.

The final E2E run executed 13 tests successfully. Component tests remain focused on stable homepage and header behavior.

## 11. Manual checks

The production-like browser pass inspected desktop, tablet, mobile, and narrow-mobile layouts. Keyboard behavior was exercised through Tab, Enter, Escape, skip-link activation, mobile menu activation, CTA activation, and legal navigation. Contrast was checked from the actual CSS tokens. Native 200% browser zoom and assistive-technology announcements were not fully reproducible in the current automation harness and remain manual release checks.

## 12. Changes implemented

- Added `main#main-content` and `tabIndex={-1}` to legal routes and the homepage layout.
- Added Escape handling and focus restoration for mobile navigation.
- Removed menu-button overflow clipping that could obscure focus indication.
- Added responsive shrink/wrap behavior for the hero content and CTA at text-scaled narrow widths.
- Added E2E coverage for skip link, focus visibility, Escape behavior, reduced motion, and text scaling.

No approved copy, legal/operator facts, visual direction, external service, or final hero media was changed.

## 13. Remaining accessibility gaps

- Native browser zoom at 200% still requires manual cross-browser confirmation.
- Firefox, WebKit/Safari, and assistive-technology screen-reader passes remain future release-gate work.
- A complete WCAG audit and automated scanner have not been introduced.
- The future contact workflow does not yet exist and therefore has not been behaviorally tested.

## 14. Requirements for the future contact form

The eventual form requires explicit labels, descriptions where needed, clear required-field indication, programmatically associated errors, accessible status messages, keyboard submission, focus management after errors, and error indication that does not rely on color alone. It must remain compatible with the no-database, no-file-upload, server-validation, rate-limit, honeypot, and privacy constraints already documented.

## 15. Requirements for the future cinematic hero

The future video must remain progressive enhancement: no essential information may depend on playback, decorative video should not be unnecessarily announced, audio is not required, poster content must be local, reduced-motion users must receive the static experience, and mobile must be allowed to remain poster-only when media performance is not demonstrated.

## 16. Release recommendations

Before private preview, perform a manual keyboard pass at the preview hostname and review the legal routes at 200% native browser zoom. Before public launch, add Firefox/WebKit checks, test with a screen reader, confirm final media fallbacks, and perform a targeted WCAG 2.2 AA review of the final content and any future form.

## 17. Rollback instructions

To roll back Phase 6, restore the previous header, layout, legal-route main elements, hero class names, and E2E test file. Remove this report. Do not revert unrelated working-tree changes, especially `docs/DESIGN_SYSTEM.md` or prior deployment-phase work.

## Validation

Final validation results:

| Command | Exit code | Result |
| --- | ---: | --- |
| `corepack pnpm@10.15.1 lint` | 0 | Passed |
| `corepack pnpm@10.15.1 typecheck` | 0 | Passed |
| `corepack pnpm@10.15.1 test` | 0 | 2 component tests passed |
| `corepack pnpm@10.15.1 build` | 0 | Passed; homepage First Load JS 111 kB |
| `corepack pnpm@10.15.1 test:e2e` | 0 | 13 Chromium tests passed |
| `corepack pnpm@10.15.1 audit` | 0 | No known vulnerabilities found |
| `git diff --check` | 0 | Passed; line-ending warnings only |

The initial 120-second build attempt timed out during Next.js type checking without an error; reruns with a 300-second bound completed successfully.

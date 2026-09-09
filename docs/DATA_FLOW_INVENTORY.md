# Data-Flow Inventory

Evidence date: 2026-09-09. The browser inventory was run against the
production-like Next.js start server at 1440×900 and 390×844. The observed
browser origin was 127.0.0.1:3100; a future Netlify deployment will replace
that origin without changing the same-origin resource model.

## Browser requests

| Source | Destination | Trigger | Data categories | Purpose | Storage | Retention | Provider | Status |
|---|---|---|---|---|---|---|---|---|
| Visitor browser | Same-origin / and Next.js route assets | Initial homepage load | HTTP request metadata; requested resources | Render the homepage | No application storage observed | Not established for hosting logs | Current Next.js app; planned Netlify origin | CURRENT APP / HOSTING PLANNED |
| Visitor browser | Same-origin /_next/image | Initial homepage load | Image request metadata; local poster path and size parameters | Optimize the locally hosted hero poster | No browser storage observed | Not established for hosting logs | Next.js image route | CURRENT |
| Visitor browser | Same-origin CSS, JavaScript, and RSC routes | Initial load and client navigation | HTTP request metadata; route/resource URLs | Render and navigate the static app | No application storage observed | Not applicable in app | Next.js app | CURRENT |
| Visitor browser | Same-origin compiled Nacelle font assets | Initial page load | HTTP request metadata; font resource request | Render the approved local typography | No browser storage observed | Not applicable in app | Next.js local font handling | CURRENT |
| Visitor browser | Same-origin /impressum and /datenschutz | Footer/legal navigation | HTTP request metadata; route/resource URLs | Display legal information | No application storage observed | Not applicable in app | Next.js app | CURRENT |
| Visitor browser | Same-origin anchor targets | Header/navigation or CTA interaction | No new external data; URL fragment | Move within the page | No application storage observed | Not applicable | Browser navigation | CURRENT |
| Visitor browser | Same-origin Netlify Forms endpoint | Contact-form submission | Name, email, message, optional company and telephone | Deliver a non-binding inquiry | Netlify Forms submission storage | Provider-side retention requires final review | Netlify; optional IONOS notification | IMPLEMENTED |

The browser test observed no request to an external hostname at either tested
viewport. All observed requests were same-origin resources, including the
compiled local fonts and local hero poster. No request was made for the
unreferenced public/videos/video.mp4.

## Non-browser and planned paths

| Source | Destination | Trigger | Data categories | Purpose | Storage | Retention | Provider | Status |
|---|---|---|---|---|---|---|---|---|
| Visitor's mail client | info@aktenkompass.de | Visitor chooses the direct-email fallback | Email address, headers, and message content supplied by visitor | Non-binding introductory conversation | IONOS mailbox; no application database | Policy recorded in deployment context; legal review remains required | IONOS | AVAILABLE |
| Netlify Forms | Netlify project administration; optional info@aktenkompass.de notification | Contact-form submission | Name, company, email, optional telephone, message | Store and notify the operator | Netlify Forms | Six-month policy and deletion rules recorded in deployment context | Netlify and optionally IONOS | IMPLEMENTED; UI ACTIVATION REQUIRED |
| Git repository and deployment pipeline | Netlify | Future preview or production deployment | Source code, build metadata, deployment logs | Host and deploy the application | Provider-controlled build/deploy records | Provider policy not yet documented here | Netlify | PLANNED / DOMAIN NOT CONNECTED |

The contact form uses Netlify Forms and no application database. No upload,
analytics, marketing, or nonessential browser-storage flow is present.

## Evidence limitations

The browser session cannot establish provider-side server-log retention,
processing regions, or legal obligations. Those items require provider-console,
DPA, and legal review before public launch.

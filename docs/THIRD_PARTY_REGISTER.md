# Third-Party Register

Evidence date: 2026-08-07. “Loaded by browser” refers to the current
production-like application behavior, not provider-side processing that may
occur after deployment.

| Provider | Service | Purpose | Current status | Loaded by browser | Server-side only | Processing region | DPA status | Privacy review | Removal/replacement decision |
|---|---|---|---|---|---|---|---|---|---|
| Netlify | Hosting, deploy previews, production hosting | Planned application delivery and builds | PLANNED; not deployed or DNS-connected | No current local browser load; future origin only | Hosting/build processing | Not confirmed | Netlify DPA review pending | REQUIRED before deployment | Use selected Netlify path; document actual data flows before preview/public launch |
| IONOS | Mailbox for info@aktenkompass.de | Receive direct inquiries and future form notifications | CURRENT mailbox provider; no browser script | No | Yes, mailbox-side | Not confirmed | Provider/DPA review pending | REQUIRED before contact workflow launch | Retain as receiving mailbox |
| Brevo | Transactional Email API | Future server-side contact-form notifications | PLANNED; not integrated | No | Yes | Not confirmed | Provider/DPA and domain-verification review pending | REQUIRED before integration | Do not integrate in Phase 3; keep mailto fallback |
| GitHub | Source repository | Source control and review | CURRENT repository provider | No runtime browser load | Repository/service-side | Not confirmed | Not applicable to visitor runtime; account review pending | Operational review | Retain as source repository |

## Current runtime dependencies that are not third parties

- Next.js and React runtime assets are served by the application origin.
- Nacelle regular and semibold fonts are loaded through Next.js local-font
  handling from repository assets under public/fonts. The repository does not
  currently document the Nacelle font license; licensing must be verified before
  public launch.
- The hero poster is a local repository asset. The existing MP4 is not
  referenced by the current homepage.
- No Google Fonts, external CSS, remote icons, analytics, advertising pixels,
  social embeds, maps, CAPTCHA, chat, scheduling, newsletter, or monitoring
  provider is loaded.

## Inherited template resources

The repository contains unused Cruip-era components/assets and an unused AOS
dependency/CSS file. Static inspection found no import or runtime request for
those resources. They are documented for a later controlled cleanup and were
not broadly removed in this privacy phase.

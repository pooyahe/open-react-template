# Third-Party Register

Evidence date: 2026-09-09. “Loaded by browser” refers to the current
production-like application behavior, not provider-side processing that may
occur after deployment.

| Provider | Service | Purpose | Current status | Loaded by browser | Server-side only | Processing region | DPA status | Privacy review | Removal/replacement decision |
|---|---|---|---|---|---|---|---|---|---|
| Netlify | Hosting, deploy previews, production hosting, Forms | Application delivery, builds, contact-submission storage and notification | DEPLOYED; Forms configuration pending | Site origin only | Hosting/build/form processing | Not confirmed | Netlify DPA review pending | REQUIRED before public launch | Retain; enable form detection and configure retention/notification |
| IONOS | Mailbox for info@aktenkompass.de | Receive direct inquiries and future form notifications | CURRENT mailbox provider; no browser script | No | Yes, mailbox-side | Not confirmed | Provider/DPA review pending | REQUIRED before contact workflow launch | Retain as receiving mailbox |
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

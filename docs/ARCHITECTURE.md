# Technical Architecture

## Stack

Use a current stable Next.js release with:

- App Router
- TypeScript strict mode
- Tailwind CSS
- `pnpm`
- ESLint
- Vitest + Testing Library
- Playwright
- GSAP ScrollTrigger only for the cinematic hero if justified

## Repository target structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── sections/
│   ├── hero/
│   └── ui/
├── config/
│   ├── site.ts
│   └── navigation.ts
├── content/
│   └── homepage.ts
├── lib/
│   ├── metadata.ts
│   ├── structured-data.ts
│   └── validation.ts
└── test/
    └── setup.ts

tests/
└── e2e/

public/
├── images/
└── media/hero/
```

Do not create every folder preemptively. Add folders when the first real file requires them.

## Rendering model

- Prefer server components for layout and content sections.
- Use client components only for:
  - mobile navigation state
  - cinematic scroll behavior
  - optional form interaction
  - browser APIs
- Keep the client boundary as low as practical.

## Content model

Create typed configuration modules:

- `siteConfig`: name, description, URL, locale, contact details, social links, booking URL
- `navigation`: anchor labels and hrefs
- `homepageContent`: hero, services, process, benefits, contact

Components receive data rather than embedding repeated business copy.

## Cinematic hero architecture

Recommended layered approach:

1. Server-rendered semantic hero content and poster
2. `<video>` with WebM and MP4 sources as enhancement
3. Client-side controller for stage progress
4. Text overlays driven by normalized progress
5. Reduced-motion branch that does not instantiate ScrollTrigger
6. Media-query or capability branch for mobile simplification

Avoid coupling essential text visibility to video current time.

Possible implementations, in preferred order:

1. Staged overlays synchronized to scroll while video plays or seeks approximately
2. Frame-accurate seeking only when the encoded asset and browser behavior prove reliable
3. Image-sequence canvas only if a justified benchmark shows acceptable payload and performance

The MVP should not default to an image sequence because of payload and implementation complexity.

## Contact architecture

Default low-complexity path:

- `mailto:`
- `tel:`
- external booking URL

Optional form path:

- Server action or route handler
- Zod schema validation
- Honeypot
- Provider adapter isolated behind one function
- Environment-driven configuration
- No provider secret exposed to the client

Do not add a database solely for the contact form.

## Dependency policy

Add a production dependency only when:

- Native browser/CSS/React capability is insufficient
- The package is actively maintained and legitimate
- It materially reduces complexity or risk
- The decision is recorded if the dependency is substantial

Likely approved dependencies:

- `gsap`
- `zod`
- form library only if the form complexity justifies it
- one icon package, if needed

Avoid large component suites for this small site.

## Environment variables

Define only when required:

```env
NEXT_PUBLIC_SITE_URL=
CONTACT_RECIPIENT_EMAIL=
CONTACT_PROVIDER_API_KEY=
```

Never commit real values.

## Deployment

Target standard Next.js deployment. Keep the implementation compatible with Vercel and generic Node hosting. Do not use provider-specific APIs unless documented and isolated.

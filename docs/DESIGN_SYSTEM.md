# Design System

## Direction

Clean corporate elegance with a visual transition from paper burden to digital clarity.

The design must feel:

- Calm
- Competent
- Personal
- Modern
- Trustworthy
- Understandable to nontechnical visitors

It must not feel:

- Cyberpunk
- Overly futuristic
- Like a generic AI startup
- Like an enterprise consulting template full of buzzwords
- Visually crowded

## Default palette

These are reversible starting values and should live as CSS variables or Tailwind theme tokens.

- Ink / primary text: `#132235`
- Deep navy: `#0B1F33`
- Accent blue: `#356AE6`
- Accent hover: `#2855BF`
- Soft blue surface: `#EAF0FF`
- Warm paper surface: `#F3EEE7`
- Page background: `#F8F9F7`
- White surface: `#FFFFFF`
- Muted text: `#5F6B78`
- Border: `#DCE2E8`
- Success: choose an accessible restrained green during implementation
- Error: choose an accessible restrained red during implementation

Validate contrast before finalizing.

## Typography

Use one modern sans-serif family with strong readability. Prefer a variable font through `next/font` or a robust system fallback. Avoid introducing multiple decorative typefaces.

Suggested scale:

- Hero H1: fluid `clamp()` approximately 2.7–5.5rem
- Section H2: approximately 2–3.5rem
- Card H3: approximately 1.25–1.6rem
- Body large: approximately 1.125–1.25rem
- Body: 1rem
- Small/meta: 0.875rem

Use comfortable line lengths, approximately 55–72 characters for body text.

## Layout

- Maximum content width: approximately 1200–1280 px
- Reading-width content: approximately 700–760 px
- Mobile gutter: 20–24 px
- Desktop gutter: 32–48 px
- Generous vertical section spacing
- Use a consistent 12-column mental model, but do not add a grid framework dependency

## Components

### Buttons

Primary:

- Solid accent background
- High-contrast text
- Clear hover, active, focus, and disabled states

Secondary:

- Transparent or subtle surface
- Visible border
- Equal keyboard and pointer affordance

### Cards

- White or soft neutral surface
- Thin border
- Subtle shadow only when it improves hierarchy
- Moderate radius, not pill-shaped containers everywhere
- Clear internal spacing

### Icons

Use one consistent icon library only if needed. Prefer simple line icons. Avoid decorative icon overload.

## Motion

Motion must communicate transformation, not decorate every component.

- Default transition duration: 160–240 ms
- Larger reveal duration: 400–700 ms
- Use ease-out for entrances
- Avoid continuous floating effects
- Avoid scroll hijacking
- Respect reduced motion globally
- Do not animate large text in ways that delay comprehension

## Cinematic hero composition

- Keep primary subject and laptop in the central safe area
- Preserve a text-safe region, preferably left on desktop
- Use a dark or controlled overlay behind text when required
- Reserve layout dimensions before media loads
- Hero content must be readable on the poster frame
- Mobile may use a crop, shorter video, or static poster

## Imagery rules

Use:

- Realistic small-business office environments
- Human expressions showing burden and relief subtly
- Paper, drawers, laptop, and structured interfaces
- Neutral materials and natural light

Avoid:

- Humanoid robots
- Glowing brains
- Floating holographic dashboards
- Neon particle storms
- Generic handshake photography
- Fake readable customer data

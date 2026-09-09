# Asset Manifest

## Cinematic hero

Place final optimized media in:

```text
public/media/hero/hero-desktop.webm
public/media/hero/hero-desktop.mp4
public/media/hero/hero-mobile.webm
public/media/hero/hero-mobile.mp4
public/media/hero/hero-poster.webp
```

Only desktop WebM/MP4 and poster are required for the first complete implementation. Mobile video is optional; use the poster if mobile media is not ready or not performant.

## Media requirements

- No audio track
- No embedded text or logos
- Central safe composition for responsive cropping
- Final calm frame suitable for CTA overlay
- Export WebM and MP4 alternatives
- Compress aggressively while preserving acceptable visual quality
- Poster should match the initial readable state
- Do not commit extremely large raw source footage

## Placeholder behavior

Until the final video exists:

- Use a locally generated neutral poster placeholder
- Render the full semantic hero content
- Implement the video component against the expected filenames
- Handle missing media without console errors or hidden content

## Logo

Expected future paths:

```text
public/brand/logo.svg
public/brand/logo-mark.svg
public/brand/favicon.svg
```

Use a typographic placeholder for `[COMPANY_NAME]` until the real logo is supplied.

## Social image

Expected future path:

```text
public/brand/og-image.jpg
```

Do not publish a generated image containing unverified claims or contact details.

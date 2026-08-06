# Useful Graphify Queries

Use and adapt these after code exists.

## Architecture

```bash
graphify query "what components compose the homepage?"
graphify query "which client components depend on browser APIs?"
graphify query "where are site configuration values consumed?"
graphify path "siteConfig" "metadata"
```

## Cinematic hero

```bash
graphify query "how does scroll progress control hero stages?"
graphify explain "CinematicHero"
graphify path "prefers-reduced-motion" "HeroFallback"
graphify query "where are video errors and loading states handled?"
```

## Content and SEO

```bash
graphify query "where is German homepage copy defined?"
graphify path "homepageContent" "page.tsx"
graphify query "which verified site fields enter structured data?"
```

## Testing

```bash
graphify query "which tests cover mobile navigation?"
graphify query "which tests cover reduced motion and video failure?"
graphify path "CinematicHero" "hero.spec.ts"
```

## Change impact

```bash
graphify query "what is affected if siteConfig contact fields change?"
graphify query "what depends on the hero media manifest?"
```

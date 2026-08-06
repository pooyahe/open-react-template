# Architecture and Product Decisions

Record only decisions that materially affect future implementation. Keep entries concise.

## ADR-001 — MVP is a focused one-page website

**Status:** Accepted

**Decision:** Build one polished homepage plus legal routes instead of a multi-page marketing platform.

**Reason:** The primary goal is a professional digital business card for a new digitalization company. A concise site reduces implementation time, content burden, maintenance, and visitor confusion.

**Consequences:** Service details are presented in homepage sections. Additional pages remain a deferred backlog.

## ADR-002 — Cinematic hero is progressive enhancement

**Status:** Accepted

**Decision:** Server-render headline and CTAs independently of video and animation.

**Reason:** Business clarity, accessibility, loading resilience, and Core Web Vitals are more important than the visual effect.

**Consequences:** Poster, reduced-motion, mobile, and video-error branches are mandatory.

## ADR-003 — No database for MVP contact

**Status:** Accepted

**Decision:** Start with direct contact links and add a provider-backed form only when credentials are available.

**Reason:** A database would add unnecessary operational and privacy complexity for a business-card website.

**Consequences:** Form provider integration must remain optional and isolated.

## ADR-004 — GSD owns execution state; Graphify owns repository topology

**Status:** Accepted

**Decision:** Use GSD for phases, state, plans, and verification. Use Graphify for repository relationships and scoped retrieval.

**Reason:** These concerns are complementary and should not duplicate each other.

**Consequences:** Do not store task status in Graphify reports or use hand-written planning files as a second live state system after GSD initialization.

## New decision template

```markdown
## ADR-NNN — Title

**Status:** Proposed | Accepted | Superseded

**Decision:**

**Reason:**

**Consequences:**
```

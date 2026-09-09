# Product Requirements Document

## Product

A German-language, clean corporate website for a digitalization company helping small businesses reduce paper-based administration and use modern digital tools pragmatically.

## Primary purpose

The website acts as:

1. A professional digital business card
2. A concise explanation of the company’s services
3. A trust-building introduction for nontechnical decision-makers
4. A lead-generation page for consultations and digitalization checks

It is not an application platform, customer portal, or broad content publication in the MVP.

## Target audience

Owners and decision-makers in small businesses who:

- Work with paper folders, PDFs, email attachments, spreadsheets, and disconnected software
- Spend time searching, copying, sorting, and reconciling information
- Want to explore AI but need practical guidance
- Need clearer reporting without building an internal data team
- Prefer a personal implementation partner rather than a large consultancy

## Core services

### 1. Dokumentenmanagement

Digitize, classify, search, organize, and govern business documents in a practical DMS workflow.

### 2. KI-Beratung und Automatisierung

Identify repetitive work and implement suitable automations, including document extraction, routing, categorization, and workflow connections.

### 3. Datenanalyse und Dashboards

Combine existing business data, improve transparency, and build understandable dashboards for recurring decisions.

## User promise

The company helps small businesses move from paper burden and fragmented information toward organized digital processes, clearer data, and more time for core work.

## Primary conversions

- Book a free initial consultation
- Request a digitalization check
- Describe a problem by inquiry form or email
- Call the company directly

## Homepage information architecture

1. Cinematic hero: paper burden to digital clarity
2. Common operational pain
3. Three services
4. Before/after transformation
5. Three-step collaboration model
6. Practical reasons to choose the company
7. Contact and consultation CTA
8. Footer and legal links

## Functional requirements

- Responsive anchor navigation
- Accessible mobile menu
- Hero poster before media load
- Optional WebM/MP4 cinematic video
- Scroll-stage overlays on capable devices
- Reduced-motion and media-failure fallback
- Typed site and content configuration
- Direct contact links
- Optional validated inquiry form
- Metadata, sitemap, robots, and structured data
- Impressum and Datenschutz placeholder routes

## Nonfunctional requirements

### Performance

- Essential text and CTA must not wait for video download
- Reserve hero dimensions to avoid layout shift
- Use optimized images and compressed video
- Keep client-side JavaScript controlled
- Avoid heavy dependencies not required for the experience

### Accessibility

- WCAG 2.2 AA-oriented implementation
- Semantic landmarks and heading hierarchy
- Full keyboard use
- Visible focus
- Adequate contrast
- Reduced-motion support
- Accessible form validation
- Animation never carries unique essential information

### Trust

- No fabricated metrics, customer logos, testimonials, certifications, or partnerships
- No guaranteed savings or legal-compliance claims
- Explain technical concepts plainly
- Present privacy and security as design considerations, not absolute guarantees

## Content language

German, formal address using “Sie”. English architecture may be added later, but localization infrastructure is not required for the MVP.

## Visual direction

Clean corporate elegance:

- Calm neutral base
- Deep navy/charcoal text
- Restrained blue accent
- Warm paper/wood undertone
- Generous whitespace
- Clear typography
- Minimal but meaningful motion
- Human office imagery rather than science-fiction AI imagery

## Explicit exclusions

- No user accounts
- No database unless a selected form provider requires one and is approved
- No CMS or blog in the MVP
- No customer dashboard
- No chatbot
- No e-commerce
- No invented legal text presented as finalized
- No automatic tracking before consent

## Definition of done

The product is done when the phase gates in `TASK.md` pass, the main conversion paths work, the cinematic hero degrades gracefully, automated checks succeed, and the repository contains a clear deployment handoff.

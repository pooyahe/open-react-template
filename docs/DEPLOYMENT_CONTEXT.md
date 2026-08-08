# Deployment Context

Interview captured 2026-08-06. No secrets are recorded here. Provider names and
public contact details are operational context, not credentials.

| Item | Confirmed value | Source | Status | Sensitivity | Deployment impact |
|---|---|---|---|---|---|
| Launch model | Public landing page, preceded by a private Netlify preview | Context interview | CONFIRMED | Public | Requires production-quality content, legal surface, quality gates, and explicit final deployment approval |
| Audience | Exclusively B2B; small businesses | Context interview; PRD | CONFIRMED | Public | Keep copy and conversion path business-focused |
| Transaction scope | Non-binding introductory conversations only; no orders, payments, uploads, or binding contracts | Context interview | CONFIRMED | Public | No checkout, contract workflow, account system, or upload surface |
| Placeholder policy | No visible placeholder content may remain at deployment | Context interview | CONFIRMED | Public | Replace all public placeholders before launch; unresolved facts block public release |
| Brand | AktenKompass | Context interview | CONFIRMED | Public | Use as the public brand voice |
| Operator | Pouya Hedayati | Context interview | CONFIRMED | Personal | Required consistently in legal and operator surfaces |
| Business status | “AktenKompass ist ein Pre-Launch-Digitalisierungsprojekt, betrieben von Pouya Hedayati. Es besteht derzeit kein eingetragener Gewerbebetrieb oder Unternehmen in der Rechtsform einer GmbH oder UG.” | Context interview; operator approval 2026-08-07 | CONFIRMED | Legal | Use consistently in the legal/operator surface; this does not authorize public deployment |
| Published address | Gärtnerstr. 29, 80992 München, Deutschland; home address approved for publication | Context interview; operator approval 2026-08-07 | CONFIRMED | Personal | Use accurately in Impressum and Datenschutz; public deployment remains subject to the final legal review gate |
| Current browser privacy posture | No external browser hostnames, cookies, localStorage, sessionStorage, IndexedDB databases, or service-worker registrations observed at 1440×900 and 390×844; fonts and media are same-origin/local | Phase 3 static inspection and browser evidence 2026-08-07 | CONFIRMED | Technical | Maintain no-third-party/no-storage target; provider-side hosting/mailbox processing still requires separate review |
| Public email | info@aktenkompass.de | Context interview | CONFIRMED | Public | Mailto CTA and receiving mailbox |
| Public telephone | +49 176 57739809 | Context interview | CONFIRMED | Public | Optional visible phone CTA; verify ownership and availability before launch |
| Service region | Bayern | Context interview | CONFIRMED | Public | May be used in copy/metadata only where factually accurate |
| Languages | German and English | Context interview | CONFIRMED | Public | Current documents describe German-only MVP; bilingual scope requires architecture/content reconciliation |
| Services | Primary: Dokumentenmanagementsysteme (DMS). Also: AI consulting/automation and data analysis. Dashboards may be offered as an implementation capability, not the primary named service | Context interview; approved claims | CONFIRMED | Public | Remove ambiguous standalone dashboard positioning; retain only deliverable claims |
| Permitted claims | Service facts and qualified potential benefits; no guarantees, unsupported metrics, customer references, certifications, partnerships, or unconditional legal/compliance claims | Context interview; PRD; SEO/compliance guidance | CONFIRMED | Public | Content and legal review gate; avoid “Wir”, “Unser Team”, and established-company implications where misleading |
| Contact workflow | Plain email link and contact form | Context interview | CONFIRMED | Public | Form must have clear validation, failure state, privacy notice, and non-binding wording |
| Form fields | Name, company, email, optional telephone, message | Context interview | CONFIRMED | Personal data | Minimize collection and document purpose/retention |
| File uploads | Disabled | Context interview | NOT_APPLICABLE | Personal data | No multipart upload handling or file-retention risk |
| Mailbox provider | IONOS; info@aktenkompass.de | Context interview | CONFIRMED | Operational | Document IONOS data flow and mailbox access controls |
| Transactional email | Brevo Transactional Email API; From website@aktenkompass.de, To info@aktenkompass.de, Reply-To validated visitor email | Context interview | SECURITY_REVIEW_REQUIRED | Credential/data flow | Keep BREVO_API_KEY server-side; never use visitor email as From; verify domain and provider configuration |
| Submission storage | No application database; no automatic visitor confirmation; no complete message-content logging | Context interview | CONFIRMED | Personal data | Route-handler design must be stateless and log-minimal |
| Form protections | Server-side validation, request-size limits, rate limiting, honeypot | Context interview | SECURITY_REVIEW_REQUIRED | Security | Required before enabling Brevo form delivery |
| Retention | Ordinary inquiries: six months after last substantive communication; irrelevant/declined messages generally 30 days; spam/test immediately or within seven days; sensitive data deleted when no longer needed; project records assessed separately; monthly review | Context interview | LEGAL_REVIEW_REQUIRED | Personal data | State as an operator policy, not a statutory fixed period; document deletion responsibility |
| Message handling | Pouya Hedayati only; business-day review, normally response within two business days | Context interview | CONFIRMED | Personal data | Restrict mailbox access and document incident/data-subject handling |
| Hosting | Netlify Free for private preview and initial public landing page | Context interview | CONFIRMED | Operational | No paid auto-recharge/add-ons; monitor usage; document Netlify DPA and actual data flows |
| Source repository | GitHub | Context interview | CONFIRMED | Operational | Protect repository and deployment integration; main is production branch |
| GitHub repository | https://github.com/pooyahe/open-react-template.git | Repository inspection; context interview | CONFIRMED | Operational | Connect this repository only after explicit preview-deployment authorization |
| Preview branch | chore/deployment-readiness | Context interview 2026-08-08 | CONFIRMED | Operational | Use for the Phase 8 preview; main remains the production branch |
| Branching | main is production; feature branches/PRs use Netlify deploy previews | Context interview | CONFIRMED | Operational | Preview deployments must be noindex |
| Domain | aktenkompass.de; IONOS registrar and DNS provider | Context interview | CONFIRMED | Operational | Do not connect public DNS without explicit approval |
| Canonical hostname | https://aktenkompass.de; no-www canonical | Context interview | CONFIRMED | Public | Redirect or otherwise normalize www if enabled; configure canonical, sitemap, robots |
| Analytics/tracking | None | Context interview | NOT_APPLICABLE | Privacy | Keep Netlify Analytics and other tracking disabled |
| Fonts | Self-hosted only | Context interview; design docs | CONFIRMED | Public | Avoid external font requests |
| Other third parties | No maps, booking tools, CAPTCHA, error monitoring, social embeds, chat, or newsletter provider | Context interview | NOT_APPLICABLE | Privacy | Keep dependency and privacy surface minimal |
| Cookies/storage | No nonessential browser storage, cookies, or consent mechanism | Context interview | CONFIRMED | Privacy | Do not add consent UI without a new decision |
| Hero media | Current repository media is not final; replacement will be supplied | Context interview | UNRESOLVED | Public/performance | Public launch blocked until final assets and rights/usage are confirmed |
| Hero variants | Desktop WebM/MP4, poster, smaller mobile video or poster-only fallback | Context interview | CONFIRMED | Public/performance | Measure and set performance-based size limits |
| Cinematic scroll | Not required for first public version | Context interview | CONFIRMED | Public/performance | Static poster and accessible fallback are launch baseline |
| Maintenance | Pouya Hedayati; monthly or lower update frequency | Context interview | CONFIRMED | Operational | Keep operations simple and documented |
| Monitoring | Automated uptime/build notifications plus manual checks | Context interview | CONFIRMED | Operational | Configure notifications before public launch; no third-party error monitoring planned |
| Backup/rollback | Git history and Netlify deploy rollback | Context interview | CONFIRMED | Operational | Verify rollback procedure during preview |
| Traffic | Low initial traffic | Context interview | CONFIRMED | Operational | Netlify Free is an appropriate initial capacity assumption, subject to usage monitoring |
| Launch date | No fixed deadline | Context interview | CONFIRMED | Operational | Quality and legal gates determine timing |
| Legal review | Pouya Hedayati will review/approve wording and provider data flows | Context interview | LEGAL_REVIEW_REQUIRED | Legal | Self-review is recorded; professional legal review may still be prudent before public launch |
| Deployment authorization | Pouya Hedayati | Context interview | CONFIRMED | Operational | Required approval before production DNS/deploy |
| Account ownership | Pouya Hedayati controls GitHub, Netlify, IONOS, and Brevo | Context interview | CONFIRMED | Security | Enable MFA and maintain recovery access |
| Preview access preference | Prefer Netlify team-login/private visibility when available on Free; otherwise an unindexed URL-accessible preview is acceptable; do not upgrade solely for password protection | Context interview 2026-08-08 | CONFIRMED | Operational/security | Classify the fallback as `UNINDEXED PREVIEW — URL ACCESSIBLE`; never expose secrets or sensitive data |
| Email authentication | SPF, DKIM, and DMARC required before public launch | Context interview | SECURITY_REVIEW_REQUIRED | Security | Brevo delivery and domain configuration are launch blockers |

## Explicitly unresolved or gated items

- The legal/business status and legally publishable operator presentation are not
  finalized.
- The home address requires an explicit legal/privacy publication decision.
- Bilingual German/English content and routing are not yet reconciled with the
  current German-first architecture documents.
- Final hero media, rights/approval, dimensions, and measured size limits are
  outstanding.
- Brevo account readiness, sender/domain verification, SPF, DKIM, and DMARC are
  outstanding.
- Netlify DPA review and the final provider data-flow/privacy wording are
  outstanding.
- The public domain must not be connected without explicit authorization.

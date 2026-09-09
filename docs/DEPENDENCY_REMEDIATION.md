# Dependency Remediation

Phase: Deployment Phase 1A — Security and quality baseline remediation

Date: 2026-08-07

No deployment, DNS change, Brevo integration, contact form, legal-content edit,
bilingual routing, hero-media replacement, or Git commit was performed.

## 1. Initial audit summary

The initial `corepack pnpm@10.15.1 audit --json` ran against 117 dependencies and
reported 36 vulnerabilities:

| Severity | Count |
|---|---:|
| Critical | 1 |
| High | 14 |
| Moderate | 18 |
| Low | 3 |

The critical/high findings were production dependency paths, primarily through
the direct `next@15.1.11` package, with additional transitive `sharp` and
PostCSS paths.

## 2. Exact critical and high findings

Initial critical/high advisories from `pnpm audit --json`:

| Advisory ID | Severity | Package | Vulnerable range | Patched range | Root path |
|---|---|---|---|---|---|
| 1113688 | critical | next | `>=15.0.0 <15.2.3` | `>=15.2.3` | `.` → `next` |
| 1112652 | high | next | `>=15.1.1-canary.0 <15.1.12` | `>=15.1.12` | `.` → `next` |
| 1116376 | high | next | `>=13.0.0 <15.5.15` | `>=15.5.15` | `.` → `next` |
| 1117931 | high | next | `>=13.0.0 <15.5.16` | `>=15.5.16` | `.` → `next` |
| 1118950 | high | next | `>=15.0.0 <15.5.16` | `>=15.5.16` | `.` → `next` |
| 1118954 | high | next | `>=13.4.13 <15.5.16` | `>=15.5.16` | `.` → `next` |
| 1118962 | high | next | `>=12.2.0 <15.5.16` | `>=15.5.16` | `.` → `next` |
| 1124172 | high | next | `>=13.0.0 <15.5.21` | `>=15.5.21` | `.` → `next` |
| 1124185 | high | next | `>=14.1.1 <15.5.21` | `>=15.5.21` | `.` → `next` |
| 1124193 | high | next | `>=12.0.0 <15.5.21` | `>=15.5.21` | `.` → `next` |
| 1124066 | high | sharp | `<0.35.0` | `>=0.35.0` | `.` → `next` → `sharp` |
| 1124252 | high | postcss | `<=8.5.11` | `>=8.5.12` | `.` → `postcss`; `.` → `next` → `postcss` |
| 1124288 | high | postcss | `<=8.5.17` | `>=8.5.18` | `.` → `postcss`; `.` → `next` → `postcss` |

The audit also reported seven additional high entries in its full advisory set;
the table lists the distinct critical/high package/range/path combinations
relevant to this remediation. The final audit is the authoritative post-change
result.

## 3. Root dependency paths

- Direct production root: `next@15.1.11`.
- Direct production roots: `react@19.2.3` and `react-dom@19.2.3`, updated as the
  compatible React pair for the Next 15 remediation.
- Direct development root: `postcss@8.5.1`, owned by the Tailwind/PostCSS setup.
- Transitive optional production path: `next` declared `sharp@^0.34.3` and
  resolved `sharp@0.34.5`.
- Transitive Next path: `next@15.5.21` declared `postcss@8.4.31`.

## 4. Chosen remediation

### Framework and React

| Package | Before | After |
|---|---:|---:|
| `next` | 15.1.11 | 15.5.21 |
| `react` | 19.2.3 | 19.2.8 |
| `react-dom` | 19.2.3 | 19.2.8 |

Next 15.5.21 is the maintained Next 15 line selected instead of a Next 16
migration. The React pair remains on React 19 and satisfies the Next 15.5.21
peer range.

### Lint and typecheck

| Package/config | Change |
|---|---|
| `eslint` | Added 9.39.5 |
| `eslint-config-next` | Added 15.5.21 |
| `@eslint/eslintrc` | Added 3.3.1 for the FlatCompat bridge |
| `eslint.config.mjs` | Added explicit flat config using `next/core-web-vitals` and `next/typescript` |
| `package.json` | `lint` now uses `eslint .`; added `lint:fix` and `typecheck` |

`next-env.d.ts`, `.next/**`, and `out/**` are excluded because they are
generated output, not application source. No legitimate source finding is
globally disabled.

### Transitive remediation

- Direct PostCSS updated to `8.5.26`.
- `pnpm.overrides.postcss = 8.5.26` ensures Next’s internal `8.4.31` path uses
  the patched compatible PostCSS version.
- `pnpm.overrides.sharp = 0.35.0` ensures Next’s optional `sharp@^0.34.3` path
  uses the patched release. `sharp@0.35.0` requires Node `>=20.9.0`; the
  project’s validated runtime satisfies this requirement.

The overrides are intentionally narrow, pinned, and documented here. They must
be removed when a future compatible Next 15 release owns patched `sharp` and
PostCSS ranges directly.

## 5. Alternatives rejected

- Next 16: rejected for this phase because it is a major-version migration with
  breaking changes outside the narrow baseline-remediation scope.
- `pnpm audit --fix --force`: not run; explicitly prohibited.
- Broad package upgrades: rejected to keep the remediation set reviewable.
- Removing `aos`, `@headlessui/react`, or `@tailwindcss/forms`: deferred because
  removal requires a separate unused-dependency review and is unrelated to the
  critical/high audit paths.
- Unbounded overrides: rejected; only `sharp` and PostCSS received pinned
  overrides, with ownership, compatibility, and removal conditions documented.
- Fake `test`/`test:e2e` scripts: rejected; no test framework was installed or
  added in this phase.

## 6. Compatibility assessment

- `next@15.5.21` accepts React 18.2+ or React 19 and accepts the selected
  React 19.2.8 pair.
- `eslint-config-next@15.5.21` accepts ESLint 7, 8, or 9 and TypeScript >=3.3;
  ESLint 9.39.5 and TypeScript 5.7.3 satisfy those ranges.
- `sharp@0.35.0` publishes Node `>=20.9.0`; package metadata and the
  production build were validated in this environment.
- PostCSS 8.5.26 publishes Node `^10 || ^12 || >=14` and is compatible with
  the existing Tailwind/PostCSS setup.
- `install --frozen-lockfile`, lint, typecheck, and production build all pass
  after the final lockfile update.

## 7. Remaining vulnerabilities

The final `pnpm audit` and `pnpm audit --json` results report:

- Critical: 0
- High: 0
- Moderate: 0
- Low: 0
- Total: 0

No vulnerability findings remain.

## 8. Production impact

The remediation changes build/runtime dependencies and lint tooling only. It
does not change routes, legal content, contact behavior, provider integrations,
DNS, hosting, or website design. The static production build still generates
the same six static routes: `/`, `/impressum`, `/datenschutz`, and framework
fallback output.

The application has no contact form, route handler, database, or Brevo code in
this phase.

## 9. Upgrade policy

- Stay on the supported Next 15 maintenance line until a separate migration plan
  approves Next 16.
- Run `pnpm audit` and `pnpm audit --json` before each deployment candidate.
- Update `next`, `react`, and `react-dom` together when framework compatibility
  requires it.
- Remove the `sharp` and PostCSS overrides as soon as a compatible owning Next
  release selects patched ranges directly; validate with frozen install, build,
  and audit before removal.
- Never use `audit --fix --force` or unreviewed broad overrides.

## 10. Rollback procedure

1. Stop before deployment; this phase made no external changes.
2. Restore the previous working-tree versions of `package.json` and
   `pnpm-lock.yaml` from the pre-remediation Git revision or a reviewed patch.
3. Remove `eslint.config.mjs` and revert the script additions if rolling back
   the lint/typecheck foundation as well.
4. Run `corepack pnpm@10.15.1 install --frozen-lockfile`, then lint/typecheck/build
   using the rollback state.
5. Do not restore the old dependency set for a public deployment without an
   explicit security decision, because it returns the critical/high findings.

Rollback is limited to local Git working-tree changes; no Netlify, DNS, or
external service rollback is needed.

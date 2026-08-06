# Start Codex for the Cruip Template Adaptation

## 1. Preconditions

The working repository should be on an NTFS drive and should run successfully with:

```powershell
corepack pnpm@10.15.1 dev
```

Commit the untouched working template before merging this overlay.

## 2. Install workflow tools

From the repository root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup-ai-tools.ps1
```

During the GSD installer choose Codex and project/local scope. If Graphify is installed but not visible on PATH, run `uv tool update-shell`, reopen PowerShell, return to the repository, and rerun the setup script.

## 3. Launch Codex

Open a new Codex session from the repository root after `AGENTS.md` has been merged:

```powershell
codex
```

Codex should work only inside this repository. OpenAI recommends starting Codex from the project root so it can inspect and modify that codebase.

## 4. First Codex task: audit only

Paste the following command into the new Codex session:

```text
Read AGENTS.md, TASK.md, README.PROJECT.md, docs/PRD.md, docs/CONTENT.md, docs/DESIGN_SYSTEM.md, docs/ARCHITECTURE.md, docs/TEST_STRATEGY.md, docs/ASSET_MANIFEST.md, docs/SEO_AND_COMPLIANCE.md, and docs/DECISIONS.md before changing files.

This repository contains the working Cruip open-react-template and must be adapted in place. Do not run create-next-app, do not create a second application, and do not replace the repository wholesale.

Act as the coordinating agent. Use the project-scoped subagents and skills. Delegate independent read-heavy analysis to the project architect, UX/content reviewer, accessibility auditor, and performance auditor. Keep write ownership sequential unless files are clearly disjoint.

For this first run, perform only the integration and audit phase:

1. Confirm the repository root, branch, status, remote, package manager, framework versions, and working development command.
2. Inspect package.json and pnpm-lock.yaml. Preserve pnpm and do not create package-lock.json.
3. Use `corepack pnpm@10.15.1` when plain pnpm is unavailable.
4. Run the existing production build and every currently defined quality script. Record missing scripts as baseline gaps, not as completed checks.
5. Initialize or reconcile GSD for this existing-codebase adaptation. TASK.md is the execution contract and docs/PRD.md is the product contract. Phase 1 must remain template audit and adaptation foundation.
6. Inside Codex, invoke `/graphify . --no-viz` to build or refresh the graph, verify the Git hook, and use Graphify before broad source searches.
7. Audit routes, layout, page composition, components, styling, assets, metadata, dependencies, and license requirements.
8. Create docs/TEMPLATE_AUDIT.md containing the exact component reuse map, sections to modify or remove, route decisions, dependency risks, accessibility risks, performance risks, baseline command results, and license handling.
9. Update documentation only where it still assumes an empty repository.
10. Do not redesign the homepage in this first run.

End with:
- template architecture summary,
- exact reusable component map,
- baseline command results,
- GSD roadmap state,
- Graphify status,
- files changed,
- unresolved blockers,
- exact next GSD/Codex command for beginning Phase 1 implementation.

Create one atomic commit only after the audit and planning checks pass.
```

## 5. Continue phase by phase

After reviewing the audit, tell Codex to execute one GSD phase at a time. Do not ask it to rewrite the entire website in one uncontrolled pass.

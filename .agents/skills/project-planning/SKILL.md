---
name: project-planning
description: Plan or re-plan this digitalization-company website using TASK.md, the PRD, GSD state, Graphify knowledge, and recorded decisions. Use for roadmap reconciliation, phase boundaries, task decomposition, and change impact. Do not use for direct component implementation.
---

1. Read `TASK.md`, `docs/PRD.md`, `docs/DECISIONS.md`, and current `.planning/STATE.md` if present.
2. Query Graphify for affected subsystems when a graph exists.
3. Identify the smallest vertical outcome that produces user-visible value.
4. Separate reversible defaults from one-way decisions.
5. Keep deferred scope out of the active phase.
6. Define measurable acceptance criteria and required command/browser evidence.
7. Delegate read-only risk review to `project-architect` when architecture or dependencies change.
8. Update GSD artifacts through GSD commands, not ad hoc replacements.
9. Record only material durable decisions in `docs/DECISIONS.md`.
10. Return phase scope, files likely affected, tests, risks, and exit gate.

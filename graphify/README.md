# Graphify Workflow

Graphify provides a queryable repository graph for Codex. It is not the task tracker.

## Installation

```bash
uv tool install graphifyy
graphify install --project --platform codex
graphify hook install
```

On Windows PowerShell, use `graphify .`, not `/graphify .`.

## Initial graph

```bash
graphify . --no-viz
```

## Incremental refresh

```bash
graphify . --update --no-viz
```

The Git hook automatically rebuilds code topology after commits. Refresh documentation nodes explicitly after material documentation changes.

## Retrieval-first behavior

Before broad repository reads, prefer:

```bash
graphify query "where is homepage service content defined?"
graphify explain "CinematicHero"
graphify path "homepageContent" "ServiceCard"
```

Then open only the files identified by the graph.

## Version-control policy

Commit Graphify output if the team wants shared repository knowledge. If generated output becomes too large or noisy, record the decision and ignore `graphify-out/graph.html` while preserving useful reports/JSON according to the team policy.

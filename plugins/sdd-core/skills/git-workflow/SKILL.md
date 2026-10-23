---
name: git-workflow
description: Git conventions for spec-driven projects - one branch per spec (NNN-feature-name), conventional commits referencing task IDs, small commits per task, PR description template. Use when committing, creating branches, writing commit messages, or opening pull requests.
---

# Git workflow

## Branches
- `main` is always releasable.
- One branch per spec, named like the spec folder: `001-place-order`. `/speckit-specify` creates it automatically.
- Use `chore/<topic>` or `fix/<topic>` for work outside a spec.

## Commits
- Use [Conventional Commits](https://www.conventionalcommits.org): `feat|fix|test|refactor|docs|chore|ci(scope): summary`.
- Prefer one commit per task (or a small group of tasks) from `tasks.md`, and reference the IDs: `feat(order): persist order with outbox [T012, T013]`.
- Tests and the code that makes them pass may share a commit. Never commit failing tests to `main`.
- Never commit secrets, `.env`, build output or `node_modules`.

## Pull requests
Title: `NNN-feature: <summary>`. Body:
```markdown
## Spec
specs/NNN-feature/spec.md (stories covered: US1, US2)

## What changed
- ...

## Tasks completed
- [x] T001 ...

## How to verify
docker compose up -d && <test command>

## Notes / ADRs
- docs/adr/NNNN-...
```

Before opening a PR: all tests pass, `/speckit-analyze` is clean, and the `code-reviewer` agent review is addressed.

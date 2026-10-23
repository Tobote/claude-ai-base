# {{PROJECT_NAME}}

{{ONE_LINE_PURPOSE}}

## How we work: spec-driven development
Every change starts from a spec. Don't write production code without an approved `specs/<NNN-feature>/tasks.md`.

1. `/speckit.specify` → `specs/NNN-feature/spec.md` (what and why, no tech details)
2. `/speckit.clarify` → resolve every `[NEEDS CLARIFICATION]`
3. `/speckit.plan` → `plan.md`, `research.md`, `data-model.md`, `contracts/`. Then ask the `architect` agent to review it. Record significant decisions with the `adr` skill.
4. `/speckit.tasks` → `tasks.md`
5. `/speckit.analyze` → consistency check across spec, plan and tasks. Fix the issues before implementing.
6. `/speckit.implement` → tests first (`test-engineer` agent), then the code.
7. Ask the `code-reviewer` agent for a review, then open a PR.

The source of truth for principles is `.specify/memory/constitution.md`. If a plan breaks a principle, say so explicitly in the plan's Complexity Tracking section.

## Stack
{{STACK_SUMMARY}}

## Commands
| Purpose | Command |
|---|---|
| Start local env | {{CMD_ENV_UP}} |
| Build | {{CMD_BUILD}} |
| Test | {{CMD_TEST}} |
| Lint/format | {{CMD_LINT}} |

## Repository layout
{{LAYOUT}}

## Conventions
- Git: follow the `git-workflow` skill (a branch per spec, conventional commits).
- Never commit secrets. `.env` is git-ignored; keep `.env.example` up to date.

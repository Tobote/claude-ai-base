---
name: adr
description: Write an Architecture Decision Record in docs/adr/ (MADR-style, numbered). Use when a plan makes a significant or hard-to-reverse technical decision (choosing a broker, database, architecture pattern, service split, protocol), when the user says "record this decision"/"write an ADR", or when the architect agent recommends one.
---

# Architecture Decision Records

## Where
`docs/adr/NNNN-kebab-title.md`. Number it with the next free 4-digit number. `0000-template.md` is the template below; create it if it's missing.

## When
Write an ADR when a decision is hard to reverse, affects several components, or picks one option over real alternatives. Don't write ADRs for trivial choices.

## Template
```markdown
# NNNN. <Decision title>

- Status: proposed | accepted | superseded by NNNN
- Date: YYYY-MM-DD
- Related spec: specs/NNN-feature (if any)

## Context
The problem, the forces at play and the constraints (cite constitution principles).

## Options considered
1. **Option A**: pros / cons
2. **Option B**: pros / cons

## Decision
We choose **X** because ...

## Consequences
What becomes easier, what becomes harder, follow-ups and risks.
```

## Rules
- Never edit an accepted ADR's decision. Write a new ADR that supersedes it and update the old ADR's status.
- Link the ADR from the plan.md that triggered it.

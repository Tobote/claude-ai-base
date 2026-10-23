---
name: spec-quality
description: Quality bar for Spec Kit specs - user stories, testable acceptance criteria (Given/When/Then), edge cases, non-functional requirements and success criteria. Use when writing or refining spec.md (during /speckit.specify or /speckit.clarify), or when the user asks whether a spec is good enough.
---

# Spec quality bar

A spec in `specs/NNN-feature/spec.md` is ready for `/speckit.plan` only when it passes every check below.

## What and why, never how
- No frameworks, databases, class names or endpoints. Those belong in plan.md.
- It is written so a product owner can read and approve it.

## User stories
- Each story is independently valuable and testable, and has a priority (P1, P2, …). P1 alone must be a viable MVP slice.
- Format: *As a <role>, I want <capability>, so that <outcome>.*

## Acceptance criteria
- Use Given/When/Then, with one observable behaviour per scenario.
- Use concrete values: write "an order with 2 items totalling 150.00 BRL", not "an order with items".
- Every criterion can be turned directly into an automated test. If it can't, rewrite it.
- Cover the unhappy paths: invalid input, missing resources, duplicates, timeouts and downstream failures.

## Edge cases and rules
- Business rules are numbered (`FR-001 …`) so tasks and tests can reference them.
- Concurrency, idempotency (what if the same request or message arrives twice?), ordering and partial failure are stated explicitly when relevant.

## Non-functional and success criteria
- Measurable: latency, throughput, availability, data retention. Write "p95 < 300 ms at 50 req/s", not "fast".
- Success criteria are technology-agnostic and verifiable.

## Ambiguity
- Mark every unknown as `[NEEDS CLARIFICATION: question]`. Never silently guess.
- `/speckit.clarify` must resolve all of them before planning.

## Red flags to call out
Vague adjectives (fast, simple, robust, user-friendly), "etc.", unbounded lists, implied features with no story, criteria that test implementation instead of behaviour.

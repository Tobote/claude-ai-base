---
name: constitution-baseline
description: Seed or update a Spec Kit constitution (.specify/memory/constitution.md) with the personal baseline engineering principles (test-first, simplicity, security, observability, contracts). Use when bootstrapping a project, before running /speckit.constitution, or when the user asks to apply/refresh the baseline principles.
---

# Constitution baseline

`base-principles.md` (next to this file) holds the principles shared by every project. A project's constitution = these principles + project-specific ones (stack, architecture style, domain rules).

## Steps
1. Read `.specify/memory/constitution.md`. Right after `specify init` it is a template full of `[PLACEHOLDER]` tokens.
2. Read `base-principles.md`.
3. Write principles I–VI from the baseline into the constitution, replacing the placeholder principle sections. Keep the template's structure: Core Principles, additional sections, Governance, and the version line.
4. Leave clearly marked placeholders for project-specific principles (for example `### VII. [PROJECT_SPECIFIC_PRINCIPLE]`) so `/speckit.constitution` fills them.
5. Set `Version: 0.1.0` and today's date for Ratified/Last Amended.
6. Don't drop project-specific principles that already exist. When updating, merge.

Then tell the user to run `/speckit.constitution` with the project-specific details (stack, architecture, domain constraints).

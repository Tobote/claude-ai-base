# Baseline principles (shared by all projects)

### I. Spec before code
Every feature starts as a spec in `specs/NNN-feature/`: spec.md, then plan.md, then tasks.md. Specs describe WHAT and WHY. Plans describe HOW. Code that has no task to trace back to is not merged.

### II. Test-first (NON-NEGOTIABLE)
Tests are written from the acceptance criteria before the implementation, and they must fail first (red → green → refactor). Each user story has at least one automated acceptance/integration test. Unit tests cover domain logic. Tests run in CI and locally with one command.

### III. Simplicity and YAGNI
Choose the simplest design that meets the current spec. No speculative abstractions, layers or configuration. Any added complexity (a new service, a new technology, a pattern beyond the obvious) must be justified in the plan's Complexity Tracking table or an ADR.

### IV. Explicit contracts
Every boundary between components (HTTP APIs, messages and events, public module interfaces) has a written contract under `specs/NNN-feature/contracts/`. Breaking changes need a version bump and a migration note. Contract tests protect them.

### V. Security by default
No secrets in code, logs or git. Configuration comes from the environment, and `.env.example` documents it. Validate all external input at the boundary. Use least privilege for credentials. Dependencies are pinned and kept current.

### VI. Observability
Use structured logs (JSON) with a correlation ID that propagates across every call and message. Expose health/readiness endpoints for each runnable service. Errors are logged once, with context, at the boundary that handles them.

## Governance (baseline)
- The constitution overrides individual preferences. Amendments are recorded with a semver bump: MAJOR = a principle removed or redefined, MINOR = a principle added, PATCH = wording.
- `/speckit-analyze` and the `architect` agent check plans against this constitution.
- Significant architectural decisions are recorded as ADRs in `docs/adr/`.

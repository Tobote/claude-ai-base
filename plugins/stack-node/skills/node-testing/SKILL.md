---
name: node-testing
description: Testing Node.js/TypeScript services with Vitest - unit tests, HTTP tests with fastify.inject/supertest, integration tests with Testcontainers (RabbitMQ, Postgres, Redis), async/eventual assertions. Use when writing or running tests for Node.js/TypeScript code.
---

# Node.js testing (Vitest)

- Runner: Vitest (`vitest run` in CI, `vitest` locally). Use Jest only if the project already uses it.
- Layout: `test/unit/**` and `test/integration/**`, with matching npm scripts `test:unit` and `test:integration`. `test` runs both.
- Naming: `describe('<unit or endpoint>')` → `it('<behaviour in plain words>')`.
- **Unit tests**: pure functions and domain logic. Mock nothing you own; inject dependencies instead.
- **HTTP**: build the app with a factory (`buildServer(deps)`) and use `app.inject({...})`. Don't open a real port.
- **Integration**: `testcontainers` (`@testcontainers/rabbitmq`, `@testcontainers/postgresql`, `@testcontainers/redis`) started in `beforeAll`, with a long timeout (60 s).
- Eventual consistency: `await vi.waitFor(() => expect(...), { timeout: 10_000 })`. Never sleep.
- Contract tests: validate published and consumed messages against the schemas in `contracts/`.
- Coverage: `vitest run --coverage` (v8).

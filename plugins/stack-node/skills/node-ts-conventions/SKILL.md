---
name: node-ts-conventions
description: Node.js + TypeScript service conventions - project setup (strict tsconfig, ESM), structure, config validation with zod, HTTP framework (Fastify), error handling, logging (pino), graceful shutdown, Dockerfile. Use when planning or writing Node.js/TypeScript code or reviewing it.
---

# Node.js / TypeScript conventions

## Baseline
- Use the current Node LTS and TypeScript with `"strict": true`, `"noUncheckedIndexedAccess": true` and ESM (`"type": "module"`).
- Lint and format with ESLint (typescript-eslint) + Prettier. Scripts: `build`, `start`, `dev`, `test`, `lint`.
- Pin dependency versions with a committed lockfile. Use `npm ci` in Docker and CI.

## Layout per service
```
services/<name>/
  src/
    config.ts        # env parsed and validated with zod; app fails fast on invalid config
    server.ts        # Fastify instance, routes registration, health
    modules/<feature>/  # routes, handlers, domain logic, repository per feature
    messaging/       # broker connection, consumers, publishers
    index.ts         # bootstrap + graceful shutdown (SIGTERM/SIGINT)
  test/
  Dockerfile
```

## Code
- HTTP: Fastify, with request/response schemas (zod via `fastify-type-provider-zod`, or JSON schema) so validation happens at the boundary.
- Logging: `pino` with JSON output and a correlation ID in every log line. Read it from the `x-correlation-id` header or the message headers, and generate it if missing.
- Errors: one central error handler that maps domain errors to HTTP codes. Never swallow promise rejections, and handle `unhandledRejection` by logging and exiting.
- Graceful shutdown: stop accepting work, drain consumers, close DB and broker connections, then exit.
- Health: `/health/live` and `/health/ready`.
- Don't use `any`. Infer types from schemas (`z.infer`) and share message types generated from `contracts/`.

## Docker
Use a multi-stage build (`node:<lts>-alpine`), `npm ci --omit=dev` in the runtime stage, a `USER node` line, and `CMD ["node","dist/index.js"]`.

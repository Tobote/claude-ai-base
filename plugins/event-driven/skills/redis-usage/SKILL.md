---
name: redis-usage
description: Redis usage patterns - cache-aside with TTLs, idempotency keys (SET NX EX), distributed locks (and their caveats), rate limiting, key naming; clients StackExchange.Redis (.NET) and ioredis/node-redis (Node). Use when a plan or code uses Redis.
---

# Redis

Redis is an **auxiliary** store, never the source of truth for business data (that's PostgreSQL).

## Patterns
- **Cache-aside**: read from the cache; on a miss, read from the DB and `SET key value EX <ttl>`. Invalidate on write, or on the domain event that changes the data. Always set a TTL.
- **Idempotency keys**: for HTTP (`Idempotency-Key` header) and messages. `SET idem:<scope>:<id> <status|response> NX EX 86400`. If NX fails, return the stored result. For full atomicity with DB side effects, prefer a DB inbox table (see `messaging-patterns`).
- **Rate limiting**: a fixed or sliding window with `INCR` + `EXPIRE`, or a Lua script.
- **Locks**: `SET lock:<res> <token> NX PX <ms>`, released with a compare-and-delete Lua script. Locks are advisory. Correctness must not depend on them alone, so pair them with DB constraints or version checks.

## Key naming
`<service>:<entity>:<id>[:<facet>]`, for example `order:order:123:summary`. Keep keys short and documented in plan.md.

## Clients
- .NET: `StackExchange.Redis`, with one `IConnectionMultiplexer` singleton. Use `IDistributedCache` for simple caching.
- Node: `ioredis` (or `redis` v4+), with one client per process and graceful `quit()` on shutdown.

## Local
`redis:7-alpine` with healthcheck `redis-cli ping`. Testcontainers in integration tests.

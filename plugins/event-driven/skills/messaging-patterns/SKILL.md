---
name: messaging-patterns
description: Core event-driven patterns - commands vs events, message envelope and contracts, transactional outbox, idempotent consumers (inbox), retries with backoff, dead-letter queues, ordering, saga/process manager with compensation, eventual consistency. Use when designing or implementing any asynchronous messaging between services, or reviewing event-driven code.
---

# Messaging patterns

## Commands vs events
- **Command**: an imperative request with one handler (`ReserveStock`). It may be rejected.
- **Event**: a past-tense fact with zero or more subscribers (`OrderPlaced`). It is immutable and never "rejected".
- Name messages after the domain, not the technology. A service owns the events it publishes.

## Envelope and contracts
Every message carries `messageId` (UUID), `correlationId`, `causationId`, `type`, `version`, `occurredAt` (UTC) and `payload`. Document each message in `specs/NNN-feature/contracts/` (JSON Schema or AsyncAPI). Evolve contracts additively: add optional fields, never rename or remove. A breaking change needs a new version.

## Transactional outbox (publish reliably)
Never do "save to DB, then publish". If the process crashes in between, the system ends up inconsistent.
1. In the same DB transaction as the state change, insert the message into an `outbox` table.
2. A relay (background worker) reads unsent rows, publishes them, and marks them sent.
3. This gives at-least-once delivery, so consumers **must** be idempotent.
In .NET, use the MassTransit EF Core outbox. In Node, use an outbox table plus a polling relay (or a library).

## Idempotent consumer (inbox)
- Store processed `messageId`s in an `inbox`/`processed_messages` table (or Redis `SET NX` with a TTL), written in the same transaction as the side effect.
- If the message ID was seen before, acknowledge it and skip it.
- Prefer naturally idempotent operations where possible (upserts, state checks such as "already reserved").

## Failures
- **Transient** (timeout, DB deadlock): retry with exponential backoff and jitter, for example 3 immediate retries followed by delayed redelivery (1 min, 5 min, 15 min).
- **Permanent** (validation, unknown type) or retries exhausted: move the message to the **DLQ** with the error details. Alert on it and provide a documented way to replay it.
- Poison messages must never block a queue.

## Ordering
Assume no global ordering. If ordering per aggregate matters, partition by aggregate ID (a Kafka key, or a RabbitMQ single active consumer / consistent-hash exchange), or check versions and discard stale events.

## Saga / process manager
For multi-service workflows (order → payment → stock → shipping):
- **Orchestration**: a state machine (MassTransit `MassTransitStateMachine`) that owns the workflow state. It is easier to reason about, so prefer it for learning projects.
- **Choreography**: services react to each other's events. It has less coupling but makes the flow harder to see.
- Every step that can fail has a **compensating action** (`ReleaseStock`, `RefundPayment`). Define timeouts for every step.
- Persist the saga state, with a correlation ID equal to the order ID.

## Consistency visible to users
APIs return `202 Accepted` plus a status resource for async workflows. Document the eventual-consistency window in the spec.

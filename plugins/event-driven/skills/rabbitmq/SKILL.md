---
name: rabbitmq
description: RabbitMQ usage - exchanges/queues/bindings topology, MassTransit (.NET) and amqplib/rascal (Node) clients, publisher confirms, acks, prefetch, retry and dead-lettering, quorum queues, cross-language message interop. Use when a plan or code uses RabbitMQ.
---

# RabbitMQ

## Topology
- Events go to a **topic exchange** per bounded context (for example `orders.events`) with routing keys like `order.placed`. Each consumer service has its own queue (`notification.order-placed`) bound to the routing keys it needs.
- Commands go to a direct exchange or straight to the target service's queue.
- Use **quorum queues** (`x-queue-type: quorum`) for durability, and durable exchanges with persistent messages.
- DLX: every queue sets `x-dead-letter-exchange` → `<queue>.dlq`.

## Clients
- **.NET**: use MassTransit (`AddMassTransit` + `UsingRabbitMq`). It handles topology, retry (`UseMessageRetry`), delayed redelivery, the outbox, sagas and `_error` queues. Configure retries per consumer definition.
- **Node**: use `amqplib`, or `rascal` for declarative topology, retries and DLX. Enable confirm channels (`createConfirmChannel`) and `prefetch(10)`, and ack only after the side effect commits.

## Cross-language interop (.NET ↔ Node)
MassTransit wraps messages in its own envelope (`message`, `messageType: ["urn:message:Namespace:Type"]`, `correlationId`, …). Pick one approach and record it in an ADR:
1. Node reads and writes the MassTransit envelope (parse `message`, set `messageType`). This is the simplest when .NET is the main side.
2. Use raw JSON on both sides: MassTransit `UseRawJsonSerializer()` and `UseRawJsonDeserializer()` plus a shared JSON Schema contract.

Either way, the shared contract lives in `contracts/` and contract tests verify it on both sides.

## Ops
- Local image: `rabbitmq:3-management` (UI at :15672). Healthcheck: `rabbitmq-diagnostics -q ping`.
- Never use the default `guest` user outside local development. Credentials come from the environment.

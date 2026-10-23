---
name: kafka
description: Apache Kafka usage - topics/partitions/keys, consumer groups, offsets and delivery semantics, idempotent producers, retry/DLT topics, schema evolution, clients (Confluent.Kafka for .NET, kafkajs/confluent-kafka-javascript for Node), KRaft local setup. Use when a plan or code uses Kafka or event streaming.
---

# Kafka

## When Kafka (vs RabbitMQ)
Use Kafka for event streaming: a replayable log, high throughput, multiple independent readers, analytics/CDC, and per-key ordering. Use RabbitMQ for task queues and command routing. Record the choice in an ADR.

## Design
- Topic per event stream: `<context>.<entity>.events.v1` (for example `orders.order.events.v1`).
- **Key = aggregate ID** (orderId), which keeps ordering per order. Size partitions for the parallelism you need.
- Use retention or compaction deliberately. Compacted topics hold the latest state per key.

## Producers
`enable.idempotence=true` and `acks=all`. Publish through the outbox (see `messaging-patterns`), or use CDC (Debezium) from the outbox table.

## Consumers
- A consumer group per service. Commit offsets **after** processing (at-least-once), so handlers must be idempotent.
- Retries: don't block the partition forever. Use retry topics (`<topic>.retry.1m`, …) and a dead-letter topic `<topic>.dlt`.
- Handle rebalances gracefully and keep processing per message short.

## Clients
- .NET: `Confluent.Kafka` (or the MassTransit Kafka rider).
- Node: `@confluentinc/kafka-javascript` (or `kafkajs`).

## Schemas
JSON Schema or Avro, with a schema registry if you use Avro. Evolve backward-compatibly.

## Local
Use the `apache/kafka` image in **KRaft** mode (no ZooKeeper), plus an optional UI (`provectuslabs/kafka-ui`). Testcontainers: `Testcontainers.Kafka` / `@testcontainers/kafka`.

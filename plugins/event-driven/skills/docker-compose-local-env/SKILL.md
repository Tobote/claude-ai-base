---
name: docker-compose-local-env
description: Docker Compose local development environment for multi-service systems - infra (PostgreSQL, RabbitMQ, Kafka, Redis) with healthchecks, service containers, env files, networks, volumes, init scripts, profiles. Use when creating or changing docker-compose.yml, Dockerfiles for local runs, or when the user wants to run the whole system locally.
---

# Docker Compose local environment

Goal: `docker compose up -d` from the repo root starts everything, and `docker compose down -v` resets it.

## Structure
```
docker-compose.yml          # infra + services
docker-compose.override.yml # optional local tweaks (ports, hot reload), git-ignored if personal
.env.example                # all variables with safe local defaults (copy to .env)
infra/postgres/init/*.sql   # create one database + user per service
```

## Rules
- Pin image versions: `postgres:16-alpine`, `rabbitmq:3-management`, `redis:7-alpine`, `apache/kafka:<version>`.
- Every infra container has a `healthcheck`. Services use `depends_on: { db: { condition: service_healthy } }`.
- **One database per service**, created by the init scripts. Each service gets its own credentials.
- Configuration only through env vars (`${VAR}` from `.env`). Never hard-code secrets in the compose file except throwaway local defaults in `.env.example`.
- Use named volumes for data and one default network. Services reach each other by service name (`rabbitmq:5672`).
- Expose host ports only for things a developer opens: APIs, the RabbitMQ UI on 15672, Postgres on 5432 for DB tools.
- Use `profiles` for optional parts (for example `kafka` and `observability`), so the default `up` stays light.
- Optional observability profile: `grafana/otel-lgtm` (OTel collector, Grafana, Loki, Tempo, Prometheus in one image).

## Verification
After a change, run `docker compose config` (to validate), `docker compose up -d`, `docker compose ps` (all healthy), then hit each `/health/ready`.

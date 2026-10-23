---
name: dotnet-conventions
description: C#/.NET service conventions - solution layout, minimal APIs, DI, options/configuration, validation, error handling (ProblemDetails), logging, health checks, Dockerfile. Use when planning or writing C#/.NET code, creating .NET projects/solutions, or reviewing C# code.
---

# .NET conventions

## Baseline
- Target the current LTS (.NET 8 or newer, as stated in plan.md). Set `<Nullable>enable</Nullable>`, `<ImplicitUsings>enable</ImplicitUsings>` and `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`.
- Put shared settings in `Directory.Build.props` and package versions in `Directory.Packages.props` (central package management).
- Format with `dotnet format` and configure style in `.editorconfig`.

## Layout per service (keep it flat until complexity demands more)
```
services/<name>/
  src/<Name>.Api/          # Program.cs, endpoints, DI wiring, consumers
  src/<Name>.Domain/       # entities, value objects, domain rules (no infra deps)
  src/<Name>.Infrastructure/  # EF Core DbContext, migrations, messaging adapters
  tests/<Name>.UnitTests/
  tests/<Name>.IntegrationTests/
  Dockerfile
```
For very small services, Api + Domain in one project is fine (constitution principle III). Justify any extra layers.

## Code
- Minimal APIs, with endpoints grouped per feature (`app.MapGroup("/orders")`). Return `TypedResults`.
- Bind configuration with `IOptions<T>` + `ValidateDataAnnotations().ValidateOnStart()`. Never read `Environment` directly in domain code.
- Validate input at the boundary (FluentValidation or DataAnnotations). The domain enforces invariants in constructors or factory methods.
- Errors: `AddProblemDetails()` plus an exception handler. Return RFC 7807 responses and don't leak stack traces.
- Use `async` all the way, pass `CancellationToken` through, and never call `.Result` or `.Wait()`.
- Prefer `record` for DTOs, messages and value objects. Keep entities' setters private.
- Use structured logging with message templates (`logger.LogInformation("Order {OrderId} placed", id)`), never string interpolation. Add OpenTelemetry for traces when the plan requires it.
- Health: map `/health/live` and `/health/ready` (the latter checks DB and broker).

## Docker
Use a multi-stage Dockerfile (`sdk` → `aspnet` runtime), run as a non-root user, and expose 8080.

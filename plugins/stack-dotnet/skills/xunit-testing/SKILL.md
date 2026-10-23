---
name: xunit-testing
description: .NET testing with xUnit - unit tests, integration tests with WebApplicationFactory and Testcontainers (Postgres, RabbitMQ, Redis), MassTransit test harness, naming and assertions. Use when writing or running tests for C#/.NET code.
---

# .NET testing (xUnit)

- Packages: `xunit`, `xunit.runner.visualstudio`, `Microsoft.NET.Test.Sdk`, `FluentAssertions` (or `Shouldly`), `NSubstitute` for the rare mock.
- Naming: `Method_State_ExpectedBehaviour`, or a class per scenario with `Should_...` methods. Use Arrange / Act / Assert with blank lines between them.
- **Unit tests**: domain rules only. They have no I/O and run in milliseconds.
- **Integration and acceptance tests**:
  - `WebApplicationFactory<Program>` to host the API in memory (add `public partial class Program {}`).
  - `Testcontainers.PostgreSql`, `Testcontainers.RabbitMq` and `Testcontainers.Redis`, started once per collection through `IAsyncLifetime` + `ICollectionFixture`.
  - Replace connection strings through `ConfigureAppConfiguration` / `WithWebHostBuilder`.
  - For MassTransit, use `services.AddMassTransitTestHarness()` and assert with `harness.Published.Any<OrderPlaced>()`.
- Async assertions on eventual consistency: poll with a timeout (for example 10 s) instead of `Task.Delay` sleeps.
- Run with `dotnet test` (all), or `dotnet test --filter "Category=Unit"` (use `[Trait("Category","Unit")]`).
- Coverage: `coverlet.collector` → `dotnet test --collect:"XPlat Code Coverage"`.

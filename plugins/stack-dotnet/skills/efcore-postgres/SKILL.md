---
name: efcore-postgres
description: EF Core with PostgreSQL (Npgsql) - DbContext design, entity configuration, migrations, transactions, concurrency tokens, outbox table. Use when modelling persistence for a .NET service, adding EF Core migrations, or writing data-access code against PostgreSQL.
---

# EF Core + PostgreSQL

- Package: `Npgsql.EntityFrameworkCore.PostgreSQL`. Register it with `AddDbContext<T>(o => o.UseNpgsql(cs).UseSnakeCaseNamingConvention())` (the `EFCore.NamingConventions` package).
- **One database (or schema) per service.** Services never read another service's tables; they integrate through messages and APIs.
- Configure mappings in `IEntityTypeConfiguration<T>` classes, not with attributes on domain types.
- Money: `decimal` mapped to `numeric(18,2)`, plus a currency column. Times: `DateTimeOffset` mapped to `timestamptz`, always in UTC.
- Optimistic concurrency: `uint Version` mapped to Postgres `xmin` (`.IsRowVersion()`), or an explicit version column.
- Migrations: `dotnet ef migrations add <Name> -p src/<Name>.Infrastructure -s src/<Name>.Api`. Apply them at startup only in local and dev (`Database.MigrateAsync()`); use a migration bundle or job elsewhere.
- Transactions: one `SaveChangesAsync` per use case. Entity changes and outbox messages go in the **same** transaction (see the `messaging-patterns` skill). With MassTransit, use its EF Core outbox (`AddEntityFrameworkOutbox<TDbContext>(o => o.UsePostgres().UseBusOutbox())`).
- Reads: use `AsNoTracking()` and project to DTOs with `Select`. Avoid lazy loading.
- Integration tests use a real Postgres through `Testcontainers.PostgreSql`. Never the InMemory provider.

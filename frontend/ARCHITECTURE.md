# Frontend architecture

`frontend/` is the citizen-facing Next.js application. It is deliberately independent of the future `backend/` service.

## Current layers

```text
app/          Route definitions and page composition
components/   Shared layout and reusable presentation components
content/      Approved navigation and static public-service content
lib/          Small framework-independent utilities and service configuration
features/     Journey-specific UI and state, added as each service is built
services/     Typed backend/API integration boundary (empty until backend work)
types/        Shared domain types
tests/        Accessibility, unit, and end-to-end tests
```

## Rules for new work

- Keep routes thin: route files compose a feature; they do not own business rules.
- Put request, appeal, status, payment, authority, login, and notification code in separate feature folders.
- Do not place API calls directly in page components. Add them through `services/` once the backend contract exists.
- Public content must come from `content/` and be reviewed by the responsible authority before release.
- Do not add staff or administrator workflows to this citizen portal. Those belong in a separate future `apps/admin` application.
- Prototype pages must state their limitations clearly and must never collect personal information without a secure backend.

## Future monorepo path

When the backend begins, keep this frontend intact and evolve the repository to:

```text
apps/web       <- current frontend
apps/admin     <- staff-only application
apps/api       <- protected backend service
packages/ui    <- shared approved components and design tokens
packages/types <- shared API contracts
infra/         <- deployment, security, monitoring, recovery configuration
docs/          <- architecture, accessibility, security, and operational runbooks
```

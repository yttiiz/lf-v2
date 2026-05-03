# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (port 4321)
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm check      # Biome lint check (runs in pre-commit hook)
pnpm format     # Biome auto-format
pnpm db         # Start local MongoDB (sudo systemctl start mongod.service)
```

There are no automated tests — quality is enforced via Biome (`pnpm check`) and TypeScript.

## Architecture

**Stack:** Astro 5 (SSR via Netlify adapter) + React 19 + MongoDB + Better Auth + Tailwind CSS v4 + HeroUI.

### Request flow

```
Request → src/middleware.ts (auth check, populates context.locals)
        → src/pages/*.astro       (Astro pages, SSR)
        → src/pages/api/*.ts      (REST API routes using APIRoute)
        → src/services/*.ts       (business logic)
        → src/db/repository.ts    (MongoDB Mongo class, CRUD)
```

Client-side: React components use **TanStack Query** to call `/api/*` routes, **Nanostores** for global state, and **React Hook Form** for form handling.

### Key layers

| Layer | Path | Purpose |
|---|---|---|
| Middleware | `src/middleware.ts` | Auth validation, injects user/session into `context.locals` |
| API routes | `src/pages/api/` | REST endpoints, delegate to services |
| Services | `src/services/` | Business logic, imported via `@services` alias |
| DB | `src/db/repository.ts` | Static `Mongo` class with typed CRUD methods |
| Auth | `src/lib/auth.ts` | Better Auth init with MongoDB adapter; `src/lib/auth-client.ts` for client |
| State | `src/store/store.ts` | Nanostores atoms for client-side global state |
| SDK | `src/sdk/fetcher.ts` | Thin wrapper around `@yttiiz/utils` Fetcher for API calls |

### Protected routes

Middleware redirects unauthenticated users away from `/user-profil` and `/booking`. The session is stored in a cookie (`better-auth.session_token`, 7-day expiry).

## TypeScript path aliases

```
@components/*  → src/components/*
@assets/*      → src/assets/*
@layouts/*     → src/layouts/*
@data/*        → src/data/*
@utils         → src/utils/mod.ts
@sdk           → src/sdk/fetcher.ts
@db            → src/db/mod.ts
@better-auth   → src/lib/mod.ts (client-side auth)
@better-auth-server → src/lib/auth.ts
@store         → src/store/mod.ts
@services      → src/services/mod.ts
@types         → src/types/mod.ts
```

## Linting & formatting (Biome)

Config: `biome.jsonc`. Rules to be aware of:
- `noUnusedImports`, `noUnusedVariables` — **error**
- `useImportType` — **error** (must use `import type` for type-only imports)
- `noNonNullAssertion` — **error**
- `useSelfClosingElements` — **error**
- Tab indentation, 80-char line width

CI runs `biome ci src` on every push/PR. The pre-commit hook runs `pnpm check`.

## Environment variables

Copy `.env.sample` to `.env`. Key groups:
- **DB:** `DATABASE_NAME`, `DATABASE_HOST`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- **Auth:** `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `APP_SESSION_NAME`
- **Email:** `MAILER_API_KEY` + `MAILER_*_URL` vars per email type
- **Images:** `IMAGE_UPLOADER_API_KEY`, `IMAGE_UPLOADER_URL`
- **App:** `APP_ENV`, `PUBLIC_APP_URL`, `PUBLIC_MIN_PASSWORD_LENGTH`, `DOMAIN_AUTHORIZED`

Dev uses a local MongoDB instance; production uses MongoDB Atlas (`mongodb+srv`).

## CI/CD

`.github/workflows/lint-deploy.yml` — on push to `main`: Biome check → build → deploy to Netlify. PRs only run the Biome check. Node 24, pnpm 10.31.0.

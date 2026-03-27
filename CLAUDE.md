# CLAUDE.md

## Overview

Monorepo with three Next.js 16 landing pages (cdncore, cdntek, cdntv) served via Nginx reverse proxy. Uses npm workspaces, Docker, and PostgreSQL.

## Key Commands

```bash
./start.sh                # Build & start all services (Docker)
./stop.sh                 # Stop all services
npm run dev:cdncore       # Local dev for cdncore
npm run dev:cdntek        # Local dev for cdntek
npm run dev:cdntv         # Local dev for cdntv
npm run build             # Build all apps
```

## Architecture

- `apps/*` — Next.js apps, each with its own Dockerfile (multi-stage, standalone output)
- `packages/*` — Shared packages (`@cdn/email`, `@cdn/news`)
- `nginx/nginx.conf` — Dev reverse proxy: routes subdomains (`cdncore.localhost`, etc.) to containers
- `deploy/` — Production configs: path-based routing (`/cdncore`, `/cdntek`, `/cdntv`) with `BASE_PATH` env var
- `database/migrations/` — PostgreSQL migration scripts

## Conventions

- All apps use `output: "standalone"` in `next.config.ts`
- `basePath` is controlled by `BASE_PATH` env var: empty in dev (subdomain routing), set in prod (path routing)
- Dockerfiles use multi-stage builds — final image contains only build output, no source code
- Do not use the word "project" in product-facing text; use "product" instead

## Adding a New Landing

Follow [HOW_TO_ADD_NEW_LANDING.md](HOW_TO_ADD_NEW_LANDING.md).

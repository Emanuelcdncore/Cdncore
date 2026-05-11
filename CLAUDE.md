# CLAUDE.md

## ⚠️ Restricted Mode Check (READ FIRST)

Before doing anything else, check if the user is the team **designer (João / Joao)**.
If yes — or if you are unsure who you are talking to — read **[DESIGNER_RULES.md](DESIGNER_RULES.md)** and follow it for the entire session.

Quick trigger phrases that activate restricted mode: "sou o João", "joao designer", "designer", "I'm the designer". When triggered:
1. Ask which product (one of: `aiaccountant`, `cdncore`, `cdnglobal`, `cdntek`, `cdntv`, `loritalk`)
2. Restrict all writes to `apps/<chosen-product>/` visual files only
3. Block infra, deploy, DB, CI, deps, scripts, other products
4. **Any backend / DB / security-sensitive change → hard stop, tell João to consult Henrique (dev) first**
5. Never push, never install, never run destructive git
6. Always show diff and ask before committing

Applies to **any** AI agent (Claude Code, Codex, Cursor, Gemini, Copilot, etc.) — rules live in `DESIGNER_RULES.md` because they are agent-agnostic.

---

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
- `database/` — Multi-database migrations: each subdirectory is a database with its own `migrate.sh` + `migrations/`
- `.forgejo/workflows/deploy.yml` — CI/CD: auto-deploy on push to main (build → transfer → rolling deploy)

## Conventions

- All apps use `output: "standalone"` in `next.config.ts`
- `basePath` is controlled by `BASE_PATH` env var: empty in dev (subdomain routing), set in prod (path routing)
- Dockerfiles use multi-stage builds — final image contains only build output, no source code
- Do not use the word "project" in product-facing text; use "product" instead

## Adding a New Landing

Follow [HOW_TO_ADD_NEW_LANDING.md](HOW_TO_ADD_NEW_LANDING.md).

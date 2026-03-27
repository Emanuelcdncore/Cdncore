# How to Add a New Landing

Step-by-step guide to add a new Next.js landing to the monorepo. This example uses `cdnx` as the app name — replace it with your actual app name.

## 1. Create the App

Place your Next.js app inside `apps/cdnx/`. The root `package.json` workspaces (`"apps/*"`) will discover it automatically.

## 2. Configure `next.config.ts`

Make sure your `next.config.ts` includes:

```ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: process.env.BASE_PATH || "",
  env: { BASE_PATH: process.env.BASE_PATH || "" },
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@cdn/email", "@cdn/news"],
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Key settings:
- `output: "standalone"` — produces a minimal self-contained build
- `basePath` — empty in dev (subdomain routing), set via `BASE_PATH` env var in production (path routing)
- `outputFileTracingRoot` — points to the monorepo root so shared packages are included

## 3. Create the Dockerfile

Copy an existing Dockerfile (e.g., `apps/cdncore/Dockerfile`) and replace all references to the old app name with `cdnx`:

```dockerfile
FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/cdnx/package.json ./apps/cdnx/
COPY packages/email/package.json ./packages/email/
COPY packages/news/package.json ./packages/news/
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

FROM base AS builder
ARG BASE_PATH=""
ENV BASE_PATH=$BASE_PATH
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY packages/email ./packages/email
COPY packages/news ./packages/news
COPY apps/cdnx ./apps/cdnx
WORKDIR /app/apps/cdnx
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdnx/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdnx/.next/static ./apps/cdnx/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdnx/public ./apps/cdnx/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/cdnx/server.js"]
```

If your app uses additional shared packages, add them to the `deps` and `builder` stages.

## 4. Add the Service to `docker-compose.yml`

```yaml
cdnx:
  build:
    context: .
    dockerfile: apps/cdnx/Dockerfile
  depends_on:
    migrate:
      condition: service_completed_successfully
  restart: unless-stopped
```

Also add `cdnx` to the nginx service's `depends_on`:

```yaml
nginx:
  depends_on:
    - cdncore
    - cdntek
    - cdntv
    - cdnx
```

## 5. Add the Nginx Configuration (`nginx/nginx.conf`)

Add an upstream block:

```nginx
upstream cdnx {
    server cdnx:3000;
}
```

Add a server block:

```nginx
server {
    listen 80;
    server_name cdnx.localhost;

    location / {
        proxy_pass http://cdnx;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 6. Add Dev Scripts to Root `package.json`

```json
"dev:cdnx": "npm -w apps/cdnx run dev",
"start:cdnx": "npm -w apps/cdnx run start"
```

## 7. (Optional) Add a New Database

If your app needs its own database (separate from `cdnlandings`), create a new migration directory:

```
database/
├── migrate-all.sh
├── cdnlandings/          # existing shared database
│   ├── migrate.sh
│   └── migrations/
└── mynewdb/              # your new database
    ├── migrate.sh
    └── migrations/
        └── 001_create_something.sql
```

1. Copy `database/cdnlandings/migrate.sh` to `database/mynewdb/migrate.sh` (it works generically)
2. Add your SQL migrations in `database/mynewdb/migrations/`
3. Add a new postgres service (or reuse the existing one) in `docker-compose.yml`
4. Add `DATABASE_URL_MYNEWDB` to the `migrate` service environment:

```yaml
migrate:
  environment:
    DATABASE_URL_CDNLANDINGS: postgresql://postgres:postgres@postgres:5432/cdnlandings
    DATABASE_URL_MYNEWDB: postgresql://postgres:postgres@postgres:5432/mynewdb
```

`migrate-all.sh` discovers all subdirectories with a `migrate.sh` automatically.

If your app shares the existing `cdnlandings` database, no changes are needed — just use the `@cdn/email` and `@cdn/news` packages.

## 8. (Production) Update Deploy Configs

### `deploy/docker-compose.prod.yml`

Add the service with `BASE_PATH`:

```yaml
cdnx:
  build:
    context: .
    dockerfile: apps/cdnx/Dockerfile
    args:
      BASE_PATH: /cdnx
  expose:
    - "3000"
  ports:
    - "127.0.0.1:300X:3000"
  restart: unless-stopped
  mem_limit: 512M
```

### `.forgejo/workflows/deploy.yml`

Add the new app to the build, transfer, and rolling deploy steps following the existing pattern (build → save → transfer → health check).

### `deploy/nginx/nginx.prod.conf.j2`

Add an upstream and location block following the existing pattern:

```nginx
upstream cdnx {
    server cdnx:3000;
}
```

```nginx
location /cdnx {
    proxy_pass http://cdnx;
    # ... same headers and settings as the other apps
}
```

## Summary

| File | Change |
|------|--------|
| `apps/cdnx/` | New app directory |
| `apps/cdnx/next.config.ts` | Standalone output + basePath config |
| `apps/cdnx/Dockerfile` | Multi-stage build |
| `docker-compose.yml` | New service + nginx depends_on |
| `nginx/nginx.conf` | Upstream + server block |
| `package.json` (root) | Dev/start scripts |
| `deploy/docker-compose.prod.yml` | New service with BASE_PATH |
| `deploy/nginx/nginx.prod.conf.j2` | Upstream + location block |
| `.forgejo/workflows/deploy.yml` | Build, transfer, and deploy steps |
| `database/newdb/` | (Optional) New database migrations |

# CDN Landings

Monorepo for CDN landing pages built with Next.js 16, served via Nginx reverse proxy with Docker.

## Apps

| App | Dev URL | Description |
|-----|---------|-------------|
| CDN Core | http://cdncore.localhost | CDN Core landing page |
| CDN Tek | http://cdntek.localhost | CDN Tek landing page |
| CDNTV | http://cdntv.localhost | CDNTV landing page |

## Tech Stack

- **Framework:** Next.js 16 (React 19, TypeScript 5)
- **Styling:** TailwindCSS 4
- **Database:** PostgreSQL 16
- **Reverse Proxy:** Nginx
- **Containers:** Docker & Docker Compose
- **Shared Packages:** `@cdn/email`, `@cdn/news`

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 22 (for local dev without Docker)

### Run with Docker (recommended)

```bash
./start.sh
```

This builds all apps (standalone output), starts the containers, and serves them via Nginx reverse proxy. Access each app by its subdomain.

To stop:

```bash
./stop.sh
```

### Run locally (without Docker)

```bash
npm install
npm run dev:cdncore   # starts cdncore on default port
npm run dev:cdntek    # starts cdntek on default port
npm run dev:cdntv     # starts cdntv on default port
```

## Project Structure

```
cdn-landings/
├── apps/
│   ├── cdncore/          # CDN Core landing (Next.js)
│   ├── cdntek/           # CDN Tek landing (Next.js)
│   └── cdntv/            # CDNTV landing (Next.js)
├── packages/
│   ├── email/            # Shared email utilities
│   └── news/             # Shared news utilities
├── database/
│   └── migrations/       # PostgreSQL migrations
├── nginx/
│   └── nginx.conf        # Dev reverse proxy config (subdomain routing)
├── deploy/
│   ├── nginx/            # Production Nginx config
│   ├── ansible/          # Ansible deployment playbooks
│   ├── docker-compose.prod.yml
│   └── deploy.sh
├── docker-compose.yml    # Dev Docker Compose
├── start.sh              # Start all services
└── stop.sh               # Stop all services
```

## Architecture

### Development

Each app runs in its own container on port 3000. Nginx routes by **subdomain**:

```
cdncore.localhost  ->  nginx  ->  cdncore:3000
cdntek.localhost   ->  nginx  ->  cdntek:3000
cdntv.localhost    ->  nginx  ->  cdntv:3000
```

### Production

Apps are built with a `BASE_PATH` and Nginx routes by **path prefix** on a single domain:

```
domain.com/cdncore  ->  nginx  ->  cdncore:3000
domain.com/cdntek   ->  nginx  ->  cdntek:3000
domain.com/cdntv    ->  nginx  ->  cdntv:3000
```

## Adding a New Landing

See [HOW_TO_ADD_NEW_LANDING.md](HOW_TO_ADD_NEW_LANDING.md) for a full step-by-step guide.

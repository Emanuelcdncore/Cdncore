FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/cdncore/package.json ./apps/cdncore/
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
COPY apps/cdncore ./apps/cdncore
WORKDIR /app/apps/cdncore
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdncore/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdncore/.next/static ./apps/cdncore/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/cdncore/public ./apps/cdncore/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/cdncore/server.js"]

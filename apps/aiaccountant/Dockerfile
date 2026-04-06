FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
WORKDIR /app
COPY package.json ./
COPY apps/aiaccountant/package.json ./apps/aiaccountant/
RUN --mount=type=cache,target=/root/.npm \
    npm install --no-audit --no-fund

FROM base AS builder
ARG BASE_PATH=""
ENV BASE_PATH=$BASE_PATH
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY apps/aiaccountant ./apps/aiaccountant
WORKDIR /app/apps/aiaccountant
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/aiaccountant/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/aiaccountant/.next/static ./apps/aiaccountant/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/aiaccountant/public ./apps/aiaccountant/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/aiaccountant/server.js"]

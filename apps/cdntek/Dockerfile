FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json ./
COPY apps/cdntek/package.json ./apps/cdntek/
COPY packages/email/package.json ./packages/email/
COPY packages/news/package.json ./packages/news/
RUN npm install

FROM base AS builder
ARG BASE_PATH=""
ENV BASE_PATH=$BASE_PATH
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY packages/email ./packages/email
COPY packages/news ./packages/news
COPY apps/cdntek ./apps/cdntek
WORKDIR /app/apps/cdntek
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/cdntek/.next/standalone ./
COPY --from=builder /app/apps/cdntek/.next/static ./apps/cdntek/.next/static
COPY --from=builder /app/apps/cdntek/public ./apps/cdntek/public
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/cdntek/server.js"]

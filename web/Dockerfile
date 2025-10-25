# syntax=docker.io/docker/dockerfile:1
FROM oven/bun:1.2 AS base

FROM base AS deps

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

COPY /api/package.json ./api/package.json
COPY /web/package.json ./web/package.json

RUN bun install
# RUN bun add sharp

FROM node:20-alpine AS node-base

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

FROM node-base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY /web ./web

WORKDIR /app/web

RUN npm run build

FROM node-base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app/web

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/web/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./.next/static

USER nextjs

ENV HOSTNAME="0.0.0.0"
ENV POST=3000
CMD ["node", "server.js"]
EXPOSE 3000
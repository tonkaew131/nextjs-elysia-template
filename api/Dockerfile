FROM oven/bun:1 AS build

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY /api/package.json ./api/package.json
COPY /web/package.json ./web/package.json

RUN bun install

COPY /api ./api

WORKDIR /app/api

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/app.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/api/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3001
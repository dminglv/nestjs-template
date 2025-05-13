FROM node:22-alpine AS builder

ENV PNPM_HOME="/pnpm" NODE_ENV=development

RUN apk add --no-cache openssl libc6-compat \
    && corepack enable

WORKDIR /app

# Copy package files for caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22-alpine

# Set environment for runtime
ENV PNPM_HOME="/pnpm" NODE_ENV=production

# Install runtime dependencies
RUN apk add --no-cache openssl libc6-compat \
    && corepack enable

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist    ./dist

RUN chown -R node:node /app
USER node

# Start app
CMD ["node", "dist/main"]
# Multi-stage Dockerfile for Next.js with pnpm monorepo
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Install pnpm
RUN npm install -g pnpm@9.15.9

# Copy dependency files
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies
RUN pnpm install

# Rebuild the source code only when needed
FROM base AS builder
# Install pnpm
RUN npm install -g pnpm@9.15.9

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure all dependencies are installed (including dev dependencies for build)
RUN pnpm install

# Build the application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm@9.15.9

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the entire built application
COPY --from=builder /app ./

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the Next.js application using pnpm
CMD ["pnpm", "--filter", "web", "start"]
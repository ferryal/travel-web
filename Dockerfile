# Stage 1: Build
FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build with production API URL (set via ARG)
ARG VITE_API_URL=https://api.skyhigh.travel/api/v1
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN pnpm build

# Stage 2: Serve with nginx
FROM --platform=linux/amd64 nginx:alpine AS runner

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run uses port 8080
EXPOSE 8080

# Health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

# 1. Use official Node image
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Accept ENV_FILE argument
ARG ENV_FILE=.env
COPY ${ENV_FILE} .env

# Build Next.js
RUN npm run build

# Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/redirects.js ./redirects.js
COPY --from=builder /app/tailwind.config.mjs ./tailwind.config.mjs
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env ./.env

EXPOSE 3000

CMD ["sh", "-c", "npx payload migrate && npm start"]

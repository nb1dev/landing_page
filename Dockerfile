# 1. Use official Node image
FROM node:24-alpine AS builder

# 2. Set working dir
WORKDIR /app

# 3. Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 4. Copy source code
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Use lightweight Node image for production
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/redirects.js ./redirects.js
COPY --from=builder /app/tailwind.config.mjs ./tailwind.config.mjs
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

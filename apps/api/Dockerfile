FROM node:20-alpine AS builder

WORKDIR /app

# Enable turbo cache if applicable, but for simplicity we copy all
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies (workspaces)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN cd apps/api && npx prisma generate

# Build API
RUN npm run build -w api

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 4000

CMD ["node", "apps/api/dist/src/main"]

FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
RUN adduser -D -u 1001 nextjs && chown -R nextjs /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN npm ci --only=production && \
    rm -rf /app/.next/cache/* && \
    rm -rf /app/node_modules/.cache
ENV NODE_ENV=production
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
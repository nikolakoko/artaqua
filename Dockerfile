# ---------- Build Stage ----------docker build -t koko123/artaqua:latest .
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile || npm install

COPY . .

RUN npm run build

# ---------- Runtime Stage ----------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"


CMD ["node", ".output/server/index.mjs"]

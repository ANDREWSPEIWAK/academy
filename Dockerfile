# ---- build stage ----------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime stage -------------------------------------------------------
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production \
    PORT=8787 \
    HOST=0.0.0.0 \
    DIST_DIR=/app/dist \
    DATA_FILE=/data/progress.json

COPY server/package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY server/ ./
COPY --from=build /app/dist ./dist

EXPOSE 8787
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8787/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]

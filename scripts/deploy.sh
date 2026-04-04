#!/bin/bash
set -euo pipefail

APP_DIR="/home/ubuntu/local-memory-landing"
cd "$APP_DIR"

echo "=== Backing up current build ==="
[ -d dist ] && cp -r dist dist.bak 2>/dev/null || true
[ -d dist-api ] && cp -r dist-api dist-api.bak 2>/dev/null || true

echo "=== Pulling latest code ==="
git pull origin main

echo "=== Installing dependencies ==="
npm ci --production=false

echo "=== Building frontend ==="
npm run build

echo "=== Building API ==="
npm run build:api

echo "=== Ensuring logs directory exists ==="
mkdir -p logs

echo "=== Restarting PM2 ==="
pm2 startOrRestart ecosystem.config.cjs --env production

echo "=== Cleaning up backups ==="
rm -rf dist.bak dist-api.bak 2>/dev/null || true

echo "=== Health check ==="
sleep 2
curl -sf http://localhost:3000/api/health 2>/dev/null && echo " ✓ API responding" || echo " ✗ API not responding"

echo "=== Deploy complete ==="

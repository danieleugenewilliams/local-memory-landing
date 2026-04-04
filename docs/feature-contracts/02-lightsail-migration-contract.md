# Feature Contract: Migrate from Amplify to Lightsail

**Contract ID:** LM-002
**Priority:** P0 — Embedded checkout (LM-001) requires a running Express server; Amplify can only serve static files
**Estimated Effort:** Half day
**Dependencies:** LM-001 merged, AWS Lightsail instance provisioned, Route 53 access
**Reference Implementation:** `~/Projects/ware-react` (automationresilience.com on Lightsail)

---

## Problem Statement

The localmemory.co site is currently deployed on AWS Amplify, which only serves static files. The embedded checkout feature (LM-001) added three server endpoints that require a running Express process:

- `POST /api/create-checkout-session` — Stripe embedded checkout
- `GET /api/session-status` — Payment verification
- `GET /downloads/:asset` — GitHub release proxy with correct filenames

These endpoints return 404 on Amplify. The site cannot process payments or serve downloads in production until migrated to a host that supports Node.js.

## Design Goal

Single Lightsail instance serves both the Vite-built frontend and the Express API. Same architecture as automationresilience.com — proven, simple, $3.50/mo.

---

## Architecture

```
Browser → Caddy (HTTPS, port 443) → Express (port 3000)
                                        ├── /api/*        → API routes
                                        ├── /downloads/*  → GitHub proxy
                                        └── /*            → dist/ (React SPA)
```

- **Caddy** handles TLS (auto Let's Encrypt), security headers, reverse proxy
- **Express** serves the built React SPA for all non-API routes + handles API endpoints
- **PM2** manages the Express process (auto-restart, logging)
- **No database** — Local Memory uses in-memory session store + Stripe API (no Prisma needed)
- **Webhook note** — The Stripe webhook route uses `express.raw()` inline while `express.json()` is applied globally. This works because Express processes route-specific middleware first. After tsup bundling, verify that `POST /api/webhook` still receives raw body for signature verification.

---

## Implementation

### 1. Bundle the Express server with tsup

**New file: `tsup.config.ts`**

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['server.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist-api',
  clean: true,
  sourcemap: true,
  external: ['express', 'stripe', 'cors', 'express-rate-limit', 'dotenv'],
})
```

**New package.json scripts:**
```json
{
  "build:api": "tsup",
  "start:prod": "node dist-api/server.js"
}
```

### 2. Update server.ts to serve the frontend in production

Add static file serving after all API routes. Note: `__dirname` does not exist in ESM modules (`"type": "module"` in package.json). Use `import.meta.url` instead, matching the ware-react pattern:

```typescript
import path from 'path';
import { fileURLToPath } from 'url';

// ... after all API routes ...

if (process.env.NODE_ENV === 'production') {
  const serverDir = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.resolve(serverDir, '..', 'dist');
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }));

  // SPA fallback — serve index.html for all non-API, non-download routes
  app.get('{*path}', (req, res) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/downloads/')) {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}
```

### 3. Add PM2 config

**New file: `ecosystem.config.cjs`**

```javascript
module.exports = {
  apps: [{
    name: 'local-memory-web',
    script: 'dist-api/server.js',
    cwd: '/home/ubuntu/local-memory-landing',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    restart_delay: 5000,
    max_memory_restart: '512M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    merge_logs: true,
  }],
};
```

### 4. Add Caddyfile

**New file: `Caddyfile`**

```caddyfile
localmemory.co {
    reverse_proxy localhost:3000

    header {
        X-Frame-Options "DENY"
        X-Content-Type-Options "nosniff"
        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
        Referrer-Policy "strict-origin-when-cross-origin"
        -Server
    }

    log {
        output file /var/log/caddy/access.log {
            roll_size 100MiB
            roll_keep 5
        }
        format json
    }
}

www.localmemory.co {
    redir https://localmemory.co{uri} permanent
}
```

### 5. Add deploy script

**New file: `scripts/deploy.sh`**

```bash
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
```

### 6. Change default port from 3001 to 3000

Update `server.ts` to match ware-react convention and the PM2/Caddy configs in this contract:

```typescript
const PORT = process.env.PORT || 3000;
```

### 7. Add health endpoint

Add to `server.ts` before the static file serving:

```typescript
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

### 8. Update environment variables

**Production `.env` on Lightsail (not committed):**

**Important:** `VITE_*` variables are baked into the frontend at **build time** by Vite — they are NOT read from the server's `.env` at runtime. The `.env` file must be present on the Lightsail instance **before running `npm run build`** so Vite can embed them into the `dist/` output. Server-only variables (no `VITE_` prefix) are read at runtime by Express.

```
NODE_ENV=production
PORT=3000
DOMAIN=https://localmemory.co

# Stripe (VITE_ vars baked into frontend at build time)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# License key generation (VITE_ var baked into frontend at build time)
VITE_DOWNLOAD_SECRET=...

# Analytics
GA4_MEASUREMENT_ID=G-6PENS9FSFW
GA4_API_SECRET=...
```

### 9. Update Route 53

Point `localmemory.co` A record from Amplify to Lightsail instance static IP.

### 10. Decommission Amplify

After verifying the Lightsail deployment works:
- Delete the Amplify app
- Remove any Amplify-specific GitHub webhooks

---

## Lightsail Instance Setup (one-time)

```bash
# On a fresh Ubuntu 22.04 Lightsail instance ($3.50/mo)

# Install Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Clone repo
git clone https://github.com/danieleugenewilliams/local-memory-landing.git /home/ubuntu/local-memory-landing
cd /home/ubuntu/local-memory-landing

# Create .env with production values
nano .env

# First deploy
npm ci --production=false
npm run build
npm run build:api
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 startup  # auto-start on reboot
pm2 save

# Start Caddy
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo systemctl restart caddy
```

---

## New Dependencies

- `tsup` — dev dependency for bundling server.ts to a single JS file

## Key Files

| File | Action |
|------|--------|
| `server.ts` | Add static file serving + SPA fallback + health endpoint |
| `tsup.config.ts` | **New** — Server bundler config |
| `ecosystem.config.cjs` | **New** — PM2 process config |
| `Caddyfile` | **New** — Reverse proxy + TLS + security headers |
| `scripts/deploy.sh` | **New** — Zero-downtime deploy script |
| `package.json` | Add `build:api`, `start:prod` scripts |
| `.env.example` | Update with production template |

## Success Criteria

- [ ] `localmemory.co` loads the React SPA via Lightsail
- [ ] Embedded checkout opens and processes test payments
- [ ] `/downloads/local-memory-macos-arm` downloads with correct filename
- [ ] `/api/session-status` responds correctly
- [ ] SSL/HTTPS works via Caddy auto-cert
- [ ] `www.localmemory.co` redirects to `localmemory.co`
- [ ] PM2 auto-restarts the server on crash
- [ ] Deploy script works from `main` branch
- [ ] Amplify decommissioned

## Out of Scope

- CI/CD automation (GitHub Actions) — deploy manually via SSH + `scripts/deploy.sh` for now
- Load balancing / auto-scaling — 2-5 sales/month doesn't need it
- Database — Local Memory uses in-memory session store + Stripe API
- CDN — Caddy + Lightsail is sufficient for current traffic

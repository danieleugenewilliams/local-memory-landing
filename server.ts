import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

// In-memory store for successful payment sessions (24hr TTL)
const successfulSessions = new Map<string, { timestamp: number; customerEmail?: string }>();

// Auto-cleanup expired sessions every hour
setInterval(() => {
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  for (const [sessionId, data] of successfulSessions) {
    if (data.timestamp < oneDayAgo) {
      successfulSessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

app.use(cors());
app.use(express.json());

const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many checkout requests, please try again later' },
});

// Create embedded checkout session
app.post('/api/create-checkout-session', checkoutLimiter, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      return_url: `${process.env.DOMAIN || 'https://localmemory.co'}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
      allow_promotion_codes: true,
      metadata: {
        product: 'local-memory-pro',
      },
    });

    res.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get checkout session status (for embedded checkout completion)
app.get('/api/session-status', async (req, res) => {
  try {
    const sessionId = req.query.session_id as string;
    if (!sessionId) {
      return res.status(400).json({ error: 'session_id is required' });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ status: session.status });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).json({ error: 'Failed to retrieve session status' });
  }
});

// Webhook to handle successful payments
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log(`Webhook signature verification failed.`, errorMessage);
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment successful:', session.id);

      // Store successful session for download access verification
      successfulSessions.set(session.id, {
        timestamp: Date.now(),
        customerEmail: session.customer_details?.email || undefined
      });

      // Here you could also:
      // 1. Update your database with the purchase
      // 2. Send confirmation email
      // 3. Generate secure download links
      // 4. Add user to your system

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Download proxy — serves GitHub release assets as static files
// Uses express.static-style URL paths so Chrome uses the URL filename
const VALID_ASSETS = new Set(['local-memory-macos-arm', 'local-memory-macos-intel', 'local-memory-windows.exe', 'local-memory-linux']);
const GITHUB_RELEASE_BASE = 'https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download';

app.get('/downloads/:asset', async (req, res) => {
  const asset = req.params.asset;
  console.log(`[download] Request for asset: ${asset}`);
  if (!VALID_ASSETS.has(asset)) {
    return res.status(400).json({ error: 'Invalid asset name' });
  }
  try {
    const upstream = await fetch(`${GITHUB_RELEASE_BASE}/${asset}`, { redirect: 'follow' });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Failed to fetch release asset' });
    }
    res.setHeader('Content-Disposition', `attachment; filename=${asset}`);
    // Set specific Content-Type so Chrome doesn't generate UUID filenames
    const contentType = asset.endsWith('.exe') ? 'application/x-msdownload' : 'application/x-executable';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-cache');
    const contentLength = upstream.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    const { Readable } = await import('stream');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeStream = Readable.fromWeb(upstream.body as any);
    nodeStream.pipe(res);
  } catch (error) {
    console.error('Error proxying download:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Download failed' });
    }
  }
});

// Verify payment status and download access
app.get('/api/verify-payment/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    
    // First check if session is in our successful payments store
    const storedSession = successfulSessions.get(sessionId);
    if (storedSession) {
      res.json({ 
        paid: true, 
        customerEmail: storedSession.customerEmail,
        verified: true
      });
      return;
    }
    
    // Fallback: verify directly with Stripe (for edge cases)
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Store for future requests (webhook might have missed this)
      successfulSessions.set(sessionId, {
        timestamp: Date.now(),
        customerEmail: session.customer_details?.email || undefined
      });
      
      res.json({ 
        paid: true, 
        customerEmail: session.customer_details?.email,
        verified: true
      });
    } else {
      res.json({ paid: false, verified: false });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Production: serve built frontend
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
  app.get('{*path}', (req, res) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/downloads/')) {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
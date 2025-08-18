import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
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

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product: 'local-memory-pro',
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
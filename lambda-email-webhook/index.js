const crypto = require('crypto');
const { Resend } = require('resend');

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Environment variables
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@updates.localmemory.co';
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;
const GA4_API_SECRET = process.env.GA4_API_SECRET;

// License key generation (matches frontend logic)
function generateProductKey(sessionId) {
  try {
    if (!sessionId) {
      throw new Error('Session ID is required for license key generation');
    }

    if (!DOWNLOAD_SECRET) {
      throw new Error('DOWNLOAD_SECRET environment variable is not configured');
    }

    if (DOWNLOAD_SECRET.length < 32) {
      throw new Error('DOWNLOAD_SECRET must be at least 32 characters for security');
    }

    // Create base hash from session + secret
    const baseInput = `${sessionId}-${DOWNLOAD_SECRET}`;

    // DEBUG: Log inputs for troubleshooting license key mismatch
    console.log('🔍 Lambda License Key Generation Debug:', {
      sessionId: sessionId,
      downloadSecretLength: DOWNLOAD_SECRET.length,
      downloadSecretFirst10: DOWNLOAD_SECRET.substring(0, 10),
      downloadSecretLast10: DOWNLOAD_SECRET.substring(DOWNLOAD_SECRET.length - 10),
      baseInput: baseInput.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });

    const baseHash = crypto.createHash('sha256').update(baseInput).digest('hex');

    // Extract components (4 chars each for 5 segments)
    const sessionHash = baseHash.substring(0, 4);
    const verificationHash = baseHash.substring(4, 8);
    const integrityHash = baseHash.substring(8, 12);
    const extraHash = baseHash.substring(12, 16);
    const checksumSeed = baseHash.substring(16, 20);

    // Generate checksum from all components
    const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${extraHash}${checksumSeed}`;
    const checksumHash = crypto.createHash('sha256').update(checksumInput).digest('hex');
    const checksum = checksumHash.substring(0, 4);

    // Combine into 5-segment format
    const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();

    // Filter unwanted characters [01OI578]
    const filtered = rawKey.replace(/[01OI578]/g, (match) => {
      const replacements = { '0': 'A', '1': 'B', 'O': 'C', 'I': 'D', '5': 'E', '7': 'F', '8': 'G' };
      return replacements[match] || match;
    });

    console.log('✅ License key generated successfully:', {
      sessionId: sessionId.slice(0, 8) + '...',
      keyLength: filtered.length,
      format: 'LM-XXXX-XXXX-XXXX-XXXX-XXXX'
    });

    return filtered;

  } catch (error) {
    console.error('❌ License key generation failed:', error);
    throw error;
  }
}

// Generate download URLs
function generateDownloadUrls() {
  const baseUrl = 'https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download/';

  return {
    'macos-arm': `${baseUrl}local-memory-macos-arm`,
    'macos-intel': `${baseUrl}local-memory-macos-intel`,
    'windows': `${baseUrl}local-memory-windows.exe`,
    'linux': `${baseUrl}local-memory-linux`
  };
}

// Send purchase event to GA4 via Measurement Protocol (server-side, 100% reliable)
async function sendGA4PurchaseEvent(session) {
  if (!GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
    console.warn('GA4 credentials not configured - skipping analytics');
    return;
  }

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: session.id,
          events: [{
            name: 'purchase',
            params: {
              transaction_id: session.id,
              value: (session.amount_total || 4900) / 100,
              currency: (session.currency || 'usd').toUpperCase(),
              items: [{
                item_id: 'local-memory-v1',
                item_name: 'Local Memory - AI Agent Memory System',
                item_category: 'AI Tools',
                price: (session.amount_total || 4900) / 100,
                quantity: 1
              }]
            }
          }]
        })
      }
    );
    console.log('GA4 purchase event sent:', session.id, 'Status:', response.status);
  } catch (error) {
    console.error('GA4 tracking error:', error);
  }
}

// Verify Stripe webhook signature
function verifyStripeSignature(body, signature, secret) {
  const elements = signature.split(',');
  const timestamp = elements.find(el => el.startsWith('t=')).split('t=')[1];
  const sig = elements.find(el => el.startsWith('v1=')).split('v1=')[1];

  const payload = timestamp + '.' + body;
  const expectedSig = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

  return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expectedSig, 'hex'));
}

// HTML email template — warm-paper redesign (matches the site + success page).
// Table-based layout with inline styles for broad email-client compatibility.
function createEmailTemplate(customerEmail, licenseKey, downloadUrls) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<title>Your Local Memory license key</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f1;">
  <!-- preheader (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">Your license key and a one-paste agent install prompt are inside.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f1;">
    <tr><td align="center" style="padding:32px 16px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%;">

        <!-- header -->
        <tr><td style="padding:0 8px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="https://www.localmemory.co/lm-logo.png" alt="Local Memory" width="28" height="28" style="vertical-align:middle; border-radius:6px;">
                <span style="font-family:Georgia, 'Times New Roman', serif; font-size:17px; font-weight:bold; color:#1f1b16; padding-left:10px; vertical-align:middle;">Local Memory</span>
              </td>
              <td align="right" style="font-family:'Courier New', Courier, monospace; font-size:11px; letter-spacing:1px; color:#a16207; vertical-align:middle;">ORDER CONFIRMED</td>
            </tr>
          </table>
        </td></tr>

        <!-- hero -->
        <tr><td style="padding:8px 8px 28px;">
          <div style="font-family:Georgia, 'Times New Roman', serif; font-size:34px; line-height:1.15; color:#1f1b16;">Your AI just got a <em style="color:#a16207;">memory.</em></div>
          <div style="font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#57503f; padding-top:12px;">Thanks for purchasing Local Memory. Everything you need is below — your license key, a one-paste agent install, and direct downloads.</div>
        </td></tr>

        <!-- license key card -->
        <tr><td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f1b16; border-radius:12px;">
            <tr><td style="padding:22px 26px 8px; font-family:'Courier New', Courier, monospace; font-size:11px; letter-spacing:1.5px; color:#78716c;">YOUR LICENSE KEY</td></tr>
            <tr><td style="padding:6px 26px 16px; font-family:'Courier New', Courier, monospace; font-size:19px; font-weight:bold; letter-spacing:1px; color:#eab308;">${licenseKey}</td></tr>
            <tr><td style="padding:0 26px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #3a332a;">
                <tr><td style="padding-top:14px; font-family:'Courier New', Courier, monospace; font-size:12px; line-height:1.7; color:#b8ad99;">
                  <span style="color:#78716c;"># activate after install</span><br>
                  <span style="color:#a16207;">$</span> local-memory license activate ${licenseKey} --accept-terms
                </td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- recommended: agent install -->
        <tr><td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4ecd9; border:1px solid #a16207; border-radius:12px;">
            <tr><td style="padding:24px 26px 0;">
              <span style="font-family:'Courier New', Courier, monospace; font-size:10px; font-weight:bold; letter-spacing:1px; color:#faf7f1; background-color:#a16207; padding:3px 9px; border-radius:20px;">RECOMMENDED</span>
            </td></tr>
            <tr><td style="padding:14px 26px 6px; font-family:Georgia, 'Times New Roman', serif; font-size:22px; color:#1f1b16;">Let your agent do the install.</td></tr>
            <tr><td style="padding:0 26px 18px; font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.6; color:#57503f;">
              Grab the install prompt from our Agent Setup page and paste it into Claude Code, Cursor, or any coding agent along with your license key above. The agent installs, activates, and connects Local Memory end to end — and will ask for your key if you forget to include it.
            </td></tr>
            <tr><td style="padding:0 26px 24px;">
              <a href="https://www.localmemory.co/agent-setup" style="display:inline-block; background-color:#1f1b16; color:#faf7f1; font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:bold; text-decoration:none; padding:13px 26px; border-radius:8px;">Get the install prompt &rarr;</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- manual downloads -->
        <tr><td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e5dfd3; border-radius:12px;">
            <tr><td style="padding:24px 26px 4px; font-family:Georgia, 'Times New Roman', serif; font-size:19px; color:#1f1b16;">Prefer to install it yourself?</td></tr>
            <tr><td style="padding:4px 26px 16px; font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:13.5px; line-height:1.6; color:#57503f;">
              Easiest: <span style="font-family:'Courier New', Courier, monospace; color:#1f1b16;">npm install -g local-memory-mcp</span> &nbsp;·&nbsp; or download the binary:
            </td></tr>
            <tr><td style="padding:0 26px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 8px 8px 0;"><a href="${downloadUrls['macos-arm']}" style="display:inline-block; border:1px solid #d6cfc0; color:#1f1b16; font-family:'Courier New', Courier, monospace; font-size:12px; font-weight:bold; text-decoration:none; padding:9px 16px; border-radius:7px;">macOS &middot; Apple Silicon &darr;</a></td>
                  <td style="padding:0 0 8px;"><a href="${downloadUrls['macos-intel']}" style="display:inline-block; border:1px solid #d6cfc0; color:#1f1b16; font-family:'Courier New', Courier, monospace; font-size:12px; font-weight:bold; text-decoration:none; padding:9px 16px; border-radius:7px;">macOS &middot; Intel &darr;</a></td>
                </tr>
                <tr>
                  <td style="padding:0 8px 0 0;"><a href="${downloadUrls['windows']}" style="display:inline-block; border:1px solid #d6cfc0; color:#1f1b16; font-family:'Courier New', Courier, monospace; font-size:12px; font-weight:bold; text-decoration:none; padding:9px 16px; border-radius:7px;">Windows &darr;</a></td>
                  <td><a href="${downloadUrls['linux']}" style="display:inline-block; border:1px solid #d6cfc0; color:#1f1b16; font-family:'Courier New', Courier, monospace; font-size:12px; font-weight:bold; text-decoration:none; padding:9px 16px; border-radius:7px;">Linux &darr;</a></td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:0 26px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5dfd3;">
                <tr><td style="padding-top:16px; font-family:'Courier New', Courier, monospace; font-size:12px; line-height:1.9; color:#57503f;">
                  <span style="color:#8a8172;"># then</span><br>
                  <span style="color:#a16207;">$</span> local-memory license activate ${licenseKey} --accept-terms<br>
                  <span style="color:#a16207;">$</span> local-memory start<br>
                  <span style="color:#a16207;">$</span> claude mcp add local-memory -- local-memory --mcp
                </td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- help row -->
        <tr><td style="padding:8px 8px 0; font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:13px; line-height:1.7; color:#57503f;">
          Questions? <a href="https://www.localmemory.co/docs" style="color:#a16207;">Read the docs</a>, <a href="https://discord.gg/rMmn8xP3fZ" style="color:#a16207;">join Discord</a> — the fastest way to get help.
        </td></tr>

        <!-- footer -->
        <tr><td style="padding:28px 8px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5dfd3;">
            <tr><td style="padding-top:18px; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:1.8; color:#8a8172;">
              Your license key never expires and can reactivate Local Memory anytime.<br>
              Downloads are served from the official Local Memory GitHub releases.<br><br>
              &copy; 2026 Local Memory &middot; 100% local &middot; no telemetry
            </td></tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Main Lambda handler
exports.handler = async (event) => {
  console.log('Webhook received:', JSON.stringify(event, null, 2));

  try {
    // Parse the request
    const body = event.body;
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];

    if (!signature) {
      console.error('No Stripe signature found');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No signature provided' })
      };
    }

    // Verify webhook signature
    if (!verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET)) {
      console.error('Invalid signature');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' })
      };
    }

    // Parse the event
    const stripeEvent = JSON.parse(body);
    console.log('Stripe event type:', stripeEvent.type);

    // Handle checkout session completed
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      const customerEmail = session.customer_details?.email;
      const sessionId = session.id;

      console.log('Processing successful payment:', {
        sessionId: sessionId.slice(0, 12) + '...',
        customerEmail: customerEmail
      });

      if (!customerEmail) {
        console.error('No customer email found in session');
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'No customer email' })
        };
      }

      // Generate license key and download URLs
      const licenseKey = generateProductKey(sessionId);
      const downloadUrls = generateDownloadUrls();

      // Create email content
      const emailHtml = createEmailTemplate(customerEmail, licenseKey, downloadUrls);

      // Send email via Resend
      const emailResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: 'Your Local Memory license key',
        html: emailHtml
      });

      console.log('Email sent successfully:', emailResult);

      // Send GA4 purchase event (server-side tracking, 100% reliable)
      await sendGA4PurchaseEvent(session);

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          emailId: emailResult.data?.id,
          sessionId: sessionId
        })
      };
    }

    // For other event types, just acknowledge
    console.log('Unhandled event type:', stripeEvent.type);
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
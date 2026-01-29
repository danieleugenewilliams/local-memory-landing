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

// HTML email template
function createEmailTemplate(customerEmail, licenseKey, downloadUrls) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Local Memory!</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo-container { display: flex; align-items: center; justify-content: center; gap: 16px; }
        .logo-img { width: 40px; height: 40px; }
        .logo-text { font-size: 40px; font-weight: bold; color: #0066cc; line-height: 1; display: flex; align-items: center; }
        .welcome { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .license-key { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .license-code { font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold; color: #0066cc; background: white; padding: 10px; border-radius: 4px; display: inline-block; }
        .download-section { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .download-link { display: inline-block; background: #6c757d; color: white !important; border: 2px solid white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 5px; font-weight: bold; }
        .download-link:hover { background: #5a6268; color: white !important; }
        .setup-section { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; }
        .discord-link { color: #7289da; text-decoration: none; font-weight: bold; }
        .security-note { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 14px; }
        .setup-option { margin: 15px 0; padding: 15px; border: 1px solid #ddd; border-radius: 6px; background: #f8f9fa; }
        .setup-option h3 { margin: 0 0 10px 0; color: #333; }
        .setup-option-quick { border: 2px solid #28a745; }
        .setup-option-agent { border: 2px solid #e67e22; }
        .setup-option-advanced { border: 2px solid #8e44ad; }
        .docs-link { color: #0066cc; text-decoration: none; font-weight: bold; }
        .docs-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <img src="https://www.localmemory.co/lm-logo.png" alt="Local Memory Logo" class="logo-img">
            <div class="logo-text">Local Memory</div>
        </div>
    </div>

    <div class="welcome">
        <h1>Welcome to Local Memory!</h1>
        <p>Thank you for your purchase! Your AI memory system is ready to transform how you work with Claude.</p>
    </div>

    <div class="license-key">
        <h2>Your Product License Key</h2>
        <p>Save this key - you'll need it to activate Local Memory:</p>
        <div class="license-code">${licenseKey}</div>
        <p><small>Keep this key safe as it is unique to your purchase</small></p>
    </div>

    <div class="download-section">
        <h2>Download Local Memory</h2>
        <p>Choose your platform to download:</p>
        <div style="text-align: center;">
            <a href="${downloadUrls['macos-arm']}" class="download-link">macOS (Apple Silicon)</a>
            <a href="${downloadUrls['macos-intel']}" class="download-link">macOS (Intel)</a>
            <a href="${downloadUrls.windows}" class="download-link">Windows</a>
            <a href="${downloadUrls.linux}" class="download-link">Linux</a>
        </div>
    </div>

    <div class="setup-section">
        <h2>Setup Options</h2>
        <p>Choose the setup method that works best for you:</p>

        <div class="setup-option setup-option-quick">
            <h3>Quick Start (2 Minutes)</h3>
            <p>Zero-config setup with automatic detection. Perfect for most users.</p>
            <p><a href="https://www.localmemory.co/docs#quick-start" class="docs-link">View Quick Start Guide</a></p>
        </div>

        <div class="setup-option setup-option-agent">
            <h3>Agent Setup Prompts (Recommended)</h3>
            <p>Let your AI assistant handle the complete installation and configuration.</p>
            <p><a href="https://www.localmemory.co/docs#agent-setup" class="docs-link">View Agent Setup Guide</a></p>
        </div>

        <div class="setup-option setup-option-advanced">
            <h3>Advanced Setup</h3>
            <p>Custom configurations for developers and advanced users.</p>
            <p><a href="https://www.localmemory.co/docs#manual-setup" class="docs-link">View Advanced Setup Guide</a></p>
        </div>

        <p><strong>API Documentation:</strong> View the complete <a href="https://www.localmemory.co/docs#api-reference" class="docs-link">MCP and REST API reference</a> for integration details.</p>

        <p><strong>Need help?</strong> Join our <a href="https://discord.gg/rMmn8xP3fZ" class="discord-link">Discord community</a> for support and tips!</p>
    </div>

    <div class="security-note">
        <strong>Security Note:</strong> Your download links are secure from the Local Memory GitHub releases repo. Your license key never expires and can be used to reactivate Local Memory anytime.
    </div>

    <div class="footer">
        <p>Best regards,<br>The Local Memory Team</p>
        <p><small>Having trouble? Reply to this email or reach out on <a href="https://discord.gg/rMmn8xP3fZ" class="discord-link">Discord</a></small></p>
    </div>
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
        subject: 'Welcome to Local Memory - Your Download & License Key',
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
# Stripe Email Webhook Lambda Function

This AWS Lambda function handles Stripe webhooks and sends confirmation emails to customers when they complete a purchase.

## Features

- ✅ Verifies Stripe webhook signatures for security
- ✅ Generates unique license keys using the same algorithm as your frontend
- ✅ Sends beautiful HTML emails via Resend
- ✅ Includes download links for all platforms
- ✅ Provides setup instructions and community links

## Setup Instructions

### 1. Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- Resend account and API key
- Stripe webhook secret

### 2. Environment Variables

Set these in your Lambda function configuration:

```bash
RESEND_API_KEY=re_xxxxxxxxxx          # Your Resend API key
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxx # Your Stripe webhook secret
DOWNLOAD_SECRET=your-64-char-secret   # Same as VITE_DOWNLOAD_SECRET from frontend
FROM_EMAIL=noreply@yourdomain.com     # Email address to send from
```

### 3. Deploy to AWS Lambda

#### Option A: Manual Deployment

1. **Create Lambda Function:**
   ```bash
   # Install dependencies
   npm install

   # Create deployment package
   zip -r function.zip .
   ```

2. **In AWS Console:**
   - Go to Lambda → Create function
   - Function name: `stripe-email-webhook`
   - Runtime: Node.js 18.x
   - Upload `function.zip`
   - Set environment variables above
   - Create Function URL with CORS enabled

#### Option B: Using Deploy Script

```bash
# Make sure AWS CLI is configured
aws configure

# Run deployment script
./deploy.sh
```

### 4. Configure Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: Your Lambda Function URL
4. Events to send: `checkout.session.completed`
5. Add endpoint

### 5. Test the Integration

1. Make a test purchase using Stripe's test card: `4242 4242 4242 4242`
2. Check Lambda logs in CloudWatch
3. Verify email delivery in Resend dashboard

## Email Template

The function sends a professional HTML email containing:

- **Welcome message** with purchase confirmation
- **License key** prominently displayed
- **Download links** for all platforms (macOS, Windows, Linux)
- **Quick start instructions** with activation command
- **Community links** for support

## Security Features

- **Webhook signature verification** prevents spoofed requests
- **License key generation** uses cryptographic hashing
- **Environment variables** keep secrets secure
- **Input validation** prevents malformed requests

## Monitoring

Check these AWS CloudWatch logs for debugging:
- `/aws/lambda/stripe-email-webhook`

Common log entries:
- `✅ License key generated successfully`
- `Email sent successfully`
- `❌ License key generation failed` (check DOWNLOAD_SECRET)

## Troubleshooting

### Email not sending?
- Check RESEND_API_KEY is valid
- Verify FROM_EMAIL is authorized in Resend
- Check CloudWatch logs for errors

### Webhook not triggering?
- Verify Stripe webhook URL matches Lambda Function URL
- Check webhook is enabled for `checkout.session.completed`
- Test webhook in Stripe dashboard

### License key errors?
- Ensure DOWNLOAD_SECRET matches frontend exactly
- Should be 64+ characters for security
- Check CloudWatch logs for generation errors

## Cost Estimate

For 100 purchases/month:
- Lambda invocations: ~$0.01
- Resend emails: ~$1.00
- **Total: ~$1.01/month**

Very cost-effective for email automation!
# Email Automation Setup Guide

This guide will help you set up automated email delivery for customer purchases using AWS Lambda and Resend.

## 🎯 Overview

When customers complete a Stripe payment, they'll automatically receive a professional email containing:
- ✅ Purchase confirmation
- ✅ Unique license key
- ✅ Download links for all platforms
- ✅ Setup instructions
- ✅ Community support links

## 📋 Prerequisites

- AWS account with Lambda access
- [Resend](https://resend.com) account (free tier available)
- Stripe webhook access
- Domain for sending emails (optional but recommended)

## 🚀 Step-by-Step Setup

### 1. Get Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Name it `stripe-webhooks` and copy the key
5. **Save this key** - you'll need it for Lambda

### 2. Deploy Lambda Function

#### Option A: AWS Console (Recommended)

1. **Create Function:**
   - Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
   - Click **Create function**
   - Choose **Author from scratch**
   - Function name: `stripe-email-webhook`
   - Runtime: **Node.js 18.x** or later
   - Click **Create function**

2. **Upload Code:**
   ```bash
   cd lambda-email-webhook
   npm install
   zip -r function.zip .
   ```
   - In Lambda console, upload `function.zip`

3. **Configure Function:**
   - **Timeout:** 30 seconds
   - **Memory:** 256 MB
   - **Environment Variables:**
     ```
     RESEND_API_KEY=your_resend_api_key_here
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
     DOWNLOAD_SECRET=your_64_character_secret_here
     FROM_EMAIL=noreply@updates.localmemory.co
     ```

4. **Create Function URL:**
   - Go to **Configuration** → **Function URL**
   - Click **Create function URL**
   - Auth type: **NONE**
   - CORS: **Enable**
   - **Save** and copy the Function URL

#### Option B: Using Deploy Script

```bash
cd lambda-email-webhook
./deploy.sh
```

### 3. Configure Environment Variables

Set these in your Lambda function:

| Variable | Value | Example |
|----------|-------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_Abc123...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_Def456...` |
| `DOWNLOAD_SECRET` | Same as `VITE_DOWNLOAD_SECRET` | `your-64-char-random-string` |
| `FROM_EMAIL` | Sender email address | `noreply@yourdomain.com` |

⚠️ **Important:** `DOWNLOAD_SECRET` must match your frontend's `VITE_DOWNLOAD_SECRET` exactly!

### 4. Set Up Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. **Endpoint URL:** Your Lambda Function URL
4. **Events to send:** Select `checkout.session.completed`
5. Click **Add endpoint**
6. **Copy the webhook secret** for the environment variables

### 5. Configure Email Domain (Optional but Recommended)

For better deliverability, set up your domain in Resend:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides
5. Verify the domain
6. Update `FROM_EMAIL` to use your domain

## 🧪 Testing

### Test with Stripe's Test Mode

1. **Use test card:** `4242 4242 4242 4242`
2. **Complete a test purchase**
3. **Check Lambda logs** in CloudWatch:
   - Go to CloudWatch → Log groups
   - Find `/aws/lambda/stripe-email-webhook`
   - Look for successful email sending

### Verify Email Delivery

1. **Check Resend dashboard** for sent emails
2. **Test with your own email** first
3. **Verify all email elements:**
   - License key displays correctly
   - Download links work
   - Styling renders properly

## 🎨 Customization

### Email Template

Edit `lambda-email-webhook/index.js` → `createEmailTemplate()` function:

- **Colors:** Update CSS styles
- **Content:** Modify text and sections
- **Branding:** Add your logo/imagery
- **Links:** Update community/support URLs

### License Key Format

The Lambda uses the same algorithm as your frontend. If you change the license key format, update both:
- Frontend: `src/pages/Success.tsx`
- Lambda: `lambda-email-webhook/index.js`

## 📊 Monitoring

### CloudWatch Logs

Monitor these log patterns:
- `✅ License key generated successfully` - Normal operation
- `Email sent successfully` - Email delivered
- `❌ License key generation failed` - Check DOWNLOAD_SECRET
- `Invalid signature` - Check STRIPE_WEBHOOK_SECRET

### Resend Dashboard

Track email metrics:
- **Sent:** Total emails processed
- **Delivered:** Successfully delivered
- **Bounced:** Invalid email addresses
- **Complaints:** Spam reports

## 💰 Cost Estimate

For 100 purchases/month:
- **AWS Lambda:** ~$0.01 (very low usage)
- **Resend emails:** ~$1.00 (free tier covers 3,000/month)
- **Total:** ~$1.01/month

## 🔧 Troubleshooting

### Common Issues

**Email not sending?**
- ✅ Verify `RESEND_API_KEY` is correct
- ✅ Check `FROM_EMAIL` is authorized in Resend
- ✅ Review CloudWatch logs for errors

**Webhook not triggering?**
- ✅ Confirm Function URL matches Stripe webhook
- ✅ Verify webhook is enabled for `checkout.session.completed`
- ✅ Test webhook in Stripe dashboard

**License key errors?**
- ✅ Ensure `DOWNLOAD_SECRET` matches frontend exactly
- ✅ Must be 64+ characters long
- ✅ Check for typos in environment variables

**Email in spam folder?**
- ✅ Set up domain authentication in Resend
- ✅ Use a professional `FROM_EMAIL` address
- ✅ Test with different email providers

### Support Resources

- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **AWS Lambda Docs:** [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- **Stripe Webhooks:** [Stripe Webhook Guide](https://stripe.com/docs/webhooks)

## 🎉 Success!

Once configured, customers will receive professional welcome emails automatically after each purchase. This addresses the mobile purchase UX issue your Discord users mentioned - they'll have everything they need in their inbox!

The email includes:
- 🔑 License key for activation
- 📱 Mobile-friendly download links
- 🚀 Clear setup instructions
- 💬 Community support links

Your customers will love the improved experience!
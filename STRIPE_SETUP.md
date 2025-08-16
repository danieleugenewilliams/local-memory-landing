# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up Stripe payments for local-memory downloads with the following flow:
1. User visits landing page
2. Clicks "Get Started" 
3. Redirected to payment page
4. Completes Stripe checkout
5. Redirected to success page with download links

## Setup Steps

### 1. Stripe Account Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard:
   - Publishable key (starts with `pk_test_` or `pk_live_`)
   - Secret key (starts with `sk_test_` or `sk_live_`)
3. Create a product and price in Stripe dashboard:
   - Go to Products > Add Product
   - Name: "Local Memory Pro"
   - Price: $29 (one-time payment)
   - Copy the Price ID (starts with `price_`)

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Stripe keys:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
   STRIPE_PRICE_ID=price_your_actual_price_id
   ```

### 3. Webhook Setup (Optional but Recommended)

1. In Stripe dashboard, go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook secret and add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 4. Download Files Setup

Create a `public/downloads` directory and add your executable files:
```
public/
  downloads/
    local-memory-macos.dmg
    local-memory-windows.exe
    local-memory-linux.tar.gz
```

### 5. Running the Application

#### Development Mode
```bash
# Run both frontend and backend
npm run dev:full

# Or run separately:
# Terminal 1 - Frontend (port 5173)
npm run dev

# Terminal 2 - Backend (port 3001) 
npm run dev:server
```

#### Production Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the backend server to your hosting provider
3. Update environment variables for production
4. Set up proper domain and SSL certificates

## Payment Flow

### User Journey
1. **Landing Page** (`/`) - User browses and clicks "Get Started"
2. **Payment Page** (`/payment`) - Shows pricing and Stripe checkout button
3. **Stripe Checkout** - Secure payment processing (redirects to Stripe)
4. **Success Page** (`/success`) - Download links for all platforms

### Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Webhook Verification**: Always verify webhook signatures
3. **Download Protection**: Consider signed URLs for download links
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS properly for your domain

## Customization

### Pricing
Update the price in:
- Stripe dashboard (create new price)
- `.env` file (`STRIPE_PRICE_ID`)
- Payment page UI (`src/pages/Payment.tsx`)

### Download Files
- Add files to `public/downloads/`
- Update file paths in `src/pages/Success.tsx`
- Consider using signed URLs for security

### Styling
- Update colors and branding in payment/success pages
- Modify the CTA button in `src/components/CtaSection.tsx`

## Testing

### Test Mode
1. Use Stripe test keys (`pk_test_` and `sk_test_`)
2. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### Test Flow
1. Visit `http://localhost:5173`
2. Click "Get Started with Local Memory"
3. Click "Get Instant Access - $29"
4. Complete test payment
5. Verify redirect to success page
6. Test download links

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running on port 3001
2. **Environment Variables**: Check `.env` file exists and has correct values
3. **Stripe Keys**: Verify keys are correct and not mixed up
4. **Webhook Failures**: Check endpoint URL and webhook secret

### Logs
- Frontend: Browser console
- Backend: Terminal running `npm run dev:server`
- Stripe: Stripe dashboard > Developers > Logs

## Production Checklist

- [ ] Switch to live Stripe keys
- [ ] Set up webhook endpoint
- [ ] Configure production domain
- [ ] Set up SSL certificates
- [ ] Test complete payment flow
- [ ] Set up monitoring/logging
- [ ] Configure backup strategy for download files
- [ ] Set up email notifications (optional)

## Support

For issues with this integration:
1. Check the troubleshooting section
2. Review Stripe documentation
3. Contact support if needed
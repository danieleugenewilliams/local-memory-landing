/**
 * Shared payment utilities for handling Stripe payment flow
 */

export const generatePaymentToken = (): string => {
  // Generate a random token for payment verification
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const handleStripePayment = (): void => {
  const paymentLinkUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
  
  // Check if environment variable is configured
  if (!paymentLinkUrl || paymentLinkUrl.includes('your_payment_link_here')) {
    alert(`Payment link not configured. Please set VITE_STRIPE_PAYMENT_LINK in your environment variables.

To complete the setup:

1. Go to https://dashboard.stripe.com/payment-links
2. Click "Create payment link"
3. Select your $29 product/price
4. Set success URL to: ${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}
5. Copy the payment link URL
6. Add it to your .env file as VITE_STRIPE_PAYMENT_LINK

This keeps your payment configuration secure and maintainable!`);
    return;
  }
  
  // Generate payment session data with timestamp
  const paymentTimestamp = Date.now();
  const token = generatePaymentToken();
  const paymentData = {
    token: token,
    timestamp: paymentTimestamp,
    initiated: paymentTimestamp // Store when payment was initiated for URL generation
  };
  
  // Store comprehensive payment data in localStorage for verification
  localStorage.setItem('payment_token', JSON.stringify(paymentData));
  
  // Store session indicators for additional verification
  sessionStorage.setItem('payment_initiated', 'true');
  sessionStorage.setItem('payment_timestamp', paymentTimestamp.toString());
  sessionStorage.setItem('payment_token_backup', token);
  
  // Open Stripe Payment Link in new tab
  // Note: The success URL should be configured in Stripe Dashboard as:
  // ${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}
  window.open(paymentLinkUrl, '_blank');
};
/**
 * Legacy Stripe Payment-Link entry point (retired).
 *
 * The live purchase flow now uses the embedded checkout drawer
 * (CheckoutContext / CheckoutDrawer via `openCheckout`), which creates a
 * server-side session and completes at /checkout/complete. The old hosted
 * Stripe Payment Link has been retired.
 *
 * This helper is kept only so the remaining unrouted legacy pages still
 * compile; it routes any such CTA to the current pricing page. It
 * intentionally no longer reads VITE_STRIPE_PAYMENT_LINK — that value is a
 * client-embedded env var, so referencing it here would inline the hosted
 * Payment Link URL into the public bundle.
 */
export const handleStripePayment = (): void => {
  window.location.href = "/pricing";
};

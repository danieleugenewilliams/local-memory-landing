# Feature Contract: Embedded Stripe Checkout

**Contract ID:** LM-001
**Priority:** P1 — Current payment link redirect breaks user flow and reduces conversion
**Estimated Effort:** 1–2 days
**Dependencies:** Stripe product/price configured, `@stripe/stripe-js` and `@stripe/react-stripe-js` already installed

---

## Problem Statement

When a user clicks "Get Started" on localmemory.co, they navigate to a dedicated `/payment` page and then open a Stripe Payment Link (`buy.stripe.com`) in a new tab. This creates three conversion problems:

1. **Context loss** — The user just read about Local Memory's features, felt the value proposition, and was ready to buy. The redirect to a separate page and then a new tab breaks that momentum. By the time the Stripe page loads, they're in a different mental context.
2. **Trust gap** — `buy.stripe.com` looks nothing like localmemory.co. Users who don't recognize Stripe may hesitate. The domain change triggers the "is this legit?" reflex.
3. **No recovery path** — If the user closes the Stripe tab or hits back, they're gone. There's no way to re-engage them from the context where purchase intent was highest.

## Design Goal

The user should be able to complete a purchase without ever leaving the page they're on. The checkout experience should feel like a natural continuation of browsing — not a handoff to a third party.

---

## Conversion-Optimized Purchase Flow

### Trigger Points (where users are most likely to buy)

There are three high-intent moments on the site. The checkout experience must be accessible from all of them without losing context:

1. **Hero CTA** — User just read the headline and value prop. Peak emotional resonance.
2. **Final CTA section** — User has scrolled through features, demo, problem/solution, and is ready to act.
3. **Pricing section on `/payment` page** — Deliberate buyer who navigated specifically to purchase.

### Purchase UX: Slide-Over Checkout

Instead of navigating to `/payment` and opening a new tab, use a **slide-over panel** that overlays the current page. This preserves the context that created the purchase intent.

**Why slide-over, not a redirect:**
- User can still see the landing page content behind the panel
- Feels like an in-app action, not a navigation event
- If they dismiss it, they're back where they were — no back-button confusion
- Works naturally on mobile as a bottom sheet

**Desktop (768px+):** Slide-in from right using Sheet component (`src/components/ui/sheet.tsx`) with `side="right"`
**Mobile (<768px):** Slide-up from bottom using Drawer component (`src/components/ui/drawer.tsx`, Vaul v0.9.9) via the existing `useIsMobile()` hook. Drawer is preferred over Sheet for mobile because it provides a native drag handle, `shouldScaleBackground` for app-like feel, and swipe-to-dismiss — all purpose-built for bottom sheet interactions.

**Slide-over contents:**
1. **Order summary strip** (top of panel)
   - Product name: "Local Memory"
   - Price: "$49" (one-time)
   - Brief reminder: "Lifetime license — all platforms"
2. **Stripe Embedded Checkout form** (fills the panel)
   - Card input, billing details, pay button — rendered by `stripe.initEmbeddedCheckout()` (from `@stripe/stripe-js` v7.8.0, already installed)
   - Stripe handles payment method selection, validation, error states, and 3D Secure
3. **Trust indicators** (below Stripe form)
   - "Secure checkout powered by Stripe"
   - "One-time purchase, no subscription"
   - Lock icon + "256-bit encryption"

### Post-Purchase: Inline Success

After successful payment, the slide-over transforms into a success state:
- Checkmark animation
- Generated license key displayed (using existing SHA256 generation logic from `SuccessNew.tsx`)
- Platform download buttons (macOS, Linux) with secure download URLs
- "View documentation" link

**The `/success` page remains as a fallback** for edge cases where users navigate away mid-checkout and Stripe redirects them back via `return_url`. The existing success page logic (token verification, license key generation, download URLs) stays untouched.

---

## Technical Implementation

### Backend

**Refactored endpoint: `POST /api/create-checkout-session`**

The endpoint exists in `server.ts:30-55` but currently creates **hosted checkout sessions** (redirect mode). It must be refactored to embedded mode — this is a non-trivial change, not a simple flag toggle.

**Current implementation** (to be replaced):
- Accepts `{ priceId, successUrl, cancelUrl }` from the client
- Creates a session with `success_url` and `cancel_url` (redirect-mode parameters)
- Returns `{ url: session.url }` (a Stripe-hosted redirect URL)

**New implementation:**
```
Request:  { } (no params needed — single product)
Response: { clientSecret: 'cs_...', sessionId: 'cs_...' }
```

Creates a Stripe Checkout Session with:
- `ui_mode: 'embedded'` (replaces implicit redirect mode)
- `mode: 'payment'`
- `line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }]` (note: `STRIPE_PRICE_ID` is already referenced server-side at `server.ts:39` — no new env var needed)
- `return_url: https://localmemory.co/checkout/complete?session_id={CHECKOUT_SESSION_ID}` (replaces `success_url`/`cancel_url`)
- Remove `payment_method_types` param (Stripe auto-detects in embedded mode)
- Returns `{ clientSecret: session.client_secret, sessionId: session.id }` instead of `{ url: session.url }` — sessionId returned explicitly for license key generation (avoids parsing Stripe internal client secret format)

**Rate limiting:** Add `express-rate-limit` to `create-checkout-session` (10 requests/minute per IP) to prevent bots from creating unlimited Stripe sessions. This is the one new dependency (`npm install express-rate-limit`).

The existing webhook handler (`POST /api/webhook` at `server.ts:58-95`) requires no changes — it already handles `checkout.session.completed` events and stores sessions in the in-memory map. Embedded checkout sessions trigger the same webhook event as hosted sessions.

**New endpoint: `GET /api/session-status?session_id=...`**

Returns session status after checkout completes. Used by the frontend to confirm payment.

```
Response: { status: 'complete' | 'open' | 'expired' }
```

**Security note:** Do not expose `customerEmail` in this unauthenticated endpoint. Session IDs are long random strings (low enumeration risk), but leaking email addresses is unnecessary — the frontend doesn't need it for license key generation or success state display.

### Frontend

**New component: `CheckoutDrawer`** (`src/components/CheckoutDrawer.tsx`)

Adapted from the ware-react implementation pattern, using a hybrid approach:

- **Desktop:** Uses `Sheet` component (`src/components/ui/sheet.tsx`) with `side="right"`. Override default width from `sm:max-w-sm` to `sm:max-w-lg` (Stripe embedded form needs ~400px min).
- **Mobile:** Uses `Drawer` component (`src/components/ui/drawer.tsx`, Vaul v0.9.9) for a native bottom sheet experience with drag handle, swipe-to-dismiss, and background scaling. Height capped at `max-h-[90vh]`.
- **Responsive switching:** `useIsMobile()` hook from `src/hooks/use-mobile.tsx` (768px breakpoint) determines which component to render.
- State machine: `'loading' | 'mounted' | 'success' | 'error'`
- Props: `isOpen`, `onClose`, `onSuccess`

**Stripe initialization:**
```typescript
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null
```
- Called once at module level (idempotent)
- `VITE_STRIPE_PUBLISHABLE_KEY` already configured in `.env`

**Checkout lifecycle:**
1. On drawer open: Call `POST /api/create-checkout-session` to get `clientSecret`
2. Initialize: `stripe.initEmbeddedCheckout({ fetchClientSecret, onComplete })`
3. Mount: `checkout.mount(mountRef.current)` into a ref'd div
4. On complete: Transition to success state, generate license key, show downloads
5. On close/unmount: `checkout.destroy()` for cleanup

**Success state inside drawer:**
- Reuse license key generation logic from `SuccessNew.tsx` (extract to shared utility)
- Generate platform-specific GitHub download URLs (same logic as current success page)
- Track GA4 events: `purchase`, `license_key_generated`, `close_convert_lead`

**Updated: CTA buttons across the site**

All "Get Started" buttons that currently link to `/payment` or call `handleStripePayment()` will instead open the `CheckoutDrawer`. A codebase-wide grep for `to="/payment"` and `handleStripePayment` must be performed during implementation to ensure no locations are missed.

**Active v2 components (primary targets):**

| Component | File | Current Behavior | New Behavior |
|-----------|------|-----------------|--------------|
| `HeaderNew` | `src/components/v2/HeaderNew.tsx` (lines 64, 108) | `<Link to="/payment">` (2 CTAs: desktop + mobile) | Opens `CheckoutDrawer` |
| `HeroDifferentiated` | `src/components/v2/HeroDifferentiated.tsx` (line 85) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `HeroNew` | `src/components/v2/HeroNew.tsx` (line 69) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `CTANew` | `src/components/v2/CTANew.tsx` (line 21) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `FooterNew` | `src/components/v2/FooterNew.tsx` (line 36) | `<Link to="/payment">` | **Keep as navigation link** — labeled "Pricing" in nav section, not a purchase CTA |
| `ValueStack` | `src/components/v2/ValueStack.tsx` (line 313) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `PaymentNew` | `src/pages/PaymentNew.tsx` (line 125) | `handleStripePayment()` | Opens `CheckoutDrawer` |

**Active page CTAs:**

| Page | File | Current Behavior | New Behavior |
|------|------|-----------------|--------------|
| `FeaturesNew` | `src/pages/FeaturesNew.tsx` (line 501) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `ArchitectureNew` | `src/pages/ArchitectureNew.tsx` (line 747) | `<Link to="/payment">` | Opens `CheckoutDrawer` |
| `PromptsNew` | `src/pages/PromptsNew.tsx` (lines 244, 645, 678) | `<Link to="/payment">` (3 CTAs) | Opens `CheckoutDrawer` |

**Legacy components (audit required):**

These pre-v2 components also reference `/payment` or `handleStripePayment()`. Determine during implementation whether they are still rendered in any route or are dead code:

| Component | File | Current Behavior | Action |
|-----------|------|-----------------|--------|
| `Header` (legacy) | `src/components/Header.tsx` (line 133) | `<Link to="/payment">` | Update or remove if dead code |
| `Hero` (legacy) | `src/components/Hero.tsx` (line 42) | `<Link to="/payment">` | Update or remove if dead code |
| `Payment` (legacy) | `src/pages/Payment.tsx` (line 117) | `handleStripePayment()` | Update or remove if dead code |
| `Features` (legacy) | `src/pages/Features.tsx` (line 673) | `handleStripePayment()` | Update or remove if dead code |
| `Docs` (legacy) | `src/pages/Docs.tsx` (lines 154, 282, 860) | `handleStripePayment()` (3 calls) | Update or remove if dead code |
| `WhyLocalMemory` | `src/components/WhyLocalMemory.tsx` (line 160) | `handleStripePayment()` | Update or remove if dead code |

Each active component will manage a `checkoutOpen` state and render `<CheckoutDrawer isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />`.

**Updated: `/payment` page (`PaymentNew.tsx`)**

The payment page stays as a dedicated route but the "Purchase with Stripe" button now opens the `CheckoutDrawer` instead of calling `handleStripePayment()` (which opens `VITE_STRIPE_PAYMENT_LINK` in a new tab).

**New route: `/checkout/complete`** (`src/pages/CheckoutComplete.tsx`)

Fallback landing page for `return_url` — only hit if user navigates away during embedded checkout and Stripe redirects them back:
- Reads `session_id` from query params
- Calls `GET /api/session-status` to confirm payment
- Shows success state with license key and downloads
- Links back to home or docs

**Shared utility: `src/lib/license.ts`**

Extract license key generation from `SuccessNew.tsx` into a shared module so both the success page and `CheckoutDrawer` can use it:
- `generateLicenseKey(sessionId: string): string`
- `generateDownloadUrls(): { macos: string, linux: string }`

### Environment Variables

**Remove** (no longer needed after migration):
- `VITE_STRIPE_PAYMENT_LINK` — replaced by embedded checkout
- `VITE_STRIPE_PRICE_ID` — frontend no longer needs the price ID; server already uses `STRIPE_PRICE_ID` (`server.ts:39`)

**Keep** (still needed):
- `VITE_STRIPE_PUBLISHABLE_KEY` — required by `loadStripe()`, public by design
- `STRIPE_SECRET_KEY` — backend Stripe API calls
- `STRIPE_WEBHOOK_SECRET` — webhook signature verification
- `STRIPE_PRICE_ID` — already referenced server-side at `server.ts:39` (no new var needed)
- `VITE_DOWNLOAD_SECRET` — license key generation (stays client-side)

### Dependencies

One new backend dependency: `express-rate-limit` for rate limiting the checkout session endpoint. Everything else is already installed:
- `@stripe/stripe-js` v7.8.0 — provides `loadStripe()` and `initEmbeddedCheckout()`
- `@stripe/react-stripe-js` v3.9.0 — available if needed for React wrappers
- `stripe` v18.4.0 — server-side SDK
- `tailwindcss-animate` v1.0.7 — Sheet animations (configured in `tailwind.config.ts:82`)
- `vaul` v0.9.9 — Drawer/bottom sheet library for mobile
- Sheet component (`src/components/ui/sheet.tsx`) — slide-in panel with Radix UI (desktop)
- Drawer component (`src/components/ui/drawer.tsx`) — bottom sheet with Vaul (mobile)
- `useIsMobile()` hook (`src/hooks/use-mobile.tsx`) — 768px breakpoint detection

---

## Existing Infrastructure to Preserve

The following must continue working unchanged:

1. **`/success` page** — Fallback for legacy payment link redirects and edge cases. Existing token verification, license key generation, and download URL logic stays intact.
2. **Webhook handler** — `POST /api/webhook` already handles `checkout.session.completed`. No changes needed.
3. **In-memory session store** — Webhook stores verified sessions with 24-hour TTL. The `verify-payment/:sessionId` endpoint stays for the success page fallback.
4. **GA4 analytics** — All existing tracking events preserved. New events added for embedded checkout flow.
5. **`/payment` page** — Stays as a route, but purchase action changes from new-tab redirect to in-page drawer.

---

## Success Criteria

- [ ] User can purchase without leaving the page they're on
- [ ] Slide-over checkout opens from all CTA locations: hero, header, final CTA, value stack, payment page, features page, architecture page, prompts page
- [ ] Desktop: Sheet slides in from right (`sm:max-w-lg`)
- [ ] Mobile: Drawer slides up from bottom (`max-h-[90vh]`) with drag handle and swipe-to-dismiss
- [ ] Payment completes → license key + downloads shown in-place (no redirect)
- [ ] Webhook still fires and stores session (same as current flow)
- [ ] `/success` page still works as a fallback
- [ ] `/checkout/complete` route handles `return_url` fallback correctly
- [ ] License key generation logic shared between success page and drawer via `src/lib/license.ts`
- [ ] GA4 events tracked: `begin_checkout`, `purchase`, `license_key_generated`
- [ ] `VITE_STRIPE_PAYMENT_LINK` and `VITE_STRIPE_PRICE_ID` env vars no longer required
- [ ] Only new dependency is `express-rate-limit` (backend security)
- [ ] No remaining `to="/payment"` links or `handleStripePayment()` calls in active components (grep verification)
- [ ] Legacy components audited and either updated or confirmed dead code
- [ ] `POST /api/create-checkout-session` has basic rate limiting (e.g., 10 req/min per IP)
- [ ] `GET /api/session-status` does not expose `customerEmail`
- [ ] Stripe embedded form renders correctly inside Vaul drawer on mobile (no CSS transform conflicts)

## Out of Scope

- Coupon/promo code input (Stripe handles this if enabled on the Checkout Session)
- Apple Pay / Google Pay (enabled automatically by Stripe based on browser support)
- Subscription billing (Local Memory is a one-time purchase)
- Changes to the download/license key security model
- Removing the `/payment` page entirely (it stays as a dedicated route with additional context like FAQ)

---

## Key Files

### New files

| File | Action |
|------|--------|
| `src/components/CheckoutDrawer.tsx` | **New** — Hybrid Sheet (desktop) + Drawer (mobile) with Stripe Embedded Checkout |
| `src/lib/license.ts` | **New** — Extracted license key + download URL generation |
| `src/pages/CheckoutComplete.tsx` | **New** — Fallback landing page for `return_url` |

### Backend

| File | Action |
|------|--------|
| `server.ts` | Refactor `create-checkout-session` from hosted to embedded mode (change request/response shape, add `ui_mode: 'embedded'`, replace `success_url`/`cancel_url` with `return_url`), add `session-status` endpoint |

### Active v2 components (CTA updates)

| File | Action |
|------|--------|
| `src/components/v2/HeaderNew.tsx` | Replace 2x `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/components/v2/HeroDifferentiated.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/components/v2/HeroNew.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/components/v2/CTANew.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/components/v2/FooterNew.tsx` | **No change** — "Pricing" nav link stays as `<Link to="/payment">` |
| `src/components/v2/ValueStack.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |

### Active pages (CTA updates)

| File | Action |
|------|--------|
| `src/pages/PaymentNew.tsx` | Replace `handleStripePayment()` with CheckoutDrawer |
| `src/pages/FeaturesNew.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/pages/ArchitectureNew.tsx` | Replace `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/pages/PromptsNew.tsx` | Replace 3x `<Link to="/payment">` with CheckoutDrawer trigger |
| `src/App.tsx` | Add `/checkout/complete` route |

### Refactored files

| File | Action |
|------|--------|
| `src/pages/SuccessNew.tsx` | Import license key logic from `src/lib/license.ts` (refactor, no behavior change) |
| `src/lib/payment.ts` | Remove `handleStripePayment()` after all callers are updated |

### Legacy components (audit required)

These files reference `/payment` or `handleStripePayment()`. During implementation, determine if they are rendered in any active route. If dead code, remove. If still used, update.

| File | Action |
|------|--------|
| `src/components/Header.tsx` | Audit: `<Link to="/payment">` at line 133 |
| `src/components/Hero.tsx` | Audit: `<Link to="/payment">` at line 42 |
| `src/components/WhyLocalMemory.tsx` | Audit: `handleStripePayment()` at line 160 |
| `src/pages/Payment.tsx` | Audit: `handleStripePayment()` at line 117 |
| `src/pages/Features.tsx` | Audit: `handleStripePayment()` at line 673 |
| `src/pages/Docs.tsx` | Audit: `handleStripePayment()` at lines 154, 282, 860 |

### UI primitives (no changes needed)

| File | Role |
|------|------|
| `src/components/ui/sheet.tsx` | Desktop slide-in panel (Radix UI) — used as-is |
| `src/components/ui/drawer.tsx` | Mobile bottom sheet (Vaul) — used as-is |
| `src/hooks/use-mobile.tsx` | 768px breakpoint detection — used as-is |

## Migration Path

1. **Extract license key generation** into `src/lib/license.ts` (independent, no behavior change). Move `generateProductKey()` and `validateLicenseKeyFormat()` from `SuccessNew.tsx`. Update `SuccessNew.tsx` to import from the new module.

2. **Refactor `server.ts` backend endpoint** — this is a non-trivial change:
   - a. Remove `priceId`, `successUrl`, `cancelUrl` request params
   - b. Add `ui_mode: 'embedded'` to session creation
   - c. Replace `success_url`/`cancel_url` with `return_url`
   - d. Change response from `{ url: session.url }` to `{ clientSecret: session.client_secret }`
   - e. Add new `GET /api/session-status` endpoint

3. **Build `CheckoutDrawer` component** with hybrid Sheet (desktop) + Drawer (mobile) pattern and Stripe Embedded Checkout

4. **Create `/checkout/complete` fallback page**, add route to `App.tsx`

5. **Update active v2 component CTAs** (6 components) — replace `<Link to="/payment">` with CheckoutDrawer trigger

6. **Update active page CTAs** (4 pages) — replace `<Link to="/payment">` and `handleStripePayment()` calls with CheckoutDrawer

7. **Audit legacy components** — grep codebase for remaining `to="/payment"` and `handleStripePayment` references. For each: determine if rendered in any active route, update or remove accordingly.

8. **Verify webhook** still processes correctly with embedded checkout sessions (same `checkout.session.completed` event, no handler changes expected)

9. **Clean up** — remove `VITE_STRIPE_PAYMENT_LINK` and `VITE_STRIPE_PRICE_ID` from env vars, remove `handleStripePayment()` from `payment.ts` after all callers are updated

10. **Keep `/success` page** as fallback — it should rarely be hit going forward

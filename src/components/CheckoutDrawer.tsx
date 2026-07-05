import { useEffect, useRef, useState } from "react";
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import { Download, AlertCircle, Lock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateLicenseKey, generateAllDownloadUrls } from "@/lib/license";
import { detectUserPlatform, getPlatformInfo } from "@/lib/utils";
import {
  trackBeginCheckout,
  trackPurchase,
  trackPageView,
  trackLicenseKeyGenerated,
  trackCloseConvertLead,
} from "@/lib/analytics";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

type DrawerState = "loading" | "mounted" | "success" | "error";

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutInner({
  state,
  errorMessage,
  mountRef,
  sessionId,
  onRetry,
  onClose,
}: {
  state: DrawerState;
  errorMessage: string;
  mountRef: React.RefObject<HTMLDivElement>;
  sessionId: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const licenseKey = state === "success" && sessionId ? generateLicenseKey(sessionId) : "";
  const platform = detectUserPlatform();
  const platformInfo = getPlatformInfo(platform);
  const downloadUrls = state === "success" ? generateAllDownloadUrls() : {};

  const copyLicenseKey = async () => {
    if (!licenseKey) return;
    await navigator.clipboard.writeText(licenseKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  // Short form of the key for the inline "activate" command hint.
  const licenseShort = licenseKey ? `${licenseKey.slice(0, 7)}…` : "";

  return (
    <div className="lm-theme flex h-full flex-col bg-lm-cream text-lm-ink">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-lm-line px-7 py-[18px]">
        <div className="flex items-center gap-2.5">
          <img src="/lm-logo.png" alt="Local Memory" className="h-[22px] w-[22px] rounded" />
          <span className="font-serif text-sm font-semibold text-lm-ink">Checkout</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="rounded-md px-2 pb-0.5 text-xl leading-none text-lm-muted transition-colors hover:bg-lm-sand-2 hover:text-lm-ink"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-7 py-6">
        {/* Guarantee line — shown alongside the Stripe form (Stripe renders its
            own product + price summary, so we don't duplicate a price card). */}
        {state !== "success" && (
          <div className="mb-5 flex items-center gap-2 font-plex text-[11.5px] text-lm-amber">
            <span className="h-[5px] w-[5px] rounded-full bg-lm-amber" />
            5-day money-back guarantee · instant license key
          </div>
        )}

        {/* Loading */}
        {state === "loading" && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-lm-amber border-t-transparent" />
            <p className="font-plex text-[13px] text-lm-stone-2">Loading secure checkout…</p>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="flex flex-col items-center justify-center gap-4 py-14">
            <AlertCircle className="h-10 w-10 text-lm-rust" />
            <p className="text-center text-sm text-lm-stone">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
            <button
              onClick={onRetry}
              className="rounded-lg bg-lm-ink px-6 py-2.5 text-sm font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              Try again
            </button>
          </div>
        )}

        {/* Success */}
        {state === "success" && (
          <div className="flex flex-col gap-5 py-1">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-lm-line-2 bg-lm-sand-2 text-2xl text-lm-amber">
                ✓
              </div>
              <div className="font-serif text-2xl text-lm-ink">Payment complete</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-lm-stone">
                Your license key is ready — copy it somewhere safe.
              </p>
            </div>

            {/* License key (dark box) */}
            <div className="flex items-center gap-2.5 rounded-[10px] bg-lm-ink px-[18px] py-3.5">
              <code className="flex-1 break-all text-left font-plex text-[13.5px] font-medium tracking-[0.03em] text-lm-gold">
                {licenseKey}
              </code>
              <button
                onClick={copyLicenseKey}
                className="shrink-0 rounded-md border border-lm-ink-soft px-3 py-1.5 font-plex text-[11.5px] text-[#b8ad99] transition-colors hover:border-lm-gold"
              >
                {isCopied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            {/* Next steps */}
            <div className="rounded-[10px] border border-lm-line bg-lm-sand px-5 py-[18px]">
              <div className="mb-3 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                Next: 2 minutes to memory
              </div>
              <div className="font-plex text-[12.5px] leading-[2] text-lm-stone">
                <div>
                  <span className="text-lm-amber">$</span> npm install -g local-memory-mcp
                </div>
                <div>
                  <span className="text-lm-amber">$</span> local-memory license activate {licenseShort}
                </div>
                <div>
                  <span className="text-lm-amber">$</span> local-memory start
                </div>
              </div>
            </div>

            {/* Download (platform-specific, real) */}
            <a
              href={downloadUrls[platform as keyof typeof downloadUrls]}
              download={platformInfo.filename}
              className="flex items-center justify-center gap-2 rounded-lg bg-lm-ink px-6 py-3.5 text-center text-[15px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              <Download className="h-4 w-4" />
              Download for {platformInfo.label}
            </a>

            {/* All platforms & setup guide */}
            <a
              href={`/checkout/complete?session_id=${sessionId}`}
              className="block rounded-lg border border-lm-line-2 py-3 text-center text-sm font-medium text-lm-ink transition-colors hover:border-lm-amber hover:text-lm-amber"
            >
              All platforms &amp; setup guide →
            </a>
          </div>
        )}

        {/* Stripe mount point — always in DOM, hidden when not mounted */}
        <div ref={mountRef} className={state === "mounted" ? "" : "hidden"} />
      </div>

      {/* Trust footer */}
      {state !== "error" && (
        <div className="flex shrink-0 items-center justify-center gap-2 border-t border-lm-line px-7 py-3.5 font-plex text-[11.5px] text-lm-muted">
          <Lock className="h-3 w-3" />
          Powered by Stripe · encrypted &amp; secure
        </div>
      )}
    </div>
  );
}

export default function CheckoutDrawer({ isOpen, onClose }: CheckoutDrawerProps) {
  const isMobile = useIsMobile();
  const [state, setState] = useState<DrawerState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const mountRef = useRef<HTMLDivElement>(null!);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);
  const sessionIdRef = useRef<string>("");
  const destroyedRef = useRef(false);

  const initCheckout = async () => {
    if (!stripePromise) {
      setErrorMessage("Stripe is not configured.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const stripe = await stripePromise;
      if (destroyedRef.current || !stripe) return;

      const checkout = await stripe.initEmbeddedCheckout({
        fetchClientSecret: async () => {
          const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to create checkout session");
          }
          const data = await res.json();
          sessionIdRef.current = data.sessionId;
          trackBeginCheckout("stripe_embedded");
          return data.clientSecret;
        },
        onComplete: () => {
          setState("success");
          const sid = sessionIdRef.current;
          if (sid) {
            // Fire page_view first so GA4 has a landing page if the session expired
            // during the Stripe iframe interaction (30-min inactivity timeout).
            // Without this, the purchase fires in a new session with landing page "(not set)".
            trackPageView("checkout_complete_inline");
            // Mark as tracked so CheckoutComplete page doesn't double-fire purchase events
            sessionStorage.setItem(`checkout_tracked_${sid}`, "true");
            trackPurchase(sid);
            trackLicenseKeyGenerated(sid);
            trackCloseConvertLead(sid);
          }
        },
      });

      if (destroyedRef.current) {
        checkout.destroy();
        return;
      }

      checkoutRef.current = checkout;
      if (mountRef.current) {
        checkout.mount(mountRef.current);
        setState("mounted");
      }
    } catch (error) {
      if (!destroyedRef.current) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        setState("error");
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    destroyedRef.current = false;
    initCheckout();

    return () => {
      destroyedRef.current = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [isOpen]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setState("loading");
      setErrorMessage("");
      sessionIdRef.current = "";
    }
  }, [isOpen]);

  const handleRetry = () => {
    checkoutRef.current?.destroy();
    checkoutRef.current = null;
    destroyedRef.current = false;
    initCheckout();
  };

  const innerProps = {
    state,
    errorMessage,
    mountRef,
    sessionId: sessionIdRef.current,
    onRetry: handleRetry,
    onClose,
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[90vh] border-lm-line bg-lm-cream">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Checkout</DrawerTitle>
            <DrawerDescription>Complete your purchase of Local Memory</DrawerDescription>
          </DrawerHeader>
          <CheckoutInner {...innerProps} />
          <DrawerFooter className="sr-only" />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-lm-line bg-lm-cream p-0 sm:max-w-[480px] [&>button]:hidden"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Checkout</SheetTitle>
          <SheetDescription>Complete your purchase of Local Memory</SheetDescription>
        </SheetHeader>
        <CheckoutInner {...innerProps} />
      </SheetContent>
    </Sheet>
  );
}

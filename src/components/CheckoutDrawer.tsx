import { useEffect, useRef, useState } from "react";
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import { Check, Copy, Download, AlertCircle, Lock } from "lucide-react";
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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Local Memory</h3>
            <p className="text-sm text-muted-foreground">$49 &middot; Lifetime license</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Loading */}
        {state === "loading" && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading checkout...</p>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 px-6">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="text-sm text-muted-foreground text-center">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
            <button onClick={onRetry} className="btn-primary text-sm px-6 py-2">
              Try again
            </button>
          </div>
        )}

        {/* Success */}
        {state === "success" && (
          <div className="flex flex-col items-center py-8 px-6 gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Payment successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">Your license key is ready.</p>
            </div>

            {/* License key */}
            <div className="w-full rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground mb-2">License Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono break-all">{licenseKey}</code>
                <button
                  onClick={copyLicenseKey}
                  className="shrink-0 rounded-md p-2 hover:bg-muted transition-colors"
                  title="Copy license key"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Download */}
            <a
              href={downloadUrls[platform]}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
              download
            >
              <Download className="h-4 w-4" />
              Download for {platformInfo.label}
            </a>

            <a
              href={`/checkout/complete?session_id=${sessionId}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all platforms &amp; setup guide
            </a>

            <button
              onClick={onClose}
              className="btn-secondary w-full text-sm"
            >
              Done
            </button>
          </div>
        )}

        {/* Stripe mount point — always in DOM, hidden when not mounted */}
        <div
          ref={mountRef}
          className={state === "mounted" ? "px-2 py-4" : "hidden"}
        />
      </div>

      {/* Trust footer — only show during checkout */}
      {(state === "loading" || state === "mounted") && (
        <div className="shrink-0 border-t border-border px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Secure checkout
            </span>
            <span>Powered by Stripe</span>
            <span>One-time purchase</span>
          </div>
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

  const initCheckout = async (destroyed: { current: boolean }) => {
    if (!stripePromise) {
      setErrorMessage("Stripe is not configured.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const stripe = await stripePromise;
      if (destroyed.current || !stripe) return;

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
            trackPurchase(sid);
            trackLicenseKeyGenerated(sid);
            trackCloseConvertLead(sid);
          }
        },
      });

      if (destroyed.current) {
        checkout.destroy();
        return;
      }

      checkoutRef.current = checkout;
      if (mountRef.current) {
        checkout.mount(mountRef.current);
        setState("mounted");
      }
    } catch (error) {
      if (!destroyed.current) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        setState("error");
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const destroyed = { current: false };
    initCheckout(destroyed);

    return () => {
      destroyed.current = true;
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
    const destroyed = { current: false };
    initCheckout(destroyed);
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
        <DrawerContent className="max-h-[90vh]">
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
        className="sm:max-w-lg w-full flex flex-col p-0"
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

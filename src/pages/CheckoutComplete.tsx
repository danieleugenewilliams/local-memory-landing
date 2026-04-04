import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, AlertCircle, Download, Copy, ChevronDown } from "lucide-react";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import AgentSetupPrompts from "@/components/v2/AgentSetupPrompts";
import { generateLicenseKey, generateAllDownloadUrls } from "@/lib/license";
import { detectUserPlatform, getPlatformInfo, getAllPlatforms, type Platform } from "@/lib/utils";
import { trackPurchase, trackLicenseKeyGenerated, trackCloseConvertLead, trackDownloadInitiated } from "@/lib/analytics";

type PageState = "checking" | "success" | "incomplete" | "error";

const CheckoutComplete = () => {
  const [searchParams] = useSearchParams();
  const [pageState, setPageState] = useState<PageState>("checking");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("macos-arm");
  const [showAlternatives, setShowAlternatives] = useState(false);

  const sessionId = searchParams.get("session_id") || "";
  const licenseKey = sessionId ? generateLicenseKey(sessionId) : "";
  const downloadUrls = generateAllDownloadUrls();

  useEffect(() => {
    setSelectedPlatform(detectUserPlatform());
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setPageState("error");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) throw new Error("Failed to check session status");
        const data = await res.json();

        if (data.status === "complete") {
          setPageState("success");
          const trackingKey = `checkout_tracked_${sessionId}`;
          if (!sessionStorage.getItem(trackingKey)) {
            sessionStorage.setItem(trackingKey, "true");
            trackPurchase(sessionId);
            trackLicenseKeyGenerated(sessionId);
            trackCloseConvertLead(sessionId);
          }
        } else if (data.status === "open") {
          setPageState("incomplete");
        } else {
          setPageState("error");
        }
      } catch {
        setPageState("error");
      }
    };

    checkStatus();
  }, [sessionId]);

  const copyLicenseKey = async () => {
    if (!licenseKey) return;
    try {
      await navigator.clipboard.writeText(licenseKey);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = licenseKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = async (platform: Platform = selectedPlatform) => {
    const downloadUrl = downloadUrls[platform];
    if (!downloadUrl) return;
    trackDownloadInitiated(platform, downloadUrl, sessionId);
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getPlatformInfo(platform).filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(downloadUrl, "_blank");
    }
  };

  const detectedInfo = getPlatformInfo(selectedPlatform);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Loading / Error / Incomplete states */}
      {pageState === "checking" && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[hsl(var(--brand-green))] border-t-transparent" />
            <h1 className="text-2xl font-bold">Verifying Payment...</h1>
            <p className="mt-2 text-muted-foreground">Please wait while we confirm your purchase.</p>
          </div>
        </div>
      )}

      {pageState === "incomplete" && (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-yellow-500" />
            <h1 className="mt-4 text-xl font-bold">Payment not completed</h1>
            <p className="mt-2 text-muted-foreground">
              It looks like your checkout session is still open. Please complete your payment or try again.
            </p>
            <Link to="/payment" className="btn-primary mt-6 inline-block">
              Go to pricing
            </Link>
          </div>
        </div>
      )}

      {pageState === "error" && (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
            <h1 className="mt-4 text-xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-muted-foreground">
              We couldn't verify your payment. If you completed a purchase, please contact support.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link to="/" className="btn-secondary">Home</Link>
              <Link to="/payment" className="btn-primary">Try again</Link>
            </div>
          </div>
        </div>
      )}

      {/* Success — full post-purchase experience */}
      {pageState === "success" && (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-border">
            <div className="absolute inset-0 grid-pattern grid-fade" />
            <div className="container-wide relative py-12 text-center md:py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--brand-green))]/10">
                <Check className="h-8 w-8 text-[hsl(var(--brand-green))]" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Payment Successful</h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Thank you for purchasing Local Memory.
              </p>
              <div className="mx-auto mt-4 max-w-md rounded-lg border border-[hsl(var(--brand-blue))]/30 bg-[hsl(var(--brand-blue))]/5 p-4">
                <p className="font-medium">Check your email</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We've sent your license key and download links to your email address.
                  <span className="block text-xs text-muted-foreground/70 mt-1">(Don't see it? Check your spam folder)</span>
                </p>
              </div>
            </div>
          </section>

          <div className="container-tight py-12">
            {/* License Key */}
            <div className="mb-8 rounded-xl border-2 border-[hsl(var(--brand-blue))]/30 bg-card p-6">
              <h2 className="mb-4 text-center text-lg font-semibold">Your License Key</h2>
              {licenseKey === "LM-ERROR-ERROR-ERROR-ERROR-ERROR" ? (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
                  <p className="mb-3 font-medium text-red-400">License key generation error</p>
                  <button onClick={() => window.location.reload()} className="btn-secondary text-sm">
                    Refresh Page
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    If this persists, contact support with session ID: {sessionId.slice(0, 12)}...
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-lg">
                      {licenseKey}
                    </code>
                    <button
                      onClick={copyLicenseKey}
                      className="flex h-12 w-24 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:bg-card/80"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-4 w-4 text-[hsl(var(--brand-green))]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p>Keep this key safe — it's unique to your purchase.</p>
                    <p>
                      Activate with: <code className="rounded bg-background px-2 py-0.5 font-mono text-xs">local-memory license activate {licenseKey} --accept-terms</code>
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Download */}
            <div className="mb-8 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-center text-lg font-semibold">Download</h2>

              {/* Detected Platform */}
              <div className="mb-6 rounded-lg border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-5">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="text-3xl">{detectedInfo.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{detectedInfo.label}</span>
                      <span className="rounded bg-[hsl(var(--brand-blue))]/10 px-2 py-0.5 text-xs text-[hsl(var(--brand-blue))]">
                        Detected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{detectedInfo.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(selectedPlatform)}
                  className="btn-primary mx-auto flex w-full max-w-xs items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download for {detectedInfo.label}
                </button>
                <p className="mt-3 text-center text-sm text-muted-foreground">~13MB</p>
              </div>

              {/* Other Platforms */}
              <div className="text-center">
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Need a different platform?
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAlternatives ? "rotate-180" : ""}`} />
                </button>

                {showAlternatives && (
                  <div className="mt-4 space-y-2">
                    {getAllPlatforms()
                      .filter((p) => p.platform !== selectedPlatform)
                      .map((info) => (
                        <div
                          key={info.platform}
                          className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{info.icon}</span>
                            <div className="text-left">
                              <p className="font-medium">{info.label}</p>
                              <p className="text-xs text-muted-foreground">{info.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(info.platform)}
                            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-card"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Start */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Quick Start</h2>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="mb-2 text-sm font-medium">1. Install (if you haven't already)</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">npm install -g local-memory-mcp</pre>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="mb-2 text-sm font-medium">2. Activate your license</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory license activate {licenseKey} --accept-terms</pre>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="mb-2 text-sm font-medium">3. Start the daemon</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory start</pre>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="mb-2 text-sm font-medium">4. Connect your AI agent</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">claude mcp add local-memory -- local-memory --mcp</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Need help?{" "}
                  <a href="https://discord.gg/rMmn8xP3fZ" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--brand-blue))] hover:underline">
                    Join Discord
                  </a>{" "}
                  or check the{" "}
                  <a href="/docs" className="text-[hsl(var(--brand-blue))] hover:underline">
                    documentation
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Agent Setup Prompts */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold">Agent-Assisted Installation</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Copy a prompt for your OS and paste it into your AI agent for guided installation.
              </p>
              <AgentSetupPrompts productKey={licenseKey} />
            </div>
          </div>
        </>
      )}

      <FooterNew />
    </div>
  );
};

export default CheckoutComplete;

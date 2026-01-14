import { Download, Copy, Check, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import AgentSetupPrompts from "@/components/v2/AgentSetupPrompts";
import CryptoJS from "crypto-js";
import { detectUserPlatform, getPlatformInfo, getAllPlatforms, type Platform } from "@/lib/utils";
import { trackPurchase, trackDownloadInitiated, trackLicenseKeyGenerated, trackCloseConvertLead } from "@/lib/analytics";

const SuccessNew = () => {
  const [searchParams] = useSearchParams();
  const [productKey, setProductKey] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("macos-arm");
  const [downloadUrls, setDownloadUrls] = useState<Record<Platform, string>>({} as Record<Platform, string>);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Generate GitHub releases download URL for platform-specific files
  const getGitHubDownloadUrl = (platform: Platform = "macos-arm"): string => {
    const baseUrl = "https://github.com/danieleugenewilliams/local-memory-releases/releases/latest/download/";
    const platformInfo = getPlatformInfo(platform);
    const filename = platformInfo.filename;
    return `${baseUrl}${filename}`;
  };

  // Generate GitHub download URLs for all platforms
  const generateAllDownloadUrls = useCallback((): Record<Platform, string> => {
    const urls: Record<Platform, string> = {} as Record<Platform, string>;
    const platforms: Platform[] = ["macos-arm", "macos-intel", "windows", "linux"];
    for (const platform of platforms) {
      urls[platform] = getGitHubDownloadUrl(platform);
    }
    return urls;
  }, []);

  // Client-side license key format validation
  const validateLicenseKeyFormat = (key: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (key.length !== 27) errors.push(`Invalid length: ${key.length} (expected 27)`);
    if (!key.startsWith("LM-")) errors.push('Must start with "LM-"');
    const segments = key.split("-");
    if (segments.length !== 6) {
      errors.push(`Invalid segment count: ${segments.length} (expected 6)`);
    } else {
      for (let i = 1; i < segments.length; i++) {
        if (segments[i].length !== 4) errors.push(`Segment ${i} has invalid length`);
      }
    }
    const validPattern = /^LM-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}-[A-Z2-469]{4}$/;
    if (!validPattern.test(key)) errors.push("Contains invalid characters");
    const forbiddenChars = key.match(/[01OI578]/g);
    if (forbiddenChars) errors.push(`Contains forbidden characters: ${forbiddenChars.join(", ")}`);
    return { valid: errors.length === 0, errors };
  };

  // Generate timestamp-less cryptographically secure product key
  const generateProductKey = useCallback((sessionId: string): string => {
    try {
      const DOWNLOAD_SECRET = import.meta.env.VITE_DOWNLOAD_SECRET;
      if (!sessionId) throw new Error("Session ID is required");
      if (!DOWNLOAD_SECRET) throw new Error("VITE_DOWNLOAD_SECRET not configured");
      if (DOWNLOAD_SECRET.length < 32) throw new Error("VITE_DOWNLOAD_SECRET must be at least 32 characters");

      const baseInput = `${sessionId}-${DOWNLOAD_SECRET}`;
      const baseHash = CryptoJS.SHA256(baseInput).toString();

      const sessionHash = baseHash.substring(0, 4);
      const verificationHash = baseHash.substring(4, 8);
      const integrityHash = baseHash.substring(8, 12);
      const extraHash = baseHash.substring(12, 16);
      const checksumSeed = baseHash.substring(16, 20);

      const checksumInput = `${sessionHash}${verificationHash}${integrityHash}${extraHash}${checksumSeed}`;
      const checksumHash = CryptoJS.SHA256(checksumInput).toString();
      const checksum = checksumHash.substring(0, 4);

      const rawKey = `LM-${sessionHash}-${verificationHash}-${integrityHash}-${extraHash}-${checksum}`.toUpperCase();

      const filtered = rawKey.replace(/[01OI578]/g, (match) => {
        const replacements: Record<string, string> = { "0": "A", "1": "B", O: "C", I: "D", "5": "E", "7": "F", "8": "G" };
        return replacements[match] || match;
      });

      const validation = validateLicenseKeyFormat(filtered);
      if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.join(", ")}`);

      return filtered;
    } catch (error) {
      console.error("License key generation failed:", error);
      return "LM-ERROR-ERROR-ERROR-ERROR-ERROR";
    }
  }, []);

  useEffect(() => {
    const detectedPlatform = detectUserPlatform();
    setSelectedPlatform(detectedPlatform);

    const verifyPaymentFlow = () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setIsVerifying(false);
        return;
      }

      const paymentInitiated = sessionStorage.getItem("payment_initiated");
      const storedTokenData = localStorage.getItem("payment_token");

      const isTestingScenario =
        import.meta.env.DEV && (sessionId.startsWith("cs_test_") || sessionId === "cs_test_demo123" || window.location.hostname === "localhost");

      if (!paymentInitiated || !storedTokenData) {
        if (isTestingScenario) {
          sessionStorage.setItem("payment_initiated", Date.now().toString());
          localStorage.setItem("payment_token", JSON.stringify({ timestamp: Date.now(), sessionId, testing: true }));
        } else {
          setIsVerifying(false);
          return;
        }
      }

      try {
        const tokenData = JSON.parse(localStorage.getItem("payment_token") || "{}");
        const currentTime = Date.now();
        const paymentTimestamp = tokenData.initiated || tokenData.timestamp;

        if (currentTime - tokenData.timestamp > 30 * 60 * 1000) {
          localStorage.removeItem("payment_token");
          sessionStorage.removeItem("payment_initiated");
          setIsVerifying(false);
          return;
        }

        if (currentTime - paymentTimestamp > 48 * 60 * 60 * 1000) {
          setIsVerifying(false);
          return;
        }

        const allDownloadUrls = generateAllDownloadUrls();
        const generatedKey = generateProductKey(sessionId);

        const keyValidation = validateLicenseKeyFormat(generatedKey);
        if (!keyValidation.valid) {
          setIsVerifying(false);
          return;
        }

        setIsVerified(true);
        setDownloadUrls(allDownloadUrls);
        setProductKey(generatedKey);

        trackPurchase(sessionId);
        trackCloseConvertLead(sessionId);
        trackLicenseKeyGenerated(sessionId);

        localStorage.removeItem("payment_token");
        sessionStorage.removeItem("payment_initiated");

        sessionStorage.setItem(
          "downloads_unlocked",
          JSON.stringify({
            sessionId,
            timestamp: currentTime,
            paymentTimestamp,
            productKey: generatedKey,
          })
        );
      } catch {
        localStorage.removeItem("payment_token");
        sessionStorage.removeItem("payment_initiated");
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };

    const unlockedDownloads = sessionStorage.getItem("downloads_unlocked");
    if (unlockedDownloads) {
      try {
        const unlocked = JSON.parse(unlockedDownloads);
        const currentTime = Date.now();

        if (currentTime - unlocked.timestamp < 60 * 60 * 1000) {
          if (currentTime - unlocked.paymentTimestamp < 48 * 60 * 60 * 1000) {
            setIsVerified(true);
            setDownloadUrls(unlocked.downloadUrls || generateAllDownloadUrls());
            if (unlocked.productKey && validateLicenseKeyFormat(unlocked.productKey).valid) {
              setProductKey(unlocked.productKey);
            } else {
              setProductKey(generateProductKey(unlocked.sessionId));
            }
            setIsVerifying(false);
            return;
          }
        }
        sessionStorage.removeItem("downloads_unlocked");
      } catch {
        sessionStorage.removeItem("downloads_unlocked");
      }
    }

    verifyPaymentFlow();
  }, [searchParams, generateAllDownloadUrls, generateProductKey]);

  const handleDownload = async (platform: Platform = selectedPlatform) => {
    const downloadUrl = downloadUrls[platform];
    if (!downloadUrl) {
      alert("Download link not available. Please refresh and try again.");
      return;
    }

    try {
      const platformInfo = getPlatformInfo(platform);
      const sessionId = searchParams.get("session_id") || "unknown";
      trackDownloadInitiated(platform, downloadUrl, sessionId);

      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = platformInfo.filename;
      downloadLink.target = "_blank";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch {
      alert("Download failed. Please contact support if this persists.");
    }
  };

  const handleCopyProductKey = async () => {
    try {
      await navigator.clipboard.writeText(productKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = productKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Redirect if not verified
  if (!isVerifying && !isVerified) {
    return <Navigate to="/payment" replace />;
  }

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[hsl(var(--brand-green))] border-t-transparent" />
            <h1 className="text-2xl font-bold">Verifying Payment...</h1>
            <p className="mt-2 text-muted-foreground">Please wait while we confirm your purchase.</p>
          </div>
        </div>
        <FooterNew />
      </div>
    );
  }

  const detectedInfo = getPlatformInfo(selectedPlatform);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

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
          {productKey === "LM-ERROR-ERROR-ERROR-ERROR-ERROR" ? (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
              <p className="mb-3 font-medium text-red-400">License key generation error</p>
              <button onClick={() => window.location.reload()} className="btn-secondary text-sm">
                Refresh Page
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                If this persists, contact support with session ID: {searchParams.get("session_id")?.slice(0, 12)}...
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <code className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-lg">
                  {productKey}
                </code>
                <button
                  onClick={handleCopyProductKey}
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
                  Activate with: <code className="rounded bg-background px-2 py-0.5 font-mono text-xs">local-memory license activate {productKey} --accept-terms</code>
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
                  .map((platformInfo) => (
                    <div
                      key={platformInfo.platform}
                      className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{platformInfo.icon}</span>
                        <div className="text-left">
                          <p className="font-medium">{platformInfo.label}</p>
                          <p className="text-xs text-muted-foreground">{platformInfo.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(platformInfo.platform)}
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
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory license activate {productKey} --accept-terms</pre>
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
          <AgentSetupPrompts productKey={productKey} />
        </div>
      </div>

      <FooterNew />
    </div>
  );
};

export default SuccessNew;

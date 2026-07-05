import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { generateLicenseKey, generateAllDownloadUrls } from "@/lib/license";
import { detectUserPlatform, getPlatformInfo, getAllPlatforms, type Platform } from "@/lib/utils";
import { getInstallPrompt, SETUP_OS_TABS, type SetupOS } from "@/content/setupPrompts";
import {
  trackPurchase,
  trackLicenseKeyGenerated,
  trackCloseConvertLead,
  trackDownloadInitiated,
} from "@/lib/analytics";

/* Checkout Complete — redesigned from Checkout Complete.dc.html (warm-paper).
   All payment verification, license generation, platform detection, download
   URLs, and analytics are preserved from the previous implementation; only the
   presentation changed. The design's stub download handlers are wired to the
   real download URLs + trackDownloadInitiated here. */

type PageState = "checking" | "success" | "incomplete" | "error";

const CONTAINER = "mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 box-border";
const LICENSE_ERROR_KEY = "LM-ERROR-ERROR-ERROR-ERROR-ERROR";

const copyWithFallback = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

const CheckoutComplete = () => {
  const [searchParams] = useSearchParams();
  const [pageState, setPageState] = useState<PageState>("checking");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("macos-arm");
  const [os, setOs] = useState<SetupOS>("macos");

  // Independent 2s "Copied ✓" flags per copy target.
  const [copied, setCopied] = useState({ key: false, activate: false, prompt: false, cmds: false });
  const flash = (field: keyof typeof copied) => {
    setCopied((c) => ({ ...c, [field]: true }));
    setTimeout(() => setCopied((c) => ({ ...c, [field]: false })), 2000);
  };

  const sessionId = searchParams.get("session_id") || "";
  const licenseKey = sessionId ? generateLicenseKey(sessionId) : "";
  const downloadUrls = generateAllDownloadUrls();
  const hasLicenseError = licenseKey === LICENSE_ERROR_KEY;

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

  const detectedInfo = getPlatformInfo(selectedPlatform);
  const otherPlatforms = getAllPlatforms().filter((p) => p.platform !== selectedPlatform);

  const activateCmd = `local-memory license activate ${licenseKey} --accept-terms`;
  const licenseShort = licenseKey ? licenseKey.split("-").slice(0, 2).join("-") + "-…" : "";
  const allCommands = [
    activateCmd,
    "local-memory start",
    "claude mcp add local-memory -- local-memory --mcp",
  ].join("\n");
  const promptContent = getInstallPrompt(os, licenseKey);

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Order complete — Local Memory</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteHeader
        cta={
          pageState === "success" ? (
            <span className="rounded-full border border-lm-line-2 px-3 py-1.5 font-plex text-[11px] font-medium uppercase tracking-[0.05em] text-lm-amber">
              Licensed ✓
            </span>
          ) : undefined
        }
      />

      {/* ---------- Checking ---------- */}
      {pageState === "checking" && (
        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <div>
            <div className="mx-auto mb-6 h-9 w-9 animate-spin rounded-full border-[3px] border-lm-line border-t-lm-amber" />
            <div className="mb-2 font-serif text-[30px] font-normal text-lm-ink">
              Verifying your payment…
            </div>
            <div className="font-plex text-[12.5px] text-lm-muted">
              This usually takes a second or two.
            </div>
          </div>
        </div>
      )}

      {/* ---------- Incomplete ---------- */}
      {pageState === "incomplete" && (
        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <div className="max-w-[440px]">
            <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              Session still open
            </div>
            <div className="mb-3.5 font-serif text-[34px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
              Payment not completed
            </div>
            <p className="mb-7 text-[15px] leading-[1.65] text-lm-stone">
              Your checkout session is still open. Nothing was charged — you can pick up where you
              left off.
            </p>
            <Link
              to="/pricing"
              className="inline-block rounded-lg bg-lm-ink px-[26px] py-[13px] text-[14px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              Return to checkout
            </Link>
          </div>
        </div>
      )}

      {/* ---------- Error ---------- */}
      {pageState === "error" && (
        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <div className="max-w-[460px]">
            <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-[#b91c1c]">
              Verification failed
            </div>
            <div className="mb-3.5 font-serif text-[34px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
              We couldn't verify your payment
            </div>
            <p className="mb-7 text-[15px] leading-[1.65] text-lm-stone">
              If you completed a purchase, your license key was still emailed to you. Otherwise,
              reach out on Discord and we'll sort it out.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/pricing"
                className="inline-block rounded-lg bg-lm-ink px-[26px] py-[13px] text-[14px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
              >
                Try again
              </Link>
              <a
                href="https://discord.gg/rMmn8xP3fZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-lm-line-2 px-[26px] py-[13px] text-[14px] font-medium text-lm-ink transition-colors hover:border-lm-amber hover:text-lm-amber"
              >
                Get help on Discord
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Success ---------- */}
      {pageState === "success" && (
        <main>
          {/* Hero: confirmation + license (left) · agent-assisted install (right) */}
          <div className="border-b border-lm-line">
            <div
              className={`${CONTAINER} grid items-start gap-16 pb-[60px] pt-[52px] lg:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0`}
            >
              {/* left: confirmation + license */}
              <div>
                <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                  ✓ Payment complete · order confirmed
                </div>
                <h1 className="mb-4 font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[44px]">
                  Your AI just got a <em className="italic text-lm-amber">memory.</em>
                </h1>
                <p className="mb-7 max-w-[44ch] text-[15.5px] leading-[1.65] text-lm-stone">
                  The fastest setup: copy the prompt on the right into Claude Code — or any coding
                  agent — and it installs, activates, and connects Local Memory for you.
                </p>

                {/* license key box */}
                {hasLicenseError ? (
                  <div className="rounded-xl border border-[#b91c1c]/40 bg-[#b91c1c]/5 p-5 text-center">
                    <p className="mb-3 font-medium text-[#b91c1c]">License key generation error</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="rounded-lg border border-lm-line-2 px-4 py-2 text-sm font-medium text-lm-ink transition-colors hover:border-lm-amber"
                    >
                      Refresh page
                    </button>
                    <p className="mt-3 font-plex text-[11px] text-lm-muted">
                      If this persists, contact support with session ID: {sessionId.slice(0, 12)}…
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-3.5 rounded-xl bg-lm-ink px-[22px] py-[18px]">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="font-plex text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#78716c]">
                          Your license key
                        </span>
                        <button
                          onClick={() => {
                            copyWithFallback(licenseKey);
                            flash("key");
                          }}
                          className={`rounded-md border border-lm-ink-soft px-3.5 py-1.5 font-plex text-[12px] font-medium transition-colors hover:border-lm-gold ${
                            copied.key ? "text-lm-green" : "text-[#b8ad99]"
                          }`}
                        >
                          {copied.key ? "Copied ✓" : "Copy"}
                        </button>
                      </div>
                      <div className="mb-3.5 break-all font-plex text-[16px] font-medium tracking-[0.04em] text-lm-gold">
                        {licenseKey}
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-lm-ink-soft pt-3">
                        <span className="min-w-0 truncate font-plex text-[11.5px] text-[#78716c]">
                          <span className="text-lm-amber">$</span> local-memory license activate{" "}
                          {licenseShort} --accept-terms
                        </span>
                        <button
                          onClick={() => {
                            copyWithFallback(activateCmd);
                            flash("activate");
                          }}
                          className={`shrink-0 font-plex text-[11px] font-medium transition-colors hover:text-lm-gold ${
                            copied.activate ? "text-lm-green" : "text-[#78716c]"
                          }`}
                        >
                          {copied.activate ? "Copied ✓" : "Copy command"}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-plex text-xs text-lm-muted">
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-lm-amber" />
                      Key + download links also sent to your email · check spam if missing
                    </div>
                  </>
                )}
              </div>

              {/* right: agent-assisted install */}
              <div className="overflow-hidden rounded-2xl bg-lm-ink shadow-[0_24px_48px_-20px_rgba(31,27,22,0.35)]">
                <div className="flex items-center justify-between gap-3 border-b border-lm-ink-soft px-[22px] py-[15px]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-lm-gold px-2 py-0.5 font-plex text-[10px] font-medium tracking-[0.05em] text-lm-ink-deep">
                      RECOMMENDED
                    </span>
                    <span className="font-serif text-[15px] font-medium text-[#f3ead9]">
                      Agent-assisted install
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      copyWithFallback(promptContent);
                      flash("prompt");
                    }}
                    className={`rounded-md px-5 py-[9px] text-[12.5px] font-semibold text-lm-ink-deep transition-colors hover:bg-lm-gold-2 ${
                      copied.prompt ? "bg-lm-green" : "bg-lm-gold"
                    }`}
                  >
                    {copied.prompt ? "Copied ✓" : "Copy prompt"}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-lm-ink-soft px-[22px] py-3">
                  <div className="inline-flex overflow-hidden rounded-md border border-lm-ink-soft">
                    {SETUP_OS_TABS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setOs(t.id);
                          setCopied((c) => ({ ...c, prompt: false }));
                        }}
                        className={`border-r border-lm-ink-soft px-4 py-[7px] font-plex text-[11.5px] font-medium transition-colors last:border-r-0 ${
                          os === t.id ? "bg-lm-gold text-lm-ink-deep" : "text-[#78716c] hover:text-[#b8ad99]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <span className="hidden font-plex text-[11px] text-[#78716c] sm:inline">
                    license key embedded ✓
                  </span>
                </div>
                <pre className="m-0 h-[296px] overflow-auto whitespace-pre-wrap px-[22px] py-5 font-plex text-[11.5px] leading-[1.7] text-[#b8ad99]">
                  {promptContent}
                </pre>
                <div className="flex items-center gap-2.5 border-t border-lm-ink-soft px-[22px] py-3 font-plex text-[11.5px] text-[#78716c]">
                  <span className="text-lm-gold">→</span> Paste into Claude Code, Cursor, Windsurf… it
                  checks existing installs, downloads, activates &amp; wires up MCP.
                </div>
              </div>
            </div>
          </div>

          {/* Manual path */}
          <div className={`${CONTAINER} pb-[88px] pt-14`}>
            <div className="mb-11 flex flex-wrap items-baseline gap-4 border-b border-lm-line pb-5">
              <h2 className="font-serif text-[26px] font-normal tracking-[-0.02em] text-lm-ink">
                Prefer to install it yourself?
              </h2>
              <span className="font-plex text-xs text-lm-muted">two steps · ~2 minutes</span>
            </div>

            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start [&>*]:min-w-0">
              {/* download */}
              <div>
                <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                  Manual · Step 1
                </div>
                <h3 className="mb-[22px] font-serif text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-lm-ink">
                  Get the binary
                </h3>

                <div className="mb-3 rounded-xl border border-lm-amber bg-lm-sand-2 px-6 py-[22px]">
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="font-serif text-[17px] font-medium text-lm-ink">
                      {detectedInfo.label}
                    </span>
                    <span className="rounded-full bg-lm-amber px-2 py-[3px] font-plex text-[10px] font-medium tracking-[0.05em] text-lm-cream">
                      DETECTED
                    </span>
                  </div>
                  <div className="mb-[18px] font-plex text-xs text-lm-muted">
                    {detectedInfo.description} · ~13 MB
                  </div>
                  <a
                    href={downloadUrls[selectedPlatform]}
                    download={detectedInfo.filename}
                    onClick={() =>
                      trackDownloadInitiated(selectedPlatform, downloadUrls[selectedPlatform], sessionId)
                    }
                    className="block rounded-lg bg-lm-ink py-[13px] text-center text-[14px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
                  >
                    Download for {detectedInfo.label} ↓
                  </a>
                </div>

                {otherPlatforms.map((pl) => (
                  <div
                    key={pl.platform}
                    className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-lm-line px-[18px] py-[13px]"
                  >
                    <div className="min-w-0">
                      <span className="text-[13.5px] font-medium text-lm-ink">{pl.label}</span>
                      <span className="ml-2.5 font-plex text-[11.5px] text-lm-muted">{pl.description}</span>
                    </div>
                    <a
                      href={downloadUrls[pl.platform]}
                      download={pl.filename}
                      onClick={() =>
                        trackDownloadInitiated(pl.platform, downloadUrls[pl.platform], sessionId)
                      }
                      className="shrink-0 rounded-md border border-lm-line-2 px-3.5 py-1.5 font-plex text-[12px] font-medium text-lm-stone transition-colors hover:border-lm-amber hover:text-lm-amber"
                    >
                      Download ↓
                    </a>
                  </div>
                ))}

                <div className="mt-3.5 font-plex text-[11.5px] text-lm-muted">
                  Prefer npm? <span className="text-lm-stone">npm install -g local-memory-mcp</span>
                </div>
              </div>

              {/* quick start terminal */}
              <div>
                <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                  Manual · Step 2
                </div>
                <h3 className="mb-[22px] font-serif text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-lm-ink">
                  Activate &amp; connect
                </h3>

                <div className="overflow-hidden rounded-xl bg-lm-ink shadow-[0_24px_48px_-20px_rgba(31,27,22,0.35)]">
                  <div className="flex items-center justify-between border-b border-lm-ink-soft px-5 py-3.5">
                    <span className="font-plex text-xs text-[#78716c]">terminal</span>
                    <button
                      onClick={() => {
                        copyWithFallback(allCommands);
                        flash("cmds");
                      }}
                      className={`rounded-md border border-lm-ink-soft px-3.5 py-1.5 font-plex text-[12px] font-medium transition-colors hover:border-lm-gold ${
                        copied.cmds ? "text-lm-green" : "text-[#b8ad99]"
                      }`}
                    >
                      {copied.cmds ? "Copied ✓" : "Copy all"}
                    </button>
                  </div>
                  <div className="px-6 py-[22px] font-plex text-[12.5px] leading-[1.8] text-[#b8ad99]">
                    <div className="text-[#78716c]"># 1 · activate your license</div>
                    <div className="mb-3.5 break-all">
                      <span className="text-lm-amber">$</span> local-memory license activate {licenseKey}{" "}
                      --accept-terms
                    </div>
                    <div className="text-[#78716c]"># 2 · start the daemon</div>
                    <div className="mb-3.5">
                      <span className="text-lm-amber">$</span> local-memory start
                    </div>
                    <div className="text-[#78716c]"># 3 · connect your agent</div>
                    <div>
                      <span className="text-lm-amber">$</span> claude mcp add local-memory -- local-memory
                      --mcp
                    </div>
                    <div className="mt-3.5 text-lm-green">
                      ✓ 24 MCP tools available · memory persists across sessions
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 font-plex text-xs text-lm-muted">
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-lm-amber" />
                  Stuck?{" "}
                  <Link to="/docs" className="text-lm-stone hover:text-lm-amber">
                    Read the docs
                  </Link>{" "}
                  or{" "}
                  <a
                    href="https://discord.gg/rMmn8xP3fZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lm-stone hover:text-lm-amber"
                  >
                    join Discord
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* After install → Agent Setup */}
          <div className="border-t border-lm-line bg-lm-ink text-[#f3ead9]">
            <div
              className={`${CONTAINER} flex flex-wrap items-center justify-between gap-8 py-12`}
            >
              <div>
                <div className="mb-3 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-gold">
                  After install
                </div>
                <div className="mb-1.5 font-serif text-[24px] font-normal">
                  Teach your agents to remember.
                </div>
                <div className="font-plex text-[13px] text-[#78716c]">
                  Skills, CLAUDE.md blocks, system prompts, and automation recipes — copy the artifact
                  that fits your agent.
                </div>
              </div>
              <Link
                to="/agent-setup"
                className="shrink-0 rounded-lg bg-lm-gold px-7 py-3.5 text-[15px] font-semibold text-lm-ink-deep transition-colors hover:bg-lm-gold-2"
              >
                Agent Setup →
              </Link>
            </div>
          </div>
        </main>
      )}

      <SiteFooter minimal />
      <ScrollToTop />
    </div>
  );
};

export default CheckoutComplete;

import { Link } from "react-router-dom";

const GITHUB_URL = "https://github.com/danieleugenewilliams/local-memory-releases";
const DISCORD_URL = "https://discord.gg/rMmn8xP3fZ";

const linkClass = "text-lm-stone-2 transition-colors hover:text-lm-ink";

interface SiteFooterProps {
  /** Inner pages use a slim single-line footer; the landing uses the full one. */
  minimal?: boolean;
  /** Optional right-side note on the minimal footer. */
  note?: React.ReactNode;
}

const SiteFooter = ({ minimal = false, note }: SiteFooterProps) => {
  if (minimal) {
    return (
      <footer className="border-t border-lm-line bg-lm-cream">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-10 font-plex text-xs text-lm-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>© {new Date().getFullYear()} Local Memory. All rights reserved.</span>
          <span>{note ?? "100% local · no telemetry"}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-lm-line bg-lm-cream">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-14 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src="/lm-logo.png" alt="Local Memory" className="h-6 w-6 rounded" />
              <span className="font-serif text-sm font-semibold text-lm-ink">Local Memory</span>
            </div>
            <p className="mb-3.5 max-w-[34ch] text-sm leading-relaxed text-lm-stone-2">
              Persistent memory for AI agents. Your data stays local, your context persists forever.
            </p>
            <p className="font-plex text-xs text-lm-muted">Built by D.E. Williams &amp; Co.</p>
          </div>

          {/* Product */}
          <div>
            <div className="mb-3.5 font-plex text-xs font-medium uppercase tracking-[0.06em] text-lm-ink">
              Product
            </div>
            <nav className="flex flex-col gap-2.5 text-[13.5px]">
              <Link to="/architecture" className={linkClass}>
                Architecture
              </Link>
              <Link to="/docs" className={linkClass}>
                Documentation
              </Link>
              <Link to="/agent-setup" className={linkClass}>
                Agent Setup
              </Link>
              <Link to="/pricing" className={linkClass}>
                Pricing
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </nav>
          </div>

          {/* Company */}
          <div>
            <div className="mb-3.5 font-plex text-xs font-medium uppercase tracking-[0.06em] text-lm-ink">
              Company
            </div>
            <nav className="flex flex-col gap-2.5 text-[13.5px]">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Community
              </a>
              <Link to="/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link to="/terms" className={linkClass}>
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-11 flex flex-col gap-2 border-t border-lm-line pt-6 font-plex text-xs text-lm-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Local Memory. All rights reserved.</span>
          <span>100% local · no telemetry</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

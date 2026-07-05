import { Link, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

/**
 * Redesign site header (warm-paper theme).
 * Used by the redesigned pages only, so legacy pages keep HeaderNew intact
 * until each page is converted.
 */
const DISCORD_URL = "https://discord.gg/rMmn8xP3fZ";

interface NavItem {
  label: string;
  href: string;
  /** External links open in a new tab and render as <a> instead of <Link>. */
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Architecture", href: "/architecture" },
  { label: "Docs", href: "/docs" },
  { label: "Agent Setup", href: "/agent-setup" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Community", href: DISCORD_URL, external: true },
];

const CTA_LABEL = "Get Started — $49";

interface SiteHeaderProps {
  /**
   * Replaces the "Get Started" CTA. Used by the post-purchase page, which
   * shouldn't invite a repeat checkout — it shows a "Licensed" status pill.
   */
  cta?: React.ReactNode;
}

const SiteHeader = ({ cta }: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openCheckout } = useCheckout();

  const handleNavClick = useCallback(
    (path: string) => {
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    },
    [location.pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-lm-line bg-lm-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          onClick={() => handleNavClick("/")}
        >
          <img src="/lm-logo.png" alt="Local Memory" className="h-[26px] w-[26px] rounded-md" />
          <span className="font-serif text-[15px] font-semibold tracking-[-0.01em] text-lm-ink">
            Local Memory
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 font-plex text-[12.5px] font-medium text-lm-stone-2 md:flex">
          {NAV_ITEMS.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-lm-ink"
                >
                  {item.label}
                </a>
              );
            }
            const active =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={
                  active
                    ? "border-b-2 border-lm-amber pb-0.5 text-lm-ink"
                    : "transition-colors hover:text-lm-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}
          {cta ?? (
            <button
              onClick={openCheckout}
              className="rounded-md bg-lm-ink px-[18px] py-[9px] text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              {CTA_LABEL}
            </button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-lm-line text-lm-ink md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-lm-line bg-lm-cream md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4 font-plex text-[13px] text-lm-stone-2">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 transition-colors hover:bg-lm-sand-2 hover:text-lm-ink"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="rounded-lg px-3 py-3 transition-colors hover:bg-lm-sand-2 hover:text-lm-ink"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-2 px-1">
              {cta ?? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCheckout();
                  }}
                  className="w-full rounded-md bg-lm-ink px-4 py-3 text-center text-lm-cream transition-colors hover:bg-lm-ink-soft"
                >
                  {CTA_LABEL}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;

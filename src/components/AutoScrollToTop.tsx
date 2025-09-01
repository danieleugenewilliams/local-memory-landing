import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollToTop = () => {
  const location = useLocation();
  const prevPathname = useRef<string>("");
  const scrollTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const rafRef = useRef<number | null>(null);

  // Enhanced scroll to top with multiple approaches
  const forceScrollToTop = () => {
    // Method 1: Immediate scroll attempts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Method 2: Force with requestAnimationFrame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  // Scroll to hash anchor with multiple attempts
  const scrollToHash = (hash: string) => {
    const elementId = hash.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If element not found immediately, try again after a delay
      const timeout = setTimeout(() => {
        const delayedElement = document.getElementById(elementId);
        if (delayedElement) {
          delayedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      scrollTimeoutRefs.current.push(timeout);
    }
  };

  useEffect(() => {
    // Clear any existing timeouts and RAF
    scrollTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    scrollTimeoutRefs.current = [];
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Ensure scroll restoration is disabled
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Skip auto-scroll for Index page to preserve its custom behavior
    if (location.pathname === "/") {
      prevPathname.current = location.pathname;
      return;
    }

    // Check if there's a hash fragment in the URL
    if (location.hash) {
      // Scroll to the hash anchor after a brief delay to ensure the page has rendered
      const timeout = setTimeout(() => {
        scrollToHash(location.hash);
      }, 100);
      scrollTimeoutRefs.current.push(timeout);
      
      // Update previous pathname for next navigation
      prevPathname.current = location.pathname;
      return;
    }
    
    // Auto-scroll to top for all non-Index pages with aggressive intervention
    const comingFromHome = prevPathname.current === "/";
    
    if (comingFromHome) {
      // Aggressive multi-stage scroll intervention for Index page transitions
      forceScrollToTop();
      
      // Multiple backup scrolls with increasing delays to override any animations
      const delays = [10, 50, 100, 200, 300];
      delays.forEach(delay => {
        const timeout = setTimeout(() => {
          forceScrollToTop();
        }, delay);
        scrollTimeoutRefs.current.push(timeout);
      });
      
    } else {
      // Coming from other pages - still use aggressive approach for tablet reliability
      forceScrollToTop();
      
      // Single backup scroll for non-Index transitions
      const timeout = setTimeout(() => {
        forceScrollToTop();
      }, 50);
      scrollTimeoutRefs.current.push(timeout);
    }

    // Update previous pathname for next navigation
    prevPathname.current = location.pathname;

    // Cleanup function
    return () => {
      scrollTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      scrollTimeoutRefs.current = [];
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [location.pathname]);

  return null;
};

export default AutoScrollToTop;
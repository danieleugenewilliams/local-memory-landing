import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollToTop = () => {
  const location = useLocation();
  const prevPathname = useRef<string>("");
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only auto-scroll for Features and Docs pages
    if (location.pathname === "/features" || location.pathname === "/docs") {
      const comingFromHome = prevPathname.current === "/";
      
      if (comingFromHome) {
        // Home page has a 1.5s animation that starts after 200ms delay
        // We need to wait for it to complete, then smoothly scroll to top
        const totalWaitTime = 1800; // 200ms delay + 1500ms animation + 100ms buffer
        
        // Immediate scroll attempt to interrupt the animation
        window.scrollTo(0, 0);
        
        // Set up aggressive scrolling every 100ms to override the Home animation
        scrollIntervalRef.current = setInterval(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
          });
        }, 100);
        
        // Final cleanup and smooth scroll after Home animation completes
        setTimeout(() => {
          if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
          }
          
          // Final smooth scroll to top
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }, totalWaitTime);
        
      } else {
        // Coming from other pages - smooth scroll immediately
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }

      // Update previous pathname for next navigation
      prevPathname.current = location.pathname;

      // Cleanup function
      return () => {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      };
    } else {
      // Update previous pathname for non-Features/Docs pages
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  return null;
};

export default AutoScrollToTop;
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Demo from "@/components/Demo";
import WhyLocalMemory from "@/components/WhyLocalMemory";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollToHero = () => {
      // Enhanced desktop detection - exclude tablets/iPads
      const isDesktop = window.innerWidth >= 1200 && 
                       window.innerHeight >= 600 && 
                       !('ontouchstart' in window) && 
                       !navigator.userAgent.match(/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i);
      
      if (isDesktop && heroRef.current) {
        // Small delay to ensure page is fully rendered
        scrollTimeoutRef.current = setTimeout(() => {
          if (heroRef.current) {
            const heroRect = heroRef.current.getBoundingClientRect();
            const heroCenter = heroRect.top + window.pageYOffset + heroRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const targetScrollTop = heroCenter - viewportCenter;
            
            // Custom smooth scroll with longer duration
            const startScrollTop = window.pageYOffset;
            const scrollDistance = targetScrollTop - startScrollTop - 20; // Account for header height
            const duration = 1500; // 1.5 seconds for slower, smoother scroll
            const startTime = performance.now();
            
            const easeInOutCubic = (t: number) => {
              return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };
            
            const animateScroll = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeInOutCubic(progress);
              
              window.scrollTo(0, startScrollTop + scrollDistance * easedProgress);
              
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animateScroll);
              } else {
                animationRef.current = null;
              }
            };
            
            animationRef.current = requestAnimationFrame(animateScroll);
          }
        }, 200);
      }
    };

    scrollToHero();
    
    // Cleanup function to stop animations when component unmounts or navigating away
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero ref={heroRef} />
      <ProblemSolution />
      <Demo />
      <WhyLocalMemory />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;

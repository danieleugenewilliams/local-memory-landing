import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Demo from "@/components/Demo";
import WhyLocalMemory from "@/components/WhyLocalMemory";
import Footer from "@/components/Footer";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollToHero = () => {
      // Only scroll on desktop (screen width >= 1024px)
      if (window.innerWidth >= 1024 && heroRef.current) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          if (heroRef.current) {
            const heroRect = heroRef.current.getBoundingClientRect();
            const heroCenter = heroRect.top + window.pageYOffset + heroRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const targetScrollTop = heroCenter - viewportCenter;
            
            // Custom smooth scroll with longer duration
            const startScrollTop = window.pageYOffset;
            const scrollDistance = targetScrollTop - startScrollTop;
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
                requestAnimationFrame(animateScroll);
              }
            };
            
            requestAnimationFrame(animateScroll);
          }
        }, 200);
      }
    };

    scrollToHero();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero ref={heroRef} />
      <ProblemSolution />
      <Demo />
      <WhyLocalMemory />
      <Footer />
    </div>
  );
};

export default Index;

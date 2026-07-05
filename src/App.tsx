import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import IndexNew from "./pages/IndexNew";
import Landing from "./pages/Landing";
import Architecture from "./pages/site/Architecture";
import Docs from "./pages/site/Docs";
import AgentSetup from "./pages/site/AgentSetup";
import Pricing from "./pages/site/Pricing";
import NotFound from "./pages/NotFound";
import SuccessNew from "./pages/SuccessNew";
import PrivacyNew from "./pages/PrivacyNew";
import TermsNew from "./pages/TermsNew";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CheckoutComplete from "./pages/CheckoutComplete";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import AutoScrollToTop from "./components/AutoScrollToTop";
import DynamicPageTitle from "./components/DynamicPageTitle";
import { useEffect } from "react";
import { detectAndTrackFunnelStage } from "./lib/analytics";

const queryClient = new QueryClient();

// Disable browser scroll restoration globally
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Analytics tracking wrapper component
const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view and funnel stage on route changes
    detectAndTrackFunnelStage();
  }, [location]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <CheckoutProvider>
          <AnalyticsTracker />
          <DynamicPageTitle />
          <AutoScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Navigate to="/docs" replace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<Navigate to="/pricing" replace />} />
            <Route path="/success" element={<SuccessNew />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/agent-setup" element={<AgentSetup />} />
            <Route path="/prompts" element={<Navigate to="/agent-setup" replace />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/privacy" element={<PrivacyNew />} />
            <Route path="/terms" element={<TermsNew />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/checkout/complete" element={<CheckoutComplete />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </CheckoutProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

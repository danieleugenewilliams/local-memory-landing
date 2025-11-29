import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import IndexNew from "./pages/IndexNew";
import FeaturesNew from "./pages/FeaturesNew";
import NotFound from "./pages/NotFound";
import PaymentNew from "./pages/PaymentNew";
import Success from "./pages/Success";
import DocsNew from "./pages/DocsNew";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Prompts from "./pages/Prompts";
import ArchitectureNew from "./pages/ArchitectureNew";
import AutoScrollToTop from "./components/AutoScrollToTop";
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
          <AnalyticsTracker />
          <AutoScrollToTop />
          <Routes>
            <Route path="/" element={<IndexNew />} />
            <Route path="/features" element={<FeaturesNew />} />
            <Route path="/payment" element={<PaymentNew />} />
            <Route path="/success" element={<Success />} />
            <Route path="/docs" element={<DocsNew />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/architecture" element={<ArchitectureNew />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

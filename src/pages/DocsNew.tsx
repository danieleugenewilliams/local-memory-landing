import React from "react";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import DocumentationHub from "@/components/documentation/DocumentationHub";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import { trackCTAClick } from "@/lib/analytics";

const DocsNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative py-16 text-center md:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Complete guide to installation, configuration, and usage.
          </p>
        </div>
      </section>

      {/* Documentation Hub */}
      <section className="py-16">
        <DocumentationHub />
      </section>

      {/* Agent Setup Section */}
      <section id="agent-setup" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-8 text-left">
            <div className="mb-4 flex items-left justify-left gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Agent Setup Prompts</h2>
              <span className="rounded-full bg-orange-500/20 px-3 py-2 text-sm font-medium text-orange-500">Recommended Method</span>
            </div>
            <p className="max-w-3xl text-lg justify-left text-gray-300">
              Prefer having your AI agent handle the setup? After downloading <em>Local Memory</em>, copy our detailed prompts
              and let your AI assistant handle the complete installation and configuration.
            </p>
          </div>

          <PostPurchaseAgentSetup />
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default DocsNew;
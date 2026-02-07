import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
}

const routeMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Local Memory — Long-Term Memory Infrastructure for AI Agents',
    description: 'Private, persistent memory for AI agents. Knowledge that evolves from observations to insights. Local embeddings, multi-provider reasoning, semantic search. Fast, ships as a single binary. Works with Claude, GPT, Ollama, and OpenAI-compatible platforms.',
    keywords: 'AI context amnesia, persistent AI memory, AI intelligence building, context engineering, MCP integration, Claude Desktop memory, AI agent memory, cross-session learning, developer productivity, AI memory system, Model Context Protocol, vector search, token optimization'
  },
  '/features': {
    title: 'Features - Local Memory | 8 Unified MCP Tools & Persistent AI Memory',
    description: 'Discover Local Memory features: 8 unified MCP tools, persistent AI memory, lightning-fast vector search, AI-powered categorization, token optimization, and 100% local operation.',
    keywords: 'Local Memory features, MCP tools, persistent AI memory, vector search, AI categorization, token optimization, context engineering, AI memory system'
  },
  '/payment': {
    title: 'Purchase Local Memory | One-Time Payment, Lifetime AI Memory Solution',
    description: 'Get Local Memory with secure one-time payment. Transform AI context amnesia into permanent intelligence with 8 unified MCP tools and lifetime value.',
    keywords: 'Local Memory purchase, buy Local Memory, AI memory payment, MCP tools payment, one-time purchase, lifetime AI intelligence'
  },
  '/success': {
    title: 'Purchase Successful - Local Memory | Welcome to Permanent AI Intelligence',
    description: 'Thank you for purchasing Local Memory! Start building permanent AI intelligence and cure AI context amnesia with your new memory system.',
    keywords: 'Local Memory success, purchase complete, AI memory setup, MCP tools activation, permanent AI intelligence'
  },
  '/docs': {
    title: 'Documentation - Local Memory | Complete MCP Integration Guide',
    description: 'Complete Local Memory documentation: installation, MCP integration, API reference, configuration, and advanced usage patterns for persistent AI memory.',
    keywords: 'Local Memory docs, documentation, MCP integration guide, AI memory setup, API reference, configuration guide'
  },
  '/prompts': {
    title: 'Prompts - Local Memory | Context Engineering & AI Memory Prompts',
    description: 'Optimal prompts for Local Memory and context engineering. Learn how to build permanent AI intelligence with effective memory management strategies.',
    keywords: 'Local Memory prompts, context engineering, AI memory prompts, MCP prompts, effective AI communication, memory management prompts'
  },
  '/architecture': {
    title: 'Architecture - Local Memory | System Design & Technical Overview',
    description: 'Local Memory architecture overview: system design, technical specifications, MCP protocol integration, vector database, and performance optimization.',
    keywords: 'Local Memory architecture, system design, technical overview, MCP protocol, vector database, performance optimization'
  },
  '/privacy': {
    title: 'Privacy Policy - Local Memory | 100% Local & Private AI Memory',
    description: 'Local Memory privacy policy: 100% local operation, no data sharing, complete privacy, and secure AI memory management on your machine.',
    keywords: 'Local Memory privacy, privacy policy, data protection, local AI memory, private AI intelligence, secure memory system'
  },
  '/terms': {
    title: 'Terms of Service - Local Memory | License Agreement & Terms',
    description: 'Local Memory terms of service: license agreement, usage terms, warranty, and legal terms for the persistent AI memory system.',
    keywords: 'Local Memory terms, terms of service, license agreement, legal terms, AI memory license, usage terms'
  }
};

const DynamicPageTitle = () => {
  const location = useLocation();
  const metadata = routeMetadata[location.pathname] || routeMetadata['/'];

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords && <meta name="keywords" content={metadata.keywords} />}
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://localmemory.co${location.pathname}`} />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
    </Helmet>
  );
};

export default DynamicPageTitle;
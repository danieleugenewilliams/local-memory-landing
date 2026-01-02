import React, { useState, useEffect } from 'react';
import { Search, Book, ArrowRight, ExternalLink } from 'lucide-react';
import NavigationSidebar from './NavigationSidebar';
import MobileNavigation from './MobileNavigation';
import MarkdownRenderer from './MarkdownRenderer';
import { documentationConfig, navigationItems } from '@/content/documentation';
import { trackCTAClick } from '@/lib/analytics';

interface DocumentationHubProps {
  className?: string;
}

const DocumentationHub: React.FC<DocumentationHubProps> = ({ className = "" }) => {
  const [currentSection, setCurrentSection] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Handle section changes and scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let currentActive = '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentActive = section.getAttribute('data-section') || '';
        }
      });

      if (currentActive && currentActive !== currentSection) {
        setCurrentSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // Simple search implementation
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = documentationConfig.sections
      .flatMap(section => [
        {
          id: section.id,
          title: section.title,
          section: section.title,
          content: section.content.substring(0, 200) + '...',
          href: `#${section.id}`,
          relevance: section.content.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
        }
      ])
      .filter(result => result.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    setSearchResults(results.slice(0, 5));
  };

  const currentSectionData = documentationConfig.sections.find(
    section => section.id === currentSection
  );

  return (
    <div className={`documentation-hub ${className}`}>
      {/* Mobile Navigation */}
      <MobileNavigation
        navigation={navigationItems}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Search Bar */}
      <div className="container-wide mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-[hsl(var(--brand-blue))] transition-colors"
            />
          </div>

          {/* Search Results */}
          {showSearch && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg z-50">
              {searchResults.map((result) => (
                <a
                  key={result.id}
                  href={result.href}
                  className="block p-4 hover:bg-card/50 border-b border-border last:border-b-0 last:rounded-b-xl first:rounded-t-xl"
                  onClick={() => {
                    setShowSearch(false);
                    setCurrentSection(result.id);
                    trackCTAClick('docs', 'Search Result', result.href);
                  }}
                >
                  <div className="font-medium text-foreground">{result.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{result.content}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-wide">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <NavigationSidebar
              navigation={navigationItems}
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />
          </div>

          {/* Main Content */}
          <div className="min-w-0">
            {/* Quick Start Section */}
            <section data-section="quick-start" className="scroll-target mb-16">
              <div className="rounded-xl border border-border bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-[hsl(var(--brand-green))]/5 p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="h-8 w-8 text-[hsl(var(--brand-blue))]" />
                  <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  Complete guide to installing, configuring, and using Local Memory for intelligent information storage and retrieval.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-card/30 p-4">
                    <h3 className="font-semibold mb-2">New to Local Memory?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start with our getting started guide to install and set up Local Memory.
                    </p>
                    <button
                      onClick={() => {
                        setCurrentSection('getting-started');
                        document.getElementById('getting-started')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--brand-blue))] hover:text-[hsl(var(--brand-blue))]/80"
                    >
                      Getting Started <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="rounded-lg border border-border bg-card/30 p-4">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join our Discord community for support and discussion.
                    </p>
                    <a
                      href="https://discord.gg/rMmn8xP3fZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--brand-green))] hover:text-[hsl(var(--brand-green))]/80"
                      onClick={() => trackCTAClick('docs-hub', 'Discord', 'https://discord.gg/rMmn8xP3fZ')}
                    >
                      Join Discord <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Installation */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--brand-blue))]">Quick Installation</h2>

                <div className="grid gap-4">
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">1</span>
                      <h3 className="text-lg font-semibold">Install Local Memory</h3>
                    </div>
                    <div className="terminal">
                      <div className="terminal-header">
                        <div className="flex gap-2">
                          <div className="terminal-dot terminal-dot-red" />
                          <div className="terminal-dot terminal-dot-yellow" />
                          <div className="terminal-dot terminal-dot-green" />
                        </div>
                      </div>
                      <div className="terminal-body">
                        <pre className="text-sm text-[hsl(var(--terminal-green))]">npm install -g local-memory-mcp</pre>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">2</span>
                      <h3 className="text-lg font-semibold">Activate License & Start</h3>
                    </div>
                    <div className="terminal">
                      <div className="terminal-header">
                        <div className="flex gap-2">
                          <div className="terminal-dot terminal-dot-red" />
                          <div className="terminal-dot terminal-dot-yellow" />
                          <div className="terminal-dot terminal-dot-green" />
                        </div>
                      </div>
                      <div className="terminal-body">
                        <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory license activate LM-XXXX-XXXX-XXXX --accept-terms
local-memory start</pre>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">3</span>
                      <h3 className="text-lg font-semibold">Connect Your Agent</h3>
                    </div>
                    <div className="terminal">
                      <div className="terminal-header">
                        <div className="flex gap-2">
                          <div className="terminal-dot terminal-dot-red" />
                          <div className="terminal-dot terminal-dot-yellow" />
                          <div className="terminal-dot terminal-dot-green" />
                        </div>
                      </div>
                      <div className="terminal-body">
                        <pre className="text-sm text-[hsl(var(--terminal-green))]">claude mcp add local-memory -- local-memory --mcp</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation Sections */}
            {documentationConfig.sections.map((section, index) => (
              <section
                key={section.id}
                data-section={section.id}
                id={section.id}
                className="scroll-target mb-16"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight mb-4">{section.title}</h1>
                  {section.description && (
                    <p className="text-lg text-muted-foreground">{section.description}</p>
                  )}
                </div>

                <MarkdownRenderer content={section.content} />

                {/* Navigation Footer */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-border">
                  <div>
                    {section.prevSection && (
                      <button
                        onClick={() => {
                          setCurrentSection(section.prevSection!);
                          document.getElementById(section.prevSection!)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        ← Previous: {documentationConfig.sections.find(s => s.id === section.prevSection)?.title}
                      </button>
                    )}
                  </div>
                  <div>
                    {section.nextSection && (
                      <button
                        onClick={() => {
                          setCurrentSection(section.nextSection!);
                          document.getElementById(section.nextSection!)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Next: {documentationConfig.sections.find(s => s.id === section.nextSection)?.title} →
                      </button>
                    )}
                  </div>
                </div>
              </section>
            ))}

            {/* Troubleshooting Section */}
            <section data-section="troubleshooting" id="troubleshooting" className="scroll-target">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Troubleshooting</h1>
                <p className="text-lg text-muted-foreground">Common issues and solutions</p>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Common Issues</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-3 pr-4 text-left font-medium">Issue</th>
                          <th className="pb-3 pr-4 text-left font-medium">Resolution</th>
                          <th className="pb-3 text-left font-medium">Command</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 text-muted-foreground">Command not found</td>
                          <td className="py-3 pr-4 text-muted-foreground">Ensure binary is in PATH</td>
                          <td className="py-3">
                            <code className="rounded bg-card px-2 py-1 font-mono text-xs">local-memory --version</code>
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 text-muted-foreground">Ollama not detected</td>
                          <td className="py-3 pr-4 text-muted-foreground">Install Ollama</td>
                          <td className="py-3">
                            <code className="rounded bg-card px-2 py-1 font-mono text-xs">curl -fsSL https://ollama.ai/install.sh | sh</code>
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 text-muted-foreground">License activation failed</td>
                          <td className="py-3 pr-4 text-muted-foreground">Include --accept-terms flag</td>
                          <td className="py-3">
                            <code className="rounded bg-card px-2 py-1 font-mono text-xs">local-memory license activate LM-XXXX --accept-terms</code>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">System Diagnostics</h3>
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="flex gap-2">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                      </div>
                    </div>
                    <div className="terminal-body">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory doctor</pre>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Run comprehensive system diagnostics to identify configuration issues.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationHub;
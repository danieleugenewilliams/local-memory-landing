import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  copyable?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  copyable = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card mb-6">
      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded border border-border/50 hover:border-border"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div className="terminal">
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
          </div>
          {language && (
            <span className="ml-4 font-mono text-xs text-muted-foreground">{language}</span>
          )}
        </div>
        <div className="terminal-body">
          <pre className="text-sm text-[hsl(var(--terminal-green))]">{code}</pre>
        </div>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  // Generate kebab-case ID from heading text
  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
  };

  // Simple markdown parsing for our specific use case
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        const language = line.slice(3).trim() || 'bash';
        const codeLines: string[] = [];
        i++;

        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }

        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeLines.join('\n')}
            language={language}
            copyable={true}
          />
        );
        i++;
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        const headingText = line.slice(2);
        const headingId = generateId(headingText);
        elements.push(
          <h1 key={`h1-${i}`} id={headingId} className="text-3xl font-bold tracking-tight mb-6 mt-8 first:mt-0 scroll-target">
            {headingText}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        const headingText = line.slice(3);
        const headingId = generateId(headingText);
        elements.push(
          <h2 key={`h2-${i}`} id={headingId} className="text-2xl font-bold tracking-tight mb-4 mt-8 text-[hsl(var(--brand-blue))] scroll-target">
            {headingText}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const headingText = line.slice(4);
        const headingId = generateId(headingText);
        elements.push(
          <h3 key={`h3-${i}`} id={headingId} className="text-xl font-semibold mb-3 mt-6 scroll-target">
            {headingText}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        const headingText = line.slice(5);
        const headingId = generateId(headingText);
        elements.push(
          <h4 key={`h4-${i}`} id={headingId} className="text-lg font-semibold mb-2 mt-4 scroll-target">
            {headingText}
          </h4>
        );
      }
      // Lists
      else if (line.match(/^[-*]\s/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].match(/^[-*]\s/)) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        i--; // Back up one since the while loop will increment

        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }
      // Paragraphs
      else if (line.trim() !== '') {
        elements.push(
          <p key={`p-${i}`} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {renderContent(content)}
    </div>
  );
};

export { MarkdownRenderer, CodeBlock };
export default MarkdownRenderer;
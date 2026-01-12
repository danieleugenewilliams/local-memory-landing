import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  sectionId?: string; // Prefix for all generated IDs to ensure uniqueness across sections
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

// Parse inline formatting (bold, italic, inline code, links)
const parseInlineFormatting = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for inline code first (highest priority)
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={keyIndex++} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-[hsl(var(--brand-blue))]">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Check for bold text
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={keyIndex++} className="font-semibold text-foreground">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic text
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(<em key={keyIndex++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Check for links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={keyIndex++}
          href={linkMatch[2]}
          className="text-[hsl(var(--brand-blue))] hover:underline"
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Find the next special character
    const nextSpecial = remaining.search(/[`*\[]/);
    if (nextSpecial === -1) {
      // No more special characters, add the rest as text
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Special character at start but didn't match a pattern, treat as regular text
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      // Add text up to the next special character
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
};

// Parse a table from lines
const parseTable = (lines: string[], startIndex: number): { element: React.ReactNode; endIndex: number } => {
  const tableLines: string[] = [];
  let i = startIndex;

  // Collect all table lines
  while (i < lines.length && lines[i].trim().startsWith('|')) {
    tableLines.push(lines[i]);
    i++;
  }

  if (tableLines.length < 2) {
    return { element: null, endIndex: startIndex };
  }

  // Parse header row
  const headerCells = tableLines[0]
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0);

  // Skip separator row (index 1)
  // Parse data rows
  const dataRows = tableLines.slice(2).map(line =>
    line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0)
  );

  const element = (
    <div key={`table-${startIndex}`} className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-card/50">
            {headerCells.map((cell, idx) => (
              <th key={idx} className="px-4 py-3 text-left font-semibold text-foreground">
                {parseInlineFormatting(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-border/50 hover:bg-card/30">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-muted-foreground">
                  {parseInlineFormatting(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return { element, endIndex: i - 1 };
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "", sectionId }) => {
  // Generate kebab-case ID from heading text
  // If sectionId is provided, it's prepended to ensure uniqueness across sections
  const generateId = (text: string): string => {
    const baseId = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens

    // If sectionId provided, prefix the ID to ensure uniqueness across sections
    // e.g., "cli-reference" + "overview" = "cli-reference-overview"
    return sectionId ? `${sectionId}-${baseId}` : baseId;
  };

  // Parse markdown content
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

      // Tables
      if (line.trim().startsWith('|')) {
        const { element, endIndex } = parseTable(lines, i);
        if (element) {
          elements.push(element);
          i = endIndex + 1;
          continue;
        }
      }

      // Headers
      if (line.startsWith('# ')) {
        const headingText = line.slice(2);
        const headingId = generateId(headingText);
        elements.push(
          <h1 key={`h1-${i}`} id={headingId} className="text-3xl font-bold tracking-tight mb-6 mt-8 first:mt-0 scroll-target">
            {parseInlineFormatting(headingText)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        const headingText = line.slice(3);
        const headingId = generateId(headingText);
        elements.push(
          <h2 key={`h2-${i}`} id={headingId} className="text-2xl font-bold tracking-tight mb-4 mt-8 text-[hsl(var(--brand-blue))] scroll-target">
            {parseInlineFormatting(headingText)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const headingText = line.slice(4);
        const headingId = generateId(headingText);
        elements.push(
          <h3 key={`h3-${i}`} id={headingId} className="text-xl font-semibold mb-3 mt-6 scroll-target">
            {parseInlineFormatting(headingText)}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        const headingText = line.slice(5);
        const headingId = generateId(headingText);
        elements.push(
          <h4 key={`h4-${i}`} id={headingId} className="text-lg font-semibold mb-2 mt-4 scroll-target">
            {parseInlineFormatting(headingText)}
          </h4>
        );
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        i--; // Back up one since the while loop will increment

        elements.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-[hsl(var(--brand-blue))] pl-4 py-2 mb-4 bg-card/30 rounded-r">
            {quoteLines.map((quoteLine, idx) => (
              <p key={idx} className="text-muted-foreground italic">
                {parseInlineFormatting(quoteLine)}
              </p>
            ))}
          </blockquote>
        );
      }
      // Horizontal rule
      else if (line.match(/^-{3,}$/) || line.match(/^\*{3,}$/)) {
        elements.push(
          <hr key={`hr-${i}`} className="border-border my-8" />
        );
      }
      // Numbered lists
      else if (line.match(/^\d+\.\s/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ''));
          i++;
        }
        i--; // Back up one since the while loop will increment

        elements.push(
          <ol key={`ol-${i}`} className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineFormatting(item)}</li>
            ))}
          </ol>
        );
      }
      // Unordered lists
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
              <li key={idx}>{parseInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      }
      // Paragraphs
      else if (line.trim() !== '') {
        elements.push(
          <p key={`p-${i}`} className="text-muted-foreground mb-4 leading-relaxed">
            {parseInlineFormatting(line)}
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

import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import VideoEmbed from "@/components/blog/VideoEmbed";
import { getPostBySlug } from "@/content/blog/posts";
import { trackBlogVisit, trackCTAClick } from "@/lib/analytics";
import type { Components } from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Track blog post visit
  useEffect(() => {
    if (post && slug) {
      trackBlogVisit('post', slug, post.title);
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <section className="section flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </section>
        <FooterNew />
      </div>
    );
  }

  // Custom markdown components for styling
  const components: Components = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-12 mb-4 pt-4 border-t border-border first:border-t-0 first:pt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold tracking-tight mt-6 mb-2">
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children }) => {
      // Check if the paragraph contains only a video URL
      const childArray = Array.isArray(children) ? children : [children];
      if (childArray.length === 1) {
        let videoUrl: string | null = null;

        // Check for plain text URL
        if (typeof childArray[0] === "string") {
          videoUrl = childArray[0].trim();
        }
        // Check for auto-linked URL (remark-gfm wraps bare URLs in <a> tags)
        else if (
          childArray[0] &&
          typeof childArray[0] === "object" &&
          "props" in childArray[0] &&
          childArray[0].props?.href
        ) {
          videoUrl = childArray[0].props.href;
        }

        if (
          videoUrl &&
          videoUrl.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|loom\.com)/)
        ) {
          return <VideoEmbed url={videoUrl} />;
        }
      }
      return <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>;
    },

    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => <em className="italic">{children}</em>,

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-[hsl(var(--brand-blue))] underline underline-offset-4 hover:text-[hsl(var(--brand-blue))/0.8] transition-colors"
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground/90 leading-relaxed pl-1">{children}</li>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[hsl(var(--brand-blue))] bg-card/50 pl-6 py-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Horizontal rules
    hr: () => <hr className="my-12 border-border" />,

    // Code blocks
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-[hsl(var(--terminal-bg))] border border-[hsl(var(--terminal-border))] font-mono text-sm text-[hsl(var(--terminal-green))]">
            {children}
          </code>
        );
      }
      return (
        <code className="block font-mono text-sm">{children}</code>
      );
    },
    pre: ({ children }) => (
      <div className="terminal my-6 overflow-hidden">
        <div className="terminal-header">
          <span className="terminal-dot terminal-dot-red"></span>
          <span className="terminal-dot terminal-dot-yellow"></span>
          <span className="terminal-dot terminal-dot-green"></span>
        </div>
        <pre className="terminal-body overflow-x-auto">{children}</pre>
      </div>
    ),

    // Tables
    table: ({ children }) => (
      <div className="table-responsive my-6 rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-card border-b border-border">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-card/50 transition-colors">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-foreground/90">{children}</td>
    ),

    // Images
    img: ({ src, alt }) => (
      <figure className="my-8">
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg border border-border w-full"
        />
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Article Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-tight relative py-16 md:py-20">
          {/* Back link */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 animate-in"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </button>

          {/* Date */}
          <time className="block text-sm font-mono text-muted-foreground mb-4 animate-in animate-in-delay-1">
            {format(new Date(post.date + 'T12:00:00'), "MMMM d, yyyy")}
          </time>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance animate-in animate-in-delay-2">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-muted-foreground text-pretty animate-in animate-in-delay-3">
            {post.description}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-sm">
        <div className="container-tight">
          <div className="prose-container animate-in animate-in-delay-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="section-sm border-t border-border">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to build intelligence that learns?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Give your AI persistent memory. Keep your data local.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/payment"
              className="btn-primary text-base"
              onClick={() => trackCTAClick("blog-post", "Get Started", "/payment")}
            >
              Get Started — $49
            </Link>
            <Link
              to="/docs"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("blog-post", "View documentation", "/docs")}
            >
              View documentation
            </Link>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;

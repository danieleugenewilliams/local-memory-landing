import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";
import VideoEmbed from "@/components/blog/VideoEmbed";
import { getAllPosts, getPostBySlug } from "@/content/blog/posts";
import { trackBlogVisit, trackCTAClick } from "@/lib/analytics";
import { useCheckout } from "@/contexts/CheckoutContext";

/* Blog post — redesigned from Blog Post.dc.html (warm-paper theme).
   The article body still renders post.content through ReactMarkdown; only the
   component styling changed. "Read next" is derived (2 newest other posts). */

const WIDE = "mx-auto max-w-[1080px] px-6 sm:px-10 lg:px-16 box-border";
const READ = "mx-auto max-w-[760px] px-6 sm:px-10 box-border";

const fmtLong = (date: string) => format(new Date(date + "T12:00:00"), "MMMM d, yyyy");

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openCheckout } = useCheckout();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post && slug) {
      trackBlogVisit("post", slug, post.title);
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="lm-theme min-h-screen">
        <SiteHeader />
        <section className="flex min-h-[60vh] items-center justify-center px-6 text-center">
          <div>
            <h1 className="mb-4 font-serif text-[34px] font-normal tracking-[-0.02em] text-lm-ink">
              Post not found
            </h1>
            <p className="mb-8 text-lm-stone">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-block rounded-lg bg-lm-ink px-6 py-3 font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              Back to the blog
            </Link>
          </div>
        </section>
        <SiteFooter minimal />
      </div>
    );
  }

  const readNext = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const components: Components = {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-11 font-serif text-[32px] font-medium leading-[1.2] tracking-[-0.02em] text-lm-ink first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-11 font-serif text-[28px] font-medium leading-[1.25] tracking-[-0.015em] text-lm-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-serif text-[20px] font-medium leading-[1.3] text-lm-ink">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-serif text-[17px] font-medium text-lm-ink">{children}</h4>
    ),
    p: ({ children }) => {
      // Preserve the bare-video-URL → embed behavior from the original.
      const childArray = Array.isArray(children) ? children : [children];
      if (childArray.length === 1) {
        let videoUrl: string | null = null;
        if (typeof childArray[0] === "string") {
          videoUrl = childArray[0].trim();
        } else if (
          childArray[0] &&
          typeof childArray[0] === "object" &&
          "props" in childArray[0] &&
          childArray[0].props?.href
        ) {
          videoUrl = childArray[0].props.href;
        }
        if (videoUrl && videoUrl.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|loom\.com)/)) {
          return <VideoEmbed url={videoUrl} />;
        }
      }
      return <p className="mb-[22px] text-[16.5px] leading-[1.75] text-[#33302a]">{children}</p>;
    },
    strong: ({ children }) => <strong className="font-semibold text-lm-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-lm-amber underline underline-offset-4 transition-colors hover:text-lm-rust"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-[22px] flex list-disc flex-col gap-2 pl-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-[22px] flex list-decimal flex-col gap-2 pl-6">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-[16px] leading-[1.65] text-[#33302a] marker:text-lm-muted">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-9 border-l-[3px] border-lm-amber pl-7 font-serif text-[24px] font-normal italic leading-[1.4] text-lm-ink">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-11 border-lm-line" />,
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="rounded border border-lm-line-2 bg-lm-sand-2 px-1.5 py-0.5 font-plex text-[13.5px] text-lm-ink-soft">
            {children}
          </code>
        );
      }
      return <code className="font-plex text-[13px] leading-[1.8] text-[#b8ad99]">{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-xl bg-lm-ink px-6 py-5 font-plex text-[13px] leading-[1.8] text-[#b8ad99]">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-lm-line">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-lm-line bg-lm-sand">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-lm-line">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 font-plex text-[12px] font-medium uppercase tracking-[0.04em] text-lm-stone">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-4 py-3 text-[14px] text-[#33302a]">{children}</td>,
    img: ({ src, alt }) => (
      <figure className="my-8">
        <img src={src} alt={alt || ""} className="w-full rounded-xl border border-lm-line" />
        {alt && (
          <figcaption className="mt-2.5 text-center font-plex text-xs text-lm-muted">{alt}</figcaption>
        )}
      </figure>
    ),
  };

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>{post.title} — Local Memory</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Article header */}
        <div className={`${READ} pt-[68px]`}>
          <Link to="/blog" className="font-plex text-xs font-medium text-lm-amber hover:underline">
            ← All essays
          </Link>
          <div className="mb-5 mt-[26px] flex flex-wrap items-center gap-3.5">
            <span className="rounded-full border border-lm-line-2 px-2.5 py-1 font-plex text-[10.5px] font-medium tracking-[0.06em] text-lm-muted">
              {post.tag}
            </span>
            <span className="font-plex text-xs text-lm-muted">
              {fmtLong(post.date)} · {post.readingMinutes} min read
            </span>
          </div>
          <h1 className="mb-[18px] text-balance font-serif text-[34px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink sm:text-[42px]">
            {post.title}
          </h1>
          <p className="mb-7 font-serif text-[19px] font-normal italic leading-[1.55] text-lm-stone">
            {post.description}
          </p>
          <div className="flex items-center gap-3 border-b border-lm-line pb-9">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-lm-ink font-serif text-[13px] font-medium text-lm-cream">
              DW
            </span>
            <div>
              <div className="text-[13px] font-medium text-lm-ink">Daniel Williams</div>
              <div className="font-plex text-[11.5px] text-lm-muted">Builder of Local Memory</div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className={`${READ} pb-6 pt-10`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* In-article CTA */}
        <div className={`${READ} pb-14`}>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-lm-line bg-lm-sand px-8 py-7">
            <div>
              <div className="mb-1 font-serif text-[20px] font-normal text-lm-ink">
                Give your agent a memory that persists.
              </div>
              <div className="font-plex text-[12.5px] text-lm-muted">
                24 MCP tools · $49 once · 100% local
              </div>
            </div>
            <button
              onClick={() => {
                trackCTAClick("blog-post", "Get Started", "/checkout");
                openCheckout();
              }}
              className="shrink-0 rounded-lg bg-lm-ink px-6 py-3 text-[14px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              Get Started — $49
            </button>
          </div>
        </div>

        {/* Read next */}
        {readNext.length > 0 && (
          <div className="border-t border-lm-line bg-lm-sand">
            <div className={`${WIDE} pb-16 pt-[52px]`}>
              <div className="mb-6 font-plex text-[11.5px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                Read next
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {readNext.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="block rounded-xl border border-lm-line bg-lm-cream px-7 py-6 transition-colors hover:border-lm-amber"
                  >
                    <div className="mb-2.5 font-plex text-xs text-lm-muted">
                      {fmtLong(p.date)} · {p.tag === "RELEASE" ? "Release" : "Essay"}
                    </div>
                    <div className="mb-2 font-serif text-[19px] font-medium leading-[1.3] text-lm-ink">
                      {p.title}
                    </div>
                    <p className="text-[13.5px] leading-[1.55] text-lm-stone-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter minimal />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;

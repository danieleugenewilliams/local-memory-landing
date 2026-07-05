import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { getAllPosts, type BlogTag } from "@/content/blog/posts";
import { trackBlogVisit } from "@/lib/analytics";

/* Blog index — redesigned from Blog.dc.html (warm-paper theme).
   Posts, descriptions, and tags all come from the real frontmatter via
   getAllPosts(); the featured card is the newest post, not a hardcoded one. */

const CONTAINER = "mx-auto max-w-[1080px] px-6 sm:px-10 lg:px-16 box-border";

type Filter = "all" | BlogTag;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ESSAY", label: "Essays" },
  { key: "RELEASE", label: "Releases" },
];

const fmtLong = (date: string) => format(new Date(date + "T12:00:00"), "MMMM d, yyyy");
const fmtShort = (date: string) => format(new Date(date + "T12:00:00"), "MMM d, yyyy");
const tagLabel = (tag: BlogTag) => (tag === "RELEASE" ? "Release" : "Essay");
const readCta = (tag: BlogTag) => (tag === "RELEASE" ? "Read the release notes →" : "Read the essay →");

const Blog = () => {
  const posts = getAllPosts();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    trackBlogVisit("index");
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  const visible = useMemo(
    () => rest.filter((p) => filter === "all" || p.tag === filter),
    [rest, filter]
  );

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Blog — Local Memory</title>
        <meta
          name="description"
          content="Essays on AI memory and knowledge architecture, plus release notes from building Local Memory."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Masthead */}
        <div className={`${CONTAINER} border-b border-lm-line pb-[52px] pt-[72px]`}>
          <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
            The Local Memory blog
          </div>
          <h1 className="mb-4 max-w-[24ch] text-balance font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[48px]">
            Notes on memory, knowledge, and agents that <em className="italic text-lm-amber">learn.</em>
          </h1>
          <p className="max-w-[56ch] text-[16px] leading-[1.6] text-lm-stone">
            Essays on AI memory and knowledge architecture, plus release notes from building Local Memory.
          </p>
        </div>

        {/* Featured (newest) post */}
        {featured && (
          <div className={`${CONTAINER} pt-[52px]`}>
            <Link
              to={`/blog/${featured.slug}`}
              className="block rounded-2xl border border-lm-line bg-lm-sand px-11 py-10 transition-colors hover:border-lm-amber"
            >
              <div className="mb-[18px] flex items-center gap-3.5">
                <span className="rounded-full bg-lm-amber px-2.5 py-1 font-plex text-[10.5px] font-medium tracking-[0.06em] text-lm-cream">
                  LATEST
                </span>
                <span className="font-plex text-xs text-lm-muted">
                  {fmtLong(featured.date)} · {tagLabel(featured.tag)}
                </span>
              </div>
              <div className="mb-3 max-w-[26ch] font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-lm-ink">
                {featured.title}
              </div>
              <p className="mb-4 max-w-[68ch] text-[15px] leading-[1.6] text-lm-stone">
                {featured.description}
              </p>
              <span className="font-plex text-[13px] font-medium text-lm-amber">{readCta(featured.tag)}</span>
            </Link>
          </div>
        )}

        {/* Post index */}
        <div className={`${CONTAINER} pb-[88px] pt-11`}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-5">
            <div className="font-plex text-[11.5px] font-medium uppercase tracking-[0.08em] text-lm-muted">
              {filter === "all" ? "All posts" : FILTERS.find((f) => f.key === filter)?.label}
            </div>
            <div className="flex gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`rounded-full border px-3.5 py-1.5 font-plex text-[11.5px] font-medium transition-colors ${
                      active
                        ? "border-lm-amber bg-lm-amber text-lm-cream"
                        : "border-lm-line-2 bg-transparent text-lm-stone-2 hover:border-lm-amber"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            {visible.length === 0 ? (
              <p className="py-12 text-center font-plex text-sm text-lm-muted">
                No posts in this category yet.
              </p>
            ) : (
              visible.map((post) => {
                const pillClass = `shrink-0 rounded-full border px-2.5 py-1 font-plex text-[10.5px] font-medium tracking-[0.06em] ${
                  post.tag === "RELEASE"
                    ? "border-[#d9b878] text-lm-amber"
                    : "border-lm-line-2 text-lm-muted"
                }`;
                return (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="flex flex-col gap-2 border-b border-lm-line px-1 py-6 transition-colors hover:bg-lm-sand sm:grid sm:grid-cols-[150px_1fr_auto] sm:items-baseline sm:gap-7"
                  >
                    {/* meta: date (+ tag on mobile) */}
                    <div className="flex items-center justify-between sm:block">
                      <span className="font-plex text-xs text-lm-muted">{fmtShort(post.date)}</span>
                      <span className={`${pillClass} sm:hidden`}>{post.tag}</span>
                    </div>
                    <span>
                      <span className="mb-1.5 block font-serif text-[19px] font-medium leading-[1.3] tracking-[-0.01em] text-lm-ink">
                        {post.title}
                      </span>
                      <span className="block max-w-[72ch] text-[13.5px] leading-[1.55] text-lm-stone-2">
                        {post.description}
                      </span>
                    </span>
                    <span className={`hidden sm:inline-block sm:justify-self-end ${pillClass}`}>
                      {post.tag}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </main>

      <SiteFooter minimal />
      <ScrollToTop />
    </div>
  );
};

export default Blog;

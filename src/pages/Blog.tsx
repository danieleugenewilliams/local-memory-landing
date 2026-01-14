import { Link } from "react-router-dom";
import { format } from "date-fns";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import { getAllPosts } from "@/content/blog/posts";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative py-16 text-center md:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-in">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-in animate-in-delay-1">
            Insights on AI memory, knowledge architecture, and building intelligence that learns.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-sm">
        <div className="container-wide">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:max-w-3xl lg:mx-auto">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className={`group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-[hsl(var(--brand-blue))/0.5] hover:bg-card/80 animate-in animate-in-delay-${Math.min(index + 1, 5)}`}
                >
                  {/* Date */}
                  <time className="block text-sm font-mono text-muted-foreground mb-3">
                    {format(new Date(post.date + 'T12:00:00'), "MMMM d, yyyy")}
                  </time>

                  {/* Title */}
                  <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-[hsl(var(--brand-blue))] transition-colors mb-3">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.description}
                  </p>

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center text-sm font-medium text-[hsl(var(--brand-blue))] opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article
                    <svg
                      className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default Blog;

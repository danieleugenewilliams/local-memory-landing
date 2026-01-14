export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

interface FrontMatter {
  title?: string;
  date?: string;
  description?: string;
  slug?: string;
}

/**
 * Parse frontmatter from markdown content
 * Frontmatter is YAML between --- markers at the start of the file
 */
function parseFrontmatter(markdown: string): { frontmatter: FrontMatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const [, frontmatterStr, content] = match;
  const frontmatter: FrontMatter = {};

  // Simple YAML parsing for our known fields
  frontmatterStr.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key === "title" || key === "date" || key === "description" || key === "slug") {
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: content.trim() };
}

/**
 * Load all markdown files from the blog directory using Vite's glob import
 * Files are loaded at build time, no runtime file system access needed
 */
const markdownFiles = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * Process all loaded markdown files into BlogPost objects
 */
function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, rawContent] of Object.entries(markdownFiles)) {
    // Extract filename without extension for fallback slug
    const filename = path.replace("./", "").replace(".md", "");
    const { frontmatter, content } = parseFrontmatter(rawContent);

    // Skip files without required frontmatter
    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`Skipping ${path}: missing required frontmatter (title, date)`);
      continue;
    }

    posts.push({
      slug: frontmatter.slug || filename,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description || "",
      content,
    });
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Cache the loaded posts
let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (!cachedPosts) {
    cachedPosts = loadPosts();
  }
  return cachedPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

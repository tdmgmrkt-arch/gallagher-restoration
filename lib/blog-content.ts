import fs from "node:fs";
import path from "node:path";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "faq"; items: Array<{ q: string; a: string }> };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  imageAlt: string;
  body: BlogBlock[];
};

const contentDir = path.join(process.cwd(), "content", "blog");

function loadAll(): Record<string, BlogPost> {
  if (!fs.existsSync(contentDir)) return {};
  const out: Record<string, BlogPost> = {};
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    out[slug] = JSON.parse(raw) as BlogPost;
  }
  return out;
}

export const BLOG_POSTS: Record<string, BlogPost> = loadAll();

export const BLOG_SLUGS = Object.keys(BLOG_POSTS);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS[slug];
}

export function listBlogPostsByDate(): BlogPost[] {
  return Object.values(BLOG_POSTS).sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1,
  );
}

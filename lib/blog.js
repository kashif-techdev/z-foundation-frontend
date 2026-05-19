import { blogPosts } from "@/data/blog-posts";

export const BLOG_CATEGORIES = [
  { id: "all", label: "All articles" },
  { id: "healthcare-support", label: "Healthcare Support" },
  { id: "education", label: "Education" },
  { id: "community-stories", label: "Community Stories" },
  { id: "volunteers", label: "Volunteers" },
  { id: "technology", label: "Technology" },
  { id: "awareness", label: "Awareness" },
];

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function getFeaturedPost() {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export function getLatestPosts(limit = 5, excludeSlug) {
  return getAllPosts()
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit);
}

/** Prefer same category, then fill from the rest. */
export function getRelatedPosts(slug, limit = 2) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.categorySlug === current.categorySlug);
  const diff = others.filter((p) => p.categorySlug !== current.categorySlug);
  return [...same, ...diff].slice(0, limit);
}

export function filterPosts(posts, { categoryId = "all", query = "" }) {
  const q = query.trim().toLowerCase();
  return posts.filter((post) => {
    const matchesCategory =
      categoryId === "all" || post.categorySlug === categoryId;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    return haystack.includes(q);
  });
}

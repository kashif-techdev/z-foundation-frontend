import { blogPosts } from "@/data/blog-posts";

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return blogPosts.map((p) => p.slug);
}

/** Prefer same category, then fill from the rest. */
export function getRelatedPosts(slug, limit = 2) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const diff = others.filter((p) => p.category !== current.category);
  return [...same, ...diff].slice(0, limit);
}

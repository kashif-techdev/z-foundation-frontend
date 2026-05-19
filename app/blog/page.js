import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata = {
  title: "Blog | Z-Foundation",
  description:
    "Stories, awareness, and updates from Z-Foundation on healthcare support, education initiatives, volunteer efforts, and technology for social impact.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const featuredSlug = featuredPost?.slug ?? null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="blog-page">
        <header className="blog-hero">
          <div className="blog-hero__bg" aria-hidden="true" />
          <div className="max-width blog-hero__inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="blog-breadcrumb__sep" aria-hidden="true">
                /
              </span>
              <span className="blog-breadcrumb__current">Blog</span>
            </nav>
            <p className="blog-hero__eyebrow">Insights &amp; Updates</p>
            <h1 className="blog-hero__title">Stories, Awareness &amp; Community Impact</h1>
            <p className="blog-hero__lead">
              Read updates from Z-Foundation about healthcare support, education initiatives,
              volunteer efforts, and technology-driven social impact. Our goal is to create
              transparent and meaningful community support for underserved families.
            </p>
            <div className="blog-hero__actions">
              <a href="#blog-articles" className="blog-hero__btn blog-hero__btn--primary">
                Explore Articles
              </a>
              <Link href="/donate" className="blog-hero__btn blog-hero__btn--secondary">
                Support Our Mission
              </Link>
            </div>
          </div>
        </header>

        <div className="max-width">
          <BlogPageClient posts={posts} featuredSlug={featuredSlug} />
        </div>
      </main>
      <Footer />
    </>
  );
}

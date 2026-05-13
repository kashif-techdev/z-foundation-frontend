import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostBody from "@/components/BlogPostBody";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Article | Z-Foundation" };
  }
  return {
    title: `${post.title} | Z-Foundation Blog`,
    description: post.excerpt,
  };
}

function formatDate(iso, style = "long") {
  return new Intl.DateTimeFormat("en", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogArticlePage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 2);

  return (
    <>
      <Navbar />
      <main id="main-content" className="blog-article">
        <header className="blog-article__hero">
          <div className={`blog-article__hero-tint blog-article__hero-tint--${post.accent}`} aria-hidden="true" />
          <div className="max-width blog-article__hero-inner">
            <nav className="blog-breadcrumb blog-breadcrumb--on-dark" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="blog-breadcrumb__sep" aria-hidden="true">
                /
              </span>
              <Link href="/blog">Blog</Link>
              <span className="blog-breadcrumb__sep" aria-hidden="true">
                /
              </span>
              <span className="blog-breadcrumb__current blog-breadcrumb__truncate" title={post.title}>
                {post.title}
              </span>
            </nav>
            <span className="blog-pill blog-pill--light">{post.category}</span>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__deck">{post.excerpt}</p>
            <div className="blog-article__byline">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="blog-dot blog-dot--light" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <article className="blog-article__body-wrap max-width">
          <div className="blog-article__body">
            <BlogPostBody content={post.body} />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="blog-related max-width" aria-labelledby="related-heading">
            <h2 id="related-heading" className="blog-related__title">
              Related reading
            </h2>
            <ul className="blog-related__list">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className={`blog-related-card blog-related-card--${r.accent}`}>
                    <span className="blog-pill blog-pill--small">{r.category}</span>
                    <span className="blog-related-card__title">{r.title}</span>
                    <span className="blog-related-card__meta">{formatDate(r.date, "short")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="max-width blog-article__footer-nav">
          <Link href="/blog" className="blog-back-link">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to all articles
          </Link>
          <div className="blog-article__footer-actions">
            <Link href="/volunteer" className="blog-back-link blog-back-link--primary">
              Volunteer
            </Link>
            <Link href="/#contact" className="blog-back-link">
              Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

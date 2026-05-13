import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Z-Foundation",
  description:
    "Stories, field updates, and impact reports from Z-Foundation—health camps, education support, flood resilience, and how to get involved.",
};

function formatDate(iso) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const gridPosts = posts.slice(1);

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
            <p className="blog-hero__eyebrow">Stories &amp; updates</p>
            <h1 className="blog-hero__title">From the field</h1>
            <p className="blog-hero__lead">
              Transparent updates on our programmes—what we did, what we learned, and how community partners shape every
              step.
            </p>
          </div>
        </header>

        <div className="max-width blog-layout">
          {featured ? (
            <section className="blog-featured" aria-labelledby="featured-heading">
              <h2 id="featured-heading" className="visually-hidden">
                Featured article
              </h2>
              <Link href={`/blog/${featured.slug}`} className={`blog-featured-card blog-featured-card--${featured.accent}`}>
                <div className="blog-featured-card__content">
                  <span className="blog-pill">{featured.category}</span>
                  <h3 className="blog-featured-card__title">{featured.title}</h3>
                  <p className="blog-featured-card__excerpt">{featured.excerpt}</p>
                  <div className="blog-featured-card__meta">
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    <span className="blog-dot" aria-hidden="true" />
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="blog-read-link">
                    Read article <i className="fas fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
                <div className="blog-featured-card__visual" aria-hidden="true">
                  <i className="fas fa-book-open blog-featured-card__icon" />
                </div>
              </Link>
            </section>
          ) : null}

          {gridPosts.length > 0 ? (
            <section className="blog-grid-section" aria-labelledby="recent-heading">
              <div className="blog-section-head">
                <h2 id="recent-heading" className="blog-section-head__title">
                  Recent articles
                </h2>
                <p className="blog-section-head__sub">Short reads you can finish over a cup of tea.</p>
              </div>

              <ul className="blog-grid">
                {gridPosts.map((post) => (
                  <li key={post.slug}>
                    <article>
                      <Link href={`/blog/${post.slug}`} className={`blog-card blog-card--${post.accent}`}>
                        <span className="blog-pill blog-pill--muted">{post.category}</span>
                        <h3 className="blog-card__title">{post.title}</h3>
                        <p className="blog-card__excerpt">{post.excerpt}</p>
                        <div className="blog-card__meta">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="blog-dot" aria-hidden="true" />
                          <span>{post.readTime}</span>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <aside className="blog-cta" aria-labelledby="blog-cta-title">
            <div className="blog-cta__inner">
              <div>
                <h2 id="blog-cta-title" className="blog-cta__title">
                  Want to support this work?
                </h2>
                <p className="blog-cta__text">Donate, volunteer, or ask a question—we read every message.</p>
              </div>
              <div className="blog-cta__actions">
                <Link href="/volunteer" className="blog-cta__btn blog-cta__btn--ghost">
                  Volunteer
                </Link>
                <Link href="/#contact" className="blog-cta__btn">
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

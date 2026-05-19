"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BLOG_CATEGORIES, filterPosts } from "@/lib/blog";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogPageClient({ posts, featuredSlug }) {
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterPosts(posts, { categoryId, query }),
    [posts, categoryId, query]
  );

  const featured =
    filtered.find((p) => p.slug === featuredSlug) ?? filtered[0] ?? null;
  const gridPosts = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  const latestSidebar = posts.slice(0, 5);

  const onNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email || !String(email).includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you. We will share updates when new articles are published.");
    e.currentTarget.reset();
  };

  const scrollToArticles = () => {
    document.getElementById("blog-articles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="blog-layout">
        <div className="blog-layout__main">
          {featured ? (
            <section className="blog-featured" aria-labelledby="featured-heading">
              <h2 id="featured-heading" className="visually-hidden">
                Featured article
              </h2>
              <Link
                href={`/blog/${featured.slug}`}
                className={`blog-featured-card blog-featured-card--${featured.accent}`}
              >
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
                <div
                  className="blog-featured-card__visual blog-featured-card__visual--rich"
                  aria-hidden="true"
                >
                  <span className="blog-featured-card__meta-pill">{featured.readTime}</span>
                  <i className="fas fa-book-open blog-featured-card__icon" />
                </div>
              </Link>
            </section>
          ) : null}

          <section
            id="blog-articles"
            className="blog-toolbar-section"
            aria-labelledby="articles-heading"
          >
            <div className="blog-section-head">
              <h2 id="articles-heading" className="blog-section-head__title">
                Articles
              </h2>
              <p className="blog-section-head__sub">
                Awareness, mission updates, and community-focused reading.
              </p>
            </div>

            <div className="blog-toolbar">
              <label className="blog-search" htmlFor="blog-search-input">
                <i className="fas fa-search" aria-hidden="true" />
                <input
                  id="blog-search-input"
                  type="search"
                  placeholder="Search articles…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </label>
            </div>

            <div
              className="blog-filters"
              role="tablist"
              aria-label="Filter by category"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={categoryId === cat.id}
                  className={`blog-filter-chip ${categoryId === cat.id ? "blog-filter-chip--active" : ""}`}
                  onClick={() => setCategoryId(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {gridPosts.length > 0 ? (
              <ul className="blog-grid">
                {gridPosts.map((post) => (
                  <li key={post.slug}>
                    <article>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={`blog-card blog-card--${post.accent}`}
                      >
                        <div className="blog-card__thumb" aria-hidden="true">
                          <span className="blog-card__thumb-pill">{post.category}</span>
                          <span className="blog-card__thumb-time">{post.readTime}</span>
                        </div>
                        <div className="blog-card__body">
                          <h3 className="blog-card__title">{post.title}</h3>
                          <p className="blog-card__excerpt">{post.excerpt}</p>
                          <div className="blog-card__meta">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span className="blog-dot" aria-hidden="true" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="blog-empty" role="status">
                <i className="fas fa-newspaper blog-empty__icon" aria-hidden="true" />
                <p className="blog-empty__title">No articles match your filters</p>
                <p className="blog-empty__text">
                  Try another category or clear your search. New posts will appear here as
                  we publish them.
                </p>
                <button
                  type="button"
                  className="blog-empty__btn"
                  onClick={() => {
                    setCategoryId("all");
                    setQuery("");
                  }}
                >
                  Show all articles
                </button>
              </div>
            )}
          </section>

          <section className="blog-newsletter" aria-labelledby="newsletter-heading">
            <div className="blog-newsletter__inner">
              <div>
                <h2 id="newsletter-heading" className="blog-newsletter__title">
                  Stay informed
                </h2>
                <p className="blog-newsletter__text">
                  Leave your email for occasional updates on new articles and foundation
                  news. No spam—unsubscribe anytime by contacting us.
                </p>
              </div>
              <form className="blog-newsletter__form" onSubmit={onNewsletterSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  aria-label="Email for updates"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </section>

          <aside className="blog-cta" aria-labelledby="blog-cta-title">
            <div className="blog-cta__inner">
              <div>
                <h2 id="blog-cta-title" className="blog-cta__title">
                  Support our mission
                </h2>
                <p className="blog-cta__text">
                  Donate via EasyPaisa, volunteer your time, or send us a question—we read
                  every message.
                </p>
              </div>
              <div className="blog-cta__actions">
                <Link href="/donate" className="blog-cta__btn">
                  Donate
                </Link>
                <Link href="/volunteer" className="blog-cta__btn blog-cta__btn--ghost">
                  Volunteer
                </Link>
                <Link href="/#contact" className="blog-cta__btn blog-cta__btn--ghost">
                  Contact
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <aside className="blog-sidebar" aria-labelledby="sidebar-latest-heading">
          <div className="blog-sidebar__card">
            <h2 id="sidebar-latest-heading" className="blog-sidebar__title">
              Latest updates
            </h2>
            <ul className="blog-sidebar__list">
              {latestSidebar.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="blog-sidebar__link">
                    <span className="blog-pill blog-pill--small blog-pill--muted">
                      {post.category}
                    </span>
                    <span className="blog-sidebar__link-title">{post.title}</span>
                    <span className="blog-sidebar__link-meta">
                      {formatDate(post.date)} · {post.readTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="blog-sidebar__card blog-sidebar__card--muted">
            <h3 className="blog-sidebar__subtitle">Quick links</h3>
            <ul className="blog-sidebar__quick">
              <li>
                <Link href="/donate">
                  <i className="fas fa-hand-holding-heart" aria-hidden="true" /> Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer">
                  <i className="fas fa-hands-helping" aria-hidden="true" /> Volunteer
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <i className="fas fa-circle-info" aria-hidden="true" /> About us
                </Link>
              </li>
            </ul>
          </div>

          <button type="button" className="blog-sidebar__scroll" onClick={scrollToArticles}>
            Explore articles
            <i className="fas fa-chevron-down" aria-hidden="true" />
          </button>
        </aside>
      </div>
    </>
  );
}

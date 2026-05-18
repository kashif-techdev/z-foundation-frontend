import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/support", label: "Support" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <ul className="site-footer__links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="site-footer__email">
          <a href="mailto:info@zifoundation.com">info@zifoundation.com</a>
        </p>

        <p className="site-footer__copy">
          <span className="far fa-copyright" aria-hidden="true" /> {year}{" "}
          Z-Foundation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

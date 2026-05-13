"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import TopInfoBar from "./TopInfoBar";

const SECTION_NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "teams", label: "Members" },
  { id: "contact", label: "Contact" },
];

const ROUTE_NAV = [
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/support", label: "Support" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 130;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setTimeout(() => setActiveSection(targetId), 100);
    }
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
    }
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 20);
      if (!isHome) return;

      const sections = SECTION_NAV.map((link) => link.id);
      const scrollPosition = window.scrollY + 198;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  const onLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      handleNavClick(e, "#home");
    } else {
      setMenuOpen(false);
    }
  };

  const onSectionClick = (e, id) => {
    if (isHome) {
      e.preventDefault();
      handleNavClick(e, `#${id}`);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <TopInfoBar />
      <nav className={`navbar ${sticky ? "sticky" : ""} ${menuOpen ? "active-menu" : ""}`}>
        <div className="max-width">
          <div className="logo">
            <Link href="/" onClick={onLogoClick} aria-label="Z-Foundation Home">
              <span>Z</span>-Foundation
            </Link>
          </div>
          <ul className={`menu ${menuOpen ? "active" : ""}`}>
            <li className="menu-header">
              <Link href="/" onClick={onLogoClick} className="menu-logo-link">
                <span className="menu-logo">Z</span>
                <span className="menu-logo-text">Foundation</span>
              </Link>
            </li>
            {SECTION_NAV.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={sectionHref(id)}
                  className={`nav-link ${isHome && activeSection === id ? "active" : ""}`}
                  onClick={(e) => onSectionClick(e, id)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {ROUTE_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link ${pathname.startsWith(href) ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className={`menu-btn ${menuOpen ? "active" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="menu-icon">
              <i className="fas fa-bars" />
            </span>
          </button>
        </div>
      </nav>
      <div className={`menu-backdrop ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />
    </>
  );
}

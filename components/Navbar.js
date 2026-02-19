"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#teams", label: "Members" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle smooth scroll and active section tracking
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      // Update active section after scroll
      setTimeout(() => setActiveSection(targetId), 100);
    }
  }, []);

  // Track scroll position for sticky navbar
  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
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

  // Close menu when clicking outside
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

  return (
    <>
      <nav className={`navbar ${sticky ? "sticky" : ""} ${menuOpen ? "active-menu" : ""}`}>
        <div className="max-width">
          <div className="logo">
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              aria-label="Z-Foundation Home"
            >
              <span>Z</span>-Foundation
            </Link>
          </div>
          <ul className={`menu ${menuOpen ? "active" : ""}`}>
            <li className="menu-header">
              <Link
                href="#home"
                onClick={(e) => {
                  handleNavClick(e, "#home");
                  setMenuOpen(false);
                }}
                className="menu-logo-link"
              >
                <span className="menu-logo">Z</span>
                <span className="menu-logo-text">Foundation</span>
              </Link>
              <button
                type="button"
                className="menu-close-btn"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-times" />
              </button>
            </li>
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.replace("#", "");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link ${activeSection === sectionId ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
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

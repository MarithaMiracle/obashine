// /Users/decagon/obashine-properties/src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/property-details", label: "Property Details" },
  { href: "/sell-with-us", label: "Sell with Us" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop-nav { display: none !important; }
          .navbar-desktop-cta { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-logo img { height: 48px !important; }
          .navbar-wrapper { 
            padding: 12px 16px !important; 
            position: sticky !important;
            top: 0;
            z-index: 100;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }
        }
        @media (min-width: 769px) {
          .navbar-hamburger { display: none !important; }
          .navbar-mobile-menu { display: none !important; }
        }

        .navbar-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          width: 48px;
          height: 48px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .navbar-hamburger:active {
          background: rgba(47, 62, 90, 0.08);
        }
        .hamburger-bar {
          width: 24px;
          height: 2px;
          background: #0F242A;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }
        .hamburger-bar.open:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger-bar.open:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger-bar.open:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .navbar-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100dvh;
          background: #fff;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          padding: 0;
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar-mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #f0ece6;
        }
        .mobile-menu-links {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 12px 0;
        }
        .mobile-nav-link {
          display: block;
          padding: 16px 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 500;
          text-decoration: none;
          color: #2F3E5A;
          border-bottom: 1px solid #f5f2ef;
          transition: background 0.15s, padding-left 0.2s;
        }
        .mobile-nav-link:active {
          background: #f5f2ef;
        }
        .mobile-nav-link.active {
          color: #2F3E5A;
          background: #E2E9F4;
          font-weight: 600;
          padding-left: 28px;
        }
        .mobile-menu-footer {
          padding: 24px 24px 36px;
          border-top: 1px solid #f0ece6;
          display: flex;
          justify-content: center;
        }
        .mobile-cta-btn {
          display: inline-block;
          min-width: 160px;
          text-align: center;
          border-radius: 8px;
          background: #2D3A52;
          padding: 12px 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #F2E1D2;
          text-decoration: none;
        }
      `}</style>

      {/* ── Desktop layout (untouched) ── */}
      <div className="navbar-wrapper" style={{ padding: "8px 32px 6px" }}>
        <div style={{
          maxWidth: 1300, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link href="/" className="navbar-logo" style={{ flexShrink: 0 }}>
            <img
              src={`${mediaBase}/bef725c4d8087b3de19541c61e42028afa444338016ddd1494882e4db00dd3b3.png`}
              alt="ObaShine"
              style={{ height: 96, width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          <nav className="navbar-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href} style={{
                  borderRadius: 6, padding: "5px 14px",
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  background: isActive ? "#E2E9F4" : "transparent",
                  color: isActive ? "#2F3E5A" : "#0F242A",
                  whiteSpace: "nowrap",
                }}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/contact" className="navbar-desktop-cta" style={{
            borderRadius: 8, background: "#2D3A52",
            padding: "9px 22px", fontSize: 15, fontWeight: 700,
            color: "#F2E1D2", textDecoration: "none", flexShrink: 0,
          }}>
            Contact
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
            <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
            <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div className={`navbar-mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {/* Mirror the navbar header so it looks flush */}
        <div className="mobile-menu-header">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <img
              src={`${mediaBase}/bef725c4d8087b3de19541c61e42028afa444338016ddd1494882e4db00dd3b3.png`}
              alt="ObaShine"
              style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>
          <button
            className="navbar-hamburger"
            style={{ display: "flex" }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="hamburger-bar open" />
            <span className="hamburger-bar open" style={{ opacity: 0 }} />
            <span className="hamburger-bar open" />
          </button>
        </div>

        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`mobile-nav-link${pathname === link.href ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <Link
            href="/contact"
            className="mobile-cta-btn"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
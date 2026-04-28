'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
const leftLinks: NavLink[] = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'Story',   href: '/story'   },
  { label: 'Menu',    href: '/menu'    },
];

const rightLinks: NavLink[] = [
  { label: 'Order',    href: '/order'    },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog',     href: '/blog'     },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function LocationPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function openSelectionFunnel() {
    // Dispatches a custom event — the SelectionFunnel component listens for this
    window.dispatchEvent(new CustomEvent('saqafat:open-funnel'));
  }

  return (
    <>
      {/* ── Inject global styles (hover states, media queries) ─────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

        :root {
          --gold:       #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim:   rgba(201, 168, 76, 0.18);
          --cream:      #FAF6EE;
          --cream-dim:  rgba(250, 246, 238, 0.75);
          --brown:      #3D2B1F;
          --char:       #1A0F08;
          --header-h:   72px;
        }

        .sq-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--cream-dim);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .sq-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.25s ease;
        }
        .sq-nav-link:hover,
        .sq-nav-link[aria-current="page"] {
          color: var(--gold-light);
        }
        .sq-nav-link:hover::after,
        .sq-nav-link[aria-current="page"]::after {
          width: 100%;
        }
        .sq-nav-link:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 4px;
          border-radius: 2px;
        }

        .sq-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          color: var(--gold);
          letter-spacing: 0.06em;
          line-height: 1;
          transition: color 0.2s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sq-logo-wrapper:hover .sq-logo-text,
        .sq-logo-wrapper:focus-visible .sq-logo-text {
          color: var(--gold-light);
          transform: scale(1.04);
        }
        .sq-logo-wrapper:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .sq-location-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: var(--gold);
          border-radius: 20px;
          padding: 5px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .sq-location-btn:hover {
          background: var(--gold-dim);
          border-color: var(--gold);
          color: var(--gold-light);
        }
        .sq-location-btn:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }

        .sq-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .sq-hamburger:hover { background: var(--gold-dim); }
        .sq-hamburger:focus-visible { outline: 2px solid var(--gold); }

        .sq-ham-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(2) {
          opacity: 0;
        }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile drawer */
        .sq-drawer {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(26, 15, 8, 0.98);
          backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          animation: sq-fade-in 0.25s ease;
        }
        @keyframes sq-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .sq-drawer-link {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 700;
          color: var(--cream-dim);
          text-decoration: none;
          letter-spacing: 0.04em;
          padding: 0.6rem 1rem;
          transition: color 0.2s;
          animation: sq-slide-up 0.35s ease both;
        }
        .sq-drawer-link:hover { color: var(--gold-light); }
        .sq-drawer-link:nth-child(1) { animation-delay: 0.04s; }
        .sq-drawer-link:nth-child(2) { animation-delay: 0.08s; }
        .sq-drawer-link:nth-child(3) { animation-delay: 0.12s; }
        .sq-drawer-link:nth-child(4) { animation-delay: 0.16s; }
        .sq-drawer-link:nth-child(5) { animation-delay: 0.20s; }
        .sq-drawer-link:nth-child(6) { animation-delay: 0.24s; }
        @keyframes sq-slide-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sq-drawer-divider {
          width: 40px;
          height: 1px;
          background: var(--gold-dim);
          margin: 1.5rem 0;
        }

        .sq-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: 1px solid rgba(201, 168, 76, 0.25);
          color: var(--gold);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
        }
        .sq-close-btn:hover { background: var(--gold-dim); border-color: var(--gold); }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .sq-nav-left,
          .sq-nav-right {
            display: none !important;
          }
          .sq-hamburger {
            display: flex !important;
          }
          .sq-location-btn span {
            display: none; /* show icon only on mobile */
          }
        }

        @media (min-width: 769px) {
          .sq-hamburger {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sq-drawer, .sq-drawer-link, .sq-logo-text {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--header-h)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          transition: 'background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled
            ? 'rgba(26, 15, 8, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 rgba(201, 168, 76, 0.15), 0 4px 24px rgba(0,0,0,0.3)'
            : 'none',
        }}
      >
        {/* LEFT NAV */}
        <nav
          className="sq-nav-left"
          aria-label="Primary navigation left"
          style={{ display: 'flex', gap: '2rem', alignItems: 'center', flex: 1 }}
        >
          {leftLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="sq-nav-link"
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link
          href="/"
          className="sq-logo-wrapper"
          aria-label="Saqafat Bakery & Cafe — home"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            padding: '0 1.5rem',
            flexShrink: 0,
          }}
        >
          {/*
            ── LOGO IMAGE (uncomment when asset is ready) ──────────────────
            <Image
              src="/images/logo.svg"
              alt="Saqafat Bakery & Cafe"
              width={120}
              height={48}
              priority
              style={{ objectFit: 'contain' }}
            />
          */}
          <span className="sq-logo-text">SAQAFAT</span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              opacity: 0.75,
              marginTop: '1px',
            }}
          >
            Bakery &amp; Cafe
          </span>
        </Link>

        {/* RIGHT NAV + LOCATION PILL */}
        <nav
          className="sq-nav-right"
          aria-label="Primary navigation right"
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          {rightLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="sq-nav-link"
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Location pin — reopens Selection Funnel (SRS §3.2) */}
          <button
            className="sq-location-btn"
            onClick={openSelectionFunnel}
            aria-label="Change your branch"
            title="Change branch"
          >
            <LocationPinIcon />
            <span>Branch</span>
          </button>
        </nav>

        {/* HAMBURGER — mobile only */}
        <button
          className="sq-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
        >
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
        </button>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-drawer"
          className="sq-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className="sq-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Brand mark in drawer */}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '13px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '2rem',
              opacity: 0.6,
            }}
          >
            Saqafat
          </span>

          <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {[...leftLinks, ...rightLinks].map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className="sq-drawer-link"
                aria-current={pathname === link.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${0.04 + i * 0.04}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="sq-drawer-divider" />

          {/* Location button inside drawer */}
          <button
            className="sq-location-btn"
            onClick={() => {
              setMenuOpen(false);
              openSelectionFunnel();
            }}
            style={{ marginTop: '0.5rem' }}
          >
            <LocationPinIcon />
            <span style={{ display: 'inline' }}>Change Branch</span>
          </button>
        </div>
      )}
    </>
  );
}
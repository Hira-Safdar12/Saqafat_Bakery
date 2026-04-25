'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          transition: 'background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s',
          background: scrolled ? 'rgba(26, 15, 8, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(201, 168, 76, 0.2)' : 'none',
        }}
      >
        {/* LEFT NAV */}
        <nav style={styles.navLeft}>
          {leftLinks.map((link) => (
            <Link key={link.label} href={link.href} style={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link href="/" style={styles.logoWrapper}>
          {/* Replace with <Image> once you have the actual logo asset */}
          {/* <Image src="/logo.png" alt="Saqafat" width={120} height={48} /> */}
          <span style={styles.logoMain}>SAQAFAT</span>
          <span style={styles.logoSub}>Bakery &amp; Cafe</span>
        </Link>

        {/* RIGHT NAV — desktop */}
        <nav style={styles.navRight}>
          {rightLinks.map((link) => (
            <Link key={link.label} href={link.href} style={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* HAMBURGER — mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.hamburger}
          aria-label="Toggle menu"
        >
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div style={styles.mobileDrawer}>
          <button
            onClick={() => setMenuOpen(false)}
            style={styles.closeBtn}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav style={styles.mobileNav}>
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
const leftLinks = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'Story',   href: '/story'   },
  { label: 'Menu',    href: '/menu'    },
];

const rightLinks = [
  { label: 'Order',    href: '/order'    },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog',     href: '/blog'     },
];

// ─── INLINE STYLES (matches Saqafat color theme) ─────────────────────────────
// Colors:
//   --gold:        #C9A84C
//   --gold-light:  #E8C97A
//   --cream:       #FAF6EE
//   --brown:       #3D2B1F
//   --char:        #1A0F08

const styles = {
  navLeft: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flex: 1,
  },
  navRight: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navLink: {
    fontSize: '13px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(250, 246, 238, 0.75)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
    // For hover: use CSS module or Tailwind (see note below)
  },
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '0 1rem',
  },
  logoMain: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    fontWeight: 900,
    color: '#C9A84C',
    letterSpacing: '0.05em',
    lineHeight: 1,
  },
  logoSub: {
    fontSize: '9px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#E8C97A',
    opacity: 0.8,
  },
  hamburger: {
    display: 'none',       // shown via media query in CSS module / Tailwind
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  hamburgerLine: {
    display: 'block',
    width: '22px',
    height: '2px',
    background: '#C9A84C',
    borderRadius: '2px',
  },
  mobileDrawer: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    background: 'rgba(26, 15, 8, 0.97)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  closeBtn: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    color: '#C9A84C',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  mobileNavLink: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#FAF6EE',
    textDecoration: 'none',
    letterSpacing: '0.05em',
  },
};
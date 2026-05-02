'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink { label: string; href: string; }

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

function LocationPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ── Animated nav link — center-out underline ──────────────────────────────────
function NavLink({
  href, label, isActive, solid,
}: { href: string; label: string; isActive: boolean; solid: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  // Text colour logic
  const color = active
    ? '#c77a3a'
    : solid
      ? 'rgba(250,240,228,0.82)'   // warm cream on brown bg
      : 'rgba(250,246,238,0.78)';  // cream on transparent

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color,
        paddingBottom: '3px',
        transition: 'color 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Right half — center → right edge */}
      <span style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        height: '1.5px',
        width: active ? '50%' : '0%',
        background: '#c77a3a',
        transition: 'width 0.26s ease',
        display: 'block',
      }} />
      {/* Left half — center → left edge */}
      <span style={{
        position: 'absolute',
        bottom: 0, right: '50%',
        height: '1.5px',
        width: active ? '50%' : '0%',
        background: '#c77a3a',
        transition: 'width 0.26s ease',
        display: 'block',
      }} />
    </Link>
  );
}

// ── Main Header ───────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // On hero page (/) — transparent until scrolled past hero
  // On other pages — always solid
  const isHome = pathname === '/';
  const solid = !isHome || scrolled;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

        /* ── Location pill ── */
        .sq-location-btn {
          display: flex; align-items: center; gap: 5px;
          background: none;
          border: 1px solid rgba(201,168,76,0.35);
          color: #c77a3a;
          border-radius: 20px;
          padding: 5px 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          white-space: nowrap;
        }
        .sq-location-btn:hover {
          background: rgba(201,168,76,0.12);
          border-color: #c77a3a;
          color: #c77a3a;
        }

        /* ── Hamburger ── */
        .sq-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none; border: none;
          cursor: pointer; padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .sq-hamburger:hover { background: rgba(201,168,76,0.1); }
        .sq-ham-line {
          display: block; width: 22px; height: 1.5px;
          background: #c77a3a; border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(2) { opacity: 0; }
        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .sq-drawer {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,10,6,0.97);
          backdrop-filter: blur(18px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          animation: sqFadeIn 0.22s ease;
        }
        @keyframes sqFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sq-drawer-link {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 7vw, 2.8rem);
          font-weight: 700;
          color: rgba(250,246,238,0.72);
          text-decoration: none;
          letter-spacing: 0.04em;
          padding: 0.5rem 1.2rem;
          transition: color 0.2s;
          animation: sqSlideUp 0.3s ease both;
        }
        .sq-drawer-link:hover { color: #c77a3a; }
        @keyframes sqSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sq-close-btn {
          position: absolute; top: 1.2rem; right: 1.2rem;
          background: none; border: 1px solid rgba(201,168,76,0.25);
          color: #c77a3a; width: 38px; height: 38px;
          border-radius: 50%; font-size: 0.9rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .sq-close-btn:hover { background: rgba(201,168,76,0.12); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
        
          .sq-nav-left, .sq-nav-right, .sq-loc-desktop { display: none !important; }
          .sq-hamburger { display: flex !important; }
          .sq-logo-pad { padding: 0 !important; }
        }
        @media (min-width: 769px) {
          .sq-hamburger { display: none !important; }
        }

        /* ── Logo hover ── */
        .sq-logo-link { text-decoration: none; transition: opacity 0.2s; }
        .sq-logo-link:hover { opacity: 0.82; }

        @media (prefers-reduced-motion: reduce) {
          .sq-drawer, .sq-drawer-link { animation: none !important;
          font-family: 'Amatic SC', cursive; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 36px)',

          // ← KEY: #67352c when solid, transparent on hero
          background: solid
            ? '#67352c'
            : 'transparent',

          // Bottom border — always visible on hero (transparent state), richer when solid
          borderBottom: solid
            ? '1px solid rgba(201,168,76,0.22)'
            : '1px solid rgba(201,168,76,0.28)',

          backdropFilter: solid ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(10px)' : 'none',

          transition: 'background 0.4s ease, border-color 0.35s ease',
        }}
      >
        {/* LEFT NAV */}
        <nav
          className="sq-nav-left"
          aria-label="Left navigation"
          style={{ display: 'flex', gap: 'clamp(18px, 3vw, 36px)', alignItems: 'center', flex: 1 }}
        >
          {leftLinks.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label}
              isActive={pathname === l.href} solid={solid} />
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link href="/" className="sq-logo-link sq-logo-pad"
          aria-label="Saqafat Bakery — home"
          style={{ padding: '0 clamp(12px, 2vw, 28px)', flexShrink: 0 }}>
          <Image
            src="/SaqafatLogo.png"
            alt="Saqafat Bakery & Cafe"
            width={200}
            height={80}
            priority
            style={{ objectFit: 'contain', display: 'block' }}
          />
        </Link>

        {/* RIGHT NAV + LOCATION */}
        <nav
          className="sq-nav-right"
          aria-label="Right navigation"
          style={{
            display: 'flex',
            gap: 'clamp(18px, 3vw, 36px)',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          {rightLinks.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label}
              isActive={pathname === l.href} solid={solid} />
          ))}
          <button
            className="sq-location-btn sq-loc-desktop"
            onClick={() => window.dispatchEvent(new CustomEvent('saqafat:open-funnel'))}
            aria-label="Change branch"
          >
            <LocationPinIcon />
            <span>Branch</span>
          </button>
        </nav>

        {/* HAMBURGER — mobile */}
        <button
          className="sq-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="sq-mobile-drawer"
        >
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
        </button>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div id="sq-mobile-drawer" className="sq-drawer"
          role="dialog" aria-modal="true" aria-label="Navigation menu">

          <button className="sq-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>

          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px', letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.6)',
            marginBottom: '2rem',
          }}>
            Saqafat
          </span>

          <nav aria-label="Mobile navigation"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {[...leftLinks, ...rightLinks].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="sq-drawer-link"
                aria-current={pathname === l.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  animationDelay: `${0.04 + i * 0.045}s`,
                  color: pathname === l.href ? '#c77a3a' : undefined,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{
            width: '40px', height: '1px',
            background: 'rgba(201,168,76,0.2)',
            margin: '1.6rem 0',
          }} />

          <button
            className="sq-location-btn"
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent('saqafat:open-funnel'));
            }}
          >
            <LocationPinIcon />
            <span style={{ display: 'inline' }}>Change Branch</span>
          </button>
        </div>
      )}
    </>
  );
}

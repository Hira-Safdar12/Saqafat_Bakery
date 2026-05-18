'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

const leftLinks: NavLink[] = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'Story', href: '/story' },
  { label: 'Menu', href: '/menu' },
];

const rightLinks: NavLink[] = [
  { label: 'Order', href: '/order' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
];

// ─────────────────────────────────────────────────────────────
// Location Icon
// ─────────────────────────────────────────────────────────────
function LocationPinIcon() {
  return (
    <svg
      width="16"
      height="16"
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

// ─────────────────────────────────────────────────────────────
// Animated Nav Link
// ─────────────────────────────────────────────────────────────
function NavItem({
  href,
  label,
  isActive,
  solid,
}: {
  href: string;
  label: string;
  isActive: boolean;
  solid: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const active = hovered || isActive;

  const color = active
    ? '#d89a5b'
    : solid
    ? 'rgba(250,240,228,0.84)'
    : 'rgba(255,255,255,0.92)';

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        transition: 'all 0.3s ease',
        transform: active ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {label}

      {/* Right underline */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: active ? '50%' : '0%',
          height: '1.5px',
          background: '#d89a5b',
          transition: 'width 0.25s ease',
        }}
      />

      {/* Left underline */}
      <span
        style={{
          position: 'absolute',
          right: '50%',
          bottom: 0,
          width: active ? '50%' : '0%',
          height: '1.5px',
          background: '#d89a5b',
          transition: 'width 0.25s ease',
        }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// Header Component
// ─────────────────────────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

  const solid = !isHome || scrolled;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

        /* ─────────────────────────────
           LOCATION BUTTON
        ───────────────────────────── */

        .sq-location-btn {
          display: flex;
          align-items: center;
          gap: 6px;

          padding: 7px 15px;

          border-radius: 999px;

          border: 1px solid rgba(216,154,91,0.35);

          background: rgba(255,255,255,0.03);

          backdrop-filter: blur(10px);

          color: #d89a5b;

          text-decoration: none;

          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;

          cursor: pointer;

          transition: all 0.3s ease;

          white-space: nowrap;
        }

        .sq-location-btn:hover {
          background: rgba(216,154,91,0.12);
          border-color: #d89a5b;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(216,154,91,0.12);
        }

        /* ─────────────────────────────
           HAMBURGER
        ───────────────────────────── */

        .sq-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;

          background: none;
          border: none;

          cursor: pointer;

          padding: 8px;

          z-index: 120;
        }

        .sq-ham-line {
          width: 24px;
          height: 1.5px;

          background: #ffffff;

          transition: all 0.3s ease;

          border-radius: 10px;
        }

        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(2) {
          opacity: 0;
        }

        .sq-hamburger[aria-expanded="true"] .sq-ham-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ─────────────────────────────
           MOBILE DRAWER
        ───────────────────────────── */

        .sq-drawer {
          position: fixed;
          inset: 0;

          background: rgba(20, 10, 8, 0.97);

          backdrop-filter: blur(20px);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          z-index: 110;

          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .sq-drawer-link {
          font-family: 'Playfair Display', serif;

          font-size: clamp(2rem, 8vw, 3rem);

          font-weight: 700;

          color: rgba(255,255,255,0.78);

          text-decoration: none;

          margin: 12px 0;

          transition: all 0.25s ease;
        }

        .sq-drawer-link:hover {
          color: #d89a5b;
          transform: translateY(-2px);
        }

        .sq-close-btn {
          position: absolute;

          top: 22px;
          right: 22px;

          width: 42px;
          height: 42px;

          border-radius: 50%;

          border: 1px solid rgba(216,154,91,0.25);

          background: transparent;

          color: #d89a5b;

          cursor: pointer;

          font-size: 1rem;

          transition: all 0.25s ease;
        }

        .sq-close-btn:hover {
          background: rgba(216,154,91,0.12);
        }

        /* ─────────────────────────────
           RESPONSIVE
        ───────────────────────────── */

        @media (max-width: 768px) {

          .sq-nav-left,
          .sq-nav-right {
            display: none !important;
          }

          .sq-hamburger {
            display: flex !important;
          }

          .sq-logo-wrap {
            padding: 0 !important;
          }
        }

        @media (min-width: 769px) {
          .sq-hamburger {
            display: none !important;
          }
        }
      `}</style>

      {/* ─────────────────────────────
         HEADER
      ───────────────────────────── */}

      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,

          height: '78px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          padding: '0 clamp(18px,4vw,40px)',

          zIndex: 100,

          // FULLY TRANSPARENT
          background: solid
            ? 'rgba(36,19,15,0.72)'
            : 'transparent',

          borderBottom: solid
            ? '1px solid rgba(216,154,91,0.12)'
            : '1px solid transparent',

          backdropFilter: solid ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',

          boxShadow: solid
            ? '0 8px 32px rgba(0,0,0,0.18)'
            : 'none',

          transition:
            'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* LEFT NAV */}
        <nav
          className="sq-nav-left"
          aria-label="Left navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(18px,3vw,38px)',
            flex: 1,
          }}
        >
          {leftLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
              solid={solid}
            />
          ))}
        </nav>

        {/* LOGO */}
        <Link
          href="/"
          aria-label="Saqafat Bakery Home"
          className="sq-logo-wrap"
          style={{
            padding: '0 clamp(10px,2vw,28px)',
            flexShrink: 0,
          }}
        >
          <Image
            src="/SaqafatLogo.png"
            alt="Saqafat Bakery"
            width={190}
            height={76}
            priority
            style={{
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* RIGHT NAV */}
        <nav
          className="sq-nav-right"
          aria-label="Right navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'clamp(18px,3vw,38px)',
            flex: 1,
          }}
        >
          {rightLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
              solid={solid}
            />
          ))}

          {/* GOOGLE MAPS LOCATION */}
          <a
            href="https://www.google.com/maps/place/Saqafat+Bakery+%26+Cafe/@32.0684797,72.6866995,17z/data=!3m1!4b1!4m6!3m5!1s0x39217738f913083f:0x38c2bf14418c25d5!8m2!3d32.0684797!4d72.6866995!16s%2Fg%2F11jl2hkfbq?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="sq-location-btn"
            aria-label="Open Saqafat Bakery branch location"
          >
            <LocationPinIcon />
            <span>Location</span>
          </a>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          className="sq-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
          <span className="sq-ham-line" />
        </button>
      </header>

      {/* ─────────────────────────────
         MOBILE DRAWER
      ───────────────────────────── */}

      {menuOpen && (
        <div
          className="sq-drawer"
          role="dialog"
          aria-modal="true"
        >
          {/* CLOSE BUTTON */}
          <button
            className="sq-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            ✕
          </button>

          {/* NAV LINKS */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sq-drawer-link"
                onClick={() => setMenuOpen(false)}
                style={{
                  color:
                    pathname === link.href
                      ? '#d89a5b'
                      : undefined,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* DIVIDER */}
          <div
            style={{
              width: '50px',
              height: '1px',
              background: 'rgba(216,154,91,0.25)',
              margin: '28px 0',
            }}
          />

          {/* MOBILE LOCATION */}
          <a
            href="https://www.google.com/maps/place/Saqafat+Bakery+%26+Cafe/@32.0684797,72.6866995,17z/data=!3m1!4b1!4m6!3m5!1s0x39217738f913083f:0x38c2bf14418c25d5!8m2!3d32.0684797!4d72.6866995!16s%2Fg%2F11jl2hkfbq?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="sq-location-btn"
            onClick={() => setMenuOpen(false)}
          >
            <LocationPinIcon />
            <span>View Location</span>
          </a>
        </div>
      )}
    </>
  );
}
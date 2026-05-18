'use client';

import React, { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Animated Footer Link
// ─────────────────────────────────────────────────────────────

function FooterLink({
  label,
  href = '#',
}: {
  label: string;
  href?: string;
}) {
  const [hovered, setHovered] =
    useState(false);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (href.startsWith('/#')) {
      e.preventDefault();

      const id = href.replace('/#', '');

      const section =
        document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-block',

        color: hovered
          ? '#D89A5B'
          : '#F6EBDD',

        textDecoration: 'none',

        fontSize: '0.93rem',

        fontFamily:
          'Cormorant Garamond, serif',

        letterSpacing: '0.02em',

        transition: 'all 0.3s ease',

        transform: hovered
          ? 'translateX(5px)'
          : 'translateX(0)',

        opacity: hovered ? 1 : 0.85,

        paddingBottom: '3px',

        width: 'fit-content',
      }}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      {label}

      <span
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,

          width: hovered ? '50%' : '0%',

          height: '1px',

          background: '#D89A5B',

          transition:
            'width 0.28s ease',
        }}
      />

      <span
        style={{
          position: 'absolute',
          right: '50%',
          bottom: 0,

          width: hovered ? '50%' : '0%',

          height: '1px',

          background: '#D89A5B',

          transition:
            'width 0.28s ease',
        }}
      />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// Social Icon
// ─────────────────────────────────────────────────────────────

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: '42px',
        height: '42px',

        borderRadius: '50%',

        background: hovered
          ? 'rgba(216,154,91,0.18)'
          : 'rgba(255,255,255,0.06)',

        color: hovered
          ? '#D89A5B'
          : '#f5ede4',

        transition: 'all 0.3s ease',

        transform: hovered
          ? 'translateY(-4px) scale(1.08)'
          : 'scale(1)',

        border:
          '1px solid rgba(255,255,255,0.1)',

        backdropFilter: 'blur(10px)',

        flexShrink: 0,
      }}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      {children}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// Accordion Section
// ─────────────────────────────────────────────────────────────

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div
      style={{
        borderBottom:
          '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',

          display: 'flex',

          justifyContent:
            'space-between',

          alignItems: 'center',

          padding: '18px 0',

          background: 'none',

          border: 'none',

          cursor: 'pointer',

          color: '#D89A5B',

          fontFamily:
            'Cormorant Garamond, serif',

          fontSize: '0.82rem',

          fontWeight: 700,

          letterSpacing: '0.14em',

          textTransform: 'uppercase',

          textAlign: 'left',
        }}
      >
        {title}

        <span
          style={{
            display: 'flex',

            alignItems: 'center',

            justifyContent: 'center',

            width: '28px',
            height: '28px',

            flexShrink: 0,

            color: '#D89A5B',

            transition:
              'transform 0.3s ease',

            transform: open
              ? 'rotate(45deg)'
              : 'rotate(0deg)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
            />

            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
          </svg>
        </span>
      </button>

      <div
        style={{
          maxHeight: open
            ? '500px'
            : '0',

          overflow: 'hidden',

          transition:
            'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div
          style={{
            paddingBottom: '18px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────────────────────

export default function Footer() {

  const [isMobile, setIsMobile] =
    useState(false);

  const [isTablet, setIsTablet] =
    useState(false);

  useEffect(() => {

    const check = () => {

      const w = window.innerWidth;

      setIsMobile(w <= 640);

      setIsTablet(
        w > 640 && w <= 1024
      );
    };

    check();

    window.addEventListener(
      'resize',
      check
    );

    return () =>
      window.removeEventListener(
        'resize',
        check
      );

  }, []);

  const linkListStyle: React.CSSProperties = {
    listStyle: 'none',

    padding: 0,

    margin: 0,

    display: 'flex',

    flexDirection: 'column',

    gap: '13px',
  };

  const colHeadingStyle: React.CSSProperties = {
    color: '#D89A5B',

    fontSize: '0.82rem',

    fontWeight: 700,

    letterSpacing: '0.14em',

    textTransform: 'uppercase',

    margin: 0,

    marginBottom: '18px',

    fontFamily:
      'Cormorant Garamond, serif',
  };

  // ── MOBILE ─────────────────────────────

  if (isMobile) {
    return (
      <footer style={s.footer}>

        <style>{googleFonts}</style>

        <div style={s.footerGlow} />

        <div
          style={{
            padding:
              '36px 24px 0',
          }}
        >

          <AccordionSection title="Company">
            <ul style={linkListStyle}>
              <li><FooterLink label="About" href="/#about" /></li>
              <li><FooterLink label="Story" href="/story" /></li>
              <li><FooterLink label="Careers" href="/careers" /></li>
              <li><FooterLink label="Press" href="/press" /></li>
            </ul>
          </AccordionSection>

          <AccordionSection title="Legal">
            <ul style={linkListStyle}>
              <li><FooterLink label="Privacy Policy" href="/privacy-policy" /></li>
              <li><FooterLink label="Terms of Service" href="/terms-of-service" /></li>
              <li><FooterLink label="Refund Policy" href="/refund-policy" /></li>
            </ul>
          </AccordionSection>

          <AccordionSection title="Support">
            <ul style={linkListStyle}>
              <li><FooterLink label="Contact Us" href="/reviews" /></li>
              <li><FooterLink label="Feedback" href="/reviews" /></li>
              <li><FooterLink label="Report an Issue" href="/report-issue" /></li>
            </ul>
          </AccordionSection>

          <AccordionSection title="Contact Us">
            <ul style={linkListStyle}>
              <li>
                <div style={s.contactRow}>
                  <span style={s.contactIcon}>
                    <PinIcon />
                  </span>

                  <span style={s.contactText}>
                    Plot # 253–A, Street # 06
                    <br />
                    Rawalpindi, Pakistan
                  </span>
                </div>
              </li>

              <li>
                <a
                  href="mailto:info@saqafatbakery.com"
                  style={s.contactLink}
                >
                  <span style={s.contactIcon}>
                    <MailIcon />
                  </span>

                  info@saqafatbakery.com
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.contactLink}
                >
                  <span style={s.contactIcon}>
                    <WhatsAppIcon />
                  </span>

                  +92 300 1234567
                </a>
              </li>
            </ul>
          </AccordionSection>

        </div>

        {/* SOCIAL */}

        <div
          style={{
            padding:
              '28px 24px 32px',
          }}
        >
          <p
            style={{
              color: '#D89A5B',

              fontSize: '0.82rem',

              fontWeight: 700,

              letterSpacing: '0.14em',

              textTransform: 'uppercase',

              margin:
                '0 0 16px 0',

              fontFamily:
                'Cormorant Garamond, serif',
            }}
          >
            Social Media
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <SocialIcons />
          </div>
        </div>

        <FooterBottom />

      </footer>
    );
  }

  // ── TABLET ─────────────────────────────

  if (isTablet) {
    return (
      <footer style={s.footer}>

        <style>{googleFonts}</style>

        <div style={s.footerGlow} />

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              '1fr 1fr',

            gap: '28px',

            maxWidth: '1200px',

            margin: '0 auto',

            padding:
              '42px 32px 20px',
          }}
        >

          <div>
            <img
              src="/SaqafatLogo.png"
              alt="Saqafat Bakery"
              style={{
                width: '150px',
                objectFit: 'contain',
              }}
            />

            <div
              style={{
                marginTop: '24px',
              }}
            >
              <p style={colHeadingStyle}>
                Social Media
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <SocialIcons />
              </div>
            </div>
          </div>

          <div style={s.card}>
            <p style={colHeadingStyle}>
              Company
            </p>

            <ul style={linkListStyle}>
              <li><FooterLink label="About" href="/#about" /></li>
              <li><FooterLink label="Story" href="/story" /></li>
              <li><FooterLink label="Careers" href="/careers" /></li>
              <li><FooterLink label="Press" href="/press" /></li>
            </ul>
          </div>

          <div style={s.card}>
            <p style={colHeadingStyle}>
              Legal
            </p>

            <ul style={linkListStyle}>
              <li><FooterLink label="Privacy Policy" href="/privacy-policy" /></li>
              <li><FooterLink label="Terms of Service" href="/terms-of-service" /></li>
              <li><FooterLink label="Refund Policy" href="/refund-policy" /></li>
            </ul>
          </div>

          <div style={s.card}>
            <p style={colHeadingStyle}>
              Contact Us
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >

              <div style={s.contactRow}>
                <span style={s.contactIcon}>
                  <PinIcon />
                </span>

                <span style={s.contactText}>
                  Plot # 253–A, Street # 06
                  <br />
                  Rawalpindi, Pakistan
                </span>
              </div>

              <a
                href="mailto:info@saqafatbakery.com"
                style={s.contactLink}
              >
                <span style={s.contactIcon}>
                  <MailIcon />
                </span>

                info@saqafatbakery.com
              </a>

              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                style={s.contactLink}
              >
                <span style={s.contactIcon}>
                  <WhatsAppIcon />
                </span>

                +92 300 1234567
              </a>

            </div>
          </div>

        </div>

        <FooterBottom />

      </footer>
    );
  }

  // ── DESKTOP ────────────────────────────

  return (
    <footer style={s.footer}>

      <style>{googleFonts}</style>

      <div style={s.footerGlow} />

      <div
        style={{
          ...s.grid,

          gridTemplateColumns:
            '1.2fr 1fr 1fr 1fr 1.3fr',
        }}
      >

        {/* LOGO */}

        <div
          style={{
            display: 'flex',

            flexDirection: 'column',

            alignItems: 'flex-start',

            justifyContent: 'flex-start',
          }}
        >

          <img
            src="/SaqafatLogo.png"
            alt="Saqafat Bakery"
            style={{
              width: '150px',
              objectFit: 'contain',
            }}
          />

          {/* SOCIAL */}

          <div
            style={{
              marginTop: '28px',

              display: 'flex',

              flexDirection: 'column',

              alignItems: 'flex-start',
            }}
          >

            <p style={colHeadingStyle}>
              Social Media
            </p>

            <div
              style={{
                display: 'flex',

                gap: '12px',

                marginTop: '14px',
              }}
            >
              <SocialIcons />
            </div>

          </div>

        </div>

        {/* COMPANY */}

        <div style={s.card}>

          <p style={colHeadingStyle}>
            Company
          </p>

          <ul style={linkListStyle}>
            <li><FooterLink label="About" href="/#about" /></li>
            <li><FooterLink label="Story" href="/story" /></li>
            <li><FooterLink label="Careers" href="/careers" /></li>
            <li><FooterLink label="Press" href="/press" /></li>
          </ul>

        </div>

        {/* LEGAL */}

        <div style={s.card}>

          <p style={colHeadingStyle}>
            Legal
          </p>

          <ul style={linkListStyle}>
            <li><FooterLink label="Privacy Policy" href="/privacy-policy" /></li>
            <li><FooterLink label="Terms of Service" href="/terms-of-service" /></li>
            <li><FooterLink label="Refund Policy" href="/refund-policy" /></li>
          </ul>

        </div>

        {/* SUPPORT */}

        <div style={s.card}>

          <p style={colHeadingStyle}>
            Support
          </p>

          <ul style={linkListStyle}>
            <li><FooterLink label="Contact Us" href="/reviews" /></li>
            <li><FooterLink label="Feedback" href="/reviews" /></li>
            <li><FooterLink label="Report an Issue" href="/report-issue" /></li>
          </ul>

        </div>

        {/* CONTACT */}

        <div style={s.card}>

          <p style={colHeadingStyle}>
            Contact Us
          </p>

          <div
            style={{
              display: 'flex',

              flexDirection: 'column',

              gap: '15px',
            }}
          >

            <div style={s.contactRow}>
              <span style={s.contactIcon}>
                <PinIcon />
              </span>

              <span style={s.contactText}>
                Plot # 253–A, Street # 06
                <br />
                Rawalpindi, Pakistan
              </span>
            </div>

            <a
              href="mailto:info@saqafatbakery.com"
              style={s.contactLink}
            >
              <span style={s.contactIcon}>
                <MailIcon />
              </span>

              info@saqafatbakery.com
            </a>

            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              style={s.contactLink}
            >
              <span style={s.contactIcon}>
                <WhatsAppIcon />
              </span>

              +92 300 1234567
            </a>

          </div>

        </div>

      </div>

      <FooterBottom />

    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared Components
// ─────────────────────────────────────────────────────────────

function SocialIcons() {
  return (
    <>
      <SocialIcon
        href="https://www.facebook.com/saqafatbakery/?locale=en_GB"
        label="Facebook"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </SocialIcon>

      <SocialIcon
        href="https://www.instagram.com/saqafatbakery/"
        label="Instagram"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          width="18"
          height="18"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
          />

          <circle
            cx="12"
            cy="12"
            r="4"
          />

          <circle
            cx="17.5"
            cy="6.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </SocialIcon>

      <SocialIcon
        href="https://www.tiktok.com/@saqafatbakery"
        label="TikTok"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
        </svg>
      </SocialIcon>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer Bottom
// ─────────────────────────────────────────────────────────────

function FooterBottom() {
  return (
    <>
      <div
        style={{
          height: '1px',

          background:
            'rgba(255,255,255,0.08)',

          margin: '18px 40px 0',
        }}
      />

      <div
        style={{
          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',

          padding: '14px 20px 4px',
        }}
      >

        <h2
          style={{
            margin: 0,

            fontSize:
              'clamp(1.4rem, 4vw, 3.2rem)',

            letterSpacing: '.18em',

            textTransform: 'uppercase',

            color: '#D89A5B',

            opacity: 0.5,

            fontWeight: 600,

            userSelect: 'none',

            fontFamily:
              'Cormorant Garamond, serif',
          }}
        >
          RSI STUDIO
        </h2>

      </div>

      <div
        style={{
          display: 'flex',

          justifyContent: 'center',

          padding: '4px 20px 18px',
        }}
      >

        <p
          style={{
            margin: 0,

            textAlign: 'center',

            color:
              'rgba(255,255,255,0.4)',

            fontSize: '0.74rem',

            letterSpacing: '0.04em',

            fontFamily:
              'Cormorant Garamond, serif',
          }}
        >
          Copyright © {new Date().getFullYear()} Saqafat Bakery. All rights reserved.
        </p>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="17"
      height="17"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle
        cx="12"
        cy="10"
        r="3"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="17"
      height="17"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="17"
      height="17"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────

const googleFonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');

html {
  scroll-behavior: smooth;
}
`;

const s: any = {

  footer: {
    position: 'relative',

    overflow: 'hidden',

    background: `
      radial-gradient(circle at top left, rgba(216,154,91,0.08), transparent 25%),
      radial-gradient(circle at bottom right, rgba(255,255,255,0.03), transparent 30%),
      #24130f
    `,

    color: '#fdf7ef',

    fontFamily:
      'Cormorant Garamond, serif',
  },

  footerGlow: {
    position: 'absolute',

    top: '-180px',
    right: '-100px',

    width: '500px',
    height: '500px',

    background:
      'rgba(216,154,91,0.08)',

    filter: 'blur(120px)',

    pointerEvents: 'none',

    zIndex: 0,
  },

  grid: {
    display: 'grid',

    gap: '22px',

    maxWidth: '1320px',

    margin: '0 auto',

    padding: '42px 40px 20px',

    alignItems: 'flex-start',

    position: 'relative',

    zIndex: 1,
  },

  card: {},

  contactRow: {
    display: 'flex',

    alignItems: 'flex-start',

    gap: '12px',

    color: '#D8C9B6',

    lineHeight: 1.7,

    fontSize: '0.9rem',
  },

  contactLink: {
    display: 'flex',

    alignItems: 'center',

    gap: '12px',

    color: '#D8C9B6',

    textDecoration: 'none',

    fontSize: '0.9rem',

    transition: 'all 0.3s ease',

    fontFamily:
      'Cormorant Garamond, serif',
  },

  contactIcon: {
    color: '#D89A5B',

    flexShrink: 0,
  },

  contactText: {
    lineHeight: 1.7,

    fontFamily:
      'Cormorant Garamond, serif',

    fontSize: '0.9rem',

    color: '#D8C9B6',
  },
};
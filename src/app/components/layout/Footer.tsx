'use client';

import React, { useState } from 'react';

// ── Animated underline link ────────────────────────────────────────────────────
function FooterLink({ label, href = '#' }: { label: string; href?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: hovered ? '#C97B3A' : '#fff7ec',
        textDecoration: 'none',
        fontSize: '0.92rem',
        fontFamily: ' serif',
        letterSpacing: '0.01em',
        transition: 'color 0.85s ease',
        paddingBottom: '2px',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Right half — expands from center to right */}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        height: '1.5px',
        width: hovered ? '50%' : '0%',
        background: '#C97B3A',
        transition: 'width 0.28s ease',
        display: 'block',
      }} />
      {/* Left half — expands from center to left */}
      <span style={{
        position: 'absolute',
        bottom: 0,
        right: '50%',
        height: '1.5px',
        width: hovered ? '50%' : '0%',
        background: '#C97B3A',
        transition: 'width 0.28s ease',
        display: 'block',
      }} />
    </a>
  );
}

// ── Social icon with scale ─────────────────────────────────────────────────────
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
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
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'rgba(242, 230, 221, 0.28)',
        color: hovered ? '#C97B3A' : '#f1ece3',
        textDecoration: 'none',
        transition: 'transform 0.22s ease, color 0.22s ease, background 0.22s ease',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ── Newsletter ─────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div>
      <p style={s.colHeading}>Stay Hungry for Updates</p>
      <p style={s.newsletterSub}>Fresh deals & stories — straight to your inbox.</p>
      {submitted ? (
        <p style={{ color: '#8fbc6e', fontSize: '0.82rem', marginTop: '10px' }}>
          ✓ You're subscribed! Welcome to the family.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '12px' }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={s.nlInput}
          />
          <button type="submit" style={s.nlBtn} className="nl-btn">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={s.footer}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');
        .nl-btn:hover { background: #A0673A !important; }
        input[type=email]::placeholder { color: rgba(168,152,128,0.5); }
        input[type=email]:focus { outline: none; border-color: rgba(201,123,58,0.55) !important; }
      `}</style>

      {/* ── MAIN GRID ── */}
      <div style={s.grid}>

        {/* COL 1: Logo + Social */}
        <div style={s.logoCol}>
          {/* Replace src with your own logo */}
          <img
            src="SaqafatLogo.png"
            alt="Saqafat Bakery"
            style={s.logo}
          />

          <p style={{ ...s.colHeading, marginTop: '1px' }}>Social Media</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            {/* Facebook */}
            <SocialIcon href="https://www.facebook.com/saqafatbakery/?locale=en_GB" label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialIcon>
            {/* Instagram */}
            <SocialIcon href="https://www.instagram.com/saqafatbakery/" label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            {/* TikTok */}
            <SocialIcon href="https://www.tiktok.com/@saqafatbakery" label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* COL 2: Company */}
        <div style={s.linkCol}>
          <p style={s.colHeading}>Company</p>
          <ul style={s.list}>
            {['About', 'Story', 'Careers', 'Press'].map((l) => (
              <li key={l}><FooterLink label={l} /></li>
            ))}
          </ul>
        </div>

        {/* COL 3: Legal */}
        <div style={s.linkCol}>
          <p style={s.colHeading}>Legal</p>
          <ul style={s.list}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <li key={l}><FooterLink label={l} /></li>
            ))}
          </ul>
        </div>

        {/* COL 4: Support */}
        <div style={s.linkCol}>
          <p style={s.colHeading}>Support</p>
          <ul style={s.list}>
            {['Contact Us', 'Feedback', 'Report an Issue'].map((l) => (
              <li key={l}><FooterLink label={l} /></li>
            ))}
          </ul>
        </div>

        {/* COL 5: Contact + Newsletter */}
        <div style={s.contactCol}>
          <p style={s.colHeading}>Contact Us</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>

            {/* Address */}
            <div style={s.contactRow}>
              <span style={s.contactIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span style={s.contactText}>
                Plot # 253–A, Street # 06,<br />Rawalpindi, Pakistan
              </span>
            </div>

            {/* Email */}
            <a href="mailto:info@saqafatbakery.com" style={s.contactLink} className="contact-link">
              <span style={s.contactIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              info@saqafatbakery.com
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/92XXXXXXXXX" target="_blank" rel="noopener noreferrer" style={s.contactLink}>
              <span style={s.contactIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </span>
              +92 XXX XXXXXXX
            </a>
          </div>

          {/* Newsletter */}
          <div style={{ marginTop: '28px' }}>
            <Newsletter />
          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={s.divider} />

      {/* ── COPYRIGHT ── */}
      <div style={s.bottomBar}>
        <p style={s.copyright}>
          Copyright ©{new Date().getFullYear()} All rights reserved | Saqafat Bakery
        </p>
      </div>

      
    </footer>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const s: any = {
  footer: {
    background: '#35201a',          // matches Monal dark-grey
    color: '#fdf7ef',
    fontFamily: 'Georgia, serif',
    paddingTop: '48px',
    overflow: 'hidden',
  },

  grid: {
    display: 'flex',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px 48px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  logoCol: {
    flex: '0 0 170px',
    minWidth: '150px',
  },

  logo: {
    width: '160px',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
  },

  linkCol: {
    flex: '0 0 130px',
    minWidth: '110px',
  },

  contactCol: {
    flex: 1,
    minWidth: '240px',
  },

  colHeading: {
    color: '#C97B3A',
    fontSize: '0.92rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    fontFamily: 'Georgia, serif',
    margin: '0 0 14px 0',
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  contactRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    color: '#A89880',
    fontSize: '0.85rem',
    lineHeight: 1.55,
  },

  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#A89880',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s ease',
  },

  contactIcon: {
    color: '#C97B3A',
    flexShrink: 0,
    lineHeight: 1,
  },

  contactText: {
    fontSize: '0.85rem',
    lineHeight: 1.55,
  },

  // Newsletter
  newsletterSub: {
    fontSize: '0.77rem',
    color: 'rgba(168,152,128,0.65)',
    margin: '4px 0 0',
    lineHeight: 1.5,
  },

  nlInput: {
    flex: 1,
    padding: '9px 12px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(201,123,58,0.3)',
    borderRight: 'none',
    borderRadius: '5px 0 0 5px',
    color: '#E8C99A',
    fontSize: '0.8rem',
    fontFamily: 'Georgia, serif',
    minWidth: 0,
  },

  nlBtn: {
    padding: '9px 16px',
    background: '#C97B3A',
    color: '#fff',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontFamily: 'Georgia, serif',
    transition: 'background 0.2s ease',
    whiteSpace: 'nowrap',
  },

  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    margin: '0 48px',
  },

  bottomBar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '18px 48px 10px',
  },

  copyright: {
    fontSize: '0.78rem',
    color: 'rgba(168,152,128,0.6)',
    letterSpacing: '0.03em',
    margin: 0,
    textAlign: 'center',
  },

  
}; 
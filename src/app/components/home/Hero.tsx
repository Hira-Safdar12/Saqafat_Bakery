'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const scrollRef = useRef(null);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section style={styles.hero}>

      {/* BACKGROUND LAYERS */}
      <div style={styles.heroBg} />
      <div style={styles.heroPattern} />
      <div style={styles.heroGlow} />

      {/* MAIN CONTENT */}
      <div style={styles.heroContent}>

        {/* Badge */}
        <div style={styles.badge}>
          Authentic Pakistani Flavors Since 2009
        </div>

        {/* Headline */}
        <h1 style={styles.h1}>
          Saqafatify <br />
          <span style={styles.h1Gold}>Your Tastebuds</span>
        </h1>

        {/* Subheadline */}
        <p style={styles.sub}>
          Baked with love. Served with soul. <br />
          From our kitchen to your table — every bite tells a story.
        </p>

        {/* CTA Buttons */}
        <div style={styles.btnRow}>
          <Link href="/order" style={styles.btnPrimary}>
            Order Now
          </Link>
          <Link href="/menu" style={styles.btnOutline}>
            Explore Menu
          </Link>
        </div>

      </div>

      {/* SCROLL CUE */}
      <button onClick={handleScrollDown} style={styles.scrollCue}>
        <span style={styles.scrollLabel}>Scroll</span>
        <span style={styles.scrollArrow} />
      </button>

    </section>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    position:       'relative',
    height:         '100vh',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    overflow:       'hidden',
  },

  // Dark warm gradient background
  heroBg: {
    position:   'absolute',
    inset:       0,
    background: 'linear-gradient(135deg, #1A0F08 0%, #3D2B1F 40%, #2A1810 100%)',
  },

  // Subtle diagonal pattern overlay
  heroPattern: {
    position:        'absolute',
    inset:            0,
    opacity:          0.06,
    backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
    backgroundSize:  '20px 20px',
  },

  // Radial gold glow in center
  heroGlow: {
    position:     'absolute',
    width:        '600px',
    height:       '600px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
    top:          '50%',
    left:         '50%',
    transform:    'translate(-50%, -50%)',
  },

  heroContent: {
    position:   'relative',
    textAlign:  'center',
    maxWidth:   '780px',
    padding:    '0 2rem',
    animation:  'fadeUp 0.8s ease both',
  },

  badge: {
    display:       'inline-block',
    fontSize:      '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color:         '#C9A84C',
    border:        '1px solid rgba(201, 168, 76, 0.4)',
    padding:       '6px 18px',
    borderRadius:  '20px',
    marginBottom:  '1.5rem',
  },

  h1: {
    fontFamily:   "'Playfair Display', serif",
    fontSize:     'clamp(2.8rem, 7vw, 5.5rem)',
    fontWeight:    900,
    lineHeight:    1.1,
    color:        '#FAF6EE',
    marginBottom: '1rem',
  },

  h1Gold: {
    color: '#C9A84C',
  },

  sub: {
    fontSize:     'clamp(1rem, 2vw, 1.2rem)',
    color:        'rgba(250, 246, 238, 0.6)',
    fontWeight:    300,
    lineHeight:    1.7,
    marginBottom: '2.5rem',
    fontFamily:   "'DM Sans', sans-serif",
  },

  btnRow: {
    display:        'flex',
    gap:            '1rem',
    justifyContent: 'center',
    flexWrap:       'wrap',
  },

  btnPrimary: {
    background:     '#C9A84C',
    color:          '#3D2B1F',
    fontWeight:      600,
    fontSize:       '13px',
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    padding:        '14px 32px',
    borderRadius:   '4px',
    textDecoration: 'none',
    display:        'inline-block',
    transition:     'background 0.2s, transform 0.2s',
  },

  btnOutline: {
    background:     'transparent',
    color:          '#FAF6EE',
    fontWeight:      500,
    fontSize:       '13px',
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    padding:        '14px 32px',
    border:         '1px solid rgba(250, 246, 238, 0.3)',
    borderRadius:   '4px',
    textDecoration: 'none',
    display:        'inline-block',
    transition:     'border-color 0.2s, color 0.2s',
  },

  scrollCue: {
    position:       'absolute',
    bottom:         '2rem',
    left:           '50%',
    transform:      'translateX(-50%)',
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '8px',
    background:     'none',
    border:         'none',
    cursor:         'pointer',
    padding:         0,
  },

  scrollLabel: {
    fontSize:      '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color:         'rgba(250, 246, 238, 0.4)',
    fontFamily:    "'DM Sans', sans-serif",
  },

  scrollArrow: {
    display:      'block',
    width:        '12px',
    height:       '12px',
    borderRight:  '1.5px solid rgba(201, 168, 76, 0.5)',
    borderBottom: '1.5px solid rgba(201, 168, 76, 0.5)',
    transform:    'rotate(45deg)',
    animation:    'bounce 1.5s infinite',
  },
};
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Item {
  name: string;
  price: string;
  img: string;
  badge?: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const items: Item[] = [
  { name: 'Steaks',  price: 'From PKR 1,200', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop', badge: 'Bestseller' },
  { name: 'Croissant',       price: 'From PKR 250',   img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { name: 'Soup',          price: 'From PKR 350',   img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', badge: 'Most Loved' },
  { name: 'Brownies',        price: 'From PKR 400',   img: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=400&h=300&fit=crop' },
  { name: 'Cupcakes',        price: 'From PKR 300',   img: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop' },
  { name: 'Tea Cake',        price: 'From PKR 450',   img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop' },
  { name: 'Cookies',         price: 'From PKR 200',   img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop' },
  { name: 'Macarons',        price: 'From PKR 600',   img: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop' },
  { name: 'Pizza',          price: 'From PKR 350',   img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
  { name: 'Puff',            price: 'From PKR 280',   img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop' },
  { name: 'Sandwich',        price: 'From PKR 500',   img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
  { name: 'Noodles',           price: 'From PKR 320',   img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop' },
];

// ─── COLOR TOKENS (matching About section) ────────────────────────────────────
// bg:            #FFFBF3  warm cream  (same as About section bg)
// heading:       #1E0F06  espresso
// accent:        #C97B3A  terracotta-gold
// accent-deep:   #5C2E0E  deep brown
// accent-mid:    #A0673A  mid brown
// card-bg:       #FFF8EC  warm white
// card-border:   rgba(92,46,14,0.10)
// card-shadow:   rgba(180,80,20,0.14)
// text-body:     #5A3E2B
// text-muted:    #9a7055
// cream:         #FAF6EE

export default function TopSellers() {
  const router      = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const angleRef    = useRef(0);
  const isPaused    = useRef(false);
  const rafId       = useRef<number>(0);
  const reducedMotion = useRef(false);

  // Track which card is hovered (for visual highlight without breaking 3D)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion (SRS §4.3)
    reducedMotion.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion.current) return; // skip animation entirely

    const SPEED = 0.12; // degrees per frame

    const rotate = () => {
      if (!isPaused.current && carouselRef.current) {
        angleRef.current += SPEED;
        carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      rafId.current = requestAnimationFrame(rotate);
    };

    rafId.current = requestAnimationFrame(rotate);

    // ── FIX: cancel rAF on unmount to prevent memory leak ──
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Pause carousel when mouse is anywhere over the wrapper
  const handleWrapperEnter = () => { isPaused.current = true;  };
  const handleWrapperLeave = () => { isPaused.current = false; };

  const handleCardClick = (item: Item) => {
    router.push(`/menu?item=${encodeURIComponent(item.name)}`);
  };

  // Keyboard handler for accessibility (SRS §4.3)
  const handleCardKey = (e: React.KeyboardEvent, item: Item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(item);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        /* Section reveal */
        @keyframes ts-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .ts-title-wrap { animation: ts-fadeUp 0.7s ease 0.1s both; }
        .ts-carousel    { animation: ts-fadeUp 0.7s ease 0.3s both; }
        .ts-cta-wrap    { animation: ts-fadeUp 0.7s ease 0.5s both; }

        /* Card: scale via CSS class — does NOT mutate the 3D transform string */
        .ts-card {
          position:      absolute;
          width:         220px;
          height:        290px;
          background:    #FFF8EC;
          border-radius: 14px;
          overflow:      hidden;
          cursor:        pointer;
          box-shadow:    0 16px 48px rgba(180,80,20,0.14), 0 2px 8px rgba(92,46,14,0.08);
          border:        1px solid rgba(92,46,14,0.10);
          /* transition only box-shadow & filter — NOT transform, so 3D stays intact */
          transition:    box-shadow 0.3s ease, filter 0.3s ease;
          outline:       none;
        }
        .ts-card:hover,
        .ts-card:focus-visible {
          box-shadow: 0 24px 64px rgba(180,80,20,0.28), 0 4px 16px rgba(92,46,14,0.12);
          filter:     brightness(1.03);
        }
        .ts-card:focus-visible {
          outline: 2px solid #C97B3A;
          outline-offset: 3px;
        }

        /* View All button */
        .ts-btn {
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             10px;
          overflow:        hidden;
          background:      linear-gradient(135deg, #5C2E0E 0%, #A0673A 100%);
          color:           #FAF6EE;
          border:          none;
          border-radius:   50px;
          padding:         13px 32px;
          cursor:          pointer;
          font-family:     'DM Sans', sans-serif;
          font-size:       13px;
          font-weight:     600;
          letter-spacing:  0.1em;
          text-transform:  uppercase;
          box-shadow:      0 6px 24px rgba(92,46,14,0.30);
          transition:      transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
        }
        .ts-btn:hover {
          transform:  translateY(-3px);
          box-shadow: 0 12px 36px rgba(92,46,14,0.40);
          background: linear-gradient(135deg, #7a3e18 0%, #C97B3A 100%);
        }
        .ts-btn:active  { transform: translateY(0); }
        .ts-btn:focus-visible {
          outline: 2px solid #C97B3A;
          outline-offset: 4px;
        }
        .ts-btn-arrow {
          font-size:  1.1rem;
          transition: transform 0.3s ease;
        }
        .ts-btn:hover .ts-btn-arrow { transform: translateX(4px); }

        /* Shine sweep on button */
        .ts-btn-shine {
          position:   absolute;
          top:        0;
          left:       -70%;
          width:      45%;
          height:     100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
          transform:  skewX(-20deg);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .ts-btn:hover .ts-btn-shine { left: 130%; }

        /* Static grid for reduced-motion users */
        .ts-static-grid {
          display:               grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap:                   20px;
          max-width:             1100px;
          margin:                0 auto;
          padding:               0 2rem;
        }
        .ts-static-card {
          background:    #FFF8EC;
          border-radius: 14px;
          overflow:      hidden;
          border:        1px solid rgba(92,46,14,0.10);
          box-shadow:    0 8px 24px rgba(180,80,20,0.10);
          cursor:        pointer;
          transition:    box-shadow 0.25s, transform 0.25s;
          outline:       none;
        }
        .ts-static-card:hover,
        .ts-static-card:focus-visible {
          box-shadow: 0 16px 40px rgba(180,80,20,0.20);
          transform:  translateY(-4px);
        }
        .ts-static-card:focus-visible {
          outline: 2px solid #C97B3A;
          outline-offset: 3px;
        }

        @media (max-width: 768px) {
          .ts-carousel-wrap { display: none !important; }
          .ts-static-grid   { display: grid !important; }
          .ts-title-wrap h2 { font-size: 2rem !important; }
        }

        @media (min-width: 769px) {
          .ts-static-grid { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-title-wrap, .ts-carousel, .ts-cta-wrap {
            animation: none !important;
            opacity:   1 !important;
          }
          .ts-carousel-wrap { display: none !important; }
          .ts-static-grid   { display: grid !important; }
        }
      `}</style>

      <section
        style={{
          position:   'relative',
          background: '#FFFBF3',       // ← matches About section bg
          padding:    '100px 0 110px',
          overflow:   'hidden',
          fontFamily: "'DM Sans', sans-serif",
        }}
        aria-labelledby="ts-heading"
      >

        {/* ── BG BLOBS (matching About section style) ─────────────────── */}
        <div style={{
          position:     'absolute',
          width:        '500px',
          height:       '500px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,220,120,0.20) 0%, transparent 70%)',
          top:          '-120px',
          left:         '-100px',
          pointerEvents:'none',
        }} />
        <div style={{
          position:     'absolute',
          width:        '400px',
          height:       '400px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(200,100,50,0.09) 0%, transparent 70%)',
          bottom:       '-80px',
          right:        '8%',
          pointerEvents:'none',
        }} />

        {/* ── SECTION TITLE ────────────────────────────────────────────── */}
        <div className="ts-title-wrap" style={{ textAlign: 'center', marginBottom: '70px', padding: '0 2rem' }}>

          {/* Eyebrow label — matching About section pattern */}
          <div style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '10px',
            marginBottom:  '16px',
          }}>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
            <span style={{
              fontSize:      '0.78rem',
              fontWeight:    600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         '#C97B3A',
              fontFamily:    "'DM Sans', sans-serif",
            }}>
              What Everyone Orders
            </span>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
          </div>

          {/* H2 — espresso heading + terracotta accent, matching About section */}
          <h2
            id="ts-heading"
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontSize:     'clamp(2rem, 4vw, 2.8rem)',
              fontWeight:    800,
              color:        '#1E0F06',              // ← espresso, matches About
              margin:       '0 0 12px',
              lineHeight:    1.15,
            }}
          >
            Our Crowd{' '}
            <span style={{ color:'#C97B3A', fontStyle:'italic' }}>
              Favorites
            </span>
          </h2>

          <p style={{
            fontFamily:  "'DM Sans', sans-serif",
            fontSize:    '0.97rem',
            color:       '#5A3E2B',                // ← body text, matches About
            maxWidth:    '480px',
            margin:      '0 auto',
            lineHeight:  1.75,
          }}>
            Twelve of our most-loved bakes — click any to jump straight to it on the menu.
          </p>
        </div>

        {/* ── 3D CAROUSEL (desktop) ────────────────────────────────────── */}
        <div
          className="ts-carousel-wrap ts-carousel"
          ref={wrapperRef}
          onMouseEnter={handleWrapperEnter}
          onMouseLeave={handleWrapperLeave}
          style={{
            perspective:    '1400px',
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            height:         '420px',
            position:       'relative',
          }}
          aria-hidden="true"   // carousel is decorative — static grid is the accessible version
        >
          <div
            ref={carouselRef}
            style={{
              width:          '220px',
              height:         '290px',
              position:       'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {items.map((item, index) => {
              const cardAngle = (360 / items.length) * index;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={item.name}
                  className="ts-card"
                  role="button"
                  tabIndex={-1}   // not in tab order — static grid handles a11y
                  aria-label={`${item.name} — ${item.price}`}
                  onClick={() => handleCardClick(item)}
                  onKeyDown={(e) => handleCardKey(e, item)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    // ── FIX: NEVER concatenate transform strings in 3D context ──
                    // Scale is applied via filter:brightness above in CSS.
                    // The transform here is ONLY the 3D positioning — never mutated.
                    transform: `rotateY(${cardAngle}deg) translateZ(500px)`,
                  }}
                >
                 {/* IMAGE */}
                <div style={{ position: 'relative', width: '100%', height: '155px' }}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover' }}
                    priority={index < 3}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                    }}
                  />
                </div>

                  {/* Badge — gradient style matching About section badge */}
                  {item.badge && (
                    <span style={{
                      position:   'absolute',
                      top:        '10px',
                      left:       '10px',
                      background: 'linear-gradient(135deg, #5C2E0E, #A0673A)', // ← matches About badge
                      color:      '#FAF6EE',                                   // ← cream text
                      padding:    '4px 10px',
                      fontSize:   '10px',
                      fontWeight:  600,
                      letterSpacing:'0.08em',
                      textTransform:'uppercase',
                      borderRadius:'4px',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {item.badge}
                    </span>
                  )}

                  {/* Card content */}
                  <div style={{ padding:'14px 16px' }}>
                    <h4 style={{
                      margin:      0,
                      fontFamily:  "'Playfair Display', serif",
                      fontSize:    '1rem',
                      fontWeight:  700,
                      color:       '#1E0F06',   // ← espresso, matches About heading
                      lineHeight:  1.3,
                    }}>
                      {item.name}
                    </h4>
                    <p style={{
                      marginTop:  '6px',
                      marginBottom:0,
                      color:      '#C97B3A',    // ← terracotta, matches About accent
                      fontSize:   '13px',
                      fontWeight:  600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STATIC GRID (mobile + reduced-motion fallback) ───────────── */}
        <div
          className="ts-static-grid"
          role="list"
          aria-label="Top seller items"
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="ts-static-card"
              role="listitem"
              tabIndex={0}
              aria-label={`${item.name} — ${item.price}`}
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => handleCardKey(e, item)}
            >
              <div style={{ position:'relative', width:'100%', height:'140px', background:'#f0e6d3' }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  style={{ objectFit:'cover' }}
                  sizes="(max-width:768px) 50vw, 200px"
                />
                {item.badge && (
                  <span style={{
                    position:     'absolute',
                    top:          '8px',
                    left:         '8px',
                    background:   'linear-gradient(135deg, #5C2E0E, #A0673A)',
                    color:        '#FAF6EE',
                    padding:      '3px 9px',
                    fontSize:     '10px',
                    fontWeight:    600,
                    letterSpacing:'0.08em',
                    textTransform:'uppercase',
                    borderRadius: '4px',
                    fontFamily:   "'DM Sans', sans-serif",
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <div style={{ padding:'12px 14px' }}>
                <h4 style={{
                  margin:     0,
                  fontFamily: "'Playfair Display', serif",
                  fontSize:   '0.95rem',
                  fontWeight:  700,
                  color:      '#1E0F06',
                  lineHeight:  1.3,
                }}>
                  {item.name}
                </h4>
                <p style={{
                  marginTop:   '5px',
                  marginBottom: 0,
                  color:       '#C97B3A',
                  fontSize:    '13px',
                  fontWeight:   600,
                  fontFamily:  "'DM Sans', sans-serif",
                }}>
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── VIEW ALL CTA ─────────────────────────────────────────────── */}
        <div
          className="ts-cta-wrap"
          style={{ textAlign:'center', marginTop:'60px' }}
        >
          <a href="/menu" className="ts-btn">
            <span style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'10px' }}>
              View Full Menu
              <span className="ts-btn-arrow">→</span>
            </span>
            <span className="ts-btn-shine" />
          </a>
        </div>

      </section>
    </>
  );
}
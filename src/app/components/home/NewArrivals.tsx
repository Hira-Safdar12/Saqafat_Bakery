'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Item {
  name:  string;
  price: string;
  img:   string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const items: Item[] = [
  { name: 'Lotus Cake',            price: 'PKR 950',   img: '/images/lotus.jpg'      },
  { name: 'Pistachio Pastry',      price: 'PKR 420',   img: '/images/pistachio.jpg'  },
  { name: 'Chocolate Lava',        price: 'PKR 550',   img: '/images/lava.jpg'       },
  { name: 'Mini Tart Box',         price: 'PKR 700',   img: '/images/tart.jpg'       },
  { name: 'Strawberry Cheesecake', price: 'PKR 1,100', img: '/images/cheesecake.jpg' },
  { name: 'Nutella Croissant',     price: 'PKR 380',   img: '/images/nutella.jpg'    },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function NewArrivals() {
  const router = useRouter();

  const handleClick = (item: Item) =>
    router.push(`/menu?item=${encodeURIComponent(item.name)}`);

  const handleKey = (e: React.KeyboardEvent, item: Item) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(item); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes na-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .na-title-wrap { animation: na-fadeUp 0.7s ease 0.1s both; }
        .na-grid        { animation: na-fadeUp 0.7s ease 0.3s both; }
        .na-cta-wrap    { animation: na-fadeUp 0.7s ease 0.5s both; }

        /* ── Item card ── */
        .na-card {
          background:    #FFF8EC;
          border-radius: 14px;
          overflow:      hidden;
          cursor:        pointer;
          border:        1px solid rgba(92,46,14,0.10);
          box-shadow:    0 8px 28px rgba(180,80,20,0.10), 0 2px 8px rgba(92,46,14,0.06);
          transition:    transform 0.3s ease, box-shadow 0.3s ease;
          outline:       none;
        }
        .na-card:hover {
          transform:  translateY(-6px);
          box-shadow: 0 20px 56px rgba(180,80,20,0.18), 0 4px 16px rgba(92,46,14,0.10);
        }
        .na-card:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }

        /* ── "Try Now" button — ghost style, consistent with outline btn pattern ── */
        .na-try-btn {
          display:         inline-flex;
          align-items:     center;
          gap:             6px;
          background:      transparent;
          border:          1px solid rgba(92,46,14,0.25);
          border-radius:   50px;
          padding:         9px 20px;
          font-family:     'DM Sans', sans-serif;
          font-size:       11px;
          font-weight:     600;
          letter-spacing:  0.1em;
          text-transform:  uppercase;
          color:           #5A3E2B;
          cursor:          pointer;
          transition:      border-color 0.25s, color 0.25s, background 0.25s;
          width:           100%;
          justify-content: center;
        }
        .na-try-btn:hover {
          border-color: #C97B3A;
          color:        #C97B3A;
          background:   rgba(201,123,58,0.06);
        }
        .na-try-btn:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }
        .na-try-arrow {
          font-size:  0.95rem;
          transition: transform 0.3s ease;
        }
        .na-try-btn:hover .na-try-arrow { transform: translateX(3px); }

        /* ── View Full Menu button — matches all other sections ── */
        .na-btn {
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
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
          box-shadow:      0 6px 20px rgba(92,46,14,0.28);
          transition:      transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          text-decoration: none;
        }
        .na-btn:hover {
          transform:  translateY(-3px);
          box-shadow: 0 12px 36px rgba(92,46,14,0.40);
          background: linear-gradient(135deg, #7a3e18 0%, #C97B3A 100%);
        }
        .na-btn:active { transform: translateY(0); }
        .na-btn:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 4px;
        }
        .na-btn-arrow {
          font-size:  1rem;
          transition: transform 0.3s ease;
        }
        .na-btn:hover .na-btn-arrow { transform: translateX(4px); }
        .na-btn-shine {
          position:      absolute;
          top:           0;
          left:          -70%;
          width:         45%;
          height:        100%;
          background:    linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
          transform:     skewX(-20deg);
          transition:    left 0.55s ease;
          pointer-events:none;
        }
        .na-btn:hover .na-btn-shine { left: 130%; }

        @media (max-width: 640px) {
          .na-grid { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .na-title-wrap, .na-grid, .na-cta-wrap {
            animation: none !important;
            opacity:   1 !important;
          }
          .na-card, .na-try-btn, .na-btn { transition: none !important; }
        }
      `}</style>

      <section
        style={{
          position:   'relative',
          background: '#FFFBF3',       // ← consistent with all other sections
          padding:    '100px 5% 110px',
          overflow:   'hidden',
        }}
        aria-labelledby="na-heading"
      >

        {/* ── BG BLOBS — matching all other sections ──────────────────── */}
        <div style={{
          position:     'absolute',
          width:        '480px',
          height:       '480px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,220,120,0.18) 0%, transparent 70%)',
          top:          '-100px',
          right:        '-80px',
          pointerEvents:'none',
        }} />
        <div style={{
          position:     'absolute',
          width:        '360px',
          height:       '360px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(200,100,50,0.08) 0%, transparent 70%)',
          bottom:       '-60px',
          left:         '5%',
          pointerEvents:'none',
        }} />

        {/* ── TITLE — same pattern as all other sections ───────────────── */}
        <div className="na-title-wrap" style={{ textAlign:'center', marginBottom:'64px' }}>

          {/* Eyebrow */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
            <span style={{
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      '0.78rem',
              fontWeight:     600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         '#C97B3A',
            }}>
              Just Arrived
            </span>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
          </div>

          {/* H2 — espresso + terracotta italic accent */}
          <h2
            id="na-heading"
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontSize:     'clamp(2rem, 4vw, 2.8rem)',
              fontWeight:    800,
              color:        '#1E0F06',
              margin:       '0 0 12px',
              lineHeight:    1.15,
            }}
          >
            Fresh on{' '}
            <span style={{ color:'#C97B3A', fontStyle:'italic' }}>the Menu</span>
          </h2>

          <p style={{
            fontFamily:  "'DM Sans', sans-serif",
            fontSize:    '0.97rem',
            color:       '#5A3E2B',
            maxWidth:    '440px',
            margin:      '0 auto',
            lineHeight:  1.75,
          }}>
            New additions straight from our kitchen — be the first to try them.
          </p>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────────── */}
        <div
          className="na-grid"
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(auto-fit, minmax(260px, 1fr))',
            gap:                   '24px',
            maxWidth:              '1100px',
            margin:                '0 auto',
          }}
          role="list"
          aria-label="New menu arrivals"
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="na-card"
              role="listitem"
              tabIndex={0}
              aria-label={`${item.name} — ${item.price}`}
              onClick={() => handleClick(item)}
              onKeyDown={(e) => handleKey(e, item)}
            >
              {/* Image */}
              <div style={{ position:'relative', width:'100%', height:'180px', background:'#f0e6d3' }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  style={{ objectFit:'cover' }}
                  sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 320px"
                />

                {/* NEW badge — gradient matching About/TopSellers/Offers badge style */}
                <span style={{
                  position:      'absolute',
                  top:           '12px',
                  left:          '12px',
                  background:    'linear-gradient(135deg, #5C2E0E, #A0673A)',
                  color:         '#FAF6EE',
                  fontSize:      '10px',
                  fontWeight:     700,
                  padding:       '4px 11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius:  '4px',
                  fontFamily:    "'DM Sans', sans-serif",
                }}>
                  NEW
                </span>

                {/* Subtle bottom fade */}
                <div style={{
                  position:      'absolute',
                  inset:          0,
                  background:    'linear-gradient(to top, rgba(30,15,6,0.3), transparent 55%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Card body */}
              <div style={{ padding:'16px 18px 20px' }}>

                <h4 style={{
                  margin:      '0 0 5px',
                  fontFamily:  "'Playfair Display', serif",
                  fontSize:    '1.05rem',
                  fontWeight:   800,
                  color:       '#1E0F06',     // ← espresso, matches About
                  lineHeight:   1.25,
                }}>
                  {item.name}
                </h4>

                <p style={{
                  margin:      '0 0 14px',
                  fontFamily:  "'DM Sans', sans-serif",
                  fontSize:    '13px',
                  fontWeight:   600,
                  color:       '#C97B3A',     // ← terracotta, matches About
                }}>
                  {item.price}
                </p>

                {/* Try Now CTA */}
                <button
                  className="na-try-btn"
                  onClick={(e) => { e.stopPropagation(); handleClick(item); }}
                  aria-label={`Try ${item.name}`}
                >
                  Try Now
                  <span className="na-try-arrow">→</span>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* ── VIEW FULL MENU CTA ───────────────────────────────────────── */}
        <div className="na-cta-wrap" style={{ textAlign:'center', marginTop:'60px' }}>
          <a href="/menu" className="na-btn">
            <span style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'8px' }}>
              View Full Menu
              <span className="na-btn-arrow">→</span>
            </span>
            <span className="na-btn-shine" />
          </a>
        </div>

      </section>
    </>
  );
}
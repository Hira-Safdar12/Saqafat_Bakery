'use client';

import React, { useRef, useState, useEffect } from 'react';

// ── ROW DATA ─────────────────────────────────────────────────────────────────
const rowOne = [
  {
    title: 'Starters',
    desc: 'Crispy appetizers and finger foods to kick off your meal with bold, exciting flavors.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop',
  },
  {
    title: 'Soups',
    desc: 'Rich, slow-simmered broths and creamy blends crafted fresh daily.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  },
  {
    title: 'Salads',
    desc: 'Fresh garden greens tossed with seasonal vegetables and house dressings.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  },
  {
    title: 'Pizza',
    desc: 'Stone-fired pizzas with premium toppings, melted cheese, and hand-stretched dough.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
  },
  {
    title: 'Steaks',
    desc: 'Prime cuts grilled to perfection — tender, juicy, and seasoned just right.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
  },
  {
    title: 'Burgers, Sandwiches & Paninis',
    desc: 'Stacked sky-high with premium fillings, sauces, and toasted artisan bread.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
];

const rowTwo = [
  {
    title: 'Pasta',
    desc: 'Al dente pasta tossed in rich tomato, creamy alfredo, or herbed pesto sauces.',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop',
  },
  {
    title: 'Chicken',
    desc: 'Grilled, fried, or roasted — our chicken dishes are full of smoky, bold flavor.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&h=300&fit=crop',
  },
  {
    title: 'Rice',
    desc: 'Fragrant basmati and specialty rice platters cooked to fluffy, aromatic perfection.',
    image: 'https://images.unsplash.com/photo-1536304993881-ff86e77f2d42?w=400&h=300&fit=crop',
  },
  {
    title: 'Noodles',
    desc: 'Wok-tossed noodles with fresh vegetables, savory sauces, and your choice of protein.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
  },
  {
    title: 'Beef',
    desc: 'Slow-braised, grilled, or spiced — hearty beef dishes that satisfy every craving.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
  },
  {
    title: 'Desi Cuisine',
    desc: 'Authentic subcontinental flavors — rich curries, sizzling karahi, and traditional recipes.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  },
];

const specialCards = [
  {
    title: 'Desserts',
    desc: 'Indulge in our handcrafted desserts — from silky panna cotta and rich lava cakes to classic crème brûlée and seasonal fruit tarts. A sweet finish to every meal.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  },
  {
    title: 'Beverages',
    desc: 'Sip on freshly squeezed juices, artisan coffees, craft mocktails, and premium teas. Chilled, warm, or blended — we have the perfect drink to complement your meal.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  },
];

// ── Card ─────────────────────────────────────────────────────────────────────
function MenuCard({
  item,
  rowRef,
}: {
  item: { title: string; desc: string; image: string };
  rowRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      style={styles.card}
      className="menu-card"
      onMouseEnter={() => { if (rowRef?.current) rowRef.current.style.animationPlayState = 'paused'; }}
      onMouseLeave={() => { if (rowRef?.current) rowRef.current.style.animationPlayState = 'running'; }}
    >
      <div style={styles.imageWrapper} className="img-wrapper">
        <img src={item.image} alt={item.title} style={styles.image} className="card-img" />
        <div style={styles.overlay} className="overlay">
        
        </div>
      </div>
      <div style={styles.cardBody}>
        <h3 style={styles.title}>{item.title}</h3>
        <p style={styles.desc}>{item.desc}</p>
        <button style={styles.btn} className="menu-btn">
          <span style={styles.btnText}>Visit Menu</span>
          <span className="btn-shine" style={styles.btnShine} />
        </button>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'menu' | 'desserts'>('menu');
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  // Refs to measure each button's actual width
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const dessertsBtnRef = useRef<HTMLButtonElement | null>(null);

  // Pill position & width state
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  // Update pill to match the active button's exact position & width
  useEffect(() => {
    const activeRef = activeTab === 'menu' ? menuBtnRef : dessertsBtnRef;
    if (activeRef.current) {
      const btn = activeRef.current;
      setPillStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, [activeTab]);

  // Set initial pill on mount
  useEffect(() => {
    if (menuBtnRef.current) {
      setPillStyle({
        left: menuBtnRef.current.offsetLeft,
        width: menuBtnRef.current.offsetWidth,
      });
    }
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.bg} />

      {/* Heading */}
      <div style={styles.headingWrapper}>
        <p style={styles.subheading}>Our Specialties</p>
        <h2 style={styles.heading}>Explore Our Menu</h2>

        {/* ── Toggle ── */}
        <div style={styles.toggleWrapper}>
          <div style={styles.toggleTrack}>
            {/* Pill — sized & positioned to exactly match active button */}
            <div
              style={{
                ...styles.togglePill,
                left: pillStyle.left,
                width: pillStyle.width,
              }}
            />

            <button
              ref={menuBtnRef}
              style={{
                ...styles.toggleBtn,
                color: activeTab === 'menu' ? '#FAF6EE' : '#8B5E3C',
                fontWeight: activeTab === 'menu' ? 700 : 500,
              }}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>

            <button
              ref={dessertsBtnRef}
              style={{
                ...styles.toggleBtn,
                color: activeTab === 'desserts' ? '#FAF6EE' : '#8B5E3C',
                fontWeight: activeTab === 'desserts' ? 700 : 500,
              }}
              onClick={() => setActiveTab('desserts')}
            >
              Desserts &amp; Beverages
            </button>
          </div>
        </div>
      </div>

      {/* ── MENU VIEW ── */}
      {activeTab === 'menu' && (
        <>
          <div style={styles.rowWrapper}>
            <div ref={rowOneRef} style={{ ...styles.row, animation: 'scrollLeft 30s linear infinite' }}>
              {[...rowOne, ...rowOne].map((item, i) => (
                <MenuCard key={i} item={item} rowRef={rowOneRef} />
              ))}
            </div>
          </div>

          <div style={{ ...styles.rowWrapper, marginTop: '24px' }}>
            <div ref={rowTwoRef} style={{ ...styles.row, animation: 'scrollRight 30s linear infinite' }}>
              {[...rowTwo, ...rowTwo].map((item, i) => (
                <MenuCard key={i} item={item} rowRef={rowTwoRef} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── DESSERTS & BEVERAGES VIEW ── */}
      {activeTab === 'desserts' && (
        <div style={styles.specialGrid}>
          {specialCards.map((item, i) => (
            <MenuCard key={i} item={item} />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .img-wrapper:hover .card-img { filter: brightness(0.18); }
        .img-wrapper .overlay { opacity: 0; transition: opacity 0.3s ease; }
        .img-wrapper:hover .overlay { opacity: 1; }
        .menu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.14) !important;
        }
        .menu-btn { position: relative; overflow: hidden; }
        .btn-shine {
          position: absolute; top: 0; left: -70%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .menu-btn:hover .btn-shine { left: 130%; }
        .menu-btn:hover { background: linear-gradient(135deg, #7a3e18, #a0673a) !important; }
      `}</style>
    </section>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles: any = {
  section: {
    position: 'relative',
    padding: '80px 0',
    overflow: 'hidden',
    background: '#FAF6EE',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(#FAF6EE, #F0E6D3)',
    zIndex: 0,
  },
  headingWrapper: {
    textAlign: 'center',
    marginBottom: '48px',
    position: 'relative',
    zIndex: 1,
  },
  subheading: {
    color: '#c97b3a',
    fontSize: '0.95rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    fontWeight: 600,
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 800,
    margin: '0 0 24px 0',
    color: '#2a1810',
    fontFamily: 'Georgia, serif',
  },

  // ── Toggle ──
  toggleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  toggleTrack: {
    position: 'relative',
    display: 'inline-flex',          // ← shrinks to fit buttons naturally
    background: '#EDE0D0',
    borderRadius: '50px',
    padding: '4px',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
    border: '1px solid rgba(139,94,60,0.2)',
  },
  togglePill: {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    background: 'linear-gradient(135deg, #5C2E0E, #8B5E3C)',
    borderRadius: '50px',
    transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)',
    boxShadow: '0 2px 10px rgba(92,46,14,0.4)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  toggleBtn: {
    position: 'relative',
    zIndex: 1,
    background: 'transparent',
    border: 'none',
    borderRadius: '50px',
    padding: '9px 22px',
    fontSize: '0.78rem',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap',
    fontFamily: 'Georgia, serif',
  },

  // ── Rows ──
  rowWrapper: {
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  row: {
    display: 'flex',
    gap: '18px',
    width: 'max-content',
    padding: '10px 0',
  },

  // ── Special 2-card grid ──
  specialGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '28px',
    padding: '10px 20px 20px',
    position: 'relative',
    zIndex: 1,
    flexWrap: 'wrap',
  },

  // ── Card ──
  card: {
    minWidth: '230px',
    maxWidth: '240px',
    background: '#fff',
    flexShrink: 0,
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    borderRadius: '0px',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  imageWrapper: {
    position: 'relative',
    height: '155px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'filter 0.4s ease',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  overlayText: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFamily: 'Georgia, serif',
  },
  cardBody: {
    padding: '10px 12px 14px',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: 700,
    margin: '0 0 4px 0',
    color: '#2a1810',
    fontFamily: 'Georgia, serif',
  },
  desc: {
    fontSize: '0.72rem',
    margin: '0 0 10px 0',
    color: '#8a6a54',
    lineHeight: 1.45,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #8B5E3C, #A8744A)',
    color: '#FAF6EE',
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '6px 13px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    transition: 'all 0.35s ease',
    boxShadow: '0 2px 8px rgba(92,46,14,0.25)',
  },
  btnText: { position: 'relative', zIndex: 1 },
  btnShine: {},
};

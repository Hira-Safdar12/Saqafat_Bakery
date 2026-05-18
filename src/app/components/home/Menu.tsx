'use client';

import React, { useRef, useState, useEffect } from 'react';

// ── ROW DATA ─────────────────────────────────────────────────────────────────

const rowOne = [
  {
    title: 'Starters',
    desc: 'Crispy appetizers and finger foods to kick off your meal with bold, exciting flavors.',
    image:
      'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop',
  },
  {
    title: 'Soups',
    desc: 'Rich, slow-simmered broths and creamy blends crafted fresh daily.',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  },
  {
    title: 'Salads',
    desc: 'Fresh garden greens tossed with seasonal vegetables and house dressings.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  },
  {
    title: 'Pizza',
    desc: 'Stone-fired pizzas with premium toppings, melted cheese, and hand-stretched dough.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
  },
  {
    title: 'Steaks',
    desc: 'Prime cuts grilled to perfection — tender, juicy, and seasoned just right.',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
  },
  {
    title: 'Burgers & Sandwiches',
    desc: 'Stacked sky-high with premium fillings, sauces, and toasted artisan bread.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
];

const rowTwo = [
  {
    title: 'Pasta',
    desc: 'Al dente pasta tossed in rich tomato, creamy alfredo, or herbed pesto sauces.',
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop',
  },
  {
    title: 'Chicken',
    desc: 'Grilled, fried, or roasted — our chicken dishes are full of smoky, bold flavor.',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&h=300&fit=crop',
  },
  {
    title: 'Rice',
    desc: 'Fragrant basmati and specialty rice platters cooked to fluffy, aromatic perfection.',
    image:
      'https://images.unsplash.com/photo-1536304993881-ff86e77f2d42?w=400&h=300&fit=crop',
  },
  {
    title: 'Noodles',
    desc: 'Wok-tossed noodles with fresh vegetables, savory sauces, and your choice of protein.',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
  },
  {
    title: 'Beef',
    desc: 'Slow-braised, grilled, or spiced — hearty beef dishes that satisfy every craving.',
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
  },
  {
    title: 'Desi Cuisine',
    desc: 'Authentic subcontinental flavors — rich curries, sizzling karahi, and traditional recipes.',
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  },
];

const specialCards = [
  {
    title: 'Desserts',
    desc: 'Indulge in our handcrafted desserts — from silky panna cotta and rich lava cakes to classic crème brûlée.',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
  },
  {
    title: 'Beverages',
    desc: 'Sip on freshly squeezed juices, artisan coffees, craft mocktails, and premium teas.',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  },
];

// ── CARD ─────────────────────────────────────────────────────────────────────

function MenuCard({
  item,
  rowRef,
}: {
  item: {
    title: string;
    desc: string;
    image: string;
  };
  rowRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      style={styles.card}
      className="menu-card"
      onMouseEnter={() => {
        if (rowRef?.current)
          rowRef.current.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        if (rowRef?.current)
          rowRef.current.style.animationPlayState = 'running';
      }}
    >
      {/* IMAGE */}

      <div style={styles.imageWrapper}>

        <img
          src={item.image}
          alt={item.title}
          style={styles.image}
          className="card-img"
        />

      </div>

      {/* CONTENT */}

      <div style={styles.cardContent}>

        <div className="content-inner">

          <h3 style={styles.title}>
            {item.title}
          </h3>

         
          <div className="expand-content">

            <p style={styles.desc}>
              {item.desc}
            </p>

            <button
              style={styles.btn}
              className="menu-btn"
            >
              Explore Menu
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

// ── SECTION ──────────────────────────────────────────────────────────────────

export default function MenuSection() {

  const [activeTab, setActiveTab] =
    useState<'menu' | 'desserts'>('menu');

  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const dessertsBtnRef = useRef<HTMLButtonElement | null>(null);

  const [pillStyle, setPillStyle] =
    useState({ left: 0, width: 0 });

  useEffect(() => {

    const activeRef =
      activeTab === 'menu'
        ? menuBtnRef
        : dessertsBtnRef;

    if (activeRef.current) {

      const btn = activeRef.current;

      setPillStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });

    }

  }, [activeTab]);

  useEffect(() => {

    if (menuBtnRef.current) {

      setPillStyle({
        left: menuBtnRef.current.offsetLeft,
        width: menuBtnRef.current.offsetWidth,
      });

    }

  }, []);

  return (

    <section id="menu" style={styles.section}>

      <div style={styles.bg} />

      {/* HEADING */}

      <div style={styles.headingWrapper}>

        <p style={styles.subheading}>
          Our Specialties
        </p>

        <h2 style={styles.heading}>
          Explore Our Menu
        </h2>

        {/* TOGGLE */}

        <div style={styles.toggleWrapper}>

          <div style={styles.toggleTrack}>

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
                color:
                  activeTab === 'menu'
                    ? '#FAF6EE'
                    : '#8B5E3C',

                fontWeight:
                  activeTab === 'menu'
                    ? 700
                    : 500,
              }}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>

            <button
              ref={dessertsBtnRef}
              style={{
                ...styles.toggleBtn,
                color:
                  activeTab === 'desserts'
                    ? '#FAF6EE'
                    : '#67352c',

                fontWeight:
                  activeTab === 'desserts'
                    ? 700
                    : 500,
              }}
              onClick={() =>
                setActiveTab('desserts')
              }
            >
              Desserts & Beverages
            </button>

          </div>

        </div>

      </div>

      {/* MENU */}

      {activeTab === 'menu' && (
        <>
          <div style={styles.rowWrapper}>

            <div
              ref={rowOneRef}
              style={{
                ...styles.row,
                animation:
                  'scrollLeft 30s linear infinite',
              }}
            >

              {[...rowOne, ...rowOne].map((item, i) => (

                <MenuCard
                  key={i}
                  item={item}
                  rowRef={rowOneRef}
                />

              ))}

            </div>

          </div>

          <div
            style={{
              ...styles.rowWrapper,
              marginTop: '20px',
            }}
          >

            <div
              ref={rowTwoRef}
              style={{
                ...styles.row,
                animation:
                  'scrollRight 30s linear infinite',
              }}
            >

              {[...rowTwo, ...rowTwo].map((item, i) => (

                <MenuCard
                  key={i}
                  item={item}
                  rowRef={rowTwoRef}
                />

              ))}

            </div>

          </div>
        </>
      )}

      {/* DESSERTS */}

      {activeTab === 'desserts' && (

        <div style={styles.specialGrid}>

          {specialCards.map((item, i) => (

            <MenuCard
              key={i}
              item={item}
            />

          ))}

        </div>

      )}

      <style jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        /* CARD */

        .menu-card {
          position: relative;

          min-height: 265px;

          overflow: hidden;

          transition:
            transform .55s cubic-bezier(.22,1,.36,1),
            box-shadow .45s ease;

          cursor: pointer;
        }

        .menu-card:hover {
          transform:
            translateY(-8px);

          box-shadow:
            0 22px 45px rgba(0,0,0,0.10),
            0 8px 22px rgba(216,155,77,0.10);
        }

        .card-img {
          transition:
            transform 1s cubic-bezier(.22,1,.36,1),
            filter .6s ease;
        }

        .menu-card:hover .card-img {
          transform: scale(1.08);
          filter: brightness(.82);
        }

        .content-inner {
          transition:
            transform .45s ease;
        }

        .expand-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;

          transform: translateY(10px);

          transition:
            max-height .55s ease,
            opacity .45s ease,
            transform .45s ease;
        }

        .menu-card:hover .expand-content {
          max-height: 180px;
          opacity: 1;
          transform: translateY(0);
        }

        .menu-btn {
          transition:
            transform .35s ease,
            background .35s ease,
            box-shadow .35s ease;
        }

        .menu-btn:hover {
          transform: translateY(-2px);

          background:
            linear-gradient(
              135deg,
              #4b240b,
              #d89b4d
            ) !important;

          box-shadow:
            0 10px 24px rgba(75,36,11,0.16);
        }

      `}</style>

    </section>

  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────

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
    background:
      'linear-gradient(#FAF6EE, #F0E6D3)',
    zIndex: 0,
  },

  headingWrapper: {
    textAlign: 'center',
    marginBottom: '48px',
    position: 'relative',
    zIndex: 1,
  },

  subheading: {
    color: '#67352c',
    fontSize: '0.95rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    fontWeight: 600,
    fontFamily: 'DM Sans, sans-serif',
  },

  heading: {
    fontSize: '3.2rem',
    fontWeight: 600,
    margin: '0 0 24px 0',
    color: '#3e3c3c',
    fontFamily:
      'Cormorant Garamond, serif',
    letterSpacing: '-0.03em',
  },

  /* TOGGLE */

  toggleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  toggleTrack: {
    position: 'relative',
    display: 'inline-flex',
    background: '#EDE0D0',
    borderRadius: '50px',
    padding: '4px',
    border:
      '1px solid rgba(139,94,60,0.2)',
  },

  togglePill: {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    background:
      'linear-gradient(135deg, #67352c, #8B5E3C)',
    borderRadius: '50px',

    transition:
      'left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)',

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

  specialGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '28px',
    padding: '10px 20px 20px',
    position: 'relative',
    zIndex: 1,
    flexWrap: 'wrap',
  },

  /* CARDS */

  card: {
    minWidth: '255px',
    maxWidth: '260px',

    background: '#fff',

    borderRadius: '26px',

    overflow: 'hidden',

    flexShrink: 0,

    position: 'relative',

    border:
      '1px solid rgba(216,155,77,0.10)',

    boxShadow:
      '0 10px 28px rgba(0,0,0,0.05)',

    backgroundImage:
      'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,248,240,0.95))',
  },

  imageWrapper: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  cardContent: {
    position: 'relative',

    background: '#fff',

    borderTopLeftRadius: '26px',
    borderTopRightRadius: '26px',

    marginTop: '-20px',

    padding:
      '16px 16px 18px',

    zIndex: 3,
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: '0',
    color: '#4b240b',
    lineHeight: 1.05,
    fontFamily:
      'Cormorant Garamond, serif',
  },

  timeText: {
    fontSize: '.72rem',
    color: '#b08968',
    marginTop: '4px',
    marginBottom: '0',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontFamily: 'DM Sans, sans-serif',
  },

  desc: {
    fontSize: '.82rem',
    margin:
      '14px 0 14px',
    color: '#7a5a46',
    lineHeight: 1.7,
    fontWeight: 300,
    fontFamily: 'DM Sans, sans-serif',
  },

  btn: {
    border: 'none',

    background:
      'linear-gradient(135deg, #67352c, #b47a4a)',

    color: '#FAF6EE',

    fontSize: '.66rem',
    fontWeight: 700,

    letterSpacing: '.12em',

    borderRadius: '999px',

    padding: '10px 16px',

    cursor: 'pointer',

    textTransform: 'uppercase',

    transition: 'all .35s ease',

    boxShadow:
      '0 8px 18px rgba(75,36,11,0.12)',

    fontFamily: 'DM Sans, sans-serif',
  },

};
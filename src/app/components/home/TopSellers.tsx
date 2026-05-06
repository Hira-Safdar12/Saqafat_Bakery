'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Item {
  name: string;
  price: string;
  img: string;
  badge?: string;
  wide?: boolean;   // span 2 cols in masonry
  tall?: boolean;   // span 2 rows
}

const items: Item[] = [
 { name: 'Cookies',    price: 'From PKR 200',   img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop' },
  { name: 'Macarons',   price: 'From PKR 600',   img: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop', badge: 'Premium' },
  { name: 'Pizza',      price: 'From PKR 350',   img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop', tall: true },
  { name: 'Puff',       price: 'From PKR 280',   img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop' },
  { name: 'Sandwich',   price: 'From PKR 500',   img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
  { name: 'Noodles',    price: 'From PKR 320',   img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', badge: 'Chef\'s Pick' },
];

export default function TopSellers() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const go = (item: Item) =>
    router.push(`/menu?item=${encodeURIComponent(item.name)}`);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Animations ── */
        @keyframes ts-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ts-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .ts-sec { background: #FFFBF3; position: relative; overflow: hidden; }

        /* ── Heading ── */
        .ts-head {
          text-align: center;
          padding: clamp(52px,8vw,96px) clamp(16px,5vw,60px) clamp(36px,5vw,60px);
          position: relative; z-index: 1;
        }
        .ts-head.anim { animation: ts-up 0.65s ease both; }

        .ts-eyebrow {
          display: flex; align-items: center;
          justify-content: center; gap: 10px;
          margin-bottom: 16px;
        }
        .ts-eyebrow-line {
          width: 36px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #C97B3A);
          transform-origin: left;
        }
        .ts-eyebrow-line:last-child {
          background: linear-gradient(90deg, #C97B3A, transparent);
          transform-origin: right;
        }
        .ts-eyebrow.anim .ts-eyebrow-line { animation: ts-line 0.6s ease 0.2s both; }
        .ts-eyebrow-txt {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: #C97B3A;
        }
        .ts-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 600; color: #1E0F06;
          margin: 0 0 12px; line-height: 1.08;
          letter-spacing: 0.01em;
        }
        .ts-h2 em { color: #C97B3A; font-style: italic; }
        .ts-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.85rem, 1.8vw, 0.98rem);
          font-weight: 300; color: #7a5c44;
          line-height: 1.72; max-width: 460px; margin: 0 auto;
        }

        /* ── MASONRY GRID (desktop) ── */
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 14px;
          padding: 0 clamp(16px,4vw,48px) clamp(40px,6vw,72px);
          max-width: 1320px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Grid item ── */
        .ts-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #1E0F06;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border: 1px solid rgba(92,46,14,0.08);
          transition: transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.32s ease;
          opacity: 0;
          transform: translateY(24px);
        }
        .ts-item.show {
          animation: ts-up 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both;
        }
        .ts-item:hover {
          transform: translateY(-4px) scale(1.012);
          box-shadow: 0 18px 48px rgba(92,46,14,0.2);
          z-index: 2;
        }

        /* Wide / tall variants */
        .ts-item--wide { grid-column: span 2; }
        .ts-item--tall { grid-row: span 2; }

        /* Image zoom on hover */
        .ts-item img {
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .ts-item:hover img { transform: scale(1.07) !important; }

        /* Dark gradient overlay */
        .ts-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(18,6,2,0.82) 0%,
            rgba(18,6,2,0.3) 50%,
            transparent 100%
          );
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        .ts-item:hover .ts-overlay {
          background: linear-gradient(
            to top,
            rgba(18,6,2,0.88) 0%,
            rgba(18,6,2,0.45) 55%,
            rgba(18,6,2,0.08) 100%
          );
        }

        /* Card text */
        .ts-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 18px;
          z-index: 2;
          transform: translateY(4px);
          transition: transform 0.3s ease;
        }
        .ts-item:hover .ts-info { transform: translateY(0); }

        .ts-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          font-weight: 600; color: #FAF6EE;
          margin: 0 0 3px; line-height: 1.2;
        }
        .ts-price {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          color: #E8C97A; letter-spacing: 0.06em;
          margin: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.28s ease 0.05s, transform 0.28s ease 0.05s;
        }
        .ts-item:hover .ts-price { opacity: 1; transform: translateY(0); }

        /* Badge */
        .ts-badge {
          position: absolute; top: 12px; left: 12px;
          background: linear-gradient(135deg, #5C2E0E, #A0673A);
          color: #FAF6EE;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 4px;
          z-index: 2;
        }

        /* ── CTA ── */
        .ts-cta {
          text-align: center;
          padding-bottom: clamp(48px,7vw,80px);
          position: relative; z-index: 1;
        }
        .ts-cta.anim { animation: ts-up 0.65s ease 0.4s both; }

        .ts-btn {
          display: inline-flex; align-items: center; gap: 10px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #5C2E0E, #A0673A);
          color: #FAF6EE;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none;
          padding: 14px 36px;
          border-radius: 50px;
          border: none; cursor: pointer;
          box-shadow: 0 6px 22px rgba(92,46,14,0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .ts-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 34px rgba(92,46,14,0.38);
          background: linear-gradient(135deg, #7a3e18, #C97B3A);
        }
        .ts-btn-arrow { font-size: 14px; transition: transform 0.28s ease; }
        .ts-btn:hover .ts-btn-arrow { transform: translateX(5px); }
        .ts-btn::after {
          content: '';
          position: absolute; top: 0; left: -70%;
          width: 45%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease; pointer-events: none;
        }
        .ts-btn:hover::after { left: 130%; }

        /* ── Tablet: 2 cols ── */
        @media (max-width: 900px) {
          .ts-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 12px;
          }
          .ts-item--wide { grid-column: span 2; }
          .ts-item--tall { grid-row: span 2; }
        }

        /* ── Mobile: 2 cols, no tall/wide ── */
        @media (max-width: 540px) {
          .ts-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
            gap: 8px;
            padding: 0 10px clamp(32px,6vw,52px);
          }
          .ts-item--wide { grid-column: span 2; }
          .ts-item--tall { grid-row: span 1; }
          .ts-name { font-size: 0.95rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-item, .ts-item.show, .ts-head, .ts-cta { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ts-item img { transition: none !important; }
        }
      `}</style>

      <section ref={sectionRef} className="ts-sec" aria-labelledby="ts-h2">

        {/* Background blobs */}
        <div style={{
          position: 'absolute', width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,110,0.18) 0%, transparent 70%)',
          top: '-140px', left: '-80px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,100,50,0.09) 0%, transparent 70%)',
          bottom: '-60px', right: '5%', pointerEvents: 'none',
        }} />

        {/* Heading */}
        <div className={`ts-head${visible ? ' anim' : ''}`}>
          <div className={`ts-eyebrow${visible ? ' anim' : ''}`}>
            <span className="ts-eyebrow-line" />
            <span className="ts-eyebrow-txt">What Everyone Orders</span>
            <span className="ts-eyebrow-line" />
          </div>
          <h2 id="ts-h2" className="ts-h2">
            Our Crowd <em>Favourites</em>
          </h2>
          <p className="ts-sub">
            Twelve of our most-loved bakes & bites — click any to jump straight to the menu.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="ts-grid" role="list">
          {items.map((item, i) => (
            <div
              key={item.name}
              role="listitem"
              tabIndex={0}
              aria-label={`${item.name} — ${item.price}`}
              className={[
                'ts-item',
                item.wide ? 'ts-item--wide' : '',
                item.tall ? 'ts-item--tall' : '',
                visible   ? 'show' : '',
              ].filter(Boolean).join(' ')}
              style={{ animationDelay: `${i * 0.055}s` }}
              onClick={() => go(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(item); }
              }}
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                sizes="(max-width:540px) 50vw, (max-width:900px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
                priority={i < 4}
              />
              <div className="ts-overlay" />

              {item.badge && (
                <span className="ts-badge">{item.badge}</span>
              )}

              <div className="ts-info">
                <p className="ts-name">{item.name}</p>
                <p className="ts-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`ts-cta${visible ? ' anim' : ''}`}>
          <a href="/menu" className="ts-btn">
            View Full Menu
            <span className="ts-btn-arrow">→</span>
          </a>
        </div>

      </section>
    </>
  );
}

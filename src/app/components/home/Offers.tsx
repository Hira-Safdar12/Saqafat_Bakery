'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Offer {
  title:    string;
  subtitle: string;
  code:     string;
  image:    string;
  expires:  string; // fixed ISO date — NOT relative to now
}

interface OfferCardProps {
  offer: Offer;
}

// ─── DATA — update expiry dates before go-live ────────────────────────────────
const offers: Offer[] = [
  {
    title:    '20% Off Family Deals',
    subtitle: 'Valid on orders above PKR 2,000',
    code:     'FAMILY20',
    image:    '/images/offer1.jpg',
    expires:  '2026-06-30T23:59:59',
  },
  {
    title:    'Free Drink with Every Meal',
    subtitle: 'Dine-in & delivery both included',
    code:     'FREEDRINK',
    image:    '/images/offer2.jpg',
    expires:  '2026-05-31T23:59:59',
  },
  {
    title:    'Buy 2 Get 1 Free',
    subtitle: 'On all bakery items — limited time',
    code:     'BOGO3',
    image:    '/images/offer3.jpg',
    expires:  '2026-05-15T23:59:59',
  },
];

// ─── HELPER — fixed expiry, not relative to now ───────────────────────────────
function getTimeLeft(isoExpiry: string): string {
  const total = new Date(isoExpiry).getTime() - Date.now();
  if (total <= 0) return 'Expired';

  const d = Math.floor(total / (1000 * 60 * 60 * 24));
  const h = Math.floor((total / (1000 * 60 * 60)) % 24);
  const m = Math.floor((total / (1000 * 60)) % 60);
  const s = Math.floor((total / 1000) % 60);

  if (d > 0) return `${d}d ${h}h ${m}m`;
  return `${h}h ${m}m ${s}s`;
}

// ─── OFFER CARD ───────────────────────────────────────────────────────────────
function OfferCard({ offer }: OfferCardProps) {
  const router              = useRouter();
  const [timeLeft, setTimeLeft] = useState('');
  const [mounted,  setMounted ] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    setTimeLeft(getTimeLeft(offer.expires));
    const id = setInterval(() => setTimeLeft(getTimeLeft(offer.expires)), 1000);
    return () => clearInterval(id);
  }, [mounted, offer.expires]);

  const handleClick = () => router.push(`/order?promo=${offer.code}`);
  const handleKey   = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
  };

  const expired = timeLeft === 'Expired';

  return (
    <div
      className="offer-card"
      role="button"
      tabIndex={0}
      aria-label={`${offer.title} — use code ${offer.code}`}
      onClick={handleClick}
      onKeyDown={handleKey}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', height: '200px', background: '#f0e6d3' }}>
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 90vw, 380px"
        />
      </div>

      {/* Gradient overlay on image */}
      <div style={{
        position:   'absolute',
        inset:       0,
        height:     '200px',
        background: 'linear-gradient(to top, rgba(30,15,6,0.55), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Expired ribbon */}
      {expired && (
        <div style={{
          position:      'absolute',
          top:           '12px',
          right:         '-28px',
          background:    '#b91c1c',
          color:         '#fff',
          fontSize:      '10px',
          fontWeight:     700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding:       '4px 36px',
          transform:     'rotate(45deg)',
          fontFamily:    "'DM Sans', sans-serif",
        }}>
          Expired
        </div>
      )}

      {/* Promo code badge */}
      <div style={{
        position:      'absolute',
        top:           '12px',
        left:          '12px',
        background:    'linear-gradient(135deg, #5C2E0E, #A0673A)',
        color:         '#FAF6EE',
        fontSize:      '10px',
        fontWeight:     700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding:       '4px 12px',
        borderRadius:  '4px',
        fontFamily:    "'DM Sans', sans-serif",
      }}>
        {offer.code}
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 20px 20px' }}>

        <h3 style={{
          margin:      '0 0 4px',
          fontFamily:  "'Playfair Display', serif",
          fontSize:    '1.15rem',
          fontWeight:   800,
          color:       '#1E0F06',
          lineHeight:   1.25,
        }}>
          {offer.title}
        </h3>

        <p style={{
          margin:      '0 0 12px',
          fontFamily:  "'DM Sans', sans-serif",
          fontSize:    '0.85rem',
          color:       '#5A3E2B',
          lineHeight:   1.6,
        }}>
          {offer.subtitle}
        </p>

        {/* Countdown — red accent for urgency (SRS §3.4.3: urgency-driven design) */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '6px',
          marginBottom:  '16px',
        }}>
          <span style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '11px',
            fontWeight:     600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         '#9a7055',
          }}>
            Ends in:
          </span>
          <span style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '13px',
            fontWeight:     700,
            color:          expired ? '#b91c1c' : '#C97B3A',
            letterSpacing: '0.04em',
          }}>
            {mounted ? timeLeft : '—'}
          </span>
        </div>

        {/* CTA button — matching About + TopSellers button exactly */}
        <button className="offer-btn" aria-label={`Claim ${offer.title}`} disabled={expired}>
          <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {expired ? 'Offer Ended' : 'Claim Offer'}
            {!expired && <span className="offer-btn-arrow">→</span>}
          </span>
          <span className="offer-btn-shine" />
        </button>

      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function Offers() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes of-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .of-title-wrap { animation: of-fadeUp 0.7s ease 0.1s both; }
        .of-grid        { animation: of-fadeUp 0.7s ease 0.3s both; }

        /* ── Card ── */
        .offer-card {
          position:      relative;
          width:         360px;
          background:    #FFF8EC;
          border-radius: 16px;
          overflow:      hidden;
          cursor:        pointer;
          border:        1px solid rgba(92,46,14,0.10);
          box-shadow:    0 8px 32px rgba(180,80,20,0.10), 0 2px 8px rgba(92,46,14,0.06);
          transition:    transform 0.3s ease, box-shadow 0.3s ease;
          outline:       none;
        }
        .offer-card:hover {
          transform:  translateY(-6px);
          box-shadow: 0 20px 56px rgba(180,80,20,0.18), 0 4px 16px rgba(92,46,14,0.10);
        }
        .offer-card:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }

        /* ── Button — identical to About + TopSellers ── */
        .offer-btn {
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          overflow:        hidden;
          background:      linear-gradient(135deg, #5C2E0E 0%, #A0673A 100%);
          color:           #FAF6EE;
          border:          none;
          border-radius:   50px;
          padding:         12px 28px;
          cursor:          pointer;
          font-family:     'DM Sans', sans-serif;
          font-size:       12px;
          font-weight:     600;
          letter-spacing:  0.1em;
          text-transform:  uppercase;
          box-shadow:      0 6px 20px rgba(92,46,14,0.28);
          transition:      transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          width:           100%;
          justify-content: center;
        }
        .offer-btn:hover:not(:disabled) {
          transform:  translateY(-2px);
          box-shadow: 0 10px 30px rgba(92,46,14,0.38);
          background: linear-gradient(135deg, #7a3e18 0%, #C97B3A 100%);
        }
        .offer-btn:active:not(:disabled) { transform: translateY(0); }
        .offer-btn:disabled {
          background: linear-gradient(135deg, #9a7055, #c4a882);
          cursor:     not-allowed;
          box-shadow: none;
        }
        .offer-btn:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }
        .offer-btn-arrow {
          font-size:  1rem;
          transition: transform 0.3s ease;
        }
        .offer-btn:hover .offer-btn-arrow { transform: translateX(4px); }

        /* Shine sweep */
        .offer-btn-shine {
          position:   absolute;
          top:        0;
          left:       -70%;
          width:      45%;
          height:     100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
          transform:  skewX(-20deg);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .offer-btn:hover .offer-btn-shine { left: 130%; }

        @media (max-width: 768px) {
          .offer-card { width: 100%; max-width: 400px; }
          .of-grid    { flex-direction: column; align-items: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .of-title-wrap, .of-grid { animation: none !important; opacity: 1 !important; }
          .offer-card { transition: none !important; }
          .offer-btn  { transition: none !important; }
        }
      `}</style>

      <section
        style={{
          position:   'relative',
          background: '#FFFBF3',       // ← matches About + TopSellers
          padding:    '100px 5% 110px',
          overflow:   'hidden',
        }}
        aria-labelledby="offers-heading"
      >

        {/* ── BG BLOBS — matching About + TopSellers ─────────────────── */}
        <div style={{
          position:     'absolute',
          width:        '500px',
          height:       '500px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,220,120,0.18) 0%, transparent 70%)',
          top:          '-120px',
          right:        '-80px',
          pointerEvents:'none',
        }} />
        <div style={{
          position:     'absolute',
          width:        '350px',
          height:       '350px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(200,100,50,0.08) 0%, transparent 70%)',
          bottom:       '-60px',
          left:         '5%',
          pointerEvents:'none',
        }} />

        {/* ── TITLE — matches About + TopSellers pattern exactly ──────── */}
        <div className="of-title-wrap" style={{ textAlign: 'center', marginBottom: '64px' }}>

          {/* Eyebrow label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
            <span style={{
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      '0.78rem',
              fontWeight:     600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         '#C97B3A',
            }}>
              For a Limited Time
            </span>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
          </div>

          {/* H2 — espresso + terracotta italic accent, matches About + TopSellers */}
          <h2
            id="offers-heading"
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontSize:     'clamp(2rem, 4vw, 2.8rem)',
              fontWeight:    800,
              color:        '#1E0F06',
              margin:       '0 0 12px',
              lineHeight:    1.15,
            }}
          >
            Limited Time{' '}
            <span style={{ color: '#C97B3A', fontStyle: 'italic' }}>Offers</span>
          </h2>

          <p style={{
            fontFamily:  "'DM Sans', sans-serif",
            fontSize:    '0.97rem',
            color:       '#5A3E2B',
            maxWidth:    '440px',
            margin:      '0 auto',
            lineHeight:  1.75,
          }}>
            Grab these deals before they're gone — each offer has a real deadline.
          </p>
        </div>

        {/* ── CARDS GRID ───────────────────────────────────────────────── */}
        <div
          className="of-grid"
          style={{
            display:        'flex',
            gap:            '24px',
            justifyContent: 'center',
            flexWrap:       'wrap',
          }}
          role="list"
          aria-label="Current offers"
        >
          {offers.map((offer) => (
            <div key={offer.code} role="listitem">
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
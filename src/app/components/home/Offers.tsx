'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Offer {
  title: string;
  subtitle: string;
  code: string;
  image: string;
  expires: string;
  tag: string;
  accent: string;
}

interface OfferCardProps {
  offer: Offer;
  index: number;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const offers: Offer[] = [
  {
    title: '20% Off Family Deals',
    subtitle: 'Perfect for the whole crew',
    code: 'FAMILY20',
    image: '/offers/familydeal.png',
    expires: '2026-06-30T23:59:59',
    tag: 'Most Popular',
    accent: '#C97B3A',
  },
  {
    title: 'Free Drink with Every Meal',
    subtitle: 'Any drink, any size',
    code: 'FREEDRINK',
    image: '/offers/drink.png',
    expires: '2026-05-31T23:59:59',
    tag: 'Ending Soon',
    accent: '#9B5E2A',
  },
  {
    title: 'Buy 1 Get 1 Free',
    subtitle: 'Double the joy, same price',
    code: 'BOGO3',
    image: '/offers/free.png',
    expires: '2026-05-15T23:59:59',
    tag: 'Flash Deal',
    accent: '#7A3E18',
  },
];

// ─── TIMER ────────────────────────────────────────────────────────────────────
function getTimeLeft(isoExpiry: string) {
  const total = new Date(isoExpiry).getTime() - Date.now();
  if (total <= 0) return { label: 'Expired', expired: true, urgent: false };

  const d = Math.floor(total / (1000 * 60 * 60 * 24));
  const h = Math.floor((total / (1000 * 60 * 60)) % 24);
  const m = Math.floor((total / (1000 * 60)) % 60);
  const s = Math.floor((total / 1000) % 60);
  const urgent = total < 1000 * 60 * 60 * 24; // less than 1 day

  if (d > 0) return { label: `${d}d ${h}h ${m}m`, expired: false, urgent: false };
  return { label: `${h}h ${m}m ${s}s`, expired: false, urgent };
}

// ─── OFFER CARD ───────────────────────────────────────────────────────────────
function OfferCard({ offer, index }: OfferCardProps) {
  const router = useRouter();
  const [time, setTime] = useState({ label: '—', expired: false, urgent: false });
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(offer.expires));
    const id = setInterval(() => setTime(getTimeLeft(offer.expires)), 1000);
    return () => clearInterval(id);
  }, [offer.expires]);

  const handleClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/order?promo=${offer.code}`);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/order?promo=${offer.code}`);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`offer-card offer-card-${index}`}
      role="article"
      tabIndex={0}
      aria-label={`${offer.title} — use code ${offer.code}`}
      onClick={handleClaim}
      onKeyDown={handleKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* NOISE TEXTURE OVERLAY */}
      <div className="card-noise" />

      {/* TAG PILL */}
      <div className="card-tag" style={{ background: offer.accent }}>
        {offer.tag}
      </div>

      {/* IMAGE AREA */}
      <div className="card-image-wrap">
        <div className={`card-image-inner ${hovered ? 'zoomed' : ''}`}>
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>

        {/* GRADIENT OVER IMAGE */}
        <div className="card-image-gradient" style={{
          background: `linear-gradient(to top, #1A0A03 10%, rgba(26,10,3,0.5) 50%, transparent 100%)`
        }} />

        {/* TITLE OVER IMAGE */}
        <div className="card-image-text">
          <p className="card-subtitle">{offer.subtitle}</p>
          <h3 className="card-title">{offer.title}</h3>
        </div>
      </div>

      {/* BOTTOM PANEL */}
      <div className="card-body">

        {/* COUNTDOWN ROW */}
        <div className="card-timer-row">
          <div className="timer-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <span className="timer-label">Ends in</span>
          <span
            className="timer-value"
            style={{ color: time.expired ? '#ef4444' : time.urgent ? '#f97316' : offer.accent }}
          >
            {mounted ? time.label : '—'}
          </span>

          {time.urgent && !time.expired && (
            <span className="urgency-pill">Hurry!</span>
          )}
        </div>

        {/* DIVIDER */}
        <div className="card-divider" />

        {/* PROMO CODE + CLAIM */}
        <div className="card-actions">
          <button
            className="code-pill"
            onClick={handleCopyCode}
            aria-label={`Copy promo code ${offer.code}`}
            title="Click to copy"
          >
            <span className="code-text">{copied ? '✓ Copied!' : offer.code}</span>
            <span className="code-icon">
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              )}
            </span>
          </button>

          <button
            className="claim-btn"
            onClick={handleClaim}
            disabled={time.expired}
            aria-label={`Claim ${offer.title}`}
            style={{
              background: time.expired
                ? 'rgba(120,80,40,0.25)'
                : `linear-gradient(135deg, ${offer.accent}, #F0A855)`,
            }}
          >
            <span className="claim-btn-text">
              {time.expired ? 'Ended' : 'Claim'}
            </span>
            {!time.expired && (
              <span className="claim-btn-arrow">→</span>
            )}
            <span className="claim-btn-shine" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── FLOATING PARTICLES ───────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className={`particle p${i}`} />
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Offers() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── FONTS ────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        /* ── KEYFRAMES ────────────────────────────── */

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        @keyframes particleDrift {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-80vh) translateX(var(--dx, 30px)) scale(0.5); opacity: 0; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulseRing {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201,123,58,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(201,123,58,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0  rgba(201,123,58,0); }
        }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400px); }
        }

        @keyframes badgePop {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          70%  { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes borderGlow {
          0%, 100% { border-color: rgba(201,123,58,0.25); }
          50%       { border-color: rgba(201,123,58,0.65); }
        }

        /* ── PAGE SECTION ─────────────────────────── */

        .offers-section {
          position: relative;
          min-height: 100vh;
          background: #f8f2e9;
          padding: 120px 5% 140px;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ── ATMOSPHERIC BG ───────────────────────── */

        .bg-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-radial-1 {
          position: absolute;
          width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,123,58,0.12) 0%, transparent 65%);
          top: -200px; right: -100px;
          animation: floatY 8s ease-in-out infinite;
        }

        .bg-radial-2 {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(122,62,24,0.10) 0%, transparent 65%);
          bottom: -150px; left: -100px;
          animation: floatY 10s ease-in-out 2s infinite;
        }

        .bg-radial-3 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,180,80,0.06) 0%, transparent 65%);
          top: 40%; left: 30%;
          animation: floatY 12s ease-in-out 4s infinite;
        }

        /* Subtle grain */
        .bg-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        /* Horizontal lines */
        .bg-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.012) 80px,
            rgba(255,255,255,0.012) 81px
          );
        }

        /* ── PARTICLES ────────────────────────────── */

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(201,123,58,0.7);
          animation: particleDrift linear infinite;
        }

        .p0  { width:3px;height:3px; left:8%;  bottom:0; animation-duration:9s;  animation-delay:0s;   --dx: 20px; }
        .p1  { width:2px;height:2px; left:15%; bottom:0; animation-duration:12s; animation-delay:1s;   --dx:-15px; }
        .p2  { width:4px;height:4px; left:22%; bottom:0; animation-duration:8s;  animation-delay:2s;   --dx: 35px; }
        .p3  { width:2px;height:2px; left:30%; bottom:0; animation-duration:14s; animation-delay:0.5s; --dx:-10px; }
        .p4  { width:3px;height:3px; left:38%; bottom:0; animation-duration:10s; animation-delay:3s;   --dx: 25px; }
        .p5  { width:2px;height:2px; left:45%; bottom:0; animation-duration:11s; animation-delay:1.5s; --dx:-20px; }
        .p6  { width:5px;height:5px; left:52%; bottom:0; animation-duration:7s;  animation-delay:4s;   --dx: 15px; }
        .p7  { width:2px;height:2px; left:60%; bottom:0; animation-duration:13s; animation-delay:0.8s; --dx:-30px; }
        .p8  { width:3px;height:3px; left:68%; bottom:0; animation-duration:9s;  animation-delay:2.5s; --dx: 40px; }
        .p9  { width:2px;height:2px; left:75%; bottom:0; animation-duration:15s; animation-delay:1.2s; --dx:-12px; }
        .p10 { width:4px;height:4px; left:82%; bottom:0; animation-duration:8s;  animation-delay:3.5s; --dx: 22px; }
        .p11 { width:2px;height:2px; left:88%; bottom:0; animation-duration:11s; animation-delay:0.3s; --dx:-18px; }
        .p12 { width:3px;height:3px; left:5%;  bottom:0; animation-duration:10s; animation-delay:5s;   --dx: 28px; }
        .p13 { width:2px;height:2px; left:92%; bottom:0; animation-duration:12s; animation-delay:2s;   --dx:-25px; }
        .p14 { width:6px;height:6px; left:35%; bottom:0; animation-duration:6s;  animation-delay:1s;   --dx: 10px; background:rgba(255,200,100,0.5); }
        .p15 { width:2px;height:2px; left:55%; bottom:0; animation-duration:16s; animation-delay:0.6s; --dx:-35px; }
        .p16 { width:3px;height:3px; left:70%; bottom:0; animation-duration:9s;  animation-delay:4.5s; --dx: 30px; }
        .p17 { width:2px;height:2px; left:25%; bottom:0; animation-duration:13s; animation-delay:3s;   --dx:-8px; }

        /* ── HEADER ───────────────────────────────── */

        .offers-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 80px;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }

        .header-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C97B3A);
        }

        .eyebrow-line.right {
          background: linear-gradient(90deg, #C97B3A, transparent);
        }

        .eyebrow-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C97B3A;
        }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5.5vw, 3.6rem);
    font-weight: 600;
    color: #1E0F06;
    line-height: 1.1;
    margin: 0 0 14px 0;
    letter-spacing: 0.01em;
        }

        .header-title em {
          font-style: italic;
          color: #C97B3A;
          position: relative;
        }

       

        @keyframes scaleIn {
          to { transform: scaleX(1); }
        }

        .header-tagline {
              font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.88rem, 2vw, 1rem);
    font-weight: 300;
    color: #7a5c44;
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto;
        }

        /* ── CARDS GRID ───────────────────────────── */

        .offers-grid {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 28px;
          justify-content: center;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        /* Stagger each card */
        .offer-card-0 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .offer-card-1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s both; }
        .offer-card-2 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.62s both; }

        /* ── CARD ─────────────────────────────────── */

        .offer-card {
          position: relative;
    width: 340px;
    background: #a0673a0a;
    border-radius: 20px;
    overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(201,123,58,0.25);
          transition:
            transform 0.45s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.45s ease,
            border-color 0.3s ease;
          outline: none;
          animation: borderGlow 4s ease-in-out infinite;
        }

        .offer-card:hover {
          transform: translateY(-10px) scale(1.015);
          box-shadow:
            0 30px 80px rgba(201,123,58,0.22),
            0 0 0 1px rgba(201,123,58,0.4),
            inset 0 1px 0 rgba(255,200,120,0.08);
          border-color: rgba(201,123,58,0.6);
          animation: none;
        }

        .offer-card:focus-visible {
          outline: 2px solid #C97B3A;
          outline-offset: 4px;
        }

        /* Noise texture */
        .card-noise {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* TAG PILL */
        .card-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 50px;
          animation: badgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.8s both;
        }

        /* IMAGE */
        .card-image-wrap {
          position: relative;
          width: 100%;
          height: 173px;
          background: #35201a;
          overflow: hidden;
        }

        .card-image-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
        }

        .card-image-inner.zoomed {
          transform: scale(1.04);
        }

        .card-image-gradient {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        /* Scanline effect */
        .card-image-wrap::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,200,100,0.15), transparent);
          z-index: 3;
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }

        .card-image-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 18px 20px 16px;
          z-index: 4;
        }

        .card-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,200,130,0.7);
          margin: 0 0 4px;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #FAF0E0;
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        /* BODY */
        .card-body {
          position: relative;
          z-index: 5;
          padding: 18px 20px 20px;
        }

        /* TIMER */
        .card-timer-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 14px;
        }

        .timer-icon {
          color: rgba(250,220,160,0.5);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .timer-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(250,220,160,0.45);
        }

        .timer-value {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .urgency-pill {
          margin-left: auto;
          background: rgba(239,68,68,0.18);
          color: #fca5a5;
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 50px;
          border: 1px solid rgba(239,68,68,0.3);
          animation: pulseRing 1.5s ease-in-out infinite;
        }

        /* DIVIDER */
        .card-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,123,58,0.3), transparent);
          margin-bottom: 16px;
        }

        /* ACTIONS */
        .card-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        /* CODE PILL */
        .code-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(201,123,58,0.1);
          border: 1px dashed rgba(201,123,58,0.4);
          border-radius: 8px;
          padding: 9px 13px;
          cursor: pointer;
          transition:
            background 0.25s,
            border-color 0.25s,
            transform 0.2s;
          flex-shrink: 0;
        }

        .code-pill:hover {
          background: rgba(201,123,58,0.18);
          border-color: rgba(201,123,58,0.7);
          transform: scale(1.03);
        }

        .code-text {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C97B3A;
          white-space: nowrap;
        }

        .code-icon {
          color: rgba(201,123,58,0.7);
          display: flex;
          align-items: center;
        }

        /* CLAIM BUTTON */
        .claim-btn {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 10px;
          padding: 12px 18px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          overflow: hidden;
          transition:
            transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.3s ease,
            filter 0.2s;
        }

        .claim-btn:not(:disabled):hover {
          transform: scale(1.04);
          box-shadow: 0 8px 24px rgba(201,123,58,0.5);
          filter: brightness(1.1);
        }

        .claim-btn:disabled {
          cursor: not-allowed;
          color: rgba(255,255,255,0.4);
          filter: grayscale(0.4);
        }

        .claim-btn-text {
          position: relative;
          z-index: 1;
        }

        .claim-btn-arrow {
          position: relative;
          z-index: 1;
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .claim-btn:hover .claim-btn-arrow {
          transform: translateX(4px);
        }

        .claim-btn-shine {
          position: absolute;
          top: 0; left: -70%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }

        .claim-btn:hover .claim-btn-shine {
          left: 130%;
        }

        /* ── BOTTOM STRIP ─────────────────────────── */

        .offers-footer {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 72px;
          animation: fadeIn 1s ease 1.2s both;
        }

        .footer-strip {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          border: 1px solid rgba(201,123,58,0.2);
          border-radius: 50px;
          padding: 14px 32px;
          background: rgba(201,123,58,0.06);
          backdrop-filter: blur(8px);
        }

        .footer-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C97B3A;
          animation: pulseRing 2s ease-in-out infinite;
        }

        .footer-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(250,220,160,0.6);
          letter-spacing: 0.04em;
        }

        /* ── RESPONSIVE ───────────────────────────── */

        @media (max-width: 1060px) {
          .offers-grid {
            gap: 22px;
          }
          .offer-card {
            width: 300px;
          }
        }

        @media (max-width: 768px) {
          .offers-section {
            padding: 90px 0 100px;
            overflow-x: hidden;
          }

          .offers-header {
            padding: 0 24px;
            margin-bottom: 52px;
          }

          /* Horizontal scroll on mobile */
          .offers-grid {
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 16px;
            overflow-x: auto;
            padding: 12px 24px 32px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .offers-grid::-webkit-scrollbar {
            display: none;
          }

          .offer-card {
            width: 300px;
            flex-shrink: 0;
            scroll-snap-align: center;
          }

          /* Swipe hint dots */
          .scroll-hint {
            display: flex !important;
            justify-content: center;
            gap: 6px;
            margin-top: 20px;
          }

          .offers-footer {
            padding: 0 24px;
          }
        }

        .scroll-hint {
          display: none;
        }

        .scroll-hint-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(201,123,58,0.3);
          transition: background 0.3s;
        }

        .scroll-hint-dot.active {
          background: #C97B3A;
          width: 18px;
          border-radius: 3px;
        }

      `}</style>

      <section
        className="offers-section"
        aria-labelledby="offers-heading"
      >

        {/* BACKGROUND */}
        <div className="bg-layer">
          <div className="bg-radial-1" />
          <div className="bg-radial-2" />
          <div className="bg-radial-3" />
          <div className="bg-grain" />
          <div className="bg-lines" />
        </div>

        {/* FLOATING PARTICLES */}
        <Particles />

        {/* HEADER */}
        <header className="offers-header">
          <div className="header-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">For a Limited Time</span>
            <span className="eyebrow-line right" />
          </div>

          <h2
            id="offers-heading"
            className="header-title"
          >
            Exclusive{' '}
            <em>Offers</em>
            {' '}& Deals
          </h2>

          <p className="header-tagline">
            Handpicked savings — claim yours before they're gone
          </p>
        </header>

        {/* CARDS */}
        <div
          className="offers-grid"
          role="list"
          aria-label="Current offers"
        >
          {offers.map((offer, i) => (
            <div key={offer.code} role="listitem">
              <OfferCard offer={offer} index={i} />
            </div>
          ))}
        </div>

        {/* MOBILE SWIPE DOTS */}
        <div className="scroll-hint" aria-hidden="true">
          {offers.map((_, i) => (
            <div key={i} className={`scroll-hint-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>

        

      </section>
    </>
  );
}

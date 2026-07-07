'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Re-trigger every time section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setVisible(true))
          );
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Drop-in keyframe: falls from above into place ── */
        @keyframes dropIn {
          0%   { opacity: 0; transform: translateY(-40px); }
          60%  { transform: translateY(6px); }
          80%  { transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ── Fade up for subtitle ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Scroll cue bounce ── */
        @keyframes scrollPulse {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50%       { transform: translateX(-50%) translateY(6px); opacity: 1; }
        }

        /* ── Shine sweep on button ── */
        @keyframes shineSweep {
          from { left: -70%; }
          to   { left: 130%; }
        }

        /* ── Staggered reveals — only when .h-vis applied ── */
        .h-vis .h-line1 {
          animation: dropIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both;
        }
        .h-vis .h-line2 {
          animation: dropIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }
        .h-vis .h-sub {
          animation: fadeUp 0.65s ease 0.6s both;
        }
        .h-vis .h-btn {
          animation: fadeUp 0.65s ease 0.8s both;
        }
        .h-vis .h-scroll {
          animation: fadeUp 0.6s ease 1.05s both;
        }

        /* ── Shop Now button ── */
        .shop-now-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 38px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FAF6EE;
          background: transparent;
          /* Two-tone border: gold top+right, cream bottom+left */
          border:    1.5px solid #C77A3A;
          overflow: hidden;
          transition:
            color            0.35s ease,
            border-color     0.35s ease,
            background       0.35s ease,
            transform        0.25s ease,
            box-shadow       0.35s ease;
        }

        .shop-now-btn:hover {
          color:       #e6dcd5;
          background:  #C77A3A;
          border-color: #C77A3A;
          transform:   translateY(-3px);
          box-shadow:  0 10px 36px rgba(201,168,76,0.32);
        }

        /* Arrow slides right on hover */s
        .shop-now-btn .btn-arrow {
          display: inline-block;
          font-size: 15px;
          transition: transform 0.3s ease;
        }
        .shop-now-btn:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Shine sweep */
        .shop-now-btn .btn-shine {
          position: absolute;
          top: 0; left: -70%;
          width: 45%; height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.18) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.1s;
        }
        .shop-now-btn:hover .btn-shine {
          opacity: 1;
          animation: shineSweep 0.55s ease forwards;
        }

        /* Scroll cue */
        .h-scroll-btn {
          position: absolute;
          bottom: 1.8rem; left: 50%;
          transform: translateX(-50%);
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 0; zIndex: 10;
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        .h-scroll-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(250,246,238,0.38);
        }
        .h-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, #C77A3A, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .h-vis .h-line1,
          .h-vis .h-line2,
          .h-vis .h-sub,
          .h-vis .h-btn,
          .h-vis .h-scroll {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={visible ? 'h-vis' : ''}
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        aria-label="Hero"
      >
        {/* ── Fallback bg ── */}
        <div style={{
          position: 'absolute',
  inset: 0,
  background: '#1A0F08',   // dark fallback — shows before video loads
  zIndex: 0,
          
       
        }} />

        {/* ── Video ── */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1,
            filter: 'brightness(0.82) contrast(1.05)',
          }}
        >
        
          <source src="/temp-video.mp4" type="temp-video/mp4" />
        </video>

        {/* ── Dark overlay ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.36)',
          zIndex: 2,
        }} />

        {/* ── Gold glow ── */}
        <div style={{
          position: 'absolute',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 68%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          zIndex: 3, pointerEvents: 'none',
        }} />

        {/* ── Content ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          padding: '0 clamp(20px,5vw,40px)',
          maxWidth: '800px',
          width: '100%',
        }}>

          {/* Line 1 — drops in first */}
          <div className="h-line1" style={{ overflow: 'hidden' }}>
            <h1 style={{
              fontFamily: "'Amatic SC', cursive",
              fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
              fontWeight: 700,
              color: '#FAF6EE',
              lineHeight: 1.1,
              letterSpacing: '2px',
              margin: 0,
            }}>
              Where Every Bite
            </h1>
          </div>

          {/* Line 2 — drops in second, slightly later */}
          <div className="h-line2" style={{ overflow: 'hidden', marginBottom: '20px' }}>
            <h1 style={{
              fontFamily: "'Amatic SC', cursive",
              fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
              fontWeight: 700,
              color: '#C77A3A',
              lineHeight: 1.1,
              letterSpacing: '2px',
              margin: 0,
            }}>
              Tells a Story
            </h1>
          </div>

          {/* Subtitle — fades up */}
          <p className="h-sub" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.82rem, 2vw, 0.96rem)',
            fontWeight: 300,
            color: 'rgba(252, 252, 252, 0.86)',
            letterSpacing: '0.1em',
            marginBottom: '38px',
          }}>
            Authentic flavours & Crafted Daily
          </p>

          {/* Button — fades up last */}
          <div className="h-btn">
            <Link href="/menu" className="shop-now-btn">
              Shop Now
              <span className="btn-arrow">→</span>
              <span className="btn-shine" />
            </Link>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <button
          className="h-scroll h-scroll-btn"
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          <span className="h-scroll-label">Scroll</span>
          <span className="h-scroll-line" />
        </button>
      </section>
    </>
  );
}

'use client';

import { useEffect,useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
   const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  

 useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          console.log('Autoplay blocked but handled safely:', err);
        }
      };

      playVideo();
    }
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Global styles: keyframes + hover states ─────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translate(0, 0);   }
          50%       { transform: rotate(45deg) translate(3px, 3px); }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.4; transform: scaleX(1);    }
          50%       { opacity: 0.9; transform: scaleX(1.08); }
        }
        @keyframes badgeFade {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);      }
        }

        /* Staggered content reveals */
        .hero-badge    { animation: badgeFade 0.6s ease 0.2s both; }
        .hero-eyebrow  { animation: fadeUp   0.7s ease 0.35s both; }
        .hero-h1       { animation: fadeUp   0.7s ease 0.5s  both; }
        .hero-sub      { animation: fadeUp   0.7s ease 0.65s both; }
        .hero-btns     { animation: fadeUp   0.7s ease 0.8s  both; }
        .hero-scroll   { animation: fadeIn   0.8s ease 1.2s  both; }
        .hero-stats    { animation: fadeUp   0.7s ease 0.95s both; }

        
        /* Button hover states */
        .btn-primary {
          background:     #C9A84C;
          color:          #1A0F08;
          font-family:    'DM Sans', sans-serif;
          font-weight:    600;
          font-size:      13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding:        15px 36px;
          border-radius:  3px;
          text-decoration: none;
          display:        inline-block;
          transition:     background 0.25s, transform 0.2s, box-shadow 0.25s;
          border:         none;
          cursor:         pointer;
        }
        .btn-primary:hover {
          background:  #E8C97A;
          transform:   translateY(-2px);
          box-shadow:  0 8px 32px rgba(201,168,76,0.35);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-outline {
          background:     transparent;
          color:          #FAF6EE;
          font-family:    'DM Sans', sans-serif;
          font-weight:    500;
          font-size:      13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding:        15px 36px;
          border:         1px solid rgba(250,246,238,0.35);
          border-radius:  3px;
          text-decoration: none;
          display:        inline-block;
          transition:     border-color 0.25s, color 0.25s, background 0.25s, transform 0.2s;
        }
        .btn-outline:hover {
          border-color: #C97B3A  ;
          color:        #C97B3A  ;
          background:   rgba(201,168,76,0.06);
          transform:    translateY(-2px);
        }
        .btn-outline:active { transform: translateY(0); }

        /* Scroll cue */
        .scroll-cue {
          position:       absolute;
          bottom:         2.2rem;
          left:           50%;
          transform:      translateX(-50%);
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            8px;
          background:     none;
          border:         none;
          cursor:         pointer;
          padding:        0;
        }
        .scroll-cue:hover .scroll-arrow {
          border-color: rgba(201,168,76,0.9);
        }
        .scroll-label {
          font-family:    'DM Sans', sans-serif;
          font-size:      10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          rgba(250,246,238,0.38);
        }
        .scroll-arrow {
          display:      block;
          width:        11px;
          height:       11px;
          border-right: 1.5px solid rgba(201,168,76,0.5);
          border-bottom:1.5px solid rgba(201,168,76,0.5);
          animation:    bounce 1.6s ease-in-out infinite;
          transition:   border-color 0.2s;
        }

        /* Decorative horizontal rule */
        .hero-rule {
          width:      60px;
          height:     1px;
          background: #C9A84C;
          margin:     0 auto 1.4rem;
          animation:  linePulse 3s ease-in-out infinite;
        }

        /* Stats row */
        .stat-divider {
          width:      1px;
          height:     32px;
          background: rgba(201,168,76,0.25);
        }

        /* Video fade-in */
        .hero-video {
          transition: opacity 1.2s ease;
        }

        /* Diagonal texture overlay */
        .hero-texture {
          position:         absolute;
          inset:             0;
          opacity:           0.04;
          background-image:  repeating-linear-gradient(
            -45deg,
            #C9A84C 0,
            #C9A84C 1px,
            transparent 0,
            transparent 50%
          );
          background-size:   18px 18px;
          pointer-events:    none;
        }

        /* Vignette: darkens edges */
        .hero-vignette {
          position:   absolute;
          inset:       0;
          background:  radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(15,8,4,0.65) 100%
          );
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .hero-stats { display: none !important; }
          .hero-eyebrow { font-size: 10px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge, .hero-eyebrow, .hero-h1,
          .hero-sub, .hero-btns, .hero-scroll,
          .hero-stats, .scroll-arrow, .hero-rule {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <section
        style={{
          position:       'relative',
          height:         '100vh',
          minHeight:      '600px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
        }}
        aria-label="Hero — Saqafat Bakery"
      >

        {/* ── LAYER 1: Fallback gradient (always visible, sits under video) */}
        <div
          style={{
            position:   'absolute',
            inset:       0,
            background:  'linear-gradient(160deg, #1A0F08 0%, #3D2B1F 55%, #1E0A05 100%)',
            zIndex:      0,
          }}
        />

        {/* ── LAYER 2: Background video ────────────────────────────────── */}
       

          {/* VIDEO LAYER */}
      <video
        ref={videoRef}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,

          /* FIX: no more disappearing video */
          opacity: videoLoaded ? 1 : 1,

          transition: 'opacity 0.8s ease',

          /* extra stability */
          filter: 'blur(1.2px) brightness(0.9)',
        }}
      >
        <source src="/tea.mp4" type="video/mp4" />
      </video>

        {/* ── LAYER 3: Dark overlay on top of video (40% per SRS §3.4.1) */}
        <div
          style={{
            position:   'absolute',
            inset:       0,
            background:  'rgba(0, 0, 0, 0.42)',
            zIndex:      2,
          }}
        />

        {/* ── LAYER 4: Diagonal texture grain */}
        <div className="hero-texture" style={{ zIndex: 3 }} />

        {/* ── LAYER 5: Radial vignette */}
        <div className="hero-vignette" style={{ zIndex: 4 }} />

        {/* ── LAYER 6: Centered gold glow (atmosphere) */}
        <div
          style={{
            position:     'absolute',
            width:        '700px',
            height:       '700px',
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 68%)',
            top:          '50%',
            left:         '50%',
            transform:    'translate(-50%, -50%)',
            zIndex:       5,
            pointerEvents:'none',
          }}
        />

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div
          style={{
            position:   'relative',
            zIndex:      10,
            textAlign:  'center',
            maxWidth:   '820px',
            padding:    '0 2rem',
            width:      '100%',
          }}
        >


          {/* H1 */}
          <h1
            className="hero-h1"
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontSize:     'clamp(3rem, 7.5vw, 6rem)',
              fontWeight:    900,
              lineHeight:    1.05,
              color:       '#FAF6EE',
              marginBottom: '1.2rem',
              letterSpacing: '-0.01em',
            }}
          >
            Saqafatify{' '}
            <span
              style={{
                color:       ' #C9A84C',
                fontStyle:   'italic',
                display:     'block',
              }}
            >
              Your Tastebuds
            </span>
          </h1>

          {/* Subheadline — exact SRS §3.4.1 copy */}
          <p
            className="hero-sub"
            style={{
              fontFamily:   "'DM Sans', sans-serif",
              fontSize:     'clamp(1rem, 2vw, 1.15rem)',
              fontWeight:    400,
              color:        'rgba(250,246,238,0.62)',
              lineHeight:    1.75,
              marginBottom: '2.6rem',
              maxWidth:     '540px',
              margin:       '0 auto 2.6rem',
            }}
          >
            Authentic Pakistani flavors,{' '}
            <span style={{ color: 'rgba(250,246,238,0.85)' }}>baked with love</span>{' '}
            since 2009.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-btns"
            style={{
              display:        'flex',
              gap:            '1rem',
              justifyContent: 'center',
              flexWrap:       'wrap',
              marginBottom:   '3.5rem',
            }}
          >
            <Link href="/order" className="btn-primary">
              Order Now
            </Link>
            <Link href="/menu" className="btn-outline">
              Explore Menu
            </Link>
          </div>

          
          

        </div>

        {/* ── SCROLL CUE ───────────────────────────────────────────────── */}
        <button
          className="scroll-cue hero-scroll"
          onClick={handleScrollDown}
          aria-label="Scroll down to explore"
        >
          <span className="scroll-label">Scroll</span>
          <span className="scroll-arrow" />
        </button>

      </section>
    </>
  );
}
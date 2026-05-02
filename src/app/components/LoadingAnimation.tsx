'use client';

import { useEffect, useState, useRef } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Phase =
  | 'idle'          // before animation starts
  | 'bread'         // bread icon draws in
  | 'logo'          // SAQAFAT text reveals
  | 'tagline'       // tagline fades in
  | 'hold'          // brief hold at full visibility
  | 'exit'          // everything fades out
  | 'done';         // component unmounts

interface LoadingAnimationProps {
  onComplete?: () => void; // called when animation finishes
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [phase,   setPhase  ] = useState<Phase>('idle');
  const [visible, setVisible] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    // Check sessionStorage — only play once per session (SRS §3.1)
    const played = sessionStorage.getItem('saqafat_loading_played');
    if (played) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // ── Animation timeline ─────────────────────────────────────────
    // 0ms       → bread icon starts drawing
    // 500ms     → logo text starts revealing
    // 1100ms    → tagline fades in
    // 1800ms    → hold (everything visible)
    // 2500ms    → exit fade starts
    // 3000ms    → done — total: 3s (SRS §3.1 max)

    addTimer(() => setPhase('bread'),   0);
    addTimer(() => setPhase('logo'),    500);
    addTimer(() => setPhase('tagline'), 1100);
    addTimer(() => setPhase('hold'),    1800);
    addTimer(() => setPhase('exit'),    2500);
    addTimer(() => {
      setPhase('done');
      setVisible(false);
      sessionStorage.setItem('saqafat_loading_played', '1');
      onComplete?.();
    }, 3000);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  const isExit = phase === 'exit' || phase === 'done';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Bread SVG path draw ── */
        @keyframes la-draw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0;   }
        }

        /* ── Fill bread after draw ── */
        @keyframes la-fill {
          from { fill-opacity: 0; }
          to   { fill-opacity: 1; }
        }

        /* ── Logo letters slide up one by one ── */
        @keyframes la-letter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Tagline fade up ── */
        @keyframes la-tagline {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Gold line expand ── */
        @keyframes la-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── Particle float ── */
        @keyframes la-particle {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 0;   }
          20%  { opacity: 0.7; }
          100% { transform: translateY(-80px) rotate(180deg); opacity: 0; }
        }

        /* ── Shimmer sweep on logo ── */
        @keyframes la-shimmer {
          0%   { left: -80%; }
          100% { left: 120%; }
        }

        /* ── Outer ring pulse ── */
        @keyframes la-ring {
          0%   { transform: scale(0.8); opacity: 0;   }
          50%  { opacity: 0.4; }
          100% { transform: scale(1.2); opacity: 0;   }
        }

        /* ── Full screen exit ── */
        @keyframes la-exit {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        .la-screen {
          position:        fixed;
          inset:           0;
          z-index:         9999;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          background:      #1A0F08;
          overflow:        hidden;
        }
        .la-screen.exiting {
          animation: la-exit 0.5s ease forwards;
        }

        /* Bread SVG path */
        .la-bread-path {
          stroke-dasharray:  600;
          stroke-dashoffset: 600;
          fill-opacity:      0;
          transition:        fill-opacity 0.4s ease 0.3s;
        }
        .la-bread-path.drawing {
          animation: la-draw 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .la-bread-path.filled {
          fill-opacity: 1;
          animation:
            la-draw 0.8s cubic-bezier(0.4,0,0.2,1) forwards,
            la-fill 0.4s ease 0.5s forwards;
        }

        /* Outer ring */
        .la-ring {
          position:      absolute;
          width:         160px;
          height:        160px;
          border-radius: 50%;
          border:        1.5px solid rgba(201,168,76,0.25);
          animation:     la-ring 2s ease-in-out infinite;
        }
        .la-ring-2 {
          animation-delay: 0.7s;
        }

        /* Logo letters */
        .la-letter {
          display:   inline-block;
          opacity:   0;
          transform: translateY(18px);
        }
        .la-letter.visible {
          animation: la-letter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        /* Shimmer on logo */
        .la-shimmer {
          position:       absolute;
          top:            0;
          left:           -80%;
          width:          60%;
          height:         100%;
          background:     linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform:      skewX(-15deg);
          pointer-events: none;
        }
        .la-shimmer.active {
          animation: la-shimmer 0.8s ease 0.3s forwards;
        }

        /* Gold divider line */
        .la-line {
          width:            80px;
          height:           1px;
          background:       #C9A84C;
          transform-origin: center;
          transform:        scaleX(0);
        }
        .la-line.visible {
          animation: la-line 0.5s ease forwards;
        }

        /* Tagline */
        .la-tagline {
          opacity:   0;
          transform: translateY(10px);
        }
        .la-tagline.visible {
          animation: la-tagline 0.6s ease forwards;
        }

        /* Progress bar */
        @keyframes la-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .la-progress-fill {
          height:        100%;
          background:    linear-gradient(90deg, #5C2E0E, #C97B3A, #E8C97A);
          border-radius: 2px;
          animation:     la-progress 2.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        /* Particles */
        .la-particle {
          position:      absolute;
          border-radius: 50%;
          pointer-events:none;
        }

        @media (prefers-reduced-motion: reduce) {
          .la-screen        { animation: none !important; }
          .la-bread-path    { animation: none !important; stroke-dashoffset: 0; fill-opacity: 1; }
          .la-letter        { animation: none !important; opacity: 1; transform: none; }
          .la-tagline       { animation: none !important; opacity: 1; transform: none; }
          .la-line          { animation: none !important; transform: scaleX(1); }
          .la-progress-fill { animation: none !important; width: 100%; }
          .la-ring          { animation: none !important; }
          .la-shimmer       { animation: none !important; }
        }
      `}</style>

      {/* ── SCREEN ─────────────────────────────────────────────────────── */}
      <div className={`la-screen${isExit ? ' exiting' : ''}`} aria-live="polite" aria-label="Loading Saqafat">

        {/* ── Warm radial glow behind everything ── */}
        <div style={{
          position:     'absolute',
          width:        '500px',
          height:       '500px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)',
          pointerEvents:'none',
        }} />

        {/* ── Floating particles ── */}
        {[
          { size:4,  x:'38%',  delay:'0.2s',  dur:'2.2s', color:'rgba(201,168,76,0.6)'  },
          { size:3,  x:'55%',  delay:'0.6s',  dur:'2.6s', color:'rgba(232,201,122,0.5)' },
          { size:5,  x:'44%',  delay:'1.0s',  dur:'2.0s', color:'rgba(160,103,58,0.5)'  },
          { size:3,  x:'60%',  delay:'0.4s',  dur:'2.4s', color:'rgba(201,168,76,0.4)'  },
          { size:4,  x:'35%',  delay:'0.8s',  dur:'2.8s', color:'rgba(232,201,122,0.4)' },
        ].map((p, i) => (
          <div
            key={i}
            className="la-particle"
            style={{
              width:           p.size,
              height:          p.size,
              background:      p.color,
              bottom:          '35%',
              left:            p.x,
              animation:       `la-particle ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        {/* ── Pulsing rings ── */}
        <div className="la-ring" />
        <div className="la-ring la-ring-2" />

        {/* ── Bread icon (SVG — mimics Saqafat logo shape) ── */}
        <div style={{ position:'relative', marginBottom:'20px' }}>
          <svg
            width="100"
            height="80"
            viewBox="0 0 120 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Bread loaf outline */}
            <path
              className={`la-bread-path ${
                phase === 'bread' ? 'drawing' :
                phase !== 'idle'  ? 'filled'  : ''
              }`}
              d="M10 72 C10 72 8 50 20 38 C28 30 36 26 60 26 C84 26 92 30 100 38 C112 50 110 72 110 72 Z
                 M10 72 L110 72 L110 80 Q60 88 10 80 Z
                 M30 26 Q60 10 90 26"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(201,168,76,0.12)"
            />
            {/* Arabic-style dots inside bread */}
            <circle
              cx="44" cy="54"
              r="3"
              fill="#C9A84C"
              opacity={phase !== 'idle' && phase !== 'bread' ? 1 : 0}
              style={{ transition:'opacity 0.4s ease 0.6s' }}
            />
            <circle
              cx="60" cy="50"
              r="3"
              fill="#C9A84C"
              opacity={phase !== 'idle' && phase !== 'bread' ? 1 : 0}
              style={{ transition:'opacity 0.4s ease 0.7s' }}
            />
            <circle
              cx="76" cy="54"
              r="3"
              fill="#C9A84C"
              opacity={phase !== 'idle' && phase !== 'bread' ? 1 : 0}
              style={{ transition:'opacity 0.4s ease 0.8s' }}
            />
          </svg>
        </div>

        {/* ── SAQAFAT logo text — letters stagger in ── */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          <div
            style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      'clamp(2.4rem, 8vw, 4rem)',
              fontWeight:     900,
              color:         '#C9A84C',
              letterSpacing: '0.15em',
              lineHeight:     1,
              display:       'flex',
              gap:           '2px',
              position:      'relative',
            }}
            aria-label="SAQAFAT"
          >
            {'SAQAFAT'.split('').map((letter, i) => (
              <span
                key={i}
                className={`la-letter ${
                  phase !== 'idle' && phase !== 'bread' ? 'visible' : ''
                }`}
                style={{
                  animationDelay: `${i * 0.07}s`,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}

            {/* Shimmer sweep */}
            <span
              className={`la-shimmer ${
                phase === 'tagline' || phase === 'hold' ? 'active' : ''
              }`}
            />
          </div>
        </div>

        {/* ── Gold divider line ── */}
        <div
          className={`la-line ${
            phase === 'tagline' || phase === 'hold' || phase === 'exit' ? 'visible' : ''
          }`}
          style={{ margin:'14px auto 14px' }}
        />

        {/* ── Tagline ── */}
        <p
          className={`la-tagline ${
            phase === 'tagline' || phase === 'hold' || phase === 'exit' ? 'visible' : ''
          }`}
          style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      'clamp(0.65rem, 2vw, 0.78rem)',
            fontWeight:     500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'rgba(250,246,238,0.6)',
            margin:        '0 0 48px',
          }}
        >
          Bakery &amp; Cafe
        </p>

        {/* ── Sub tagline ── */}
        <p
          className={`la-tagline ${
            phase === 'tagline' || phase === 'hold' || phase === 'exit' ? 'visible' : ''
          }`}
          style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      'clamp(0.7rem, 1.5vw, 0.82rem)',
            fontWeight:     400,
            letterSpacing: '0.12em',
            color:         'rgba(250,246,238,0.35)',
            margin:        '-40px 0 48px',
            fontStyle:     'italic',
            animationDelay:'0.15s',
          }}
        >
          Authentic Pakistani Flavors Since 2009
        </p>

        {/* ── Progress bar ── */}
        <div style={{
          position:     'absolute',
          bottom:       '32px',
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        '160px',
          textAlign:    'center',
        }}>
          <div style={{
            width:        '100%',
            height:       '2px',
            background:   'rgba(201,168,76,0.15)',
            borderRadius: '2px',
            overflow:     'hidden',
            marginBottom: '10px',
          }}>
            {phase !== 'idle' && <div className="la-progress-fill" />}
          </div>
          <span style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(250,246,238,0.25)',
          }}>
            Loading
          </span>
        </div>

      </div>
    </>
  );
}
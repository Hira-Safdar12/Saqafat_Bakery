'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'hidden' | 'sliding' | 'spinning' | 'done'>('hidden');
  const [btnHovered, setBtnHovered] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all pending timeouts
  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset & restart animation every time section enters view
          clearTimeouts();
          setPhase('hidden');

          // Small delay so 'hidden' state renders first
          const t0 = setTimeout(() => {
            setPhase('sliding');

            // After slide (~1s), start slow spin
            const t1 = setTimeout(() => {
              setPhase('spinning');

              // After spin (~2.2s), settle
              const t2 = setTimeout(() => {
                setPhase('done');
              }, 2200);

              timeouts.current.push(t2);
            }, 1050);

            timeouts.current.push(t1);
          }, 60);

          timeouts.current.push(t0);
        } else {
          // Section left view — reset so it re-animates next time
          clearTimeouts();
          setPhase('hidden');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearTimeouts();
    };
  }, []);

  // Derive inline transform & transition from phase
  const pizzaTransform = (() => {
    switch (phase) {
      case 'hidden':  return 'translateX(-130%) rotate(-15deg)';
      case 'sliding': return 'translateX(0%)   rotate(0deg)';
      case 'spinning': return 'translateX(0%)  rotate(360deg)';
      case 'done':    return 'translateX(0%)   rotate(0deg)';
    }
  })();

  const pizzaTransition = (() => {
    switch (phase) {
      case 'sliding':
        return 'transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease';
      case 'spinning':
        // slow, smooth single rotation — 2.2s
        return 'transform 2.2s cubic-bezier(0.45, 0, 0.55, 1)';
      default:
        return 'none';
    }
  })();

  return (
    <section ref={sectionRef} style={styles.section}>
      {/* Warm background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>

        {/* ── LEFT: Pizza ── */}
        <div style={styles.imageCol}>
          <div
            style={{
              ...styles.pizzaWrapper,
              transform: pizzaTransform,
              opacity: phase === 'hidden' ? 0 : 1,
              transition: pizzaTransition,
            }}
          >
            {/* Dashed decorative ring */}
            <div style={styles.pizzaRing} />

            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop"
              alt="Delicious Pizza"
              style={styles.pizzaImg}
            />

            {/* Badge */}
            <div style={styles.badge}>
              <span style={styles.badgeNum}>20+</span>
              <span style={styles.badgeLabel}>Years of Craft</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Text ── */}
        <div style={styles.textCol}>
          <div style={styles.labelRow}>
            <span style={styles.labelLine} />
            <span style={styles.label}>Our Story</span>
          </div>

          <h2 style={styles.heading}>
            About&nbsp;
            <span style={styles.headingAccent}>This Food</span>
          </h2>

          <p style={styles.body}>
            Every dish we serve carries the soul of a tradition — slow-cooked with patience,
            seasoned with intention, and plated with pride. From the very first bite, you'll
            taste the difference that comes from using only the freshest ingredients, sourced
            locally and prepared in-house every single day.
          </p>

          <p style={styles.body2}>
            We believe food is more than sustenance — it's a memory in the making. Whether
            you're sharing a meal with family or treating yourself, our kitchen crafts every
            dish as if it's the only one that matters.
          </p>

          {/* Stats */}
          <div style={styles.statsRow}>
            {[
              { num: '50+',  label: 'Menu Items'   },
              { num: '10k+', label: 'Happy Guests'  },
              { num: '4.9★', label: 'Avg Rating'    },
            ].map((s) => (
              <div key={s.label} style={styles.stat}>
                <span style={styles.statNum}>{s.num}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            style={{ ...styles.btn, ...(btnHovered ? styles.btnHover : {}) }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            <span style={styles.btnInner}>
              <span style={styles.btnText}>View More</span>
              <span
                style={{
                  ...styles.btnArrow,
                  transform: btnHovered ? 'translateX(5px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                }}
              >
                →
              </span>
            </span>
            <span
              style={{
                ...styles.btnShine,
                left: btnHovered ? '130%' : '-70%',
                transition: btnHovered ? 'left 0.55s ease' : 'none',
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles: any = {
  section: {
    position: 'relative',
    background: '#FFFBF3',
    padding: '100px 40px',
    overflow: 'hidden',
    fontFamily: "'Georgia', serif",
  },

  blob1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,220,120,0.25) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,100,50,0.1) 0%, transparent 70%)',
    bottom: '-80px',
    right: '10%',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  },

  // ── Image col ──
  imageCol: {
    position: 'relative',
    flex: '0 0 420px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '420px',
    overflow: 'visible',
  },

  pizzaWrapper: {
    position: 'relative',
    width: '380px',
    height: '380px',
    willChange: 'transform',
  },

  pizzaRing: {
    position: 'absolute',
    inset: '-18px',
    borderRadius: '50%',
    border: '2.5px dashed rgba(200,140,60,0.4)',
    pointerEvents: 'none',
  },

  pizzaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    boxShadow: '0 24px 70px rgba(180,80,20,0.22), 0 4px 16px rgba(0,0,0,0.1)',
    display: 'block',
  },

  badge: {
    position: 'absolute',
    bottom: '16px',
    right: '-10px',
    background: 'linear-gradient(135deg, #5C2E0E, #A0673A)',
    color: '#FAF6EE',
    borderRadius: '16px',
    padding: '12px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(92,46,14,0.35)',
  },
  badgeNum: {
    fontSize: '1.5rem',
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: 'Georgia, serif',
  },
  badgeLabel: {
    fontSize: '0.65rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    opacity: 0.85,
    marginTop: '2px',
  },

  // ── Text col ──
  textCol: {
    flex: 1,
    minWidth: '300px',
  },

  labelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
  },
  labelLine: {
    display: 'inline-block',
    width: '36px',
    height: '2px',
    background: '#C97B3A',
    borderRadius: '2px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#C97B3A',
    fontFamily: 'Georgia, serif',
  },

  heading: {
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: '#1E0F06',
    margin: '0 0 20px 0',
    lineHeight: 1.15,
    fontFamily: 'Georgia, serif',
  },
  headingAccent: {
    color: '#C97B3A',
    fontStyle: 'italic',
  },

  body: {
    fontSize: '0.97rem',
    color: '#5A3E2B',
    lineHeight: 1.8,
    marginBottom: '14px',
    fontFamily: 'Georgia, serif',
  },
  body2: {
    fontSize: '0.9rem',
    color: '#7a5c44',
    lineHeight: 1.75,
    marginBottom: '28px',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    borderLeft: '3px solid rgba(201,123,58,0.35)',
    paddingLeft: '14px',
  },

  statsRow: {
    display: 'flex',
    gap: '28px',
    marginBottom: '36px',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statNum: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#5C2E0E',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.7rem',
    color: '#9a7055',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginTop: '3px',
  },

  // ── Button ──
  btn: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #5C2E0E 0%, #A0673A 100%)',
    color: '#FAF6EE',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 32px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    boxShadow: '0 6px 24px rgba(92,46,14,0.35)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease',
  },
  btnHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 36px rgba(92,46,14,0.45)',
    background: 'linear-gradient(135deg, #7a3e18 0%, #C97B3A 100%)',
  },
  btnInner: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  btnText: {},
  btnArrow: {
    fontSize: '1.1rem',
    display: 'inline-block',
  },
  btnShine: {
    position: 'absolute',
    top: 0,
    width: '45%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent)',
    transform: 'skewX(-20deg)',
    pointerEvents: 'none',
  },
};

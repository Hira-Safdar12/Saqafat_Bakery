'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ModalType = 'custom' | 'buffet' | null;

interface CardProps {
  image:   string;
  title:   string;
  desc:    string;
  button:  string;
  onClick: () => void;
}

interface FormModalProps {
  type:  'custom' | 'buffet';
  close: () => void;
}

interface FormState {
  name:   string;
  phone:  string;
  email:  string;
  date:   string;
  guests: string;
  notes:  string;
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function CustomBuffet() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes cb-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes cb-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cb-title-wrap { animation: cb-fadeUp 0.7s ease 0.1s both; }
        .cb-grid        { animation: cb-fadeUp 0.7s ease 0.3s both; }

        /* ── Event card ── */
        .cb-card {
          position:      relative;
          width:         420px;
          border-radius: 16px;
          overflow:      hidden;
          cursor:        pointer;
          border:        1px solid rgba(92,46,14,0.10);
          box-shadow:    0 8px 32px rgba(180,80,20,0.10), 0 2px 8px rgba(92,46,14,0.06);
          background:    #FFF8EC;
          transition:    transform 0.3s ease, box-shadow 0.3s ease;
          outline:       none;
        }
        .cb-card:hover {
          transform:  translateY(-6px);
          box-shadow: 0 20px 56px rgba(180,80,20,0.18), 0 4px 16px rgba(92,46,14,0.10);
        }
        .cb-card:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }

        /* ── Primary button — matches About + TopSellers + Offers ── */
        .cb-btn {
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          overflow:        hidden;
          background:      linear-gradient(135deg, #5C2E0E 0%, #A0673A 100%);
          color:           #FAF6EE;
          border:          none;
          border-radius:   50px;
          padding:         12px 26px;
          cursor:          pointer;
          font-family:     'DM Sans', sans-serif;
          font-size:       12px;
          font-weight:     600;
          letter-spacing:  0.1em;
          text-transform:  uppercase;
          box-shadow:      0 6px 20px rgba(92,46,14,0.28);
          transition:      transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .cb-btn:hover {
          transform:  translateY(-2px);
          box-shadow: 0 10px 30px rgba(92,46,14,0.38);
          background: linear-gradient(135deg, #7a3e18 0%, #C97B3A 100%);
        }
        .cb-btn:active { transform: translateY(0); }
        .cb-btn:focus-visible {
          outline:        2px solid #C97B3A;
          outline-offset: 3px;
        }
        .cb-btn-arrow {
          font-size:  1rem;
          transition: transform 0.3s ease;
        }
        .cb-btn:hover .cb-btn-arrow { transform: translateX(4px); }
        .cb-btn-shine {
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
        .cb-btn:hover .cb-btn-shine { left: 130%; }

        /* ── Modal overlay ── */
        .cb-overlay {
          position:        fixed;
          inset:           0;
          background:      rgba(30,15,6,0.75);
          backdrop-filter: blur(6px);
          display:         flex;
          justify-content: center;
          align-items:     center;
          z-index:         1000;
          animation:       cb-fadeIn 0.2s ease;
          padding:         1rem;
        }

        /* ── Modal box ── */
        .cb-modal {
          background:    #FFF8EC;
          border-radius: 16px;
          border:        1px solid rgba(92,46,14,0.12);
          box-shadow:    0 24px 80px rgba(92,46,14,0.25);
          width:         100%;
          max-width:     460px;
          max-height:    90vh;
          overflow-y:    auto;
          animation:     cb-fadeUp 0.3s ease;
          color:         #1E0F06;
        }

        /* ── Form inputs ── */
        .cb-input {
          width:         100%;
          padding:       11px 14px;
          border:        1px solid rgba(92,46,14,0.20);
          border-radius: 8px;
          font-family:   'DM Sans', sans-serif;
          font-size:     14px;
          color:         #1E0F06;
          background:    #FFFBF3;
          outline:       none;
          transition:    border-color 0.2s, box-shadow 0.2s;
          box-sizing:    border-box;
        }
        .cb-input:focus {
          border-color: #C97B3A;
          box-shadow:   0 0 0 3px rgba(201,123,58,0.12);
        }
        .cb-input::placeholder { color: #9a7055; }

        /* ── Ghost / cancel button ── */
        .cb-ghost-btn {
          background:    transparent;
          border:        1px solid rgba(92,46,14,0.25);
          border-radius: 50px;
          padding:       10px 24px;
          font-family:   'DM Sans', sans-serif;
          font-size:     12px;
          font-weight:   600;
          letter-spacing:0.08em;
          text-transform:uppercase;
          color:         #5A3E2B;
          cursor:        pointer;
          transition:    border-color 0.2s, color 0.2s;
        }
        .cb-ghost-btn:hover {
          border-color: #C97B3A;
          color:        #C97B3A;
        }

        @media (max-width: 768px) {
          .cb-card  { width: 100%; max-width: 420px; }
          .cb-grid  { flex-direction: column; align-items: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cb-title-wrap, .cb-grid, .cb-overlay, .cb-modal {
            animation: none !important;
            opacity:   1 !important;
          }
          .cb-card, .cb-btn { transition: none !important; }
        }
      `}</style>

      <section
        style={{
          position:   'relative',
          background: '#FFFBF3',       // ← consistent with About + TopSellers + Offers
          padding:    '100px 5% 110px',
          overflow:   'hidden',
        }}
        aria-labelledby="cb-heading"
      >

        {/* ── BG BLOBS — matching all other sections ──────────────────── */}
        <div style={{
          position:     'absolute',
          width:        '450px',
          height:       '450px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,220,120,0.18) 0%, transparent 70%)',
          top:          '-100px',
          left:         '-80px',
          pointerEvents:'none',
        }} />
        <div style={{
          position:     'absolute',
          width:        '350px',
          height:       '350px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(200,100,50,0.08) 0%, transparent 70%)',
          bottom:       '-60px',
          right:        '8%',
          pointerEvents:'none',
        }} />

        {/* ── TITLE — same pattern as About + TopSellers + Offers ─────── */}
        <div className="cb-title-wrap" style={{ textAlign: 'center', marginBottom: '64px' }}>

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
              Made Just for You
            </span>
            <span style={{ display:'inline-block', width:'36px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
          </div>

          {/* H2 */}
          <h2
            id="cb-heading"
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontSize:     'clamp(2rem, 4vw, 2.8rem)',
              fontWeight:    800,
              color:        '#1E0F06',
              margin:       '0 0 12px',
              lineHeight:    1.15,
            }}
          >
            Plan Your{' '}
            <span style={{ color:'#C97B3A', fontStyle:'italic' }}>Perfect Event</span>
          </h2>

          <p style={{
            fontFamily:  "'DM Sans', sans-serif",
            fontSize:    '0.97rem',
            color:       '#5A3E2B',
            maxWidth:    '460px',
            margin:      '0 auto',
            lineHeight:  1.75,
          }}>
            Whether it's a custom cake or a full buffet — Saqafat makes every occasion unforgettable.
          </p>
        </div>

        {/* ── SPLIT CARDS ──────────────────────────────────────────────── */}
        <div
          className="cb-grid"
          style={{ display:'flex', gap:'28px', justifyContent:'center', flexWrap:'wrap' }}
        >
          <EventCard
            image="/images/custom.jpg"
            title="Custom Orders"
            desc="Planning something special? We've got you covered — from custom cakes to full catering setups."
            button="Request Custom Order"
            onClick={() => setModal('custom')}
          />
          <EventCard
            image="/images/buffet.jpg"
            title="Buffet Reservations"
            desc="Host your event with Saqafat's legendary buffets — a feast your guests will talk about."
            button="Reserve Now"
            onClick={() => setModal('buffet')}
          />
        </div>

        {/* ── MODAL ────────────────────────────────────────────────────── */}
        {modal && (
          <FormModal type={modal} close={() => setModal(null)} />
        )}

      </section>
    </>
  );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
function EventCard({ image, title, desc, button, onClick }: CardProps) {
  return (
    <div
      className="cb-card"
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      }}
    >
      {/* Image */}
      <div style={{ position:'relative', width:'100%', height:'200px', background:'#f0e6d3' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit:'cover' }}
          sizes="(max-width:768px) 90vw, 420px"
        />
        {/* Subtle bottom fade */}
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'linear-gradient(to top, rgba(30,15,6,0.45), transparent 60%)',
          pointerEvents:'none',
        }} />
      </div>

      {/* Body */}
      <div style={{ padding:'20px 22px 24px' }}>

        {/* Card label */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
          <span style={{ display:'inline-block', width:'24px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
          <span style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '0.72rem',
            fontWeight:     600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#C97B3A',
          }}>
            {title}
          </span>
        </div>

        <p style={{
          fontFamily:   "'DM Sans', sans-serif",
          fontSize:     '0.93rem',
          color:        '#5A3E2B',
          lineHeight:    1.7,
          margin:       '0 0 18px',
        }}>
          {desc}
        </p>

        <button className="cb-btn" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <span style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'8px' }}>
            {button}
            <span className="cb-btn-arrow">→</span>
          </span>
          <span className="cb-btn-shine" />
        </button>

      </div>
    </div>
  );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
function FormModal({ type, close }: FormModalProps) {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', date: '', guests: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading  ] = useState(false);

  const isCustom = type === 'custom';
  const title    = isCustom ? 'Custom Order Request' : 'Buffet Reservation';

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message =
`New ${title}

Name:   ${form.name}
Phone:  ${form.phone}
Email:  ${form.email}
Date:   ${form.date}
Guests: ${form.guests}
Notes:  ${form.notes || '—'}`;

    // WhatsApp notification (SRS §3.4.4)
    window.open(
      `https://wa.me/923XXXXXXXXX?text=${encodeURIComponent(message)}`,
      '_blank',
    );

    // Email notification (SRS §3.4.4)
    window.location.href =
      `mailto:info@saqafatbakery.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;

    setLoading(false);
    setSubmitted(true);
  };

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="cb-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Request submitted">
        <div className="cb-modal" style={{ padding:'40px 32px', textAlign:'center' }}>

          {/* Checkmark */}
          <div style={{
            width:'60px', height:'60px', borderRadius:'50%',
            background:'linear-gradient(135deg,#5C2E0E,#A0673A)',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 20px',
            fontSize:'1.6rem', color:'#FAF6EE',
          }}>
            ✓
          </div>

          <h3 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'1.5rem', fontWeight:800,
            color:'#1E0F06', margin:'0 0 10px',
          }}>
            Request Sent!
          </h3>
          <p style={{
            fontFamily:"'DM Sans', sans-serif",
            fontSize:'0.93rem', color:'#5A3E2B',
            lineHeight:1.7, margin:'0 0 28px',
          }}>
            Thank you, <strong>{form.name}</strong>! We'll reach out within 48 hours to confirm your{' '}
            {isCustom ? 'custom order' : 'buffet reservation'}.
          </p>

          <button className="cb-btn" onClick={close} style={{ margin:'0 auto' }}>
            <span style={{ position:'relative', zIndex:1 }}>Close</span>
            <span className="cb-btn-shine" />
          </button>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div
      className="cb-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="cb-modal">

        {/* Modal header */}
        <div style={{
          padding:      '24px 28px 0',
          borderBottom: '1px solid rgba(92,46,14,0.10)',
          paddingBottom:'18px',
          marginBottom: '20px',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'space-between',
        }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
              <span style={{ display:'inline-block', width:'20px', height:'2px', background:'#C97B3A', borderRadius:'2px' }} />
              <span style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'0.72rem', fontWeight:600,
                letterSpacing:'0.15em', textTransform:'uppercase', color:'#C97B3A',
              }}>
                {isCustom ? 'Custom Order' : 'Buffet'}
              </span>
            </div>
            <h3
              id="modal-title"
              style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:'1.3rem', fontWeight:800,
                color:'#1E0F06', margin:0,
              }}
            >
              {title}
            </h3>
          </div>

          {/* Close X */}
          <button
            onClick={close}
            aria-label="Close modal"
            style={{
              background:'none', border:'1px solid rgba(92,46,14,0.2)',
              borderRadius:'50%', width:'32px', height:'32px',
              cursor:'pointer', fontSize:'0.9rem', color:'#5A3E2B',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'border-color 0.2s, color 0.2s', flexShrink:0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Form fields — SRS §3.4.4: Name, Phone, Email, Event Date, Guest Count, Special Requests */}
        <form
          onSubmit={handleSubmit}
          style={{ display:'flex', flexDirection:'column', gap:'12px', padding:'0 28px 28px' }}
        >
          <input
            className="cb-input"
            placeholder="Full Name *"
            required
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
          <input
            className="cb-input"
            placeholder="Phone Number *"
            required
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
          />
          <input
            className="cb-input"
            placeholder="Email Address *"
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
          />
          <input
            className="cb-input"
            type="date"
            required
            value={form.date}
            onChange={set('date')}
            aria-label="Event date"
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            className="cb-input"
            placeholder="Number of Guests *"
            required
            type="number"
            min="1"
            value={form.guests}
            onChange={set('guests')}
          />
          <textarea
            className="cb-input"
            placeholder="Special Requests (optional)"
            rows={3}
            value={form.notes}
            onChange={set('notes')}
            style={{ resize:'vertical', minHeight:'80px' }}
          />

          {/* Actions */}
          <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
            <button
              type="submit"
              className="cb-btn"
              style={{ flex:1, justifyContent:'center' }}
              disabled={loading}
            >
              <span style={{ position:'relative', zIndex:1 }}>
                {loading ? 'Sending…' : 'Submit Request'}
              </span>
              <span className="cb-btn-shine" />
            </button>
            <button
              type="button"
              className="cb-ghost-btn"
              onClick={close}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
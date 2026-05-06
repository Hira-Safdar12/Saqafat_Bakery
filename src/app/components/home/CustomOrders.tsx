'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

type ModalType = 'custom' | 'buffet' | null;

interface CardProps {
  image: string;
  title: string;
  tag: string;
  desc: string;
  button: string;
  reverse?: boolean;
  onClick: () => void;
}

interface FormState {
  name: string; phone: string; email: string;
  date: string; guests: string; notes: string;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CustomBuffet() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Reveal animation ── */
        @keyframes cbFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cbLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes cbShine {
          from { left: -70%; }
          to   { left: 130%; }
        }

        .cb-section {
          position: relative;
          padding: clamp(60px,10vw,110px) clamp(18px,6vw,80px);
          background: #FAF6EE;
          overflow: hidden;
        }

        /* Subtle warm blob in background */
        .cb-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .cb-blob-1 {
          width: 500px; height: 500px;
          top: -120px; right: -100px;
          background: radial-gradient(circle, rgba(201,123,58,0.07) 0%, transparent 70%);
        }
        .cb-blob-2 {
          width: 380px; height: 380px;
          bottom: -80px; left: -60px;
          background: radial-gradient(circle, rgba(92,46,14,0.06) 0%, transparent 70%);
        }

        /* ── Section heading ── */
        .cb-heading-block {
          text-align: center;
          margin-bottom: clamp(40px,7vw,72px);
          animation: cbFadeUp 0.65s ease both;
          position: relative;
          z-index: 1;
        }
        .cb-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .cb-eyebrow-line {
          display: block;
          width: 36px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #C97B3A);
          transform-origin: left;
          animation: cbLineGrow 0.6s ease 0.2s both;
        }
        .cb-eyebrow-line:last-child {
          background: linear-gradient(90deg, #C97B3A, transparent);
          transform-origin: right;
        }
        .cb-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #C97B3A;
        }
        .cb-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5.5vw, 3.6rem);
          font-weight: 600;
          color: #1E0F06;
          line-height: 1.1;
          margin: 0 0 14px 0;
          letter-spacing: 0.01em;
        }
        .cb-heading em {
          color: #C97B3A;
          font-style: italic;
        }
        .cb-subheading {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.88rem, 2vw, 1rem);
          font-weight: 300;
          color: #7a5c44;
          line-height: 1.7;
          max-width: 500px;
          margin: 0 auto;
        }

        /* ── Card grid ── */
        .cb-grid {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 4vw, 40px);
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Card ── */
        .cb-card {
          display: flex;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(92,46,14,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          animation: cbFadeUp 0.65s ease both;
          min-height: 260px;
        }
        .cb-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 50px rgba(92,46,14,0.13);
          border-color: rgba(201,123,58,0.25);
        }
        .cb-card--reverse { flex-direction: row-reverse; }

        /* ── Image pane ── */
        .cb-img-pane {
          position: relative;
          width: 42%;
          min-width: 42%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cb-img-pane img {
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .cb-card:hover .cb-img-pane img {
          transform: scale(1.06) !important;
        }

        /* Gradient scrim over image edge */
        .cb-img-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .cb-card:not(.cb-card--reverse) .cb-img-scrim {
          background: linear-gradient(to right, transparent 65%, rgba(255,255,255,0.15) 100%);
        }
        .cb-card--reverse .cb-img-scrim {
          background: linear-gradient(to left, transparent 65%, rgba(255,255,255,0.15) 100%);
        }

        /* ── Content pane ── */
        .cb-content {
          padding: clamp(22px,4vw,40px) clamp(20px,4vw,40px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        /* tag pill */
        .cb-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C97B3A;
        }
        .cb-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C97B3A;
          flex-shrink: 0;
        }

        /* Title */
        .cb-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 600;
          color: #1E0F06;
          margin: 0 0 10px 0;
          line-height: 1.15;
        }

        /* Thin gold rule */
        .cb-rule {
          width: 36px;
          height: 1.5px;
          background: linear-gradient(90deg, #C97B3A, #E8C97A);
          border-radius: 1px;
          margin-bottom: 12px;
          transform-origin: left;
          transition: width 0.35s ease;
        }
        .cb-card:hover .cb-rule { width: 60px; }

        /* Desc */
        .cb-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.83rem, 1.8vw, 0.92rem);
          font-weight: 300;
          color: #6B4A30;
          line-height: 1.7;
          margin-bottom: 22px;
        }

        /* Button */
        .cb-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #5C2E0E, #A0673A);
          color: #FAF6EE;
          border: none;
          border-radius: 40px;
          padding: 11px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          width: fit-content;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          box-shadow: 0 3px 14px rgba(92,46,14,0.28);
        }
        .cb-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #7a3e18, #C97B3A);
          box-shadow: 0 7px 22px rgba(92,46,14,0.36);
        }
        .cb-btn .cb-arrow {
          transition: transform 0.25s ease;
          font-size: 13px;
        }
        .cb-btn:hover .cb-arrow { transform: translateX(4px); }
        /* shine */
        .cb-btn::after {
          content: '';
          position: absolute; top: 0; left: -70%;
          width: 45%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .cb-btn:hover::after { left: 130%; }

        /* ── MODAL ── */
        .cb-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(15,6,2,0.65);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: cbFadeUp 0.22s ease;
        }
        .cb-modal {
          background: #FFF8EE;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          max-height: 90vh;
          overflow-y: auto;
          padding: clamp(22px,5vw,36px) clamp(20px,5vw,32px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.25);
          border: 1px solid rgba(201,123,58,0.15);
          scrollbar-width: none;
        }
        .cb-modal::-webkit-scrollbar { display: none; }

        .cb-modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 4vw, 1.8rem);
          font-weight: 600;
          color: #1E0F06;
          margin: 0 0 4px 0;
        }
        .cb-modal-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(103,53,44,0.55);
          margin: 0 0 22px 0;
          font-weight: 300;
        }
        .cb-modal-rule {
          width: 40px; height: 1.5px;
          background: linear-gradient(90deg,#C97B3A,#E8C97A);
          border-radius: 1px;
          margin-bottom: 20px;
        }

        /* Form fields */
        .cb-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .cb-form-grid .cb-field-full { grid-column: 1 / -1; }

        .cb-field-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(103,53,44,0.55);
          margin-bottom: 5px;
        }

        .cb-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 9px;
          border: 1.5px solid rgba(103,53,44,0.12);
          background: rgba(255,252,246,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          color: #3D1E14;
          outline: none;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
          box-sizing: border-box;
        }
        .cb-input:focus {
          border-color: rgba(201,123,58,0.5);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
        }
        textarea.cb-input {
          resize: vertical;
          min-height: 80px;
        }

        .cb-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 18px;
          flex-wrap: wrap;
        }
        .cb-modal-submit {
          flex: 1;
          padding: 12px;
          border-radius: 40px;
          border: none;
          background: linear-gradient(135deg, #5C2E0E, #A0673A);
          color: #FAF6EE;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 3px 14px rgba(92,46,14,0.28);
        }
        .cb-modal-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 22px rgba(92,46,14,0.36);
        }
        .cb-modal-cancel {
          padding: 12px 18px;
          border-radius: 40px;
          border: 1.5px solid rgba(103,53,44,0.18);
          background: transparent;
          color: rgba(103,53,44,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cb-modal-cancel:hover {
          border-color: #C97B3A;
          color: #C97B3A;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .cb-card { flex-direction: column !important; min-height: auto; }
          .cb-img-pane { width: 100%; min-width: 100%; height: 200px; }
          .cb-form-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-card, .cb-img-pane img { transition: none !important; }
          .cb-section, .cb-heading-block { animation: none !important; }
        }
      `}</style>

      <section className="cb-section">
        {/* Background blobs */}
        <div className="cb-blob cb-blob-1" />
        <div className="cb-blob cb-blob-2" />

        {/* Heading */}
        <div className="cb-heading-block">
          <div className="cb-eyebrow">
            <span className="cb-eyebrow-line" />
            <span className="cb-eyebrow-text">Crafted For You</span>
            <span className="cb-eyebrow-line" />
          </div>
          <h2 className="cb-heading">
            Plan Your <em>Perfect Event</em>
          </h2>
          <p className="cb-subheading">
            Whether it's an intimate gathering or a grand celebration, we bring the
            flavours — you bring the occasion.
          </p>
        </div>

        {/* Cards */}
        <div className="cb-grid">
          <EventCard
            image="/CustomOrder.jpg"
            tag="Bespoke Creations"
            title="Custom Orders"
            desc="Cakes, pastries, catering platters — crafted exactly to your taste. Share your vision and we'll make it reality."
            button="Request Order"
            onClick={() => setModal('custom')}
          />
          <EventCard
            image="/Buffet.jpg"
            tag="Group Dining"
            title="Buffet Reservations"
            desc="Host unforgettable events with our signature spread. Fresh, abundant, and tailored to your guest count."
            button="Reserve Now"
            reverse
            onClick={() => setModal('buffet')}
          />
        </div>

        {/* Modal */}
        {modal && <FormModal type={modal} close={() => setModal(null)} />}
      </section>
    </>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function EventCard({ image, tag, title, desc, button, reverse, onClick }: CardProps) {
  return (
    <div
      className={`cb-card${reverse ? ' cb-card--reverse' : ''}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="cb-img-pane">
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
        <div className="cb-img-scrim" />
      </div>

      {/* Content */}
      <div className="cb-content">
        <div className="cb-tag">
          <span className="cb-tag-dot" />
          {tag}
        </div>
        <h3 className="cb-card-title">{title}</h3>
        <div className="cb-rule" />
        <p className="cb-desc">{desc}</p>
        <button
          className="cb-btn"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {button}
          <span className="cb-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function FormModal({ type, close }: { type: 'custom' | 'buffet'; close: () => void }) {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '',
    date: '', guests: '', notes: '',
  });

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted! We\'ll be in touch shortly.');
    close();
  };

  const isCustom = type === 'custom';

  return (
    <div className="cb-overlay" onClick={close}>
      <div className="cb-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="cb-modal-title">
          {isCustom ? 'Custom Order Request' : 'Buffet Reservation'}
        </h3>
        <p className="cb-modal-sub">
          {isCustom
            ? 'Fill in the details and we\'ll get back to you within 24 hours.'
            : 'Reserve your spot — we\'ll confirm availability promptly.'
          }
        </p>
        <div className="cb-modal-rule" />

        <form onSubmit={submit}>
          <div className="cb-form-grid">
            <div>
              <label className="cb-field-label">Full Name</label>
              <input className="cb-input" placeholder="Your name" required onChange={set('name')} />
            </div>
            <div>
              <label className="cb-field-label">Phone</label>
              <input className="cb-input" placeholder="+92 ---" required onChange={set('phone')} />
            </div>
            <div className="cb-field-full">
              <label className="cb-field-label">Email</label>
              <input className="cb-input" type="email" placeholder="you@email.com" required onChange={set('email')} />
            </div>
            <div>
              <label className="cb-field-label">Date</label>
              <input className="cb-input" type="date" required onChange={set('date')} />
            </div>
            <div>
              <label className="cb-field-label">Guests</label>
              <input className="cb-input" type="number" placeholder="No. of guests" min="1" required onChange={set('guests')} />
            </div>
            <div className="cb-field-full">
              <label className="cb-field-label">
                {isCustom ? 'Order Details / Notes' : 'Special Requirements'}
              </label>
              <textarea className="cb-input" placeholder="Tell us more..." onChange={set('notes')} />
            </div>
          </div>

          <div className="cb-modal-actions">
            <button type="submit" className="cb-modal-submit">
              {isCustom ? 'Submit Request' : 'Confirm Reservation'}
            </button>
            <button type="button" className="cb-modal-cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

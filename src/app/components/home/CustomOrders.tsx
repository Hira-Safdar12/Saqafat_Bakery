'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── TYPES ─────────────────────────────────────────────────────────────
type ModalType = 'custom' | 'buffet' | null;

interface CardProps {
  image: string;
  title: string;
  desc: string;
  button: string;
  onClick: () => void;
}

interface FormModalProps {
  type: 'custom' | 'buffet';
  close: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  notes: string;
}

// ─── MAIN ─────────────────────────────────────────────────────────────
export default function CustomBuffet() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

/* ANIMATION */
@keyframes fadeUp {
  from { opacity:0; transform: translateY(25px); }
  to { opacity:1; transform: translateY(0); }
}

/* SECTION */
.cb-section {
  animation: fadeUp 0.7s ease;
}

/* HEADING */
.cb-heading {
  text-align:center;
  font-family:'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color:#5C2E0E;
  margin-bottom:8px;
}

.cb-heading span {
  color:#C97B3A;
}

/* SUBHEADING */
.cb-subheading {
  text-align:center;
  font-size:14px;
  color:#7a5a44;
  margin-bottom:40px;
}

/* GRID */
.cb-grid {
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:26px;
}

/* CARD */
.cb-card {
  display:flex;
  width:100%;
  max-width:860px;
  height:240px;
  border-radius:18px;
  overflow:hidden;
  background:#FFF8EC;
  border:1px solid rgba(92,46,14,0.08);
  box-shadow:0 10px 35px rgba(0,0,0,0.08);
  cursor:pointer;
  transition: all .3s ease;
}

.cb-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:0 18px 45px rgba(0,0,0,0.12);
}

/* IMAGE */
.cb-img {
  position:relative;
  width:40%;
  min-width:40%;
  overflow:hidden;
}

.cb-img img {
  transition: transform .5s ease;
}

/* ZOOM */
.cb-card:hover .cb-img img {
  transform: scale(1.06);
}

/* CONTENT */
.cb-content {
  padding:22px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

/* LABEL */
.cb-label {
  display:flex;
  align-items:center;
  gap:10px;
  font-size:12px;
  text-transform:uppercase;
  color:#C97B3A;
  letter-spacing:.12em;
  margin-bottom:8px;
}

.cb-label span:first-child {
  width:24px;
  height:2px;
  background:#C97B3A;
}

/* DESCRIPTION */
.cb-desc {
  font-size:14px;
  color:#5A3E2B;
  line-height:1.6;
  margin-bottom:16px;
}

/* BUTTON */
.cb-btn {
  background: linear-gradient(135deg,#5C2E0E,#A0673A);
  color:#fff;
  border:none;
  border-radius:40px;
  padding:10px 18px;
  font-size:12px;
  cursor:pointer;
  transition: all .25s ease;
  width:fit-content;
  box-shadow:0 4px 14px rgba(92,46,14,0.25);
}

.cb-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg,#7a3e18,#C97B3A);
}

.cb-btn:active {
  transform: scale(0.95);
}

/* MODAL */
.overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.55);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1000;
}

.modal {
  background:#FFF8EC;
  padding:24px;
  border-radius:14px;
  width:90%;
  max-width:420px;
  animation: fadeUp .3s ease;
}

/* INPUTS */
.input {
  width:100%;
  padding:10px;
  margin-bottom:10px;
  border-radius:6px;
  border:1px solid #ddd;
}

/* MOBILE */
@media (max-width: 768px) {
  .cb-card {
    flex-direction:column;
    height:auto;
  }

  .cb-img {
    width:100%;
    height:180px;
  }
}

      `}</style>

      <section className="cb-section" style={{ padding: '80px 5%' }}>
        
        {/* HEADING */}
        <h2 className="cb-heading">
          Plan Your <span>Perfect Event</span>
        </h2>

        <p className="cb-subheading">
          Whether it's a celebration or a gathering — we make it unforgettable.
        </p>

        {/* CARDS */}
        <div className="cb-grid">
          <EventCard
            image="/CustomOrder.jpg"
            title="Custom Orders"
            desc="From cakes to catering — everything made your way."
            button="Request Order"
            onClick={() => setModal('custom')}
          />

          <EventCard
            image="/Buffet.jpg"
            title="Buffet Reservations"
            desc="Host unforgettable events with our signature buffet."
            button="Reserve Now"
            onClick={() => setModal('buffet')}
          />
        </div>

        {modal && <FormModal type={modal} close={() => setModal(null)} />}
      </section>
    </>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────
function EventCard({ image, title, desc, button, onClick }: CardProps) {
  return (
    <div className="cb-card" onClick={onClick}>
      <div className="cb-img">
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="cb-content">
        <div className="cb-label">
          <span></span>
          <span>{title}</span>
        </div>

        <p className="cb-desc">{desc}</p>

        <button
          className="cb-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {button} →
        </button>
      </div>
    </div>
  );
}

// ─── MODAL ─────────────────────────────────────────────────────────────
function FormModal({ type, close }: FormModalProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    date: '',
    guests: '',
    notes: '',
  });

  const handle = (field: keyof FormState) =>
    (e: any) => setForm({ ...form, [field]: e.target.value });

  const submit = (e: any) => {
    e.preventDefault();
    alert('Form submitted!');
    close();
  };

  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: '12px' }}>
          {type === 'custom' ? 'Custom Order' : 'Buffet Reservation'}
        </h3>

        <form onSubmit={submit}>
          <input className="input" placeholder="Name" required onChange={handle('name')} />
          <input className="input" placeholder="Phone" required onChange={handle('phone')} />
          <input className="input" placeholder="Email" required onChange={handle('email')} />
          <input className="input" type="date" required onChange={handle('date')} />
          <input className="input" type="number" placeholder="Guests" required onChange={handle('guests')} />
          <textarea className="input" placeholder="Notes" onChange={handle('notes')} />

          <button className="cb-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
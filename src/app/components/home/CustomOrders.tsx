'use client';

import { useState } from 'react';

export default function CustomBuffet() {
  const [modal, setModal] = useState(null);

  return (
    <section style={{
      padding: '100px 5%',
      background: 'linear-gradient(160deg, #1A0F08 0%, #2A1A12 60%, #140905 100%)',
      color: '#FAF6EE'
    }}>

      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        color: '#C9A84C',
        marginBottom: '60px',
        fontFamily: "'Playfair Display', serif"
      }}>
        Plan Your Perfect Event
      </h2>

      {/* SPLIT CARDS */}
      <div style={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {/* LEFT - CUSTOM ORDER */}
        <Card
          image="/images/custom.jpg"
          title="Planning something special? We've got you covered."
          button="Request Custom Order"
          onClick={() => setModal('custom')}
        />

        {/* RIGHT - BUFFET */}
        <Card
          image="/images/buffet.jpg"
          title="Host your event with Saqafat's legendary buffets"
          button="Reserve Now"
          onClick={() => setModal('buffet')}
        />

      </div>

      {/* MODAL */}
      {modal && (
        <FormModal type={modal} close={() => setModal(null)} />
      )}
    </section>
  );
}

/* ================= CARD ================= */

function Card({ image, title, button, onClick }) {
  return (
    <div
      style={{
        width: '420px',
        height: '260px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
      }}
    >
      <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(15,8,4,0.9), rgba(15,8,4,0.2))'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px'
      }}>
        <p style={{ marginBottom: '10px' }}>{title}</p>

        <button
          onClick={onClick}
          style={{
            background: '#C9A84C',
            color: '#1A0F08',
            border: 'none',
            padding: '10px 18px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '12px'
          }}
        >
          {button}
        </button>
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function FormModal({ type, close }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guests: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
New ${type === 'custom' ? 'Custom Order' : 'Buffet Reservation'}

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Date: ${form.date}
Guests: ${form.guests}
Notes: ${form.notes}
    `;

    // 📧 EMAIL
    window.location.href = `mailto:your@email.com?subject=${type}&body=${encodeURIComponent(message)}`;

    // 📱 WHATSAPP
    window.open(`https://wa.me/923XXXXXXXXX?text=${encodeURIComponent(message)}`);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={modalStyle}>
        <div style={modalContent}>
          <h3 style={{ color: '#C9A84C' }}>Request Sent Successfully!</h3>
          <p>We’ll contact you shortly.</p>
          <button onClick={close}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalStyle}>
      <div style={modalContent}>

        <h3 style={{ marginBottom: '15px' }}>
          {type === 'custom' ? 'Custom Order Request' : 'Buffet Reservation'}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <input placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Phone" required onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Email" type="email" required onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="date" required onChange={e => setForm({ ...form, date: e.target.value })} />
          <input placeholder="Guest Count" required onChange={e => setForm({ ...form, guests: e.target.value })} />
          <textarea placeholder="Special Requests" onChange={e => setForm({ ...form, notes: e.target.value })} />

          <button type="submit" style={{
            background: '#C9A84C',
            color: '#1A0F08',
            border: 'none',
            padding: '10px',
            marginTop: '10px'
          }}>
            Submit Request
          </button>

        </form>

        <button onClick={close} style={{ marginTop: '10px' }}>Cancel</button>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const modalStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  background: '#1A0F08',
  padding: '25px',
  borderRadius: '10px',
  width: '320px',
  color: '#FAF6EE'
};
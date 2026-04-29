'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={s.section} ref={sectionRef}>

      <h2 style={{
        ...s.heading,
        ...s.fadeDown,
        ...(visible ? s.show : {})
      }}>
        Newsletter
      </h2>

      <p style={{
        ...s.subtext,
        ...s.fadeDown,
        ...(visible ? s.show : {}),
        transitionDelay: '0.2s'
      }}>
        The latest offers and news from Saqafat.
      </p>

      {submitted ? (
        <p style={s.success}>✓ You're subscribed! Welcome 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} style={s.form}>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={s.input}
          />

          <button type="submit" style={s.button}>
            Subscribe
          </button>

        </form>
      )}

    </section>
  );
}

const s: any = {
  section: {
    background: '#FFFBF3', // matches your footer/review theme
    padding: '60px 20px',
    textAlign: 'center',
  },

  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    marginBottom: '10px',
    fontWeight: 600,
    color: '#1E0F06',
  },

  subtext: {
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    color: '#7a5a45',
    marginBottom: '30px',
    padding: '0 10px',
  },

  fadeDown: {
    opacity: 0,
    transform: 'translateY(-40px)',
    transition: 'all 0.8s ease',
  },

  show: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '480px',
    margin: '0 auto',
    flexWrap: 'wrap', // 🔥 responsiveness fix
  },

  input: {
    flex: 1,
    minWidth: '200px',
    padding: '16px 18px',
    borderRadius: '40px 0 0 40px',
    border: '1px solid rgba(201,123,58,0.4)',
    outline: 'none',
    fontSize: '0.9rem',
    background: '#fff',
    color: '#1E0F06',
  },

  button: {
    padding: '16px 20px',
    borderRadius: '0 40px 40px 0',
    border: 'none',
    background: '#C97B3A', // your brand gold
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap',
  },

  success: {
    color: '#8fbc6e',
    fontSize: '0.9rem',
    marginTop: '15px',
  },
};
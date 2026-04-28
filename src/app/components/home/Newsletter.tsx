'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 👇 Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
        The latest offers and news from the Saqafat.
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
    background: '#f4f1ed',
    padding: '40px 10px',
    textAlign: 'center',
  },

  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    fontWeight: 500,
    color: '#1a1a1a',
  },

  subtext: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '30px',
  },

  // 🔥 Animation base
  fadeDown: {
    opacity: 0,
    transform: 'translateY(-40px)',
    transition: 'all 0.8s ease',
  },

  // 🔥 When visible
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
  },

  input: {
    flex: 1,
    padding: '18px 18px',
    borderRadius: '40px 0 0 40px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '0.9rem',
    background: '#fff',
  },

  button: {
    padding: '18px 12px',
    borderRadius: '0 40px 40px 0',
    border: 'none',
    background: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.25s ease',
  },

  success: {
    color: '#2e7d32',
    fontSize: '0.9rem',
    marginTop: '15px',
  },
};
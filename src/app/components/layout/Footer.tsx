'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* LEFT */}
        <div style={styles.col}>
          <h3 style={styles.logo}>Your Restaurant</h3>
          <p style={styles.text}>
            Serving delicious food with passion. Fresh ingredients, authentic taste,
            and unforgettable experience.
          </p>
        </div>

        {/* CENTER */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>📍 Rawalpindi, Pakistan</p>
          <p style={styles.text}>📞 +92 300 0000000</p>
          <p style={styles.text}>✉️ info@restaurant.com</p>
        </div>

      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} Your Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

const styles: any = {
  footer: {
    background: '#2a1810',
    color: '#FAF6EE',
    marginTop: '80px',
    paddingTop: '50px',
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
    flexWrap: 'wrap',
  },

  col: {
    flex: '1',
    minWidth: '220px',
  },

  logo: {
    fontSize: '1.4rem',
    marginBottom: '10px',
  },

  heading: {
    marginBottom: '10px',
    fontSize: '1rem',
  },

  text: {
    fontSize: '0.85rem',
    color: '#d6c5b4',
    lineHeight: 1.6,
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '0.85rem',
    color: '#d6c5b4',
    lineHeight: 1.8,
    cursor: 'pointer',
  },

  bottom: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '15px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontSize: '0.8rem',
    color: '#bfae9d',
  },
};
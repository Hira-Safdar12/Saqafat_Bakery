// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Saqafat Brand Colors ──────────────────────────
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97A',
          dark:    '#A07030',
        },
        cream: {
          DEFAULT: '#FAF6EE',
          dark:    '#F0E8D6',
        },
        brown: {
          DEFAULT: '#3D2B1F',
          mid:     '#6B4226',
          light:   '#9B6A45',
        },
        char:  '#1A0F08',   // deepest background
        saqafat: {
          red:   '#C0392B', // urgency / badges
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", 'serif'],
        body:    ["'DM Sans'",          'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};

// ── Usage examples ───────────────────────────────────────
//
// bg-gold            → #C9A84C
// bg-gold-light      → #E8C97A
// text-cream         → #FAF6EE
// bg-brown           → #3D2B1F
// bg-char            → #1A0F08
// font-display       → Playfair Display
// font-body          → DM Sans
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Offers() {
  const router = useRouter();

  const offers = [
    {
      title: '20% Off Family Deals',
      code: 'FAMILY20',
      image: '/images/offer1.jpg',
      expires: new Date().getTime() + 86400000,
    },
    {
      title: 'Free Drink with Every Meal',
      code: 'FREEDRINK',
      image: '/images/offer2.jpg',
      expires: new Date().getTime() + 43200000,
    },
  ];

  return (
    <section style={{
      padding: '100px 5%',
      background: 'linear-gradient(160deg, #1A0F08 0%, #2A1A12 60%, #140905 100%)'
    }}>
      
      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.6rem',
        color: '#C9A84C',
        marginBottom: '60px',
        fontFamily: "'Playfair Display', serif"
      }}>
        Limited Time Offers
      </h2>

      <div style={{
        display: 'flex',
        gap: '25px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {offers.map((offer, i) => (
          <OfferCard key={i} offer={offer} router={router} />
        ))}
      </div>
    </section>
  );
}

function OfferCard({ offer, router }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateTimer = () => {
      setTimeLeft(getTimeLeft(offer.expires));
    };

    updateTimer(); // run once immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [mounted, offer.expires]);

  return (
    <div
      onClick={() => router.push(`/order?promo=${offer.code}`)}
      style={{
        position: 'relative',
        width: '380px',
        height: '240px',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
      }}
    >

      {/* IMAGE */}
      <img
        src={offer.image}
        alt={offer.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(15,8,4,0.85), rgba(15,8,4,0.2))'
      }} />

      {/* GOLD GLOW */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'absolute',
        bottom: '18px',
        left: '18px',
        right: '18px',
        color: '#FAF6EE'
      }}>
        <h3 style={{
          margin: 0,
          fontFamily: "'Playfair Display', serif"
        }}>
          {offer.title}
        </h3>

        {/* SAFE COUNTDOWN */}
        <p style={{
          margin: '6px 0',
          color: '#C9A84C',
          fontSize: '14px',
          letterSpacing: '0.05em'
        }}>
          Ends in: {timeLeft || 'Loading...'}
        </p>

        <button style={{
          marginTop: '8px',
          background: '#C9A84C',
          color: '#1A0F08',
          border: 'none',
          padding: '10px 20px',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer'
        }}>
          Claim Offer
        </button>
      </div>
    </div>
  );
}
function getTimeLeft(expiry) {
  const total = expiry - new Date().getTime();
  if (total <= 0) return 'Expired';

  const h = Math.floor(total / (1000 * 60 * 60));
  const m = Math.floor((total / (1000 * 60)) % 60);
  const s = Math.floor((total / 1000) % 60);

  return `${h}h ${m}m ${s}s`;
}
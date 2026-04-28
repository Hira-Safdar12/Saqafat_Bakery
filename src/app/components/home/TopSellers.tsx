'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function TopSellers() {
  const carouselRef = useRef(null);
  const router = useRouter();

  const items = [
    { name: 'Chocolate Cake', price: 'From PKR 1200', img: '/images/cake.jpg', badge: 'Bestseller' },
    { name: 'Croissant', price: 'From PKR 250', img: '/images/croissant.jpg' },
    { name: 'Donuts', price: 'From PKR 350', img: '/images/donut.jpg', badge: 'Most Loved' },
    { name: 'Brownies', price: 'From PKR 400', img: '/images/brownie.jpg' },
    { name: 'Cupcakes', price: 'From PKR 300', img: '/images/cupcake.jpg' },
    { name: 'Tea Cake', price: 'From PKR 450', img: '/images/teacake.jpg' },
    { name: 'Cookies', price: 'From PKR 200', img: '/images/cookies.jpg' },
    { name: 'Macarons', price: 'From PKR 600', img: '/images/macarons.jpg' },
    { name: 'Pastry', price: 'From PKR 350', img: '/images/pastry.jpg' },
    { name: 'Puff', price: 'From PKR 280', img: '/images/puff.jpg' },
    { name: 'Sandwich', price: 'From PKR 500', img: '/images/sandwich.jpg' },
    { name: 'Rolls', price: 'From PKR 320', img: '/images/rolls.jpg' },
  ];

  useEffect(() => {
    let angle = 0;
    const speed = 0.15;

    const rotate = () => {
      if (carouselRef.current) {
        angle += speed;
        carouselRef.current.style.transform = `rotateY(${angle}deg)`;
      }
      requestAnimationFrame(rotate);
    };

    rotate();
  }, []);

  return (
    <section style={{
      padding: '120px 0',
      background: 'linear-gradient(160deg, #1A0F08 0%, #2A1A12 60%, #140905 100%)',
      color: '#FAF6EE',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* GOLD GLOW (Hero style) */}
      <div style={{
        position: 'absolute',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0
      }} />

      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.8rem',
        marginBottom: '70px',
        color: '#C9A84C',
        fontFamily: "'Playfair Display', serif",
        position: 'relative',
        zIndex: 2
      }}>
        Our Crowd Favorites
      </h2>

      {/* CAROUSEL */}
      <div style={{
        perspective: '1400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '420px',
        position: 'relative',
        zIndex: 2
      }}>

        <div
          ref={carouselRef}
          style={{
            width: '320px',
            height: '320px',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
        >
          {items.map((item, index) => {
            const angle = (360 / items.length) * index;

            return (
              <div
                key={index}
                onClick={() => router.push(`/menu?item=${encodeURIComponent(item.name)}`)}
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '300px',
                  background: '#1c140d',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: `rotateY(${angle}deg) translateZ(480px)`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform += ' scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(201,168,76,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotateY(${angle}deg) translateZ(480px)`;
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.7)';
                }}
              >

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover'
                  }}
                />

                {/* BADGE */}
                {item.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#C9A84C',
                    color: '#1A0F08',
                    padding: '5px 10px',
                    fontSize: '10px',
                    letterSpacing: '0.08em'
                  }}>
                    {item.badge}
                  </span>
                )}

                {/* CONTENT */}
                <div style={{ padding: '14px' }}>
                  <h4 style={{
                    margin: 0,
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {item.name}
                  </h4>

                  <p style={{
                    marginTop: '6px',
                    color: '#C9A84C',
                    fontSize: '14px'
                  }}>
                    {item.price}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
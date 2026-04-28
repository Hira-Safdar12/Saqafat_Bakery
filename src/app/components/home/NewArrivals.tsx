'use client';

import { useRouter } from 'next/navigation';

export default function NewArrivals() {
  const router = useRouter();

  const items = [
    { name: 'Lotus Cake', price: 'PKR 950', img: '/images/lotus.jpg' },
    { name: 'Pistachio Pastry', price: 'PKR 420', img: '/images/pistachio.jpg' },
    { name: 'Chocolate Lava', price: 'PKR 550', img: '/images/lava.jpg' },
    { name: 'Mini Tart Box', price: 'PKR 700', img: '/images/tart.jpg' },
    { name: 'Strawberry Cheesecake', price: 'PKR 1100', img: '/images/cheesecake.jpg' },
    { name: 'Nutella Croissant', price: 'PKR 380', img: '/images/nutella.jpg' },
  ];

  return (
    <section style={{
      padding: '100px 5%',
      background: 'linear-gradient(160deg, #1A0F08 0%, #2A1A12 60%, #140905 100%)',
      color: '#FAF6EE',
      position: 'relative'
    }}>

      {/* GOLD GLOW */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }} />

      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.6rem',
        color: '#C9A84C',
        marginBottom: '60px',
        fontFamily: "'Playfair Display', serif",
        position: 'relative',
        zIndex: 2
      }}>
        Fresh on the Menu
      </h2>

      {/* GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '30px',
        position: 'relative',
        zIndex: 2
      }}>

        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(`/menu?item=${encodeURIComponent(item.name)}`)}
            style={{
              background: '#1c140d',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 25px 80px rgba(201,168,76,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.7)';
            }}
          >

            {/* IMAGE */}
            <div style={{ position: 'relative' }}>
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover'
                }}
              />

              {/* NEW BADGE */}
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#C9A84C',
                color: '#1A0F08',
                fontSize: '10px',
                padding: '5px 10px',
                letterSpacing: '0.08em'
              }}>
                NEW
              </span>
            </div>

            {/* CONTENT */}
            <div style={{ padding: '16px' }}>
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

              {/* CTA */}
              <button
                style={{
                  marginTop: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(250,246,238,0.3)',
                  color: '#FAF6EE',
                  padding: '8px 16px',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A84C';
                  e.currentTarget.style.color = '#C9A84C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(250,246,238,0.3)';
                  e.currentTarget.style.color = '#FAF6EE';
                }}
              >
                Try Now
              </button>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
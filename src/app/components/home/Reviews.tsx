'use client';

import React, { useState } from 'react';

const reviews = [
  {
    name: 'Jane Adams',
    role: 'Food Blogger',
    rating: 4,
    text: 'I have not ever had such high expectations, but the cappuccino was velvety smooth just as I like. Had great pizza with perfectly normal prices.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Sam Williams',
    role: 'Entrepreneur',
    rating: 5,
    text: 'The quality of the product is consistently high. I am grateful for the discount that is apparently put into the rooms and the excellent customer service. Your team is genuinely the best cups of coffee.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Angela Gonzalez',
    role: 'Chef',
    rating: 5,
    text: "The quality of the product is consistently high. I'm grateful for the discount. Excellent customer service — your team gives joy to the customers each time.",
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Marcus Lee',
    role: 'Architect',
    rating: 5,
    text: 'The ambiance is warm, the food is crafted with care, and every bite tells a story. Will absolutely return with the whole family.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Doctor',
    rating: 4,
    text: "The desserts are heavenly and the staff goes above and beyond. It feels like dining at a friend's home — warm, and delicious.",
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    name: 'David Okonkwo',
    role: 'Teacher',
    rating: 5,
    text: 'The sourdough bread alone is worth the trip. This place has set a new standard for what dining out should feel like.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Sofia Reyes',
    role: 'Photographer',
    rating: 5,
    text: "A hidden gem! The flavors are bold and authentic, the presentation is stunning, and the service is impeccable.",
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: `${size}px`, color: s <= rating ? '#E8A030' : '#ddd', lineHeight: 1 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  isExpanded,
  onEnter,
  onLeave,
}: {
  review: typeof reviews[0];
  isExpanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div style={styles.cardShell}>
      <div
        style={{
          ...styles.card,
          background: isExpanded ? '#fff8f0' : '#ffffff',
          ...(isExpanded ? styles.cardExpanded : styles.cardCollapsed),
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Top: avatar + name + stars */}
        <div style={styles.cardTop}>
          <div style={styles.avatarWrapper}>
            <img src={review.image} alt={review.name} style={styles.avatar} />
          </div>
          <div style={styles.nameBlock}>
            <span style={styles.name}>{review.name}</span>
            {isExpanded && <span style={styles.role}>{review.role}</span>}
            <StarRating rating={review.rating} size={isExpanded ? 15 : 13} />
          </div>
        </div>

        {/* Expandable review text */}
        <div
          style={{
            maxHeight: isExpanded ? '220px' : '0px',
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '14px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease, opacity 0.35s ease, margin-top 0.3s ease',
          }}
        >
          
          <p style={styles.reviewText}>{review.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const VISIBLE = 3;

  const slide = (dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setHoveredIndex(null);
    setTimeout(() => {
      setStartIndex((prev) =>
        dir === 'right'
          ? (prev + 1) % reviews.length
          : (prev - 1 + reviews.length) % reviews.length
      );
      setAnimating(false);
      setDirection(null);
    }, 320);
  };

  const visibleReviews = Array.from({ length: VISIBLE }, (_, i) => ({
    review: reviews[(startIndex + i) % reviews.length],
    globalIndex: (startIndex + i) % reviews.length,
  }));

  return (
    <section style={styles.section}>

      

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.subheading}>Come and Join</p>
        <h2 style={styles.heading}>OUR HAPPY CUSTOMERS</h2>
       
      </div>

      {/* Carousel row */}
      <div style={styles.carouselRow}>
        <button style={styles.navBtn} onClick={() => slide('left')} aria-label="Previous" className="nav-btn">‹</button>

        <div style={styles.cardsWrapper}>
          <div
            style={{
              ...styles.cardsTrack,
              transform: animating
                ? direction === 'right' ? 'translateX(-10px)' : 'translateX(10px)'
                : 'translateX(0)',
              opacity: animating ? 0.65 : 1,
              transition: 'transform 0.32s ease, opacity 0.32s ease',
            }}
          >
            {visibleReviews.map(({ review, globalIndex }, localIndex) => (
              <ReviewCard
                key={`${globalIndex}-${startIndex}`}
                review={review}
                isExpanded={hoveredIndex === localIndex}
                onEnter={() => setHoveredIndex(localIndex)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>

        <button style={styles.navBtn} onClick={() => slide('right')} aria-label="Next" className="nav-btn">›</button>
      </div>

      {/* Dots */}
      <div style={styles.dots}>
        {reviews.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.dot,
              background: i === startIndex ? '#C97B3A' : '#ddd',
              width: i === startIndex ? '22px' : '8px',
            }}
            onClick={() => { if (!animating) { setStartIndex(i); setHoveredIndex(null); } }}
          />
        ))}
      </div>
    </section>
  );
}

const styles: any = {
  section: {
    background: '#FFFBF3',
    padding: '80px 20px 60px',
    fontFamily: 'Georgia, serif',
    position: 'relative',
    overflow: 'hidden',
  },

  header: {
    textAlign: 'center',
    marginBottom: '52px',
  },

  // ── Luxury "Come and join" ──
  subheading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    fontStyle: 'italic',
    fontWeight: 600,
    color: '#C97B3A',
    marginBottom: '6px',
    letterSpacing: '0.06em',
    lineHeight: 1.2,
  },

  heading: {
    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
    fontWeight: 800,
    color: '#1E0F06',
    letterSpacing: '0.06em',
    margin: '0',               // no bottom margin, underline removed
  },


  carouselRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    maxWidth: '1100px',
    margin: '0 auto',
  },

  navBtn: {
    flexShrink: 0,
    alignSelf: 'center',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    border: '1.5px solid rgba(201,123,58,0.4)',
    background: '#fff',
    color: '#C97B3A',
    fontSize: '1.6rem',
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.25s ease',
    paddingBottom: '2px',
  },

  cardsWrapper: {
    flex: 1,
    overflow: 'hidden',
    maxWidth: '960px',
  },

  cardsTrack: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    alignItems: 'stretch',
  },

  cardShell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
  },

  card: {
    width: '100%',
    borderRadius: '16px',
    padding: '22px 20px',
    border: '1px solid rgba(201,123,58,0.1)',
    cursor: 'default',
    transition: 'box-shadow 0.55s ease, border-color 0.45s ease, background 0.53s ease',
    userSelect: 'none',
  },

  cardCollapsed: {
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    borderColor: 'rgba(201,123,58,0.1)',
  },

  cardExpanded: {
    boxShadow: '0 4px 10px rgba(244, 225, 210, 0.5)',
    borderColor: 'rgba(145, 83, 32, 0.5)',
    
  },

  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  avatarWrapper: {
    flexShrink: 0,
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2.5px solid rgba(201,123,58,0.35)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },

  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  name: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#1E0F06',
    fontFamily: 'Georgia, serif',
  },

  role: {
    fontSize: '0.7rem',
    color: '#C97B3A',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontFamily: 'Georgia, serif',
  },

 

  reviewText: {
    fontSize: '0.82rem',
    color: '#5A3E2B',
    lineHeight: 1.7,
    margin: 0,
    fontFamily: ' serif',
    fontStyle: 'italic',
  },

  dots: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    marginTop: '36px',
  },

  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'width 0.3s ease, background 0.3s ease',
    padding: 0,
  },
};

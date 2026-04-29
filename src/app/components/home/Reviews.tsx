'use client';

import React, { useState, useCallback } from 'react';

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
    text: 'The quality of the product is consistently high. Excellent customer service. Your team is genuinely the best — every visit feels special and memorable.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Angela Gonzalez',
    role: 'Chef',
    rating: 5,
    text: "The quality of the product is consistently high. Excellent customer service — your team gives joy to the customers each time.",
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
    text: "The desserts are heavenly and the staff goes above and beyond. It feels like dining at a friend's home — warm, personal, and delicious.",
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
    text: 'A hidden gem! The flavors are bold and authentic, the presentation is stunning, and the service is impeccable.',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: `${size}px`,
            color: s <= rating ? '#E8A030' : 'rgba(0,0,0,0.12)',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}
        >
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        height: '100%',
      }}
    >
      <div
        style={{
          
          width: '100%',
          borderRadius: '20px',
          padding: 'clamp(14px, 3vw, 24px)',
          border: isExpanded
            ? '1.5px solid rgba(145,83,32,0.45)'
            : '1.5px solid rgba(201,123,58,0.12)',
         background: isExpanded ? '#fff8f0' : '#ffffff',
          cursor: 'default',
          transition:
            'box-shadow 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.4s ease, background 0.45s ease, transform 0.3s ease',
         
          transform: isExpanded ? 'translateY(-2px)' : 'translateY(0)',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onTouchStart={onEnter}
        onTouchEnd={onLeave}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(44px, 6vw, 54px)',
              height: 'clamp(44px, 6vw, 54px)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: isExpanded
                ? '2.5px solid rgba(201,123,58,0.6)'
                : '2.5px solid rgba(201,123,58,0.25)',
              boxShadow: isExpanded
                ? '0 0 0 4px rgba(201,123,58,0.1)'
                : 'none',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            <img
              src={review.image}
              alt={review.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                fontWeight: 700,
                color: '#1E0F06',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {review.name}
            </span>

            <div
              style={{
                maxHeight: isExpanded ? '24px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.3s ease',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.6rem, 1.5vw, 0.68rem)',
                  color: '#C97B3A',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {review.role}
              </span>
            </div>

            <StarRating rating={review.rating} size={isExpanded ? 14 : 12} />
          </div>
        </div>

        {/* Review text */}
        <div
          style={{
            maxHeight: isExpanded ? '200px' : '0px',
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '16px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease, margin-top 0.35s ease',
          }}
        >
          
          <p
            style={{
              fontSize: 'clamp(0.76rem, 1.8vw, 0.84rem)',
              color: '#5A3E2B',
              lineHeight: 1.75,
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            {review.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null);

  // Touch swipe support
  const touchStartX = React.useRef<number | null>(null);
  const VISIBLE = 3;

  const slide = useCallback(
    (dir: 'left' | 'right') => {
      if (animating) return;
      setSlideDir(dir);
      setAnimating(true);
      setHoveredIndex(null);
      setTimeout(() => {
        setStartIndex((prev) =>
          dir === 'right'
            ? (prev + 1) % reviews.length
            : (prev - 1 + reviews.length) % reviews.length
        );
        setAnimating(false);
        setSlideDir(null);
      }, 340);
    },
    [animating]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) slide(diff > 0 ? 'right' : 'left');
    touchStartX.current = null;
  };

  const visibleReviews = Array.from({ length: VISIBLE }, (_, i) => ({
    review: reviews[(startIndex + i) % reviews.length],
    globalIndex: (startIndex + i) % reviews.length,
  }));

  return (
    <section style={styles.section}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');

        .rev-nav:hover {
          background: linear-gradient(135deg, #5C2E0E, #A0673A) !important;
          color: #fff !important;
          box-shadow: 0 8px 28px rgba(92,46,14,0.32) !important;
          transform: scale(1.06) !important;
        }

        /* Mobile: single card */
        @media (max-width: 640px) {
          .rev-track {
            grid-template-columns: 1fr !important;
          }
          .rev-card-2, .rev-card-3 {
            display: none !important;
          }
        }

        /* Tablet: 2 cards */
        @media (min-width: 641px) and (max-width: 900px) {
          .rev-track {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rev-card-3 {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.subheading}>Come and Join</p>
        <h2 style={styles.heading}>OUR HAPPY CUSTOMERS</h2>
      </div>

      {/* Carousel */}
      <div style={styles.carouselOuter}>
        {/* Left nav */}
        <button
          style={styles.navBtn}
          className="rev-nav"
          onClick={() => slide('left')}
          aria-label="Previous reviews"
        >
          ‹
        </button>

        {/* Track */}
        <div
          style={styles.trackWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="rev-track"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(12px, 2vw, 20px)',
              alignItems: 'stretch',
              transform: animating
                ? slideDir === 'right'
                  ? 'translateX(-12px)'
                  : 'translateX(12px)'
                : 'translateX(0)',
              opacity: animating ? 0.6 : 1,
              transition: 'transform 0.34s cubic-bezier(0.4,0,0.2,1), opacity 0.34s ease',
            }}
          >
            {visibleReviews.map(({ review, globalIndex }, localIndex) => (
              <div
                key={`${globalIndex}-${startIndex}`}
                className={`rev-card-${localIndex + 1}`}
              >
                <ReviewCard
                  review={review}
                  isExpanded={hoveredIndex === localIndex}
                  onEnter={() => setHoveredIndex(localIndex)}
                  onLeave={() => setHoveredIndex(null)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right nav */}
        <button
          style={styles.navBtn}
          className="rev-nav"
          onClick={() => slide('right')}
          aria-label="Next reviews"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div style={styles.dotsRow}>
        {reviews.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to review ${i + 1}`}
            style={{
              height: '8px',
              width: i === startIndex ? '28px' : '8px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === startIndex
                ? '#C97B3A'
                : 'rgba(201,123,58,0.2)',
              transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s ease',
            }}
            onClick={() => {
              if (!animating) {
                setStartIndex(i);
                setHoveredIndex(null);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}

const styles: any = {
  section: {
    background: '#FFFBF3',
    padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 40px) clamp(40px, 6vw, 72px)',
    fontFamily: 'Georgia, serif',
    position: 'relative',
    overflow: 'hidden',
  
  },

  header: {
    textAlign: 'center',
    marginBottom: 'clamp(32px, 5vw, 56px)',
  },

  subheading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
    fontStyle: 'italic',
    fontWeight: 600,
    color: '#C97B3A',
    marginBottom: '6px',
    letterSpacing: '0.06em',
    lineHeight: 1.2,
  },

  heading: {
    fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)',
    fontWeight: 800,
    color: '#1E0F06',
    letterSpacing: 'clamp(0.04em, 1vw, 0.1em)',
    margin: 0,
    lineHeight: 1.2,
  },

  carouselOuter: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 20px)',
    maxWidth: '1100px',
    margin: '0 auto',
  },

  navBtn: {
    flexShrink: 0,
    alignSelf: 'center',
    width: 'clamp(36px, 5vw, 48px)',
    height: 'clamp(36px, 5vw, 48px)',
    borderRadius: '50%',
    border: '1.5px solid rgba(201,123,58,0.35)',
    background: '#fff',
    color: '#C97B3A',
    fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
    transition: 'all 0.25s ease',
    paddingBottom: '2px',
    touchAction: 'manipulation',
  },

  trackWrapper: {
    flex: 1,
    overflow: 'hidden',
    minWidth: 0,
  },

  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px',
    marginTop: 'clamp(24px, 4vw, 40px)',
    flexWrap: 'wrap',
  },
};

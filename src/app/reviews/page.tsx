'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './review.css';
// =============================================================================
// TYPES
// =============================================================================
interface VideoReview {
  id:       string;
  src:      string;
  poster:   string;
  name:     string;
  rating:   number;
  quote:    string;
  location: string;
}

interface TextReview {
  id:       string;
  name:     string;
  location: string;
  rating:   number;
  text:     string;
  date:     string;
  photo?:   string;
  lang:     'en' | 'ur';
}

interface BuffetVideo {
  id:     string;
  src:    string;
  poster: string;
  title:  string;
  desc:   string;
}

// =============================================================================
// DATA
// =============================================================================
const videoReviews: VideoReview[] = [
  { id:'v1', src:'/videos/reviews/review1.mp4', poster:'/images/reviews/rv1.jpg', name:'Ahmed Khan',     rating:5, quote:'"Best bakery in Sargodha!"',         location:'Queen Chowk'    },
  { id:'v2', src:'/videos/reviews/review2.mp4', poster:'/images/reviews/rv2.jpg', name:'Sara Malik',     rating:5, quote:'"The chai is absolutely divine."',    location:'Satellite Town' },
  { id:'v3', src:'/videos/reviews/review3.mp4', poster:'/images/reviews/rv3.jpg', name:'Usman Ali',      rating:5, quote:'"Fresh bread every single morning."', location:'University Rd'  },
  { id:'v4', src:'/videos/reviews/review4.mp4', poster:'/images/reviews/rv4.jpg', name:'Fatima Butt',    rating:5, quote:'"My family\'s favourite bakery."',    location:'City Road'      },
  { id:'v5', src:'/videos/reviews/review5.mp4', poster:'/images/reviews/rv5.jpg', name:'Bilal Rana',     rating:5, quote:'"Outstanding quality, every time."',  location:'Bhalwal'        },
  { id:'v6', src:'/videos/reviews/review6.mp4', poster:'/images/reviews/rv6.jpg', name:'Zainab Sheikh',  rating:5, quote:'"The croissants are next level!"',    location:'Zafar Ullah Chowk' },
];

const textReviews: TextReview[] = [
  { id:'t1',  lang:'en', name:'Ahmed K.',    location:'Sargodha',     rating:5, date:'March 2025',    text:'Saqafat has been our family bakery for years. The bread is always fresh, the staff are friendly, and the prices are fair. Highly recommend to everyone in Sargodha.' },
  { id:'t2',  lang:'ur', name:'فاطمہ ب.',    location:'سرگودھا',      rating:5, date:'مارچ ۲۰۲۵',    text:'صقافت کی روٹی اور کیک لاجواب ہیں۔ ہم ہر ہفتے یہاں سے خریداری کرتے ہیں۔ بہترین معیار اور بہترین ذائقہ۔' },
  { id:'t3',  lang:'en', name:'Sara M.',     location:'University Rd', rating:5, date:'Feb 2025',     text:'The chocolate cake from Saqafat is simply the best in the city. My kids absolutely love it. We order for every birthday and celebration.' },
  { id:'t4',  lang:'ur', name:'عثمان ع.',    location:'سیٹلائٹ ٹاؤن', rating:5, date:'فروری ۲۰۲۵',  text:'دودھ پتی چائے کا ذائقہ بے مثال ہے۔ صبح کا ناشتہ صقافت کے بغیر ادھورا لگتا ہے۔ سٹاف بھی بہت محبت سے پیش آتا ہے۔' },
  { id:'t5',  lang:'en', name:'Bilal R.',    location:'City Road',     rating:4, date:'Jan 2025',     text:'Great variety of baked goods. The croissants are flaky and buttery, just like the ones abroad. Very impressed with the quality for the price.' },
  { id:'t6',  lang:'ur', name:'زینب ش.',    location:'بھلوال',        rating:5, date:'جنوری ۲۰۲۵',  text:'بفے کا انتظام بہت عمدہ تھا۔ مہمان بہت خوش ہوئے۔ صقافت نے ہمارے ولیمے کو یادگار بنا دیا۔ شکریہ صقافت!' },
  { id:'t7',  lang:'en', name:'Hina N.',     location:'Queen Chowk',   rating:5, date:'Dec 2024',     text:'Ordered a custom cake for my daughter\'s birthday and it was absolutely stunning. Tasted even better than it looked. The team was professional and on time.' },
  { id:'t8',  lang:'ur', name:'حنا ن.',     location:'کوئین چوک',     rating:5, date:'دسمبر ۲۰۲۴',  text:'کسٹم کیک کا آرڈر دیا تھا، وقت پر ملا اور ذائقہ بھی کمال تھا۔ بچوں نے بہت پسند کیا۔ اگلی بار بھی صقافت ہی!' },
  { id:'t9',  lang:'en', name:'Omar T.',     location:'Zafar Ullah Chowk', rating:5, date:'Nov 2024', text:'The buffet service is top-notch. Food was hot, fresh, and plentiful throughout our corporate event. Colleagues are still talking about it.' },
  { id:'t10', lang:'ur', name:'عمر ت.',     location:'ظفر اللہ چوک',   rating:4, date:'نومبر ۲۰۲۴', text:'کارپوریٹ تقریب کے لیے بفے بک کیا۔ کھانا لذیذ اور تازہ تھا۔ مہمانوں نے بہت تعریف کی۔ ضرور دوبارہ بک کریں گے۔' },
  { id:'t11', lang:'en', name:'Amna Q.',     location:'Satellite Town', rating:5, date:'Oct 2024',    text:'Saqafat\'s pastries are a cut above the rest. The pistachio pastry is my personal favourite — I drive across town just for it!' },
  { id:'t12', lang:'ur', name:'آمنہ ق.',    location:'سیٹلائٹ ٹاؤن', rating:5, date:'اکتوبر ۲۰۲۴', text:'نٹیلا کروسینٹ کھا کر دل خوش ہو گیا۔ اتنی اچھی معیار کی چیزیں اتنی مناسب قیمت میں ملنا بہت خوش قسمتی ہے۔' },
  { id:'t13', lang:'en', name:'Hassan Y.',   location:'Bhalwal',        rating:5, date:'Sept 2024',   text:'The brown bread here is so good that I stopped buying from the supermarket. Fresh, wholesome, and perfectly baked every single day.' },
  { id:'t14', lang:'ur', name:'حسن ی.',     location:'بھلوال',         rating:5, date:'ستمبر ۲۰۲۴',  text:'براؤن بریڈ کا ذائقہ گھر کی روٹی جیسا ہے۔ صاف ستھرا ماحول اور وقت پر ڈیلیوری۔ صقافت زندہ باد!' },
  { id:'t15', lang:'en', name:'Nadia S.',    location:'University Rd',  rating:5, date:'Aug 2024',    text:'Went for the buffet on a family occasion and everyone was blown away. Great value, amazing food, and the staff went above and beyond.' },
  { id:'t16', lang:'ur', name:'نادیہ س.',   location:'یونیورسٹی روڈ', rating:5, date:'اگست ۲۰۲۴',   text:'خاندانی تقریب کے لیے بفے لیا۔ کھانا گرم اور تازہ تھا۔ سب مہمان بہت خوش ہوئے۔ صقافت کا شکریہ!' },
];

// =============================================================================
// STAR RATING
// =============================================================================
function StarRating({ rating, animated = false }: { rating: number; animated?: boolean }) {
  const [show, setShow] = useState(!animated);
  useEffect(() => {
    if (!animated) return;
    const id = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(id);
  }, [animated]);

  return (
    <div className="rv-stars" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          className={`rv-star${s <= rating ? ' rv-star-filled' : ''}`}
          style={animated ? { transitionDelay: `${(s-1)*0.1}s`, opacity: show ? 1 : 0 } : {}}
        >★</span>
      ))}
    </div>
  );
}

// =============================================================================
// REEL VIDEO CARD  (9:16 portrait, TikTok-style)
// =============================================================================
function ReelCard({ review }: { review: VideoReview }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted  ] = useState(true);

  // Autoplay when in viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <div ref={cardRef} className="rv-reel-card" onClick={togglePlay} role="button" tabIndex={0}
      aria-label={`Video review by ${review.name}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); }}}
    >
      <video
        ref={videoRef}
        src={review.src}
        poster={review.poster}
        muted
        playsInline
        loop
        preload="metadata"
        className="rv-reel-video"
      />

      {/* Gradient overlays top + bottom */}
      <div className="rv-reel-grad-top" />
      <div className="rv-reel-grad-bot" />

      {/* Play/Pause centre icon (shows briefly on tap) */}
      <div className={`rv-reel-playpause${playing ? '' : ' rv-reel-playpause-show'}`} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
          {playing
            ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            : <path d="M8 5v14l11-7z"/>}
        </svg>
      </div>

      {/* Bottom info overlay */}
      <div className="rv-reel-info">
        <div className="rv-reel-name-row">
          <div className="rv-reel-avatar">{review.name.charAt(0)}</div>
          <div>
            <p className="rv-reel-name">{review.name}</p>
            <p className="rv-reel-loc">📍 {review.location}</p>
          </div>
        </div>
        <p className="rv-reel-quote">{review.quote}</p>
        <StarRating rating={review.rating} animated />
      </div>

      {/* Mute toggle top-right */}
      <button className="rv-reel-mute" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        }
      </button>
    </div>
  );
}

// =============================================================================
// MARQUEE ROW (infinite scroll, pauses on hover/touch)
// =============================================================================
function MarqueeRow({
  reviews,
  direction,
}: {
  reviews: TextReview[];
  direction: 'left' | 'right';
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate cards to create seamless loop
  const doubled = [...reviews, ...reviews];

  return (
    <div
      className="rv-marquee-outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className={`rv-marquee-track rv-marquee-${direction}${paused ? ' rv-marquee-paused' : ''}`}
      >
        {doubled.map((r, i) => (
          <MarqueeCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({ review }: { review: TextReview }) {
  const isUrdu = review.lang === 'ur';
  return (
    <div
      className={`rv-mq-card${isUrdu ? ' rv-mq-card-urdu' : ''}`}
      dir={isUrdu ? 'rtl' : 'ltr'}
      lang={isUrdu ? 'ur' : 'en'}
    >
      <div className="rv-mq-top">
        <div className="rv-mq-avatar">{review.name.charAt(0)}</div>
        <div className="rv-mq-meta">
          <p className="rv-mq-name">{review.name}</p>
          <p className="rv-mq-loc">📍 {review.location}</p>
        </div>
        <span className={`rv-lang-tag rv-lang-${review.lang}`}>
          {isUrdu ? 'اردو' : 'EN'}
        </span>
      </div>
      <StarRating rating={review.rating} />
      <p className="rv-mq-body">{review.text}</p>
      <p className="rv-mq-date">{review.date}</p>
    </div>
  );
}

// =============================================================================
// BUFFET RESERVATION MODAL
// =============================================================================
function BuffetModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', date:'', guests:'', notes:'' });
  const [submitted, setSubmitted] = useState(false);

  const set = (f: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New Buffet Reservation\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nDate: ${form.date}\nGuests: ${form.guests}\nNotes: ${form.notes || '—'}`;
    window.open(`https://wa.me/923XXXXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
    window.location.href = `mailto:info@saqafatbakery.com?subject=Buffet Reservation&body=${encodeURIComponent(msg)}`;
    setSubmitted(true);
  };

  return (
    <div className="rv-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="rv-buffet-modal-title"
    >
      <div className="rv-form-modal">
        <div className="rv-form-modal-header">
          <div className="rv-form-modal-glow" />
          <h2 id="rv-buffet-modal-title">Book Your Buffet Event</h2>
          <p>Fill in the details and we'll confirm within 24 hours.</p>
          <button className="rv-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {submitted ? (
          <div className="rv-success">
            <div className="rv-success-icon">✓</div>
            <h3>Request Sent!</h3>
            <p>Thank you! We'll reach out within 48 hours to confirm your buffet reservation.</p>
            <button className="rv-primary-btn" onClick={onClose}>
              <span className="rv-btn-inner">Close</span>
              <span className="rv-btn-shine" />
            </button>
          </div>
        ) : (
          <form className="rv-form" onSubmit={handleSubmit}>
            {[
              { id:'name',   label:'Full Name',        type:'text',   placeholder:'Your name',       required:true },
              { id:'phone',  label:'Phone Number',      type:'tel',    placeholder:'03XX XXXXXXX',    required:true },
              { id:'email',  label:'Email Address',     type:'email',  placeholder:'you@example.com', required:true },
              { id:'date',   label:'Event Date',        type:'date',   placeholder:'',                required:true },
              { id:'guests', label:'Number of Guests',  type:'number', placeholder:'e.g. 50',         required:true },
            ].map((f) => (
              <div className="rv-field" key={f.id}>
                <label className="rv-label" htmlFor={`rv-bf-${f.id}`}>
                  {f.label} {f.required && <span className="rv-required">*</span>}
                </label>
                <input
                  id={`rv-bf-${f.id}`}
                  className="rv-input"
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  value={form[f.id as keyof typeof form]}
                  onChange={set(f.id as keyof typeof form)}
                  min={f.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                />
              </div>
            ))}
            <div className="rv-field">
              <label className="rv-label" htmlFor="rv-bf-notes">Special Requests</label>
              <textarea id="rv-bf-notes" className="rv-input rv-textarea" rows={3}
                placeholder="Dietary needs, theme, special arrangements..."
                value={form.notes} onChange={set('notes')}
              />
            </div>
            <div className="rv-form-actions">
              <button type="submit" className="rv-primary-btn">
                <span className="rv-btn-inner" style={{ position:'relative', zIndex:1 }}>Submit Request →</span>
                <span className="rv-btn-shine" />
              </button>
              <button type="button" className="rv-ghost-btn" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function Reviews() {
  const [buffetModal, setBuffetModal] = useState(false);

  // Split reviews into two rows for the marquee
  const row1 = textReviews.filter((_, i) => i % 2 === 0);  // even → scroll left
  const row2 = textReviews.filter((_, i) => i % 2 !== 0);  // odd  → scroll right

  return (
    <div className="rv-root">

      {/* ── PAGE HERO ── */}
      <section className="rv-hero">
        <div className="rv-hero-glow" />
        <div className="rv-hero-content">
          <div className="rv-eyebrow">
            <span className="rv-eyebrow-line" />
            <span className="rv-eyebrow-text">Real Stories</span>
            <span className="rv-eyebrow-line" />
          </div>
          <h1 className="rv-hero-h1">
            What Our Customers{' '}
            <span className="rv-accent">Say</span>
          </h1>
          <p className="rv-hero-sub">
            Thousands of happy customers across Sargodha and Bhalwal — here are their stories.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VIDEO REVIEWS — Reel / TikTok style
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-section-cream" aria-labelledby="rv-video-heading">
        <div className="rv-blob rv-blob-tl" />
        <div className="rv-blob rv-blob-br" />

        <div className="rv-section-head">
          <div className="rv-eyebrow">
            <span className="rv-eyebrow-line" />
            <span className="rv-eyebrow-text">Video Testimonials</span>
            <span className="rv-eyebrow-line" />
          </div>
          <h2 id="rv-video-heading" className="rv-section-title">
            Hear It From <span className="rv-accent">Them</span>
          </h2>
          <p className="rv-section-sub">
            Real customers, real experiences — unscripted and from the heart.
          </p>
        </div>

        {/* Reel-style horizontal scroll row — max 4 cards */}
        <div className="rv-reel-row">
          {videoReviews.slice(0, 4).map((v) => (
            <ReelCard key={v.id} review={v} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TEXT REVIEWS — Two marquee rows (←  →)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-section-dark" aria-labelledby="rv-text-heading">
        <div className="rv-section-head">
          <div className="rv-eyebrow rv-eyebrow-gold">
            <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
            <span className="rv-eyebrow-text rv-eyebrow-text-gold">Customer Reviews</span>
            <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
          </div>
          <h2 id="rv-text-heading" className="rv-section-title rv-title-light">
            Stories from Our <span className="rv-accent-gold">Family</span>
          </h2>
          <p className="rv-section-sub rv-sub-light">
            Reviews in English and Urdu — hover or touch to pause.
          </p>
        </div>

        {/* Row 1 → scrolls LEFT */}
        <MarqueeRow reviews={row1} direction="left" />
        {/* Row 2 → scrolls RIGHT */}
        <MarqueeRow reviews={row2} direction="right" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REVIEW SUBMISSION CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-cta-section" aria-labelledby="rv-cta-heading">
        <div className="rv-cta-glow" />
        <div className="rv-eyebrow rv-eyebrow-gold">
          <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
          <span className="rv-eyebrow-text rv-eyebrow-text-gold">Share Your Saqafat Story</span>
          <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
        </div>
        <h2 id="rv-cta-heading" className="rv-section-title rv-title-light" style={{ textAlign:'center' }}>
          Loved Your Visit? <span className="rv-accent-gold">Tell Us!</span>
        </h2>
        <p className="rv-section-sub rv-sub-light" style={{ textAlign:'center' }}>
          Your feedback helps us serve you better — and we love hearing your stories.
        </p>
        <div className="rv-incentive">
          🎉 Leave a review and get <strong>10% off</strong> your next order!
        </div>
        <Link href="/feedback" className="rv-primary-btn rv-cta-btn">
          <span className="rv-btn-inner" style={{ position:'relative', zIndex:1 }}>
            Leave a Review
            <span className="rv-btn-arrow">→</span>
          </span>
          <span className="rv-btn-shine" />
        </Link>
      </section>

      {buffetModal && <BuffetModal onClose={() => setBuffetModal(false)} />}
    </div>
  );
}
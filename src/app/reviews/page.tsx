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
  // English
  { id:'t1',  lang:'en', name:'Ahmed K.',    location:'Sargodha',     rating:5, date:'March 2025',    text:'Saqafat has been our family bakery for years. The bread is always fresh, the staff are friendly, and the prices are fair. Highly recommend to everyone in Sargodha.' },
  // Urdu
  { id:'t2',  lang:'ur', name:'فاطمہ ب.',    location:'سرگودھا',      rating:5, date:'مارچ ۲۰۲۵',    text:'صقافت کی روٹی اور کیک لاجواب ہیں۔ ہم ہر ہفتے یہاں سے خریداری کرتے ہیں۔ بہترین معیار اور بہترین ذائقہ۔' },
  // English
  { id:'t3',  lang:'en', name:'Sara M.',     location:'University Rd', rating:5, date:'Feb 2025',     text:'The chocolate cake from Saqafat is simply the best in the city. My kids absolutely love it. We order for every birthday and celebration.' },
  // Urdu
  { id:'t4',  lang:'ur', name:'عثمان ع.',    location:'سیٹلائٹ ٹاؤن', rating:5, date:'فروری ۲۰۲۵',  text:'دودھ پتی چائے کا ذائقہ بے مثال ہے۔ صبح کا ناشتہ صقافت کے بغیر ادھورا لگتا ہے۔ سٹاف بھی بہت محبت سے پیش آتا ہے۔' },
  // English
  { id:'t5',  lang:'en', name:'Bilal R.',    location:'City Road',     rating:4, date:'Jan 2025',     text:'Great variety of baked goods. The croissants are flaky and buttery, just like the ones abroad. Very impressed with the quality for the price.' },
  // Urdu
  { id:'t6',  lang:'ur', name:'زینب ش.',    location:'بھلوال',        rating:5, date:'جنوری ۲۰۲۵',  text:'بفے کا انتظام بہت عمدہ تھا۔ مہمان بہت خوش ہوئے۔ صقافت نے ہمارے ولیمے کو یادگار بنا دیا۔ شکریہ صقافت!' },
  // English
  { id:'t7',  lang:'en', name:'Hina N.',     location:'Queen Chowk',   rating:5, date:'Dec 2024',     text:'Ordered a custom cake for my daughter\'s birthday and it was absolutely stunning. Tasted even better than it looked. The team was professional and on time.' },
  // Urdu
  { id:'t8',  lang:'ur', name:'حنا ن.',     location:'کوئین چوک',     rating:5, date:'دسمبر ۲۰۲۴',  text:'کسٹم کیک کا آرڈر دیا تھا، وقت پر ملا اور ذائقہ بھی کمال تھا۔ بچوں نے بہت پسند کیا۔ اگلی بار بھی صقافت ہی!' },
  // English
  { id:'t9',  lang:'en', name:'Omar T.',     location:'Zafar Ullah Chowk', rating:5, date:'Nov 2024', text:'The buffet service is top-notch. Food was hot, fresh, and plentiful throughout our corporate event. Colleagues are still talking about it.' },
  // Urdu
  { id:'t10', lang:'ur', name:'عمر ت.',     location:'ظفر اللہ چوک',   rating:4, date:'نومبر ۲۰۲۴', text:'کارپوریٹ تقریب کے لیے بفے بک کیا۔ کھانا لذیذ اور تازہ تھا۔ مہمانوں نے بہت تعریف کی۔ ضرور دوبارہ بک کریں گے۔' },
  // English
  { id:'t11', lang:'en', name:'Amna Q.',     location:'Satellite Town', rating:5, date:'Oct 2024',    text:'Saqafat\'s pastries are a cut above the rest. The pistachio pastry is my personal favourite — I drive across town just for it!' },
  // Urdu
  { id:'t12', lang:'ur', name:'آمنہ ق.',    location:'سیٹلائٹ ٹاؤن', rating:5, date:'اکتوبر ۲۰۲۴', text:'نٹیلا کروسینٹ کھا کر دل خوش ہو گیا۔ اتنی اچھی معیار کی چیزیں اتنی مناسب قیمت میں ملنا بہت خوش قسمتی ہے۔' },
  // English
  { id:'t13', lang:'en', name:'Hassan Y.',   location:'Bhalwal',        rating:5, date:'Sept 2024',   text:'The brown bread here is so good that I stopped buying from the supermarket. Fresh, wholesome, and perfectly baked every single day.' },
  // Urdu
  { id:'t14', lang:'ur', name:'حسن ی.',     location:'بھلوال',         rating:5, date:'ستمبر ۲۰۲۴',  text:'براؤن بریڈ کا ذائقہ گھر کی روٹی جیسا ہے۔ صاف ستھرا ماحول اور وقت پر ڈیلیوری۔ صقافت زندہ باد!' },
  // English
  { id:'t15', lang:'en', name:'Nadia S.',    location:'University Rd',  rating:5, date:'Aug 2024',    text:'Went for the buffet on a family occasion and everyone was blown away. Great value, amazing food, and the staff went above and beyond.' },
  // Urdu
  { id:'t16', lang:'ur', name:'نادیہ س.',   location:'یونیورسٹی روڈ', rating:5, date:'اگست ۲۰۲۴',   text:'خاندانی تقریب کے لیے بفے لیا۔ کھانا گرم اور تازہ تھا۔ سب مہمان بہت خوش ہوئے۔ صقافت کا شکریہ!' },
];

const buffetVideos: BuffetVideo[] = [
  { id:'bv1', src:'/videos/buffet/buffet1.mp4', poster:'/images/buffet/bv1.jpg', title:'Grand Wedding Buffet',   desc:'A full wedding reception catered by Saqafat — 300+ guests, live stations, and an unforgettable spread.' },
  { id:'bv2', src:'/videos/buffet/buffet2.mp4', poster:'/images/buffet/bv2.jpg', title:'Corporate Event Setup',  desc:'Office lunch catering for a leading Sargodha firm — hot, fresh, on time, every time.' },
  { id:'bv3', src:'/videos/buffet/buffet3.mp4', poster:'/images/buffet/bv3.jpg', title:'Family Celebration',     desc:'A beautiful family gathering powered by Saqafat\'s legendary buffet service.' },
];

// =============================================================================
// STAR RATING COMPONENT
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
        >
          ★
        </span>
      ))}
    </div>
  );
}

// =============================================================================
// VIDEO REVIEW CARD
// =============================================================================
function VideoCard({ review, onClick }: { review: VideoReview; onClick: () => void }) {
  return (
    <div className="rv-video-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }}}
      aria-label={`Play video review by ${review.name}`}
    >
      {/* Poster image */}
      <div className="rv-video-thumb">
        <Image src={review.poster} alt={`${review.name} review`} fill style={{ objectFit:'cover' }} sizes="(max-width:768px) 90vw, 33vw" />
        {/* Play button */}
        <div className="rv-play-btn" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        {/* Gradient overlay */}
        <div className="rv-video-overlay" />
      </div>

      {/* Info overlay at bottom */}
      <div className="rv-video-info">
        <StarRating rating={review.rating} animated />
        <p className="rv-video-name">{review.name}</p>
        <p className="rv-video-location">📍 {review.location}</p>
        <p className="rv-video-quote">{review.quote}</p>
      </div>
    </div>
  );
}

// =============================================================================
// VIDEO MODAL
// =============================================================================
function VideoModal({ review, onClose }: { review: VideoReview; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="rv-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={`Video review by ${review.name}`}
    >
      <div className="rv-modal-box">
        <button className="rv-modal-close" onClick={onClose} aria-label="Close video">✕</button>
        <video
          ref={videoRef}
          src={review.src}
          poster={review.poster}
          controls
          playsInline
          className="rv-modal-video"
        />
        <div className="rv-modal-info">
          <StarRating rating={review.rating} />
          <p className="rv-modal-name">{review.name} — <span>{review.location}</span></p>
          <p className="rv-modal-quote">{review.quote}</p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// TEXT REVIEW CARD with scroll animation
// =============================================================================
function TextReviewCard({ review, index }: { review: TextReview; index: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isUrdu = review.lang === 'ur';

  return (
    <div
      ref={ref}
      className={`rv-text-card${visible ? ' rv-text-card-visible' : ''}${isUrdu ? ' rv-text-card-urdu' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      dir={isUrdu ? 'rtl' : 'ltr'}
      lang={isUrdu ? 'ur' : 'en'}
    >
      {/* Top row: avatar + name */}
      <div className="rv-text-top">
        <div className="rv-avatar">
          {review.photo
            ? <Image src={review.photo} alt={review.name} width={44} height={44} style={{ borderRadius:'50%', objectFit:'cover' }} />
            : <span className="rv-avatar-initials">{review.name.charAt(0)}</span>
          }
        </div>
        <div className="rv-text-meta">
          <p className="rv-text-name">{review.name}</p>
          <p className="rv-text-location">📍 {review.location}</p>
        </div>
        {/* Language tag */}
        <span className={`rv-lang-tag rv-lang-${review.lang}`}>
          {isUrdu ? 'اردو' : 'EN'}
        </span>
      </div>

      <StarRating rating={review.rating} />

      <p className="rv-text-body">{review.text}</p>

      <p className="rv-text-date">{review.date}</p>
    </div>
  );
}

// =============================================================================
// BUFFET VIDEO PLAYER
// =============================================================================
function BuffetVideoPlayer({ video }: { video: BuffetVideo }) {
  return (
    <div className="rv-buffet-player">
      <video
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        preload="metadata"
        className="rv-buffet-video"
        aria-label={video.title}
      />
      <div className="rv-buffet-info">
        <h3 className="rv-buffet-title">{video.title}</h3>
        <p className="rv-buffet-desc">{video.desc}</p>
      </div>
    </div>
  );
}

// =============================================================================
// BUFFET RESERVATION MODAL (reused from CustomBuffet)
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
              { id:'name',   label:'Full Name',     type:'text',  placeholder:'Your name',       required:true  },
              { id:'phone',  label:'Phone Number',   type:'tel',   placeholder:'03XX XXXXXXX',    required:true  },
              { id:'email',  label:'Email Address',  type:'email', placeholder:'you@example.com', required:true  },
              { id:'date',   label:'Event Date',     type:'date',  placeholder:'',                required:true  },
              { id:'guests', label:'Number of Guests',type:'number',placeholder:'e.g. 50',        required:true  },
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
                <span className="rv-btn-inner" style={{ position:'relative', zIndex:1 }}>
                  Submit Request →
                </span>
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
export default function ReviewsPage() {
  const [activeVideo,   setActiveVideo  ] = useState<VideoReview | null>(null);
  const [buffetModal,   setBuffetModal  ] = useState(false);

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
          §3.6.1 — VIDEO REVIEWS
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

        {/* 3-col grid (SRS §3.6.1) */}
        <div className="rv-video-grid">
          {videoReviews.map((v) => (
            <VideoCard key={v.id} review={v} onClick={() => setActiveVideo(v)} />
          ))}
        </div>
      </section>

      {/* Video modal */}
      {activeVideo && (
        <VideoModal review={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          §3.6.2 — TEXT REVIEWS (16 total: 8 EN + 8 UR alternating)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-section-dark" aria-labelledby="rv-text-heading">
        <div className="rv-section-head">
          {/* Override colors for dark bg */}
          <div className="rv-eyebrow rv-eyebrow-gold">
            <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
            <span className="rv-eyebrow-text rv-eyebrow-text-gold">Customer Reviews</span>
            <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
          </div>
          <h2 id="rv-text-heading" className="rv-section-title rv-title-light">
            Stories from Our <span className="rv-accent-gold">Family</span>
          </h2>
          <p className="rv-section-sub rv-sub-light">
            16 reviews — in English and Urdu, from customers across our branches.
          </p>
        </div>

        {/* Alternating EN/UR grid (SRS §3.6.2) */}
        <div className="rv-text-grid">
          {textReviews.map((r, i) => (
            <TextReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3.6.3 — BUFFET HALL SHOWCASE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-section-cream" aria-labelledby="rv-buffet-heading">
        <div className="rv-blob rv-blob-tl" />

        <div className="rv-section-head">
          <div className="rv-eyebrow">
            <span className="rv-eyebrow-line" />
            <span className="rv-eyebrow-text">Buffet Showcase</span>
            <span className="rv-eyebrow-line" />
          </div>
          {/* SRS §3.6.3 exact title */}
          <h2 id="rv-buffet-heading" className="rv-section-title">
            Our Buffets <span className="rv-accent">in Action</span>
          </h2>
          <p className="rv-section-sub">
            From weddings to corporate events — see what a Saqafat buffet looks like.
          </p>
        </div>

        {/* Video players — NOT autoplay (SRS §3.6.3) */}
        <div className="rv-buffet-grid">
          {buffetVideos.map((v) => (
            <BuffetVideoPlayer key={v.id} video={v} />
          ))}
        </div>

        {/* SRS §3.6.3 CTA */}
        <div className="rv-buffet-cta">
          <button
            className="rv-primary-btn"
            onClick={() => setBuffetModal(true)}
            aria-label="Book a buffet event"
          >
            <span className="rv-btn-inner" style={{ position:'relative', zIndex:1 }}>
              Book Your Event
              <span className="rv-btn-arrow">→</span>
            </span>
            <span className="rv-btn-shine" />
          </button>
        </div>
      </section>

      {/* Buffet reservation modal */}
      {buffetModal && <BuffetModal onClose={() => setBuffetModal(false)} />}

      {/* ══════════════════════════════════════════════════════════════════
          §3.6.4 — REVIEW SUBMISSION CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="rv-section rv-cta-section" aria-labelledby="rv-cta-heading">
        <div className="rv-cta-glow" />

        <div className="rv-eyebrow rv-eyebrow-gold">
          <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
          {/* SRS §3.6.4 exact section name */}
          <span className="rv-eyebrow-text rv-eyebrow-text-gold">Share Your Saqafat Story</span>
          <span className="rv-eyebrow-line rv-eyebrow-line-gold" />
        </div>

        <h2 id="rv-cta-heading" className="rv-section-title rv-title-light" style={{ textAlign:'center' }}>
          Loved Your Visit? <span className="rv-accent-gold">Tell Us!</span>
        </h2>

        <p className="rv-section-sub rv-sub-light" style={{ textAlign:'center' }}>
          Your feedback helps us serve you better — and we love hearing your stories.
        </p>

        {/* SRS §3.6.4 incentive */}
        <div className="rv-incentive">
          🎉 Leave a review and get <strong>10% off</strong> your next order!
        </div>

        {/* SRS §3.6.4 CTA → Feedback page */}
        <Link href="/feedback" className="rv-primary-btn rv-cta-btn">
          <span className="rv-btn-inner" style={{ position:'relative', zIndex:1 }}>
            Leave a Review
            <span className="rv-btn-arrow">→</span>
          </span>
          <span className="rv-btn-shine" />
        </Link>
      </section>

    </div>
  );
}

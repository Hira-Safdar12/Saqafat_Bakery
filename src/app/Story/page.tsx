'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Story.css';

// =============================================================================
// TYPES
// =============================================================================
interface TimelineItem {
  year:  string;
  title: string;
  desc:  string;
  side:  'left' | 'right';
}

interface GalleryImage {
  src:     string;
  alt:     string;
  caption: string;
}

// =============================================================================
// DATA
// =============================================================================
const timeline: TimelineItem[] = [
  { year:'2009', title:'The First Loaf',         side:'left',  desc:'A small bakery opened its doors at Queen Chowk, Sargodha. With one oven, two bakers, and a dream — Saqafat was born.'                              },
  { year:'2012', title:'First Expansion',         side:'right', desc:'Growing demand led to a second branch on University Road. The community had spoken — Saqafat was here to stay.'                                   },
  { year:'2015', title:'The Cake Revolution',     side:'left',  desc:'Our custom cake line launched and instantly became the most sought-after in Sargodha. Birthday parties were never the same again.'                },
  { year:'2018', title:'Buffet & Catering',       side:'right', desc:'Saqafat entered the events space with its legendary buffet service. Weddings, corporates, and family gatherings found their perfect partner.'      },
  { year:'2021', title:'Four Branches Strong',    side:'left',  desc:'Satellite Town and Zafar Ullah Chowk branches opened. Saqafat was no longer a bakery — it was a Sargodha institution.'                           },
  { year:'2023', title:'Bhalwal & Beyond',        side:'right', desc:'The Shaheed Road, Bhalwal branch brought Saqafat to a new city. Six branches, one family, one promise — quality above all.'                      },
  { year:'2026', title:'The Digital Chapter',     side:'left',  desc:'Saqafat goes online — ordering, partnerships, and stories now reach every corner of Pakistan. The journey continues.'                             },
];

const galleryImages: GalleryImage[] = [
  { src:'/images/story/branch1.jpg',  alt:'Queen Chowk branch interior',     caption:'Queen Chowk — our first home'           },
  { src:'/images/story/branch2.jpg',  alt:'University Road branch exterior',  caption:'University Road branch'                 },
  { src:'/images/story/kitchen1.jpg', alt:'Saqafat kitchen',                  caption:'Where the magic happens'                },
  { src:'/images/story/staff1.jpg',   alt:'Saqafat team',                     caption:'Our family — the Saqafat team'          },
  { src:'/images/story/branch3.jpg',  alt:'Satellite Town branch',            caption:'Satellite Town branch'                  },
  { src:'/images/story/branch4.jpg',  alt:'Bhalwal branch signage',           caption:'Shaheed Road, Bhalwal'                  },
  { src:'/images/story/customer1.jpg',alt:'Happy customers',                   caption:'Moments that matter'                    },
  { src:'/images/story/cake1.jpg',    alt:'Custom cake display',              caption:'Crafted with love'                      },
];

// =============================================================================
// SCROLL REVEAL HOOK
// =============================================================================
function useReveal(threshold = 0.15) {
  const ref     = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// =============================================================================
// TIMELINE ITEM
// =============================================================================
function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`st-tl-item st-tl-${item.side}${visible ? ' st-tl-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Content box */}
      <div className="st-tl-box">
        <span className="st-tl-year">{item.year}</span>
        <h3 className="st-tl-title">{item.title}</h3>
        <p className="st-tl-desc">{item.desc}</p>
      </div>

      {/* Centre dot */}
      <div className="st-tl-dot" aria-hidden="true">
        <div className="st-tl-dot-inner" />
      </div>

      {/* Spacer for opposite side */}
      <div className="st-tl-spacer" />
    </div>
  );
}

// =============================================================================
// GALLERY IMAGE
// =============================================================================
function GalleryCard({ img, index }: { img: GalleryImage; index: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`st-gallery-card${visible ? ' st-gallery-card-visible' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        style={{ objectFit:'cover' }}
        sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 25vw"
      />
      <div className="st-gallery-overlay">
        <p className="st-gallery-caption">{img.caption}</p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function StoryPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="st-root">

      {/* ══════════════════════════════════════════════════════════════════
          §3.7.1 — HERO REEL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-hero" aria-label="Saqafat story reel">
        {/* Background video — auto-plays muted, click to unmute (SRS §3.7.1) */}
        <video
          ref={videoRef}
          className="st-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/story/hero-poster.jpg"
          aria-label="Saqafat story reel"
        >
          <source src="/videos/story-reel.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="st-hero-overlay" />
        <div className="st-hero-vignette" />
        <div className="st-hero-glow" />

        {/* Hero content */}
        <div className="st-hero-content">
          <div className="st-eyebrow st-eyebrow-gold">
            <span className="st-eyebrow-line st-eyebrow-line-gold" />
            <span className="st-eyebrow-text st-eyebrow-text-gold">Est. 2009</span>
            <span className="st-eyebrow-line st-eyebrow-line-gold" />
          </div>

          <h1 className="st-hero-h1">
            From a Dream to{' '}
            <span className="st-hero-accent">Your Dining Table</span>
          </h1>

          <p className="st-hero-sub">
            Fifteen years of bread, cakes, chai, and memories.
          </p>

          {/* Unmute toggle (SRS §3.7.1 — muted by default, click to unmute) */}
          <button
            className="st-unmute-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
              }
            }}
            aria-label="Toggle video sound"
          >
            <span>🔇</span>
            <span>Click to unmute</span>
          </button>
        </div>

        {/* Scroll cue */}
        <div className="st-scroll-cue" aria-hidden="true">
          <span className="st-scroll-label">Scroll</span>
          <span className="st-scroll-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3.7.2 — WRITTEN STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-story-section" aria-labelledby="st-story-heading">
        <div className="st-blob st-blob-tl" />
        <div className="st-blob st-blob-br" />

        <div className="st-story-inner">

          {/* Left — vintage photo */}
          <div className="st-story-img-col">
            <div className="st-story-img-wrap">
              <Image
                src="/images/story/founders-early.jpg"
                alt="Saqafat founders in early days"
                fill
                style={{ objectFit:'cover' }}
                sizes="(max-width:768px) 90vw, 45vw"
              />
              {/* Decorative dashed ring */}
              <div className="st-story-img-ring" aria-hidden="true" />
            </div>

            {/* Years badge */}
            <div className="st-years-badge">
              <span className="st-years-num">15</span>
              <span className="st-years-label">Years of Excellence</span>
            </div>
          </div>

          {/* Right — written story (SRS §3.7.2) */}
          <div className="st-story-text-col">

            <div className="st-eyebrow">
              <span className="st-eyebrow-line" />
              <span className="st-eyebrow-text">Our Story</span>
            </div>

            {/* SRS §3.7.2 exact headline */}
            <h2 id="st-story-heading" className="st-story-h2">
              From a Dream to{' '}
              <span className="st-accent">Your Dining Table</span>
            </h2>

            {/* SRS §3.7.2 structure: Origin → Challenges → Growth → Today */}
            <div className="st-story-body">

              <div className="st-story-chapter">
                <h4 className="st-chapter-label">🌱 The Origin</h4>
                <p>
                  In 2009, at a small shop in Queen Chowk, Sargodha, a dream was kneaded into
                  existence. With one oven, a handful of recipes, and an unshakeable belief in
                  quality, Saqafat opened its doors — and never looked back.
                </p>
              </div>

              <div className="st-story-chapter">
                <h4 className="st-chapter-label">💪 The Challenges</h4>
                <p>
                  The early years weren't easy. Long hours, limited resources, and a market
                  that needed convincing. But every customer who tasted our bread, every family
                  that chose our cakes — they became the fuel that kept the ovens burning.
                </p>
              </div>

              <div className="st-story-chapter">
                <h4 className="st-chapter-label">📈 The Growth</h4>
                <p>
                  Word spread. Branch by branch — University Road, Satellite Town, Zafar Ullah
                  Chowk, City Road, and finally Bhalwal. What began as one man's dream became
                  a family of six branches and hundreds of daily customers.
                </p>
              </div>

              <div className="st-story-chapter">
                <h4 className="st-chapter-label">🏆 Today</h4>
                <p>
                  Today, Saqafat is more than a bakery. It's where Sargodha celebrates, where
                  families gather, where memories are made over a cup of doodh patti and a
                  fresh-baked loaf. And we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3.7.3 — FOUNDERS' QUOTE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-quote-section" aria-label="Founders quote">
        <div className="st-quote-glow" />

        <div className="st-quote-inner">
          {/* SRS §3.7.3 — large centered pullquote */}
          <div className="st-quote-mark" aria-hidden="true">"</div>

          {/* SRS §3.7.3 example quote */}
          <blockquote className="st-quote-text">
            We didn't just want to serve food —<br />
            we wanted to serve{' '}
            <span className="st-quote-accent">memories.</span>
          </blockquote>

          {/* SRS §3.7.3 — founder portraits */}
          <div className="st-founders-row">
            <div className="st-founder">
              <div className="st-founder-img-wrap">
                <Image
                  src="/images/story/founder1.jpg"
                  alt="Saqafat Founder"
                  fill
                  style={{ objectFit:'cover' }}
                  sizes="80px"
                />
              </div>
              <div>
                <p className="st-founder-name">Muhammad Asif</p>
                <p className="st-founder-role">Co-Founder & Head Baker</p>
              </div>
            </div>

            <div className="st-founder-divider" aria-hidden="true" />

            <div className="st-founder">
              <div className="st-founder-img-wrap">
                <Image
                  src="/images/story/founder2.jpg"
                  alt="Saqafat Co-Founder"
                  fill
                  style={{ objectFit:'cover' }}
                  sizes="80px"
                />
              </div>
              <div>
                <p className="st-founder-name">Hassan Raza</p>
                <p className="st-founder-role">Co-Founder & Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3.7.4 — VISION & MISSION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-vm-section" aria-labelledby="st-vm-heading">
        <div className="st-blob st-blob-tl" />

        <div className="st-section-head">
          <div className="st-eyebrow st-eyebrow-center">
            <span className="st-eyebrow-line" />
            <span className="st-eyebrow-text">What Drives Us</span>
            <span className="st-eyebrow-line" />
          </div>
          <h2 id="st-vm-heading" className="st-section-title">
            Vision &{' '}
            <span className="st-accent">Mission</span>
          </h2>
        </div>

        <div className="st-vm-grid">

          {/* Vision */}
          <div className="st-vm-card">
            <div className="st-vm-icon">🌟</div>
            <h3 className="st-vm-title">Our Vision</h3>
            <div className="st-vm-rule" />
            {/* SRS §3.7.4 example vision */}
            <p className="st-vm-text">
              To become Pakistan's most beloved food brand,
              <span className="st-vm-accent"> one meal at a time.</span>
            </p>
          </div>

          {/* Mission */}
          <div className="st-vm-card">
            <div className="st-vm-icon">❤️</div>
            <h3 className="st-vm-title">Our Mission</h3>
            <div className="st-vm-rule" />
            {/* SRS §3.7.4 example mission */}
            <p className="st-vm-text">
              To serve authentic Pakistani flavors with consistency, quality, and heart —
              making every customer feel like{' '}
              <span className="st-vm-accent">family.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TIMELINE — Origin to Today
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-timeline-section" aria-labelledby="st-tl-heading">

        <div className="st-section-head">
          <div className="st-eyebrow st-eyebrow-center st-eyebrow-gold">
            <span className="st-eyebrow-line st-eyebrow-line-gold" />
            <span className="st-eyebrow-text st-eyebrow-text-gold">Our Journey</span>
            <span className="st-eyebrow-line st-eyebrow-line-gold" />
          </div>
          <h2 id="st-tl-heading" className="st-section-title st-title-light">
            15 Years,{' '}
            <span className="st-accent-gold">One Story</span>
          </h2>
          <p className="st-section-sub st-sub-light">
            From a single oven to six branches — every milestone, every memory.
          </p>
        </div>

        <div className="st-timeline">
          {/* Centre vertical line */}
          <div className="st-tl-line" aria-hidden="true" />

          {timeline.map((item, i) => (
            <TimelineEntry key={item.year} item={item} index={i} />
          ))}
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §3.7.5 — BRANCH GALLERY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-gallery-section" aria-labelledby="st-gallery-heading">
        <div className="st-blob st-blob-tl" />
        <div className="st-blob st-blob-br" />

        <div className="st-section-head">
          <div className="st-eyebrow st-eyebrow-center">
            <span className="st-eyebrow-line" />
            <span className="st-eyebrow-text">Branch Gallery</span>
            <span className="st-eyebrow-line" />
          </div>
          {/* SRS §3.7.5 exact title */}
          <h2 id="st-gallery-heading" className="st-section-title">
            Our Saqafat Family{' '}
            <span className="st-accent">Across Pakistan</span>
          </h2>
          <p className="st-section-sub">
            Interiors, exteriors, staff, and customer moments — all six branches.
          </p>
        </div>

        {/* Masonry grid (SRS §3.7.5 — hover zoom) */}
        <div className="st-gallery-grid">
          {galleryImages.map((img, i) => (
            <GalleryCard key={img.src} img={img} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="st-final-cta" aria-label="Join the Saqafat story">
        <div className="st-cta-glow" />

        <div className="st-eyebrow st-eyebrow-gold st-eyebrow-center">
          <span className="st-eyebrow-line st-eyebrow-line-gold" />
          <span className="st-eyebrow-text st-eyebrow-text-gold">Be Part of It</span>
          <span className="st-eyebrow-line st-eyebrow-line-gold" />
        </div>

        <h2 className="st-cta-title">
          Your Story Starts with{' '}
          <span className="st-accent-gold">Saqafat</span>
        </h2>

        <p className="st-cta-sub">
          Order online, visit a branch, or become a partner — the Saqafat family is growing.
        </p>

        <div className="st-cta-btns">
          <Link href="/order" className="st-primary-btn">
            <span className="st-btn-inner">
              Order Now
              <span className="st-btn-arrow">→</span>
            </span>
            <span className="st-btn-shine" />
          </Link>

          <Link href="/partners" className="st-ghost-btn">
            Become a Partner
          </Link>
        </div>
      </section>

    </div>
  );
}

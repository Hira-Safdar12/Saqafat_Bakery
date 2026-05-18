'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Story.css';

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  side: 'left' | 'right';
}

const timeline: TimelineItem[] = [
  {
    year: '2009',
    title: 'The First Loaf',
    side: 'left',
    desc:
      'A small bakery opened its doors at Queen Chowk, Sargodha. With one oven, two bakers, and a dream — Saqafat was born.',
  },
  {
    year: '2012',
    title: 'First Expansion',
    side: 'right',
    desc:
      'Growing demand led to a second branch on University Road.',
  },
  {
    year: '2015',
    title: 'The Cake Revolution',
    side: 'left',
    desc:
      'Our custom cake line launched and instantly became the most sought-after in Sargodha.',
  },
  {
    year: '2018',
    title: 'Buffet & Catering',
    side: 'right',
    desc:
      'Saqafat entered the events space with its legendary buffet service.',
  },
  {
    year: '2021',
    title: 'Four Branches Strong',
    side: 'left',
    desc:
      'Satellite Town and Zafar Ullah Chowk branches opened.',
  },
  {
    year: '2023',
    title: 'Bhalwal & Beyond',
    side: 'right',
    desc:
      'The Shaheed Road, Bhalwal branch brought Saqafat to a new city.',
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`st-tl-item st-tl-${item.side}${
        visible ? ' st-tl-visible' : ''
      }`}
      style={{
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div className="st-tl-box">
        <span className="st-tl-year">{item.year}</span>

        <h3 className="st-tl-title">
          {item.title}
        </h3>

        <p className="st-tl-desc">
          {item.desc}
        </p>
      </div>

      <div className="st-tl-dot">
        <div className="st-tl-dot-inner" />
      </div>

      <div className="st-tl-spacer" />
    </div>
  );
}

export default function StoryPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="st-root">

      {/* HERO */}
      <section className="st-hero">

        <video
          ref={videoRef}
          className="st-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/Favourites/pasta.jpg"
        >
          <source
            src="/story/story.mp4"
            type="video/mp4"
          />
        </video>

        <div className="st-hero-overlay" />
        <div className="st-hero-vignette" />

        <div className="st-hero-content">

          <div className="st-eyebrow st-eyebrow-center">

            <span className="st-eyebrow-line" />

            <span className="st-eyebrow-text">
              Est. 2009
            </span>

            <span className="st-eyebrow-line" />

          </div>

          <h1 className="st-hero-h1">
            From a Dream to{' '}
            <span className="st-hero-accent">
              Your Dining Table
            </span>
          </h1>

          <p className="st-hero-sub">
            Fifteen years of bread, cakes, chai, and memories.
          </p>

        </div>
      </section>

      {/* STORY */}
      <section className="st-story-section">

        <div className="st-story-inner">

          <div className="st-story-img-col">

            <div className="st-story-img-wrap">

              <Image
                src="/story/D1.jpg"
                alt="Saqafat Bakery Cafe"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />

            </div>

          </div>

          <div className="st-story-text-col">

            <div className="st-eyebrow">
              <span className="st-eyebrow-line" />

              <span className="st-eyebrow-text">
                Our Story
              </span>
            </div>

            <h2 className="st-story-h2">
              More Than Food, {' '}
              <span className="st-accent">
                It’s Saqafat
              </span>
            </h2>

            <div className="st-story-body">

              <p className="st-story-para">
                Saqafat Bakery & Cafe began its journey in 2009 with a simple vision —
                to bring families together through unforgettable flavors, fresh baking,
                and warm hospitality.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* VISION MISSION */}
      <section className="st-vm-section">

        <div className="st-section-head">

          <div className="st-eyebrow st-eyebrow-center">

            <span className="st-eyebrow-line" />

            <span className="st-eyebrow-text">
              What Drives Us
            </span>

            <span className="st-eyebrow-line" />

          </div>

          <h2 className="st-section-title">
            Vision &{' '}
            <span className="st-accent">
              Mission
            </span>
          </h2>

        </div>

        <div className="st-vm-grid">

          <div className="st-vm-card">

            <div className="st-vm-icon">
              🌟
            </div>

            <h3 className="st-vm-title">
              Our Vision
            </h3>

            <p className="st-vm-text">
              To become Pakistan's most beloved food brand,
              one meal at a time.
            </p>

          </div>

          <div className="st-vm-card">

            <div className="st-vm-icon">
              ❤️
            </div>

            <h3 className="st-vm-title">
              Our Mission
            </h3>

            <p className="st-vm-text">
              To serve authentic Pakistani flavors with
              consistency, quality, and heart.
            </p>

          </div>

        </div>
      </section>

      {/* TIMELINE */}
      <section className="st-timeline-section">

        <div className="st-section-head">

          <div className="st-eyebrow st-eyebrow-center">

            <span className="st-eyebrow-line" />

            <span className="st-eyebrow-text">
              Our Journey
            </span>

            <span className="st-eyebrow-line" />

          </div>

          <h2 className="st-section-title">
            15 Years,
            <span className="st-accent">
              One Story
            </span>
          </h2>

        </div>

        <div className="st-timeline">

          <div className="st-tl-line" />

          {timeline.map((item, i) => (
            <TimelineEntry
              key={item.year}
              item={item}
              index={i}
            />
          ))}

        </div>
      </section>

      {/* PREMIUM CTA */}
     <section className="st-final-cta">

  <div className="st-cta-container">

    <div className="st-cta-card">

      {/* LEFT: text */}
      <div className="st-cta-text">

        <div className="st-eyebrow st-eyebrow-center">
          <span className="st-eyebrow-line" />
          <span className="st-eyebrow-text">Be Part of It</span>
          <span className="st-eyebrow-line" />
        </div>

        <h2 className="st-cta-title">
  Your Story Starts with <br />
  <span className="st-accent">Saqafat</span>
</h2>

        <p className="st-cta-sub">
          Order online, visit a branch, or become a partner.
        </p>

      </div>

      {/* RIGHT: buttons */}
      <div className="st-cta-btns">

        <Link href="/order" className="st-primary-btn">
          Order Now
        </Link>

        <Link href="/partners" className="st-ghost-btn">
          Become a Partner
        </Link>

      </div>

    </div>

  </div>

</section>


    </div>
  );
}
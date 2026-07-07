'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './blog.css';

// =============================================================================
// TYPES
// =============================================================================
type CategoryId = 'all' | 'recipes' | 'behind-scenes' | 'food-culture' | 'events';

interface BlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  author:      string;
  authorImg?:  string;
  date:        string;
  readTime:    number;   // minutes
  category:    CategoryId;
  image:       string;
  featured?:   boolean;
  content?:    ContentBlock[];
}

interface ContentBlock {
  type:    'text' | 'image' | 'video' | 'quote';
  value:   string;
  caption?: string;
}

// =============================================================================
// DATA — replace with CMS (Sanity/Contentful) data fetching before go-live
// =============================================================================
const categories: { id: CategoryId; label: string; emoji: string }[] = [
  { id: 'all',           label: 'All Posts',       emoji: '📰' },
  { id: 'recipes',       label: 'Recipes',          emoji: '👨‍🍳' },
  { id: 'behind-scenes', label: 'Behind the Scenes',emoji: '🎬' },
  { id: 'food-culture',  label: 'Food Culture',     emoji: '🇵🇰' },
  { id: 'events',        label: 'Events',           emoji: '🎉' },
];

const blogPosts: BlogPost[] = [
  {
    id:'p1', slug:'how-to-make-saqafat-doodh-patti', featured: true,
    title: 'How to Make the Perfect Doodh Patti Chai at Home',
    excerpt: 'Our head baker shares the secret to brewing a chai that tastes just like Saqafat\'s iconic doodh patti.',
    author: 'Chef Imran', date: 'April 15, 2026', readTime: 5,
    category: 'recipes',
    image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=1200&auto=format&fit=crop",
    content: [
      { type:'text', value:'The secret to great doodh patti starts with the right tea leaves...' },
      { 
        type:'image',
        value:'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=1200&auto=format&fit=crop',
        caption:'Brewing strong Pakistani-style chai'
      },
      { type:'text', value:'Simmer the milk low and slow — never boil it violently...' },
      { type:'quote', value:'Good chai is patience in a cup.' },
    ],
  },

  {
    id:'p2', slug:'story-of-saqafat-first-branch',
    title: 'The Story Behind Saqafat\'s First Branch',
    excerpt: 'Fifteen years ago, a small bakery opened its doors...',
    author: 'Saqafat Team', date: 'April 10, 2026', readTime: 7,
    category: 'behind-scenes',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', // bakery shop
  },
  {
    id:'p6', slug:'how-to-make-chocolate-cake',
    title: 'Recreate Saqafat\'s Famous Chocolate Cake at Home',
    excerpt: 'Our bestselling chocolate cake...',
    author: 'Chef Imran', date: 'March 12, 2026', readTime: 10,
    category: 'recipes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop', // chocolate cake
  },
{
    id:'p3', slug:'pakistani-street-food-culture',
    title: 'From the Streets to the Bakery: Pakistan\'s Food Culture',
    excerpt: 'Pakistani street food is a world of its own...',
    author: 'Aisha Siddiqui', date: 'March 5, 2026', readTime: 9,
    category: 'food-culture',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop', // samosa/pakora style street food
  },

  {
    id:'p4', slug:'saqafat-eid-event-2026',
    title: 'Saqafat Eid Special: Highlights from Our Biggest Event Yet',
    excerpt: 'This Eid we went all out...',
    author: 'Saqafat Team', date: 'March 30, 2026', readTime: 4,
    category: 'events',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80', // festive food
  },

  {
    id:'p5', slug:'meet-our-head-baker',
    title: 'Meet Chef Imran: The Man Behind Saqafat\'s Recipes',
    excerpt: 'For 12 years, Chef Imran has been the creative force...',
    author: 'Saqafat Team', date: 'March 20, 2026', readTime: 6,
    category: 'behind-scenes',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=1200&auto=format&fit=crop', // chef portrait
  },

  
  
];
// =============================================================================
// SCROLL REVEAL HOOK
// =============================================================================
function useScrollReveal(threshold = 0.12) {
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
// BLOG CARD
// =============================================================================
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { ref, visible } = useScrollReveal();
  const cat = categories.find((c) => c.id === post.category)!;

  return (
    <div
      ref={ref}
      className={`bl-card${visible ? ' bl-card-visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      {/* Featured image */}
      <Link href={`/blog/${post.slug}`} className="bl-card-img-wrap" tabIndex={-1}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 30vw"
        />
        {/* Category tag */}
        <span className="bl-card-cat-tag">
          {cat.emoji} {cat.label}
        </span>
        {post.featured && (
          <span className="bl-card-featured-tag">Featured</span>
        )}
      </Link>

      {/* Card body */}
      <div className="bl-card-body">
        <div className="bl-card-meta">
          <span className="bl-card-author"> {post.author}</span>
          <span className="bl-card-dot">·</span>
          <span className="bl-card-date">{post.date}</span>
          <span className="bl-card-dot">·</span>
          <span className="bl-card-read">{post.readTime} min read</span>
        </div>

        <h3 className="bl-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="bl-card-excerpt">{post.excerpt}</p>

        <Link href={`/blog/${post.slug}`} className="bl-read-more">
          Read More <span className="bl-read-more-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

// =============================================================================
// BLOG GRID PAGE
// =============================================================================
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [search,         setSearch        ] = useState('');

  const filtered = blogPosts.filter((p) => {
    const matchCat    = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find((p) => p.featured);

  return (
    <div className="bl-root">


      {/* ── FEATURED POST ── */}
      {featured && (
        <section className="bl-featured-section">
          <div className="bl-eyebrow bl-eyebrow-center">
            <span className="bl-eyebrow-line" />
            <span className="bl-eyebrow-text">Featured Post</span>
            <span className="bl-eyebrow-line" />
          </div>
          <Link href={`/blog/${featured.slug}`} className="bl-featured-card">
            <div className="bl-featured-img">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                style={{ objectFit:'cover' }}
                sizes="100vw"
                priority
              />
              <div className="bl-featured-overlay" />
            </div>
            <div className="bl-featured-content">
              <span className="bl-featured-cat">
                {categories.find((c) => c.id === featured.category)?.emoji}{' '}
                {categories.find((c) => c.id === featured.category)?.label}
              </span>
              <h2 className="bl-featured-title">{featured.title}</h2>
              <p className="bl-featured-excerpt">{featured.excerpt}</p>
              <div className="bl-featured-meta">
                <span> {featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
              <span className="bl-featured-cta">
                Read Article <span>→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ── BLOG GRID SECTION ── */}
      <section className="bl-grid-section">
        <div className="bl-blob bl-blob-tl" />
        <div className="bl-blob bl-blob-br" />

        <div className="bl-controls">
          {/* Search */}
          <div className="bl-search-wrap">
            <span className="bl-search-icon">🔍</span>
            <input
              className="bl-search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search blog posts"
            />
            {search && (
              <button className="bl-search-clear" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>

          {/* Category tabs — SRS §3.10.2 */}
          <div className="bl-cats" role="tablist" aria-label="Blog categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`bl-cat-tab${activeCategory === cat.id ? ' bl-cat-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="bl-result-count">
          {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && ` in ${categories.find(c=>c.id===activeCategory)?.label}`}
          {search && ` matching "${search}"`}
        </p>

        {/* Grid — SRS §3.10.1: 3 col desktop, 1 col mobile */}
        {filtered.length === 0 ? (
          <div className="bl-empty">
            <p>No posts found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="bl-grid">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="bl-newsletter">
        <div className="bl-newsletter-glow" />
        <div className="bl-eyebrow bl-eyebrow-gold bl-eyebrow-center">
          <span className="bl-eyebrow-line bl-eyebrow-line-gold" />
          <span className="bl-eyebrow-text bl-eyebrow-text-gold">Stay Updated</span>
          <span className="bl-eyebrow-line bl-eyebrow-line-gold" />
        </div>
        <h2 className="bl-newsletter-title">
          Never Miss a <span className="bl-accent-gold">Recipe</span>
        </h2>
        <p className="bl-newsletter-sub">
          Get our latest posts, recipes, and offers delivered to your inbox.
        </p>
        <form
          className="bl-newsletter-form"
          onSubmit={(e) => { e.preventDefault(); alert('Subscribed! 🎉'); }}
        >
          <input
            type="email"
            className="bl-newsletter-input"
            placeholder="your@email.com"
            required
            aria-label="Email address for newsletter"
          />
          <button type="submit" className="bl-newsletter-btn">
            <span style={{ position:'relative', zIndex:1 }}>Subscribe</span>
            <span className="bl-btn-shine" />
          </button>
        </form>
      </section>

    </div>
  );
}

// =============================================================================
// INDIVIDUAL BLOG POST — SRS §3.10.3
// Usage: import BlogPost from '@/components/blog/BlogPage'
//        Use in app/blog/[slug]/page.tsx
// =============================================================================
export function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return (
    <div className="bl-not-found">
      <h2>Post not found</h2>
      <Link href="/blog" className="bl-primary-btn">← Back to Blog</Link>
    </div>
  );

  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl  = `https://saqafatbakery.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  const shareLinks = [
    { label:'WhatsApp',   url:`https://wa.me/?text=${shareText}%20${shareUrl}`,                        color:'#25d366' },
    { label:'Facebook',  url:`https://facebook.com/sharer/sharer.php?u=${shareUrl}`,                  color:'#1877f2' },
    { label:'Twitter',    url:`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,    color:'#1da1f2' },
    { label:'Instagram',  url:`https://instagram.com`,                                                 color:'#e1306c' },
  ];

  return (
    <div className="bl-post-root">

      {/* Hero image — SRS §3.10.3 */}
      <div className="bl-post-hero">
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit:'cover' }}
          sizes="100vw"
          priority
        />
        <div className="bl-post-hero-overlay" />
        <div className="bl-post-hero-content">
          <span className="bl-post-cat">
            {categories.find((c) => c.id === post.category)?.emoji}{' '}
            {categories.find((c) => c.id === post.category)?.label}
          </span>
          <h1 className="bl-post-title">{post.title}</h1>
          {/* Metadata — SRS §3.10.3 */}
          <div className="bl-post-meta">
            <span> {post.author}</span>
            <span>·</span>
            <span> {post.date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="bl-post-body">

        {/* Content — SRS §3.10.3 rich text */}
        <article className="bl-post-article">
          {post.content ? (
            post.content.map((block, i) => {
              if (block.type === 'text')  return <p key={i} className="bl-post-text">{block.value}</p>;
              if (block.type === 'quote') return (
                <blockquote key={i} className="bl-post-quote">
                  <p>{block.value}</p>
                </blockquote>
              );
              if (block.type === 'image') return (
                <figure key={i} className="bl-post-figure">
                  <div className="bl-post-fig-img">
                    <Image src={block.value} alt={block.caption || ''} fill style={{ objectFit:'cover' }} sizes="700px" />
                  </div>
                  {block.caption && <figcaption className="bl-post-caption">{block.caption}</figcaption>}
                </figure>
              );
              if (block.type === 'video') return (
                <div key={i} className="bl-post-video-wrap">
                  <video src={block.value} controls playsInline preload="metadata" className="bl-post-video" />
                  {block.caption && <p className="bl-post-caption">{block.caption}</p>}
                </div>
              );
              return null;
            })
          ) : (
            <p className="bl-post-text">{post.excerpt}</p>
          )}
        </article>

        {/* Share buttons — SRS §3.10.3 */}
        <div className="bl-share">
          <p className="bl-share-label">Share this post</p>
          <div className="bl-share-btns">
            {shareLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bl-share-btn"
                style={{ '--share-color': s.color } as React.CSSProperties}
                aria-label={`Share on ${s.label}`}
              >
                
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Related posts — SRS §3.10.3 */}
        {related.length > 0 && (
          <section className="bl-related">
            <div className="bl-eyebrow bl-eyebrow-center" style={{ marginBottom:'24px' }}>
              <span className="bl-eyebrow-line" />
              <span className="bl-eyebrow-text">Related Posts</span>
              <span className="bl-eyebrow-line" />
            </div>
            <div className="bl-related-grid">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="bl-related-card">
                  <div className="bl-related-img">
                    <Image src={r.image} alt={r.title} fill style={{ objectFit:'cover' }} sizes="300px" />
                  </div>
                  <div className="bl-related-body">
                    <span className="bl-related-cat">
                      {categories.find((c) => c.id === r.category)?.label}
                    </span>
                    <h4 className="bl-related-title">{r.title}</h4>
                    <p className="bl-related-date">{r.date} · {r.readTime} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments — Phase 2 placeholder (SRS §3.10.3) */}
        <div className="bl-comments-placeholder">
          <p> Comments coming in Phase 2</p>
        </div>

        <Link href="/blog" className="bl-back-link">← Back to Blog</Link>
      </div>
    </div>
  );
}
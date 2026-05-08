'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import './menu.css';

// =============================================================================
// TYPES
// =============================================================================
interface MenuItem {
  id:        string;
  name:      string;
  price:     number;
  img:       string;
  images?:   string[];   // for modal slideshow
  category:  string;
  badge?:    'Bestseller' | 'Most Loved' | 'NEW';
  desc?:     string;
  ingredients?: string;
  cookingStyle?: string;
  portion?:  string;
  addons?:   Addon[];
  spiceLevel?: 1 | 2 | 3;
}

interface Addon {
  id:    string;
  label: string;
  price: number;
}

interface Category {
  id:    string;
  label: string;
  emoji: string;
}

// =============================================================================
// DATA
// =============================================================================
const categories: Category[] = [
  { id:'all',      label:'All Items',  emoji:'🍽️' },
  { id:'bread',    label:'Breads',     emoji:'🍞'  },
  { id:'cakes',    label:'Cakes',      emoji:'🎂'  },
  { id:'pastry',   label:'Pastries',   emoji:'🥐'  },
  { id:'cookies',  label:'Cookies',    emoji:'🍪'  },
  { id:'drinks',   label:'Drinks',     emoji:'☕'  },
  { id:'savory',   label:'Savory',     emoji:'🥪'  },
];

const menuItems: MenuItem[] = [
  // ── Breads ──
  {
    id:'b1', name:'Plain Bread Loaf', price:180, category:'bread', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80',
    images:[
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80'
    ],
    desc:'Soft, fluffy, freshly baked every morning using our 15-year-old recipe.',
    ingredients:'Flour, yeast, milk, butter, salt, sugar',
    cookingStyle:'Stone-baked at 200°C for 30 minutes',
    portion:'1 full loaf (serves 4–6)',
  },
  {
    id:'b2', name:'Milk Bread', price:220, category:'bread',
    img:'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80',
    desc:'Rich milk loaf with a pillowy soft crumb. Perfect for toast and sandwiches.',
    ingredients:'Flour, full-cream milk, butter, eggs, yeast',
    portion:'1 full loaf (serves 4–6)',
  },
  {
    id:'b3', name:'Brown Bread', price:250, category:'bread',
    img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    desc:'Wholesome brown bread with a nutty flavour. Great for healthy breakfasts.',
    ingredients:'Whole wheat flour, oats, honey, yeast, seeds',
    portion:'1 full loaf (serves 4–6)',
  },
  {
    id:'b4', name:'Bun', price:60, category:'bread',
    img:'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80',
    desc:'Soft, golden dinner buns baked fresh daily.',
    portion:'Pack of 4',
  },

  // ── Cakes ──
  {
    id:'c1', name:'Chocolate Cake', price:1200, category:'cakes', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    images:[
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
    ],
    desc:'Rich dark chocolate sponge layered with velvety ganache cream. Our most-ordered cake for 10 years running.',
    ingredients:'Dark chocolate, flour, eggs, cream, cocoa powder, butter',
    cookingStyle:'Layered and chilled, finished with Belgian chocolate ganache',
    portion:'Serves 8–10 people',
    addons:[
      { id:'msg', label:'Personalised message', price:50 },
      { id:'candle', label:'Birthday candles', price:30 },
      { id:'extra', label:'Extra chocolate layer', price:150 },
    ],
  },
  {
    id:'c2', name:'Lotus Cake', price:950, category:'cakes', badge:'NEW',
    img:'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    desc:'Biscoff-inspired caramel sponge with Lotus cream and crumble topping. A modern classic.',
    ingredients:'Lotus biscuits, caramel cream, sponge base, butter',
    portion:'Serves 6–8 people',
  },
  {
    id:'c3', name:'Strawberry Cheesecake', price:1100, category:'cakes', badge:'NEW',
    img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    desc:'Creamy no-bake cheesecake on a buttery biscuit base, topped with fresh strawberry compote.',
    ingredients:'Cream cheese, fresh strawberries, digestive biscuits, cream',
    portion:'Serves 6–8 people',
  },
  {
    id:'c4', name:'Tea Cake', price:450, category:'cakes',
    img:'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&q=80',
    desc:'Light, delicate sponge with a hint of vanilla. The perfect companion to a cup of chai.',
    portion:'Serves 4–6 people',
  },
  {
    id:'c5', name:'Cupcakes (Box of 6)', price:700, category:'cakes', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80',
    desc:'Assorted flavoured cupcakes beautifully frosted. Each box is a little celebration.',
    portion:'Box of 6 assorted cupcakes',
    addons:[
      { id:'custom-flavour', label:'Custom flavour request', price:0 },
    ],
  },

  // ── Pastries ──
  {
    id:'p1', name:'Croissant', price:250, category:'pastry', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    images:[
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      'https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=800&q=80'
    ],
    desc:'Buttery, flaky layers baked fresh every morning. The perfect breakfast treat.',
    ingredients:'French butter, flour, yeast, milk, eggs',
    cookingStyle:'Laminated dough, 27 layers, baked at 190°C',
    portion:'1 piece',
  },
  {
    id:'p2', name:'Nutella Croissant', price:380, category:'pastry', badge:'NEW',
    img:'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80',
    desc:'Our classic croissant filled generously with smooth Nutella. Dangerously addictive.',
    portion:'1 piece',
  },
  {
    id:'p3', name:'Pistachio Pastry', price:420, category:'pastry', badge:'NEW',
    img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    desc:'Flaky pastry filled with a rich pistachio cream and topped with crushed pistachios.',
    ingredients:'Pistachios, cream, puff pastry, rose water',
    portion:'1 piece',
  },
  {
    id:'p4', name:'Chocolate Lava', price:550, category:'pastry', badge:'NEW',
    img:'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',
    desc:'Warm individual chocolate cake with a molten centre that flows when you cut in.',
    cookingStyle:'Served warm — best enjoyed immediately',
    portion:'1 piece (serves 1)',
  },
  {
    id:'p5', name:'Mini Tart Box', price:700, category:'pastry', badge:'NEW',
    img:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    desc:'Assorted mini fruit tarts with crispy pastry shells and fresh seasonal fruit.',
    portion:'Box of 6 mini tarts',
  },
  {
    id:'p6', name:'Puff', price:280, category:'pastry',
    img:'https://images.unsplash.com/photo-1589308078056-f0a9e9e2c8a3?w=800&q=80',
    desc:'Golden, crispy puff pastry with a savoury spiced filling.',
    spiceLevel:2,
    portion:'2 pieces',
  },
  {
    id:'p7', name:'Brownie', price:400, category:'pastry',
    img:'https://images.unsplash.com/photo-1606312619344-64a3c6b6b0c7?w=800&q=80',
    desc:'Dense, fudgy chocolate brownie with a crackly top and gooey centre.',
    portion:'2 pieces',
  },

  // ── Cookies ──
  {
    id:'k1', name:'Cookies (6 pcs)', price:200, category:'cookies',
    img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    desc:'Assorted freshly baked cookies — chocolate chip, oatmeal raisin, and butter.',
    portion:'Pack of 6',
  },
  {
    id:'k2', name:'Macarons (6 pcs)', price:600, category:'cookies',
    img:'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800&q=80',
    desc:'French-style macarons in assorted flavours.',
    portion:'Box of 6',
  },
  {
    id:'k3', name:'Donuts (Box of 4)', price:350, category:'cookies', badge:'Most Loved',
    img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    desc:'Glazed and filled donuts in rotating daily flavours.',
    portion:'Box of 4',
  },

  // ── Drinks ──
  {
    id:'d1', name:'Doodh Patti Chai', price:80, category:'drinks', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
    desc:'Traditional Pakistani milk tea brewed the Saqafat way.',
    cookingStyle:'Simmered low and slow for maximum flavour',
    portion:'1 large cup (350ml)',
  },
  {
    id:'d2', name:'Cold Coffee', price:180, category:'drinks',
    img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    desc:'Chilled blended coffee with cream and a hint of caramel.',
    portion:'1 large cup (400ml)',
  },
  {
    id:'d3', name:'Fresh Juice', price:150, category:'drinks',
    img:'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80',
    desc:'Seasonal fresh-squeezed juice.',
    portion:'1 glass (300ml)',
  },

  // ── Savory ──
  {
    id:'s1', name:'Chicken Sandwich', price:500, category:'savory', badge:'Bestseller',
    img:'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=800&q=80',
    desc:'Grilled chicken with fresh vegetables and signature sauce.',
    spiceLevel:1,
    portion:'1 sandwich',
  },
  {
    id:'s2', name:'Bread Rolls', price:320, category:'savory',
    img:'https://images.unsplash.com/photo-1604908177522-0403b7f3b7c1?w=800&q=80',
    desc:'Soft rolls filled with spiced chicken or vegetable filling.',
    spiceLevel:2,
    portion:'4 pieces',
  },
  {
    id:'s3', name:'Samosa (4 pcs)', price:200, category:'savory',
    img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    desc:'Crispy golden samosas filled with spiced potatoes and peas.',
    spiceLevel:2,
    portion:'4 pieces',
  },
];
// =============================================================================
// HELPERS
// =============================================================================
function formatPKR(n: number) {
  return `PKR ${n.toLocaleString('en-PK')}`;
}

function SpiceIndicator({ level }: { level?: 1|2|3 }) {
  if (!level) return null;
  return (
    <div className="mn-spice" title={`Spice level: ${level}/3`} aria-label={`Spice level ${level} of 3`}>
      {[1,2,3].map((s) => (
        <span key={s} className={`mn-spice-dot${s <= level ? ' mn-spice-dot-on' : ''}`}>🌶️</span>
      ))}
    </div>
  );
}

// =============================================================================
// ITEM MODAL — SRS §3.5.3
// =============================================================================
function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const router        = useRouter();
  const [qty,         setQty        ] = useState(1);
  const [imgIndex,    setImgIndex   ] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const images = item.images || [item.img];
  const branch = typeof window !== 'undefined'
    ? localStorage.getItem('saqafat_branch') || 'your nearest branch'
    : 'your nearest branch';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addonTotal = (item.addons || [])
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((s, a) => s + a.price, 0);

  const total = (item.price + addonTotal) * qty;

  const addonLabels = (item.addons || [])
    .filter((a) => selectedAddons.includes(a.id))
    .map((a) => a.label)
    .join(', ');

  // SRS §3.5.3 — pre-filled WhatsApp message
  const handleWhatsApp = () => {
    const addonsText = addonLabels ? ` (${addonLabels})` : '';
    const msg = encodeURIComponent(
      `Hi! I'd like to order ${item.name}${addonsText} (Qty: ${qty}) from ${branch}\nTotal: ${formatPKR(total)}`
    );
    window.open(`https://wa.me/923XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <div
      className="mn-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mn-modal-title"
    >
      <div className="mn-modal">

        {/* Close button */}
        <button className="mn-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Image slideshow — SRS §3.5.3 */}
        <div className="mn-modal-imgs">
          <div className="mn-modal-img-main">
            <Image
              src={images[imgIndex]}
              alt={item.name}
              fill
              style={{ objectFit:'cover' }}
              sizes="(max-width:768px) 100vw, 50vw"
            />
            {item.badge && (
              <span className={`mn-badge mn-badge-${item.badge === 'NEW' ? 'new' : item.badge === 'Bestseller' ? 'best' : 'loved'}`}>
                {item.badge}
              </span>
            )}
          </div>
          {/* Thumbnail row */}
          {images.length > 1 && (
            <div className="mn-modal-thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`mn-thumb${imgIndex === i ? ' mn-thumb-active' : ''}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={src} alt="" fill style={{ objectFit:'cover' }} sizes="60px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content — SRS §3.5.3 */}
        <div className="mn-modal-content">

          <h2 id="mn-modal-title" className="mn-modal-title">{item.name}</h2>

          <div className="mn-modal-price-row">
            <span className="mn-modal-price">{formatPKR(item.price)}</span>
            {item.portion && <span className="mn-modal-portion">📦 {item.portion}</span>}
            <SpiceIndicator level={item.spiceLevel} />
          </div>

          {item.desc && <p className="mn-modal-desc">{item.desc}</p>}

          {/* Details */}
          <div className="mn-modal-details">
            {item.ingredients && (
              <div className="mn-detail-row">
                <span className="mn-detail-label">Ingredients</span>
                <span className="mn-detail-val">{item.ingredients}</span>
              </div>
            )}
            {item.cookingStyle && (
              <div className="mn-detail-row">
                <span className="mn-detail-label">How it's made</span>
                <span className="mn-detail-val">{item.cookingStyle}</span>
              </div>
            )}
          </div>

          {/* Add-ons */}
          {item.addons && item.addons.length > 0 && (
            <div className="mn-addons">
              <p className="mn-addons-label">Customise your order</p>
              {item.addons.map((addon) => (
                <label key={addon.id} className="mn-addon-row">
                  <input
                    type="checkbox"
                    className="mn-addon-check"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                  />
                  <span className="mn-addon-name">{addon.label}</span>
                  {addon.price > 0 && (
                    <span className="mn-addon-price">+{formatPKR(addon.price)}</span>
                  )}
                </label>
              ))}
            </div>
          )}

          {/* Qty selector — SRS §3.5.3 */}
          <div className="mn-qty-row">
            <span className="mn-qty-label">Quantity</span>
            <div className="mn-qty-ctrl">
              <button
                className="mn-qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >−</button>
              <span className="mn-qty-num" aria-live="polite">{qty}</span>
              <button
                className="mn-qty-btn"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >+</button>
            </div>
            <span className="mn-qty-total">{formatPKR(total)}</span>
          </div>

          {/* WhatsApp CTA — SRS §3.5.3 */}
          <button className="mn-wa-btn" onClick={handleWhatsApp}>
            <span className="mn-btn-inner" style={{ position:'relative', zIndex:1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </span>
            <span className="mn-btn-shine" aria-hidden="true" />
          </button>

        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MENU ITEM CARD
// =============================================================================
function MenuCard({ item, onOpen }: { item: MenuItem; onOpen: (item: MenuItem) => void }) {
  return (
    <div
      className="mn-card"
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} — ${formatPKR(item.price)}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(item); }}}
    >
      {/* Image */}
      <div className="mn-card-img">
        <Image
          src={item.img}
          alt={item.name}
          fill
          style={{ objectFit:'cover' }}
          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
        />
        {item.badge && (
          <span className={`mn-badge mn-badge-${item.badge === 'NEW' ? 'new' : item.badge === 'Bestseller' ? 'best' : 'loved'}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="mn-card-body">
        <h3 className="mn-card-name">{item.name}</h3>
        {item.desc && <p className="mn-card-desc">{item.desc}</p>}
        <div className="mn-card-footer">
          <span className="mn-card-price">{formatPKR(item.price)}</span>
          <SpiceIndicator level={item.spiceLevel} />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE — SRS §3.5
// =============================================================================
export default function MenuPage() {
  const searchParams      = useSearchParams();
  const [activeCategory,  setActiveCategory ] = useState('all');
  const [search,          setSearch         ] = useState('');
  const [sortBy,          setSortBy         ] = useState<'default'|'price-asc'|'price-desc'|'az'>('default');
  const [filters,         setFilters        ] = useState<string[]>([]);
  const [activeItem,      setActiveItem     ] = useState<MenuItem | null>(null);
  const sidebarRef                            = useRef<HTMLDivElement>(null);

  // Read ?item= from URL (from TopSellers / NewArrivals click) — SRS §3.4.2
  useEffect(() => {
    const itemName = searchParams.get('item');
    if (itemName) {
      const found = menuItems.find(
        (m) => m.name.toLowerCase() === itemName.toLowerCase()
      );
      if (found) {
        setActiveCategory(found.category);
        setActiveItem(found);
      }
    }
  }, [searchParams]);

  // Filter + sort
  const filtered = menuItems
    .filter((item) => {
      const matchCat    = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          (item.desc || '').toLowerCase().includes(search.toLowerCase());
      const matchFilters = filters.every((f) => {
        if (f === 'bestseller') return item.badge === 'Bestseller';
        if (f === 'new')        return item.badge === 'NEW';
        if (f === 'most-loved') return item.badge === 'Most Loved';
        if (f === 'spicy')      return (item.spiceLevel || 0) >= 1;
        return true;
      });
      return matchCat && matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'az')         return a.name.localeCompare(b.name);
      return 0;
    });

  const toggleFilter = (f: string) =>
    setFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  return (
    <div className="mn-root">

      {/* ── HERO VIDEO — SRS §3.5.1 ── */}
      <section className="mn-hero" aria-label="Menu hero">
        <video
          className="mn-hero-video"
          autoPlay muted loop playsInline
          poster="/images/menu/hero-poster.jpg"
        >
          <source src="/tea.mp4" type="video/mp4" />
        </video>
        <div className="mn-hero-overlay" />
        <div className="mn-hero-vignette" />
        <div className="mn-hero-content">
          <div className="mn-eyebrow mn-eyebrow-gold">
            <span className="mn-eyebrow-line mn-eyebrow-line-gold" />
            <span className="mn-eyebrow-text mn-eyebrow-text-gold">Our Full Menu</span>
            <span className="mn-eyebrow-line mn-eyebrow-line-gold" />
          </div>
          <h1 className="mn-hero-h1">
            Baked with <span className="mn-hero-accent">Love</span>
          </h1>
          <p className="mn-hero-sub">
            Fresh bread, indulgent cakes, flaky pastries, and more — all made daily.
          </p>
        </div>
      </section>

      {/* ── MENU BODY ── */}
      <div className="mn-body">

        {/* ══ SIDEBAR — sticky category nav (desktop) — SRS §3.5.2 ══ */}
        <aside ref={sidebarRef} className="mn-sidebar" aria-label="Menu categories">

          <p className="mn-sidebar-label">Categories</p>

          <nav>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`mn-sidebar-cat${activeCategory === cat.id ? ' mn-sidebar-cat-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-current={activeCategory === cat.id ? 'true' : undefined}
              >
                <span className="mn-sidebar-cat-emoji">{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className="mn-sidebar-cat-count">
                  {menuItems.filter((m) => cat.id === 'all' || m.category === cat.id).length}
                </span>
              </button>
            ))}
          </nav>

          {/* Filter tags */}
          <div className="mn-sidebar-filters">
            <p className="mn-sidebar-label">Filter by</p>
            {[
              { id:'bestseller', label:'⭐ Bestseller' },
              { id:'new',        label:'✨ New'        },
              { id:'most-loved', label:'❤️ Most Loved' },
              { id:'spicy',      label:'🌶️ Spicy'      },
            ].map((f) => (
              <button
                key={f.id}
                className={`mn-filter-tag${filters.includes(f.id) ? ' mn-filter-tag-active' : ''}`}
                onClick={() => toggleFilter(f.id)}
                aria-pressed={filters.includes(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="mn-main" id="main-content">

          {/* Mobile: horizontal category tabs — SRS §3.5.2 */}
          <div className="mn-mobile-cats" role="tablist" aria-label="Menu categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`mn-mobile-cat${activeCategory === cat.id ? ' mn-mobile-cat-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Search + sort bar — SRS §3.5.3 */}
          <div className="mn-controls">
            <div className="mn-search-wrap">
              <span className="mn-search-icon">🔍</span>
              <input
                className="mn-search"
                placeholder="Search by item name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search menu items"
              />
              {search && (
                <button className="mn-search-clear" onClick={() => setSearch('')} aria-label="Clear">✕</button>
              )}
            </div>

            <select
              className="mn-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort items"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          {/* Result count + active filters */}
          <div className="mn-result-bar">
            <span className="mn-result-count">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            </span>
            {filters.length > 0 && (
              <button className="mn-clear-filters" onClick={() => setFilters([])}>
                Clear filters ✕
              </button>
            )}
          </div>

          {/* Grid — SRS §3.5.3 */}
          {filtered.length === 0 ? (
            <div className="mn-empty">
              <p>No items found.</p>
              <button onClick={() => { setSearch(''); setFilters([]); setActiveCategory('all'); }}>
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="mn-grid" role="list">
              {filtered.map((item) => (
                <div key={item.id} role="listitem">
                  <MenuCard item={item} onOpen={setActiveItem} />
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Item detail modal — SRS §3.5.3 */}
      {activeItem && (
        <ItemModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}

    </div>
  );
}

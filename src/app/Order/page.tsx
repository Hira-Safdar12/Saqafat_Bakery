'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import './order.css';

// =============================================================================
// TYPES
// =============================================================================
interface MenuItem {
  id:       string;
  name:     string;
  price:    number;
  img:      string;
  category: string;
  badge?:   'Bestseller' | 'Most Loved' | 'NEW';
  desc?:    string;
}

interface CartItem extends MenuItem {
  qty: number;
}

interface Category {
  id:    string;
  label: string;
  emoji: string;
}

interface UserDetails {
  name:    string;
  phone:   string;
  address: string;
}

// =============================================================================
// DATA
// =============================================================================
const categories: Category[] = [
  { id: 'all',     label: 'All Items', emoji: '🍽️' },
  { id: 'bread',   label: 'Breads',    emoji: '🍞'  },
  { id: 'cakes',   label: 'Cakes',     emoji: '🎂'  },
  { id: 'pastry',  label: 'Pastries',  emoji: '🥐'  },
  { id: 'cookies', label: 'Cookies',   emoji: '🍪'  },
  { id: 'drinks',  label: 'Drinks',    emoji: '☕'  },
  { id: 'savory',  label: 'Savory',    emoji: '🥪'  },
];

const menuItems: MenuItem[] = [
  // Breads
  { id:'b1', name:'Plain Bread Loaf', price:180, img:'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80', category:'bread', badge:'Bestseller', desc:'Soft, fluffy, freshly baked daily' },
  { id:'b2', name:'Milk Bread', price:220, img:'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80', category:'bread', desc:'Rich milk loaf, perfect for toast' },
  { id:'b3', name:'Brown Bread', price:250, img:'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80', category:'bread', desc:'Wholesome brown bread' },
  { id:'b4', name:'Bun', price:60, img:'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80', category:'bread', desc:'Soft dinner buns' },

  // Cakes
  { id:'c1', name:'Chocolate Cake', price:1200, img:'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', category:'cakes', badge:'Bestseller', desc:'Rich dark chocolate, layered cream' },
  { id:'c2', name:'Lotus Cake', price:950, img:'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80', category:'cakes', badge:'NEW', desc:'Biscoff-inspired, caramelised perfection' },
  { id:'c3', name:'Strawberry Cheesecake', price:1100, img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', category:'cakes', badge:'NEW', desc:'Creamy cheesecake with fresh strawberry' },
  { id:'c4', name:'Tea Cake', price:450, img:'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&q=80', category:'cakes', desc:'Light sponge, perfect with chai' },
  { id:'c5', name:'Cupcakes (Box of 6)', price:700, img:'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', category:'cakes', badge:'Most Loved', desc:'Assorted flavours, beautifully frosted' },

  // Pastries
  { id:'p1', name:'Croissant', price:250, img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80', category:'pastry', badge:'Most Loved', desc:'Buttery, flaky, baked fresh every morning' },
  { id:'p2', name:'Nutella Croissant', price:380, img:'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80', category:'pastry', badge:'NEW', desc:'Classic croissant filled with Nutella' },
  { id:'p3', name:'Pistachio Pastry', price:420, img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', category:'pastry', badge:'NEW', desc:'Flaky pastry with pistachio cream' },
  { id:'p4', name:'Chocolate Lava', price:550, img:'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80', category:'pastry', badge:'NEW', desc:'Warm molten chocolate centre' },
  { id:'p5', name:'Mini Tart Box', price:700, img:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', category:'pastry', badge:'NEW', desc:'Assorted mini fruit tarts, box of 6' },
  { id:'p6', name:'Puff', price:280, img:'https://images.unsplash.com/photo-1589308078056-f0a9e9e2c8a3?w=800&q=80', category:'pastry', desc:'Golden, crispy puff pastry' },
  { id:'p7', name:'Brownie', price:400, img:'https://images.unsplash.com/photo-1606312619344-64a3c6b6b0c7?w=800&q=80', category:'pastry', desc:'Dense, fudgy chocolate brownie' },

  // Cookies
  { id:'k1', name:'Cookies (6 pcs)', price:200, img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', category:'cookies', desc:'Assorted freshly baked cookies' },
  { id:'k2', name:'Macarons (6 pcs)', price:600, img:'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800&q=80', category:'cookies', desc:'French macarons, assorted flavours' },
  { id:'k3', name:'Donuts (Box of 4)', price:350, img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80', category:'cookies', badge:'Most Loved', desc:'Glazed and filled donuts' },

  // Drinks
  { id:'d1', name:'Doodh Patti Chai', price:80, img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80', category:'drinks', badge:'Bestseller', desc:'Traditional Pakistani milk tea' },
  { id:'d2', name:'Cold Coffee', price:180, img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', category:'drinks', desc:'Chilled coffee with cream' },
  { id:'d3', name:'Fresh Juice', price:150, img:'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80', category:'drinks', desc:'Seasonal fresh-squeezed juice' },

  // Savory
  { id:'s1', name:'Chicken Sandwich', price:500, img:'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=800&q=80', category:'savory', badge:'Bestseller', desc:'Grilled chicken with fresh veggies' },
  { id:'s2', name:'Bread Rolls', price:320, img:'https://images.unsplash.com/photo-1604908177522-0403b7f3b7c1?w=800&q=80', category:'savory', desc:'Soft rolls with spiced filling' },
  { id:'s3', name:'Samosa (4 pcs)', price:200, img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', category:'savory', desc:'Crispy golden samosas' },
];
// =============================================================================
// HELPERS
// =============================================================================
function formatPKR(n: number) {
  return `PKR ${n.toLocaleString('en-PK')}`;
}

function buildWhatsAppMessage(
  branch:   string,
  location: string,
  cart:     CartItem[],
  user:     UserDetails,
  total:    number,
  promo:    string,
) {
  const lines = cart.map(
    (i) => `- ${i.name} x${i.qty} — PKR ${(i.price * i.qty).toLocaleString('en-PK')}`
  );
  return encodeURIComponent(
`Hi Saqafat Team! 🍞

I'd like to place an order:

Branch: ${branch}
Delivery to: ${location || 'N/A'}

Order Details:
${lines.join('\n')}

${promo ? `Promo Code: ${promo}\n` : ''}Total: PKR ${total.toLocaleString('en-PK')}

Name: ${user.name}
Phone: ${user.phone}
Address: ${user.address}

Please confirm! 🙏`
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export default function Order() {
  // Branch / location from localStorage (set by SelectionFunnel)
  const [branch,   setBranch  ] = useState('');
  const [location, setLocation] = useState('');

  // Cart state
  const [cart,     setCart    ] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);

  // Review step
  const [step,     setStep    ] = useState<'browse' | 'review'>('browse');
  const [user,     setUser    ] = useState<UserDetails>({ name:'', phone:'', address:'' });

  // Promo code from URL query param (?promo=CODE from Offers page)
  const [promo,    setPromo   ] = useState('');

  // Search
  const [search,   setSearch  ] = useState('');

  useEffect(() => {
    setBranch(localStorage.getItem('saqafat_branch')   || '');
    setLocation(localStorage.getItem('saqafat_location') || '');
    // Read promo from URL
    const params = new URLSearchParams(window.location.search);
    setPromo(params.get('promo') || '');
  }, []);

  // ── Cart helpers ──
  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const cartCount    = cart.reduce((s, c) => s + c.qty, 0);
  const subtotal     = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const deliveryFee  = subtotal > 0 ? 150 : 0;
  const total        = subtotal + deliveryFee;

  // ── Filtered items ──
  const filtered = menuItems.filter((item) => {
    const matchCat    = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── WhatsApp redirect ──
  const handleWhatsApp = () => {
    if (!user.name || !user.phone || !user.address) return;
    const msg = buildWhatsAppMessage(branch, location, cart, user, total, promo);
    window.open(`https://wa.me/923XXXXXXXXX?text=${msg}`, '_blank');
  };

  const reopenFunnel = () => window.dispatchEvent(new CustomEvent('saqafat:open-funnel'));

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div className="op-root">

      {/* ── BRANCH BANNER — SRS §3.9.1 Step 1 ── */}
      <div className="op-banner">
        <div className="op-banner-inner">
          <div className="op-banner-left">
            <span className="op-banner-icon">📍</span>
            <div>
              <span className="op-banner-label">Ordering from</span>
              <span className="op-banner-branch">
                {branch || 'No branch selected'}
              </span>
            </div>
          </div>
          <button className="op-banner-change" onClick={reopenFunnel}>
            Change Branch
          </button>
        </div>
        {promo && (
          <div className="op-promo-bar">
            🎉 Promo code <strong>{promo}</strong> applied — mention it in your order!
          </div>
        )}
      </div>

      <div className="op-layout">

        {/* ════════════════════════════════════════════════════════════════
            LEFT — MENU BROWSER  (SRS §3.9.1 Step 2)
        ════════════════════════════════════════════════════════════════ */}
        <div className="op-menu-col">

          {step === 'browse' && (
            <>
              {/* Search bar */}
              <div className="op-search-wrap">
                <span className="op-search-icon">🔍</span>
                <input
                  className="op-search"
                  placeholder="Search menu items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search menu"
                />
                {search && (
                  <button className="op-search-clear" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
                )}
              </div>

              {/* Category tabs */}
              <div className="op-cats" role="tablist" aria-label="Menu categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    className={`op-cat-tab${activeCategory === cat.id ? ' op-cat-active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Section title */}
              <div className="op-section-head">
                <div className="op-eyebrow">
                  <span className="op-eyebrow-line" />
                  <span className="op-eyebrow-text">
                    {activeCategory === 'all'
                      ? 'All Items'
                      : categories.find((c) => c.id === activeCategory)?.label}
                  </span>
                  <span className="op-eyebrow-line" />
                </div>
                <p className="op-result-count">
                  {filtered.length} item{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Items grid */}
              {filtered.length === 0 ? (
                <div className="op-empty">
                  <p>No items found for "<strong>{search}</strong>"</p>
                </div>
              ) : (
                <div className="op-grid" role="list">
                  {filtered.map((item) => {
                    const inCart = cart.find((c) => c.id === item.id);
                    return (
                      <div key={item.id} className="op-item-card" role="listitem">
                        {/* Image */}
                        <div className="op-item-img-wrap">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            style={{ objectFit:'cover' }}
                            sizes="(max-width:768px) 45vw, 220px"
                          />
                          {item.badge && (
                            <span className={`op-badge op-badge-${item.badge === 'NEW' ? 'new' : item.badge === 'Bestseller' ? 'best' : 'loved'}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="op-item-body">
                          <h4 className="op-item-name">{item.name}</h4>
                          {item.desc && <p className="op-item-desc">{item.desc}</p>}
                          <div className="op-item-footer">
                            <span className="op-item-price">{formatPKR(item.price)}</span>

                            {/* Add / qty controls */}
                            {inCart ? (
                              <div className="op-qty-ctrl">
                                <button
                                  className="op-qty-btn"
                                  onClick={() => updateQty(item.id, -1)}
                                  aria-label={`Remove one ${item.name}`}
                                >−</button>
                                <span className="op-qty-num">{inCart.qty}</span>
                                <button
                                  className="op-qty-btn"
                                  onClick={() => updateQty(item.id, 1)}
                                  aria-label={`Add another ${item.name}`}
                                >+</button>
                              </div>
                            ) : (
                              <button
                                className="op-add-btn"
                                onClick={() => addToCart(item)}
                                aria-label={`Add ${item.name} to order`}
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ── REVIEW STEP — SRS §3.9.1 Step 4 ── */}
          {step === 'review' && (
            <div className="op-review">
              <button className="op-back-btn" onClick={() => setStep('browse')}>
                ← Back to Menu
              </button>

              <div className="op-eyebrow" style={{ justifyContent:'flex-start', marginBottom:'16px' }}>
                <span className="op-eyebrow-line" />
                <span className="op-eyebrow-text">Review Your Order</span>
              </div>

              {/* Order summary */}
              <div className="op-summary-box">
                <h3 className="op-summary-title">Order Summary</h3>

                {cart.map((item) => (
                  <div key={item.id} className="op-summary-row">
                    <div className="op-summary-item-info">
                      <span className="op-summary-item-name">{item.name}</span>
                      <span className="op-summary-item-qty">× {item.qty}</span>
                    </div>
                    <div className="op-summary-item-right">
                      <span className="op-summary-item-price">
                        {formatPKR(item.price * item.qty)}
                      </span>
                      <button
                        className="op-summary-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >✕</button>
                    </div>
                  </div>
                ))}

                <div className="op-summary-divider" />

                <div className="op-summary-totals">
                  <div className="op-total-row">
                    <span>Subtotal</span>
                    <span>{formatPKR(subtotal)}</span>
                  </div>
                  <div className="op-total-row">
                    <span>Delivery</span>
                    <span>{formatPKR(deliveryFee)}</span>
                  </div>
                  {promo && (
                    <div className="op-total-row op-promo-row">
                      <span>Promo: {promo}</span>
                      <span>Mention on WhatsApp</span>
                    </div>
                  )}
                  <div className="op-total-row op-grand-total">
                    <span>Total</span>
                    <span>{formatPKR(total)}</span>
                  </div>
                </div>
              </div>

              {/* User details form — SRS §3.9.1 Step 4 */}
              <div className="op-user-form">
                <h3 className="op-summary-title">Your Details</h3>

                <div className="op-field">
                  <label className="op-field-label" htmlFor="op-name">
                    Full Name <span className="op-required">*</span>
                  </label>
                  <input
                    id="op-name"
                    className="op-input"
                    placeholder="Your name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    autoComplete="name"
                  />
                </div>

                <div className="op-field">
                  <label className="op-field-label" htmlFor="op-phone">
                    Phone Number <span className="op-required">*</span>
                  </label>
                  <input
                    id="op-phone"
                    className="op-input"
                    placeholder="03XX XXXXXXX"
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </div>

                <div className="op-field">
                  <label className="op-field-label" htmlFor="op-address">
                    Delivery Address <span className="op-required">*</span>
                  </label>
                  <textarea
                    id="op-address"
                    className="op-input op-textarea"
                    placeholder="House no, street, area..."
                    rows={3}
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    autoComplete="street-address"
                  />
                </div>

                {/* WhatsApp CTA — SRS §3.9.1 Step 5 */}
                <button
                  className="op-whatsapp-btn"
                  onClick={handleWhatsApp}
                  disabled={!user.name || !user.phone || !user.address || cart.length === 0}
                  aria-label="Complete order on WhatsApp"
                >
                  <span className="op-wa-inner">
                    <span className="op-wa-icon">
                      {/* WhatsApp SVG icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </span>
                    Complete Order on WhatsApp
                  </span>
                  <span className="op-btn-shine" aria-hidden="true" />
                </button>

                {(!user.name || !user.phone || !user.address) && (
                  <p className="op-form-hint">Fill in all fields above to place your order</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT — STICKY CART  (SRS §3.9.1 Step 3)
        ════════════════════════════════════════════════════════════════ */}
        <aside className={`op-cart${cartOpen ? ' op-cart-open' : ''}`} aria-label="Your order cart">

          <div className="op-cart-header">
            <div>
              <h3 className="op-cart-title">Your Order</h3>
              {branch && <p className="op-cart-branch">📍 {branch}</p>}
            </div>
            {cartCount > 0 && (
              <span className="op-cart-count">{cartCount}</span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="op-cart-empty">
              <span className="op-cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <p className="op-cart-empty-sub">Add items from the menu</p>
            </div>
          ) : (
            <>
              <div className="op-cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="op-cart-row">
                    <div className="op-cart-item-info">
                      <span className="op-cart-item-name">{item.name}</span>
                      <span className="op-cart-item-price">
                        {formatPKR(item.price * item.qty)}
                      </span>
                    </div>
                    <div className="op-cart-controls">
                      <button
                        className="op-cart-qty-btn"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label={`Remove one ${item.name}`}
                      >−</button>
                      <span className="op-cart-qty">{item.qty}</span>
                      <button
                        className="op-cart-qty-btn"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label={`Add another ${item.name}`}
                      >+</button>
                      <button
                        className="op-cart-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="op-cart-footer">
                <div className="op-cart-subtotal">
                  <span>Subtotal</span>
                  <span>{formatPKR(subtotal)}</span>
                </div>
                <div className="op-cart-subtotal">
                  <span>Delivery</span>
                  <span>{formatPKR(deliveryFee)}</span>
                </div>
                <div className="op-cart-total">
                  <span>Total</span>
                  <span>{formatPKR(total)}</span>
                </div>

                <button
                  className="op-review-btn"
                  onClick={() => { setStep('review'); window.scrollTo({ top:0, behavior:'smooth' }); }}
                  disabled={cart.length === 0}
                >
                  <span style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'8px' }}>
                    Review Order →
                  </span>
                  <span className="op-btn-shine" aria-hidden="true" />
                </button>

                <button
                  className="op-clear-btn"
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* ── MOBILE CART TOGGLE ── */}
      {cart.length > 0 && step === 'browse' && (
        <div className="op-mobile-bar">
          <div className="op-mobile-bar-info">
            <span className="op-mobile-bar-count">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
            <span className="op-mobile-bar-total">{formatPKR(total)}</span>
          </div>
          <button
            className="op-mobile-bar-btn"
            onClick={() => { setStep('review'); window.scrollTo({ top:0, behavior:'smooth' }); }}
          >
            Review Order →
          </button>
        </div>
      )}

    </div>
  );
}

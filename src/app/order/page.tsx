'use client';

import { useState, useEffect, useCallback } from 'react';
import './order.css';

interface OrderItem { name: string; qty: number; }
interface UserDetails { name: string; phone: string; address: string; }

function buildWhatsAppMessage(
  branch: string, user: UserDetails,
  items: OrderItem[], time: string,
  notes: string, promo: string
) {
  const lines = items.filter(i => i.name).map(i => `- ${i.name} × ${i.qty}`);
  return encodeURIComponent(
`Hi Saqafat Team! 🍞

Branch: ${branch}

Order:
${lines.join('\n')}

Delivery time: ${time || 'ASAP'}
${notes ? `Notes: ${notes}\n` : ''}${promo ? `Promo: ${promo}\n` : ''}
Name: ${user.name}
Phone: ${user.phone}
Address: ${user.address}

Please confirm! 🙏`);
}

export default function Order() {
  const [branch, setBranch] = useState('');
  const [user, setUser] = useState<UserDetails>({ name: '', phone: '', address: '' });
  const [items, setItems] = useState<OrderItem[]>([{ name: '', qty: 1 }, { name: '', qty: 1 }]);
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    setBranch(localStorage.getItem('saqafat_branch') || '');
    const params = new URLSearchParams(window.location.search);
    const p = params.get('promo') || '';
    if (p) { setPromo(p); setPromoApplied(true); }
  }, []);

  const addItem = () => setItems(prev => [...prev, { name: '', qty: 1 }]);
  const updateItem = (i: number, field: keyof OrderItem, val: string | number) =>
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));

  const validItems = items.filter(i => i.name.trim());
  const canSubmit = user.name && user.phone && user.address && validItems.length > 0;

  const handleWhatsApp = () => {
    if (!canSubmit) return;
    const msg = buildWhatsAppMessage(branch, user, validItems, time, notes, promo);
    window.open(`https://wa.me/923XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <div className="op-root">
      {/* Header */}
      <div className="op-header">
        <span className="op-header-badge">🍞 Saqafat Bakery</span>
        <h1>Place your order</h1>
        <p>Fill in your details and we'll confirm on WhatsApp</p>
      </div>

      

      <div className="op-form-wrap">
        {/* Card 1 — Your details */}
        <div className="op-card">
          <p className="op-card-title">Your details</p>
          <div className="op-field">
            <label htmlFor="f-name">Full name <span className="op-required">*</span></label>
            <input id="f-name" value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your name " autoComplete="name" />
          </div>
          <div className="op-field">
            <label htmlFor="f-phone">Phone number <span className="op-required">*</span></label>
            <input id="f-phone" type="tel" value={user.phone}
              onChange={e => setUser({ ...user, phone: e.target.value })}
              placeholder="03XX XXXXXXX" autoComplete="tel" />
          </div>
          <div className="op-field">
            <label htmlFor="f-address">Delivery address <span className="op-required">*</span></label>
            <textarea id="f-address" rows={3} value={user.address}
              onChange={e => setUser({ ...user, address: e.target.value })}
              placeholder="House no, street, area, city…" />
          </div>
          <div className="op-field">
            <label htmlFor="f-time">Preferred time</label>
            <select id="f-time" value={time} onChange={e => setTime(e.target.value)}>
              <option value="">As soon as possible</option>
              <option>Within 1–2 hours</option>
              <option>Evening (5 pm – 8 pm)</option>
              <option>Tomorrow morning</option>
              <option>Custom (mention in notes)</option>
            </select>
          </div>
        </div>

        {/* Card 2 — Items */}
        <div className="op-card">
          <div className="op-card-title-row">
            <p className="op-card-title">What would you like?</p>
            <button className="op-add-item-btn" onClick={addItem}>+ Add item</button>
          </div>
          {items.map((item, i) => (
            <div key={i} className="op-item-row">
              <input value={item.name} placeholder="Type item name" className="op-item-name-input"
                onChange={e => updateItem(i, 'name', e.target.value)} />
              <input type="number" min={1} value={item.qty} className="op-qty-input"
                onChange={e => updateItem(i, 'qty', Number(e.target.value))} />
              <button className="op-item-remove" onClick={() => removeItem(i)}
                aria-label="Remove item">×</button>
            </div>
          ))}
          <div className="op-divider" />
          <div className="op-field" style={{ marginBottom: 0 }}>
            <label htmlFor="f-notes">Special instructions</label>
            <textarea id="f-notes" rows={2} value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Allergies, customisations, packaging…" />
          </div>
        </div>

        {/* Card 3 — Promo */}
        <div className="op-card">
          <p className="op-card-title">Promo code</p>
          <div className="op-promo-row">
            <input value={promo} onChange={e => setPromo(e.target.value)}
              placeholder="Enter code (optional)" />
            <button className="op-promo-apply"
              onClick={() => promo && setPromoApplied(true)}>Apply</button>
          </div>
          {promoApplied && promo && (
            <p className="op-promo-ok">✓ Promo applied — we'll deduct it on confirmation</p>
          )}
        </div>

        {/* WhatsApp CTA */}
        <button className="op-whatsapp-btn" onClick={handleWhatsApp} disabled={!canSubmit}>
          <WhatsAppIcon /> Send order on WhatsApp
        </button>
        {!canSubmit && (
          <p className="op-form-hint">Fill in your details and at least one item to continue</p>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." />
    </svg>
  );
}